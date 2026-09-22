import React from 'react';
import { Link } from 'react-router-dom';import PageHeader from '../components/common/PageHeader';


const SecuritySettings = () => {
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
						{ label: 'Security', active: true }
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
										className="d-inline-flex align-items-center rounded active py-2 px-3"><i
											className="ti ti-arrow-badge-right me-2"></i>Security Settings</a>
									<a href="/notification-settings"
										className="d-inline-flex align-items-center rounded py-2 px-3">Notifications</a>
									<a href="/connected-apps"
										className="d-inline-flex align-items-center rounded py-2 px-3">Connected Apps</a>
								</div>
							</div>
						</div>
					</div>
					<div className="col-xl-9">
						<div className="card">
							<div className="card-body">
								<div className="border-bottom mb-3 pb-3">
									<h4>Security Settings</h4>
								</div>
								<div>
									<div
										className="d-flex justify-content-between align-items-center flex-wrap border-bottom mb-3">
										<div className="mb-3">
											<h5 className="fw-medium mb-1">Password</h5>
											<div className="d-flex align-items-center">
												<p className="mb-0 me-2 pe-2 border-end">Set a unique password to protect
													the account</p>
												<p>Last Changed 03 Jan 2024, 09:00 AM</p>
											</div>
										</div>
										<div className="mb-3">
											<a href="#" className="btn btn-dark btn-sm" data-bs-toggle="modal"
												data-bs-target="#change-password">Change Pasword</a>
										</div>
									</div>
									<div
										className="d-flex justify-content-between align-items-center flex-wrap border-bottom mb-3">
										<div className="mb-3">
											<h5 className="fw-medium mb-1">Two Factor Authentication</h5>
											<p>Receive codes via SMS or email every time you login</p>
										</div>
										<div className="mb-3">
											<a href="#" className="btn btn-dark btn-sm">Enable</a>
										</div>
									</div>
									<div
										className="d-flex justify-content-between align-items-center flex-wrap border-bottom mb-3">
										<div className="mb-3">
											<h5 className="fw-medium d-flex align-items-center mb-1">
												Google Authentication
												<span
													className="badge badge-xs ms-2 bg-outline-success rounded-pill d-flex align-items-center">
													<i className="ti ti-point-filled"></i>Connected
												</span>
											</h5>
											<p>Connect to Google</p>
										</div>
										<div className="mb-3">
											<div className="form-check form-check-md form-switch me-2">
												<input className="form-check-input me-2" type="checkbox" role="switch" />
											</div>
										</div>
									</div>
									<div
										className="d-flex justify-content-between align-items-center flex-wrap border-bottom mb-3">
										<div className="mb-3">
											<h5 className="fw-medium d-flex align-items-center mb-1">Phone Number
												Verification <span><i
														className="ti ti-discount-check-filled text-success ms-2"></i></span>
											</h5>
											<div className="d-flex align-items-center">
												<p className="mb-0 me-2 pe-2 border-end">The Phone Number associated with
													the account</p>
												<p>Verified Mobile Number : +99264710583</p>
											</div>
										</div>
										<div className="mb-3">
											<a href="#" className="btn btn-outline-light btn-sm border me-2">Remove</a>
											<a href="#" className="btn btn-dark btn-sm" data-bs-toggle="modal"
												data-bs-target="#change-phone">Change </a>
										</div>
									</div>
									<div
										className="d-flex justify-content-between align-items-center flex-wrap border-bottom mb-3">
										<div className="mb-3">
											<h5 className="fw-medium d-flex align-items-center mb-1">Email Verification
												<span><i
														className="ti ti-discount-check-filled text-success ms-2"></i></span>
											</h5>
											<div className="d-flex align-items-center">
												<p className="mb-0 me-2 pe-2 border-end">The email address associated with
													the account</p>
												<p>Verified Email : info@example.com</p>
											</div>
										</div>
										<div className="mb-3">
											<a href="#" className="btn btn-outline-light btn-sm border me-2">Remove</a>
											<a href="#" className="btn btn-dark btn-sm" data-bs-toggle="modal"
												data-bs-target="#change-email">Change </a>
										</div>
									</div>
									<div
										className="d-flex justify-content-between align-items-center flex-wrap border-bottom mb-3">
										<div className="mb-3">
											<h5 className="fw-medium mb-1">Device Management</h5>
											<p>The devices associated with the account</p>
										</div>
										<div className="mb-3">
											<a href="#" className="btn btn-dark btn-sm" data-bs-toggle="modal"
												data-bs-target="#device_management">Manage</a>
										</div>
									</div>
									<div
										className="d-flex justify-content-between align-items-center flex-wrap border-bottom mb-3">
										<div className="mb-3">
											<h5 className="fw-medium mb-1">Account Activity</h5>
											<p>The activities of the account</p>
										</div>
										<div className="mb-3">
											<a href="#" className="btn btn-dark btn-sm" data-bs-toggle="modal"
												data-bs-target="#account_activity">View</a>
										</div>
									</div>
									<div
										className="d-flex justify-content-between align-items-center flex-wrap border-bottom mb-3">
										<div className="mb-3">
											<h5 className="fw-medium mb-1">Deactivate Account</h5>
											<p>This will shutdown your account. Your account will be reactive when you
												sign in again</p>
										</div>
										<div className="mb-3">
											<a href="#" className="btn btn-dark btn-sm">Deactivate</a>
										</div>
									</div>
									<div className="d-flex justify-content-between align-items-center flex-wrap row-gap-3">
										<div>
											<h5 className="fw-medium mb-1">Delete Account</h5>
											<p>Your account will be permanently deleted</p>
										</div>
										<div>
											<a href="#" className="btn btn-dark btn-sm" data-bs-toggle="modal"
												data-bs-target="#del-account">Delete</a>
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

export default SecuritySettings;
