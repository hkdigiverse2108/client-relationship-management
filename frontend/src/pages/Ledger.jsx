import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/common/PageHeader';
import ClientStatCard from '../components/common/ClientStatCard';
import CustomDataTable from '../components/common/CustomDataTable';
import CustomDatePicker from '../components/common/CustomDatePicker';
import CustomSelect from '../components/common/CustomSelect';
import api from '../api/axiosClient';
import toast from 'react-hot-toast';
import { pdf } from '@react-pdf/renderer';
import LedgerPDF from '../components/finance/LedgerPDF';

const formatCurrency = (amount) => {
  if (amount === undefined || amount === null || amount === '') return '-';
  return 'Rs. ' + Number(amount).toLocaleString('en-IN');
};

const formatDate = (dateString) => {
  if (!dateString) return '-';
  const d = new Date(dateString);
  if (isNaN(d.getTime())) return dateString;
  return d.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
};

const Ledger = () => {
  const [searchQuery_ledger, setSearchQuery_ledger] = useState('');
  const [dateRange, setDateRange] = useState([null, null]);
  const [typeFilter, setTypeFilter] = useState('');
  
  // Tab state
  const [activeTab, setActiveTab] = useState('chronological');
  const [expandedClients, setExpandedClients] = useState({});

  const [ledgerData, setLedgerData] = useState([]);
  const [metrics, setMetrics] = useState({
    net_balance: 0,
    total_inflow: 0,
    total_outflow: 0,
    total_entries: 0
  });

  useEffect(() => {
    fetchLedgerData();
    fetchMetrics();
  }, []);

  const fetchLedgerData = async () => {
    try {
      const res = await api.get('/ledger');
      setLedgerData(Array.isArray(res) ? res : res.data || []);
    } catch (err) {
      toast.error('Failed to load ledger data');
    }
  };

  const fetchMetrics = async () => {
    try {
      const res = await api.get('/ledger/metrics');
      if (res) {
        setMetrics(res.data || res);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const typeOptions = [
    { value: '', label: 'All Types' },
    { value: 'Credit', label: 'Credit (Inflow)' },
    { value: 'Debit', label: 'Debit (Outflow)' }
  ];

  const columns = [
    { 
      name: 'Entry ID', 
      selector: row => row.entry_id, 
      cell: row => <span className="text-primary fw-medium">{row.entry_id}</span>,
      sortable: true 
    },
    { name: 'Date', selector: row => row.date, cell: row => formatDate(row.date), sortable: true },
    { name: 'Description', selector: row => row.description, sortable: true },
    { name: 'Client', selector: row => row.client_name || 'Internal / Unassigned', sortable: true },
    { 
      name: 'Type', 
      selector: row => row.type, 
      cell: row => {
        let badgeClass = (row.type || '').toLowerCase() === 'credit' ? 'badge-success' : 'badge-danger';
        return (
          <span className={`badge ${badgeClass} d-inline-flex align-items-center badge-xs`}>
            {row.type}
          </span>
        );
      },
      sortable: true 
    },
    { 
      name: 'Amount', 
      selector: row => row.amount, 
      cell: row => {
        let textClass = (row.type || '').toLowerCase() === 'credit' ? 'text-success' : 'text-danger';
        let prefix = (row.type || '').toLowerCase() === 'credit' ? '+' : '-';
        return (
          <span className={`fw-bold ${textClass}`}>
            {prefix} {formatCurrency(row.amount)}
          </span>
        );
      },
      sortable: true 
    },
    { 
      name: 'Status', 
      selector: row => row.status,
      cell: row => <span className="badge badge-secondary badge-xs">{row.status}</span>,
      sortable: true 
    }
  ];

  // Filtering
  const filteredLedger = ledgerData.filter(entry => {
    if (typeFilter && (entry.type || '').toLowerCase() !== typeFilter.toLowerCase()) return false;
    
    if (dateRange[0]) {
      const entryDate = new Date(entry.date);
      if (entryDate < dateRange[0]) return false;
    }
    if (dateRange[1]) {
      const entryDate = new Date(entry.date);
      if (entryDate > dateRange[1]) return false;
    }
    
    return true;
  });

  // Grouped logic
  const toggleClientExpand = (clientId) => {
    setExpandedClients(prev => ({ ...prev, [clientId]: !prev[clientId] }));
  };

  const openLedgerPreview = async () => {
    try {
      const blob = await pdf(<LedgerPDF data={filteredLedger} metrics={metrics} />).toBlob();
      const url = URL.createObjectURL(blob);
      
      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>General Ledger Preview</title>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.min.js"></script>
          <style>
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f5f6fa; min-height: 100vh; }
            .action-bar { position: sticky; top: 0; z-index: 999; background: #fff; border-bottom: 1px solid #e9ecef; padding: 12px 24px; display: flex; align-items: center; justify-content: space-between; box-shadow: 0 2px 8px rgba(0,0,0,0.06); }
            .btn-download { background: #718d52; color: #fff; border: none; padding: 8px 18px; border-radius: 6px; font-size: 13px; font-weight: 600; cursor: pointer; text-decoration: none; transition: background 0.2s; }
            .btn-download:hover { background: #5e7a44; }
            .invoice-page { padding: 24px; min-height: 100vh; display: flex; flex-direction: column; align-items: center; gap: 24px; }
            .pdf-page-canvas { background: #fff; border-radius: 8px; box-shadow: 0 4px 24px rgba(0,0,0,0.10); max-width: 100%; display: block; }
          </style>
        </head>
        <body>
          <div class="action-bar">
            <div style="display:flex;align-items:center;gap:12px">
              <span style="color:#718d52;font-weight:900;font-size:1.8rem;letter-spacing:-2px;line-height:1">HK</span>
              <div><h5 style="font-size:15px;font-weight:700;color:#1a1a1a;margin:0">General Ledger</h5><p style="font-size:12px;color:#6c757d;margin:0">Harikrushn DigiVerse LLP</p></div>
            </div>
            <a href="${url}" download="General_Ledger_${new Date().getTime()}.pdf" class="btn-download">⬇ Download PDF</a>
          </div>
          <div class="invoice-page" id="pdf-container">
            <!-- Canvases will be injected here -->
          </div>
          
          <script>
            pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js';
            
            const loadingTask = pdfjsLib.getDocument('${url}');
            loadingTask.promise.then(function(pdf) {
              const container = document.getElementById('pdf-container');
              
              for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
                pdf.getPage(pageNum).then(function(page) {
                  const scale = 1.5;
                  const viewport = page.getViewport({ scale: scale });
                  
                  const canvas = document.createElement('canvas');
                  canvas.className = 'pdf-page-canvas';
                  const context = canvas.getContext('2d');
                  canvas.height = viewport.height;
                  canvas.width = viewport.width;
                  
                  // Maintain aspect ratio in CSS
                  canvas.style.width = '800px';
                  canvas.style.maxWidth = '100%';
                  canvas.style.height = 'auto';
                  
                  // Ensure proper ordering of pages since promises resolve asynchronously
                  canvas.dataset.page = pageNum;
                  
                  // Add to container but keep sorted
                  container.appendChild(canvas);
                  
                  // Sort canvases to make sure they are in order
                  const canvases = Array.from(container.querySelectorAll('canvas'));
                  canvases.sort((a, b) => parseInt(a.dataset.page) - parseInt(b.dataset.page));
                  canvases.forEach(c => container.appendChild(c)); // Re-append in order
                  
                  const renderContext = {
                    canvasContext: context,
                    viewport: viewport
                  };
                  page.render(renderContext);
                });
              }
            }).catch(function(error) {
              console.error("Error loading PDF: ", error);
              document.getElementById('pdf-container').innerHTML = '<div style="color:red; padding: 20px;">Failed to load PDF preview.</div>';
            });
          </script>
        </body>
        </html>
      `;

      const previewWindow = window.open('', '_blank');
      previewWindow.document.write(htmlContent);
      previewWindow.document.close();
      
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error('Failed to generate PDF');
    }
  };

  const exportToExcel = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Date,Entry ID,Client,Description,Reference,Type,Amount\n";

    filteredLedger.forEach(row => {
      const rowArr = [
        formatDate(row.date),
        row.entry_id,
        `"${row.client_name || 'Internal / Unassigned'}"`,
        `"${(row.description || '-').replace(/"/g, '""')}"`,
        `"${row.reference_id || '-'}"`,
        row.type,
        row.amount
      ];
      csvContent += rowArr.join(",") + "\n";
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `General_Ledger_${new Date().getTime()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const clientGroups = filteredLedger.reduce((acc, entry) => {
    const clientId = entry.client_id || 'unassigned';
    if (!acc[clientId]) {
      acc[clientId] = {
        id: clientId,
        name: entry.client_name || 'Internal / Unassigned',
        entries: [],
        total_credit: 0,
        total_debit: 0
      };
    }
    acc[clientId].entries.push(entry);
    const amt = Number(entry.amount) || 0;
    if ((entry.type || '').toLowerCase() === 'credit') {
      acc[clientId].total_credit += amt;
    } else {
      acc[clientId].total_debit += amt;
    }
    return acc;
  }, {});

  const clearFilters = () => {
    setDateRange([null, null]);
    setTypeFilter('');
  };

  return (
    <div className="page-wrapper">
      <div className="content">
        <PageHeader 
          title="General Ledger"
          breadcrumbs={[
            { label: 'Dashboard' },
            { label: 'Finance & Billing' },
            { label: 'Ledger', active: true }
          ]}
        >
          <div className="mb-2">
            <div className="dropdown">
              <a href="#" className="dropdown-toggle btn btn-white d-inline-flex align-items-center" data-bs-toggle="dropdown">
                <i className="ti ti-file-export me-1"></i>Export
              </a>
              <ul className="dropdown-menu dropdown-menu-end p-3">
                <li><a className="dropdown-item rounded-1" href="#" onClick={(e) => { e.preventDefault(); openLedgerPreview(); }}><i className="ti ti-file-type-pdf me-1"></i>Export as PDF</a></li>
                <li><a className="dropdown-item rounded-1" href="#" onClick={(e) => { e.preventDefault(); exportToExcel(); }}><i className="ti ti-file-type-xls me-1"></i>Export as Excel</a></li>
              </ul>
            </div>
          </div>
        </PageHeader>

        <div className="row">
          <ClientStatCard 
            title="Net Balance" 
            value={formatCurrency(metrics.net_balance)} 
            icon="ti ti-currency-dollar"
            iconBgClass="bg-primary-transparent"
            iconColorClass="text-primary"
            percentage="" 
            badgeClass="" 
            badgeIcon=""
          />
          <ClientStatCard 
            title="Total Inflow (Credits)" 
            value={formatCurrency(metrics.total_inflow)} 
            icon="ti ti-trending-up"
            iconBgClass="bg-success-transparent"
            iconColorClass="text-success"
            percentage="" 
            badgeClass="" 
            badgeIcon=""
          />
          <ClientStatCard 
            title="Total Outflow (Debits)" 
            value={formatCurrency(metrics.total_outflow)} 
            icon="ti ti-trending-down"
            iconBgClass="bg-danger-transparent"
            iconColorClass="text-danger"
            percentage="" 
            badgeClass="" 
            badgeIcon=""
          />
          <ClientStatCard 
            title="Total Ledger Entries" 
            value={metrics.total_entries} 
            icon="ti ti-list"
            iconBgClass="bg-purple-transparent"
            iconColorClass="text-purple"
            percentage="" 
            badgeClass="" 
            badgeIcon=""
          />
        </div>

        <div className="card">
          <div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
            <div className="d-flex flex-column flex-sm-row align-items-sm-center justify-content-start gap-3">
              <h5 className="mb-0 text-nowrap">Ledger Entries</h5>
              <div className="btn-group border rounded" >
                <button 
                  className={`btn px-3 py-1 text-nowrap rounded ${activeTab === 'chronological' ? 'btn-primary' : 'btn-transparent border-0'}`}
                  onClick={() => setActiveTab('chronological')}
                >
                  Chronological
                </button>
                <button 
                  className={`btn px-3 py-1 text-nowrap rounded ${activeTab === 'grouped' ? 'btn-primary' : 'btn-transparent border-0'}`}
                  onClick={() => setActiveTab('grouped')}
                >
                  Group by Client
                </button>
              </div>
            </div>

            <div className="d-flex my-xl-auto right-content align-items-center flex-wrap row-gap-3">
              <div className="me-3">
                <div className="input-icon position-relative w-100">
                  <span className="input-icon-addon"><i className="ti ti-calendar"></i></span>
                  <CustomDatePicker 
                    selected={dateRange[0]}
                    onChange={(update) => setDateRange(update)}
                    startDate={dateRange[0]}
                    endDate={dateRange[1]}
                    isRange={true}
                    placeholderText="Select Date"
                    className="form-control"
                  />
                </div>
              </div>
              <div className="" style={{ minWidth: '150px' }}>
                <CustomSelect 
                  options={typeOptions}
                  value={typeOptions.find(o => o.value === typeFilter) || typeOptions[0]}
                  onChange={(option) => setTypeFilter(option ? option.value : '')}
                />
              </div>
              {(dateRange[0] || dateRange[1] || typeFilter) && (
                <div>
                  <button onClick={clearFilters} className="btn btn-outline-danger d-inline-flex align-items-center">
                    <i className="ti ti-x me-1"></i>Clear
                  </button>
                </div>
              )}
            </div>
          </div>
          
          <div className="card-body p-0">
            {activeTab === 'chronological' ? (
              <CustomDataTable 
                columns={columns}
                data={filteredLedger}
                searchQuery={searchQuery_ledger}
                onSearch={(e) => setSearchQuery_ledger(e.target.value)}
              />
            ) : (
              <div className="grouped-ledger-view p-3">
                {Object.values(clientGroups).length === 0 ? (
                  <div className="text-center p-5 text-muted">No ledger entries found.</div>
                ) : (
                  <div className="accordion" id="ledgerAccordion">
                    {Object.values(clientGroups).map((group) => (
                      <div className="accordion-item mb-3 border rounded" key={group.id}>
                        <h2 className="accordion-header">
                          <button 
                            className={`accordion-button ${!expandedClients[group.id] ? 'collapsed' : ''} fw-medium bg-light`}
                            type="button"
                            onClick={() => toggleClientExpand(group.id)}
                            style={{ boxShadow: 'none' }}
                          >
                            <div className="d-flex flex-wrap align-items-center gap-2 gap-sm-3 w-100 me-3">
                              <span className="flex-grow-1 fw-bold text-dark" style={{ minWidth: '150px' }}>{group.name}</span>
                              <span className="badge bg-white text-dark border">{group.entries.length} Entries</span>
                              <div className="d-flex gap-3 flex-wrap">
                                <span className="text-success fw-bold"><i className="ti ti-arrow-up-right me-1"></i>Inflow: {formatCurrency(group.total_credit)}</span>
                                {group.total_debit > 0 && <span className="text-danger fw-bold"><i className="ti ti-arrow-down-right me-1"></i>Outflow: {formatCurrency(group.total_debit)}</span>}
                              </div>
                            </div>
                          </button>
                        </h2>
                        {expandedClients[group.id] && (
                          <div className="accordion-collapse show">
                            <div className="accordion-body p-0">
                              <div className="table-responsive">
                                <table className="table table-hover mb-0">
                                  <thead className="thead-light">
                                    <tr>
                                      <th className="ps-4">Entry ID</th>
                                      <th>Date</th>
                                      <th>Description</th>
                                      <th>Reference</th>
                                      <th>Type</th>
                                      <th className="text-end pe-4">Amount</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {group.entries.map(entry => (
                                      <tr key={entry._id}>
                                        <td className="ps-4"><span className="text-primary fw-medium">{entry.entry_id}</span></td>
                                        <td>{formatDate(entry.date)}</td>
                                        <td>{entry.description}</td>
                                        <td>{entry.reference_id || '-'}</td>
                                        <td>
                                          <span className={`badge ${(entry.type || '').toLowerCase() === 'credit' ? 'badge-success' : 'badge-danger'} badge-xs`}>
                                            {entry.type}
                                          </span>
                                        </td>
                                        <td className="text-end pe-4 fw-bold ${(entry.type || '').toLowerCase() === 'credit' ? 'text-success' : 'text-danger'}">
                                          {(entry.type || '').toLowerCase() === 'credit' ? '+' : '-'} {formatCurrency(entry.amount)}
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ledger;
