import React, { useState } from 'react';
import { Link } from 'react-router-dom';import PageHeader from '../components/common/PageHeader';


const Cronjob = () => {
  // Pagination state for cronjob
  const [currentPage_cronjob, setCurrentPage_cronjob] = useState(1);
  const [rowsPerPage_cronjob, setRowsPerPage_cronjob] = useState(10);
  const [searchQuery_cronjob, setSearchQuery_cronjob] = useState('');
  return (
    <>
      <div className="page-wrapper">
			<div className="content">

				{/* Breadcrumb */}
				<PageHeader 
					title="Settings"
					breadcrumbs={[
						{ label: 'Dashboard' },
						{ label: 'Other Settings' },
						{ label: 'Cronjob', active: true }
					]}
				>
					
				</PageHeader>
				{/* /Breadcrumb */}

				<ul className="nav nav-tabs nav-tabs-solid bg-transparent border-bottom mb-3">
					<li className="nav-item">
						<a className="nav-link" href="/profile-settings"><i className="ti ti-settings me-2"></i>General
							Settings</a>
					</li>
					<li className="nav-item">
						<a className="nav-link" href="/business-settings"><i className="ti ti-world-cog me-2"></i>Website
							Settings</a>
					</li>
					<li className="nav-item">
						<a className="nav-link" href="/salary-settings"><i
								className="ti ti-device-ipad-horizontal-cog me-2"></i>App Settings</a>
					</li>
					<li className="nav-item">
						<a className="nav-link" href="/email-settings"><i className="ti ti-server-cog me-2"></i>System
							Settings</a>
					</li>
					<li className="nav-item">
						<a className="nav-link" href="/payment-gateways"><i
								className="ti ti-settings-dollar me-2"></i>Financial Settings</a>
					</li>
					<li className="nav-item">
						<a className="nav-link active" href="/custom-css"><i className="ti ti-settings-2 me-2"></i>Other
							Settings</a>
					</li>
				</ul>
				<div className="row">
					<div className="col-xl-3 theiaStickySidebar">
						<div className="card">
							<div className="card-body">
								<div className="d-flex flex-column list-group settings-list">
									<a href="/custom-css"
										className="d-inline-flex align-items-center rounded py-2 px-3">Custom CSS</a>
									<a href="/custom-js"
										className="d-inline-flex align-items-center rounded py-2 px-3">Custom JS</a>
									<a href="/cronjob"
										className="d-inline-flex align-items-center rounded active py-2 px-3"><i
											className="ti ti-arrow-badge-right me-2"></i>Cronjob</a>
									<a href="/storage-settings"
										className="d-inline-flex align-items-center rounded py-2 px-3">Storage</a>
									<a href="/ban-ip-address"
										className="d-inline-flex align-items-center rounded py-2 px-3">Ban IP Address</a>
									<a href="/backup"
										className="d-inline-flex align-items-center rounded py-2 px-3">Backup</a>
									<a href="/clear-cache"
										className="d-inline-flex align-items-center rounded py-2 px-3">Clear Cache</a>
								</div>
							</div>
						</div>
					</div>
					<div className="col-xl-9">
						<div className="card">
							
							<div className="card-body pb-0">
								<div className="card mb-3">
									
									<div className="card-body p-0">
										
								{/* Pagination Toolbar */}
								<div className="d-flex align-items-center justify-content-between flex-wrap row-gap-2 mb-3 px-3 pt-3">
									<div className="d-flex align-items-center">
										<span className="me-2 text-gray-9 fs-14">Row Per Page</span>
										<select
											className="form-select form-select-sm w-auto"
											value={rowsPerPage_cronjob}
											onChange={(e) => { setRowsPerPage_cronjob(Number(e.target.value)); setCurrentPage_cronjob(1); }}
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
											value={searchQuery_cronjob}
											onChange={(e) => { setSearchQuery_cronjob(e.target.value); setCurrentPage_cronjob(1); }}
										/>
									</div>
								</div>
<div className="custom-datatable-filter table-responsive">
											<table className="table">
												<thead className="thead-light">
													<tr>
														<th className="no-sort">
															<div className="form-check form-check-md">
																<input className="form-check-input" type="checkbox"
																	id="select-all" />
															</div>
														</th>
														<th>Name</th>
														<th>Schedule</th>
														<th>Next Run</th>
														<th>Last Run</th>
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
															<h6 className="fw-medium">Report Generation Cron</h6>
														</td>
														<td>5 minutes</td>
														<td>
															<div>
																<p className="mb-0">09 Sep 2024</p>
																<p className="mb-0">10:15:38</p>
															</div>
														</td>
														<td>
															<div>
																<p className="mb-0">09 Sep 2024</p>
																<p className="mb-0">10:28:38</p>
															</div>
														</td>
														<td>
															<span
																className="badge badge-success d-flex align-items-center badge-xs">
																<i className="ti ti-point-filled me-1"></i>Running
															</span>
														</td>
														<td>
															<div className="action-icon d-inline-flex">
																<a href="#" className="me-2"><i
																		className="ti ti-player-pause"></i></a>
																<a href="#" className="me-2" data-bs-toggle="modal"
																	data-bs-target="#edit_cronjob"><i
																		className="ti ti-edit"></i></a>
																<a href="#" className=""><i
																		className="ti ti-clock-bolt"></i></a>
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
															<h6 className="fw-medium">Job Expired Cron</h6>
														</td>
														<td>3 minutes</td>
														<td>
															<div>
																<p className="mb-0">09 Sep 2024</p>
																<p className="mb-0">10:15:38</p>
															</div>
														</td>
														<td>
															<div>
																<p className="mb-0">09 Sep 2024</p>
																<p className="mb-0">10:28:38</p>
															</div>
														</td>
														<td>
															<span
																className="badge badge-success d-flex align-items-center badge-xs">
																<i className="ti ti-point-filled me-1"></i>Running
															</span>
														</td>
														<td>
															<div className="action-icon d-inline-flex">
																<a href="#" className="me-2"><i
																		className="ti ti-player-pause"></i></a>
																<a href="#" className="me-2" data-bs-toggle="modal"
																	data-bs-target="#edit_cronjob"><i
																		className="ti ti-edit"></i></a>
																<a href="#" className=""><i
																		className="ti ti-clock-bolt"></i></a>
															</div>
														</td>
													</tr>
												</tbody>
											</table>

								{/* Pagination Footer */}
								<div className="d-flex align-items-center justify-content-between flex-wrap row-gap-2 px-3 py-3 border-top">
									<p className="mb-0 text-gray-9 fs-14">
										Showing {Math.min((currentPage_cronjob - 1) * rowsPerPage_cronjob + 1, 11)}-{Math.min(currentPage_cronjob * rowsPerPage_cronjob, 11)} of 11 entries
									</p>
									<ul className="pagination mb-0">
										<li className={`page-item ${currentPage_cronjob === 1 ? 'disabled' : ''}`}>
											<button className="page-link" onClick={() => setCurrentPage_cronjob(p => Math.max(p - 1, 1))}>
												<i className="ti ti-chevron-left"></i>
											</button>
										</li>
										{[1, 2].map(page => (
											<li key={page} className={`page-item ${currentPage_cronjob === page ? 'active' : ''}`}>
												<button className="page-link" onClick={() => setCurrentPage_cronjob(page)}>{page}</button>
											</li>
										))}
										<li className={`page-item ${currentPage_cronjob === 2 ? 'disabled' : ''}`}>
											<button className="page-link" onClick={() => setCurrentPage_cronjob(p => Math.min(p + 1, 2))}>
												<i className="ti ti-chevron-right"></i>
											</button>
										</li>
									</ul>
								</div>
										</div>
									</div>
								</div>
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

export default Cronjob;
