import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/common/PageHeader';
import CustomDataTable from '../components/common/CustomDataTable';
import { contactsData } from './contactsData';
import ContactFormModal from '../components/contacts/ContactFormModal';
import CustomSelect from '../components/common/CustomSelect';
import CustomDatePicker from '../components/common/CustomDatePicker';
import ContactsKanbanView from '../components/contacts/ContactsKanbanView';

const Contacts = () => {
  const [viewMode, setViewMode] = useState('list');
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [statusFilter, setStatusFilter] = useState('');
  const [deptFilter, setDeptFilter] = useState('');
  const [companyFilter, setCompanyFilter] = useState('');
  const [tagFilter, setTagFilter] = useState('');

  const hasFilters = startDate || endDate || statusFilter || deptFilter || companyFilter || tagFilter;

  const clearFilters = () => {
    setDateRange([null, null]);
    setStatusFilter('');
    setDeptFilter('');
    setCompanyFilter('');
    setTagFilter('');
  };
  // Pagination state for contacts
        
  const columns = [

    {
      name: 'Contact persona',
      sortable: true,
      selector: row => row.name,
      cell: (row) => (
        <div className="d-flex align-items-center file-name-icon">
          <Link to="/contact-details" className="avatar avatar-md border avatar-rounded">
            <img src={row.avatar} className="img-fluid" alt="img" />
          </Link>
          <div className="ms-2">
            <h6 className="fw-medium"><Link to="/contact-details">{row.name}</Link></h6>
            <span className="fs-12 fw-normal ">{row.role}</span>
          </div>
        </div>
      ),
      minWidth: '200px'
    },
    {
      name: 'Company',
      sortable: true,
      selector: row => row.company,
    },
    {
      name: 'Phone',
      sortable: true,
      selector: row => row.phone,
    },
    {
      name: 'Department',
      sortable: true,
      selector: row => row.department,
    },
    {
      name: 'Status',
      sortable: true,
      selector: row => row.status,
      cell: (row) => (
        <span className="badge badge-success d-inline-flex align-items-center badge-xs">
          <i className="ti ti-point-filled me-1"></i>{row.status}
        </span>
      ),
    },
    {
      name: 'City',
      sortable: true,
      selector: row => row.location,
    },
    {
      name: 'Created',
      sortable: true,
      selector: row => row.createdDate,
    },
    {
      name: 'Action',
      cell: (row) => (
        <div className="action-icon d-inline-flex">
          <Link to="#" className="me-2" data-bs-toggle="modal" data-bs-target="#edit_contact"><i className="ti ti-edit"></i></Link>
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
					title="Contacts"
					breadcrumbs={[
						{ label: 'Dashboard' },
						{ label: 'CRM & Sales' },
						{ label: viewMode === 'list' ? 'Contacts List' : 'Contacts Grid', active: true }
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
								<Link to="#" onClick={(e) => e.preventDefault()}
									className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
									data-bs-toggle="dropdown">
									<i className="ti ti-file-export me-1"></i>Export
								</Link>
								<ul className="dropdown-menu  dropdown-menu-end p-3">
									<li>
										<Link to="#" onClick={(e) => e.preventDefault()} className="dropdown-item rounded-1"><i
												className="ti ti-file-type-pdf me-1"></i>Export as PDF</Link>
									</li>
									<li>
										<Link to="#" onClick={(e) => e.preventDefault()} className="dropdown-item rounded-1"><i
												className="ti ti-file-type-xls me-1"></i>Export as Excel </Link>
									</li>
								</ul>
							</div>
						</div>
						<div className="mb-2">
							<a href="#" onClick={(e) => { e.preventDefault(); setIsContactModalOpen(true); }}
								className="btn btn-primary d-flex align-items-center"><i
									className="ti ti-circle-plus me-2"></i>Add Contact</a>
						</div>
					
				</PageHeader>
				{/* /Breadcrumb */}

				{/* Contact List */}
				<div className="card">
					
					<div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
						<h5>Contact List</h5>
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
							<div className="me-3 custom-select-wrapper" style={{ width: '140px' }}>
								<CustomSelect 
									options={[
										{ value: '', label: 'All Depts' },
										{ value: 'IT', label: 'IT' },
										{ value: 'Sales', label: 'Sales' },
										{ value: 'Marketing', label: 'Marketing' },
										{ value: 'HR', label: 'HR' },
										{ value: 'Finance', label: 'Finance' },
										{ value: 'Operations', label: 'Operations' }
									]}
									value={deptFilter ? { value: deptFilter, label: deptFilter } : { value: '', label: 'All Depts' }}
									onChange={(selected) => setDeptFilter(selected ? selected.value : '')}
								/>
							</div>
							<div className="me-3 custom-select-wrapper" style={{ width: '150px' }}>
								<CustomSelect 
									options={[
										{ value: '', label: 'All Companies' },
										{ value: 'Tech Corp', label: 'Tech Corp' },
										{ value: 'Marketing Inc', label: 'Marketing Inc' },
										{ value: 'Global Solutions', label: 'Global Solutions' }
									]}
									value={companyFilter ? { value: companyFilter, label: companyFilter } : { value: '', label: 'All Companies' }}
									onChange={(selected) => setCompanyFilter(selected ? selected.value : '')}
								/>
							</div>
							<div className="custom-select-wrapper" style={{ width: '130px' }}>
								<CustomSelect 
									options={[
										{ value: '', label: 'All Tags' },
										{ value: 'vip', label: 'vip' },
										{ value: 'urgent', label: 'urgent' },
										{ value: 'new', label: 'new' }
									]}
									value={tagFilter ? { value: tagFilter, label: tagFilter } : { value: '', label: 'All Tags' }}
									onChange={(selected) => setTagFilter(selected ? selected.value : '')}
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
								<CustomDataTable columns={columns} data={contactsData} />
							</div>
						) : (
							<div className="p-3">
								<ContactsKanbanView />
							</div>
						)}
					</div>
				</div>
				{/* /Contact List */}

			</div>

			<div className="footer d-sm-flex align-items-center justify-content-between border-top bg-white p-3">
				<p className="mb-0">2014 - 2026 &copy; SmartHR.</p>
				<p>Designed &amp; Developed By <Link to="#" onClick={(e) => e.preventDefault()} className="text-primary">Dreams</Link></p>
			</div>

		</div>
		<ContactFormModal open={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
    </>
  );
};

export default Contacts;
