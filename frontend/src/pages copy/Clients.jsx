import React, { useState } from 'react';
import { Link } from 'react-router-dom';import PageHeader from '../components/common/PageHeader';


const Clients = () => {
  // Pagination state for clients
  const [currentPage_clients, setCurrentPage_clients] = useState(1);
  const [rowsPerPage_clients, setRowsPerPage_clients] = useState(10);
  const [searchQuery_clients, setSearchQuery_clients] = useState('');
  return (
    <>
      <div className="page-wrapper">
			<div className="content">

				{/* Breadcrumb */}
				<PageHeader 
					title="Clients"
					breadcrumbs={[
						{ label: 'Dashboard' },
						{ label: 'Projects' },
						{ label: 'Client List', active: true }
					]}
				>
					<div className="me-2 mb-2">
							<div className="d-flex align-items-center border bg-white rounded p-1 me-2 icon-list">
								<a href="/clients" className="btn btn-icon btn-sm active bg-primary text-white me-1"><i
										className="ti ti-list-tree"></i></a>
								<a href="/clients-grid" className="btn btn-icon btn-sm"><i
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
							<a href="#" data-bs-toggle="modal" data-bs-target="#add_client"
								className="btn btn-primary d-flex align-items-center"><i
									className="ti ti-circle-plus me-2"></i>Add Client</a>
						</div>
						<div className="ms-2 head-icons">
							<a href="#" onClick={(e) => e.preventDefault()} className="" data-bs-toggle="tooltip" data-bs-placement="top"
								data-bs-original-title="Collapse" id="collapse-header">
								<i className="ti ti-chevrons-up"></i>
							</a>
						</div>
				</PageHeader>
				{/* /Breadcrumb */}

				{/* Clients Info */}
				<div className="row">
					<div className="col-xl-3 col-md-6 d-flex">
						<div className="card flex-fill">
							<div className="card-body">
								<div className="d-flex align-items-center justify-content-between">
									<div className="d-flex align-items-center">
										<div className="flex-shrink-0 me-2">
											<span
												className="p-2 br-10 bg-pink-transparent border border-pink d-flex align-items-center justify-content-center">
												<i className="ti ti-users-group text-pink fs-18"></i>
											</span>
										</div>
										<div>
											<p className="fs-12 fw-medium mb-0 text-gray-5 mb-1">Total Clients</p>
											<h4>300</h4>
										</div>
									</div>
									<span
										className="badge bg-transparent-purple d-inline-flex align-items-center fw-normal">
										<i className="ti ti-arrow-wave-right-down me-1"></i>
										+19.01%
									</span>
								</div>
							</div>
						</div>
					</div>
					<div className="col-xl-3 col-md-6 d-flex">
						<div className="card flex-fill">
							<div className="card-body">
								<div className="d-flex align-items-center justify-content-between">
									<div className="d-flex align-items-center">
										<div className="flex-shrink-0 me-2">
											<span
												className="p-2 br-10 bg-success-transparent border border-success d-flex align-items-center justify-content-center">
												<i className="ti ti-user-share fs-18"></i>
											</span>
										</div>
										<div>
											<p className="fs-12 fw-medium mb-0 text-gray-5 mb-1">Active Clients</p>
											<h4>270</h4>
										</div>
									</div>
									<span
										className="badge bg-transparent-primary text-primary d-inline-flex align-items-center fw-normal">
										<i className="ti ti-arrow-wave-right-down me-1"></i>
										+19.01%
									</span>
								</div>
							</div>
						</div>
					</div>
					<div className="col-xl-3 col-md-6 d-flex">
						<div className="card flex-fill">
							<div className="card-body">
								<div className="d-flex align-items-center justify-content-between">
									<div className="d-flex align-items-center">
										<div className="flex-shrink-0 me-2">
											<span
												className="p-2 br-10 bg-danger-transparent border border-danger d-flex align-items-center justify-content-center">
												<i className="ti ti-user-pause fs-18"></i>
											</span>
										</div>
										<div>
											<p className="fs-12 fw-medium mb-0 text-gray-5 mb-1">Inactive Clients</p>
											<h4>30</h4>
										</div>
									</div>
									<span
										className="badge bg-transparent-dark text-dark d-inline-flex align-items-center fw-normal">
										<i className="ti ti-arrow-wave-right-down me-1"></i>
										+19.01%
									</span>
								</div>
							</div>
						</div>
					</div>
					<div className="col-xl-3 col-md-6 d-flex">
						<div className="card flex-fill">
							<div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
						<h5>Client List</h5>
						<div className="d-flex my-xl-auto right-content align-items-center flex-wrap row-gap-3">
							<div className="dropdown me-3">
								<Link to="#"
									className="dropdown-toggle btn btn-sm btn-white d-inline-flex align-items-center"
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
							<div className="card-body">
								<div className="d-flex align-items-center justify-content-between">
									<div className="d-flex align-items-center">
										<div className="flex-shrink-0 me-2">
											<span
												className="p-2 br-10 bg-info-transparent border border-info d-flex align-items-center justify-content-center">
												<i className="ti ti-user-plus fs-18"></i>
											</span>
										</div>
										<div>
											<p className="fs-12 fw-medium mb-0 text-gray-5 mb-1">New Clients</p>
											<h4>300</h4>
										</div>
									</div>
									<span
										className="badge bg-transparent-secondary text-dark d-inline-flex align-items-center fw-normal">
										<i className="ti ti-arrow-wave-right-down me-1"></i>
										+19.01%
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
				{/* /Clients Info */}

				{/* Clients list */}
				<div className="card">
					
					<div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
						<h5>Client List</h5>
						<div className="d-flex my-xl-auto right-content align-items-center flex-wrap row-gap-3">
							<div className="dropdown me-3">
								<Link to="#"
									className="dropdown-toggle btn btn-sm btn-white d-inline-flex align-items-center"
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
											value={rowsPerPage_clients}
											onChange={(e) => { setRowsPerPage_clients(Number(e.target.value)); setCurrentPage_clients(1); }}
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
											value={searchQuery_clients}
											onChange={(e) => { setSearchQuery_clients(e.target.value); setCurrentPage_clients(1); }}
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
										<th>Client ID</th>
										<th>Client Name</th>
										<th>Company Name</th>
										<th>Email</th>
										<th>Phone</th>
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
										<td><a href="/client-details">Cli-001</a></td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="/client-details"
													className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/users/user-39.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="/client-details">Michael
															Walker</a></h6>
													<span className="fs-12 fw-normal ">CEO</span>
												</div>
											</div>
										</td>
										<td>BrightWave Innovations</td>
										<td>
											michael@example.com
										</td>
										<td>
											(163) 2459 315
										</td>
										<td>
											<span className="badge badge-success d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Active
											</span>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_client"><i className="ti ti-edit"></i></a>
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
										<td><a href="/client-details">Cli-002</a></td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="/client-details"
													className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/users/user-40.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="/client-details">Sophie
															Headrick</a></h6>
													<span className="fs-12 fw-normal ">Manager</span>
												</div>
											</div>
										</td>
										<td>Stellar Dynamics</td>
										<td>
											sophie@example.com
										</td>
										<td>
											(146) 1249 296
										</td>
										<td>
											<span className="badge badge-success d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Active
											</span>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_client"><i className="ti ti-edit"></i></a>
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
										<td><a href="/client-details">Cli-003</a></td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="/client-details"
													className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/users/user-41.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="/client-details">Cameron
															Drake</a></h6>
													<span className="fs-12 fw-normal ">Director</span>
												</div>
											</div>
										</td>
										<td>Quantum Nexus</td>
										<td>
											cameron@example.com
										</td>
										<td>
											(135) 3489 516
										</td>
										<td>
											<span className="badge badge-success d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Active
											</span>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_client"><i className="ti ti-edit"></i></a>
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
										<td><a href="/client-details">Cli-004</a></td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="/client-details"
													className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/users/user-42.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="/client-details">Doris
															Crowley</a></h6>
													<span className="fs-12 fw-normal ">Consultant</span>
												</div>
											</div>
										</td>
										<td>EcoVision Enterprises</td>
										<td>
											doris@example.com
										</td>
										<td>
											(158) 3459 596
										</td>
										<td>
											<span className="badge badge-success d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Active
											</span>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_client"><i className="ti ti-edit"></i></a>
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
										<td><a href="/client-details">Cli-005</a></td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="/client-details"
													className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/users/user-44.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="/client-details">Thomas
															Bordelon</a></h6>
													<span className="fs-12 fw-normal ">Manager</span>
												</div>
											</div>
										</td>
										<td>Aurora Technologies</td>
										<td>
											thomas@example.com
										</td>
										<td>
											(196) 4862 196
										</td>
										<td>
											<span className="badge badge-success d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Active
											</span>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_client"><i className="ti ti-edit"></i></a>
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
										<td><a href="/client-details">Cli-006</a></td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="/client-details"
													className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/users/user-45.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="/client-details">Kathleen
															Gutierrez</a></h6>
													<span className="fs-12 fw-normal ">Director</span>
												</div>
											</div>
										</td>
										<td>BlueSky Ventures</td>
										<td>
											kathleen@example.com
										</td>
										<td>
											(163) 6498 256
										</td>
										<td>
											<span className="badge badge-success d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Active
											</span>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_client"><i className="ti ti-edit"></i></a>
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
										<td><a href="/client-details">Cli-007</a></td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="/client-details"
													className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/users/user-46.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="/client-details">Bruce Wright</a>
													</h6>
													<span className="fs-12 fw-normal ">CEO</span>
												</div>
											</div>
										</td>
										<td>TerraFusion Energy</td>
										<td>
											bruce@example.com
										</td>
										<td>
											(154) 6481 075
										</td>
										<td>
											<span className="badge badge-success d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Active
											</span>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_client"><i className="ti ti-edit"></i></a>
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
										<td><a href="/client-details">Cli-008</a></td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="/client-details"
													className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/users/user-47.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="/client-details">Estelle
															Morgan</a></h6>
													<span className="fs-12 fw-normal ">Manager</span>
												</div>
											</div>
										</td>
										<td>UrbanPulse Design</td>
										<td>
											estelle@example.com
										</td>
										<td>
											(184) 6348 195
										</td>
										<td>
											<span className="badge badge-danger d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Inactive
											</span>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_client"><i className="ti ti-edit"></i></a>
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
										<td><a href="/client-details">Cli-009</a></td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="/client-details"
													className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/users/user-48.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="/client-details">Stephen Dias</a>
													</h6>
													<span className="fs-12 fw-normal ">CEO</span>
												</div>
											</div>
										</td>
										<td>Nimbus Networks</td>
										<td>
											stephen@example.com
										</td>
										<td>
											(175) 2496 125
										</td>
										<td>
											<span className="badge badge-success d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Active
											</span>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_client"><i className="ti ti-edit"></i></a>
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
										<td><a href="/client-details">Cli-010</a></td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="/client-details"
													className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/users/user-43.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="/client-details">Angela
															Thomas</a></h6>
													<span className="fs-12 fw-normal ">Consultant</span>
												</div>
											</div>
										</td>
										<td>Epicurean Delights</td>
										<td>
											angela@example.com
										</td>
										<td>
											(132) 3145 977
										</td>
										<td>
											<span className="badge badge-success d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Active
											</span>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_client"><i className="ti ti-edit"></i></a>
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
										Showing {Math.min((currentPage_clients - 1) * rowsPerPage_clients + 1, 11)}-{Math.min(currentPage_clients * rowsPerPage_clients, 11)} of 11 entries
									</p>
									<ul className="pagination mb-0">
										<li className={`page-item ${currentPage_clients === 1 ? 'disabled' : ''}`}>
											<button className="page-link" onClick={() => setCurrentPage_clients(p => Math.max(p - 1, 1))}>
												<i className="ti ti-chevron-left"></i>
											</button>
										</li>
										{[1, 2].map(page => (
											<li key={page} className={`page-item ${currentPage_clients === page ? 'active' : ''}`}>
												<button className="page-link" onClick={() => setCurrentPage_clients(page)}>{page}</button>
											</li>
										))}
										<li className={`page-item ${currentPage_clients === 2 ? 'disabled' : ''}`}>
											<button className="page-link" onClick={() => setCurrentPage_clients(p => Math.min(p + 1, 2))}>
												<i className="ti ti-chevron-right"></i>
											</button>
										</li>
									</ul>
								</div>
						</div>
					</div>
				</div>
				{/* /Clients list */}

			</div>
			<div className="footer d-sm-flex align-items-center justify-content-between border-top bg-white p-3">
				<p className="mb-0">2014 - 2026 &copy; SmartHR.</p>
				<p>Designed &amp; Developed By <a href="#" onClick={(e) => e.preventDefault()} className="text-primary">Dreams</a></p>
			</div>
		</div>
		
    </>
  );
};

export default Clients;
