import React, { useState } from 'react';
import { Link } from 'react-router-dom';import PageHeader from '../components/common/PageHeader';


const TenantUsageMetrics = () => {
  // Pagination state for tenantusagemetrics
  const [currentPage_tenantusagemetrics, setCurrentPage_tenantusagemetrics] = useState(1);
  const [rowsPerPage_tenantusagemetrics, setRowsPerPage_tenantusagemetrics] = useState(10);
  const [searchQuery_tenantusagemetrics, setSearchQuery_tenantusagemetrics] = useState('');
  return (
    <>
      <div className="page-wrapper">
			<div className="content">

				{/* Breadcrumb */}
				<PageHeader 
					title="Tenant Usage Metrics"
					breadcrumbs={[
						{ label: 'Dashboard' },
						{ label: 'Super Admin' },
						{ label: 'Tenant Usage Metrics', active: true }
					]}
				>
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
						<div className="head-icons">
							<a href="#" onClick={(e) => e.preventDefault()} className="" data-bs-toggle="tooltip" data-bs-placement="top"
								data-bs-original-title="Collapse" id="collapse-header">
								<i className="ti ti-chevrons-up"></i>
							</a>
						</div>
				</PageHeader>
				{/* /Breadcrumb */}

				<div className="card">
					
					<div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
						<h5>Tenants Usage List</h5>
						<div className="d-flex my-xl-auto right-content align-items-center flex-wrap row-gap-3">
							<div className="me-3">
								<div className="input-icon position-relative">
									<span className="input-icon-addon">
										<i className="ti ti-calendar text-gray-9"></i>
									</span>
									<input type="text" className="form-control date-range bookingrange"
										placeholder="dd/mm/yyyy - dd/mm/yyyy" />
								</div>
							</div>
							<div className="dropdown me-3">
								<Link to="#"
									className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
									data-bs-toggle="dropdown">
									Select Plan
								</Link>
								<ul className="dropdown-menu  dropdown-menu-end p-3">
									<li>
										<Link to="#" className="dropdown-item rounded-1">Advanced
											(Monthly)</Link>
									</li>
									<li>
										<Link to="#" className="dropdown-item rounded-1">Basic (Yearly)</Link>
									</li>
									<li>
										<Link to="#" className="dropdown-item rounded-1">Enterprise
											(Monthly)</Link>
									</li>
								</ul>
							</div>
							<div className="dropdown me-3">
								<Link to="#"
									className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
									data-bs-toggle="dropdown">
									Select Status
								</Link>
								<ul className="dropdown-menu  dropdown-menu-end p-3">
									<li>
										<Link to="#" className="dropdown-item rounded-1">Active</Link>
									</li>
									<li>
										<Link to="#" className="dropdown-item rounded-1">InActive</Link>
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
						
								{/* Pagination Toolbar */}
								<div className="d-flex align-items-center justify-content-between flex-wrap row-gap-2 mb-3 px-3 pt-3">
									<div className="d-flex align-items-center">
										<span className="me-2 text-gray-9 fs-14">Row Per Page</span>
										<select
											className="form-select form-select-sm w-auto"
											value={rowsPerPage_tenantusagemetrics}
											onChange={(e) => { setRowsPerPage_tenantusagemetrics(Number(e.target.value)); setCurrentPage_tenantusagemetrics(1); }}
										>
											<option value={10}>10</option>
											<option value={20}>20</option>
											<option value={50}>50</option>
										</select>
									</div>
									<div className="input-icon-start position-relative">
										<span className="input-icon-addon">
											<i className="ti ti-search"></i>
										</span>
										<input
											type="text"
											className="form-control form-control-sm"
											placeholder="Search"
											value={searchQuery_tenantusagemetrics}
											onChange={(e) => { setSearchQuery_tenantusagemetrics(e.target.value); setCurrentPage_tenantusagemetrics(1); }}
										/>
									</div>
								</div>
<div className="custom-datatable-filter table-responsive">
							<table className="table datatable">
								<thead className="thead-light">
									<tr>
										<th className="no-sort">
											<div className="form-check form-check-md">
												<input className="form-check-input" type="checkbox" id="select-all" />
											</div>
										</th>
										<th>Tenants</th>
										<th>Plan</th>
										<th>Active Users</th>
										<th>Most Module Usage</th>
										<th>Storage Usage</th>
										<th>Status</th>
										<th></th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>
											<div className="form-check form-check-md">
												<input className="form-check-input" type="checkbox" />
											</div>
										</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md border rounded-circle">
													<img src="/assets/img/company/company-01.svg" className="img-fluid"
														alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">BrightWave Innovations</a></h6>
												</div>
											</div>
										</td>
										<td>
											<div className="d-flex justify-content-between align-items-center gap-2">
												<span>Advanced (Monthly)</span>
												<span className="badge badge-purple">Upgrade</span>
											</div>
										</td>
										<td>82</td>
										<td>HRM, CRM</td>
										<td>12.4 GB</td>
										<td>
											<span className="badge badge-success d-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Active
											</span>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#view_details"><i className="ti ti-eye"></i></a>
												<a href="#" className="me-2"><i className="ti ti-refresh"></i></a>
												<a href="#" data-bs-toggle="modal" data-bs-target="#delete_modal"><i
														className="ti ti-ban"></i></a>
											</div>
										</td>
									</tr>
									<tr>
										<td>
											<div className="form-check form-check-md">
												<input className="form-check-input" type="checkbox" />
											</div>
										</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md border rounded-circle">
													<img src="/assets/img/company/company-02.svg" className="img-fluid"
														alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">Stellar Dynamics</a></h6>
												</div>
											</div>
										</td>
										<td>
											<div className="d-flex justify-content-between align-items-center gap-2">
												<span>Basic (Yearly)</span>
												<span className="badge badge-purple">Upgrade</span>
											</div>
										</td>
										<td>90</td>
										<td>Recruitment</td>
										<td>10.8 GB</td>
										<td>
											<span className="badge badge-success d-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Active
											</span>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#view_details"><i className="ti ti-eye"></i></a>
												<a href="#" className="me-2"><i className="ti ti-refresh"></i></a>
												<a href="#" data-bs-toggle="modal" data-bs-target="#delete_modal"><i
														className="ti ti-ban"></i></a>
											</div>
										</td>
									</tr>
									<tr>
										<td>
											<div className="form-check form-check-md">
												<input className="form-check-input" type="checkbox" />
											</div>
										</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md border rounded-circle">
													<img src="/assets/img/company/company-03.svg" className="img-fluid"
														alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">Quantum Nexus</a></h6>
												</div>
											</div>
										</td>
										<td>
											<div className="d-flex justify-content-between align-items-center gap-2">
												<span>Advanced (Monthly)</span>
												<span className="badge badge-purple">Upgrade</span>
											</div>
										</td>
										<td>104</td>
										<td>Finance & Accounts</td>
										<td>8.5 GB</td>
										<td>
											<span className="badge badge-success d-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Active
											</span>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#view_details"><i className="ti ti-eye"></i></a>
												<a href="#" className="me-2"><i className="ti ti-refresh"></i></a>
												<a href="#" data-bs-toggle="modal" data-bs-target="#delete_modal"><i
														className="ti ti-ban"></i></a>
											</div>
										</td>
									</tr>
									<tr>
										<td>
											<div className="form-check form-check-md">
												<input className="form-check-input" type="checkbox" />
											</div>
										</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md border rounded-circle">
													<img src="/assets/img/company/company-04.svg" className="img-fluid"
														alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">EcoVision Enterprises</a></h6>
												</div>
											</div>
										</td>
										<td>
											<div className="d-flex justify-content-between align-items-center gap-2">
												<span>Advanced (Monthly)</span>
												<span className="badge badge-purple">Upgrade</span>
											</div>
										</td>
										<td>80</td>
										<td>HRM</td>
										<td>6.0 GB</td>
										<td>
											<span className="badge badge-success d-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Active
											</span>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#view_details"><i className="ti ti-eye"></i></a>
												<a href="#" className="me-2"><i className="ti ti-refresh"></i></a>
												<a href="#" data-bs-toggle="modal" data-bs-target="#delete_modal"><i
														className="ti ti-ban"></i></a>
											</div>
										</td>
									</tr>
									<tr>
										<td>
											<div className="form-check form-check-md">
												<input className="form-check-input" type="checkbox" />
											</div>
										</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md border rounded-circle">
													<img src="/assets/img/company/company-05.svg" className="img-fluid"
														alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">Aurora Technologies</a></h6>
												</div>
											</div>
										</td>
										<td>
											<div className="d-flex justify-content-between align-items-center gap-2">
												<span>Enterprise (Monthly)</span>
												<span className="badge badge-purple">Upgrade</span>
											</div>
										</td>
										<td>120</td>
										<td>CRM</td>
										<td>15.2 GB</td>
										<td>
											<span className="badge badge-success d-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Active
											</span>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#view_details"><i className="ti ti-eye"></i></a>
												<a href="#" className="me-2"><i className="ti ti-refresh"></i></a>
												<a href="#" data-bs-toggle="modal" data-bs-target="#delete_modal"><i
														className="ti ti-ban"></i></a>
											</div>
										</td>
									</tr>
									<tr>
										<td>
											<div className="form-check form-check-md">
												<input className="form-check-input" type="checkbox" />
											</div>
										</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md border rounded-circle">
													<img src="/assets/img/company/company-06.svg" className="img-fluid"
														alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">BlueSky Ventures</a></h6>
												</div>
											</div>
										</td>
										<td>
											<div className="d-flex justify-content-between align-items-center gap-2">
												<span>Advanced (Monthly)</span>
												<span className="badge badge-purple">Upgrade</span>
											</div>
										</td>
										<td>100</td>
										<td>Finance & Accounts</td>
										<td>12.5 GB</td>
										<td>
											<span className="badge badge-success d-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Active
											</span>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#view_details"><i className="ti ti-eye"></i></a>
												<a href="#" className="me-2"><i className="ti ti-refresh"></i></a>
												<a href="#" data-bs-toggle="modal" data-bs-target="#delete_modal"><i
														className="ti ti-ban"></i></a>
											</div>
										</td>
									</tr>
									<tr>
										<td>
											<div className="form-check form-check-md">
												<input className="form-check-input" type="checkbox" />
											</div>
										</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md border rounded-circle">
													<img src="/assets/img/company/company-07.svg" className="img-fluid"
														alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">TerraFusion Energy</a></h6>
												</div>
											</div>
										</td>
										<td>
											<div className="d-flex justify-content-between align-items-center gap-2">
												<span>Enterprise (Yearly)</span>
												<span className="badge badge-purple">Upgrade</span>
											</div>
										</td>
										<td>110</td>
										<td>HRM, Recruitment</td>
										<td>10.7 GB</td>
										<td>
											<span className="badge badge-success d-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Active
											</span>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#view_details"><i className="ti ti-eye"></i></a>
												<a href="#" className="me-2"><i className="ti ti-refresh"></i></a>
												<a href="#" data-bs-toggle="modal" data-bs-target="#delete_modal"><i
														className="ti ti-ban"></i></a>
											</div>
										</td>
									</tr>
									<tr>
										<td>
											<div className="form-check form-check-md">
												<input className="form-check-input" type="checkbox" />
											</div>
										</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md border rounded-circle">
													<img src="/assets/img/company/company-08.svg" className="img-fluid"
														alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">UrbanPulse Design</a></h6>
												</div>
											</div>
										</td>
										<td>
											<div className="d-flex justify-content-between align-items-center gap-2">
												<span>Basic (Monthly)</span>
												<span className="badge badge-purple">Upgrade</span>
											</div>
										</td>
										<td>125</td>
										<td>Recruitment</td>
										<td>9.4 GB</td>
										<td>
											<span className="badge badge-danger d-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Inactive
											</span>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#view_details"><i className="ti ti-eye"></i></a>
												<a href="#" className="me-2"><i className="ti ti-refresh"></i></a>
												<a href="#" data-bs-toggle="modal" data-bs-target="#delete_modal"><i
														className="ti ti-ban"></i></a>
											</div>
										</td>
									</tr>
									<tr>
										<td>
											<div className="form-check form-check-md">
												<input className="form-check-input" type="checkbox" />
											</div>
										</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md border rounded-circle">
													<img src="/assets/img/company/company-09.svg" className="img-fluid"
														alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">Nimbus Networks</a></h6>
												</div>
											</div>
										</td>
										<td>
											<div className="d-flex justify-content-between align-items-center gap-2">
												<span>Basic (Yearly)</span>
												<span className="badge badge-purple">Upgrade</span>
											</div>
										</td>
										<td>115</td>
										<td>HRM, CRM</td>
										<td>8.2 GB</td>
										<td>
											<span className="badge badge-success d-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Active
											</span>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#view_details"><i className="ti ti-eye"></i></a>
												<a href="#" className="me-2"><i className="ti ti-refresh"></i></a>
												<a href="#" data-bs-toggle="modal" data-bs-target="#delete_modal"><i
														className="ti ti-ban"></i></a>
											</div>
										</td>
									</tr>
									<tr>
										<td>
											<div className="form-check form-check-md">
												<input className="form-check-input" type="checkbox" />
											</div>
										</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md border rounded-circle">
													<img src="/assets/img/company/company-10.svg" className="img-fluid"
														alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">Epicurean Delights</a></h6>
												</div>
											</div>
										</td>
										<td>
											<div className="d-flex justify-content-between align-items-center gap-2">
												<span>Advanced (Monthly)</span>
												<span className="badge badge-purple">Upgrade</span>
											</div>
										</td>
										<td>85</td>
										<td>Finance & Accounts</td>
										<td>7.5 GB</td>
										<td>
											<span className="badge badge-success dlign-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Active
											</span>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#view_details"><i className="ti ti-eye"></i></a>
												<a href="#" className="me-2"><i className="ti ti-refresh"></i></a>
												<a href="#" data-bs-toggle="modal" data-bs-target="#delete_modal"><i
														className="ti ti-ban"></i></a>
											</div>
										</td>
									</tr>
								</tbody>
							</table>

								{/* Pagination Footer */}
								<div className="d-flex align-items-center justify-content-between flex-wrap row-gap-2 px-3 py-3 border-top">
									<p className="mb-0 text-gray-9 fs-14">
										Showing {Math.min((currentPage_tenantusagemetrics - 1) * rowsPerPage_tenantusagemetrics + 1, 11)}-{Math.min(currentPage_tenantusagemetrics * rowsPerPage_tenantusagemetrics, 11)} of 11 entries
									</p>
									<ul className="pagination mb-0">
										<li className={`page-item ${currentPage_tenantusagemetrics === 1 ? 'disabled' : ''}`}>
											<button className="page-link" onClick={() => setCurrentPage_tenantusagemetrics(p => Math.max(p - 1, 1))}>
												<i className="ti ti-chevron-left"></i>
											</button>
										</li>
										{[1, 2].map(page => (
											<li key={page} className={`page-item ${currentPage_tenantusagemetrics === page ? 'active' : ''}`}>
												<button className="page-link" onClick={() => setCurrentPage_tenantusagemetrics(page)}>{page}</button>
											</li>
										))}
										<li className={`page-item ${currentPage_tenantusagemetrics === 2 ? 'disabled' : ''}`}>
											<button className="page-link" onClick={() => setCurrentPage_tenantusagemetrics(p => Math.min(p + 1, 2))}>
												<i className="ti ti-chevron-right"></i>
											</button>
										</li>
									</ul>
								</div>
						</div>
					</div>
				</div>
			</div>

			<div className="footer d-sm-flex align-items-center justify-content-between border-top bg-white p-3">
				<p className="mb-0">2014 - 2026 &copy; SmartHR.</p>
				<p>Designed &amp; Developed By <a href="#" onClick={(e) => e.preventDefault()} className="text-primary">Dreams</a></p>
			</div>

		</div>
		
    </>
  );
};

export default TenantUsageMetrics;
