import React, { useState } from 'react';
import { Link } from 'react-router-dom';import PageHeader from '../components/common/PageHeader';


const Domain = () => {
  // Pagination state for domain
  const [currentPage_domain, setCurrentPage_domain] = useState(1);
  const [rowsPerPage_domain, setRowsPerPage_domain] = useState(10);
  const [searchQuery_domain, setSearchQuery_domain] = useState('');
  return (
    <>
      <div className="page-wrapper">
			<div className="content">

				{/* Breadcrumb */}
				<PageHeader 
					title="Domain"
					breadcrumbs={[
						{ label: 'Dashboard' },
						{ label: 'Super Admin' },
						{ label: 'Domain List', active: true }
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
						<div className="ms-2 head-icons">
							<a href="#" onClick={(e) => e.preventDefault()} className="" data-bs-toggle="tooltip" data-bs-placement="top"
								data-bs-original-title="Collapse" id="collapse-header">
								<i className="ti ti-chevrons-up"></i>
							</a>
						</div>
				</PageHeader>
				{/* /Breadcrumb */}


				<div className="card">
					
					<div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
						<h5>Domain List</h5>
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
										<Link to="#" className="dropdown-item rounded-1">Monthly</Link>
									</li>
									<li>
										<Link to="#" className="dropdown-item rounded-1">Yearly</Link>
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
										<Link to="#" className="dropdown-item rounded-1">Approved</Link>
									</li>
									<li>
										<Link to="#" className="dropdown-item rounded-1">Pending</Link>
									</li>
									<li>
										<Link to="#" className="dropdown-item rounded-1">Rejected</Link>
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
											value={rowsPerPage_domain}
											onChange={(e) => { setRowsPerPage_domain(Number(e.target.value)); setCurrentPage_domain(1); }}
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
											value={searchQuery_domain}
											onChange={(e) => { setSearchQuery_domain(e.target.value); setCurrentPage_domain(1); }}
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
										<th>Name</th>
										<th>Domain URL</th>
										<th>Plan</th>
										<th>Created Date</th>
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
										<td>bwi.example.com</td>
										<td>Advanced (Monthly)</td>
										<td>12 Sep 2024</td>
										<td>
											<a href="#"
												className="badge badge-soft-success d-inline-flex align-items-center badge-xs">
												<i className="ti ti-checks me-1"></i>Approved
											</a>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#domain_approved"><i className="ti ti-eye"></i></a>
												<a href="#" onClick={(e) => e.preventDefault()} data-bs-toggle="modal"
													data-bs-target="#delete_modal"><i className="ti ti-trash"></i></a>
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
										<td>sd.example.com</td>
										<td>Basic (Yearly)</td>
										<td>24 Oct 2024</td>
										<td>
											<a href="#"
												className="badge badge-soft-skyblue d-inline-flex align-items-center badge-xs">
												<i className="ti ti-clock me-1"></i>Pending
											</a>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#domain_pending"><i className="ti ti-eye"></i></a>
												<a href="#" onClick={(e) => e.preventDefault()} data-bs-toggle="modal"
													data-bs-target="#delete_modal"><i className="ti ti-trash"></i></a>
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
										<td>qn.example.com</td>
										<td>Advanced (Monthly)</td>
										<td>18 Feb 2024</td>
										<td>
											<a href="#"
												className="badge badge-soft-danger d-inline-flex align-items-center badge-xs">
												<i className="ti ti-x me-1"></i>Rejected
											</a>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#domain_rejected"><i className="ti ti-eye"></i></a>
												<a href="#" onClick={(e) => e.preventDefault()} data-bs-toggle="modal"
													data-bs-target="#delete_modal"><i className="ti ti-trash"></i></a>
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
										<td>eve.example.com</td>
										<td>Advanced (Monthly)</td>
										<td>17 Oct 2024</td>
										<td>
											<a href="#"
												className="badge badge-soft-success d-inline-flex align-items-center badge-xs">
												<i className="ti ti-checks me-1"></i>Approved
											</a>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#domain_approved"><i className="ti ti-eye"></i></a>
												<a href="#" onClick={(e) => e.preventDefault()} data-bs-toggle="modal"
													data-bs-target="#delete_modal"><i className="ti ti-trash"></i></a>
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
										<td>at.example.com</td>
										<td>Enterprise (Monthly)</td>
										<td>20 Jul 2024</td>
										<td>
											<a href="#"
												className="badge badge-soft-success d-inline-flex align-items-center badge-xs">
												<i className="ti ti-checks me-1"></i>Approved
											</a>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#domain_approved"><i className="ti ti-eye"></i></a>
												<a href="#" onClick={(e) => e.preventDefault()} data-bs-toggle="modal"
													data-bs-target="#delete_modal"><i className="ti ti-trash"></i></a>
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
										<td>bsv.example.com</td>
										<td>Advanced (Monthly)</td>
										<td>10 Apr 2024</td>
										<td>
											<a href="#"
												className="badge badge-soft-skyblue d-inline-flex align-items-center badge-xs">
												<i className="ti ti-clock me-1"></i>Pending
											</a>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#domain_pending"><i className="ti ti-eye"></i></a>
												<a href="#" onClick={(e) => e.preventDefault()} data-bs-toggle="modal"
													data-bs-target="#delete_modal"><i className="ti ti-trash"></i></a>
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
										<td>tfe.example.com</td>
										<td>Enterprise (Yearly)</td>
										<td>29 Aug 2024</td>
										<td>
											<a href="#"
												className="badge badge-soft-success d-inline-flex align-items-center badge-xs">
												<i className="ti ti-checks me-1"></i>Approved
											</a>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#domain_approved"><i className="ti ti-eye"></i></a>
												<a href="#" onClick={(e) => e.preventDefault()} data-bs-toggle="modal"
													data-bs-target="#delete_modal"><i className="ti ti-trash"></i></a>
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
										<td>upd.example.com</td>
										<td>Basic (Monthly)</td>
										<td>22 Feb 2024</td>
										<td>
											<a href="#"
												className="badge badge-soft-danger d-inline-flex align-items-center badge-xs">
												<i className="ti ti-x me-1"></i>Rejected
											</a>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#domain_rejected"><i className="ti ti-eye"></i></a>
												<a href="#" onClick={(e) => e.preventDefault()} data-bs-toggle="modal"
													data-bs-target="#delete_modal"><i className="ti ti-trash"></i></a>
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
										<td>nn.example.com</td>
										<td>Basic (Yearly)</td>
										<td>03 Nov 2024</td>
										<td>
											<a href="#"
												className="badge badge-soft-success d-inline-flex align-items-center badge-xs">
												<i className="ti ti-checks me-1"></i>Approved
											</a>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#domain_approved"><i className="ti ti-eye"></i></a>
												<a href="#" onClick={(e) => e.preventDefault()} data-bs-toggle="modal"
													data-bs-target="#delete_modal"><i className="ti ti-trash"></i></a>
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
										<td>ed.example.com</td>
										<td>Advanced (Monthly)</td>
										<td>17 Dec 2024</td>
										<td>
											<a href="#"
												className="badge badge-soft-success d-inline-flex align-items-center badge-xs">
												<i className="ti ti-checks me-1"></i>Approved
											</a>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#domain_approved"><i className="ti ti-eye"></i></a>
												<a href="#" onClick={(e) => e.preventDefault()} data-bs-toggle="modal"
													data-bs-target="#delete_modal"><i className="ti ti-trash"></i></a>
											</div>
										</td>
									</tr>
								</tbody>
							</table>

								{/* Pagination Footer */}
								<div className="d-flex align-items-center justify-content-between flex-wrap row-gap-2 px-3 py-3 border-top">
									<p className="mb-0 text-gray-9 fs-14">
										Showing {Math.min((currentPage_domain - 1) * rowsPerPage_domain + 1, 11)}-{Math.min(currentPage_domain * rowsPerPage_domain, 11)} of 11 entries
									</p>
									<ul className="pagination mb-0">
										<li className={`page-item ${currentPage_domain === 1 ? 'disabled' : ''}`}>
											<button className="page-link" onClick={() => setCurrentPage_domain(p => Math.max(p - 1, 1))}>
												<i className="ti ti-chevron-left"></i>
											</button>
										</li>
										{[1, 2].map(page => (
											<li key={page} className={`page-item ${currentPage_domain === page ? 'active' : ''}`}>
												<button className="page-link" onClick={() => setCurrentPage_domain(page)}>{page}</button>
											</li>
										))}
										<li className={`page-item ${currentPage_domain === 2 ? 'disabled' : ''}`}>
											<button className="page-link" onClick={() => setCurrentPage_domain(p => Math.min(p + 1, 2))}>
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

export default Domain;
