import React, { useState } from 'react';
import { Link } from 'react-router-dom';import PageHeader from '../components/common/PageHeader';


const ProvidentFund = () => {
  // Pagination state for providentfund
  const [currentPage_providentfund, setCurrentPage_providentfund] = useState(1);
  const [rowsPerPage_providentfund, setRowsPerPage_providentfund] = useState(10);
  const [searchQuery_providentfund, setSearchQuery_providentfund] = useState('');
  return (
    <>
      <div className="page-wrapper">
			<div className="content">

				{/* Breadcrumb */}
				<PageHeader 
					title="Provident Fund"
					breadcrumbs={[
						{ label: 'Dashboard' },
						{ label: 'Sales' },
						{ label: 'Provident Fund', active: true }
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
							<a href="#" data-bs-toggle="modal" data-bs-target="#add_provident-fund"
								className="btn btn-primary d-flex align-items-center"><i
									className="ti ti-circle-plus me-2"></i>Add New Provident Fund</a>
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
						<h5>Expenses List</h5>
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
									Select status
								</Link>
								<ul className="dropdown-menu  dropdown-menu-end p-3">
									<li>
										<Link to="#" className="dropdown-item rounded-1">Approved</Link>
									</li>
									<li>
										<Link to="#" className="dropdown-item rounded-1">Pending</Link>
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
											value={rowsPerPage_providentfund}
											onChange={(e) => { setRowsPerPage_providentfund(Number(e.target.value)); setCurrentPage_providentfund(1); }}
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
											value={searchQuery_providentfund}
											onChange={(e) => { setSearchQuery_providentfund(e.target.value); setCurrentPage_providentfund(1); }}
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
										<th>Employee Name</th>
										<th>Provident Fund Type</th>
										<th>Employee Share</th>
										<th>Organization Share</th>
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
												<a href="#" className="avatar avatar-md avatar-rounded">
													<img src="/assets/img/users/user-32.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">Anthony Lewis</a></h6>
													<span className="d-block mt-1">Finance</span>
												</div>
											</div>
										</td>
										<td>Employee Provident Fund</td>
										<td>2%</td>
										<td>2%</td>
										<td>
											<div className="dropdown">
												<a href="#" onClick={(e) => e.preventDefault()}
													className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
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
																className="rounded-circle bg-transparent-skyblue d-flex justify-content-center align-items-center me-2"><i
																	className="ti ti-point-filled text-skyblue"></i></span>Pending
														</a>
													</li>
												</ul>
											</div>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_provident-fund"><i className="ti ti-edit"></i></a>
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
												<a href="#" className="avatar avatar-md avatar-rounded">
													<img src="/assets/img/users/user-09.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">Brian Villalobos</a></h6>
													<span className="d-block mt-1">Developer</span>
												</div>
											</div>
										</td>
										<td>Employee Provident Fund</td>
										<td>2%</td>
										<td>2%</td>
										<td>
											<div className="dropdown">
												<a href="#" onClick={(e) => e.preventDefault()}
													className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
													data-bs-toggle="dropdown">
													<span
														className="rounded-circle bg-transparent-info d-flex justify-content-center align-items-center me-2"><i
															className="ti ti-point-filled text-success"></i></span> Pending
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
																className="rounded-circle bg-transparent-skyblue d-flex justify-content-center align-items-center me-2"><i
																	className="ti ti-point-filled text-skyblue"></i></span>Pending
														</a>
													</li>
												</ul>
											</div>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_provident-fund"><i className="ti ti-edit"></i></a>
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
												<a href="#" className="avatar avatar-md avatar-rounded">
													<img src="/assets/img/users/user-01.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">Harvey Smith</a></h6>
													<span className="d-block mt-1">Developer</span>
												</div>
											</div>
										</td>
										<td>Voluntary Provident Fund</td>
										<td>5%</td>
										<td>2%</td>
										<td>
											<div className="dropdown">
												<a href="#" onClick={(e) => e.preventDefault()}
													className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
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
																className="rounded-circle bg-transparent-skyblue d-flex justify-content-center align-items-center me-2"><i
																	className="ti ti-point-filled text-skyblue"></i></span>Pending
														</a>
													</li>
												</ul>
											</div>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_provident-fund"><i className="ti ti-edit"></i></a>
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
												<a href="#" className="avatar avatar-md avatar-rounded">
													<img src="/assets/img/users/user-33.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">Stephan Peralt</a></h6>
													<span className="d-block mt-1">Executive Officer</span>
												</div>
											</div>
										</td>
										<td>Voluntary Provident Fund</td>
										<td>3%</td>
										<td>2%</td>
										<td>
											<div className="dropdown">
												<a href="#" onClick={(e) => e.preventDefault()}
													className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
													data-bs-toggle="dropdown">
													<span
														className="rounded-circle bg-transparent-info d-flex justify-content-center align-items-center me-2"><i
															className="ti ti-point-filled text-success"></i></span> Pending
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
																className="rounded-circle bg-transparent-skyblue d-flex justify-content-center align-items-center me-2"><i
																	className="ti ti-point-filled text-skyblue"></i></span>Pending
														</a>
													</li>
												</ul>
											</div>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_provident-fund"><i className="ti ti-edit"></i></a>
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
												<a href="#" className="avatar avatar-md avatar-rounded">
													<img src="/assets/img/users/user-34.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">Doglas Martini</a></h6>
													<span className="d-block mt-1">Manager</span>
												</div>
											</div>
										</td>
										<td>Employee Provident Fund</td>
										<td>2%</td>
										<td>2%</td>
										<td>
											<div className="dropdown">
												<a href="#" onClick={(e) => e.preventDefault()}
													className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
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
																className="rounded-circle bg-transparent-skyblue d-flex justify-content-center align-items-center me-2"><i
																	className="ti ti-point-filled text-skyblue"></i></span>Pending
														</a>
													</li>
												</ul>
											</div>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_provident-fund"><i className="ti ti-edit"></i></a>
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
												<a href="#" className="avatar avatar-md avatar-rounded">
													<img src="/assets/img/users/user-02.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">Linda Ray</a></h6>
													<span className="d-block mt-1">Finance</span>
												</div>
											</div>
										</td>
										<td>Employee Provident Fund</td>
										<td>2%</td>
										<td>2%</td>
										<td>
											<div className="dropdown">
												<a href="#" onClick={(e) => e.preventDefault()}
													className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
													data-bs-toggle="dropdown">
													<span
														className="rounded-circle bg-transparent-info d-flex justify-content-center align-items-center me-2"><i
															className="ti ti-point-filled text-success"></i></span> Pending
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
																className="rounded-circle bg-transparent-skyblue d-flex justify-content-center align-items-center me-2"><i
																	className="ti ti-point-filled text-skyblue"></i></span>Pending
														</a>
													</li>
												</ul>
											</div>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_provident-fund"><i className="ti ti-edit"></i></a>
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
												<a href="#" className="avatar avatar-md avatar-rounded">
													<img src="/assets/img/users/user-35.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">Elliot Murray</a></h6>
													<span className="d-block mt-1">Developer</span>
												</div>
											</div>
										</td>
										<td>Voluntary Provident Fund</td>
										<td>6%</td>
										<td>2%</td>
										<td>
											<div className="dropdown">
												<a href="#" onClick={(e) => e.preventDefault()}
													className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
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
																className="rounded-circle bg-transparent-skyblue d-flex justify-content-center align-items-center me-2"><i
																	className="ti ti-point-filled text-skyblue"></i></span>Pending
														</a>
													</li>
												</ul>
											</div>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_provident-fund"><i className="ti ti-edit"></i></a>
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
												<a href="#" className="avatar avatar-md avatar-rounded">
													<img src="/assets/img/users/user-36.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">Rebecca Smtih</a></h6>
													<span className="d-block mt-1">Executive</span>
												</div>
											</div>
										</td>
										<td>Voluntary Provident Fund</td>
										<td>4%</td>
										<td>2%</td>
										<td>
											<div className="dropdown">
												<a href="#" onClick={(e) => e.preventDefault()}
													className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
													data-bs-toggle="dropdown">
													<span
														className="rounded-circle bg-transparent-info d-flex justify-content-center align-items-center me-2"><i
															className="ti ti-point-filled text-success"></i></span> Pending
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
																className="rounded-circle bg-transparent-skyblue d-flex justify-content-center align-items-center me-2"><i
																	className="ti ti-point-filled text-skyblue"></i></span>Pending
														</a>
													</li>
												</ul>
											</div>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_provident-fund"><i className="ti ti-edit"></i></a>
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
												<a href="#" className="avatar avatar-md avatar-rounded">
													<img src="/assets/img/users/user-37.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">Connie Waters</a></h6>
													<span className="d-block mt-1">Developer</span>
												</div>
											</div>
										</td>
										<td>Employee Provident Fund</td>
										<td>2%</td>
										<td>2%</td>
										<td>
											<div className="dropdown">
												<a href="#" onClick={(e) => e.preventDefault()}
													className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
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
																className="rounded-circle bg-transparent-skyblue d-flex justify-content-center align-items-center me-2"><i
																	className="ti ti-point-filled text-skyblue"></i></span>Pending
														</a>
													</li>
												</ul>
											</div>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_provident-fund"><i className="ti ti-edit"></i></a>
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
												<a href="#" className="avatar avatar-md avatar-rounded">
													<img src="/assets/img/users/user-38.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">Lori Broaddus</a></h6>
													<span className="d-block mt-1">Finance</span>
												</div>
											</div>
										</td>
										<td>Voluntary Provident Fund</td>
										<td>7%</td>
										<td>2%</td>
										<td>
											<div className="dropdown">
												<a href="#" onClick={(e) => e.preventDefault()}
													className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
													data-bs-toggle="dropdown">
													<span
														className="rounded-circle bg-transparent-info d-flex justify-content-center align-items-center me-2"><i
															className="ti ti-point-filled text-success"></i></span> Pending
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
																className="rounded-circle bg-transparent-skyblue d-flex justify-content-center align-items-center me-2"><i
																	className="ti ti-point-filled text-skyblue"></i></span>Pending
														</a>
													</li>
												</ul>
											</div>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_provident-fund"><i className="ti ti-edit"></i></a>
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
										Showing {Math.min((currentPage_providentfund - 1) * rowsPerPage_providentfund + 1, 11)}-{Math.min(currentPage_providentfund * rowsPerPage_providentfund, 11)} of 11 entries
									</p>
									<ul className="pagination mb-0">
										<li className={`page-item ${currentPage_providentfund === 1 ? 'disabled' : ''}`}>
											<button className="page-link" onClick={() => setCurrentPage_providentfund(p => Math.max(p - 1, 1))}>
												<i className="ti ti-chevron-left"></i>
											</button>
										</li>
										{[1, 2].map(page => (
											<li key={page} className={`page-item ${currentPage_providentfund === page ? 'active' : ''}`}>
												<button className="page-link" onClick={() => setCurrentPage_providentfund(page)}>{page}</button>
											</li>
										))}
										<li className={`page-item ${currentPage_providentfund === 2 ? 'disabled' : ''}`}>
											<button className="page-link" onClick={() => setCurrentPage_providentfund(p => Math.min(p + 1, 2))}>
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

export default ProvidentFund;
