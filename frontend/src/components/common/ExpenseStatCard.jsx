import React from 'react';

const ExpenseStatCard = ({ title, value, icon, iconColor, bgImage, trendValue, trendColor, trendText = "from last week" }) => {
  return (
    <div className="col-xl-3 col-sm-6 d-flex">
      <div className="card flex-fill position-relative">
        <span className="position-absolute start-0 bottom-0">
          <img src={bgImage} alt="img" className="img-fluid" />
        </span>
        <div className="card-body">
          <div className="d-flex align-items-center justify-content-between mb-2">
            <div>
              <span className="fs-14 fw-normal text-truncate mb-1">{title}</span>
              <h5>{value}</h5>
            </div>
            <a href="#" onClick={(e) => e.preventDefault()}
              className={`avatar avatar-md avatar-rounded bg-transparent-${iconColor} border border-${iconColor}`}>
              <span className={`text-${iconColor}`}><i className={icon.startsWith('ti ') ? icon : `ti ${icon}`}></i></span>
            </a>
          </div>
          {trendValue && (
            <p className="fs-12 fw-normal d-flex align-items-center text-truncate">
              <span className={`text-${trendColor} fs-12 d-flex align-items-center me-1`}>
                <i className={`ti ${trendValue.startsWith('-') ? 'ti-arrow-wave-right-down' : 'ti-arrow-wave-right-up'} me-1`}></i>{trendValue}
              </span> {trendText}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExpenseStatCard;
