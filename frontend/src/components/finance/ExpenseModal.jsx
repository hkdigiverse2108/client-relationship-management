import React, { useState } from 'react';
import CustomSelect from '../common/CustomSelect';
import CustomDatePicker from '../common/CustomDatePicker';

const ExpenseModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    expense_id: `EXP-${Math.floor(1000 + Math.random() * 9000)}`,
    date: new Date().toISOString().split('T')[0],
    category: 'Software',
    amount: '',
    merchant: '',
    payment_method: 'Bank Transfer',
    reference_id: '',
    notes: '',
    receipt_url: '',
    merchant_gstin: '',
    tax_amount: '',
    status: 'Cleared'
  });

  const categories = [
    { value: 'Software', label: 'Software' },
    { value: 'Travel', label: 'Travel' },
    { value: 'Office Supplies', label: 'Office Supplies' },
    { value: 'Marketing', label: 'Marketing' },
    { value: 'Utilities', label: 'Utilities' },
    { value: 'Payroll', label: 'Payroll' },
    { value: 'Legal', label: 'Legal' },
    { value: 'Meals', label: 'Meals' },
    { value: 'Other', label: 'Other' }
  ];

  const paymentMethods = [
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, option) => {
    if (option) {
      setFormData(prev => ({ ...prev, [name]: option.value }));
    }
  };

  const handleDateChange = (date) => {
    setFormData(prev => ({ 
      ...prev, 
      date: date ? date.toISOString().split('T')[0] : '' 
    }));
  };

  if (!isOpen) return null;

  return (
    <div className={`modal fade ${isOpen ? 'show d-block' : ''}`} tabIndex="-1" style={{ backgroundColor: isOpen ? 'rgba(0,0,0,0.5)' : 'transparent' }}>
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content border-0">
          <div className="modal-header border-bottom">
            <h5 className="modal-title">Add Expense</h5>
            <button type="button" className="btn-close btn-close-dark fs-20" onClick={onClose} aria-label="Close"></button>
          </div>
          
          <div className="modal-body p-4">
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label fw-medium">Expense ID</label>
                <input 
                  type="text" 
                  className="form-control bg-light" 
                  name="expense_id"
                  value={formData.expense_id}
                  readOnly 
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label fw-medium">Date *</label>
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
                <label className="form-label fw-medium">Category *</label>
                <CustomSelect 
                  options={categories}
                  value={categories.find(c => c.value === formData.category)}
                  onChange={(option) => handleSelectChange('category', option)}
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
                    className="form-control" 
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label fw-medium">Merchant / Vendor *</label>
                <input 
                  type="text" 
                  className="form-control" 
                  name="merchant"
                  value={formData.merchant}
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
                  value={formData.merchant_gstin}
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
                    value={formData.tax_amount}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label fw-medium">Payment Method</label>
                <CustomSelect 
                  options={paymentMethods}
                  value={paymentMethods.find(m => m.value === formData.payment_method)}
                  onChange={(option) => handleSelectChange('payment_method', option)}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label fw-medium">Reference ID (Txn/Receipt)</label>
                <input 
                  type="text" 
                  className="form-control" 
                  name="reference_id"
                  value={formData.reference_id}
                  onChange={handleChange}
                  placeholder="Optional"
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label fw-medium">Status</label>
                <CustomSelect 
                  options={statusOptions}
                  value={statusOptions.find(s => s.value === formData.status)}
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
                  value={formData.receipt_url}
                  onChange={handleChange}
                  placeholder="Link to invoice or receipt (Optional)"
                />
              </div>

              <div className="col-12 mb-3">
                <label className="form-label fw-medium">Notes</label>
                <textarea 
                  className="form-control" 
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows="2"
                ></textarea>
              </div>
            </div>
          </div>

          <div className="modal-footer border-top p-3">
            <button type="button" className="btn btn-light" onClick={onClose}>Cancel</button>
            <button type="button" className="btn btn-primary" onClick={onClose}>Save Expense</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseModal;
