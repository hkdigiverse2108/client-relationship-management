import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/common/PageHeader';
import axiosClient from '../api/axiosClient';
import toast from 'react-hot-toast';

const SecuritySettings = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error('Please fill all fields');
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }

    setIsLoading(true);
    try {
      const res = await axiosClient.post('/auth/change-password', {
        current_password: currentPassword,
        new_password: newPassword
      });
      toast.success(res.message || 'Password changed successfully');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Failed to change password');
    } finally {
      setIsLoading(false);
    }
  };

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
										className="d-inline-flex align-items-center rounded active py-2 px-3">
										<i className="ti ti-lock me-2"></i>Security Settings
									</Link>
									<Link to="/notification-settings"
										className="d-inline-flex align-items-center rounded py-2 px-3">
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
									<h4>Security Settings</h4>
								</div>
								<form onSubmit={handleSubmit}>
									<div className="row">
										<div className="col-md-6 mb-3">
											<label className="form-label">Current Password</label>
											<div className="pass-group">
												<input
													type={showCurrentPassword ? 'text' : 'password'}
													className="form-control pass-input"
													placeholder="Enter current password"
													value={currentPassword}
													onChange={(e) => setCurrentPassword(e.target.value)}
													required
												/>
												<span
													className={`ti toggle-password ${showCurrentPassword ? 'ti-eye' : 'ti-eye-off'}`}
													style={{ cursor: 'pointer' }}
													onClick={() => setShowCurrentPassword((prev) => !prev)}
												></span>
											</div>
										</div>
									</div>
									<div className="row">
										<div className="col-md-6 mb-3">
											<label className="form-label">New Password</label>
											<div className="pass-group">
												<input
													type={showNewPassword ? 'text' : 'password'}
													className="form-control pass-input"
													placeholder="Enter new password"
													value={newPassword}
													onChange={(e) => setNewPassword(e.target.value)}
													required
												/>
												<span
													className={`ti toggle-password ${showNewPassword ? 'ti-eye' : 'ti-eye-off'}`}
													style={{ cursor: 'pointer' }}
													onClick={() => setShowNewPassword((prev) => !prev)}
												></span>
											</div>
										</div>
									</div>
									<div className="row">
										<div className="col-md-6 mb-4">
											<label className="form-label">Confirm New Password</label>
											<div className="pass-group">
												<input
													type={showConfirmPassword ? 'text' : 'password'}
													className="form-control pass-input"
													placeholder="Confirm new password"
													value={confirmPassword}
													onChange={(e) => setConfirmPassword(e.target.value)}
													required
												/>
												<span
													className={`ti toggle-password ${showConfirmPassword ? 'ti-eye' : 'ti-eye-off'}`}
													style={{ cursor: 'pointer' }}
													onClick={() => setShowConfirmPassword((prev) => !prev)}
												></span>
											</div>
										</div>
									</div>
									<div className="d-flex align-items-center justify-content-end">
										<button 
											type="button" 
											className="btn btn-outline-light border me-3"
											onClick={() => {
												setCurrentPassword('');
												setNewPassword('');
												setConfirmPassword('');
											}}
										>
											Cancel
										</button>
										<button type="submit" className="btn btn-primary" disabled={isLoading}>
											{isLoading ? 'Saving...' : 'Save Changes'}
										</button>
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

export default SecuritySettings;
