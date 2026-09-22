import React from 'react';

const ReportProgressCard = ({ title, value, progressBarColor, progressPercent, trendIcon, trendColor, trendValue, trendText }) => {
  return (
    <div className="col-lg-6 col-md-6 d-flex">
      <div className="card flex-fill">
        <div className="card-body">
          <div>
            <div className="mb-2">
              <span className="fs-14 fw-normal text-truncate mb-1">{title}</span>
              <h5>{value}</h5>
            </div>
            <div className="progress" role="progressbar" aria-label="Basic example" aria-valuenow={progressPercent} aria-valuemin="0" aria-valuemax="100" style={{ width: '100%', height: '5px' }}>
              <div className={`progress-bar bg-${progressBarColor}`} style={{ width: `${progressPercent}%` }}></div>
            </div>
          </div>
          <div className="d-flex mt-2">
            <p className="fs-12 fw-normal d-flex align-items-center text-truncate">
              <span className={`text-${trendColor} fs-12 d-flex align-items-center me-1`}>
                <i className={`ti ${trendIcon} me-1`}></i>{trendValue}
              </span>
              {trendText}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportProgressCard;
