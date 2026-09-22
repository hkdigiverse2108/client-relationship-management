import React, { useState } from 'react';
import { Link } from 'react-router-dom';import PageHeader from '../components/common/PageHeader';


const Projects = () => {
  // Pagination state for projects
  const [currentPage_projects, setCurrentPage_projects] = useState(1);
  const [rowsPerPage_projects, setRowsPerPage_projects] = useState(10);
  const [searchQuery_projects, setSearchQuery_projects] = useState('');
  return (
    <>
      <div className="page-wrapper">
			<div className="content">

				{/* Breadcrumb */}
				<PageHeader 
					title="Projects"
					breadcrumbs={[
						{ label: 'Dashboard' },
						{ label: 'Projects' },
						{ label: 'Projects', active: true }
					]}
				>
					<div className="me-2 mb-2">
							<div className="d-flex align-items-center border bg-white rounded p-1 me-2 icon-list">
								<a href="/projects" className="btn btn-icon btn-sm active bg-primary text-white me-1"><i
										className="ti ti-list-tree"></i></a>
								<a href="/projects-grid" className="btn btn-icon btn-sm"><i
										className="ti ti-layout-grid"></i></a>
							</div>
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
							<a href="#" data-bs-toggle="modal" data-bs-target="#add_project"
								className="btn btn-primary d-flex align-items-center"><i
									className="ti ti-circle-plus me-2"></i>Add Project</a>
						</div>
						<div className="ms-2 head-icons">
							<a href="#" onClick={(e) => e.preventDefault()} className="" data-bs-toggle="tooltip" data-bs-placement="top"
								data-bs-original-title="Collapse" id="collapse-header">
								<i className="ti ti-chevrons-up"></i>
							</a>
						</div>
				</PageHeader>
				{/* /Breadcrumb */}

				{/* Project list */}
				<div className="card">
					
					<div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
						<h5>Project List</h5>
						<div className="d-flex my-xl-auto right-content align-items-center flex-wrap row-gap-3">
							<div className="me-3">
								<div className="input-icon-end position-relative">
									<input type="text" className="form-control date-range bookingrange"
										placeholder="dd/mm/yyyy - dd/mm/yyyy" />
									<span className="input-icon-addon">
										<i className="ti ti-chevron-down"></i>
									</span>
								</div>
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
											value={rowsPerPage_projects}
											onChange={(e) => { setRowsPerPage_projects(Number(e.target.value)); setCurrentPage_projects(1); }}
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
											value={searchQuery_projects}
											onChange={(e) => { setSearchQuery_projects(e.target.value); setCurrentPage_projects(1); }}
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
										<th>Project ID</th>
										<th>Project Name</th>
										<th>Leader</th>
										<th>Team</th>
										<th>Deadline</th>
										<th>Priority</th>
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
										<td><a href="/project-details">PRO-001</a></td>
										<td>
											<h6 className="fw-medium"><a href="/project-details">Office Management
													App</a></h6>
										</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" onClick={(e) => e.preventDefault()}
													className="avatar avatar-sm border avatar-rounded">
													<img src="/assets/img/users/user-39.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-normal"><a href="#" onClick={(e) => e.preventDefault()}>Michael
															Walker</a></h6>
												</div>
											</div>
										</td>
										<td>
											<div className="avatar-list-stacked avatar-group-sm">
												<span className="avatar avatar-rounded">
													<img className="border border-white"
														src="/assets/img/profiles/avatar-02.jpg" alt="img" />
												</span>
												<span className="avatar avatar-rounded">
													<img className="border border-white"
														src="/assets/img/profiles/avatar-03.jpg" alt="img" />
												</span>
												<span className="avatar avatar-rounded">
													<img className="border border-white"
														src="/assets/img/profiles/avatar-05.jpg" alt="img" />
												</span>
												<a className="avatar bg-primary avatar-rounded text-fixed-white fs-12 fw-medium"
													href="#" onClick={(e) => e.preventDefault()}>
													+1
												</a>
											</div>
										</td>
										<td>
											12 Sep 2024
										</td>
										<td>
											<div className="dropdown">
												<a href="#" onClick={(e) => e.preventDefault()}
													className="dropdown-toggle btn btn-sm btn-white d-inline-flex align-items-center"
													data-bs-toggle="dropdown">
													<span
														className="rounded-circle bg-transparent-danger d-flex justify-content-center align-items-center me-2"><i
															className="ti ti-point-filled text-danger"></i></span> High
												</a>
												<ul className="dropdown-menu  dropdown-menu-end p-3">
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1 d-flex justify-content-start align-items-center"><span
																className="rounded-circle bg-transparent-danger d-flex justify-content-center align-items-center me-2"><i
																	className="ti ti-point-filled text-danger"></i></span>High</a>
													</li>
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1 d-flex justify-content-start align-items-center"><span
																className="rounded-circle bg-transparent-warning d-flex justify-content-center align-items-center me-2"><i
																	className="ti ti-point-filled text-warning"></i></span>Medium</a>
													</li>
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1 d-flex justify-content-start align-items-center"><span
																className="rounded-circle bg-transparent-success d-flex justify-content-center align-items-center me-2"><i
																	className="ti ti-point-filled text-success"></i></span>Low</a>
													</li>
												</ul>
											</div>
										</td>
										<td>
											<span className="badge badge-success d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Active
											</span>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_project"><i className="ti ti-edit"></i></a>
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
										<td><a href="/project-details">PRO-002</a></td>
										<td>
											<h6 className="fw-medium"><a href="/project-details">Clinic Management</a>
											</h6>
										</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" onClick={(e) => e.preventDefault()}
													className="avatar avatar-sm border avatar-rounded">
													<img src="/assets/img/users/user-09.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-normal"><a href="#" onClick={(e) => e.preventDefault()}>Brian
															Villalobos</a></h6>
												</div>
											</div>
										</td>
										<td>
											<div className="avatar-list-stacked avatar-group-sm">
												<span className="avatar avatar-rounded">
													<img className="border border-white"
														src="/assets/img/profiles/avatar-06.jpg" alt="img" />
												</span>
												<span className="avatar avatar-rounded">
													<img className="border border-white"
														src="/assets/img/profiles/avatar-07.jpg" alt="img" />
												</span>
												<span className="avatar avatar-rounded">
													<img className="border border-white"
														src="/assets/img/profiles/avatar-08.jpg" alt="img" />
												</span>
												<a className="avatar bg-primary avatar-rounded text-fixed-white fs-12 fw-medium"
													href="#" onClick={(e) => e.preventDefault()}>
													+1
												</a>
											</div>
										</td>
										<td>
											24 Oct 2024
										</td>
										<td>
											<div className="dropdown">
												<a href="#" onClick={(e) => e.preventDefault()}
													className="dropdown-toggle btn btn-sm btn-white d-inline-flex align-items-center"
													data-bs-toggle="dropdown">
													<span
														className="rounded-circle bg-transparent-success d-flex justify-content-center align-items-center me-2"><i
															className="ti ti-point-filled text-success"></i></span> Low
												</a>
												<ul className="dropdown-menu  dropdown-menu-end p-3">
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1 d-flex justify-content-start align-items-center"><span
																className="rounded-circle bg-transparent-danger d-flex justify-content-center align-items-center me-2"><i
																	className="ti ti-point-filled text-danger"></i></span>High</a>
													</li>
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1 d-flex justify-content-start align-items-center"><span
																className="rounded-circle bg-transparent-warning d-flex justify-content-center align-items-center me-2"><i
																	className="ti ti-point-filled text-warning"></i></span>Medium</a>
													</li>
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1 d-flex justify-content-start align-items-center"><span
																className="rounded-circle bg-transparent-success d-flex justify-content-center align-items-center me-2"><i
																	className="ti ti-point-filled text-success"></i></span>Low</a>
													</li>
												</ul>
											</div>
										</td>
										<td>
											<span className="badge badge-success d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Active
											</span>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_project"><i className="ti ti-edit"></i></a>
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
										<td><a href="/project-details">PRO-003</a></td>
										<td>
											<h6 className="fw-medium"><a href="/project-details">Educational
													Platform</a></h6>
										</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" onClick={(e) => e.preventDefault()}
													className="avatar avatar-sm border avatar-rounded">
													<img src="/assets/img/users/user-01.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-normal"><a href="#" onClick={(e) => e.preventDefault()}>Harvey Smith</a>
													</h6>
												</div>
											</div>
										</td>
										<td>
											<div className="avatar-list-stacked avatar-group-sm">
												<span className="avatar avatar-rounded">
													<img className="border border-white"
														src="/assets/img/profiles/avatar-09.jpg" alt="img" />
												</span>
												<span className="avatar avatar-rounded">
													<img className="border border-white"
														src="/assets/img/profiles/avatar-10.jpg" alt="img" />
												</span>
												<span className="avatar avatar-rounded">
													<img className="border border-white"
														src="/assets/img/profiles/avatar-11.jpg" alt="img" />
												</span>
												<a className="avatar bg-primary avatar-rounded text-fixed-white fs-12 fw-medium"
													href="#" onClick={(e) => e.preventDefault()}>
													+1
												</a>
											</div>
										</td>
										<td>
											18 Feb 2024
										</td>
										<td>
											<div className="dropdown">
												<a href="#" onClick={(e) => e.preventDefault()}
													className="dropdown-toggle btn btn-sm btn-white d-inline-flex align-items-center"
													data-bs-toggle="dropdown">
													<span
														className="rounded-circle bg-transparent-warning d-flex justify-content-center align-items-center me-2"><i
															className="ti ti-point-filled text-warning"></i></span> Medium
												</a>
												<ul className="dropdown-menu  dropdown-menu-end p-3">
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1 d-flex justify-content-start align-items-center"><span
																className="rounded-circle bg-transparent-danger d-flex justify-content-center align-items-center me-2"><i
																	className="ti ti-point-filled text-danger"></i></span>High</a>
													</li>
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1 d-flex justify-content-start align-items-center"><span
																className="rounded-circle bg-transparent-warning d-flex justify-content-center align-items-center me-2"><i
																	className="ti ti-point-filled text-warning"></i></span>Medium</a>
													</li>
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1 d-flex justify-content-start align-items-center"><span
																className="rounded-circle bg-transparent-success d-flex justify-content-center align-items-center me-2"><i
																	className="ti ti-point-filled text-success"></i></span>Low</a>
													</li>
												</ul>
											</div>
										</td>
										<td>
											<span className="badge badge-success d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Active
											</span>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_project"><i className="ti ti-edit"></i></a>
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
										<td><a href="/project-details">PRO-004</a></td>
										<td>
											<h6 className="fw-medium"><a href="/project-details">Chat & Call Mobile
													App</a> </h6>
										</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" onClick={(e) => e.preventDefault()}
													className="avatar avatar-sm border avatar-rounded">
													<img src="/assets/img/users/user-33.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-normal"><a href="#" onClick={(e) => e.preventDefault()}>Stephan
															Peralt</a></h6>
												</div>
											</div>
										</td>
										<td>
											<div className="avatar-list-stacked avatar-group-sm">
												<span className="avatar avatar-rounded">
													<img className="border border-white"
														src="/assets/img/profiles/avatar-12.jpg" alt="img" />
												</span>
												<span className="avatar avatar-rounded">
													<img className="border border-white"
														src="/assets/img/profiles/avatar-13.jpg" alt="img" />
												</span>
												<span className="avatar avatar-rounded">
													<img className="border border-white"
														src="/assets/img/profiles/avatar-14.jpg" alt="img" />
												</span>
												<a className="avatar bg-primary avatar-rounded text-fixed-white fs-12 fw-medium"
													href="#" onClick={(e) => e.preventDefault()}>
													+3
												</a>
											</div>
										</td>
										<td>
											17 Oct 2024
										</td>
										<td>
											<div className="dropdown">
												<a href="#" onClick={(e) => e.preventDefault()}
													className="dropdown-toggle btn btn-sm btn-white d-inline-flex align-items-center"
													data-bs-toggle="dropdown">
													<span
														className="rounded-circle bg-transparent-warning d-flex justify-content-center align-items-center me-2"><i
															className="ti ti-point-filled text-warning"></i></span> Medium
												</a>
												<ul className="dropdown-menu  dropdown-menu-end p-3">
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1 d-flex justify-content-start align-items-center"><span
																className="rounded-circle bg-transparent-danger d-flex justify-content-center align-items-center me-2"><i
																	className="ti ti-point-filled text-danger"></i></span>High</a>
													</li>
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1 d-flex justify-content-start align-items-center"><span
																className="rounded-circle bg-transparent-warning d-flex justify-content-center align-items-center me-2"><i
																	className="ti ti-point-filled text-warning"></i></span>Medium</a>
													</li>
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1 d-flex justify-content-start align-items-center"><span
																className="rounded-circle bg-transparent-success d-flex justify-content-center align-items-center me-2"><i
																	className="ti ti-point-filled text-success"></i></span>Low</a>
													</li>
												</ul>
											</div>
										</td>
										<td>
											<span className="badge badge-success d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Active
											</span>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_project"><i className="ti ti-edit"></i></a>
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
										<td><a href="/project-details">PRO-005</a></td>
										<td>
											<h6 className="fw-medium"> <a href="/project-details">Travel Planning
													Website</a></h6>
										</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" onClick={(e) => e.preventDefault()}
													className="avatar avatar-sm border avatar-rounded">
													<img src="/assets/img/users/user-34.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-normal"><a href="#" onClick={(e) => e.preventDefault()}>Doglas
															Martini</a></h6>
												</div>
											</div>
										</td>
										<td>
											<div className="avatar-list-stacked avatar-group-sm">
												<span className="avatar avatar-rounded">
													<img className="border border-white"
														src="/assets/img/profiles/avatar-15.jpg" alt="img" />
												</span>
												<span className="avatar avatar-rounded">
													<img className="border border-white"
														src="/assets/img/profiles/avatar-16.jpg" alt="img" />
												</span>
												<span className="avatar avatar-rounded">
													<img className="border border-white"
														src="/assets/img/profiles/avatar-17.jpg" alt="img" />
												</span>
												<a className="avatar bg-primary avatar-rounded text-fixed-white fs-12 fw-medium"
													href="#" onClick={(e) => e.preventDefault()}>
													+2
												</a>
											</div>
										</td>
										<td>
											20 Jul 2024
										</td>
										<td>
											<div className="dropdown">
												<a href="#" onClick={(e) => e.preventDefault()}
													className="dropdown-toggle btn btn-sm btn-white d-inline-flex align-items-center"
													data-bs-toggle="dropdown">
													<span
														className="rounded-circle bg-transparent-warning d-flex justify-content-center align-items-center me-2"><i
															className="ti ti-point-filled text-warning"></i></span> Medium
												</a>
												<ul className="dropdown-menu  dropdown-menu-end p-3">
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1 d-flex justify-content-start align-items-center"><span
																className="rounded-circle bg-transparent-danger d-flex justify-content-center align-items-center me-2"><i
																	className="ti ti-point-filled text-danger"></i></span>High</a>
													</li>
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1 d-flex justify-content-start align-items-center"><span
																className="rounded-circle bg-transparent-warning d-flex justify-content-center align-items-center me-2"><i
																	className="ti ti-point-filled text-warning"></i></span>Medium</a>
													</li>
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1 d-flex justify-content-start align-items-center"><span
																className="rounded-circle bg-transparent-success d-flex justify-content-center align-items-center me-2"><i
																	className="ti ti-point-filled text-success"></i></span>Low</a>
													</li>
												</ul>
											</div>
										</td>
										<td>
											<span className="badge badge-success d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Active
											</span>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_project"><i className="ti ti-edit"></i></a>
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
										<td><a href="/project-details">PRO-006</a></td>
										<td>
											<h6 className="fw-medium"><a href="/project-details">Service Booking
													Software</a></h6>
										</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" onClick={(e) => e.preventDefault()}
													className="avatar avatar-sm border avatar-rounded">
													<img src="/assets/img/users/user-02.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-normal"><a href="#" onClick={(e) => e.preventDefault()}>Linda Ray</a>
													</h6>
												</div>
											</div>
										</td>
										<td>
											<div className="avatar-list-stacked avatar-group-sm">
												<span className="avatar avatar-rounded">
													<img className="border border-white"
														src="/assets/img/profiles/avatar-18.jpg" alt="img" />
												</span>
												<span className="avatar avatar-rounded">
													<img className="border border-white"
														src="/assets/img/profiles/avatar-19.jpg" alt="img" />
												</span>
												<span className="avatar avatar-rounded">
													<img className="border border-white"
														src="/assets/img/profiles/avatar-20.jpg" alt="img" />
												</span>
												<a className="avatar bg-primary avatar-rounded text-fixed-white fs-12 fw-medium"
													href="#" onClick={(e) => e.preventDefault()}>
													+4
												</a>
											</div>
										</td>
										<td>
											10 Apr 2024
										</td>
										<td>
											<div className="dropdown">
												<a href="#" onClick={(e) => e.preventDefault()}
													className="dropdown-toggle btn btn-sm btn-white d-inline-flex align-items-center"
													data-bs-toggle="dropdown">
													<span
														className="rounded-circle bg-transparent-danger d-flex justify-content-center align-items-center me-2"><i
															className="ti ti-point-filled text-danger"></i></span> High
												</a>
												<ul className="dropdown-menu  dropdown-menu-end p-3">
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1 d-flex justify-content-start align-items-center"><span
																className="rounded-circle bg-transparent-danger d-flex justify-content-center align-items-center me-2"><i
																	className="ti ti-point-filled text-danger"></i></span>High</a>
													</li>
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1 d-flex justify-content-start align-items-center"><span
																className="rounded-circle bg-transparent-warning d-flex justify-content-center align-items-center me-2"><i
																	className="ti ti-point-filled text-warning"></i></span>Medium</a>
													</li>
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1 d-flex justify-content-start align-items-center"><span
																className="rounded-circle bg-transparent-success d-flex justify-content-center align-items-center me-2"><i
																	className="ti ti-point-filled text-success"></i></span>Low</a>
													</li>
												</ul>
											</div>
										</td>
										<td>
											<span className="badge badge-success d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Active
											</span>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_project"><i className="ti ti-edit"></i></a>
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
										<td><a href="/project-details">PRO-007</a></td>
										<td>
											<h6 className="fw-medium"><a href="/project-details">Hotel Booking App</a>
											</h6>
										</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" onClick={(e) => e.preventDefault()}
													className="avatar avatar-sm border avatar-rounded">
													<img src="/assets/img/users/user-35.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-normal"><a href="#" onClick={(e) => e.preventDefault()}>Elliot
															Murray</a></h6>
												</div>
											</div>
										</td>
										<td>
											<div className="avatar-list-stacked avatar-group-sm">
												<span className="avatar avatar-rounded">
													<img className="border border-white"
														src="/assets/img/profiles/avatar-21.jpg" alt="img" />
												</span>
												<span className="avatar avatar-rounded">
													<img className="border border-white"
														src="/assets/img/profiles/avatar-22.jpg" alt="img" />
												</span>
												<span className="avatar avatar-rounded">
													<img className="border border-white"
														src="/assets/img/profiles/avatar-23.jpg" alt="img" />
												</span>
												<a className="avatar bg-primary avatar-rounded text-fixed-white fs-12 fw-medium"
													href="#" onClick={(e) => e.preventDefault()}>
													+4
												</a>
											</div>
										</td>
										<td>
											10 Apr 2024
										</td>
										<td>
											<div className="dropdown">
												<a href="#" onClick={(e) => e.preventDefault()}
													className="dropdown-toggle btn btn-sm btn-white d-inline-flex align-items-center"
													data-bs-toggle="dropdown">
													<span
														className="rounded-circle bg-transparent-warning d-flex justify-content-center align-items-center me-2"><i
															className="ti ti-point-filled text-warning"></i></span> Medium
												</a>
												<ul className="dropdown-menu  dropdown-menu-end p-3">
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1 d-flex justify-content-start align-items-center"><span
																className="rounded-circle bg-transparent-danger d-flex justify-content-center align-items-center me-2"><i
																	className="ti ti-point-filled text-danger"></i></span>High</a>
													</li>
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1 d-flex justify-content-start align-items-center"><span
																className="rounded-circle bg-transparent-warning d-flex justify-content-center align-items-center me-2"><i
																	className="ti ti-point-filled text-warning"></i></span>Medium</a>
													</li>
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1 d-flex justify-content-start align-items-center"><span
																className="rounded-circle bg-transparent-success d-flex justify-content-center align-items-center me-2"><i
																	className="ti ti-point-filled text-success"></i></span>Low</a>
													</li>
												</ul>
											</div>
										</td>
										<td>
											<span className="badge badge-success d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Active
											</span>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_project"><i className="ti ti-edit"></i></a>
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
										<td><a href="/project-details">PRO-008</a></td>
										<td>
											<h6 className="fw-medium"><a href="/project-details">Car & Bike Rental
													Software</a></h6>
										</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" onClick={(e) => e.preventDefault()}
													className="avatar avatar-sm border avatar-rounded">
													<img src="/assets/img/users/user-36.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-normal"><a href="#" onClick={(e) => e.preventDefault()}>Rebecca
															Smtih</a></h6>
												</div>
											</div>
										</td>
										<td>
											<div className="avatar-list-stacked avatar-group-sm">
												<span className="avatar avatar-rounded">
													<img className="border border-white"
														src="/assets/img/profiles/avatar-24.jpg" alt="img" />
												</span>
												<span className="avatar avatar-rounded">
													<img className="border border-white"
														src="/assets/img/profiles/avatar-25.jpg" alt="img" />
												</span>
												<span className="avatar avatar-rounded">
													<img className="border border-white"
														src="/assets/img/profiles/avatar-26.jpg" alt="img" />
												</span>
												<a className="avatar bg-primary avatar-rounded text-fixed-white fs-12 fw-medium"
													href="#" onClick={(e) => e.preventDefault()}>
													+2
												</a>
											</div>
										</td>
										<td>
											22 Feb 2024
										</td>
										<td>
											<div className="dropdown">
												<a href="#" onClick={(e) => e.preventDefault()}
													className="dropdown-toggle btn btn-sm btn-white d-inline-flex align-items-center"
													data-bs-toggle="dropdown">
													<span
														className="rounded-circle bg-transparent-success d-flex justify-content-center align-items-center me-2"><i
															className="ti ti-point-filled text-success"></i></span> Low
												</a>
												<ul className="dropdown-menu  dropdown-menu-end p-3">
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1 d-flex justify-content-start align-items-center"><span
																className="rounded-circle bg-transparent-danger d-flex justify-content-center align-items-center me-2"><i
																	className="ti ti-point-filled text-danger"></i></span>High</a>
													</li>
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1 d-flex justify-content-start align-items-center"><span
																className="rounded-circle bg-transparent-warning d-flex justify-content-center align-items-center me-2"><i
																	className="ti ti-point-filled text-warning"></i></span>Medium</a>
													</li>
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1 d-flex justify-content-start align-items-center"><span
																className="rounded-circle bg-transparent-success d-flex justify-content-center align-items-center me-2"><i
																	className="ti ti-point-filled text-success"></i></span>Low</a>
													</li>
												</ul>
											</div>
										</td>
										<td>
											<span className="badge badge-danger d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Inactive
											</span>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_project"><i className="ti ti-edit"></i></a>
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
										<td><a href="/project-details">PRO-009</a></td>
										<td>
											<h6 className="fw-medium"><a href="/project-details">Food Order App</a></h6>
										</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" onClick={(e) => e.preventDefault()}
													className="avatar avatar-sm border avatar-rounded">
													<img src="/assets/img/users/user-37.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-normal"><a href="#" onClick={(e) => e.preventDefault()}>Connie
															Waters</a></h6>
												</div>
											</div>
										</td>
										<td>
											<div className="avatar-list-stacked avatar-group-sm">
												<span className="avatar avatar-rounded">
													<img className="border border-white"
														src="/assets/img/profiles/avatar-27.jpg" alt="img" />
												</span>
												<span className="avatar avatar-rounded">
													<img className="border border-white"
														src="/assets/img/profiles/avatar-28.jpg" alt="img" />
												</span>
												<span className="avatar avatar-rounded">
													<img className="border border-white"
														src="/assets/img/profiles/avatar-29.jpg" alt="img" />
												</span>
												<a className="avatar bg-primary avatar-rounded text-fixed-white fs-12 fw-medium"
													href="#" onClick={(e) => e.preventDefault()}>
													+3
												</a>
											</div>
										</td>
										<td>
											03 Nov 2024
										</td>
										<td>
											<div className="dropdown">
												<a href="#" onClick={(e) => e.preventDefault()}
													className="dropdown-toggle btn btn-sm btn-white d-inline-flex align-items-center"
													data-bs-toggle="dropdown">
													<span
														className="rounded-circle bg-transparent-warning d-flex justify-content-center align-items-center me-2"><i
															className="ti ti-point-filled text-warning"></i></span> Medium
												</a>
												<ul className="dropdown-menu  dropdown-menu-end p-3">
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1 d-flex justify-content-start align-items-center"><span
																className="rounded-circle bg-transparent-danger d-flex justify-content-center align-items-center me-2"><i
																	className="ti ti-point-filled text-danger"></i></span>High</a>
													</li>
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1 d-flex justify-content-start align-items-center"><span
																className="rounded-circle bg-transparent-warning d-flex justify-content-center align-items-center me-2"><i
																	className="ti ti-point-filled text-warning"></i></span>Medium</a>
													</li>
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1 d-flex justify-content-start align-items-center"><span
																className="rounded-circle bg-transparent-success d-flex justify-content-center align-items-center me-2"><i
																	className="ti ti-point-filled text-success"></i></span>Low</a>
													</li>
												</ul>
											</div>
										</td>
										<td>
											<span className="badge badge-success d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Active
											</span>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_project"><i className="ti ti-edit"></i></a>
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
										<td><a href="/project-details">PRO-010</a></td>
										<td>
											<h6 className="fw-medium"><a href="/project-details">POS Admin Software</a>
											</h6>
										</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" onClick={(e) => e.preventDefault()}
													className="avatar avatar-sm border avatar-rounded">
													<img src="/assets/img/users/user-38.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-normal"><a href="#" onClick={(e) => e.preventDefault()}>Lori
															Broaddus</a></h6>
												</div>
											</div>
										</td>
										<td>
											<div className="avatar-list-stacked avatar-group-sm">
												<span className="avatar avatar-rounded">
													<img className="border border-white"
														src="/assets/img/profiles/avatar-30.jpg" alt="img" />
												</span>
												<span className="avatar avatar-rounded">
													<img className="border border-white"
														src="/assets/img/profiles/avatar-13.jpg" alt="img" />
												</span>
												<span className="avatar avatar-rounded">
													<img className="border border-white"
														src="/assets/img/profiles/avatar-01.jpg" alt="img" />
												</span>
												<a className="avatar bg-primary avatar-rounded text-fixed-white fs-12 fw-medium"
													href="#" onClick={(e) => e.preventDefault()}>
													+4
												</a>
											</div>
										</td>
										<td>
											17 Dec 2024
										</td>
										<td>
											<div className="dropdown">
												<a href="#" onClick={(e) => e.preventDefault()}
													className="dropdown-toggle btn btn-sm btn-white d-inline-flex align-items-center"
													data-bs-toggle="dropdown">
													<span
														className="rounded-circle bg-transparent-danger d-flex justify-content-center align-items-center me-2"><i
															className="ti ti-point-filled text-danger"></i></span> High
												</a>
												<ul className="dropdown-menu  dropdown-menu-end p-3">
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1 d-flex justify-content-start align-items-center"><span
																className="rounded-circle bg-transparent-danger d-flex justify-content-center align-items-center me-2"><i
																	className="ti ti-point-filled text-danger"></i></span>High</a>
													</li>
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1 d-flex justify-content-start align-items-center"><span
																className="rounded-circle bg-transparent-warning d-flex justify-content-center align-items-center me-2"><i
																	className="ti ti-point-filled text-warning"></i></span>Medium</a>
													</li>
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1 d-flex justify-content-start align-items-center"><span
																className="rounded-circle bg-transparent-success d-flex justify-content-center align-items-center me-2"><i
																	className="ti ti-point-filled text-success"></i></span>Low</a>
													</li>
												</ul>
											</div>
										</td>
										<td>
											<span className="badge badge-success d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Active
											</span>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_project"><i className="ti ti-edit"></i></a>
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
										Showing {Math.min((currentPage_projects - 1) * rowsPerPage_projects + 1, 11)}-{Math.min(currentPage_projects * rowsPerPage_projects, 11)} of 11 entries
									</p>
									<ul className="pagination mb-0">
										<li className={`page-item ${currentPage_projects === 1 ? 'disabled' : ''}`}>
											<button className="page-link" onClick={() => setCurrentPage_projects(p => Math.max(p - 1, 1))}>
												<i className="ti ti-chevron-left"></i>
											</button>
										</li>
										{[1, 2].map(page => (
											<li key={page} className={`page-item ${currentPage_projects === page ? 'active' : ''}`}>
												<button className="page-link" onClick={() => setCurrentPage_projects(page)}>{page}</button>
											</li>
										))}
										<li className={`page-item ${currentPage_projects === 2 ? 'disabled' : ''}`}>
											<button className="page-link" onClick={() => setCurrentPage_projects(p => Math.min(p + 1, 2))}>
												<i className="ti ti-chevron-right"></i>
											</button>
										</li>
									</ul>
								</div>
						</div>
					</div>
				</div>
				{/* / Project list  */}

			</div>
			<div className="footer d-sm-flex align-items-center justify-content-between border-top bg-white p-3">
				<p className="mb-0">2014 - 2026 &copy; SmartHR.</p>
				<p>Designed &amp; Developed By <a href="#" onClick={(e) => e.preventDefault()} className="text-primary">Dreams</a></p>
			</div>
		</div>
		
    </>
  );
};

export default Projects;
