import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import GlobalSearch from './common/GlobalSearch';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import ConfirmationModal from './ConfirmationModal';
import axiosClient from '../api/axiosClient';

const Header = ({ toggleMobileMenu }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // WhatsApp API Connection status state (ON by default)
  const [waConnected, setWaConnected] = useState(true);

  const [notifications, setNotifications] = useState([]);

  const fetchNotifications = async () => {
    try {
      const response = await axiosClient.get('/notifications');
      setNotifications(response);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchNotifications();
      const interval = setInterval(fetchNotifications, 5000);
      return () => clearInterval(interval);
    }
  }, [user]);

  const markAsRead = async (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await axiosClient.patch(`/notifications/${id}/read`);
      setNotifications(prev => prev.map(n => (n.id === id || n._id === id) ? { ...n, is_read: true } : n));
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const markAllAsRead = async (e) => {
    e.preventDefault();
    try {
      await axiosClient.patch('/notifications/read-all');
      setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
    } catch (error) {
      console.error("Error marking all notifications as read:", error);
    }
  };

  const handleNotificationClick = (e, notif) => {
    e.preventDefault();
    const notifId = notif._id || notif.id;
    if (!notif.is_read) {
        markAsRead(e, notifId);
    }
    if (notif.link) {
        // Fallback for legacy notifications saved with /tasks
        navigate(notif.link === '/tasks' ? '/task-board' : notif.link);
    }
  };

  const safeNotifications = Array.isArray(notifications) ? notifications : [];
  const unreadCount = safeNotifications.filter(n => !n.is_read).length;


  const backendUrl = import.meta.env.VITE_APP_API_URL?.replace('/api/v1', '') || 'http://localhost:8000';
  const profilePhotoUrl = user?.profile_photo ? (user.profile_photo.startsWith('http') ? user.profile_photo : `${backendUrl}${user.profile_photo}`) : null;

  const getInitials = (name) => {
    if (!name) return 'U';
    const parts = name.trim().split(' ');
    if (parts.length > 1) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const formatRelativeTime = (dateString) => {
    if (!dateString) return '';
    let d = dateString;
    if (!d.endsWith('Z') && !d.includes('+')) {
        d += 'Z';
    }
    const date = new Date(d);
    const diff = Math.floor((new Date() - date) / 1000);
    
    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)} mins ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
    if (diff < 2592000) return `${Math.floor(diff / 86400)} days ago`;
    return date.toLocaleDateString();
  };

  const toggleWaApi = () => {
    if (waConnected) {
      setWaConnected(false);
      toast.error("Whatsapp API disconnected");
    } else {
      setWaConnected(true);
      toast.success("Whatsapp API Connection Restored");
    }
  };

  const handleConfirmLogout = () => {
    logout();
  };
  return (
    <>
{/* Header */}
		<div className="header">
			<div className="main-header">

				<div className="header-left">
					<a href="/" className="logo">
						<img src="/assets/img/logo.svg" alt="Logo" />
					</a>
					<a href="/" className="dark-logo">
						<img src="/assets/img/logo-white.svg" alt="Logo" />
					</a>
				</div>

				<a id="mobile_btn" className="mobile_btn" href="#" onClick={(e) => { e.preventDefault(); toggleMobileMenu(); }}>
					<span className="bar-icon">
						<span></span>
						<span></span>
						<span></span>
					</span>
				</a>

				<div className="header-user">
					<div className="nav user-menu nav-list">

						<div className="me-auto d-flex align-items-center" id="header-search">
							<a id="toggle_btn" href="#" className="btn btn-menubar me-2">
								<i className="ti ti-arrow-bar-to-left text-body"></i>
							</a>
							{/* Search */}
							<GlobalSearch />

							
							{/* /Search */}
							<div className="dropdown crm-dropdown">
								<a href="#" className="btn btn-menubar me-2" data-bs-toggle="dropdown">
									<i className="ti ti-layout-grid"></i>
								</a>
								<div className="dropdown-menu dropdown-lg dropdown-menu-start">
									<div className="card mb-0 border-0 shadow-none">
										<div className="card-header">
											<h4>CRM</h4>
										</div>
										<div className="card-body pb-1">
											<div className="row">
												<div className="col-sm-6">
													<a href="/contacts"
														className="d-flex align-items-center justify-content-between p-2 crm-link mb-3">
														<span className="d-flex align-items-center me-3">
															<i className="ti ti-user-shield text-default me-2"></i>Contacts
														</span>
														<i className="ti ti-arrow-right"></i>
													</a>
													<a href="/deals-grid"
														className="d-flex align-items-center justify-content-between p-2 crm-link mb-3">
														<span className="d-flex align-items-center me-3">
															<i className="ti ti-heart-handshake text-default me-2"></i>Deals
														</span>
														<i className="ti ti-arrow-right"></i>
													</a>
													<a href="/pipeline"
														className="d-flex align-items-center justify-content-between p-2 crm-link mb-3">
														<span className="d-flex align-items-center me-3">
															<i
																className="ti ti-timeline-event-text text-default me-2"></i>Pipeline
														</span>
														<i className="ti ti-arrow-right"></i>
													</a>
												</div>
												<div className="col-sm-6">
													<a href="/companies-grid"
														className="d-flex align-items-center justify-content-between p-2 crm-link mb-3">
														<span className="d-flex align-items-center me-3">
															<i className="ti ti-building text-default me-2"></i>Companies
														</span>
														<i className="ti ti-arrow-right"></i>
													</a>
													<a href="/leads-grid"
														className="d-flex align-items-center justify-content-between p-2 crm-link mb-3">
														<span className="d-flex align-items-center me-3">
															<i className="ti ti-user-check text-default me-2"></i>Leads
														</span>
														<i className="ti ti-arrow-right"></i>
													</a>
													<a href="/activity"
														className="d-flex align-items-center justify-content-between p-2 crm-link mb-3">
														<span className="d-flex align-items-center me-3">
															<i className="ti ti-activity text-default me-2"></i>Activities
														</span>
														<i className="ti ti-arrow-right"></i>
													</a>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							

							{/* WhatsApp API Connection Toggle Pill */}
							<button
								className="d-flex align-items-center justify-content-center ms-2"
								onClick={toggleWaApi}
								title={waConnected ? "Click to disconnect WhatsApp API" : "Click to connect WhatsApp API"}
								aria-label="WhatsApp API Connection Toggle"
								style={{ 
									borderRadius: '20px', 
									padding: waConnected ? '0 16px' : '0 10px', 
									height: '25px',
									background: 'transparent', 
									border: '1px solid var(--border-color, #e2e8f0)', 
									transition: 'all 0.3s ease',
									cursor: 'pointer',
									outline: 'none'
								}}
							>
								<span className="rounded-circle d-inline-block" style={{ width: '7px', height: '7px', backgroundColor: waConnected ? '#25D366' : '#dc3545', boxShadow: waConnected ? '0 0 6px rgba(37,211,102,0.3)' : 'none', marginRight: waConnected ? '0' : '6px', transition: 'all 0.3s ease' }}></span>
								{!waConnected && <span className="fw-medium text-muted" style={{ fontSize: '12px' }}>WA API</span>}
							</button>
						</div>

						

						<div className="d-flex align-items-center">
							<div className="dropdown ai-dropdown me-2">
								<a href="#" className="dropdown-toggle d-flex align-items-center btn btn-primary-gradient" data-bs-toggle="dropdown">
									<i className="ti ti-plus me-1"></i>Quick Action<i className="ti ti-chevron-down ms-1"></i>
								</a>
								<div className="dropdown-menu shadow-none p-3" style={{ minWidth: '200px' }}>
		

									<a className="dropdown-item rounded d-flex align-items-center py-2" href="#" onClick={(e) => e.preventDefault()}>
										<i className="ti ti-target me-2 fs-10 text-gray-5 "></i>New Lead
									</a>
									<a className="dropdown-item rounded d-flex align-items-center py-2" href="#" onClick={(e) => e.preventDefault()}>
										<i className="ti ti-file-invoice me-2 fs-10 text-gray-5"></i>New Invoice
									</a>
									<a className="dropdown-item rounded d-flex align-items-center py-2" href="#" onClick={(e) => e.preventDefault()}>
										<i className="ti ti-clipboard-list me-2 fs-10 text-gray-5"></i>New Task
									</a>
								</div>
							</div>
							<div className="me-2">
							<Link to="/profile-settings" className="btn btn-menubar">
								<i className="ti ti-settings-cog"></i>
							</Link>
							</div>
							<div className="me-2">
								<a href="/chat" className="btn btn-menubar position-relative">
									<i className="ti ti-message"></i>
									<span className="msg-status-dot"></span>
								</a>
							</div>
							{/* <div className="me-2">
								<a href="/email" className="btn btn-menubar">
									<i className="ti ti-mail"></i>
								</a>
							</div> */}
							<div className="notification_item me-2">
								<a href="#" className="btn btn-menubar position-relative me-1" id="notification_popup"
									data-bs-toggle="dropdown">
									<i className="ti ti-bell"></i>
									<span className={`notification-status-dot ${unreadCount > 0 ? '' : 'd-none'}`}></span>
								</a>
								<div className="dropdown-menu dropdown-menu-end notification-dropdown p-4" style={{maxHeight: '500px', overflowY: 'auto'}}>
									<div
										className="d-flex align-items-center justify-content-between border-bottom p-0 pb-3 mb-3">
										<h4 className="notification-title">Notifications ({unreadCount})</h4>
										<div className="d-flex align-items-center">
											<a href="#" className="text-primary fs-15 lh-1" onClick={markAllAsRead}>Mark all as read</a>
										</div>
									</div>
									<div className="noti-content">
										<div className="d-flex flex-column">
											{safeNotifications.length === 0 ? (
												<div className="text-center p-3 text-muted">No notifications</div>
											) : (
												safeNotifications.map(notif => (
													<div key={notif._id || notif.id} className={`border-bottom mb-3 pb-3 ${notif.is_read ? 'opacity-75' : ''}`}>
														<a href="#" onClick={(e) => handleNotificationClick(e, notif)}>
															<div className="d-flex justify-content-between align-items-start">
																<div className="d-flex">
																	<span className="avatar avatar-md me-2 flex-shrink-0 bg-primary-transparent text-primary rounded-circle d-flex align-items-center justify-content-center">
																		<i className="ti ti-bell fs-16"></i>
																	</span>
																	<div className="flex-grow-1">
																		<p className="mb-1 fw-medium text-dark">{notif.title}</p>
																		<p className="mb-1 text-muted fs-13">{notif.message}</p>
																		<span className="text-muted fs-12">{formatRelativeTime(notif.created_at)}</span>
																	</div>
																</div>
																{!notif.is_read && (
																	<button className="btn btn-sm btn-icon btn-light rounded-circle flex-shrink-0 ms-2" onClick={(e) => markAsRead(e, notif._id || notif.id)} title="Mark as read">
																		<i className="ti ti-check text-success"></i>
																	</button>
																)}
															</div>
														</a>
													</div>
												))
											)}
										</div>
									</div>
									
								</div>
							</div>
							<div className="dropdown profile-dropdown">
								<a href="#" className="dropdown-toggle d-flex align-items-center"
									data-bs-toggle="dropdown">
									<span className="avatar avatar-md online">
										{profilePhotoUrl ? (
											<img src={profilePhotoUrl} alt="Img" className="img-fluid rounded-circle" style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
										) : (
											<div className="d-flex align-items-center justify-content-center bg-primary text-white rounded-circle fw-bold w-100 h-100 fs-16">
												{getInitials(user?.name)}
											</div>
										)}
									</span>
								</a>
								<div className="dropdown-menu shadow-none">
									<div className="card mb-0">
										<div className="card-header">
											<div className="d-flex align-items-center">
												
												<div>
													<h5 className="mb-0 fs-11 text-capitalize">{user?.name || "User"}</h5>
													
													<p className="fs-11 fw-medium mb-0 text-muted">{user?.email || ""}</p>
													<p className="fs-12 fw-medium mb-0 text-primary text-capitalize">{user?.role || ""}</p>
												</div>
											</div>
										</div>
										<div className="card-body">
											<Link className="dropdown-item d-inline-flex align-items-center p-0 py-2"
												to="/profile-settings">
												<i className="ti ti-user-circle me-1"></i>My Profile
											</Link>
											<Link className="dropdown-item d-inline-flex align-items-center p-0 py-2"
												to="/security-settings">
												<i className="ti ti-lock me-1"></i> Security
											</Link>

											<Link className="dropdown-item d-inline-flex align-items-center p-0 py-2"
												to="/notification-settings">
												<i className="ti ti-bell me-1"></i> Notification
											</Link>
											
										</div>
										<div className="card-footer">
											<a className="dropdown-item d-inline-flex align-items-center p-0 py-2"
												href="#" onClick={(e) => e.preventDefault()} data-bs-toggle="modal" data-bs-target="#logout_modal">
												<i className="ti ti-login me-2"></i>Logout
											</a>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Mobile Menu */}
				<div className="dropdown mobile-user-menu">
					<a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown"
						aria-expanded="false"><i className="fa fa-ellipsis-v"></i></a>
					<div className="dropdown-menu dropdown-menu-end">
						<Link className="dropdown-item" to="/profile-settings">My Profile</Link>
						<Link className="dropdown-item" to="/profile-settings">Settings</Link>
						<a className="dropdown-item" href="#" onClick={(e) => e.preventDefault()} data-bs-toggle="modal" data-bs-target="#logout_modal">Logout</a>
					</div>
				</div>
				{/* /Mobile Menu */}

			</div>

		</div>
		{/* /Header */}
		<ConfirmationModal
			id="logout_modal"
			title="Confirm Logout"
			description="Are you sure you want to log out?"
			confirmText="Logout"
			icon="ti ti-logout fs-36"
			onConfirm={handleConfirmLogout}
		/>
    </>
  );
};

export default Header;
