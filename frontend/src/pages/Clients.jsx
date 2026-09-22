import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/common/PageHeader';
import CustomDataTable from '../components/common/CustomDataTable';
import ClientStatCard from '../components/common/ClientStatCard';
import { clientsData } from './clientsData';
import ClientsGridView from '../components/clients/ClientsGridView';
import ClientFormModal from '../components/clients/ClientFormModal';
import CustomSelect from '../components/common/CustomSelect';
import CustomDatePicker from '../components/common/CustomDatePicker';

const Clients = () => {
  const [viewMode, setViewMode] = useState('list');
  const [isClientModalOpen, setIsClientModalOpen] = useState(false);
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [statusFilter, setStatusFilter] = useState('');
  const [customerTypeFilter, setCustomerTypeFilter] = useState('');
  const [clientTypeFilter, setClientTypeFilter] = useState('');

  const hasFilters = startDate || endDate || statusFilter || customerTypeFilter || clientTypeFilter;

  const clearFilters = () => {
    setDateRange([null, null]);
    setStatusFilter('');
    setCustomerTypeFilter('');
    setClientTypeFilter('');
  };

  const columns = [
    {
      name: 'Client id',
      sortable: true,
      selector: row => row.clientId,
      cell: (row) => <Link to="/client-details">{row.clientId}</Link>,
    },
    {
      name: 'Company name',
      sortable: true,
      selector: row => row.companyName,
    },
    {
      name: 'Client name',
      sortable: true,
      selector: row => row.clientName,
      cell: (row) => (
        <div className="d-flex align-items-center file-name-icon">
          <Link to="/client-details" className="avatar avatar-md border avatar-rounded">
            <img src={row.clientAvatar} className="img-fluid" alt="img" />
          </Link>
          <div className="ms-2">
            <h6 className="fw-medium"><Link to="/client-details">{row.clientName}</Link></h6>
            <span className="fs-12 fw-normal ">{row.clientRole}</span>
          </div>
        </div>
      ),
    },
    {
      name: 'Contact person',
      sortable: true,
      selector: row => row.contactPerson,
    },
    {
      name: 'Email',
      sortable: true,
      selector: row => row.email,
    },
    {
      name: 'Mobile',
      sortable: true,
      selector: row => row.mobile,
    },
    {
      name: 'Customer type',
      sortable: true,
      selector: row => row.customerType,
    },
    {
      name: 'Client type',
      sortable: true,
      selector: row => row.clientType,
    },
    {
      name: 'Account manager',
      sortable: true,
      selector: row => row.accountManager,
    },
    {
      name: 'Status',
      sortable: true,
      selector: row => row.status,
      cell: (row) => (
        <span className={`badge badge-${row.status === 'Active' ? 'success' : 'danger'} d-inline-flex align-items-center badge-xs`}>
          <i className="ti ti-point-filled me-1"></i>{row.status}
        </span>
      ),
    },
    {
      name: 'Created at',
      sortable: true,
      selector: row => row.createdAt,
    },
    {
      name: 'Action',
      cell: (row) => (
        <div className="action-icon d-inline-flex">
          <Link to="#" className="me-2" data-bs-toggle="modal" data-bs-target="#edit_client"><i className="ti ti-edit"></i></Link>
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
					title="Clients"
					breadcrumbs={[
						{ label: 'Dashboard' },
						{ label: 'CRM & Sales' },
						{ label: viewMode === 'list' ? 'Client List' : 'Client Grid', active: true }
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
						<div className="me-2 mb-2">
							<div className="dropdown">
								<a href="#" onClick={(e) => e.preventDefault()}
									className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
									data-bs-toggle="dropdown">
									<i className="ti ti-file-export me-1"></i>Export
								</a>
								<ul className="dropdown-menu  dropdown-menu-end p-3">
									<li>
										<a href="#" onClick={(e) => e.preventDefault()} className="dropdown-item rounded-1"><i
												className="ti ti-file-type-pdf me-1"></i>Export as PDF</a>
									</li>
									<li>
										<a href="#" onClick={(e) => e.preventDefault()} className="dropdown-item rounded-1"><i
												className="ti ti-file-type-xls me-1"></i>Export as Excel </a>
									</li>
								</ul>
							</div>
						</div>
						<div className="mb-2">
							<a href="#" onClick={(e) => { e.preventDefault(); setIsClientModalOpen(true); }}
								className="btn btn-primary d-flex align-items-center"><i
									className="ti ti-circle-plus me-2"></i>Add Client</a>
						</div>
						
				</PageHeader>
				{/* /Breadcrumb */}

				{/* Clients Info */}
				<div className="row">
					<ClientStatCard 
						title="Total Clients"
						value="300"
						icon="ti ti-users-group"
						iconBgClass="bg-pink-transparent border border-pink"
						iconColorClass="text-pink"
						badgeClass="bg-transparent-purple"
						badgeIcon="ti ti-arrow-wave-right-down"
						percentage="+19.01%"
					/>
					<ClientStatCard 
						title="Active Clients"
						value="270"
						icon="ti ti-user-share"
						iconBgClass="bg-success-transparent border border-success"
						iconColorClass=""
						badgeClass="bg-transparent-primary text-primary"
						badgeIcon="ti ti-arrow-wave-right-down"
						percentage="+19.01%"
					/>
					<ClientStatCard 
						title="Inactive Clients"
						value="30"
						icon="ti ti-user-pause"
						iconBgClass="bg-danger-transparent border border-danger"
						iconColorClass=""
						badgeClass="bg-transparent-dark text-dark"
						badgeIcon="ti ti-arrow-wave-right-down"
						percentage="+19.01%"
					/>
					<ClientStatCard 
						title="New Clients"
						value="300"
						icon="ti ti-user-plus"
						iconBgClass="bg-info-transparent border border-info"
						iconColorClass=""
						badgeClass="bg-transparent-secondary text-dark"
						badgeIcon="ti ti-arrow-wave-right-down"
						percentage="+19.01%"
					/>
				</div>
				{/* /Clients Info */}

				{/* Clients list */}
				<div className="card">
					
					<div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
						<h5>Client List</h5>
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
							<div className="me-3 custom-select-wrapper" style={{ width: '140px' }}>
								<CustomSelect 
									options={[
										{ value: '', label: 'All Status' },
										{ value: 'active', label: 'Active' },
										{ value: 'inactive', label: 'Inactive' }
									]}
									value={statusFilter ? { value: statusFilter, label: statusFilter === 'active' ? 'Active' : 'Inactive' } : { value: '', label: 'All Status' }}
									onChange={(selected) => setStatusFilter(selected ? selected.value : '')}
								/>
							</div>
							<div className="me-3 custom-select-wrapper" style={{ width: '150px' }}>
								<CustomSelect 
									options={[
										{ value: '', label: 'All Customer Types' },
										{ value: 'b2b', label: 'B2B' },
										{ value: 'b2c', label: 'B2C' }
									]}
									value={customerTypeFilter ? { value: customerTypeFilter, label: customerTypeFilter === 'b2b' ? 'B2B' : 'B2C' } : { value: '', label: 'Customer Type' }}
									onChange={(selected) => setCustomerTypeFilter(selected ? selected.value : '')}
								/>
							</div>
							<div className="me-3 custom-select-wrapper" style={{ width: '150px' }}>
								<CustomSelect 
									options={[
										{ value: '', label: 'All Client Types' },
										{ value: 'enterprise', label: 'Enterprise' },
										{ value: 'sme', label: 'SME' },
										{ value: 'startup', label: 'Startup' }
									]}
									value={clientTypeFilter ? { value: clientTypeFilter, label: clientTypeFilter.charAt(0).toUpperCase() + clientTypeFilter.slice(1) } : { value: '', label: 'Client Type' }}
									onChange={(selected) => setClientTypeFilter(selected ? selected.value : '')}
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
										<CustomDataTable columns={columns} data={clientsData} />
									</div>
								) : (
									<div className="p-3">
										<ClientsGridView />
									</div>
								)}
							</div>
					</div>
				</div>
				{/* /Clients list */}

			</div>
			<div className="footer d-sm-flex align-items-center justify-content-between border-top bg-white p-3">
				<p className="mb-0">2014 - 2026 &copy; SmartHR.</p>
				<p>Designed &amp; Developed By <a href="#" onClick={(e) => e.preventDefault()} className="text-primary">Dreams</a></p>
			</div>
		
		
		
		<ClientFormModal open={isClientModalOpen} onClose={() => setIsClientModalOpen(false)} />
    </>
  );
};

export default Clients;
