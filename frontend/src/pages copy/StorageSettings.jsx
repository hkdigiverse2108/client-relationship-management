import React from 'react';
import { Link } from 'react-router-dom';import PageHeader from '../components/common/PageHeader';


const StorageSettings = () => {
  return (
    <>
      <div className="page-wrapper">
			<div className="content">

				{/* Breadcrumb */}
				<PageHeader 
					title="Settings"
					breadcrumbs={[
						{ label: 'Dashboard' },
						{ label: 'Other Settings' },
						{ label: 'Storage Settings', active: true }
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
						<a className="nav-link" href="/email-settings"><i className="ti ti-server-cog me-2"></i>System
							Settings</a>
					</li>
					<li className="nav-item">
						<a className="nav-link" href="/payment-gateways"><i
								className="ti ti-settings-dollar me-2"></i>Financial Settings</a>
					</li>
					<li className="nav-item">
						<a className="nav-link active" href="/custom-css"><i className="ti ti-settings-2 me-2"></i>Other
							Settings</a>
					</li>
				</ul>
				<div className="row">
					<div className="col-xl-3 theiaStickySidebar">
						<div className="card">
							<div className="card-body">
								<div className="d-flex flex-column list-group settings-list">
									<a href="/custom-css"
										className="d-inline-flex align-items-center rounded py-2 px-3">Custom CSS</a>
									<a href="/custom-js"
										className="d-inline-flex align-items-center rounded py-2 px-3">Custom JS</a>
									<a href="/cronjob"
										className="d-inline-flex align-items-center rounded py-2 px-3">Cronjob</a>
									<a href="/storage-settings"
										className="d-inline-flex align-items-center rounded active py-2 px-3"><i
											className="ti ti-arrow-badge-right me-2"></i>Storage</a>
									<a href="/ban-ip-address"
										className="d-inline-flex align-items-center rounded py-2 px-3">Ban IP Address</a>
									<a href="/backup"
										className="d-inline-flex align-items-center rounded py-2 px-3">Backup</a>
									<a href="/clear-cache"
										className="d-inline-flex align-items-center rounded py-2 px-3">Clear Cache</a>
								</div>
							</div>
						</div>
					</div>
					<div className="col-xl-9">
						<div className="card">
							<div className="card-body pb-0">
								<div className="border-bottom mb-3 pb-3">
									<h4>Storage</h4>
								</div>
								<div className="row">
									<div className="col-md-6">
										<div className="card">
											<div className="card-body">
												<div className="d-flex align-items-center justify-content-between">
													<div className="d-flex align-items-center">
														<span className="avatar avatar-lg bg-gray-100 me-2 flex-shrink-0">
															<img src="/assets/img/icons/storage-icon-03.svg"
																className="w-auto h-auto" alt="Img" />
														</span>
														<h5>Local Storage</h5>
													</div>
													<div className="d-flex align-items-center">
														<a href="#" className="btn btn-icon btn-sm me-2"><i
																className="ti ti-settings fs-20"></i></a>
														<div className="form-check form-check-md form-switch">
															<input className="form-check-input me-2" type="checkbox"
																role="switch" />
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div className="col-md-6">
										<div className="card">
											<div className="card-header">
								<h5 className="card-title">White Variant</h5>
							</div>
							<div className="card-body">
												<div className="d-flex align-items-center justify-content-between">
													<div className="d-flex align-items-center">
														<span className="avatar avatar-lg bg-gray-100 me-2 flex-shrink-0">
															<img src="/assets/img/icons/aws.svg" className="w-auto h-auto"
																alt="Img" />
														</span>
														<h5>AWS</h5>
													</div>
													<div className="d-flex align-items-center">
														<a href="#" className="btn btn-icon btn-sm me-2"
															data-bs-toggle="modal" data-bs-target="#aws_settings"><i
																className="ti ti-settings fs-20"></i></a>
														<div className="form-check form-check-md form-switch">
															<input className="form-check-input me-2" type="checkbox"
																role="switch" />
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

export default StorageSettings;
