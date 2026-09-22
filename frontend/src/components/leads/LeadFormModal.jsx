import React, { useState } from 'react';
import Modal from '../common/Modal';
import CustomSelect from '../common/CustomSelect';
import CustomDatePicker from '../common/CustomDatePicker';

const INITIAL_STATE = {
  lead_name: "", first_name: "", last_name: "", company_name: "",
  mobile_number: "", alternate_number: "", email: "", website: "",
  industry: "", source: "website", status: "new", priority: "medium",
  tags: "", expected_value: "", probability: "", customer_type: "individual",
  preferred_channel: "Email", next_followup_date: "", followup_status: "scheduled",
  assigned_to: "", city: "", state: "", country: "", pincode: "",
  requirement: "", description: "", notes: ""
};

export default function LeadFormModal({ open, onClose }) {
  const [formData, setFormData] = useState(INITIAL_STATE);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name) => (selected) => {
    setFormData(prev => ({ ...prev, [name]: selected ? selected.value : "" }));
  };

  const handleDateChange = (name) => (date) => {
    setFormData(prev => ({ ...prev, [name]: date }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted: ", formData);
    onClose();
  };

  // Helper to format react-select value
  const getSelectValue = (val) => {
    if (!val) return null;
    return { value: val, label: val.charAt(0).toUpperCase() + val.slice(1) };
  };

  return (
    <Modal 
      open={open} 
      onClose={onClose} 
      title="Create New Lead" 
      size="lg"
      footer={
        <div className="d-flex align-items-center justify-content-end w-100">
          <button type="button" className="btn btn-light me-2" onClick={onClose}>Cancel</button>
          <button type="button" className="btn btn-primary" onClick={handleSubmit}>Create Lead</button>
        </div>
      }
    >
      <form onSubmit={handleSubmit}>
        
        <h6 className="fw-semibold mb-3 text-primary">Basic Information</h6>
        <div className="row g-3 mb-4">
          <div className="col-md-3">
            <label className="form-label">Lead Name <span className="text-danger">*</span></label>
            <input type="text" className="form-control" name="lead_name" value={formData.lead_name} onChange={handleChange} required />
          </div>
          <div className="col-md-3">
            <label className="form-label">First Name <span className="text-danger">*</span></label>
            <input type="text" className="form-control" name="first_name" value={formData.first_name} onChange={handleChange} required />
          </div>
          <div className="col-md-3">
            <label className="form-label">Last Name <span className="text-danger">*</span></label>
            <input type="text" className="form-control" name="last_name" value={formData.last_name} onChange={handleChange} required />
          </div>
          <div className="col-md-3">
            <label className="form-label">Company Name <span className="text-danger">*</span></label>
            <input type="text" className="form-control" name="company_name" value={formData.company_name} onChange={handleChange} required />
          </div>
        </div>

        <h6 className="fw-semibold mb-3 text-primary">Contact Details</h6>
        <div className="row g-3 mb-4">
          <div className="col-md-3">
            <label className="form-label">Mobile Number <span className="text-danger">*</span></label>
            <input type="text" className="form-control" name="mobile_number" value={formData.mobile_number} onChange={handleChange} required />
          </div>
          <div className="col-md-3">
            <label className="form-label">Alternate Number</label>
            <input type="text" className="form-control" name="alternate_number" value={formData.alternate_number} onChange={handleChange} />
          </div>
          <div className="col-md-3">
            <label className="form-label">Email Address <span className="text-danger">*</span></label>
            <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="col-md-3">
            <label className="form-label">Website</label>
            <input type="text" className="form-control" name="website" value={formData.website} onChange={handleChange} />
          </div>
        </div>

        <h6 className="fw-semibold mb-3 text-primary">Lead Qualification</h6>
        <div className="row g-3 mb-4">
          <div className="col-md-3">
            <label className="form-label">Lead Source <span className="text-danger">*</span></label>
            <div className="custom-select-wrapper">
              <CustomSelect 
                className="select" 
                value={getSelectValue(formData.source)} 
                onChange={handleSelectChange('source')}
              >
                <option value="website">Website</option>
                <option value="google_ads">Google Ads</option>
                <option value="linkedin">LinkedIn</option>
                <option value="referral">Referral</option>
              </CustomSelect>
            </div>
          </div>
          <div className="col-md-3">
            <label className="form-label">Lead Status <span className="text-danger">*</span></label>
            <div className="custom-select-wrapper">
              <CustomSelect 
                className="select" 
                value={getSelectValue(formData.status)} 
                onChange={handleSelectChange('status')}
              >
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="qualified">Qualified</option>
                <option value="negotiation">Negotiation</option>
                <option value="won">Won</option>
                <option value="lost">Lost</option>
              </CustomSelect>
            </div>
          </div>
          <div className="col-md-3">
            <label className="form-label">Priority <span className="text-danger">*</span></label>
            <div className="custom-select-wrapper">
              <CustomSelect 
                className="select" 
                value={getSelectValue(formData.priority)} 
                onChange={handleSelectChange('priority')}
              >
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </CustomSelect>
            </div>
          </div>
          <div className="col-md-3">
            <label className="form-label">Industry</label>
            <input type="text" className="form-control" name="industry" value={formData.industry} onChange={handleChange} />
          </div>
          <div className="col-md-3">
            <label className="form-label">Expected Value (₹) <span className="text-danger">*</span></label>
            <input type="number" className="form-control" name="expected_value" value={formData.expected_value} onChange={handleChange} required />
          </div>
          <div className="col-md-3">
            <label className="form-label">Probability (%)</label>
            <input type="number" className="form-control" name="probability" value={formData.probability} onChange={handleChange} />
          </div>
          <div className="col-md-3">
            <label className="form-label">Customer Type</label>
            <div className="custom-select-wrapper">
              <CustomSelect 
                className="select" 
                value={getSelectValue(formData.customer_type)} 
                onChange={handleSelectChange('customer_type')}
              >
                <option value="individual">Individual</option>
                <option value="business">Business</option>
              </CustomSelect>
            </div>
          </div>
        </div>

        <h6 className="fw-semibold mb-3 text-primary">Follow-up & Assignment</h6>
        <div className="row g-3 mb-4">
          <div className="col-md-3">
            <label className="form-label">Pref. Comm Channel</label>
            <div className="custom-select-wrapper">
              <CustomSelect 
                className="select" 
                value={getSelectValue(formData.preferred_channel)} 
                onChange={handleSelectChange('preferred_channel')}
              >
                <option value="Email">Email</option>
                <option value="Phone">Phone</option>
                <option value="Whatsapp">Whatsapp</option>
              </CustomSelect>
            </div>
          </div>
          <div className="col-md-3">
            <label className="form-label">Next Follow-up Date</label>
            <div className="input-groupicon calender-input">
              <CustomDatePicker 
                className="form-control" 
                selected={formData.next_followup_date} 
                onChange={handleDateChange('next_followup_date')} 
                placeholderText="dd-mm-yyyy" 
                isRange={false} 
              />
            </div>
          </div>
          <div className="col-md-3">
            <label className="form-label">Follow-up Status</label>
            <div className="custom-select-wrapper">
              <CustomSelect 
                className="select" 
                value={getSelectValue(formData.followup_status)} 
                onChange={handleSelectChange('followup_status')}
              >
                <option value="scheduled">Scheduled</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
              </CustomSelect>
            </div>
          </div>
          <div className="col-md-3">
            <label className="form-label">Assign To <span className="text-danger">*</span></label>
            <div className="custom-select-wrapper">
              <CustomSelect 
                className="select" 
                value={getSelectValue(formData.assigned_to)} 
                onChange={handleSelectChange('assigned_to')}
              >
                <option value="user1">John Doe (Sales)</option>
                <option value="user2">Jane Smith (Manager)</option>
              </CustomSelect>
            </div>
          </div>
          <div className="col-md-12">
            <label className="form-label">Tags (comma-separated)</label>
            <input type="text" className="form-control" name="tags" placeholder="e.g. VIP, Urgent" value={formData.tags} onChange={handleChange} />
          </div>
        </div>

        <h6 className="fw-semibold mb-3 text-primary">Address Information</h6>
        <div className="row g-3 mb-4">
          <div className="col-md-3">
            <label className="form-label">City <span className="text-danger">*</span></label>
            <input type="text" className="form-control" name="city" value={formData.city} onChange={handleChange} required />
          </div>
          <div className="col-md-3">
            <label className="form-label">State <span className="text-danger">*</span></label>
            <input type="text" className="form-control" name="state" value={formData.state} onChange={handleChange} required />
          </div>
          <div className="col-md-3">
            <label className="form-label">Country <span className="text-danger">*</span></label>
            <input type="text" className="form-control" name="country" value={formData.country} onChange={handleChange} required />
          </div>
          <div className="col-md-3">
            <label className="form-label">Pincode <span className="text-danger">*</span></label>
            <input type="text" className="form-control" name="pincode" value={formData.pincode} onChange={handleChange} required />
          </div>
        </div>

        <h6 className="fw-semibold mb-3 text-primary">Additional Information</h6>
        <div className="row g-3 mb-2">
          <div className="col-md-12">
            <label className="form-label">Requirement</label>
            <textarea className="form-control" rows="2" name="requirement" value={formData.requirement} onChange={handleChange}></textarea>
          </div>
          <div className="col-md-12">
            <label className="form-label">Description</label>
            <textarea className="form-control" rows="2" name="description" value={formData.description} onChange={handleChange}></textarea>
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
