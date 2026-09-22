import React from 'react';
import { Link } from 'react-router-dom';import PageHeader from '../components/common/PageHeader';


const Preferences = () => {
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
						{ label: 'Preferences', active: true }
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
										className="d-inline-flex align-items-center rounded active py-2 px-3"><i
											className="ti ti-arrow-badge-right me-2"></i>Preferences</a>
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
							<div className="card-body pb-1">
								<div className="border-bottom mb-3 pb-3">
									<h4>Preferences</h4>
								</div>
								<div className="row">
									<div className="col-xxl-4 col-xl-4 col-sm-6">
										<div
											className="d-md-flex justify-content-between align-items-center border rounded bg-white p-3 mb-3">
											<h5 className="fw-medium fs-14">Employees</h5>
											<div className="status-toggle modal-status">
												<input type="checkbox" id="user1" className="check" checked />
												<label htmlFor="user1" className="checktoggle"> </label>
											</div>
										</div>
									</div>
									<div className="col-xxl-4 col-xl-4 col-sm-6">
										<div
											className="d-md-flex justify-content-between align-items-center border rounded bg-white p-3 mb-3">
											<h5 className="fw-medium fs-14">Clients</h5>
											<div className="status-toggle modal-status">
												<input type="checkbox" id="user2" className="check" checked />
												<label htmlFor="user2" className="checktoggle"> </label>
											</div>
										</div>
									</div>
									<div className="col-xxl-4 col-xl-4 col-sm-6">
										<div
											className="d-md-flex justify-content-between align-items-center border rounded bg-white p-3 mb-3">
											<h5 className="fw-medium fs-14">Projects</h5>
											<div className="status-toggle modal-status">
												<input type="checkbox" id="user3" className="check" checked />
												<label htmlFor="user3" className="checktoggle"> </label>
											</div>
										</div>
									</div>
									<div className="col-xxl-4 col-xl-4 col-sm-6">
										<div
											className="d-md-flex justify-content-between align-items-center border rounded bg-white p-3 mb-3">
											<h5 className="fw-medium fs-14">Contacts</h5>
											<div className="status-toggle modal-status">
												<input type="checkbox" id="user4" className="check" checked />
												<label htmlFor="user4" className="checktoggle"> </label>
											</div>
										</div>
									</div>
									<div className="col-xxl-4 col-xl-4 col-sm-6">
										<div
											className="d-md-flex justify-content-between align-items-center border rounded bg-white p-3 mb-3">
											<h5 className="fw-medium fs-14">Companies</h5>
											<div className="status-toggle modal-status">
												<input type="checkbox" id="user5" className="check" checked />
												<label htmlFor="user5" className="checktoggle"> </label>
											</div>
										</div>
									</div>
									<div className="col-xxl-4 col-xl-4 col-sm-6">
										<div
											className="d-md-flex justify-content-between align-items-center border rounded bg-white p-3 mb-3">
											<h5 className="fw-medium fs-14">Deals</h5>
											<div className="status-toggle modal-status">
												<input type="checkbox" id="user6" className="check" checked />
												<label htmlFor="user6" className="checktoggle"> </label>
											</div>
										</div>
									</div>
									<div className="col-xxl-4 col-xl-4 col-sm-6">
										<div
											className="d-md-flex justify-content-between align-items-center border rounded bg-white p-3 mb-3">
											<h5 className="fw-medium fs-14">Leads</h5>
											<div className="status-toggle modal-status">
												<input type="checkbox" id="user12" className="check" checked />
												<label htmlFor="user12" className="checktoggle"> </label>
											</div>
										</div>
									</div>
									<div className="col-xxl-4 col-xl-4 col-sm-6">
										<div
											className="d-md-flex justify-content-between align-items-center border rounded bg-white p-3 mb-3">
											<h5 className="fw-medium fs-14">Pipeline</h5>
											<div className="status-toggle modal-status">
												<input type="checkbox" id="user7" className="check" checked />
												<label htmlFor="user7" className="checktoggle"> </label>
											</div>
										</div>
									</div>
									<div className="col-xxl-4 col-xl-4 col-sm-6">
										<div
											className="d-md-flex justify-content-between align-items-center border rounded bg-white p-3 mb-3">
											<h5 className="fw-medium fs-14">Activities</h5>
											<div className="status-toggle modal-status">
												<input type="checkbox" id="user8" className="check" checked />
												<label htmlFor="user8" className="checktoggle"> </label>
											</div>
										</div>
									</div>
									<div className="col-xxl-4 col-xl-4 col-sm-6">
										<div
											className="d-md-flex justify-content-between align-items-center border rounded bg-white p-3 mb-3">
											<h5 className="fw-medium fs-14">Sales</h5>
											<div className="status-toggle modal-status">
												<input type="checkbox" id="user9" className="check" checked />
												<label htmlFor="user9" className="checktoggle"> </label>
											</div>
										</div>
									</div>
									<div className="col-xxl-4 col-xl-4 col-sm-6">
										<div
											className="d-md-flex justify-content-between align-items-center border rounded bg-white p-3 mb-3">
											<h5 className="fw-medium fs-14">Accounting</h5>
											<div className="status-toggle modal-status">
												<input type="checkbox" id="user10" className="check" checked />
												<label htmlFor="user10" className="checktoggle"> </label>
											</div>
										</div>
									</div>
									<div className="col-xxl-4 col-xl-4 col-sm-6">
										<div
											className="d-md-flex justify-content-between align-items-center border rounded bg-white p-3 mb-3">
											<h5 className="fw-medium fs-14">Reports</h5>
											<div className="status-toggle modal-status">
												<input type="checkbox" id="user11" className="check" checked />
												<label htmlFor="user11" className="checktoggle"> </label>
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

export default Preferences;
