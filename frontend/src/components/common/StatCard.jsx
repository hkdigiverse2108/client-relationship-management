import React from 'react';

const StatCard = ({ title, value, icon, iconColor = "primary", colClass = "col-xl-3 col-md-6" }) => {
  return (
    <div className={colClass}>
      <div className="card">
        <div className="card-body">
          <div className="d-flex align-items-center flex-wrap justify-content-between">
            <div>
              <p className="fs-12 fw-medium mb-0 text-gray-5">{title}</p>
              <h4>{value}</h4>
            </div>
            <div>
              <span className={`p-2 br-10 bg-transparent-${iconColor} border border-${iconColor} d-flex align-items-center justify-content-center`}>
                <i className={`ti ${icon} text-${iconColor} fs-18`}></i>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
