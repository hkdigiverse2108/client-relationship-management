import React from 'react';

const ChartStatCard = ({ 
  title, 
  value, 
  icon, 
  iconBgClass, 
  trendValue, 
  trendIcon, 
  trendBgClass, 
  colClass = "col-xl-3 col-sm-6 d-flex", 
  chart: ChartComponent 
}) => {
  return (
    <div className={colClass}>
      <div className="card mb-0 flex-fill">
        <div className="card-body">
          <div className="d-flex align-items-center flex-wrap gap-3 mb-3">
            <div className={`avatar avatar-lg ${iconBgClass} rounded-circle flex-shrink-0`}>
              <i className={`${icon} text-white fs-24`}></i>
            </div>
            <div>
              <p className="mb-1">{title}</p> 
              <div className="d-flex align-items-center gap-2">
                <h3 className="text-dark mb-0">{value}</h3>
                <div className="d-inline-flex align-items-center bg-light border rounded-pill text-dark p-1 ps-2"> 
                  {trendValue}
                  <span className={`${trendBgClass} btn-icon btn-sm rounded-circle d-flex align-items-center justify-content-center ms-1`}>
                    <i className={`${trendIcon} fs-20 text-white`}></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
          {ChartComponent && <ChartComponent />}
        </div>
      </div>
    </div>
  );
};

export default ChartStatCard;
