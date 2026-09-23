import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import GlobalSearch from './common/GlobalSearch';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import ConfirmationModal from './ConfirmationModal';

const Header = ({ toggleMobileMenu }) => {
  const { user, logout } = useAuth();

  // WhatsApp API Connection status state (ON by default)
  const [waConnected, setWaConnected] = useState(true);

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
							<div className="me-2 notification_item">
								<a href="#" className="btn btn-menubar position-relative me-1" id="notification_popup"
									data-bs-toggle="dropdown">
									<i className="ti ti-bell"></i>
									<span className="notification-status-dot"></span>
								</a>
								<div className="dropdown-menu dropdown-menu-end notification-dropdown p-4">
									<div
										className="d-flex align-items-center justify-content-between border-bottom p-0 pb-3 mb-3">
										<h4 className="notification-title">Notifications (2)</h4>
										<div className="d-flex align-items-center">
											<a href="#" className="text-primary fs-15 me-3 lh-1">Mark all as read</a>
											<div className="dropdown">
												<a href="#" className="bg-white dropdown-toggle"
													data-bs-toggle="dropdown">
													<i className="ti ti-calendar-due me-1"></i>Today
												</a>
												<ul className="dropdown-menu mt-2 p-3">
													<li>
														<a href="#" className="dropdown-item rounded-1">
															This Week
														</a>
													</li>
													<li>
														<a href="#" className="dropdown-item rounded-1">
															Last Week
														</a>
													</li>
													<li>
														<a href="#" className="dropdown-item rounded-1">
															Last Month
														</a>
													</li>
												</ul>
											</div>
										</div>
									</div>
									<div className="noti-content">
										<div className="d-flex flex-column">
											<div className="border-bottom mb-3 pb-3">
												<a href="/activity">
													<div className="d-flex">
														<span className="avatar avatar-lg me-2 flex-shrink-0">
															<img src="/assets/img/profiles/avatar-27.jpg" alt="Profile" />
														</span>
														<div className="flex-grow-1">
															<p className="mb-1"><span
																	className="text-dark fw-semibold">Shawn</span>
																performance in Math is below the threshold.</p>
															<span>Just Now</span>
														</div>
													</div>
												</a>
											</div>
											<div className="border-bottom mb-3 pb-3">
												<a href="/activity" className="pb-0">
													<div className="d-flex">
														<span className="avatar avatar-lg me-2 flex-shrink-0">
															<img src="/assets/img/profiles/avatar-23.jpg" alt="Profile" />
														</span>
														<div className="flex-grow-1">
															<p className="mb-1"><span
																	className="text-dark fw-semibold">Sylvia</span> added
																appointment on 02:00 PM</p>
															<span>10 mins ago</span>
															<div
																className="d-flex justify-content-start align-items-center mt-1">
																<span className="btn btn-light btn-sm me-2">Deny</span>
																<span className="btn btn-primary btn-sm">Approve</span>
															</div>
														</div>
													</div>
												</a>
											</div>
											<div className="border-bottom mb-3 pb-3">
												<a href="/activity">
													<div className="d-flex">
														<span className="avatar avatar-lg me-2 flex-shrink-0">
															<img src="/assets/img/profiles/avatar-25.jpg" alt="Profile" />
														</span>
														<div className="flex-grow-1">
															<p className="mb-1">New student record <span
																	className="text-dark fw-semibold"> George</span> is
																created by <span
																	className="text-dark fw-semibold">Teressa</span></p>
															<span>2 hrs ago</span>
														</div>
													</div>
												</a>
											</div>
											<div className="border-0 mb-3 pb-0">
												<a href="/activity">
													<div className="d-flex">
														<span className="avatar avatar-lg me-2 flex-shrink-0">
															<img src="/assets/img/profiles/avatar-01.jpg" alt="Profile" />
														</span>
														<div className="flex-grow-1">
															<p className="mb-1">A new teacher record for <span
																	className="text-dark fw-semibold">Elisa</span> </p>
															<span>09:45 AM</span>
														</div>
													</div>
												</a>
											</div>
										</div>
									</div>
									<div className="d-flex p-0">
										<a href="#" className="btn btn-light w-100 me-2">Cancel</a>
										<a href="/activity" className="btn btn-primary w-100">View All</a>
									</div>
								</div>
							</div>
							<div className="dropdown profile-dropdown">
								<a href="#" className="dropdown-toggle d-flex align-items-center"
									data-bs-toggle="dropdown">
									<span className="avatar avatar-md online">
										<img src={user?.profile_photo || "/assets/img/profiles/avatar-14.jpg"} alt="Img"
											className="img-fluid rounded-circle" />
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
