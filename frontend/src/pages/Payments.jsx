import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/common/PageHeader';
import PaymentModal from '../components/finance/PaymentModal';
import PaymentStatCard from '../components/common/PaymentStatCard';
import CustomDataTable from '../components/common/CustomDataTable';
import FilterBar from '../components/common/FilterBar';
import CustomSelect from '../components/common/CustomSelect';
import api from '../api/axiosClient';
import toast from 'react-hot-toast';

const InlinePaymentStatus = ({ row, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);

  let badgeClass = 'badge-success';
  if (row.status === 'Failed') badgeClass = 'badge-danger';
  if (row.status === 'Pending') badgeClass = 'badge-warning';
  if (row.status === 'Partial') badgeClass = 'badge-info';

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
    const statusOptions = [
      { value: 'Pending', label: 'Pending' },
      { value: 'Partial', label: 'Partial' },
      { value: 'Completed', label: 'Completed' },
      { value: 'Failed', label: 'Failed' }
    ];

    return (
      <div style={{ position: 'relative', display: 'inline-block' }}>
        <div style={{ visibility: 'hidden' }}>{badge}</div>
        <div style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: 0, zIndex: 1050, width: '130px' }}>
          <CustomSelect 
            options={statusOptions}
            value={statusOptions.find(o => o.value === row.status)}
            onChange={(opt) => {
              if(opt && opt.value !== row.status) {
                 onUpdate(row._id, opt.value);
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

const Payments = () => {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [searchQuery_payments, setSearchQuery_payments] = useState('');
  
  const [paymentsList, setPaymentsList] = useState([]);
  const [clientOptionsList, setClientOptionsList] = useState([{ value: '', label: 'All Clients' }]);
  const [editPayment, setEditPayment] = useState(null);
  const [confirmDeleteModal, setConfirmDeleteModal] = useState({ isOpen: false, id: null });
  const [loading, setLoading] = useState(true);
  
  const [stats, setStats] = useState({ 
    total: 0, pending: 0, failed: 0, success_rate: 0,
    total_trend: '0.00%', pending_trend: '0.00%', failed_trend: '0.00%', rate_trend: '0.00%',
    total_trend_color: 'success', pending_trend_color: 'success', failed_trend_color: 'danger', rate_trend_color: 'success'
  });
  
  const [dateRange, setDateRange] = useState([null, null]);
  const [clientFilter, setClientFilter] = useState('');
  const [methodFilter, setMethodFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const methodOptions = [
    { value: '', label: 'All Methods' },
    { value: 'Razorpay', label: 'Razorpay' },
    { value: 'UPI Transfer', label: 'UPI Transfer' },
    { value: 'Bank NEFT/RTGS', label: 'Bank NEFT/RTGS' },
    { value: 'Cheque', label: 'Cheque' },
    { value: 'Cash', label: 'Cash' }
  ];

  const statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'Pending', label: 'Pending' },
    { value: 'Partial', label: 'Partial' },
    { value: 'Completed', label: 'Completed' },
    { value: 'Failed', label: 'Failed' }
  ];

  const sortOptions = [
    { value: '', label: 'Sort By : Last 7 Days' },
    { value: 'Recently Added', label: 'Recently Added' },
    { value: 'Ascending', label: 'Ascending' },
    { value: 'Descending', label: 'Descending' },
  ];

  const fetchPayments = async () => {
    setLoading(true);
    try {
      const [paymentsRes, clientsRes, invoicesRes] = await Promise.all([
        api.get('/payments'),
        api.get('/clients'),
        api.get('/invoices')
      ]);

      const dataArr = Array.isArray(paymentsRes) ? paymentsRes : (paymentsRes.data || []);
      const clientsData = Array.isArray(clientsRes) ? clientsRes : (clientsRes.data || []);
      const invoicesData = Array.isArray(invoicesRes) ? invoicesRes : (invoicesRes.data || []);

      const clientsMap = {};
      const cOptions = [{ value: '', label: 'All Clients' }];
      clientsData.forEach(c => {
        clientsMap[c._id] = c;
        const cName = c.client_name || c.company_name || 'Unknown Client';
        cOptions.push({ value: c._id, label: cName });
      });
      setClientOptionsList(cOptions);

      const invoicesMap = {};
      invoicesData.forEach(i => {
        invoicesMap[i._id] = i.invoice_number || 'INV';
      });

      const getInitials = (name) => {
        if (!name) return 'UN';
        const parts = name.split(' ').filter(p => p.length > 0);
        if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
        if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
        return 'UN';
      };

      let totAmount = 0, penAmount = 0, failAmount = 0, successCount = 0;

      const formatted = dataArr.map(p => {
        const amt = parseFloat(p.amount_received) || 0;
        totAmount += amt;
        
        if (p.status === 'Pending') penAmount += amt;
        if (p.status === 'Failed') failAmount += amt;
        if (p.status === 'Completed') successCount++;

        const client = clientsMap[p.client_id];
        const clientName = client ? (client.client_name || client.company_name || 'Unknown Client') : 'Unknown Client';
        const clientAvatar = client && client.client_profile_photo ? client.client_profile_photo : getInitials(clientName);

        return {
          ...p,
          transactionId: p.payment_id || p.transaction_reference || 'N/A',
          reference: p.transaction_reference,
          avatar: clientAvatar,
          clientName: clientName,
          fullClient: client || { _id: p.client_id, client_name: clientName },
          invoiceNumber: p.invoice_id ? invoicesMap[p.invoice_id] || p.invoice_id : 'N/A',
          method: p.payment_method || 'N/A',
          date: p.payment_date ? new Date(p.payment_date).toLocaleDateString() : 'N/A',
          amount: `₹${amt}`,
          status: p.status || 'Pending'
        };
      });

      const totalCount = formatted.length || 1;
      
      // Calculate trends based on last 7 days vs prev 7 days
      const now = new Date();
      const last7 = new Date(now.getTime() - 7 * 86400000);
      const prev7 = new Date(now.getTime() - 14 * 86400000);
      
      let curTot = 0, prevTot = 0;
      let curPen = 0, prevPen = 0;
      let curFail = 0, prevFail = 0;
      
      formatted.forEach(p => {
        if (!p.payment_date) return;
        const d = new Date(p.payment_date);
        const amt = parseFloat(p.amount_received) || 0;
        
        if (d >= last7) {
          curTot += amt;
          if (p.status === 'Pending') curPen += amt;
          if (p.status === 'Failed') curFail += amt;
        } else if (d >= prev7 && d < last7) {
          prevTot += amt;
          if (p.status === 'Pending') prevPen += amt;
          if (p.status === 'Failed') prevFail += amt;
        }
      });
      
      const calcTrend = (cur, prev) => {
        if (prev === 0) return cur > 0 ? '+100%' : '0.00%';
        const diff = ((cur - prev) / prev) * 100;
        return (diff >= 0 ? '+' : '') + diff.toFixed(2) + '%';
      };

      setStats({
        total: totAmount,
        pending: penAmount,
        failed: failAmount,
        success_rate: Math.round((successCount / totalCount) * 100),
        total_trend: calcTrend(curTot, prevTot),
        pending_trend: calcTrend(curPen, prevPen),
        failed_trend: calcTrend(curFail, prevFail),
        rate_trend: '+2.50%', // fixed mock trend for rate
        total_trend_color: curTot >= prevTot ? 'success' : 'danger',
        pending_trend_color: curPen <= prevPen ? 'success' : 'danger', // less pending is good
        failed_trend_color: curFail <= prevFail ? 'success' : 'danger', // less fail is good
        rate_trend_color: 'success'
      });

      setPaymentsList(formatted);
    } catch (error) {
      console.error("Error fetching payments", error);
      toast.error('Failed to load payments');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const handleSavePayment = async (formData) => {
    try {
      if (formData._id) {
        await api.put(`/payments/${formData._id}`, formData);
        toast.success("Payment updated successfully");
      } else {
        await api.post('/payments', formData);
        toast.success("Payment created successfully");
      }
      setIsPaymentModalOpen(false);
      fetchPayments();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.detail || "Failed to save payment");
    }
  };

  const handleDelete = async () => {
    if (!confirmDeleteModal.id) return;
    try {
      await api.delete(`/payments/${confirmDeleteModal.id}`);
      toast.success("Payment deleted successfully");
      fetchPayments();
    } catch (error) {
      toast.error("Failed to delete payment");
    } finally {
      setConfirmDeleteModal({ isOpen: false, id: null });
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await api.put(`/payments/${id}`, { status: newStatus });
      toast.success('Payment status updated');
      fetchPayments();
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const columns = [
    {
      name: 'Transaction ID',
      selector: row => row.transactionId,
      cell: row => (
        <div>
          <Link to="#" onClick={(e) => { e.preventDefault(); }} className="tb-data text-primary fw-medium">{row.transactionId}</Link>
          {row.reference && <div className="small fw-normal text-muted">Ref: {row.reference}</div>}
        </div>
      ),
      sortable: true,
    },
    {
      name: 'Client & Invoice',
      cell: row => (
        <div className="d-flex align-items-center file-name-icon">
          <Link to="/client-details" state={{ client: row.fullClient }} className={`avatar avatar-md border-0 me-2 d-flex align-items-center justify-content-center text-decoration-none ${(row.avatar && (row.avatar.startsWith('/') || row.avatar.startsWith('http'))) ? '' : 'bg-primary'}`} style={{ borderRadius: '50%' }}>
            {(row.avatar && (row.avatar.startsWith('/') || row.avatar.startsWith('http'))) ? (
              <img src={row.avatar} className="img-fluid rounded-circle" alt="img" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <span className="text-white fw-bold" style={{ fontSize: '14px' }}>{row.avatar}</span>
            )}
          </Link>
          <div>
            <h6 className="fw-medium"><Link to="/client-details" state={{ client: row.fullClient }}>{row.clientName}</Link></h6>
            <span className="fs-12 fw-normal text-muted">{row.invoiceNumber}</span>
          </div>
        </div>
      ),
      sortable: true,
    },
    { name: 'Gateway / Method', selector: row => row.method, sortable: true },
    { name: 'Settlement Date', selector: row => row.date, sortable: true },
    { name: 'Amount', selector: row => row.amount, sortable: true },
    {
      name: 'Status',
      cell: row => <InlinePaymentStatus row={row} onUpdate={handleStatusChange} />,
      sortable: true,
    },
    {
      name: 'Actions',
      cell: row => (
        <div className="action-icon d-inline-flex">
          <Link to="#" className="me-2 text-muted" onClick={(e) => {
            e.preventDefault();
            setEditPayment(row);
            setIsPaymentModalOpen(true);
          }}><i className="ti ti-edit"></i></Link>
          <Link to="#" className="text-muted" onClick={(e) => {
            e.preventDefault();
            setConfirmDeleteModal({ isOpen: true, id: row._id });
          }}><i className="ti ti-trash"></i></Link>
        </div>
      ),
    }
  ];

  // Apply filters
  const filteredPayments = paymentsList.filter(p => {
    let match = true;
    if (clientFilter && p.client_id !== clientFilter) match = false;
    if (methodFilter && p.method !== methodFilter) match = false;
    if (statusFilter && p.status !== statusFilter) match = false;
    if (dateRange[0] && dateRange[1]) {
      const pDate = new Date(p.payment_date);
      if (pDate < dateRange[0] || pDate > dateRange[1]) match = false;
    }
    return match;
  });

  const filterConfig = [
    { type: 'date', value: dateRange, onChange: setDateRange, placeholder: 'Select Date Range' },
    { type: 'select', value: clientFilter, onChange: setClientFilter, options: clientOptionsList },
    { type: 'select', value: methodFilter, onChange: setMethodFilter, options: methodOptions },
    { type: 'select', value: statusFilter, onChange: setStatusFilter, options: statusOptions }
  ];

  const hasActiveFilters = clientFilter !== '' || methodFilter !== '' || statusFilter !== '' || dateRange[0] !== null;

  const handleClearFilters = () => {
    setClientFilter('');
    setMethodFilter('');
    setStatusFilter('');
    setDateRange([null, null]);
  };

  return (
    <>
      <div className="page-wrapper">
        <div className="content">

          {/* Breadcrumb */}
          <PageHeader 
            title="Payments"
            breadcrumbs={[
              { label: 'Dashboard' },
              { label: 'Finance & Billing' },
              { label: 'Payments', active: true }
            ]}
          >
            <div className="mb-2">
              <button onClick={() => setIsPaymentModalOpen(true)} className="btn btn-primary d-flex align-items-center">
                <i className="ti ti-circle-plus me-2"></i>Log Offline Payment
              </button>
            </div>
          </PageHeader>
          {/* /Breadcrumb */}

          {/* Payment Report Cards */}
          <div className="row">
            <PaymentStatCard 
              title="Total Payments" 
              value={`₹${stats.total}`} 
              iconColor="primary" 
              trendValue={stats.total_trend} 
              trendColor={stats.total_trend_color} 
            />
            <PaymentStatCard 
              title="Pending Payments" 
              value={`₹${stats.pending}`} 
              iconColor="skyblue" 
              trendValue={stats.pending_trend} 
              trendColor={stats.pending_trend_color} 
            />
            <PaymentStatCard 
              title="Failed Payments" 
              value={`₹${stats.failed}`} 
              iconColor="danger" 
              trendValue={stats.failed_trend} 
              trendColor={stats.failed_trend_color} 
            />
            <PaymentStatCard 
              title="Payment Success Rate" 
              value={`${stats.success_rate}%`} 
              iconColor="pink" 
              trendValue={stats.rate_trend} 
              trendColor={stats.rate_trend_color} 
            />
          </div>
          {/* /Payment Report Cards */}

          <div className="card">
            <div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
              <h5>Payments List</h5>
              <FilterBar filters={filterConfig} onClear={handleClearFilters} hasActiveFilters={hasActiveFilters} />
            </div>
            
            <div className="card-body p-0">
              <CustomDataTable 
                columns={columns}
                data={filteredPayments}
                searchQuery={searchQuery_payments}
                onSearch={(e) => setSearchQuery_payments(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <PaymentModal 
        isOpen={isPaymentModalOpen} 
        onClose={() => { setIsPaymentModalOpen(false); setEditPayment(null); }} 
        payment={editPayment}
        onSave={handleSavePayment} 
      />

      {/* Delete Confirmation Modal */}
      {confirmDeleteModal.isOpen && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-body text-center py-5">
                <div className="mb-3">
                  <i className="ti ti-trash text-danger" style={{ fontSize: '48px' }}></i>
                </div>
                <h4>Delete Payment Log</h4>
                <p className="text-muted mb-4">Are you sure you want to delete this payment? This action cannot be undone.</p>
                <div className="d-flex justify-content-center gap-2">
                  <button className="btn btn-light" onClick={() => setConfirmDeleteModal({ isOpen: false, id: null })}>Cancel</button>
                  <button className="btn btn-danger" onClick={handleDelete}>Yes, Delete</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Payments;
