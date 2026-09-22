import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/common/PageHeader';
import CustomDataTable from '../components/common/CustomDataTable';
import { customersData } from './customersData';
import CustomerFormModal from '../components/customers/CustomerFormModal';
import CustomSelect from '../components/common/CustomSelect';
import CustomDatePicker from '../components/common/CustomDatePicker';
import CustomersGridView from '../components/customers/CustomersGridView';

const Customers = () => {
  const [viewMode, setViewMode] = useState('list');
  const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [statusFilter, setStatusFilter] = useState('');
  const [cityFilter, setCityFilter] = useState('');

  const hasFilters = startDate || endDate || statusFilter || cityFilter;

  const clearFilters = () => {
    setDateRange([null, null]);
    setStatusFilter('');
    setCityFilter('');
  };
  // Pagination state for contacts
        
  const columns = [
    {
      name: 'Customer ID',
      sortable: true,
      selector: row => row.id,
      cell: (row) => <span className="text-primary fw-semibold">#{row.id}</span>,
      minWidth: '100px'
    },
    {
      name: 'Name',
      sortable: true,
      selector: row => row.name,
      cell: (row) => (
        <div className="d-flex align-items-center">
          <Link to="#" className="avatar avatar-md border avatar-rounded me-2">
            <img src={row.avatar} className="img-fluid" alt="img" />
          </Link>
          <h6 className="fw-medium mb-0"><Link to="#">{row.name}</Link></h6>
        </div>
      ),
      minWidth: '220px'
    },
    {
      name: 'Contact',
      sortable: true,
      selector: row => row.email,
      cell: (row) => (
        <div>
          <span className="fs-13 fw-normal text-muted d-block">{row.email}</span>
          <span className="fs-12 fw-normal text-muted d-block mt-1">{row.phone}</span>
        </div>
      ),
      minWidth: '200px'
    },
    {
      name: 'Location',
      sortable: true,
      selector: row => row.city,
      cell: (row) => (
        <div>
          <span className="fs-13 fw-normal text-muted d-block">{row.city}, {row.state}</span>
          <span className="fs-12 fw-normal text-muted d-block mt-1">{row.country}</span>
        </div>
      ),
      minWidth: '180px'
    },
    {
      name: 'Status',
      sortable: true,
      selector: row => row.status,
      cell: (row) => {
        let badgeClass = "badge-soft-secondary";
        let textClass = "text-secondary";
        if (row.status === "Active") {
          badgeClass = "bg-success-transparent";
          textClass = "text-success";
        } else if (row.status === "Inactive") {
          badgeClass = "bg-warning-transparent";
          textClass = "text-warning";
        } else if (row.status === "Blocked") {
          badgeClass = "bg-danger-transparent";
          textClass = "text-danger";
        }
        return (
          <span className={`badge ${badgeClass} ${textClass} d-inline-flex align-items-center badge-xs text-capitalize`}>
            <i className="ti ti-point-filled me-1"></i>{row.status}
          </span>
        );
      },
      minWidth: '120px'
    },
    {
      name: 'Action',
      cell: (row) => (
        <div className="action-icon d-inline-flex">
          <Link to="#" className="me-2" data-bs-toggle="modal" data-bs-target="#edit_customer"><i className="ti ti-edit"></i></Link>
          <Link to="#" data-bs-toggle="modal" data-bs-target="#delete_modal"><i className="ti ti-trash"></i></Link>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="page-wrapper">
			<div className="content">

				{/* Breadcrumb */}
				<PageHeader 
					title="Manage your E-Commerce customers"
					breadcrumbs={[
						{ label: 'Dashboard' },
						{ label: 'E-Commerce' },
						{ label: viewMode === 'list' ? 'Customers List' : 'Customers Grid', active: true }
					]}
				>
					<div className="me-2 mb-2">
							<div className="d-flex align-items-center border bg-white rounded p-1 me-2 icon-list">
								<a href="#" onClick={(e) => { e.preventDefault(); setViewMode('list'); }} className={`btn btn-icon btn-sm me-1 ${viewMode === 'list' ? 'active bg-primary text-white' : ''}`}><i
										className="ti ti-list-tree"></i></a>
								<a href="#" onClick={(e) => { e.preventDefault(); setViewMode('grid'); }} className={`btn btn-icon btn-sm ${viewMode === 'grid' ? 'active bg-primary text-white' : ''}`}><i
										className="ti ti-layout-grid"></i></a>
							</div>
						</div>
						
						<div className="mb-2">
							<a href="#" onClick={(e) => { e.preventDefault(); setIsCustomerModalOpen(true); }}
								className="btn btn-primary d-flex align-items-center"><i
									className="ti ti-circle-plus me-2"></i>New Customer</a>
						</div>
					
				</PageHeader>
				{/* /Breadcrumb */}

				{/*orders List */}
				<div className="card">
					
					<div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
						<h5>{viewMode === 'list' ? 'Customers List' : 'Customers Grid'}</h5>
						<div className="d-flex my-xl-auto right-content align-items-center flex-wrap row-gap-3">
							<div className="me-3" style={{ minWidth: '220px' }}>
								<CustomDatePicker 
									isRange={true}
									startDate={startDate}
									endDate={endDate}
									onChange={(update) => setDateRange(update)}
									placeholderText="Select Date Range"
								/>
							</div>
							<div className="me-3 custom-select-wrapper" style={{ width: '150px' }}>
								<CustomSelect 
									options={[
										{ value: '', label: 'All Cities' },
										{ value: 'Mumbai', label: 'Mumbai' },
										{ value: 'Delhi', label: 'Delhi' },
										{ value: 'Bangalore', label: 'Bangalore' },
										{ value: 'Ahmedabad', label: 'Ahmedabad' }
									]}
									value={cityFilter ? { value: cityFilter, label: cityFilter } : { value: '', label: 'All Cities' }}
									onChange={(selected) => setCityFilter(selected ? selected.value : '')}
								/>
							</div>
							<div className="custom-select-wrapper" style={{ width: '140px' }}>
								<CustomSelect 
									options={[
										{ value: '', label: 'All Status' },
										{ value: 'Active', label: 'Active' },
										{ value: 'Inactive', label: 'Inactive' },
										{ value: 'Blocked', label: 'Blocked' }
									]}
									value={statusFilter ? { value: statusFilter, label: statusFilter } : { value: '', label: 'All Status' }}
									onChange={(selected) => setStatusFilter(selected ? selected.value : '')}
								/>
							</div>
							{hasFilters ? (
								<div className="ms-2">
									<button 
										className="btn btn-outline-danger btn-sm d-flex align-items-center"
										onClick={clearFilters}
									>
										<i className="ti ti-x me-1"></i>Clear
									</button>
								</div>
							) : null}
						</div>
					</div>
					<div className="card-body p-0">
						{viewMode === 'list' ? (
							<div className="custom-datatable-filter table-responsive">
								<CustomDataTable columns={columns} data={customersData} />
							</div>
						) : (
							<div className="p-3">
								<CustomersGridView />
							</div>
						)}
					</div>
				</div>
				{/* /customers list */}

			</div>

		</div>
		<CustomerFormModal open={isCustomerModalOpen} onClose={() => setIsCustomerModalOpen(false)} />
    </>
  );
};

export default Customers;
