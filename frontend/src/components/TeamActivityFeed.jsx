import React from 'react';

const TeamActivityFeed = () => {
  return (
    <div className="card flex-fill w-100">
      <div className="card-body">
        <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-2">
          <h3 className="mb-0 card-title">Activity Feed</h3>
        
        </div>

        <div className="">
          <div className="d-flex align-items-center justify-content-between mb-3 p-2 br-5">
            <div className="d-flex align-items-center">
              <span
                className="avatar rounded-circle bg-transparent-primary text-primary mb-2 flex-shrink-0">
                <i className="ti ti-brand-hipchat fs-16"></i>
              </span>
              <div className="ms-3">
                <h4 className="fs-14 fw-medium text-truncate mb-1">Michael Chen replied to
                  TKT-1247</h4>
                <p className="fs-13 mb-1">Added troubleshooting steps for connect</p>
                <p className="fs-13"><i className="ti ti-clock-record"></i> 5 min ago</p>
              </div>
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-between mb-3 p-2 br-5">
            <div className="d-flex align-items-center">
              <span
                className="avatar rounded-circle bg-transparent-secondary text-secondary mb-2 flex-shrink-0">
                <i className="ti ti-user fs-16"></i>
              </span>
              <div className="ms-3">
                <h4 className="fs-14 fw-medium text-truncate mb-1">New ticket assigned to
                  Sarah Johnson</h4>
                <p className="fs-13 mb-1">TKT-1248: Network connectivity issues</p>
                <p className="fs-13"><i className="ti ti-clock-record"></i> 12 min ago</p>
              </div>
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-between mb-3 p-2 br-5">
            <div className="d-flex align-items-center">
              <span
                className="avatar rounded-circle bg-transparent-success text-success mb-2 flex-shrink-0">
                <i className="ti ti-checklist fs-16"></i>
              </span>
              <div className="ms-3">
                <h4 className="fs-14 fw-medium text-truncate mb-1">TKT-1240 marked as
                  resolved</h4>
                <p className="fs-13 mb-1">Password reset completed successfully</p>
                <p className="fs-13"><i className="ti ti-clock-record"></i> 34 min ago</p>
              </div>
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-between mb-3 p-2 br-5">
            <div className="d-flex align-items-center">
              <span
                className="avatar rounded-circle bg-transparent-danger text-danger mb-2 flex-shrink-0">
                <i className="ti ti-calendar-x fs-16"></i>
              </span>
              <div className="ms-3">
                <h4 className="fs-14 fw-medium text-truncate mb-1">SLA deadline approaching
                </h4>
                <p className="fs-13 mb-1">TKT-1239 has 2 hours remaining</p>
                <p className="fs-13"><i className="ti ti-clock-record"></i> 45 min ago</p>
              </div>
            </div>
          </div>
        </div>
      
      </div>
    </div>
  );
};

export default TeamActivityFeed;
