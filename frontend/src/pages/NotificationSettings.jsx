import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/common/PageHeader';
import axiosClient from '../api/axiosClient';
import toast from 'react-hot-toast';

const NotificationSettings = () => {
	const [preferences, setPreferences] = useState({
		new_lead_assigned: true,
		deal_stage_changes: true,
		new_task_assigned: true,
		task_deadline_reminder: true,
		new_project_assigned: true,
		invoice_status_update: true,
		hr_leave_updates: true,
		new_chat_message: true,
		system_alerts: true
	});

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchPreferences = async () => {
			try {
				const response = await axiosClient.get('/users/me/profile');
				if (response.data && response.data.notification_preferences) {
					setPreferences(response.data.notification_preferences);
				}
			} catch (error) {
				console.error("Error fetching notification preferences:", error);
				toast.error("Failed to load notification settings.");
			} finally {
				setLoading(false);
			}
		};

		fetchPreferences();
	}, []);

	const handleToggle = async (key) => {
		const updatedPreferences = {
			...preferences,
			[key]: !preferences[key]
		};

		// Optimistic UI update
		setPreferences(updatedPreferences);

		try {
			await axiosClient.patch('/users/me/profile', {
				notification_preferences: updatedPreferences
			});
			toast.success("Notification settings updated");
		} catch (error) {
			console.error("Error updating notification preferences:", error);
			toast.error("Failed to update settings. Reverting changes.");
			// Revert on failure
			setPreferences(preferences);
		}
	};

	const notificationOptions = [
		{ key: "new_lead_assigned", label: "New lead assigned to me" },
		{ key: "deal_stage_changes", label: "Deal stage changes" },
		{ key: "new_task_assigned", label: "New task assigned" },
		{ key: "task_deadline_reminder", label: "Task deadline reminder" },
		{ key: "new_project_assigned", label: "New project assigned" },
		{ key: "invoice_status_update", label: "Invoice status update" },
		{ key: "hr_leave_updates", label: "HR Leave updates" },
		{ key: "new_chat_message", label: "New chat message" },
		{ key: "system_alerts", label: "System alerts" }
	];

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
									{loading ? (
										<div className="d-flex justify-content-center p-5">
											<div className="spinner-border text-primary" role="status">
												<span className="visually-hidden">Loading...</span>
											</div>
										</div>
									) : (
										notificationOptions.map((item, index) => (
											<div key={index} className="d-flex justify-content-between align-items-center flex-wrap border-bottom py-3">
												<div>
													<h6 className="fw-medium mb-0">{item.label}</h6>
												</div>
												<div>
													<div className="form-check form-switch me-2">
														<input 
															className="form-check-input" 
															type="checkbox" 
															role="switch" 
															checked={preferences[item.key]} 
															onChange={() => handleToggle(item.key)}
														/>
													</div>
												</div>
											</div>
										))
									)}
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
