import React, { useState } from 'react';
import { Link } from 'react-router-dom';import PageHeader from '../components/common/PageHeader';


const Language = () => {
  // Pagination state for language
  const [currentPage_language, setCurrentPage_language] = useState(1);
  const [rowsPerPage_language, setRowsPerPage_language] = useState(10);
  const [searchQuery_language, setSearchQuery_language] = useState('');
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
						{ label: 'Language', active: true }
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
											<div className="col-sm-8">
												<h6>Language List</h6>
											</div>
											<div className="col-sm-4">
												<div className="position-relative search-input">
													<input type="text" className="form-control" placeholder="Search" />
													<div className="search-addon">
														<span><i className="ti ti-search"></i></span>
													</div>
												</div>
											</div>
										</div>
									</div>
							<div className="card-body pb-0">
								<div className="card mb-3">
									
									<div className="card-header">
										<div className="row align-items-center g-3">
											<div className="col-sm-8">
												<h6>Language List</h6>
											</div>
											<div className="col-sm-4">
												<div className="position-relative search-input">
													<input type="text" className="form-control" placeholder="Search" />
													<div className="search-addon">
														<span><i className="ti ti-search"></i></span>
													</div>
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
											value={rowsPerPage_language}
											onChange={(e) => { setRowsPerPage_language(Number(e.target.value)); setCurrentPage_language(1); }}
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
											value={searchQuery_language}
											onChange={(e) => { setSearchQuery_language(e.target.value); setCurrentPage_language(1); }}
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
														<th>Language</th>
														<th>Code</th>
														<th>RTL</th>
														<th>Default </th>
														<th>Total</th>
														<th>Done</th>
														<th>Progress</th>
														<th>Status</th>
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
															<h6 className="d-flex align-items-center fw-medium">
																<img src="/assets/img/flags/us.png"
																	className="me-2 avatar avatar-sm avatar-rounded"
																	alt="Img" />
																English
															</h6>
														</td>
														<td>en</td>
														<td>
															<div className="form-check form-switch">
																<input className="form-check-input" type="checkbox"
																	role="switch" />
															</div>
														</td>
														<td>
															<div className="form-check form-switch">
																<input className="form-check-input" type="checkbox"
																	role="switch" checked />
															</div>
														</td>
														<td>1620</td>
														<td>1296</td>
														<td>
															<div className="d-flex align-items-center">
																<div className="circle-progress" data-value="80">
																	<span className="progress-left">
																		<span
																			className="progress-bar border-warning"></span>
																	</span>
																	<span className="progress-right">
																		<span
																			className="progress-bar border-warning"></span>
																	</span>

																</div>
																<div className="progress-value ms-2">80%</div>
															</div>
														</td>
														<td>
															<div className="form-check form-switch">
																<input className="form-check-input" type="checkbox"
																	role="switch" />
															</div>
														</td>
														<td>
															<div className="d-flex align-items-center">
																<a href="#"
																	className="btn btn-sm btn-icon btn-light border me-2">
																	<i className="ti ti-download"></i>
																</a>
																<a href="/language-web"
																	className="btn btn-sm border me-2">Web</a>
																<a href="/language-web"
																	className="btn btn-sm border me-2">App</a>
																<a href="/language-web"
																	className="btn btn-sm border me-2">Admin</a>
																<a href="#" data-bs-toggle="modal"
																	data-bs-target="#delete_modal"
																	className="btn btn-sm btn-icon btn-light border">
																	<i className="ti ti-trash"></i>
																</a>
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
															<h6 className="d-flex align-items-center fw-medium">
																<img src="/assets/img/flags/ae.png"
																	className="me-2 avatar avatar-sm avatar-rounded"
																	alt="Img" />
																Arabic
															</h6>
														</td>
														<td>ar</td>
														<td>
															<div className="form-check form-switch">
																<input className="form-check-input" type="checkbox"
																	role="switch" />
															</div>
														</td>
														<td>
															<div className="form-check form-switch">
																<input className="form-check-input" type="checkbox"
																	role="switch" />
															</div>
														</td>
														<td>1620</td>
														<td>810</td>
														<td>
															<div className="d-flex align-items-center">
																<div className="circle-progress" data-value="50">
																	<span className="progress-left">
																		<span className="progress-bar border-purple"></span>
																	</span>
																	<span className="progress-right">
																		<span className="progress-bar border-purple"></span>
																	</span>

																</div>
																<div className="progress-value ms-2">50%</div>
															</div>
														</td>
														<td>
															<div className="form-check form-switch">
																<input className="form-check-input" type="checkbox"
																	role="switch" />
															</div>
														</td>
														<td>
															<div className="d-flex align-items-center">
																<a href="#"
																	className="btn btn-sm btn-icon btn-light border me-2">
																	<i className="ti ti-download"></i>
																</a>
																<a href="/language-web"
																	className="btn btn-sm border me-2">Web</a>
																<a href="/language-web"
																	className="btn btn-sm border me-2">App</a>
																<a href="/language-web"
																	className="btn btn-sm border me-2">Admin</a>
																<a href="#" data-bs-toggle="modal"
																	data-bs-target="#delete_modal"
																	className="btn btn-sm btn-icon btn-light border">
																	<i className="ti ti-trash"></i>
																</a>
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
															<h6 className="d-flex align-items-center fw-medium">
																<img src="/assets/img/flags/de.png"
																	className="me-2 avatar avatar-sm avatar-rounded"
																	alt="Img" />
																German
															</h6>
														</td>
														<td>de</td>
														<td>
															<div className="form-check form-switch">
																<input className="form-check-input" type="checkbox"
																	role="switch" />
															</div>
														</td>
														<td>
															<div className="form-check form-switch">
																<input className="form-check-input" type="checkbox"
																	role="switch" />
															</div>
														</td>
														<td>1620</td>
														<td>972</td>
														<td>
															<div className="d-flex align-items-center">
																<div className="circle-progress" data-value="70">
																	<span className="progress-left">
																		<span
																			className="progress-bar border-skyblue"></span>
																	</span>
																	<span className="progress-right">
																		<span
																			className="progress-bar border-skyblue"></span>
																	</span>

																</div>
																<div className="progress-value ms-2">70%</div>
															</div>
														</td>
														<td>
															<div className="form-check form-switch">
																<input className="form-check-input" type="checkbox"
																	role="switch" />
															</div>
														</td>
														<td>
															<div className="d-flex align-items-center">
																<a href="#"
																	className="btn btn-sm btn-icon btn-light border me-2">
																	<i className="ti ti-download"></i>
																</a>
																<a href="/language-web"
																	className="btn btn-sm border me-2">Web</a>
																<a href="/language-web"
																	className="btn btn-sm border me-2">App</a>
																<a href="/language-web"
																	className="btn btn-sm border me-2">Admin</a>
																<a href="#" data-bs-toggle="modal"
																	data-bs-target="#delete_modal"
																	className="btn btn-sm btn-icon btn-light border">
																	<i className="ti ti-trash"></i>
																</a>
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
															<h6 className="d-flex align-items-center fw-medium">
																<img src="/assets/img/flags/fr.png"
																	className="me-2 avatar avatar-sm avatar-rounded"
																	alt="Img" />
																French
															</h6>
														</td>
														<td>fr</td>
														<td>
															<div className="form-check form-switch">
																<input className="form-check-input" type="checkbox"
																	role="switch" />
															</div>
														</td>
														<td>
															<div className="form-check form-switch">
																<input className="form-check-input" type="checkbox"
																	role="switch" />
															</div>
														</td>
														<td>1620</td>
														<td>324</td>
														<td>
															<div className="d-flex align-items-center">
																<div className="circle-progress" data-value="20">
																	<span className="progress-left">
																		<span className="progress-bar border-danger"></span>
																	</span>
																	<span className="progress-right">
																		<span className="progress-bar border-danger"></span>
																	</span>

																</div>
																<div className="progress-value ms-2">20%</div>
															</div>
														</td>
														<td>
															<div className="form-check form-switch">
																<input className="form-check-input" type="checkbox"
																	role="switch" />
															</div>
														</td>
														<td>
															<div className="d-flex align-items-center">
																<a href="#"
																	className="btn btn-sm btn-icon btn-light border me-2">
																	<i className="ti ti-download"></i>
																</a>
																<a href="/language-web"
																	className="btn btn-sm border me-2">Web</a>
																<a href="/language-web"
																	className="btn btn-sm border me-2">App</a>
																<a href="/language-web"
																	className="btn btn-sm border me-2">Admin</a>
																<a href="#" data-bs-toggle="modal"
																	data-bs-target="#delete_modal"
																	className="btn btn-sm btn-icon btn-light border">
																	<i className="ti ti-trash"></i>
																</a>
															</div>
														</td>
													</tr>
												</tbody>
											</table>

								{/* Pagination Footer */}
								<div className="d-flex align-items-center justify-content-between flex-wrap row-gap-2 px-3 py-3 border-top">
									<p className="mb-0 text-gray-9 fs-14">
										Showing {Math.min((currentPage_language - 1) * rowsPerPage_language + 1, 11)}-{Math.min(currentPage_language * rowsPerPage_language, 11)} of 11 entries
									</p>
									<ul className="pagination mb-0">
										<li className={`page-item ${currentPage_language === 1 ? 'disabled' : ''}`}>
											<button className="page-link" onClick={() => setCurrentPage_language(p => Math.max(p - 1, 1))}>
												<i className="ti ti-chevron-left"></i>
											</button>
										</li>
										{[1, 2].map(page => (
											<li key={page} className={`page-item ${currentPage_language === page ? 'active' : ''}`}>
												<button className="page-link" onClick={() => setCurrentPage_language(page)}>{page}</button>
											</li>
										))}
										<li className={`page-item ${currentPage_language === 2 ? 'disabled' : ''}`}>
											<button className="page-link" onClick={() => setCurrentPage_language(p => Math.min(p + 1, 2))}>
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

export default Language;
