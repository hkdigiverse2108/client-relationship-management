import React, { useState } from 'react';
import Modal from '../common/Modal';
import CustomSelect from '../common/CustomSelect';

const STATUSES = [
  { value: "Active", label: "Active" },
  { value: "Inactive", label: "Inactive" }
];

const INITIAL_STATE = {
  name: "",
  status: "Active",
  description: ""
};

export default function CategoryFormModal({ open, onClose }) {
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
    console.log("Category form submitted: ", formData);
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
      title="Create Category" 
      size="md"
      footer={
        <div className="d-flex align-items-center justify-content-end w-100">
          <button type="button" className="btn btn-light me-2" onClick={onClose}>Cancel</button>
          <button type="button" className="btn btn-primary" onClick={handleSubmit}>Create Category</button>
        </div>
      }
    >
      <form onSubmit={handleSubmit}>
        
        <div className="row g-3 mb-4">
          <div className="col-md-12">
            <label className="form-label">Category Name <span className="text-danger">*</span></label>
            <input type="text" className="form-control" name="name" placeholder="e.g. Electronics" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="col-md-12">
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
          <div className="col-md-12">
            <label className="form-label">Description</label>
            <textarea 
              className="form-control" 
              name="description"
              rows="3" 
              placeholder="Enter optional description..."
              value={formData.description}
              onChange={handleChange}
            ></textarea>
          </div>
        </div>

      </form>
    </Modal>
  );
}
