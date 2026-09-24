import React, { useState, useEffect } from 'react';
import Modal from '../common/Modal';
import CustomSelect from '../common/CustomSelect';
import axiosClient from '../../api/axiosClient';
import toast from 'react-hot-toast';

const INITIAL_STATE = {
  client_name: "", company_name: "", contact_person: "",
  mobile_number: "", alternate_number: "", email: "", website: "",
  industry: "", customer_type: "individual", status: "active",
  assigned_to: "", address: "", city: "", state: "", country: "", pincode: "",
  contract_value: "", requirement: "", notes: "", converted_from_lead_id: "Manual"
};

export default function ClientFormModal({ open, onClose, onSuccess, clientData = null }) {
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [errors, setErrors] = useState({});
  const [users, setUsers] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (open) {
      if (clientData) {
        setFormData({
          ...INITIAL_STATE,
          ...clientData
        });
      } else {
        setFormData(INITIAL_STATE);
      }
      setErrors({});
      fetchUsers();
    }
  }, [clientData, open]);

  const fetchUsers = async () => {
    try {
      const res = await axiosClient.get('/users');
      setUsers(res || []);
    } catch (error) {
      console.error("Failed to fetch users", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleSelectChange = (name) => (selected) => {
    setFormData(prev => ({ ...prev, [name]: selected ? selected.value : "" }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.client_name?.trim()) newErrors.client_name = "Client Name is required";
    if (!formData.company_name?.trim()) newErrors.company_name = "Company Name is required";
    if (!formData.mobile_number?.trim()) newErrors.mobile_number = "Mobile Number is required";
    if (!formData.email?.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Invalid email format";
    if (!formData.assigned_to) newErrors.assigned_to = "Account Manager is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    try {
      const payload = { ...formData };
      if (payload.contract_value === "") {
        payload.contract_value = null;
      }
      
      if (clientData && clientData._id) {
        await axiosClient.put(`/clients/${clientData._id}`, payload);
        toast.success("Client updated successfully");
      } else {
        await axiosClient.post('/clients', payload);
        toast.success("Client added successfully");
      }
      if (onSuccess) onSuccess();
      onClose();
    } catch (error) {
      console.error("Error saving client:", error);
      toast.error(error.response?.data?.detail?.[0]?.msg || error.response?.data?.detail || "Failed to save client");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getSelectValue = (val, options) => {
    if (!val) return null;
    return options.find(opt => opt.value === val) || null;
  };

  const statusOptions = [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'on_hold', label: 'On Hold' }
  ];

  const customerTypeOptions = [
    { value: 'individual', label: 'Individual' },
    { value: 'corporate', label: 'Corporate' }
  ];

  const userOptions = users.map(u => ({ value: u._id || u.id, label: `${u.name} (${u.role})` }));

  return (
    <Modal 
      open={open} 
      onClose={onClose} 
      title={(clientData && clientData._id) ? "Edit Client" : "Create New Client"} 
      size="xl"
      footer={
        <div className="d-flex align-items-center justify-content-end w-100">
          <button type="button" className="btn btn-light me-2" onClick={onClose}>Cancel</button>
          <button type="button" className="btn btn-primary" onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : ((clientData && clientData._id) ? "Save Changes" : "Create Client")}
          </button>
        </div>
      }
    >
      <form onSubmit={handleSubmit}>
        
        <h6 className="fw-semibold mb-3 text-primary border-bottom pb-2">Basic Information</h6>
        <div className="row g-3 mb-4">
          <div className="col-md-4">
            <label className="form-label">Client Name <span className="text-danger">*</span></label>
            <input type="text" className={`form-control ${errors.client_name ? 'is-invalid' : ''}`} name="client_name" value={formData.client_name} onChange={handleChange} />
            {errors.client_name && <div className="text-danger fs-12 mt-1">{errors.client_name}</div>}
          </div>
          <div className="col-md-4">
            <label className="form-label">Company Name <span className="text-danger">*</span></label>
            <input type="text" className={`form-control ${errors.company_name ? 'is-invalid' : ''}`} name="company_name" value={formData.company_name} onChange={handleChange} />
            {errors.company_name && <div className="text-danger fs-12 mt-1">{errors.company_name}</div>}
          </div>
          <div className="col-md-4">
            <label className="form-label">Contact Person</label>
            <input type="text" className="form-control" name="contact_person" value={formData.contact_person} onChange={handleChange} />
          </div>
        </div>

        <h6 className="fw-semibold mb-3 text-primary border-bottom pb-2">Contact Details</h6>
        <div className="row g-3 mb-4">
          <div className="col-md-3">
            <label className="form-label">Mobile Number <span className="text-danger">*</span></label>
            <input type="text" className={`form-control ${errors.mobile_number ? 'is-invalid' : ''}`} name="mobile_number" value={formData.mobile_number} onChange={handleChange} />
            {errors.mobile_number && <div className="text-danger fs-12 mt-1">{errors.mobile_number}</div>}
          </div>
          <div className="col-md-3">
            <label className="form-label">Alternate Number</label>
            <input type="text" className="form-control" name="alternate_number" value={formData.alternate_number} onChange={handleChange} />
          </div>
          <div className="col-md-3">
            <label className="form-label">Email Address <span className="text-danger">*</span></label>
            <input type="email" className={`form-control ${errors.email ? 'is-invalid' : ''}`} name="email" value={formData.email} onChange={handleChange} />
            {errors.email && <div className="text-danger fs-12 mt-1">{errors.email}</div>}
          </div>
          <div className="col-md-3">
            <label className="form-label">Website</label>
            <input type="url" className="form-control" name="website" value={formData.website} onChange={handleChange} />
          </div>
        </div>

        <h6 className="fw-semibold mb-3 text-primary border-bottom pb-2">Client Qualification & Assignment</h6>
        <div className="row g-3 mb-4">
          <div className="col-md-3">
            <label className="form-label">Client Status</label>
            <div className="custom-select-wrapper">
              <CustomSelect 
                options={statusOptions}
                value={getSelectValue(formData.status, statusOptions)}
                onChange={handleSelectChange('status')}
              />
            </div>
          </div>
          <div className="col-md-3">
            <label className="form-label">Customer Type</label>
            <div className="custom-select-wrapper">
              <CustomSelect 
                options={customerTypeOptions}
                value={getSelectValue(formData.customer_type, customerTypeOptions)}
                onChange={handleSelectChange('customer_type')}
                placeholder="Select Type"
              />
            </div>
          </div>
          <div className="col-md-3">
            <label className="form-label">Industry</label>
            <input type="text" className="form-control" name="industry" value={formData.industry} onChange={handleChange} />
          </div>
          <div className="col-md-3">
            <label className="form-label">Contract Value (₹)</label>
            <input type="number" className="form-control" name="contract_value" value={formData.contract_value} onChange={handleChange} />
          </div>
          <div className="col-md-4 mt-3">
            <label className="form-label">Account Manager (Assign To) <span className="text-danger">*</span></label>
            <div className="custom-select-wrapper">
              <CustomSelect 
                options={userOptions}
                value={getSelectValue(formData.assigned_to, userOptions)}
                onChange={handleSelectChange('assigned_to')}
                placeholder="Select User"
                className={errors.assigned_to ? 'is-invalid' : ''}
              />
            </div>
            {errors.assigned_to && <div className="text-danger fs-12 mt-1">{errors.assigned_to}</div>}
          </div>
        </div>

        <h6 className="fw-semibold mb-3 text-primary border-bottom pb-2">Address Information</h6>
        <div className="row g-3 mb-4">
          <div className="col-md-12">
            <label className="form-label">Address</label>
            <textarea className="form-control" rows="2" name="address" value={formData.address} onChange={handleChange}></textarea>
          </div>
          <div className="col-md-3">
            <label className="form-label">City</label>
            <input type="text" className="form-control" name="city" value={formData.city} onChange={handleChange} />
          </div>
          <div className="col-md-3">
            <label className="form-label">State</label>
            <input type="text" className="form-control" name="state" value={formData.state} onChange={handleChange} />
          </div>
          <div className="col-md-3">
            <label className="form-label">Country</label>
            <input type="text" className="form-control" name="country" value={formData.country} onChange={handleChange} />
          </div>
          <div className="col-md-3">
            <label className="form-label">Pincode</label>
            <input type="text" className="form-control" name="pincode" value={formData.pincode} onChange={handleChange} />
          </div>
        </div>

        <h6 className="fw-semibold mb-3 text-primary border-bottom pb-2">Additional Information</h6>
        <div className="row g-3 mb-2">
          <div className="col-md-6">
            <label className="form-label">Client Type</label>
            <div className="form-control bg-light">
              {(clientData && clientData._id) ? (clientData.converted_from_lead_id === "Manual" ? "Manually Added" : "Auto Converted from Lead") : "Manually Added"}
            </div>
          </div>
          <div className="col-md-6">
            {(clientData && clientData._id) && (
              <>
                <label className="form-label">Created At</label>
                <div className="form-control bg-light">
                  {clientData.created_at ? new Date(clientData.created_at).toLocaleString() : "—"}
                </div>
              </>
            )}
          </div>
          <div className="col-md-12">
            <label className="form-label">Requirement</label>
            <textarea className="form-control" rows="2" name="requirement" value={formData.requirement} onChange={handleChange}></textarea>
          </div>
          <div className="col-md-12">
            <label className="form-label">Notes</label>
            <textarea className="form-control" rows="2" name="notes" value={formData.notes} onChange={handleChange}></textarea>
          </div>
        </div>

      </form>
    </Modal>
  );
}
