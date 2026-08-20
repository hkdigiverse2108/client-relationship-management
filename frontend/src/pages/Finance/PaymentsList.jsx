import React, { useState, useEffect } from 'react';
import PageHeader from '@/components/common/PageHeader/PageHeader';
import Button from '@/components/common/Button/Button';
import { FiPlus, FiEdit2, FiTrash2, FiDollarSign, FiClock, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import { paymentService } from '@/api/services/paymentService';
import { clientService } from '@/api/services/clientService';
import { invoiceService } from '@/api/services/invoiceService';
import PaymentModal from './PaymentModal';
import toast from 'react-hot-toast';
import { formatCurrency } from '@/utils/formatters';
import SearchBar from "@/components/common/SearchBar/SearchBar";
import { confirmDialog } from "@/components/common/ConfirmDialog/confirmDialog";

const PaymentsList = () => {
  const [payments, setPayments] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [methodFilter, setMethodFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  
  const [clientsMap, setClientsMap] = useState({});
  const [invoicesMap, setInvoicesMap] = useState({});
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editPayment, setEditPayment] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [payData, clientsData, invoicesData] = await Promise.all([
        paymentService.getAllPayments(),
        clientService.list(),
        invoiceService.getAllInvoices()
      ]);
      
      const payArray = Array.isArray(payData) ? payData : (payData.data || []);
      
      // Handle legacy records without payment_id or status
      const normalizedPayments = payArray.map((p, index) => ({
        ...p,
        payment_id: p.payment_id || `PAY-LEGACY-${index + 100}`,
        status: p.status || 'completed'
      }));
      
      setPayments(normalizedPayments);
      setFilteredPayments(normalizedPayments);
      
      const cMap = {};
      const cArray = Array.isArray(clientsData) ? clientsData : (clientsData.data || []);
      cArray.forEach(c => {
        cMap[c._id || c.id] = c.name || c.company_name;
      });
      setClientsMap(cMap);
      
      const iMap = {};
      const iArray = Array.isArray(invoicesData) ? invoicesData : (invoicesData.data || []);
      iArray.forEach(i => {
        iMap[i._id || i.id] = i.invoice_number;
      });
      setInvoicesMap(iMap);
      
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to load payments data');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    let result = payments;
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(p => 
        (p.payment_id && p.payment_id.toLowerCase().includes(query)) ||
        (p.transaction_reference && p.transaction_reference.toLowerCase().includes(query)) ||
        (clientsMap[p.client_id] && clientsMap[p.client_id].toLowerCase().includes(query)) ||
        (invoicesMap[p.invoice_id] && invoicesMap[p.invoice_id].toLowerCase().includes(query))
      );
    }
    
    if (methodFilter !== 'All') {
      result = result.filter(p => p.payment_method.toLowerCase() === methodFilter.toLowerCase());
    }
    
    if (statusFilter !== 'All') {
      result = result.filter(p => p.status.toLowerCase() === statusFilter.toLowerCase());
    }
    
    setFilteredPayments(result);
  }, [searchQuery, methodFilter, statusFilter, payments, clientsMap, invoicesMap]);

  const handleDelete = async (id) => {
    const confirmed = await confirmDialog({
      title: "Delete Payment Log",
      text: "Are you sure you want to delete this payment record? This action cannot be undone.",
      confirmText: "Delete"
    });
    
    if (confirmed) {
      try {
        await paymentService.deletePayment(id);
        toast.success('Payment deleted successfully');
        fetchData();
      } catch (error) {
        toast.error('Failed to delete payment');
      }
    }
  };

  const handleEdit = (payment) => {
    setEditPayment(payment);
    setIsModalOpen(true);
  };
  
  const handleCreate = () => {
    setEditPayment(null);
    setIsModalOpen(true);
  };

  const onModalClose = (wasSaved) => {
    setIsModalOpen(false);
    if (wasSaved) {
      fetchData();
    }
  };

  // Metrics calculation
  const totalRevenue = payments
    .filter(p => p.status.toLowerCase() === 'completed')
    .reduce((acc, curr) => acc + (curr.amount_received || 0), 0);
    
  const pendingReceivables = payments
    .filter(p => p.status.toLowerCase() === 'pending' || p.status.toLowerCase() === 'partial')
    .reduce((acc, curr) => acc + (curr.amount_received || 0), 0);
    
  const completedCount = payments.filter(p => p.status.toLowerCase() === 'completed').length;
  const failedOrPendingCount = payments.filter(p => ['failed', 'pending'].includes(p.status.toLowerCase())).length;

  return (
    <div className="payments-list-container">
      <PageHeader 
        title="Payment Gateway" 
        description="Track incoming payments and reconciliation"
        actions={
          <Button variant="primary" onClick={handleCreate}>
            <FiPlus className="me-2" /> Log Offline Payment
          </Button>
        }
      />

      {/* Metrics Cards */}
      <div className="row g-3 mb-4">
        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex align-items-center mb-3">
                <div className="flex-shrink-0 bg-success-soft text-success rounded p-3 me-3">
                  <FiDollarSign size={24} />
                </div>
                <div>
                  <h6 className="card-title text-muted mb-0">Total Revenue Collected</h6>
                  <h3 className="mb-0 fw-bold">{formatCurrency(totalRevenue)}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex align-items-center mb-3">
                <div className="flex-shrink-0 bg-warning-soft text-warning rounded p-3 me-3">
                  <FiClock size={24} />
                </div>
                <div>
                  <h6 className="card-title text-muted mb-0">Pending Receivables</h6>
                  <h3 className="mb-0 fw-bold">{formatCurrency(pendingReceivables)}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex align-items-center mb-3">
                <div className="flex-shrink-0 bg-primary-soft text-primary rounded p-3 me-3">
                  <FiCheckCircle size={24} />
                </div>
                <div>
                  <h6 className="card-title text-muted mb-0">Completed Transactions</h6>
                  <h3 className="mb-0 fw-bold">{completedCount}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex align-items-center mb-3">
                <div className="flex-shrink-0 bg-danger-soft text-danger rounded p-3 me-3">
                  <FiAlertCircle size={24} />
                </div>
                <div>
                  <h6 className="card-title text-muted mb-0">Failed / Pending</h6>
                  <h3 className="mb-0 fw-bold">{failedOrPendingCount}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card border-0 shadow-sm">
        <div className="card-body p-0">
          <div className="p-4 border-bottom d-flex flex-column flex-md-row gap-3 align-items-center bg-light">
            <div className="w-100" style={{ maxWidth: '400px' }}>
              <SearchBar 
                onSearch={setSearchQuery} 
                placeholder="Search by Transaction ID, Client or Invoice..." 
              />
            </div>
            
            <div className="d-flex gap-2">
              <select 
                className="form-select form-select-md"
                style={{ minWidth: '150px' }}
                value={methodFilter}
                onChange={(e) => setMethodFilter(e.target.value)}
              >
                <option value="All">All Methods</option>
                <option value="Razorpay">Razorpay</option>
                <option value="UPI Transfer">UPI Transfer</option>
                <option value="Bank NEFT/RTGS">Bank NEFT/RTGS</option>
                <option value="Cheque">Cheque</option>
                <option value="Cash">Cash</option>
              </select>

              <select 
                className="form-select form-select-md"
                style={{ minWidth: '150px' }}
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All Status</option>
                <option value="Pending">Pending</option>
                <option value="Partial">Partial</option>
                <option value="Completed">Completed</option>
                <option value="Failed">Failed</option>
              </select>
            </div>
          </div>

          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th className="ps-4">Transaction ID</th>
                  <th>Client & Invoice</th>
                  <th>Gateway / Method</th>
                  <th>Settlement Date</th>
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
                ) : filteredPayments.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center py-5 text-muted">
                      No payments found matching your criteria.
                    </td>
                  </tr>
                ) : (
                  filteredPayments.map((payment) => (
                    <tr key={payment.id || payment._id}>
                      <td className="ps-4 fw-medium text-primary">
                        {payment.payment_id}
                        {payment.transaction_reference && (
                          <div className="text-muted small fw-normal">Ref: {payment.transaction_reference}</div>
                        )}
                      </td>
                      <td>
                        <div className="d-flex flex-column">
                          <span className="fw-medium">{clientsMap[payment.client_id] || 'Unknown Client'}</span>
                          <span className="text-muted small">Inv: {invoicesMap[payment.invoice_id] || 'N/A'}</span>
                        </div>
                      </td>
                      <td>
                        <span className="badge bg-light text-dark border">
                          {payment.payment_method}
                        </span>
                      </td>
                      <td>{payment.payment_date ? new Date(payment.payment_date).toLocaleDateString() : 'N/A'}</td>
                      <td className="fw-semibold">{formatCurrency(payment.amount_received)}</td>
                      <td>
                        <span className={`badge ${
                          payment.status.toLowerCase() === 'completed' ? 'bg-success-soft text-success border border-success' : 
                          payment.status.toLowerCase() === 'pending' ? 'bg-warning-soft text-warning border border-warning' : 
                          payment.status.toLowerCase() === 'partial' ? 'bg-info-soft text-info border border-info' : 
                          payment.status.toLowerCase() === 'failed' ? 'bg-danger-soft text-danger border border-danger' : 
                          'bg-secondary-soft text-secondary border border-secondary'
                        }`}>
                          {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                        </span>
                      </td>
                      <td className="text-end pe-4">
                        <div className="d-flex gap-2 justify-content-end align-items-center">
                          <button 
                            className="btn btn-sm btn-light text-primary"
                            title="Edit Payment"
                            onClick={() => handleEdit(payment)}
                          >
                            <FiEdit2 />
                          </button>
                          <button 
                            className="btn btn-sm btn-light text-danger"
                            title="Delete Payment"
                            onClick={() => handleDelete(payment.id || payment._id)}
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
        <PaymentModal 
          isOpen={isModalOpen}
          onClose={() => onModalClose(false)}
          onSave={() => onModalClose(true)}
          payment={editPayment}
        />
      )}
    </div>
  );
};

export default PaymentsList;
