import React from 'react';
import { Link } from 'react-router-dom';import PageHeader from '../components/common/PageHeader';
import CustomSelect from '../components/common/CustomSelect';


const OtpSettings = () => {
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
						{ label: 'OTP Setting', active: true }
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
										className="d-inline-flex align-items-center rounded active py-2 px-3"><i
											className="ti ti-arrow-badge-right me-2"></i>OTP</a>
									<a href="/gdpr" className="d-inline-flex align-items-center rounded py-2 px-3">GDPR
										Cookies</a>
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
									<h4>OTP</h4>
								</div>
								<form onSubmit={(e) => e.preventDefault()}>
									<div className="border-bottom mb-3">
										<div className="row">
											<div className="col-md-8">
												<div className="row align-items-center">
													<div className="col-lg-6">
														<div className="mb-3">
															<h6 className="mb-2 fw-medium">OTP Type </h6>
														</div>
													</div>
													<div className="col-lg-5">
														<div className="mb-3">
															<div className="custom-select-wrapper"><CustomSelect className="select">
																<option>Select</option>
																<option>SMS</option>
																<option>Email</option>
															</CustomSelect></div>
														</div>
													</div>
												</div>
												<div className="row align-items-center">
													<div className="col-lg-6">
														<div className="mb-3">
															<h6 className="mb-2 fw-medium">OTP Digit Limit</h6>
														</div>
													</div>
													<div className="col-lg-5">
														<div className="mb-3">
															<div className="custom-select-wrapper"><CustomSelect className="select">
																<option>Select</option>
																<option>4</option>
																<option>6</option>
															</CustomSelect></div>
														</div>
													</div>
												</div>
												<div className="row align-items-center">
													<div className="col-lg-6">
														<div className="mb-3">
															<h6 className="mb-2 fw-medium">OTP Expire Time</h6>
														</div>
													</div>
													<div className="col-lg-5">
														<div className="mb-3">
															<div className="custom-select-wrapper"><CustomSelect className="select">
																<option>Select</option>
																<option>5 Mins</option>
																<option>10 Mins</option>
															</CustomSelect></div>
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

export default OtpSettings;
