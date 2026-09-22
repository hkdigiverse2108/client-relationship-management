import React, { useState } from 'react';
import { Link } from 'react-router-dom';import PageHeader from '../components/common/PageHeader';


const LanguageWeb = () => {
  // Pagination state for languageweb
  const [currentPage_languageweb, setCurrentPage_languageweb] = useState(1);
  const [rowsPerPage_languageweb, setRowsPerPage_languageweb] = useState(10);
  const [searchQuery_languageweb, setSearchQuery_languageweb] = useState('');
  return (
    <>
      <div className="page-wrapper">
			<div className="content">

				{/* Breadcrumb */}
				<PageHeader 
					title="Settings"
					breadcrumbs={[
						{ label: 'Dashboard' },
						{ label: 'Website Settings' },
						{ label: 'Settings', active: true }
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
						<a className="nav-link active" href="/business-settings"><i
								className="ti ti-world-cog me-2"></i>Website Settings</a>
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
									<a href="/business-settings"
										className="d-inline-flex align-items-center rounded py-2 px-3">Business Settings</a>
									<a href="/seo-settings"
										className="d-inline-flex align-items-center rounded py-2 px-3">SEO Settings</a>
									<a href="/localization-settings"
										className="d-inline-flex align-items-center rounded py-2 px-3">Localization</a>
									<a href="/prefixes"
										className="d-inline-flex align-items-center rounded py-2 px-3">Prefixes</a>
									<a href="/preferences"
										className="d-inline-flex align-items-center rounded py-2 px-3">Preferences</a>
									<a href="/appearance"
										className="d-inline-flex align-items-center rounded py-2 px-3">Appearance</a>
									<a href="/language"
										className="d-inline-flex align-items-center rounded active py-2 px-3"><i
											className="ti ti-arrow-badge-right me-2"></i>Language</a>
									<a href="/authentication-settings"
										className="d-inline-flex align-items-center rounded py-2 px-3">Authentication
										Settings</a>
									<a href="/ai-settings"
										className="d-inline-flex align-items-center rounded py-2 px-3">AI Settings</a>
								</div>
							</div>
						</div>
					</div>
					<div className="col-xl-9">
						<div className="card">
							
							<div className="card-header">
										<div className="row align-items-center g-3">
											<div className="col-lg-6 col-sm-4">
												<h6>Language</h6>
											</div>
											<div className="col-lg-6 col-sm-8">
												<div className="d-flex align-items-center justify-content-sm-end">
													<Link to="/language"
														className="btn btn-sm btn-primary d-inline-flex align-items-center me-3">
														<i className="ti ti-arrow-left me-2"></i>
														Back to Translations
													</Link>
													<Link to="#"
														className="btn btn-sm btn-outline-dark d-inline-flex align-items-center">
														<img src="assets/img/flags/ae.png"
															className="me-2 avatar avatar-sm avatar-rounded" alt="Img" />
														Arabic
													</Link>
												</div>
											</div>
										</div>
									</div>
							<div className="card-body pb-0">
								<div className="card mb-3">
									
									<div className="card-header">
										<div className="row align-items-center g-3">
											<div className="col-lg-6 col-sm-4">
												<h6>Language</h6>
											</div>
											<div className="col-lg-6 col-sm-8">
												<div className="d-flex align-items-center justify-content-sm-end">
													<Link to="/language"
														className="btn btn-sm btn-primary d-inline-flex align-items-center me-3">
														<i className="ti ti-arrow-left me-2"></i>
														Back to Translations
													</Link>
													<Link to="#"
														className="btn btn-sm btn-outline-dark d-inline-flex align-items-center">
														<img src="assets/img/flags/ae.png"
															className="me-2 avatar avatar-sm avatar-rounded" alt="Img" />
														Arabic
													</Link>
												</div>
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
											value={rowsPerPage_languageweb}
											onChange={(e) => { setRowsPerPage_languageweb(Number(e.target.value)); setCurrentPage_languageweb(1); }}
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
											value={searchQuery_languageweb}
											onChange={(e) => { setSearchQuery_languageweb(e.target.value); setCurrentPage_languageweb(1); }}
										/>
									</div>
								</div>
<div className="table-responsive">
											<table className="table">
												<thead className="thead-light">
													<tr>
														<th className="no-sort">
															<div className="form-check form-check-md">
																<input className="form-check-input" type="checkbox"
																	id="select-all" />
															</div>
														</th>
														<th>Module Name</th>
														<th>Total</th>
														<th>Complete</th>
														<th>Progress </th>
														<th>Action</th>
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
															<h6 className="fw-medium fs-14">Employees</h6>
														</td>
														<td>1620</td>
														<td>1296</td>
														<td>
															<div className="d-flex align-items-center">
																<div className="progress progress-xs" style={{width: '120px'}}>
																	<div className="progress-bar bg-success rounded"
																		role="progressbar" style={{width: '100%'}}
																		aria-valuenow="100" aria-valuemin="0"
																		aria-valuemax="100"></div>
																</div>
																<span className="d-inline-flex fs-12 ms-2">100%</span>
															</div>
														</td>
														<td>
															<a href="#" data-bs-toggle="modal"
																data-bs-target="#edit_language"
																className="btn btn-sm btn-icon border btn-light"><i
																	className="ti ti-edit"></i></a>
														</td>
													</tr>
													<tr>
														<td>
															<div className="form-check form-check-md">
																<input className="form-check-input" type="checkbox" />
															</div>
														</td>
														<td>
															<h6 className="fw-medium fs-14">Clients</h6>
														</td>
														<td>1620</td>
														<td>972</td>
														<td>
															<div className="d-flex align-items-center">
																<div className="progress progress-xs" style={{width: '120px'}}>
																	<div className="progress-bar bg-pink rounded"
																		role="progressbar" style={{width: '70%'}}
																		aria-valuenow="80" aria-valuemin="0"
																		aria-valuemax="100"></div>
																</div>
																<span className="d-inline-flex fs-12 ms-2">70%</span>
															</div>
														</td>
														<td>
															<a href="#" data-bs-toggle="modal"
																data-bs-target="#edit_language"
																className="btn btn-sm btn-icon border btn-light"><i
																	className="ti ti-edit"></i></a>
														</td>
													</tr>
													<tr>
														<td>
															<div className="form-check form-check-md">
																<input className="form-check-input" type="checkbox" />
															</div>
														</td>
														<td>
															<h6 className="fw-medium fs-14">Projects</h6>
														</td>
														<td>1620</td>
														<td>810</td>
														<td>
															<div className="d-flex align-items-center">
																<div className="progress progress-xs" style={{width: '120px'}}>
																	<div className="progress-bar bg-purple rounded"
																		role="progressbar" style={{width: '40%'}}
																		aria-valuenow="40" aria-valuemin="0"
																		aria-valuemax="100"></div>
																</div>
																<span className="d-inline-flex fs-12 ms-2">40%</span>
															</div>
														</td>
														<td>
															<a href="#" data-bs-toggle="modal"
																data-bs-target="#edit_language"
																className="btn btn-sm btn-icon border btn-light"><i
																	className="ti ti-edit"></i></a>
														</td>
													</tr>
													<tr>
														<td>
															<div className="form-check form-check-md">
																<input className="form-check-input" type="checkbox" />
															</div>
														</td>
														<td>
															<h6 className="fw-medium fs-14">Tasks</h6>
														</td>
														<td>1620</td>
														<td>324</td>
														<td>
															<div className="d-flex align-items-center">
																<div className="progress progress-xs" style={{width: '120px'}}>
																	<div className="progress-bar bg-skyblue rounded"
																		role="progressbar" style={{width: '60%'}}
																		aria-valuenow="40" aria-valuemin="0"
																		aria-valuemax="100"></div>
																</div>
																<span className="d-inline-flex fs-12 ms-2">60%</span>
															</div>
														</td>
														<td>
															<a href="#" data-bs-toggle="modal"
																data-bs-target="#edit_language"
																className="btn btn-sm btn-icon border btn-light"><i
																	className="ti ti-edit"></i></a>
														</td>
													</tr>
												</tbody>
											</table>

								{/* Pagination Footer */}
								<div className="d-flex align-items-center justify-content-between flex-wrap row-gap-2 px-3 py-3 border-top">
									<p className="mb-0 text-gray-9 fs-14">
										Showing {Math.min((currentPage_languageweb - 1) * rowsPerPage_languageweb + 1, 11)}-{Math.min(currentPage_languageweb * rowsPerPage_languageweb, 11)} of 11 entries
									</p>
									<ul className="pagination mb-0">
										<li className={`page-item ${currentPage_languageweb === 1 ? 'disabled' : ''}`}>
											<button className="page-link" onClick={() => setCurrentPage_languageweb(p => Math.max(p - 1, 1))}>
												<i className="ti ti-chevron-left"></i>
											</button>
										</li>
										{[1, 2].map(page => (
											<li key={page} className={`page-item ${currentPage_languageweb === page ? 'active' : ''}`}>
												<button className="page-link" onClick={() => setCurrentPage_languageweb(page)}>{page}</button>
											</li>
										))}
										<li className={`page-item ${currentPage_languageweb === 2 ? 'disabled' : ''}`}>
											<button className="page-link" onClick={() => setCurrentPage_languageweb(p => Math.min(p + 1, 2))}>
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

export default LanguageWeb;
