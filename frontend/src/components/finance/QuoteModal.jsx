import React, { useState, useEffect } from 'react';
import CustomSelect from '../common/CustomSelect';
import CustomDatePicker from '../common/CustomDatePicker';

const QuoteModal = ({ isOpen, onClose, quote, onSave }) => {
  const [formData, setFormData] = useState({
    quote_number: `QT-${Math.floor(1000 + Math.random() * 9000)}`,
    client_id: '',
    product_name: '',
    unit_price: 0,
    quantity: 1,
    discount: 0,
    tax_percentage: 18,
    validity_days: 30,
    status: 'Draft',
    notes: '',
    date_sent: new Date().toISOString().split('T')[0]
  });

  // Mock clients for the dropdown (since we don't have the API setup here)
  const clients = [
    { id: '1', name: 'Anthony Lewis' },
    { id: '2', name: 'Brian Villalobos' },
    { id: '3', name: 'Harvey Smith' }
  ];

  const clientOptions = clients.map(c => ({ value: c.id, label: c.name }));

  const statusOptions = [
    { value: 'Draft', label: 'Draft' },
    { value: 'Sent', label: 'Sent' },
    { value: 'Accepted', label: 'Accepted' },
    { value: 'Rejected', label: 'Rejected' },
    { value: 'Expired', label: 'Expired' }
  ];

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    let finalValue = value;
    if (type === 'number') {
      finalValue = value ? parseFloat(value) : 0;
    }
    setFormData(prev => ({ ...prev, [name]: finalValue }));
  };

  const handleSelectChange = (name, selectedOption) => {
    setFormData(prev => ({ ...prev, [name]: selectedOption ? selectedOption.value : '' }));
  };

  const handleDateChange = (name, date) => {
    if (date) {
      const offset = date.getTimezoneOffset();
      const adjustedDate = new Date(date.getTime() - (offset * 60 * 1000));
      setFormData(prev => ({ ...prev, [name]: adjustedDate.toISOString().split('T')[0] }));
    }
  };

  // Calculated fields
  const sub_total = (formData.unit_price * formData.quantity) - formData.discount;
  const tax_amount = sub_total > 0 ? (sub_total * formData.tax_percentage) / 100 : 0;
  const total_amount = sub_total + tax_amount;

  if (!isOpen) return null;

  return (
    <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="modal-header border-bottom">
            <h5 className="modal-title">{quote ? "Edit Quotation" : "New Quotation"}</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body p-4 custom-scroll" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
            
            <div className="row mb-4">
              <div className="col-md-6 mb-3">
                <label className="form-label fw-medium">Quote Number *</label>
                <input 
                  type="text" 
                  className="form-control bg-light" 
                  name="quote_number" 
                  value={formData.quote_number} 
                  readOnly 
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label fw-medium">Prospect Client *</label>
                <CustomSelect 
                  options={clientOptions} 
                  value={clientOptions.find(o => o.value === formData.client_id)} 
                  onChange={(option) => handleSelectChange('client_id', option)} 
                />
              </div>
            </div>

            <div className="row mb-4">
              <h6 className="mb-3 text-primary border-bottom pb-2">Product & Pricing Details</h6>
              
              <div className="col-md-6 mb-3">
                <label className="form-label fw-medium">Product Name / Service *</label>
                <input 
                  type="text" 
                  className="form-control" 
                  name="product_name" 
                  value={formData.product_name} 
                  onChange={handleChange} 
                  required
                />
              </div>
              
              <div className="col-md-3 mb-3">
                <label className="form-label fw-medium">Unit Price (₹) *</label>
                <input 
                  type="number" 
                  className="form-control" 
                  name="unit_price" 
                  value={formData.unit_price} 
                  onChange={handleChange} 
                  min="0"
                  required
                />
              </div>
              
              <div className="col-md-3 mb-3">
                <label className="form-label fw-medium">Quantity *</label>
                <input 
                  type="number" 
                  className="form-control" 
                  name="quantity" 
                  value={formData.quantity} 
                  onChange={handleChange} 
                  min="1"
                  required
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label fw-medium">Discount (₹)</label>
                <input 
                  type="number" 
                  className="form-control" 
                  name="discount" 
                  value={formData.discount} 
                  onChange={handleChange} 
                  min="0"
                />
              </div>
              
              <div className="col-md-6 mb-3">
                <label className="form-label fw-medium">Tax (%) *</label>
                <input 
                  type="number" 
                  className="form-control" 
                  name="tax_percentage" 
                  value={formData.tax_percentage} 
                  onChange={handleChange} 
                  min="0"
                  required
                />
              </div>

              <div className="col-12 mt-2">
                <div className="bg-light p-3 rounded border">
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted">Subtotal:</span>
                    <span className="fw-medium">₹{sub_total.toFixed(2)}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted">Tax Amount:</span>
                    <span className="fw-medium">₹{tax_amount.toFixed(2)}</span>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between pt-2">
                    <span className="fw-bold">Total Amount:</span>
                    <span className="fw-bold text-primary">₹{total_amount.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="row mb-4">
              <h6 className="mb-3 text-primary border-bottom pb-2">Status & Validity</h6>
              
              <div className="col-md-4 mb-3">
                <label className="form-label fw-medium">Date Sent</label>
                <div className="input-icon position-relative w-100">
                  <span className="input-icon-addon"><i className="ti ti-calendar"></i></span>
                  <CustomDatePicker 
                    selected={formData.date_sent ? new Date(formData.date_sent) : null} 
                    onChange={(date) => handleDateChange('date_sent', date)} 
                    className="form-control"
                  />
                </div>
              </div>
              
              <div className="col-md-4 mb-3">
                <label className="form-label fw-medium">Validity (Days) *</label>
                <input 
                  type="number" 
                  className="form-control" 
                  name="validity_days" 
                  value={formData.validity_days} 
                  onChange={handleChange} 
                  min="1"
                  required
                />
              </div>
              
              <div className="col-md-4 mb-3">
                <label className="form-label fw-medium">Status *</label>
                <CustomSelect 
                  options={statusOptions} 
                  value={statusOptions.find(o => o.value === formData.status)} 
                  onChange={(option) => handleSelectChange('status', option)} 
                />
              </div>

              <div className="col-12 mt-3">
                <label className="form-label fw-medium">Notes / Terms</label>
                <textarea 
                  className="form-control" 
                  name="notes" 
                  value={formData.notes || ''} 
                  onChange={handleChange}
                  rows="3"
                  placeholder="Any special conditions or notes for the client."
                ></textarea>
              </div>
            </div>

          </div>
          <div className="modal-footer border-top">
            <button type="button" className="btn btn-light" onClick={onClose}>Cancel</button>
            <button type="button" className="btn btn-primary" onClick={onClose}>Save Quotation</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuoteModal;
