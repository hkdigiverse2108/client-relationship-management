import React, { useState, useEffect } from 'react';
import Modal from '@/components/common/Modal/Modal';
import Button from '@/components/common/Button/Button';
import { invoiceService } from '@/api/services/invoiceService';
import { clientService } from '@/api/services/clientService';
import toast from 'react-hot-toast';

const InvoiceModal = ({ isOpen, onClose, invoice, onSave }) => {
  const [formData, setFormData] = useState({
    invoice_number: '',
    source_type: 'Project',
    source_id: '',
    client_id: '',
    deal_id: '',
    total_amount: 0,
    gst_amount: 0,
    status: 'draft',
    issue_date: new Date().toISOString().split('T')[0],
    due_date: new Date(Date.now() + 30*24*60*60*1000).toISOString().split('T')[0], // +30 days
    notes: '',
    is_recurring: false,
    recurring_frequency: 'monthly',
    next_issue_date: '',
    recurring_end_date: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [clients, setClients] = useState([]);
  
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const data = await clientService.list();
        setClients(data || []);
      } catch (err) {
        console.error("Failed to fetch clients:", err);
      }
    };
    fetchClients();
  }, []);

  useEffect(() => {
    if (invoice) {
      setFormData({
        ...invoice,
        issue_date: invoice.issue_date ? invoice.issue_date.split('T')[0] : '',
        due_date: invoice.due_date ? invoice.due_date.split('T')[0] : ''
      });
    } else {
      setFormData({
        invoice_number: `INV-${Math.floor(1000 + Math.random() * 9000)}`,
        source_type: 'Project',
        source_id: '',
        client_id: '',
        deal_id: '',
        total_amount: 0,
        gst_amount: 0,
        status: 'draft',
        issue_date: new Date().toISOString().split('T')[0],
        due_date: new Date(Date.now() + 30*24*60*60*1000).toISOString().split('T')[0],
        notes: '',
        is_recurring: false,
        recurring_frequency: 'monthly',
        next_issue_date: '',
        recurring_end_date: ''
      });
    }
  }, [invoice, isOpen]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let finalValue = value;
    if (type === 'number') {
      finalValue = value ? parseFloat(value) : 0;
    } else if (type === 'checkbox') {
      finalValue = checked;
    }
    
    // Auto-set next_issue_date if recurrence enabled and issue date is present
    if (name === 'is_recurring' && checked && formData.issue_date && !formData.next_issue_date) {
        let nextDate = new Date(formData.issue_date);
        nextDate.setMonth(nextDate.getMonth() + 1); // Default monthly
        setFormData(prev => ({ ...prev, is_recurring: true, next_issue_date: nextDate.toISOString().split('T')[0] }));
        return;
    }

    setFormData(prev => ({
      ...prev,
      [name]: finalValue
    }));
  };

  // Auto calculate GST if total amount changes
  const handleAmountChange = (e) => {
    const total = parseFloat(e.target.value) || 0;
    // Assuming 18% GST calculation from base (if total is inclusive, gst = total - total/1.18)
    // For simplicity, let's say total_amount is base, and gst is 18% of it. Or total is total.
    // We'll just leave it manual for now or auto 18% of total.
    setFormData(prev => ({
      ...prev,
      total_amount: total,
      gst_amount: total * 0.18
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.invoice_number || !formData.total_amount) {
      toast.error('Invoice Number and Total Amount are required');
      return;
    }
    
    setIsSubmitting(true);
    try {
      const invoiceId = invoice ? (invoice.id || invoice._id) : null;
      if (invoiceId) {
        await invoiceService.updateInvoice(invoiceId, formData);
        toast.success('Invoice updated successfully');
      } else {
        await invoiceService.createInvoice(formData);
        toast.success('Invoice created successfully');
      }
      onSave();
    } catch (error) {
      console.error('Invoice save error:', error);
      toast.error(error.message || 'Failed to save invoice');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      title={invoice ? "Edit Invoice" : "Create New Invoice"}
      size="lg"
    >
      <form onSubmit={handleSubmit}>
        <div className="row g-3">
          {/* Row 1 */}
          <div className="col-md-6">
            <label className="form-label fw-medium">Invoice Number <span className="text-danger">*</span></label>
            <input 
              type="text" 
              className="form-control" 
              name="invoice_number" 
              value={formData.invoice_number} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="col-md-6">
            <label className="form-label fw-medium">Status <span className="text-danger">*</span></label>
            <select className="form-select" name="status" value={formData.status} onChange={handleChange}>
              <option value="draft">Draft</option>
              <option value="sent">Sent</option>
              <option value="paid">Paid</option>
              <option value="partial">Partial</option>
              <option value="overdue">Overdue</option>
            </select>
          </div>

          {/* Row 2 */}
          <div className="col-md-6">
            <label className="form-label fw-medium">Source Type</label>
            <select className="form-select" name="source_type" value={formData.source_type} onChange={handleChange}>
              <option value="Project">Project</option>
              <option value="E-commerce">E-commerce</option>
              <option value="Retainer">Retainer</option>
              <option value="Ad-hoc">Ad-hoc</option>
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label fw-medium">Select Client <span className="text-danger">*</span></label>
            <select 
              className="form-select" 
              name="client_id" 
              value={formData.client_id || ''} 
              onChange={(e) => {
                const cId = e.target.value;
                const client = clients.find(c => c._id === cId || c.id === cId);
                setFormData(prev => ({
                  ...prev, 
                  client_id: cId, 
                  source_id: client ? client.name : ''
                }));
              }}
              required
            >
              <option value="">-- Choose Client --</option>
              {clients.map(c => (
                <option key={c._id || c.id} value={c._id || c.id}>
                  {c.name || c.company_name}
                </option>
              ))}
            </select>
          </div>

          {/* Row 3 */}
          <div className="col-md-6">
            <label className="form-label fw-medium">Issue Date <span className="text-danger">*</span></label>
            <input 
              type="date" 
              className="form-control" 
              name="issue_date" 
              value={formData.issue_date} 
              onChange={handleChange} 
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label fw-medium">Due Date <span className="text-danger">*</span></label>
            <input 
              type="date" 
              className="form-control" 
              name="due_date" 
              value={formData.due_date} 
              onChange={handleChange} 
              required
            />
          </div>

          {/* Row 4 */}
          <div className="col-md-6">
            <label className="form-label fw-medium">Total Amount (Base) <span className="text-danger">*</span></label>
            <div className="input-group">
              <span className="input-group-text">₹</span>
              <input 
                type="number" 
                className="form-control" 
                name="total_amount" 
                value={formData.total_amount} 
                onChange={handleAmountChange} 
                min="0"
                step="0.01"
                required
              />
            </div>
          </div>
          <div className="col-md-6">
            <label className="form-label fw-medium">GST Amount</label>
            <div className="input-group">
              <span className="input-group-text">₹</span>
              <input 
                type="number" 
                className="form-control" 
                name="gst_amount" 
                value={formData.gst_amount} 
                onChange={handleChange} 
                min="0"
                step="0.01"
              />
            </div>
            <div className="form-text text-muted" style={{fontSize: '12px'}}>Auto-calculated as 18% of base. Edit if needed.</div>
          </div>

          {/* Row 5 */}
          <div className="col-12 border-top pt-3 mt-3">
            <div className="form-check form-switch mb-3">
              <input 
                className="form-check-input" 
                type="checkbox" 
                id="isRecurringToggle" 
                name="is_recurring"
                checked={formData.is_recurring}
                onChange={handleChange}
                style={{ cursor: 'pointer' }}
              />
              <label className="form-check-label fw-medium ms-2" htmlFor="isRecurringToggle" style={{ cursor: 'pointer' }}>
                Enable Auto-Recurring Invoice
              </label>
              <div className="form-text">System will automatically generate and save a new invoice based on frequency.</div>
            </div>
            
            {formData.is_recurring && (
              <div className="row g-3 bg-light p-3 rounded">
                <div className="col-md-4">
                  <label className="form-label fw-medium">Frequency</label>
                  <select className="form-select" name="recurring_frequency" value={formData.recurring_frequency} onChange={handleChange}>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                  </select>
                </div>
                <div className="col-md-4">
                  <label className="form-label fw-medium">Next Auto-Issue Date</label>
                  <input 
                    type="date" 
                    className="form-control" 
                    name="next_issue_date" 
                    value={formData.next_issue_date || ''} 
                    onChange={handleChange} 
                    required={formData.is_recurring}
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label fw-medium">Stop Recurrence After (Optional)</label>
                  <input 
                    type="date" 
                    className="form-control" 
                    name="recurring_end_date" 
                    value={formData.recurring_end_date || ''} 
                    onChange={handleChange} 
                  />
                </div>
              </div>
            )}
          </div>

          {/* Row 6 */}
          <div className="col-12 mt-4">
            <label className="form-label fw-medium">Notes / Terms</label>
            <textarea 
              className="form-control" 
              name="notes" 
              value={formData.notes || ''} 
              onChange={handleChange}
              rows="3"
              placeholder="Thank you for your business."
            ></textarea>
          </div>
        </div>
        
        <div className="d-flex justify-content-end gap-2 mt-4 pt-3 border-top">
          <Button variant="outline-secondary" type="button" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" isLoading={isSubmitting}>
            {invoice ? "Update Invoice" : "Create Invoice"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default InvoiceModal;
