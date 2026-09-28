import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/common/PageHeader';
import QuoteModal from '../components/finance/QuoteModal';
import StatCard from '../components/common/StatCard';
import CustomDataTable from '../components/common/CustomDataTable';
import FilterBar from '../components/common/FilterBar';
import CustomSelect from '../components/common/CustomSelect';
import api from '../api/axiosClient';
import toast from 'react-hot-toast';

const Quotes = () => {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [searchQuery_quotes, setSearchQuery_quotes] = useState('');
  
  const [quotes, setQuotes] = useState([]);
  const [stats, setStats] = useState({ total: 0, accepted: 0, pending: 0, rejected: 0 });

  const [editQuote, setEditQuote] = useState(null);
  const [confirmDeleteModal, setConfirmDeleteModal] = useState({ isOpen: false, id: null });

  const [dateRange, setDateRange] = useState([null, null]);
  const [clientFilter, setClientFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sortFilter, setSortFilter] = useState('');

  const [clientsOptionsList, setClientsOptionsList] = useState([{ value: '', label: 'All Clients' }]);

  const statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'Accepted', label: 'Accepted' },
    { value: 'Rejected', label: 'Rejected' },
    { value: 'Draft', label: 'Draft' },
    { value: 'Sent', label: 'Sent' },
    { value: 'Expired', label: 'Expired' }
  ];

  const handleStatusChange = async (id, newStatus) => {
    try {
      await api.put(`/quotes/${id}`, { status: newStatus });
      toast.success('Status updated successfully');
      fetchQuotes();
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Failed to update status');
    }
  };

  const sortOptions = [
    { value: '', label: 'Sort By : Last 7 Days' },
    { value: 'Recently Added', label: 'Recently Added' },
    { value: 'Ascending', label: 'Ascending' },
    { value: 'Descending', label: 'Descending' },
  ];

  const InlineStatus = ({ row, onStatusChange }) => {
    const [isEditing, setIsEditing] = useState(false);
    
    let badgeClass = 'badge-success';
    if (row.status === 'Rejected') badgeClass = 'badge-danger';
    if (row.status === 'Draft') badgeClass = 'badge-warning';
    if (row.status === 'Sent') badgeClass = 'badge-info';
    if (row.status === 'Expired') badgeClass = 'badge-secondary';
    
    const badge = (
      <span 
        className={`badge ${badgeClass} d-inline-flex align-items-center badge-xs`} 
        onClick={() => setIsEditing(true)}
        style={{ cursor: 'pointer' }}
        title="Click to change status"
      >
        <i className="ti ti-point-filled me-1"></i>{row.status}
      </span>
    );

    if (isEditing) {
      const opts = ['Draft', 'Sent', 'Accepted', 'Rejected', 'Expired'].map(s => ({ value: s, label: s }));
      return (
        <div style={{ position: 'relative', display: 'inline-block' }}>
          {/* Badge stays in normal flow to keep width exact, but invisible */}
          <div style={{ visibility: 'hidden' }}>{badge}</div>
          
          {/* CustomSelect absolute positioned on top, spilling out without pushing other columns */}
          <div style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: 0, zIndex: 1050, width: '130px' }}>
            <CustomSelect 
              options={opts}
              value={{ value: row.status, label: row.status }}
              onChange={(opt) => {
                setIsEditing(false);
                if (opt && opt.value !== row.status) {
                  onStatusChange(row.id, opt.value);
                }
              }}
              onMenuClose={() => setIsEditing(false)}
            />
          </div>
        </div>
      );
    }

    return badge;
  };

  const openQuotePreview = (row) => {
    const quoteId = row.quoteNo;
    
    const productName = row.product_name || 'Service Item';
    const unitPrice = parseFloat(row.unit_price) || 0;
    const qty = parseFloat(row.quantity) || 1;
    const discount = parseFloat(row.discount) || 0;
    const taxPercent = parseFloat(row.tax_percentage) || 18;
    
    const baseAmount = unitPrice * qty;
    const taxableAmount = baseAmount - discount;
    const taxAmount = (taxableAmount * taxPercent) / 100;
    const totalDue = taxableAmount + taxAmount;
    
    // For visual parity with invoice, assume half CGST and SGST
    const cgstAmt = taxAmount / 2;
    const sgstAmt = taxAmount / 2;
    const fc = (v) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(v);

    const lineItemsHtml = `<tr><td style="text-align:center;padding:8px 10px;border-bottom:1px solid #f0f0f0">1</td><td style="padding:8px 10px;border-bottom:1px solid #f0f0f0">${productName}</td><td style="text-align:center;padding:8px 10px;border-bottom:1px solid #f0f0f0">-</td><td style="text-align:center;padding:8px 10px;border-bottom:1px solid #f0f0f0">${qty}</td><td style="text-align:right;padding:8px 10px;border-bottom:1px solid #f0f0f0">${fc(unitPrice)}</td><td style="text-align:right;padding:8px 10px;border-bottom:1px solid #f0f0f0">${fc(baseAmount)}</td><td style="text-align:right;padding:8px 10px;border-bottom:1px solid #f0f0f0">${fc(discount)}</td><td style="text-align:right;padding:8px 10px;border-bottom:1px solid #f0f0f0">${fc(taxableAmount)}</td></tr>`;

    const taxRows = taxAmount > 0 
      ? `<tr><td style="color:#6c757d;padding:5px 8px">Add: CGST @ ${taxPercent/2}%</td><td style="text-align:right;font-weight:600;color:#1a1a1a;padding:5px 8px">${fc(cgstAmt)}</td></tr><tr style="border-top:1px solid #e9ecef"><td style="color:#6c757d;padding:5px 8px">Add: SGST @ ${taxPercent/2}%</td><td style="text-align:right;font-weight:600;color:#1a1a1a;padding:5px 8px">${fc(sgstAmt)}</td></tr>`
      : '';

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Quotation - ${quoteId}</title>
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
            <div><h5 style="font-size:15px;font-weight:700;color:#1a1a1a;margin:0">Quotation ${quoteId}</h5><p style="font-size:12px;color:#6c757d;margin:0">Harikrushn DigiVerse LLP</p></div>
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
                <div style="background:#264653;color:#fff;padding:6px 14px;font-size:11px;font-weight:600;letter-spacing:1px;border-radius:3px;white-space:nowrap">QUOTATION</div>
              </div>
              <hr style="border:none;border-top:2px solid #e0e0e0;margin:16px 0 24px"/>
              <div style="display:flex;gap:40px;margin-bottom:28px">
                <div style="flex:1">
                  <div style="font-size:10px;font-weight:700;color:#6c757d;text-transform:uppercase;letter-spacing:1px;margin-bottom:6px">Quoted To</div>
                  <h5 style="font-size:15px;font-weight:700;margin:0 0 4px">${row.clientName||'Client Name'}</h5>
                  <p style="font-size:12px;color:#555;line-height:1.6;margin:0">${row.clientObj?.client_address||'Client Address'}<br/>Ph: ${row.clientObj?.client_phone||'N/A'}<br/>GSTIN: ${row.clientObj?.client_gstin||'N/A'}</p>
                </div>
                <table style="font-size:12px;border-collapse:collapse">
                  <tr><td style="color:#6c757d;padding:3px 0 3px 20px">Quote No.</td><td style="font-weight:700;text-align:right;padding:3px 0 3px 20px">${quoteId}</td></tr>
                  <tr><td style="color:#6c757d;padding:3px 0 3px 20px">Date</td><td style="font-weight:700;text-align:right;padding:3px 0 3px 20px">${row.date || 'N/A'}</td></tr>
                  <tr><td style="color:#6c757d;padding:3px 0 3px 20px">Valid Till</td><td style="font-weight:700;text-align:right;padding:3px 0 3px 20px">${row.validity_days ? new Date(new Date(row.date_sent).getTime() + row.validity_days * 86400000).toLocaleDateString() : 'N/A'}</td></tr>
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
                    <td style="padding:10px;text-align:center">1</td>
                    <td colspan="3"></td>
                    <td style="padding:10px;text-align:right">${fc(baseAmount)}</td>
                  </tr>
                </tbody>
              </table>
              <div style="display:flex;justify-content:flex-end;margin-bottom:20px">
                <table style="width:320px;font-size:12px;border-collapse:collapse">
                  <tr><td style="color:#6c757d;padding:5px 8px">Total Before Tax</td><td style="text-align:right;font-weight:600;color:#1a1a1a;padding:5px 8px">${fc(taxableAmount)}</td></tr>
                  ${taxRows}
                  <tr style="border-top:1px solid #e9ecef"><td style="color:#6c757d;padding:5px 8px;font-weight:700;color:#1a1a1a">Total Tax Amount</td><td style="text-align:right;font-weight:600;color:#1a1a1a;padding:5px 8px">${fc(taxAmount)}</td></tr>
                  <tr><td style="background:#718d52;color:#fff;font-weight:700;padding:9px 10px">Total Estimated Amount</td><td style="background:#718d52;color:#fff;font-weight:700;text-align:right;padding:9px 10px">${fc(totalDue)}</td></tr>
                </table>
              </div>
              <div style="background:#f8f9fa;border-left:3px solid #718d52;padding:10px 14px;border-radius:0 4px 4px 0;font-size:13px;margin-bottom:28px">
                <span style="color:#6c757d;margin-right:6px">Amount In Words:</span>
                <span style="font-weight:700;color:#1a1a1a">${totalDue} Rupees Only</span>
              </div>
              <div>
                <div style="font-size:10px;font-weight:700;color:#6c757d;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px">Terms &amp; Conditions</div>
                <p style="font-size:11px;color:#555;line-height:1.8;white-space:pre-line;margin:0">1. This is a quotation, not an invoice.\n2. Prices are valid till the validity date mentioned above.\n3. All disputes are subject to Gujarat Jurisdiction.</p>
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
              filename: 'Quotation-${quoteId}.pdf',
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

  const columns = [
    {
      name: 'Quote No',
      selector: row => row.quoteNo,
      cell: row => <Link to="#" onClick={(e) => { e.preventDefault(); openQuotePreview(row); }} className="tb-data text-primary fw-medium">{row.quoteNo}</Link>,
      sortable: true,
    },
    {
      name: 'Client',
      cell: row => (
        <div className="d-flex align-items-center file-name-icon">
          <Link to="/client-details" state={{ client: row.clientObj }} className={`avatar avatar-md border-0 me-2 d-flex align-items-center justify-content-center text-decoration-none ${(row.avatar && (row.avatar.startsWith('/') || row.avatar.startsWith('http'))) ? '' : 'bg-primary'}`} style={{ borderRadius: '50%' }}>
            {(row.avatar && (row.avatar.startsWith('/') || row.avatar.startsWith('http'))) ? (
              <img src={row.avatar} className="img-fluid rounded-circle" alt="img" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <span className="text-white fw-bold" style={{ fontSize: '14px' }}>{row.avatar}</span>
            )}
          </Link>
          <div>
            <h6 className="fw-medium"><Link to="/client-details" state={{ client: row.clientObj }}>{row.clientName || 'Unknown Client'}</Link></h6>
            <span className="fs-12 fw-normal text-muted">{row.clientEmail || ''}</span>
          </div>
        </div>
      ),
      sortable: true,
    },
    { name: 'Date', selector: row => row.date, sortable: true },
    { name: 'Amount', selector: row => row.amount, sortable: true },
    {
      name: 'Status',
      cell: row => <InlineStatus row={row} onStatusChange={handleStatusChange} />,
      sortable: true,
    },
    {
      name: 'Action',
      cell: row => (
        <div className="action-icon d-inline-flex">
          <Link to="#" onClick={(e) => { e.preventDefault(); openQuotePreview(row); }} className="me-2 text-muted" title="Download PDF"><i className="ti ti-download"></i></Link>
          <Link to="#" onClick={(e) => { e.preventDefault(); handleEditClick(row); }} className="me-2 text-muted"><i className="ti ti-edit"></i></Link>
          <Link to="#" onClick={(e) => { e.preventDefault(); setConfirmDeleteModal({ isOpen: true, id: row.id }); }} className="text-muted"><i className="ti ti-trash"></i></Link>
        </div>
      ),
    }
  ];

  useEffect(() => {
    fetchQuotes();
  }, []);

  const fetchQuotes = async () => {
    try {
      const [quotesRes, clientsRes] = await Promise.all([
        api.get('/quotes'),
        api.get('/clients')
      ]);
      
      const dataArr = Array.isArray(quotesRes) ? quotesRes : (quotesRes.data || []);
      const clientsData = Array.isArray(clientsRes) ? clientsRes : (clientsRes.data || []);
      
      const clientsMap = {};
      const cOptions = [{ value: '', label: 'All Clients' }];
      clientsData.forEach(c => {
        const cName = c.client_name || c.company_name || `${c.first_name || ''} ${c.last_name || ''}`.trim() || 'Unknown Client';
        clientsMap[c._id] = { name: cName, obj: c };
        cOptions.push({ value: c._id, label: cName });
      });
      setClientsOptionsList(cOptions);
      
      const getInitials = (name) => {
        if (!name) return 'UN';
        const parts = name.split(' ').filter(p => p.length > 0);
        if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
        if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
        return 'UN';
      };

      let tot = 0, acc = 0, pen = 0, rej = 0;
      const formatted = dataArr.map(q => {
        tot++;
        if (q.status === 'Accepted') acc++;
        else if (q.status === 'Rejected') rej++;
        else pen++;
        
        const clientName = clientsMap[q.client_id]?.name || 'Unknown Client';
        const clientObj = clientsMap[q.client_id]?.obj || { _id: q.client_id, client_name: clientName };
        const avatar = clientObj && clientObj.client_profile_photo ? clientObj.client_profile_photo : getInitials(clientName);

        return {
          ...q,
          id: q._id,
          quoteNo: q.quote_number || `QT-${q._id.substring(0,4)}`,
          clientName: clientName,
          clientObj: clientObj,
          avatar: avatar,
          clientEmail: '',
          date: q.date_sent ? new Date(q.date_sent).toLocaleDateString() : 'N/A',
          amount: `₹${q.total_amount || 0}`,
          status: q.status || 'Draft'
        };
      });
      setQuotes(formatted);
      setStats({ total: tot, accepted: acc, pending: pen, rejected: rej });
    } catch (error) {
      console.error("Error fetching quotes", error);
    }
  };

  const filteredQuotes = quotes.filter(q => {
    let match = true;
    if (statusFilter && q.status !== statusFilter) match = false;
    if (clientFilter && q.client_id !== clientFilter) match = false;
    if (dateRange[0] && dateRange[1]) {
      const qDate = new Date(q.date_sent);
      if (qDate < dateRange[0] || qDate > dateRange[1]) match = false;
    }
    return match;
  });

  const isFilterActive = statusFilter !== '' || clientFilter !== '' || (dateRange[0] && dateRange[1]);
  const clearFilters = () => {
    setStatusFilter('');
    setClientFilter('');
    setDateRange([null, null]);
    setSearchQuery_quotes('');
  };

  const handleEditClick = (quote) => {
    setEditQuote(quote);
    setIsQuoteModalOpen(true);
  };

  const handleSaveQuote = async (formData) => {
    try {
      if (formData._id) {
        await api.put(`/quotes/${formData._id}`, formData);
        toast.success('Quote updated successfully');
      } else {
        await api.post('/quotes', formData);
        toast.success('Quote created successfully');
      }
      setIsQuoteModalOpen(false);
      setEditQuote(null);
      fetchQuotes();
    } catch (error) {
      console.error("Error saving quote:", error);
      toast.error('Failed to save quote');
    }
  };

  const handleDelete = async () => {
    if (!confirmDeleteModal.id) return;
    try {
      await api.delete(`/quotes/${confirmDeleteModal.id}`);
      toast.success('Quote deleted successfully');
      setConfirmDeleteModal({ isOpen: false, id: null });
      fetchQuotes();
    } catch (error) {
      console.error("Error deleting quote:", error);
      toast.error('Failed to delete quote');
    }
  };

  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          {/* Breadcrumb */}
          <PageHeader 
            title="Quotation Engine"
            breadcrumbs={[
              { label: 'Dashboard' },
              { label: 'Finance & Billing' },
              { label: 'Quotes', active: true }
            ]}
          >
          
            <div className="mb-2">
              <a href="#" onClick={(e) => { e.preventDefault(); setEditQuote(null); setIsQuoteModalOpen(true); }}
                className="btn btn-primary d-flex align-items-center"><i
                  className="ti ti-circle-plus me-2"></i>Add Quote</a>
            </div>
           
          </PageHeader>
          {/* /Breadcrumb */}

          {/* Quotes Counts */}
          <div className="row">
            <StatCard title="Total Quotes" value={stats.total} icon="ti-file-invoice" iconColor="primary" />
            <StatCard title="Accepted Quotes" value={stats.accepted} icon="ti-check" iconColor="pink" />
            <StatCard title="Pending Quotes" value={stats.pending} icon="ti-clock" iconColor="purple" />
            <StatCard title="Rejected Quotes" value={stats.rejected} icon="ti-x" iconColor="skyblue" />
          </div>
          {/* /Quotes Counts */}

          {/* Quotes list */}
          <div className="card">
            <div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
              <h5>Quotes List</h5>
              <FilterBar 
                filters={[
                  { type: 'date', value: dateRange, onChange: setDateRange },
                  { type: 'select', value: clientFilter, onChange: setClientFilter, options: clientsOptionsList },
                  { type: 'select', value: statusFilter, onChange: setStatusFilter, options: statusOptions }
                ]}
                onClear={clearFilters}
                hasActiveFilters={isFilterActive}
              />
            </div>
            
            <div className="card-body p-0">
              <CustomDataTable 
                columns={columns}
                data={filteredQuotes}
                searchQuery={searchQuery_quotes}
                onSearch={(e) => setSearchQuery_quotes(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <QuoteModal 
        isOpen={isQuoteModalOpen} 
        onClose={() => { setIsQuoteModalOpen(false); setEditQuote(null); }} 
        quote={editQuote}
        onSave={handleSaveQuote} 
      />

      {confirmDeleteModal.isOpen && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-body text-center p-4">
                <i className="ti ti-alert-triangle text-warning mb-3" style={{ fontSize: '3rem' }}></i>
                <h5 className="mb-3">Delete Quote</h5>
                <p className="text-muted mb-4">Are you sure you want to delete this quote? This action cannot be undone.</p>
                <div className="d-flex justify-content-center gap-2">
                  <button type="button" className="btn btn-light" onClick={() => setConfirmDeleteModal({ isOpen: false, id: null })}>Cancel</button>
                  <button type="button" className="btn btn-danger" onClick={handleDelete}>Delete</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Quotes;
