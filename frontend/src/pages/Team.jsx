import React from 'react';
import PageHeader from '../components/common/PageHeader';
import { BacklogGrowthChart } from '../components/charts/HelpDeskCharts';
import { TicketCategoryChart } from '../components/charts/ChartJSComponents';
import TeamRosterTable from '../components/TeamRosterTable';
import TeamActivityFeed from '../components/TeamActivityFeed';

const Team = () => {
  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          {/* Breadcrumb */}
          <PageHeader 
            title="Team Dashboard"
            breadcrumbs={[
              { label: 'Dashboard' },
              { label: 'Dashboard' },
              { label: 'Team', active: true }
            ]}
          />
          {/* /Breadcrumb */}

          <div className="row">
					{/* Total Plans */}
					<div className="col-lg-3 col-md-6 d-flex">
						<div className="card flex-fill">
							<div className="card-body d-flex align-items-center justify-content-between">
								<div className="d-flex align-items-center overflow-hidden">
									<div>
										<span className="avatar avatar-lg bg-dark rounded-circle"><i
												className="ti ti-users"></i></span>
									</div>
									<div className="ms-2 overflow-hidden">
										<p className="fs-12 fw-medium mb-1 text-truncate">Active Members</p>
										<h4>1007</h4>
									</div>
								</div>
								<div>
									<span className="badge badge-soft-purple badge-sm fw-normal">
										<i className="ti ti-arrow-wave-right-down"></i>
										+19.01%
									</span>
								</div>
							</div>
						</div>
					</div>
					{/* /Total Plans */}

					{/* Total Plans */}
					<div className="col-lg-3 col-md-6 d-flex">
						<div className="card flex-fill">
							<div className="card-body d-flex align-items-center justify-content-between">
								<div className="d-flex align-items-center overflow-hidden">
									<div>
										<span className="avatar avatar-lg bg-success rounded-circle"><i
												className="ti ti-briefcase"></i></span>
									</div>
									<div className="ms-2 overflow-hidden">
										<p className="fs-12 fw-medium mb-1 text-truncate">Active Deals
</p>
										<h4>1007</h4>
									</div>
								</div>
								<div>
									<span className="badge badge-soft-primary badge-sm fw-normal">
										<i className="ti ti-arrow-wave-right-down"></i>
										+19.01%
									</span>
								</div>
							</div>
						</div>
					</div>
					{/* /Total Plans */}

					{/* Inactive Plans */}
					<div className="col-lg-3 col-md-6 d-flex">
						<div className="card flex-fill">
							<div className="card-body d-flex align-items-center justify-content-between">
								<div className="d-flex align-items-center overflow-hidden">
									<div>
										<span className="avatar avatar-lg bg-danger rounded-circle"><i
												className="ti ti-folder"></i></span>
									</div>
									<div className="ms-2 overflow-hidden">
										<p className="fs-12 fw-medium mb-1 text-truncate">Active Projects</p>
										<h4>1007</h4>
									</div>
								</div>
								<div>
									<span className="badge badge-soft-dark badge-sm fw-normal">
										<i className="ti ti-arrow-wave-right-down"></i>
										+19.01%
									</span>
								</div>
							</div>
						</div>
					</div>
					{/* /Inactive Companies */}

					{/* No of Plans  */}
					<div className="col-lg-3 col-md-6 d-flex">
						<div className="card flex-fill">
							
							<div className="card-body d-flex align-items-center justify-content-between">
								<div className="d-flex align-items-center overflow-hidden">
									<div>
										<span className="avatar avatar-lg bg-info rounded-circle"><i
												className="ti ti-activity"></i></span>
									</div>
									<div className="ms-2 overflow-hidden">
										<p className="fs-12 fw-medium mb-1 text-truncate">Recent Activity</p>
										<h4>67</h4>
									</div>
								</div>
								<div>
									<span className="badge badge-soft-secondary badge-sm fw-normal">
										<i className="ti ti-arrow-wave-right-down"></i>
										+19.01%
									</span>
								</div>
							</div>
						</div>
					</div>
					{/* /No of Plans */}
				  </div>

          <div className="row">
            {/* Workload Distribution Chart */}
            <div className="col-xl-6 d-flex">
              <div className="card flex-fill mb-0">
                <div className="card-body">
                  <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
                    <h3 className="mb-0 card-title">Workload Distribution</h3>
                    <div className="dropdown">
                      <a href="#" onClick={(e) => e.preventDefault()}
                        className="border btn btn-white btn-md fw-normal d-inline-flex align-items-center justify-content-center rounded gap-1 fw-medium"
                        data-bs-toggle="dropdown">
                        <i className="ti ti-calendar fs-14"></i> Monthly
                      </a>
                      <ul className="dropdown-menu mt-2 p-3">
                        <li>
                          <a href="#" onClick={(e) => e.preventDefault()} className="dropdown-item rounded-1">
                            Today
                          </a>
                        </li>
                        <li>
                          <a href="#" onClick={(e) => e.preventDefault()} className="dropdown-item rounded-1">
                            Weekly
                          </a>
                        </li>
                        <li>
                          <a href="#" onClick={(e) => e.preventDefault()} className="dropdown-item rounded-1">
                            Monthly
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <BacklogGrowthChart />

                  <p className="mb-0 gap-2 text-dark text-center">
                    <span className="badge bg-success rounded-circle p-1 me-2">
                      <i className="ti ti-caret-up-filled text-white fs-14"></i>
                    </span>
                    12% Compared to Last Week
                  </p>
                </div>
              </div>
            </div>
            {/* /Workload Distribution Chart */}

            {/* Team Composition Chart */}
            <div className="col-xl-6 d-flex">
              <div className="card flex-fill mb-0">
                <div className="card-body">
                  <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-2">
                    <h3 className="mb-0 card-title">Team Composition</h3>
                    <div className="dropdown">
                      <a href="#" onClick={(e) => e.preventDefault()}
                        className="border btn btn-white btn-md fw-normal d-inline-flex align-items-center justify-content-center rounded gap-1 fw-medium"
                        data-bs-toggle="dropdown">
                        <i className="ti ti-calendar fs-14"></i> Monthly
                      </a>
                      <ul className="dropdown-menu mt-2 p-3">
                        <li>
                          <a href="#" onClick={(e) => e.preventDefault()} className="dropdown-item rounded-1">
                            Today
                          </a>
                        </li>
                        <li>
                          <a href="#" onClick={(e) => e.preventDefault()} className="dropdown-item rounded-1">
                            Weekly
                          </a>
                        </li>
                        <li>
                          <a href="#" onClick={(e) => e.preventDefault()} className="dropdown-item rounded-1">
                            Monthly
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="position-relative mb-4" style={{height: '200px'}}>
                    <TicketCategoryChart />
                    <div className="gauge-center-text">Compliance</div>
                  </div>

                  <div className="row row-gap-4">
                    <div className="col-lg-4 col-md-4">
                      <div className="border-5 border-start border-primary text-center">
                        <p className="fs-13 d-inline-flex align-items-center mb-1 fs-12">IT Support</p>
                        <h4 className="fs-14">485</h4>
                      </div>
                    </div>

                    <div className="col-lg-4 col-md-4">
                      <div className="border-5 border-start border-secondary text-center">
                        <p className="fs-13 d-inline-flex align-items-center mb-1 fs-12">HR</p>
                        <h4 className="fs-14">342</h4>
                      </div>
                    </div>

                    <div className="col-lg-4 col-md-4">
                      <div className="border-5 border-start border-success text-center">
                        <p className="fs-13 d-inline-flex align-items-center mb-1 fs-12">Payroll</p>
                        <h4 className="fs-14">268</h4>
                      </div>
                    </div>

                    <div className="col-lg-4 col-md-4">
                      <div className="border-5 border-start border-warning text-center">
                        <p className="fs-13 d-inline-flex align-items-center mb-1 fs-12">Access</p>
                        <h4 className="fs-14">195</h4>
                      </div>
                    </div>

                    <div className="col-lg-4 col-md-4">
                      <div className="border-5 border-start border-info text-center">
                        <p className="fs-13 d-inline-flex align-items-center mb-1 fs-12">Hardware</p>
                        <h4 className="fs-14">412</h4>
                      </div>
                    </div>

                    <div className="col-lg-4 col-md-4">
                      <div className="border-5 border-start border-danger text-center">
                        <p className="fs-13 d-inline-flex align-items-center mb-1 fs-12">Other</p>
                        <h4 className="fs-14">145</h4>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
            {/* /Team Composition Chart */}
          </div>

          <div className="row mt-4">
            <div className="col-xl-8 d-flex">
              <TeamRosterTable />
            </div>
            <div className="col-xl-4 d-flex">
              <TeamActivityFeed />
            </div>
          </div>
        </div>

        <div className="footer d-sm-flex align-items-center justify-content-between border-top bg-white p-3">
          <p className="mb-0">2014 - 2026 &copy; SmartHR.</p>
          <p>Designed &amp; Developed By <a href="#" onClick={(e) => e.preventDefault()} className="text-primary">Dreams</a></p>
        </div>
      </div>
    </>
  );
};

export default Team;
