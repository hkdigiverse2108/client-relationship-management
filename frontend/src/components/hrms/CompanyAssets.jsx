import React, { useState } from 'react';
import Modal from '../common/Modal';
import CustomSelect from '../common/CustomSelect';
import CustomDatePicker from '../common/CustomDatePicker';
import CustomDataTable from '../common/CustomDataTable';
import toast from 'react-hot-toast';

// Mock Data
const MOCK_USERS = [
  { id: '101', name: 'Adrian', email: 'adrian@example.com' },
  { id: '102', name: 'John Doe', email: 'john@example.com' },
  { id: '103', name: 'Jane Smith', email: 'jane@example.com' }
];

const INITIAL_ASSETS = [
  { id: '1', asset_name: 'MacBook Pro 14"', assigned_to: '101', status: 'Assigned', assigned_date: '2023-11-01' },
  { id: '2', asset_name: 'Dell UltraSharp Monitor', assigned_to: '102', status: 'Assigned', assigned_date: '2024-01-15' },
  { id: '3', asset_name: 'Ergonomic Office Chair', assigned_to: '', status: 'Unassigned', assigned_date: '' }
];

export default function CompanyAssets() {
  const [assets, setAssets] = useState(INITIAL_ASSETS);
  const [users] = useState(MOCK_USERS);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    asset_name: '',
    assigned_to: '',
    status: 'Unassigned',
    assigned_date: new Date()
  });

  const openModal = (asset = null) => {
    if (asset) {
      setIsEditMode(true);
      setFormData({
        id: asset.id,
        asset_name: asset.asset_name || '',
        assigned_to: asset.assigned_to || '',
        status: asset.status || 'Unassigned',
        assigned_date: asset.assigned_date ? new Date(asset.assigned_date) : null
      });
    } else {
      setIsEditMode(false);
      setFormData({
        id: null,
        asset_name: '',
        assigned_to: '',
        status: 'Unassigned',
        assigned_date: new Date()
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.asset_name.trim()) {
      toast.error('Asset Name is required');
      return;
    }

    const assignedDateStr = formData.assigned_date ? formData.assigned_date.toISOString().split('T')[0] : '';

    if (isEditMode) {
      setAssets(assets.map(a => a.id === formData.id ? { ...formData, assigned_date: assignedDateStr } : a));
      toast.success('Asset updated successfully');
    } else {
      const newAsset = { ...formData, id: Date.now().toString(), assigned_date: assignedDateStr };
      setAssets([...assets, newAsset]);
      toast.success('Asset assigned successfully');
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this asset?");
    if (isConfirmed) {
      setAssets(assets.filter(a => a.id !== id));
      toast.success('Asset deleted successfully');
    }
  };

  const getUserName = (userId) => {
    const user = users.find(u => u.id === userId);
    return user ? user.name : '-';
  };

  const columns = [
    {
      name: 'Asset Name',
      selectorKey: 'asset_name',
      sortable: true,
      cell: row => <span className="fw-bold">{row.asset_name}</span>
    },
    {
      name: 'Assigned To',
      selectorKey: 'assigned_to',
      sortable: true,
      cell: row => {
        const name = getUserName(row.assigned_to);
        return name !== '-' ? (
          <span className="badge bg-light text-dark border">{name}</span>
        ) : (
          <span className="text-muted">-</span>
        );
      }
    },
    {
      name: 'Status',
      selectorKey: 'status',
      sortable: true,
      cell: row => (
        <span className={`badge ${row.status === 'Assigned' ? 'bg-success-transparent' : 'bg-warning-transparent'}`}>
          {row.status}
        </span>
      )
    },
    {
      name: 'Assigned Date',
      selectorKey: 'assigned_date',
      sortable: true,
      cell: row => row.assigned_date ? new Date(row.assigned_date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '-'
    },
    {
      name: 'Actions',
      sortable: false,
      cell: row => (
        <div className="d-flex align-items-center gap-2">
          <a href="#" className="text-muted fs-16" onClick={(e) => { e.preventDefault(); openModal(row); }}>
            <i className="ti ti-edit"></i>
          </a>
          <a href="#" className="text-danger fs-16" onClick={(e) => { e.preventDefault(); handleDelete(row.id); }}>
            <i className="ti ti-trash"></i>
          </a>
        </div>
      )
    }
  ];

  return (
    <div className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h5 className="mb-1 fw-bold text-dark fs-18">Company Assets Cabinet</h5>
          <p className="text-muted fs-13 mb-0">Manage and track company assets assigned to employees.</p>
        </div>
        <button className="btn btn-primary d-flex align-items-center" onClick={() => openModal()}>
          <i className="ti ti-plus me-1"></i> Assign Asset
        </button>
      </div>

      <div className="card shadow-sm border mb-0">
        <CustomDataTable columns={columns} data={assets} />
      </div>

      {/* Assign Asset Modal */}
      <Modal 
        open={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={isEditMode ? "Edit Asset Assignment" : "Assign New Asset"}
      >
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-medium">Asset Name <span className="text-danger">*</span></label>
            <input 
              type="text" 
              className="form-control" 
              placeholder="e.g. MacBook Pro, Monitor, Desk"
              value={formData.asset_name}
              onChange={e => setFormData({...formData, asset_name: e.target.value})}
              required 
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-medium">Assign To</label>
            <CustomSelect 
              options={users.map(u => ({ value: u.id, label: `${u.name} (${u.email})` }))}
              value={formData.assigned_to ? { value: formData.assigned_to, label: `${getUserName(formData.assigned_to)}` } : null}
              onChange={(opt) => setFormData({...formData, assigned_to: opt ? opt.value : ''})}
              placeholder="Select Employee"
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-medium">Status <span className="text-danger">*</span></label>
            <CustomSelect 
              options={[
                { value: 'Unassigned', label: 'Unassigned' },
                { value: 'Assigned', label: 'Assigned' }
              ]}
              value={{ value: formData.status, label: formData.status }}
              onChange={(opt) => setFormData({...formData, status: opt.value})}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-medium">Assigned Date</label>
            <CustomDatePicker 
              selected={formData.assigned_date}
              onChange={(date) => setFormData({...formData, assigned_date: date})}
              placeholderText="Select Date"
            />
          </div>

          <div className="d-flex justify-content-end gap-2 mt-4">
            <button type="button" className="btn btn-light" onClick={() => setIsModalOpen(false)}>Cancel</button>
            <button type="submit" className="btn btn-primary">{isEditMode ? 'Update' : 'Assign'}</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
