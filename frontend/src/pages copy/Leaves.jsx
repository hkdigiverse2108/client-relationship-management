import React, { useState } from 'react';
import { Link } from 'react-router-dom';import PageHeader from '../components/common/PageHeader';


const Leaves = () => {
  // Pagination state for leaves
  const [currentPage_leaves, setCurrentPage_leaves] = useState(1);
  const [rowsPerPage_leaves, setRowsPerPage_leaves] = useState(10);
  const [searchQuery_leaves, setSearchQuery_leaves] = useState('');
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
						<div className="card bg-green-img">
							<div className="card-body">
								<div className="d-flex align-items-center justify-content-between">
									<div className="d-flex align-items-center">
										<div className="flex-shrink-0 me-2">
											<span
												className="avatar avatar-md rounded-circle bg-white d-flex align-items-center justify-content-center">
												<i className="ti ti-user-check text-success fs-18"></i>
											</span>
										</div>
									</div>
									<div className="text-end">
										<p className="mb-1">Total Present</p>
										<h4>180/200</h4>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="col-xl-3 col-md-6">
						<div className="card bg-pink-img">
							<div className="card-body">
								<div className="d-flex align-items-center justify-content-between">
									<div className="d-flex align-items-center">
										<div className="flex-shrink-0 me-2">
											<span
												className="avatar avatar-md rounded-circle bg-white d-flex align-items-center justify-content-center">
												<i className="ti ti-user-edit text-pink fs-18"></i>
											</span>
										</div>
									</div>
									<div className="text-end">
										<p className="mb-1">Planned Leaves</p>
										<h4>10</h4>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="col-xl-3 col-md-6">
						<div className="card bg-yellow-img">
							<div className="card-body">
								<div className="d-flex align-items-center justify-content-between">
									<div className="d-flex align-items-center">
										<div className="flex-shrink-0 me-2">
											<span
												className="avatar avatar-md rounded-circle bg-white d-flex align-items-center justify-content-center">
												<i className="ti ti-user-exclamation text-warning fs-18"></i>
											</span>
										</div>
									</div>
									<div className="text-end">
										<p className="mb-1">Unplanned Leaves</p>
										<h4>10</h4>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="col-xl-3 col-md-6">
						<div className="card bg-blue-img">
							
							<div className="card-body">
								<div className="d-flex align-items-center justify-content-between">
									<div className="d-flex align-items-center">
										<div className="flex-shrink-0 me-2">
											<span
												className="avatar avatar-md rounded-circle bg-white d-flex align-items-center justify-content-center">
												<i className="ti ti-user-question text-info fs-18"></i>
											</span>
										</div>
									</div>
									<div className="text-end">
										<p className="mb-1">Pending Requests</p>
										<h4>15</h4>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				{/* /Leaves Info */}

				{/* Leaves list */}
				<div className="card">
					
					<div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
						<h5>Leave List</h5>
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
											value={rowsPerPage_leaves}
											onChange={(e) => { setRowsPerPage_leaves(Number(e.target.value)); setCurrentPage_leaves(1); }}
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
											value={searchQuery_leaves}
											onChange={(e) => { setSearchQuery_leaves(e.target.value); setCurrentPage_leaves(1); }}
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
										<th>Employee</th>
										<th>Leave Type</th>
										<th>From</th>
										<th>To</th>
										<th>No of Days</th>
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
												<a href="#" onClick={(e) => e.preventDefault()}
													className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/users/user-32.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#" onClick={(e) => e.preventDefault()}>Anthony
															Lewis</a></h6>
													<span className="fs-12 fw-normal ">Finance</span>
												</div>
											</div>
										</td>
										<td>
											<div className="d-flex align-items-center">
												<p className="fs-14 fw-medium d-flex align-items-center mb-0">Medical Leave
												</p>
												<a href="#" className="ms-2" data-bs-toggle="tooltip"
													data-bs-placement="right"
													data-bs-title="I am currently experiencing a fever and design & Development">
													<i className="ti ti-info-circle text-info"></i>
												</a>
											</div>
										</td>
										<td>
											14 Jan 2024
										</td>
										<td>
											15 Jan 2024
										</td>
										<td>
											2 Days
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
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" onClick={(e) => e.preventDefault()}
													className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/users/user-09.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#" onClick={(e) => e.preventDefault()}>Brian
															Villalobos</a></h6>
													<span className="fs-12 fw-normal ">Developer</span>
												</div>
											</div>
										</td>
										<td>
											<div className="d-flex align-items-center">
												<p className="fs-14 fw-medium d-flex align-items-center mb-0">Casual Leave
												</p>
												<a href="#" className="ms-2" data-bs-toggle="tooltip"
													data-bs-placement="right"
													data-bs-title="I am currently experiencing a fever and design & Development">
													<i className="ti ti-info-circle text-info"></i>
												</a>
											</div>
										</td>
										<td>
											21 Jan 2024
										</td>
										<td>
											25 Jan 2024
										</td>
										<td>
											5 Days
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
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" onClick={(e) => e.preventDefault()}
													className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/users/user-01.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#" onClick={(e) => e.preventDefault()}>Harvey Smith</a>
													</h6>
													<span className="fs-12 fw-normal ">Developer</span>
												</div>
											</div>
										</td>
										<td>
											<div className="d-flex align-items-center">
												<p className="fs-14 fw-medium d-flex align-items-center mb-0">Medical Leave
												</p>
												<a href="#" className="ms-2" data-bs-toggle="tooltip"
													data-bs-placement="right"
													data-bs-title="I am currently experiencing a fever and design & Development">
													<i className="ti ti-info-circle text-info"></i>
												</a>
											</div>
										</td>
										<td>
											20 Feb 2024
										</td>
										<td>
											22 Feb 2024
										</td>
										<td>
											3 Days
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
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" onClick={(e) => e.preventDefault()}
													className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/users/user-33.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#" onClick={(e) => e.preventDefault()}>Stephan
															Peralt</a></h6>
													<span className="fs-12 fw-normal ">Executive Officer</span>
												</div>
											</div>
										</td>
										<td>
											<div className="d-flex align-items-center">
												<p className="fs-14 fw-medium d-flex align-items-center mb-0">Annual Leave
												</p>
												<a href="#" className="ms-2" data-bs-toggle="tooltip"
													data-bs-placement="right"
													data-bs-title="I am currently experiencing a fever and design & Development">
													<i className="ti ti-info-circle text-info"></i>
												</a>
											</div>
										</td>
										<td>
											15 Mar 2024
										</td>
										<td>
											17 Mar 2024
										</td>
										<td>
											3 Days
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
											<div className="d-flex align-items-center">
												<p className="fs-14 fw-medium d-flex align-items-center mb-0">Casual Leave
												</p>
												<a href="#" className="ms-2" data-bs-toggle="tooltip"
													data-bs-placement="right"
													data-bs-title="I am currently experiencing a fever and design & Development">
													<i className="ti ti-info-circle text-info"></i>
												</a>
											</div>
										</td>
										<td>
											12 Apr 2024
										</td>
										<td>
											16 Apr 2024
										</td>
										<td>
											5 Days
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
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" onClick={(e) => e.preventDefault()}
													className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/users/user-02.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#" onClick={(e) => e.preventDefault()}>Linda Ray</a>
													</h6>
													<span className="fs-12 fw-normal ">Finance</span>
												</div>
											</div>
										</td>
										<td>
											<div className="d-flex align-items-center">
												<p className="fs-14 fw-medium d-flex align-items-center mb-0">Medical Leave
												</p>
												<a href="#" className="ms-2" data-bs-toggle="tooltip"
													data-bs-placement="right"
													data-bs-title="I am currently experiencing a fever and design & Development">
													<i className="ti ti-info-circle text-info"></i>
												</a>
											</div>
										</td>
										<td>
											20 Apr 2024
										</td>
										<td>
											21 Apr 2024
										</td>
										<td>
											2 Days
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
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" onClick={(e) => e.preventDefault()}
													className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/users/user-35.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#" onClick={(e) => e.preventDefault()}>Elliot
															Murray</a></h6>
													<span className="fs-12 fw-normal ">Developer</span>
												</div>
											</div>
										</td>
										<td>
											<div className="d-flex align-items-center">
												<p className="fs-14 fw-medium d-flex align-items-center mb-0">Casual Leave
												</p>
												<a href="#" className="ms-2" data-bs-toggle="tooltip"
													data-bs-placement="right"
													data-bs-title="I am currently experiencing a fever and design & Development">
													<i className="ti ti-info-circle text-info"></i>
												</a>
											</div>
										</td>
										<td>
											06 Jul 2024
										</td>
										<td>
											06 Jul 2024
										</td>
										<td>
											1 Day
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
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" onClick={(e) => e.preventDefault()}
													className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/users/user-36.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#" onClick={(e) => e.preventDefault()}>Rebecca
															Smtih</a></h6>
													<span className="fs-12 fw-normal ">Executive</span>
												</div>
											</div>
										</td>
										<td>
											<div className="d-flex align-items-center">
												<p className="fs-14 fw-medium d-flex align-items-center mb-0">Medical Leave
												</p>
												<a href="#" className="ms-2" data-bs-toggle="tooltip"
													data-bs-placement="right"
													data-bs-title="I am currently experiencing a fever and design & Development">
													<i className="ti ti-info-circle text-info"></i>
												</a>
											</div>
										</td>
										<td>
											02 Sep 2024
										</td>
										<td>
											04 Sep 2024
										</td>
										<td>
											3 Days
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
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" onClick={(e) => e.preventDefault()}
													className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/users/user-37.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#" onClick={(e) => e.preventDefault()}>Connie
															Waters</a></h6>
													<span className="fs-12 fw-normal ">Developer</span>
												</div>
											</div>
										</td>
										<td>
											<div className="d-flex align-items-center">
												<p className="fs-14 fw-medium d-flex align-items-center mb-0">Annual Leave
												</p>
												<a href="#" className="ms-2" data-bs-toggle="tooltip"
													data-bs-placement="right"
													data-bs-title="I am currently experiencing a fever and design & Development">
													<i className="ti ti-info-circle text-info"></i>
												</a>
											</div>
										</td>
										<td>
											15 Nov 2024
										</td>
										<td>
											15 Nov 2024
										</td>
										<td>
											1 Day
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
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" onClick={(e) => e.preventDefault()}
													className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/users/user-38.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#" onClick={(e) => e.preventDefault()}>Lori
															Broaddus</a></h6>
													<span className="fs-12 fw-normal ">Finance</span>
												</div>
											</div>
										</td>
										<td>
											<div className="d-flex align-items-center">
												<p className="fs-14 fw-medium d-flex align-items-center mb-0">Casual Leave
												</p>
												<a href="#" className="ms-2" data-bs-toggle="tooltip"
													data-bs-placement="right"
													data-bs-title="I am currently experiencing a fever and design & Development">
													<i className="ti ti-info-circle text-info"></i>
												</a>
											</div>
										</td>
										<td>
											10 Dec 2024
										</td>
										<td>
											11 Dec 2024
										</td>
										<td>
											2 Days
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
										Showing {Math.min((currentPage_leaves - 1) * rowsPerPage_leaves + 1, 11)}-{Math.min(currentPage_leaves * rowsPerPage_leaves, 11)} of 11 entries
									</p>
									<ul className="pagination mb-0">
										<li className={`page-item ${currentPage_leaves === 1 ? 'disabled' : ''}`}>
											<button className="page-link" onClick={() => setCurrentPage_leaves(p => Math.max(p - 1, 1))}>
												<i className="ti ti-chevron-left"></i>
											</button>
										</li>
										{[1, 2].map(page => (
											<li key={page} className={`page-item ${currentPage_leaves === page ? 'active' : ''}`}>
												<button className="page-link" onClick={() => setCurrentPage_leaves(page)}>{page}</button>
											</li>
										))}
										<li className={`page-item ${currentPage_leaves === 2 ? 'disabled' : ''}`}>
											<button className="page-link" onClick={() => setCurrentPage_leaves(p => Math.min(p + 1, 2))}>
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

export default Leaves;
