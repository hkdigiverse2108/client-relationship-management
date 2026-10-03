import React from "react";
import { Navigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { menuConfig } from "../config/menuConfig";

const AccessDenied = () => (
  <div className="d-flex flex-column justify-content-center align-items-center bg-light" style={{ minHeight: '100vh', width: '100vw' }}>
     <div className="mb-2">
      <i className="ti ti-shield-lock" style={{ fontSize: '6rem' }}></i>
    </div>
    <h1 className="display-1 fw-bold text-danger">403</h1>
    <h2 className="mb-4">Access Denied</h2>
    <p className="text-muted mb-4">You do not have permission to view this page. Please contact your administrator.</p>
    <Link to="/dashboard" className="btn btn-primary">Return to Dashboard</Link>
  </div>
);

/**
 * ProtectedRoute — Guards authenticated routes and enforces RBAC based on menuConfig.
 */
export default function ProtectedRoute({ children }) {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (user?.role === 'Super Admin') {
    return children;
  }

  // Check if the current route is protected by RBAC
  let isPathProtected = false;
  menuConfig.forEach(section => {
    section.items.forEach(item => {
      if (item.subMenu) {
        item.subMenu.forEach(sub => {
          if (sub.path === location.pathname) isPathProtected = true;
        });
      } else {
        if (item.path === location.pathname) isPathProtected = true;
      }
    });
  });

  if (isPathProtected) {
    const hasViewAccess = user?.permissions && user.permissions[location.pathname]?.view;
    if (!hasViewAccess) {
      return <AccessDenied />;
    }
  }

  return children;
}
