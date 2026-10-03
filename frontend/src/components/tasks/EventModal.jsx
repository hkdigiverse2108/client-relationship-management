import React, { useState, useEffect } from 'react';
import CustomDatePicker from '../common/CustomDatePicker';
import CustomTimePicker from '../common/CustomTimePicker';
import CustomSelect from '../common/CustomSelect';
import toast from 'react-hot-toast';

const EventModal = ({ isOpen, onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState({
    title: '',
    date: null,
    start_time: null,
    end_time: null,
    location: '',
    description: '',
    className: 'bg-transparent-primary'
  });
  const [errors, setErrors] = useState({});

  const colorOptions = [
    { value: 'bg-transparent-skyblue', label: 'Primary' },
    { value: 'bg-transparent-success', label: 'Success' },
    { value: 'bg-transparent-danger', label: 'Danger' },
    { value: 'bg-transparent-warning', label: 'Warning' },
    { value: 'bg-transparent-info', label: 'Info' },
    { value: 'bg-transparent-purple', label: 'Purple' }
  ];

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        let parsedDate = null;
        if (initialData.date) {
          const parts = initialData.date.split('-');
          if (parts.length === 3) {
            parsedDate = new Date(parts[0], parts[1] - 1, parts[2]);
          } else {
            parsedDate = new Date(initialData.date);
          }
        } else if (initialData.start) {
          parsedDate = new Date(initialData.start);
        }

        const validClassNames = [
          'bg-transparent-skyblue',
          'bg-transparent-success',
          'bg-transparent-danger',
          'bg-transparent-warning',
          'bg-transparent-info',
          'bg-transparent-purple'
        ];
        
        let initialClassName = initialData.className;
        if (!validClassNames.includes(initialClassName)) {
          initialClassName = 'bg-transparent-skyblue';
        }

        setFormData({
          title: initialData.title || '',
          date: parsedDate,
          start_time: initialData.start_time ? new Date(`1970-01-01T${initialData.start_time}`) : null,
          end_time: initialData.end_time ? new Date(`1970-01-01T${initialData.end_time}`) : null,
          location: initialData.location || '',
          description: initialData.description || '',
          className: initialClassName,
          id: initialData.id
        });
      } else {
        setFormData({
          title: '',
          date: new Date(),
          start_time: null,
          end_time: null,
          location: '',
          description: '',
          className: 'bg-transparent-skyblue'
        });
      }
      setErrors({});
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.title) newErrors.title = "Event Name is required";
    if (!formData.date) newErrors.date = "Event Date is required";
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    
    // Format dates to strings preserving local timezone
    const year = formData.date ? formData.date.getFullYear() : '';
    const month = formData.date ? String(formData.date.getMonth() + 1).padStart(2, '0') : '';
    const day = formData.date ? String(formData.date.getDate()).padStart(2, '0') : '';
    const localDateStr = formData.date ? `${year}-${month}-${day}` : '';

    const formatTime = (timeVal) => {
      if (!timeVal) return null;
      if (typeof timeVal === 'string') {
        // If it's already a time string or a formatted string, return as is or extract HH:mm
        const match = timeVal.match(/(\d{2}:\d{2})/);
        return match ? match[1] : timeVal;
      }
      if (timeVal instanceof Date && !isNaN(timeVal)) {
        return timeVal.toTimeString().slice(0, 5);
      }
      return null;
    };

    const payload = {
      ...formData,
      date: localDateStr,
      start_time: formatTime(formData.start_time),
      end_time: formatTime(formData.end_time),
      className: formData.className || 'bg-transparent-skyblue'
    };
    
    onSave(payload);
  };

  return (
    <>
      <div className="modal fade show" style={{ display: 'block', background: 'rgba(0,0,0,0.5)' }} tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{initialData ? 'Edit Event' : 'Add New Event'}</h5>
              <button type="button" className="btn-close" onClick={onClose} aria-label="Close">x</button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Event Name <span className="text-danger">*</span></label>
                  <input type="text" className={`form-control ${errors.title ? 'is-invalid' : ''}`} value={formData.title} onChange={e => {setFormData({...formData, title: e.target.value}); setErrors({...errors, title: null});}} />
                  {errors.title && <div className="invalid-feedback">{errors.title}</div>}
                </div>
                
                <div className="mb-3">
                  <label className="form-label">Event Date <span className="text-danger">*</span></label>
                  <div className="input-icon position-relative">
                    <span className="input-icon-addon">
                      <i className="ti ti-calendar"></i>
                    </span>
                    <CustomDatePicker 
                      className={`form-control ${errors.date ? 'is-invalid' : ''}`} 
                      placeholderText="Select Date" 
                      isRange={false} 
                      selected={formData.date}
                      onChange={date => {setFormData({...formData, date}); setErrors({...errors, date: null});}}
                    />
                  </div>
                  {errors.date && <div className="text-danger fs-12 mt-1">{errors.date}</div>}
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Start Time</label>
                    <div className="input-icon position-relative w-100">
                      <CustomTimePicker 
                        placeholderText="Select Start Time" 
                        selected={formData.start_time}
                        onChange={time => setFormData({...formData, start_time: time})}
                      />
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">End Time</label>
                    <div className="input-icon position-relative w-100">
                      <CustomTimePicker 
                        placeholderText="Select End Time" 
                        selected={formData.end_time}
                        onChange={time => setFormData({...formData, end_time: time})}
                      />
                    </div>
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Event Location</label>
                  <input type="text" className="form-control" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} />
                </div>
                
                <div className="mb-3">
                  <label className="form-label">Event Color</label>
                  <CustomSelect 
                    options={colorOptions}
                    value={colorOptions.find(o => o.value === formData.className) || colorOptions[0]}
                    onChange={(option) => setFormData({...formData, className: option ? option.value : 'bg-transparent-skyblue'})}
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label">Descriptions</label>
                  <textarea className="form-control" rows="4" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}></textarea>
                </div>

                <div className="d-flex align-items-center justify-content-end gap-2">
                  <button type="button" className="btn btn-light border" onClick={onClose}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    {initialData ? 'Save Changes' : 'Add Event'}
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
