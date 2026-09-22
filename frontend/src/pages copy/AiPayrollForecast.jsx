import React from 'react';
import { Link } from 'react-router-dom';
import { VarianceChart, ForecastChart, ProjectionChart, OvertimeChart, RiskChart, BreakdownChart, PayrollForecastChart } from '../components/charts/AiPayrollCharts';

const AiPayrollForecast = () => {
  return (
    <>
      <div className="page-wrapper">
			<div className="content">

				{/* Breadcrumb */}
				<div className="d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-3">
					<div className="my-auto mb-2">
						<h2 className="mb-1">AI Payroll Forecast</h2>
						<nav>
							<ol className="breadcrumb mb-0">
								<li className="breadcrumb-item">
									<a href="/"><i className="ti ti-smart-home"></i></a>
								</li>
								<li className="breadcrumb-item">
									AI Center
								</li>
								<li className="breadcrumb-item active" aria-current="page">AI Payroll Forecast</li>
							</ol>
						</nav>
					</div>
					<div className="d-flex my-xl-auto right-content align-items-center flex-wrap ">
						<div className="me-2 mb-2">
							<div className="dropdown">
								<a href="#" onClick={(e) => e.preventDefault()} className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
									data-bs-toggle="dropdown">
									<i className="ti ti-file-export me-1"></i>Full Report
								</a>
								<ul className="dropdown-menu  dropdown-menu-end p-3">
									<li>
										<a href="#" onClick={(e) => e.preventDefault()} className="dropdown-item rounded-1"><i className="ti ti-file-type-pdf me-1"></i>Export as PDF</a>
									</li>
									<li>
										<a href="#" onClick={(e) => e.preventDefault()} className="dropdown-item rounded-1"><i className="ti ti-file-type-xls me-1"></i>Export as Excel </a>
									</li>
								</ul>
							</div>
						</div>
						<a href="#" className="btn btn-primary-gradient mb-2"><i className="ti ti-refresh me-2"></i>Reforecast</a>
						<div className="ms-2 mb-2 head-icons">
							<a href="#" onClick={(e) => e.preventDefault()} className="" data-bs-toggle="tooltip" data-bs-placement="top"
								data-bs-original-title="Collapse" id="collapse-header">
								<i className="ti ti-chevrons-up"></i>
							</a>
						</div>
					</div>
				</div>
				{/* End Breadcrumb */}

				<div className="row">
				
					<div className="col-xxl-12">
						<div className="card flex-fill">
							<div className="card-body">
								<div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-3">
									<div>
										<h3 className="sub-title d-inline-flex align-items-center mb-1"><i className="ti ti-file-dollar text-primary fs-20 me-1"></i>Budget Alerts</h3>
										<p>AI-powered insights</p>
									</div>
									<div className="dropdown">
										<a href="#" onClick={(e) => e.preventDefault()} className="border btn btn-white btn-md d-inline-flex align-items-center" data-bs-toggle="dropdown">
											<i className="ti ti-calendar me-1 fs-14"></i>July 2026
										</a>
										<ul className="dropdown-menu  dropdown-menu-end p-3">
											<li>
												<a href="#" onClick={(e) => e.preventDefault()} className="dropdown-item rounded-1">July 2026</a>
											</li>
											<li>
												<a href="#" onClick={(e) => e.preventDefault()} className="dropdown-item rounded-1">Aug 2026</a>
											</li>
											<li>
												<a href="#" onClick={(e) => e.preventDefault()} className="dropdown-item rounded-1"> Sep 2026</a>
											</li>
										</ul>
									</div>
								</div>

								<div className="row g-4">

									<div className="col-xl-3 col-sm-6 d-flex">
										<div className="card bg-danger z-1 border-0 mb-0 flex-fill">
											<div className="card-body">
												<p className="text-white fw-semibold mb-1">Under Budget</p>
												<p className="text-white mb-0">Dev team 3% below forecast</p>
											</div>
											<img src="/assets/img/bg/card-bg-08.png" alt="bg" className="img-fluid position-absolute top-0 end-0 z-n1 w-auto h-auto" />
											<div className="budget-bg bg-danger-900"></div>
										</div> {/* end card */}
									</div> {/* end col */}									

									<div className="col-xl-3 col-sm-6 d-flex">
										<div className="card bg-success z-1 border-0 mb-0 flex-fill">
											<div className="card-body">
												<p className="text-white fw-semibold mb-1">Over Budget</p>
												<p className="text-white mb-0">Sales bonuses exceeded by 8%</p>
											</div>
											<img src="/assets/img/bg/card-bg-08.png" alt="bg" className="img-fluid position-absolute top-0 end-0 z-n1 w-auto h-auto" />
											<div className="budget-bg bg-success-900"></div>
										</div> {/* end card */}
									</div> {/* end col */}									

									<div className="col-xl-3 col-sm-6 d-flex">
										<div className="card bg-purple z-1 border-0 mb-0 flex-fill">
											<div className="card-body">
												<p className="text-white fw-semibold mb-1">Trending Up</p>
												<p className="text-white mb-0">Q3 costs predicted +5.2%</p>
											</div>
											<img src="/assets/img/bg/card-bg-08.png" alt="bg" className="img-fluid position-absolute top-0 end-0 z-n1 w-auto h-auto" />
											<div className="budget-bg bg-purple-900"></div>
										</div> {/* end card */}
									</div> {/* end col */}									

									<div className="col-xl-3 col-sm-6 d-flex">
										<div className="card bg-info z-1 border-0 mb-0 flex-fill">
											<div className="card-body">
												<p className="text-white fw-semibold mb-1">Review Needed</p>
												<p className="text-white mb-0">Benefits costs up 12% YoY</p>
											</div>
											<img src="/assets/img/bg/card-bg-08.png" alt="bg" className="img-fluid position-absolute top-0 end-0 z-n1 w-auto h-auto" />
											<div className="budget-bg bg-info-900"></div>
										</div> {/* end card */}
									</div> {/* end col */}

								</div>
							</div>
						</div>
					</div>

				</div>		

				<div className="card">
					<div className="card-body pb-0">

						<div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-3">
							<div>
								<h3 className="sub-title d-inline-flex align-items-center mb-1"><i className="ti ti-server text-primary fs-20 me-1"></i>Payroll Forecast</h3>
								<p>Predictive payroll modelling with 94.2% confidence · LSTM time-series model · Updated 14 May 2026</p>
							</div>
							<div className="dropdown">
								<a href="#" onClick={(e) => e.preventDefault()} className="border btn btn-white btn-md d-inline-flex align-items-center" data-bs-toggle="dropdown">
									<i className="ti ti-calendar me-1 fs-14"></i>2026
								</a>
								<ul className="dropdown-menu  dropdown-menu-end p-3">
									<li>
										<a href="#" onClick={(e) => e.preventDefault()} className="dropdown-item rounded-1">2026</a>
									</li>
									<li>
										<a href="#" onClick={(e) => e.preventDefault()} className="dropdown-item rounded-1">2025</a>
									</li>
									<li>
										<a href="#" onClick={(e) => e.preventDefault()} className="dropdown-item rounded-1">2024</a>
									</li>
								</ul>
							</div>
						</div>
						
						<div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-3">
							<div className="d-flex align-items-center flex-wrap gap-3">
								<p className="fw-medium d-inline-flex align-items-center gap-2 mb-0">Actual Payroll <span className="text-primary custom-title fw-semibold">9.6M</span></p>
								<p className="fw-medium d-inline-flex align-items-center gap-2 mb-0">Forecast Payroll <span className="text-secondary custom-title fw-semibold">12.6M</span></p>
								<p className="fw-medium d-inline-flex align-items-center gap-2 mb-0">Confidence Band <span className="text-info custom-title fw-semibold">95%</span></p>
							</div>
							<div className="d-flex align-items-center flex-wrap gap-3">
								<p className="d-inline-flex align-items-center gap-1 mb-0"><span className="line-icon d-inline-block bg-primary"></span>Actual Payroll</p>
								<p className="d-inline-flex align-items-center gap-1 mb-0"><span className="line-icon d-inline-block bg-secondary"></span>AI Forecast</p>
							</div>

						</div>
						<PayrollForecastChart />
					</div>
				</div> {/* end card */}

				<div className="row">

					<div className="col-xxl-6 col-xl-12 d-flex">
						<div className="card flex-fill">
							<div className="card-body pb-0">
								<div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-3">
									<div>
										<h3 className="sub-title d-inline-flex align-items-center mb-1"><i className="ti ti-server text-primary fs-20 me-1"></i>Variance Analysis</h3>
										<p>Budget vs actual comparison</p>
									</div>
									<div className="d-flex align-items-center gap-2">
										<span className="badge border fs-14 fw-normal text-body"><i className="ti ti-square-filled text-primary fs-12 me-1"></i>Budget</span>
										<span className="badge border fs-14 fw-normal text-body"><i className="ti ti-square-filled text-secondary fs-12 me-1"></i>Actual</span>
									</div>
									<div className="dropdown">
										<a href="#" onClick={(e) => e.preventDefault()} className="border btn btn-white btn-md d-inline-flex align-items-center" data-bs-toggle="dropdown">
											<i className="ti ti-calendar me-1 fs-14"></i>2026
										</a>
										<ul className="dropdown-menu  dropdown-menu-end p-3">
											<li>
												<a href="#" onClick={(e) => e.preventDefault()} className="dropdown-item rounded-1">2026</a>
											</li>
											<li>
												<a href="#" onClick={(e) => e.preventDefault()} className="dropdown-item rounded-1">2025</a>
											</li>
											<li>
												<a href="#" onClick={(e) => e.preventDefault()} className="dropdown-item rounded-1">2024</a>
											</li>
										</ul>
									</div>
								</div>
								<VarianceChart />
							</div>
						</div>
					</div> {/* end col */}
				
					<div className="col-xxl-6 d-flex flex-column">

						<div className="row flex-fill">

							<div className="col-sm-6 d-flex">
								<div className="card flex-fill">
									<div className="card-body">

										<div className="d-flex align-items-center justify-content-between mb-4 flex-wrap gap-2">
											<div className="avatar bg-primary oval-rounded">
												<i className="ti ti-clock-share fs-20"></i>
											</div>
											<p className="text-dark fs-16 fw-semibold">Recent Forecast</p>
										</div>
										<div className="d-flex align-items-center justify-content-between">
											<div>
												<h2 className="mb-1">$2.41M</h2>
												<div className="d-flex align-items-center gap-1 flex-wrap">
													<span className="badge badge-success-transparent">2.3%<i className="ti ti-arrow-up-right ms-1"></i></span>
													<p> vs Apr</p>
												</div>
											</div>
											<ForecastChart />
										</div>
									</div> {/* end card body */}
								</div> {/* end card */}
							</div> {/* end col */}

							<div className="col-sm-6 d-flex">
								<div className="card flex-fill">
									<div className="card-body">

										<div className="d-flex align-items-center justify-content-between mb-4 flex-wrap gap-2">
											<div className="avatar bg-secondary oval-rounded">
												<i className="ti ti-api-app fs-20"></i>
											</div>
											<p className="text-dark fs-16 fw-semibold">Q2 Projection</p>
										</div>
										<div className="d-flex align-items-center justify-content-between">
											<div>
												<h2 className="mb-1">$7.18M</h2>
												<p className="fs-13">Within Budget</p>
											</div>
											<ProjectionChart />
										</div>
									</div> {/* end card body */}
								</div> {/* end card */}
							</div> {/* end col */}

							<div className="col-sm-6 d-flex">
								<div className="card flex-fill">
									<div className="card-body">

										<div className="d-flex align-items-center justify-content-between mb-4 flex-wrap gap-2">
											<div className="avatar bg-info oval-rounded">
												<i className="ti ti-badge fs-20"></i>
											</div>
											<p className="text-dark fs-16 fw-semibold">Overtime Est</p>
										</div>
										<div className="d-flex align-items-center justify-content-between">
											<div>
												<h2 className="mb-1">$84K</h2>
												<div className="d-flex align-items-center gap-1 flex-wrap">
													<span className="badge badge-danger-transparent">−12%<i className="ti ti-arrow-down-right ms-1"></i></span>
													<p>Vs Forecast</p>
												</div>
											</div>
											<OvertimeChart />
										</div>
									</div> {/* end card body */}
								</div> {/* end card */}
							</div> {/* end col */}

							<div className="col-sm-6 d-flex">
								<div className="card flex-fill">
									<div className="card-body">

										<div className="d-flex align-items-center justify-content-between mb-4 flex-wrap gap-2">
											<div className="avatar bg-danger oval-rounded">
												<i className="ti ti-briefcase-2 fs-20"></i>
											</div>
											<p className="text-dark fs-16 fw-semibold">Variance Risk</p>
										</div>
										<div className="d-flex align-items-center justify-content-between">
											<div>
												<h2 className="mb-1">1.2%</h2>
												<p className="fs-13">Low Risk Band</p>
											</div>
											<RiskChart />
										</div>
									</div> {/* end card body */}
								</div> {/* end card */}
							</div> {/* end col */}

						</div>
					</div>

				</div>	

				<div className="row">
				
					<div className="col-xxl-6 col-xl-7 d-flex">
						<div className="card flex-fill">
							<div className="card-body">
								<div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-3">
									<div>
										<h3 className="sub-title d-inline-flex align-items-center mb-1"><i className="ti ti-server text-primary fs-20 me-1"></i>Department Payroll Costs</h3>
										<p>Monthly allocation by team</p>
									</div>
									<a href="#" className="border btn btn-light btn-icon btn-sm d-inline-flex align-items-center justify-content-center rounded-circle">
										<i className="ti ti-arrow-up-right fs-16"></i>
									</a>
								</div>
								<div className="w-100 d-flex flex-column flex-sm-row">
									<div className="payroll-item col-development flex-grow-1 px-2 position-relative">
										<p className="fs-16 fw-semibold text-dark mb-1">$105000</p>
										<p className="fs-12 mb-5">Development</p>
										<p className="fs-13 text-success mb-4"><i className="ti ti-circle-arrow-up me-1"></i>32.1%</p>
										<div className="progress progress-xl rounded mb-2 mb-sm-0" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">
											<div className="progress-bar progress-bar-striped bg-primary" style={{width: '100%'}}></div>
										</div>
									</div>

									<div className="payroll-item flex-grow-1 px-2 position-relative">
										<p className="fs-16 fw-semibold text-dark mb-1">$70000</p>
										<p className="fs-12 mb-5">Sales</p>
										<p className="fs-13 text-danger mb-4"><i className="ti ti-circle-arrow-down me-1"></i>16%</p>
										<div className="progress progress-xl rounded mb-2 mb-sm-0" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">
											<div className="progress-bar progress-bar-striped bg-secondary" style={{width: '100%'}}></div>
										</div>
									</div>

									<div className="payroll-item flex-grow-1 px-2 position-relative">
										<p className="fs-16 fw-semibold text-dark mb-1">$35000</p>
										<p className="fs-12 mb-5">Marketing</p>
										<p className="fs-13 text-success mb-4"><i className="ti ti-circle-arrow-up me-1"></i>15.3%</p>
										<div className="progress progress-xl rounded mb-2 mb-sm-0" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">
											<div className="progress-bar progress-bar-striped bg-warning" style={{width: '100%'}}></div>
										</div>
									</div>

									<div className="payroll-item flex-grow-1 px-2 position-relative">
										<p className="fs-16 fw-semibold text-dark mb-1">$12000</p>
										<p className="fs-12 mb-5">Support</p>
										<p className="fs-13 text-success mb-4"><i className="ti ti-circle-arrow-up me-1"></i>12.1%</p>
										<div className="progress progress-xl rounded mb-2 mb-sm-0" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">
											<div className="progress-bar progress-bar-striped bg-info" style={{width: '100%'}}></div>
										</div>
									</div>

									<div className="payroll-item flex-grow-1 px-2 position-relative">
										<p className="fs-16 fw-semibold text-dark mb-1">$8000</p>
										<p className="fs-12 mb-5">Operations</p>
										<p className="fs-13 text-success mb-4"><i className="ti ti-circle-arrow-up me-1"></i>8.4%</p>
										<div className="progress progress-xl rounded mb-2 mb-sm-0" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">
											<div className="progress-bar progress-bar-striped bg-purple" style={{width: '100%'}}></div>
										</div>
									</div>

								</div>

							</div>
						</div>
					</div>

					<div className="col-xxl-6 col-xl-5 d-flex">
						<div className="card flex-fill">
							<div className="card-body">
								<div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-3">
									<div>
										<h3 className="sub-title d-inline-flex align-items-center mb-1"><i className="ti ti-server text-primary fs-20 me-1"></i>Cost Breakdown</h3>
										<p>Current month distribution</p>
									</div>
									<div className="dropdown">
										<a href="#" onClick={(e) => e.preventDefault()}
											className="border btn btn-light btn-icon btn-sm d-inline-flex align-items-center justify-content-center rounded-circle"
											data-bs-toggle="dropdown">
											<i className="ti ti-dots-vertical fs-16"></i>
										</a>
										<ul className="dropdown-menu mt-2 p-3">
											<li>
												<a href="#" onClick={(e) => e.preventDefault()} className="dropdown-item rounded-1">
													Monthly
												</a>
											</li>
											<li>
												<a href="#" onClick={(e) => e.preventDefault()} className="dropdown-item rounded-1">
													Weekly
												</a>
											</li>
											<li>
												<a href="#" onClick={(e) => e.preventDefault()} className="dropdown-item rounded-1">
													Today
												</a>
											</li>
										</ul>
									</div>
								</div>
								<div className="row align-items-center">
									<div className="col-sm-6">
										<BreakdownChart />
									</div>
									<div className="col-sm-6">
										<div className="breakdown-labels vstack gap-3">
											<div className="d-flex align-items-center justify-content-between">
												<p className="fs-13 mb-0 d-inline-block"><i className="ti ti-circle-filled text-secondary fs-10 me-1"></i>Salary</p>
												<p className="fs-12 mb-0 d-flex align-items-center gap-2 text-dark"><span className="lebel-line d-inline-block flex-grow-1"></span>70.%</p>
											</div>
											<div className="d-flex align-items-center justify-content-between">
												<p className="fs-13 mb-0 d-inline-block"><i className="ti ti-circle-filled text-warning fs-10 me-1"></i>Taxes</p>
												<p className="fs-12 mb-0 d-flex align-items-center gap-2 text-dark"><span className="lebel-line d-inline-block flex-grow-1"></span>10%</p>
											</div>
											<div className="d-flex align-items-center justify-content-between">
												<p className="fs-13 mb-0 d-inline-block"><i className="ti ti-circle-filled text-info fs-10 me-1"></i>Bonuses</p>
												<p className="fs-12 mb-0 d-flex align-items-center gap-2 text-dark"><span className="lebel-line d-inline-block flex-grow-1"></span>14%</p>
											</div>
											<div className="d-flex align-items-center justify-content-between">
												<p className="fs-13 mb-0 d-inline-block"><i className="ti ti-circle-filled text-primary fs-10 me-1"></i>Benefits</p>
												<p className="fs-12 mb-0 d-flex align-items-center gap-2 text-dark"><span className="lebel-line d-inline-block flex-grow-1"></span>6%</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div> {/* end col */}

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

export default AiPayrollForecast;
