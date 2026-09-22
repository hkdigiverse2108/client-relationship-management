import React, { useState } from 'react';
import { Link } from 'react-router-dom';import PageHeader from '../components/common/PageHeader';


const GoalTracking = () => {
  // Pagination state for goaltracking
  const [currentPage_goaltracking, setCurrentPage_goaltracking] = useState(1);
  const [rowsPerPage_goaltracking, setRowsPerPage_goaltracking] = useState(10);
  const [searchQuery_goaltracking, setSearchQuery_goaltracking] = useState('');
  return (
    <>
      <div className="page-wrapper">
			<div className="content">

				{/* Breadcrumb */}
				<PageHeader 
					title="Goal Tracking"
					breadcrumbs={[
						{ label: 'Dashboard' },
						{ label: 'Performance' },
						{ label: 'Goal Tracking', active: true }
					]}
				>
					<div className="mb-2">
							<a href="#" data-bs-toggle="modal" data-bs-target="#add_goal"
								className="btn btn-primary d-flex align-items-center"><i
									className="ti ti-circle-plus me-2"></i>Add Goal </a>
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
						<h5>Goal Tracking List</h5>
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
											value={rowsPerPage_goaltracking}
											onChange={(e) => { setRowsPerPage_goaltracking(Number(e.target.value)); setCurrentPage_goaltracking(1); }}
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
											value={searchQuery_goaltracking}
											onChange={(e) => { setSearchQuery_goaltracking(e.target.value); setCurrentPage_goaltracking(1); }}
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
										<th>Goal Type</th>
										<th>Subject</th>
										<th>Target Achievement</th>
										<th>Start Date</th>
										<th>End Date</th>
										<th>Description</th>
										<th>Status</th>
										<th>Progress</th>
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
											Development Goals
										</td>
										<td>Programming Skills</td>
										<td>
											Complete a HTML course
										</td>
										<td>
											14 Jan 2024
										</td>
										<td>
											13 Mar 2024
										</td>
										<td>
											Improve proficiency
										</td>
										<td>
											<span className="badge badge-success d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Active
											</span>
										</td>
										<td>
											<span className="fs-12 mb-1">Completed 70%</span>
											<div className="progress" role="progressbar" aria-label="Success example"
												aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"
												style={{width: '87px', height: '5px'}}>
												<div className="progress-bar bg-primary" style={{width: '80%'}}></div>
											</div>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_goal"><i className="ti ti-edit"></i></a>
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
										<td>
											Project Goals
										</td>
										<td>App Development</td>
										<td>
											Deliver the app
										</td>
										<td>
											21 Jan 2024
										</td>
										<td>
											21 Feb 2024
										</td>
										<td>
											Complete the app
										</td>
										<td>
											<span className="badge badge-success d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Active
											</span>
										</td>
										<td>
											<span className="fs-12 mb-1">Completed 40%</span>
											<div className="progress" role="progressbar" aria-label="Success example"
												aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"
												style={{width: '87px', height: '5px'}}>
												<div className="progress-bar bg-primary" style={{width: '40%'}}></div>
											</div>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_goal"><i className="ti ti-edit"></i></a>
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
										<td>
											Project Goals
										</td>
										<td>Web Development</td>
										<td>
											Deliver the template
										</td>
										<td>
											18 Feb 2024
										</td>
										<td>
											18 Mar 2024
										</td>
										<td>
											Complete the template
										</td>
										<td>
											<span className="badge badge-success d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Active
											</span>
										</td>
										<td>
											<span className="fs-12 mb-1">Completed 60%</span>
											<div className="progress" role="progressbar" aria-label="Success example"
												aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"
												style={{width: '87px', height: '5px'}}>
												<div className="progress-bar bg-primary" style={{width: '60%'}}></div>
											</div>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_goal"><i className="ti ti-edit"></i></a>
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
										Showing {Math.min((currentPage_goaltracking - 1) * rowsPerPage_goaltracking + 1, 11)}-{Math.min(currentPage_goaltracking * rowsPerPage_goaltracking, 11)} of 11 entries
									</p>
									<ul className="pagination mb-0">
										<li className={`page-item ${currentPage_goaltracking === 1 ? 'disabled' : ''}`}>
											<button className="page-link" onClick={() => setCurrentPage_goaltracking(p => Math.max(p - 1, 1))}>
												<i className="ti ti-chevron-left"></i>
											</button>
										</li>
										{[1, 2].map(page => (
											<li key={page} className={`page-item ${currentPage_goaltracking === page ? 'active' : ''}`}>
												<button className="page-link" onClick={() => setCurrentPage_goaltracking(page)}>{page}</button>
											</li>
										))}
										<li className={`page-item ${currentPage_goaltracking === 2 ? 'disabled' : ''}`}>
											<button className="page-link" onClick={() => setCurrentPage_goaltracking(p => Math.min(p + 1, 2))}>
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

export default GoalTracking;
