import React from 'react';

const StatsCard = ({ title, value, icon, colorClass, children }) => {
  return (
    <div className="col-lg-3 col-md-6 d-flex">
      <div className="card flex-fill">
        <div className="card-body d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center overflow-hidden">
            <span className={`avatar avatar-lg ${colorClass} flex-shrink-0`}>
              <i className={`${icon} fs-16`}></i>
            </span>
            <div className="ms-2 overflow-hidden">
              <p className="fs-12 fw-medium mb-1 text-truncate">{title}</p>
              <h4>{value}</h4>
            </div>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
