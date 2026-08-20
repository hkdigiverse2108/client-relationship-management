import React, { useState, useEffect } from 'react';
import Modal from '@/components/common/Modal/Modal';
import Button from '@/components/common/Button/Button';
import { paymentService } from '@/api/services/paymentService';
import { clientService } from '@/api/services/clientService';
import { invoiceService } from '@/api/services/invoiceService';
import toast from 'react-hot-toast';

const PaymentModal = ({ isOpen, onClose, payment, onSave }) => {
  const [formData, setFormData] = useState({
    payment_id: '',
    client_id: '',
    invoice_id: '',
    amount_received: 0,
    payment_date: new Date().toISOString().split('T')[0],
    payment_method: 'Bank NEFT/RTGS',
    status: 'Completed',
    transaction_reference: '',
    notes: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [clients, setClients] = useState([]);
  const [invoices, setInvoices] = useState([]);
  
  // Filtered invoices based on selected client
  const availableInvoices = formData.client_id 
    ? invoices.filter(inv => inv.client_id === formData.client_id) 
    : invoices;

  useEffect(() => {
    const fetchDropdowns = async () => {
      try {
        const [cData, iData] = await Promise.all([
          clientService.list(),
          invoiceService.getAllInvoices()
        ]);
        setClients(Array.isArray(cData) ? cData : (cData.data || []));
        setInvoices(Array.isArray(iData) ? iData : (iData.data || []));
      } catch (err) {
        toast.error("Failed to fetch dropdown data");
      }
    };
    fetchDropdowns();
  }, []);

  useEffect(() => {
    if (isOpen && payment && (payment.id || payment._id || payment.amount_received)) {
      setFormData({
        payment_id: payment.payment_id || `PAY-${Math.floor(1000 + Math.random() * 9000)}`,
        client_id: payment.client_id || '',
        invoice_id: payment.invoice_id || '',
        amount_received: payment.amount_received || 0,
        payment_date: payment.payment_date ? payment.payment_date.split('T')[0] : new Date().toISOString().split('T')[0],
        payment_method: payment.payment_method || 'Bank NEFT/RTGS',
        status: payment.status || 'Completed',
        transaction_reference: payment.transaction_reference || '',
        notes: payment.notes || ''
      });
    } else if (isOpen) {
      setFormData({
        payment_id: `PAY-${Math.floor(1000 + Math.random() * 9000)}`,
        client_id: payment?.client_id || '',
        invoice_id: '',
        amount_received: 0,
        payment_date: new Date().toISOString().split('T')[0],
        payment_method: 'Bank NEFT/RTGS',
        status: 'Completed',
        transaction_reference: '',
        notes: ''
      });
    }
  }, [payment, isOpen]);

  // When invoice changes, auto-fill amount if the amount is currently 0
  useEffect(() => {
    if (formData.invoice_id && formData.amount_received === 0) {
      const selectedInv = invoices.find(i => (i.id || i._id) === formData.invoice_id);
      if (selectedInv && selectedInv.total_amount) {
        setFormData(prev => ({ ...prev, amount_received: selectedInv.total_amount }));
      }
    }
  }, [formData.invoice_id, invoices, formData.amount_received]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    let finalValue = value;
    if (type === 'number') {
      finalValue = value ? parseFloat(value) : 0;
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: finalValue
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.client_id) {
      toast.error('Please select a billed client');
      return;
    }
    if (!formData.invoice_id) {
      toast.error('Please select an invoice');
      return;
    }
    
    setIsSubmitting(true);
    
    const finalData = {
      ...formData,
      status: formData.status.toLowerCase(),
      source_type: "Project" // Default source type mapping
    };
    
    try {
      const payId = payment ? (payment.id || payment._id) : null;
      if (payId) {
        await paymentService.updatePayment(payId, finalData);
        toast.success('Payment updated successfully');
      } else {
        await paymentService.createPayment(finalData);
        toast.success('Offline payment logged successfully');
      }
      onSave();
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.detail || 'Failed to save payment');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      title={payment ? "Edit Payment Log" : "Log Offline Payment"}
      size="lg"
    >
      <form onSubmit={handleSubmit}>
        <div className="row g-3">
          
          <div className="col-md-6">
            <label className="form-label fw-medium">Payment ID *</label>
            <input 
              type="text" 
              className="form-control bg-light" 
              name="payment_id" 
              value={formData.payment_id} 
              readOnly 
            />
          </div>
          
          <div className="col-md-6">
            <label className="form-label fw-medium">Billed Client *</label>
            <select 
              className="form-select" 
              name="client_id" 
              value={formData.client_id} 
              onChange={handleChange}
              required
            >
              <option value="">Select Client...</option>
              {clients.map(c => (
                <option key={c.id || c._id} value={c.id || c._id}>
                  {c.name || c.company_name}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label fw-medium">Invoice ID *</label>
            <select 
              className="form-select" 
              name="invoice_id" 
              value={formData.invoice_id} 
              onChange={handleChange}
              required
            >
              <option value="">Select Invoice...</option>
              {availableInvoices.map(inv => (
                <option key={inv.id || inv._id} value={inv.id || inv._id}>
                  {inv.invoice_number} - Rs. {inv.total_amount}
                </option>
              ))}
            </select>
            {!formData.client_id && <small className="text-muted">Select a client first to filter invoices.</small>}
          </div>

          <div className="col-md-6">
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
          
          <div className="col-12 mt-4">
            <h6 className="border-bottom pb-2">Payment Details</h6>
          </div>
          
          <div className="col-md-4">
            <label className="form-label fw-medium">Payment Date</label>
            <input 
              type="date" 
              className="form-control" 
              name="payment_date" 
              value={formData.payment_date} 
              onChange={handleChange} 
              required
            />
          </div>
          
          <div className="col-md-4">
            <label className="form-label fw-medium">Payment Method *</label>
            <select 
              className="form-select" 
              name="payment_method" 
              value={formData.payment_method} 
              onChange={handleChange}
              required
            >
              <option value="Razorpay">Razorpay Gateway</option>
              <option value="UPI Transfer">UPI Transfer</option>
              <option value="Bank NEFT/RTGS">Bank NEFT/RTGS</option>
              <option value="Cheque">Cheque</option>
              <option value="Cash">Cash</option>
            </select>
          </div>

          <div className="col-md-4">
            <label className="form-label fw-medium">Payment Status *</label>
            <select 
              className="form-select" 
              name="status" 
              value={formData.status} 
              onChange={handleChange}
              required
            >
              <option value="Pending">Pending</option>
              <option value="Partial">Partial</option>
              <option value="Completed">Completed</option>
              <option value="Failed">Failed</option>
            </select>
          </div>

          <div className="col-md-12">
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

        <div className="d-flex justify-content-end gap-2 mt-4 pt-3 border-top">
          <Button variant="light" type="button" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Save Payment'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default PaymentModal;
