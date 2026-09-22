import React, { useState } from 'react';
import { Link } from 'react-router-dom';import PageHeader from '../components/common/PageHeader';


const Users = () => {
  // Pagination state for users
  const [currentPage_users, setCurrentPage_users] = useState(1);
  const [rowsPerPage_users, setRowsPerPage_users] = useState(10);
  const [searchQuery_users, setSearchQuery_users] = useState('');
  return (
    <>
      <div className="page-wrapper">
			<div className="content">

				{/* Breadcrumb */}
				<PageHeader 
					title="Users"
					breadcrumbs={[
						{ label: 'Dashboard' },
						{ label: 'User management' },
						{ label: 'Users', active: true }
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
							<a href="#" data-bs-toggle="modal" data-bs-target="#add_users"
								className="btn btn-primary d-flex align-items-center"><i
									className="ti ti-circle-plus me-2"></i>Add User</a>
						</div>
						<div className="head-icons ms-2">
							<a href="#" onClick={(e) => e.preventDefault()} className="" data-bs-toggle="tooltip" data-bs-placement="top"
								data-bs-original-title="Collapse" id="collapse-header">
								<i className="ti ti-chevrons-up"></i>
							</a>
						</div>
				</PageHeader>
				{/* /Breadcrumb */}

				{/* Performance Indicator list */}
				<div className="card">
					
					<div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
						<h5>Users List</h5>
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
									Role
								</Link>
								<ul className="dropdown-menu  dropdown-menu-end p-3">
									<li>
										<Link to="#" className="dropdown-item rounded-1">Employee</Link>
									</li>
									<li>
										<Link to="#" className="dropdown-item rounded-1">Client</Link>
									</li>
								</ul>
							</div>
							<div className="dropdown me-3">
								<Link to="#"
									className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
									data-bs-toggle="dropdown">
									Status
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
											value={rowsPerPage_users}
											onChange={(e) => { setRowsPerPage_users(Number(e.target.value)); setCurrentPage_users(1); }}
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
											value={searchQuery_users}
											onChange={(e) => { setSearchQuery_users(e.target.value); setCurrentPage_users(1); }}
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
										<th>Email</th>
										<th>Created Date</th>
										<th>Role</th>
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
												</div>
											</div>
										</td>
										<td>anthony@example.com</td>
										<td>
											12 Sep 2024
										</td>
										<td>
											<span
												className=" badge badge-md p-2 fs-10 badge-pink-transparent">Employee</span>
										</td>
										<td>
											<span className="badge badge-success d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Active
											</span>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2"><i className="ti ti-shield"></i></a>
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_user"><i className="ti ti-edit"></i></a>
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
												</div>
											</div>
										</td>
										<td>brian@example.com</td>
										<td>
											24 Oct 2024
										</td>
										<td>
											<span
												className=" badge badge-md p-2 fs-10 badge-pink-transparent">Employee</span>
										</td>
										<td>
											<span className="badge badge-success d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Active
											</span>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2"><i className="ti ti-shield"></i></a>
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_user"><i className="ti ti-edit"></i></a>
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
													<img src="/assets/img/users/user-19.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">Sophie Headrick</a></h6>
												</div>
											</div>
										</td>
										<td>sophie@example.com</td>
										<td>
											18 Feb 2024
										</td>
										<td>
											<span className=" badge badge-md p-2 fs-10 badge-soft-purple">Client</span>
										</td>
										<td>
											<span className="badge badge-success d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Active
											</span>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2"><i className="ti ti-shield"></i></a>
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_user"><i className="ti ti-edit"></i></a>
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
												</div>
											</div>
										</td>
										<td>peral@example.com</td>
										<td>
											17 Oct 2024
										</td>
										<td>
											<span
												className=" badge badge-md p-2 fs-10 badge-pink-transparent">Employee</span>
										</td>
										<td>
											<span className="badge badge-success d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Active
											</span>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2"><i className="ti ti-shield"></i></a>
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_user"><i className="ti ti-edit"></i></a>
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
													<img src="/assets/img/users/user-08.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">Thomas Bordelon</a></h6>
												</div>
											</div>
										</td>
										<td>thomas@example.com</td>
										<td>
											20 Jul 2024
										</td>
										<td>
											<span className=" badge badge-md p-2 fs-10 badge-soft-purple">Client</span>
										</td>
										<td>
											<span className="badge badge-success d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Active
											</span>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2"><i className="ti ti-shield"></i></a>
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_user"><i className="ti ti-edit"></i></a>
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
												</div>
											</div>
										</td>
										<td>martniwr@example.com</td>
										<td>
											10 Apr 2024
										</td>
										<td>
											<span
												className=" badge badge-md p-2 fs-10 badge-pink-transparent">Employee</span>
										</td>
										<td>
											<span className="badge badge-success d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Active
											</span>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2"><i className="ti ti-shield"></i></a>
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_user"><i className="ti ti-edit"></i></a>
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
													<img src="/assets/img/users/user-03.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">Cameron Drake</a></h6>
												</div>
											</div>
										</td>
										<td>cameron@example.com</td>
										<td>
											29 Aug 2024
										</td>
										<td>
											<span className=" badge badge-md p-2 fs-10 badge-soft-purple">Client</span>
										</td>
										<td>
											<span className="badge badge-success d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Active
											</span>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2"><i className="ti ti-shield"></i></a>
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_user"><i className="ti ti-edit"></i></a>
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
												</div>
											</div>
										</td>
										<td>harvey@example.com</td>
										<td>
											22 Feb 2024
										</td>
										<td>
											<span
												className=" badge badge-md p-2 fs-10 badge-pink-transparent">Employee</span>
										</td>
										<td>
											<span className="badge badge-danger d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Inactive
											</span>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2"><i className="ti ti-shield"></i></a>
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_user"><i className="ti ti-edit"></i></a>
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
													<img src="/assets/img/users/user-16.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">Michael Walker</a></h6>
												</div>
											</div>
										</td>
										<td>michael@example.com</td>
										<td>
											03 Nov 2024
										</td>
										<td>
											<span className=" badge badge-md p-2 fs-10 badge-soft-purple">Client</span>
										</td>
										<td>
											<span className="badge badge-success d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Active
											</span>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2"><i className="ti ti-shield"></i></a>
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_user"><i className="ti ti-edit"></i></a>
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
													<h6 className="fw-medium"><a href="#">Doris Crowley</a></h6>
												</div>
											</div>
										</td>
										<td>doris@example.com</td>
										<td>
											17 Dec 2024
										</td>
										<td>
											<span className=" badge badge-md p-2 fs-10 badge-soft-purple">Client</span>
										</td>
										<td>
											<span className="badge badge-success d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Active
											</span>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2"><i className="ti ti-shield"></i></a>
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_user"><i className="ti ti-edit"></i></a>
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
										Showing {Math.min((currentPage_users - 1) * rowsPerPage_users + 1, 11)}-{Math.min(currentPage_users * rowsPerPage_users, 11)} of 11 entries
									</p>
									<ul className="pagination mb-0">
										<li className={`page-item ${currentPage_users === 1 ? 'disabled' : ''}`}>
											<button className="page-link" onClick={() => setCurrentPage_users(p => Math.max(p - 1, 1))}>
												<i className="ti ti-chevron-left"></i>
											</button>
										</li>
										{[1, 2].map(page => (
											<li key={page} className={`page-item ${currentPage_users === page ? 'active' : ''}`}>
												<button className="page-link" onClick={() => setCurrentPage_users(page)}>{page}</button>
											</li>
										))}
										<li className={`page-item ${currentPage_users === 2 ? 'disabled' : ''}`}>
											<button className="page-link" onClick={() => setCurrentPage_users(p => Math.min(p + 1, 2))}>
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

export default Users;
