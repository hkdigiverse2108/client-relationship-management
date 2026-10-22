import React, { useState, useEffect } from 'react';
import Modal from '../common/Modal';
import CustomSelect from '../common/CustomSelect';
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

export default function PerformanceAppraisals() {
  const { user } = useAuth();
  const userRole = (user?.role || '').toLowerCase();
  const canManageAppraisals = ['super admin', 'superadmin', 'admin'].includes(userRole);

  const [appraisals, setAppraisals] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [statusFilter, setStatusFilter] = useState('All');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [appraisalToDelete, setAppraisalToDelete] = useState(null);

  const [formData, setFormData] = useState({
    id: null,
    employee_id: '',
    review_period: '',
    rating_technical: 4,
    rating_communication: 4,
    rating_punctuality: 4,
    rating_initiative: 4,
    note: '',
    status: 'Draft'
  });

  const [themeColor, setThemeColor] = useState('#f26522');
  const [themeColorRgb, setThemeColorRgb] = useState('242, 101, 34');

  useEffect(() => {
    fetchAppraisals();
    fetchEmployees();

    const dummy = document.createElement('div');
    dummy.className = 'bg-primary';
    dummy.style.display = 'none';
    document.body.appendChild(dummy);
    
    const updateColor = () => {
      const color = window.getComputedStyle(dummy).backgroundColor;
      if (color && color !== 'rgba(0, 0, 0, 0)' && color !== 'transparent') {
        setThemeColor(color);
        const match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
        if (match) {
          setThemeColorRgb(`${match[1]}, ${match[2]}, ${match[3]}`);
        }
      }
    };

    updateColor();
    const observer = new MutationObserver(updateColor);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme', 'class', 'data-theme-color'] });
    observer.observe(document.body, { attributes: true, attributeFilter: ['data-theme', 'class', 'data-theme-color'] });

    return () => {
      document.body.removeChild(dummy);
      observer.disconnect();
    };
  }, []);

  const fetchAppraisals = async () => {
    setLoading(true);
    try {
      const res = await hrmsService.getAppraisals();
      setAppraisals(res || []);
    } catch (error) {
      console.error(error);
      toast.error('Failed to load appraisals');
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

  const calculateOverallScore = (data) => {
    const total = Number(data.rating_technical || 0) + 
                  Number(data.rating_communication || 0) + 
                  Number(data.rating_punctuality || 0) + 
                  Number(data.rating_initiative || 0);
    return (total / 4).toFixed(1);
  };

  const openModal = (appraisal = null) => {
    if (appraisal) {
      setIsEditMode(true);
      setFormData({
        id: appraisal._id || appraisal.id,
        employee_id: appraisal.employee_id || '',
        review_period: appraisal.review_period || '',
        rating_technical: appraisal.rating_technical || 4,
        rating_communication: appraisal.rating_communication || 4,
        rating_punctuality: appraisal.rating_punctuality || 4,
        rating_initiative: appraisal.rating_initiative || 4,
        note: appraisal.note || '',
        status: appraisal.status || 'Draft'
      });
    } else {
      setIsEditMode(false);
      setFormData({
        id: null,
        employee_id: employees[0]?.name || '',
        review_period: 'Q' + Math.ceil((new Date().getMonth() + 1) / 3) + ' ' + new Date().getFullYear(),
        rating_technical: 4,
        rating_communication: 4,
        rating_punctuality: 4,
        rating_initiative: 4,
        note: '',
        status: 'Draft'
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.employee_id) {
      toast.error('Employee is required');
      return;
    }
    if (!formData.review_period.trim()) {
      toast.error('Review Period is required');
      return;
    }

    const payload = {
      employee_id: formData.employee_id,
      review_period: formData.review_period.trim(),
      rating_technical: parseInt(formData.rating_technical) || 0,
      rating_communication: parseInt(formData.rating_communication) || 0,
      rating_punctuality: parseInt(formData.rating_punctuality) || 0,
      rating_initiative: parseInt(formData.rating_initiative) || 0,
      overall_score: parseFloat(calculateOverallScore(formData)),
      note: formData.note || '',
      status: formData.status || 'Draft'
    };

    setIsSaving(true);
    try {
      if (isEditMode && formData.id) {
        await hrmsService.updateAppraisal(formData.id, payload);
        toast.success('Appraisal updated successfully');
      } else {
        await hrmsService.createAppraisal(payload);
        toast.success('Appraisal created successfully');
      }
      setIsModalOpen(false);
      fetchAppraisals();
    } catch (error) {
      console.error(error);
      toast.error(error.message || 'Failed to save appraisal');
    } finally {
      setIsSaving(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!appraisalToDelete) return;
    try {
      toast.loading('Deleting appraisal...', { id: 'del_appraisal' });
      await hrmsService.deleteAppraisal(appraisalToDelete._id || appraisalToDelete.id);
      toast.success('Appraisal deleted successfully', { id: 'del_appraisal' });
      setAppraisalToDelete(null);
      fetchAppraisals();
    } catch (error) {
      console.error(error);
      toast.error('Failed to delete appraisal', { id: 'del_appraisal' });
    }
  };

  const findEmployee = (val) => {
    if (!val) return null;
    return employees.find(e => (e.id === val || e._id === val || e.name?.toLowerCase() === val?.toLowerCase()));
  };

  const getEmployeeName = (val) => {
    if (!val) return '-';
    const found = findEmployee(val);
    return found ? found.name : val;
  };

  const renderStars = (rating) => {
    return (
      <div className="d-flex align-items-center gap-1">
        {[1, 2, 3, 4, 5].map(star => (
          <span key={star} style={{ color: star <= rating ? '#f59e0b' : '#e5e7eb', fontSize: '1.1rem' }}>
            ★
          </span>
        ))}
      </div>
    );
  };

  const renderRatingInput = (label, field) => (
    <div className="d-flex align-items-center justify-content-between p-3 border rounded-3 bg-light mb-2">
      <span className="fw-medium text-dark">{label}</span>
      <div className="d-flex align-items-center gap-3">
        <input 
          type="range" 
          className="form-range custom-range-primary" 
          min="1" 
          max="5" 
          step="1"
          style={{ width: '150px' }}
          value={formData[field]}
          onChange={(e) => setFormData({ ...formData, [field]: parseInt(e.target.value) })}
        />
        <span className="badge bg-primary rounded-pill px-3 py-2 fs-14 text-white" style={{ width: '45px', textAlign: 'center' }}>
          {formData[field]}
        </span>
      </div>
    </div>
  );

  // Filter by Status & RBAC Data Isolation
  const filteredAppraisals = appraisals.filter(item => {
    // If not Super Admin or Admin, only show completed appraisals belonging to this user
    if (!canManageAppraisals) {
      const empVal = (item.employee_id || '').toLowerCase().trim();
      const myName = (user?.name || '').toLowerCase().trim();
      const myId = String(user?._id || user?.id || '').toLowerCase().trim();
      const myEmpId = String(user?.employee_id || '').toLowerCase().trim();
      const isMine = empVal && (empVal === myName || empVal === myId || empVal === myEmpId);
      if (!isMine || item.status !== 'Completed') return false;
    }
    return statusFilter === 'All' ? true : item.status === statusFilter;
  });

  const completedCount = appraisals.filter(a => a.status === 'Completed').length;
  const draftCount = appraisals.filter(a => a.status === 'Draft').length;
  const avgScore = appraisals.length > 0 
    ? (appraisals.reduce((acc, curr) => acc + (parseFloat(curr.overall_score) || 0), 0) / appraisals.length).toFixed(1)
    : '0.0';

  // Stats for regular employees / non-admins
  const myCompletedCount = filteredAppraisals.filter(a => a.status === 'Completed').length;
  const myAvgScore = filteredAppraisals.length > 0
    ? (filteredAppraisals.reduce((acc, curr) => acc + (parseFloat(curr.overall_score) || 0), 0) / filteredAppraisals.length).toFixed(1)
    : '0.0';

  const columns = [
    {
      name: 'Employee',
      selectorKey: 'employee_id',
      sortable: true,
      cell: row => {
        const emp = findEmployee(row.employee_id);
        const empName = emp ? emp.name : row.employee_id;
        const photo = emp?.profile_photo || emp?.avatar || emp?.profile_picture || emp?.image;

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
              {emp?.department && <span className="text-muted fs-11">{emp.department}</span>}
            </div>
          </div>
        );
      }
    },
    {
      name: 'Review Period',
      selectorKey: 'review_period',
      sortable: true,
      cell: row => (
        <span className="badge bg-light text-dark border fw-medium px-2 py-1">
          <i className="ti ti-calendar me-1 text-primary"></i>
          {row.review_period}
        </span>
      )
    },
    {
      name: 'Overall Score',
      selectorKey: 'overall_score',
      sortable: true,
      cell: row => (
        <div className="d-flex align-items-center gap-2">
          <span className="fw-bold fs-14 text-dark">{row.overall_score}</span>
          {renderStars(Math.round(row.overall_score))}
        </div>
      )
    },
    {
      name: 'Notes',
      selectorKey: 'note',
      sortable: false,
      cell: row => (
        <div className="text-truncate text-muted" style={{ maxWidth: '220px' }} title={row.note}>
          {row.note || '-'}
        </div>
      )
    },
    {
      name: 'Status',
      selectorKey: 'status',
      sortable: true,
      cell: row => (
        <span className={`badge ${row.status === 'Completed' ? 'bg-success-transparent text-success' : 'bg-warning-transparent text-warning'}`}>
          <i className={`ti ${row.status === 'Completed' ? 'ti-check' : 'ti-clock'} me-1`}></i>
          {row.status}
        </span>
      )
    },
    {
      name: 'Date Created',
      selectorKey: 'created_at',
      sortable: true,
      cell: row => row.created_at ? new Date(row.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '-'
    },
    {
      name: 'Actions',
      sortable: false,
      cell: row => (
        <div className="d-flex align-items-center gap-2">
          {canManageAppraisals ? (
            <>
              <button 
                type="button" 
                className="btn btn-sm btn-link p-0 text-muted fs-16" 
                onClick={() => openModal(row)}
                title="Edit Appraisal"
              >
                <i className="ti ti-edit"></i>
              </button>
              <button 
                type="button" 
                className="btn btn-sm btn-link p-0 text-danger fs-16" 
                onClick={() => setAppraisalToDelete(row)}
                data-bs-toggle="modal" 
                data-bs-target="#delete_appraisal_modal"
                title="Delete Appraisal"
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
    <div className="performance-appraisals-container p-4">
      <style>{`
        .custom-range-primary::-webkit-slider-thumb {
          background: ${themeColor} !important;
          background-color: ${themeColor} !important;
        }
        .custom-range-primary::-moz-range-thumb {
          background: ${themeColor} !important;
          background-color: ${themeColor} !important;
        }
        .custom-range-primary::-webkit-slider-runnable-track {
          background-color: rgba(${themeColorRgb}, 0.2) !important;
          height: 6px;
          border-radius: 4px;
        }
        .custom-range-primary::-moz-range-track {
          background-color: rgba(${themeColorRgb}, 0.2) !important;
          height: 6px;
          border-radius: 4px;
        }
        .custom-range-primary:focus::-webkit-slider-thumb {
          box-shadow: 0 0 0 1px #fff, 0 0 0 0.25rem rgba(${themeColorRgb}, 0.25) !important;
        }
      `}</style>

      {/* Top Header */}
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
        <div>
          <h5 className="mb-1 fw-bold text-dark fs-18">Performance Appraisals</h5>
          <p className="text-muted fs-13 mb-0">Track and manage employee performance reviews, ratings, and appraisals.</p>
        </div>
        {canManageAppraisals && (
          <button className="btn btn-primary d-flex align-items-center shadow-sm" onClick={() => openModal()}>
            <i className="ti ti-plus me-1"></i> Start New Appraisal
          </button>
        )}
      </div>

      {/* Summary KPI Cards */}
      <div className="row g-3 mb-4">
        {canManageAppraisals ? (
          <>
            <div className="col-sm-6 col-lg-3">
              <div className="card shadow-sm border mb-0">
                <div className="card-body p-3 d-flex align-items-center justify-content-between">
                  <div>
                    <p className="text-muted fs-13 mb-1">Total Appraisals</p>
                    <h4 className="fw-bold mb-0 text-dark">{appraisals.length}</h4>
                  </div>
                  <div className="avatar avatar-md bg-primary-transparent text-primary rounded-circle d-flex align-items-center justify-content-center">
                    <i className="ti ti-chart-bar fs-20"></i>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-lg-3">
              <div className="card shadow-sm border mb-0">
                <div className="card-body p-3 d-flex align-items-center justify-content-between">
                  <div>
                    <p className="text-muted fs-13 mb-1">Completed Reviews</p>
                    <h4 className="fw-bold mb-0 text-success">{completedCount}</h4>
                  </div>
                  <div className="avatar avatar-md bg-success-transparent text-success rounded-circle d-flex align-items-center justify-content-center">
                    <i className="ti ti-circle-check fs-20"></i>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-lg-3">
              <div className="card shadow-sm border mb-0">
                <div className="card-body p-3 d-flex align-items-center justify-content-between">
                  <div>
                    <p className="text-muted fs-13 mb-1">In Draft</p>
                    <h4 className="fw-bold mb-0 text-warning">{draftCount}</h4>
                  </div>
                  <div className="avatar avatar-md bg-warning-transparent text-warning rounded-circle d-flex align-items-center justify-content-center">
                    <i className="ti ti-file-text fs-20"></i>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-lg-3">
              <div className="card shadow-sm border mb-0">
                <div className="card-body p-3 d-flex align-items-center justify-content-between">
                  <div>
                    <p className="text-muted fs-13 mb-1">Avg Org Rating</p>
                    <h4 className="fw-bold mb-0 text-dark d-flex align-items-center gap-1">
                      {avgScore} <span className="text-warning fs-18">★</span>
                    </h4>
                  </div>
                  <div className="avatar avatar-md bg-info-transparent text-info rounded-circle d-flex align-items-center justify-content-center">
                    <i className="ti ti-star fs-20"></i>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="col-sm-6 col-lg-6">
              <div className="card shadow-sm border mb-0">
                <div className="card-body p-3 d-flex align-items-center justify-content-between">
                  <div>
                    <p className="text-muted fs-13 mb-1">My Completed Appraisals</p>
                    <h4 className="fw-bold mb-0 text-success">{myCompletedCount}</h4>
                  </div>
                  <div className="avatar avatar-md bg-success-transparent text-success rounded-circle d-flex align-items-center justify-content-center">
                    <i className="ti ti-circle-check fs-20"></i>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-lg-6">
              <div className="card shadow-sm border mb-0">
                <div className="card-body p-3 d-flex align-items-center justify-content-between">
                  <div>
                    <p className="text-muted fs-13 mb-1">My Performance Rating</p>
                    <h4 className="fw-bold mb-0 text-dark d-flex align-items-center gap-1">
                      {myAvgScore} <span className="text-warning fs-18">★</span>
                    </h4>
                  </div>
                  <div className="avatar avatar-md bg-info-transparent text-info rounded-circle d-flex align-items-center justify-content-center">
                    <i className="ti ti-star fs-20"></i>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Status Filters (Only for Super Admin and Admin) */}
      {canManageAppraisals && (
        <div className="card shadow-sm border mb-4">
          <div className="card-body p-3 d-flex align-items-center gap-2">
            <button 
              className={`btn btn-sm ${statusFilter === 'All' ? 'btn-primary' : 'btn-light'}`}
              onClick={() => setStatusFilter('All')}
            >
              All ({appraisals.length})
            </button>
            <button 
              className={`btn btn-sm ${statusFilter === 'Completed' ? 'btn-primary' : 'btn-light'}`}
              onClick={() => setStatusFilter('Completed')}
            >
              Completed ({completedCount})
            </button>
            <button 
              className={`btn btn-sm ${statusFilter === 'Draft' ? 'btn-primary' : 'btn-light'}`}
              onClick={() => setStatusFilter('Draft')}
            >
              Draft ({draftCount})
            </button>
          </div>
        </div>
      )}

      {/* Appraisals Table */}
      <div className="card shadow-sm border mb-0">
        <CustomDataTable 
          columns={columns} 
          data={filteredAppraisals} 
          loading={loading}
          pagination
        />
      </div>

      {/* Appraisal Modal */}
      <Modal 
        open={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={isEditMode ? "Edit Performance Appraisal" : "Start New Performance Appraisal"}
        size="lg"
      >
        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label fw-medium">Employee <span className="text-danger">*</span></label>
              <CustomSelect 
                options={employees.map(e => ({ 
                  value: e.name, 
                  label: `${e.name} ${e.department ? `(${e.department})` : e.role ? `(${e.role})` : ''}` 
                }))}
                value={
                  formData.employee_id 
                    ? { value: formData.employee_id, label: getEmployeeName(formData.employee_id) }
                    : null
                }
                onChange={(opt) => setFormData({ ...formData, employee_id: opt ? opt.value : '' })}
                placeholder="Select Employee"
              />
            </div>
            
            <div className="col-md-6">
              <label className="form-label fw-medium">Review Period <span className="text-danger">*</span></label>
              <input 
                type="text" 
                className="form-control" 
                placeholder="e.g. Q1 2026, Annual Review 2026"
                value={formData.review_period}
                onChange={e => setFormData({ ...formData, review_period: e.target.value })}
                required 
              />
            </div>
          </div>

          <div className="card shadow-none border bg-light mt-4 mb-3">
            <div className="card-body">
              <h6 className="card-title fw-bold mb-3 text-primary">Performance Metrics (1 to 5)</h6>
              <div className="d-flex flex-column gap-1">
                {renderRatingInput('Technical Skills / Quality of Work', 'rating_technical')}
                {renderRatingInput('Communication & Teamwork', 'rating_communication')}
                {renderRatingInput('Punctuality & Reliability', 'rating_punctuality')}
                {renderRatingInput('Initiative & Leadership', 'rating_initiative')}
              </div>
              <div className="d-flex justify-content-between align-items-center mt-3 pt-3 border-top">
                <span className="fw-bold text-dark fs-15">Calculated Overall Score:</span>
                <span className="badge bg-dark fs-14 rounded-pill px-3 py-2">
                  {calculateOverallScore(formData)} / 5.0
                </span>
              </div>
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label fw-medium">Notes & Feedback</label>
            <textarea 
              className="form-control" 
              rows="3"
              placeholder="Add review feedback, accomplishments, or areas for improvement..."
              value={formData.note}
              onChange={e => setFormData({ ...formData, note: e.target.value })}
            ></textarea>
          </div>

          <div className="mb-3">
            <label className="form-label fw-medium">Status <span className="text-danger">*</span></label>
            <CustomSelect 
              options={[
                { value: 'Draft', label: 'Draft' },
                { value: 'Completed', label: 'Completed' }
              ]}
              value={{ value: formData.status, label: formData.status }}
              onChange={(opt) => setFormData({ ...formData, status: opt ? opt.value : 'Draft' })}
            />
          </div>

          <div className="d-flex justify-content-end gap-2 mt-4 pt-3 border-top">
            <button type="button" className="btn btn-light" onClick={() => setIsModalOpen(false)}>Cancel</button>
            <button type="submit" className="btn btn-primary" disabled={isSaving}>
              {isSaving ? 'Saving...' : (isEditMode ? 'Update Appraisal' : 'Save Appraisal')}
            </button>
          </div>
        </form>
      </Modal>

      {/* Confirmation Modal for Delete Appraisal */}
      <ConfirmationModal 
        id="delete_appraisal_modal"
        onConfirm={handleConfirmDelete}
        title="Delete Appraisal"
        description={`Are you sure you want to delete appraisal for "${getEmployeeName(appraisalToDelete?.employee_id)} (${appraisalToDelete?.review_period})"? This action cannot be undone.`}
      />
    </div>
  );
}
