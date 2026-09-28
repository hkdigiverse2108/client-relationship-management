import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/common/PageHeader';
import InvoiceStatCard from '../components/common/InvoiceStatCard';
import CustomDataTable from '../components/common/CustomDataTable';
import Footer from '../components/common/Footer';
import InvoiceModal from '../components/finance/InvoiceModal';
import CustomDatePicker from '../components/common/CustomDatePicker';
import CustomSelect from '../components/common/CustomSelect';
import api from '../api/axiosClient';
import toast from 'react-hot-toast';

const InlineStatusEditor = ({ row, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);

  let badgeClass = 'badge-soft-secondary';
  if (row.status === 'Paid') badgeClass = 'badge-soft-success';
  else if (row.status === 'Partially Paid') badgeClass = 'badge-soft-purple';
  else if (row.status === 'Sent') badgeClass = 'badge-soft-info';
  else if (row.status === 'Overdue') badgeClass = 'badge-soft-danger';
  else if (row.status === 'Draft') badgeClass = 'badge-soft-warning';

  const badge = (
    <span 
      className={`badge ${badgeClass} d-inline-flex align-items-center`} 
      onClick={() => setIsEditing(true)}
      style={{ cursor: 'pointer' }}
      title="Click to change status"
    >
      <i className="ti ti-point-filled me-1"></i>{row.status}
    </span>
  );

  if (isEditing) {
    const statusOptions = [
      { value: 'Draft', label: 'Draft' },
      { value: 'Sent', label: 'Sent' },
      { value: 'Paid', label: 'Paid' },
      { value: 'Partially Paid', label: 'Partially Paid' },
      { value: 'Overdue', label: 'Overdue' }
    ];

    return (
      <div style={{ position: 'relative', display: 'inline-block' }}>
        <div style={{ visibility: 'hidden' }}>{badge}</div>
        <div style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: 0, zIndex: 1050, width: '150px' }}>
          <CustomSelect 
            options={statusOptions}
            value={statusOptions.find(o => o.value === row.status)}
            onChange={(opt) => {
              if(opt && opt.value !== row.status) {
                 onUpdate(opt.value);
              }
              setIsEditing(false);
            }}
            menuPortalTarget={document.body}
            menuPosition="fixed"
            autoFocus
            defaultMenuIsOpen
            onBlur={() => setIsEditing(false)}
          />
        </div>
      </div>
    );
  }

  return badge;
};

