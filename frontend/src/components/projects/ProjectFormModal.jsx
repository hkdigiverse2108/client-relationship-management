import React, { useState, useEffect } from 'react';
import Modal from '../common/Modal';
import CustomSelect from '../common/CustomSelect';
import CustomDatePicker from '../common/CustomDatePicker';
import axiosClient from '../../api/axiosClient';
import toast from 'react-hot-toast';

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

const getLocalOptions = (key, defaultOptions) => {
  const saved = localStorage.getItem(key);
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    } catch(e) {}
  }
  return defaultOptions;
};

const saveLocalOptions = (key, options) => {
  localStorage.setItem(key, JSON.stringify(options));
};

export default function ProjectFormModal({ open, onClose, onSuccess, projectData = null }) {
  const [formData, setFormData] = useState({
    title: "", client_id: "", category: "Web Development", priority: "medium",
    department: "Engineering", start_date: new Date(), end_date: null,
    budget: "", project_value: "", assigned_to: "", status: "active", stage: "new",
    tags: "", description: ""
  });
  
  const [errors, setErrors] = useState({});
  const [clients, setClients] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const [categories, setCategories] = useState(() => getLocalOptions('project_categories', ["Web Development", "App Development", "SEO", "Digital Marketing", "Design", "Consulting", "Other"]));
  const [departments, setDepartments] = useState(() => getLocalOptions('project_departments', ["Engineering", "Design", "Marketing", "Sales", "HR", "Finance", "Other"]));
  const priorities = ["critical", "high", "medium", "low"];

  useEffect(() => {
    if (open) {
      if (projectData) {
        setFormData({
          title: projectData.title || "",
          client_id: projectData.client_id || "",
          category: projectData.category || "Web Development",
          priority: projectData.priority || "medium",
          department: projectData.department || "Engineering",
          start_date: projectData.start_date ? new Date(projectData.start_date) : new Date(),
          end_date: projectData.end_date ? new Date(projectData.end_date) : null,
          budget: projectData.budget || "",
          project_value: projectData.project_value || "",
          assigned_to: projectData.assigned_to || "",
          status: projectData.status || "active",
          stage: projectData.stage || "new",
          tags: projectData.tags || "",
          description: projectData.description || ""
        });
      } else {
        setFormData({
          title: "", client_id: "", category: "Web Development", priority: "medium",
          department: "Engineering", start_date: new Date(), end_date: null,
          budget: "", project_value: "", assigned_to: "", status: "active", stage: "new",
          tags: "", description: ""
        });
      }
      setErrors({});
      fetchDropdownData();
    }
  }, [open, projectData]);

  const fetchDropdownData = async () => {
    try {
      const [clientsRes, usersRes] = await Promise.all([
        axiosClient.get('/clients'),
        axiosClient.get('/users')
      ]);
      setClients(Array.isArray(clientsRes) ? clientsRes : clientsRes.data || []);
      setUsers(Array.isArray(usersRes) ? usersRes : usersRes.data || []);
    } catch (err) {
      console.error("Failed to load options", err);
    }
  };

  const validate = () => {
    let newErrors = {};
    if (!formData.title) newErrors.title = "Project Name is required";
    if (!formData.client_id) newErrors.client_id = "Client Name is required";
    if (!formData.budget) newErrors.budget = "Budget is required";
    if (!formData.project_value) newErrors.project_value = "Project Value is required";
    if (!formData.assigned_to) newErrors.assigned_to = "Assign To is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleSelectChange = (name) => (selected) => {
    const val = selected ? selected.value : "";
    setFormData(prev => ({ ...prev, [name]: val }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleCreatableChange = (name, setList, listKey) => (selected) => {
    const val = selected ? selected.value : "";
    
    // If a new value is created, add it to the state and local storage
    if (selected && selected.__isNew__) {
      setList(prev => {
        const next = [...prev, selected.value];
        saveLocalOptions(listKey, next);
        return next;
      });
      toast.success(`${name.charAt(0).toUpperCase() + name.slice(1)} "${selected.value}" created successfully!`);
    }
    
    setFormData(prev => ({ ...prev, [name]: val }));
  };

  const handleDateChange = (name) => (date) => {
    setFormData(prev => ({ ...prev, [name]: date }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    
    setLoading(true);
    try {
      // Formatting payload
      const payload = { ...formData };
      if (payload.start_date) payload.start_date = payload.start_date.toISOString().split('T')[0];
      if (payload.end_date) payload.end_date = payload.end_date.toISOString().split('T')[0];
      else delete payload.end_date;
      
      if (projectData && (projectData._id || projectData.id)) {
        await axiosClient.put(`/projects/${projectData._id || projectData.id}`, payload);
        toast.success("Project updated successfully");
      } else {
        await axiosClient.post('/projects', payload);
        toast.success("Project created successfully");
      }
      if (onSuccess) onSuccess();
      onClose();
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.detail || "Failed to save project");
    } finally {
      setLoading(false);
    }
  };

  // Helper to format react-select value
  const getSelectValue = (val, optionsObj = null) => {
    if (!val) return null;
    let label = val;
    if (optionsObj && optionsObj[val]) {
      label = optionsObj[val];
    } else {
      label = val.charAt(0).toUpperCase() + val.slice(1);
    }
    return { value: val, label: label };
  };

  const getClientSelectValue = (val) => {
    if (!val) return null;
    const client = clients.find(c => c._id === val || c.id === val);
    const clientName = client ? (client.client_name || client.company_name || `${client.first_name || ''} ${client.last_name || ''}`.trim()) : val;
    return { value: val, label: clientName };
  };

  const getUserSelectValue = (val) => {
    if (!val) return null;
    const user = users.find(u => u._id === val || u.id === val);
    return { value: val, label: user ? `${user.name} (${user.role})` : val };
  };

  return (
    <Modal 
      open={open} 
      onClose={onClose} 
      title={projectData ? "Edit Project" : "Create New Project"} 
      size="lg"
      footer={
        <div className="d-flex align-items-center justify-content-end w-100">
          <button type="button" className="btn btn-light me-2" onClick={onClose} disabled={loading}>Cancel</button>
          <button type="button" className="btn btn-primary" onClick={handleSubmit} disabled={loading}>
            {loading ? 'Saving...' : (projectData ? 'Save Changes' : 'Create Project')}
          </button>
        </div>
      }
    >
      <form onSubmit={handleSubmit}>
        
        <h6 className="fw-semibold mb-3 text-primary">General Details</h6>
        <div className="row g-3 mb-4">
          <div className="col-md-6">
            <label className="form-label">Project Name <span className="text-danger">*</span></label>
            <input type="text" className={`form-control ${errors.title ? 'is-invalid' : ''}`} name="title" value={formData.title} onChange={handleChange} />
            {errors.title && <span className="text-danger fs-12 mt-1 d-block">{errors.title}</span>}
          </div>
          <div className="col-md-6">
            <label className="form-label">Client Name <span className="text-danger">*</span></label>
            <div className="custom-select-wrapper">
              <CustomSelect 
                className={`select ${errors.client_id ? 'is-invalid' : ''}`}
                value={getClientSelectValue(formData.client_id)} 
                onChange={handleSelectChange('client_id')}
              >
                {clients.map(c => {
                  const cId = c._id || c.id;
                  const cName = c.client_name || c.company_name || `${c.first_name || ''} ${c.last_name || ''}`.trim();
                  return <option key={cId} value={cId}>{cName}</option>;
                })}
              </CustomSelect>
              {errors.client_id && <span className="text-danger fs-12 mt-1 d-block">{errors.client_id}</span>}
            </div>
          </div>
        </div>

        <h6 className="fw-semibold mb-3 text-primary">Classification</h6>
        <div className="row g-3 mb-4">
          <div className="col-md-4">
            <label className="form-label">Category</label>
            <div className="custom-select-wrapper">
              <CustomSelect 
                className="select" 
                creatable={true}
                value={{ value: formData.category, label: formData.category }} 
                onChange={handleCreatableChange('category', setCategories, 'project_categories')}
              >
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </CustomSelect>
            </div>
          </div>
          <div className="col-md-4">
            <label className="form-label">Department</label>
            <div className="custom-select-wrapper">
              <CustomSelect 
                className="select" 
                creatable={true}
                value={{ value: formData.department, label: formData.department }} 
                onChange={handleCreatableChange('department', setDepartments, 'project_departments')}
              >
                {departments.map(d => <option key={d} value={d}>{d}</option>)}
              </CustomSelect>
            </div>
          </div>
          <div className="col-md-4">
            <label className="form-label">Priority</label>
            <div className="custom-select-wrapper">
              <CustomSelect 
                className="select" 
                value={getSelectValue(formData.priority)} 
                onChange={handleSelectChange('priority')}
              >
                {priorities.map(p => <option key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</option>)}
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
            <input type="number" className={`form-control ${errors.budget ? 'is-invalid' : ''}`} name="budget" value={formData.budget} onChange={handleChange} />
            {errors.budget && <span className="text-danger fs-12 mt-1 d-block">{errors.budget}</span>}
          </div>
          <div className="col-md-3">
            <label className="form-label">Project Value (₹) <span className="text-danger">*</span></label>
            <input type="number" className={`form-control ${errors.project_value ? 'is-invalid' : ''}`} name="project_value" value={formData.project_value} onChange={handleChange} />
            {errors.project_value && <span className="text-danger fs-12 mt-1 d-block">{errors.project_value}</span>}
          </div>
        </div>

        <h6 className="fw-semibold mb-3 text-primary">Management</h6>
        <div className="row g-3 mb-4">
          <div className="col-md-4">
            <label className="form-label">Assign To <span className="text-danger">*</span></label>
            <div className="custom-select-wrapper">
              <CustomSelect 
                className={`select ${errors.assigned_to ? 'is-invalid' : ''}`}
                value={getUserSelectValue(formData.assigned_to)} 
                onChange={handleSelectChange('assigned_to')}
              >
                {users.map(u => {
                  const uId = u._id || u.id;
                  return <option key={uId} value={uId}>{u.name} ({u.role})</option>;
                })}
              </CustomSelect>
              {errors.assigned_to && <span className="text-danger fs-12 mt-1 d-block">{errors.assigned_to}</span>}
            </div>
          </div>
          <div className="col-md-4">
            <label className="form-label">Status</label>
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
            <label className="form-label">Stage</label>
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
