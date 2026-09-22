import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import { FaCog } from 'react-icons/fa';

import Footer from './common/Footer';

const Layout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.documentElement.classList.add('menu-opened');
    } else {
      document.documentElement.classList.remove('menu-opened');
    }
  }, [isMobileMenuOpen]);

  return (
    <div className={`main-wrapper ${isMobileMenuOpen ? 'slide-nav' : ''}`}>
      <Header toggleMobileMenu={toggleMobileMenu} />
      <Sidebar closeMobileMenu={() => setIsMobileMenuOpen(false)} />
      
      <Outlet />
      
      <div className="page-wrapper" style={{ minHeight: 'auto', padding: '0' }}>
        <Footer />
      </div>
      
      {/* Theme Settings Toggle */}
      <div className="sidebar-contact">
        <div className="toggle-theme" data-bs-toggle="offcanvas" data-bs-target="#theme-setting">
          <FaCog className="fa-spin fs-22" />
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="sidebar-overlay opened" 
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default Layout;