const Invoices = () => {
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  const [editInvoice, setEditInvoice] = useState(null);
  const [confirmDeleteModal, setConfirmDeleteModal] = useState({ isOpen: false, id: null });
  const [confirmPaidModal, setConfirmPaidModal] = useState({ isOpen: false, row: null });
  const [stats, setStats] = useState({
    total_invoices: 0,
    partially_paid: 0,
    paid_invoices: 0,
    overdue_invoices: 0,
    unpaid_invoices: 0,
    revenue: 0
  });
  
  // For CustomDataTable, we don't need manual pagination states, but we keep the Search Query
  const [searchQuery_invoices, setSearchQuery_invoices] = useState('');

  const [dateRange, setDateRange] = useState([null, null]);
  const [clientFilter, setClientFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sortFilter, setSortFilter] = useState('');

  const statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'Paid', label: 'Paid' },
    { value: 'Sent', label: 'Sent' },
    { value: 'Partially Paid', label: 'Partially Paid' },
    { value: 'Draft', label: 'Draft' },
    { value: 'Overdue', label: 'Overdue' }
  ];


  const sortOptions = [
    { value: '', label: 'Sort By : Last 7 Days' },
    { value: 'Recently Added', label: 'Recently Added' },
    { value: 'Ascending', label: 'Ascending' },
    { value: 'Descending', label: 'Descending' },
    { value: 'Last Month', label: 'Last Month' },
    { value: 'Last 7 Days', label: 'Last 7 Days' },
  ];

  // Helper: open invoice preview in new tab (fast, non-React, pure HTML)
  const openInvoicePreview = (row) => {
    const invoiceId = row.invoice_number || row.invoiceId;
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

  // Helper: direct PDF download without any preview or print dialog
  const downloadInvoicePDF = (row) => {
    // As requested, use the exact same preview view/link for both to avoid any rendering differences
    openInvoicePreview(row);
  };


  const columns = [

    {
      name: 'Invoice',
      selector: row => row.invoiceId,
      cell: row => <Link to="#" onClick={(e) => { e.preventDefault(); openInvoicePreview(row); }} className="tb-data text-primary fw-medium">{row.invoiceId}</Link>,
      sortable: true,
    },
    {
      name: 'Client Name',
      cell: row => {
        const getInitials = (name) => {
          if (!name) return 'UN';
          const parts = name.trim().split(' ');
          if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
          return name.substring(0, 2).toUpperCase();
        };

        return (
          <div className="d-flex align-items-center">
            {(row.avatar && (row.avatar.startsWith('/') || row.avatar.startsWith('http'))) ? (
              <Link to="/client-details" state={{ client: row.fullClient }} className="avatar avatar-md me-2 text-decoration-none">
                <img src={row.avatar} className="rounded-circle" alt="user" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </Link>
            ) : (
              <Link to="/client-details" state={{ client: row.fullClient }} className="avatar avatar-md me-2 text-white bg-primary d-flex align-items-center justify-content-center rounded-circle fw-bold fs-14 text-decoration-none">
                {row.avatar}
              </Link>
            )}
            <div>
              <h6 className="fw-medium mb-0">
                <Link to="/client-details" state={{ client: row.fullClient }}>
                  {row.name}
                </Link>
              </h6>
            </div>
          </div>
        );
      },
      sortable: true,
    },
    { name: 'Created On', selector: row => row.createdOn, sortable: true },
    { name: 'Total', selector: row => row.total, sortable: true },
    { name: 'Amount Due', selector: row => row.amountDue, sortable: true },
    { name: 'Due Date', selector: row => row.dueDate, sortable: true },
    {
      name: 'Status',
      cell: row => {
        const handleStatusChange = async (newStatus) => {
          try {
            await api.put(`/invoices/${row._id}`, { status: newStatus });
            toast.success('Status updated successfully');
            fetchInvoices();
          } catch (error) {
            toast.error('Failed to update status');
          }
        };

        return <InlineStatusEditor row={row} onUpdate={handleStatusChange} />;
      },
      sortable: true,
    },
    {
      name: 'Action',
      cell: row => (
        <div className="action-icon d-inline-flex">
          <Link 
            to="#" 
            onClick={(e) => { 
              e.preventDefault(); 
              if (row.status !== 'Paid') setConfirmPaidModal({ isOpen: true, row: row }); 
            }} 
            className={`me-2 ${row.status === 'Paid' ? 'invisible' : 'text-success'}`} 
            style={{ visibility: row.status === 'Paid' ? 'hidden' : 'visible' }}
            title={row.status !== 'Paid' ? "Mark as Paid" : ""}
          >
            <i className="ti ti-check" style={{fontSize: '18px'}}></i>
          </Link>
          <Link to="#" onClick={(e) => { e.preventDefault(); downloadInvoicePDF(row); }} className="me-2 text-muted" title="Download PDF"><i className="ti ti-download"></i></Link>
          <Link to="#" onClick={(e) => { 
              e.preventDefault(); 
              setEditInvoice(row);
              setIsInvoiceModalOpen(true);
            }} className="me-2 text-muted" title="Edit"><i className="ti ti-edit"></i></Link>
          <Link to="#" onClick={(e) => { e.preventDefault(); setConfirmDeleteModal({ isOpen: true, id: row._id }); }} className="text-muted"><i className="ti ti-trash"></i></Link>
        </div>
      ),
    }
  ];

  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const uniqueClients = [...new Set(invoices.map(inv => inv.client_name || inv.name))].filter(Boolean);
  const clientOptions = [
    { value: '', label: 'All Clients' },
    ...uniqueClients.map(c => ({ value: c, label: c }))
  ];

  // Fetch Invoices
  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      setLoading(true);
      const [res, clientsRes] = await Promise.all([
        api.get('/invoices'),
        api.get('/clients')
      ]);

      const dataArr = Array.isArray(res) ? res : (res.data || []);
      const clientsData = Array.isArray(clientsRes) ? clientsRes : (clientsRes.data || []);
      
      const clientsMap = {};
      clientsData.forEach(c => {
        clientsMap[c._id] = c;
      });

      const getInitials = (name) => {
        if (!name) return 'UN';
        const parts = name.trim().split(' ').filter(p => p.length > 0);
        if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
        if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
        return 'UN';
      };

      const formatted = dataArr.map(inv => {
        const client = clientsMap[inv.client_id];
        const clientName = inv.client_name || (client ? (client.client_name || client.company_name) : 'Unknown Client');
        const avatar = client && client.client_profile_photo ? client.client_profile_photo : getInitials(clientName);

        return {
          ...inv,
          id: inv._id,
          invoiceId: inv.invoice_number || `INV-${inv._id.substring(0,4)}`,
          avatar: avatar,
          name: clientName,
          fullClient: client || { _id: inv.client_id, client_name: clientName },
          email: inv.client_email || 'No Email',
          createdOn: new Date(inv.issue_date || inv.created_at).toLocaleDateString(),
          total: `₹${inv.total_due || inv.rounded_total || inv.total_amount || 0}`,
          amountDue: inv.status === 'Paid' ? '₹0' : `₹${(inv.total_due || inv.rounded_total || inv.total_amount || 0) - (inv.amount_paid || 0)}`,
          dueDate: new Date(inv.due_date || inv.created_at).toLocaleDateString(),
          status: inv.status || 'Pending'
        };
      });
      setInvoices(formatted);
      
      try {
        const statsRes = await api.get('/invoices/stats');
        setStats(statsRes.data || statsRes);
      } catch (statsErr) {
        console.error("Failed to fetch stats:", statsErr);
      }
    } catch (err) {
      console.error(err);
      setError('Failed to load invoices');
    } finally {
      setLoading(false);
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
        total_amount: totalBeforeTax,
        total_tax_amount: taxAmount,
        rounded_total: roundedTotal,
        calculated_round_off: roundOff,
        total_due: roundedTotal,
        status: formData.status || 'Draft'
      };
      
      if (editInvoice && editInvoice._id) {
         await api.put(`/invoices/${editInvoice._id}`, payload);
         toast.success('Invoice updated successfully!');
      } else {
         await api.post('/invoices', payload);
         toast.success('Invoice created successfully!');
      }
      
      setIsInvoiceModalOpen(false);
      setEditInvoice(null);
      fetchInvoices();
    } catch (error) {
      console.error('Error creating invoice:', error.response?.data || error.message);
      toast.error('Failed to create invoice: ' + (error.response?.data?.detail?.[0]?.msg || error.response?.data?.detail || error.message));
    }
  };

  const executeMarkAsPaid = async () => {
    if (!confirmPaidModal.row) return;
    try {
      await api.put(`/invoices/${confirmPaidModal.row._id}`, { status: 'Paid' });
      toast.success('Invoice marked as Paid');
      setConfirmPaidModal({ isOpen: false, row: null });
      fetchInvoices();
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Failed to mark as paid');
    }
  };

  const executeDelete = async () => {
    if (!confirmDeleteModal.id) return;
    try {
      await api.delete(`/invoices/${confirmDeleteModal.id}`);
      setInvoices(prev => prev.filter(inv => inv._id !== confirmDeleteModal.id));
      toast.success('Invoice deleted successfully');
      setConfirmDeleteModal({ isOpen: false, id: null });
      fetchInvoices();
    } catch (error) {
      console.error('Error deleting invoice:', error);
      toast.error('Failed to delete invoice');
    }
  };
  return (
    <>
      <div className="page-wrapper">
			<div className="content">

				{/* Breadcrumb */}
				<PageHeader 
					title="Invoice Management"
					breadcrumbs={[
						{ label: 'Dashboard' },
						{ label: 'Finance & Billing' },
						{ label: 'Invoices', active: true }
					]}
				>
					
						<div className="mb-2">
							<button onClick={() => {
                                setEditInvoice(null);
                                setIsInvoiceModalOpen(true);
                            }} className="btn btn-primary d-flex align-items-center"><i
									className="ti ti-circle-plus me-2"></i>Add Invoice</button>
						</div>
						
				</PageHeader>
				{/* /Breadcrumb */}

				{/* Invoice Data */}
				<div className="row">
					<InvoiceStatCard 
						colClass="col-xl-4 col-md-6 d-flex"
						title="Total Invoices" 
						value={stats.total_invoices || "0"} 
						trendValue="+0.0%" 
						trendColor="success" 
						icon="ti-file-invoice" 
						iconColor="primary" 
					/>
					<InvoiceStatCard 
						colClass="col-xl-4 col-md-6 d-flex"
						badgeColor="purple"
						title="Partially Paid" 
						value={stats.partially_paid || "0"} 
						trendValue="+0.0%" 
						trendColor="success" 
						icon="ti-file-invoice" 
						iconColor="primary" 
					/>
					<InvoiceStatCard 
						colClass="col-xl-4 col-md-6 d-flex"
						badgeColor="success"
						title="Paid Invoices" 
						value={stats.paid_invoices || "0"} 
						trendValue="+0.0%" 
						trendColor="success" 
						icon="ti-file-invoice" 
						iconColor="primary" 
					/>
					<InvoiceStatCard 
						colClass="col-xl-4 col-md-6 d-flex"
						badgeColor="danger"
						title="Overdue Invoices" 
						value={stats.overdue_invoices || "0"} 
						trendValue="+0.0%" 
						trendColor="danger" 
						icon="ti-file-invoice" 
						iconColor="primary" 
					/>
					<InvoiceStatCard 
						colClass="col-xl-4 col-md-6 d-flex"
						badgeColor="warning"
						title="Unpaid Invoices" 
						value={stats.unpaid_invoices || "0"} 
						trendValue="+0.0%" 
						trendColor="success" 
						icon="ti-file-invoice" 
						iconColor="primary" 
					/>
					<InvoiceStatCard 
						colClass="col-xl-4 col-md-6 d-flex"
						badgeColor=""
						title="Revenue" 
						value={`₹${(stats.revenue || 0).toLocaleString('en-IN', { maximumFractionDigits: 2 })}`} 
						trendValue="+0.0%" 
						trendColor="success" 
						icon="ti-file-invoice" 
						iconColor="primary" 
					/>
				</div>
				{/* /Invoice Data */}

				{/* Invoice DataTable */}
				<div className="row">
					<div className="col-sm-12">
						<div className="card">
							<div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
								<h5>Invoice List</h5>
								<div className="d-flex my-xl-auto right-content align-items-center flex-wrap row-gap-3">
									<div className="me-0">
										<div className="input-icon position-relative" style={{ width: '250px' }}>
											<span className="input-icon-addon">
												<i className="ti ti-calendar text-gray-9"></i>
											</span>
											<CustomDatePicker 
												isRange={true}
												selected={dateRange[0]}
												startDate={dateRange[0]}
												endDate={dateRange[1]}
												onChange={(update) => setDateRange(update)}
												className="form-control date-range bookingrange ps-5"
												placeholderText=""
											/>
										</div>
									</div>
									<div className="me-2" style={{ minWidth: '150px' }}>
										<CustomSelect 
											options={clientOptions} 
											value={clientOptions.find(opt => opt.value === clientFilter) || clientOptions[0]} 
											onChange={(selected) => setClientFilter(selected ? selected.value : '')}
										/>
									</div>
									<div className="" style={{ minWidth: '150px' }}>
										<CustomSelect 
											options={statusOptions} 
											value={statusOptions.find(opt => opt.value === statusFilter) || statusOptions[0]} 
											onChange={(selected) => setStatusFilter(selected ? selected.value : '')}
										/>
									</div>
								
								</div>
							</div>
							<div className="card-body p-0">

								
								{/* Custom DataTable Component */}
								<div className="custom-datatable-filter table-responsive">
									<CustomDataTable 
										columns={columns} 
										data={invoices.filter(item => {
											const matchesSearch = item.invoiceId.toLowerCase().includes(searchQuery_invoices.toLowerCase()) || 
                                                                  (item.client_name || item.name || '').toLowerCase().includes(searchQuery_invoices.toLowerCase());
											const matchesStatus = statusFilter ? (item.status || 'Draft').toLowerCase() === statusFilter.toLowerCase() : true;
											const matchesClient = clientFilter ? (item.client_name || item.name) === clientFilter : true;
											
											let matchesDate = true;
											if (dateRange[0] && dateRange[1]) {
												const invDate = new Date(item.issue_date || item.created_at);
												invDate.setHours(0,0,0,0);
												const start = new Date(dateRange[0]); start.setHours(0,0,0,0);
												const end = new Date(dateRange[1]); end.setHours(23,59,59,999);
												matchesDate = invDate >= start && invDate <= end;
											}

											return matchesSearch && matchesStatus && matchesClient && matchesDate;
										})}
									/>
								</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				{/* /Invoice DataTable */}
			</div>

			
      <InvoiceModal 
        isOpen={isInvoiceModalOpen} 
        onClose={() => {
            setIsInvoiceModalOpen(false);
            setEditInvoice(null);
        }} 
        onSave={handleSaveInvoice} 
        editData={editInvoice}
      />

      {confirmDeleteModal.isOpen && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Delete Invoice</h5>
                <button type="button" className="btn-close" onClick={() => setConfirmDeleteModal({ isOpen: false, id: null })} aria-label="Close"></button>
              </div>
              <div className="modal-body text-center py-4">
                <i className="ti ti-alert-circle text-danger mb-3" style={{ fontSize: '48px' }}></i>
                <h5 className="mb-2">Are you sure?</h5>
                <p className="text-muted mb-0">Do you really want to delete this invoice? This process cannot be undone.</p>
              </div>
              <div className="modal-footer justify-content-center border-0 pt-0">
                <button className="btn btn-light px-4" onClick={() => setConfirmDeleteModal({ isOpen: false, id: null })}>Cancel</button>
                <button className="btn btn-danger px-4" onClick={executeDelete}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {confirmPaidModal.isOpen && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Mark Invoice as Paid</h5>
                <button type="button" className="btn-close" onClick={() => setConfirmPaidModal({ isOpen: false, row: null })} aria-label="Close"></button>
              </div>
              <div className="modal-body text-center py-4">
                <i className="ti ti-check text-success mb-3" style={{ fontSize: '48px' }}></i>
                <h5 className="mb-2">Are you sure?</h5>
                <p className="text-muted mb-0">Do you want to mark invoice <strong>{confirmPaidModal.row?.invoiceId}</strong> as Paid?</p>
                <p className="text-muted small mt-2">This will automatically generate a completed payment entry for {confirmPaidModal.row?.name}.</p>
              </div>
              <div className="modal-footer justify-content-center border-0 pt-0">
                <button className="btn btn-light px-4" onClick={() => setConfirmPaidModal({ isOpen: false, row: null })}>Cancel</button>
                <button className="btn btn-success px-4" onClick={executeMarkAsPaid}>Confirm</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Invoices;
