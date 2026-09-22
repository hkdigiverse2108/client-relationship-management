import React, { useState } from 'react';
import { Link } from 'react-router-dom';import PageHeader from '../components/common/PageHeader';


const Subscription = () => {
  // Pagination state for subscription
  const [currentPage_subscription, setCurrentPage_subscription] = useState(1);
  const [rowsPerPage_subscription, setRowsPerPage_subscription] = useState(10);
  const [searchQuery_subscription, setSearchQuery_subscription] = useState('');
  return (
    <>
      <div className="page-wrapper">
			<div className="content">

				{/* Breadcrumb */}
				<PageHeader 
					title="Subscription"
					breadcrumbs={[
						{ label: 'Dashboard' },
						{ label: 'Super Admin' },
						{ label: 'Subscription', active: true }
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


				<div className="row">
					<div className="col-xl-3 col-md-6 d-flex">
						<div className="card flex-fill">
							<div className="card-header">
								<h3 className="card-title">Line Charts</h3>
							</div>
							<div className="card-body ">
								<div className="border-bottom pb-3 mb-3">
									<div className="row align-items-center">
										<div className="col-7">
											<div>
												<span className="fs-14 fw-normal text-truncate mb-1">Total
													Transaction</span>
												<h5>$5,340</h5>
											</div>
										</div>
										<div className="col-5">
											<div>
												<span className="subscription-line-1"
													data-width="100%">6,2,8,4,3,8,1,3,6,5,9,2,8,1,4,8,9,8,2,1</span>
											</div>
										</div>
									</div>
								</div>
								<div className="d-flex">
									<p className="fs-12 fw-normal d-flex align-items-center text-truncate">
										<span className="text-primary fs-12 d-flex align-items-center me-1">
											<i className="ti ti-arrow-wave-right-up me-1"></i>+19.01%</span>from
										last week
									</p>
								</div>
							</div>
						</div>
					</div>
					<div className="col-xl-3 col-md-6 d-flex">
						<div className="card flex-fill">
							<div className="card-header">
								<h3 className="card-title">Bar Charts</h3>
							</div>
							<div className="card-body ">
								<div className="border-bottom pb-3 mb-3">
									<div className="row align-items-center">
										<div className="col-7">
											<div>
												<span className="fs-14 fw-normal text-truncate mb-1">Total
													Subscribers</span>
												<h5>600</h5>
											</div>
										</div>
										<div className="col-5">
											<div>
												<span className="subscription-line-2"
													data-width="100%">6,2,8,4,3,8,1,3,6,5,9,2,8,1,4,8,9,8,2,1</span>
											</div>
										</div>
									</div>
								</div>
								<div className="d-flex">
									<p className="fs-12 fw-normal d-flex align-items-center text-truncate">
										<span className="text-primary fs-12 d-flex align-items-center me-1">
											<i className="ti ti-arrow-wave-right-up me-1"></i>+19.01%</span>from
										last week
									</p>
								</div>
							</div>
						</div>
					</div>
					<div className="col-xl-3 col-md-6 d-flex">
						<div className="card flex-fill">
							<div className="card-header">
								<h3 className="card-title">Line Charts</h3>
							</div>
							<div className="card-body ">
								<div className="border-bottom pb-3 mb-3">
									<div className="row align-items-center">
										<div className="col-7">
											<div>
												<span className="fs-14 fw-normal text-truncate mb-1">Active
													Subscribers</span>
												<h5>560</h5>
											</div>
										</div>
										<div className="col-5">
											<div>
												<span className="subscription-line-3"
													data-width="100%">6,2,8,4,3,8,1,3,6,5,9,2,8,1,4,8,9,8,2,1</span>
											</div>
										</div>
									</div>
								</div>
								<div className="d-flex">
									<p className="fs-12 fw-normal d-flex align-items-center text-truncate">
										<span className="text-primary fs-12 d-flex align-items-center me-1">
											<i className="ti ti-arrow-wave-right-up me-1"></i>+19.01%</span>from
										last week
									</p>
								</div>
							</div>
						</div>
					</div>
					<div className="col-xl-3 col-md-6 d-flex">
						<div className="card flex-fill">
							<div className="card-header">
								<h3 className="card-title">Bar Charts</h3>
							</div>
							<div className="card-body ">
								<div className="border-bottom pb-3 mb-3">
									<div className="row align-items-center">
										<div className="col-7">
											<div>
												<span className="fs-14 fw-normal text-truncate mb-1">Expired
													Subscribers</span>
												<h5>40</h5>
											</div>
										</div>
										<div className="col-5">
											<div>
												<span className="subscription-line-4"
													data-width="100%">6,2,8,4,3,8,1,3,6,5,9,2,8,1,4,8,9,8,2,1</span>
											</div>
										</div>
									</div>
								</div>
								<div className="d-flex">
									<p className="fs-12 fw-normal d-flex align-items-center text-truncate">
										<span className="text-primary fs-12 d-flex align-items-center me-1">
											<i className="ti ti-arrow-wave-right-up me-1"></i>+19.01%</span>from
										last week
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="card">
					
					<div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
						<h5>Subscription List</h5>
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
										<Link to="#" className="dropdown-item rounded-1">Paid</Link>
									</li>
									<li>
										<Link to="#" className="dropdown-item rounded-1">Unpaid</Link>
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
											value={rowsPerPage_subscription}
											onChange={(e) => { setRowsPerPage_subscription(Number(e.target.value)); setCurrentPage_subscription(1); }}
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
											value={searchQuery_subscription}
											onChange={(e) => { setSearchQuery_subscription(e.target.value); setCurrentPage_subscription(1); }}
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
										<th>Subscriber</th>
										<th>Plan</th>
										<th>Billing Cycle</th>
										<th>Payment Method</th>
										<th>Amount</th>
										<th>Created Date</th>
										<th>Expiring On</th>
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
										<td>Advanced (Monthly)</td>
										<td>30 Days</td>
										<td>Credit Card</td>
										<td>$200</td>
										<td>12 Sep 2024</td>
										<td>11 Oct 2024</td>
										<td>
											<span className="badge badge-success d-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Paid
											</span>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#view_invoice"><i
														className="ti ti-file-invoice"></i></a>
												<a href="#" className="me-2"><i className="ti ti-download"></i></a>
												<a href="#" data-bs-toggle="modal" data-bs-target="#delete_modal"><i
														className="ti ti-trash"></i></a>
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
										<td>Basic (Yearly)</td>
										<td>365 Days</td>
										<td>Paypal</td>
										<td>$600</td>
										<td>24 Oct 2024</td>
										<td>23 Oct 2025</td>
										<td>
											<span className="badge badge-success d-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Paid
											</span>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#view_invoice"><i
														className="ti ti-file-invoice"></i></a>
												<a href="#" className="me-2"><i className="ti ti-download"></i></a>
												<a href="#" data-bs-toggle="modal" data-bs-target="#delete_modal"><i
														className="ti ti-trash"></i></a>
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
										<td>Advanced (Monthly)</td>
										<td>30 Days</td>
										<td>Debit Card</td>
										<td>$200</td>
										<td>18 Feb 2024</td>
										<td>17 Mar 2024</td>
										<td>
											<span className="badge badge-success d-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Paid
											</span>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#view_invoice"><i
														className="ti ti-file-invoice"></i></a>
												<a href="#" className="me-2"><i className="ti ti-download"></i></a>
												<a href="#" data-bs-toggle="modal" data-bs-target="#delete_modal"><i
														className="ti ti-trash"></i></a>
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
										<td>Advanced (Monthly)</td>
										<td>30 Days</td>
										<td>Paypal</td>
										<td>$200</td>
										<td>17 Oct 2024</td>
										<td>16 Nov 2024</td>
										<td>
											<span className="badge badge-success d-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Paid
											</span>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#view_invoice"><i
														className="ti ti-file-invoice"></i></a>
												<a href="#" className="me-2"><i className="ti ti-download"></i></a>
												<a href="#" data-bs-toggle="modal" data-bs-target="#delete_modal"><i
														className="ti ti-trash"></i></a>
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
										<td>Enterprise (Monthly)</td>
										<td>30 Days</td>
										<td>Credit Card</td>
										<td>$400</td>
										<td>20 Jul 2024</td>
										<td>19 Aug 2024</td>
										<td>
											<span className="badge badge-success d-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Paid
											</span>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#view_invoice"><i
														className="ti ti-file-invoice"></i></a>
												<a href="#" className="me-2"><i className="ti ti-download"></i></a>
												<a href="#" data-bs-toggle="modal" data-bs-target="#delete_modal"><i
														className="ti ti-trash"></i></a>
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
										<td>Advanced (Monthly)</td>
										<td>30 Days</td>
										<td>Paypal</td>
										<td>$200</td>
										<td>10 Apr 2024</td>
										<td>19 Aug 2024</td>
										<td>
											<span className="badge badge-success d-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Paid
											</span>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#view_invoice"><i
														className="ti ti-file-invoice"></i></a>
												<a href="#" className="me-2"><i className="ti ti-download"></i></a>
												<a href="#" data-bs-toggle="modal" data-bs-target="#delete_modal"><i
														className="ti ti-trash"></i></a>
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
										<td>Enterprise (Yearly)</td>
										<td>365 Days</td>
										<td>Credit Card</td>
										<td>$4800</td>
										<td>29 Aug 2024</td>
										<td>28 Aug 2025</td>
										<td>
											<span className="badge badge-success d-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Paid
											</span>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#view_invoice"><i
														className="ti ti-file-invoice"></i></a>
												<a href="#" className="me-2"><i className="ti ti-download"></i></a>
												<a href="#" data-bs-toggle="modal" data-bs-target="#delete_modal"><i
														className="ti ti-trash"></i></a>
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
										<td>Basic (Monthly)</td>
										<td>30 Days</td>
										<td>Credit Card</td>
										<td>$50</td>
										<td>22 Feb 2024</td>
										<td>21 Mar 2024</td>
										<td>
											<span className="badge badge-danger d-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Unpaid
											</span>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#view_invoice"><i
														className="ti ti-file-invoice"></i></a>
												<a href="#" className="me-2"><i className="ti ti-download"></i></a>
												<a href="#" data-bs-toggle="modal" data-bs-target="#delete_modal"><i
														className="ti ti-trash"></i></a>
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
										<td>Basic (Yearly)</td>
										<td>365 Days</td>
										<td>Paypal</td>
										<td>$600</td>
										<td>03 Nov 2024</td>
										<td>02 Nov 2025</td>
										<td>
											<span className="badge badge-success d-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Paid
											</span>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#view_invoice"><i
														className="ti ti-file-invoice"></i></a>
												<a href="#" className="me-2"><i className="ti ti-download"></i></a>
												<a href="#" data-bs-toggle="modal" data-bs-target="#delete_modal"><i
														className="ti ti-trash"></i></a>
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
										<td>Advanced (Monthly)</td>
										<td>30 Days</td>
										<td>Credit Card</td>
										<td>$200</td>
										<td>17 Dec 2024</td>
										<td>16 Jan 2024</td>
										<td>
											<span className="badge badge-success dlign-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Paid
											</span>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#view_invoice"><i
														className="ti ti-file-invoice"></i></a>
												<a href="#" className="me-2"><i className="ti ti-download"></i></a>
												<a href="#" data-bs-toggle="modal" data-bs-target="#delete_modal"><i
														className="ti ti-trash"></i></a>
											</div>
										</td>
									</tr>
								</tbody>
							</table>

								{/* Pagination Footer */}
								<div className="d-flex align-items-center justify-content-between flex-wrap row-gap-2 px-3 py-3 border-top">
									<p className="mb-0 text-gray-9 fs-14">
										Showing {Math.min((currentPage_subscription - 1) * rowsPerPage_subscription + 1, 11)}-{Math.min(currentPage_subscription * rowsPerPage_subscription, 11)} of 11 entries
									</p>
									<ul className="pagination mb-0">
										<li className={`page-item ${currentPage_subscription === 1 ? 'disabled' : ''}`}>
											<button className="page-link" onClick={() => setCurrentPage_subscription(p => Math.max(p - 1, 1))}>
												<i className="ti ti-chevron-left"></i>
											</button>
										</li>
										{[1, 2].map(page => (
											<li key={page} className={`page-item ${currentPage_subscription === page ? 'active' : ''}`}>
												<button className="page-link" onClick={() => setCurrentPage_subscription(page)}>{page}</button>
											</li>
										))}
										<li className={`page-item ${currentPage_subscription === 2 ? 'disabled' : ''}`}>
											<button className="page-link" onClick={() => setCurrentPage_subscription(p => Math.min(p + 1, 2))}>
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

export default Subscription;
