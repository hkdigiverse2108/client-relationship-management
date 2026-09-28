import React, { useState, useEffect } from 'react';
import api from '../../api/axiosClient';
import toast from 'react-hot-toast';
import InvoiceModal from '../finance/InvoiceModal';
import ConfirmationModal from '../ConfirmationModal';
import { useNavigate } from 'react-router-dom';

const formatCurrency = (amount) => {
  if (amount === undefined || amount === null) return '₹0';
  return '₹' + amount.toLocaleString('en-IN');
};

const formatDate = (dateString) => {
  if (!dateString) return '-';
  const d = new Date(dateString);
  if (isNaN(d.getTime())) return dateString;
  return d.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
};

const getStatusClass = (status) => {
  if (status === 'Paid') return 'badge-soft-success text-success';
  if (status === 'Partially Paid') return 'badge-soft-purple text-purple';
  if (status === 'Sent') return 'badge-soft-info text-info';
  if (status === 'Overdue') return 'badge-soft-danger text-danger';
  if (status === 'Draft') return 'badge-soft-warning text-warning';
  return 'bg-light text-dark';
};

  // Helper: open invoice preview in new tab (fast, non-React, pure HTML)
  const openInvoicePreview = (row) => {
    const invoiceId = row.invoice_number || row.invoiceId || `INV-${row._id.substring(0,4)}`;
    const lineItems = row.line_items || [
      { description: 'Website Design & Development', sac: '998314', qty: 1, rate: 50000, amount: 50000, discount: 0 }
    ];
    const taxType = row.tax_type || 'CGST + SGST';
    const isCgst = taxType === 'CGST + SGST';
    const totalBase = parseFloat(row.total_amount) || 50000;
    const taxAmount = parseFloat(row.total_tax_amount) || 9000;
    const totalDue = parseFloat(row.total_due) || 59000;
    const roundOff = parseFloat(row.calculated_round_off) || 0;
    const cgstAmt = isCgst ? taxAmount / 2 : 0;
    const sgstAmt = isCgst ? taxAmount / 2 : 0;
    const igstAmt = isCgst ? 0 : taxAmount;
    const fc = (v) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(v);

    const lineItemsHtml = lineItems.map((item, i) => {
      const qty = parseFloat(item.qty) || 0;
      const rate = parseFloat(item.rate) || 0;
      const disc = parseFloat(item.discount) || 0;
      const amount = qty * rate;
      const taxable = amount - disc;
      return `<tr><td style="text-align:center;padding:8px 10px;border-bottom:1px solid #f0f0f0">${i+1}</td><td style="padding:8px 10px;border-bottom:1px solid #f0f0f0">${item.description}</td><td style="text-align:center;padding:8px 10px;border-bottom:1px solid #f0f0f0">${item.sac}</td><td style="text-align:center;padding:8px 10px;border-bottom:1px solid #f0f0f0">${qty}</td><td style="text-align:right;padding:8px 10px;border-bottom:1px solid #f0f0f0">${fc(rate)}</td><td style="text-align:right;padding:8px 10px;border-bottom:1px solid #f0f0f0">${fc(amount)}</td><td style="text-align:right;padding:8px 10px;border-bottom:1px solid #f0f0f0">${fc(disc)}</td><td style="text-align:right;padding:8px 10px;border-bottom:1px solid #f0f0f0">${fc(taxable)}</td></tr>`;
    }).join('');

    const taxRows = isCgst
      ? `<tr><td style="color:#6c757d;padding:5px 8px">Add: CGST @ ${row.cgst_percent || 9}%</td><td style="text-align:right;font-weight:600;color:#1a1a1a;padding:5px 8px">${fc(cgstAmt)}</td></tr><tr style="border-top:1px solid #e9ecef"><td style="color:#6c757d;padding:5px 8px">Add: SGST @ ${row.sgst_percent || 9}%</td><td style="text-align:right;font-weight:600;color:#1a1a1a;padding:5px 8px">${fc(sgstAmt)}</td></tr>`
      : `<tr style="border-top:1px solid #e9ecef"><td style="color:#6c757d;padding:5px 8px">Add: IGST @ ${row.igst_percent || 18}%</td><td style="text-align:right;font-weight:600;color:#1a1a1a;padding:5px 8px">${fc(igstAmt)}</td></tr>`;

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Invoice - ${invoiceId}</title>
        <style>
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f5f6fa; }
          .action-bar { position: sticky; top: 0; z-index: 999; background: #fff; border-bottom: 1px solid #e9ecef; padding: 12px 24px; display: flex; align-items: center; justify-content: space-between; box-shadow: 0 2px 8px rgba(0,0,0,0.06); }
          .btn-download { background: #718d52; color: #fff; border: none; padding: 8px 18px; border-radius: 6px; font-size: 13px; font-weight: 600; cursor: pointer; transition: background 0.2s; }
          .btn-download:hover { background: #5e7a44; }
          .invoice-page { padding: 24px; min-height: 100vh; }
          .invoice-box { background: #fff; max-width: 900px; margin: 0 auto; border-radius: 8px; box-shadow: 0 4px 24px rgba(0,0,0,0.10); overflow: hidden; }
          .inv-header-bar { background: #718d52; height: 5px; }
          .inv-body { padding: 36px 40px; color: #1a1a1a; }
        </style>
      </head>
      <body>
        <div class="action-bar">
          <div style="display:flex;align-items:center;gap:12px">
            <span style="color:#718d52;font-weight:900;font-size:1.8rem;letter-spacing:-2px;line-height:1">HK</span>
            <div><h5 style="font-size:15px;font-weight:700;color:#1a1a1a;margin:0">Invoice ${invoiceId}</h5><p style="font-size:12px;color:#6c757d;margin:0">Harikrushn DigiVerse LLP</p></div>
          </div>
          <button class="btn-download" id="download-btn">⬇ Download PDF</button>
        </div>
        <div class="invoice-page">
          <div class="invoice-box" id="invoice-pdf">
            <div class="inv-header-bar"></div>
            <div class="inv-body">
              <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:20px">
                <div style="display:flex;align-items:flex-start;gap:20px">
                  <span style="color:#718d52;font-weight:900;font-size:3.5rem;letter-spacing:-4px;line-height:1">HK</span>
                  <div>
                    <h4 style="font-size:16px;font-weight:700;margin:0 0 4px">Harikrushn DigiVerse LLP</h4>
                    <p style="font-size:11px;line-height:1.6;color:#555;margin:0">FLAT-204, 2nd FLOOR, RS NO-67/1, WING-A, HARIKRUSHANA COMPLEX, OPP.<br/>BHAGAT NAGAR, VED, GURUKULROAD, KATARGAM, SURAT- 395004,<br/>GUJARAT, INDIA.<br/>Ph: +91 87805 64463 | sales@hkdigiverse.com<br/>GSTIN: 24APQPN3916P1Z4 | PAN: AAXFN3372M | LLPIN: ACK-1143 | State: 24</p>
                  </div>
                </div>
                <div style="background:#264653;color:#fff;padding:6px 14px;font-size:11px;font-weight:600;letter-spacing:1px;border-radius:3px;white-space:nowrap">${(row.invoice_type||'TAX INVOICE').toUpperCase()}</div>
              </div>
              <hr style="border:none;border-top:2px solid #e0e0e0;margin:16px 0 24px"/>
              <div style="display:flex;gap:40px;margin-bottom:28px">
                <div style="flex:1">
                  <div style="font-size:10px;font-weight:700;color:#6c757d;text-transform:uppercase;letter-spacing:1px;margin-bottom:6px">Bill To</div>
                  <h5 style="font-size:15px;font-weight:700;margin:0 0 4px">${row.client_name||'Client Name'}</h5>
                  <p style="font-size:12px;color:#555;line-height:1.6;margin:0">${row.client_address||'Client Address'}<br/>Ph: ${row.client_phone||'N/A'}<br/>GSTIN: ${row.client_gstin||'N/A'}</p>
                </div>
                <table style="font-size:12px;border-collapse:collapse">
                  <tr><td style="color:#6c757d;padding:3px 0 3px 20px">Invoice No.</td><td style="font-weight:700;text-align:right;padding:3px 0 3px 20px">${invoiceId}</td></tr>
                  <tr><td style="color:#6c757d;padding:3px 0 3px 20px">Date</td><td style="font-weight:700;text-align:right;padding:3px 0 3px 20px">${row.issue_date ? new Date(row.issue_date).toLocaleDateString() : 'N/A'}</td></tr>
                  <tr><td style="color:#6c757d;padding:3px 0 3px 20px">Place of Supply</td><td style="font-weight:700;text-align:right;padding:3px 0 3px 20px">${row.state ? row.state.split('-')[1]||row.state : 'Gujarat'}</td></tr>
                </table>
              </div>
              <table style="width:100%;border-collapse:collapse;font-size:12px;margin-bottom:24px">
                <thead><tr style="background:#718d52;color:#fff">
                  <th style="padding:10px;font-weight:600;text-align:center;width:5%">S.No</th>
                  <th style="padding:10px;font-weight:600;text-align:left">Product Description</th>
                  <th style="padding:10px;font-weight:600;text-align:center;width:8%">SAC</th>
                  <th style="padding:10px;font-weight:600;text-align:center;width:8%">Qty</th>
                  <th style="padding:10px;font-weight:600;text-align:right;width:12%">Rate</th>
                  <th style="padding:10px;font-weight:600;text-align:right;width:12%">Amount</th>
                  <th style="padding:10px;font-weight:600;text-align:right;width:10%">Disc.</th>
                  <th style="padding:10px;font-weight:600;text-align:right;width:15%">Taxable Amt</th>
                </tr></thead>
                <tbody>
                  ${lineItemsHtml}
                  <tr style="background:#f8f9fa;font-weight:700">
                    <td style="padding:10px" colspan="3">Total</td>
                    <td style="padding:10px;text-align:center">${lineItems.reduce((a,c)=>a+(parseFloat(c.qty)||0),0)}</td>
                    <td colspan="3"></td>
                    <td style="padding:10px;text-align:right">${fc(totalBase)}</td>
                  </tr>
                </tbody>
              </table>
              <div style="display:flex;justify-content:flex-end;margin-bottom:20px">
                <table style="width:320px;font-size:12px;border-collapse:collapse">
                  <tr><td style="color:#6c757d;padding:5px 8px">Total Before Tax</td><td style="text-align:right;font-weight:600;color:#1a1a1a;padding:5px 8px">${fc(totalBase)}</td></tr>
                  ${taxRows}
                  <tr><td style="color:#6c757d;padding:5px 8px;font-weight:700;color:#1a1a1a">Total Tax Amount</td><td style="text-align:right;font-weight:600;color:#1a1a1a;padding:5px 8px">${fc(taxAmount)}</td></tr>
                  <tr style="border-top:1px solid #e9ecef"><td style="color:#6c757d;padding:5px 8px">Round Off</td><td style="text-align:right;font-weight:600;color:#1a1a1a;padding:5px 8px">${roundOff>=0?'+':''}${fc(roundOff)}</td></tr>
                  <tr><td style="background:#718d52;color:#fff;font-weight:700;padding:9px 10px">Total After Tax</td><td style="background:#718d52;color:#fff;font-weight:700;text-align:right;padding:9px 10px">${fc(totalDue)}</td></tr>
                </table>
              </div>
              <div style="background:#f8f9fa;border-left:3px solid #718d52;padding:10px 14px;border-radius:0 4px 4px 0;font-size:13px;margin-bottom:28px">
                <span style="color:#6c757d;margin-right:6px">Amount In Words:</span>
                <span style="font-weight:700;color:#1a1a1a">${totalDue} Rupees Only</span>
              </div>
              <!-- BANK DETAILS -->
              <div style="border: 1px solid #e2e8f0; border-radius: 4px; padding: 12px; margin-bottom: 28px;">
                <div style="font-size:10px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px">Bank Details</div>
                <div style="font-size:12px; color:#1a1a1a; display: flex; flex-wrap: wrap; gap: 40px;">
                  <div><span style="color:#94a3b8; margin-right:4px;">Bank:</span> <strong>${row.bank_name || 'Axis Bankk'}</strong></div>
                  <div><span style="color:#94a3b8; margin-right:4px;">A/c:</span> <strong>${row.bank_ac || '9240200573774150'}</strong></div>
                  <div><span style="color:#94a3b8; margin-right:4px;">IFSC:</span> <strong>${row.bank_ifsc || 'UTIB00028912'}</strong></div>
                </div>
              </div>

              <!-- TERMS AND SIGNATURE -->
              <div style="display: flex; justify-content: space-between; align-items: flex-end;">
                <div style="flex: 1; padding-right: 20px;">
                  <div style="font-size:10px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px">Terms &amp; Conditions</div>
                  <p style="font-size:11px;color:#555;line-height:1.8;white-space:pre-line;margin:0">${(row.notes||'1. Payment is due within 3 days of the invoice date.\n2. Late payments may incur additional charges.\n3. All disputes are subject to Gujarat Jurisdiction.').replace(/\n/g,'<br/>')}</p>
                </div>
                
                <div style="width: 200px; text-align: center;">
                  ${row.signature_url ? `<img src="${row.signature_url}" style="max-height: 60px; max-width: 100%; margin-bottom: 5px;" alt="Signature" />` : `<div style="height: 60px;"></div>`}
                  <div style="border-top: 1px solid #cbd5e1; padding-top: 8px; font-size: 11px; font-weight: 700; color: #1a1a1a;">Authorized Signatory</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"></script>
        <script>
          document.getElementById('download-btn').addEventListener('click', function() {
            var element = document.getElementById('invoice-pdf');
            html2pdf().set({
              margin: [8, 8, 8, 8],
              filename: 'Invoice-${invoiceId}.pdf',
              image: { type: 'jpeg', quality: 0.98 },
              html2canvas: { scale: 2, useCORS: true, logging: false },
              jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
            }).from(element).save();
          });
        </script>
      </body>
      </html>
    `;

    const previewWindow = window.open('', '_blank');
    previewWindow.document.write(htmlContent);
    previewWindow.document.close();
  };

function InvoiceTable({ data, onView, onEdit, onDelete, modalId }) {
  return (
    <div className="table-responsive hide-scrollbar" style={{ minHeight: '410px', maxHeight: '450px', overflowY: 'auto' }}>
      <style>{`.hide-scrollbar::-webkit-scrollbar { display: none !important; }`}</style>
      <table className="table table-nowrap mb-0">
        <thead className="thead-light">
          <tr style={{ position: 'sticky', top: 0, zIndex: 1, backgroundColor: '#fff' }}>
            <th>Invoice ID</th>
            <th>Products</th>
            <th>Total Amount</th>
            <th>Due Amount</th>
            <th>Issue Date</th>
            <th>Status</th>
            <th className="text-end">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center py-4 text-muted">No invoices found for this client.</td>
            </tr>
          ) : (
            data.map((inv) => (
              <tr key={inv._id}>
                <td><span className="text-primary fw-medium">{inv.invoice_number || `INV-${inv._id.substring(0,4)}`}</span></td>
                <td>
                  {inv.line_items && inv.line_items.length > 0 ? (
                    inv.line_items.length > 1 ? (
                      <div className="dropdown">
                        <a href="#" className="dropdown-toggle text-dark fs-14 fw-medium text-decoration-none border-0" style={{ outline: 'none', boxShadow: 'none', border: 'none', background: 'transparent' }} data-bs-toggle="dropdown" onClick={(e) => e.preventDefault()}>
                          {inv.line_items[0].description || 'Item'} (+{inv.line_items.length - 1})
                        </a>
                        <ul className="dropdown-menu p-3" style={{ minWidth: '250px', zIndex: 9999 }}>
                          {inv.line_items.map((item, idx) => (
                            <li key={idx} className="mb-2 last:mb-0">
                              <div className="d-flex justify-content-between align-items-center">
                                <span className="text-dark fw-medium text-truncate" style={{maxWidth: '150px'}} title={item.description}>{item.description || 'Item'}</span>
                                <span className="badge bg-light text-dark">Qty: {item.qty || 1}</span>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <span className="text-dark fs-14 fw-medium text-truncate d-inline-block" style={{ maxWidth: '200px' }} title={inv.line_items[0].description}>
                        {inv.line_items[0].description || 'Item'}
                      </span>
                    )
                  ) : (
                    <span className="text-muted">No products</span>
                  )}
                </td>
                <td className="fw-medium">{formatCurrency(inv.total_due || inv.total_amount)}</td>
                <td className="fw-medium text-danger">{formatCurrency((inv.total_due || inv.total_amount) - (inv.amount_paid || 0))}</td>
                <td>{formatDate(inv.issue_date || inv.created_at)}</td>
                <td>
                  <span className={`badge ${getStatusClass(inv.status)} d-inline-flex align-items-center`}>
                    <i className="fas fa-circle fs-6 me-1"></i>{inv.status || 'Draft'}
                  </span>
                </td>
                <td className="text-end">
                  <div className="dropdown">
                    <a href="#" onClick={(e) => e.preventDefault()} className="d-inline-flex align-items-center" data-bs-toggle="dropdown">
                      <i className="ti ti-dots-vertical"></i>
                    </a>
                    <ul className="dropdown-menu dropdown-menu-end p-3" style={{ zIndex: 9999, position: 'absolute' }}>
                      <li>
                        <button type="button" onClick={() => onView(inv)} className="dropdown-item rounded-1 border-0 bg-transparent w-100 text-start">
                          <i className="ti ti-eye me-2"></i>View
                        </button>
                      </li>
                      <li>
                        <button type="button" onClick={() => onEdit(inv)} className="dropdown-item rounded-1 border-0 bg-transparent w-100 text-start">
                          <i className="ti ti-edit me-2"></i>Edit
                        </button>
                      </li>
                      <li>
                        <button type="button" onClick={() => onDelete(inv)} data-bs-toggle="modal" data-bs-target={`#${modalId}`} className="dropdown-item rounded-1 border-0 bg-transparent text-danger w-100 text-start">
                          <i className="ti ti-trash me-2"></i>Delete
                        </button>
                      </li>
                    </ul>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default function ClientInvoices({ isAccordion, client }) {
  const [invoices, setInvoices] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [invoiceToDelete, setInvoiceToDelete] = useState(null);
  const navigate = useNavigate();
  
  const modalId = isAccordion ? "deleteInvoiceModalAccordion" : "deleteInvoiceModalTab";
  
  const fetchInvoices = async () => {
    if (!client || !client._id) return;
    try {
      const res = await api.get('/invoices');
      const data = Array.isArray(res.data) ? res.data : (Array.isArray(res) ? res : []);
      const clientInvs = data.filter(i => i.client_id === client._id);
      
      // Sort by latest first
      clientInvs.sort((a, b) => new Date(b.created_at || b.issue_date) - new Date(a.created_at || a.issue_date));
      setInvoices(clientInvs);
    } catch (error) {
      console.error("Failed to fetch invoices:", error);
    }
  };

  useEffect(() => {
    fetchInvoices();
    
    // Listen for global event to open invoice modal
    const handleOpenModal = () => {
      setEditData(null);
      setIsModalOpen(true);
    };
    document.addEventListener('openClientInvoiceModal', handleOpenModal);
    
    return () => {
      document.removeEventListener('openClientInvoiceModal', handleOpenModal);
    };
  }, [client]);



  const handleEdit = (inv) => {
    setEditData(inv);
    setIsModalOpen(true);
  };

  const handleDelete = (inv) => {
    setInvoiceToDelete(inv);
  };

  const confirmDelete = async () => {
    if (!invoiceToDelete) return;
    try {
      await api.delete(`/invoices/${invoiceToDelete._id}`);
      toast.success('Invoice deleted successfully');
      setInvoiceToDelete(null);
      fetchInvoices();
    } catch (error) {
      toast.error('Failed to delete invoice');
    }
  };

  const handleSaveInvoice = async (formData) => {
    try {
      const totalBeforeTax = formData.line_items.reduce((sum, item) => sum + Number(item.amount), 0) - Number(formData.additional_discount || 0);
      let taxAmount = 0;
      if (formData.tax_type === 'CGST + SGST') {
        taxAmount = (totalBeforeTax * formData.cgst_percent / 100) + (totalBeforeTax * formData.sgst_percent / 100);
      } else if (formData.tax_type === 'IGST') {
        taxAmount = totalBeforeTax * formData.igst_percent / 100;
      }
      const rawTotal = totalBeforeTax + taxAmount;
      const roundedTotal = Math.round(rawTotal);
      const roundOff = roundedTotal - rawTotal;

      const payload = {
        ...formData,
        client_id: client._id,
        total_amount: totalBeforeTax,
        total_tax_amount: taxAmount,
        rounded_total: roundedTotal,
        calculated_round_off: roundOff,
        total_due: roundedTotal,
        status: formData.status || 'Draft'
      };
      
      if (editData && editData._id) {
         await api.put(`/invoices/${editData._id}`, payload);
         toast.success('Invoice updated successfully!');
      } else {
         await api.post('/invoices', payload);
         toast.success('Invoice created successfully!');
      }
      
      setIsModalOpen(false);
      setEditData(null);
      fetchInvoices();
    } catch (error) {
      toast.error('Failed to save invoice');
    }
  };

  const handleView = (inv) => {
    navigate('/invoices');
  };

  const renderContent = () => (
    <>
      <InvoiceTable data={invoices} onView={handleView} onEdit={handleEdit} onDelete={handleDelete} modalId={modalId} />
      {isModalOpen && (
        <InvoiceModal 
          isOpen={isModalOpen} 
          onClose={() => { setIsModalOpen(false); setEditData(null); }} 
          onSave={handleSaveInvoice} 
          editData={editData}
          fixedClientId={client?._id}
        />
      )}
      <ConfirmationModal 
        id={modalId}
        title="Confirm Delete"
        description="Are you sure you want to delete this invoice? This action cannot be undone."
        onConfirm={confirmDelete}
      />
    </>
  );

  if (isAccordion) {
    return (
      <div className="accordion-item">
        <h2 className="accordion-header" id="headingClientInvoices">
          <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseClientInvoices" aria-expanded="false" aria-controls="collapseClientInvoices">
            Invoices
          </button>
        </h2>
        <div id="collapseClientInvoices" className="accordion-collapse collapse" aria-labelledby="headingClientInvoices" data-bs-parent="#overviewAccordion">
          <div className="accordion-body pb-0">
            {renderContent()}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="accordion accordions-items-seperate">
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingInvoicesTab">
            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseInvoicesTab" aria-expanded="true" aria-controls="collapseInvoicesTab">
              Invoices
            </button>
          </h2>
          <div id="collapseInvoicesTab" className="accordion-collapse collapse show" aria-labelledby="headingInvoicesTab">
            <div className="accordion-body p-0 pt-3">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
