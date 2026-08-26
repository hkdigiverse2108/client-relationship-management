import React, { useState, useEffect } from 'react';
import Modal from '@/components/common/Modal/Modal';
import Button from '@/components/common/Button/Button';
import { quoteService } from '@/api/services/quoteService';
import { clientService } from '@/api/services/clientService';
import toast from 'react-hot-toast';

const QuoteModal = ({ isOpen, onClose, quote, onSave }) => {
  const [formData, setFormData] = useState({
    quote_number: '',
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
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [clients, setClients] = useState([]);
  
  // Calculated fields
  const sub_total = (formData.unit_price * formData.quantity) - formData.discount;
  const tax_amount = sub_total > 0 ? (sub_total * formData.tax_percentage) / 100 : 0;
  const total_amount = sub_total + tax_amount;
  
  // Valid until date calculation
  const valid_until_date = new Date(formData.date_sent);
  valid_until_date.setDate(valid_until_date.getDate() + parseInt(formData.validity_days || 0));
  const valid_until = valid_until_date.toISOString().split('T')[0];

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const data = await clientService.list();
        setClients(Array.isArray(data) ? data : (data.data || []));
      } catch (err) {
        toast.error("Failed to fetch clients");
      }
    };
    fetchClients();
  }, []);

  useEffect(() => {
    if (isOpen && quote) {
      setFormData({
        quote_number: quote.quote_number || '',
        client_id: quote.client_id || '',
        product_name: quote.product_name || '',
        unit_price: quote.unit_price || 0,
        quantity: quote.quantity || 1,
        discount: quote.discount || 0,
        tax_percentage: quote.tax_percentage || 18,
        validity_days: quote.validity_days || 30,
        status: quote.status || 'Draft',
        notes: quote.notes || '',
        date_sent: quote.date_sent ? quote.date_sent.split('T')[0] : new Date().toISOString().split('T')[0]
      });
    } else if (isOpen) {
      setFormData({
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
    }
  }, [quote, isOpen]);

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
      toast.error('Please select a client');
      return;
    }
    if (!formData.product_name) {
      toast.error('Please enter product name');
      return;
    }
    
    setIsSubmitting(true);
    
    const finalData = {
      ...formData,
      sub_total,
      tax_amount,
      total_amount,
      valid_until
    };
    
    try {
      const quoteId = quote ? (quote.id || quote._id) : null;
      if (quoteId) {
        await quoteService.updateQuote(quoteId, finalData);
        toast.success('Quote updated successfully');
      } else {
        await quoteService.createQuote(finalData);
        toast.success('Quote created successfully');
      }
      onSave();
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.detail || 'Failed to save quote');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      title={quote ? "Edit Quotation" : "New Quotation"}
      size="lg"
    >
      <form onSubmit={handleSubmit}>
        <div className="row g-3">
          
          <div className="col-md-6">
            <label className="form-label fw-medium">Quote Number *</label>
            <input 
              type="text" 
              className="form-control bg-light" 
              name="quote_number" 
              value={formData.quote_number} 
              readOnly 
            />
          </div>
          
          <div className="col-md-6">
            <label className="form-label fw-medium">Prospect Client *</label>
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

          <div className="col-12 mt-4">
            <h6 className="border-bottom pb-2">Product & Pricing Details</h6>
          </div>
          
          <div className="col-md-6">
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
          
          <div className="col-md-3">
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
          
          <div className="col-md-3">
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

          <div className="col-md-6">
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
          
          <div className="col-md-6">
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

          {/* Auto Calculation Display */}
          <div className="col-12 my-3">
            <div className="bg-light p-3 rounded border">
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Subtotal:</span>
                <span className="fw-medium">₹{sub_total.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Tax Amount:</span>
                <span className="fw-medium">₹{tax_amount.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between pt-2 border-top">
                <span className="fw-bold">Total Amount:</span>
                <span className="fw-bold text-primary">₹{total_amount.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="col-12 mt-2">
            <h6 className="border-bottom pb-2">Status & Validity</h6>
          </div>

          <div className="col-md-4">
            <label className="form-label fw-medium">Date Sent</label>
            <input 
              type="date" 
              className="form-control" 
              name="date_sent" 
              value={formData.date_sent} 
              onChange={handleChange} 
            />
          </div>
          
          <div className="col-md-4">
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
          
          <div className="col-md-4">
            <label className="form-label fw-medium">Status *</label>
            <select 
              className="form-select" 
              name="status" 
              value={formData.status} 
              onChange={handleChange}
              required
            >
              <option value="Draft">Draft</option>
              <option value="Sent">Sent</option>
              <option value="Accepted">Accepted</option>
              <option value="Rejected">Rejected</option>
              <option value="Expired">Expired</option>
            </select>
          </div>

          <div className="col-12 mt-4">
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

        <div className="d-flex justify-content-end gap-2 mt-4 pt-3 border-top">
          <Button variant="light" type="button" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Save Quotation'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default QuoteModal;
