import React, { useState, useEffect } from 'react';
import CustomSelect from '../common/CustomSelect';
import CustomDatePicker from '../common/CustomDatePicker';
import toast from 'react-hot-toast';

const ReminderModal = ({ isOpen, onClose, reminder, onSave, clients = [] }) => {
  const [formData, setFormData] = useState({
    description: '',
    category: '',
    priority: 'medium',
    client_id: '',
    due_date: null
  });
  const [errors, setErrors] = useState({});
  const [categoryOptions, setCategoryOptions] = useState([
    { value: 'call', label: 'Call' },
    { value: 'document', label: 'Document' },
    { value: 'payment', label: 'Payment' },
    { value: 'meeting', label: 'Meeting' },
    { value: 'task', label: 'Task' },
    { value: 'debug', label: 'Debug' },
    { value: 'other', label: 'Other' }
  ]);

  useEffect(() => {
    if (isOpen) {
      if (reminder) {
        setFormData({
          description: reminder.description || '',
          category: reminder.category || '',
          priority: reminder.priority || 'medium',
          client_id: reminder.client_id || '',
          due_date: reminder.due_date ? new Date(reminder.due_date) : null
        });
      } else {
        setFormData({
          description: '',
          category: '',
          priority: 'medium',
          client_id: '',
          due_date: null
        });
      }
      setErrors({});
    }
  }, [isOpen, reminder]);

  if (!isOpen) return null;

  // Category options are managed by state

  const priorityOptions = [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
    { value: 'critical', label: 'Critical' }
  ];

  const clientOptions = clients.map(c => ({
    value: c._id || c.client_id,
    label: c.client_name || c.company_name || 'Unknown Client'
  }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.description) newErrors.description = "Action / Description is required";
    if (!formData.client_id) newErrors.client_id = "Linked Client is required";
    if (!formData.due_date) newErrors.due_date = "Due Date & Time is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSave({
      ...reminder,
      ...formData,
      category: formData.category || '-',
      due_date: formData.due_date.toISOString()
    });
  };

  return (
    <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{reminder ? 'Edit Reminder' : 'New Reminder'}</h5>
            <button type="button" className="btn-close" onClick={onClose} aria-label="Close">×</button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Description / Action <span className="text-danger">*</span></label>
                <input 
                  type="text" 
                  className={`form-control ${errors.description ? 'is-invalid' : ''}`} 
                  placeholder="What needs to be done?" 
                  value={formData.description} 
                  onChange={e => { setFormData({...formData, description: e.target.value}); setErrors({...errors, description: null}); }} 
                />
                {errors.description && <div className="invalid-feedback">{errors.description}</div>}
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Category Type</label>
                  <CustomSelect 
                    options={categoryOptions} 
                    placeholder="Select Category" 
                    value={categoryOptions.find(o => o.value === formData.category) || null} 
                    onChange={opt => setFormData({...formData, category: opt ? opt.value : ''})}
                    creatable={true}
                    onCreateOption={(inputValue) => {
                      const newOption = { label: inputValue, value: inputValue.toLowerCase().replace(/\s+/g, '_') };
                      setCategoryOptions([...categoryOptions, newOption]);
                      setFormData({ ...formData, category: newOption.value });
                      toast.success(`Category "${inputValue}" added successfully!`);
                    }}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Priority</label>
                  <CustomSelect 
                    options={priorityOptions} 
                    placeholder="Select Priority" 
                    value={priorityOptions.find(o => o.value === formData.priority) || null} 
                    onChange={opt => setFormData({...formData, priority: opt ? opt.value : 'medium'})}
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Linked Client <span className="text-danger">*</span></label>
                <CustomSelect 
                  options={clientOptions} 
                  placeholder="Select Client" 
                  value={clientOptions.find(o => o.value === formData.client_id) || null}
                  onChange={opt => { setFormData({...formData, client_id: opt ? opt.value : ''}); setErrors({...errors, client_id: null}); }}
                />
                {errors.client_id && <div className="text-danger fs-12 mt-1">{errors.client_id}</div>}
              </div>

              <div className="mb-3">
                <label className="form-label">Due Date & Time <span className="text-danger">*</span></label>
                <div className="input-icon position-relative w-100">
                  <CustomDatePicker 
                    showTimeSelect={true}
                    placeholderText="Select Due Date & Time"
                    className={`form-control ${errors.due_date ? 'is-invalid' : ''}`}
                    selected={formData.due_date}
                    onChange={date => { setFormData({...formData, due_date: date}); setErrors({...errors, due_date: null}); }}
                    dateFormat="MMM d, yyyy h:mm aa"
                  />
                </div>
                {errors.due_date && <div className="text-danger fs-12 mt-1">{errors.due_date}</div>}
              </div>

              <div className="d-flex align-items-center justify-content-end gap-2 mt-4">
                <button type="button" className="btn btn-light border" onClick={onClose}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {reminder ? 'Update Reminder' : 'Add Reminder'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReminderModal;
