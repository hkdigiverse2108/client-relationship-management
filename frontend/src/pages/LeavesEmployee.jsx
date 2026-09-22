import React, { useState } from 'react';
import { Link } from 'react-router-dom';import PageHeader from '../components/common/PageHeader';


const LeavesEmployee = () => {
  // Pagination state for leavesemployee
  const [currentPage_leavesemployee, setCurrentPage_leavesemployee] = useState(1);
  const [rowsPerPage_leavesemployee, setRowsPerPage_leavesemployee] = useState(10);
  const [searchQuery_leavesemployee, setSearchQuery_leavesemployee] = useState('');
  return (
    <>
      <div className="page-wrapper">
			<div className="content">

				{/* Breadcrumb */}
				<PageHeader 
					title="Leaves"
					breadcrumbs={[
						{ label: 'Dashboard' },
						{ label: 'Attendance' },
						{ label: 'Leaves', active: true }
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
						<div className="mb-2">
							<a href="#" data-bs-toggle="modal" data-bs-target="#add_leaves"
								className="btn btn-primary d-flex align-items-center"><i
									className="ti ti-circle-plus me-2"></i>Add Leave</a>
						</div>
						<div className="head-icons ms-2">
							<a href="#" onClick={(e) => e.preventDefault()} className="" data-bs-toggle="tooltip" data-bs-placement="top"
								data-bs-original-title="Collapse" id="collapse-header">
								<i className="ti ti-chevrons-up"></i>
							</a>
						</div>
				</PageHeader>
				{/* /Breadcrumb */}

				{/* Leaves Info */}
				<div className="row">
					<div className="col-xl-3 col-md-6">
						<div className="card bg-black-le">
							<div className="card-body">
								<div className="d-flex align-items-center justify-content-between">
									<div className="text-start">
										<p className="mb-1">Annual Leaves</p>
										<h4>05</h4>
									</div>
									<div className="d-flex">
										<div className="flex-shrink-0 me-2">
											<span className="avatar avatar-md d-flex">
												<i className="ti ti-calendar-event fs-32"></i>
											</span>
										</div>
									</div>
								</div>
								<span className="badge bg-secondary-transparent">Remaining Leaves : 07</span>
							</div>
						</div>
					</div>
					<div className="col-xl-3 col-md-6">
						<div className="card bg-blue-le">
							<div className="card-body">
								<div className="d-flex align-items-center justify-content-between">
									<div className="text-start">
										<p className="mb-1">Medical Leaves</p>
										<h4>11</h4>
									</div>
									<div className="d-flex">
										<div className="flex-shrink-0 me-2">
											<span className="avatar avatar-md d-flex">
												<i className="ti ti-vaccine fs-32"></i>
											</span>
										</div>
									</div>
								</div>
								<span className="badge bg-info-transparent">Remaining Leaves : 01</span>
							</div>
						</div>
					</div>
					<div className="col-xl-3 col-md-6">
						<div className="card bg-purple-le">
							<div className="card-body">
								<div className="d-flex align-items-center justify-content-between">
									<div className="text-start">
										<p className="mb-1">Casual Leaves</p>
										<h4>02</h4>
									</div>
									<div className="d-flex">
										<div className="flex-shrink-0 me-2">
											<span className="avatar avatar-md d-flex">
												<i className="ti ti-hexagon-letter-c fs-32"></i>
											</span>
										</div>
									</div>
								</div>
								<span className="badge bg-transparent-purple">Remaining Leaves : 10</span>
							</div>
						</div>
					</div>
					<div className="col-xl-3 col-md-6">
						<div className="card bg-pink-le">
							
							<div className="card-body">
								<div className="d-flex align-items-center justify-content-between">
									<div className="text-start">
										<p className="mb-1">Other Leaves</p>
										<h4>07</h4>
									</div>
									<div className="d-flex">
										<div className="flex-shrink-0 me-2">
											<span className="avatar avatar-md d-flex">
												<i className="ti ti-hexagonal-prism-plus fs-32"></i>
											</span>
										</div>
									</div>
								</div>
								<span className="badge bg-pink-transparent">Remaining Leaves : 05</span>
							</div>
						</div>
					</div>
				</div>
				{/* /Leaves Info */}

				{/* Leaves list */}
				<div className="card">
					
					<div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
						<div className="d-flex">
							<h5 className="me-2">Leave List</h5>
							<span className="badge bg-primary-transparent me-2">Total Leaves : 48</span>
							<span className="badge bg-secondary-transparent">Total Remaining Leaves : 23</span>
						</div>
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
									className="dropdown-toggle btn btn-sm btn-white d-inline-flex align-items-center"
									data-bs-toggle="dropdown">
									Leave Type
								</Link>
								<ul className="dropdown-menu  dropdown-menu-end p-3">
									<li>
										<Link to="#" className="dropdown-item rounded-1">Medical Leave</Link>
									</li>
									<li>
										<Link to="#" className="dropdown-item rounded-1">Casual Leave</Link>
									</li>
									<li>
										<Link to="#" className="dropdown-item rounded-1">Annual Leave</Link>
									</li>
								</ul>
							</div>
							<div className="dropdown me-3">
								<Link to="#"
									className="dropdown-toggle btn btn-sm btn-white d-inline-flex align-items-center"
									data-bs-toggle="dropdown">
									Approved By
								</Link>
								<ul className="dropdown-menu  dropdown-menu-end p-3">
									<li>
										<Link to="#" className="dropdown-item rounded-1">Doglas Martini</Link>
									</li>
									<li>
										<Link to="#" className="dropdown-item rounded-1">Warren Morales</Link>
									</li>
									<li>
										<Link to="#" className="dropdown-item rounded-1">Doglas Martini</Link>
									</li>
								</ul>
							</div>
							<div className="dropdown me-3">
								<Link to="#"
									className="dropdown-toggle btn btn-sm btn-white d-inline-flex align-items-center"
									data-bs-toggle="dropdown">
									Select Status
								</Link>
								<ul className="dropdown-menu  dropdown-menu-end p-3">
									<li>
										<Link to="#"
											className="dropdown-item rounded-1 d-flex justify-content-start align-items-center"><span
												className="rounded-circle bg-transparent-success d-flex justify-content-center align-items-center me-2"><i
													className="ti ti-point-filled text-success"></i></span>Approved</Link>
									</li>
									<li>
										<Link to="#"
											className="dropdown-item rounded-1 d-flex justify-content-start align-items-center"><span
												className="rounded-circle bg-transparent-danger d-flex justify-content-center align-items-center me-2"><i
													className="ti ti-point-filled text-danger"></i></span>Declined</Link>
									</li>
									<li>
										<Link to="#"
											className="dropdown-item rounded-1 d-flex justify-content-start align-items-center"><span
												className="rounded-circle bg-transparent-purple d-flex justify-content-center align-items-center me-2"><i
													className="ti ti-point-filled text-purple"></i></span>New</Link>
									</li>
								</ul>
							</div>
							<div className="dropdown">
								<Link to="#"
									className="dropdown-toggle btn btn-sm btn-white d-inline-flex align-items-center"
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
											value={rowsPerPage_leavesemployee}
											onChange={(e) => { setRowsPerPage_leavesemployee(Number(e.target.value)); setCurrentPage_leavesemployee(1); }}
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
											value={searchQuery_leavesemployee}
											onChange={(e) => { setSearchQuery_leavesemployee(e.target.value); setCurrentPage_leavesemployee(1); }}
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
										<th>Leave Type</th>
										<th>From</th>
										<th>Approved By</th>
										<th>To</th>
										<th>No of Days</th>
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
											<div className="d-flex align-items-center">
												<p className="fs-14 fw-medium d-flex align-items-center mb-0">Medical Leave
												</p>
												<a href="#" className="ms-2" data-bs-toggle="tooltip"
													data-bs-placement="right" data-bs-title="I am currently experiencing a fever and
                                                feeling unwell.">
													<i className="ti ti-info-circle text-info"></i>
												</a>
											</div>
										</td>
										<td>
											14 Jan 2024
										</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" onClick={(e) => e.preventDefault()}
													className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/users/user-34.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#" onClick={(e) => e.preventDefault()}>Doglas
															Martini</a></h6>
													<span className="fs-12 fw-normal ">Manager</span>
												</div>
											</div>
										</td>
										<td>
											15 Jan 2024
										</td>
										<td>
											2 Days
										</td>
										<td>
											<div className="dropdown">
												<a href="#" onClick={(e) => e.preventDefault()}
													className="dropdown-toggle btn btn-sm btn-white d-inline-flex align-items-center"
													data-bs-toggle="dropdown">
													<span
														className="rounded-circle bg-transparent-success d-flex justify-content-center align-items-center me-2"><i
															className="ti ti-point-filled text-success"></i></span> Approved
												</a>
												<ul className="dropdown-menu  dropdown-menu-end p-3">
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1 d-flex justify-content-start align-items-center"><span
																className="rounded-circle bg-transparent-success d-flex justify-content-center align-items-center me-2"><i
																	className="ti ti-point-filled text-success"></i></span>Approved</a>
													</li>
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1 d-flex justify-content-start align-items-center"><span
																className="rounded-circle bg-transparent-danger d-flex justify-content-center align-items-center me-2"><i
																	className="ti ti-point-filled text-danger"></i></span>Declined</a>
													</li>
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1 d-flex justify-content-start align-items-center"><span
																className="rounded-circle bg-transparent-purple d-flex justify-content-center align-items-center me-2"><i
																	className="ti ti-point-filled text-purple"></i></span>New</a>
													</li>
												</ul>
											</div>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_leaves"><i className="ti ti-edit"></i></a>
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
											<div className="d-flex align-items-center">
												<p className="fs-14 fw-medium d-flex align-items-center mb-0">Annual Leave
												</p>
												<a href="#" className="ms-2" data-bs-toggle="tooltip"
													data-bs-placement="right"
													data-bs-title="I am currently experiencing a fever and feeling unwell. ">
													<i className="ti ti-info-circle text-info"></i>
												</a>
											</div>
										</td>
										<td>
											21 Jan 2024
										</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" onClick={(e) => e.preventDefault()}
													className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/users/user-34.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#" onClick={(e) => e.preventDefault()}>Doglas
															Martini</a></h6>
													<span className="fs-12 fw-normal ">Manager</span>
												</div>
											</div>
										</td>
										<td>
											25 Jan 2024
										</td>
										<td>
											5 Days
										</td>
										<td>
											<div className="dropdown">
												<a href="#" onClick={(e) => e.preventDefault()}
													className="dropdown-toggle btn btn-sm btn-white d-inline-flex align-items-center"
													data-bs-toggle="dropdown">
													<span
														className="rounded-circle bg-transparent-success d-flex justify-content-center align-items-center me-2"><i
															className="ti ti-point-filled text-success"></i></span> Approved
												</a>
												<ul className="dropdown-menu  dropdown-menu-end p-3">
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1 d-flex justify-content-start align-items-center"><span
																className="rounded-circle bg-transparent-success d-flex justify-content-center align-items-center me-2"><i
																	className="ti ti-point-filled text-success"></i></span>Approved</a>
													</li>
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1 d-flex justify-content-start align-items-center"><span
																className="rounded-circle bg-transparent-danger d-flex justify-content-center align-items-center me-2"><i
																	className="ti ti-point-filled text-danger"></i></span>Declined</a>
													</li>
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1 d-flex justify-content-start align-items-center"><span
																className="rounded-circle bg-transparent-purple d-flex justify-content-center align-items-center me-2"><i
																	className="ti ti-point-filled text-purple"></i></span>New</a>
													</li>
												</ul>
											</div>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_leaves"><i className="ti ti-edit"></i></a>
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
											<div className="d-flex align-items-center">
												<p className="fs-14 fw-medium d-flex align-items-center mb-0">Medical Leave
												</p>
												<a href="#" className="ms-2" data-bs-toggle="tooltip"
													data-bs-placement="right"
													data-bs-title="I am currently experiencing a fever and feeling unwell. ">
													<i className="ti ti-info-circle text-info"></i>
												</a>
											</div>
										</td>
										<td>
											20 Jan 2024
										</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" onClick={(e) => e.preventDefault()}
													className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/users/user-58.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#" onClick={(e) => e.preventDefault()}>Warren
															Morales</a></h6>
													<span className="fs-12 fw-normal ">Admin</span>
												</div>
											</div>
										</td>
										<td>
											22 Feb 2024
										</td>
										<td>
											3 Days
										</td>
										<td>
											<div className="dropdown">
												<a href="#" onClick={(e) => e.preventDefault()}
													className="dropdown-toggle btn btn-sm btn-white d-inline-flex align-items-center"
													data-bs-toggle="dropdown">
													<span
														className="rounded-circle bg-transparent-success d-flex justify-content-center align-items-center me-2"><i
															className="ti ti-point-filled text-success"></i></span> Approved
												</a>
												<ul className="dropdown-menu  dropdown-menu-end p-3">
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1 d-flex justify-content-start align-items-center"><span
																className="rounded-circle bg-transparent-success d-flex justify-content-center align-items-center me-2"><i
																	className="ti ti-point-filled text-success"></i></span>Approved</a>
													</li>
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1 d-flex justify-content-start align-items-center"><span
																className="rounded-circle bg-transparent-danger d-flex justify-content-center align-items-center me-2"><i
																	className="ti ti-point-filled text-danger"></i></span>Declined</a>
													</li>
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1 d-flex justify-content-start align-items-center"><span
																className="rounded-circle bg-transparent-purple d-flex justify-content-center align-items-center me-2"><i
																	className="ti ti-point-filled text-purple"></i></span>New</a>
													</li>
												</ul>
											</div>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_leaves"><i className="ti ti-edit"></i></a>
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
											<div className="d-flex align-items-center">
												<p className="fs-14 fw-medium d-flex align-items-center mb-0">Annual Leave
												</p>
												<a href="#" className="ms-2" data-bs-toggle="tooltip"
													data-bs-placement="right"
													data-bs-title="I am currently experiencing a fever and feeling unwell. ">
													<i className="ti ti-info-circle text-info"></i>
												</a>
											</div>
										</td>
										<td>
											15 Mar 2024
										</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" onClick={(e) => e.preventDefault()}
													className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/users/user-34.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#" onClick={(e) => e.preventDefault()}>Doglas
															Martini</a></h6>
													<span className="fs-12 fw-normal ">Manager</span>
												</div>
											</div>
										</td>
										<td>
											17 Mar 2024
										</td>
										<td>
											3 Days
										</td>
										<td>
											<div className="dropdown">
												<a href="#" onClick={(e) => e.preventDefault()}
													className="dropdown-toggle btn btn-sm btn-white d-inline-flex align-items-center"
													data-bs-toggle="dropdown">
													<span
														className="rounded-circle bg-transparent-success d-flex justify-content-center align-items-center me-2"><i
															className="ti ti-point-filled text-success"></i></span> Approved
												</a>
												<ul className="dropdown-menu  dropdown-menu-end p-3">
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1 d-flex justify-content-start align-items-center"><span
																className="rounded-circle bg-transparent-success d-flex justify-content-center align-items-center me-2"><i
																	className="ti ti-point-filled text-success"></i></span>Approved</a>
													</li>
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1 d-flex justify-content-start align-items-center"><span
																className="rounded-circle bg-transparent-danger d-flex justify-content-center align-items-center me-2"><i
																	className="ti ti-point-filled text-danger"></i></span>Declined</a>
													</li>
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1 d-flex justify-content-start align-items-center"><span
																className="rounded-circle bg-transparent-purple d-flex justify-content-center align-items-center me-2"><i
																	className="ti ti-point-filled text-purple"></i></span>New</a>
													</li>
												</ul>
											</div>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_leaves"><i className="ti ti-edit"></i></a>
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
											<div className="d-flex align-items-center">
												<p className="fs-14 fw-medium d-flex align-items-center mb-0">Casual Leave
												</p>
												<a href="#" className="ms-2" data-bs-toggle="tooltip"
													data-bs-placement="right"
													data-bs-title="I am currently experiencing a fever and feeling unwell. ">
													<i className="ti ti-info-circle text-info"></i>
												</a>
											</div>
										</td>
										<td>
											12 Apr 2024
										</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" onClick={(e) => e.preventDefault()}
													className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/users/user-34.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#" onClick={(e) => e.preventDefault()}>Doglas
															Martini</a></h6>
													<span className="fs-12 fw-normal ">Manager</span>
												</div>
											</div>
										</td>
										<td>
											16 Apr 2024
										</td>
										<td>
											5 Days
										</td>
										<td>
											<div className="dropdown">
												<a href="#" onClick={(e) => e.preventDefault()}
													className="dropdown-toggle btn btn-sm btn-white d-inline-flex align-items-center"
													data-bs-toggle="dropdown">
													<span
														className="rounded-circle bg-transparent-danger d-flex justify-content-center align-items-center me-2"><i
															className="ti ti-point-filled text-danger"></i></span> Declined
												</a>
												<ul className="dropdown-menu  dropdown-menu-end p-3">
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1 d-flex justify-content-start align-items-center"><span
																className="rounded-circle bg-transparent-success d-flex justify-content-center align-items-center me-2"><i
																	className="ti ti-point-filled text-success"></i></span>Approved</a>
													</li>
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1 d-flex justify-content-start align-items-center"><span
																className="rounded-circle bg-transparent-danger d-flex justify-content-center align-items-center me-2"><i
																	className="ti ti-point-filled text-danger"></i></span>Declined</a>
													</li>
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1 d-flex justify-content-start align-items-center"><span
																className="rounded-circle bg-transparent-purple d-flex justify-content-center align-items-center me-2"><i
																	className="ti ti-point-filled text-purple"></i></span>New</a>
													</li>
												</ul>
											</div>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_leaves"><i className="ti ti-edit"></i></a>
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
											<div className="d-flex align-items-center">
												<p className="fs-14 fw-medium d-flex align-items-center mb-0">Medical Leave
												</p>
												<a href="#" className="ms-2" data-bs-toggle="tooltip"
													data-bs-placement="right"
													data-bs-title="I am currently experiencing a fever and feeling unwell. ">
													<i className="ti ti-info-circle text-info"></i>
												</a>
											</div>
										</td>
										<td>
											20 May 2024
										</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" onClick={(e) => e.preventDefault()}
													className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/users/user-58.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#" onClick={(e) => e.preventDefault()}>Warren
															Morales</a></h6>
													<span className="fs-12 fw-normal ">Admin</span>
												</div>
											</div>
										</td>
										<td>
											21 Mar 2024
										</td>
										<td>
											2 Days
										</td>
										<td>
											<div className="dropdown">
												<a href="#" onClick={(e) => e.preventDefault()}
													className="dropdown-toggle btn btn-sm btn-white d-inline-flex align-items-center"
													data-bs-toggle="dropdown">
													<span
														className="rounded-circle bg-transparent-danger d-flex justify-content-center align-items-center me-2"><i
															className="ti ti-point-filled text-danger"></i></span> Declined
												</a>
												<ul className="dropdown-menu  dropdown-menu-end p-3">
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1 d-flex justify-content-start align-items-center"><span
																className="rounded-circle bg-transparent-success d-flex justify-content-center align-items-center me-2"><i
																	className="ti ti-point-filled text-success"></i></span>Approved</a>
													</li>
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1 d-flex justify-content-start align-items-center"><span
																className="rounded-circle bg-transparent-danger d-flex justify-content-center align-items-center me-2"><i
																	className="ti ti-point-filled text-danger"></i></span>Declined</a>
													</li>
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1 d-flex justify-content-start align-items-center"><span
																className="rounded-circle bg-transparent-purple d-flex justify-content-center align-items-center me-2"><i
																	className="ti ti-point-filled text-purple"></i></span>New</a>
													</li>
												</ul>
											</div>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_leaves"><i className="ti ti-edit"></i></a>
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
											<div className="d-flex align-items-center">
												<p className="fs-14 fw-medium d-flex align-items-center mb-0">Casual Leave
												</p>
												<a href="#" className="ms-2" data-bs-toggle="tooltip"
													data-bs-placement="right"
													data-bs-title="I am currently experiencing a fever and feeling unwell. ">
													<i className="ti ti-info-circle text-info"></i>
												</a>
											</div>
										</td>
										<td>
											06 Jul 2024
										</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" onClick={(e) => e.preventDefault()}
													className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/users/user-34.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#" onClick={(e) => e.preventDefault()}>Doglas
															Martini</a></h6>
													<span className="fs-12 fw-normal ">Manager</span>
												</div>
											</div>
										</td>
										<td>
											06 Jul 2024
										</td>
										<td>
											1 Days
										</td>
										<td>
											<div className="dropdown">
												<a href="#" onClick={(e) => e.preventDefault()}
													className="dropdown-toggle btn btn-sm btn-white d-inline-flex align-items-center"
													data-bs-toggle="dropdown">
													<span
														className="rounded-circle bg-transparent-success d-flex justify-content-center align-items-center me-2"><i
															className="ti ti-point-filled text-success"></i></span> Approved
												</a>
												<ul className="dropdown-menu  dropdown-menu-end p-3">
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1 d-flex justify-content-start align-items-center"><span
																className="rounded-circle bg-transparent-success d-flex justify-content-center align-items-center me-2"><i
																	className="ti ti-point-filled text-success"></i></span>Approved</a>
													</li>
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1 d-flex justify-content-start align-items-center"><span
																className="rounded-circle bg-transparent-danger d-flex justify-content-center align-items-center me-2"><i
																	className="ti ti-point-filled text-danger"></i></span>Declined</a>
													</li>
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1 d-flex justify-content-start align-items-center"><span
																className="rounded-circle bg-transparent-purple d-flex justify-content-center align-items-center me-2"><i
																	className="ti ti-point-filled text-purple"></i></span>New</a>
													</li>
												</ul>
											</div>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_leaves"><i className="ti ti-edit"></i></a>
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
											<div className="d-flex align-items-center">
												<p className="fs-14 fw-medium d-flex align-items-center mb-0">Medical Leave
												</p>
												<a href="#" className="ms-2" data-bs-toggle="tooltip"
													data-bs-placement="right"
													data-bs-title="I am currently experiencing a fever and feeling unwell. ">
													<i className="ti ti-info-circle text-info"></i>
												</a>
											</div>
										</td>
										<td>
											02 Sep 2024
										</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" onClick={(e) => e.preventDefault()}
													className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/users/user-34.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#" onClick={(e) => e.preventDefault()}>Doglas
															Martini</a></h6>
													<span className="fs-12 fw-normal ">Manager</span>
												</div>
											</div>
										</td>
										<td>
											04 Sep 2024
										</td>
										<td>
											3 Days
										</td>
										<td>
											<div className="dropdown">
												<a href="#" onClick={(e) => e.preventDefault()}
													className="dropdown-toggle btn btn-sm btn-white d-inline-flex align-items-center"
													data-bs-toggle="dropdown">
													<span
														className="rounded-circle bg-transparent-purple d-flex justify-content-center align-items-center me-2"><i
															className="ti ti-point-filled text-purple"></i></span> New
												</a>
												<ul className="dropdown-menu  dropdown-menu-end p-3">
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1 d-flex justify-content-start align-items-center"><span
																className="rounded-circle bg-transparent-success d-flex justify-content-center align-items-center me-2"><i
																	className="ti ti-point-filled text-success"></i></span>Approved</a>
													</li>
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1 d-flex justify-content-start align-items-center"><span
																className="rounded-circle bg-transparent-danger d-flex justify-content-center align-items-center me-2"><i
																	className="ti ti-point-filled text-danger"></i></span>Declined</a>
													</li>
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1 d-flex justify-content-start align-items-center"><span
																className="rounded-circle bg-transparent-purple d-flex justify-content-center align-items-center me-2"><i
																	className="ti ti-point-filled text-purple"></i></span>New</a>
													</li>
												</ul>
											</div>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_leaves"><i className="ti ti-edit"></i></a>
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
											<div className="d-flex align-items-center">
												<p className="fs-14 fw-medium d-flex align-items-center mb-0">Annual Leave
												</p>
												<a href="#" className="ms-2" data-bs-toggle="tooltip"
													data-bs-placement="right"
													data-bs-title="I am currently experiencing a fever and feeling unwell. ">
													<i className="ti ti-info-circle text-info"></i>
												</a>
											</div>
										</td>
										<td>
											15 Nov 2024
										</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" onClick={(e) => e.preventDefault()}
													className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/users/user-58.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#" onClick={(e) => e.preventDefault()}>Warren
															Morales</a></h6>
													<span className="fs-12 fw-normal ">Admin</span>
												</div>
											</div>
										</td>
										<td>
											15 Nov 2024
										</td>
										<td>
											1 Days
										</td>
										<td>
											<div className="dropdown">
												<a href="#" onClick={(e) => e.preventDefault()}
													className="dropdown-toggle btn btn-sm btn-white d-inline-flex align-items-center"
													data-bs-toggle="dropdown">
													<span
														className="rounded-circle bg-transparent-purple d-flex justify-content-center align-items-center me-2"><i
															className="ti ti-point-filled text-purple"></i></span> New
												</a>
												<ul className="dropdown-menu  dropdown-menu-end p-3">
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1 d-flex justify-content-start align-items-center"><span
																className="rounded-circle bg-transparent-success d-flex justify-content-center align-items-center me-2"><i
																	className="ti ti-point-filled text-success"></i></span>Approved</a>
													</li>
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1 d-flex justify-content-start align-items-center"><span
																className="rounded-circle bg-transparent-danger d-flex justify-content-center align-items-center me-2"><i
																	className="ti ti-point-filled text-danger"></i></span>Declined</a>
													</li>
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1 d-flex justify-content-start align-items-center"><span
																className="rounded-circle bg-transparent-purple d-flex justify-content-center align-items-center me-2"><i
																	className="ti ti-point-filled text-purple"></i></span>New</a>
													</li>
												</ul>
											</div>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_leaves"><i className="ti ti-edit"></i></a>
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
											<div className="d-flex align-items-center">
												<p className="fs-14 fw-medium d-flex align-items-center mb-0">Casual Leave
												</p>
												<a href="#" className="ms-2" data-bs-toggle="tooltip"
													data-bs-placement="right"
													data-bs-title="I am currently experiencing a fever and feeling unwell. ">
													<i className="ti ti-info-circle text-info"></i>
												</a>
											</div>
										</td>
										<td>
											10 Dec 2024
										</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" onClick={(e) => e.preventDefault()}
													className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/users/user-34.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#" onClick={(e) => e.preventDefault()}>Doglas
															Martini</a></h6>
													<span className="fs-12 fw-normal ">Manager</span>
												</div>
											</div>
										</td>
										<td>
											11 Dec 2024
										</td>
										<td>
											2 Days
										</td>
										<td>
											<div className="dropdown">
												<a href="#" onClick={(e) => e.preventDefault()}
													className="dropdown-toggle btn btn-sm btn-white d-inline-flex align-items-center"
													data-bs-toggle="dropdown">
													<span
														className="rounded-circle bg-transparent-purple d-flex justify-content-center align-items-center me-2"><i
															className="ti ti-point-filled text-purple"></i></span> New
												</a>
												<ul className="dropdown-menu  dropdown-menu-end p-3">
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1 d-flex justify-content-start align-items-center"><span
																className="rounded-circle bg-transparent-success d-flex justify-content-center align-items-center me-2"><i
																	className="ti ti-point-filled text-success"></i></span>Approved</a>
													</li>
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1 d-flex justify-content-start align-items-center"><span
																className="rounded-circle bg-transparent-danger d-flex justify-content-center align-items-center me-2"><i
																	className="ti ti-point-filled text-danger"></i></span>Declined</a>
													</li>
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1 d-flex justify-content-start align-items-center"><span
																className="rounded-circle bg-transparent-purple d-flex justify-content-center align-items-center me-2"><i
																	className="ti ti-point-filled text-purple"></i></span>New</a>
													</li>
												</ul>
											</div>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_leaves"><i className="ti ti-edit"></i></a>
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
										Showing {Math.min((currentPage_leavesemployee - 1) * rowsPerPage_leavesemployee + 1, 11)}-{Math.min(currentPage_leavesemployee * rowsPerPage_leavesemployee, 11)} of 11 entries
									</p>
									<ul className="pagination mb-0">
										<li className={`page-item ${currentPage_leavesemployee === 1 ? 'disabled' : ''}`}>
											<button className="page-link" onClick={() => setCurrentPage_leavesemployee(p => Math.max(p - 1, 1))}>
												<i className="ti ti-chevron-left"></i>
											</button>
										</li>
										{[1, 2].map(page => (
											<li key={page} className={`page-item ${currentPage_leavesemployee === page ? 'active' : ''}`}>
												<button className="page-link" onClick={() => setCurrentPage_leavesemployee(page)}>{page}</button>
											</li>
										))}
										<li className={`page-item ${currentPage_leavesemployee === 2 ? 'disabled' : ''}`}>
											<button className="page-link" onClick={() => setCurrentPage_leavesemployee(p => Math.min(p + 1, 2))}>
												<i className="ti ti-chevron-right"></i>
											</button>
										</li>
									</ul>
								</div>
						</div>
					</div>
				</div>
				{/* /Leaves list */}

			</div>
			<div className="footer d-sm-flex align-items-center justify-content-between border-top bg-white p-3">
				<p className="mb-0">2014 - 2026 &copy; SmartHR.</p>
				<p>Designed &amp; Developed By <a href="#" onClick={(e) => e.preventDefault()} className="text-primary">Dreams</a></p>
			</div>
		</div>
		
    </>
  );
};

export default LeavesEmployee;
