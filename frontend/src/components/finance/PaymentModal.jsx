import React, { useState, useEffect } from 'react';
import CustomSelect from '../common/CustomSelect';
import CustomDatePicker from '../common/CustomDatePicker';

const PaymentModal = ({ isOpen, onClose, payment, onSave }) => {
  const [formData, setFormData] = useState({
    payment_id: `PAY-${Math.floor(1000 + Math.random() * 9000)}`,
    client_id: '',
    invoice_id: '',
    amount_received: 0,
    payment_date: new Date().toISOString().split('T')[0],
    payment_method: 'Bank NEFT/RTGS',
    status: 'Completed',
    transaction_reference: '',
    notes: ''
  });

  // Mock data for dropdowns
  const clients = [
    { id: '1', name: 'Anthony Lewis' },
    { id: '2', name: 'Brian Villalobos' },
    { id: '3', name: 'Harvey Smith' }
  ];

  const invoices = [
    { id: 'INV-001', client_id: '1', invoice_number: 'INV-1454', total_amount: 5000 },
    { id: 'INV-002', client_id: '1', invoice_number: 'INV-1455', total_amount: 1500 },
    { id: 'INV-003', client_id: '2', invoice_number: 'INV-1456', total_amount: 3200 },
  ];

  const availableInvoices = formData.client_id 
    ? invoices.filter(inv => inv.client_id === formData.client_id) 
    : invoices;

  const clientOptions = clients.map(c => ({ value: c.id, label: c.name }));
  const invoiceOptions = availableInvoices.map(inv => ({ 
    value: inv.id, 
    label: `${inv.invoice_number} - Rs. ${inv.total_amount}` 
  }));

  const paymentMethodOptions = [
    { value: 'Razorpay', label: 'Razorpay Gateway' },
    { value: 'UPI Transfer', label: 'UPI Transfer' },
    { value: 'Bank NEFT/RTGS', label: 'Bank NEFT/RTGS' },
    { value: 'Cheque', label: 'Cheque' },
    { value: 'Cash', label: 'Cash' }
  ];

  const statusOptions = [
    { value: 'Pending', label: 'Pending' },
    { value: 'Partial', label: 'Partial' },
    { value: 'Completed', label: 'Completed' },
    { value: 'Failed', label: 'Failed' }
  ];

  // When invoice changes, auto-fill amount if the amount is currently 0
  useEffect(() => {
    if (formData.invoice_id && formData.amount_received === 0) {
      const selectedInv = invoices.find(i => i.id === formData.invoice_id);
      if (selectedInv && selectedInv.total_amount) {
        setFormData(prev => ({ ...prev, amount_received: selectedInv.total_amount }));
      }
    }
  }, [formData.invoice_id]);

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

  if (!isOpen) return null;

  return (
    <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="modal-header border-bottom">
            <h5 className="modal-title">{payment ? "Edit Payment Log" : "Log Offline Payment"}</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body p-4 custom-scroll" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
            
            <div className="row mb-4">
              <div className="col-md-6 mb-3">
                <label className="form-label fw-medium">Payment ID *</label>
                <input 
                  type="text" 
                  className="form-control bg-light" 
                  name="payment_id" 
                  value={formData.payment_id} 
                  readOnly 
                />
              </div>
              
              <div className="col-md-6 mb-3">
                <label className="form-label fw-medium">Billed Client *</label>
                <CustomSelect 
                  options={clientOptions} 
                  value={clientOptions.find(o => o.value === formData.client_id)} 
                  onChange={(option) => handleSelectChange('client_id', option)} 
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label fw-medium">Invoice ID (Optional / Advance)</label>
                <CustomSelect 
                  options={invoiceOptions} 
                  value={invoiceOptions.find(o => o.value === formData.invoice_id)} 
                  onChange={(option) => handleSelectChange('invoice_id', option)} 
                />
                {!formData.client_id && <small className="text-muted">Select a client first to filter invoices.</small>}
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label fw-medium">Amount Received (₹) *</label>
                <input 
                  type="number" 
                  className="form-control" 
                  name="amount_received" 
                  value={formData.amount_received} 
                  onChange={handleChange} 
                  min="0"
                  required
                />
              </div>
            </div>

            <div className="row mb-4">
              <h6 className="mb-3 text-primary border-bottom pb-2">Payment Details</h6>
              
              <div className="col-md-4 mb-3">
                <label className="form-label fw-medium">Payment Date</label>
                <div className="input-icon position-relative w-100">
                  <span className="input-icon-addon"><i className="ti ti-calendar"></i></span>
                  <CustomDatePicker 
                    selected={formData.payment_date ? new Date(formData.payment_date) : null} 
                    onChange={(date) => handleDateChange('payment_date', date)} 
                    className="form-control"
                  />
                </div>
              </div>
              
              <div className="col-md-4 mb-3">
                <label className="form-label fw-medium">Payment Method *</label>
                <CustomSelect 
                  options={paymentMethodOptions} 
                  value={paymentMethodOptions.find(o => o.value === formData.payment_method)} 
                  onChange={(option) => handleSelectChange('payment_method', option)} 
                />
              </div>

              <div className="col-md-4 mb-3">
                <label className="form-label fw-medium">Payment Status *</label>
                <CustomSelect 
                  options={statusOptions} 
                  value={statusOptions.find(o => o.value === formData.status)} 
                  onChange={(option) => handleSelectChange('status', option)} 
                />
              </div>

              <div className="col-md-12 mb-3">
                <label className="form-label fw-medium">Reference / Transaction ID *</label>
                <input 
                  type="text" 
                  className="form-control" 
                  name="transaction_reference" 
                  value={formData.transaction_reference} 
                  onChange={handleChange} 
                  placeholder="e.g. UTR Number, Cheque Number"
                  required
                />
              </div>

              <div className="col-12 mt-2">
                <label className="form-label fw-medium">Remarks / Notes</label>
                <textarea 
                  className="form-control" 
                  name="notes" 
                  value={formData.notes || ''} 
                  onChange={handleChange}
                  rows="2"
                  placeholder="Any additional notes about this payment"
                ></textarea>
              </div>
            </div>

          </div>
          <div className="modal-footer border-top">
            <button type="button" className="btn btn-light" onClick={onClose}>Cancel</button>
            <button type="button" className="btn btn-primary" onClick={onClose}>Save Payment</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
