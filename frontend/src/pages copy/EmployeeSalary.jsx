import React, { useState } from 'react';
import { Link } from 'react-router-dom';import PageHeader from '../components/common/PageHeader';


const EmployeeSalary = () => {
  // Pagination state for employeesalary
  const [currentPage_employeesalary, setCurrentPage_employeesalary] = useState(1);
  const [rowsPerPage_employeesalary, setRowsPerPage_employeesalary] = useState(10);
  const [searchQuery_employeesalary, setSearchQuery_employeesalary] = useState('');
  return (
    <>
      <div className="page-wrapper">
			<div className="content">

				{/* Breadcrumb */}
				<PageHeader 
					title="Employee Salary"
					breadcrumbs={[
						{ label: 'Dashboard' },
						{ label: 'Payroll' },
						{ label: 'Employee Salary', active: true }
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
							<a href="#" data-bs-toggle="modal" data-bs-target="#new-employee-salary"
								className="btn btn-primary d-flex align-items-center"><i
									className="ti ti-circle-plus me-2"></i>Add Salary</a>
						</div>
						<div className="head-icons ms-2">
							<a href="#" onClick={(e) => e.preventDefault()} className="" data-bs-toggle="tooltip" data-bs-placement="top"
								data-bs-original-title="Collapse" id="collapse-header">
								<i className="ti ti-chevrons-up"></i>
							</a>
						</div>
				</PageHeader>
				{/* /Breadcrumb */}



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
											value={rowsPerPage_employeesalary}
											onChange={(e) => { setRowsPerPage_employeesalary(Number(e.target.value)); setCurrentPage_employeesalary(1); }}
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
											value={searchQuery_employeesalary}
											onChange={(e) => { setSearchQuery_employeesalary(e.target.value); setCurrentPage_employeesalary(1); }}
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
										<th>Salary</th>
										<th>Payslip</th>
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
										<td>Emp-001</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md ">
													<img src="/assets/img/users/user-32.jpg"
														className="img-fluid rounded-circle" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">Anthony Lewis</a></h6>
													<span className="d-block mt-1">Finance</span>
												</div>
											</div>
										</td>
										<td>anthony@example.com</td>
										<td>(123) 4567 890</td>
										<td>
											<div className="dropdown">
												<a href="#" onClick={(e) => e.preventDefault()}
													className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
													data-bs-toggle="dropdown">
													<span
														className="rounded-circle bg-transparent-success d-flex justify-content-center align-items-center me-2"></span>
													Finance
												</a>
												<ul className="dropdown-menu  dropdown-menu-end p-3">
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1 d-flex justify-content-start align-items-center"><span
																className="rounded-circle bg-transparent-success d-flex justify-content-center align-items-center me-2"></span>Finance</a>
													</li>
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1 d-flex justify-content-start align-items-center"><span
																className="rounded-circle bg-transparent-skyblue d-flex justify-content-center align-items-center me-2"></span>Developer
														</a>
													</li>
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1 d-flex justify-content-start align-items-center"><span
																className="rounded-circle bg-transparent-skyblue d-flex justify-content-center align-items-center me-2"></span>Executive
														</a>
													</li>
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1 d-flex justify-content-start align-items-center"><span
																className="rounded-circle bg-transparent-skyblue d-flex justify-content-center align-items-center me-2"></span>Manager
														</a>
													</li>
												</ul>
											</div>
										</td>

										<td>$12 Sep 2024 </td>
										<td>$40000</td>
										<td><span className="badge badge-dark badge-md">Generate Slip</span></td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit-employee-salary"><i
														className="ti ti-edit"></i></a>
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
										<td>Emp-002</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md ">
													<img src="/assets/img/users/user-09.jpg"
														className="img-fluid rounded-circle" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">Brian Villalobos</a></h6>
													<span className="d-block mt-1">Developer</span>
												</div>
											</div>
										</td>
										<td>brian@example.com</td>
										<td>(179) 7382 829</td>
										<td>
											<div className="dropdown">
												<a href="#" onClick={(e) => e.preventDefault()}
													className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
													data-bs-toggle="dropdown">
													<span
														className="rounded-circle bg-transparent-success d-flex justify-content-center align-items-center me-2"></span>
													Developer
												</a>
												<ul className="dropdown-menu  dropdown-menu-end p-3">
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1 d-flex justify-content-start align-items-center"><span
																className="rounded-circle bg-transparent-success d-flex justify-content-center align-items-center me-2"></span>Finance</a>
													</li>
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1 d-flex justify-content-start align-items-center"><span
																className="rounded-circle bg-transparent-skyblue d-flex justify-content-center align-items-center me-2"></span>Developer
														</a>
													</li>
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1 d-flex justify-content-start align-items-center"><span
																className="rounded-circle bg-transparent-skyblue d-flex justify-content-center align-items-center me-2"></span>Executive
														</a>
													</li>
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1 d-flex justify-content-start align-items-center"><span
																className="rounded-circle bg-transparent-skyblue d-flex justify-content-center align-items-center me-2"></span>Manager
														</a>
													</li>
												</ul>
											</div>
										</td>

										<td>24 Oct 2024</td>
										<td>$35000</td>
										<td><span className="badge badge-dark badge-md">Generate Slip</span></td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit-employee-salary"><i
														className="ti ti-edit"></i></a>
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
										<td>Emp-003</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md ">
													<img src="/assets/img/users/user-01.jpg"
														className="img-fluid rounded-circle" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">Harvey Smith</a></h6>
													<span className="d-block mt-1">Developer</span>
												</div>
											</div>
										</td>
										<td>harvey@example.com</td>
										<td>(184) 2719 738</td>
										<td>
											<div className="dropdown">
												<a href="#" onClick={(e) => e.preventDefault()}
													className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
													data-bs-toggle="dropdown">
													<span
														className="rounded-circle bg-transparent-success d-flex justify-content-center align-items-center me-2"></span>
													Executive
												</a>
												<ul className="dropdown-menu  dropdown-menu-end p-3">
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1 d-flex justify-content-start align-items-center"><span
																className="rounded-circle bg-transparent-success d-flex justify-content-center align-items-center me-2"></span>Finance</a>
													</li>
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1 d-flex justify-content-start align-items-center"><span
																className="rounded-circle bg-transparent-skyblue d-flex justify-content-center align-items-center me-2"></span>Developer
														</a>
													</li>
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1 d-flex justify-content-start align-items-center"><span
																className="rounded-circle bg-transparent-skyblue d-flex justify-content-center align-items-center me-2"></span>Executive
														</a>
													</li>
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1 d-flex justify-content-start align-items-center"><span
																className="rounded-circle bg-transparent-skyblue d-flex justify-content-center align-items-center me-2"></span>Manager
														</a>
													</li>
												</ul>
											</div>
										</td>

										<td>18 Feb 2024</td>
										<td>$20000</td>
										<td><span className="badge badge-dark badge-md">Generate Slip</span></td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit-employee-salary"><i
														className="ti ti-edit"></i></a>
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
										<td>Emp-004</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md ">
													<img src="/assets/img/users/user-33.jpg"
														className="img-fluid rounded-circle" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">Stephan Peralt</a></h6>
													<span className="d-block mt-1">Executive Officer</span>
												</div>
											</div>
										</td>
										<td>peral@example.com</td>
										<td>(193) 7839 748</td>
										<td>
											<div className="dropdown">
												<a href="#" onClick={(e) => e.preventDefault()}
													className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
													data-bs-toggle="dropdown">
													<span
														className="rounded-circle bg-transparent-success d-flex justify-content-center align-items-center me-2"></span>
													Executive
												</a>
												<ul className="dropdown-menu  dropdown-menu-end p-3">
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1 d-flex justify-content-start align-items-center"><span
																className="rounded-circle bg-transparent-success d-flex justify-content-center align-items-center me-2"></span>Finance</a>
													</li>
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1 d-flex justify-content-start align-items-center"><span
																className="rounded-circle bg-transparent-skyblue d-flex justify-content-center align-items-center me-2"></span>Developer
														</a>
													</li>
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1 d-flex justify-content-start align-items-center"><span
																className="rounded-circle bg-transparent-skyblue d-flex justify-content-center align-items-center me-2"></span>Executive
														</a>
													</li>
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1 d-flex justify-content-start align-items-center"><span
																className="rounded-circle bg-transparent-skyblue d-flex justify-content-center align-items-center me-2"></span>Manager
														</a>
													</li>
												</ul>
											</div>
										</td>

										<td>17 Oct 2024</td>
										<td>$$22000</td>
										<td><span className="badge badge-dark badge-md">Generate Slip</span></td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit-employee-salary"><i
														className="ti ti-edit"></i></a>
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
										<td>Emp-005</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md ">
													<img src="/assets/img/users/user-34.jpg"
														className="img-fluid rounded-circle" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">Doglas Martini</a></h6>
													<span className="d-block mt-1">Manager</span>
												</div>
											</div>
										</td>
										<td>martniwr@example.com</td>
										<td>(183) 9302 890</td>
										<td>
											<div className="dropdown">
												<a href="#" onClick={(e) => e.preventDefault()}
													className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
													data-bs-toggle="dropdown">
													<span
														className="rounded-circle bg-transparent-success d-flex justify-content-center align-items-center me-2"></span>
													Manager
												</a>
												<ul className="dropdown-menu  dropdown-menu-end p-3">
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1 d-flex justify-content-start align-items-center"><span
																className="rounded-circle bg-transparent-success d-flex justify-content-center align-items-center me-2"></span>Finance</a>
													</li>
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1 d-flex justify-content-start align-items-center"><span
																className="rounded-circle bg-transparent-skyblue d-flex justify-content-center align-items-center me-2"></span>Developer
														</a>
													</li>
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1 d-flex justify-content-start align-items-center"><span
																className="rounded-circle bg-transparent-skyblue d-flex justify-content-center align-items-center me-2"></span>Executive
														</a>
													</li>
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1 d-flex justify-content-start align-items-center"><span
																className="rounded-circle bg-transparent-skyblue d-flex justify-content-center align-items-center me-2"></span>Manager
														</a>
													</li>
												</ul>
											</div>
										</td>

										<td>20 Jul 2024</td>
										<td>$25000</td>
										<td><span className="badge badge-dark badge-md">Generate Slip</span></td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit-employee-salary"><i
														className="ti ti-edit"></i></a>
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
										<td>Emp-006</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md ">
													<img src="/assets/img/users/user-02.jpg"
														className="img-fluid rounded-circle" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">Linda Ray</a></h6>
													<span className="d-block mt-1">Finance</span>
												</div>
											</div>
										</td>
										<td>ray456@example.com</td>
										<td>(120) 3728 039</td>
										<td>
											<div className="dropdown">
												<a href="#" onClick={(e) => e.preventDefault()}
													className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
													data-bs-toggle="dropdown">
													<span
														className="rounded-circle bg-transparent-success d-flex justify-content-center align-items-center me-2"></span>
													Finance
												</a>
												<ul className="dropdown-menu  dropdown-menu-end p-3">
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1 d-flex justify-content-start align-items-center"><span
																className="rounded-circle bg-transparent-success d-flex justify-content-center align-items-center me-2"></span>Finance</a>
													</li>
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1 d-flex justify-content-start align-items-center"><span
																className="rounded-circle bg-transparent-skyblue d-flex justify-content-center align-items-center me-2"></span>Developer
														</a>
													</li>
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1 d-flex justify-content-start align-items-center"><span
																className="rounded-circle bg-transparent-skyblue d-flex justify-content-center align-items-center me-2"></span>Executive
														</a>
													</li>
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1 d-flex justify-content-start align-items-center"><span
																className="rounded-circle bg-transparent-skyblue d-flex justify-content-center align-items-center me-2"></span>Manager
														</a>
													</li>
												</ul>
											</div>
										</td>

										<td>10 Apr 2024</td>
										<td>$30000</td>
										<td><span className="badge badge-dark badge-md">Generate Slip</span></td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit-employee-salary"><i
														className="ti ti-edit"></i></a>
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
										<td>Emp-007</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md ">
													<img src="/assets/img/users/user-35.jpg"
														className="img-fluid rounded-circle" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">Elliot Murray</a></h6>
													<span className="d-block mt-1">Developer</span>
												</div>
											</div>
										</td>
										<td>murray@example.com</td>
										<td>(102) 8480 832</td>
										<td>
											<div className="dropdown">
												<a href="#" onClick={(e) => e.preventDefault()}
													className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
													data-bs-toggle="dropdown">
													<span
														className="rounded-circle bg-transparent-success d-flex justify-content-center align-items-center me-2"></span>
													Finance
												</a>
												<ul className="dropdown-menu  dropdown-menu-end p-3">
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1 d-flex justify-content-start align-items-center"><span
																className="rounded-circle bg-transparent-success d-flex justify-content-center align-items-center me-2"></span>Finance</a>
													</li>
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1 d-flex justify-content-start align-items-center"><span
																className="rounded-circle bg-transparent-skyblue d-flex justify-content-center align-items-center me-2"></span>Developer
														</a>
													</li>
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1 d-flex justify-content-start align-items-center"><span
																className="rounded-circle bg-transparent-skyblue d-flex justify-content-center align-items-center me-2"></span>Executive
														</a>
													</li>
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1 d-flex justify-content-start align-items-center"><span
																className="rounded-circle bg-transparent-skyblue d-flex justify-content-center align-items-center me-2"></span>Manager
														</a>
													</li>
												</ul>
											</div>
										</td>

										<td>29 Aug 2024</td>
										<td>$35000</td>
										<td><span className="badge badge-dark badge-md">Generate Slip</span></td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit-employee-salary"><i
														className="ti ti-edit"></i></a>
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
										<td>Emp-008</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md ">
													<img src="/assets/img/users/user-36.jpg"
														className="img-fluid rounded-circle" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">Rebecca Smtih</a></h6>
													<span className="d-block mt-1">Executive</span>
												</div>
											</div>
										</td>
										<td>smtih@example.com</td>
										<td>(162) 8920 713</td>
										<td>
											<div className="dropdown">
												<a href="#" onClick={(e) => e.preventDefault()}
													className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
													data-bs-toggle="dropdown">
													<span
														className="rounded-circle bg-transparent-success d-flex justify-content-center align-items-center me-2"></span>
													Executive
												</a>
												<ul className="dropdown-menu  dropdown-menu-end p-3">
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1 d-flex justify-content-start align-items-center"><span
																className="rounded-circle bg-transparent-success d-flex justify-content-center align-items-center me-2"></span>Finance</a>
													</li>
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1 d-flex justify-content-start align-items-center"><span
																className="rounded-circle bg-transparent-skyblue d-flex justify-content-center align-items-center me-2"></span>Developer
														</a>
													</li>
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1 d-flex justify-content-start align-items-center"><span
																className="rounded-circle bg-transparent-skyblue d-flex justify-content-center align-items-center me-2"></span>Executive
														</a>
													</li>
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1 d-flex justify-content-start align-items-center"><span
																className="rounded-circle bg-transparent-skyblue d-flex justify-content-center align-items-center me-2"></span>Manager
														</a>
													</li>
												</ul>
											</div>
										</td>

										<td>22 Feb 2024</td>
										<td>$45000</td>
										<td><span className="badge badge-dark badge-md">Generate Slip</span></td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit-employee-salary"><i
														className="ti ti-edit"></i></a>
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
										<td>Emp-009</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md ">
													<img src="/assets/img/users/user-37.jpg"
														className="img-fluid rounded-circle" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">Connie Waters</a></h6>
													<span className="d-block mt-1">Developer</span>
												</div>
											</div>
										</td>
										<td>connie@example.com</td>
										<td>(189) 0920 723</td>
										<td>
											<div className="dropdown">
												<a href="#" onClick={(e) => e.preventDefault()}
													className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
													data-bs-toggle="dropdown">
													<span
														className="rounded-circle bg-transparent-success d-flex justify-content-center align-items-center me-2"></span>
													Developer
												</a>
												<ul className="dropdown-menu  dropdown-menu-end p-3">
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1 d-flex justify-content-start align-items-center"><span
																className="rounded-circle bg-transparent-success d-flex justify-content-center align-items-center me-2"></span>Finance</a>
													</li>
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1 d-flex justify-content-start align-items-center"><span
																className="rounded-circle bg-transparent-skyblue d-flex justify-content-center align-items-center me-2"></span>Developer
														</a>
													</li>
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1 d-flex justify-content-start align-items-center"><span
																className="rounded-circle bg-transparent-skyblue d-flex justify-content-center align-items-center me-2"></span>Executive
														</a>
													</li>
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1 d-flex justify-content-start align-items-center"><span
																className="rounded-circle bg-transparent-skyblue d-flex justify-content-center align-items-center me-2"></span>Manager
														</a>
													</li>
												</ul>
											</div>
										</td>

										<td>03 Nov 2024</td>
										<td>$50000</td>
										<td><span className="badge badge-dark badge-md">Generate Slip</span></td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit-employee-salary"><i
														className="ti ti-edit"></i></a>
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
										<td>Emp-010</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md ">
													<img src="/assets/img/users/user-38.jpg"
														className="img-fluid rounded-circle" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">Lori Broaddus</a></h6>
													<span className="d-block mt-1">Finance</span>
												</div>
											</div>
										</td>
										<td>broaddus@example.com</td>
										<td>(168) 8392 823</td>
										<td>
											<div className="dropdown">
												<a href="#" onClick={(e) => e.preventDefault()}
													className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
													data-bs-toggle="dropdown">
													<span
														className="rounded-circle bg-transparent-success d-flex justify-content-center align-items-center me-2"></span>
													Finance
												</a>
												<ul className="dropdown-menu  dropdown-menu-end p-3">
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1 d-flex justify-content-start align-items-center"><span
																className="rounded-circle bg-transparent-success d-flex justify-content-center align-items-center me-2"></span>Finance</a>
													</li>
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1 d-flex justify-content-start align-items-center"><span
																className="rounded-circle bg-transparent-skyblue d-flex justify-content-center align-items-center me-2"></span>Developer
														</a>
													</li>
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1 d-flex justify-content-start align-items-center"><span
																className="rounded-circle bg-transparent-skyblue d-flex justify-content-center align-items-center me-2"></span>Executive
														</a>
													</li>
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1 d-flex justify-content-start align-items-center"><span
																className="rounded-circle bg-transparent-skyblue d-flex justify-content-center align-items-center me-2"></span>Manager
														</a>
													</li>
												</ul>
											</div>
										</td>

										<td>17 Dec 2024</td>
										<td>$25000</td>
										<td><span className="badge badge-dark badge-md">Generate Slip</span></td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit-employee-salary"><i
														className="ti ti-edit"></i></a>
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
										Showing {Math.min((currentPage_employeesalary - 1) * rowsPerPage_employeesalary + 1, 11)}-{Math.min(currentPage_employeesalary * rowsPerPage_employeesalary, 11)} of 11 entries
									</p>
									<ul className="pagination mb-0">
										<li className={`page-item ${currentPage_employeesalary === 1 ? 'disabled' : ''}`}>
											<button className="page-link" onClick={() => setCurrentPage_employeesalary(p => Math.max(p - 1, 1))}>
												<i className="ti ti-chevron-left"></i>
											</button>
										</li>
										{[1, 2].map(page => (
											<li key={page} className={`page-item ${currentPage_employeesalary === page ? 'active' : ''}`}>
												<button className="page-link" onClick={() => setCurrentPage_employeesalary(page)}>{page}</button>
											</li>
										))}
										<li className={`page-item ${currentPage_employeesalary === 2 ? 'disabled' : ''}`}>
											<button className="page-link" onClick={() => setCurrentPage_employeesalary(p => Math.min(p + 1, 2))}>
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

export default EmployeeSalary;
