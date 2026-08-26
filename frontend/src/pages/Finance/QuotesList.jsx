import React, { useState, useEffect } from 'react';
import PageHeader from '@/components/common/PageHeader/PageHeader';
import Button from '@/components/common/Button/Button';
import { FiPlus, FiSearch, FiFilter, FiEdit2, FiTrash2, FiFileText, FiDollarSign, FiClock, FiAlertCircle, FiDownload, FiCheckCircle } from 'react-icons/fi';
import { quoteService } from '@/api/services/quoteService';
import { clientService } from '@/api/services/clientService';
import QuoteModal from './QuoteModal';
import toast from 'react-hot-toast';
import { formatCurrency } from '@/utils/formatters';
import SearchBar from "@/components/common/SearchBar/SearchBar";
import { confirmDialog } from "@/components/common/ConfirmDialog/confirmDialog";
import { generateQuotePDF } from '@/utils/quotePdfGenerator';
import { useNavigate } from 'react-router-dom';
import InvoiceModal from './InvoiceModal';

const QuotesList = () => {
  const [quotes, setQuotes] = useState([]);
  const [filteredQuotes, setFilteredQuotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [clientsMap, setClientsMap] = useState({});
  const navigate = useNavigate();
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editQuote, setEditQuote] = useState(null);

  // Invoice Conversion Modal State
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  const [invoiceConversionData, setInvoiceConversionData] = useState(null);

  const fetchQuotesAndClients = async () => {
    setIsLoading(true);
    try {
      const [quoteData, clientsData] = await Promise.all([
        quoteService.getAllQuotes(),
        clientService.list()
      ]);
      
      const quoteArray = Array.isArray(quoteData) ? quoteData : (quoteData.data || []);
      setQuotes(quoteArray);
      setFilteredQuotes(quoteArray);
      
      const cMap = {};
      const cArray = Array.isArray(clientsData) ? clientsData : (clientsData.data || []);
      cArray.forEach(c => {
        cMap[c._id || c.id] = c.name || c.company_name;
      });
      setClientsMap(cMap);
      
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to load quotes data');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchQuotesAndClients();
  }, []);

  useEffect(() => {
    let result = quotes;
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(q => 
        (q.quote_number && q.quote_number.toLowerCase().includes(query)) ||
        (q.product_name && q.product_name.toLowerCase().includes(query)) ||
        (clientsMap[q.client_id] && clientsMap[q.client_id].toLowerCase().includes(query))
      );
    }
    
    if (statusFilter !== 'All') {
      result = result.filter(q => q.status.toLowerCase() === statusFilter.toLowerCase());
    }
    
    setFilteredQuotes(result);
  }, [searchQuery, statusFilter, quotes, clientsMap]);

  const handleDelete = async (id) => {
    const confirmed = await confirmDialog({
      title: "Delete Quote",
      text: "Are you sure you want to delete this quotation? This action cannot be undone.",
      confirmText: "Delete"
    });
    
    if (confirmed) {
      try {
        await quoteService.deleteQuote(id);
        toast.success('Quote deleted successfully');
        fetchQuotesAndClients();
      } catch (error) {
        toast.error('Failed to delete quote');
      }
    }
  };

  const handleEdit = (quote) => {
    setEditQuote(quote);
    setIsModalOpen(true);
  };
  
  const handleCreate = () => {
    setEditQuote(null);
    setIsModalOpen(true);
  };

  const handleConvertToInvoice = (quote) => {
    // Pre-fill invoice data from quote
    setInvoiceConversionData({
      client_id: quote.client_id,
      source_type: 'Project',
      source_id: clientsMap[quote.client_id] || quote.client_id,
      total_amount: quote.sub_total || 0,
      gst_amount: quote.tax_amount || 0,
      notes: quote.notes || `Generated from Quote: ${quote.quote_number}`
    });
    setIsInvoiceModalOpen(true);
  };

  const onModalClose = (wasSaved) => {
    setIsModalOpen(false);
    if (wasSaved) {
      fetchQuotesAndClients();
    }
  };

  const onInvoiceModalClose = () => {
    setIsInvoiceModalOpen(false);
    setInvoiceConversionData(null);
  };

  // Metrics calculation
  const totalQuotes = quotes.length;
  const totalValue = quotes.reduce((acc, curr) => acc + (curr.total_amount || 0), 0);
  const acceptedQuotes = quotes.filter(q => q.status.toLowerCase() === 'accepted').length;
  const pendingQuotes = quotes.filter(q => q.status.toLowerCase() === 'sent' || q.status.toLowerCase() === 'draft').length;

  return (
    <div className="quotes-list-container">
      <PageHeader 
        title="Quotation Engine" 
        description="Generate and manage client proposals & quotes"
        actions={
          <Button variant="gradient" onClick={handleCreate}>
            <FiPlus className="me-2" /> New Quotation
          </Button>
        }
      />

      {/* Metrics Cards */}
      <div className="row g-3 mb-4">
        <div className="col-12 col-md-6 col-xxl-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex align-items-center mb-3">
                <div className="flex-shrink-0 bg-primary-soft text-primary rounded p-3 me-3">
                  <FiFileText size={24} />
                </div>
                <div>
                  <h6 className="card-title mb-0" style={{ color: 'var(--color-text-muted)' }}>Total Quotes</h6>
                  <h3 className="mb-0 fw-bold">{totalQuotes}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6 col-xxl-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex align-items-center mb-3">
                <div className="flex-shrink-0 bg-success-soft text-success rounded p-3 me-3">
                  <FiDollarSign size={24} />
                </div>
                <div>
                  <h6 className="card-title mb-0" style={{ color: 'var(--color-text-muted)' }}>Total Value Proposed</h6>
                  <h3 className="mb-0 fw-bold">{formatCurrency(totalValue)}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6 col-xxl-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex align-items-center mb-3">
                <div className="flex-shrink-0 bg-info-soft text-info rounded p-3 me-3">
                  <FiCheckCircle size={24} />
                </div>
                <div>
                  <h6 className="card-title mb-0" style={{ color: 'var(--color-text-muted)' }}>Accepted Quotes</h6>
                  <h3 className="mb-0 fw-bold">{acceptedQuotes}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6 col-xxl-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex align-items-center mb-3">
                <div className="flex-shrink-0 bg-warning-soft text-warning rounded p-3 me-3">
                  <FiClock size={24} />
                </div>
                <div>
                  <h6 className="card-title mb-0" style={{ color: 'var(--color-text-muted)' }}>Pending Approvals</h6>
                  <h3 className="mb-0 fw-bold">{pendingQuotes}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card border-0 shadow-sm">
        <div className="card-header bg-transparent border-bottom py-3">
          <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
            <div className="flex-grow-1" style={{ minWidth: '250px', maxWidth: '500px' }}>
              <SearchBar 
                onSearch={setSearchQuery} 
                placeholder="Search quotes by ID, client or product..." 
              />
            </div>
            <div className="flex-shrink-0">
              <select 
                className="form-select form-select-md"
                style={{ minWidth: '160px' }}
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All Status</option>
                <option value="Draft">Draft</option>
                <option value="Sent">Sent</option>
                <option value="Accepted">Accepted</option>
                <option value="Expired">Expired</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          </div>
        </div>

        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead>
                <tr>
                  <th className="ps-4">Quote ID</th>
                  <th>Client</th>
                  <th>Date Sent</th>
                  <th>Valid Until</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th className="text-end pe-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan="7" className="text-center py-5">
                      <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </td>
                  </tr>
                ) : filteredQuotes.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center py-5 text-muted">
                      No quotes found matching your criteria.
                    </td>
                  </tr>
                ) : (
                  filteredQuotes.map((quote) => (
                    <tr key={quote.id || quote._id}>
                      <td className="ps-4 fw-medium text-primary">
                        {quote.quote_number}
                      </td>
                      <td>
                        <div className="d-flex flex-column">
                          <span className="fw-medium" style={{ color: 'var(--color-text)' }}>{clientsMap[quote.client_id] || 'Unknown Client'}</span>
                          <span className="small" style={{ color: 'var(--color-text-muted)' }}>{quote.product_name}</span>
                        </div>
                      </td>
                      <td style={{ color: 'var(--color-text)' }}>{quote.date_sent ? new Date(quote.date_sent).toLocaleDateString() : 'N/A'}</td>
                      <td style={{ color: 'var(--color-text)' }}>{quote.valid_until ? new Date(quote.valid_until).toLocaleDateString() : 'N/A'}</td>
                      <td className="fw-semibold" style={{ color: 'var(--color-text)' }}>{formatCurrency(quote.total_amount)}</td>
                      <td>
                        <span className={`badge ${
                          quote.status.toLowerCase() === 'accepted' ? 'bg-success-soft text-success border border-success' : 
                          quote.status.toLowerCase() === 'sent' ? 'bg-info-soft text-info border border-info' : 
                          quote.status.toLowerCase() === 'expired' ? 'bg-warning-soft text-warning border border-warning' : 
                          quote.status.toLowerCase() === 'rejected' ? 'bg-danger-soft text-danger border border-danger' : 
                          'bg-secondary-soft text-secondary border border-secondary'
                        }`}>
                          {quote.status}
                        </span>
                      </td>
                      <td className="text-end pe-4">
                        <div className="d-flex gap-2 justify-content-end align-items-center">
                          {quote.status.toLowerCase() === 'accepted' && (
                            <button 
                              className="btn btn-sm bg-surface-alt border text-warning me-1"
                              title="Convert to Invoice"
                              onClick={() => handleConvertToInvoice(quote)}
                            >
                              <FiCheckCircle /> Invoice
                            </button>
                          )}
                          <button 
                            className="btn btn-sm bg-surface-alt border text-success"
                            title="Download PDF"
                            onClick={() => generateQuotePDF(quote, clientsMap)}
                          >
                            <FiDownload />
                          </button>
                          <button 
                            className="btn btn-sm bg-surface-alt border text-primary"
                            title="Edit Quote"
                            onClick={() => handleEdit(quote)}
                          >
                            <FiEdit2 />
                          </button>
                          <button 
                            className="btn btn-sm bg-surface-alt border text-danger"
                            title="Delete Quote"
                            onClick={() => handleDelete(quote.id || quote._id)}
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
      </div>

      {isModalOpen && (
        <QuoteModal 
          isOpen={isModalOpen}
          onClose={() => onModalClose(false)}
          onSave={() => onModalClose(true)}
          quote={editQuote}
        />
      )}

      {isInvoiceModalOpen && (
        <InvoiceModal 
          isOpen={isInvoiceModalOpen}
          onClose={onInvoiceModalClose}
          onSave={() => {
            onInvoiceModalClose();
            // Optionally redirect to invoices page here
            toast.success("Quote successfully converted to Invoice!");
          }}
          invoice={invoiceConversionData}
        />
      )}
    </div>
  );
};

export default QuotesList;
