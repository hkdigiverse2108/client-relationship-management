import React, { useState, useEffect } from 'react';
import CustomSelect from '../common/CustomSelect';
import CustomDatePicker from '../common/CustomDatePicker';
import api from '../../api/axiosClient';

const InvoiceModal = ({ isOpen, onClose, onSave, editData }) => {
  const defaultFormData = {
    invoice_number: `INV-${Math.floor(1000 + Math.random() * 9000)}`,
    client_id: '',
    client_name: '',
    client_address: '',
    client_phone: '',
    client_gstin: '',
    state: '24 - Gujarat',
    invoice_type: 'Tax Invoice',
    mode_of_payment: 'Current Account',
    issue_date: new Date().toLocaleDateString('en-CA'),
    due_date: new Date(new Date().setMonth(new Date().getMonth() + 1)).toLocaleDateString('en-CA'),
    line_items: [{ description: '', sac: '', qty: 1, rate: 0, discount: 0, amount: 0 }],
    tax_type: 'CGST + SGST',
    cgst_percent: 9,
    sgst_percent: 9,
    igst_percent: 18,
    additional_discount: 0,
    is_recurring: false,
    recurring_frequency: 'monthly',
    next_issue_date: '',
    recurring_end_date: '',
    source_type: 'Project',
    brand: '',
    status: 'Draft',
    notes: '1. Payment is due within 3 days of the invoice date.\n2. All disputes are subject to Gujarat Jurisdiction.'
  };

  const [formData, setFormData] = useState(defaultFormData);

  const statusOptions = [
    { value: 'Draft', label: 'Draft' },
    { value: 'Sent', label: 'Sent' },
    { value: 'Paid', label: 'Paid' },
    { value: 'Partially Paid', label: 'Partially Paid' },
    { value: 'Overdue', label: 'Overdue' },
  ];

  const [clients, setClients] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const res = await api.get('/clients');
        setClients(Array.isArray(res) ? res : (res.data || []));
      } catch (err) {
        console.error("Failed to fetch clients:", err);
      }
    };
    if(isOpen) fetchClients();
    
    if (isOpen) {
      if (editData) {
        setFormData({ ...defaultFormData, ...editData });
      } else {
        setFormData(defaultFormData);
      }
      setErrors({});
    }
  }, [isOpen, editData]);

  const sourceOptions = [
    { value: 'Project', label: 'Project' },
    { value: 'E-commerce', label: 'E-commerce' },
    { value: 'Retainer', label: 'Retainer' },
    { value: 'Ad-hoc', label: 'Ad-hoc' },
  ];

  const recurringIntervalOptions = [
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'yearly', label: 'Yearly' },
  ];

  const stateOptions = [
    { value: '01 - Jammu & Kashmir', label: '01 - Jammu & Kashmir' },
    { value: '02 - Himachal Pradesh', label: '02 - Himachal Pradesh' },
    { value: '03 - Punjab', label: '03 - Punjab' },
    { value: '04 - Chandigarh', label: '04 - Chandigarh' },
    { value: '05 - Uttarakhand', label: '05 - Uttarakhand' },
    { value: '06 - Haryana', label: '06 - Haryana' },
    { value: '07 - Delhi', label: '07 - Delhi' },
    { value: '08 - Rajasthan', label: '08 - Rajasthan' },
    { value: '09 - Uttar Pradesh', label: '09 - Uttar Pradesh' },
    { value: '10 - Bihar', label: '10 - Bihar' },
    { value: '11 - Sikkim', label: '11 - Sikkim' },
    { value: '12 - Arunachal Pradesh', label: '12 - Arunachal Pradesh' },
    { value: '13 - Nagaland', label: '13 - Nagaland' },
    { value: '14 - Manipur', label: '14 - Manipur' },
    { value: '15 - Mizoram', label: '15 - Mizoram' },
    { value: '16 - Tripura', label: '16 - Tripura' },
    { value: '17 - Meghalaya', label: '17 - Meghalaya' },
    { value: '18 - Assam', label: '18 - Assam' },
    { value: '19 - West Bengal', label: '19 - West Bengal' },
    { value: '20 - Jharkhand', label: '20 - Jharkhand' },
    { value: '21 - Odisha', label: '21 - Odisha' },
    { value: '22 - Chhattisgarh', label: '22 - Chhattisgarh' },
    { value: '23 - Madhya Pradesh', label: '23 - Madhya Pradesh' },
    { value: '24 - Gujarat', label: '24 - Gujarat' },
    { value: '25 - Daman and Diu', label: '25 - Daman and Diu' },
    { value: '26 - Dadra and Nagar Haveli', label: '26 - Dadra and Nagar Haveli' },
    { value: '27 - Maharashtra', label: '27 - Maharashtra' },
    { value: '29 - Karnataka', label: '29 - Karnataka' },
    { value: '30 - Goa', label: '30 - Goa' },
    { value: '31 - Lakshadweep', label: '31 - Lakshadweep' },
    { value: '32 - Kerala', label: '32 - Kerala' },
    { value: '33 - Tamil Nadu', label: '33 - Tamil Nadu' },
    { value: '34 - Puducherry', label: '34 - Puducherry' },
    { value: '35 - Andaman and Nicobar Islands', label: '35 - Andaman and Nicobar Islands' },
    { value: '36 - Telangana', label: '36 - Telangana' },
    { value: '37 - Andhra Pradesh', label: '37 - Andhra Pradesh' },
    { value: '38 - Ladakh', label: '38 - Ladakh' }
  ];

  const typeOptions = [
    { value: 'Tax Invoice', label: 'Tax Invoice' },
    { value: 'Proforma Invoice', label: 'Proforma Invoice' }
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
    if (['qty', 'rate', 'discount'].includes(field)) {
      const q = parseFloat(updatedItems[index].qty) || 0;
      const r = parseFloat(updatedItems[index].rate) || 0;
      const d = parseFloat(updatedItems[index].discount) || 0;
      updatedItems[index].amount = (q * r) - d;
    }
    setFormData(prev => ({ ...prev, line_items: updatedItems }));
  };

  const addLineItem = () => {
    setFormData(prev => ({
      ...prev,
      line_items: [...prev.line_items, { description: '', sac: '', qty: 1, rate: 0, discount: 0, amount: 0 }]
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

  const handleSubmit = () => {
    const newErrors = {};
    if (!formData.client_id) newErrors.client_id = "Billed to client is required";
    if (formData.mode_of_payment !== 'Cash' && !formData.client_gstin) newErrors.client_gstin = "Client GSTIN is required";
    if (!formData.status) newErrors.status = "Status is required";
    if (!formData.issue_date) newErrors.issue_date = "Date of Issue is required";
    if (!formData.due_date) newErrors.due_date = "Due Date is required";
    if (!formData.invoice_type) newErrors.invoice_type = "Invoice Type is required";
    if (!formData.mode_of_payment) newErrors.mode_of_payment = "Mode of Payment is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      // Optional: you can show a toast here if you want
      return;
    }
    
    setErrors({});
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <>
    <style>{`
      .custom-scroll::-webkit-scrollbar { display: none; }
      .custom-scroll { -ms-overflow-style: none; scrollbar-width: none; }
    `}</style>
    <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered modal-xl">
        <div className="modal-content">
          <div className="modal-header border-bottom">
            <h5 className="modal-title">Create New Invoice</h5>
            <button type="button" className="btn-close" onClick={onClose}>✖</button>
          </div>
          <div className="modal-body p-4 custom-scroll" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
            <div className="row mb-4 border-bottom pb-4">
              <input type="hidden" name="client_id" value={formData.client_id} />
              <h6 className="mb-3 text-primary"><i className="ti ti-user me-2"></i>Client Details</h6>
              
              <div className="col-md-6 mb-3">
                <label className="form-label">Billed To (Client) <span className="text-danger">*</span></label>
                <CustomSelect 
                  creatable={true}
                  options={clients.map(c => ({ value: c._id, label: c.client_name || c.company_name || c.name || `${c.first_name || ''} ${c.last_name || ''}`.trim() }))} 
                  value={formData.client_id ? 
                         (formData.client_id === 'custom' ? { value: 'custom', label: formData.client_name } : 
                         { value: formData.client_id, label: formData.client_name }) 
                         : null} 
                  onChange={(option, actionMeta) => {
                    setErrors(prev => ({ ...prev, client_id: '' }));
                    if (actionMeta.action === 'create-option') {
                      setFormData(prev => ({...prev, client_id: 'custom', client_name: option.value, client_phone: '', client_gstin: '', client_address: ''}));
                    } else if (option) {
                      const cId = option.value;
                      const c = clients.find(cl => cl._id === cId);
                      if(c) {
                        setFormData(prev => ({
                          ...prev, client_id: cId, 
                          client_name: c.client_name || c.company_name || c.name || `${c.first_name || ''} ${c.last_name || ''}`.trim(),
                          client_phone: c.mobile_number || c.phone || '',
                          client_address: c.address || '',
                          client_gstin: c.gstin || ''
                        }));
                      }
                    } else {
                      setFormData(prev => ({...prev, client_id: '', client_name: ''}));
                    }
                  }} 
                  placeholder="Select or Type Client Name..."
                  className={errors.client_id ? 'border border-danger rounded' : ''}
                />
                {errors.client_id && <div className="text-danger small mt-1">{errors.client_id}</div>}
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Client Address</label>
                <input type="text" className="form-control" name="client_address" value={formData.client_address} onChange={handleChange} placeholder="Enter client address" />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">State / UT</label>
                <CustomSelect 
                  options={stateOptions} 
                  value={stateOptions.find(o => o.value === formData.state)} 
                  onChange={(option) => {
                    handleSelectChange('state', option);
                    const isGujarat = option && option.value && option.value.includes('Gujarat');
                    setFormData(prev => ({ ...prev, tax_type: isGujarat ? 'CGST + SGST' : 'IGST' }));
                  }} 
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Brand</label>
                <input type="text" className="form-control" name="brand" value={formData.brand} onChange={handleChange} placeholder="e.g. Development, Creative" />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Client Phone</label>
                <input type="text" className="form-control" name="client_phone" value={formData.client_phone} onChange={handleChange} placeholder="Phone number" />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Client GSTIN {formData.mode_of_payment !== 'Cash' && <span className="text-danger">*</span>}</label>
                <input type="text" className={`form-control ${errors.client_gstin ? 'is-invalid' : ''}`} name="client_gstin" value={formData.client_gstin} onChange={(e) => {
                  handleChange(e);
                  setErrors(prev => ({ ...prev, client_gstin: '' }));
                }} placeholder="Enter client GSTIN" />
                {errors.client_gstin && <div className="text-danger small mt-1">{errors.client_gstin}</div>}
              </div>
            </div>

            <div className="row mb-4">
              <h6 className="mb-3 text-primary"><i className="ti ti-file-invoice me-2"></i>Invoice Details</h6>
              
              <div className="col-md-4 mb-3">
                <label className="form-label">Invoice Number</label>
                <input type="text" className="form-control bg-light" name="invoice_number" value={formData.invoice_number} readOnly />
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">Status <span className="text-danger">*</span></label>
                <CustomSelect 
                  options={statusOptions} 
                  value={statusOptions.find(o => o.value === formData.status)} 
                  onChange={(option) => {
                    handleSelectChange('status', option);
                    setErrors(prev => ({ ...prev, status: '' }));
                  }} 
                  className={errors.status ? 'border border-danger rounded' : ''}
                />
                {errors.status && <div className="text-danger small mt-1">{errors.status}</div>}
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">Source Type</label>
                <CustomSelect 
                  options={sourceOptions} 
                  value={sourceOptions.find(o => o.value === formData.source_type)} 
                  onChange={(option) => handleSelectChange('source_type', option)} 
                />
              </div>

              <div className="col-md-4 mb-3">
                <label className="form-label">Date of Issue <span className="text-danger">*</span></label>
                <div className={`input-icon position-relative w-100 ${errors.issue_date ? 'border border-danger rounded' : ''}`}>
                  <span className="input-icon-addon"><i className="ti ti-calendar"></i></span>
                  <CustomDatePicker 
                    selected={formData.issue_date ? new Date(formData.issue_date) : null} 
                    onChange={(date) => {
                      handleDateChange('issue_date', date);
                      setErrors(prev => ({ ...prev, issue_date: '' }));
                    }} 
                    className="form-control"
                  />
                </div>
                {errors.issue_date && <div className="text-danger small mt-1">{errors.issue_date}</div>}
              </div>

              <div className="col-md-4 mb-3">
                <label className="form-label">Due Date <span className="text-danger">*</span></label>
                <div className={`input-icon position-relative w-100 ${errors.due_date ? 'border border-danger rounded' : ''}`}>
                  <span className="input-icon-addon"><i className="ti ti-calendar"></i></span>
                  <CustomDatePicker 
                    selected={formData.due_date ? new Date(formData.due_date) : null} 
                    onChange={(date) => {
                      handleDateChange('due_date', date);
                      setErrors(prev => ({ ...prev, due_date: '' }));
                    }} 
                    className="form-control"
                  />
                </div>
                {errors.due_date && <div className="text-danger small mt-1">{errors.due_date}</div>}
              </div>

              <div className="col-md-4 mb-3">
                <label className="form-label">Invoice Type <span className="text-danger">*</span></label>
                <CustomSelect 
                  options={typeOptions} 
                  value={typeOptions.find(o => o.value === formData.invoice_type)} 
                  onChange={(option) => {
                    handleSelectChange('invoice_type', option);
                    setErrors(prev => ({ ...prev, invoice_type: '' }));
                  }} 
                  className={errors.invoice_type ? 'border border-danger rounded' : ''}
                />
                {errors.invoice_type && <div className="text-danger small mt-1">{errors.invoice_type}</div>}
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">Mode of Payment <span className="text-danger">*</span></label>
                <CustomSelect 
                  options={[
                    { value: 'Current Account', label: 'Current Account' },
                    { value: 'Other Account', label: 'Other Account' },
                    { value: 'Cash', label: 'Cash' },
                    { value: 'Cash with GST', label: 'Cash with GST' },
                  ]} 
                  value={{ value: formData.mode_of_payment, label: formData.mode_of_payment }}
                  onChange={(option) => {
                    handleSelectChange('mode_of_payment', option);
                    setErrors(prev => ({ ...prev, mode_of_payment: '' }));
                  }} 
                  className={errors.mode_of_payment ? 'border border-danger rounded' : ''}
                />
                {errors.mode_of_payment && <div className="text-danger small mt-1">{errors.mode_of_payment}</div>}
              </div>
                <div className="col-md-12 mb-3 mt-2 border-top pt-3">
                  <div className="form-check form-switch mb-1">
                    <input className="form-check-input" type="checkbox" role="switch" id="recurringSwitch" 
                      checked={formData.is_recurring} 
                      onChange={(e) => setFormData(prev => ({...prev, is_recurring: e.target.checked}))} 
                    />
                    <label className="form-check-label fw-medium ms-2" htmlFor="recurringSwitch">Enable Auto-Recurring Invoice</label>
                  </div>
                  <div className="form-text text-muted mb-3">System will automatically generate and save a new invoice based on frequency.</div>
                  
                  {formData.is_recurring && (
                    <div className="row g-3 p-3 rounded shadow-sm border" style={{ backgroundColor: '#f8f9fa' }}>
                      <div className="col-md-4">
                        <label className="form-label">Frequency</label>
                        <CustomSelect 
                          options={recurringIntervalOptions} 
                          value={recurringIntervalOptions.find(o => o.value === formData.recurring_frequency)} 
                          onChange={(option) => handleSelectChange('recurring_frequency', option)} 
                        />
                      </div>
                      <div className="col-md-4">
                        <label className="form-label">Next Auto-Issue Date</label>
                        <div className="input-icon position-relative w-100">
                          <span className="input-icon-addon"><i className="ti ti-calendar"></i></span>
                          <CustomDatePicker 
                            selected={formData.next_issue_date ? new Date(formData.next_issue_date) : null} 
                            onChange={(date) => handleDateChange('next_issue_date', date)} 
                            className="form-control"
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <label className="form-label">Stop Recurrence After (Optional)</label>
                        <div className="input-icon position-relative w-100">
                          <span className="input-icon-addon"><i className="ti ti-calendar"></i></span>
                          <CustomDatePicker 
                            selected={formData.recurring_end_date ? new Date(formData.recurring_end_date) : null} 
                            onChange={(date) => handleDateChange('recurring_end_date', date)} 
                            className="form-control"
                          />
                        </div>
                      </div>
                    </div>
                  )}
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
                      <th width="120">Rate</th>
                      <th width="120">Discount</th>
                      <th width="120">Amount</th>
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
                          <input type="number" className="form-control" value={item.discount} onChange={(e) => handleLineItemChange(idx, 'discount', e.target.value)} />
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
                    <span className="fw-medium">₹{totals.totalBeforeTax.toFixed(2)}</span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <span className="d-flex align-items-center gap-2">
                      Tax Type: 
                      <div style={{ width: '130px' }}>
                        <CustomSelect 
                          options={taxOptions} 
                          value={taxOptions.find(o => o.value === formData.tax_type)} 
                          onChange={(option) => handleSelectChange('tax_type', option)} 
                        />
                      </div>
                    </span>
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

                  <div className="d-flex justify-content-between align-items-center mb-3 pb-3 border-bottom">
                      <span className="fw-medium text-muted">Additional Discount (₹)</span>
                      <input type="number" className="form-control form-control-sm text-end text-success" style={{width: '120px'}} name="additional_discount" value={formData.additional_discount} onChange={handleChange} step="0.01" />
                  </div>

                  <div className="d-flex justify-content-between mb-2">
                    <span>Total Tax Amount:</span>
                    <span className="fw-medium">₹{totals.taxAmount.toFixed(2)}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Round Off:</span>
                    <span className="fw-medium">₹{totals.roundOff.toFixed(2)}</span>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between">
                    <span className="fs-16 fw-bold">Total Due:</span>
                    <span className="fs-16 fw-bold text-primary">₹{totals.roundedTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
          <div className="modal-footer border-top">
            <button type="button" className="btn btn-light" onClick={onClose}>Cancel</button>
            <button type="button" className="btn btn-primary" onClick={handleSubmit}>Save Invoice</button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default InvoiceModal;
