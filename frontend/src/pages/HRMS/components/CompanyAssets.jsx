import React, { useState, useEffect } from 'react';
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';
import Button from '@/components/common/Button/Button';
import Modal from '@/components/common/Modal/Modal';
import { confirmDialog } from '@/components/common/ConfirmDialog/confirmDialog';
import { hrmsService } from '@/api/services/hrmsService';
import { userService } from '@/api/services/userService';
import toast from 'react-hot-toast';
import dayjs from 'dayjs';

export default function CompanyAssets() {
  const [assets, setAssets] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({
    asset_name: '',
    assigned_to: '',
    status: 'Unassigned',
    assigned_date: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [assetsRes, usersRes] = await Promise.all([
        hrmsService.getAssets(),
        userService.getList()
      ]);
      setAssets(assetsRes || []);
      setUsers(usersRes || []);
    } catch (error) {
      console.error(error);
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const openModal = (asset = null) => {
    if (asset) {
      setIsEditMode(true);
      setFormData({
        id: asset._id || asset.id,
        asset_name: asset.asset_name || '',
        assigned_to: asset.assigned_to || '',
        status: asset.status || 'Unassigned',
        assigned_date: asset.assigned_date || new Date().toISOString().split('T')[0]
      });
    } else {
      setIsEditMode(false);
      setFormData({
        asset_name: '',
        assigned_to: '',
        status: 'Unassigned',
        assigned_date: new Date().toISOString().split('T')[0]
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditMode) {
        await hrmsService.updateAsset(formData.id, formData);
        toast.success('Asset updated successfully');
      } else {
        await hrmsService.createAsset(formData);
        toast.success('Asset assigned successfully');
      }
      setIsModalOpen(false);
      fetchData();
    } catch (error) {
      console.error(error);
      toast.error(isEditMode ? 'Failed to update asset' : 'Failed to assign asset');
    }
  };

  const handleDelete = async (id) => {
    const isConfirmed = await confirmDialog({ 
      title: "Confirm Delete", 
      text: "Are you sure you want to delete this asset?" 
    });
    
    if (isConfirmed) {
      try {
        await hrmsService.deleteAsset(id);
        toast.success('Asset deleted successfully');
        fetchData();
      } catch (error) {
        console.error(error);
        toast.error('Failed to delete asset');
      }
    }
  };

  const getUserName = (userId) => {
    const user = users.find(u => (u._id || u.id) === userId);
    return user ? user.name : 'Unknown';
  };

  return (
    <div className="hrms-panel p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="m-0 fw-bold">Company Assets Cabinet</h3>
          <p className="text-muted m-0">Manage and track company assets assigned to employees.</p>
        </div>
        <Button variant="primary" onClick={() => openModal()}>
          <FiPlus className="me-2" /> Assign Asset
        </Button>
      </div>

      <div className="table-responsive bg-white rounded-3 shadow-sm border">
        <table className="table table-hover align-middle mb-0">
          <thead className="table-light">
            <tr>
              <th>Asset Name</th>
              <th>Assigned To</th>
              <th>Status</th>
              <th>Assigned Date</th>
              <th className="text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="text-center py-4 text-muted">Loading assets...</td>
              </tr>
            ) : assets.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-4 text-muted">No assets assigned yet.</td>
              </tr>
            ) : (
              assets.map(asset => (
                <tr key={asset._id || asset.id}>
                  <td className="fw-bold">{asset.asset_name}</td>
                  <td>
                    {asset.assigned_to ? (
                      <span className="badge bg-light text-dark border">
                        {getUserName(asset.assigned_to)}
                      </span>
                    ) : (
                      <span className="text-muted">-</span>
                    )}
                  </td>
                  <td>
                    <span className={`badge ${asset.status === 'Assigned' ? 'bg-success' : 'bg-warning'}`}>
                      {asset.status}
                    </span>
                  </td>
                  <td>{asset.assigned_date ? dayjs(asset.assigned_date).format('DD MMM YYYY') : '-'}</td>
                  <td className="text-end">
                    <div className="d-flex justify-content-end gap-2">
                      <button className="btn btn-sm btn-outline-primary" onClick={() => openModal(asset)}>
                        <FiEdit2 />
                      </button>
                      <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(asset._id || asset.id)}>
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Assign Asset Modal */}
      <Modal 
        open={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={isEditMode ? "Edit Asset Assignment" : "Assign New Asset"}
      >
        <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
          <div>
            <label className="form-label fw-semibold">Asset Name <span className="text-danger">*</span></label>
            <input 
              type="text" 
              className="form-control" 
              placeholder="e.g. MacBook Pro, Monitor, Desk"
              value={formData.asset_name}
              onChange={e => setFormData({...formData, asset_name: e.target.value})}
              required 
            />
          </div>

          <div>
            <label className="form-label fw-semibold">Assign To</label>
            <select 
              className="form-select"
              value={formData.assigned_to}
              onChange={e => setFormData({...formData, assigned_to: e.target.value})}
            >
              <option value="">Select Employee</option>
              {users.map(u => (
                <option key={u._id || u.id} value={u._id || u.id}>{u.name} ({u.email})</option>
              ))}
            </select>
          </div>

          <div>
            <label className="form-label fw-semibold">Status <span className="text-danger">*</span></label>
            <select 
              className="form-select"
              value={formData.status}
              onChange={e => setFormData({...formData, status: e.target.value})}
              required
            >
              <option value="Unassigned">Unassigned</option>
              <option value="Assigned">Assigned</option>
            </select>
          </div>

          <div>
            <label className="form-label fw-semibold">Assigned Date</label>
            <input 
              type="date" 
              className="form-control" 
              value={formData.assigned_date}
              onChange={e => setFormData({...formData, assigned_date: e.target.value})}
            />
          </div>

          <div className="d-flex justify-content-end gap-2 mt-4">
            <Button variant="outline" type="button" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button variant="primary" type="submit">{isEditMode ? 'Update' : 'Assign'}</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
