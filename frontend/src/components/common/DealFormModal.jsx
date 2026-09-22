import React, { useState } from 'react';
import Modal from './Modal';
import CustomDatePicker from './CustomDatePicker';
import CustomSelect from './CustomSelect';

export default function DealFormModal({ open, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    amount: '',
    stage: '',
    probability: '',
    expectedCloseDate: '',
    assignedTo: '',
    notes: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    }
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Create New Deal"
      size="lg"
    >
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label">Deal Title <span className="text-danger">*</span></label>
              <input type="text" className="form-control" name="title" value={formData.title} onChange={handleChange} required />
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label">Company Name</label>
              <input type="text" className="form-control" name="company" value={formData.company} onChange={handleChange} />
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label">Amount ($) <span className="text-danger">*</span></label>
              <input type="number" className="form-control" name="amount" value={formData.amount} onChange={handleChange} required />
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
                value={formData.stage ? { value: formData.stage, label: formData.stage } : null}
                onChange={(option) => handleChange({ target: { name: 'stage', value: option.value } })}
                placeholder="Select Stage"
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
                <CustomDatePicker type="text" className="form-control" placeholder="Expected Close" isRange={false} />
              </div>
            </div>
          </div>
          <div className="col-md-12">
            <div className="mb-3">
              <label className="form-label">Assigned To <span className="text-danger">*</span></label>
              <CustomSelect 
                options={[
                  { value: 'Sophie', label: 'Sophie' },
                  { value: 'Cameron', label: 'Cameron' },
                  { value: 'Doris', label: 'Doris' }
                ]}
                value={formData.assignedTo ? { value: formData.assignedTo, label: formData.assignedTo } : null}
                onChange={(option) => handleChange({ target: { name: 'assignedTo', value: option.value } })}
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
          <button type="button" className="btn btn-light" onClick={onClose}>Cancel</button>
          <button type="submit" className="btn btn-primary">Create Deal</button>
        </div>
      </form>
    </Modal>
  );
}
