import React, { useState, useEffect } from 'react';
import CustomSelect from '../common/CustomSelect';
import CustomDatePicker from '../common/CustomDatePicker';

const InvoiceModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    invoice_number: `INV-${Math.floor(1000 + Math.random() * 9000)}`,
    client_name: '',
    client_address: '',
    client_phone: '',
    client_gstin: '',
    state: '24 - Gujarat',
    invoice_type: 'Tax Invoice',
    mode_of_payment: 'Current Account',
    issue_date: new Date().toISOString().split('T')[0],
    due_date: new Date(Date.now() + 30*24*60*60*1000).toISOString().split('T')[0],
    line_items: [{ description: '', sac: '', qty: 1, rate: 0, amount: 0 }],
    tax_type: 'CGST + SGST',
    cgst_percent: 9,
    sgst_percent: 9,
    igst_percent: 18,
    additional_discount: 0,
    notes: '1. Payment is due within 3 days of the invoice date.\n2. All disputes are subject to Gujarat Jurisdiction.'
  });

  const stateOptions = [
    { value: '24 - Gujarat', label: '24 - Gujarat' },
    { value: '27 - Maharashtra', label: '27 - Maharashtra' },
    { value: '07 - Delhi', label: '07 - Delhi' },
  ];

  const typeOptions = [
    { value: 'Tax Invoice', label: 'Tax Invoice' },
    { value: 'Proforma Invoice', label: 'Proforma Invoice' },
    { value: 'Bill of Supply', label: 'Bill of Supply' },
  ];

  const taxOptions = [
    { value: 'CGST + SGST', label: 'CGST + SGST' },
    { value: 'IGST', label: 'IGST' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, selectedOption) => {
    setFormData(prev => ({ ...prev, [name]: selectedOption ? selectedOption.value : '' }));
  };

  const handleDateChange = (name, date) => {
    if (date) {
      // Local timezone fix for simple YYYY-MM-DD
      const offset = date.getTimezoneOffset();
      const adjustedDate = new Date(date.getTime() - (offset * 60 * 1000));
      setFormData(prev => ({ ...prev, [name]: adjustedDate.toISOString().split('T')[0] }));
    }
  };

  const handleLineItemChange = (index, field, value) => {
    const updatedItems = [...formData.line_items];
    updatedItems[index][field] = value;
    if (field === 'qty' || field === 'rate') {
      updatedItems[index].amount = updatedItems[index].qty * updatedItems[index].rate;
    }
    setFormData(prev => ({ ...prev, line_items: updatedItems }));
  };

  const addLineItem = () => {
    setFormData(prev => ({
      ...prev,
      line_items: [...prev.line_items, { description: '', sac: '', qty: 1, rate: 0, amount: 0 }]
    }));
  };

  const removeLineItem = (index) => {
    if (formData.line_items.length > 1) {
      setFormData(prev => ({
        ...prev,
        line_items: prev.line_items.filter((_, i) => i !== index)
      }));
    }
  };

  const calculateTotals = () => {
    const totalBeforeTax = formData.line_items.reduce((sum, item) => sum + Number(item.amount), 0) - Number(formData.additional_discount);
    let taxAmount = 0;
    if (formData.tax_type === 'CGST + SGST') {
      taxAmount = (totalBeforeTax * formData.cgst_percent / 100) + (totalBeforeTax * formData.sgst_percent / 100);
    } else if (formData.tax_type === 'IGST') {
      taxAmount = totalBeforeTax * formData.igst_percent / 100;
    }
    const rawTotal = totalBeforeTax + taxAmount;
    const roundedTotal = Math.round(rawTotal);
    const roundOff = roundedTotal - rawTotal;
    return { totalBeforeTax, taxAmount, roundedTotal, roundOff };
  };

  const totals = calculateTotals();

  if (!isOpen) return null;

  return (
    <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered modal-xl">
        <div className="modal-content">
          <div className="modal-header border-bottom">
            <h5 className="modal-title">Create New Invoice</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body p-4 custom-scroll" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
            <div className="row mb-4">
              <h6 className="mb-3 text-primary">Client Details</h6>
              <div className="col-md-4 mb-3">
                <label className="form-label">Client Name</label>
                <input type="text" className="form-control" name="client_name" value={formData.client_name} onChange={handleChange} />
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">Phone</label>
                <input type="text" className="form-control" name="client_phone" value={formData.client_phone} onChange={handleChange} />
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">GSTIN</label>
                <input type="text" className="form-control" name="client_gstin" value={formData.client_gstin} onChange={handleChange} />
              </div>
              <div className="col-md-8 mb-3">
                <label className="form-label">Address</label>
                <input type="text" className="form-control" name="client_address" value={formData.client_address} onChange={handleChange} />
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">State</label>
                <CustomSelect 
                  options={stateOptions} 
                  value={stateOptions.find(o => o.value === formData.state)} 
                  onChange={(option) => handleSelectChange('state', option)} 
                />
              </div>
            </div>

            <div className="row mb-4">
              <h6 className="mb-3 text-primary">Invoice Details</h6>
              <div className="col-md-3 mb-3">
                <label className="form-label">Invoice Number</label>
                <input type="text" className="form-control" name="invoice_number" value={formData.invoice_number} onChange={handleChange} />
              </div>
              <div className="col-md-3 mb-3">
                <label className="form-label">Issue Date</label>
                <div className="input-icon position-relative w-100">
                  <span className="input-icon-addon"><i className="ti ti-calendar"></i></span>
                  <CustomDatePicker 
                    selected={formData.issue_date ? new Date(formData.issue_date) : null} 
                    onChange={(date) => handleDateChange('issue_date', date)} 
                    className="form-control"
                  />
                </div>
              </div>
              <div className="col-md-3 mb-3">
                <label className="form-label">Due Date</label>
                <div className="input-icon position-relative w-100">
                  <span className="input-icon-addon"><i className="ti ti-calendar"></i></span>
                  <CustomDatePicker 
                    selected={formData.due_date ? new Date(formData.due_date) : null} 
                    onChange={(date) => handleDateChange('due_date', date)} 
                    className="form-control"
                  />
                </div>
              </div>
              <div className="col-md-3 mb-3">
                <label className="form-label">Invoice Type</label>
                <CustomSelect 
                  options={typeOptions} 
                  value={typeOptions.find(o => o.value === formData.invoice_type)} 
                  onChange={(option) => handleSelectChange('invoice_type', option)} 
                />
              </div>
            </div>

            <div className="row mb-4">
              <h6 className="mb-3 text-primary">Line Items</h6>
              <div className="table-responsive">
                <table className="table table-bordered">
                  <thead className="table-light">
                    <tr>
                      <th>Description</th>
                      <th width="120">SAC/HSN</th>
                      <th width="100">Qty</th>
                      <th width="150">Rate</th>
                      <th width="150">Amount</th>
                      <th width="60"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {formData.line_items.map((item, idx) => (
                      <tr key={idx}>
                        <td>
                          <input type="text" className="form-control" value={item.description} onChange={(e) => handleLineItemChange(idx, 'description', e.target.value)} />
                        </td>
                        <td>
                          <input type="text" className="form-control" value={item.sac} onChange={(e) => handleLineItemChange(idx, 'sac', e.target.value)} />
                        </td>
                        <td>
                          <input type="number" className="form-control" value={item.qty} onChange={(e) => handleLineItemChange(idx, 'qty', e.target.value)} />
                        </td>
                        <td>
                          <input type="number" className="form-control" value={item.rate} onChange={(e) => handleLineItemChange(idx, 'rate', e.target.value)} />
                        </td>
                        <td>
                          <input type="number" className="form-control" value={item.amount} readOnly />
                        </td>
                        <td className="text-center">
                          <button className="btn btn-sm btn-outline-danger" onClick={() => removeLineItem(idx)}><i className="ti ti-trash"></i></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-2">
                <button className="btn btn-sm btn-outline-primary" onClick={addLineItem}><i className="ti ti-plus me-1"></i>Add Item</button>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <h6 className="mb-3 text-primary">Notes</h6>
                <textarea className="form-control" rows="4" name="notes" value={formData.notes} onChange={handleChange}></textarea>
              </div>
              <div className="col-md-6">
                <div className="bg-light p-3 rounded">
                  <div className="d-flex justify-content-between mb-2">
                    <span>Total Before Tax:</span>
                    <span className="fw-medium">${totals.totalBeforeTax.toFixed(2)}</span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="d-flex align-items-center gap-2">
                      Tax Type: 
                      <div style={{ width: '150px' }}>
                        <CustomSelect 
                          options={taxOptions} 
                          value={taxOptions.find(o => o.value === formData.tax_type)} 
                          onChange={(option) => handleSelectChange('tax_type', option)} 
                        />
                      </div>
                    </span>
                    <span className="fw-medium">${totals.taxAmount.toFixed(2)}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Round Off:</span>
                    <span className="fw-medium">${totals.roundOff.toFixed(2)}</span>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between">
                    <span className="fs-16 fw-bold">Total Due:</span>
                    <span className="fs-16 fw-bold text-primary">${totals.roundedTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
          <div className="modal-footer border-top">
            <button type="button" className="btn btn-light" onClick={onClose}>Cancel</button>
            <button type="button" className="btn btn-primary" onClick={onClose}>Save Invoice</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceModal;
