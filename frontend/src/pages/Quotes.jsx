import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/common/PageHeader';
import QuoteModal from '../components/finance/QuoteModal';
import StatCard from '../components/common/StatCard';
import CustomDataTable from '../components/common/CustomDataTable';
import CustomDatePicker from '../components/common/CustomDatePicker';
import CustomSelect from '../components/common/CustomSelect';

const Quotes = () => {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [searchQuery_quotes, setSearchQuery_quotes] = useState('');
  
  const [dateRange, setDateRange] = useState([null, null]);
  const [clientFilter, setClientFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sortFilter, setSortFilter] = useState('');

  const clientOptions = [
    { value: '', label: 'Select Client' },
    { value: 'Client A', label: 'Client A' },
    { value: 'Client B', label: 'Client B' },
  ];

  const statusOptions = [
    { value: '', label: 'Select Status' },
    { value: 'Accepted', label: 'Accepted' },
    { value: 'Rejected', label: 'Rejected' },
    { value: 'Draft', label: 'Draft' },
    { value: 'Sent', label: 'Sent' },
  ];

  const sortOptions = [
    { value: '', label: 'Sort By : Last 7 Days' },
    { value: 'Recently Added', label: 'Recently Added' },
    { value: 'Ascending', label: 'Ascending' },
    { value: 'Descending', label: 'Descending' },
  ];

  const columns = [
    {
      name: 'Quote No',
      selector: row => row.quoteNo,
      cell: row => <Link to="#" onClick={(e) => { e.preventDefault(); }} className="tb-data text-primary fw-medium">{row.quoteNo}</Link>,
      sortable: true,
    },
    {
      name: 'Client',
      cell: row => (
        <div className="d-flex align-items-center file-name-icon">
          <a href="#" className="avatar avatar-md border avatar-rounded me-2">
            <img src={row.avatar} className="img-fluid" alt="img" />
          </a>
          <div>
            <h6 className="fw-medium"><a href="#">{row.clientName}</a></h6>
            <span className="fs-12 fw-normal text-muted">{row.clientEmail}</span>
          </div>
        </div>
      ),
      sortable: true,
    },
    { name: 'Date', selector: row => row.date, sortable: true },
    { name: 'Amount', selector: row => row.amount, sortable: true },
    {
      name: 'Status',
      cell: row => {
        let badgeClass = 'badge-success';
        if (row.status === 'Rejected') badgeClass = 'badge-danger';
        if (row.status === 'Draft') badgeClass = 'badge-warning';
        if (row.status === 'Sent') badgeClass = 'badge-info';
        return (
          <span className={`badge ${badgeClass} d-inline-flex align-items-center badge-xs`}>
            <i className="ti ti-point-filled me-1"></i>{row.status}
          </span>
        );
      },
      sortable: true,
    },
    {
      name: 'Action',
      cell: row => (
        <div className="action-icon d-inline-flex">
          <Link to="#" className="me-2 text-muted" data-bs-toggle="modal" data-bs-target="#edit_quote"><i className="ti ti-edit"></i></Link>
          <Link to="#" className="text-muted" data-bs-toggle="modal" data-bs-target="#delete_modal"><i className="ti ti-trash"></i></Link>
        </div>
      ),
    }
  ];

  const quotesList = [
    { quoteNo: 'QT-0001', avatar: '/assets/img/users/user-32.jpg', clientName: 'Anthony Lewis', clientEmail: 'anthony@example.com', date: '14 Jan 2024', amount: '$5,000', status: 'Accepted' },
    { quoteNo: 'QT-0002', avatar: '/assets/img/users/user-09.jpg', clientName: 'Brian Villalobos', clientEmail: 'brian@example.com', date: '21 Jan 2024', amount: '$3,200', status: 'Sent' },
    { quoteNo: 'QT-0003', avatar: '/assets/img/users/user-01.jpg', clientName: 'Harvey Smith', clientEmail: 'harvey@example.com', date: '20 Feb 2024', amount: '$1,800', status: 'Draft' },
  ];

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
              <a href="#" onClick={(e) => { e.preventDefault(); setIsQuoteModalOpen(true); }}
                className="btn btn-primary d-flex align-items-center"><i
                  className="ti ti-circle-plus me-2"></i>Add Quote</a>
            </div>
           
          </PageHeader>
          {/* /Breadcrumb */}

          {/* Quotes Counts */}
          <div className="row">
            <StatCard title="Total Quotes" value="12" icon="ti-file-invoice" iconColor="primary" />
            <StatCard title="Accepted Quotes" value="8" icon="ti-check" iconColor="pink" />
            <StatCard title="Pending Quotes" value="3" icon="ti-clock" iconColor="purple" />
            <StatCard title="Rejected Quotes" value="1" icon="ti-x" iconColor="skyblue" />
          </div>
          {/* /Quotes Counts */}

          {/* Quotes list */}
          <div className="card">
            <div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
              <h5>Quotes List</h5>
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
                data={quotesList}
                searchQuery={searchQuery_quotes}
                onSearch={(e) => setSearchQuery_quotes(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <QuoteModal isOpen={isQuoteModalOpen} onClose={() => setIsQuoteModalOpen(false)} />
    </>
  );
};

export default Quotes;
