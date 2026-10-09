import React, { useState, useEffect } from 'react';
import Modal from '../common/Modal';
import CustomSelect from '../common/CustomSelect';
import CustomDatePicker from '../common/CustomDatePicker';

const LeaveForm = ({ open, onClose, onSubmit, editingData = null }) => {
  const [formData, setFormData] = useState({
    leave_type: '',
    day_type: '',
    start_date: null,
    end_date: null,
    reason: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingData && open) {
      setFormData({
        leave_type: editingData.leave_type || '',
        day_type: editingData.day_type || '',
        start_date: editingData.start_date ? new Date(editingData.start_date) : null,
        end_date: editingData.end_date ? new Date(editingData.end_date) : null,
        reason: editingData.reason || ''
      });
      setErrors({});
    } else if (!open) {
      setFormData({
        leave_type: '',
        day_type: '',
        start_date: null,
        end_date: null,
        reason: ''
      });
      setErrors({});
    }
  }, [editingData, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
  };

  const handleSelectChange = (field) => (selected) => {
    const value = selected ? selected.value : '';
    setFormData(prev => {
      const newData = { ...prev, [field]: value };
      if (field === 'leave_type' && value === 'Monthly Leave') {
        newData.day_type = 'Full Day';
      }
      return newData;
    });
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: null }));
  };

  const handleDateChange = (field) => (date) => {
    setFormData(prev => ({ ...prev, [field]: date }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: null }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.leave_type) newErrors.leave_type = 'Leave Type is required';
    if (!formData.day_type) newErrors.day_type = 'Day Type is required';
    if (!formData.start_date) newErrors.start_date = 'Start Date is required';
    if (!formData.end_date) newErrors.end_date = 'End Date is required';
    if (!formData.reason) newErrors.reason = 'Reason is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const formatDate = (date) => date ? new Date(date).toISOString().split('T')[0] : '';
    
    const getCalculatedDays = () => {
      if (!formData.start_date || !formData.end_date) return 0;
      const s = new Date(formData.start_date);
      const end = new Date(formData.end_date);
      let days = Math.round((end - s) / (1000 * 60 * 60 * 24)) + 1;
      if (days < 1) days = 0;
      if ((formData.day_type === 'First Half' || formData.day_type === 'Second Half') && days === 1) {
         days = 0.5;
      }
      return days;
    };
    
    const days = getCalculatedDays();

    onSubmit({
      ...formData,
      ...(editingData ? { id: editingData._id } : {}),
      start_date: formatDate(formData.start_date),
      end_date: formatDate(formData.end_date),
      days,
      status: editingData ? editingData.status : 'Pending'
    });

    // Reset
    setFormData({
      leave_type: '',
      day_type: '',
      start_date: null,
      end_date: null,
      reason: ''
    });
  };

  const calculatedDays = (() => {
    if (!formData.start_date || !formData.end_date) return 0;
    const s = new Date(formData.start_date);
    const end = new Date(formData.end_date);
    let d = Math.round((end - s) / (1000 * 60 * 60 * 24)) + 1;
    if (d < 1) d = 0;
    if ((formData.day_type === 'First Half' || formData.day_type === 'Second Half') && d === 1) {
       d = 0.5;
    }
    return d;
  })();

  return (
    <Modal open={open} onClose={onClose} title="Add Leave Request" size="md">
      <form onSubmit={handleSubmit}>
        <div className="row g-3">
          <div className="col-12">
            <label className="form-label">Leave Type <span className="text-danger">*</span></label>
            <CustomSelect
              options={[
                { value: 'Monthly Leave', label: 'Monthly Leave' },
                { value: 'Sick Leave', label: 'Sick Leave' },
                { value: 'Casual Leave', label: 'Casual Leave' },
                
                { value: 'Other', label: 'Other' }
              ]}
              value={formData.leave_type ? { value: formData.leave_type, label: formData.leave_type } : null}
              onChange={handleSelectChange('leave_type')}
              placeholder="Select Leave Type"
            />
            {errors.leave_type && <div className="text-danger fs-12 mt-1">{errors.leave_type}</div>}
          </div>

          <div className="col-12">
            <label className="form-label">Day Type <span className="text-danger">*</span></label>
            <CustomSelect
              options={[
                { value: 'Full Day', label: 'Full Day' },
                { value: 'First Half', label: 'First Half' },
                { value: 'Second Half', label: 'Second Half' }
              ]}
              value={formData.day_type ? { value: formData.day_type, label: formData.day_type } : null}
              onChange={handleSelectChange('day_type')}
              placeholder="Select Day Type"
              isDisabled={formData.leave_type === 'Monthly Leave'}
            />
            {errors.day_type && <div className="text-danger fs-12 mt-1">{errors.day_type}</div>}
          </div>

          <div className="col-md-6">
            <label className="form-label">From Date <span className="text-danger">*</span></label>
            <div className={`date-picker-wrapper ${errors.start_date ? 'is-invalid' : ''}`}>
              <CustomDatePicker
                selected={formData.start_date}
                onChange={handleDateChange('start_date')}
                className={`form-control ${errors.start_date ? 'is-invalid' : ''}`}
                placeholderText="Select Date"
              />
            </div>
            {errors.start_date && <div className="invalid-feedback d-block">{errors.start_date}</div>}
          </div>

          <div className="col-md-6">
            <label className="form-label">To Date <span className="text-danger">*</span></label>
            <div className={`date-picker-wrapper ${errors.end_date ? 'is-invalid' : ''}`}>
              <CustomDatePicker
                selected={formData.end_date}
                onChange={handleDateChange('end_date')}
                className={`form-control ${errors.end_date ? 'is-invalid' : ''}`}
                placeholderText="Select Date"
                minDate={formData.start_date}
              />
            </div>
            {errors.end_date && <div className="invalid-feedback d-block">{errors.end_date}</div>}
          </div>

          <div className="col-12 mt-2">
            <div className="d-flex align-items-center bg-light p-3 rounded border border-dashed">
              <span className="fw-medium me-2 text-dark">Total Days Calculated:</span>
              <span className="badge bg-primary fs-14 px-3 py-2">{calculatedDays} {calculatedDays <= 1 ? 'Day' : 'Days'}</span>
            </div>
          </div>

          <div className="col-12">
            <label className="form-label">Reason <span className="text-danger">*</span></label>
            <textarea
              className={`form-control ${errors.reason ? 'is-invalid' : ''}`}
              name="reason"
              rows="3"
              value={formData.reason}
              onChange={handleChange}
              placeholder="Reason for leave"
            ></textarea>
            {errors.reason && <div className="invalid-feedback">{errors.reason}</div>}
          </div>
        </div>
        
        <div className="d-flex justify-content-end gap-2 mt-4">
          <button type="button" className="btn btn-light" onClick={onClose}>Cancel</button>
          <button type="submit" className="btn btn-primary">{editingData ? 'Update Leave' : 'Submit'}</button>
        </div>
      </form>
    </Modal>
  );
};

export default LeaveForm;
