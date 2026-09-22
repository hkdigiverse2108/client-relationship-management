import React from 'react';
import { Link } from 'react-router-dom';

const PageHeader = ({ title, breadcrumbs, rightContentClass = '', children }) => {
  return (
    <div className="d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-3">
      <div className="my-auto mb-2">
        <h2 className="mb-1">{title}</h2>
        <nav>
          <ol className="breadcrumb mb-0">
            <li className="breadcrumb-item">
              <Link to="/"><i className="ti ti-smart-home"></i></Link>
            </li>
            {breadcrumbs.slice(1).map((crumb, index) => (
              <li 
                key={index} 
                className={`breadcrumb-item ${crumb.active ? 'active' : ''}`}
                aria-current={crumb.active ? 'page' : undefined}
              >
                {crumb.label}
              </li>
            ))}
          </ol>
        </nav>
      </div>
      {children && (
        <div className={`d-flex my-xl-auto right-content align-items-center flex-wrap ${rightContentClass}`}>
          {children}
        </div>
      )}
    </div>
  );
};

export default PageHeader;
