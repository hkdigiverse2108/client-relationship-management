import React, { useState, useEffect } from 'react';
import CustomSelect from '../common/CustomSelect';
import CustomDatePicker from '../common/CustomDatePicker';
import axiosClient from '../../api/axiosClient';

const TaskModal = ({ isOpen, onClose, initialData, onSave }) => {
  const [formData, setFormData] = useState({
    title: '',
    task_type: 'Task',
    priority: 'Medium',
    status: 'To Do',
    project_id: '',
    assigned_to: '',
    start_date: new Date(),
    end_date: new Date(),
    reminder_date: null,
    description: '',
    notes: ''
  });

  const [errors, setErrors] = useState({});

  const [projectOptions, setProjectOptions] = useState([]);
  const [assigneeOptions, setAssigneeOptions] = useState([]);

  useEffect(() => {
    if (isOpen) {
      setErrors({}); // Reset errors on open
      // Fetch projects
      axiosClient.get('/projects').then(res => {
        if (res && Array.isArray(res)) {
          setProjectOptions(res.map(p => ({ value: p.id, label: p.title })));
        }
      }).catch(err => console.error("Failed to load projects", err));

      // Fetch users
      axiosClient.get('/users').then(res => {
        if (res && Array.isArray(res)) {
          setAssigneeOptions(res.map(u => ({ value: u.id, label: `${u.name} (${u.role})` })));
        }
      }).catch(err => console.error("Failed to load users", err));
    }
  }, [isOpen]);

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        task_type: initialData.task_type || 'Task',
        priority: initialData.priority || 'Medium',
        status: initialData.status || 'To Do',
        project_id: initialData.project_id || '',
        assigned_to: initialData.assigned_to || '',
        start_date: initialData.start_date ? new Date(initialData.start_date) : new Date(),
        end_date: initialData.end_date ? new Date(initialData.end_date) : new Date(),
        reminder_date: initialData.reminder_date ? new Date(initialData.reminder_date) : null,
        description: initialData.description || '',
        notes: initialData.notes || ''
      });
    } else {
      setFormData({
        title: '',
        task_type: 'Task',
        priority: 'Medium',
        status: 'To Do',
        project_id: '',
        assigned_to: '',
        start_date: new Date(),
        end_date: new Date(),
        reminder_date: null,
        description: '',
        notes: ''
      });
    }
  }, [initialData, isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title?.trim()) newErrors.title = 'Task Name is required';
    if (!formData.assigned_to) newErrors.assigned_to = 'Assignee is required';
    if (!formData.start_date) newErrors.start_date = 'Start Date is required';
    if (!formData.end_date) newErrors.end_date = 'Due Date is required';
    // Backend also requires project_id, so we require it if we want to be safe
    // if (!formData.project_id) newErrors.project_id = 'Project is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }
    
    if (onSave) {
      const submitData = {
        ...formData,
        start_date: formData.start_date ? formData.start_date.toISOString() : null,
        end_date: formData.end_date ? formData.end_date.toISOString() : null,
        reminder_date: formData.reminder_date ? formData.reminder_date.toISOString() : null
      };
      if (!submitData.project_id) submitData.project_id = "default_project";
      onSave(submitData);
    }
  };

  if (!isOpen) return null;

  const taskTypeOptions = [
    { value: 'Task', label: 'Task' },
    { value: 'Meeting', label: 'Meeting' },
    { value: 'Follow-up', label: 'Follow-up' },
    { value: 'Call', label: 'Call' },
    { value: 'Review', label: 'Review' }
  ];

  const priorityOptions = [
    { value: 'Low', label: 'Low' },
    { value: 'Medium', label: 'Medium' },
    { value: 'High', label: 'High' },
    { value: 'Critical', label: 'Critical' }
  ];

  const statusOptions = [
    { value: 'To Do', label: 'To Do' },
    { value: 'Inprogress', label: 'Inprogress' },
    { value: 'Pending', label: 'Pending' },
    { value: 'Review', label: 'Review' },
    { value: 'On-hold', label: 'On-hold' },
    { value: 'Completed', label: 'Completed' }
  ];

  return (
    <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{initialData ? 'Edit Task' : 'Add Task'}</h5>
            <button type="button" className="btn-close" onClick={onClose} aria-label="Close">×</button>
          </div>
          <div className="modal-body p-4">
            <form onSubmit={handleSubmit} noValidate>
              <div className="row g-3">
                <div className="col-12">
                  <label className="form-label">Task Name <span className="text-danger">*</span></label>
                  <input type="text" className={`form-control ${errors.title ? 'is-invalid' : ''}`} name="title" value={formData.title} onChange={handleInputChange} placeholder="e.g., Client Follow-up" />
                  {errors.title && <div className="invalid-feedback">{errors.title}</div>}
                </div>
                
                <div className="col-md-6">
                  <label className="form-label">Task Type</label>
                  <CustomSelect 
                    options={taskTypeOptions} 
                    value={taskTypeOptions.find(o => o.value === formData.task_type) || taskTypeOptions[0]}
                    onChange={(sel) => setFormData(prev => ({ ...prev, task_type: sel ? sel.value : '' }))}
                    placeholder="Select Type" 
                  />
                </div>
                
                <div className="col-md-6">
                  <label className="form-label">Priority</label>
                  <CustomSelect 
                    options={priorityOptions} 
                    value={priorityOptions.find(o => o.value === formData.priority) || priorityOptions[1]}
                    onChange={(sel) => setFormData(prev => ({ ...prev, priority: sel ? sel.value : '' }))}
                    placeholder="Select Priority" 
                  />
                </div>
                
                <div className="col-md-6">
                  <label className="form-label">Status</label>
                  <CustomSelect 
                    options={statusOptions} 
                    value={statusOptions.find(o => o.value === formData.status) || statusOptions[0]}
                    onChange={(sel) => setFormData(prev => ({ ...prev, status: sel ? sel.value : '' }))}
                    placeholder="Select Status" 
                  />
                </div>
                
                <div className="col-md-6">
                  <label className="form-label">Associated Project</label>
                  <CustomSelect 
                    options={projectOptions} 
                    value={projectOptions.find(o => o.value === formData.project_id) || null}
                    onChange={(sel) => setFormData(prev => ({ ...prev, project_id: sel ? sel.value : '' }))}
                    placeholder="Select Project" 
                  />
                </div>
                
                <div className="col-md-6">
                  <label className="form-label">Assign To <span className="text-danger">*</span></label>
                  <div className={errors.assigned_to ? 'border border-danger rounded' : ''}>
                    <CustomSelect 
                      options={assigneeOptions} 
                      value={assigneeOptions.find(o => o.value === formData.assigned_to) || null}
                      onChange={(sel) => {
                        setFormData(prev => ({ ...prev, assigned_to: sel ? sel.value : '' }));
                        setErrors(prev => ({ ...prev, assigned_to: null }));
                      }}
                      placeholder="Select User" 
                    />
                  </div>
                  {errors.assigned_to && <div className="text-danger mt-1 fs-12">{errors.assigned_to}</div>}
                </div>

                <div className="col-md-6">
                  <label className="form-label">Start Date <span className="text-danger">*</span></label>
                  <div className={errors.start_date ? 'border border-danger rounded' : ''}>
                    <CustomDatePicker 
                      selected={formData.start_date}
                      onChange={(date) => {
                        setFormData(prev => ({ ...prev, start_date: date }));
                        setErrors(prev => ({ ...prev, start_date: null }));
                      }}
                      placeholderText="Select Start Date"
                      className="form-control"
                    />
                  </div>
                  {errors.start_date && <div className="text-danger mt-1 fs-12">{errors.start_date}</div>}
                </div>

                <div className="col-md-6">
                  <label className="form-label">Due Date <span className="text-danger">*</span></label>
                  <div className={errors.end_date ? 'border border-danger rounded' : ''}>
                    <CustomDatePicker 
                      selected={formData.end_date}
                      onChange={(date) => {
                        setFormData(prev => ({ ...prev, end_date: date }));
                        setErrors(prev => ({ ...prev, end_date: null }));
                      }}
                      placeholderText="Select Due Date"
                      className="form-control"
                    />
                  </div>
                  {errors.end_date && <div className="text-danger mt-1 fs-12">{errors.end_date}</div>}
                </div>

                <div className="col-md-6">
                  <label className="form-label">Reminder Date</label>
                  <CustomDatePicker 
                    selected={formData.reminder_date}
                    onChange={(date) => setFormData(prev => ({ ...prev, reminder_date: date }))}
                    placeholderText="Select Reminder Date"
                    className="form-control"
                  />
                </div>
                
                <div className="col-12">
                  <label className="form-label">Description</label>
                  <textarea className="form-control" name="description" value={formData.description} onChange={handleInputChange} rows="3" placeholder="Detailed description of the task"></textarea>
                </div>

                <div className="col-12">
                  <label className="form-label">Notes</label>
                  <textarea className="form-control" name="notes" value={formData.notes} onChange={handleInputChange} rows="2" placeholder="Any additional notes"></textarea>
                </div>

              </div>
              <div className="d-flex justify-content-end gap-2 mt-4">
                <button type="button" className="btn btn-light" onClick={onClose}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save Task</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;


