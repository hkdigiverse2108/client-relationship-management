import React, { useState } from 'react';
import { Link } from 'react-router-dom';import PageHeader from '../components/common/PageHeader';
import CustomSelect from '../components/common/CustomSelect';


const PerformanceIndicator = () => {
  // Pagination state for performanceindicator
  const [currentPage_performanceindicator, setCurrentPage_performanceindicator] = useState(1);
  const [rowsPerPage_performanceindicator, setRowsPerPage_performanceindicator] = useState(10);
  const [searchQuery_performanceindicator, setSearchQuery_performanceindicator] = useState('');
  return (
    <>
      <div className="page-wrapper">

			{/* Start Content */}
			<div className="content">

				{/* Breadcrumb */}
				<PageHeader 
					title="Performance Indicator"
					breadcrumbs={[
						{ label: 'Dashboard' },
						{ label: 'Performance' },
						{ label: 'Performance Indicator', active: true }
					]}
				>
					<div className="mb-2">
							<a href="#" data-bs-toggle="modal" data-bs-target="#add_performance_indicator"
								className="btn btn-primary d-flex align-items-center"><i
									className="ti ti-circle-plus me-2"></i>Add Indicator</a>
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
						<h5>Performance Indicator List</h5>
						<div className="d-flex my-xl-auto right-content align-items-center flex-wrap row-gap-3">

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
										<CustomSelect
											className="form-select form-select-sm w-auto"
											value={rowsPerPage_performanceindicator}
											onChange={(e) => { setRowsPerPage_performanceindicator(Number(e.target.value)); setCurrentPage_performanceindicator(1); }}
										>
											<option value={10}>10</option>
											<option value={20}>20</option>
											<option value={50}>50</option>
										</CustomSelect>
									</div>
									<div className="input-icon-start position-relative">
										<span className="input-icon-addon">
											<i className="ti ti-search"></i>
										</span>
										<input
											type="text"
											className="form-control form-control-sm"
											placeholder="Search"
											value={searchQuery_performanceindicator}
											onChange={(e) => { setSearchQuery_performanceindicator(e.target.value); setCurrentPage_performanceindicator(1); }}
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
										<th>Designation</th>
										<th>Department</th>
										<th>Approved By</th>
										<th>Created Date</th>
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
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">Web Designer</a></h6>
												</div>
											</div>
										</td>
										<td>Designing</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md avatar-rounded">
													<img src="/assets/img/users/user-34.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">Doglas Martini</a></h6>
													<p className="fs-12">Manager</p>
												</div>
											</div>
										</td>
										<td>
											14 Jan 2024
										</td>
										<td>
											<span className="badge badge-success d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Active
											</span>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_performance-indicator"><i
														className="ti ti-edit"></i></a>
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
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">Web Developer</a></h6>
												</div>
											</div>
										</td>
										<td>Developer</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md avatar-rounded">
													<img src="/assets/img/users/user-34.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">Doglas Martini</a></h6>
													<p className="fs-12">Manager</p>
												</div>
											</div>
										</td>
										<td>
											21 Jan 2024
										</td>
										<td>
											<span className="badge badge-success d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Active
											</span>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_performance-indicator"><i
														className="ti ti-edit"></i></a>
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
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">IOS Developer</a></h6>
												</div>
											</div>
										</td>
										<td>Developer</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md avatar-rounded">
													<img src="/assets/img/users/user-34.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">Doglas Martini</a></h6>
													<p className="fs-12">Manager</p>
												</div>
											</div>
										</td>
										<td>
											18 Feb 2024
										</td>
										<td>
											<span className="badge badge-success d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Active
											</span>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_performance-indicator"><i
														className="ti ti-edit"></i></a>
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
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">Android Developer</a></h6>
												</div>
											</div>
										</td>
										<td>Developer</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md avatar-rounded">
													<img src="/assets/img/users/user-34.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">Doglas Martini</a></h6>
													<p className="fs-12">Manager</p>
												</div>
											</div>
										</td>
										<td>
											24 Feb 2024
										</td>
										<td>
											<span className="badge badge-success d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Active
											</span>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_performance-indicator"><i
														className="ti ti-edit"></i></a>
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
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">DevOps Engineer</a></h6>
												</div>
											</div>
										</td>
										<td>DevOps</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md avatar-rounded">
													<img src="/assets/img/users/user-34.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">Doglas Martini</a></h6>
													<p className="fs-12">Manager</p>
												</div>
											</div>
										</td>
										<td>
											11 Mar 2024
										</td>
										<td>
											<span className="badge badge-success d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Active
											</span>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_performance-indicator"><i
														className="ti ti-edit"></i></a>
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
										Showing {Math.min((currentPage_performanceindicator - 1) * rowsPerPage_performanceindicator + 1, 11)}-{Math.min(currentPage_performanceindicator * rowsPerPage_performanceindicator, 11)} of 11 entries
									</p>
									<ul className="pagination mb-0">
										<li className={`page-item ${currentPage_performanceindicator === 1 ? 'disabled' : ''}`}>
											<button className="page-link" onClick={() => setCurrentPage_performanceindicator(p => Math.max(p - 1, 1))}>
												<i className="ti ti-chevron-left"></i>
											</button>
										</li>
										{[1, 2].map(page => (
											<li key={page} className={`page-item ${currentPage_performanceindicator === page ? 'active' : ''}`}>
												<button className="page-link" onClick={() => setCurrentPage_performanceindicator(page)}>{page}</button>
											</li>
										))}
										<li className={`page-item ${currentPage_performanceindicator === 2 ? 'disabled' : ''}`}>
											<button className="page-link" onClick={() => setCurrentPage_performanceindicator(p => Math.min(p + 1, 2))}>
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
			{/* End Content */}

			{/* Start Footer */}
			<div className="footer d-sm-flex align-items-center justify-content-between border-top bg-white p-3">
				<p className="mb-0">2014 - 2026 &copy; SmartHR.</p>
				<p>Designed &amp; Developed By <a href="#" onClick={(e) => e.preventDefault()} className="text-primary">Dreams</a></p>
			</div>
			{/* End Footer */}

		</div>

		{/* ========================
			End Page Content
		========================= */}

		{/* Add Indicator */}
		<div className="modal fade" id="add_performance_indicator">
			<div className="modal-dialog modal-dialog-centered modal-lg">
				<div className="modal-content">
					
					<form onSubmit={(e) => e.preventDefault()}>
						<div className="modal-body pb-0">
							<div className="row">
								<div className="col-md-12">
									<div className="mb-3">
										<label className="form-label">Designation</label>
										<div className="custom-select-wrapper"><CustomSelect className="select">
											<option>Select</option>
											<option>Web Designer</option>
											<option>Web Developer</option>
											<option>IOS Developer</option>
										</CustomSelect></div>
									</div>
								</div>
								<div className="col-md-12">
									<div className="mb-3">
										<h5 className="fw-medium">Technical</h5>
									</div>
								</div>
								<div className="col-md-3">
									<div className="mb-3">
										<label className="form-label">Customer Experience</label>
										<div className="custom-select-wrapper"><div className="custom-select-wrapper"><div className="custom-select-wrapper"><div className="custom-select-wrapper"><div className="custom-select-wrapper"><div className="custom-select-wrapper"><div className="custom-select-wrapper"><CustomSelect className="select">
											<option>Select</option>
											<option>Advanced</option>
											<option>Intermediate</option>
											<option>Average</option>
										</CustomSelect></div></div></div></div></div></div></div>
									</div>
								</div>
								<div className="col-md-3">
									<div className="mb-3">
										<label className="form-label">Marketing</label>
										<div className="custom-select-wrapper"><CustomSelect className="select">
											<option>Select</option>
											<option>Expert/Leader</option>
											<option>Intermediate</option>
											<option>Average</option>
										</CustomSelect></div>
									</div>
								</div>
								<div className="col-md-3">
									<div className="mb-3">
										<label className="form-label">Management</label>
										<div className="custom-select-wrapper"><CustomSelect className="select">
											<option>Select</option>
											<option>Intermediate</option>
											<option>Medium</option>
											<option>Average</option>
										</CustomSelect></div>
									</div>
								</div>
								<div className="col-md-3">
									<div className="mb-3">
										<label className="form-label">Administration</label>
										<CustomSelect className="select">
											<option>Select</option>
											<option>Advanced</option>
											<option>Intermediate</option>
											<option>Average</option>
										</CustomSelect>
									</div>
								</div>
								<div className="col-md-3">
									<div className="mb-3">
										<label className="form-label">Presentation Skills</label>
										<div className="custom-select-wrapper"><div className="custom-select-wrapper"><div className="custom-select-wrapper"><div className="custom-select-wrapper"><div className="custom-select-wrapper"><CustomSelect className="select">
											<option>Select</option>
											<option>None</option>
											<option>Intermediate</option>
											<option>Average</option>
										</CustomSelect></div></div></div></div></div>
									</div>
								</div>
								<div className="col-md-3">
									<div className="mb-3">
										<label className="form-label">Quality of Work</label>
										<CustomSelect className="select">
											<option>Select</option>
											<option>None</option>
											<option>Intermediate</option>
											<option>Average</option>
										</CustomSelect>
									</div>
								</div>
								<div className="col-md-3">
									<div className="mb-3">
										<label className="form-label">Efficiency</label>
										<CustomSelect className="select">
											<option>Select</option>
											<option>None</option>
											<option>Intermediate</option>
											<option>Average</option>
										</CustomSelect>
									</div>
								</div>
								<div className="col-md-12">
									<div className="mb-3">
										<h5 className="fw-medium">Organizational</h5>
									</div>
								</div>
								<div className="col-md-3">
									<div className="mb-3">
										<label className="form-label">Integrity</label>
										<CustomSelect className="select">
											<option>Select</option>
											<option>None</option>
											<option>Intermediate</option>
											<option>Average</option>
										</CustomSelect>
									</div>
								</div>
								<div className="col-md-3">
									<div className="mb-3">
										<label className="form-label">Professionalism</label>
										<CustomSelect className="select">
											<option>Select</option>
											<option>Advanced</option>
											<option>Intermediate</option>
											<option>Average</option>
										</CustomSelect>
									</div>
								</div>
								<div className="col-md-3">
									<div className="mb-3">
										<label className="form-label">Team Work</label>
										<CustomSelect className="select">
											<option>Select</option>
											<option>None</option>
											<option>Intermediate</option>
											<option>Average</option>
										</CustomSelect>
									</div>
								</div>
								<div className="col-md-3">
									<div className="mb-3">
										<label className="form-label">Critical Thinking</label>
										<CustomSelect className="select">
											<option>Select</option>
											<option>Advanced</option>
											<option>Intermediate</option>
											<option>Average</option>
										</CustomSelect>
									</div>
								</div>
								<div className="col-md-3">
									<div className="mb-3">
										<label className="form-label">Conflict Management</label>
										<CustomSelect className="select">
											<option>Select</option>
											<option>Advanced</option>
											<option>Intermediate</option>
											<option>Average</option>
										</CustomSelect>
									</div>
								</div>
								<div className="col-md-3">
									<div className="mb-3">
										<label className="form-label">Attendance</label>
										<CustomSelect className="select">
											<option>Select</option>
											<option>Advanced</option>
											<option>Intermediate</option>
											<option>Average</option>
										</CustomSelect>
									</div>
								</div>
								<div className="col-md-3">
									<div className="mb-3">
										<label className="form-label">Ability To Meet Deadline</label>
										<CustomSelect className="select">
											<option>Select</option>
											<option>Advanced</option>
											<option>Intermediate</option>
											<option>Average</option>
										</CustomSelect>
									</div>
								</div>
								<div className="col-md-12">
									<div className="mb-3">
										<label className="form-label">Status</label>
										<div className="custom-select-wrapper"><CustomSelect className="select">
											<option>Select</option>
											<option>Active</option>
											<option>Inactive</option>
										</CustomSelect></div>
									</div>
								</div>
							</div>
						</div>
						<div className="modal-footer">
							<button type="button" className="btn btn-light me-2" data-bs-dismiss="modal">Cancel</button>
							<button type="submit" className="btn btn-primary">Add Indicator</button>
						</div>
					</form>
				</div>
			</div>
		</div>
		{/* /Add Indicator */}

		{/* Edit Indicator */}
		<div className="modal fade" id="edit_performance-indicator">
			<div className="modal-dialog modal-dialog-centered modal-lg">
				<div className="modal-content">
					
					<form onSubmit={(e) => e.preventDefault()}>
						<div className="modal-body pb-0">
							<div className="row">
								<div className="col-md-12">
									<div className="mb-3">
										<label className="form-label">Designation</label>
										<div className="custom-select-wrapper"><CustomSelect className="select">
											<option>Select</option>
											<option selected>Web Designer</option>
											<option>Web Developer</option>
											<option>IOS Developer</option>
										</CustomSelect></div>
									</div>
								</div>
								<div className="col-md-12">
									<div className="mb-3">
										<h5 className="fw-medium">Technical</h5>
									</div>
								</div>
								<div className="col-md-3">
									<div className="mb-3">
										<label className="form-label">Customer Experience</label>
										<div className="custom-select-wrapper"><div className="custom-select-wrapper"><div className="custom-select-wrapper"><div className="custom-select-wrapper"><div className="custom-select-wrapper"><div className="custom-select-wrapper"><div className="custom-select-wrapper"><CustomSelect className="select">
											<option>Select</option>
											<option selected>Advanced</option>
											<option>Intermediate</option>
											<option>Average</option>
										</CustomSelect></div></div></div></div></div></div></div>
									</div>
								</div>
								<div className="col-md-3">
									<div className="mb-3">
										<label className="form-label">Marketing</label>
										<div className="custom-select-wrapper"><CustomSelect className="select">
											<option>Select</option>
											<option selected>Expert/Leader</option>
											<option>Intermediate</option>
											<option>Average</option>
										</CustomSelect></div>
									</div>
								</div>
								<div className="col-md-3">
									<div className="mb-3">
										<label className="form-label">Management</label>
										<div className="custom-select-wrapper"><CustomSelect className="select">
											<option>Select</option>
											<option selected>Intermediate</option>
											<option>Medium</option>
											<option>Average</option>
										</CustomSelect></div>
									</div>
								</div>
								<div className="col-md-3">
									<div className="mb-3">
										<label className="form-label">Administration</label>
										<CustomSelect className="select">
											<option>Select</option>
											<option selected>Advanced</option>
											<option>Intermediate</option>
											<option>Average</option>
										</CustomSelect>
									</div>
								</div>
								<div className="col-md-3">
									<div className="mb-3">
										<label className="form-label">Presentation Skills</label>
										<div className="custom-select-wrapper"><div className="custom-select-wrapper"><div className="custom-select-wrapper"><div className="custom-select-wrapper"><div className="custom-select-wrapper"><CustomSelect className="select">
											<option>Select</option>
											<option selected>None</option>
											<option>Intermediate</option>
											<option>Average</option>
										</CustomSelect></div></div></div></div></div>
									</div>
								</div>
								<div className="col-md-3">
									<div className="mb-3">
										<label className="form-label">Quality of Work</label>
										<CustomSelect className="select">
											<option>Select</option>
											<option selected>None</option>
											<option>Intermediate</option>
											<option>Average</option>
										</CustomSelect>
									</div>
								</div>
								<div className="col-md-3">
									<div className="mb-3">
										<label className="form-label">Efficiency</label>
										<CustomSelect className="select">
											<option>Select</option>
											<option selected>None</option>
											<option>Intermediate</option>
											<option>Average</option>
										</CustomSelect>
									</div>
								</div>
								<div className="col-md-12">
									<div className="mb-3">
										<h5 className="fw-medium">Organizational</h5>
									</div>
								</div>
								<div className="col-md-3">
									<div className="mb-3">
										<label className="form-label">Integrity</label>
										<CustomSelect className="select">
											<option>Select</option>
											<option selected>None</option>
											<option>Intermediate</option>
											<option>Average</option>
										</CustomSelect>
									</div>
								</div>
								<div className="col-md-3">
									<div className="mb-3">
										<label className="form-label">Professionalism</label>
										<CustomSelect className="select">
											<option>Select</option>
											<option selected>Advanced</option>
											<option>Intermediate</option>
											<option>Average</option>
										</CustomSelect>
									</div>
								</div>
								<div className="col-md-3">
									<div className="mb-3">
										<label className="form-label">Team Work</label>
										<CustomSelect className="select">
											<option>Select</option>
											<option selected>None</option>
											<option>Intermediate</option>
											<option>Average</option>
										</CustomSelect>
									</div>
								</div>
								<div className="col-md-3">
									<div className="mb-3">
										<label className="form-label">Critical Thinking</label>
										<CustomSelect className="select">
											<option>Select</option>
											<option selected>Advanced</option>
											<option>Intermediate</option>
											<option>Average</option>
										</CustomSelect>
									</div>
								</div>
								<div className="col-md-3">
									<div className="mb-3">
										<label className="form-label">Conflict Management</label>
										<CustomSelect className="select">
											<option>Select</option>
											<option selected>Advanced</option>
											<option>Intermediate</option>
											<option>Average</option>
										</CustomSelect>
									</div>
								</div>
								<div className="col-md-3">
									<div className="mb-3">
										<label className="form-label">Attendance</label>
										<CustomSelect className="select">
											<option>Select</option>
											<option selected>Advanced</option>
											<option>Intermediate</option>
											<option>Average</option>
										</CustomSelect>
									</div>
								</div>
								<div className="col-md-3">
									<div className="mb-3">
										<label className="form-label">Ability To Meet Deadline</label>
										<CustomSelect className="select">
											<option>Select</option>
											<option selected>Advanced</option>
											<option>Intermediate</option>
											<option>Average</option>
										</CustomSelect>
									</div>
								</div>
								<div className="col-md-12">
									<div className="mb-3">
										<label className="form-label">Status</label>
										<div className="custom-select-wrapper"><CustomSelect className="select">
											<option>Select</option>
											<option selected>Active</option>
											<option>Inactive</option>
										</CustomSelect></div>
									</div>
								</div>
							</div>
						</div>
						<div className="modal-footer">
							<button type="button" className="btn btn-light me-2" data-bs-dismiss="modal">Cancel</button>
							<button type="submit" className="btn btn-primary">Save Changes</button>
						</div>
					</form>
				</div>
			</div>
		</div>
		{/* /Edit Indicator */}

		{/* Delete Modal */}
		<div className="modal fade" id="delete_modal">
			<div className="modal-dialog modal-dialog-centered">
				<div className="modal-content">
					<div className="modal-body text-center">
						<span className="avatar avatar-xl bg-transparent-danger text-danger mb-3">
							<i className="ti ti-trash-x fs-36"></i>
						</span>
						<h4 className="mb-1">Confirm Delete</h4>
						<p className="mb-3">You want to delete all the marked items, this cant be undone once you delete.
						</p>
						<div className="d-flex justify-content-center">
							<a href="#" onClick={(e) => e.preventDefault()} className="btn btn-light me-3" data-bs-dismiss="modal">Cancel</a>
							<a href="/performance-indicator" className="btn btn-danger">Yes, Delete</a>
						</div>
					</div>
				</div>
			</div>
		</div>
		{/* /Delete Modal */}

	
	
    </>
  );
};

export default PerformanceIndicator;
