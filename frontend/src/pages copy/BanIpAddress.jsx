import React from 'react';
import { Link } from 'react-router-dom';import PageHeader from '../components/common/PageHeader';


const BanIpAddress = () => {
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
						{ label: 'Ban IP address', active: true }
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
										className="d-inline-flex align-items-center rounded py-2 px-3">Storage</a>
									<a href="/ban-ip-address"
										className="d-inline-flex align-items-center rounded active py-2 px-3"><i
											className="ti ti-arrow-badge-right me-2"></i>Ban IP Address</a>
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
							
							<div className="card-header px-0 mx-3">
								<div className="d-flex align-items-center justify-content-between">
									<h4>Ban IP Address</h4>
									<Link to="#" className="btn btn-primary btn-sm d-flex align-items-center"
										data-bs-toggle="modal" data-bs-target="#add_ban"><i
											className="ti ti-circle-plus me-2"></i>Add IP Address</Link>
								</div>
							</div>
							<div className="card-body pb-0 ">
								<div className="row bx-3">
									<div className="col-lg-6">
										<div className="card mb-3">
											<div className="card-header px-0 mx-3">
								<div className="d-flex align-items-center justify-content-between">
									<h4>Ban IP Address</h4>
									<Link to="#" className="btn btn-primary btn-sm d-flex align-items-center"
										data-bs-toggle="modal" data-bs-target="#add_ban"><i
											className="ti ti-circle-plus me-2"></i>Add IP Address</Link>
								</div>
							</div>
							<div className="card-body">
												<div
													className="d-flex align-items-center justify-content-between border-bottom mb-2 pb-2">
													<div className="d-flex align-items-center">
														<span className="d-inline-flex me-2"><i
																className="ti ti-ban"></i></span>
														<p className="fs-14 fw-medium text-dark">198.120.16.01</p>
													</div>
													<div className="d-flex align-items-center">
														<a href="#" className="link-default me-2" data-bs-toggle="modal"
															data-bs-target="#edit_ban"><i className="ti ti-edit"></i></a>
														<a href="#" className="link-default" data-bs-toggle="modal"
															data-bs-target="#delete_modal"><i
																className="ti ti-trash"></i></a>
													</div>
												</div>
												<div>
													<p><span className="me-2"><i
																className="ti ti-info-circle"></i></span>Temporarily block
														to protect user accounts from internet fraudsters</p>
												</div>
											</div>
										</div>
									</div>
									<div className="col-lg-6">
										<div className="card mb-3">
											<div className="card-body">
												<div
													className="d-flex align-items-center justify-content-between border-bottom mb-2 pb-2">
													<div className="d-flex align-items-center">
														<span className="d-inline-flex me-2"><i
																className="ti ti-ban"></i></span>
														<p className="fs-14 fw-medium text-dark">198.160.11.20</p>
													</div>
													<div className="d-flex align-items-center">
														<a href="#" className="link-default me-2" data-bs-toggle="modal"
															data-bs-target="#edit_ban"><i className="ti ti-edit"></i></a>
														<a href="#" className="link-default" data-bs-toggle="modal"
															data-bs-target="#delete_modal"><i
																className="ti ti-trash"></i></a>
													</div>
												</div>
												<div>
													<p><span className="me-2"><i
																className="ti ti-info-circle"></i></span>Unauthorized access
														attempts, or other signs of a potential security</p>
												</div>
											</div>
										</div>
									</div>
									<div className="col-lg-6">
										<div className="card mb-3">
											<div className="card-body">
												<div
													className="d-flex align-items-center justify-content-between border-bottom mb-2 pb-2">
													<div className="d-flex align-items-center">
														<span className="d-inline-flex me-2"><i
																className="ti ti-ban"></i></span>
														<p className="fs-14 fw-medium text-dark">198.123.10.2</p>
													</div>
													<div className="d-flex align-items-center">
														<a href="#" className="link-default me-2" data-bs-toggle="modal"
															data-bs-target="#edit_ban"><i className="ti ti-edit"></i></a>
														<a href="#" className="link-default" data-bs-toggle="modal"
															data-bs-target="#delete_modal"><i
																className="ti ti-trash"></i></a>
													</div>
												</div>
												<div>
													<p><span className="me-2"><i
																className="ti ti-info-circle"></i></span>Attempts to scrape
														large amounts of HR data from the system without authorization.
													</p>
												</div>
											</div>
										</div>
									</div>
									<div className="col-lg-6">
										<div className="card mb-3">
											<div className="card-header">
								<h5 className="card-title">White Variant</h5>
							</div>
							<div className="card-body">
												<div
													className="d-flex align-items-center justify-content-between border-bottom mb-2 pb-2">
													<div className="d-flex align-items-center">
														<span className="d-inline-flex me-2"><i
																className="ti ti-ban"></i></span>
														<p className="fs-14 fw-medium text-dark">198.110.01.05</p>
													</div>
													<div className="d-flex align-items-center">
														<a href="#" className="link-default me-2" data-bs-toggle="modal"
															data-bs-target="#edit_ban"><i className="ti ti-edit"></i></a>
														<a href="#" className="link-default" data-bs-toggle="modal"
															data-bs-target="#delete_modal"><i
																className="ti ti-trash"></i></a>
													</div>
												</div>
												<div>
													<p><span className="me-2"><i className="ti ti-info-circle"></i></span>Found
														downloading or uploading inappropriate content</p>
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

export default BanIpAddress;
