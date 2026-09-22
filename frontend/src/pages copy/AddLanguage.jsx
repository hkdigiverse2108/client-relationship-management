import React, { useState } from 'react';
import { Link } from 'react-router-dom';import PageHeader from '../components/common/PageHeader';


const AddLanguage = () => {
  // Pagination state for addlanguage
  const [currentPage_addlanguage, setCurrentPage_addlanguage] = useState(1);
  const [rowsPerPage_addlanguage, setRowsPerPage_addlanguage] = useState(10);
  const [searchQuery_addlanguage, setSearchQuery_addlanguage] = useState('');
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
						{ label: 'Language Settings', active: true }
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
											<div className="col-sm-5">
												<h6>Language</h6>
											</div>
											<div className="col-sm-7">
												<div
													className="d-flex align-items-center justify-content-sm-end flex-wrap row-gap-2">
													<Link to="/language"
														className="btn btn-sm btn-primary d-inline-flex align-items-center me-3">
														<i className="ti ti-arrow-left me-2"></i>
														Back to Translations
													</Link>
													<Link to="#"
														className="btn btn-sm btn-outline-dark d-inline-flex align-items-center me-3">
														<img src="assets/img/flags/ae.png"
															className="me-2 avatar avatar-sm avatar-rounded" alt="Img" />
														Arabic
													</Link>
													<div className="flex-shrink-0 flex-fill">
														<span className="d-block">Progress</span>
														<div className="d-flex align-items-center">
															<div className="progress progress-xs w-100">
																<div className="progress-bar bg-warning rounded"
																	role="progressbar" style="width: 80%;"
																	aria-valuenow="80" aria-valuemin="0"
																	aria-valuemax="100"></div>
															</div>
															<span className="d-inline-flex fs-12 ms-2">80%</span>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
							<div className="card-body pb-0">
								<div className="card mb-3">
									
									<div className="card-header">
										<div className="row align-items-center g-3">
											<div className="col-sm-5">
												<h6>Language</h6>
											</div>
											<div className="col-sm-7">
												<div
													className="d-flex align-items-center justify-content-sm-end flex-wrap row-gap-2">
													<Link to="/language"
														className="btn btn-sm btn-primary d-inline-flex align-items-center me-3">
														<i className="ti ti-arrow-left me-2"></i>
														Back to Translations
													</Link>
													<Link to="#"
														className="btn btn-sm btn-outline-dark d-inline-flex align-items-center me-3">
														<img src="assets/img/flags/ae.png"
															className="me-2 avatar avatar-sm avatar-rounded" alt="Img" />
														Arabic
													</Link>
													<div className="flex-shrink-0 flex-fill">
														<span className="d-block">Progress</span>
														<div className="d-flex align-items-center">
															<div className="progress progress-xs w-100">
																<div className="progress-bar bg-warning rounded"
																	role="progressbar" style="width: 80%;"
																	aria-valuenow="80" aria-valuemin="0"
																	aria-valuemax="100"></div>
															</div>
															<span className="d-inline-flex fs-12 ms-2">80%</span>
														</div>
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
											value={rowsPerPage_addlanguage}
											onChange={(e) => { setRowsPerPage_addlanguage(Number(e.target.value)); setCurrentPage_addlanguage(1); }}
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
											value={searchQuery_addlanguage}
											onChange={(e) => { setSearchQuery_addlanguage(e.target.value); setCurrentPage_addlanguage(1); }}
										/>
									</div>
								</div>
<div className="table-responsive">
											<table className="table">
												<thead className="thead-light">
													<tr>
														<th className="w-50">English</th>
														<th className="w-50">Arabic</th>
													</tr>
												</thead>
												<tbody>
													<tr>
														<td>Name</td>
														<td><input type="text" className="form-control text-end"
																value="اسم" /></td>
													</tr>
													<tr>
														<td>Email</td>
														<td><input type="text" className="form-control text-end"
																value="عنوان البريد الإلكتروني" /></td>
													</tr>
													<tr>
														<td>Phone</td>
														<td><input type="text" className="form-control text-end"
																value="هاتف" /></td>
													</tr>
													<tr>
														<td>Designation</td>
														<td><input type="text" className="form-control text-end"
																value="تعيين" /></td>
													</tr>
													<tr>
														<td>Joining Date</td>
														<td><input type="text" className="form-control text-end"
																value="تاريخ الانضمام" /></td>
													</tr>
													<tr>
														<td>Status</td>
														<td><input type="text" className="form-control text-end"
																value="حالة" /></td>
													</tr>
												</tbody>
											</table>

								{/* Pagination Footer */}
								<div className="d-flex align-items-center justify-content-between flex-wrap row-gap-2 px-3 py-3 border-top">
									<p className="mb-0 text-gray-9 fs-14">
										Showing {Math.min((currentPage_addlanguage - 1) * rowsPerPage_addlanguage + 1, 11)}-{Math.min(currentPage_addlanguage * rowsPerPage_addlanguage, 11)} of 11 entries
									</p>
									<ul className="pagination mb-0">
										<li className={`page-item ${currentPage_addlanguage === 1 ? 'disabled' : ''}`}>
											<button className="page-link" onClick={() => setCurrentPage_addlanguage(p => Math.max(p - 1, 1))}>
												<i className="ti ti-chevron-left"></i>
											</button>
										</li>
										{[1, 2].map(page => (
											<li key={page} className={`page-item ${currentPage_addlanguage === page ? 'active' : ''}`}>
												<button className="page-link" onClick={() => setCurrentPage_addlanguage(page)}>{page}</button>
											</li>
										))}
										<li className={`page-item ${currentPage_addlanguage === 2 ? 'disabled' : ''}`}>
											<button className="page-link" onClick={() => setCurrentPage_addlanguage(p => Math.min(p + 1, 2))}>
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

export default AddLanguage;
