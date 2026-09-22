import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const CallHistory = () => {
  // Pagination state for callhistory
  const [currentPage_callhistory, setCurrentPage_callhistory] = useState(1);
  const [rowsPerPage_callhistory, setRowsPerPage_callhistory] = useState(10);
  const [searchQuery_callhistory, setSearchQuery_callhistory] = useState('');
  return (
    <>
      <div className="page-wrapper">
			<div className="content">

				{/* Breadcrumb */}
				<div className="d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-3">
					<div className="my-auto mb-2">
						<h2 className="mb-1"> Call History</h2>
						<nav>
							<ol className="breadcrumb mb-0">
								<li className="breadcrumb-item">
									<a href="/"><i className="ti ti-smart-home"></i></a>
								</li>
								<li className="breadcrumb-item">
									Calls
								</li>
								<li className="breadcrumb-item active" aria-current="page"> Call History</li>
							</ol>
						</nav>
					</div>
					<div className="head-icons">
						<a href="#" onClick={(e) => e.preventDefault()} className="" data-bs-toggle="tooltip" data-bs-placement="top"
							data-bs-original-title="Collapse" id="collapse-header">
							<i className="ti ti-chevrons-up"></i>
						</a>
					</div>
				</div>

				<div className="row">

					<div className="card">
						
						<div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
							<h5>Call History List</h5>
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
										Call Type
									</Link>
									<ul className="dropdown-menu  dropdown-menu-end p-3">
										<li>
											<Link to="#" className="dropdown-item rounded-1">Incoming</Link>
										</li>
										<li>
											<Link to="#" className="dropdown-item rounded-1">Outgoing</Link>
										</li>
										<li>
											<Link to="#" className="dropdown-item rounded-1">Missed
												Call</Link>
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
											<Link to="#" className="dropdown-item rounded-1">Recently
												Added</Link>
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
											<Link to="#" className="dropdown-item rounded-1">Last 7
												Days</Link>
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
											value={rowsPerPage_callhistory}
											onChange={(e) => { setRowsPerPage_callhistory(Number(e.target.value)); setCurrentPage_callhistory(1); }}
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
											value={searchQuery_callhistory}
											onChange={(e) => { setSearchQuery_callhistory(e.target.value); setCurrentPage_callhistory(1); }}
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
											<th>Phone</th>
											<th>Call Type</th>
											<th>Duration</th>
											<th>Date & Time</th>
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
												<div className="d-flex align-items-center">
													<a href="#" className="avatar avatar-md" data-bs-toggle="modal"
														data-bs-target="#view_details">
														<img src="/assets/img/users/user-32.jpg"
															className="img-fluid rounded-circle" alt="img" />
													</a>
													<div className="ms-2">
														<p className="text-dark fw-medium mb-0"><a href="#"
																data-bs-toggle="modal"
																data-bs-target="#view_details">Anthony Lewis</a></p>
														<span className="fs-12">anthony@example.com</span>
													</div>
												</div>
											</td>
											<td>(123) 4567 890</td>
											<td>
												<div className="d-inline-flex align-items-center">
													<i className="ti ti-phone-incoming text-success me-2"></i>Incoming
												</div>
											</td>
											<td>00.25</td>
											<td>14 Jan 2024, 04:27 AM </td>
											<td>
												<div className="action-icon d-inline-flex">
													<a href="#" className="me-2" data-bs-toggle="modal"
														data-bs-target="#call_history"><i className="ti ti-eye"></i></a>
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
												<div className="d-flex align-items-center">
													<a href="#" className="avatar avatar-md" data-bs-toggle="modal"
														data-bs-target="#view_details">
														<img src="/assets/img/users/user-09.jpg"
															className="img-fluid rounded-circle" alt="img" />
													</a>
													<div className="ms-2">
														<p className="text-dark fw-medium mb-0"><a href="#"
																data-bs-toggle="modal"
																data-bs-target="#view_details">Brian Villalobos</a></p>
														<span className="fs-12">brian@example.com</span>
													</div>
												</div>
											</td>
											<td>(179) 7382 829</td>
											<td>
												<div className="d-inline-flex align-items-center">
													<i className="ti ti-phone-outgoing text-success me-2"></i>Outgoing
												</div>
											</td>
											<td>00.10</td>
											<td>21 Jan 2024, 03:19 AM</td>
											<td>
												<div className="action-icon d-inline-flex">
													<a href="#" className="me-2" data-bs-toggle="modal"
														data-bs-target="#call_history"><i className="ti ti-eye"></i></a>
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
												<div className="d-flex align-items-center">
													<a href="#" className="avatar avatar-md" data-bs-toggle="modal"
														data-bs-target="#view_details">
														<img src="/assets/img/users/user-01.jpg"
															className="img-fluid rounded-circle" alt="img" />
													</a>
													<div className="ms-2">
														<p className="text-dark fw-medium mb-0"><a href="#"
																data-bs-toggle="modal"
																data-bs-target="#view_details">Harvey Smith</a></p>
														<span className="fs-12">harvey@example.com</span>
													</div>
												</div>
											</td>
											<td>(184) 2719 738</td>
											<td>
												<div className="d-inline-flex align-items-center">
													<i className="ti ti-video text-success me-2"></i>Incoming
												</div>
											</td>
											<td>00.40</td>
											<td>20 Feb 2024, 12:15 PM</td>
											<td>
												<div className="action-icon d-inline-flex">
													<a href="#" className="me-2" data-bs-toggle="modal"
														data-bs-target="#call_history"><i className="ti ti-eye"></i></a>
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
												<div className="d-flex align-items-center">
													<a href="#" className="avatar avatar-md" data-bs-toggle="modal"
														data-bs-target="#view_details">
														<img src="/assets/img/users/user-33.jpg"
															className="img-fluid rounded-circle" alt="img" />
													</a>
													<div className="ms-2">
														<p className="text-dark fw-medium mb-0"><a href="#"
																data-bs-toggle="modal"
																data-bs-target="#view_details">peral@example.com</a></p>
														<span className="fs-12">peral@example.com</span>
													</div>
												</div>
											</td>
											<td>(193) 7839 748</td>
											<td>
												<div className="d-inline-flex align-items-center">
													<i className="ti ti-phone-x text-danger me-2"></i>Missed Call
												</div>
											</td>
											<td>00.00</td>
											<td>15 Mar 2024, 12:11 AM</td>
											<td>
												<div className="action-icon d-inline-flex">
													<a href="#" className="me-2" data-bs-toggle="modal"
														data-bs-target="#call_history"><i className="ti ti-eye"></i></a>
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
												<div className="d-flex align-items-center">
													<a href="#" className="avatar avatar-md" data-bs-toggle="modal"
														data-bs-target="#view_details"><img
															src="/assets/img/users/user-33.jpg"
															className="img-fluid rounded-circle" alt="img" /></a>
													<div className="ms-2">
														<p className="text-dark fw-medium mb-0"><a href="#"
																data-bs-toggle="modal"
																data-bs-target="#view_details">Doglas Martini</a></p>
														<span className="fs-12">martniwr@example.com</span>
													</div>
												</div>
											</td>
											<td>(183) 9302 890</td>
											<td>
												<div className="d-inline-flex align-items-center">
													<i className="ti ti-video text-success me-2"></i>Outgoing
												</div>
											</td>
											<td>00.35</td>
											<td>12 Apr 2024, 05:48 PM</td>
											<td>
												<div className="action-icon d-inline-flex">
													<a href="#" className="me-2" data-bs-toggle="modal"
														data-bs-target="#call_history"><i className="ti ti-eye"></i></a>
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
												<div className="d-flex align-items-center">
													<a href="#" className="avatar avatar-md" data-bs-toggle="modal"
														data-bs-target="#view_details">
														<img src="/assets/img/users/user-02.jpg"
															className="img-fluid rounded-circle" alt="img" />
													</a>
													<div className="ms-2">
														<p className="text-dark fw-medium mb-0"><a href="#"
																data-bs-toggle="modal"
																data-bs-target="#view_details">Linda Ray</a></p>
														<span className="fs-12">ray456@example.com</span>
													</div>
												</div>
											</td>
											<td>(120) 3728 039</td>
											<td>
												<div className="d-inline-flex align-items-center">
													<i className="ti ti-phone-incoming text-success me-2"></i>Incomiing
												</div>
											</td>
											<td>01.40</td>
											<td>20 Apr 2024, 06:11 PM</td>
											<td>
												<div className="action-icon d-inline-flex">
													<a href="#" className="me-2" data-bs-toggle="modal"
														data-bs-target="#call_history"><i className="ti ti-eye"></i></a>
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
												<div className="d-flex align-items-center">
													<a href="#" className="avatar avatar-md" data-bs-toggle="modal"
														data-bs-target="#view_details">
														<img src="/assets/img/users/user-35.jpg"
															className="img-fluid rounded-circle" alt="img" />
													</a>
													<div className="ms-2">
														<p className="text-dark fw-medium mb-0"><a href="#"
																data-bs-toggle="modal"
																data-bs-target="#view_details">Elliot Murray</a></p>
														<span className="fs-12">murray@example.com</span>
													</div>
												</div>
											</td>
											<td>(102) 8480 832</td>
											<td>
												<div className="d-inline-flex align-items-center">
													<i className="ti ti-video text-danger me-2"></i>Missed call
												</div>
											</td>
											<td>00.00</td>
											<td>06 Jul 2024, 07:15 PM</td>
											<td>
												<div className="action-icon d-inline-flex">
													<a href="#" className="me-2" data-bs-toggle="modal"
														data-bs-target="#call_history"><i className="ti ti-eye"></i></a>
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
												<div className="d-flex align-items-center">
													<a href="#" className="avatar avatar-md" data-bs-toggle="modal"
														data-bs-target="#view_details">
														<img src="/assets/img/users/user-36.jpg"
															className="img-fluid rounded-circle" alt="img" />
													</a>
													<div className="ms-2">
														<p className="text-dark fw-medium mb-0"><a href="#"
																data-bs-toggle="modal"
																data-bs-target="#view_details">Rebecca Smtih</a></p>
														<span className="fs-12">smtih@example.com</span>
													</div>
												</div>
											</td>
											<td>(162) 8920 713</td>
											<td>
												<div className="d-inline-flex align-items-center">
													<i className="ti ti-phone-outgoing text-success me-2"></i>Outgoing
												</div>
											</td>
											<td>00.45</td>
											<td>02 Sep 2024, 09:21 PM</td>
											<td>
												<div className="action-icon d-inline-flex">
													<a href="#" className="me-2" data-bs-toggle="modal"
														data-bs-target="#call_history"><i className="ti ti-eye"></i></a>
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
												<div className="d-flex align-items-center">
													<a href="#" className="avatar avatar-md" data-bs-toggle="modal"
														data-bs-target="#view_details"><img
															src="/assets/img/users/user-37.jpg"
															className="img-fluid rounded-circle" alt="img" /></a>
													<div className="ms-2">
														<p className="text-dark fw-medium mb-0"><a href="#"
																data-bs-toggle="modal"
																data-bs-target="#view_details">Connie Waters</a></p>
														<span className="fs-12">connie@example.com</span>
													</div>
												</div>
											</td>
											<td>(189) 0920 723</td>
											<td>
												<div className="d-inline-flex align-items-center">
													<i className="ti ti-phone-incoming text-success me-2"></i>Incoming
												</div>
											</td>
											<td>00.50</td>
											<td>15 Nov 2024, 12:44 PM</td>
											<td>
												<div className="action-icon d-inline-flex">
													<a href="#" className="me-2" data-bs-toggle="modal"
														data-bs-target="#call_history"><i className="ti ti-eye"></i></a>
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
												<div className="d-flex align-items-center">
													<a href="#" className="avatar avatar-md" data-bs-toggle="modal"
														data-bs-target="#view_details">
														<img src="/assets/img/users/user-38.jpg"
															className="img-fluid rounded-circle" alt="img" />
													</a>
													<div className="ms-2">
														<p className="text-dark fw-medium mb-0"><a href="#"
																data-bs-toggle="modal"
																data-bs-target="#view_details">Lori Broaddus</a></p>
														<span className="fs-12">broaddus@example.com</span>
													</div>
												</div>
											</td>
											<td>(168) 8392 823</td>
											<td>
												<div className="d-inline-flex align-items-center">
													<i className="ti ti-phone-x text-danger me-2"></i>Missed call
												</div>
											</td>
											<td>00.00</td>
											<td>10 Dec 2024, 11:23 PM</td>
											<td>
												<div className="action-icon d-inline-flex">
													<a href="#" className="me-2" data-bs-toggle="modal"
														data-bs-target="#call_history"><i className="ti ti-eye"></i></a>
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
										Showing {Math.min((currentPage_callhistory - 1) * rowsPerPage_callhistory + 1, 11)}-{Math.min(currentPage_callhistory * rowsPerPage_callhistory, 11)} of 11 entries
									</p>
									<ul className="pagination mb-0">
										<li className={`page-item ${currentPage_callhistory === 1 ? 'disabled' : ''}`}>
											<button className="page-link" onClick={() => setCurrentPage_callhistory(p => Math.max(p - 1, 1))}>
												<i className="ti ti-chevron-left"></i>
											</button>
										</li>
										{[1, 2].map(page => (
											<li key={page} className={`page-item ${currentPage_callhistory === page ? 'active' : ''}`}>
												<button className="page-link" onClick={() => setCurrentPage_callhistory(page)}>{page}</button>
											</li>
										))}
										<li className={`page-item ${currentPage_callhistory === 2 ? 'disabled' : ''}`}>
											<button className="page-link" onClick={() => setCurrentPage_callhistory(p => Math.min(p + 1, 2))}>
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
			</div>
    </>
  );
};

export default CallHistory;
