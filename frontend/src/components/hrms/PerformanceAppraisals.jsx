import React, { useState, useEffect } from 'react';
import Modal from '../common/Modal';
import CustomSelect from '../common/CustomSelect';
import CustomDataTable from '../common/CustomDataTable';
import toast from 'react-hot-toast';

// Mock Data
const MOCK_USERS = [
  { id: '101', name: 'Adrian', email: 'adrian@example.com' },
  { id: '102', name: 'John Doe', email: 'john@example.com' },
  { id: '103', name: 'Jane Smith', email: 'jane@example.com' }
];

const INITIAL_APPRAISALS = [
  { 
    id: '1', 
    employee_id: '101', 
    review_period: 'Q1 2026', 
    overall_score: 4.5, 
    note: 'Great performance this quarter.', 
    status: 'Completed', 
    created_at: new Date('2026-03-15').toISOString(),
    rating_technical: 5,
    rating_communication: 4,
    rating_punctuality: 5,
    rating_initiative: 4
  },
  { 
    id: '2', 
    employee_id: '102', 
    review_period: 'Annual 2025', 
    overall_score: 3.8, 
    note: 'Needs improvement in communication.', 
    status: 'Draft', 
    created_at: new Date('2025-12-20').toISOString(),
    rating_technical: 4,
    rating_communication: 3,
    rating_punctuality: 4,
    rating_initiative: 4
  }
];

export default function PerformanceAppraisals() {
  const [appraisals, setAppraisals] = useState(INITIAL_APPRAISALS);
  const [users] = useState(MOCK_USERS);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    employee_id: '',
    review_period: '',
    rating_technical: 0,
    rating_communication: 0,
    rating_punctuality: 0,
    rating_initiative: 0,
    note: '',
    status: 'Draft'
  });

  const [themeColor, setThemeColor] = useState('#f26522');
  const [themeColorRgb, setThemeColorRgb] = useState('242, 101, 34');

  useEffect(() => {
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

  const calculateOverallScore = (data) => {
    const total = Number(data.rating_technical) + 
                  Number(data.rating_communication) + 
                  Number(data.rating_punctuality) + 
                  Number(data.rating_initiative);
    return (total / 4).toFixed(1);
  };

  const openModal = (appraisal = null) => {
    if (appraisal) {
      setIsEditMode(true);
      setFormData({
        id: appraisal.id,
        employee_id: appraisal.employee_id || '',
        review_period: appraisal.review_period || '',
        rating_technical: appraisal.rating_technical || 0,
        rating_communication: appraisal.rating_communication || 0,
        rating_punctuality: appraisal.rating_punctuality || 0,
        rating_initiative: appraisal.rating_initiative || 0,
        note: appraisal.note || '',
        status: appraisal.status || 'Draft'
      });
    } else {
      setIsEditMode(false);
      setFormData({
        id: null,
        employee_id: '',
        review_period: '',
        rating_technical: 0,
        rating_communication: 0,
        rating_punctuality: 0,
        rating_initiative: 0,
        note: '',
        status: 'Draft'
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
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
      ...formData,
      overall_score: parseFloat(calculateOverallScore(formData)),
      created_at: new Date().toISOString()
    };

    if (isEditMode) {
      setAppraisals(appraisals.map(a => a.id === formData.id ? payload : a));
      toast.success('Appraisal updated successfully');
    } else {
      const newAppraisal = { ...payload, id: Date.now().toString() };
      setAppraisals([...appraisals, newAppraisal]);
      toast.success('Appraisal created successfully');
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this appraisal?");
    if (isConfirmed) {
      setAppraisals(appraisals.filter(a => a.id !== id));
      toast.success('Appraisal deleted successfully');
    }
  };

  const getUserName = (userId) => {
    const user = users.find(u => u.id === userId);
    return user ? user.name : '-';
  };

  const renderStars = (rating) => {
    return (
      <div className="d-flex align-items-center gap-1">
        {[1, 2, 3, 4, 5].map(star => (
          <span key={star} style={{ color: star <= rating ? '#f59e0b' : '#e5e7eb', fontSize: '1.2rem' }}>
            ★
          </span>
        ))}
      </div>
    );
  };

  const renderRatingInput = (label, field) => (
    <div className="d-flex align-items-center justify-content-between p-3 border rounded-3 bg-light mb-2">
      <span className="fw-medium">{label}</span>
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

  const columns = [
    {
      name: 'Employee Name',
      selectorKey: 'employee_id',
      sortable: true,
      cell: row => <span className="fw-bold">{getUserName(row.employee_id)}</span>
    },
    {
      name: 'Review Period',
      selectorKey: 'review_period',
      sortable: true,
      cell: row => row.review_period
    },
    {
      name: 'Overall Score',
      selectorKey: 'overall_score',
      sortable: true,
      cell: row => (
        <div className="d-flex align-items-center gap-2">
          <span className="fw-bold fs-14">{row.overall_score}</span>
          {renderStars(Math.round(row.overall_score))}
        </div>
      )
    },
    {
      name: 'Note',
      selectorKey: 'note',
      sortable: false,
      cell: row => (
        <div className="text-truncate" style={{ maxWidth: '200px' }} title={row.note}>
          {row.note || '-'}
        </div>
      )
    },
    {
      name: 'Status',
      selectorKey: 'status',
      sortable: true,
      cell: row => (
        <span className={`badge ${row.status === 'Completed' ? 'bg-success-transparent' : 'bg-warning-transparent text-dark'}`}>
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
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h5 className="mb-1 fw-bold text-dark fs-18">Performance Appraisals</h5>
          <p className="text-muted fs-13 mb-0">Track and manage employee reviews and ratings.</p>
        </div>
        <button className="btn btn-primary d-flex align-items-center" onClick={() => openModal()}>
          <i className="ti ti-plus me-1"></i> Start New Appraisal
        </button>
      </div>

      <div className="card shadow-sm border mb-0">
        <CustomDataTable columns={columns} data={appraisals} />
      </div>

      {/* Appraisal Modal */}
      <Modal 
        open={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={isEditMode ? "Edit Appraisal" : "Start New Appraisal"}
        size="lg"
      >
        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label fw-medium">Employee <span className="text-danger">*</span></label>
              <CustomSelect 
                options={users.map(u => ({ value: u.id, label: `${u.name} (${u.email})` }))}
                value={formData.employee_id ? { value: formData.employee_id, label: getUserName(formData.employee_id) } : null}
                onChange={(opt) => setFormData({...formData, employee_id: opt ? opt.value : ''})}
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
                onChange={e => setFormData({...formData, review_period: e.target.value})}
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
            <label className="form-label fw-medium">Note</label>
            <textarea 
              className="form-control" 
              rows="3"
              placeholder="Add any notes..."
              value={formData.note}
              onChange={e => setFormData({...formData, note: e.target.value})}
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
              onChange={(opt) => setFormData({...formData, status: opt.value})}
            />
          </div>

          <div className="d-flex justify-content-end gap-2 mt-4 pt-3 border-top">
            <button type="button" className="btn btn-light" onClick={() => setIsModalOpen(false)}>Cancel</button>
            <button type="submit" className="btn btn-primary">{isEditMode ? 'Update Appraisal' : 'Save Appraisal'}</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
