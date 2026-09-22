import React, { useState } from 'react';
import Modal from '../common/Modal';
import CustomSelect from '../common/CustomSelect';

const INITIAL_STATE = {
  contact_name: "", company_name: "", contact_number: "", email: "",
  address: "", city: "", state: "", country: "", gstin: "",
  department: "", status: "active", tags: "", notes: ""
};

export default function ContactFormModal({ open, onClose }) {
  const [formData, setFormData] = useState(INITIAL_STATE);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name) => (selected) => {
    setFormData(prev => ({ ...prev, [name]: selected ? selected.value : "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Contact form submitted: ", formData);
    onClose();
  };

  const getSelectValue = (val) => {
    if (!val) return null;
    return { value: val, label: val.charAt(0).toUpperCase() + val.slice(1).replace('_', ' ') };
  };

  return (
    <Modal 
      open={open} 
      onClose={onClose} 
      title="Create New Contact" 
      size="lg"
      footer={
        <div className="d-flex align-items-center justify-content-end w-100">
          <button type="button" className="btn btn-light me-2" onClick={onClose}>Cancel</button>
          <button type="button" className="btn btn-primary" onClick={handleSubmit}>Create Contact</button>
        </div>
      }
    >
      <form onSubmit={handleSubmit}>
        
        <h6 className="fw-semibold mb-3 text-primary">Basic Information</h6>
        <div className="row g-3 mb-4">
          <div className="col-md-6">
            <label className="form-label">Contact Persona Name <span className="text-danger">*</span></label>
            <input type="text" className="form-control" name="contact_name" value={formData.contact_name} onChange={handleChange} required />
          </div>
          <div className="col-md-6">
            <label className="form-label">Company Name <span className="text-danger">*</span></label>
            <input type="text" className="form-control" name="company_name" value={formData.company_name} onChange={handleChange} required />
          </div>
          <div className="col-md-6">
            <label className="form-label">Contact Number <span className="text-danger">*</span></label>
            <input type="text" className="form-control" name="contact_number" value={formData.contact_number} onChange={handleChange} required />
          </div>
          <div className="col-md-6">
            <label className="form-label">Email Address <span className="text-danger">*</span></label>
            <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} required />
          </div>
        </div>

        <h6 className="fw-semibold mb-3 text-primary">Address Information</h6>
        <div className="row g-3 mb-4">
          <div className="col-12">
            <label className="form-label">Full Address</label>
            <input type="text" className="form-control" name="address" value={formData.address} onChange={handleChange} />
          </div>
          <div className="col-md-4">
            <label className="form-label">City</label>
            <input type="text" className="form-control" name="city" value={formData.city} onChange={handleChange} />
          </div>
          <div className="col-md-4">
            <label className="form-label">State</label>
            <input type="text" className="form-control" name="state" value={formData.state} onChange={handleChange} />
          </div>
          <div className="col-md-4">
            <label className="form-label">Country</label>
            <input type="text" className="form-control" name="country" value={formData.country} onChange={handleChange} />
          </div>
        </div>

        <h6 className="fw-semibold mb-3 text-primary">Additional Details</h6>
        <div className="row g-3 mb-2">
          <div className="col-md-6">
            <label className="form-label">GSTIN</label>
            <input type="text" className="form-control" name="gstin" value={formData.gstin} onChange={handleChange} placeholder="e.g. 22AAAAA0000A1Z5" />
          </div>
          <div className="col-md-6">
            <label className="form-label">Department</label>
            <div className="custom-select-wrapper">
              <CustomSelect 
                className="select" 
                value={getSelectValue(formData.department)} 
                onChange={handleSelectChange('department')}
              >
                <option value="IT">IT</option>
                <option value="Sales">Sales</option>
                <option value="Marketing">Marketing</option>
                <option value="HR">HR</option>
                <option value="Finance">Finance</option>
                <option value="Operations">Operations</option>
              </CustomSelect>
            </div>
          </div>
          <div className="col-md-6">
            <label className="form-label">Contact Status <span className="text-danger">*</span></label>
            <div className="custom-select-wrapper">
              <CustomSelect 
                className="select" 
                value={getSelectValue(formData.status)} 
                onChange={handleSelectChange('status')}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </CustomSelect>
            </div>
          </div>
          <div className="col-md-6">
            <label className="form-label">Tags (comma-separated)</label>
            <input type="text" className="form-control" name="tags" value={formData.tags} onChange={handleChange} />
          </div>
          <div className="col-12">
            <label className="form-label">Notes</label>
            <textarea className="form-control" rows="3" name="notes" value={formData.notes} onChange={handleChange}></textarea>
          </div>
        </div>
      </form>
    </Modal>
  );
}
