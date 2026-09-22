import React from 'react';
import { Link } from 'react-router-dom';import PageHeader from '../components/common/PageHeader';


const EmailTemplate = () => {
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
						{ label: 'Email Templates', active: true }
					]}
				>
					
				</PageHeader>
				{/* /Breadcrumb */}

				<ul className="nav nav-tabs nav-tabs-solid bg-transparent border-bottom mb-3">
					<li className="nav-item">
						<a className="nav-link " href="/profile-settings"><i className="ti ti-settings me-2"></i>General
							Settings</a>
					</li>
					<li className="nav-item">
						<a className="nav-link" href="/business-settings"><i className="ti ti-world-cog me-2"></i>Website
							Settings</a>
					</li>
					<li className="nav-item">
						<a className="nav-link " href="/salary-settings"><i
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
										className="d-inline-flex align-items-center rounded  py-2 px-3">Salary Settings</a>
									<a href="/email-template"
										className="d-inline-flex align-items-center rounded  active py-2 px-3"><i
											className="ti ti-arrow-badge-right me-2"></i>Email Templates</a>
									<a href="/sms-settings"
										className="d-inline-flex align-items-center rounded py-2 px-3">SMS Settings</a>
									<a href="/sms-template"
										className="d-inline-flex align-items-center rounded py-2 px-3">SMS Templates</a>
									<a href="/otp-settings"
										className="d-inline-flex align-items-center rounded py-2 px-3">OTP</a>
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
								<div className="border-bottom d-flex align-items-center justify-content-between pb-3 mb-3">
									<h4>Email Templates</h4>
									<a href="#" className="btn btn-primary" data-bs-toggle="modal"
										data-bs-target="#addtemplate"><i className="ti ti-circle-plus me-2"></i>Add
										Template</a>
								</div>
								<form onSubmit={(e) => e.preventDefault()}>
									<div className="border-bottom mb-3">
										<div className="row">
											<div className="col-md-4">
												<div className="mb-3">
													<div className="card">
														<div className="card-body p-3">
															<div
																className="d-flex align-items-center justify-content-between">
																<h6>Email Verification</h6>
																<div className="d-flex align-items-center">
																	<a href="#" className="btn btn-sm btn-icon"
																		data-bs-toggle="modal"
																		data-bs-target="#edittemplate"><i
																			className="ti ti-edit"></i></a>
																	<a href="#" className="btn btn-sm btn-icon"
																		data-bs-toggle="modal"
																		data-bs-target="#delete_modal"><i
																			className="ti ti-trash"></i></a>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
											<div className="col-md-4">
												<div className="mb-3">
													<div className="card">
														<div className="card-body p-3">
															<div
																className="d-flex align-items-center justify-content-between">
																<h6>Welcome Email</h6>
																<div className="d-flex align-items-center">
																	<a href="#" className="btn btn-sm btn-icon"
																		data-bs-toggle="modal"
																		data-bs-target="#edittemplate"><i
																			className="ti ti-edit"></i></a>
																	<a href="#" className="btn btn-sm btn-icon"
																		data-bs-toggle="modal"
																		data-bs-target="#delete_modal"><i
																			className="ti ti-trash"></i></a>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
											<div className="col-md-4">
												<div className="mb-3">
													<div className="card">
														<div className="card-body p-3">
															<div
																className="d-flex align-items-center justify-content-between">
																<h6>Leave Request</h6>
																<div className="d-flex align-items-center">
																	<a href="#" className="btn btn-sm btn-icon"
																		data-bs-toggle="modal"
																		data-bs-target="#edittemplate"><i
																			className="ti ti-edit"></i></a>
																	<a href="#" className="btn btn-sm btn-icon"
																		data-bs-toggle="modal"
																		data-bs-target="#delete_modal"><i
																			className="ti ti-trash"></i></a>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div className="row">
											<div className="col-md-12">
												<div className="row">
													<div className="col-md-4">
														<div className="mb-3">
															<div className="card">
																<div className="card-body p-3">
																	<div
																		className="d-flex align-items-center justify-content-between">
																		<h6>Performance Review</h6>
																		<div className="d-flex align-items-center">
																			<a href="#" className="btn btn-sm btn-icon"
																				data-bs-toggle="modal"
																				data-bs-target="#edittemplate"><i
																					className="ti ti-edit"></i></a>
																			<a href="#" className="btn btn-sm btn-icon"><i
																					className="ti ti-trash"></i></a>
																		</div>
																	</div>
																</div>
															</div>
														</div>
													</div>
													<div className="col-md-4">
														<div className="mb-3">
															<div className="card">
																<div className="card-body p-3">
																	<div
																		className="d-flex align-items-center justify-content-between">
																		<h6>Training Session</h6>
																		<div className="d-flex align-items-center">
																			<a href="#" className="btn btn-sm btn-icon"
																				data-bs-toggle="modal"
																				data-bs-target="#edittemplate"><i
																					className="ti ti-edit"></i></a>
																			<a href="#" className="btn btn-sm btn-icon"
																				data-bs-toggle="modal"
																				data-bs-target="#delete_modal"><i
																					className="ti ti-trash"></i></a>
																		</div>
																	</div>
																</div>
															</div>
														</div>
													</div>
													<div className="col-md-4">
														<div className="mb-3">
															<div className="card">
																<div className="card-header">
								<h5 className="card-title">White Variant</h5>
							</div>
							<div className="card-body p-3">
																	<div
																		className="d-flex align-items-center justify-content-between">
																		<h6>Password Reset</h6>
																		<div className="d-flex align-items-center">
																			<a href="#" className="btn btn-sm btn-icon"
																				data-bs-toggle="modal"
																				data-bs-target="#edittemplate"><i
																					className="ti ti-edit"></i></a>
																			<a href="#" className="btn btn-sm btn-icon"
																				data-bs-toggle="modal"
																				data-bs-target="#delete_modal"><i
																					className="ti ti-trash"></i></a>
																		</div>
																	</div>
																</div>
															</div>
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

export default EmailTemplate;
