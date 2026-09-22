import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/common/PageHeader';
import LeadFormModal from '../components/leads/LeadFormModal';
import LeadsKanbanView from '../components/leads/LeadsKanbanView';
import CustomDataTable from '../components/common/CustomDataTable';
import { leadsData } from './leadsData';
import CustomDatePicker from '../components/common/CustomDatePicker';
import ConfirmationModal from '../components/ConfirmationModal';

const Leads = () => {
  const [viewMode, setViewMode] = useState('list');
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  
  const columns = [
    {
      name: 'Lead name',
      sortable: true,
      selector: row => row.name,
      cell: (row) => (
        <h6 className="fs-14 fw-medium"><Link to="/leads-details">{row.name}</Link></h6>
      ),
    },
    {
      name: 'Company name ',
      sortable: true,
      selector: row => row.companyName,
      cell: (row) => (
        <div className="d-flex align-items-center file-name-icon">
          <Link to="/company-details" className="avatar avatar-md border avatar-rounded">
            <img src={row.companyAvatar} className="img-fluid" alt="img" />
          </Link>
          <div className="ms-2">
            <h6 className="fw-normal fs-14 text-gray-5"><Link to="/company-details">{row.companyName}</Link></h6>
          </div>
        </div>
      ),
    },
    {
      name: 'Source',
      sortable: true,
      selector: row => row.source,
    },
    {
      name: 'Status',
      sortable: true,
      selector: row => row.tags,
      cell: (row) => (
        <span className={`badge ${row.badgeClass}`}>{row.tags}</span>
      ),
    },
    {
      name: 'Value',
      sortable: true,
      selector: row => row.value,
    },
    {
      name: 'Assigned To',
      sortable: true,
      selector: row => row.owner,
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
          <Link to="#" className="me-2" data-bs-toggle="modal" data-bs-target="#edit_leads"><i className="ti ti-edit"></i></Link>
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
					title="Leads"
					breadcrumbs={[
						{ label: 'Dashboard' },
						{ label: 'CRM & Sales' },
						{ label: viewMode === 'list' ? 'Leads List' : 'Leads Grid', active: true }
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
							<a href="#" onClick={(e) => e.preventDefault()} className="btn btn-white d-inline-flex align-items-center">
								<i className="ti ti-file-import me-1"></i>Import
							</a>
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
							<a href="#" onClick={(e) => { e.preventDefault(); setIsLeadModalOpen(true); }}
								className="btn btn-primary d-flex align-items-center"><i
									className="ti ti-circle-plus me-2"></i>Add Lead</a>
						</div>
						
				</PageHeader>
				{/* /Breadcrumb */}

				<div className="row">
					<div className="col-xl-3 col-md-6">
						<div className="card position-relative">
							<div className="card-body">
								<div className="d-flex align-items-center mb-3">
									<div className="avatar avatar-md br-10 icon-rotate bg-primary flex-shrink-0">
										<span className="d-flex align-items-center"><i
												className="ti ti-delta text-white fs-16"></i></span>
									</div>
									<div className="ms-3">
										<p className="fw-medium text-truncate mb-1">Total No of Leads</p>
										<h5>6000</h5>
									</div>
								</div>
								<div className="progress progress-xs mb-2">
									<div className="progress-bar bg-primary" role="progressbar" style={{width: '40%'}}></div>
								</div>
								<p className="fw-medium fs-13 mb-0"><span className="text-danger fs-12"><i
											className="ti ti-arrow-wave-right-up me-1"></i>-4.01% </span> from last week</p>
							</div>
						</div>
					</div>
					<div className="col-xl-3 col-md-6">
						<div className="card position-relative">
							<div className="card-body">
								<div className="d-flex align-items-center mb-3">
									<div className="avatar avatar-md br-10 icon-rotate bg-secondary flex-shrink-0">
										<span className="d-flex align-items-center"><i
												className="ti ti-currency text-white fs-16"></i></span>
									</div>
									<div className="ms-3">
										<p className="fw-medium text-truncate mb-1">No of New Leads</p>
										<h5>120</h5>
									</div>
								</div>
								<div className="progress progress-xs mb-2">
									<div className="progress-bar bg-secondary" role="progressbar" style={{width: '40%'}}></div>
								</div>
								<p className="fw-medium fs-13 mb-0"><span className="text-success fs-12"><i
											className="ti ti-arrow-wave-right-up me-1"></i>+20.01% </span> from last week
								</p>
							</div>
						</div>
					</div>
					<div className="col-xl-3 col-md-6">
						<div className="card position-relative">
							<div className="card-body">
								<div className="d-flex align-items-center mb-3">
									<div className="avatar avatar-md br-10 icon-rotate bg-danger flex-shrink-0">
										<span className="d-flex align-items-center"><i
												className="ti ti-stairs-up text-white fs-16"></i></span>
									</div>
									<div className="ms-3">
										<p className="fw-medium text-truncate mb-1">No of Lost Leads</p>
										<h5>30</h5>
									</div>
								</div>
								<div className="progress progress-xs mb-2">
									<div className="progress-bar bg-pink" role="progressbar" style={{width: '40%'}}></div>
								</div>
								<p className="fw-medium fs-13 mb-0"><span className="text-success fs-12"><i
											className="ti ti-arrow-wave-right-up me-1"></i>+55% </span> from last week</p>
							</div>
						</div>
					</div>
					<div className="col-xl-3 col-md-6">
						<div className="card position-relative">
							<div className="card-body">
								<div className="d-flex align-items-center mb-3">
									<div className="avatar avatar-md br-10 icon-rotate bg-purple flex-shrink-0">
										<span className="d-flex align-items-center"><i
												className="ti ti-users-group text-white fs-16"></i></span>
									</div>
									<div className="ms-3">
										<p className="fw-medium text-truncate mb-1">No of Total Customers</p>
										<h5>9895</h5>
									</div>
								</div>
								<div className="progress progress-xs mb-2">
									<div className="progress-bar bg-purple" role="progressbar" style={{width: '40%'}}></div>
								</div>
								<p className="fw-medium fs-13 mb-0"><span className="text-success fs-12"><i
											className="ti ti-arrow-wave-right-up me-1"></i>+55% </span> from last week</p>
							</div>
						</div>
					</div>
				</div>

				{/* Leads List */}
				<div className="row position-relative">
					<style>
					{`
						.sidebar-item {
							transition: background-color 0.2s ease, color 0.2s ease;
						}
						.sidebar-item:hover {
							background-color: var(--primary-transparent) !important;
							color: var(--primary) !important;
						}
						.sidebar-scroll {
							overflow-y: auto;
							-ms-overflow-style: none;  /* IE and Edge */
							scrollbar-width: none;  /* Firefox */
							height: 100%;
						}
						.sidebar-scroll::-webkit-scrollbar {
							display: none; /* Chrome, Safari and Opera */
						}
						.sidebar-wrapper {
							padding-right: 12px;
							padding-left: 12px;
						}
						@media (max-width: 1199.98px) {
							.sidebar-wrapper {
								position: relative !important;
								height: auto !important;
								margin-bottom: 24px;
							}
						}
					`}
					</style>
					<div className="col-xl-2 d-none d-xl-block"></div>
					<div className="col-xl-2 position-absolute h-100 start-0 top-0 sidebar-wrapper pb-xl-4">
						<div className="card h-100 mb-0">
							<div className="card-body p-3 sidebar-scroll">
								<h6 className="fw-semibold text-muted mb-3 text-uppercase fs-12" style={{ letterSpacing: '0.5px' }}>Lead Statuses</h6>
								<ul className="list-unstyled mb-3">
									<li className="mb-2"><a href="#" onClick={(e) => e.preventDefault()} className="sidebar-item d-flex align-items-center justify-content-between rounded p-2 fw-medium bg-primary-transparent text-primary">All <span className="badge bg-primary text-white rounded-pill">16</span></a></li>
									<li className="mb-2"><a href="#" onClick={(e) => e.preventDefault()} className="sidebar-item d-flex align-items-center justify-content-between text-dark rounded p-2 fw-medium">New <span className="badge bg-light text-muted rounded-pill border">4</span></a></li>
									<li className="mb-2"><a href="#" onClick={(e) => e.preventDefault()} className="sidebar-item d-flex align-items-center justify-content-between text-dark rounded p-2 fw-medium">Contacted <span className="badge bg-light text-muted rounded-pill border">2</span></a></li>
									<li className="mb-2"><a href="#" onClick={(e) => e.preventDefault()} className="sidebar-item d-flex align-items-center justify-content-between text-dark rounded p-2 fw-medium">Qualified <span className="badge bg-light text-muted rounded-pill border">1</span></a></li>
									<li className="mb-2"><a href="#" onClick={(e) => e.preventDefault()} className="sidebar-item d-flex align-items-center justify-content-between text-dark rounded p-2 fw-medium">Negotiation <span className="badge bg-light text-muted rounded-pill border">1</span></a></li>
									<li className="mb-2"><a href="#" onClick={(e) => e.preventDefault()} className="sidebar-item d-flex align-items-center justify-content-between text-dark rounded p-2 fw-medium">Won <span className="badge bg-light text-muted rounded-pill border">6</span></a></li>
									<li className="mb-0"><a href="#" onClick={(e) => e.preventDefault()} className="sidebar-item d-flex align-items-center justify-content-between text-dark rounded p-2 fw-medium">Lost <span className="badge bg-light text-muted rounded-pill border">2</span></a></li>
								</ul>

								<hr className="my-3 border-dark" />

								<h6 className="fw-semibold text-muted mb-3 text-uppercase fs-12" style={{ letterSpacing: '0.5px' }}>Sources</h6>
								<ul className="list-unstyled mb-3">
									<li className="mb-2"><a href="#" onClick={(e) => e.preventDefault()} className="sidebar-item d-flex align-items-center justify-content-between rounded p-2 fw-medium bg-primary-transparent text-primary">All <span className="badge bg-primary text-white rounded-pill">16</span></a></li>
									<li className="mb-2"><a href="#" onClick={(e) => e.preventDefault()} className="sidebar-item d-flex align-items-center justify-content-between text-dark rounded p-2 fw-medium">Google ads <span className="badge bg-light text-muted rounded-pill border">4</span></a></li>
									<li className="mb-2"><a href="#" onClick={(e) => e.preventDefault()} className="sidebar-item d-flex align-items-center justify-content-between text-dark rounded p-2 fw-medium">Linkedin <span className="badge bg-light text-muted rounded-pill border">2</span></a></li>
									<li className="mb-2"><a href="#" onClick={(e) => e.preventDefault()} className="sidebar-item d-flex align-items-center justify-content-between text-dark rounded p-2 fw-medium">Website <span className="badge bg-light text-muted rounded-pill border">6</span></a></li>
									<li className="mb-2"><a href="#" onClick={(e) => e.preventDefault()} className="sidebar-item d-flex align-items-center justify-content-between text-dark rounded p-2 fw-medium">Referral <span className="badge bg-light text-muted rounded-pill border">3</span></a></li>
									<li className="mb-0"><a href="#" onClick={(e) => e.preventDefault()} className="sidebar-item d-flex align-items-center justify-content-between text-dark rounded p-2 fw-medium">Whatsapp <span className="badge bg-light text-muted rounded-pill border">1</span></a></li>
								</ul>

								<hr className="my-3 border-dark" />

								<h6 className="fw-semibold text-muted mb-3 text-uppercase fs-12" style={{ letterSpacing: '0.5px' }}>Lead Tags</h6>
								<ul className="list-unstyled mb-0">
									<li className="mb-2"><a href="#" onClick={(e) => e.preventDefault()} className="sidebar-item d-flex align-items-center justify-content-between rounded p-2 fw-medium bg-primary-transparent text-primary">All <span className="badge bg-primary text-white rounded-pill">16</span></a></li>
									<li className="mb-2"><a href="#" onClick={(e) => e.preventDefault()} className="sidebar-item d-flex align-items-center justify-content-between text-dark rounded p-2 fw-medium">IT <span className="badge bg-light text-muted rounded-pill border">2</span></a></li>
									<li className="mb-2"><a href="#" onClick={(e) => e.preventDefault()} className="sidebar-item d-flex align-items-center justify-content-between text-dark rounded p-2 fw-medium">vip <span className="badge bg-light text-muted rounded-pill border">5</span></a></li>
									<li className="mb-2"><a href="#" onClick={(e) => e.preventDefault()} className="sidebar-item d-flex align-items-center justify-content-between text-dark rounded p-2 fw-medium">urgent <span className="badge bg-light text-muted rounded-pill border">5</span></a></li>
									<li className="mb-0"><a href="#" onClick={(e) => e.preventDefault()} className="sidebar-item d-flex align-items-center justify-content-between text-dark rounded p-2 fw-medium">warm <span className="badge bg-light text-muted rounded-pill border">3</span></a></li>
								</ul>
							</div>
						</div>
					</div>
					
					<div className="col-xl-10 d-flex flex-column">
						<div className="card flex-fill">
					
					<div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
						<h5>Leads List</h5>
						<div className="d-flex my-xl-auto right-content align-items-center flex-wrap row-gap-3">
							<div className="me-3">
								<CustomDatePicker 
									isRange={true} 
									placeholderText="" 
								/>
							</div>
							<div className="dropdown me-3">
								<Link to="#"
									className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
									data-bs-toggle="dropdown">
									Tags
								</Link>
								<ul className="dropdown-menu  dropdown-menu-end p-3">
									<li>
										<Link to="#" className="dropdown-item rounded-1">Closed</Link>
									</li>
									<li>
										<Link to="#" className="dropdown-item rounded-1">Contacted</Link>
									</li>
									<li>
										<Link to="#" className="dropdown-item rounded-1">Lost</Link>
									</li>
									<li>
										<Link to="#" className="dropdown-item rounded-1">Not Contacted</Link>
									</li>
								</ul>
							</div>
							<div className="dropdown">
								<Link to="#"
									className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
									data-bs-toggle="dropdown">
									Sort By : Last 7 Days
								</Link>
								<ul className="dropdown-menu  dropdown-menu-end p-3">
									<li>
										<Link to="#" className="dropdown-item rounded-1">Recently Added</Link>
									</li>
									<li>
										<Link to="#" className="dropdown-item rounded-1">Ascending</Link>
									</li>
									<li>
										<Link to="#" className="dropdown-item rounded-1">Descending</Link>
									</li>
									<li>
										<Link to="#" className="dropdown-item rounded-1">Last Month</Link>
									</li>
									<li>
										<Link to="#" className="dropdown-item rounded-1">Last 7 Days</Link>
									</li>
								</ul>
							</div>
						</div>
					</div>
							<div className="card-body p-0">
								{viewMode === 'list' ? (
									<div className="custom-datatable-filter table-responsive">
										<CustomDataTable columns={columns} data={leadsData} />
									</div>
								) : (
									<div className="p-3">
										<LeadsKanbanView />
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
				
				{/* /Leads List */}

			</div>

			<div className="footer d-sm-flex align-items-center justify-content-between border-top bg-white p-3">
				<p className="mb-0">2014 - 2026 &copy; SmartHR.</p>
				<p>Designed &amp; Developed By <a href="#" onClick={(e) => e.preventDefault()} className="text-primary">Dreams</a></p>
			</div>
</div>
	
		<LeadFormModal open={isLeadModalOpen} onClose={() => setIsLeadModalOpen(false)} />
		<ConfirmationModal id="delete_modal" onConfirm={() => console.log('Lead deleted!')} />
    </>
  );
};

export default Leads;
