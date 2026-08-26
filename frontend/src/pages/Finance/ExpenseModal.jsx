import React, { useState, useEffect } from 'react';
import Modal from '@/components/common/Modal/Modal';
import Button from '@/components/common/Button/Button';
import { expenseService } from '@/api/services/expenseService';
import toast from 'react-hot-toast';

const categories = [
  'Software', 'Travel', 'Office Supplies', 'Marketing', 
  'Utilities', 'Payroll', 'Legal', 'Meals', 'Other'
];

const paymentMethods = [
  'Bank Transfer', 'Credit Card', 'Cash', 'UPI', 'Cheque', 'Other'
];

const ExpenseModal = ({ isOpen, onClose, expense, onSave }) => {
  const [formData, setFormData] = useState({
    expense_id: '',
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
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (expense && (expense.id || expense._id)) {
        setFormData({
          expense_id: expense.expense_id || `EXP-${Math.floor(1000 + Math.random() * 9000)}`,
          date: expense.date || new Date().toISOString().split('T')[0],
          category: expense.category || 'Software',
          amount: expense.amount || '',
          merchant: expense.merchant || '',
          payment_method: expense.payment_method || 'Bank Transfer',
          reference_id: expense.reference_id || '',
          notes: expense.notes || '',
          receipt_url: expense.receipt_url || '',
          merchant_gstin: expense.merchant_gstin || '',
          tax_amount: expense.tax_amount || '',
          status: expense.status || 'Cleared'
        });
      } else {
        // Reset for new
        setFormData({
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
      }
    }
  }, [isOpen, expense]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: (name === 'amount' || name === 'tax_amount') ? (value ? parseFloat(value) : '') : (name === 'merchant_gstin' ? value.toUpperCase() : value)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.amount || !formData.merchant) {
      toast.error('Amount and Merchant are required');
      return;
    }

    setIsSubmitting(true);
    try {
      if (expense && (expense.id || expense._id)) {
        const id = expense.id || expense._id;
        await expenseService.updateExpense(id, formData);
        toast.success('Expense updated successfully');
      } else {
        await expenseService.createExpense(formData);
        toast.success('Expense added successfully');
      }
      onSave();
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.detail || 'Failed to save expense');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      title={expense ? "Edit Expense" : "Add New Expense"}
      size="md"
    >
      <form onSubmit={handleSubmit}>
        <div className="row g-3">
          
          <div className="col-md-6">
            <label className="form-label">Expense ID</label>
            <input 
              type="text" 
              className="form-control bg-light" 
              name="expense_id"
              value={formData.expense_id}
              readOnly 
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Date *</label>
            <input 
              type="date" 
              className="form-control" 
              name="date"
              value={formData.date}
              onChange={handleChange}
              required 
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Category *</label>
            <select 
              className="form-select" 
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label">Amount *</label>
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
                required 
              />
            </div>
          </div>

          <div className="col-md-6">
            <label className="form-label">Merchant / Vendor *</label>
            <input 
              type="text" 
              className="form-control" 
              name="merchant"
              value={formData.merchant}
              onChange={handleChange}
              placeholder="e.g. Amazon, AWS, Office Depot"
              required 
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Vendor GSTIN</label>
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

          <div className="col-md-6">
            <label className="form-label">Tax Amount (GST)</label>
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

          <div className="col-md-6">
            <label className="form-label">Payment Method</label>
            <select 
              className="form-select" 
              name="payment_method"
              value={formData.payment_method}
              onChange={handleChange}
            >
              {paymentMethods.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label">Reference ID (Txn/Receipt)</label>
            <input 
              type="text" 
              className="form-control" 
              name="reference_id"
              value={formData.reference_id}
              onChange={handleChange}
              placeholder="Optional"
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Status</label>
            <select 
              className="form-select" 
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="Cleared">Cleared</option>
              <option value="Pending">Pending</option>
            </select>
            <small className="text-muted">Cleared expenses auto-deduct from Ledger.</small>
          </div>
          
          <div className="col-12">
            <label className="form-label">Receipt URL</label>
            <input 
              type="url" 
              className="form-control" 
              name="receipt_url"
              value={formData.receipt_url}
              onChange={handleChange}
              placeholder="Link to invoice or receipt (Optional)"
            />
          </div>

          <div className="col-12">
            <label className="form-label">Notes</label>
            <textarea 
              className="form-control" 
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows="2"
            ></textarea>
          </div>
        </div>

        <div className="d-flex justify-content-end gap-2 mt-4 pt-3 border-top">
          <Button variant="light" type="button" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" loading={isSubmitting}>
            {expense ? 'Update Expense' : 'Add Expense'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ExpenseModal;
