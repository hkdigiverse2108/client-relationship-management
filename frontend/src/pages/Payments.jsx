import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/common/PageHeader';
import PaymentModal from '../components/finance/PaymentModal';
import PaymentStatCard from '../components/common/PaymentStatCard';
import CustomDataTable from '../components/common/CustomDataTable';
import CustomDatePicker from '../components/common/CustomDatePicker';
import CustomSelect from '../components/common/CustomSelect';

const Payments = () => {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [searchQuery_payments, setSearchQuery_payments] = useState('');
  
  const [dateRange, setDateRange] = useState([null, null]);
  const [methodFilter, setMethodFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sortFilter, setSortFilter] = useState('');

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
          <a href="#" className="avatar avatar-md border avatar-rounded me-2">
            <img src={row.avatar} className="img-fluid" alt="img" />
          </a>
          <div>
            <h6 className="fw-medium"><a href="#">{row.clientName}</a></h6>
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
      cell: row => {
        let badgeClass = 'badge-success';
        if (row.status === 'Failed') badgeClass = 'badge-danger';
        if (row.status === 'Pending') badgeClass = 'badge-warning';
        if (row.status === 'Partial') badgeClass = 'badge-info';
        return (
          <span className={`badge ${badgeClass} d-inline-flex align-items-center badge-xs`}>
            <i className="ti ti-point-filled me-1"></i>{row.status}
          </span>
        );
      },
      sortable: true,
    },
    {
      name: 'Actions',
      cell: row => (
        <div className="action-icon d-inline-flex">
          <Link to="#" className="me-2 text-muted" data-bs-toggle="modal" data-bs-target="#edit_payment"><i className="ti ti-edit"></i></Link>
          <Link to="#" className="text-muted" data-bs-toggle="modal" data-bs-target="#delete_modal"><i className="ti ti-trash"></i></Link>
        </div>
      ),
    }
  ];

  const paymentsList = [
    { transactionId: 'PAY-1454', reference: 'UTR-9081239', avatar: '/assets/img/users/user-32.jpg', clientName: 'Anthony Lewis', invoiceNumber: 'INV-1454', method: 'Bank NEFT/RTGS', date: '14 Jan 2024', amount: '$5,000', status: 'Completed' },
    { transactionId: 'PAY-6571', reference: 'RZP-8123', avatar: '/assets/img/users/user-09.jpg', clientName: 'Brian Villalobos', invoiceNumber: 'INV-6571', method: 'Razorpay', date: '21 Jan 2024', amount: '$3,200', status: 'Pending' },
    { transactionId: 'PAY-2245', reference: 'CHQ-0012', avatar: '/assets/img/users/user-01.jpg', clientName: 'Harvey Smith', invoiceNumber: 'INV-2245', method: 'Cheque', date: '20 Feb 2024', amount: '$1,800', status: 'Failed' },
  ];

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
              value="$45,221,45" 
              iconColor="primary" 
              trendValue="+20.01%" 
              trendColor="success" 
            />
            <PaymentStatCard 
              title="Pending Payments" 
              value="$45,221,45" 
              iconColor="skyblue" 
              trendValue="+20.01%" 
              trendColor="success" 
            />
            <PaymentStatCard 
              title="Failed Payments" 
              value="$10,470" 
              iconColor="danger" 
              trendValue="+20.01%" 
              trendColor="danger" 
            />
            <PaymentStatCard 
              title="Payment Success Rate" 
              value="90%" 
              iconColor="pink" 
              trendValue="+20.01%" 
              trendColor="success" 
            />
          </div>
          {/* /Payment Report Cards */}

          <div className="card">
            <div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
              <h5>Payments List</h5>
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
                      placeholderText=""
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="me-3" style={{ minWidth: '150px' }}>
                  <CustomSelect 
                    options={methodOptions}
                    value={methodOptions.find(o => o.value === methodFilter) || methodOptions[0]}
                    onChange={(option) => setMethodFilter(option ? option.value : '')}
                  />
                </div>
                <div className="me-3" style={{ minWidth: '150px' }}>
                  <CustomSelect 
                    options={statusOptions}
                    value={statusOptions.find(o => o.value === statusFilter) || statusOptions[0]}
                    onChange={(option) => setStatusFilter(option ? option.value : '')}
                  />
                </div>
                
              </div>
            </div>
            
            <div className="card-body p-0">
              <CustomDataTable 
                columns={columns}
                data={paymentsList}
                searchQuery={searchQuery_payments}
                onSearch={(e) => setSearchQuery_payments(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <PaymentModal isOpen={isPaymentModalOpen} onClose={() => setIsPaymentModalOpen(false)} />
    </>
  );
};

export default Payments;
