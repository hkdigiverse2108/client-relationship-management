import React from 'react';
import { Link } from 'react-router-dom';import PageHeader from '../components/common/PageHeader';


const ConnectedApps = () => {
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
						{ label: 'Connected Apps', active: true }
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
										className="d-inline-flex align-items-center rounded py-2 px-3">Notifications</a>
									<a href="/connected-apps"
										className="d-inline-flex align-items-center rounded active py-2 px-3"><i
											className="ti ti-arrow-badge-right me-2"></i>Connected Apps</a>
								</div>
							</div>
						</div>
					</div>
					<div className="col-xl-9">
						<div className="card">
							<div className="card-body pb-0">
								<div className="border-bottom mb-3 pb-3">
									<h4>Connectd Apps</h4>
								</div>
								<div className="row">
									<div className="col-md-6">
										<div className="card">
											<div className="card-body">
												<div className="d-flex align-items-center justify-content-between mb-2">
													<div className="d-flex align-items-center">
														<span className="avatar avatar-lg bg-gray-100 me-2 flex-shrink-0">
															<img src="/assets/img/settings/connected-app-01.svg"
																className="w-auto h-auto" alt="Img" />
														</span>
														<h5>Slack</h5>
													</div>
													<div className="form-check form-check-md form-switch">
														<input className="form-check-input me-2" type="checkbox"
															role="switch" />
													</div>
												</div>
												<div>
													<p className="text-truncate line-clamb-2">Team communication platform
														with channels for group discussions and direct messaging.</p>
												</div>
											</div>
										</div>
									</div>
									<div className="col-md-6">
										<div className="card">
											<div className="card-body">
												<div className="d-flex align-items-center justify-content-between mb-2">
													<div className="d-flex align-items-center">
														<span className="avatar avatar-lg bg-gray-100 me-2 flex-shrink-0">
															<img src="/assets/img/settings/connected-app-02.svg"
																className="w-auto h-auto" alt="Img" />
														</span>
														<h5>Google Calendar</h5>
													</div>
													<div className="form-check form-check-md form-switch">
														<input className="form-check-input me-2" type="checkbox"
															role="switch" />
													</div>
												</div>
												<div>
													<p className="text-truncate line-clamb-2">Google Calendar is a web-based
														scheduling tool that allows users to create, manage, and share
														events.</p>
												</div>
											</div>
										</div>
									</div>
									<div className="col-md-6">
										<div className="card">
											<div className="card-body">
												<div className="d-flex align-items-center justify-content-between mb-2">
													<div className="d-flex align-items-center">
														<span className="avatar avatar-lg bg-gray-100 me-2 flex-shrink-0">
															<img src="/assets/img/settings/connected-app-03.svg"
																className="w-auto h-auto" alt="Img" />
														</span>
														<h5>Gmail</h5>
													</div>
													<div className="form-check form-check-md form-switch">
														<input className="form-check-input me-2" type="checkbox"
															role="switch" />
													</div>
												</div>
												<div>
													<p className="text-truncate line-clamb-2">Gmail is a free email service
														by Google that offers robust spam protection & 15GB of storage.
													</p>
												</div>
											</div>
										</div>
									</div>
									<div className="col-md-6">
										<div className="card">
											<div className="card-body">
												<div className="d-flex align-items-center justify-content-between mb-2">
													<div className="d-flex align-items-center">
														<span className="avatar avatar-lg bg-gray-100 me-2 flex-shrink-0">
															<img src="/assets/img/settings/connected-app-04.svg"
																className="w-auto h-auto" alt="Img" />
														</span>
														<h5>Github</h5>
													</div>
													<div className="form-check form-check-md form-switch">
														<input className="form-check-input me-2" type="checkbox"
															role="switch" />
													</div>
												</div>
												<div>
													<p className="text-truncate line-clamb-2">Github is a web-based platform
														for version control and collaboration, allowing developers to
														host & review code</p>
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
			<div className="footer d-sm-flex align-items-center justify-content-between border-top bg-white p-3">
				<p className="mb-0">2014 - 2026 &copy; SmartHR.</p>
				<p>Designed &amp; Developed By <a href="#" onClick={(e) => e.preventDefault()} className="text-primary">Dreams</a></p>
			</div>
		</div>
		
    </>
  );
};

export default ConnectedApps;
