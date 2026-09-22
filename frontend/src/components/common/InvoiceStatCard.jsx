import React from 'react';

const InvoiceStatCard = ({ title, value, trendValue, trendColor, icon, iconColor, badgeColor = "", colClass = "col-xl-3 col-sm-6 d-flex" }) => {
  const badgeClass = badgeColor ? `invoice-report-badge-${badgeColor}` : 'invoice-report-badge';
  
  return (
    <div className={colClass}>
      <div className="card invoice-report flex-fill">
        <span className={badgeClass}></span>
        <div className="card-body d-flex flex-wrap align-items-center justify-content-between">
          <div className="d-flex align-items-center flex-column overflow-hidden">
            <div>
              <div>
                <span className="fs-14 fw-normal text-truncate mb-1">{title}</span>
                <h5>{value}</h5>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-center flex-wrap">
            <span className={`badge badge-sm badge-${trendColor} me-3`}>{trendValue}</span>
            <a href="#" onClick={(e) => e.preventDefault()} className={`avatar avatar-md br-10 bg-transparent-${iconColor} border border-${iconColor}`}>
              <span className={`text-${iconColor}`}><i className={`ti ${icon}`}></i></span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceStatCard;
