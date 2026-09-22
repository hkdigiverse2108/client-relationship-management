import React from 'react';

const PaymentStatCard = ({ 
  title, 
  value, 
  icon = "ti-currency-dollar", 
  iconColor, 
  trendValue, 
  trendColor, 
  colClass = "col-xl-3 col-md-6 d-flex" 
}) => {
  return (
    <div className={colClass}>
      <div className="card flex-fill">
        <div className="card-body">
          <div className="d-flex flex-wrap align-items-center justify-content-between border-bottom pb-2">
            <div className="d-flex align-items-center flex-column overflow-hidden">
              <div>
                <div>
                  <span className="fs-14 fw-normal text-truncate mb-1">{title}</span>
                  <h5>{value}</h5>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-center flex-wrap">
              <a href="#" onClick={(e) => e.preventDefault()}
                className={`avatar avatar-md br-5 payment-report-icon bg-transparent-${iconColor} border border-${iconColor}`}>
                <span className={`text-${iconColor}`}><i className={`ti ${icon}`}></i></span>
              </a>
            </div>
          </div>
          <div className="d-flex justify-content-center mt-2">
            <p className="fs-12 fw-normal d-flex align-items-center text-truncate">
              <span className={`text-${trendColor} fs-12 d-flex align-items-center me-1`}>
                <i className="ti ti-arrow-wave-right-up me-1"></i>{trendValue}
              </span> 
              from last week
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentStatCard;
