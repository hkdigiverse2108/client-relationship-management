import React, { useState } from 'react';
import { Link } from 'react-router-dom';import PageHeader from '../components/common/PageHeader';


const TicketReports = () => {
  // Pagination state for ticketreports
  const [currentPage_ticketreports, setCurrentPage_ticketreports] = useState(1);
  const [rowsPerPage_ticketreports, setRowsPerPage_ticketreports] = useState(10);
  const [searchQuery_ticketreports, setSearchQuery_ticketreports] = useState('');
  return (
    <>
      <div className="page-wrapper">
			<div className="content">

				{/* Breadcrumb */}
				<PageHeader 
					title="Ticket Report"
					breadcrumbs={[
						{ label: 'Dashboard' },
						{ label: 'Tickets' },
						{ label: 'Ticket Report', active: true }
					]}
				>
					<div className="mb-2">
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
						<div className="head-icons ms-2">
							<a href="#" onClick={(e) => e.preventDefault()} className="" data-bs-toggle="tooltip" data-bs-placement="top"
								data-bs-original-title="Collapse" id="collapse-header">
								<i className="ti ti-chevrons-up"></i>
							</a>
						</div>
				</PageHeader>
				{/* /Breadcrumb */}

				<div className="row">

					{/* Total Exponses */}
					<div className="col-lg-6 col-md-6 d-flex">
						<div className="row flex-fill">
							<div className="col-lg-4 col-md-6 d-flex">
								<div className="ticket-report-card flex-fill d-flex">
									<div className="card-content flex-fill">
										<div>
											<div className="mb-2">
												<span className="fs-14 fw-normal text-truncate text-body mb-1">Total
													Projects</span>
												<h5>240</h5>
											</div>
										</div>
										<div className="d-flex mt-2">
											<span className="badge badge-success-transparent"><i
													className="ti ti-arrow-wave-right-up me-1"></i>+5.50%</span>
										</div>
									</div>
									<div className="ticket-report-card-icon">
										<i className="ti ti-ticket"></i>
									</div>
								</div>
							</div>
							<div className="col-lg-4 col-md-6 d-flex">
								<div className="ticket-report-card flex-fill d-flex">
									<div className="card-content flex-fill">
										<div>
											<div className="mb-2">
												<span className="fs-14 fw-normal text-truncate text-body mb-1">Open
													Tickets</span>
												<h5>35</h5>
											</div>
										</div>
										<div className="d-flex mt-2">
											<span className="badge badge-success-transparent"><i
													className="ti ti-arrow-wave-right-up me-1"></i>+2.10%</span>
										</div>
									</div>
									<div className="ticket-report-card-icon">
										<i className="ti ti-clock-hour-3"></i>
									</div>
								</div>
							</div>
							<div className="col-lg-4 col-md-6 d-flex">
								<div className="ticket-report-card flex-fill d-flex">
									<div className="card-content flex-fill">
										<div>
											<div className="mb-2">
												<span className="fs-14 fw-normal text-truncate text-body mb-1"> Pending
													Tickets</span>
												<h5>15</h5>
											</div>
										</div>
										<div className="d-flex mt-2">
											<span className="badge badge-danger-transparent"><i
													className="ti ti-arrow-wave-right-up me-1"></i>+3.40%</span>
										</div>
									</div>
									<div className="ticket-report-card-icon">
										<i className="ti ti-hourglass-empty"></i>
									</div>
								</div>
							</div>
							<div className="col-lg-4 col-md-6 d-flex">
								<div className="ticket-report-card flex-fill d-flex">
									<div className="card-content flex-fill">
										<div>
											<div className="mb-2">
												<span className="fs-14 fw-normal text-truncate text-body mb-1">Resolved
													Tickets</span>
												<h5>170</h5>
											</div>
										</div>
										<div className="d-flex mt-2">
											<span className="badge badge-success-transparent"><i
													className="ti ti-arrow-wave-right-up me-1"></i>+4.30%</span>
										</div>
									</div>
									<div className="ticket-report-card-icon">
										<i className="ti ti-checklist"></i>
									</div>
								</div>
							</div>
							<div className="col-lg-4 col-md-6 d-flex">
								<div className="ticket-report-card flex-fill d-flex">
									<div className="card-content flex-fill">
										<div>
											<div className="mb-2">
												<span className="fs-14 fw-normal text-truncate text-body mb-1">SLA
													Breached</span>
												<h5>08</h5>
											</div>
										</div>
										<div className="d-flex mt-2">
											<span className="badge badge-success-transparent"><i
													className="ti ti-arrow-wave-right-up me-1"></i>+1.20%</span>
										</div>
									</div>
									<div className="ticket-report-card-icon">
										<i className="ti ti-alert-triangle"></i>
									</div>
								</div>
							</div>
							<div className="col-lg-4 col-md-6 d-flex">
								<div className="ticket-report-card flex-fill d-flex">
									<div className="card-content flex-fill">
										<div>
											<div className="mb-2">
												<span className="fs-14 fw-normal text-truncate text-body mb-1">Tickets
													Escalated</span>
												<h5>12</h5>
											</div>
										</div>
										<div className="d-flex mt-2">
											<span className="badge badge-danger-transparent"><i
													className="ti ti-arrow-wave-right-up me-1"></i>+2.70%</span>
										</div>
									</div>
									<div className="ticket-report-card-icon">
										<i className="ti ti-user-share"></i>
									</div>
								</div>
							</div>
						</div>

					</div>
					{/* /Total Exponses */}

					{/* Total Exponses */}
					<div className="col-lg-6 col-md-6 d-flex">
						<div className="card flex-fill">
							
							<div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
						<h5>Ticket List</h5>
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
									Select Tenant
								</Link>
								<ul className="dropdown-menu  dropdown-menu-end p-3">
									<li>
										<Link to="#" className="dropdown-item rounded-1">BrightWave
											Innovations</Link>
									</li>
									<li>
										<Link to="#" className="dropdown-item rounded-1">Stellar
											Dynamics</Link>
									</li>
									<li>
										<Link to="#" className="dropdown-item rounded-1">Quantum Nexus</Link>
									</li>
								</ul>
							</div>
							<div className="dropdown me-3">
								<Link to="#"
									className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
									data-bs-toggle="dropdown">
									Select Priority
								</Link>
								<ul className="dropdown-menu  dropdown-menu-end p-3">
									<li>
										<Link to="#" className="dropdown-item rounded-1">Low</Link>
									</li>
									<li>
										<Link to="#" className="dropdown-item rounded-1">Medium</Link>
									</li>
									<li>
										<Link to="#" className="dropdown-item rounded-1">High</Link>
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
										<Link to="#" className="dropdown-item rounded-1">Inactive</Link>
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
								<div id="ticket-report"></div>
							</div>
						</div>
					</div>
					{/* /Total Exponses */}


				</div>

				<div className="card">
					
					<div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
						<h5>Ticket List</h5>
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
									Select Tenant
								</Link>
								<ul className="dropdown-menu  dropdown-menu-end p-3">
									<li>
										<Link to="#" className="dropdown-item rounded-1">BrightWave
											Innovations</Link>
									</li>
									<li>
										<Link to="#" className="dropdown-item rounded-1">Stellar
											Dynamics</Link>
									</li>
									<li>
										<Link to="#" className="dropdown-item rounded-1">Quantum Nexus</Link>
									</li>
								</ul>
							</div>
							<div className="dropdown me-3">
								<Link to="#"
									className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
									data-bs-toggle="dropdown">
									Select Priority
								</Link>
								<ul className="dropdown-menu  dropdown-menu-end p-3">
									<li>
										<Link to="#" className="dropdown-item rounded-1">Low</Link>
									</li>
									<li>
										<Link to="#" className="dropdown-item rounded-1">Medium</Link>
									</li>
									<li>
										<Link to="#" className="dropdown-item rounded-1">High</Link>
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
										<Link to="#" className="dropdown-item rounded-1">Inactive</Link>
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
											value={rowsPerPage_ticketreports}
											onChange={(e) => { setRowsPerPage_ticketreports(Number(e.target.value)); setCurrentPage_ticketreports(1); }}
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
											value={searchQuery_ticketreports}
											onChange={(e) => { setSearchQuery_ticketreports(e.target.value); setCurrentPage_ticketreports(1); }}
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
										<th>Ticket ID</th>
										<th>Description</th>
										<th>Priority</th>
										<th>Tenants</th>
										<th>Date</th>
										<th>Assignee</th>
										<th>Status</th>
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
											<a href="#">#TIC016</a>
										</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<h6 className="fw-medium"><a href="#">Login not working</a></h6>
											</div>
										</td>
										<td>
											<span className="badge border border-pink text-pink"><i
													className="ti ti-point-filled me-1"></i>Critical</span>
										</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/company/company-01.svg" className="img-fluid"
														alt="img" />
												</a>
												<div className="ms-2">
													<a className="fw-medium fs-14">BrightWave Innovations</a>
												</div>
											</div>
										</td>
										<td>
											15 Dec 2025
										</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/users/user-01.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<a className="fw-medium fs-14">William Parsons</a>
												</div>
											</div>
										</td>
										<td>
											<span className="badge badge-success d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Closed
											</span>
										</td>
									</tr>
									<tr>
										<td>
											<div className="form-check form-check-md">
												<input className="form-check-input" type="checkbox" />
											</div>
										</td>
										<td>
											<a href="#">#TIC015</a>
										</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<h6 className="fw-medium"><a href="#">HR module not loading</a></h6>
											</div>
										</td>
										<td>
											<span className="badge border border-danger text-danger"><i
													className="ti ti-point-filled me-1"></i>High</span>
										</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/company/company-02.svg" className="img-fluid"
														alt="img" />
												</a>
												<div className="ms-2">
													<a className="fw-medium fs-14">Stellar Dynamics</a>
												</div>
											</div>
										</td>
										<td>
											10 Dec 2025
										</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/users/user-02.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<a className="fw-medium fs-14">Lucille Tomberlin</a>
												</div>
											</div>
										</td>
										<td>
											<span className="badge badge-purple d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Open
											</span>
										</td>
									</tr>
									<tr>
										<td>
											<div className="form-check form-check-md">
												<input className="form-check-input" type="checkbox" />
											</div>
										</td>
										<td>
											<a href="#">#TIC014</a>
										</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<h6 className="fw-medium"><a href="#">Billing amount incorrect</a></h6>
											</div>
										</td>
										<td>
											<span className="badge border border-warning text-warning"><i
													className="ti ti-point-filled me-1"></i>Medium</span>
										</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/company/company-03.svg" className="img-fluid"
														alt="img" />
												</a>
												<div className="ms-2">
													<a className="fw-medium fs-14">Quantum Nexus</a>
												</div>
											</div>
										</td>
										<td>
											08 Dec 2025
										</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/users/user-03.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<a className="fw-medium fs-14">Frederick Johnson</a>
												</div>
											</div>
										</td>
										<td>
											<span className="badge badge-success d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Closed
											</span>
										</td>
									</tr>
									<tr>
										<td>
											<div className="form-check form-check-md">
												<input className="form-check-input" type="checkbox" />
											</div>
										</td>
										<td>
											<a href="#">#TIC-013</a>
										</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<h6 className="fw-medium"><a href="#">Session Expiring Quickly</a></h6>
											</div>
										</td>
										<td>
											<span className="badge border border-danger text-danger"><i
													className="ti ti-point-filled me-1"></i>High</span>
										</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/company/company-04.svg" className="img-fluid"
														alt="img" />
												</a>
												<div className="ms-2">
													<a className="fw-medium fs-14">EcoVision Enterprises</a>
												</div>
											</div>
										</td>
										<td>
											01 Dec 2025
										</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/users/user-04.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<a className="fw-medium fs-14">Sarah Henry</a>
												</div>
											</div>
										</td>
										<td>
											<span className="badge badge-info d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Pending
											</span>
										</td>
									</tr>
									<tr>
										<td>
											<div className="form-check form-check-md">
												<input className="form-check-input" type="checkbox" />
											</div>
										</td>
										<td>
											<a href="#">#TIC012</a>
										</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<h6 className="fw-medium"><a href="#">Unable to access dashboard</a></h6>
											</div>
										</td>
										<td>
											<span className="badge border border-pink text-pink"><i
													className="ti ti-point-filled me-1"></i>Critical</span>
										</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/company/company-05.svg" className="img-fluid"
														alt="img" />
												</a>
												<div className="ms-2">
													<a className="fw-medium fs-14">Aurora Technologies</a>
												</div>
											</div>
										</td>
										<td>
											26 Nov 2025
										</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/users/user-05.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<a className="fw-medium fs-14">Thomas Miller</a>
												</div>
											</div>
										</td>
										<td>
											<span className="badge badge-purple d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Open
											</span>
										</td>
									</tr>
									<tr>
										<td>
											<div className="form-check form-check-md">
												<input className="form-check-input" type="checkbox" />
											</div>
										</td>
										<td>
											<a href="#">#TIC011</a>
										</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<h6 className="fw-medium"><a href="#">Data Sync Issue</a></h6>
											</div>
										</td>
										<td>
											<span className="badge border border-danger text-danger"><i
													className="ti ti-point-filled me-1"></i>High</span>
										</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/company/company-06.svg" className="img-fluid"
														alt="img" />
												</a>
												<div className="ms-2">
													<a className="fw-medium fs-14">BlueSky Ventures</a>
												</div>
											</div>
										</td>
										<td>
											18 Nov 2025
										</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/users/user-06.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<a className="fw-medium fs-14">Melissa Shelton</a>
												</div>
											</div>
										</td>
										<td>
											<span className="badge badge-warning d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>On Hold
											</span>
										</td>
									</tr>
									<tr>
										<td>
											<div className="form-check form-check-md">
												<input className="form-check-input" type="checkbox" />
											</div>
										</td>
										<td>
											<a href="#">#TIC010</a>
										</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<h6 className="fw-medium"><a href="#">Widgets Missing</a></h6>
											</div>
										</td>
										<td>
											<span className="badge border border-warning text-warning"><i
													className="ti ti-point-filled me-1"></i>Medium</span>
										</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/company/company-07.svg" className="img-fluid"
														alt="img" />
												</a>
												<div className="ms-2">
													<a className="fw-medium fs-14">TerraFusion Energy</a>
												</div>
											</div>
										</td>
										<td>
											03 Nov 2025
										</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/users/user-07.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<a className="fw-medium fs-14">James Rodriguez</a>
												</div>
											</div>
										</td>
										<td>
											<span className="badge badge-purple d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Open
											</span>
										</td>
									</tr>
									<tr>
										<td>
											<div className="form-check form-check-md">
												<input className="form-check-input" type="checkbox" />
											</div>
										</td>
										<td>
											<a href="#">#TIC009</a>
										</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<h6 className="fw-medium"><a href="#">Payment Failed</a></h6>
											</div>
										</td>
										<td>
											<span className="badge border border-danger text-danger"><i
													className="ti ti-point-filled me-1"></i>High</span>
										</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/company/company-08.svg" className="img-fluid"
														alt="img" />
												</a>
												<div className="ms-2">
													<a className="fw-medium fs-14">UrbanPulse Design</a>
												</div>
											</div>
										</td>
										<td>
											29 Oct 2025
										</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/users/user-08.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<a className="fw-medium fs-14">Regina Chavez</a>
												</div>
											</div>
										</td>
										<td>
											<span className="badge badge-success d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Closed
											</span>
										</td>
									</tr>
									<tr>
										<td>
											<div className="form-check form-check-md">
												<input className="form-check-input" type="checkbox" />
											</div>
										</td>
										<td>
											<a href="#">#TIC008</a>
										</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<h6 className="fw-medium"><a href="#">Subscription Not Updating</a></h6>
											</div>
										</td>
										<td>
											<span className="badge border border-success text-success"><i
													className="ti ti-point-filled me-1"></i>Low</span>
										</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/company/company-09.svg" className="img-fluid"
														alt="img" />
												</a>
												<div className="ms-2">
													<a className="fw-medium fs-14">Nimbus Networks</a>
												</div>
											</div>
										</td>
										<td>
											25 Oct 2025
										</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/users/user-09.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<a className="fw-medium fs-14">Joshua Dillon</a>
												</div>
											</div>
										</td>
										<td>
											<span className="badge badge-info d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Pending
											</span>
										</td>
									</tr>
									<tr>
										<td>
											<div className="form-check form-check-md">
												<input className="form-check-input" type="checkbox" />
											</div>
										</td>
										<td>
											<a href="#">#TIC007</a>
										</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<h6 className="fw-medium"><a href="#">Data Export Blank</a></h6>
											</div>
										</td>
										<td>
											<span className="badge border border-danger text-danger"><i
													className="ti ti-point-filled me-1"></i>High</span>
										</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/company/company-10.svg" className="img-fluid"
														alt="img" />
												</a>
												<div className="ms-2">
													<a className="fw-medium fs-14">Epicurean Delights</a>
												</div>
											</div>
										</td>
										<td>
											17 Oct 2025
										</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/users/user-10.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<a className="fw-medium fs-14">Diana Riddle</a>
												</div>
											</div>
										</td>
										<td>
											<span className="badge badge-warning d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>On Hold
											</span>
										</td>
									</tr>
								</tbody>
							</table>

								{/* Pagination Footer */}
								<div className="d-flex align-items-center justify-content-between flex-wrap row-gap-2 px-3 py-3 border-top">
									<p className="mb-0 text-gray-9 fs-14">
										Showing {Math.min((currentPage_ticketreports - 1) * rowsPerPage_ticketreports + 1, 11)}-{Math.min(currentPage_ticketreports * rowsPerPage_ticketreports, 11)} of 11 entries
									</p>
									<ul className="pagination mb-0">
										<li className={`page-item ${currentPage_ticketreports === 1 ? 'disabled' : ''}`}>
											<button className="page-link" onClick={() => setCurrentPage_ticketreports(p => Math.max(p - 1, 1))}>
												<i className="ti ti-chevron-left"></i>
											</button>
										</li>
										{[1, 2].map(page => (
											<li key={page} className={`page-item ${currentPage_ticketreports === page ? 'active' : ''}`}>
												<button className="page-link" onClick={() => setCurrentPage_ticketreports(page)}>{page}</button>
											</li>
										))}
										<li className={`page-item ${currentPage_ticketreports === 2 ? 'disabled' : ''}`}>
											<button className="page-link" onClick={() => setCurrentPage_ticketreports(p => Math.min(p + 1, 2))}>
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

export default TicketReports;
