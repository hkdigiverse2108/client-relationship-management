import React from 'react';
import CustomDatePicker from '../common/CustomDatePicker';
import CustomTimePicker from '../common/CustomTimePicker';

const EventModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="modal fade show" style={{ display: 'block', background: 'rgba(0,0,0,0.5)' }} tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add New Event</h5>
              <button type="button" className="btn-close" onClick={onClose} aria-label="Close">x</button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label className="form-label">Event Name</label>
                  <input type="text" className="form-control" />
                </div>
                
                <div className="mb-3">
                  <label className="form-label">Event Date</label>
                  <div className="input-icon position-relative">
                    <span className="input-icon-addon">
                      <i className="ti ti-calendar"></i>
                    </span>
                    <CustomDatePicker type="text" className="form-control" placeholder="Select Date" isRange={false} />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Start Time</label>
                    <div className="input-icon position-relative w-100">
                      <CustomTimePicker placeholderText="Select Start Time" />
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">End Time</label>
                    <div className="input-icon position-relative w-100">
                      <CustomTimePicker placeholderText="Select End Time" />
                    </div>
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Event Location</label>
                  <input type="text" className="form-control" />
                </div>

                <div className="mb-4">
                  <label className="form-label">Descriptions</label>
                  <textarea className="form-control" rows="4"></textarea>
                </div>

                <div className="d-flex align-items-center justify-content-end gap-2">
                  <button type="button" className="btn btn-light border" onClick={onClose}>
                    Cancel
                  </button>
                  <button type="button" className="btn btn-primary" onClick={(e) => { e.preventDefault(); onClose(); }}>
                    Add Event
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventModal;
