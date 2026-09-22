import React from 'react';
import { Link } from 'react-router-dom';import PageHeader from '../components/common/PageHeader';
import CustomSelect from '../components/common/CustomSelect';
import CustomEditor from '../components/common/CustomEditor';


const Gdpr = () => {
  return (
    <>
      <div className="page-wrapper">
			<div className="content">

				{/* Breadcrumb */}
				<PageHeader 
					title="Settings"
					breadcrumbs={[
						{ label: 'Dashboard' },
						{ label: 'System Settings' },
						{ label: 'GDPR Cookies', active: true }
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
						<a className="nav-link active" href="/email-settings"><i
								className="ti ti-server-cog me-2"></i>System Settings</a>
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
									<a href="/email-settings"
										className="d-inline-flex align-items-center rounded py-2 px-3">Email Settings</a>
									<a href="/email-template"
										className="d-inline-flex align-items-center rounded py-2 px-3">Email Templates</a>
									<a href="/sms-settings"
										className="d-inline-flex align-items-center rounded py-2 px-3">SMS Settings</a>
									<a href="/sms-template"
										className="d-inline-flex align-items-center rounded py-2 px-3">SMS Templates</a>
									<a href="/otp-settings"
										className="d-inline-flex align-items-center rounded py-2 px-3">OTP</a>
									<a href="/gdpr"
										className="d-inline-flex align-items-center rounded active py-2 px-3"><i
											className="ti ti-arrow-badge-right me-2"></i>GDPR Cookies</a>
									<a href="/maintenance-mode"
										className="d-inline-flex align-items-center rounded py-2 px-3">Maintenance Mode</a>
								</div>
							</div>
						</div>
					</div>
					<div className="col-xl-9">
						<div className="card">
							<div className="card-body">
								<div className="border-bottom mb-3 pb-3">
									<h4>GDPR Cookies</h4>
								</div>
								<form onSubmit={(e) => e.preventDefault()}>
									<div className="border-bottom mb-3">
										<div className="row">
											<div className="col-md-12">
												<div className="row align-items-center">
													<div className="col-lg-4">
														<div className="mb-3">
															<h6 className="fw-medium">Cookies Consent Text</h6>
														</div>
													</div>
													<div className="col-lg-8">
														<div className="mb-3">
															<CustomEditor value={'<p>Write a new comment, send your team notification by typing @ followed by their name</p>'} />
														</div>
													</div>
												</div>
												<div className="row align-items-center">
													<div className="col-lg-4">
														<div className="mb-3">
															<h6 className="fw-medium">Cookies Position</h6>
														</div>
													</div>
													<div className="col-lg-3">
														<div className="mb-3">
															<div className="custom-select-wrapper"><CustomSelect className="select">
																<option>Select</option>
																<option>Right</option>
																<option>Left</option>
															</CustomSelect></div>
														</div>
													</div>
												</div>
												<div className="row align-items-center">
													<div className="col-lg-4">
														<div className="mb-3">
															<h6 className="fw-medium">Agree Button Text</h6>
														</div>
													</div>
													<div className="col-lg-3">
														<div className="mb-3">
															<input className="form-control" type="text" />
														</div>
													</div>
												</div>
												<div className="row align-items-center">
													<div className="col-lg-4">
														<div className="mb-3">
															<h6 className="fw-medium">Decline Button Text</h6>
														</div>
													</div>
													<div className="col-lg-3">
														<div className="mb-3">
															<input className="form-control" type="text" />
														</div>
													</div>
												</div>
												<div className="row align-items-center">
													<div className="col-lg-4">
														<div className="mb-3">
															<h6 className="fw-medium">Show Decline Button</h6>
														</div>
													</div>
													<div className="col-lg-3">
														<div className="form-check form-switch mb-0">
															<input className="form-check-input mb-3" type="checkbox"
																role="switch" />
														</div>
													</div>
												</div>
												<div className="row align-items-center">
													<div className="col-lg-4">
														<div className="mb-3">
															<h6 className="fw-medium">Link for Cookies Page</h6>
														</div>
													</div>
													<div className="col-lg-8">
														<div className="mb-3">
															<input type="text" className="form-control" />
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

export default Gdpr;
