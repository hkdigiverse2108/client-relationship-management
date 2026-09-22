import React, { useState } from 'react';
import { Link } from 'react-router-dom';import PageHeader from '../components/common/PageHeader';


const Employees = () => {
  // Pagination state for employees
  const [currentPage_employees, setCurrentPage_employees] = useState(1);
  const [rowsPerPage_employees, setRowsPerPage_employees] = useState(10);
  const [searchQuery_employees, setSearchQuery_employees] = useState('');
  return (
    <>
      <div className="page-wrapper">
			<div className="content">

				{/* Breadcrumb */}
				<PageHeader 
					title="Employees List"
					breadcrumbs={[
						{ label: 'Dashboard' },
						{ label: 'Employees' },
						{ label: 'Employees List', active: true }
					]}
				>
					<div className="me-2 mb-2">
							<div className="d-flex align-items-center border bg-white rounded p-1 me-2 icon-list">
								<a href="/employees"
									className="btn btn-icon btn-sm active bg-primary text-white me-1"><i
										className="ti ti-list-tree"></i></a>
								<a href="/employees-grid" className="btn btn-icon btn-sm"><i
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
							<a href="#" data-bs-toggle="modal" data-bs-target="#add_employee"
								className="btn btn-primary d-flex align-items-center"><i
									className="ti ti-circle-plus me-2"></i>Add Employee</a>
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

					{/* Total Plans */}
					<div className="col-lg-3 col-md-6 d-flex">
						<div className="card flex-fill">
							<div className="card-body d-flex align-items-center justify-content-between">
								<div className="d-flex align-items-center overflow-hidden">
									<div>
										<span className="avatar avatar-lg bg-dark rounded-circle"><i
												className="ti ti-users"></i></span>
									</div>
									<div className="ms-2 overflow-hidden">
										<p className="fs-12 fw-medium mb-1 text-truncate">Total Employee</p>
										<h4>1007</h4>
									</div>
								</div>
								<div>
									<span className="badge badge-soft-purple badge-sm fw-normal">
										<i className="ti ti-arrow-wave-right-down"></i>
										+19.01%
									</span>
								</div>
							</div>
						</div>
					</div>
					{/* /Total Plans */}

					{/* Total Plans */}
					<div className="col-lg-3 col-md-6 d-flex">
						<div className="card flex-fill">
							<div className="card-body d-flex align-items-center justify-content-between">
								<div className="d-flex align-items-center overflow-hidden">
									<div>
										<span className="avatar avatar-lg bg-success rounded-circle"><i
												className="ti ti-user-share"></i></span>
									</div>
									<div className="ms-2 overflow-hidden">
										<p className="fs-12 fw-medium mb-1 text-truncate">Active</p>
										<h4>1007</h4>
									</div>
								</div>
								<div>
									<span className="badge badge-soft-primary badge-sm fw-normal">
										<i className="ti ti-arrow-wave-right-down"></i>
										+19.01%
									</span>
								</div>
							</div>
						</div>
					</div>
					{/* /Total Plans */}

					{/* Inactive Plans */}
					<div className="col-lg-3 col-md-6 d-flex">
						<div className="card flex-fill">
							<div className="card-body d-flex align-items-center justify-content-between">
								<div className="d-flex align-items-center overflow-hidden">
									<div>
										<span className="avatar avatar-lg bg-danger rounded-circle"><i
												className="ti ti-user-pause"></i></span>
									</div>
									<div className="ms-2 overflow-hidden">
										<p className="fs-12 fw-medium mb-1 text-truncate">InActive</p>
										<h4>1007</h4>
									</div>
								</div>
								<div>
									<span className="badge badge-soft-dark badge-sm fw-normal">
										<i className="ti ti-arrow-wave-right-down"></i>
										+19.01%
									</span>
								</div>
							</div>
						</div>
					</div>
					{/* /Inactive Companies */}

					{/* No of Plans  */}
					<div className="col-lg-3 col-md-6 d-flex">
						<div className="card flex-fill">
							
							<div className="card-body d-flex align-items-center justify-content-between">
								<div className="d-flex align-items-center overflow-hidden">
									<div>
										<span className="avatar avatar-lg bg-info rounded-circle"><i
												className="ti ti-user-plus"></i></span>
									</div>
									<div className="ms-2 overflow-hidden">
										<p className="fs-12 fw-medium mb-1 text-truncate">New Joiners</p>
										<h4>67</h4>
									</div>
								</div>
								<div>
									<span className="badge badge-soft-secondary badge-sm fw-normal">
										<i className="ti ti-arrow-wave-right-down"></i>
										+19.01%
									</span>
								</div>
							</div>
						</div>
					</div>
					{/* /No of Plans */}

				</div>

				<div className="card">
					
					<div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
						<h5>Employee Salary List</h5>
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
									Designation
								</Link>
								<ul className="dropdown-menu  dropdown-menu-end p-3">
									<li>
										<Link to="#" className="dropdown-item rounded-1">Finance</Link>
									</li>
									<li>
										<Link to="#" className="dropdown-item rounded-1">Developer</Link>
									</li>
									<li>
										<Link to="#" className="dropdown-item rounded-1">Executive</Link>
									</li>
									<li>
										<Link to="#" className="dropdown-item rounded-1">Manager</Link>
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
											value={rowsPerPage_employees}
											onChange={(e) => { setRowsPerPage_employees(Number(e.target.value)); setCurrentPage_employees(1); }}
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
											value={searchQuery_employees}
											onChange={(e) => { setSearchQuery_employees(e.target.value); setCurrentPage_employees(1); }}
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
										<th>Emp ID</th>
										<th>Name</th>
										<th>Email</th>
										<th>Phone</th>
										<th>Designation</th>
										<th>Joining Date</th>
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
										<td><a href="/employee-details">Emp-001</a></td>
										<td>
											<div className="d-flex align-items-center">
												<a href="/employee-details" className="avatar avatar-md"
													data-bs-toggle="modal" data-bs-target="#view_details"><img
														src="/assets/img/users/user-32.jpg"
														className="img-fluid rounded-circle" alt="img" /></a>
												<div className="ms-2">
													<p className="text-dark mb-0"><a href="/employee-details">Anthony
															Lewis</a></p>
													<span className="fs-12">Finance</span>
												</div>
											</div>
										</td>
										<td>anthony@example.com</td>
										<td>(123) 4567 890</td>
										<td>
											<div className="dropdown me-3">
												<a href="#" onClick={(e) => e.preventDefault()}
													className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
													data-bs-toggle="dropdown">
													Finance
												</a>
												<ul className="dropdown-menu  dropdown-menu-end p-3">
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1">Developer</a>
													</li>
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1">Executive</a>
													</li>
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1">Finanace</a>
													</li>
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1">Manager</a>
													</li>
												</ul>
											</div>
										</td>
										<td>12 Sep 2024</td>
										<td>
											<span className="badge badge-success d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Active
											</span>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_employee"><i className="ti ti-edit"></i></a>
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
										<td><a href="/employee-details">Emp-002</a></td>
										<td>
											<div className="d-flex align-items-center">
												<a href="/employee-details" className="avatar avatar-md"
													data-bs-toggle="modal" data-bs-target="#view_details"><img
														src="/assets/img/users/user-09.jpg"
														className="img-fluid rounded-circle" alt="img" /></a>
												<div className="ms-2">
													<p className="text-dark mb-0"><a href="/employee-details">Brian
															Villalobos</a></p>
													<span className="fs-12">Developer</span>
												</div>
											</div>
										</td>
										<td>brian@example.com</td>
										<td>(179) 7382 829</td>
										<td>
											<div className="dropdown me-3">
												<a href="#" onClick={(e) => e.preventDefault()}
													className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
													data-bs-toggle="dropdown">
													Developer
												</a>
												<ul className="dropdown-menu  dropdown-menu-end p-3">
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1">Developer</a>
													</li>
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1">Executive</a>
													</li>
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1">Finanace</a>
													</li>
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1">Manager</a>
													</li>
												</ul>
											</div>
										</td>
										<td>24 Oct 2024</td>
										<td>
											<span className="badge badge-success d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Active
											</span>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_employee"><i className="ti ti-edit"></i></a>
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
										<td><a href="/employee-details">Emp-003</a></td>
										<td>
											<div className="d-flex align-items-center">
												<a href="/employee-details" className="avatar avatar-md"
													data-bs-toggle="modal" data-bs-target="#view_details"><img
														src="/assets/img/users/user-01.jpg"
														className="img-fluid rounded-circle" alt="img" /></a>
												<div className="ms-2">
													<p className="text-dark mb-0"><a href="/employee-details">Harvey
															Smith</a></p>
													<span className="fs-12">Developer</span>
												</div>
											</div>
										</td>
										<td>harvey@example.com</td>
										<td>(184) 2719 738</td>
										<td>
											<div className="dropdown me-3">
												<a href="#" onClick={(e) => e.preventDefault()}
													className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
													data-bs-toggle="dropdown">
													Developer
												</a>
												<ul className="dropdown-menu  dropdown-menu-end p-3">
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1">Developer</a>
													</li>
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1">Executive</a>
													</li>
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1">Finanace</a>
													</li>
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1">Manager</a>
													</li>
												</ul>
											</div>
										</td>
										<td>18 Feb 2024</td>
										<td>
											<span className="badge badge-success d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Active
											</span>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_employee"><i className="ti ti-edit"></i></a>
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
										<td><a href="/employee-details">Emp-004</a></td>
										<td>
											<div className="d-flex align-items-center">
												<a href="/employee-details" className="avatar avatar-md"
													data-bs-toggle="modal" data-bs-target="#view_details"><img
														src="/assets/img/users/user-33.jpg"
														className="img-fluid rounded-circle" alt="img" /></a>
												<div className="ms-2">
													<p className="text-dark mb-0"><a href="/employee-details">Stephan
															Peralt</a></p>
													<span className="fs-12">Executive Officer</span>
												</div>
											</div>
										</td>
										<td>peral@example.com</td>
										<td>(193) 7839 748</td>
										<td>
											<div className="dropdown me-3">
												<a href="#" onClick={(e) => e.preventDefault()}
													className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
													data-bs-toggle="dropdown">
													Executive
												</a>
												<ul className="dropdown-menu  dropdown-menu-end p-3">
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1">Developer</a>
													</li>
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1">Executive</a>
													</li>
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1">Finanace</a>
													</li>
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1">Manager</a>
													</li>
												</ul>
											</div>
										</td>
										<td>17 Oct 2024</td>
										<td>
											<span className="badge badge-success d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Active
											</span>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_employee"><i className="ti ti-edit"></i></a>
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
										<td><a href="/employee-details">Emp-005</a></td>
										<td>
											<div className="d-flex align-items-center">
												<a href="/employee-details" className="avatar avatar-md"
													data-bs-toggle="modal" data-bs-target="#view_details"><img
														src="/assets/img/users/user-33.jpg"
														className="img-fluid rounded-circle" alt="img" /></a>
												<div className="ms-2">
													<p className="text-dark mb-0"><a href="/employee-details">Doglas
															Martini</a></p>
													<span className="fs-12">Manager</span>
												</div>
											</div>
										</td>
										<td>martniwr@example.com</td>
										<td>(183) 9302 890</td>
										<td>
											<div className="dropdown me-3">
												<a href="#" onClick={(e) => e.preventDefault()}
													className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
													data-bs-toggle="dropdown">
													Manager
												</a>
												<ul className="dropdown-menu  dropdown-menu-end p-3">
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1">Developer</a>
													</li>
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1">Executive</a>
													</li>
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1">Finanace</a>
													</li>
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1">Manager</a>
													</li>
												</ul>
											</div>
										</td>
										<td>20 Jul 2024</td>
										<td>
											<span className="badge badge-success d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Active
											</span>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_employee"><i className="ti ti-edit"></i></a>
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
										<td><a href="/employee-details">Emp-006</a></td>
										<td>
											<div className="d-flex align-items-center">
												<a href="/employee-details" className="avatar avatar-md"
													data-bs-toggle="modal" data-bs-target="#view_details"><img
														src="/assets/img/users/user-02.jpg"
														className="img-fluid rounded-circle" alt="img" /></a>
												<div className="ms-2">
													<p className="text-dark mb-0"><a href="/employee-details">Linda
															Ray</a></p>
													<span className="fs-12">Finance</span>
												</div>
											</div>
										</td>
										<td>ray456@example.com</td>
										<td>(120) 3728 039</td>
										<td>
											<div className="dropdown me-3">
												<a href="#" onClick={(e) => e.preventDefault()}
													className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
													data-bs-toggle="dropdown">
													Finance
												</a>
												<ul className="dropdown-menu  dropdown-menu-end p-3">
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1">Developer</a>
													</li>
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1">Executive</a>
													</li>
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1">Finanace</a>
													</li>
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1">Manager</a>
													</li>
												</ul>
											</div>
										</td>
										<td>10 Apr 2024</td>
										<td>
											<span className="badge badge-success d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Active
											</span>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_employee"><i className="ti ti-edit"></i></a>
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
										<td><a href="/employee-details">Emp-007</a></td>
										<td>
											<div className="d-flex align-items-center">
												<a href="/employee-details" className="avatar avatar-md"
													data-bs-toggle="modal" data-bs-target="#view_details"><img
														src="/assets/img/users/user-35.jpg"
														className="img-fluid rounded-circle" alt="img" /></a>
												<div className="ms-2">
													<p className="text-dark mb-0"><a href="/employee-details">Elliot
															Murray</a></p>
													<span className="fs-12">Finance</span>
												</div>
											</div>
										</td>
										<td>murray@example.com</td>
										<td>(102) 8480 832</td>
										<td>
											<div className="dropdown me-3">
												<a href="#" onClick={(e) => e.preventDefault()}
													className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
													data-bs-toggle="dropdown">
													Developer
												</a>
												<ul className="dropdown-menu  dropdown-menu-end p-3">
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1">Developer</a>
													</li>
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1">Executive</a>
													</li>
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1">Finanace</a>
													</li>
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1">Manager</a>
													</li>
												</ul>
											</div>
										</td>
										<td>29 Aug 2024</td>
										<td>
											<span className="badge badge-success d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Active
											</span>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_employee"><i className="ti ti-edit"></i></a>
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
										<td><a href="/employee-details">Emp-008</a></td>
										<td>
											<div className="d-flex align-items-center">
												<a href="/employee-details" className="avatar avatar-md"
													data-bs-toggle="modal" data-bs-target="#view_details"><img
														src="/assets/img/users/user-36.jpg"
														className="img-fluid rounded-circle" alt="img" /></a>
												<div className="ms-2">
													<p className="text-dark mb-0"><a href="/employee-details">Rebecca
															Smtih</a></p>
													<span className="fs-12">Executive</span>
												</div>
											</div>
										</td>
										<td>smtih@example.com</td>
										<td>(162) 8920 713</td>
										<td>
											<div className="dropdown me-3">
												<a href="#" onClick={(e) => e.preventDefault()}
													className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
													data-bs-toggle="dropdown">
													Executive
												</a>
												<ul className="dropdown-menu  dropdown-menu-end p-3">
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1">Developer</a>
													</li>
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1">Executive</a>
													</li>
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1">Finanace</a>
													</li>
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1">Manager</a>
													</li>
												</ul>
											</div>
										</td>
										<td>22 Feb 2024</td>
										<td>
											<span className="badge badge-danger d-inline-flex align-items-center badge-sm">
												<i className="ti ti-point-filled me-1"></i>Inactive
											</span>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_employee"><i className="ti ti-edit"></i></a>
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
										<td><a href="/employee-details">Emp-009</a></td>
										<td>
											<div className="d-flex align-items-center">
												<a href="/employee-details" className="avatar avatar-md"
													data-bs-toggle="modal" data-bs-target="#view_details"><img
														src="/assets/img/users/user-37.jpg"
														className="img-fluid rounded-circle" alt="img" /></a>
												<div className="ms-2">
													<p className="text-dark mb-0"><a href="/employee-details">Connie
															Waters</a></p>
													<span className="fs-12">Developer</span>
												</div>
											</div>
										</td>
										<td>connie@example.com</td>
										<td>(189) 0920 723</td>
										<td>
											<div className="dropdown me-3">
												<a href="#" onClick={(e) => e.preventDefault()}
													className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
													data-bs-toggle="dropdown">
													Developer
												</a>
												<ul className="dropdown-menu  dropdown-menu-end p-3">
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1">Developer</a>
													</li>
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1">Executive</a>
													</li>
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1">Finanace</a>
													</li>
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1">Manager</a>
													</li>
												</ul>
											</div>
										</td>
										<td>03 Nov 2024</td>
										<td>
											<span className="badge badge-success d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Active
											</span>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_employee"><i className="ti ti-edit"></i></a>
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
										<td><a href="/employee-details">Emp-010</a></td>
										<td>
											<div className="d-flex align-items-center">
												<a href="/employee-details" className="avatar avatar-md"
													data-bs-toggle="modal" data-bs-target="#view_details"><img
														src="/assets/img/users/user-38.jpg"
														className="img-fluid rounded-circle" alt="img" /></a>
												<div className="ms-2">
													<p className="text-dark mb-0"><a href="/employee-details">Lori
															Broaddus</a></p>
													<span className="fs-12">Finance</span>
												</div>
											</div>
										</td>
										<td>broaddus@example.com</td>
										<td>(168) 8392 823</td>
										<td>
											<div className="dropdown me-3">
												<a href="#" onClick={(e) => e.preventDefault()}
													className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
													data-bs-toggle="dropdown">
													Finance
												</a>
												<ul className="dropdown-menu  dropdown-menu-end p-3">
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1">Developer</a>
													</li>
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1">Executive</a>
													</li>
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1">Finanace</a>
													</li>
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1">Manager</a>
													</li>
												</ul>
											</div>
										</td>
										<td>17 Dec 2024</td>
										<td>
											<span className="badge badge-success d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Active
											</span>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_employee"><i className="ti ti-edit"></i></a>
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
										Showing {Math.min((currentPage_employees - 1) * rowsPerPage_employees + 1, 11)}-{Math.min(currentPage_employees * rowsPerPage_employees, 11)} of 11 entries
									</p>
									<ul className="pagination mb-0">
										<li className={`page-item ${currentPage_employees === 1 ? 'disabled' : ''}`}>
											<button className="page-link" onClick={() => setCurrentPage_employees(p => Math.max(p - 1, 1))}>
												<i className="ti ti-chevron-left"></i>
											</button>
										</li>
										{[1, 2].map(page => (
											<li key={page} className={`page-item ${currentPage_employees === page ? 'active' : ''}`}>
												<button className="page-link" onClick={() => setCurrentPage_employees(page)}>{page}</button>
											</li>
										))}
										<li className={`page-item ${currentPage_employees === 2 ? 'disabled' : ''}`}>
											<button className="page-link" onClick={() => setCurrentPage_employees(p => Math.min(p + 1, 2))}>
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

export default Employees;
