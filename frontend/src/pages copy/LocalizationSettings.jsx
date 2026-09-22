import React from 'react';
import { Link } from 'react-router-dom';import PageHeader from '../components/common/PageHeader';
import CustomSelect from '../components/common/CustomSelect';


const LocalizationSettings = () => {
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
						{ label: 'Localization', active: true }
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
										className="d-inline-flex align-items-center rounded active py-2 px-3"><i
											className="ti ti-arrow-badge-right me-2"></i>Localization</a>
									<a href="/prefixes"
										className="d-inline-flex align-items-center rounded py-2 px-3">Prefixes</a>
									<a href="/preferences"
										className="d-inline-flex align-items-center rounded py-2 px-3">Preferences</a>
									<a href="/appearance"
										className="d-inline-flex align-items-center rounded py-2 px-3">Appearance</a>
									<a href="/language"
										className="d-inline-flex align-items-center rounded py-2 px-3">Language</a>
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
							<div className="card-body">
								<div className="border-bottom mb-3 pb-3">
									<h4>Localization</h4>
								</div>
								<form onSubmit={(e) => e.preventDefault()}>
									<div className="border-bottom mb-3">
										<div className="row">
											<div className="col-md-6">
												<div className="row align-items-center mb-3">
													<div className="col-md-5">
														<label className="form-label mb-md-0">Language</label>
													</div>
													<div className="col-md-7">
														<div className="custom-select-wrapper"><CustomSelect className="select">
															<option>Select</option>
															<option>English</option>
															<option>French</option>
															<option>Spanish</option>
														</CustomSelect></div>
														<p
															className="fs-13 fw-normal mt-2 form-check form-check-md form-switch me-2">
															<input className="form-check-input me-2" type="checkbox"
																role="switch" />Language Switcher
														</p>
													</div>
												</div>
											</div>
											<div className="col-md-6">
												<div className="row align-items-center mb-3">
													<div className="col-md-5">
														<label className="form-label mb-md-0">Timezone</label>
													</div>
													<div className="col-md-7">
														<div className="custom-select-wrapper"><CustomSelect className="select">
															<option>Select</option>
															<option>(UTC +5:30)</option>
															<option>(UTC+11:00) INR</option>
														</CustomSelect></div>
													</div>
												</div>
											</div>
											<div className="col-md-6">
												<div className="row align-items-center mb-3">
													<div className="col-md-5">
														<label className="form-label mb-md-0">Date Format</label>
													</div>
													<div className="col-md-7">
														<div className="custom-select-wrapper"><CustomSelect className="select">
															<option>Select</option>
															<option>YYYY-MM-DD</option>
															<option>MM/DD/YYYY</option>
															<option>DD/MM/YYYY</option>
															<option>YYYY/MM/DD</option>
														</CustomSelect></div>
													</div>
												</div>
											</div>
											<div className="col-md-6">
												<div className="row align-items-center mb-3">
													<div className="col-md-5">
														<label className="form-label mb-md-0">Time Format</label>
													</div>
													<div className="col-md-7">
														<div className="custom-select-wrapper"><CustomSelect className="select">
															<option>Select</option>
															<option>12 Hours</option>
															<option>24 Hours</option>
														</CustomSelect></div>
													</div>
												</div>
											</div>
											<div className="col-md-6">
												<div className="row align-items-center mb-3">
													<div className="col-md-5">
														<label className="form-label mb-md-0">Financial Year</label>
													</div>
													<div className="col-md-7">
														<div className="custom-select-wrapper"><CustomSelect className="select">
															<option>Select</option>
															<option>2024</option>
															<option>2023</option>
														</CustomSelect></div>
													</div>
												</div>
											</div>
											<div className="col-md-6">
												<div className="row align-items-center mb-3">
													<div className="col-md-5">
														<label className="form-label mb-md-0">Starting Month</label>
													</div>
													<div className="col-md-7">
														<div className="custom-select-wrapper"><CustomSelect className="select">
															<option>Select</option>
															<option>January</option>
															<option>February</option>
															<option>March</option>
															<option>April</option>
															<option>June</option>
															<option>July</option>
															<option>August</option>
															<option>September</option>
															<option>October</option>
															<option>November</option>
															<option>December</option>
														</CustomSelect></div>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div className="border-bottom mb-3">
										<h6 className="mb-3">Currency Information</h6>
										<div className="row">
											<div className="col-md-6">
												<div className="row align-items-center mb-3">
													<div className="col-md-5">
														<label className="form-label mb-md-0">Currency</label>
													</div>
													<div className="col-md-7">
														<div className="custom-select-wrapper"><CustomSelect className="select">
															<option>Select</option>
															<option>USD</option>
															<option>EURO</option>
														</CustomSelect></div>
													</div>
												</div>
											</div>
											<div className="col-md-6">
												<div className="row align-items-center mb-3">
													<div className="col-md-5">
														<label className="form-label mb-md-0">Currency Symbol</label>
													</div>
													<div className="col-md-7">
														<div className="custom-select-wrapper"><CustomSelect className="select">
															<option>Select</option>
															<option>$</option>
															<option>€</option>
														</CustomSelect></div>
													</div>
												</div>
											</div>
											<div className="col-md-6">
												<div className="row align-items-center mb-3">
													<div className="col-md-5">
														<label className="form-label mb-md-0">Currency Position</label>
													</div>
													<div className="col-md-7">
														<div className="custom-select-wrapper"><CustomSelect className="select">
															<option>Select</option>
															<option>100$</option>
															<option>$100</option>
														</CustomSelect></div>
													</div>
												</div>
											</div>
											<div className="col-md-6">
												<div className="row align-items-center mb-3">
													<div className="col-md-5">
														<label className="form-label mb-md-0">Decimal Seperator</label>
													</div>
													<div className="col-md-7">
														<div className="custom-select-wrapper"><div className="custom-select-wrapper"><CustomSelect className="select">
															<option>Select</option>
															<option>.</option>
															<option>,</option>
														</CustomSelect></div></div>
													</div>
												</div>
											</div>
											<div className="col-md-6">
												<div className="row align-items-center mb-3">
													<div className="col-md-5">
														<label className="form-label mb-md-0">Thousand Seperator</label>
													</div>
													<div className="col-md-7">
														<CustomSelect className="select">
															<option>Select</option>
															<option>.</option>
															<option>,</option>
														</CustomSelect>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div className="border-bottom mb-3">
										<h6 className="mb-3">Country Settings</h6>
										<div className="row">
											<div className="col-md-6">
												<div className="row align-items-center mb-3">
													<div className="col-md-5">
														<label className="form-label mb-md-0">Countries Restriction</label>
													</div>
													<div className="col-md-7">
														<div className="custom-select-wrapper"><CustomSelect className="select">
															<option>Select</option>
															<option>Allow All Countries</option>
															<option>Deny All Countries</option>
														</CustomSelect></div>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div className="border-bottom mb-3">
										<h6 className="mb-3">File Settings</h6>
										<div className="row">
											<div className="col-md-6">
												<div className="row align-items-center mb-3">
													<div className="col-md-5">
														<label className="form-label mb-md-0">Allowed Files</label>
													</div>
													<div className="col-md-7">
														<div className="custom-select-wrapper"><CustomSelect className="select">
															<option>Select</option>
															<option>jpg</option>
															<option>gif</option>
															<option>png</option>
														</CustomSelect></div>
													</div>
												</div>
											</div>
											<div className="col-md-6">
												<div className="row align-items-center mb-3">
													<div className="col-md-5">
														<label className="form-label mb-md-0">Max File Size</label>
													</div>
													<div className="col-md-7">
														<input type="text" className="form-control" placeholder="5000 MB" />
													</div>
												</div>
											</div>
										</div>
									</div>
									<div className="d-flex align-items-center justify-content-end">
										<button type="button" className="btn btn-outline-light border me-3">Cancel</button>
										<button type="submit" className="btn btn-primary">Save</button>
									</div>
								</form>
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

export default LocalizationSettings;
