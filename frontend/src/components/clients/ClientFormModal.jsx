import React, { useState } from 'react';
import Modal from '../common/Modal';
import CustomSelect from '../common/CustomSelect';

const INITIAL_STATE = {
  client_name: "", client_role: "", company_name: "", phone: "", email: "",
  address: "", city: "", state: "", country: "", gstin: "",
  website: "", status: "active", tags: "", notes: ""
};

export default function ClientFormModal({ open, onClose }) {
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
    console.log("Client form submitted: ", formData);
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
      title="Add New Client" 
      size="lg"
      footer={
        <div className="d-flex align-items-center justify-content-end w-100">
          <button type="button" className="btn btn-light me-2" onClick={onClose}>Cancel</button>
          <button type="button" className="btn btn-primary" onClick={handleSubmit}>Add Client</button>
        </div>
      }
    >
      <form onSubmit={handleSubmit}>
        
        <h6 className="fw-semibold mb-3 text-primary">Basic Information</h6>
        <div className="row g-3 mb-4">
          <div className="col-md-6">
            <label className="form-label">Client Name <span className="text-danger">*</span></label>
            <input type="text" className="form-control" name="client_name" value={formData.client_name} onChange={handleChange} required />
          </div>
          <div className="col-md-6">
            <label className="form-label">Client Role/Designation</label>
            <input type="text" className="form-control" name="client_role" value={formData.client_role} onChange={handleChange} placeholder="e.g. CEO, Manager" />
          </div>
          <div className="col-md-6">
            <label className="form-label">Company Name <span className="text-danger">*</span></label>
            <input type="text" className="form-control" name="company_name" value={formData.company_name} onChange={handleChange} required />
          </div>
          <div className="col-md-6">
            <label className="form-label">Phone <span className="text-danger">*</span></label>
            <input type="text" className="form-control" name="phone" value={formData.phone} onChange={handleChange} required />
          </div>
          <div className="col-md-6">
            <label className="form-label">Email ID <span className="text-danger">*</span></label>
            <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="col-md-6">
            <label className="form-label">Website</label>
            <input type="url" className="form-control" name="website" value={formData.website} onChange={handleChange} />
          </div>
        </div>

        <h6 className="fw-semibold mb-3 text-primary">Address Information</h6>
        <div className="row g-3 mb-4">
          <div className="col-md-12">
            <label className="form-label">Full Address</label>
            <textarea className="form-control" rows="2" name="address" value={formData.address} onChange={handleChange}></textarea>
          </div>
          <div className="col-md-6">
            <label className="form-label">City</label>
            <input type="text" className="form-control" name="city" value={formData.city} onChange={handleChange} />
          </div>
          <div className="col-md-6">
            <label className="form-label">State / Province</label>
            <input type="text" className="form-control" name="state" value={formData.state} onChange={handleChange} />
          </div>
          <div className="col-md-6">
            <label className="form-label">Country</label>
            <input type="text" className="form-control" name="country" value={formData.country} onChange={handleChange} />
          </div>
          <div className="col-md-6">
            <label className="form-label">GSTIN / Tax Number</label>
            <input type="text" className="form-control" name="gstin" value={formData.gstin} onChange={handleChange} />
          </div>
        </div>

        <h6 className="fw-semibold mb-3 text-primary">Additional Details</h6>
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Status</label>
            <div className="custom-select-wrapper">
              <CustomSelect 
                options={[
                  { value: 'active', label: 'Active' },
                  { value: 'inactive', label: 'Inactive' }
                ]}
                value={getSelectValue(formData.status)}
                onChange={handleSelectChange('status')}
              />
            </div>
          </div>
          <div className="col-md-6">
            <label className="form-label">Tags</label>
            <div className="custom-select-wrapper">
              <CustomSelect 
                options={[
                  { value: 'vip', label: 'VIP' },
                  { value: 'new', label: 'New Client' },
                  { value: 'referral', label: 'Referral' }
                ]}
                value={getSelectValue(formData.tags)}
                onChange={handleSelectChange('tags')}
              />
            </div>
          </div>
          <div className="col-md-12">
            <label className="form-label">Notes</label>
            <textarea className="form-control" rows="3" name="notes" value={formData.notes} onChange={handleChange}></textarea>
          </div>
        </div>
      </form>
    </Modal>
  );
}
