import React from 'react';

const ClientStatCard = ({ 
  title, 
  value, 
  icon, 
  iconBgClass, 
  iconColorClass, 
  badgeClass, 
  badgeIcon, 
  percentage,
  colClass = "col-xl-3 col-md-6 d-flex"
}) => {
  return (
    <div className={colClass}>
      <div className="card flex-fill">
        <div className="card-body">
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              <div className="flex-shrink-0 me-2">
                <span className={`p-2 br-10 ${iconBgClass} d-flex align-items-center justify-content-center`}>
                  <i className={`${icon} ${iconColorClass || ''} fs-18`}></i>
                </span>
              </div>
              <div>
                <p className="fs-12 fw-medium mb-0 text-gray-5 mb-1">{title}</p>
                <h4>{value}</h4>
              </div>
            </div>
            {percentage && (
              <span className={`badge ${badgeClass} d-inline-flex align-items-center fw-normal`}>
                <i className={`${badgeIcon} me-1`}></i>
                {percentage}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientStatCard;
