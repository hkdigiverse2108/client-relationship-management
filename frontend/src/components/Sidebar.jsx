import React, { useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { FiGrid } from "react-icons/fi";

const Sidebar = ({ closeMobileMenu }) => {
  const location = useLocation();

  useEffect(() => {
    if (!window.$) return;

    // 0. Remove 'active' class from ALL links to prevent accumulation from previous visits
    window.$('.sidebar-menu a').removeClass('active');
    window.$('.sidebar-menu li').removeClass('active');

    // 1. Find the link that matches the current pathname exactly
    let checkPath = location.pathname;
    // Map detail pages back to their main list pages so sidebar stays active
    if (checkPath === '/client-details') checkPath = '/clients';

    let $activeLink = null;
    window.$('.sidebar-menu a').each(function() {
      if (window.$(this).attr('href') === checkPath) {
        $activeLink = window.$(this);
        return false; // break the loop
      }
    });

    if ($activeLink) {
      // 2. Ensure the active link has the 'active' class
      $activeLink.addClass('active');

      // 2.5. For single links (without a dropdown), add active to the parent li so they get the background highlight
      if ($activeLink.closest('.submenu').length === 0) {
        $activeLink.closest('li').addClass('active');
      }

      // 3. Find all parent submenus of the active link
      let $parentSubmenus = $activeLink.parents('.submenu');

      // 4. Instantly show the correct parent submenus (no animation = no blinking)
      $parentSubmenus.each(function() {
        window.$(this).children('a:first').addClass('active subdrop');
        window.$(this).children('ul:first').show();
      });

      // 5. Instantly hide all other submenus that should not be open
      window.$('.sidebar-menu .submenu').each(function() {
        // If this submenu is not one of the active parents
        if ($parentSubmenus.length === 0 || !$parentSubmenus.is(this)) {
          window.$(this).children('a:first').removeClass('active subdrop');
          window.$(this).children('ul:first').hide();
        }
      });
    }
  }, [location.pathname]);

  return (
    <>
{/* Sidebar */}
		<div className="sidebar" id="sidebar">
			{/* Logo */}
			<div className="sidebar-logo">
				<NavLink onClick={closeMobileMenu} to="/" className="logo logo-normal" onClick={closeMobileMenu}>
					<img src="/assets/img/logo.svg" alt="Logo" />
				</NavLink>
				<NavLink onClick={closeMobileMenu} to="/" className="logo-small" onClick={closeMobileMenu}>
					<img src="/assets/img/logo-small.svg" alt="Logo" />
				</NavLink>
				<NavLink onClick={closeMobileMenu} to="/" className="dark-logo" onClick={closeMobileMenu}>
					<img src="/assets/img/logo-white.svg" alt="Logo" />
				</NavLink>
			</div>
			{/* /Logo */}
			<div className="modern-profile p-3 pb-0">
				<div className="text-center rounded bg-light p-3 mb-4 user-profile">
					<div className="avatar avatar-lg online mb-3">
						<img src="/assets/img/profiles/avatar-02.jpg" alt="Img" className="img-fluid rounded-circle" />
					</div>
					<h6 className="fs-12 fw-normal mb-1">Adrian Herman</h6>
					<p className="fs-10">System Admin</p>
				</div>
				<div className="sidebar-nav mb-3">
					<ul className="nav nav-tabs nav-tabs-solid nav-tabs-rounded nav-justified bg-transparent"
						role="tablist">
						<li className="nav-item"><a className="nav-link active border-0" href="#">Menu</a></li>
						<li className="nav-item"><a className="nav-link border-0" href="/chat">Chats</a></li>
						<li className="nav-item"><a className="nav-link border-0" href="/email">Inbox</a></li>
					</ul>
				</div>
			</div>
			<div className="sidebar-header p-3 pb-0 pt-2">
				<div className="text-center rounded bg-light p-2 mb-4 sidebar-profile d-flex align-items-center">
					<div className="avatar avatar-md onlin">
						<img src="/assets/img/profiles/avatar-02.jpg" alt="Img" className="img-fluid rounded-circle" />
					</div>
					<div className="text-start sidebar-profile-info ms-2">
						<h6 className="fs-12 fw-normal mb-1">Adrian Herman</h6>
						<p className="fs-10">System Admin</p>
					</div>
				</div>
				<div className="input-group input-group-flat d-inline-flex mb-4">
					<span className="input-icon-addon">
						<i className="ti ti-search"></i>
					</span>
					<input type="text" className="form-control" placeholder="Search in HRMS" />
					<span className="input-group-text">
						<kbd>CTRL + / </kbd>
					</span>
				</div>
				<div className="d-flex align-items-center justify-content-between menu-item mb-3">
					<div className="me-3">
						<NavLink onClick={closeMobileMenu} to="/calendar" className="btn btn-menubar" onClick={closeMobileMenu}>
							<i className="ti ti-layout-grid-remove"></i>
						</NavLink>
					</div>
					<div className="me-3">
						<NavLink onClick={closeMobileMenu} to="/chat" className="btn btn-menubar position-relative" onClick={closeMobileMenu}>
							<i className="ti ti-brand-hipchat"></i>
							<span
								className="badge bg-info rounded-pill d-flex align-items-center justify-content-center header-badge">5</span>
						</NavLink>
					</div>
					<div className="me-3 notification-item">
						<NavLink onClick={closeMobileMenu} to="/activity" className="btn btn-menubar position-relative me-1" onClick={closeMobileMenu}>
							<i className="ti ti-bell"></i>
							<span className="notification-status-dot"></span>
						</NavLink>
					</div>
					<div className="me-0">
						<NavLink onClick={closeMobileMenu} to="/email" className="btn btn-menubar" onClick={closeMobileMenu}>
							<i className="ti ti-message"></i>
						</NavLink>
					</div>
				</div>
			</div>
			<div className="slimScrollDiv" style={{ position: 'relative', overflow: 'hidden', width: '100%', height: 'calc(100vh - 60px)', padding: 0 }}>
				<div className="sidebar-inner" style={{ width: '100%', height: '100%' }}>
				<Scrollbars
					autoHide
					autoHideTimeout={1000}
					autoHideDuration={200}
					style={{ width: '100%', height: '100%' }}
					renderThumbVertical={props => <div {...props} style={{ ...props.style, backgroundColor: 'rgba(0,0,0,0.10)', borderRadius: '10px', width: '4px' }} />}
				>
				<div id="sidebar-menu" className="sidebar-menu" style={{ padding: '0 16px 16px 16px' }}>

          {/* NEW MENU (DASHBOARDS) */}
          <ul style={{ paddingTop: '15px' }}>
            <li>
              <ul>
                <li className="submenu">
                  <a href="#">
                   <i className="ti ti-smart-home"></i>
                    <span>Dashboard</span>
                    <span className="menu-arrow"></span>
                  </a>
                  <ul>
                    <li><NavLink onClick={closeMobileMenu} to="/dashboard">Main KPI</NavLink></li>
                    <li><NavLink onClick={closeMobileMenu} to="/sales">Sales</NavLink></li>
                    <li><NavLink onClick={closeMobileMenu} to="/team">Team</NavLink></li>
                    <li><NavLink onClick={closeMobileMenu} to="/analytics">Analytics</NavLink></li>
                  </ul>
                </li>
                <li className="submenu">
                  <a href="#">
                    <i className="ti ti-target"></i>
                    <span>CRM & Sales</span>
                    <span className="menu-arrow"></span>
                  </a>
                  <ul>
                    <li><NavLink onClick={closeMobileMenu} to="/leads">Leads</NavLink></li>
                    <li><NavLink onClick={closeMobileMenu} to="/contacts">Contacts</NavLink></li>
                    <li><NavLink onClick={closeMobileMenu} to="/clients">Clients</NavLink></li>
                    <li><NavLink onClick={closeMobileMenu} to="/pipeline">Pipeline</NavLink></li>
                  </ul>
                </li>
                <li className="submenu">
                  <a href="#">
                    <i className="ti ti-briefcase"></i>
                    <span>Projects</span>
                    <span className="menu-arrow"></span>
                  </a>
                  <ul>
                    <li><NavLink onClick={closeMobileMenu} to="/projects-dashboard">Dashboard</NavLink></li>
                    <li><NavLink onClick={closeMobileMenu} to="/all-projects">All Projects</NavLink></li>
                    <li><NavLink onClick={closeMobileMenu} to="/project-pipeline">Pipeline Board</NavLink></li>
                    <li><NavLink onClick={closeMobileMenu} to="/gantt-chart">Gantt Chart</NavLink></li>
                    <li><NavLink onClick={closeMobileMenu} to="/project-report">Reports</NavLink></li>
                  </ul>
                </li>
                <li className="submenu">
                  <a href="#">
                    <i className="ti ti-message-circle"></i>
                    <span>Omnichannel Hub</span>
                    <span className="menu-arrow"></span>
                  </a>
                  <ul>
                    <li className="submenu submenu-two">
                      <a href="#">
                        WhatsApp
                        <span className="menu-arrow inside-submenu"></span>
                      </a>
                      <ul>
                        <li><NavLink onClick={closeMobileMenu} to="/chat">Inbox</NavLink></li>
                        <li><NavLink onClick={closeMobileMenu} to="/whatsapp-automation-dashboard">Automation Dashboard</NavLink></li>
                      </ul>
                    </li>
                    <li><NavLink onClick={closeMobileMenu} to="/call-dialer">Call Dialer</NavLink></li>
                    <li><NavLink onClick={closeMobileMenu} to="/email">Email Inbox</NavLink></li>
                    <li><NavLink onClick={closeMobileMenu} to="/sms-inbox">SMS Inbox</NavLink></li>
                  </ul>
                </li>
                <li className="submenu">
                  <a href="#">
                    <i className="ti ti-shopping-cart"></i>
                    <span>E-Commerce</span>
                    <span className="menu-arrow"></span>
                  </a>
                  <ul>
                    <li><NavLink onClick={closeMobileMenu} to="/orders">Orders</NavLink></li>
                    <li><NavLink onClick={closeMobileMenu} to="/customers">Customers</NavLink></li>
                    <li><NavLink onClick={closeMobileMenu} to="/products">Products</NavLink></li>
                    <li><NavLink onClick={closeMobileMenu} to="/inventory">Inventory</NavLink></li>
                    
                  </ul>
                </li>
                <li className="submenu">
                  <a href="#">
                    <i className="ti ti-file-invoice"></i>
                    <span>Finance & Billing</span>
                    <span className="menu-arrow"></span>
                  </a>
                  <ul>
                    <li><NavLink onClick={closeMobileMenu} to="/billing-dashboard">Billing Dashboard</NavLink></li>
                    <li><NavLink onClick={closeMobileMenu} to="/invoices">Invoices</NavLink></li>
                    <li><NavLink onClick={closeMobileMenu} to="/quotes">Quotes</NavLink></li>
                    <li><NavLink onClick={closeMobileMenu} to="/payments">Payments</NavLink></li>
                    <li><NavLink onClick={closeMobileMenu} to="/ledger">Ledger</NavLink></li>
                    <li><NavLink onClick={closeMobileMenu} to="/expenses">Expenses</NavLink></li>
       
                  </ul>
                </li>
                <li className="submenu">
                  <a href="#">
                    <i className="ti ti-users"></i>
                    <span>HRMS & Payroll</span>
                    <span className="menu-arrow"></span>
                  </a>
                  <ul>
                    <li><NavLink onClick={closeMobileMenu} to="/hrms-dashboard">HRMS Dashboard</NavLink></li>
                    <li><NavLink onClick={closeMobileMenu} to="/directory">Directory</NavLink></li>
                    <li><NavLink onClick={closeMobileMenu} to="/attendance">Attendance</NavLink></li>
                    <li><NavLink onClick={closeMobileMenu} to="/leaves">Leaves</NavLink></li>
                   
                  </ul>
                </li>
                <li className="submenu">
                  <a href="#">
                    <i className="ti ti-clipboard-list"></i>
                    <span>Tasks & Calendar</span>
                    <span className="menu-arrow"></span>
                  </a>
                  <ul>
                    <li><NavLink onClick={closeMobileMenu} to="/task-board">Task Board</NavLink></li>
                    <li><NavLink onClick={closeMobileMenu} to="/reminders">Reminders</NavLink></li>
                  </ul>
                </li>
                <li className="submenu">
                  <a href="#">
                    <i className="ti ti-settings"></i>
                    <span>Admin Console</span>
                    <span className="menu-arrow"></span>
                  </a>
                  <ul>
                   
                    <li><NavLink onClick={closeMobileMenu} to="/user-management">User Management</NavLink></li>
                    <li><NavLink onClick={closeMobileMenu} to="/roles-permissions">Roles & Permissions</NavLink></li>
                    <li><NavLink onClick={closeMobileMenu} to="/audit-log">Audit Logs</NavLink></li>
                   
                  </ul>
                </li>
              </ul>
            </li>
          </ul>

          {/* OLD MENU REFERENCE */}
          {/*
					<ul>
						<li className="menu-title"><span>MAIN MENU</span></li>
						<li>
							<ul>
								<li className="submenu">
									<a href="#">
										<i className="ti ti-smart-home"></i>
										<span>Dashboard</span>
										<span className="badge badge-danger fs-10 fw-medium text-white p-1">Hot</span>
										<span className="menu-arrow"></span>
									</a>
									<ul>
										<li><NavLink onClick={closeMobileMenu} to="/">Admin Dashboard</NavLink></li>
										<li><NavLink onClick={closeMobileMenu} to="/employee-dashboard">Employee Dashboard</NavLink></li>
										<li><NavLink onClick={closeMobileMenu} to="/deals-dashboard">Deals Dashboard</NavLink></li>
										<li><NavLink onClick={closeMobileMenu} to="/leads-dashboard">Leads Dashboard</NavLink></li>
										<li><NavLink onClick={closeMobileMenu} to="/h-r-dashboard">HR Dashboard <span
													className="badge badge-danger fs-10 fw-medium text-white p-1">New</span>
											</NavLink></li>
										<li><NavLink onClick={closeMobileMenu} to="/payroll-dashboard">Payroll Dashboard<span
													className="badge badge-danger fs-10 fw-medium text-white p-1">New</span></NavLink>
										</li>
										<li><NavLink onClick={closeMobileMenu} to="/recruitment-dashboard">Recruitment Dashboard<span
													className="badge badge-danger fs-10 fw-medium text-white p-1">New</span></NavLink>
										</li>
										<li><NavLink onClick={closeMobileMenu} to="/attendance-dashboard">Attendance Dashboard<span
													className="badge badge-danger fs-10 fw-medium text-white p-1">New</span></NavLink>
										</li>
										<li><NavLink onClick={closeMobileMenu} to="/finance-dashboard">Finance Dashboard<span
													className="badge badge-danger fs-10 fw-medium text-white p-1">New</span></NavLink>
										</li>
										<li><NavLink onClick={closeMobileMenu} to="/it-admin-dashboard">IT Admin Dashboard<span
													className="badge badge-danger fs-10 fw-medium text-white p-1">New</span></NavLink>
										</li>
										<li><NavLink onClick={closeMobileMenu} to="/asset-dashboard">Asset Dashboard<span
													className="badge badge-danger fs-10 fw-medium text-white p-1">New</span></NavLink>
										</li>
										<li><NavLink onClick={closeMobileMenu} to="/help-desk-dashboard">Help Desk Dashboard<span
													className="badge badge-danger fs-10 fw-medium text-white p-1">New</span></NavLink>
										</li>
									</ul>
								</li>
								<li className="submenu">
									<a href="#">
										<i className="ti ti-layout-grid-add"></i><span>Applications</span>
										<span className="menu-arrow"></span>
									</a>
									<ul>
										<li><NavLink onClick={closeMobileMenu} to="/chat">Chat</NavLink></li>
										<li className="submenu submenu-two">
											<a href="#">Calls<span
													className="menu-arrow inside-submenu"></span></a>
											<ul>
												<li><NavLink onClick={closeMobileMenu} to="/voice-call">Voice Call</NavLink></li>
												<li><NavLink onClick={closeMobileMenu} to="/video-call">Video Call</NavLink></li>
												<li><NavLink onClick={closeMobileMenu} to="/outgoing-call">Outgoing Call</NavLink></li>
												<li><NavLink onClick={closeMobileMenu} to="/incoming-call">Incoming Call</NavLink></li>
												<li><NavLink onClick={closeMobileMenu} to="/call-history">Call History</NavLink></li>
											</ul>
										</li>
										<li><NavLink onClick={closeMobileMenu} to="/calendar">Calendar</NavLink></li>
										<li><NavLink onClick={closeMobileMenu} to="/reminders">Reminders</NavLink></li>
										<li><NavLink onClick={closeMobileMenu} to="/email">Email</NavLink></li>
										<li><NavLink onClick={closeMobileMenu} to="/todo">To Do</NavLink></li>
										<li><NavLink onClick={closeMobileMenu} to="/notes">Notes</NavLink></li>
										<li><NavLink onClick={closeMobileMenu} to="/social-feed">Social Feed</NavLink></li>
										<li><NavLink onClick={closeMobileMenu} to="/file-manager">File Manager</NavLink></li>
										<li><NavLink onClick={closeMobileMenu} to="/kanban-view">Kanban</NavLink></li>
										<li><NavLink onClick={closeMobileMenu} to="/invoices">Invoices</NavLink></li>
									</ul>
								</li>
								<li className="submenu">
									<a href="#">
										<i className="ti ti-user-star"></i><span>Super Admin</span>
										<span className="menu-arrow"></span>
									</a>
									<ul>
										<li><NavLink onClick={closeMobileMenu} to="/dashboard">Dashboard</NavLink></li>
										<li><NavLink onClick={closeMobileMenu} to="/companies">Companies</NavLink></li>
										<li><NavLink onClick={closeMobileMenu} to="/subscription">Subscriptions</NavLink></li>
										<li><NavLink onClick={closeMobileMenu} to="/packages">Packages</NavLink></li>
										<li><NavLink onClick={closeMobileMenu} to="/domain">Domain</NavLink></li>
										<li><NavLink onClick={closeMobileMenu} to="/purchase-transaction">Purchase Transaction</NavLink></li>
										<li><NavLink onClick={closeMobileMenu} to="/tenant-usage-metrics">Tenant Usage Metrics <span
													className="badge badge-danger fs-10 fw-medium text-white p-1">New</span></NavLink>
										</li>
										<li><NavLink onClick={closeMobileMenu} to="/tenant-support-tickets">Tenant Support Tickets <span
													className="badge badge-danger fs-10 fw-medium text-white p-1">New</span></NavLink>
										</li>
										<li className="submenu submenu-two">
											<NavLink onClick={closeMobileMenu} to="/tickets" className="subdrop" onClick={closeMobileMenu}>Tickets <span
													className="badge badge-danger fs-10 fw-medium text-white p-1">New</span>
												<span className="menu-arrow inside-submenu"></span></NavLink>
											<ul>
												<li><NavLink onClick={closeMobileMenu} to="/agents">Agents</NavLink></li>
												<li><NavLink onClick={closeMobileMenu} to="/sla-policies">SLA Policies</NavLink></li>
												<li><NavLink onClick={closeMobileMenu} to="/escalation-rules">Escalation Rules</NavLink></li>
											</ul>
										</li>
									</ul>
								</li>
								<li className="submenu">
							        <a href="#">
								       <i className="ti ti-sparkles"></i><span>AI Center</span>
								       <span className="menu-arrow"></span>
							        </a>
							        <ul>
								       <li><NavLink onClick={closeMobileMenu} to="/ai-attendance-insights">AI Attendance Insights</NavLink></li>
								       <li><NavLink onClick={closeMobileMenu} to="/ai-payroll-forecast">AI Payroll Forecast</NavLink></li>
								       <li><NavLink onClick={closeMobileMenu} to="/ai-hiring-forecast">AI Hiring Forecast</NavLink></li>
								       <li><NavLink onClick={closeMobileMenu} to="/ai-team-performance-insights">AI Team Performance Insights</NavLink></li>
								       <li><NavLink onClick={closeMobileMenu} to="/ai-configuration">AI Settings</NavLink></li>
							        </ul>
						        </li>
							</ul>
						</li>
						
						<li className="menu-title"><span>PROJECTS</span></li>
						<li>
							<ul>
								<li>
									<NavLink onClick={closeMobileMenu} to="/clients-grid">
										<i className="ti ti-users-group"></i><span>Clients</span>
									</NavLink>
								</li>
								<li className="submenu">
									<a href="#">
										<i className="ti ti-box"></i><span>Projects</span>
										<span className="menu-arrow"></span>
									</a>
									<ul>
										<li><NavLink onClick={closeMobileMenu} to="/project-dashboard">Dashboard</NavLink></li>
										<li><NavLink onClick={closeMobileMenu} to="/projects-grid">Projects</NavLink></li>
										<li><NavLink onClick={closeMobileMenu} to="/tasks">Tasks</NavLink></li>
										<li><NavLink onClick={closeMobileMenu} to="/task-board">Task Board</NavLink></li>
									</ul>
								</li>
							</ul>
						</li>
						<li className="menu-title"><span>CRM</span></li>
						<li>
							<ul>
								<li>
									<NavLink onClick={closeMobileMenu} to="/contacts-grid">
										<i className="ti ti-user-shield"></i><span>Contacts</span>
									</NavLink>
								</li>
								<li>
									<NavLink onClick={closeMobileMenu} to="/companies-grid">
										<i className="ti ti-building"></i><span>Companies</span>
									</NavLink>
								</li>
								<li>
									<NavLink onClick={closeMobileMenu} to="/deals-grid">
										<i className="ti ti-heart-handshake"></i><span>Deals</span>
									</NavLink>
								</li>
								<li>
									<NavLink onClick={closeMobileMenu} to="/leads-grid">
										<i className="ti ti-user-check"></i><span>Leads</span>
									</NavLink>
								</li>
								<li>
									<NavLink onClick={closeMobileMenu} to="/pipeline">
										<i className="ti ti-timeline-event-text"></i><span>Pipeline</span>
									</NavLink>
								</li>
								<li>
									<NavLink onClick={closeMobileMenu} to="/analytics">
										<i className="ti ti-graph"></i><span>Analytics</span>
									</NavLink>
								</li>
								<li>
									<NavLink onClick={closeMobileMenu} to="/activity">
										<i className="ti ti-activity"></i><span>Activities</span>
									</NavLink>
								</li>
							</ul>
						</li>
						<li className="menu-title"><span>HRM</span></li>
						<li>
							<ul>
								<li className="submenu">
									<a href="#">
										<i className="ti ti-users"></i><span>Employees</span>
										<span className="menu-arrow"></span>
									</a>
									<ul>
										<li><NavLink onClick={closeMobileMenu} to="/employees">Employee Lists</NavLink></li>
										<li><NavLink onClick={closeMobileMenu} to="/employees-grid">Employee Grid</NavLink></li>
										<li><NavLink onClick={closeMobileMenu} to="/employee-details">Employee Details</NavLink></li>
										<li><NavLink onClick={closeMobileMenu} to="/departments">Departments</NavLink></li>
										<li><NavLink onClick={closeMobileMenu} to="/designations">Designations</NavLink></li>
										<li><NavLink onClick={closeMobileMenu} to="/policy">Policies</NavLink></li>
									</ul>
								</li>
								<li className="submenu">
									<a href="#">
										<i className="ti ti-ticket"></i><span>Tickets</span>
										<span className="menu-arrow"></span>
									</a>
									<ul>
										<li><NavLink onClick={closeMobileMenu} to="/tickets">Tickets</NavLink></li>
										<li><NavLink onClick={closeMobileMenu} to="/ticket-details">Ticket Details</NavLink></li>
										<li><NavLink onClick={closeMobileMenu} to="/ticket-automation">Ticket Automation <span
													className="badge badge-danger fs-10 fw-medium text-white p-1">New</span></NavLink>
										</li>
										<li><NavLink onClick={closeMobileMenu} to="/ticket-reports">Ticket Reports <span
													className="badge badge-danger fs-10 fw-medium text-white p-1">New</span></NavLink>
										</li>
									</ul>
								</li>
								<li>
									<NavLink onClick={closeMobileMenu} to="/holidays">
										<i className="ti ti-calendar-event"></i><span>Holidays</span>
									</NavLink>
								</li>
								<li className="submenu">
									<a href="#">
										<i className="ti ti-file-time"></i><span>Attendance</span>
										<span className="menu-arrow"></span>
									</a>
									<ul>
										<li className="submenu submenu-two">
											<a href="#">Leaves<span
													className="menu-arrow inside-submenu"></span></a>
											<ul>
												<li><NavLink onClick={closeMobileMenu} to="/leaves">Leaves (Admin)</NavLink></li>
												<li><NavLink onClick={closeMobileMenu} to="/leaves-employee">Leave (Employee)</NavLink></li>
												<li><NavLink onClick={closeMobileMenu} to="/leave-settings">Leave Settings</NavLink></li>
											</ul>
										</li>
										<li><NavLink onClick={closeMobileMenu} to="/attendance-admin">Attendance (Admin)</NavLink></li>
										<li><NavLink onClick={closeMobileMenu} to="/attendance-employee">Attendance (Employee)</NavLink></li>
										<li><NavLink onClick={closeMobileMenu} to="/timesheets">Timesheets</NavLink></li>
										<li><NavLink onClick={closeMobileMenu} to="/schedule-timing">Shift & Schedule</NavLink></li>
										<li><NavLink onClick={closeMobileMenu} to="/shift-swap-requests">Shift Swap Requests <span
													className="badge badge-danger fs-10 fw-medium text-white p-1">New</span>
											</NavLink></li>
										<li><NavLink onClick={closeMobileMenu} to="/overtime">Overtime</NavLink></li>
										<li><NavLink onClick={closeMobileMenu} to="/holiday-calendar">Holiday Calendar <span
													className="badge badge-danger fs-10 fw-medium text-white p-1">New</span>
											</NavLink></li>
										<li><NavLink onClick={closeMobileMenu} to="/work-from-home">WFH Management <span
													className="badge badge-danger fs-10 fw-medium text-white p-1">New</span>
											</NavLink></li>
									</ul>
								</li>
								<li className="submenu">
									<a href="#">
										<i className="ti ti-school"></i><span>Performance</span>
										<span className="menu-arrow"></span>
									</a>
									<ul>
										<li><NavLink onClick={closeMobileMenu} to="/performance-indicator">Performance Indicator</NavLink></li>
										<li><NavLink onClick={closeMobileMenu} to="/performance-review">Performance Review</NavLink></li>
										<li><NavLink onClick={closeMobileMenu} to="/performance-appraisal">Performance Appraisal</NavLink></li>
										<li><NavLink onClick={closeMobileMenu} to="/goal-tracking">Goal List</NavLink></li>
										<li><NavLink onClick={closeMobileMenu} to="/goal-type">Goal Type</NavLink></li>
									</ul>
								</li>
								<li className="submenu">
									<a href="#">
										<i className="ti ti-edit"></i><span>Training</span>
										<span className="menu-arrow"></span>
									</a>
									<ul>
										<li><NavLink onClick={closeMobileMenu} to="/training">Training List</NavLink></li>
										<li><NavLink onClick={closeMobileMenu} to="/trainers">Trainers</NavLink></li>
										<li><NavLink onClick={closeMobileMenu} to="/training-type">Training Type</NavLink></li>
										<li><NavLink onClick={closeMobileMenu} to="/certification-tracking">Certification Tracking <span
													className="badge badge-danger fs-10 fw-medium text-white p-1">New</span>
											</NavLink></li>
										<li><NavLink onClick={closeMobileMenu} to="/learning-analytics">Learning Analytics <span
													className="badge badge-danger fs-10 fw-medium text-white p-1">New</span>
											</NavLink></li>
									</ul>
								</li>

								<li>
									<NavLink onClick={closeMobileMenu} to="/probation-management">
										<i className="ti ti-hourglass-empty"></i><span>Probation Management</span>
										<span className="badge badge-danger fs-10 fw-medium text-white p-1">New</span>
									</NavLink>
								</li>
								<li>
									<NavLink onClick={closeMobileMenu} to="/notice-period-tracker">
										<i className="ti ti-calendar-stats"></i><span>Notice Period Tracker</span>
										<span className="badge badge-danger fs-10 fw-medium text-white p-1">New</span>
									</NavLink>
								</li>
								<li>
									<NavLink onClick={closeMobileMenu} to="/promotion">
										<i className="ti ti-speakerphone"></i><span>Promotion</span>
									</NavLink>
								</li>
								<li>
									<NavLink onClick={closeMobileMenu} to="/resignation">
										<i className="ti ti-external-link"></i><span>Resignation</span>
									</NavLink>
								</li>
								<li>
									<NavLink onClick={closeMobileMenu} to="/termination">
										<i className="ti ti-circle-x"></i><span>Termination</span>
									</NavLink>
								</li>
							</ul>
						</li>
						<li className="menu-title"><span>RECRUITMENT</span></li>
						<li>
							<ul>
								<li>
									<NavLink onClick={closeMobileMenu} to="/job-grid">
										<i className="ti ti-briefcase-2"></i><span>Jobs</span>
									</NavLink>
								</li>
								<li>
									<NavLink onClick={closeMobileMenu} to="/candidates-grid">
										<i className="ti ti-user-star"></i><span>Candidates</span>
									</NavLink>
								</li>
								<li>
									<NavLink onClick={closeMobileMenu} to="/refferals">
										<i className="ti ti-user-plus"></i><span>Referrals</span>
									</NavLink>
								</li>
								<li>
									<NavLink onClick={closeMobileMenu} to="/resume-parsing">
										<i className="ti ti-file-search"></i><span>Resume Parsing</span>
										<span className="badge badge-danger fs-10 fw-medium text-white p-1">New</span>
									</NavLink>
								</li>
								<li>
									<NavLink onClick={closeMobileMenu} to="/campus-hiring">
										<i className="ti ti-school"></i><span>Campus Hiring</span>
										<span className="badge badge-danger fs-10 fw-medium text-white p-1">New</span>
									</NavLink>
								</li>
							</ul>
						</li>
						<li className="menu-title"><span>FINANCE & ACCOUNTS</span></li>
						<li>
							<ul>
								<li className="submenu">
									<a href="#">
										<i className="ti ti-shopping-cart-dollar"></i><span>Sales</span>
										<span className="menu-arrow"></span>
									</a>
									<ul>
										<li><NavLink onClick={closeMobileMenu} to="/estimates">Estimates</NavLink></li>
										<li><NavLink onClick={closeMobileMenu} to="/invoices">Invoices</NavLink></li>
										<li><NavLink onClick={closeMobileMenu} to="/payments">Payments</NavLink></li>
										<li><NavLink onClick={closeMobileMenu} to="/expenses">Expenses</NavLink></li>
										<li><NavLink onClick={closeMobileMenu} to="/provident-fund">Provident Fund</NavLink></li>
										<li><NavLink onClick={closeMobileMenu} to="/taxes">Taxes</NavLink></li>
									</ul>
								</li>
								<li className="submenu">
									<a href="#">
										<i className="ti ti-file-dollar"></i><span>Accounting</span>
										<span className="menu-arrow"></span>
									</a>
									<ul>
										<li><NavLink onClick={closeMobileMenu} to="/categories">Categories</NavLink></li>
										<li><NavLink onClick={closeMobileMenu} to="/budgets">Budgets</NavLink></li>
										<li><NavLink onClick={closeMobileMenu} to="/budget-expenses">Budget Expenses</NavLink></li>
										<li><NavLink onClick={closeMobileMenu} to="/budget-revenues">Budget Revenues</NavLink></li>
									</ul>
								</li>
								<li className="submenu">
									<a href="#">
										<i className="ti ti-cash"></i><span>Payroll</span>
										<span className="menu-arrow"></span>
									</a>
									<ul>
										<li><NavLink onClick={closeMobileMenu} to="/employee-salary">Employee Salary</NavLink></li>
										<li><NavLink onClick={closeMobileMenu} to="/payslip">Payslip</NavLink></li>
										<li><NavLink onClick={closeMobileMenu} to="/payroll">Payroll Items</NavLink></li>
									</ul>
								</li>
							</ul>
						</li>
						<li className="menu-title"><span>ADMINISTRATION</span></li>
						<li>
							<ul>
								<li className="submenu">
									<a href="#">
										<i className="ti ti-cash"></i><span>Assets</span>
										<span className="menu-arrow"></span>
									</a>
									<ul>
										<li><NavLink onClick={closeMobileMenu} to="/assets">Assets</NavLink></li>
										<li><NavLink onClick={closeMobileMenu} to="/asset-categories">Asset Categories</NavLink></li>
									</ul>
								</li>
								<li className="submenu">
									<a href="#">
										<i className="ti ti-headset"></i><span>Help & Supports</span>
										<span className="menu-arrow"></span>
									</a>
									<ul>
										<li><NavLink onClick={closeMobileMenu} to="/knowledgebase">Knowledge Base</NavLink></li>
										<li><NavLink onClick={closeMobileMenu} to="/activity">Activities</NavLink></li>
									</ul>
								</li>
								<li className="submenu">
									<a href="#">
										<i className="ti ti-user-cog"></i><span>User Management</span>
										<span className="menu-arrow"></span>
									</a>
									<ul>
										<li><NavLink onClick={closeMobileMenu} to="/users">Users</NavLink></li>
										<li><NavLink onClick={closeMobileMenu} to="/roles-permissions">Roles & Permissions</NavLink></li>
									</ul>
								</li>
								<li className="submenu">
									<a href="#">
										<i className="ti ti-user-star"></i><span>Reports</span>
										<span className="menu-arrow"></span>
									</a>
									<ul>
										<li><NavLink onClick={closeMobileMenu} to="/expenses-report">Expense Report</NavLink></li>
										<li><NavLink onClick={closeMobileMenu} to="/gst-reports">GST Reports</NavLink></li>
										<li><NavLink onClick={closeMobileMenu} to="/invoice-report">Invoice Report</NavLink></li>
										<li><NavLink onClick={closeMobileMenu} to="/payment-report">Payment Report</NavLink></li>
										<li><NavLink onClick={closeMobileMenu} to="/project-report">Project Report</NavLink></li>
										<li><NavLink onClick={closeMobileMenu} to="/task-report">Task Report</NavLink></li>
										<li><NavLink onClick={closeMobileMenu} to="/user-report">User Report</NavLink></li>
										<li><NavLink onClick={closeMobileMenu} to="/employee-report">Employee Report</NavLink></li>
										<li><NavLink onClick={closeMobileMenu} to="/payslip-report">Payslip Report</NavLink></li>
										<li><NavLink onClick={closeMobileMenu} to="/attendance-report">Attendance Report</NavLink></li>
										<li><NavLink onClick={closeMobileMenu} to="/leave-report">Leave Report</NavLink></li>
										<li><NavLink onClick={closeMobileMenu} to="/daily-report">Daily Report</NavLink></li>
									</ul>
								</li>
								<li className="submenu">
									<a href="#">
										<i className="ti ti-settings"></i><span>Settings</span>
										<span className="menu-arrow"></span>
									</a>
									<ul>
										<li><NavLink onClick={closeMobileMenu} to="/profile-settings">Profile</NavLink></li>
										<li><NavLink onClick={closeMobileMenu} to="/security-settings">Security</NavLink></li>
										<li><NavLink onClick={closeMobileMenu} to="/notification-settings">Notifications</NavLink></li>
									</ul>
								</li>
							</ul>
						</li>
						<li className="menu-title"><span>ADMIN CONSOLE</span></li>
						<li>
							<ul>
								<li>
									<NavLink onClick={closeMobileMenu} to="/user-management">
										<i className="ti ti-users"></i><span>User Management</span>
									</NavLink>
								</li>
							</ul>
						</li>
						<li className="menu-title"><span>CONTENT</span></li>
						<li>
							<ul>
								<li>
									<NavLink onClick={closeMobileMenu} to="/pages">
										<i className="ti ti-box-multiple"></i><span>Pages</span>
									</NavLink>
								</li>
								<li className="submenu">
									<a href="#">
										<i className="ti ti-brand-blogger"></i><span>Blogs</span>
										<span className="menu-arrow"></span>
									</a>
									<ul>
										<li><NavLink onClick={closeMobileMenu} to="/blogs">All Blogs</NavLink></li>
										<li><NavLink onClick={closeMobileMenu} to="/blog-categories">Categories</NavLink></li>
										<li><NavLink onClick={closeMobileMenu} to="/blog-comments">Comments</NavLink></li>
										<li><NavLink onClick={closeMobileMenu} to="/blog-tags">Blog Tags</NavLink></li>
									</ul>
								</li>
								<li className="submenu">
									<a href="#">
										<i className="ti ti-map-pin-check"></i><span>Locations</span>
										<span className="menu-arrow"></span>
									</a>
									<ul>
										<li><NavLink onClick={closeMobileMenu} to="/countries">Countries</NavLink></li>
										<li><NavLink onClick={closeMobileMenu} to="/states">States</NavLink></li>
										<li><NavLink onClick={closeMobileMenu} to="/cities">Cities</NavLink></li>
									</ul>
								</li>
								<li>
									<NavLink onClick={closeMobileMenu} to="/testimonials">
										<i className="ti ti-message-2"></i><span>Testimonials</span>
									</NavLink>
								</li>
								<li>
									<NavLink onClick={closeMobileMenu} to="/faq">
										<i className="ti ti-question-mark"></i><span>FAQ’S</span>
									</NavLink>
								</li>
							</ul>
						</li>
						<li className="menu-title"><span>PAGES</span></li>
						<li>
							<ul>
							
								<li>
									<NavLink onClick={closeMobileMenu} to="/profile">
										<i className="ti ti-user-circle"></i><span>Profile</span>
									</NavLink>
								</li>
								<li>
									<NavLink onClick={closeMobileMenu} to="/gallery">
										<i className="ti ti-photo"></i><span>Gallery</span>
									</NavLink>
								</li>
								
								<li>
									<NavLink onClick={closeMobileMenu} to="/timeline">
										<i className="ti ti-timeline"></i><span>Timeline</span>
									</NavLink>
								</li>
								<li>
									<NavLink onClick={closeMobileMenu} to="/pricing">
										<i className="ti ti-file-dollar"></i><span>Pricing</span>
									</NavLink>
								</li>
								
								
								
								<li>
									<NavLink onClick={closeMobileMenu} to="/api-keys">
										<i className="ti ti-api"></i><span>API Keys</span>
									</NavLink>
								</li>
								<li>
									<NavLink onClick={closeMobileMenu} to="/privacy-policy">
										<i className="ti ti-file-description"></i><span>Privacy Policy</span>
									</NavLink>
								</li>
								<li>
									<NavLink onClick={closeMobileMenu} to="/terms-condition">
										<i className="ti ti-file-check"></i><span>Terms & Conditions</span>
									</NavLink>
								</li>
							</ul>
						</li>
						<li className="menu-title"><span>AUTHENTICATION</span></li>
						<li>
							<ul>
								<li className="submenu">
									<a href="#">
										<i className="ti ti-login"></i><span>Login</span><span className="menu-arrow"></span>
									</a>
									<ul>
										
										<li><NavLink onClick={closeMobileMenu} to="/login2">Illustration</NavLink></li>
										
									</ul>
								</li>
								<li className="submenu">
									<a href="#">
										<i className="ti ti-forms"></i><span>Register</span><span className="menu-arrow"></span>
									</a>
									<ul>
										
										<li><NavLink onClick={closeMobileMenu} to="/register">Illustration</NavLink></li>
										
									</ul>
								</li>
								<li className="submenu">
									<a href="#">
										<i className="ti ti-help-triangle"></i><span>Forgot Password</span><span
											className="menu-arrow"></span>
									</a>
									<ul>
										
										<li><NavLink onClick={closeMobileMenu} to="/forgot-password">Illustration</NavLink></li>
										
									</ul>
								</li>
								<li className="submenu">
									<a href="#">
										<i className="ti ti-restore"></i><span>Reset Password</span><span
											className="menu-arrow"></span>
									</a>
									<ul>
										
										<li><NavLink onClick={closeMobileMenu} to="/reset-password">Illustration</NavLink></li>
										
									</ul>
								</li>
								<li className="submenu">
									<a href="#">
										<i className="ti ti-mail-exclamation"></i><span>Email Verification</span><span
											className="menu-arrow"></span>
									</a>
									<ul>
										
										<li><NavLink onClick={closeMobileMenu} to="/email-verification">Illustration</NavLink></li>
										
									</ul>
								</li>
								<li className="submenu">
									<a href="#">
										<i className="ti ti-password"></i><span>2 Step Verification</span><span
											className="menu-arrow"></span>
									</a>
									<ul>
										<li><NavLink onClick={closeMobileMenu} to="/two-step-verification">Illustration</NavLink></li>
									</ul>
								</li>
								<li><NavLink onClick={closeMobileMenu} to="/lock-screen"><i className="ti ti-lock-square"></i><span>Lock
											Screen</span></NavLink></li>
								<li><NavLink onClick={closeMobileMenu} to="/error404"><i className="ti ti-error-404"></i><span>404 Error</span></NavLink>
								</li>
								<li><NavLink onClick={closeMobileMenu} to="/error500"><i className="ti ti-server"></i><span>500 Error</span></NavLink></li>
							</ul>
						</li>
						
					</ul>
          */}
				</div>
				</Scrollbars>
			</div>
			</div>
		</div>
		{/* /Sidebar */}
    </>
  );
};

export default Sidebar;
