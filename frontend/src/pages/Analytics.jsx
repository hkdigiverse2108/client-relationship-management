import React from 'react';
import { Sparkline1, Sparkline2, Sparkline3, Sparkline4 } from '../components/charts/SubscriptionSparklines';
import RecurringRevenueChart from '../components/charts/RecurringRevenueChart';
import RevenueServiceChart from '../components/charts/RevenueServiceChart';
import PageHeader from '../components/common/PageHeader';

const Analytics = () => {
  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          {/* Breadcrumb */}
          <PageHeader 
            title="Analytics Dashboard"
            breadcrumbs={[
              { label: 'Dashboard' },
              { label: 'Dashboard' },
              { label: 'Analytics', active: true }
            ]}
          />
          {/* /Breadcrumb */}

          <div className="row">
            <div className="col-xl-3 col-md-6 d-flex">
              <div className="card flex-fill">
                
                <div className="card-body ">
                  <div className="border-bottom pb-3 mb-3">
                    <div className="row align-items-center">
                      <div className="col-7">
                        <div>
                          <span className="fs-14 fw-normal text-truncate mb-1">Total Revenue</span>
                          <h5>₹10,340</h5>
                        </div>
                      </div>
                      <div className="col-5">
                        <div>
                          <Sparkline1 />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex">
                    <p className="fs-12 fw-normal d-flex align-items-center text-truncate">
                      <span className="text-primary fs-12 d-flex align-items-center me-1">
                        <i className="ti ti-arrow-wave-right-up me-1"></i>+19.01%</span>from last week
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-md-6 d-flex">
              <div className="card flex-fill">
                
                <div className="card-body ">
                  <div className="border-bottom pb-3 mb-3">
                    <div className="row align-items-center">
                      <div className="col-7">
                        <div>
                          <span className="fs-14 fw-normal text-truncate mb-1">Net Profit</span>
                          <h5>600</h5>
                        </div>
                      </div>
                      <div className="col-5">
                        <div>
                          <Sparkline2 />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex">
                    <p className="fs-12 fw-normal d-flex align-items-center text-truncate">
                      <span className="text-primary fs-12 d-flex align-items-center me-1">
                        <i className="ti ti-arrow-wave-right-up me-1"></i>+19.01%</span>from last week
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-md-6 d-flex">
              <div className="card flex-fill">
                
                <div className="card-body ">
                  <div className="border-bottom pb-3 mb-3">
                    <div className="row align-items-center">
                      <div className="col-7">
                        <div>
                          <span className="fs-14 fw-normal text-truncate mb-1">MRR</span>
                          <h5>560</h5>
                        </div>
                      </div>
                      <div className="col-5">
                        <div>
                          <Sparkline3 />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex">
                    <p className="fs-12 fw-normal d-flex align-items-center text-truncate">
                      <span className="text-primary fs-12 d-flex align-items-center me-1">
                        <i className="ti ti-arrow-wave-right-up me-1"></i>+19.01%</span>from last week
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-md-6 d-flex">
              <div className="card flex-fill">
                
                <div className="card-body ">
                  <div className="border-bottom pb-3 mb-3">
                    <div className="row align-items-center">
                      <div className="col-7">
                        <div>
                          <span className="fs-14 fw-normal text-truncate mb-1">Churn Rate</span>
                          <h5>40</h5>
                        </div>
                      </div>
                      <div className="col-5">
                        <div>
                          <Sparkline4 />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex">
                    <p className="fs-12 fw-normal d-flex align-items-center text-truncate">
                      <span className="text-primary fs-12 d-flex align-items-center me-1">
                        <i className="ti ti-arrow-wave-right-up me-1"></i>+19.01%</span>from last week
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row mt-1">
            <div className="col-xl-8 col-lg-12 d-flex">
              <RecurringRevenueChart />
            </div>
            
            <div className="col-xl-4 col-lg-12 d-flex">
              <div className="card flex-fill mb-3">
                <div className="card-body">
                  <div className="border rounded border-start border-start-primary p-2 mb-3">
                    <h2 className="card-title mb-0">Channel Attribution</h2>
                    <p className="fs-13 mb-0 text-muted">Revenue by Source</p>
                  </div>
                  <div className="mb-4">
                    <div className="row g-3">
                      <div className="col-6 col-sm-4">
                        <div className="text-center">
                          <p className="mb-1">WhatsApp</p>
                          <h2 className="mb-0">₹4,650</h2>
                        </div>
                      </div>
                      <div className="col-6 col-sm-4">
                        <div className="text-center">
                          <p className="mb-1">Direct</p>
                          <h2 className="mb-0">₹3,100</h2>
                        </div>
                      </div>
                      <div className="col-6 col-sm-4">
                        <div className="text-center">
                          <p className="mb-1">Ads</p>
                          <h2 className="mb-0">₹2,590</h2>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="progress-stacked bg-white statistic-progress mb-4">
                    <div className="progress overflow-hidden" role="progressbar" aria-label="Segment one"
                      aria-valuenow="45" aria-valuemin="0" aria-valuemax="100" style={{width: '45%'}}>
                      <div className="progress-bar bg-primary"></div>
                    </div>
                    <div className="progress overflow-hidden" role="progressbar" aria-label="Segment two"
                      aria-valuenow="30" aria-valuemin="0" aria-valuemax="100" style={{width: '30%'}}>
                      <div className="progress-bar bg-secondary"></div>
                    </div>
                    <div className="progress overflow-hidden" role="progressbar" aria-label="Segment three"
                      aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" style={{width: '25%'}}>
                      <div className="progress-bar bg-pink"></div>
                    </div>
                  </div>

                  <div className="row g-3">
                    <div className="col-sm-6">
                      <div>
                        <p className="d-inline-flex align-items-center text-dark fw-semibold mb-1"><span
                            className="chart-line bg-primary me-2"></span>WhatsApp CRM</p>
                        <p className="mb-0"><span className="text-dark fw-medium">45%</span> - ₹4,650
                        </p>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div>
                        <p className="d-inline-flex align-items-center text-dark fw-semibold mb-1"><span
                            className="chart-line bg-secondary me-2"></span>Direct Sales</p>
                        <p className="mb-0"><span className="text-dark fw-medium">30%</span> - ₹3,100
                        </p>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div>
                        <p className="d-inline-flex align-items-center text-dark fw-semibold mb-1"><span
                            className="chart-line bg-pink me-2"></span>Marketing Ads</p>
                        <p className="mb-0"><span className="text-dark fw-medium">25%</span> - ₹2,590
                        </p>
                      </div>
                    </div>
                  </div>
                </div> 
              </div>
            </div>
          </div>

          <div className="row mt-2">
            <div className="col-xl-6 d-flex">
              <div className="card flex-fill mb-3">
                <div className="card-body">
                  <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-2 mb-4">
                    <h3 className="mb-0 card-title">Revenue by Service</h3>
                    <div className="dropdown">
                      <a href="#" onClick={(e) => e.preventDefault()}
                        className="border btn btn-white btn-md fw-normal d-inline-flex align-items-center justify-content-center rounded gap-1 fw-medium"
                        data-bs-toggle="dropdown">
                        <i className="ti ti-calendar fs-14"></i> Monthly
                      </a>
                      <ul className="dropdown-menu mt-2 p-3">
                        <li><a href="#" onClick={(e) => e.preventDefault()} className="dropdown-item rounded-1">Today</a></li>
                        <li><a href="#" onClick={(e) => e.preventDefault()} className="dropdown-item rounded-1">Weekly</a></li>
                        <li><a href="#" onClick={(e) => e.preventDefault()} className="dropdown-item rounded-1">Monthly</a></li>
                      </ul>
                    </div>
                  </div>

                  <div className="row d-flex align-items-center justify-content-center">
                    <div className="col-md-6">
                      <RevenueServiceChart />
                    </div>

                    <div className="col-md-6">
                      <div className="asset-list">
                        <div className="asset-item border rounded-pill mb-3">
                          <div className="bar">
                            <div className="fill" style={{width: '40%'}}>
                              <span className="percent">40%</span>
                            </div>
                            <span className="label">Consulting</span>
                          </div>
                        </div>

                        <div className="asset-item border rounded-pill mb-3">
                          <div className="bar">
                            <div className="fill" style={{width: '25%'}}>
                              <span className="percent">25%</span>
                            </div>
                            <span className="label">Subscriptions</span>
                          </div>
                        </div>

                        <div className="asset-item border rounded-pill mb-3">
                          <div className="bar">
                            <div className="fill" style={{width: '15%'}}>
                              <span className="percent">15%</span>
                            </div>
                            <span className="label">Support</span>
                          </div>
                        </div>

                        <div className="asset-item border rounded-pill mb-3">
                          <div className="bar">
                            <div className="fill" style={{width: '10%'}}>
                              <span className="percent">10%</span>
                            </div>
                            <span className="label">Implementation</span>
                          </div>
                        </div>

                        <div className="asset-item border rounded-pill">
                          <div className="bar">
                            <div className="fill" style={{width: '10%'}}>
                              <span className="percent">10%</span>
                            </div>
                            <span className="label">Others</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-6 d-flex">
              <style>
                {`
                  .velocity-card {
                    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    background: linear-gradient(145deg, #ffffff, #f8fbff);
                    border: 1px solid rgba(13, 110, 253, 0.08);
                  }
                  .velocity-card:hover {
                    transform: translateY(-8px);
                    box-shadow: 0 20px 40px rgba(13, 110, 253, 0.12);
                    border-color: rgba(13, 110, 253, 0.3);
                  }
                  .icon-pulse {
                    animation: pulse-ring 2.5s infinite cubic-bezier(0.215, 0.61, 0.355, 1);
                  }
                  @keyframes pulse-ring {
                    0% { box-shadow: 0 0 0 0 rgba(13, 110, 253, 0.3); }
                    70% { box-shadow: 0 0 0 20px rgba(13, 110, 253, 0); }
                    100% { box-shadow: 0 0 0 0 rgba(13, 110, 253, 0); }
                  }
                  .text-gradient-velocity {
                    background: linear-gradient(135deg, #0d6efd 0%, #00d2ff 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                  }
                `}
              </style>
              <div className="card flex-fill mb-3 justify-content-center align-items-center text-center p-5 velocity-card">
                <div className="mb-4 d-inline-flex align-items-center justify-content-center rounded-circle icon-pulse" style={{ width: '90px', height: '90px', backgroundColor: '#eef4ff' }}>
                  <i className="ti ti-clock-hour-4 text-primary" style={{ fontSize: '42px' }}></i>
                </div>
                <div className="mb-2">
                  <h1 className="display-2 fw-bolder mb-0 text-gradient-velocity" style={{ letterSpacing: '-1.5px' }}>14 <span className="fs-22 fw-medium text-muted" style={{ letterSpacing: '0px', WebkitTextFillColor: '#6c757d' }}>Days</span></h1>
                </div>
                <h4 className="fw-bold text-dark mb-3 fs-20">Average Deal Velocity</h4>
                <p className="text-muted fs-15 px-xl-5 mb-0" style={{ lineHeight: '1.6' }}>
                  This is the average time it takes for your team to move a deal from <strong className="text-dark">"New Lead"</strong> to <strong className="text-success">"Won"</strong>.
                </p>
              </div>
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

export default Analytics;
