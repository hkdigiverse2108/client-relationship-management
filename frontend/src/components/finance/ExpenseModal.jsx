import React, { useState, useEffect } from 'react';
import CustomSelect from '../common/CustomSelect';
import CustomDatePicker from '../common/CustomDatePicker';

const ExpenseModal = ({ isOpen, onClose, onSave, expense = null, categories = [], onCreateCategory }) => {
  const defaultState = {
    expense_id: `EXP-${Math.floor(1000 + Math.random() * 9000)}`,
    date: new Date().toISOString().split('T')[0],
    category: '',
    amount: '',
    merchant: '',
    payment_method: '',
    reference_id: '',
    notes: '',
    receipt_url: '',
    merchant_gstin: '',
    tax_amount: '',
    status: 'Cleared'
  };

  const [formData, setFormData] = useState(defaultState);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      if (expense) {
        setFormData(expense);
      } else {
        setFormData({
          ...defaultState,
          expense_id: `EXP-${Math.floor(1000 + Math.random() * 9000)}`
        });
      }
      setErrors({});
    }
  }, [isOpen, expense]);

  const paymentMethods = [
    { value: '', label: 'Select Payment Method' },
    { value: 'Bank Transfer', label: 'Bank Transfer' },
    { value: 'Credit Card', label: 'Credit Card' },
    { value: 'Cash', label: 'Cash' },
    { value: 'UPI', label: 'UPI' },
    { value: 'Cheque', label: 'Cheque' },
    { value: 'Other', label: 'Other' }
  ];

  const statusOptions = [
    { value: 'Cleared', label: 'Cleared' },
    { value: 'Pending', label: 'Pending' }
  ];

  const categoryOptions = categories.map(c => ({ value: c.name, label: c.name }));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
  };

  const handleSelectChange = (name, option) => {
    setFormData(prev => ({ ...prev, [name]: option ? option.value : '' }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
  };

  const handleDateChange = (date) => {
    setFormData(prev => ({ 
      ...prev, 
      date: date ? date.toISOString().split('T')[0] : '' 
    }));
  };

  const handleCreateCategory = async (inputValue) => {
    if (onCreateCategory) {
      await onCreateCategory(inputValue);
      setFormData(prev => ({ ...prev, category: inputValue }));
    }
  };

  const handleSave = () => {
    const newErrors = {};
    if (!formData.amount) newErrors.amount = "Amount is required";
    if (!formData.payment_method) newErrors.payment_method = "Payment method is required";
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className={`modal fade ${isOpen ? 'show d-block' : ''}`} tabIndex="-1" style={{ backgroundColor: isOpen ? 'rgba(0,0,0,0.5)' : 'transparent' }}>
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content border-0">
          <div className="modal-header border-bottom">
            <h5 className="modal-title">{expense ? 'Edit Expense' : 'Add Expense'}</h5>
            <button type="button" className="btn-close btn-close-dark fs-20" onClick={onClose} aria-label="Close">✖</button>
          </div>
          
          <div className="modal-body p-4">
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label fw-medium">Expense ID</label>
                <input 
                  type="text" 
                  className="form-control bg-light" 
                  name="expense_id"
                  value={formData.expense_id || ''}
                  readOnly 
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label fw-medium">Date</label>
                <div className="input-icon position-relative w-100">
                  <span className="input-icon-addon"><i className="ti ti-calendar"></i></span>
                  <CustomDatePicker 
                    selected={formData.date ? new Date(formData.date) : null} 
                    onChange={handleDateChange} 
                    className="form-control"
                  />
                </div>
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label fw-medium">Category</label>
                <CustomSelect 
                  creatable={true}
                  isClearable
                  options={categoryOptions}
                  value={formData.category ? { value: formData.category, label: formData.category } : null}
                  onChange={(option) => handleSelectChange('category', option)}
                  onCreateOption={handleCreateCategory}
                  placeholder="Choose Category"
                  formatCreateLabel={(inputValue) => `Create "${inputValue}"`}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label fw-medium">Amount *</label>
                <div className="input-group">
                  <span className="input-group-text">Rs.</span>
                  <input 
                    type="number" 
                    step="0.01"
                    min="0"
                    className={`form-control ${errors.amount ? 'is-invalid' : ''}`} 
                    name="amount"
                    value={formData.amount || ''}
                    onChange={handleChange}
                  />
                </div>
                {errors.amount && <div className="text-danger mt-1 fs-12">{errors.amount}</div>}
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label fw-medium">Merchant / Vendor</label>
                <input 
                  type="text" 
                  className="form-control" 
                  name="merchant"
                  value={formData.merchant || ''}
                  onChange={handleChange}
                  placeholder="e.g. Amazon, AWS, Office Depot"
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label fw-medium">Vendor GSTIN</label>
                <input 
                  type="text" 
                  className="form-control text-uppercase" 
                  name="merchant_gstin"
                  value={formData.merchant_gstin || ''}
                  onChange={handleChange}
                  placeholder="15-digit GSTIN (Optional)"
                  maxLength={15}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label fw-medium">Tax Amount (GST)</label>
                <div className="input-group">
                  <span className="input-group-text">Rs.</span>
                  <input 
                    type="number" 
                    step="0.01"
                    min="0"
                    className="form-control" 
                    name="tax_amount"
                    value={formData.tax_amount || ''}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label fw-medium">Payment Method *</label>
                <CustomSelect 
                  options={paymentMethods}
                  value={paymentMethods.find(m => m.value === formData.payment_method) || null}
                  onChange={(option) => handleSelectChange('payment_method', option)}
                />
                {errors.payment_method && <div className="text-danger mt-1 fs-12">{errors.payment_method}</div>}
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label fw-medium">Reference ID (Txn/Receipt)</label>
                <input 
                  type="text" 
                  className="form-control" 
                  name="reference_id"
                  value={formData.reference_id || ''}
                  onChange={handleChange}
                  placeholder="Optional"
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label fw-medium">Status</label>
                <CustomSelect 
                  options={statusOptions}
                  value={statusOptions.find(s => s.value === formData.status) || statusOptions[0]}
                  onChange={(option) => handleSelectChange('status', option)}
                />
                <small className="text-muted mt-1 d-block">Cleared expenses auto-deduct from Ledger.</small>
              </div>
              
              <div className="col-12 mb-3">
                <label className="form-label fw-medium">Receipt URL</label>
                <input 
                  type="url" 
                  className="form-control" 
                  name="receipt_url"
                  value={formData.receipt_url || ''}
                  onChange={handleChange}
                  placeholder="Link to invoice or receipt (Optional)"
                />
              </div>

              <div className="col-12 mb-3">
                <label className="form-label fw-medium">Notes</label>
                <textarea 
                  className="form-control" 
                  name="notes"
                  value={formData.notes || ''}
                  onChange={handleChange}
                  rows="2"
                ></textarea>
              </div>
            </div>
          </div>

          <div className="modal-footer border-top p-3">
            <button type="button" className="btn btn-light" onClick={onClose}>Cancel</button>
            <button type="button" className="btn btn-primary" onClick={handleSave}>Save Expense</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseModal;
