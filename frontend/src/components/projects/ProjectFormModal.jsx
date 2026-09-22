import React, { useState } from 'react';
import Modal from '../common/Modal';
import CustomSelect from '../common/CustomSelect';
import CustomDatePicker from '../common/CustomDatePicker';

const CATEGORIES = ["Web Development", "App Development", "SEO", "Digital Marketing", "Design", "Consulting", "Other"];
const DEPARTMENTS = ["Engineering", "Design", "Marketing", "Sales", "HR", "Finance", "Other"];
const PRIORITIES = ["critical", "high", "medium", "low"];
const STATUSES = {
  active: "Active",
  hold: "On Hold",
  completed: "Completed",
  cancelled: "Cancelled"
};
const STAGES = {
  new: "New",
  in_progress: "In Progress",
  review: "In Review",
  completed: "Completed",
  hold: "On Hold"
};

const INITIAL_STATE = {
  title: "", client_id: "", category: "Web Development", priority: "medium",
  department: "Engineering", start_date: "", end_date: "",
  budget: "", project_value: "", assigned_to: "", status: "active", stage: "new",
  tags: "", description: ""
};

export default function ProjectFormModal({ open, onClose }) {
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
  const getSelectValue = (val, optionsObj = null) => {
    if (!val) return null;
    let label = val;
    if (optionsObj && optionsObj[val]) {
      label = optionsObj[val];
    } else {
      // capitalize first letter or fallback
      label = val.charAt(0).toUpperCase() + val.slice(1);
    }
    return { value: val, label: label };
  };

  const getClientSelectValue = (val, clients) => {
    if (!val) return null;
    const client = clients.find(c => c.id === val);
    return { value: val, label: client ? client.name : val };
  };

  const getUserSelectValue = (val, users) => {
    if (!val) return null;
    const user = users.find(u => u.id === val);
    return { value: val, label: user ? `${user.name} (${user.role})` : val };
  };

  // Dummy clients & users for the dropdowns
  const clients = [{ id: '1', name: 'Acme Corp' }, { id: '2', name: 'Stark Industries' }];
  const users = [{ id: '1', name: 'Michael Walker', role: 'Manager' }, { id: '2', name: 'Brian Villalobos', role: 'Developer' }];

  return (
    <Modal 
      open={open} 
      onClose={onClose} 
      title="Create New Project" 
      size="lg"
      footer={
        <div className="d-flex align-items-center justify-content-end w-100">
          <button type="button" className="btn btn-light me-2" onClick={onClose}>Cancel</button>
          <button type="button" className="btn btn-primary" onClick={handleSubmit}>Create Project</button>
        </div>
      }
    >
      <form onSubmit={handleSubmit}>
        
        <h6 className="fw-semibold mb-3 text-primary">General Details</h6>
        <div className="row g-3 mb-4">
          <div className="col-md-6">
            <label className="form-label">Project Name <span className="text-danger">*</span></label>
            <input type="text" className="form-control" name="title" value={formData.title} onChange={handleChange} required />
          </div>
          <div className="col-md-6">
            <label className="form-label">Client Name <span className="text-danger">*</span></label>
            <div className="custom-select-wrapper">
              <CustomSelect 
                className="select" 
                value={getClientSelectValue(formData.client_id, clients)} 
                onChange={handleSelectChange('client_id')}
              >
                {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </CustomSelect>
            </div>
          </div>
        </div>

        <h6 className="fw-semibold mb-3 text-primary">Classification</h6>
        <div className="row g-3 mb-4">
          <div className="col-md-4">
            <label className="form-label">Category <span className="text-danger">*</span></label>
            <div className="custom-select-wrapper">
              <CustomSelect 
                className="select" 
                value={getSelectValue(formData.category)} 
                onChange={handleSelectChange('category')}
              >
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </CustomSelect>
            </div>
          </div>
          <div className="col-md-4">
            <label className="form-label">Department <span className="text-danger">*</span></label>
            <div className="custom-select-wrapper">
              <CustomSelect 
                className="select" 
                value={getSelectValue(formData.department)} 
                onChange={handleSelectChange('department')}
              >
                {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
              </CustomSelect>
            </div>
          </div>
          <div className="col-md-4">
            <label className="form-label">Priority <span className="text-danger">*</span></label>
            <div className="custom-select-wrapper">
              <CustomSelect 
                className="select" 
                value={getSelectValue(formData.priority)} 
                onChange={handleSelectChange('priority')}
              >
                {PRIORITIES.map(p => <option key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</option>)}
              </CustomSelect>
            </div>
          </div>
        </div>

        <h6 className="fw-semibold mb-3 text-primary">Schedule & Financials</h6>
        <div className="row g-3 mb-4">
          <div className="col-md-3">
            <label className="form-label">Start Date</label>
            <div className="input-groupicon calender-input">
              <CustomDatePicker 
                className="form-control" 
                selected={formData.start_date} 
                onChange={handleDateChange('start_date')} 
                placeholderText="dd-mm-yyyy" 
                isRange={false} 
              />
            </div>
          </div>
          <div className="col-md-3">
            <label className="form-label">End Date</label>
            <div className="input-groupicon calender-input">
              <CustomDatePicker 
                className="form-control" 
                selected={formData.end_date} 
                onChange={handleDateChange('end_date')} 
                placeholderText="dd-mm-yyyy" 
                isRange={false} 
              />
            </div>
          </div>
          <div className="col-md-3">
            <label className="form-label">Budget (₹) <span className="text-danger">*</span></label>
            <input type="number" className="form-control" name="budget" value={formData.budget} onChange={handleChange} required />
          </div>
          <div className="col-md-3">
            <label className="form-label">Project Value (₹) <span className="text-danger">*</span></label>
            <input type="number" className="form-control" name="project_value" value={formData.project_value} onChange={handleChange} required />
          </div>
        </div>

        <h6 className="fw-semibold mb-3 text-primary">Management</h6>
        <div className="row g-3 mb-4">
          <div className="col-md-4">
            <label className="form-label">Assign To <span className="text-danger">*</span></label>
            <div className="custom-select-wrapper">
              <CustomSelect 
                className="select" 
                value={getUserSelectValue(formData.assigned_to, users)} 
                onChange={handleSelectChange('assigned_to')}
              >
                {users.map(u => <option key={u.id} value={u.id}>{u.name} ({u.role})</option>)}
              </CustomSelect>
            </div>
          </div>
          <div className="col-md-4">
            <label className="form-label">Status <span className="text-danger">*</span></label>
            <div className="custom-select-wrapper">
              <CustomSelect 
                className="select" 
                value={getSelectValue(formData.status, STATUSES)} 
                onChange={handleSelectChange('status')}
              >
                {Object.entries(STATUSES).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
              </CustomSelect>
            </div>
          </div>
          <div className="col-md-4">
            <label className="form-label">Stage <span className="text-danger">*</span></label>
            <div className="custom-select-wrapper">
              <CustomSelect 
                className="select" 
                value={getSelectValue(formData.stage, STAGES)} 
                onChange={handleSelectChange('stage')}
              >
                {Object.entries(STAGES).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
              </CustomSelect>
            </div>
          </div>
        </div>

        <h6 className="fw-semibold mb-3 text-primary">Additional Info</h6>
        <div className="row g-3 mb-2">
          <div className="col-md-12">
            <label className="form-label">Tags (comma-separated)</label>
            <input type="text" className="form-control" name="tags" placeholder="e.g. Phase 1, High-profile" value={formData.tags} onChange={handleChange} />
          </div>
          <div className="col-md-12">
            <label className="form-label">Description</label>
            <textarea className="form-control" rows="3" name="description" value={formData.description} onChange={handleChange}></textarea>
          </div>
        </div>

      </form>
    </Modal>
  );
}
