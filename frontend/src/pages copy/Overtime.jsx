import React, { useState } from 'react';
import { Link } from 'react-router-dom';import PageHeader from '../components/common/PageHeader';


const Overtime = () => {
  // Pagination state for overtime
  const [currentPage_overtime, setCurrentPage_overtime] = useState(1);
  const [rowsPerPage_overtime, setRowsPerPage_overtime] = useState(10);
  const [searchQuery_overtime, setSearchQuery_overtime] = useState('');
  return (
    <>
      <div className="page-wrapper">
			<div className="content">

				{/* Breadcrumb */}
				<PageHeader 
					title="Overtime"
					breadcrumbs={[
						{ label: 'Dashboard' },
						{ label: 'Attendance' },
						{ label: 'Overtime', active: true }
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
							<a href="#" data-bs-toggle="modal" data-bs-target="#add_overtime"
								className="btn btn-primary d-flex align-items-center"><i
									className="ti ti-circle-plus me-2"></i>Add Overtime</a>
						</div>
						<div className="head-icons ms-2">
							<a href="#" onClick={(e) => e.preventDefault()} className="" data-bs-toggle="tooltip" data-bs-placement="top"
								data-bs-original-title="Collapse" id="collapse-header">
								<i className="ti ti-chevrons-up"></i>
							</a>
						</div>
				</PageHeader>
				{/* /Breadcrumb */}

				{/* Overtime Counts */}
				<div className="row">
					<div className="col-xl-3 col-md-6">
						<div className="card">
							<div className="card-body">
								<div className="d-flex align-items-center flex-wrap justify-content-between">
									<div>
										<p className="fs-12 fw-medium mb-0 text-gray-5">Overtime Employee</p>
										<h4>12</h4>
									</div>
									<div>
										<span
											className="p-2 br-10 bg-transparent-primary border border-primary d-flex align-items-center justify-content-center"><i
												className="ti ti-user-check text-primary fs-18"></i></span>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="col-xl-3 col-md-6">
						<div className="card">
							<div className="card-body">
								<div className="d-flex align-items-center flex-wrap justify-content-between">
									<div>
										<p className="fs-12 fw-medium mb-0 text-gray-5">Overtime Hours</p>
										<h4>118</h4>
									</div>
									<div>
										<span
											className="p-2 br-10 bg-pink-transparent border border-pink d-flex align-items-center justify-content-center"><i
												className="ti ti-user-edit text-pink fs-18"></i></span>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="col-xl-3 col-md-6">
						<div className="card">
							<div className="card-body">
								<div className="d-flex align-items-center flex-wrap justify-content-between">
									<div>
										<p className="fs-12 fw-medium mb-0 text-gray-5">Pending Request</p>
										<h4>23</h4>
									</div>
									<div>
										<span
											className="p-2 br-10 bg-transparent-purple border border-purple d-flex align-items-center justify-content-center"><i
												className="ti ti-user-exclamation text-purple fs-18"></i></span>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="col-xl-3 col-md-6">
						<div className="card">
						
							<div className="card-body">
								<div className="d-flex align-items-center flex-wrap justify-content-between">
									<div>
										<p className="fs-12 fw-medium mb-0 text-gray-5">Rejected</p>
										<h4>5</h4>
									</div>
									<div>
										<span
											className="p-2 br-10 bg-skyblue-transparent border border-skyblue d-flex align-items-center justify-content-center"><i
												className="ti ti-user-exclamation text-skyblue fs-18"></i></span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				{/* /Overtime Counts */}

				{/* Performance Indicator list */}
				<div className="card">
					
					<div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
						<h5>Overtime</h5>
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
									Employee
								</Link>
								<ul className="dropdown-menu  dropdown-menu-end p-3">
									<li>
										<Link to="#" className="dropdown-item rounded-1">Anthony Lewis</Link>
									</li>
									<li>
										<Link to="#" className="dropdown-item rounded-1">Brian
											Villalobos</Link>
									</li>
									<li>
										<Link to="#" className="dropdown-item rounded-1">Harvey Smith</Link>
									</li>
								</ul>
							</div>
							<div className="dropdown me-3">
								<Link to="#"
									className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
									data-bs-toggle="dropdown">
									Project
								</Link>
								<ul className="dropdown-menu  dropdown-menu-end p-3">
									<li>
										<Link to="#" className="dropdown-item rounded-1">Office
											Management</Link>
									</li>
									<li>
										<Link to="#" className="dropdown-item rounded-1">Project
											Management</Link>
									</li>
									<li>
										<Link to="#" className="dropdown-item rounded-1">Hospital
											Administration</Link>
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
										<Link to="#" className="dropdown-item rounded-1">Accepted</Link>
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
											value={rowsPerPage_overtime}
											onChange={(e) => { setRowsPerPage_overtime(Number(e.target.value)); setCurrentPage_overtime(1); }}
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
											value={searchQuery_overtime}
											onChange={(e) => { setSearchQuery_overtime(e.target.value); setCurrentPage_overtime(1); }}
										/>
									</div>
								</div>
<div className="custom-datatable-filter table-responsive">
							<table className="table datatable">
								<thead className="thead-light">
									<tr>
										<th>Employee</th>
										<th>Date </th>
										<th>Overtime Hours</th>
										<th>Project</th>
										<th>Approved By</th>
										<th>Status</th>
										<th></th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/users/user-32.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">Anthony Lewis</a></h6>
													<span className="fs-12 fw-normal ">UI/UX Team</span>
												</div>
											</div>
										</td>
										<td>
											14 Jan 2024
										</td>
										<td>32</td>
										<td>
											<div className=" d-flex align-items-center">
												<a href="#"
													className="fs-14 fw-medium text-gray-9 d-flex align-items-center"
													data-bs-toggle="modal" data-bs-target="#overtime_details">Office
													Management </a>
												<a href="#" className="ms-1" data-bs-toggle="tooltip"
													data-bs-placement="right" data-bs-title="Worked on the Management
												design & Development"><i className="ti ti-info-circle text-info"></i></a>
											</div>
										</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/users/user-39.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">Michael Walker</a></h6>
												</div>
											</div>
										</td>
										<td>
											<span className="badge badge-success d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Accepted
											</span>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_overtime"><i className="ti ti-edit"></i></a>
												<a href="#" data-bs-toggle="modal" data-bs-target="#delete_modal"><i
														className="ti ti-trash"></i></a>
											</div>
										</td>
									</tr>
									<tr>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/users/user-09.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">Brian Villalobos</a></h6>
													<span className="fs-12 fw-normal ">Development</span>
												</div>
											</div>
										</td>
										<td>
											21 Jan 2024
										</td>
										<td>45</td>
										<td>
											<div className=" d-flex align-items-center">
												<a href="#"
													className="fs-14 fw-medium text-gray-9 d-flex align-items-center"
													data-bs-toggle="modal" data-bs-target="#overtime_details">Project
													Management</a>
												<a href="#" className="ms-1" data-bs-toggle="tooltip"
													data-bs-placement="right" data-bs-title="Worked on the Management
												design & Development"><i className="ti ti-info-circle text-info"></i></a>
											</div>
										</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/reports/user-02.jpg" className="img-fluid"
														alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">Sophie Headrick</a></h6>
												</div>
											</div>
										</td>
										<td>
											<span className="badge badge-success d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Accepted
											</span>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_overtime"><i className="ti ti-edit"></i></a>
												<a href="#" data-bs-toggle="modal" data-bs-target="#delete_modal"><i
														className="ti ti-trash"></i></a>
											</div>
										</td>
									</tr>
									<tr>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/users/user-01.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">Harvey Smith</a></h6>
													<span className="fs-12 fw-normal ">HR</span>
												</div>
											</div>
										</td>
										<td>
											20 Feb 2024
										</td>
										<td>31</td>
										<td>
											<div className=" d-flex align-items-center">
												<a href="#"
													className="fs-14 fw-medium text-gray-9 d-flex align-items-center"
													data-bs-toggle="modal" data-bs-target="#overtime_details">Project
													Management</a>
												<a href="#" className="ms-1" data-bs-toggle="tooltip"
													data-bs-placement="right" data-bs-title="Worked on the Management
												design & Development"><i className="ti ti-info-circle text-info"></i></a>
											</div>
										</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/reports/user-03.jpg" className="img-fluid"
														alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">Cameron Drake</a></h6>
												</div>
											</div>
										</td>
										<td>
											<span className="badge badge-success d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Accepted
											</span>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_overtime"><i className="ti ti-edit"></i></a>
												<a href="#" data-bs-toggle="modal" data-bs-target="#delete_modal"><i
														className="ti ti-trash"></i></a>
											</div>
										</td>
									</tr>
									<tr>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/users/user-33.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">Stephan Peralt</a></h6>
													<span className="fs-12 fw-normal ">Management</span>
												</div>
											</div>
										</td>
										<td>
											15 Mar 2024
										</td>
										<td>45</td>
										<td>
											<div className=" d-flex align-items-center">
												<a href="#"
													className="fs-14 fw-medium text-gray-9 d-flex align-items-center"
													data-bs-toggle="modal" data-bs-target="#overtime_details">Hospital
													Administration</a>
												<a href="#" className="ms-1" data-bs-toggle="tooltip"
													data-bs-placement="right" data-bs-title="Worked on the Management
												design & Development"><i className="ti ti-info-circle text-info"></i></a>
											</div>
										</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/reports/user-04.jpg" className="img-fluid"
														alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">Doris Crowley</a></h6>
												</div>
											</div>
										</td>
										<td>
											<span className="badge badge-danger d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Rejected
											</span>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_overtime"><i className="ti ti-edit"></i></a>
												<a href="#" data-bs-toggle="modal" data-bs-target="#delete_modal"><i
														className="ti ti-trash"></i></a>
											</div>
										</td>
									</tr>
									<tr>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/users/user-34.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">Doglas Martini</a></h6>
													<span className="fs-12 fw-normal ">Development</span>
												</div>
											</div>
										</td>
										<td>
											12 Apr 2024
										</td>
										<td>36</td>
										<td>
											<div className=" d-flex align-items-center">
												<a href="#"
													className="fs-14 fw-medium text-gray-9 d-flex align-items-center"
													data-bs-toggle="modal" data-bs-target="#overtime_details">Office
													Management</a>
												<a href="#" className="ms-1" data-bs-toggle="tooltip"
													data-bs-placement="right" data-bs-title="Worked on the Management
												design & Development"><i className="ti ti-info-circle text-info"></i></a>
											</div>
										</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/reports/user-06.jpg" className="img-fluid"
														alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">Thomas Bordelon</a></h6>
												</div>
											</div>
										</td>
										<td>
											<span className="badge badge-success d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Accepted
											</span>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_overtime"><i className="ti ti-edit"></i></a>
												<a href="#" data-bs-toggle="modal" data-bs-target="#delete_modal"><i
														className="ti ti-trash"></i></a>
											</div>
										</td>
									</tr>
									<tr>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/users/user-02.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">Linda Ray</a></h6>
													<span className="fs-12 fw-normal ">UI/UX Team</span>
												</div>
											</div>
										</td>
										<td>
											20 Apr 2024
										</td>
										<td>49</td>
										<td>
											<div className=" d-flex align-items-center">
												<a href="#"
													className="fs-14 fw-medium text-gray-9 d-flex align-items-center"
													data-bs-toggle="modal" data-bs-target="#overtime_details">Hospital
													Administration</a>
												<a href="#" className="ms-1" data-bs-toggle="tooltip"
													data-bs-placement="right" data-bs-title="Worked on the Management
												design & Development"><i className="ti ti-info-circle text-info"></i></a>
											</div>
										</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/reports/user-06.jpg" className="img-fluid"
														alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">Kathleen Gutierrez</a></h6>
												</div>
											</div>
										</td>
										<td>
											<span className="badge badge-success d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Accepted
											</span>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_overtime"><i className="ti ti-edit"></i></a>
												<a href="#" data-bs-toggle="modal" data-bs-target="#delete_modal"><i
														className="ti ti-trash"></i></a>
											</div>
										</td>
									</tr>
									<tr>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/users/user-35.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">Elliot Murray</a></h6>
													<span className="fs-12 fw-normal ">Developer</span>
												</div>
											</div>
										</td>
										<td>
											06 Jul 2024
										</td>
										<td>57</td>
										<td>
											<div className=" d-flex align-items-center">
												<a href="#"
													className="fs-14 fw-medium text-gray-9 d-flex align-items-center"
													data-bs-toggle="modal" data-bs-target="#overtime_details">Video
													Calling App</a>
												<a href="#" className="ms-1" data-bs-toggle="tooltip"
													data-bs-placement="right" data-bs-title="Worked on the Management
												design & Development"><i className="ti ti-info-circle text-info"></i></a>
											</div>
										</td>

										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/reports/user-07.jpg" className="img-fluid"
														alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">Bruce Wright</a></h6>
												</div>
											</div>
										</td>
										<td>
											<span className="badge badge-success d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Accepted
											</span>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_overtime"><i className="ti ti-edit"></i></a>
												<a href="#" data-bs-toggle="modal" data-bs-target="#delete_modal"><i
														className="ti ti-trash"></i></a>
											</div>
										</td>
									</tr>
									<tr>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/users/user-36.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">Rebecca Smtih</a></h6>
													<span className="fs-12 fw-normal ">UI/UX Team</span>
												</div>
											</div>
										</td>
										<td>
											02 Sep 2024
										</td>
										<td>21</td>
										<td>
											<div className=" d-flex align-items-center">
												<a href="#"
													className="fs-14 fw-medium text-gray-9 d-flex align-items-center"
													data-bs-toggle="modal" data-bs-target="#overtime_details">Office
													Management</a>
												<a href="#" className="ms-1" data-bs-toggle="tooltip"
													data-bs-placement="right" data-bs-title="Worked on the Management
												design & Development"><i className="ti ti-info-circle text-info"></i></a>
											</div>
										</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/reports/user-09.jpg" className="img-fluid"
														alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">Estelle Morgan</a></h6>
												</div>
											</div>
										</td>
										<td>
											<span className="badge badge-danger d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Rejected
											</span>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_overtime"><i className="ti ti-edit"></i></a>
												<a href="#" data-bs-toggle="modal" data-bs-target="#delete_modal"><i
														className="ti ti-trash"></i></a>
											</div>
										</td>
									</tr>
									<tr>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/users/user-37.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">Connie Waters</a></h6>
													<span className="fs-12 fw-normal ">Management</span>
												</div>
											</div>
										</td>
										<td>
											15 Nov 2024
										</td>
										<td>32</td>
										<td>
											<div className=" d-flex align-items-center">
												<a href="#"
													className="fs-14 fw-medium text-gray-9 d-flex align-items-center"
													data-bs-toggle="modal" data-bs-target="#overtime_details">Project
													Management</a>
												<a href="#" className="ms-1" data-bs-toggle="tooltip"
													data-bs-placement="right" data-bs-title="Worked on the Management
												design & Development"><i className="ti ti-info-circle text-info"></i></a>
											</div>
										</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/reports/user-10.jpg" className="img-fluid"
														alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">Stephen Dias</a></h6>
												</div>
											</div>
										</td>
										<td>
											<span className="badge badge-success d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Accepted
											</span>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_overtime"><i className="ti ti-edit"></i></a>
												<a href="#" data-bs-toggle="modal" data-bs-target="#delete_modal"><i
														className="ti ti-trash"></i></a>
											</div>
										</td>
									</tr>
									<tr>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/users/user-38.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">Connie Waters</a></h6>
													<span className="fs-12 fw-normal ">Management</span>
												</div>
											</div>
										</td>
										<td>
											15 Nov 2024
										</td>
										<td>66</td>
										<td>
											<div className=" d-flex align-items-center">
												<a href="#"
													className="fs-14 fw-medium text-gray-9 d-flex align-items-center"
													data-bs-toggle="modal" data-bs-target="#overtime_details">Ware house
													developement</a>
												<a href="#" className="ms-1" data-bs-toggle="tooltip"
													data-bs-placement="right" data-bs-title="Worked on the Management
												design & Development"><i className="ti ti-info-circle text-info"></i></a>
											</div>
										</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/reports/user-05.jpg" className="img-fluid"
														alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">Angela Thomas</a></h6>
												</div>
											</div>
										</td>
										<td>
											<span className="badge badge-success d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Accepted
											</span>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_overtime"><i className="ti ti-edit"></i></a>
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
										Showing {Math.min((currentPage_overtime - 1) * rowsPerPage_overtime + 1, 11)}-{Math.min(currentPage_overtime * rowsPerPage_overtime, 11)} of 11 entries
									</p>
									<ul className="pagination mb-0">
										<li className={`page-item ${currentPage_overtime === 1 ? 'disabled' : ''}`}>
											<button className="page-link" onClick={() => setCurrentPage_overtime(p => Math.max(p - 1, 1))}>
												<i className="ti ti-chevron-left"></i>
											</button>
										</li>
										{[1, 2].map(page => (
											<li key={page} className={`page-item ${currentPage_overtime === page ? 'active' : ''}`}>
												<button className="page-link" onClick={() => setCurrentPage_overtime(page)}>{page}</button>
											</li>
										))}
										<li className={`page-item ${currentPage_overtime === 2 ? 'disabled' : ''}`}>
											<button className="page-link" onClick={() => setCurrentPage_overtime(p => Math.min(p + 1, 2))}>
												<i className="ti ti-chevron-right"></i>
											</button>
										</li>
									</ul>
								</div>
						</div>
					</div>
				</div>
				{/* /Performance Indicator list */}

			</div>

			<div className="footer d-sm-flex align-items-center justify-content-between border-top bg-white p-3">
				<p className="mb-0">2014 - 2026 &copy; SmartHR.</p>
				<p>Designed &amp; Developed By <a href="#" onClick={(e) => e.preventDefault()} className="text-primary">Dreams</a></p>
			</div>

		</div>
		
    </>
  );
};

export default Overtime;
