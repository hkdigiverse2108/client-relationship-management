import React, { useState } from 'react';
import { Link } from 'react-router-dom';import PageHeader from '../components/common/PageHeader';


const NotificationSettings = () => {
  // Pagination state for notificationsettings
  const [currentPage_notificationsettings, setCurrentPage_notificationsettings] = useState(1);
  const [rowsPerPage_notificationsettings, setRowsPerPage_notificationsettings] = useState(10);
  const [searchQuery_notificationsettings, setSearchQuery_notificationsettings] = useState('');
  return (
    <>
      <div className="page-wrapper">
			<div className="content">

				{/* Breadcrumb */}
				<PageHeader 
					title="Settings"
					breadcrumbs={[
						{ label: 'Dashboard' },
						{ label: 'General settings' },
						{ label: 'Notification', active: true }
					]}
				>
					
				</PageHeader>
				{/* /Breadcrumb */}

				<ul className="nav nav-tabs nav-tabs-solid bg-transparent border-bottom mb-3">
					<li className="nav-item">
						<a className="nav-link active" href="/profile-settings"><i
								className="ti ti-settings me-2"></i>General Settings</a>
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
						<a className="nav-link" href="/custom-css"><i className="ti ti-settings-2 me-2"></i>Other
							Settings</a>
					</li>
				</ul>
				<div className="row">
					<div className="col-xl-3 theiaStickySidebar">
						<div className="card">
							<div className="card-body">
								<div className="d-flex flex-column list-group settings-list">
									<a href="/profile-settings"
										className="d-inline-flex align-items-center rounded py-2 px-3">Profile Settings</a>
									<a href="/security-settings"
										className="d-inline-flex align-items-center rounded py-2 px-3">Security Settings</a>
									<a href="/notification-settings"
										className="d-inline-flex align-items-center rounded active py-2 px-3"><i
											className="ti ti-arrow-badge-right me-2"></i>Notifications</a>
									<a href="/connected-apps"
										className="d-inline-flex align-items-center rounded py-2 px-3">Connected Apps</a>
								</div>
							</div>
						</div>
					</div>
					<div className="col-xl-9">
						<div className="card">
							<div className="card-body">
								<div className="border-bottom mb-3 pb-3">
									<h4>Notifications</h4>
								</div>
								
								{/* Pagination Toolbar */}
								<div className="d-flex align-items-center justify-content-between flex-wrap row-gap-2 mb-3 px-3 pt-3">
									<div className="d-flex align-items-center">
										<span className="me-2 text-gray-9 fs-14">Row Per Page</span>
										<select
											className="form-select form-select-sm w-auto"
											value={rowsPerPage_notificationsettings}
											onChange={(e) => { setRowsPerPage_notificationsettings(Number(e.target.value)); setCurrentPage_notificationsettings(1); }}
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
											value={searchQuery_notificationsettings}
											onChange={(e) => { setSearchQuery_notificationsettings(e.target.value); setCurrentPage_notificationsettings(1); }}
										/>
									</div>
								</div>
<div className="table-responsive">
									<table className="table">
										<thead>
											<tr>
												<th className="w-75 ps-2 border-0">Modules</th>
												<th className="border-0">Push</th>
												<th className="border-0">SMS</th>
												<th className="pe-0 border-0">Email</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td className="ps-0">
													<h5 className="mb-1 fw-medium">New Hire and Onboarding Notifications
													</h5>
													<p>Alerts when a new hire is added to the system.</p>
												</td>
												<td>
													<div className="form-check form-check-md form-switch me-2">
														<input className="form-check-input me-2" type="checkbox"
															role="switch" checked />
													</div>
												</td>
												<td>
													<div className="form-check form-check-md form-switch me-2">
														<input className="form-check-input me-2" type="checkbox"
															role="switch" checked />
													</div>
												</td>
												<td className="pe-0">
													<div className="form-check form-check-md form-switch">
														<input className="form-check-input me-2" type="checkbox"
															role="switch" checked />
													</div>
												</td>
											</tr>
											<tr>
												<td className="ps-0">
													<h5 className="mb-1 fw-medium">Time Off and Leave Requests</h5>
													<p>Notifications when leave requests are approved or rejected.</p>
												</td>
												<td>
													<div className="form-check form-check-md form-switch me-2">
														<input className="form-check-input me-2" type="checkbox"
															role="switch" checked />
													</div>
												</td>
												<td>
													<div className="form-check form-check-md form-switch me-2">
														<input className="form-check-input me-2" type="checkbox"
															role="switch" checked />
													</div>
												</td>
												<td className="pe-0">
													<div className="form-check form-check-md form-switch">
														<input className="form-check-input me-2" type="checkbox"
															role="switch" checked />
													</div>
												</td>
											</tr>
											<tr>
												<td className="ps-0">
													<h5 className="mb-1 fw-medium">Employee Performance and Review Updates
													</h5>
													<p>Notifications when leave requests are approved or rejected.</p>
												</td>
												<td>
													<div className="form-check form-check-md form-switch me-2">
														<input className="form-check-input me-2" type="checkbox"
															role="switch" checked />
													</div>
												</td>
												<td>
													<div className="form-check form-check-md form-switch me-2">
														<input className="form-check-input me-2" type="checkbox"
															role="switch" checked />
													</div>
												</td>
												<td className="pe-0">
													<div className="form-check form-check-md form-switch">
														<input className="form-check-input me-2" type="checkbox"
															role="switch" checked />
													</div>
												</td>
											</tr>
											<tr>
												<td className="ps-0">
													<h5 className="mb-1 fw-medium">Payroll and Compensation</h5>
													<p>Alerts when payroll is processed or pending approval.</p>
												</td>
												<td>
													<div className="form-check form-check-md form-switch me-2">
														<input className="form-check-input me-2" type="checkbox"
															role="switch" checked />
													</div>
												</td>
												<td>
													<div className="form-check form-check-md form-switch me-2">
														<input className="form-check-input me-2" type="checkbox"
															role="switch" checked />
													</div>
												</td>
												<td className="pe-0">
													<div className="form-check form-check-md form-switch">
														<input className="form-check-input me-2" type="checkbox"
															role="switch" checked />
													</div>
												</td>
											</tr>
											<tr>
												<td className="ps-0">
													<h5 className="mb-1 fw-medium">Job Applications and Recruitment</h5>
													<p>Alerts for new applications or stage updates.</p>
												</td>
												<td>
													<div className="form-check form-check-md form-switch me-2">
														<input className="form-check-input me-2" type="checkbox"
															role="switch" checked />
													</div>
												</td>
												<td>
													<div className="form-check form-check-md form-switch me-2">
														<input className="form-check-input me-2" type="checkbox"
															role="switch" checked />
													</div>
												</td>
												<td className="pe-0">
													<div className="form-check form-check-md form-switch">
														<input className="form-check-input me-2" type="checkbox"
															role="switch" checked />
													</div>
												</td>
											</tr>
										</tbody>
									</table>

								{/* Pagination Footer */}
								<div className="d-flex align-items-center justify-content-between flex-wrap row-gap-2 px-3 py-3 border-top">
									<p className="mb-0 text-gray-9 fs-14">
										Showing {Math.min((currentPage_notificationsettings - 1) * rowsPerPage_notificationsettings + 1, 11)}-{Math.min(currentPage_notificationsettings * rowsPerPage_notificationsettings, 11)} of 11 entries
									</p>
									<ul className="pagination mb-0">
										<li className={`page-item ${currentPage_notificationsettings === 1 ? 'disabled' : ''}`}>
											<button className="page-link" onClick={() => setCurrentPage_notificationsettings(p => Math.max(p - 1, 1))}>
												<i className="ti ti-chevron-left"></i>
											</button>
										</li>
										{[1, 2].map(page => (
											<li key={page} className={`page-item ${currentPage_notificationsettings === page ? 'active' : ''}`}>
												<button className="page-link" onClick={() => setCurrentPage_notificationsettings(page)}>{page}</button>
											</li>
										))}
										<li className={`page-item ${currentPage_notificationsettings === 2 ? 'disabled' : ''}`}>
											<button className="page-link" onClick={() => setCurrentPage_notificationsettings(p => Math.min(p + 1, 2))}>
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
			<div className="footer d-sm-flex align-items-center justify-content-between border-top bg-white p-3">
				<p className="mb-0">2014 - 2026 &copy; SmartHR.</p>
				<p>Designed &amp; Developed By <a href="#" onClick={(e) => e.preventDefault()} className="text-primary">Dreams</a></p>
			</div>
		</div>
		
    </>
  );
};

export default NotificationSettings;
