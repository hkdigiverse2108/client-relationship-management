import React, { useState } from 'react';
import { Link } from 'react-router-dom';import PageHeader from '../components/common/PageHeader';


const Timesheets = () => {
  // Pagination state for timesheets
  const [currentPage_timesheets, setCurrentPage_timesheets] = useState(1);
  const [rowsPerPage_timesheets, setRowsPerPage_timesheets] = useState(10);
  const [searchQuery_timesheets, setSearchQuery_timesheets] = useState('');
  return (
    <>
      <div className="page-wrapper">
			<div className="content">

				{/* Breadcrumb */}
				<PageHeader 
					title="Timesheets"
					breadcrumbs={[
						{ label: 'Dashboard' },
						{ label: 'Attendance' },
						{ label: 'Timesheets', active: true }
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
							<a href="#" data-bs-toggle="modal" data-bs-target="#add_timesheet"
								className="btn btn-primary d-flex align-items-center"><i
									className="ti ti-circle-plus me-2"></i>Add Today’s Work</a>
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
						<h5>Timesheet</h5>
						<div className="d-flex my-xl-auto right-content align-items-center flex-wrap row-gap-3">
							<div className="dropdown me-3">
								<Link to="#"
									className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
									data-bs-toggle="dropdown">
									Select Project
								</Link>
								<ul className="dropdown-menu  dropdown-menu-end p-3">
									<li>
										<Link to="#" className="dropdown-item rounded-1">Office
											Management</Link>
									</li>
									<li>
										<Link to="#" className="dropdown-item rounded-1">Project
											Management</Link>
									</li>
									<li>
										<Link to="#" className="dropdown-item rounded-1">Hospital
											Administration</Link>
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
											value={rowsPerPage_timesheets}
											onChange={(e) => { setRowsPerPage_timesheets(Number(e.target.value)); setCurrentPage_timesheets(1); }}
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
											value={searchQuery_timesheets}
											onChange={(e) => { setSearchQuery_timesheets(e.target.value); setCurrentPage_timesheets(1); }}
										/>
									</div>
								</div>
<div className="custom-datatable-filter table-responsive">
							<table className="table datatable">
								<thead className="thead-light">
									<tr>
										<th>Employee</th>
										<th>Date </th>
										<th>Project</th>
										<th>Assigned Hours</th>
										<th>Worked Hours</th>
										<th></th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/users/user-32.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">Anthony Lewis</a></h6>
													<span className="fs-12 fw-normal ">UI/UX Team</span>
												</div>
											</div>
										</td>
										<td>
											14 Jan 2024
										</td>
										<td>
											<p className="fs-14 fw-medium text-gray-9 d-flex align-items-center">Office
												Management <a href="#" className="ms-1" data-bs-toggle="tooltip"
													data-bs-placement="right" data-bs-title="Worked on the Management
												design & Development"><i className="ti ti-info-circle text-info"></i></a></p>
										</td>
										<td>32</td>
										<td>
											13
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_timesheet"><i className="ti ti-edit"></i></a>
												<a href="#" data-bs-toggle="modal" data-bs-target="#delete_modal"><i
														className="ti ti-trash"></i></a>
											</div>
										</td>
									</tr>
									<tr>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/users/user-09.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">Brian Villalobos</a></h6>
													<span className="fs-12 fw-normal ">Development</span>
												</div>
											</div>
										</td>
										<td>
											21 Jan 2024
										</td>
										<td>
											<p className="fs-14 fw-medium text-gray-9 d-flex align-items-center">Project
												Management <a href="#" className="ms-1" data-bs-toggle="tooltip"
													data-bs-placement="right" data-bs-title="Worked on the Management
												design & Development"><i className="ti ti-info-circle text-info"></i></a></p>
										</td>
										<td>45</td>
										<td>
											14
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_timesheet"><i className="ti ti-edit"></i></a>
												<a href="#" data-bs-toggle="modal" data-bs-target="#delete_modal"><i
														className="ti ti-trash"></i></a>
											</div>
										</td>
									</tr>
									<tr>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/users/user-01.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">Harvey Smith</a></h6>
													<span className="fs-12 fw-normal ">HR</span>
												</div>
											</div>
										</td>
										<td>
											20 Feb 2024
										</td>
										<td>
											<p className="fs-14 fw-medium text-gray-9 d-flex align-items-center">Project
												Management <a href="#" className="ms-1" data-bs-toggle="tooltip"
													data-bs-placement="right" data-bs-title="Worked on the Management
												design & Development"><i className="ti ti-info-circle text-info"></i></a></p>
										</td>
										<td>45</td>
										<td>
											22
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_timesheet"><i className="ti ti-edit"></i></a>
												<a href="#" data-bs-toggle="modal" data-bs-target="#delete_modal"><i
														className="ti ti-trash"></i></a>
											</div>
										</td>
									</tr>
									<tr>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/users/user-33.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">Stephan Peralt</a></h6>
													<span className="fs-12 fw-normal ">Management</span>
												</div>
											</div>
										</td>
										<td>
											15 Mar 2024
										</td>
										<td>
											<p className="fs-14 fw-medium text-gray-9 d-flex align-items-center ">Hospital
												Administration<a href="#" className="ms-1" data-bs-toggle="tooltip"
													data-bs-placement="right" data-bs-title="Worked on the Management
												design & Development"><i className="ti ti-info-circle text-info"></i></a></p>
										</td>
										<td>45</td>
										<td>
											78
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_timesheet"><i className="ti ti-edit"></i></a>
												<a href="#" data-bs-toggle="modal" data-bs-target="#delete_modal"><i
														className="ti ti-trash"></i></a>
											</div>
										</td>
									</tr>
									<tr>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/users/user-34.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">Doglas Martini</a></h6>
													<span className="fs-12 fw-normal ">Development</span>
												</div>
											</div>
										</td>
										<td>
											12 Apr 2024
										</td>
										<td>
											<p className="fs-14 fw-medium text-gray-9 d-flex align-items-center">Office
												Management <a href="#" className="ms-1" data-bs-toggle="tooltip"
													data-bs-placement="right" data-bs-title="Worked on the Management
												design & Development"><i className="ti ti-info-circle text-info"></i></a></p>
										</td>
										<td>36</td>
										<td>
											45
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_timesheet"><i className="ti ti-edit"></i></a>
												<a href="#" data-bs-toggle="modal" data-bs-target="#delete_modal"><i
														className="ti ti-trash"></i></a>
											</div>
										</td>
									</tr>
									<tr>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/users/user-02.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">Linda Ray</a></h6>
													<span className="fs-12 fw-normal ">UI/UX Team</span>
												</div>
											</div>
										</td>
										<td>
											20 Apr 2024
										</td>
										<td>
											<p className="fs-14 fw-medium text-gray-9 d-flex align-items-center ">Hospital
												Administration <a href="#" className="ms-1" data-bs-toggle="tooltip"
													data-bs-placement="right" data-bs-title="Worked on the Management
												design & Development"><i className="ti ti-info-circle text-info"></i></a></p>
										</td>
										<td>49</td>
										<td>
											14
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_timesheet"><i className="ti ti-edit"></i></a>
												<a href="#" data-bs-toggle="modal" data-bs-target="#delete_modal"><i
														className="ti ti-trash"></i></a>
											</div>
										</td>
									</tr>
									<tr>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/users/user-35.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">Elliot Murray</a></h6>
													<span className="fs-12 fw-normal ">Developer</span>
												</div>
											</div>
										</td>
										<td>
											06 Jul 2024
										</td>
										<td>
											<p className="fs-14 fw-medium text-gray-9 d-flex align-items-center">Video
												Calling App<a href="#" className="ms-1" data-bs-toggle="tooltip"
													data-bs-placement="right" data-bs-title="Worked on the Management
												design & Development"><i className="ti ti-info-circle text-info"></i></a></p>
										</td>
										<td>57</td>
										<td>
											16
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_timesheet"><i className="ti ti-edit"></i></a>
												<a href="#" data-bs-toggle="modal" data-bs-target="#delete_modal"><i
														className="ti ti-trash"></i></a>
											</div>
										</td>
									</tr>
									<tr>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/users/user-36.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">Rebecca Smtih</a></h6>
													<span className="fs-12 fw-normal ">UI/UX Team</span>
												</div>
											</div>
										</td>
										<td>
											02 Sep 2024
										</td>
										<td>
											<p className="fs-14 fw-medium text-gray-9 d-flex align-items-center ">Office
												Management <a href="#" className="ms-1" data-bs-toggle="tooltip"
													data-bs-placement="right" data-bs-title="Worked on the Management
												design & Development"><i className="ti ti-info-circle text-info"></i></a></p>
										</td>
										<td>21</td>
										<td>
											18
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_timesheet"><i className="ti ti-edit"></i></a>
												<a href="#" data-bs-toggle="modal" data-bs-target="#delete_modal"><i
														className="ti ti-trash"></i></a>
											</div>
										</td>
									</tr>
									<tr>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/users/user-37.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">Connie Waters</a></h6>
													<span className="fs-12 fw-normal ">Management</span>
												</div>
											</div>
										</td>
										<td>
											15 Nov 2024
										</td>
										<td>
											<p className="fs-14 fw-medium text-gray-9 d-flex align-items-center">Project
												Management<a href="#" className="ms-1" data-bs-toggle="tooltip"
													data-bs-placement="right" data-bs-title="Worked on the Management
												design & Development"><i className="ti ti-info-circle text-info"></i></a></p>
										</td>
										<td>32</td>
										<td>
											19
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_timesheet"><i className="ti ti-edit"></i></a>
												<a href="#" data-bs-toggle="modal" data-bs-target="#delete_modal"><i
														className="ti ti-trash"></i></a>
											</div>
										</td>
									</tr>
									<tr>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/users/user-38.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">Connie Waters</a></h6>
													<span className="fs-12 fw-normal ">Management</span>
												</div>
											</div>
										</td>
										<td>
											15 Nov 2024
										</td>
										<td>
											<p className="fs-14 fw-medium text-gray-9 d-flex align-items-center ">Project
												Management<a href="#" className="ms-1" data-bs-toggle="tooltip"
													data-bs-placement="right" data-bs-title="Worked on the Management
												design & Development"><i className="ti ti-info-circle text-info"></i></a></p>
										</td>
										<td>32</td>
										<td>
											19
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_timesheet"><i className="ti ti-edit"></i></a>
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
										Showing {Math.min((currentPage_timesheets - 1) * rowsPerPage_timesheets + 1, 11)}-{Math.min(currentPage_timesheets * rowsPerPage_timesheets, 11)} of 11 entries
									</p>
									<ul className="pagination mb-0">
										<li className={`page-item ${currentPage_timesheets === 1 ? 'disabled' : ''}`}>
											<button className="page-link" onClick={() => setCurrentPage_timesheets(p => Math.max(p - 1, 1))}>
												<i className="ti ti-chevron-left"></i>
											</button>
										</li>
										{[1, 2].map(page => (
											<li key={page} className={`page-item ${currentPage_timesheets === page ? 'active' : ''}`}>
												<button className="page-link" onClick={() => setCurrentPage_timesheets(page)}>{page}</button>
											</li>
										))}
										<li className={`page-item ${currentPage_timesheets === 2 ? 'disabled' : ''}`}>
											<button className="page-link" onClick={() => setCurrentPage_timesheets(p => Math.min(p + 1, 2))}>
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

export default Timesheets;
