import React, { useState } from 'react';
import Modal from '../common/Modal';
import CustomSelect from '../common/CustomSelect';

const CITIES = [
  "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Ahmedabad", "Chennai", "Kolkata", "Surat", "Pune", "Jaipur",
  "Lucknow", "Kanpur", "Nagpur", "Indore", "Thane", "Bhopal", "Visakhapatnam", "Pimpri-Chinchwad", "Patna",
  "Vadodara", "Ghaziabad", "Ludhiana", "Agra", "Nashik", "Faridabad", "Meerut", "Rajkot", "Kalyan-Dombivli",
  "Vasai-Virar", "Varanasi", "Srinagar", "Aurangabad", "Dhanbad", "Amritsar", "Navi Mumbai", "Prayagraj",
  "Howrah", "Ranchi", "Gwalior", "Jabalpur", "Coimbatore", "Vijayawada", "Jodhpur", "Madurai", "Raipur",
  "Kota", "Chandigarh", "Guwahati", "Solapur", "Hubli-Dharwad", "Bareilly", "Moradabad", "Mysore", "Gurgaon",
  "Noida", "Aligarh", "Jalandhar", "Tiruchirappalli", "Bhubaneswar", "Salem", "Warangal", "Guntur", "Jhansi",
  "Nellore", "Jamnagar", "Rajamahendravaram", "Mangalore", "Belgaum", "Tirupur", "Kozhikode", "Thrissur",
  "Kollam", "Kochi", "Gandhinagar", "Dehradun", "Haridwar", "Rishikesh", "Shimla", "Gangtok", "Shillong",
  "Imphal", "Aizawl", "Agartala", "Kohima", "Itanagar", "Panaji"
];

const STATUSES = [
  { value: "Active", label: "Active" },
  { value: "Inactive", label: "Inactive" },
  { value: "Blocked", label: "Blocked" }
];

const INITIAL_STATE = {
  name: "", email: "", phone: "",
  city: "", state: "", country: "",
  status: "Active"
};

export default function CustomerFormModal({ open, onClose }) {
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
    console.log("Customer form submitted: ", formData);
    onClose();
    setFormData(INITIAL_STATE);
  };

  const getSelectValue = (val, options = []) => {
    if (!val) return null;
    const found = options.find(o => o.value === val);
    if (found) return found;
    return { value: val, label: val };
  };

  return (
    <Modal 
      open={open} 
      onClose={onClose} 
      title="New Customer" 
      size="lg"
      footer={
        <div className="d-flex align-items-center justify-content-end w-100">
          <button type="button" className="btn btn-light me-2" onClick={onClose}>Cancel</button>
          <button type="button" className="btn btn-primary" onClick={handleSubmit}>Create Customer</button>
        </div>
      }
    >
      <form onSubmit={handleSubmit}>
        
        <h6 className="fw-semibold mb-3 text-primary">Customer Details</h6>
        <div className="row g-3 mb-4">
          <div className="col-md-12">
            <label className="form-label">Customer Name <span className="text-danger">*</span></label>
            <input type="text" className="form-control" name="name" placeholder="e.g. Rahul Sharma" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="col-md-6">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" name="email" placeholder="e.g. rahul@example.com" value={formData.email} onChange={handleChange} />
          </div>
          <div className="col-md-6">
            <label className="form-label">Phone Number</label>
            <input type="text" className="form-control" name="phone" placeholder="e.g. +91 9876543210" value={formData.phone} onChange={handleChange} />
          </div>
        </div>

        <h6 className="fw-semibold mb-3 text-primary">Location Info</h6>
        <div className="row g-3 mb-4">
          <div className="col-md-4">
            <label className="form-label">City</label>
            <input type="text" className="form-control" name="city" placeholder="Type to search city..." list="city-list" value={formData.city} onChange={handleChange} />
            <datalist id="city-list">
              {CITIES.map(city => <option key={city} value={city} />)}
            </datalist>
          </div>
          <div className="col-md-4">
            <label className="form-label">State</label>
            <input type="text" className="form-control" name="state" placeholder="e.g. Maharashtra" value={formData.state} onChange={handleChange} />
          </div>
          <div className="col-md-4">
            <label className="form-label">Country</label>
            <input type="text" className="form-control" name="country" placeholder="e.g. India" value={formData.country} onChange={handleChange} />
          </div>
        </div>

        <h6 className="fw-semibold mb-3 text-primary">Status</h6>
        <div className="row g-3 mb-2">
          <div className="col-md-4">
            <label className="form-label">Status <span className="text-danger">*</span></label>
            <div className="custom-select-wrapper">
              <CustomSelect 
                className="select" 
                options={STATUSES}
                value={getSelectValue(formData.status, STATUSES)} 
                onChange={handleSelectChange('status')} 
              />
            </div>
          </div>
        </div>

      </form>
    </Modal>
  );
}
