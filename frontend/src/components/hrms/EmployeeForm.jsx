import React, { useState, useEffect } from 'react';
import Modal from '../common/Modal';
import CustomSelect from '../common/CustomSelect';
import CustomDatePicker from '../common/CustomDatePicker';

const EmployeeForm = ({ isOpen, onClose, onSubmit, editingData = null }) => {
  const [formData, setFormData] = useState({
    id: null,
    employee_id: `EMP-${Math.floor(1000 + Math.random() * 9000)}`,
    name: '',
    email: '',
    phone: '',
    role: 'sales',
    designation: '',
    department: '',
    joining_date: new Date(),
    manager_id: '',
    attendance_status: 'Present',
    gender: '',
    dob: null,
    basic_salary: '',
    hra_allowance: '',
    special_allowances: '',
    is_active: true
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      if (editingData) {
        setFormData({ ...editingData });
      } else {
        setFormData({
          id: null,
          employee_id: `EMP-${Math.floor(1000 + Math.random() * 9000)}`,
          name: '',
          email: '',
          phone: '',
          role: 'sales',
          designation: '',
          department: '',
          joining_date: new Date(),
          manager_id: '',
          attendance_status: 'Present',
          gender: '',
          dob: null,
          basic_salary: '',
          hra_allowance: '',
          special_allowances: '',
          is_active: true
        });
      }
      setErrors({});
    }
  }, [isOpen, editingData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSelectChange = (field) => (selectedOption) => {
    setFormData((prev) => ({ ...prev, [field]: selectedOption ? selectedOption.value : '' }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const handleDateChange = (field) => (date) => {
    setFormData((prev) => ({ ...prev, [field]: date }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.name?.trim()) newErrors.name = 'Full Name is required';
    if (!formData.email?.trim()) newErrors.email = 'Email Address is required';
    if (!formData.phone?.trim()) newErrors.phone = 'Mobile Number is required';
    if (!formData.designation?.trim()) newErrors.designation = 'Designation is required';
    if (!formData.department?.trim()) newErrors.department = 'Department is required';
    if (!formData.joining_date) newErrors.joining_date = 'Joining Date is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.dob) newErrors.dob = 'Date of Birth is required';
    if (!formData.basic_salary) newErrors.basic_salary = 'Basic Salary is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Submit mock data
    const formatDate = (date) => date ? new Date(date).toISOString().split('T')[0] : '';
    onSubmit({
      ...formData,
      id: formData.id || Date.now(),
      joining_date: formatDate(formData.joining_date),
      dob: formatDate(formData.dob),
      basic_salary: parseFloat(formData.basic_salary) || 0,
      hra_allowance: parseFloat(formData.hra_allowance) || 0,
      special_allowances: parseFloat(formData.special_allowances) || 0
    });
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      title={editingData ? 'Edit Employee' : 'Add New Employee'}
      size="lg"
    >
      <form onSubmit={handleSubmit}>
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Employee ID</label>
            <input
              type="text"
              className="form-control bg-light"
              name="employee_id"
              value={formData.employee_id}
              disabled
              readOnly
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Full Name <span className="text-danger">*</span></label>
            <input
              type="text"
              className={`form-control ${errors.name ? 'is-invalid' : ''}`}
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. John Doe"
            />
            {errors.name && <div className="invalid-feedback">{errors.name}</div>}
          </div>

          <div className="col-md-6">
            <label className="form-label">Email Address <span className="text-danger">*</span></label>
            <input
              type="email"
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="e.g. john@example.com"
            />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>

          <div className="col-md-6">
            <label className="form-label">Mobile Number <span className="text-danger">*</span></label>
            <input
              type="text"
              className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="e.g. +1 234 567 8900"
            />
            {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
          </div>

          <div className="col-md-6">
            <label className="form-label">System Role</label>
            <CustomSelect
              options={[
                { value: 'Super Admin', label: 'Super Admin' },
                { value: 'admin', label: 'Admin' },
                { value: 'HR', label: 'HR' },
                { value: 'manager', label: 'Manager' },
                { value: 'sales', label: 'Sales' },
                { value: 'support', label: 'Support' }
              ]}
              value={{ value: formData.role, label: formData.role.charAt(0).toUpperCase() + formData.role.slice(1) }}
              onChange={handleSelectChange('role')}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Designation <span className="text-danger">*</span></label>
            <input
              type="text"
              className={`form-control ${errors.designation ? 'is-invalid' : ''}`}
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              placeholder="e.g. Senior Developer"
            />
            {errors.designation && <div className="invalid-feedback">{errors.designation}</div>}
          </div>

          <div className="col-md-6">
            <label className="form-label">Department <span className="text-danger">*</span></label>
            <input
              type="text"
              className={`form-control ${errors.department ? 'is-invalid' : ''}`}
              name="department"
              value={formData.department}
              onChange={handleChange}
              placeholder="e.g. Engineering"
            />
            {errors.department && <div className="invalid-feedback">{errors.department}</div>}
          </div>

          <div className="col-md-6">
            <label className="form-label">Joining Date <span className="text-danger">*</span></label>
            <div className={`date-picker-wrapper ${errors.joining_date ? 'is-invalid' : ''}`}>
              <CustomDatePicker
                selected={formData.joining_date ? new Date(formData.joining_date) : null}
                onChange={handleDateChange('joining_date')}
                className={`form-control ${errors.joining_date ? 'is-invalid' : ''}`}
                placeholderText="Select Joining Date"
              />
            </div>
            {errors.joining_date && <div className="invalid-feedback d-block">{errors.joining_date}</div>}
          </div>

          <div className="col-md-6">
            <label className="form-label">Reporting Manager</label>
            <CustomSelect
              options={[
                { value: 'Manager 1', label: 'Manager 1' },
                { value: 'Manager 2', label: 'Manager 2' }
              ]}
              value={formData.manager_id ? { value: formData.manager_id, label: formData.manager_id } : null}
              onChange={handleSelectChange('manager_id')}
              placeholder="Select Manager"
              isClearable
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Attendance Status</label>
            <CustomSelect
              options={[
                { value: 'Present', label: 'Present' },
                { value: 'Absent', label: 'Absent' },
                { value: 'On Leave', label: 'On Leave' }
              ]}
              value={{ value: formData.attendance_status, label: formData.attendance_status }}
              onChange={handleSelectChange('attendance_status')}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Gender <span className="text-danger">*</span></label>
            <CustomSelect
              options={[
                { value: 'Male', label: 'Male' },
                { value: 'Female', label: 'Female' },
                { value: 'Other', label: 'Other' }
              ]}
              value={formData.gender ? { value: formData.gender, label: formData.gender } : null}
              onChange={handleSelectChange('gender')}
              placeholder="Select Gender"
            />
            {errors.gender && <div className="invalid-feedback d-block">{errors.gender}</div>}
          </div>

          <div className="col-md-6">
            <label className="form-label">Date of Birth <span className="text-danger">*</span></label>
            <div className={`date-picker-wrapper ${errors.dob ? 'is-invalid' : ''}`}>
              <CustomDatePicker
                selected={formData.dob ? new Date(formData.dob) : null}
                onChange={handleDateChange('dob')}
                className={`form-control ${errors.dob ? 'is-invalid' : ''}`}
                placeholderText="Select Date of Birth"
              />
            </div>
            {errors.dob && <div className="invalid-feedback d-block">{errors.dob}</div>}
          </div>

          <div className="col-md-4">
            <label className="form-label">Basic Salary (₹) <span className="text-danger">*</span></label>
            <input
              type="number"
              className={`form-control ${errors.basic_salary ? 'is-invalid' : ''}`}
              name="basic_salary"
              value={formData.basic_salary}
              onChange={handleChange}
              placeholder="e.g. 50000"
            />
            {errors.basic_salary && <div className="invalid-feedback">{errors.basic_salary}</div>}
          </div>

          <div className="col-md-4">
            <label className="form-label">HRA Allowance (₹)</label>
            <input
              type="number"
              className="form-control"
              name="hra_allowance"
              value={formData.hra_allowance}
              onChange={handleChange}
              placeholder="e.g. 10000"
            />
          </div>

          <div className="col-md-4">
            <label className="form-label">Special Allowances (₹)</label>
            <input
              type="number"
              className="form-control"
              name="special_allowances"
              value={formData.special_allowances}
              onChange={handleChange}
              placeholder="e.g. 5000"
            />
          </div>
        </div>

        <div className="d-flex justify-content-end gap-2 mt-4">
          <button type="button" className="btn btn-light" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            {editingData ? 'Save Changes' : 'Save Employee'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EmployeeForm;
