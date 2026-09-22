import React, { useState } from 'react';
import { Link } from 'react-router-dom';import PageHeader from '../components/common/PageHeader';


const EscalationRules = () => {
  // Pagination state for escalationrules
  const [currentPage_escalationrules, setCurrentPage_escalationrules] = useState(1);
  const [rowsPerPage_escalationrules, setRowsPerPage_escalationrules] = useState(10);
  const [searchQuery_escalationrules, setSearchQuery_escalationrules] = useState('');
  return (
    <>
      <div className="page-wrapper">
			<div className="content">
				{/* Breadcrumb */}
				<PageHeader 
					title="Escalation Rules"
					breadcrumbs={[
						{ label: 'Dashboard' },
						{ label: 'Tickets' },
						{ label: 'Escalation Rules', active: true }
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
							<a href="#" className="btn btn-primary d-flex align-items-center" data-bs-toggle="modal"
								data-bs-target="#add_modal"><i className="ti ti-circle-plus me-2"></i>Add New Rule</a>
						</div>
						<div className="ms-2 head-icons">
							<a href="#" onClick={(e) => e.preventDefault()} className="" data-bs-toggle="tooltip" data-bs-placement="top"
								data-bs-original-title="Collapse" id="collapse-header">
								<i className="ti ti-chevrons-up"></i>
							</a>
						</div>
				</PageHeader>
				{/* /Breadcrumb */}

				<div className="card">
					
					<div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
						<h5>Escalation Rules List</h5>
						<div className="d-flex my-xl-auto right-content align-items-center flex-wrap row-gap-3">
							<div className="dropdown me-3">
								<Link to="#"
									className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
									data-bs-toggle="dropdown">
									Select Priority
								</Link>
								<ul className="dropdown-menu  dropdown-menu-end p-3">
									<li>
										<Link to="#" className="dropdown-item rounded-1">Critical</Link>
									</li>
									<li>
										<Link to="#" className="dropdown-item rounded-1">High</Link>
									</li>
									<li>
										<Link to="#" className="dropdown-item rounded-1">Medium</Link>
									</li>
									<li>
										<Link to="#" className="dropdown-item rounded-1">Low</Link>
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
											value={rowsPerPage_escalationrules}
											onChange={(e) => { setRowsPerPage_escalationrules(Number(e.target.value)); setCurrentPage_escalationrules(1); }}
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
											value={searchQuery_escalationrules}
											onChange={(e) => { setSearchQuery_escalationrules(e.target.value); setCurrentPage_escalationrules(1); }}
										/>
									</div>
								</div>
<div className="custom-datatable-filter table-responsive rounded-0">
							<table className="table">
								<thead className="thead-light">
									<tr>
										<th className="no-sort">
											<div className="form-check form-check-md">
												<input className="form-check-input" type="checkbox" id="select-all" />
											</div>
										</th>
										<th>Rule ID</th>
										<th>Trigger Type</th>
										<th>Priority</th>
										<th>Condition</th>
										<th>Escalation Level</th>
										<th>Escalates To</th>
										<th>Time Threshold</th>
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
										<td>#ER005</td>
										<td>
											<p className="text-dark fw-medium mb-0">SLA Breach</p>
										</td>
										<td>Critical</td>
										<td>No resolution</td>
										<td>Level 1</td>
										<td>Team Lead</td>
										<td>30 mins</td>
										<td><span
												className="badge badge-success d-inline-flex align-items-center badge-xs"><i
													className="ti ti-point-filled me-1"></i>Active</span></td>
										<td><span
												className="badge border border-purple text-purple d-inline-flex align-items-center badge-xs">Notify</span>
										</td>
									</tr>
									<tr>
										<td>
											<div className="form-check form-check-md">
												<input className="form-check-input" type="checkbox" />
											</div>
										</td>
										<td>#ER004</td>
										<td>
											<p className="text-dark fw-medium mb-0">SLA Breach</p>
										</td>
										<td>High</td>
										<td>No resolution</td>
										<td>Level 1</td>
										<td>Support Lead</td>
										<td>1 hour</td>
										<td><span
												className="badge badge-success d-inline-flex align-items-center badge-xs"><i
													className="ti ti-point-filled me-1"></i>Active</span></td>
										<td><span
												className="badge border border-pink text-pink d-inline-flex align-items-center badge-xs">Notify
												+ Assign</span></td>
									</tr>
									<tr>
										<td>
											<div className="form-check form-check-md">
												<input className="form-check-input" type="checkbox" />
											</div>
										</td>
										<td>#ER003</td>
										<td>
											<p className="text-dark fw-medium mb-0">Status Based</p>
										</td>
										<td>Medium</td>
										<td>Ticket in Progress</td>
										<td>Level 1</td>
										<td>Supervisor</td>
										<td>4 hours</td>
										<td><span
												className="badge badge-success d-inline-flex align-items-center badge-xs"><i
													className="ti ti-point-filled me-1"></i>Active</span></td>
										<td><span
												className="badge border border-danger text-danger d-inline-flex align-items-center badge-xs">Reminder</span>
										</td>
									</tr>
									<tr>
										<td>
											<div className="form-check form-check-md">
												<input className="form-check-input" type="checkbox" />
											</div>
										</td>
										<td>#ER002</td>
										<td>
											<p className="text-dark fw-medium mb-0">Priority Based</p>
										</td>
										<td>Medium</td>
										<td>Ticket not assigned</td>
										<td>Level 1</td>
										<td>Admin</td>
										<td>6 hours</td>
										<td><span
												className="badge badge-success d-inline-flex align-items-center badge-xs"><i
													className="ti ti-point-filled me-1"></i>Active</span></td>
										<td><span
												className="badge border border-purple text-purple d-inline-flex align-items-center badge-xs">Notify</span>
										</td>
									</tr>
									<tr>
										<td>
											<div className="form-check form-check-md">
												<input className="form-check-input" type="checkbox" />
											</div>
										</td>
										<td>#ER001</td>
										<td>
											<p className="text-dark fw-medium mb-0">Time Based</p>
										</td>
										<td>Low</td>
										<td>Pending too long</td>
										<td>Level 2</td>
										<td>Support Lead</td>
										<td>8 hours</td>
										<td><span
												className="badge badge-success d-inline-flex align-items-center badge-xs"><i
													className="ti ti-point-filled me-1"></i>Active</span></td>
										<td><span
												className="badge border border-pink text-pink d-inline-flex align-items-center badge-xs">Notify
												+ Assign</span></td>
									</tr>
								</tbody>
							</table>

								{/* Pagination Footer */}
								<div className="d-flex align-items-center justify-content-between flex-wrap row-gap-2 px-3 py-3 border-top">
									<p className="mb-0 text-gray-9 fs-14">
										Showing {Math.min((currentPage_escalationrules - 1) * rowsPerPage_escalationrules + 1, 11)}-{Math.min(currentPage_escalationrules * rowsPerPage_escalationrules, 11)} of 11 entries
									</p>
									<ul className="pagination mb-0">
										<li className={`page-item ${currentPage_escalationrules === 1 ? 'disabled' : ''}`}>
											<button className="page-link" onClick={() => setCurrentPage_escalationrules(p => Math.max(p - 1, 1))}>
												<i className="ti ti-chevron-left"></i>
											</button>
										</li>
										{[1, 2].map(page => (
											<li key={page} className={`page-item ${currentPage_escalationrules === page ? 'active' : ''}`}>
												<button className="page-link" onClick={() => setCurrentPage_escalationrules(page)}>{page}</button>
											</li>
										))}
										<li className={`page-item ${currentPage_escalationrules === 2 ? 'disabled' : ''}`}>
											<button className="page-link" onClick={() => setCurrentPage_escalationrules(p => Math.min(p + 1, 2))}>
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

export default EscalationRules;
