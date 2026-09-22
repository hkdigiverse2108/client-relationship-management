import React, { useState } from 'react';
import { Link } from 'react-router-dom';import PageHeader from '../components/common/PageHeader';


const WorkFromHome = () => {
  // Pagination state for workfromhome
  const [currentPage_workfromhome, setCurrentPage_workfromhome] = useState(1);
  const [rowsPerPage_workfromhome, setRowsPerPage_workfromhome] = useState(10);
  const [searchQuery_workfromhome, setSearchQuery_workfromhome] = useState('');
  return (
    <>
      <div className="page-wrapper">
			<div className="content">

				{/* Breadcrumb */}
				<PageHeader 
					title="Work From Home Management"
					breadcrumbs={[
						{ label: 'Dashboard' },
						{ label: 'Attendance' },
						{ label: 'Work From Home Management', active: true }
					]}
				>
					<div className="mb-2 me-2">
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
							<a href="#" data-bs-toggle="modal" data-bs-target="#add_modal"
								className="btn btn-primary d-flex align-items-center"><i
									className="ti ti-circle-plus me-2"></i>Add New Request</a>
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
						<h5>WFH management</h5>
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
										<Link to="#" className="dropdown-item rounded-1">Accountant</Link>
									</li>
									<li>
										<Link to="#" className="dropdown-item rounded-1">App Developer</Link>
									</li>
									<li>
										<Link to="#" className="dropdown-item rounded-1">Technician</Link>
									</li>
									<li>
										<Link to="#" className="dropdown-item rounded-1">Web Developer</Link>
									</li>
								</ul>
							</div>
							<div className="dropdown me-3">
								<Link to="#"
									className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
									data-bs-toggle="dropdown">
									Shift
								</Link>
								<ul className="dropdown-menu  dropdown-menu-end p-3">
									<li>
										<Link to="#" className="dropdown-item rounded-1">Regular</Link>
									</li>
									<li>
										<Link to="#" className="dropdown-item rounded-1">Night</Link>
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
										<Link to="#" className="dropdown-item rounded-1">Approved</Link>
									</li>
									<li>
										<Link to="#" className="dropdown-item rounded-1">Pending</Link>
									</li>
									<li>
										<Link to="#" className="dropdown-item rounded-1">Rejected</Link>
									</li>
									<li>
										<Link to="#" className="dropdown-item rounded-1">Completed</Link>
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
											value={rowsPerPage_workfromhome}
											onChange={(e) => { setRowsPerPage_workfromhome(Number(e.target.value)); setCurrentPage_workfromhome(1); }}
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
											value={searchQuery_workfromhome}
											onChange={(e) => { setSearchQuery_workfromhome(e.target.value); setCurrentPage_workfromhome(1); }}
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
										<th>Designation</th>
										<th>Shift</th>
										<th>Reason</th>
										<th>Date</th>
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
											<a href="/employee-details">Emp-001</a>
										</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/users/user-11.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<a className="fw-medium fs-14">Anthony Lewis</a>
												</div>
											</div>
										</td>
										<td>Accountant</td>
										<td>Regular</td>
										<td>Mild health issue</td>
										<td>
											14 Jun 2025
										</td>
										<td>
											<span
												className="badge badge-soft-success d-inline-flex align-items-center badge-xs">
												Approved
											</span>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_modal"><i className="ti ti-edit"></i></a>
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
											<a href="/employee-details">Emp-002</a>
										</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/users/user-12.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<a className="fw-medium fs-14">Brian Villalobos</a>
												</div>
											</div>
										</td>
										<td>App Developer</td>
										<td>Regular</td>
										<td>Internet issue</td>
										<td>
											25 May 2025
										</td>
										<td>
											<span
												className="badge badge-soft-info d-inline-flex align-items-center badge-xs">
												Pending
											</span>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_modal"><i className="ti ti-edit"></i></a>
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
											<a href="/employee-details">Emp-003</a>
										</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/users/user-13.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<a className="fw-medium fs-14">Harvey Smith</a>
												</div>
											</div>
										</td>
										<td>Technician</td>
										<td>Night</td>
										<td>Bad weather</td>
										<td>
											10 May 2025
										</td>
										<td>
											<span
												className="badge badge-soft-danger d-inline-flex align-items-center badge-xs">
												Rejected
											</span>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_modal"><i className="ti ti-edit"></i></a>
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
											<a href="/employee-details">Emp-004</a>
										</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/users/user-14.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<a className="fw-medium fs-14">Stephan Peralt</a>
												</div>
											</div>
										</td>
										<td>Web Developer</td>
										<td>Night</td>
										<td>Power outage</td>
										<td>
											28 Apr 2025
										</td>
										<td>
											<span
												className="badge badge-soft-info d-inline-flex align-items-center badge-xs">
												Pending
											</span>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_modal"><i className="ti ti-edit"></i></a>
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
											<a href="/employee-details">Emp-005</a>
										</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/users/user-15.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<a className="fw-medium fs-14">Doglas Martini</a>
												</div>
											</div>
										</td>
										<td>Sales Executive Officer</td>
										<td>Night</td>
										<td>Traffic disruption</td>
										<td>
											15 Apr 2025
										</td>
										<td>
											<span
												className="badge badge-soft-success d-inline-flex align-items-center badge-xs">
												Approved
											</span>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_modal"><i className="ti ti-edit"></i></a>
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
											<a href="/employee-details">Emp-006</a>
										</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/users/user-16.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<a className="fw-medium fs-14">Linda Ray</a>
												</div>
											</div>
										</td>
										<td>Designer</td>
										<td>Regular</td>
										<td>Home maintenance</td>
										<td>
											20 Mar 2025
										</td>
										<td>
											<span
												className="badge badge-soft-danger d-inline-flex align-items-center badge-xs">
												Rejected
											</span>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_modal"><i className="ti ti-edit"></i></a>
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
											<a href="/employee-details">Emp-007</a>
										</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/users/user-17.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<a className="fw-medium fs-14">Elliot Murray</a>
												</div>
											</div>
										</td>
										<td>Account Manager</td>
										<td>Regular</td>
										<td>Extended travel</td>
										<td>
											10 Mar 2025
										</td>
										<td>
											<span
												className="badge badge-soft-success d-inline-flex align-items-center badge-xs">
												Approved
											</span>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_modal"><i className="ti ti-edit"></i></a>
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
											<a href="/employee-details">Emp-008</a>
										</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/users/user-18.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<a className="fw-medium fs-14">Rebecca Smtih</a>
												</div>
											</div>
										</td>
										<td>SEO Analyst</td>
										<td>Night</td>
										<td>Mild health issue</td>
										<td>
											17 Feb 2025
										</td>
										<td>
											<span
												className="badge badge-soft-success d-inline-flex align-items-center badge-xs">
												Completed
											</span>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_modal"><i className="ti ti-edit"></i></a>
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
											<a href="/employee-details">Emp-009</a>
										</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/users/user-19.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<a className="fw-medium fs-14">Connie Waters</a>
												</div>
											</div>
										</td>
										<td>Admin</td>
										<td>Regular</td>
										<td>Internet issue</td>
										<td>
											02 Feb 2025
										</td>
										<td>
											<span
												className="badge badge-soft-info d-inline-flex align-items-center badge-xs">
												Pending
											</span>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_modal"><i className="ti ti-edit"></i></a>
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
											<a href="/employee-details">Emp-010</a>
										</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/users/user-20.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<a className="fw-medium fs-14">Lori Broaddus</a>
												</div>
											</div>
										</td>
										<td>Business Analyst</td>
										<td>Night</td>
										<td>Power outage</td>
										<td>
											24 Jan 2025
										</td>
										<td>
											<span
												className="badge badge-soft-success d-inline-flex align-items-center badge-xs">
												Approved
											</span>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_modal"><i className="ti ti-edit"></i></a>
											</div>
										</td>
									</tr>
								</tbody>
							</table>

								{/* Pagination Footer */}
								<div className="d-flex align-items-center justify-content-between flex-wrap row-gap-2 px-3 py-3 border-top">
									<p className="mb-0 text-gray-9 fs-14">
										Showing {Math.min((currentPage_workfromhome - 1) * rowsPerPage_workfromhome + 1, 11)}-{Math.min(currentPage_workfromhome * rowsPerPage_workfromhome, 11)} of 11 entries
									</p>
									<ul className="pagination mb-0">
										<li className={`page-item ${currentPage_workfromhome === 1 ? 'disabled' : ''}`}>
											<button className="page-link" onClick={() => setCurrentPage_workfromhome(p => Math.max(p - 1, 1))}>
												<i className="ti ti-chevron-left"></i>
											</button>
										</li>
										{[1, 2].map(page => (
											<li key={page} className={`page-item ${currentPage_workfromhome === page ? 'active' : ''}`}>
												<button className="page-link" onClick={() => setCurrentPage_workfromhome(page)}>{page}</button>
											</li>
										))}
										<li className={`page-item ${currentPage_workfromhome === 2 ? 'disabled' : ''}`}>
											<button className="page-link" onClick={() => setCurrentPage_workfromhome(p => Math.min(p + 1, 2))}>
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

export default WorkFromHome;
