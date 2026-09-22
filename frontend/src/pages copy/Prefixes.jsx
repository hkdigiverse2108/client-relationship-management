import React from 'react';
import { Link } from 'react-router-dom';import PageHeader from '../components/common/PageHeader';


const Prefixes = () => {
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
						{ label: 'Prefixes', active: true }
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
										className="d-inline-flex align-items-center rounded active py-2 px-3"><i
											className="ti ti-arrow-badge-right me-2"></i>Prefixes</a>
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
									<h4>Prefixes</h4>
								</div>
								<form onSubmit={(e) => e.preventDefault()}>
									<div className="border-bottom mb-3">
										<div className="row">
											<div className="col-md-6">
												<div className="row align-items-center mb-3">
													<div className="col-md-6">
														<label className="form-label mb-md-0">Employee</label>
													</div>
													<div className="col-md-6">
														<input type="text" className="form-control" value="EMP-" />
													</div>
												</div>
											</div>
											<div className="col-md-6">
												<div className="row align-items-center mb-3">
													<div className="col-md-6">
														<label className="form-label mb-md-0">Clients</label>
													</div>
													<div className="col-md-6">
														<input type="text" className="form-control" value="CLI-" />
													</div>
												</div>
											</div>
											<div className="col-md-6">
												<div className="row align-items-center mb-3">
													<div className="col-md-6">
														<label className="form-label mb-md-0">Invoice</label>
													</div>
													<div className="col-md-6">
														<input type="text" className="form-control" value="INV-" />
													</div>
												</div>
											</div>
											<div className="col-md-6">
												<div className="row align-items-center mb-3">
													<div className="col-md-6">
														<label className="form-label mb-md-0">Tickets</label>
													</div>
													<div className="col-md-6">
														<input type="text" className="form-control" value="TIC-" />
													</div>
												</div>
											</div>
											<div className="col-md-6">
												<div className="row align-items-center mb-3">
													<div className="col-md-6">
														<label className="form-label mb-md-0">Candidate</label>
													</div>
													<div className="col-md-6">
														<input type="text" className="form-control" value="CAND-" />
													</div>
												</div>
											</div>
											<div className="col-md-6">
												<div className="row align-items-center mb-3">
													<div className="col-md-6">
														<label className="form-label mb-md-0">Job</label>
													</div>
													<div className="col-md-6">
														<input type="text" className="form-control" value="JOB-" />
													</div>
												</div>
											</div>
											<div className="col-md-6">
												<div className="row align-items-center mb-3">
													<div className="col-md-6">
														<label className="form-label mb-md-0">Referral</label>
													</div>
													<div className="col-md-6">
														<input type="text" className="form-control" value="REF-" />
													</div>
												</div>
											</div>
											<div className="col-md-6">
												<div className="row align-items-center mb-3">
													<div className="col-md-6">
														<label className="form-label mb-md-0">Assets</label>
													</div>
													<div className="col-md-6">
														<input type="text" className="form-control" value="AST-" />
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

export default Prefixes;
