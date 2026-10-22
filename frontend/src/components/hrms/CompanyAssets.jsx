import React, { useState, useEffect } from 'react';
import Modal from '../common/Modal';
import CustomSelect from '../common/CustomSelect';
import CustomDatePicker from '../common/CustomDatePicker';
import CustomDataTable from '../common/CustomDataTable';
import ConfirmationModal from '../ConfirmationModal';
import { hrmsService } from '../../api/services/hrmsService';
import { useAuth } from '../../context/AuthContext';
import { APP_CONFIG } from '../../config/appConfig';
import toast from 'react-hot-toast';

const backendUrl = APP_CONFIG.apiBaseUrl.replace('/api/v1', '');

const getProfileUrl = (path) => {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  return `${backendUrl}${path.startsWith('/') ? '' : '/'}${path}`;
};

const getInitials = (name) => {
  if (!name) return '??';
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
};

export default function CompanyAssets() {
  const { user } = useAuth();
  const userRole = (user?.role || '').toLowerCase();
  const canManageAssets = ['super admin', 'superadmin', 'admin', 'hr'].includes(userRole);

  const [assets, setAssets] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [statusFilter, setStatusFilter] = useState('All');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [assetToDelete, setAssetToDelete] = useState(null);

  const [formData, setFormData] = useState({
    id: null,
    asset_name: '',
    assigned_to: '',
    status: 'Unassigned',
    assigned_date: new Date()
  });

  useEffect(() => {
    fetchAssets();
    fetchEmployees();
  }, []);

  const fetchAssets = async () => {
    setLoading(true);
    try {
      const res = await hrmsService.getAssets();
      setAssets(res || []);
    } catch (error) {
      console.error(error);
      toast.error('Failed to load company assets');
    } finally {
      setLoading(false);
    }
  };

  const fetchEmployees = async () => {
    try {
      const res = await hrmsService.getEmployees();
      setEmployees(res || []);
    } catch (error) {
      console.error(error);
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
        assigned_date: asset.assigned_date ? new Date(asset.assigned_date.length === 10 ? asset.assigned_date + 'T00:00:00' : asset.assigned_date) : null
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.asset_name.trim()) {
      toast.error('Asset Name is required');
      return;
    }

    const assignedDateStr = formData.assigned_date
      ? (formData.assigned_date instanceof Date
          ? formData.assigned_date.toISOString().split('T')[0]
          : formData.assigned_date)
      : '';

    const payload = {
      asset_name: formData.asset_name.trim(),
      assigned_to: formData.assigned_to || '',
      status: formData.status || (formData.assigned_to ? 'Assigned' : 'Unassigned'),
      assigned_date: assignedDateStr
    };

    setIsSaving(true);
    try {
      if (isEditMode && formData.id) {
        await hrmsService.updateAsset(formData.id, payload);
        toast.success('Asset updated successfully');
      } else {
        await hrmsService.createAsset(payload);
        toast.success('Asset added successfully');
      }
      setIsModalOpen(false);
      fetchAssets();
    } catch (error) {
      console.error(error);
      toast.error(error.message || 'Failed to save asset');
    } finally {
      setIsSaving(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!assetToDelete) return;
    try {
      toast.loading('Deleting asset...', { id: 'del_asset' });
      await hrmsService.deleteAsset(assetToDelete._id || assetToDelete.id);
      toast.success('Asset deleted successfully', { id: 'del_asset' });
      setAssetToDelete(null);
      fetchAssets();
    } catch (error) {
      console.error(error);
      toast.error('Failed to delete asset', { id: 'del_asset' });
    }
  };

  const findEmployee = (val) => {
    if (!val) return null;
    return employees.find(e => (e.id === val || e._id === val || e.name?.toLowerCase() === val?.toLowerCase()));
  };

  const getEmployeeDisplay = (val) => {
    if (!val) return '-';
    const found = findEmployee(val);
    return found ? found.name : val;
  };

  // Filter by Status & RBAC Data Isolation
  const filteredAssets = assets.filter(item => {
    // If not Super Admin, Admin, or HR, only show assets assigned to this user
    if (!canManageAssets) {
      const assigned = (item.assigned_to || '').toLowerCase().trim();
      const myName = (user?.name || '').toLowerCase().trim();
      const myId = String(user?._id || user?.id || '').toLowerCase().trim();
      const myEmpId = String(user?.employee_id || '').toLowerCase().trim();
      const isAssignedToMe = assigned && (assigned === myName || assigned === myId || assigned === myEmpId);
      if (!isAssignedToMe) return false;
    }
    return statusFilter === 'All' ? true : item.status === statusFilter;
  });

  const assignedCount = assets.filter(a => a.status === 'Assigned').length;
  const unassignedCount = assets.filter(a => a.status === 'Unassigned').length;

  const columns = [
    {
      name: 'Asset Name',
      selectorKey: 'asset_name',
      sortable: true,
      cell: row => (
        <div className="d-flex align-items-center gap-2">
          <span className="avatar avatar-sm bg-primary-transparent text-primary rounded-circle d-flex align-items-center justify-content-center">
            <i className="ti ti-devices fs-16"></i>
          </span>
          <span className="fw-bold text-dark">{row.asset_name}</span>
        </div>
      )
    },
    {
      name: 'Assigned To',
      selectorKey: 'assigned_to',
      sortable: true,
      cell: row => {
        const emp = findEmployee(row.assigned_to);
        const empName = emp ? emp.name : row.assigned_to;
        const photo = emp?.profile_photo || emp?.avatar || emp?.profile_picture || emp?.image;

        if (!empName || empName === '-' || row.status === 'Unassigned') {
          return <span className="badge bg-light text-muted border">Unassigned</span>;
        }

        return (
          <div className="d-flex align-items-center gap-2">
            {photo ? (
              <img 
                src={getProfileUrl(photo)} 
                alt={empName} 
                className="avatar avatar-xs rounded-circle flex-shrink-0" 
                style={{ width: '28px', height: '28px', minWidth: '28px', objectFit: 'cover' }} 
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const fallback = e.currentTarget.parentElement?.querySelector('.avatar-initials-fallback');
                  if (fallback) fallback.classList.remove('d-none');
                }}
              />
            ) : null}
            <span 
              className={`avatar avatar-xs rounded-circle bg-primary-transparent text-primary fw-bold flex-shrink-0 d-flex align-items-center justify-content-center avatar-initials-fallback ${photo ? 'd-none' : ''}`}
              style={{ width: '28px', height: '28px', minWidth: '28px', fontSize: '11px', letterSpacing: '0.5px' }}
            >
              {getInitials(empName)}
            </span>
            <div className="d-flex flex-column">
              <span className="fw-medium text-dark fs-13">{empName}</span>
              {emp?.email && <span className="text-muted fs-11">{emp.email}</span>}
            </div>
          </div>
        );
      }
    },
    {
      name: 'Status',
      selectorKey: 'status',
      sortable: true,
      cell: row => (
        <span className={`badge ${row.status === 'Assigned' ? 'bg-success-transparent text-success' : 'bg-warning-transparent text-warning'}`}>
          <i className={`ti ${row.status === 'Assigned' ? 'ti-check' : 'ti-clock'} me-1`}></i>
          {row.status}
        </span>
      )
    },
    {
      name: 'Assigned Date',
      selectorKey: 'assigned_date',
      sortable: true,
      cell: row => {
        if (!row.assigned_date) return <span className="text-muted">-</span>;
        try {
          const d = new Date(row.assigned_date.length === 10 ? row.assigned_date + 'T00:00:00' : row.assigned_date);
          return !isNaN(d.getTime())
            ? d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
            : row.assigned_date;
        } catch {
          return row.assigned_date;
        }
      }
    },
    {
      name: 'Actions',
      sortable: false,
      cell: row => (
        <div className="d-flex align-items-center gap-2">
          {canManageAssets ? (
            <>
              <button 
                type="button" 
                className="btn btn-sm btn-link p-0 text-muted fs-16" 
                onClick={() => openModal(row)}
                title="Edit Asset"
              >
                <i className="ti ti-edit"></i>
              </button>
              <button 
                type="button" 
                className="btn btn-sm btn-link p-0 text-danger fs-16" 
                onClick={() => setAssetToDelete(row)}
                data-bs-toggle="modal" 
                data-bs-target="#delete_asset_modal"
                title="Delete Asset"
              >
                <i className="ti ti-trash"></i>
              </button>
            </>
          ) : (
            <span className="badge bg-light text-muted border">View Only</span>
          )}
        </div>
      )
    }
  ];

  return (
    <div className="company-assets-container p-4">
      {/* Top Header */}
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
        <div>
          <h5 className="mb-1 fw-bold text-dark fs-18">Company Assets Cabinet</h5>
          <p className="text-muted fs-13 mb-0">Manage and track company hardware, peripherals, and assets assigned to employees.</p>
        </div>
        {canManageAssets && (
          <button className="btn btn-primary d-flex align-items-center shadow-sm" onClick={() => openModal()}>
            <i className="ti ti-plus me-1"></i> Add / Assign Asset
          </button>
        )}
      </div>

      {/* Summary KPI Cards */}
      <div className="row g-3 mb-4">
        {canManageAssets ? (
          <>
            <div className="col-sm-6 col-lg-4">
              <div className="card shadow-sm border mb-0">
                <div className="card-body p-3 d-flex align-items-center justify-content-between">
                  <div>
                    <p className="text-muted fs-13 mb-1">Total Assets</p>
                    <h4 className="fw-bold mb-0 text-dark">{assets.length}</h4>
                  </div>
                  <div className="avatar avatar-md bg-primary-transparent text-primary rounded-circle d-flex align-items-center justify-content-center">
                    <i className="ti ti-devices fs-20"></i>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-lg-4">
              <div className="card shadow-sm border mb-0">
                <div className="card-body p-3 d-flex align-items-center justify-content-between">
                  <div>
                    <p className="text-muted fs-13 mb-1">Assigned to Staff</p>
                    <h4 className="fw-bold mb-0 text-success">{assignedCount}</h4>
                  </div>
                  <div className="avatar avatar-md bg-success-transparent text-success rounded-circle d-flex align-items-center justify-content-center">
                    <i className="ti ti-user-check fs-20"></i>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-lg-4">
              <div className="card shadow-sm border mb-0">
                <div className="card-body p-3 d-flex align-items-center justify-content-between">
                  <div>
                    <p className="text-muted fs-13 mb-1">Available / Unassigned</p>
                    <h4 className="fw-bold mb-0 text-warning">{unassignedCount}</h4>
                  </div>
                  <div className="avatar avatar-md bg-warning-transparent text-warning rounded-circle d-flex align-items-center justify-content-center">
                    <i className="ti ti-box fs-20"></i>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="col-sm-6 col-lg-4">
            <div className="card shadow-sm border mb-0">
              <div className="card-body p-3 d-flex align-items-center justify-content-between">
                <div>
                  <p className="text-muted fs-13 mb-1">My Assigned Assets</p>
                  <h4 className="fw-bold mb-0 text-success">{filteredAssets.length}</h4>
                </div>
                <div className="avatar avatar-md bg-success-transparent text-success rounded-circle d-flex align-items-center justify-content-center">
                  <i className="ti ti-devices fs-20"></i>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Status Filters */}
      {canManageAssets && (
        <div className="card shadow-sm border mb-4">
          <div className="card-body p-3 d-flex align-items-center gap-2">
            <button 
              className={`btn btn-sm ${statusFilter === 'All' ? 'btn-primary' : 'btn-light'}`}
              onClick={() => setStatusFilter('All')}
            >
              All ({assets.length})
            </button>
            <button 
              className={`btn btn-sm ${statusFilter === 'Assigned' ? 'btn-primary' : 'btn-light'}`}
              onClick={() => setStatusFilter('Assigned')}
            >
              Assigned ({assignedCount})
            </button>
            <button 
              className={`btn btn-sm ${statusFilter === 'Unassigned' ? 'btn-primary' : 'btn-light'}`}
              onClick={() => setStatusFilter('Unassigned')}
            >
              Unassigned ({unassignedCount})
            </button>
          </div>
        </div>
      )}

      {/* Assets Table */}
      <div className="card shadow-sm border mb-0">
        <CustomDataTable 
          columns={columns} 
          data={filteredAssets} 
          loading={loading}
          pagination
        />
      </div>

      {/* Assign / Edit Asset Modal */}
      <Modal 
        open={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={isEditMode ? "Edit Asset Assignment" : "Assign New Asset"}
        size="md"
      >
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-medium">Asset Name <span className="text-danger">*</span></label>
            <input 
              type="text" 
              className="form-control" 
              placeholder="e.g. MacBook Pro 14, Dell UltraSharp Monitor, Ergonomic Chair"
              value={formData.asset_name}
              onChange={e => setFormData({ ...formData, asset_name: e.target.value })}
              required 
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-medium">Assign To (Employee)</label>
            <CustomSelect 
              options={[
                { value: '', label: 'None (Unassigned)' },
                ...employees.map(e => ({ 
                  value: e.name, 
                  label: `${e.name} ${e.email ? `(${e.email})` : e.role ? `(${e.role})` : ''}` 
                }))
              ]}
              value={
                formData.assigned_to 
                  ? { value: formData.assigned_to, label: getEmployeeDisplay(formData.assigned_to) }
                  : { value: '', label: 'None (Unassigned)' }
              }
              onChange={(opt) => {
                const assignedVal = opt ? opt.value : '';
                setFormData({
                  ...formData, 
                  assigned_to: assignedVal,
                  status: assignedVal ? 'Assigned' : 'Unassigned',
                  assigned_date: assignedVal && !formData.assigned_date ? new Date() : formData.assigned_date
                });
              }}
              placeholder="Select Employee (Optional)"
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
              onChange={(opt) => setFormData({ ...formData, status: opt ? opt.value : 'Unassigned' })}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-medium">Assigned Date</label>
            <CustomDatePicker 
              selected={formData.assigned_date}
              onChange={(date) => setFormData({ ...formData, assigned_date: date })}
              placeholderText="Select Date"
            />
          </div>

          <div className="d-flex justify-content-end gap-2 mt-4">
            <button type="button" className="btn btn-light" onClick={() => setIsModalOpen(false)}>Cancel</button>
            <button type="submit" className="btn btn-primary" disabled={isSaving}>
              {isSaving ? 'Saving...' : (isEditMode ? 'Update Asset' : 'Save Asset')}
            </button>
          </div>
        </form>
      </Modal>

      {/* Confirmation Modal for Delete Asset */}
      <ConfirmationModal 
        id="delete_asset_modal"
        onConfirm={handleConfirmDelete}
        title="Delete Asset"
        description={`Are you sure you want to delete asset "${assetToDelete?.asset_name || 'this item'}"? This action cannot be undone.`}
      />
    </div>
  );
}
