import React, { useState, useEffect } from 'react';
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';
import Button from '@/components/common/Button/Button';
import Modal from '@/components/common/Modal/Modal';
import { confirmDialog } from '@/components/common/ConfirmDialog/confirmDialog';
import { hrmsService } from '@/api/services/hrmsService';
import { userService } from '@/api/services/userService';
import toast from 'react-hot-toast';
import dayjs from 'dayjs';

export default function PerformanceAppraisals() {
  const [appraisals, setAppraisals] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({
    employee_id: '',
    review_period: '',
    rating_technical: 0,
    rating_communication: 0,
    rating_punctuality: 0,
    rating_initiative: 0,
    note: '',
    status: 'Draft'
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [appraisalsRes, usersRes] = await Promise.all([
        hrmsService.getAppraisals(),
        userService.getList()
      ]);
      setAppraisals(appraisalsRes || []);
      setUsers(usersRes || []);
    } catch (error) {
      console.error(error);
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

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
        id: appraisal._id || appraisal.id,
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        overall_score: parseFloat(calculateOverallScore(formData))
      };
      
      if (isEditMode) {
        await hrmsService.updateAppraisal(payload.id, payload);
        toast.success('Appraisal updated successfully');
      } else {
        await hrmsService.createAppraisal(payload);
        toast.success('Appraisal created successfully');
      }
      setIsModalOpen(false);
      fetchData();
    } catch (error) {
      console.error(error);
      toast.error(isEditMode ? 'Failed to update appraisal' : 'Failed to create appraisal');
    }
  };

  const handleDelete = async (id) => {
    const isConfirmed = await confirmDialog({ 
      title: "Confirm Delete", 
      text: "Are you sure you want to delete this appraisal?" 
    });
    
    if (isConfirmed) {
      try {
        await hrmsService.deleteAppraisal(id);
        toast.success('Appraisal deleted successfully');
        fetchData();
      } catch (error) {
        console.error(error);
        toast.error('Failed to delete appraisal');
      }
    }
  };

  const getUserName = (userId) => {
    const user = users.find(u => (u._id || u.id) === userId);
    return user ? user.name : 'Unknown';
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
    <div className="d-flex align-items-center justify-content-between p-2 border rounded-3 bg-light">
      <span className="fw-medium">{label}</span>
      <div className="d-flex align-items-center gap-2">
        <input 
          type="range" 
          className="form-range" 
          min="1" 
          max="5" 
          step="1"
          style={{ width: '150px' }}
          value={formData[field]}
          onChange={(e) => setFormData({ ...formData, [field]: parseInt(e.target.value) })}
        />
        <span className="badge bg-primary rounded-pill px-3" style={{ width: '40px' }}>
          {formData[field]}
        </span>
      </div>
    </div>
  );

  return (
    <div className="hrms-panel p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="m-0 fw-bold">Performance Appraisals</h3>
          <p className="text-muted m-0">Track and manage employee reviews and ratings.</p>
        </div>
        <Button variant="primary" onClick={() => openModal()}>
          <FiPlus className="me-2" /> Start New Appraisal
        </Button>
      </div>

      <div className="table-responsive bg-white rounded-3 shadow-sm border">
        <table className="table table-hover align-middle mb-0">
          <thead className="table-light">
            <tr>
              <th>Employee Name</th>
              <th>Review Period</th>
              <th>Overall Score</th>
              <th>Note</th>
              <th>Status</th>
              <th>Date Created</th>
              <th className="text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7" className="text-center py-4 text-muted">Loading appraisals...</td>
              </tr>
            ) : appraisals.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-4 text-muted">No appraisals recorded yet.</td>
              </tr>
            ) : (
              appraisals.map(appraisal => (
                <tr key={appraisal._id || appraisal.id}>
                  <td>
                    <div className="fw-bold">{getUserName(appraisal.employee_id)}</div>
                  </td>
                  <td>{appraisal.review_period}</td>
                  <td>
                    <div className="d-flex align-items-center gap-2">
                      <span className="fw-bold">{appraisal.overall_score}</span>
                      {renderStars(Math.round(appraisal.overall_score))}
                    </div>
                  </td>
                  <td className="text-truncate" style={{ maxWidth: '200px' }}>
                    {appraisal.note || '-'}
                  </td>
                  <td>
                    <span className={`badge ${appraisal.status === 'Completed' ? 'bg-success' : 'bg-warning text-dark'}`}>
                      {appraisal.status}
                    </span>
                  </td>
                  <td>{appraisal.created_at ? dayjs(appraisal.created_at).format('DD MMM YYYY') : '-'}</td>
                  <td className="text-end">
                    <div className="d-flex justify-content-end gap-2">
                      <button className="btn btn-sm btn-outline-primary" onClick={() => openModal(appraisal)}>
                        <FiEdit2 />
                      </button>
                      <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(appraisal._id || appraisal.id)}>
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

      {/* Appraisal Modal */}
      <Modal 
        open={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={isEditMode ? "Edit Appraisal" : "Start New Appraisal"}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label fw-semibold">Employee <span className="text-danger">*</span></label>
              <select 
                className="form-select"
                value={formData.employee_id}
                onChange={e => setFormData({...formData, employee_id: e.target.value})}
                required
              >
                <option value="">Select Employee</option>
                {users.map(u => (
                  <option key={u._id || u.id} value={u._id || u.id}>{u.name} ({u.email})</option>
                ))}
              </select>
            </div>
            
            <div className="col-md-6">
              <label className="form-label fw-semibold">Review Period <span className="text-danger">*</span></label>
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

          <div className="card shadow-sm border-0 bg-light mt-2">
            <div className="card-body">
              <h6 className="card-title fw-bold mb-3 text-primary">Performance Metrics (1 to 5)</h6>
              <div className="d-flex flex-column gap-2">
                {renderRatingInput('Technical Skills / Quality of Work', 'rating_technical')}
                {renderRatingInput('Communication & Teamwork', 'rating_communication')}
                {renderRatingInput('Punctuality & Reliability', 'rating_punctuality')}
                {renderRatingInput('Initiative & Leadership', 'rating_initiative')}
              </div>
              <div className="d-flex justify-content-between align-items-center mt-3 pt-3 border-top">
                <span className="fw-bold">Calculated Overall Score:</span>
                <span className="badge bg-dark fs-6 rounded-pill px-3">
                  {calculateOverallScore(formData)} / 5.0
                </span>
              </div>
            </div>
          </div>

          <div className="mt-2">
            <label className="form-label fw-semibold">Note</label>
            <textarea 
              className="form-control" 
              rows="3"
              placeholder="Add any notes..."
              value={formData.note}
              onChange={e => setFormData({...formData, note: e.target.value})}
            ></textarea>
          </div>

          <div className="mt-2">
            <label className="form-label fw-semibold">Status <span className="text-danger">*</span></label>
            <select 
              className="form-select"
              value={formData.status}
              onChange={e => setFormData({...formData, status: e.target.value})}
              required
            >
              <option value="Draft">Draft</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div className="d-flex justify-content-end gap-2 mt-4 pt-3 border-top">
            <Button variant="outline" type="button" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button variant="primary" type="submit">{isEditMode ? 'Update Appraisal' : 'Save Appraisal'}</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
