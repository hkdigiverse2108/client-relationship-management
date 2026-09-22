import React from 'react';
import { Link } from 'react-router-dom';import PageHeader from '../components/common/PageHeader';


const AuthenticationSettings = () => {
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
						{ label: 'Authentication Settings', active: true }
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
										className="d-inline-flex align-items-center rounded py-2 px-3">Language</a>
									<a href="/authentication-settings"
										className="d-inline-flex align-items-center rounded active py-2 px-3"><i
											className="ti ti-arrow-badge-right me-2"></i>Authentication Settings</a>
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
									<h4>Authentication Settings</h4>
								</div>
								<form onSubmit={(e) => e.preventDefault()}>
									<div className="border-bottom mb-3">
										<div className="row">
											<div className="col-md-8">
												<div className="row row-gap-2 mb-3">
													<div className="col-md-6">
														<h6 className="fw-medium">Allow Registration</h6>
													</div>
													<div className="col-md-6 d-flex align-items-center">
														<div className="form-check form-switch me-2">
															<input className="form-check-input" type="checkbox"
																role="switch" />
														</div>
														<div className="form-check form-check-md">
															<input className="form-check-input" type="checkbox"
																id="checkebox-md" />
															<label className="form-check-label" htmlFor="checkebox-md">
																Invite Only
															</label>
														</div>
													</div>
												</div>
												<div className="row row-gap-2 mb-3">
													<div className="col-md-6">
														<h6 className="fw-medium">Verification Required</h6>
													</div>
													<div className="col-md-6">
														<div className="form-check form-switch">
															<input className="form-check-input" type="checkbox"
																role="switch" />
														</div>
													</div>
												</div>
												<div className="row row-gap-2 mb-3">
													<div className="col-md-6 d-flex">
														<div className="d-flex align-items-center">
															<h6 className="fw-medium">Verification Expired</h6>
														</div>
													</div>
													<div className="col-md-6">
														<input type="text" className="form-control" />
													</div>
												</div>
												<div className="row row-gap-2 mb-3">
													<div className="col-md-6">
														<h6 className="fw-medium">Referral System</h6>
													</div>
													<div className="col-md-6">
														<div className="form-check form-switch">
															<input className="form-check-input" type="checkbox"
																role="switch" />
														</div>
													</div>
												</div>
												<div className="row row-gap-2 mb-3">
													<div className="col-md-6 d-flex">
														<div className="d-flex align-items-center">
															<h6 className="fw-medium">Login Type</h6>
														</div>
													</div>
													<div className="col-md-6 d-flex align-items-center">
														<div className="form-check me-2">
															<input className="form-check-input" type="radio" name="Radio"
																id="Radio-sm" />
															<label className="form-check-label" htmlFor="Radio-sm">
																Mobile
															</label>
														</div>
														<div className="form-check me-2">
															<input className="form-check-input" type="radio" name="Radio"
																id="Radio-smone" />
															<label className="form-check-label" htmlFor="Radio-smone">
																Email
															</label>
														</div>
													</div>
												</div>
												<div className="row row-gap-2 mb-3">
													<div className="col-md-6">
														<h6 className="fw-medium">Password</h6>
													</div>
													<div className="col-md-6">
														<div className="form-check form-switch">
															<input className="form-check-input" type="checkbox"
																role="switch" />
														</div>
													</div>
												</div>
												<div className="row row-gap-2 mb-3">
													<div className="col-md-6">
														<h6 className="fw-medium">OTP System</h6>
													</div>
													<div className="col-md-6">
														<div className="form-check form-switch">
															<input className="form-check-input" type="checkbox"
																role="switch" />
														</div>
													</div>
												</div>
												<div className="row row-gap-2 mb-3">
													<div className="col-md-6 d-flex">
														<div className="d-flex align-items-center">
															<h6 className="fw-medium">OTP Type</h6>
														</div>
													</div>
													<div className="col-md-6 d-flex align-items-center">
														<div className="form-check me-2">
															<input className="form-check-input" type="radio" name="Radio1"
																id="Radio-smtwo" />
															<label className="form-check-label" htmlFor="Radio-smtwo">
																SMS OTP
															</label>
														</div>
														<div className="form-check me-2">
															<input className="form-check-input" type="radio" name="Radio1"
																id="Radio-smthree" />
															<label className="form-check-label" htmlFor="Radio-smthree">
																Email OTP
															</label>
														</div>
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

export default AuthenticationSettings;
