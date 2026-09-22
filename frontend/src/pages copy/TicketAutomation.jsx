import React, { useState } from 'react';
import { Link } from 'react-router-dom';import PageHeader from '../components/common/PageHeader';


const TicketAutomation = () => {
  // Pagination state for ticketautomation
  const [currentPage_ticketautomation, setCurrentPage_ticketautomation] = useState(1);
  const [rowsPerPage_ticketautomation, setRowsPerPage_ticketautomation] = useState(10);
  const [searchQuery_ticketautomation, setSearchQuery_ticketautomation] = useState('');
  return (
    <>
      <div className="page-wrapper">
			<div className="content">

				{/* Breadcrumb */}
				<PageHeader 
					title="Ticket Automation"
					breadcrumbs={[
						{ label: 'Dashboard' },
						{ label: 'Tickets' },
						{ label: 'Ticket Automation', active: true }
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
							<a href="#" className="btn btn-primary d-flex align-items-center" data-bs-toggle="offcanvas"
								data-bs-target="#add_modal"><i className="ti ti-circle-plus me-2"></i>Add New Rule</a>
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
						<h5>Escalation Rules List</h5>
						<div className="d-flex my-xl-auto right-content align-items-center flex-wrap row-gap-3">
							<div className="dropdown me-3">
								<Link to="#"
									className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
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
											value={rowsPerPage_ticketautomation}
											onChange={(e) => { setRowsPerPage_ticketautomation(Number(e.target.value)); setCurrentPage_ticketautomation(1); }}
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
											value={searchQuery_ticketautomation}
											onChange={(e) => { setSearchQuery_ticketautomation(e.target.value); setCurrentPage_ticketautomation(1); }}
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
										<th>Rule Name</th>
										<th>Trigger Event</th>
										<th>Condition</th>
										<th>Action</th>
										<th>Assigned To</th>
										<th>Status</th>
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
											<p className="text-dark fw-medium mb-0">Auto Assign IT Login Issues</p>
										</td>
										<td>Ticket Created</td>
										<td>Category = Login Issue</td>
										<td>Assign Ticket</td>
										<td>Assigned Agent</td>
										<td><span
												className="badge badge-success d-inline-flex align-items-center badge-xs"><i
													className="ti ti-point-filled me-1"></i>Active</span></td>
									</tr>
									<tr>
										<td>
											<div className="form-check form-check-md">
												<input className="form-check-input" type="checkbox" />
											</div>
										</td>
										<td>#ER004</td>
										<td>
											<p className="text-dark fw-medium mb-0">Critical Ticket Alert</p>
										</td>
										<td>Ticket Created</td>
										<td>Priority = Critical</td>
										<td>Send Email Notification</td>
										<td>Support Manager</td>
										<td><span
												className="badge badge-success d-inline-flex align-items-center badge-xs"><i
													className="ti ti-point-filled me-1"></i>Active</span></td>
									</tr>
									<tr>
										<td>
											<div className="form-check form-check-md">
												<input className="form-check-input" type="checkbox" />
											</div>
										</td>
										<td>#ER003</td>
										<td>
											<p className="text-dark fw-medium mb-0">SLA Breach Escalation</p>
										</td>
										<td>SLA Breached</td>
										<td>Response Time SLA</td>
										<td>Escalate Ticket</td>
										<td>Team Lead</td>
										<td><span
												className="badge badge-success d-inline-flex align-items-center badge-xs"><i
													className="ti ti-point-filled me-1"></i>Active</span></td>
									</tr>
									<tr>
										<td>
											<div className="form-check form-check-md">
												<input className="form-check-input" type="checkbox" />
											</div>
										</td>
										<td>#ER002</td>
										<td>
											<p className="text-dark fw-medium mb-0">Auto Close Inactive Tickets</p>
										</td>
										<td>Time Based</td>
										<td>No Update for 7 Days</td>
										<td>Close Ticket</td>
										<td>System</td>
										<td><span
												className="badge badge-success d-inline-flex align-items-center badge-xs"><i
													className="ti ti-point-filled me-1"></i>Active</span></td>
									</tr>
									<tr>
										<td>
											<div className="form-check form-check-md">
												<input className="form-check-input" type="checkbox" />
											</div>
										</td>
										<td>#ER001</td>
										<td>
											<p className="text-dark fw-medium mb-0">Priority Change Notification</p>
										</td>
										<td>Priority Updated</td>
										<td>Priority = High</td>
										<td>Send Email Notification</td>
										<td>Assigned Agent</td>
										<td><span
												className="badge badge-success d-inline-flex align-items-center badge-xs"><i
													className="ti ti-point-filled me-1"></i>Active</span></td>
									</tr>
								</tbody>
							</table>

								{/* Pagination Footer */}
								<div className="d-flex align-items-center justify-content-between flex-wrap row-gap-2 px-3 py-3 border-top">
									<p className="mb-0 text-gray-9 fs-14">
										Showing {Math.min((currentPage_ticketautomation - 1) * rowsPerPage_ticketautomation + 1, 11)}-{Math.min(currentPage_ticketautomation * rowsPerPage_ticketautomation, 11)} of 11 entries
									</p>
									<ul className="pagination mb-0">
										<li className={`page-item ${currentPage_ticketautomation === 1 ? 'disabled' : ''}`}>
											<button className="page-link" onClick={() => setCurrentPage_ticketautomation(p => Math.max(p - 1, 1))}>
												<i className="ti ti-chevron-left"></i>
											</button>
										</li>
										{[1, 2].map(page => (
											<li key={page} className={`page-item ${currentPage_ticketautomation === page ? 'active' : ''}`}>
												<button className="page-link" onClick={() => setCurrentPage_ticketautomation(page)}>{page}</button>
											</li>
										))}
										<li className={`page-item ${currentPage_ticketautomation === 2 ? 'disabled' : ''}`}>
											<button className="page-link" onClick={() => setCurrentPage_ticketautomation(p => Math.min(p + 1, 2))}>
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

export default TicketAutomation;
