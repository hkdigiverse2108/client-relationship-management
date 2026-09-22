import React, { useState } from 'react';
import { Link } from 'react-router-dom';import PageHeader from '../components/common/PageHeader';


const CampusHiring = () => {
  // Pagination state for campushiring
  const [currentPage_campushiring, setCurrentPage_campushiring] = useState(1);
  const [rowsPerPage_campushiring, setRowsPerPage_campushiring] = useState(10);
  const [searchQuery_campushiring, setSearchQuery_campushiring] = useState('');
  return (
    <>
      <div className="page-wrapper">
			<div className="content">

				{/* Breadcrumb */}
				<PageHeader 
					title="Campus Hiring"
					breadcrumbs={[
						{ label: 'Dashboard' },
						{ label: 'Recruitment' },
						{ label: 'Campus Hiring', active: true }
					]}
				>
					<div className="mb-2 me-2">
							<div className="dropdown">
								<a href="#" className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
									data-bs-toggle="dropdown">
									<i className="ti ti-file-export me-1"></i>Export
								</a>
								<ul className="dropdown-menu  dropdown-menu-end p-3">
									<li>
										<a href="#" className="dropdown-item rounded-1"><i
												className="ti ti-file-type-pdf me-1"></i>Export as PDF</a>
									</li>
									<li>
										<a href="#" className="dropdown-item rounded-1"><i
												className="ti ti-file-type-xls me-1"></i>Export as Excel </a>
									</li>
								</ul>
							</div>

						</div>
						<div className="mb-2">
							<a href="#" data-bs-toggle="modal" data-bs-target="#add_candidate"
								className="btn btn-primary d-flex align-items-center"><i
									className="ti ti-circle-plus me-2"></i>Add New Candidate</a>
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
						<h5>Students List</h5>
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
									<li>
										<Link to="#" className="dropdown-item rounded-1">Sales Executive
											Officer</Link>
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
										<Link to="#" className="dropdown-item rounded-1">Applied</Link>
									</li>
									<li>
										<Link to="#" className="dropdown-item rounded-1">In progress</Link>
									</li>
									<li>
										<Link to="#" className="dropdown-item rounded-1">Selected</Link>
									</li>
									<li>
										<Link to="#" className="dropdown-item rounded-1">Rejected</Link>
									</li>
								</ul>
							</div>
							<div className="dropdown">
								<Link to="#" className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
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
											value={rowsPerPage_campushiring}
											onChange={(e) => { setRowsPerPage_campushiring(Number(e.target.value)); setCurrentPage_campushiring(1); }}
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
											value={searchQuery_campushiring}
											onChange={(e) => { setSearchQuery_campushiring(e.target.value); setCurrentPage_campushiring(1); }}
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
										<th>Student Name</th>
										<th>Branch</th>
										<th>Graduation Year</th>
										<th>Job Role</th>
										<th>Recruiter Name</th>
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
												<a href="#" className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/users/user-01.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<a className="fw-medium fs-14">Harold Gaynor</a>
													<span className="d-block">harold@example.com</span>
												</div>
											</div>
										</td>
										<td>B.E/CSE</td>
										<td>2025</td>
										<td>Accountant</td>
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
										<td>
											<span
												className="badge border border-purple text-purple d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Applied
											</span>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_candidate"><i className="ti ti-edit"></i></a>
												<a href="#" className="me-2" data-bs-toggle="modal"
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
												<a href="#" className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/users/user-02.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<a className="fw-medium fs-14">Sandra Ornellas</a>
													<span className="d-block">sandra@example.com</span>
												</div>
											</div>
										</td>
										<td>B.Tech/IT</td>
										<td>2025</td>
										<td>App Developer</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/users/user-13.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<a className="fw-medium fs-14">Brian Villalobos</a>
												</div>
											</div>
										</td>
										<td>
											<span
												className="badge border border-pink text-pink d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Shortlisted
											</span>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_candidate"><i className="ti ti-edit"></i></a>
												<a href="#" className="me-2" data-bs-toggle="modal"
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
												<a href="#" className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/users/user-03.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<a className="fw-medium fs-14">John Harris</a>
													<span className="d-block">john@example.com</span>
												</div>
											</div>
										</td>
										<td>B.E/CSE</td>
										<td>2025</td>
										<td>Technician</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/users/user-12.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<a className="fw-medium fs-14">Harvey Smith</a>
												</div>
											</div>
										</td>
										<td>
											<span
												className="badge border border-info text-info d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>In progress
											</span>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_candidate"><i className="ti ti-edit"></i></a>
												<a href="#" className="me-2" data-bs-toggle="modal"
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
												<a href="#" className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/users/user-04.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<a className="fw-medium fs-14">Whitney Barnette</a>
													<span className="d-block">whitney@example.com</span>
												</div>
											</div>
										</td>
										<td>B.E/CSE</td>
										<td>2025</td>
										<td>Web Developer</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/users/user-16.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<a className="fw-medium fs-14">Stephan Peralt</a>
												</div>
											</div>
										</td>
										<td>
											<span
												className="badge border border-purple text-purple d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Applied
											</span>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_candidate"><i className="ti ti-edit"></i></a>
												<a href="#" className="me-2" data-bs-toggle="modal"
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
												<a href="#" className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/users/user-05.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<a className="fw-medium fs-14">Richard Thompson</a>
													<span className="d-block">richard@example.com</span>
												</div>
											</div>
										</td>
										<td>B.E/CSE</td>
										<td>2024</td>
										<td>Sales Executive Officer</td>
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
										<td>
											<span
												className="badge border border-success text-success d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Selected
											</span>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_candidate"><i className="ti ti-edit"></i></a>
												<a href="#" className="me-2" data-bs-toggle="modal"
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
												<a href="#" className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/users/user-06.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<a className="fw-medium fs-14">Kerry Drake</a>
													<span className="d-block">kerry@example.com</span>
												</div>
											</div>
										</td>
										<td>B.Tech/IT</td>
										<td>2025</td>
										<td>Designer</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/users/user-14.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<a className="fw-medium fs-14">Linda Ray</a>
												</div>
											</div>
										</td>
										<td>
											<span
												className="badge border border-danger text-danger d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Rejected
											</span>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_candidate"><i className="ti ti-edit"></i></a>
												<a href="#" className="me-2" data-bs-toggle="modal"
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
												<a href="#" className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/users/user-07.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<a className="fw-medium fs-14">David Carmona</a>
													<span className="d-block">david@example.com</span>
												</div>
											</div>
										</td>
										<td>B.E/CSE</td>
										<td>2025</td>
										<td>Account Manager</td>
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
										<td>
											<span
												className="badge border border-info text-info d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>In progress
											</span>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_candidate"><i className="ti ti-edit"></i></a>
												<a href="#" className="me-2" data-bs-toggle="modal"
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
												<a href="#" className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/users/user-08.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<a className="fw-medium fs-14">Margaret Soto</a>
													<span className="d-block">margaret@example.com</span>
												</div>
											</div>
										</td>
										<td>B.Tech/IT</td>
										<td>2024</td>
										<td>SEO Analyst</td>
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
										<td>
											<span
												className="badge border border-pink text-pink d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Shortlisted
											</span>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_candidate"><i className="ti ti-edit"></i></a>
												<a href="#" className="me-2" data-bs-toggle="modal"
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
												<a href="#" className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/users/user-09.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<a className="fw-medium fs-14">Jeffrey Thaler</a>
													<span className="d-block">jeffrey@example.com</span>
												</div>
											</div>
										</td>
										<td>B.E/CSE</td>
										<td>2025</td>
										<td>Admin</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/users/user-20.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<a className="fw-medium fs-14">Connie Waters</a>
												</div>
											</div>
										</td>
										<td>
											<span
												className="badge border border-success text-success d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Selected
											</span>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_candidate"><i className="ti ti-edit"></i></a>
												<a href="#" className="me-2" data-bs-toggle="modal"
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
												<a href="#" className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/users/user-10.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<a className="fw-medium fs-14">Joyce Golston</a>
													<span className="d-block">joyce@example.com</span>
												</div>
											</div>
										</td>
										<td>B.Tech/IT</td>
										<td>2025</td>
										<td>Business Analyst</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/users/user-19.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<a className="fw-medium fs-14">Lori Broaddus</a>
												</div>
											</div>
										</td>
										<td>
											<span
												className="badge border border-info text-info d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>In progress
											</span>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_candidate"><i className="ti ti-edit"></i></a>
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#delete_modal"><i className="ti ti-trash"></i></a>
											</div>
										</td>
									</tr>
								</tbody>
							</table>

								{/* Pagination Footer */}
								<div className="d-flex align-items-center justify-content-between flex-wrap row-gap-2 px-3 py-3 border-top">
									<p className="mb-0 text-gray-9 fs-14">
										Showing {Math.min((currentPage_campushiring - 1) * rowsPerPage_campushiring + 1, 11)}-{Math.min(currentPage_campushiring * rowsPerPage_campushiring, 11)} of 11 entries
									</p>
									<ul className="pagination mb-0">
										<li className={`page-item ${currentPage_campushiring === 1 ? 'disabled' : ''}`}>
											<button className="page-link" onClick={() => setCurrentPage_campushiring(p => Math.max(p - 1, 1))}>
												<i className="ti ti-chevron-left"></i>
											</button>
										</li>
										{[1, 2].map(page => (
											<li key={page} className={`page-item ${currentPage_campushiring === page ? 'active' : ''}`}>
												<button className="page-link" onClick={() => setCurrentPage_campushiring(page)}>{page}</button>
											</li>
										))}
										<li className={`page-item ${currentPage_campushiring === 2 ? 'disabled' : ''}`}>
											<button className="page-link" onClick={() => setCurrentPage_campushiring(p => Math.min(p + 1, 2))}>
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
				<p>Designed &amp; Developed By <a href="#" className="text-primary">Dreams</a></p>
			</div>

		</div>
		
    </>
  );
};

export default CampusHiring;
