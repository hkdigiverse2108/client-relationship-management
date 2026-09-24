import React, { useState } from 'react';
import Modal from '../common/Modal';
import CustomSelect from '../common/CustomSelect';
import axiosClient from '../../api/axiosClient';
import toast from 'react-hot-toast';
import ConfirmationModal from '../ConfirmationModal';

const INITIAL_STATE = {
  contact_name: "", company_name: "", contact_number: "", email: "",
  address: "", city: "", state: "", country: "", gstin: "",
  department: "", status: "active", tags: "", notes: ""
};

export default function ContactFormModal({ open, onClose, onSuccess, contactData = null }) {
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [errors, setErrors] = useState({});
  const [mergeCandidateId, setMergeCandidateId] = useState(null);

  React.useEffect(() => {
    if (open) {
      if (contactData) {
        setFormData({
          contact_name: contactData.contact_name || "",
          company_name: contactData.company_name || "",
          contact_number: contactData.contact_number || "",
          email: contactData.email || "",
          address: contactData.address || "",
          city: contactData.city || "",
          state: contactData.state || "",
          country: contactData.country || "",
          gstin: contactData.gstin || "",
          department: contactData.department || "",
          status: contactData.status || "active",
          tags: contactData.tags || "",
          notes: contactData.notes || ""
        });
      } else {
        setFormData(INITIAL_STATE);
      }
      setErrors({});
    }
  }, [open, contactData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSelectChange = (name) => (selected) => {
    setFormData(prev => ({ ...prev, [name]: selected ? selected.value : "" }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    const newErrors = {};
    if (!formData.contact_name?.trim()) newErrors.contact_name = 'Contact Persona Name is required';
    if (!formData.company_name?.trim()) newErrors.company_name = 'Company Name is required';
    if (!formData.contact_number?.trim()) newErrors.contact_number = 'Contact Number is required';
    if (!formData.email?.trim()) newErrors.email = 'Email Address is required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      if (contactData && contactData._id) {
        await axiosClient.put(`/contacts/${contactData._id}`, formData);
        toast.success('Contact updated successfully');
      } else {
        await axiosClient.post('/contacts', formData);
        toast.success('Contact created successfully');
      }
      setFormData(INITIAL_STATE);
      if (onSuccess) onSuccess();
      onClose();
    } catch (error) {
      console.error("Error saving contact:", error);
      
      // Handle Conflict (Merge)
      if (error.status === 409 && error.raw?.response?.data?.detail?.merge_candidate_id) {
        setMergeCandidateId(error.raw.response.data.detail.merge_candidate_id);
        return;
      }
      
      // Show actual error message (e.g. from 400 Bad Request)
      const msg = typeof error.message === 'string' ? error.message : error.raw?.response?.data?.detail?.message || "Failed to save contact";
      toast.error(msg);
    }
  };

  const handleMergeConfirm = async () => {
    if (!mergeCandidateId) return;
    try {
      await axiosClient.put(`/contacts/${mergeCandidateId}`, formData);
      toast.success('Contact merged successfully');
      setFormData(INITIAL_STATE);
      if (onSuccess) onSuccess();
      onClose();
    } catch (error) {
      console.error("Error merging contact:", error);
      const msg = typeof error.message === 'string' ? error.message : "Failed to merge contact";
      toast.error(msg);
    }
  };

  const getSelectValue = (val) => {
    if (!val) return null;
    return { value: val, label: val.charAt(0).toUpperCase() + val.slice(1).replace('_', ' ') };
  };

  return (

    <>
    <Modal 
      open={open} 
      onClose={() => {
        setMergeCandidateId(null);
        onClose();
      }} 
      title={mergeCandidateId ? "Merge Contact" : (contactData ? "Edit Contact" : "Create New Contact")} 
      size="lg"
      footer={
        mergeCandidateId ? (
          <div className="d-flex align-items-center justify-content-center w-100">
            <button type="button" className="btn btn-light me-3" onClick={() => setMergeCandidateId(null)}>Cancel</button>
            <button type="button" className="btn btn-primary" onClick={handleMergeConfirm}>
              <i className="ti ti-layers-intersect me-2"></i>Yes, Merge
            </button>
          </div>
        ) : (
          <div className="d-flex align-items-center justify-content-end w-100">
            <button type="button" className="btn btn-light me-2" onClick={onClose}>Cancel</button>
            <button type="button" className="btn btn-primary" onClick={handleSubmit}>{contactData ? "Save Changes" : "Create Contact"}</button>
          </div>
        )
      }
    >
      {mergeCandidateId ? (
        <div className="text-center py-4">
          <span className="avatar avatar-xl bg-transparent-primary text-primary mb-3">
            <i className="ti ti-layers-intersect fs-36"></i>
          </span>
          <h4 className="mb-2">Merge Contact</h4>
          <p className="mb-0 text-muted">
            A contact with this mobile number and email already exists.<br/>
            Do you want to merge these new details into the existing contact?
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
        
        <h6 className="fw-semibold mb-3 text-primary">Basic Information</h6>
        <div className="row g-3 mb-4">
          <div className="col-md-6">
            <label className="form-label">Contact Persona Name <span className="text-danger">*</span></label>
            <input type="text" className={`form-control ${errors.contact_name ? 'is-invalid' : ''}`} name="contact_name" value={formData.contact_name} onChange={handleChange} />
            {errors.contact_name && <div className="invalid-feedback">{errors.contact_name}</div>}
          </div>
          <div className="col-md-6">
            <label className="form-label">Company Name <span className="text-danger">*</span></label>
            <input type="text" className={`form-control ${errors.company_name ? 'is-invalid' : ''}`} name="company_name" value={formData.company_name} onChange={handleChange} />
            {errors.company_name && <div className="invalid-feedback">{errors.company_name}</div>}
          </div>
          <div className="col-md-6">
            <label className="form-label">Contact Number <span className="text-danger">*</span></label>
            <input type="text" className={`form-control ${errors.contact_number ? 'is-invalid' : ''}`} name="contact_number" value={formData.contact_number} onChange={handleChange} />
            {errors.contact_number && <div className="invalid-feedback">{errors.contact_number}</div>}
          </div>
          <div className="col-md-6">
            <label className="form-label">Email Address <span className="text-danger">*</span></label>
            <input type="email" className={`form-control ${errors.email ? 'is-invalid' : ''}`} name="email" value={formData.email} onChange={handleChange} />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
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
            <label className="form-label">Contact Status</label>
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
      )}
    </Modal>
    </>
);
}
