import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import CustomSelect from './CustomSelect';
import CustomDatePicker from './CustomDatePicker';
import axiosClient from '../../api/axiosClient';
import toast from 'react-hot-toast';

export default function DealFormModal({ open, onClose, onSubmit, initialData = null, defaultStage = 'Lead', defaultClient = '' }) {
  const [formData, setFormData] = useState({
    title: '',
    client_id: '',
    company_name: '',
    amount: '',
    stage: 'Lead',
    probability: '',
    expected_close_date: '',
    assigned_to: '',
    notes: ''
  });
  const [errors, setErrors] = useState({});
  
  const [clients, setClients] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      fetchClientsAndUsers();
      if (initialData) {
        setFormData({
          title: initialData.title || '',
          client_id: initialData.client_id || '',
          company_name: initialData.company_name || '',
          amount: initialData.amount || '',
          stage: initialData.stage || defaultStage,
          probability: initialData.probability || '',
          expected_close_date: initialData.expected_close_date || '',
          assigned_to: initialData.assigned_to || '',
          notes: initialData.notes || ''
        });
      } else {
        setFormData({
          title: '',
          client_id: defaultClient || '',
          company_name: '',
          amount: '',
          stage: defaultStage,
          probability: '',
          expected_close_date: '',
          assigned_to: '',
          notes: ''
        });
      }
      setErrors({});
    }
  }, [open, initialData, defaultStage, defaultClient]);

  const fetchClientsAndUsers = async () => {
    try {
      const [clientRes, userRes] = await Promise.all([
        axiosClient.get('/clients'),
        axiosClient.get('/users')
      ]);
      setClients(clientRes || []);
      setUsers(userRes || []);
    } catch (err) {
      console.error("Failed to fetch dependencies", err);
      toast.error("Failed to load clients and users");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    const newErrors = {};
    if (!formData.title?.trim()) newErrors.title = "Deal Title is required";
    if (!formData.client_id) newErrors.client_id = "Client is required";
    if (!formData.amount) newErrors.amount = "Amount is required";
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setLoading(true);
    
    // Formatting data for backend
    const submitData = { ...formData };
    submitData.amount = parseFloat(submitData.amount) || 0;
    if (submitData.probability) {
      submitData.probability = parseFloat(submitData.probability);
    } else {
      delete submitData.probability;
    }
    if (!submitData.expected_close_date) delete submitData.expected_close_date;
    if (!submitData.assigned_to) delete submitData.assigned_to;
    if (!submitData.company_name) delete submitData.company_name;
    if (!submitData.notes) delete submitData.notes;

    try {
      if (initialData && (initialData._id || initialData.id)) {
        await axiosClient.put(`/deals/${initialData._id || initialData.id}`, submitData);
        toast.success("Deal updated successfully");
      } else {
        await axiosClient.post('/deals', submitData);
        toast.success("Deal created successfully");
      }
      
      if (onSubmit) {
        onSubmit();
      }
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Failed to save deal");
    } finally {
      setLoading(false);
    }
  };

  const clientOptions = clients.map(c => ({ value: c._id || c.id, label: c.client_name || 'Unknown Client' }));
  const userOptions = users.map(u => ({ value: u._id || u.id, label: u.name || 'Unknown User' }));
  
  return (
    <Modal open={open} onClose={onClose} title={initialData ? "Edit Deal" : "Create New Deal"} size="lg">
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label">Deal Title <span className="text-danger">*</span></label>
              <input type="text" className={`form-control ${errors.title ? 'is-invalid' : ''}`} name="title" value={formData.title} onChange={handleChange} />
              {errors.title && <div className="text-danger fs-12 mt-1">{errors.title}</div>}
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label">Client <span className="text-danger">*</span></label>
              <CustomSelect 
                options={clientOptions}
                value={clientOptions.find(o => o.value === formData.client_id) || null}
                onChange={(opt) => handleChange({ target: { name: 'client_id', value: opt ? opt.value : '' } })}
                placeholder="Select Client"
              />
              {errors.client_id && <div className="text-danger fs-12 mt-1">{errors.client_id}</div>}
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label">Company Name</label>
              <input type="text" className="form-control" name="company_name" value={formData.company_name} onChange={handleChange} />
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label">Amount (₹) <span className="text-danger">*</span></label>
              <input type="number" className={`form-control ${errors.amount ? 'is-invalid' : ''}`} name="amount" value={formData.amount} onChange={handleChange} min="0" step="0.01" />
              {errors.amount && <div className="text-danger fs-12 mt-1">{errors.amount}</div>}
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label">Stage <span className="text-danger">*</span></label>
              <CustomSelect 
                options={[
                  { value: 'Lead', label: 'Lead' },
                  { value: 'Contacted', label: 'Contacted' },
                  { value: 'Proposal Sent', label: 'Proposal Sent' },
                  { value: 'Negotiation', label: 'Negotiation' },
                  { value: 'Won', label: 'Won' },
                  { value: 'Lost', label: 'Lost' }
                ]}
                value={{ value: formData.stage, label: formData.stage }}
                onChange={(option) => handleChange({ target: { name: 'stage', value: option ? option.value : '' } })}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label">Probability (%)</label>
              <input type="number" className="form-control" min="0" max="100" name="probability" value={formData.probability} onChange={handleChange} />
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label">Expected Close Date</label>
              <div className="input-icon position-relative">
                <span className="input-icon-addon">
                  <i className="ti ti-calendar"></i>
                </span>
                <CustomDatePicker 
                  selected={formData.expected_close_date ? new Date(formData.expected_close_date) : null}
                  onChange={(date) => {
                    const value = date ? date.toISOString().split('T')[0] : '';
                    handleChange({ target: { name: 'expected_close_date', value } });
                  }}
                  className="form-control"
                  placeholderText="Expected Close Date"
                  isRange={false}
                />
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label">Assigned To</label>
              <CustomSelect 
                options={userOptions}
                value={userOptions.find(o => o.value === formData.assigned_to) || null}
                onChange={(opt) => handleChange({ target: { name: 'assigned_to', value: opt ? opt.value : '' } })}
                placeholder="Select User"
              />
            </div>
          </div>
          <div className="col-md-12">
            <div className="mb-3">
              <label className="form-label">Notes</label>
              <textarea className="form-control" rows="3" name="notes" value={formData.notes} onChange={handleChange}></textarea>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-end gap-2 mt-3">
          <button type="button" className="btn btn-light" onClick={onClose} disabled={loading}>Cancel</button>
          <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? 'Saving...' : (initialData ? 'Edit Deal' : 'Create Deal')}</button>
        </div>
      </form>
    </Modal>
  );
}
