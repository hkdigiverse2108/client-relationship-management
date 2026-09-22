import React, { useState } from 'react';
import { Link } from 'react-router-dom';import PageHeader from '../components/common/PageHeader';


const NotificationSettings = () => {

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
						{ label: 'Notification', active: true }
					]}
				>
					
				</PageHeader>
				{/* /Breadcrumb */}

				<ul className="nav nav-tabs nav-tabs-solid bg-transparent border-bottom mb-3">
					<li className="nav-item">
						<a className="nav-link active" href="/profile-settings"><i
								className="ti ti-settings me-2"></i>General Settings</a>
					</li>
				</ul>
				<div className="row">
					<div className="col-xl-3 theiaStickySidebar">
						<div className="card">
							<div className="card-body">
								<div className="d-flex flex-column list-group settings-list">
									<Link to="/profile-settings"
										className="d-inline-flex align-items-center rounded py-2 px-3">
										<i className="ti ti-user me-2"></i>Profile Settings
									</Link>
									<Link to="/security-settings"
										className="d-inline-flex align-items-center rounded py-2 px-3">
										<i className="ti ti-lock me-2"></i>Security Settings
									</Link>
									<Link to="/notification-settings"
										className="d-inline-flex align-items-center rounded active py-2 px-3">
										<i className="ti ti-bell me-2"></i>Notifications
									</Link>
								</div>
							</div>
						</div>
					</div>
					<div className="col-xl-9">
						<div className="card">
							<div className="card-body">
								<div className="border-bottom mb-3 pb-3">
									<h4>Notifications</h4>
								</div>
								
								<div>
									{[
										{ label: "New lead assigned to me", def: true },
										{ label: "Deal stage changes", def: true },
										{ label: "Daily activity summary", def: false },
										{ label: "Weekly performance report", def: true },
										{ label: "Product announcements", def: false },
									].map((item, index) => (
										<div key={index} className="d-flex justify-content-between align-items-center flex-wrap border-bottom py-3">
											<div>
												<h6 className="fw-medium mb-0">{item.label}</h6>
											</div>
											<div>
												<div className="form-check form-switch me-2">
													<input className="form-check-input" type="checkbox" role="switch" defaultChecked={item.def} />
												</div>
											</div>
										</div>
									))}
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

export default NotificationSettings;
