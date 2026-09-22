import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HiringTimelineChart, StatisticsChart, StatisticsChartTwo, StatisticsChartThree, StatisticsChartFour, PipelineOverviewChart, BudgetAllocationChart, RoleDemandChart } from '../components/charts/AiHiringCharts';

const AiHiringForecast = () => {
  // Pagination state for aihiringforecast
  const [currentPage_aihiringforecast, setCurrentPage_aihiringforecast] = useState(1);
  const [rowsPerPage_aihiringforecast, setRowsPerPage_aihiringforecast] = useState(10);
  const [searchQuery_aihiringforecast, setSearchQuery_aihiringforecast] = useState('');
  return (
    <>
      <div className="page-wrapper">
			<div className="content">

				{/* Breadcrumb */}
				<div className="d-flex align-items-center justify-content-between flex-wrap mb-3">
					<div className="my-auto mb-2">
						<h2 className="mb-1">AI Hiring Forecast</h2>
						<nav>
							<ol className="breadcrumb mb-0">
								<li className="breadcrumb-item">
									<a href="/"><i className="ti ti-smart-home"></i></a>
								</li>
								<li className="breadcrumb-item">
									AI Center
								</li>
								<li className="breadcrumb-item active" aria-current="page">AI Hiring Forecast</li>
							</ol>
						</nav>
					</div>
					<div className="d-flex my-xl-auto right-content align-items-center flex-wrap gap-3">
						<div className="dropdown">
							<a href="#" onClick={(e) => e.preventDefault()} className="dropdown-toggle btn btn-white d-inline-flex align-items-center" data-bs-toggle="dropdown"> <i className="ti ti-file-export me-1"></i>Export</a>
							<ul className="dropdown-menu  dropdown-menu-end p-3">
								<li>
									<a href="#" onClick={(e) => e.preventDefault()} className="dropdown-item rounded-1"><i className="ti ti-file-type-pdf me-1"></i>Export as PDF</a>
								</li>
								<li>
									<a href="#" onClick={(e) => e.preventDefault()} className="dropdown-item rounded-1"><i className="ti ti-file-type-xls me-1"></i>Export as Excel </a>
								</li>
							</ul>
						</div>
						<a href="#" className="btn btn-primary-gradient d-inline-flex align-items-center gap-2"> <i className="ti ti-repeat"></i> Update Forecast</a>

						<div className="ms-2 head-icons">
							<a href="#" onClick={(e) => e.preventDefault()} className="" data-bs-toggle="tooltip" data-bs-placement="top"
								data-bs-original-title="Collapse" id="collapse-header">
								<i className="ti ti-chevrons-up"></i>
							</a>
						</div>
					</div>
				</div>
				{/* /Breadcrumb */}

				{/* start row */}
				<div className="row row-gap-4 mb-4">
					{/* Start Hiring Timeline Forecast */}
					<div className="col-lg-12">
						<div className="card mb-0">
							<div className="card-body pb-3">
								<div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-4">
									<h2 className="mb-0 card-title">Hiring Timeline Forecast</h2>
									<div className="dropdown">
										<a href="#" onClick={(e) => e.preventDefault()}
											className="border btn btn-white btn-md d-inline-flex align-items-center"
											data-bs-toggle="dropdown">
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
								<div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-2">
									<div className="d-flex align-items-center gap-sm-4 gap-2 flex-wrap">
										<div className="border rounded p-3">
											<p className="mb-2">Avaerage Actual Hire </p>
											<h3 className="mb-0 fs-20 fw-semibold text-primary">169</h3>
										</div>
										<div className="border rounded p-3">
											<p className="mb-2">Average Predicted Hire  </p>
											<h3 className="mb-0 fs-20 fw-semibold text-secondary">215</h3>
										</div>
									</div>
									<div className="d-flex align-items-center gap-3">
										<p className="d-flex align-items-center gap-1 text-dark mb-0">
											<i className="ti ti-circle-filled text-primary fs-13"></i> Actual Hires
										</p>
										<p className="d-flex align-items-center gap-1 text-dark mb-0">
											<i className="ti ti-square-rounded-filled text-secondary fs-13"></i>Predicted Hires
										</p>
									</div>
								</div>
								{/* Hiring chart */}
								<HiringTimelineChart />
							</div>
						</div>
					</div>
					{/* End Hiring Timeline Forecast */}

					{/* Start Hiring Statistics */}
					<div className="col-xxl-7 col-xl-8 d-flex">
						<div className="card mb-0 flex-fill">
							<div className="card-body">
								<div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-4">
									<h2 className="mb-0 card-title">Hiring Statistics</h2>
									<div className="dropdown">
										<a href="#" onClick={(e) => e.preventDefault()}
											className="border btn btn-white btn-md d-inline-flex align-items-center gap-2"
											data-bs-toggle="dropdown">
											<i className="ti ti-chart-arrows-vertical"></i>Q3
										</a>
										<ul className="dropdown-menu  dropdown-menu-end p-3">
											<li>
												<a href="#" onClick={(e) => e.preventDefault()} className="dropdown-item rounded-1">Q3</a>
											</li>
											<li>
												<a href="#" onClick={(e) => e.preventDefault()} className="dropdown-item rounded-1">Q2</a>
											</li>
											<li>
												<a href="#" onClick={(e) => e.preventDefault()} className="dropdown-item rounded-1">Q1</a>
											</li>
										</ul>
									</div>
								</div>

								{/* start row */}
								<div className="row row-gap-4">
									{/* Item 1 */}
									<div className="col-sm-6">
										<div className="card mb-0">
											<div className="card-body">
												<div className="d-flex align-items-center flex-wrap gap-3 mb-3">
													<div className="avatar avatar-lg bg-primary rounded-circle flex-shrink-0">
														<i className="ti ti-users-group text-white fs-24"></i>
													</div>
													<div>
														<p className="mb-1">Q3 Headcount Need</p> 
														<div  className="d-flex align-items-center gap-2">
															<h3 className="text-dark mb-0">+23 </h3>
															<div className="d-inline-flex align-items-center bg-light border rounded-pill text-dark p-1 ps-2"> +4<span className="bg-success btn-icon btn-sm rounded-circle d-flex align-items-center justify-content-center ms-1"><i className="ti ti-arrow-up-right fs-20"></i></span></div>
														</div>
													</div>
												</div>
												<StatisticsChart />
											</div>
										</div>
									</div>
									{/* Item 2 */}
									<div className="col-sm-6">
										<div className="card mb-0">
											<div className="card-body">
												<div className="d-flex align-items-center flex-wrap gap-3 mb-3">
													<div className="avatar avatar-lg bg-secondary rounded-circle flex-shrink-0">
														<i className="ti ti-info-octagon text-white fs-24"></i>
													</div>
													<div>
														<p className="mb-1">Attrition Risk</p> 
														<div  className="d-flex align-items-center gap-2">
															<h3 className="text-dark mb-0">7.2% </h3>
															<div className="d-inline-flex align-items-center bg-light border rounded-pill text-dark p-1 ps-2"> +18%<span className="bg-success btn-icon btn-sm rounded-circle d-flex align-items-center justify-content-center ms-1"><i className="ti ti-arrow-up-right fs-20"></i></span></div>
														</div>
													</div>
												</div>
												<StatisticsChartTwo />
											</div>
										</div>
									</div>
									{/* Item 3 */}
									<div className="col-sm-6">
										<div className="card mb-0">
											<div className="card-body">
												<div className="d-flex align-items-center flex-wrap gap-3 mb-3">
													<div className="avatar avatar-lg bg-purple rounded-circle flex-shrink-0">
														<i className="ti ti-briefcase text-white fs-24"></i>
													</div>
													<div>
														<p className="mb-1">Open Roles</p> 
														<div  className="d-flex align-items-center gap-2">
															<h3 className="text-dark mb-0">18 </h3>
															<div className="d-inline-flex align-items-center bg-light border rounded-pill text-dark p-1 ps-2">-16%<span className="bg-danger btn-icon btn-sm rounded-circle d-flex align-items-center justify-content-center ms-1"><i className="ti ti-arrow-down-right fs-20"></i></span></div>
														</div>
													</div>
												</div>
												<StatisticsChartThree />
											</div>
										</div>
									</div>
									{/* Item 4 */}
									<div className="col-sm-6">
										<div className="card mb-0">
											<div className="card-body">
												<div className="d-flex align-items-center flex-wrap gap-3 mb-3">
													<div className="avatar avatar-lg bg-info rounded-circle flex-shrink-0">
														<i className="ti ti-file-search text-white fs-24"></i>
													</div>
													<div>
														<p className="mb-1">Offer Accept Rate</p> 
														<div  className="d-flex align-items-center gap-2">
															<h3 className="text-dark mb-0">83% </h3>
															<div className="d-inline-flex align-items-center bg-light border rounded-pill text-dark p-1 ps-2"> +8%<span className="bg-success btn-icon btn-sm rounded-circle d-flex align-items-center justify-content-center ms-1"><i className="ti ti-arrow-up-right fs-20"></i></span></div>
														</div>
													</div>
												</div>
												<StatisticsChartFour />
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					{/* End Hiring Statistics */}

					{/* Start Pipeline Overview */}
					<div className="col-xxl-5 col-xl-4 d-flex">
						<div className="card mb-0 flex-fill">
							<div className="card-body">
								<div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-4">
									<h2 className="mb-0 card-title">Hiring Pipeline Overview</h2>
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
								<PipelineOverviewChart />
								<div className="pipeline-value">
									<div className="value position-relative d-flex align-items-center justify-content-between text-dark"><p className="d-flex align-items-center gap-2 mb-0"><span className="bg-primary line"></span> Applied </p><span className="fs-20 fw-semibold">59%</span></div>
									<div className="value position-relative d-flex align-items-center justify-content-between text-dark"><p className="d-flex align-items-center gap-2 mb-0"><span className="bg-secondary line"></span> Screening </p><span className="fs-20 fw-semibold">21%</span></div>
									<div className="value position-relative d-flex align-items-center justify-content-between text-dark"><p className="d-flex align-items-center gap-2 mb-0"><span className="bg-warning line"></span> Interview </p><span className="fs-20 fw-semibold">12%</span></div>
									<div className="value position-relative d-flex align-items-center justify-content-between text-dark"><p className="d-flex align-items-center gap-2 mb-0"><span className="bg-success line"></span> Accepted </p><span className="fs-20 fw-semibold">8%</span></div>
								</div>
							</div>
						</div>
					</div>
					{/* End Pipeline Overview */}

					{/* Start Open Role Pipeline */}
					<div className="col-xxl-8 col-xl-12 d-flex">
						<div className="card mb-0 flex-fill">
							<div className="card-body p-0">
								<div className="d-flex align-items-center justify-content-between flex-wrap gap-2 my-3 px-4">
									<h2 className="mb-0 card-title">Open Role Pipeline</h2>
									<a href="#" onClick={(e) => e.preventDefault()} className="border btn btn-light btn-icon btn-sm d-inline-flex align-items-center justify-content-center rounded-circle">
										<i className="ti ti-arrow-up-right fs-16"></i>
									</a>
								</div>

								
								{/* Pagination Toolbar */}
								<div className="d-flex align-items-center justify-content-between flex-wrap row-gap-2 mb-3 px-3 pt-3">
									<div className="d-flex align-items-center">
										<span className="me-2 text-gray-9 fs-14">Row Per Page</span>
										<select
											className="form-select form-select-sm w-auto"
											value={rowsPerPage_aihiringforecast}
											onChange={(e) => { setRowsPerPage_aihiringforecast(Number(e.target.value)); setCurrentPage_aihiringforecast(1); }}
										>
											<option value={10}>10</option>
											<option value={20}>20</option>
											<option value={50}>50</option>
										</select>
									</div>
									<div className="input-icon-start position-relative">
										<span className="input-icon-addon">
											<i className="ti ti-search"></i>
										</span>
										<input
											type="text"
											className="form-control form-control-sm"
											placeholder="Search"
											value={searchQuery_aihiringforecast}
											onChange={(e) => { setSearchQuery_aihiringforecast(e.target.value); setCurrentPage_aihiringforecast(1); }}
										/>
									</div>
								</div>
<div className="table-responsive">
									<table className="table table-nowrap mb-0">
										<thead>
											<tr>
												<th>Role</th>
												<th>Department</th>
												<th>Urgency</th>
												<th>Openings</th>
												<th>Pipeline fill</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td>
													<p className="fw-semibold mb-0"><a href="/project-details">Office Management App</a></p>
												</td>
												<td><p className="fw-medium mb-0">Engineering</p></td>
												<td> 
													<span
														className="badge bg-outline-danger d-inline-flex align-items-center badge-xs">
														<i className="ti ti-point-filled me-1"></i>Critical
													</span>
												</td>
												<td>2</td>
												<td>
													<div className="progress progress-xs w-100" role="progressbar"
														aria-valuenow="40" aria-valuemin="0" aria-valuemax="100">
														<div className="progress-bar bg-primary progress-bar-striped" style={{width: '90%'}}></div>
													</div>
												</td>
											</tr>
											<tr>
												<td>
													<p className="fw-semibold mb-0"><a href="/project-details">Sales Executive</a></p>
												</td>
												<td><p className="fw-medium mb-0">Sales</p></td>
												<td> 
													<span
														className="badge bg-outline-purple d-inline-flex align-items-center badge-xs">
														<i className="ti ti-point-filled me-1"></i>High
													</span>
												</td>
												<td>5</td>
												<td>
													<div className="progress progress-xs w-100" role="progressbar"
														aria-valuenow="40" aria-valuemin="0" aria-valuemax="100">
														<div className="progress-bar bg-purple progress-bar-striped" style={{width: '60%'}}></div>
													</div>
												</td>
											</tr>
											<tr>
												<td>
													<p className="fw-semibold mb-0"><a href="/project-details">Product Designer</a></p>
												</td>
												<td><p className="fw-medium mb-0">Product</p></td>
												<td> 
													<span
														className="badge bg-outline-info d-inline-flex align-items-center badge-xs">
														<i className="ti ti-point-filled me-1"></i>Planned
													</span>
												</td>
												<td>3</td>
												<td>
													<div className="progress progress-xs w-100" role="progressbar"
														aria-valuenow="40" aria-valuemin="0" aria-valuemax="100">
														<div className="progress-bar bg-info progress-bar-striped" style={{width: '78%'}}></div>
													</div>
												</td>
											</tr>
											<tr>
												<td>
													<p className="fw-semibold mb-0"><a href="/project-details">Data Analyst</a></p>
												</td>
												<td><p className="fw-medium mb-0">Operations</p></td>
												<td> 
													<span
														className="badge bg-outline-purple d-inline-flex align-items-center badge-xs">
														<i className="ti ti-point-filled me-1"></i>High
													</span>
												</td>
												<td>6</td>
												<td>
													<div className="progress progress-xs w-100" role="progressbar"
														aria-valuenow="40" aria-valuemin="0" aria-valuemax="100">
														<div className="progress-bar bg-purple progress-bar-striped" style={{width: '85%'}}></div>
													</div>
												</td>
											</tr>
											<tr>
												<td>
													<p className="fw-semibold mb-0"><a href="/project-details">HR Business Partner</a></p>
												</td>
												<td><p className="fw-medium mb-0">HR & Admin</p></td>
												<td> 
													<span
														className="badge bg-outline-success d-inline-flex align-items-center badge-xs">
														<i className="ti ti-point-filled me-1"></i>Low
													</span>
												</td>
												<td>3</td>
												<td>
													<div className="progress progress-xs w-100" role="progressbar"
														aria-valuenow="40" aria-valuemin="0" aria-valuemax="100">
														<div className="progress-bar bg-success progress-bar-striped" style={{width: '95%'}}></div>
													</div>
												</td>
											</tr>
											<tr>
												<td>
													<p className="fw-semibold mb-0"><a href="/project-details">Digital Marketing Specialist</a></p>
												</td>
												<td><p className="fw-medium mb-0">Marketing</p></td>
												<td> 
													<span
														className="badge bg-outline-danger d-inline-flex align-items-center badge-xs">
														<i className="ti ti-point-filled me-1"></i>Critical
													</span>
												</td>
												<td>2</td>
												<td>
													<div className="progress progress-xs w-100" role="progressbar"
														aria-valuenow="40" aria-valuemin="0" aria-valuemax="100">
														<div className="progress-bar bg-primary progress-bar-striped" style={{width: '90%'}}></div>
													</div>
												</td>
											</tr>
											<tr>
												<td>
													<p className="fw-semibold mb-0"><a href="/project-details">Business Analyst</a></p>
												</td>
												<td><p className="fw-medium mb-0">Operations</p></td>
												<td> 
													<span className="badge bg-outline-info d-inline-flex align-items-center badge-xs">
														<i className="ti ti-point-filled me-1"></i>Planned
													</span>
												</td>
												<td>5</td>
												<td>
													<div className="progress progress-xs w-100" role="progressbar"
														aria-valuenow="40" aria-valuemin="0" aria-valuemax="100">
														<div className="progress-bar bg-info progress-bar-striped" style={{width: '95%'}}></div>
													</div>
												</td>
											</tr>
										</tbody>
									</table>

								{/* Pagination Footer */}
								<div className="d-flex align-items-center justify-content-between flex-wrap row-gap-2 px-3 py-3 border-top">
									<p className="mb-0 text-gray-9 fs-14">
										Showing {Math.min((currentPage_aihiringforecast - 1) * rowsPerPage_aihiringforecast + 1, 11)}-{Math.min(currentPage_aihiringforecast * rowsPerPage_aihiringforecast, 11)} of 11 entries
									</p>
									<ul className="pagination mb-0">
										<li className={`page-item ${currentPage_aihiringforecast === 1 ? 'disabled' : ''}`}>
											<button className="page-link" onClick={() => setCurrentPage_aihiringforecast(p => Math.max(p - 1, 1))}>
												<i className="ti ti-chevron-left"></i>
											</button>
										</li>
										{[1, 2].map(page => (
											<li key={page} className={`page-item ${currentPage_aihiringforecast === page ? 'active' : ''}`}>
												<button className="page-link" onClick={() => setCurrentPage_aihiringforecast(page)}>{page}</button>
											</li>
										))}
										<li className={`page-item ${currentPage_aihiringforecast === 2 ? 'disabled' : ''}`}>
											<button className="page-link" onClick={() => setCurrentPage_aihiringforecast(p => Math.min(p + 1, 2))}>
												<i className="ti ti-chevron-right"></i>
											</button>
										</li>
									</ul>
								</div>
								</div>
							</div>
						</div>
					</div>
					{/* End Open Role Pipeline */}

					{/* Start Budget Allocation by Department */}
					<div className="col-xxl-4 col-xl-6 d-flex">
						<div className="card mb-0 flex-fill">
							<div className="card-body">
								<div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-4">
									<h2 className="mb-0 card-title">Budget Allocation by Department</h2>
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
								<div className="d-flex align-items-center gap-3">
									<p className="d-flex align-items-center gap-1 text-dark mb-0">
										<i className="ti ti-square-rounded-filled text-primary fs-13"></i> Used
									</p>
									<p className="d-flex align-items-center gap-1 text-dark mb-0">
										<i className="ti ti-square-rounded-filled text-light fs-13"></i>Available 
									</p>
								</div>
								<BudgetAllocationChart />
							</div>
						</div>
					</div>
					{/* End Budget Allocation by Department */}

					{/* Start Role Demand Forecast */}
					<div className="col-xxl-4 col-xl-6 d-flex">
						<div className="card mb-0 flex-fill">
							<div className="card-body">
								<div className="mb-4">
									<h2 className="mb-0 card-title">Role Demand Forecast</h2>
								</div>

								<RoleDemandChart />
								<p className="d-flex align-items-center justify-content-between gap-2 mb-2 pb-2 border-bottom-dashed">Backend Dev <span className="badge bg-success">32%</span></p>
								<p className="d-flex align-items-center justify-content-between gap-2 mb-2 pb-2 border-bottom-dashed">Sales Rep <span className="badge bg-purple">24%</span></p>
								<p className="d-flex align-items-center justify-content-between gap-2 mb-2 pb-2 border-bottom-dashed">Designer <span className="badge bg-warning">24%</span></p>
								<p className="d-flex align-items-center justify-content-between gap-2 mb-2 pb-2 border-bottom-dashed">Support <span className="badge bg-info">20%</span></p>
								<p className="d-flex align-items-center justify-content-between gap-2 mb-0 pb-0">Engineer <span className="badge bg-primary">10%</span></p>
							</div>
						</div>
					</div>
					{/* End Role Demand Forecast */}

					{/* Start AI Hiring Predictions */}
					<div className="col-xxl-4 col-xl-6 d-flex">
						<div className="card mb-0 flex-fill">
							<div className="card-body">
								<div className="mb-4">
									<h2 className="mb-0 card-title">AI Hiring Predictions</h2>
								</div>

								{/* Item 1 */}
								<div className="card bg-info border-info mb-4">
									<div className="card-body">
										<h3 className="fs-16 fw-semibold text-white mb-2">High-Demand Alert: Frontend Developers</h3>
										<p className="fs-13 mb-4 text-white">Predicted need for 6 frontend developers by Q3. Market competition increasing. Recommend starting recruitment now</p>
										<div className="d-flex align-items-center gap-2">
											<span className="badge bg-white p-2 text-dark">Manager Action Needed</span>
											<span className="badge bg-white p-2 text-dark">30-day trend</span>
										</div>
									</div>
									<img src="/assets/img/icons/star.svg" alt="star-icon" className="img-fluid w-25 position-absolute bottom-0 end-0" />
								</div>

								{/* Item 2 */}
								<div className="card bg-purple border-purple mb-0">
									<div className="card-body">
										<h3 className="fs-16 fw-semibold text-white mb-2">Budget Optimization</h3>
										<p className="fs-13 mb-4 text-white">Development budget under-utilized by $35K. Recommend accelerating senior engineer hiring or increasing referral bonuses.</p>
										<div className="d-flex align-items-center gap-2">
											<span className="badge bg-white p-2 text-dark">High Priority</span>
											<span className="badge bg-white p-2 text-dark">Actionable</span>
										</div>
									</div>
									<img src="/assets/img/icons/star.svg" alt="star-icon" className="img-fluid w-25 position-absolute bottom-0 end-0" />
								</div>
							</div>
						</div>
					</div>
					{/* End AI Hiring Predictions */}

					{/* Start Active Position */}
					<div className="col-xxl-4 col-xl-6 d-flex">
						<div className="card mb-0 flex-fill">
							<div className="card-body">
								<div className="mb-4">
									<h2 className="mb-0 card-title">Active Position</h2>
								</div>
								{/* Item 1 */}
								<div className="bg-success-gradient-100 rounded p-2 d-flex align-items-center justify-content-between gap-2 flex-wrap mb-3">
									<div>
										<h3 className="fs-14 mb-2">Product Manager</h3>
										<div className="d-flex align-items-center gap-2">
											<p className="mb-0 d-flex align-items-center gap-1"> <i className="ti ti-users fw-medium text-gray-7"></i>15 Applicants</p>
											<span className="inner-line"></span>
											<p className="mb-0 d-flex align-items-center gap-1"> <i className="ti ti-clock-edit fw-medium text-gray-7"></i>3 Interview</p>
										</div>
									</div>
									<span className="badge badge-success d-inline-flex align-items-center">
										<i className="ti ti-point-filled me-1"></i>Active
									</span>
								</div>
								{/* Item 2 */}
								<div className="bg-success-gradient-100 rounded p-2 d-flex align-items-center justify-content-between gap-2 flex-wrap mb-3">
									<div>
										<h3 className="fs-14 mb-2">QA Analyst</h3>
										<div className="d-flex align-items-center gap-2">
											<p className="mb-0 d-flex align-items-center gap-1"> <i className="ti ti-users fw-medium text-gray-7"></i>12 Applicants</p>
											<span className="inner-line"></span>
											<p className="mb-0 d-flex align-items-center gap-1"> <i className="ti ti-clock-edit fw-medium text-gray-7"></i>2 Interview</p>
										</div>
									</div>
									<span className="badge badge-success d-inline-flex align-items-center">
										<i className="ti ti-point-filled me-1"></i>Active
									</span>
								</div>
								{/* Item 3 */}
								<div className="bg-success-gradient-100 rounded p-2 d-flex align-items-center justify-content-between gap-2 flex-wrap mb-3">
									<div>
										<h3 className="fs-14 mb-2">DevOps Engineer</h3>
										<div className="d-flex align-items-center gap-2">
											<p className="mb-0 d-flex align-items-center gap-1"> <i className="ti ti-users fw-medium text-gray-7"></i>16 Applicants</p>
											<span className="inner-line"></span>
											<p className="mb-0 d-flex align-items-center gap-1"> <i className="ti ti-clock-edit fw-medium text-gray-7"></i>5 Interview</p>
										</div>
									</div>
									<span className="badge badge-success d-inline-flex align-items-center">
										<i className="ti ti-point-filled me-1"></i>Active
									</span>
								</div>
								{/* Item 4 */}
								<div className="bg-danger-gradient-100 rounded p-2 d-flex align-items-center justify-content-between gap-2 flex-wrap mb-3">
									<div>
										<h3 className="fs-14 mb-2">Data Scientist</h3>
										<div className="d-flex align-items-center gap-2">
											<p className="mb-0 d-flex align-items-center gap-1"> <i className="ti ti-users fw-medium text-gray-7"></i>18 Applicants</p>
											<span className="inner-line"></span>
											<p className="mb-0 d-flex align-items-center gap-1"> <i className="ti ti-clock-edit fw-medium text-gray-7"></i>4 Interview</p>
										</div>
									</div>
									<span className="badge badge-danger d-inline-flex align-items-center">
										<i className="ti ti-point-filled me-1"></i>Closed
									</span>
								</div>
								{/* Item 5 */}
								<div className="bg-success-gradient-100 rounded p-2 d-flex align-items-center justify-content-between gap-2 flex-wrap">
									<div>
										<h3 className="fs-14 mb-2">UX Designer</h3>
										<div className="d-flex align-items-center gap-2">
											<p className="mb-0 d-flex align-items-center gap-1"> <i className="ti ti-users fw-medium text-gray-7"></i>22 Applicants</p>
											<span className="inner-line"></span>
											<p className="mb-0 d-flex align-items-center gap-1"> <i className="ti ti-clock-edit fw-medium text-gray-7"></i>6 Interview</p>
										</div>
									</div>
									<span className="badge badge-purple d-inline-flex align-items-center">
										<i className="ti ti-point-filled me-1"></i>Interview
									</span>
								</div>
							</div>
						</div>
					</div>
					{/* End Active Position */}
				</div>
				{/* end row */}

            </div>

			<div className="footer d-sm-flex align-items-center justify-content-between border-top bg-white p-3">
				<p className="mb-0">2014 - 2026 &copy; SmartHR.</p>
				<p>Designed &amp; Developed By <a href="#" onClick={(e) => e.preventDefault()} className="text-primary">Dreams</a></p>
			</div>

		</div>
		
    </>
  );
};

export default AiHiringForecast;
