import React from 'react';
import CustomSelect from '../common/CustomSelect';
import CustomDatePicker from '../common/CustomDatePicker';

const ReminderModal = ({ isOpen, onClose, reminder }) => {
  if (!isOpen) return null;

  const categoryOptions = [
    { value: 'call', label: 'Call' },
    { value: 'document', label: 'Document' },
    { value: 'payment', label: 'Payment' },
    { value: 'meeting', label: 'Meeting' },
    { value: 'task', label: 'Task' },
    { value: 'debug', label: 'Debug' },
    { value: 'other', label: 'Other' }
  ];

  const priorityOptions = [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
    { value: 'critical', label: 'Critical' }
  ];

  // Dummy clients for the dropdown
  const clientOptions = [
    { value: '1', label: 'Acme Corp' },
    { value: '2', label: 'Globex Inc' },
    { value: '3', label: 'Initech' },
    { value: '4', label: 'Soylent Corp' }
  ];

  return (
    <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{reminder ? 'Edit Reminder' : 'New Reminder'}</h5>
            <button type="button" className="btn-close" onClick={onClose} aria-label="Close">×</button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label className="form-label">Description / Action <span className="text-danger">*</span></label>
                <input type="text" className="form-control" placeholder="What needs to be done?" defaultValue={reminder?.description} />
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Category Type <span className="text-danger">*</span></label>
                  <CustomSelect options={categoryOptions} placeholder="Select Category" defaultValue={reminder ? categoryOptions.find(o => o.value === reminder.category) : null} />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Priority <span className="text-danger">*</span></label>
                  <CustomSelect options={priorityOptions} placeholder="Select Priority" defaultValue={reminder ? priorityOptions.find(o => o.value === reminder.priority) : null} />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Linked Client <span className="text-danger">*</span></label>
                <CustomSelect options={clientOptions} placeholder="Select Client" defaultValue={reminder ? clientOptions.find(o => o.value === reminder.client_id) : null} />
              </div>

              <div className="mb-3">
                <label className="form-label">Due Date & Time <span className="text-danger">*</span></label>
                <div className="input-icon position-relative w-100">
                  <CustomDatePicker 
                    showTimeSelect={true}
                    placeholderText="Select Due Date & Time"
                    className="form-control"
                  />
                </div>
              </div>

              <div className="d-flex align-items-center justify-content-end gap-2 mt-4">
                <button type="button" className="btn btn-light border" onClick={onClose}>
                  Cancel
                </button>
                <button type="button" className="btn btn-primary" onClick={(e) => { e.preventDefault(); onClose(); }}>
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
