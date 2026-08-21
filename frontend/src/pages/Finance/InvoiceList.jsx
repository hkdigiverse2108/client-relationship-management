import React, { useState, useEffect } from 'react';
import PageHeader from '@/components/common/PageHeader/PageHeader';
import Button from '@/components/common/Button/Button';
import { FiPlus, FiSearch, FiFilter, FiEdit2, FiTrash2, FiFileText, FiDollarSign, FiClock, FiAlertCircle, FiDownload } from 'react-icons/fi';
import { invoiceService } from '@/api/services/invoiceService';
import { clientService } from '@/api/services/clientService';
import InvoiceModal from './InvoiceModal';
import InvoicePreviewModal from './InvoicePreviewModal';
import toast from 'react-hot-toast';
import { formatCurrency } from '@/utils/formatters';
import SearchBar from "@/components/common/SearchBar/SearchBar";
import { confirmDialog } from "@/components/common/ConfirmDialog/confirmDialog";
import { generateInvoicePDF } from '@/utils/pdfGenerator';

const InvoiceList = () => {
  const [invoices, setInvoices] = useState([]);
  const [filteredInvoices, setFilteredInvoices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [clientsMap, setClientsMap] = useState({});
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewInvoiceData, setPreviewInvoiceData] = useState(null);

  const fetchInvoicesAndClients = async () => {
    setIsLoading(true);
    try {
      const [invoiceData, clientsData] = await Promise.all([
        invoiceService.getAllInvoices(),
        clientService.list()
      ]);
      
      const invoiceArray = Array.isArray(invoiceData) ? invoiceData : (invoiceData.data || []);
      setInvoices(invoiceArray);
      setFilteredInvoices(invoiceArray);
      
      const cMap = {};
      const cArray = Array.isArray(clientsData) ? clientsData : (clientsData.data || []);
      cArray.forEach(c => {
        cMap[c._id || c.id] = c.name || c.company_name;
      });
      setClientsMap(cMap);
      
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to load data');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoicesAndClients();
  }, []);

  useEffect(() => {
    let result = invoices;

    if (searchQuery) {
      result = result.filter(inv => 
        (inv.invoice_number || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (inv.source_type || '').toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (statusFilter !== 'All') {
      result = result.filter(inv => (inv.status || '').toLowerCase() === statusFilter.toLowerCase());
    }

    if (startDate) {
      result = result.filter(inv => new Date(inv.issue_date) >= new Date(startDate));
    }
    
    if (endDate) {
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);
      result = result.filter(inv => new Date(inv.issue_date) <= end);
    }

    setFilteredInvoices(result);
  }, [searchQuery, statusFilter, startDate, endDate, invoices]);

  // Calculations for Metric Cards
  const totalInvoiced = invoices.reduce((acc, curr) => acc + (curr.total_amount || 0), 0);
  const collectedRevenue = invoices.filter(i => i.status === 'paid').reduce((acc, curr) => acc + (curr.total_amount || 0), 0);
  const pendingCollections = invoices.filter(i => i.status === 'sent' || i.status === 'partial').reduce((acc, curr) => acc + (curr.total_amount || 0), 0);
  const overdueOutstanding = invoices.filter(i => {
      const isOverdue = new Date(i.due_date) < new Date() && (i.status === 'sent' || i.status === 'partial' || i.status === 'overdue');
      return isOverdue || i.status === 'overdue';
  }).reduce((acc, curr) => acc + (curr.total_amount || 0), 0);

  const handleDelete = async (id) => {
    const confirmed = await confirmDialog({
      title: "Delete Invoice",
      text: "Are you sure you want to delete this invoice? This action cannot be undone.",
      confirmText: "Delete"
    });
    
    if (confirmed) {
      try {
        await invoiceService.deleteInvoice(id);
        toast.success('Invoice deleted successfully');
        fetchInvoicesAndClients();
      } catch (error) {
        toast.error('Failed to delete invoice');
      }
    }
  };

  const handleEdit = (invoice) => {
    setSelectedInvoice(invoice);
    setIsModalOpen(true);
  };

  const handleCreateNew = () => {
    setSelectedInvoice(null);
    setIsModalOpen(true);
  };

  const handlePreview = (invoice) => {
    setPreviewInvoiceData(invoice);
    setIsPreviewOpen(true);
  };

  const onModalClose = (wasSaved) => {
    setIsModalOpen(false);
    if (wasSaved) {
      fetchInvoicesAndClients();
    }
  };

  const getStatusBadge = (status) => {
    switch ((status || '').toLowerCase()) {
      case 'paid': return <span className="badge bg-success-soft text-success border border-success">Paid</span>;
      case 'sent': return <span className="badge bg-info-soft text-info border border-info">Sent</span>;
      case 'draft': return <span className="badge bg-secondary-soft text-secondary border border-secondary">Draft</span>;
      case 'partial': return <span className="badge bg-warning-soft text-warning border border-warning">Partial</span>;
      case 'overdue': return <span className="badge bg-danger-soft text-danger border border-danger">Overdue</span>;
      default: return <span className="badge bg-light text-dark">{status}</span>;
    }
  };

  return (
    <div className="invoice-list-page">
      <PageHeader 
        title="Invoice Management" 
        description="Create, track, and manage all invoices"
        actions={
          <Button variant="primary" icon={FiPlus} onClick={handleCreateNew}>
            New Invoice
          </Button>
        }
      />

      {/* Metric Cards */}
      <div className="row g-4 mb-4">
        <div className="col-md-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start mb-2">
                <div>
                  <h6 className="text-muted mb-1 text-uppercase" style={{ fontSize: '12px', letterSpacing: '0.5px' }}>Total Invoiced</h6>
                  <h3 className="mb-0 fw-bold">{formatCurrency(totalInvoiced)}</h3>
                </div>
                <div className="p-2 bg-primary-soft text-primary rounded">
                  <FiFileText size={20} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start mb-2">
                <div>
                  <h6 className="text-muted mb-1 text-uppercase" style={{ fontSize: '12px', letterSpacing: '0.5px' }}>Collected Revenue</h6>
                  <h3 className="mb-0 fw-bold text-success">{formatCurrency(collectedRevenue)}</h3>
                </div>
                <div className="p-2 bg-success-soft text-success rounded">
                  <FiDollarSign size={20} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start mb-2">
                <div>
                  <h6 className="text-muted mb-1 text-uppercase" style={{ fontSize: '12px', letterSpacing: '0.5px' }}>Pending Collections</h6>
                  <h3 className="mb-0 fw-bold text-warning">{formatCurrency(pendingCollections)}</h3>
                </div>
                <div className="p-2 bg-warning-soft text-warning rounded">
                  <FiClock size={20} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start mb-2">
                <div>
                  <h6 className="text-muted mb-1 text-uppercase" style={{ fontSize: '12px', letterSpacing: '0.5px' }}>Overdue Outstanding</h6>
                  <h3 className="mb-0 fw-bold text-danger">{formatCurrency(overdueOutstanding)}</h3>
                </div>
                <div className="p-2 bg-danger-soft text-danger rounded">
                  <FiAlertCircle size={20} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters & Table */}
      <div className="card border-0 shadow-sm">
        <div className="card-header bg-white border-bottom py-3">
          <div className="row g-3 align-items-center">
            <div className="col-md-4">
              <SearchBar 
                value={searchQuery} 
                onChange={setSearchQuery} 
                placeholder="Search Invoice ID or Source..." 
              />
            </div>
            <div className="col-md-8 d-flex justify-content-md-end gap-3 flex-wrap">
              <div className="d-flex align-items-center gap-2">
                <input 
                  type="date" 
                  className="form-control form-control-sm" 
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  title="Start Date"
                />
                <span className="text-muted small">to</span>
                <input 
                  type="date" 
                  className="form-control form-control-sm" 
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  title="End Date"
                />
                
                
               
                <select 
                  className="form-select form-select-sm w-auto" 
                  style={{ paddingRight: '2rem' }}
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="All">All Status</option>
                  <option value="Draft">Draft</option>
                  <option value="Sent">Sent</option>
                  <option value="Paid">Paid</option>
                  <option value="Partial">Partial</option>
                  <option value="Overdue">Overdue</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th className="ps-4">Invoice ID</th>
                <th>Source</th>
                <th>Due Date</th>
                <th>Total</th>
                <th>Status</th>
                <th className="text-end pe-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan="6" className="text-center py-5 text-muted">
                    <div className="spinner-border spinner-border-sm me-2" role="status"></div>
                    Loading invoices...
                  </td>
                </tr>
              ) : filteredInvoices.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-5 text-muted">
                    No invoices found.
                  </td>
                </tr>
              ) : (
                filteredInvoices.map((inv) => (
                  <tr key={inv.id || inv._id}>
                    <td className="ps-4 fw-medium">
                      <button 
                        className="btn btn-link p-0 text-primary fw-bold text-decoration-none" 
                        onClick={() => handlePreview(inv)}
                      >
                        {inv.invoice_number}
                      </button>
                      {inv.is_recurring && (
                        <span className="ms-2 badge bg-primary-soft text-primary border border-primary p-1" title={`Recurring: ${inv.recurring_frequency}`}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>
                        </span>
                      )}
                    </td>
                    <td>
                      <div className="d-flex flex-column">
                        <span className="fw-medium">{inv.source_type || 'Unknown'}</span>
                        <span className="text-muted small">{inv.source_id || clientsMap[inv.client_id] || ''}</span>
                      </div>
                    </td>
                    <td>{new Date(inv.due_date).toLocaleDateString()}</td>
                    <td className="fw-medium">{formatCurrency(inv.total_amount)}</td>
                    <td>{getStatusBadge(inv.status)}</td>
                    <td className="text-end pe-4">
                      <div className="d-flex gap-2 justify-content-end">
                        <button 
                          className="btn btn-sm btn-light text-success"
                          title="Download PDF"
                          onClick={() => generateInvoicePDF(inv, clientsMap)}
                        >
                          <FiDownload />
                        </button>
                        <button 
                          className="btn btn-sm btn-light text-primary"
                          title="Edit Invoice"
                          onClick={() => handleEdit(inv)}
                        >
                          <FiEdit2 />
                        </button>
                        <button 
                          className="btn btn-sm btn-light text-danger"
                          title="Delete Invoice"
                          onClick={() => handleDelete(inv.id || inv._id)}
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <InvoiceModal 
          isOpen={isModalOpen} 
          onClose={() => onModalClose(false)} 
          invoice={selectedInvoice}
          onSave={() => onModalClose(true)}
        />
      )}

      <InvoicePreviewModal 
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        invoice={previewInvoiceData}
      />
    </div>
  );
};

export default InvoiceList;
