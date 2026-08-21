import React, { useState, useEffect } from 'react';
import Modal from '@/components/common/Modal/Modal';
import Button from '@/components/common/Button/Button';
import { invoiceService } from '@/api/services/invoiceService';
import { clientService } from '@/api/services/clientService';
import toast from 'react-hot-toast';
import { FiTrash2 } from 'react-icons/fi';

const InvoiceModal = ({ isOpen, onClose, invoice, onSave }) => {
  const [clients, setClients] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // States
  const statesList = [
    "24 - Gujarat", "27 - Maharashtra", "07 - Delhi", "29 - Karnataka", "33 - Tamil Nadu", "09 - Uttar Pradesh", "32 - Kerala", "08 - Rajasthan", "19 - West Bengal", "36 - Telangana"
  ];

  const defaultLineItem = { description: '', sac: '', qty: 0, rate: 0, discount: 0, amount: 0 };

  const defaultFormData = {
    invoice_number: `INV-${Math.floor(1000 + Math.random() * 9000)}`,
    client_id: '',
    client_name: '',
    client_address: '',
    client_phone: '',
    client_gstin: '',
    state: '24 - Gujarat',
    brand: '',
    invoice_type: 'Tax Invoice',
    mode_of_payment: 'Current Account',
    issue_date: new Date().toISOString().split('T')[0],
    due_date: new Date(Date.now() + 30*24*60*60*1000).toISOString().split('T')[0],
    line_items: [{ ...defaultLineItem }],
    tax_type: 'CGST + SGST',
    cgst_percent: 9,
    sgst_percent: 9,
    igst_percent: 18,
    additional_discount: 0,
    notes: '1. Payment is due within 3 days of the invoice date.\n2. Late payments may incur additional charges.\n3. All disputes are subject to Gujarat Jurisdiction.',
    status: 'draft',
    source_type: 'Project',
    source_id: '',
    deal_id: '',
    is_recurring: false,
    recurring_frequency: 'monthly',
    next_issue_date: '',
    recurring_end_date: ''
  };

  const [formData, setFormData] = useState(defaultFormData);

  // Computed values
  const [totals, setTotals] = useState({
    totalBeforeTax: 0,
    taxAmount: 0,
    roundedTotal: 0,
    roundOff: 0,
    totalDue: 0,
    totalQty: 0,
    totalRate: 0,
    totalDiscount: 0
  });

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
    if (invoice && isOpen) {
      setFormData({
        ...defaultFormData,
        ...invoice,
        issue_date: invoice.issue_date ? invoice.issue_date.split('T')[0] : defaultFormData.issue_date,
        due_date: invoice.due_date ? invoice.due_date.split('T')[0] : defaultFormData.due_date,
        line_items: invoice.line_items?.length > 0 ? invoice.line_items : [{ ...defaultLineItem }]
      });
    } else if (isOpen) {
      setFormData(defaultFormData);
    }
  }, [invoice, isOpen]);

  // Recalculate totals whenever relevant fields change
  useEffect(() => {
    calculateTotals(formData);
  }, [formData.line_items, formData.tax_type, formData.cgst_percent, formData.sgst_percent, formData.igst_percent, formData.additional_discount, formData.state, formData.mode_of_payment]);

  const calculateTotals = (data) => {
    let totalQty = 0;
    let totalRate = 0;
    let totalDiscount = 0;
    let totalBeforeTax = 0;

    data.line_items.forEach(item => {
      totalQty += parseFloat(item.qty) || 0;
      totalRate += parseFloat(item.rate) || 0;
      totalDiscount += parseFloat(item.discount) || 0;
      totalBeforeTax += parseFloat(item.amount) || 0;
    });

    let taxPercent = 0;
    const isTaxApplicable = data.mode_of_payment === 'Current Account' || data.mode_of_payment === 'Cash with GST';
    
    if (isTaxApplicable) {
      if (data.tax_type === 'CGST + SGST') {
        taxPercent = (parseFloat(data.cgst_percent) || 0) + (parseFloat(data.sgst_percent) || 0);
      } else {
        taxPercent = parseFloat(data.igst_percent) || 0;
      }
    }

    let taxAmount = (totalBeforeTax * taxPercent) / 100;
    let additionalDiscount = parseFloat(data.additional_discount) || 0;
    
    let subTotal = totalBeforeTax + taxAmount - additionalDiscount;
    let roundedTotal = Math.round(subTotal);
    let roundOff = roundedTotal - subTotal;

    setTotals({
      totalBeforeTax,
      taxAmount,
      roundedTotal,
      roundOff,
      totalDue: roundedTotal,
      totalQty,
      totalRate,
      totalDiscount
    });
  };

  const handleStateChange = (e) => {
    const newState = e.target.value;
    const isGujarat = newState.includes('Gujarat');
    setFormData(prev => ({
      ...prev,
      state: newState,
      tax_type: isGujarat ? 'CGST + SGST' : 'IGST'
    }));
  };

  const handleClientChange = (e) => {
    const cId = e.target.value;
    if (cId === 'custom') {
      setFormData(prev => ({
        ...prev,
        client_id: 'custom',
        client_name: '',
        client_address: '',
        client_phone: '',
        client_gstin: '',
        source_id: ''
      }));
    } else if (cId) {
      const client = clients.find(c => c._id === cId || c.id === cId);
      if (client) {
        setFormData(prev => ({
          ...prev,
          client_id: cId,
          client_name: client.client_name || client.company_name || client.name || '',
          client_phone: client.mobile_number || client.phone || '',
          client_address: client.address ? `${client.address}, ${client.city}, ${client.state}, ${client.country}` : '',
          client_gstin: client.gstin || '',
          source_id: client.client_name || client.company_name || client.name || ''
        }));
      }
    } else {
      setFormData(prev => ({ ...prev, client_id: '' }));
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let finalValue = value;
    if (type === 'number') finalValue = value ? parseFloat(value) : 0;
    if (type === 'checkbox') finalValue = checked;
    
    // Auto-set next_issue_date if recurrence enabled and issue date is present
    if (name === 'is_recurring' && checked && formData.issue_date && !formData.next_issue_date) {
        let nextDate = new Date(formData.issue_date);
        nextDate.setMonth(nextDate.getMonth() + 1); // Default monthly
        setFormData(prev => ({ ...prev, is_recurring: true, next_issue_date: nextDate.toISOString().split('T')[0], [name]: finalValue }));
        return;
    }

    setFormData(prev => ({ ...prev, [name]: finalValue }));
  };

  const handleLineItemChange = (index, field, value) => {
    const newItems = [...formData.line_items];
    let val = value;
    if (['qty', 'rate', 'discount'].includes(field)) {
       val = value ? parseFloat(value) : 0;
    }
    newItems[index][field] = val;

    // Auto calculate amount
    if (['qty', 'rate', 'discount'].includes(field)) {
      const q = parseFloat(newItems[index].qty) || 0;
      const r = parseFloat(newItems[index].rate) || 0;
      const d = parseFloat(newItems[index].discount) || 0;
      newItems[index].amount = (q * r) - d;
    }

    setFormData(prev => ({ ...prev, line_items: newItems }));
  };

  const addLineItem = () => {
    setFormData(prev => ({ ...prev, line_items: [...prev.line_items, { ...defaultLineItem }] }));
  };

  const removeLineItem = (index) => {
    if (formData.line_items.length > 1) {
      const newItems = formData.line_items.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, line_items: newItems }));
    } else {
        toast.error("At least one line item is required.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isGstinRequired = formData.mode_of_payment === 'Current Account' || formData.mode_of_payment === 'Cash with GST';
    if (!formData.client_name || (isGstinRequired && !formData.client_gstin)) {
      toast.error('Client Name and Client GSTIN are required');
      return;
    }
    
    if (formData.line_items.length === 0 || formData.line_items[0].description.trim() === '') {
        toast.error('Please add at least one line item with a description.');
        return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
          ...formData,
          total_amount: totals.totalBeforeTax,
          total_tax_amount: totals.taxAmount,
          rounded_total: totals.roundedTotal,
          calculated_round_off: totals.roundOff,
          total_due: totals.totalDue,
          client_id: formData.client_id === 'custom' ? null : formData.client_id
      };

      const invoiceId = invoice ? (invoice.id || invoice._id) : null;
      if (invoiceId) {
        await invoiceService.updateInvoice(invoiceId, payload);
        toast.success('Invoice updated successfully');
      } else {
        await invoiceService.createInvoice(payload);
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
      size="xl" // Extra large for full-page feel
    >
      <form onSubmit={handleSubmit}>
        
        {/* Invoice Details Section */}
        <h6 className="fw-bold mb-3 border-bottom pb-2">Invoice Details</h6>
        <div className="row g-3 mb-4">
          <div className="col-md-6">
            <label className="form-label fw-medium text-muted small mb-1">Invoice Number <span className="text-danger">*</span></label>
            <input type="text" className="form-control fw-bold" name="invoice_number" value={formData.invoice_number} readOnly />
          </div>
          
          <div className="col-md-6">
            <label className="form-label fw-medium text-muted small mb-1">Status <span className="text-danger">*</span></label>
            <select className="form-select" name="status" value={formData.status} onChange={handleChange}>
              <option value="draft">Draft</option>
              <option value="sent">Sent</option>
              <option value="paid">Paid</option>
              <option value="partial">Partial</option>
              <option value="overdue">Overdue</option>
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label fw-medium text-muted small mb-1">Billed To (Client) <span className="text-danger">*</span></label>
            <select className="form-select" name="client_id" value={formData.client_id || ''} onChange={handleClientChange} required>
              <option value="">-- Choose Client --</option>
              <option value="custom" className="fw-bold text-primary">+ Custom Client</option>
              {clients.map(c => (
                <option key={c._id || c.id} value={c._id || c.id}>
                  {c.client_name || c.company_name || c.name}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label fw-medium text-muted small mb-1">Source Type</label>
            <select className="form-select" name="source_type" value={formData.source_type} onChange={handleChange}>
              <option value="Project">Project</option>
              <option value="E-commerce">E-commerce</option>
              <option value="Retainer">Retainer</option>
              <option value="Ad-hoc">Ad-hoc</option>
            </select>
          </div>
          
          <div className="col-md-6">
            <label className="form-label fw-medium text-muted small mb-1">Client Address <span className="text-danger">*</span></label>
            <input type="text" className="form-control" name="client_address" value={formData.client_address} onChange={handleChange} placeholder="Enter client address" required />
          </div>

          {formData.client_id === 'custom' && (
             <div className="col-md-6">
                 <label className="form-label fw-medium text-muted small mb-1">Custom Client Name <span className="text-danger">*</span></label>
                 <input type="text" className="form-control" name="client_name" value={formData.client_name} onChange={handleChange} required />
             </div>
          )}

          <div className="col-md-6">
            <label className="form-label fw-medium text-muted small mb-1">State / UT <span className="text-danger">*</span></label>
            <select className="form-select" name="state" value={formData.state} onChange={handleStateChange} required>
                {statesList.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label fw-medium text-muted small mb-1">Brand</label>
            <input type="text" className="form-control" name="brand" value={formData.brand} onChange={handleChange} placeholder="e.g. Development, Creative" />
          </div>

          <div className="col-md-6">
            <label className="form-label fw-medium text-muted small mb-1">Client Phone <span className="text-danger">*</span></label>
            <input type="text" className="form-control" name="client_phone" value={formData.client_phone} onChange={handleChange} placeholder="Phone number" required />
          </div>

          <div className="col-md-6">
            <label className="form-label fw-medium text-muted small mb-1">
              Client GSTIN {(formData.mode_of_payment === 'Current Account' || formData.mode_of_payment === 'Cash with GST') && <span className="text-danger">*</span>}
            </label>
            <input type="text" className="form-control" name="client_gstin" value={formData.client_gstin} onChange={handleChange} placeholder="Enter client GSTIN" required={formData.mode_of_payment === 'Current Account' || formData.mode_of_payment === 'Cash with GST'} />
          </div>

          <div className="col-md-6">
            <label className="form-label fw-medium text-muted small mb-1">Invoice Type <span className="text-danger">*</span></label>
            <select className="form-select" name="invoice_type" value={formData.invoice_type} onChange={handleChange} required>
              <option value="Tax Invoice">Tax Invoice</option>
              <option value="Proforma Invoice">Proforma Invoice</option>
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label fw-medium text-muted small mb-1">Mode of Payment <span className="text-danger">*</span></label>
            <select className="form-select" name="mode_of_payment" value={formData.mode_of_payment} onChange={handleChange} required>
              <option value="Current Account">Current Account</option>
              <option value="Other Account">Other Account</option>
              <option value="Cash">Cash</option>
              <option value="Cash with GST">Cash with GST</option>
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label fw-medium text-muted small mb-1">Date of Issue <span className="text-danger">*</span></label>
            <input type="date" className="form-control" name="issue_date" value={formData.issue_date} onChange={handleChange} required />
          </div>

          <div className="col-md-6">
            <label className="form-label fw-medium text-muted small mb-1">Due Date <span className="text-danger">*</span></label>
            <input type="date" className="form-control" name="due_date" value={formData.due_date} onChange={handleChange} required />
          </div>
        </div>

        {/* Line Items Section */}
        <h6 className="fw-bold mb-3 border-bottom pb-2 mt-5">Line Items</h6>
        <div className="table-responsive mb-3 overflow-visible">
          <table className="table table-borderless align-middle">
            <thead className="text-muted small text-uppercase">
              <tr>
                <th style={{width: '35%'}}>Item Description</th>
                <th style={{width: '10%'}}>SAC</th>
                <th style={{width: '10%'}}>QTY</th>
                <th style={{width: '15%'}}>RATE (₹)</th>
                <th style={{width: '15%'}}>DISCOUNT (₹)</th>
                <th style={{width: '10%'}}>AMOUNT</th>
                <th style={{width: '5%'}}></th>
              </tr>
            </thead>
            <tbody>
              {formData.line_items.map((item, index) => (
                <tr key={index}>
                  <td>
                    <input type="text" className="form-control" value={item.description} onChange={(e) => handleLineItemChange(index, 'description', e.target.value)} placeholder="Enter product/service name" required />
                  </td>
                  <td>
                    <input type="text" className="form-control text-center" value={item.sac} onChange={(e) => handleLineItemChange(index, 'sac', e.target.value)} placeholder="SAC" />
                  </td>
                  <td>
                    <input type="number" className="form-control text-center" value={item.qty || ''} onChange={(e) => handleLineItemChange(index, 'qty', e.target.value)} min="1" required />
                  </td>
                  <td>
                    <input type="number" className="form-control text-end" value={item.rate || ''} onChange={(e) => handleLineItemChange(index, 'rate', e.target.value)} min="0" step="0.01" required />
                  </td>
                  <td>
                    <input type="number" className="form-control text-end" value={item.discount || ''} onChange={(e) => handleLineItemChange(index, 'discount', e.target.value)} min="0" step="0.01" />
                  </td>
                  <td className="text-end fw-bold">
                    ₹ {item.amount.toFixed(2)}
                  </td>
                  <td className="text-center">
                    <button type="button" className="btn btn-light btn-sm text-danger shadow-sm" onClick={() => removeLineItem(index)}>
                      <FiTrash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              {/* Total Row */}
              <tr className="border-top">
                <td colSpan="2" className="fw-bold">Total</td>
                <td className="text-center fw-bold">{totals.totalQty}</td>
                <td className="text-end fw-bold">₹ {totals.totalRate.toFixed(2)}</td>
                <td className="text-end fw-bold">₹ {totals.totalDiscount.toFixed(2)}</td>
                <td className="text-end fw-bold">₹ {totals.totalBeforeTax.toFixed(2)}</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <Button variant="outline-success" type="button" className="btn-sm rounded-pill px-3 shadow-sm" onClick={addLineItem}>
          <i className="bi bi-plus-lg me-1"></i> Add New Item
        </Button>

        {/* Recurring System Configuration */}
        <div className="col-12 border-top pt-4 mt-4 border-bottom pb-4 mb-4">
            <div className="form-check form-switch mb-3">
              <input 
                className="form-check-input shadow-sm" 
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
              <div className="row g-3 bg-light p-3 rounded shadow-sm border border-secondary-subtle">
                <div className="col-md-4">
                  <label className="form-label fw-medium text-muted small mb-1">Frequency</label>
                  <select className="form-select" name="recurring_frequency" value={formData.recurring_frequency} onChange={handleChange}>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                  </select>
                </div>
                <div className="col-md-4">
                  <label className="form-label fw-medium text-muted small mb-1">Next Auto-Issue Date</label>
                  <input type="date" className="form-control" name="next_issue_date" value={formData.next_issue_date || ''} onChange={handleChange} required={formData.is_recurring} />
                </div>
                <div className="col-md-4">
                  <label className="form-label fw-medium text-muted small mb-1">Stop Recurrence After (Optional)</label>
                  <input type="date" className="form-control" name="recurring_end_date" value={formData.recurring_end_date || ''} onChange={handleChange} />
                </div>
              </div>
            )}
        </div>

        {/* Bottom Section (Notes & Totals) */}
        <div className="row mt-4">
          <div className="col-md-6">
             <h6 className="fw-bold mb-3">Notes / Terms</h6>
             <textarea 
               className="form-control" 
               name="notes" 
               value={formData.notes} 
               onChange={handleChange}
               rows="6"
             ></textarea>
          </div>
          
          <div className="col-md-6">
             <div className="card border-0 shadow-sm bg-light">
                <div className="card-body">
                   
                   <div className="d-flex justify-content-between mb-3 text-muted">
                      <span className="fw-medium">Total Before Tax</span>
                      <span className="fw-bold text-dark">₹ {totals.totalBeforeTax.toFixed(2)}</span>
                   </div>

                   <div className="d-flex justify-content-between align-items-center mb-3">
                      <span className="fw-medium text-muted">Tax Options</span>
                      <select className="form-select form-select-sm" style={{width: '130px'}} name="tax_type" value={formData.tax_type} onChange={handleChange}>
                        <option value="CGST + SGST">CGST + SGST</option>
                        <option value="IGST">IGST</option>
                      </select>
                   </div>

                   {formData.tax_type === 'CGST + SGST' ? (
                     <>
                        <div className="d-flex justify-content-between align-items-center mb-2">
                            <span className="text-muted small">CGST (%)</span>
                            <input type="number" className="form-control form-control-sm text-end" style={{width: '80px'}} name="cgst_percent" value={formData.cgst_percent} onChange={handleChange} step="0.1" />
                        </div>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <span className="text-muted small">SGST (%)</span>
                            <input type="number" className="form-control form-control-sm text-end" style={{width: '80px'}} name="sgst_percent" value={formData.sgst_percent} onChange={handleChange} step="0.1" />
                        </div>
                     </>
                   ) : (
                      <div className="d-flex justify-content-between align-items-center mb-3">
                          <span className="text-muted small">IGST (%)</span>
                          <input type="number" className="form-control form-control-sm text-end" style={{width: '80px'}} name="igst_percent" value={formData.igst_percent} onChange={handleChange} step="0.1" />
                      </div>
                   )}

                   <div className="d-flex justify-content-between align-items-center mb-3 pb-3 border-bottom border-secondary-subtle">
                      <span className="fw-medium text-muted">Additional Discount (₹)</span>
                      <input type="number" className="form-control form-control-sm text-end text-success" style={{width: '120px'}} name="additional_discount" value={formData.additional_discount} onChange={handleChange} step="0.01" />
                   </div>

                   <div className="d-flex justify-content-between mb-2">
                      <span className="text-muted small">Total Tax Amount</span>
                      <span className="fw-medium small">₹ {totals.taxAmount.toFixed(2)}</span>
                   </div>
                   <div className="d-flex justify-content-between mb-2">
                      <span className="text-muted small">Rounded Total (₹)</span>
                      <span className="fw-medium small">₹ {totals.roundedTotal.toFixed(2)}</span>
                   </div>
                   <div className="d-flex justify-content-between mb-3 pb-3 border-bottom border-secondary-subtle">
                      <span className="text-muted small">Calculated Round Off</span>
                      <span className="fw-medium small">{totals.roundOff >= 0 ? '+' : ''}₹ {totals.roundOff.toFixed(2)}</span>
                   </div>

                   <div className="d-flex justify-content-between align-items-center mt-2">
                      <span className="fw-bold h6 mb-0 text-uppercase">Total Due</span>
                      <span className="fw-bold h4 mb-0 text-success">₹ {totals.totalDue.toFixed(2)}</span>
                   </div>

                </div>
             </div>
          </div>
        </div>
        
        <div className="d-flex justify-content-end gap-3 mt-4 pt-4 border-top">
          <Button variant="outline-secondary" type="button" className="px-4 rounded-pill shadow-sm" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" className="px-5 rounded-pill shadow-sm" isLoading={isSubmitting}>
            {invoice ? "Update Invoice" : "Save Invoice"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default InvoiceModal;
