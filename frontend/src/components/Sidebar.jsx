import React, { useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { FiGrid } from "react-icons/fi";
import { useAuth } from '../context/AuthContext';
import { menuConfig } from '../config/menuConfig';

const Sidebar = ({ closeMobileMenu }) => {
  const location = useLocation();
  const { user } = useAuth();

  const hasAccess = (path) => {
    if (!user) return false;
    if (user.role === 'Super Admin') return true;
    return user.permissions && user.permissions[path] && user.permissions[path].view;
  };

  const hasAnyAccess = (items) => {
    if (!user) return false;
    if (user.role === 'Super Admin') return true;
    if (!items) return false;
    return items.some(item => {
      if (item.subMenu) {
        return item.subMenu.some(sub => hasAccess(sub.path));
      }
      return hasAccess(item.path);
    });
  };

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

          {/* DYNAMIC MENU FROM menuConfig */}
          <ul style={{ paddingTop: '15px' }}>
            <li>
              <ul>
                {menuConfig.map((section) => {
                  if (!hasAnyAccess(section.items)) return null;

                  return (
                    <li className="submenu" key={section.id}>
                      <a href="#">
                        <i className={section.icon}></i>
                        <span>{section.title}</span>
                        <span className="menu-arrow"></span>
                      </a>
                      <ul>
                        {section.items.map((item, idx) => {
                          if (item.subMenu) {
                            const showSubMenu = item.subMenu.some(sub => hasAccess(sub.path));
                            if (!showSubMenu) return null;

                            return (
                              <li className="submenu submenu-two" key={idx}>
                                <a href="#">
                                  {item.label}
                                  <span className="menu-arrow inside-submenu"></span>
                                </a>
                                <ul>
                                  {item.subMenu.map(subItem => (
                                    hasAccess(subItem.path) && (
                                      <li key={subItem.path}>
                                        <NavLink onClick={closeMobileMenu} to={subItem.path}>
                                          {subItem.label}
                                        </NavLink>
                                      </li>
                                    )
                                  ))}
                                </ul>
                              </li>
                            );
                          }

                          if (!hasAccess(item.path)) return null;

                          return (
                            <li key={item.path}>
                              <NavLink onClick={closeMobileMenu} to={item.path}>
                                {item.label}
                              </NavLink>
                            </li>
                          );
                        })}
                      </ul>
                    </li>
                  );
                })}
              </ul>
            </li>
          </ul>

      
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
