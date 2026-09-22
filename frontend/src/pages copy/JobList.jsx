import React, { useState } from 'react';
import { Link } from 'react-router-dom';import PageHeader from '../components/common/PageHeader';


const JobList = () => {
  // Pagination state for joblist
  const [currentPage_joblist, setCurrentPage_joblist] = useState(1);
  const [rowsPerPage_joblist, setRowsPerPage_joblist] = useState(10);
  const [searchQuery_joblist, setSearchQuery_joblist] = useState('');
  return (
    <>
      <div className="page-wrapper">
			<div className="content">

				{/* Breadcrumb */}
				<PageHeader 
					title="Jobs"
					breadcrumbs={[
						{ label: 'Dashboard' },
						{ label: 'Recruitment' },
						{ label: 'Jobs', active: true }
					]}
				>
					<div className="me-2 mb-2">
							<div className="d-flex align-items-center border bg-white rounded p-1 me-2 icon-list">
								<a href="/job-list" className="btn btn-icon btn-sm active bg-primary text-white me-1"><i
										className="ti ti-list-tree"></i></a>
								<a href="/job-grid" className="btn btn-icon btn-sm"><i
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
							<a href="#" data-bs-toggle="modal" data-bs-target="#add_post"
								className="btn btn-primary d-flex align-items-center"><i
									className="ti ti-circle-plus me-2"></i>Post job</a>
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
						<h5>Job List</h5>
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
										<Link to="#" className="dropdown-item rounded-1">Senior IOS
											Developer</Link>
									</li>
									<li>
										<Link to="#" className="dropdown-item rounded-1">Junior PHP
											Developer</Link>
									</li>
									<li>
										<Link to="#" className="dropdown-item rounded-1">Network
											Engineer</Link>
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
										<Link to="#" className="dropdown-item rounded-1">sent</Link>
									</li>
									<li>
										<Link to="#" className="dropdown-item rounded-1">Expired</Link>
									</li>
									<li>
										<Link to="#" className="dropdown-item rounded-1">Declined</Link>
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
											value={rowsPerPage_joblist}
											onChange={(e) => { setRowsPerPage_joblist(Number(e.target.value)); setCurrentPage_joblist(1); }}
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
											value={searchQuery_joblist}
											onChange={(e) => { setSearchQuery_joblist(e.target.value); setCurrentPage_joblist(1); }}
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
										<th>Job ID</th>
										<th>Job Title</th>
										<th>Category</th>
										<th>Location</th>
										<th>Salary Range</th>
										<th>Posted Date</th>
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
										<td>Job-001</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md bg-light rounded">
													<img src="/assets/img/icons/apple.svg"
														className="img-fluid rounded-circle" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">Senior IOS Developer</a></h6>
													<span className="d-block mt-1">25 Applicants</span>
												</div>
											</div>
										</td>
										<td>Software</td>
										<td>New York , USA</td>
										<td>30, 000 - 35, 000 / month</td>
										<td>12 Sep 2024 </td>

										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_post"><i className="ti ti-edit"></i></a>
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
										<td>Job-002</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md bg-light rounded">
													<img src="/assets/img/icons/php.svg" className="img-fluid rounded-circle"
														alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">Junior PHP Developer</a></h6>
													<span className="d-block mt-1">20 Applicants</span>
												</div>
											</div>
										</td>
										<td>Software</td>
										<td>Los Angeles, USA</td>
										<td>20, 000 - 25, 000 / month</td>
										<td>24 Oct 2024 </td>

										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_post"><i className="ti ti-edit"></i></a>
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
										<td>Job-003</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md bg-light rounded">
													<img src="/assets/img/icons/black.svg"
														className="img-fluid rounded-circle" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">Junior PHP Developer</a></h6>
													<span className="d-block mt-1">20 Applicants</span>
												</div>
											</div>
										</td>
										<td>Software</td>
										<td>Los Angeles, USA</td>
										<td>20, 000 - 25, 000 / month</td>
										<td>24 Oct 2024 </td>

										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_post"><i className="ti ti-edit"></i></a>
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
										<td>Job-004</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md bg-light rounded">
													<img src="/assets/img/icons/react.svg"
														className="img-fluid rounded-circle" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">Junior React Developer </a></h6>
													<span className="d-block mt-1">35 Applicants</span>
												</div>
											</div>
										</td>
										<td>Software</td>
										<td>Bristol, UK</td>
										<td>30, 000 - 35, 000 / month</td>
										<td>18 Feb 2024 </td>

										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_post"><i className="ti ti-edit"></i></a>
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
										<td>Job-005</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md bg-light rounded">
													<img src="/assets/img/icons/laravel.svg"
														className="img-fluid rounded-circle" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">Senior Laravel Developer </a></h6>
													<span className="d-block mt-1">40 Applicants</span>
												</div>
											</div>
										</td>
										<td>Software</td>
										<td>Washington, USA</td>
										<td>32, 000 - 36, 000 / month</td>
										<td>20 Jul 2024</td>

										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_post"><i className="ti ti-edit"></i></a>
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
										<td>Job-006</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md bg-light rounded">
													<img src="/assets/img/icons/devops.svg"
														className="img-fluid rounded-circle" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">DevOps Engineer</a></h6>
													<span className="d-block mt-1">20 Applicants</span>
												</div>
											</div>
										</td>
										<td>Software</td>
										<td>Coventry, UK</td>
										<td>25, 000 - 35, 000 / month</td>
										<td>10 Apr 2024</td>

										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_post"><i className="ti ti-edit"></i></a>
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
										<td>Job-007</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md bg-light rounded">
													<img src="/assets/img/icons/android.svg"
														className="img-fluid rounded-circle" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">Junior Android Developer</a></h6>
													<span className="d-block mt-1">25 Applicants</span>
												</div>
											</div>
										</td>
										<td>Software</td>
										<td>Chicago, USA</td>
										<td>28, 000 - 32, 000 / month</td>
										<td>29 Aug 2024</td>

										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_post"><i className="ti ti-edit"></i></a>
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
										<td>Job-008</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md bg-light rounded">
													<img src="/assets/img/icons/html.svg"
														className="img-fluid rounded-circle" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">Senior HTML Developer</a></h6>
													<span className="d-block mt-1">35 Applicants</span>
												</div>
											</div>
										</td>
										<td>Software</td>
										<td>Carlisle, UK</td>
										<td>25, 000 - 28, 000 / month</td>
										<td>22 Feb 2024</td>

										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_post"><i className="ti ti-edit"></i></a>
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
										<td>Job-009</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md bg-light rounded">
													<img src="/assets/img/icons/ui.svg" className="img-fluid rounded-circle"
														alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">Junior UI/UX Designer</a></h6>
													<span className="d-block mt-1">20 Applicants</span>
												</div>
											</div>
										</td>
										<td>Software</td>
										<td>Lancaster, UK</td>
										<td>20, 000 - 25, 000 / month</td>
										<td>03 Nov 2024</td>

										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_post"><i className="ti ti-edit"></i></a>
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
										<td>Job-010</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md bg-light rounded">
													<img src="/assets/img/icons/grafic.svg"
														className="img-fluid rounded-circle" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">Senior Graphic Designer</a></h6>
													<span className="d-block mt-1">25 Applicants</span>
												</div>
											</div>
										</td>
										<td>Software</td>
										<td>San Diego, USA</td>
										<td>22, 000 - 28, 000 / month</td>
										<td>17 Dec 2024</td>

										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_post"><i className="ti ti-edit"></i></a>
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
										Showing {Math.min((currentPage_joblist - 1) * rowsPerPage_joblist + 1, 11)}-{Math.min(currentPage_joblist * rowsPerPage_joblist, 11)} of 11 entries
									</p>
									<ul className="pagination mb-0">
										<li className={`page-item ${currentPage_joblist === 1 ? 'disabled' : ''}`}>
											<button className="page-link" onClick={() => setCurrentPage_joblist(p => Math.max(p - 1, 1))}>
												<i className="ti ti-chevron-left"></i>
											</button>
										</li>
										{[1, 2].map(page => (
											<li key={page} className={`page-item ${currentPage_joblist === page ? 'active' : ''}`}>
												<button className="page-link" onClick={() => setCurrentPage_joblist(page)}>{page}</button>
											</li>
										))}
										<li className={`page-item ${currentPage_joblist === 2 ? 'disabled' : ''}`}>
											<button className="page-link" onClick={() => setCurrentPage_joblist(p => Math.min(p + 1, 2))}>
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

export default JobList;
