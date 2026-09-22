import React, { useState } from 'react';
import Modal from '../common/Modal';
import CustomSelect from '../common/CustomSelect';
import CustomDatePicker from '../common/CustomDatePicker';

const LeaveForm = ({ open, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    employee_name: '',
    leave_type: '',
    start_date: null,
    end_date: null,
    reason: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
  };

  const handleSelectChange = (field) => (selected) => {
    setFormData(prev => ({ ...prev, [field]: selected ? selected.value : '' }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: null }));
  };

  const handleDateChange = (field) => (date) => {
    setFormData(prev => ({ ...prev, [field]: date }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: null }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.employee_name) newErrors.employee_name = 'Employee Name is required';
    if (!formData.leave_type) newErrors.leave_type = 'Leave Type is required';
    if (!formData.start_date) newErrors.start_date = 'Start Date is required';
    if (!formData.end_date) newErrors.end_date = 'End Date is required';
    if (!formData.reason) newErrors.reason = 'Reason is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const formatDate = (date) => date ? new Date(date).toISOString().split('T')[0] : '';
    
    // Calculate days mock
    const s = new Date(formData.start_date);
    const end = new Date(formData.end_date);
    let days = Math.round((end - s) / (1000 * 60 * 60 * 24)) + 1;
    if (days < 1) days = 1;

    onSubmit({
      ...formData,
      id: Date.now(),
      start_date: formatDate(formData.start_date),
      end_date: formatDate(formData.end_date),
      days,
      status: 'Pending'
    });

    // Reset
    setFormData({
      employee_name: '',
      leave_type: '',
      start_date: null,
      end_date: null,
      reason: ''
    });
  };

  return (
    <Modal open={open} onClose={onClose} title="Add Leave Request" size="md">
      <form onSubmit={handleSubmit}>
        <div className="row g-3">
          <div className="col-12">
            <label className="form-label">Employee Name <span className="text-danger">*</span></label>
            <input
              type="text"
              className={`form-control ${errors.employee_name ? 'is-invalid' : ''}`}
              name="employee_name"
              value={formData.employee_name}
              onChange={handleChange}
              placeholder="e.g. Anthony Lewis"
            />
            {errors.employee_name && <div className="invalid-feedback">{errors.employee_name}</div>}
          </div>

          <div className="col-12">
            <label className="form-label">Leave Type <span className="text-danger">*</span></label>
            <CustomSelect
              options={[
                { value: 'Sick Leave', label: 'Sick Leave' },
                { value: 'Casual Leave', label: 'Casual Leave' },
                { value: 'Annual Leave', label: 'Annual Leave' }
              ]}
              value={formData.leave_type ? { value: formData.leave_type, label: formData.leave_type } : null}
              onChange={handleSelectChange('leave_type')}
              placeholder="Select Leave Type"
            />
            {errors.leave_type && <div className="text-danger fs-12 mt-1">{errors.leave_type}</div>}
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
          <button type="submit" className="btn btn-primary">Submit</button>
        </div>
      </form>
    </Modal>
  );
};

export default LeaveForm;
