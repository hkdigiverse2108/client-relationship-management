import React from 'react';
import { Link } from 'react-router-dom';
import { CompanyBar1, CompanyBar2, CompanyBar3, CompanyBar4, CompaniesChart, RevenueChart, PlanOverviewChart } from '../components/charts/DashboardCharts';
import PageHeader from '../components/common/PageHeader';
import ConversionFunnelChart from '../components/charts/ConversionFunnelChart';
import WhatsAppEngagementChart from '../components/charts/WhatsAppEngagementChart';
import ActivityHeatmapChart from '../components/charts/ActivityHeatmapChart';
import { UptimeChart, ApiChart, TicketsChart, JobsChart } from '../components/charts/ItAdminCharts';
import { HeadcountChart } from '../components/charts/FinanceCharts';

const SalesDashboard = () => {
  return (
    <>
      <div className="page-wrapper">
			<div className="content">

				{/* Breadcrumb */}
				<PageHeader 
					title="Sales Dashboard"
					breadcrumbs={[
						{ label: 'Dashboard' },
						{ label: 'Dashboard' },
						{ label: 'Sales', active: true }
					]}
				>
					
				</PageHeader>
				{/* /Breadcrumb */}

				
				<div className="row">
					<div className="col-12 d-flex">
						<div className="card flex-fill">
							<div className="card-body">
								<div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-4">
									<div className="d-flex align-items-center">
										<div className="avatar drop-shadow-xs border border-white avatar-rounded z-1 me-3">
											<img src="/assets/img/icons/title-icon-01.svg" alt="icon"
												className="img-fluid w-auto h-auto rounded-0" />
											<img src="/assets/img/bg/title-bg-01.png" alt="bg"
												className="position-absolute top-0 start-0 title-bg z-n1 rounded-0" />
										</div>
										<h5 className="mb-0">Monthly Sales Target</h5>
									</div>
									<div>
										<span className="border rounded-pill d-inline-flex align-items-center py-1 px-2"><i
												className="ti ti-calendar-stats me-1"></i>Updated : 15 Jan 2025</span>
									</div>
								</div>
								
								<div className="row g-2">
									<div className="col-12">
										<div className="d-flex align-items-center justify-content-between mb-2">
											<p className="fs-13 text-dark mb-0">₹1,57,500.00 / ₹3,50,000.00 achieved</p>
											<h3 className="d-inline-flex align-items-center text-primary mb-0">45.0%</h3>
										</div>
										<div className="progress progress-xl mb-1" role="progressbar" aria-valuenow="45"
											aria-valuemin="0" aria-valuemax="100">
											<div className="progress-bar progress-bar-striped bg-primary" style={{width: '45%'}}>
											</div>
										</div>
									</div>
								</div>
							</div> {/* end card body */}
						</div> {/* end card */}
					</div> {/* end col */}
				</div>






				
			
				<div className="row row-gap-4 mb-4">
					{/* Item 1 */}
					<div className="col-xxl-3 col-xl-6 col-lg-6 col-md-6 col-sm-6 d-flex">
						<div className="card mb-0 flex-fill">
							<div className="card-body">
								<div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-3">
									<p className="mb-0">Total Pipeline</p>
									<div className="avatar avatar bg-light rounded-circle border">
										<i className="ti ti-report-money text-gray-6 fs-20"></i>
									</div>
								</div>
								<div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
									<div>
										<h2 className="main-title mb-1">₹2,40,000.00</h2>
										<p className="mb-0 fs-13"><span className="text-success fw-medium me-1"><i className="ti ti-arrow-up-right"></i> 15%</span> vs last month</p>
									</div>
									<div>
										<UptimeChart />
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Item 2 */}
					<div className="col-xxl-3 col-xl-6 col-lg-6 col-md-6 col-sm-6 d-flex">
						<div className="card mb-0 flex-fill">
							<div className="card-body">
								<div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-3">
									<p className="mb-0">Closed Won Revenue</p>
									<div className="avatar avatar bg-light rounded-circle border">
										<i className="ti ti-cash text-gray-6 fs-20"></i>
									</div>
								</div>
								<div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
									<div>
										<h2 className="main-title mb-1">₹1,90,000.00</h2>
										<p className="mb-0 fs-13"><span className="text-success fw-medium me-1"><i className="ti ti-arrow-up-right"></i> 8%</span> vs last month</p>
									</div>
									<div>
										<ApiChart />
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Item 3 */}
					<div className="col-xxl-3 col-xl-6 col-lg-6 col-md-6 col-sm-6 d-flex">
						<div className="card mb-0 flex-fill">
							<div className="card-body">
								<div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-3">
									<p className="mb-0">Average Deal Size</p>
									<div className="avatar avatar bg-light rounded-circle border">
										<i className="ti ti-calculator text-gray-6 fs-20"></i>
									</div>
								</div>
								<div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
									<div>
										<h2 className="main-title mb-1">₹63,333.33</h2>
										<p className="mb-0 fs-13"><span className="text-danger fw-medium me-1"><i className="ti ti-arrow-down-right"></i> 2%</span> vs last month</p>
									</div>
									<div>
										<TicketsChart />
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Item 4 */}
					<div className="col-xxl-3 col-xl-6 col-lg-6 col-md-6 col-sm-6 d-flex">
						<div className="card mb-0 flex-fill">
							<div className="card-body">
								<div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-3">
									<p className="mb-0">Win Rate</p>
									<div className="avatar avatar bg-light rounded-circle border">
										<i className="ti ti-trophy text-gray-6 fs-20"></i>
									</div>
								</div>
								<div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
									<div>
										<h2 className="main-title mb-1">30%</h2>
										<p className="mb-0 fs-13"><span className="text-success fw-medium me-1"><i className="ti ti-arrow-up-right"></i> 5%</span> vs last month</p>
									</div>
									<div>
										<JobsChart />
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="row">

					

					{/* Revenue */}
					<div className="col-lg-8 d-flex">
						<div className="card flex-fill">
							
							<div className="card-body pb-0 d-flex flex-column">
								<div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-3">
									<h2 className="card-title mb-0 text-decoration-underline">Rep-wise Performance</h2>
									<div className="d-flex align-items-center gap-3">
										<p className="mb-0"><i className="ti ti-square-filled text-primary me-2"></i>Payroll Growth</p>
										<p className="mb-0"><i className="ti ti-square-filled text-gray-2 me-2"></i>Head Count</p>
									</div>
									<div className="dropdown mb-2">
										<Link to="#"
											className="btn btn-white border btn-sm d-inline-flex align-items-center"
											data-bs-toggle="dropdown">
											<i className="ti ti-calendar me-1"></i>1 Month
										</Link>
										<ul className="dropdown-menu dropdown-menu-end p-3">
											<li><Link to="#" className="dropdown-item rounded-1">1 Month</Link></li>
											<li><Link to="#" className="dropdown-item rounded-1">3 Months</Link></li>
											<li><Link to="#" className="dropdown-item rounded-1">6 Months</Link></li>
											<li><Link to="#" className="dropdown-item rounded-1">1 Year</Link></li>
										</ul>
									</div>
								</div>
								
								<div className="mt-auto">
									<HeadcountChart />
								</div>
							</div>
						</div>
					</div>
					{/* /Revenue */}

					{/* Top Plans */}
					<div className="col-lg-4 d-flex">
						<div className="card flex-fill">
							
							<div className="card-header pb-2 d-flex align-items-center justify-content-between flex-wrap">
								<h5 className="mb-2">Sales by Stage
</h5>
								
							</div>
							<div className="card-body">
								<PlanOverviewChart />
								<div className="d-flex align-items-center justify-content-between mb-2">
									<p className="f-13 mb-0"><i className="ti ti-circle-filled text-primary me-1"></i>Basic </p>
									<p className="f-13 fw-medium text-gray-9">60%</p>
								</div>
								<div className="d-flex align-items-center justify-content-between mb-2">
									<p className="f-13 mb-0"><i className="ti ti-circle-filled text-warning me-1"></i>Premium
									</p>
									<p className="f-13 fw-medium text-gray-9">20%</p>
								</div>
								<div className="d-flex align-items-center justify-content-between mb-0">
									<p className="f-13 mb-0"><i className="ti ti-circle-filled text-info me-1"></i>Enterprise
									</p>
									<p className="f-13 fw-medium text-gray-9">20%</p>
								</div>
							</div>
						</div>
					</div>
					{/* /Top Plans */}

				</div>
				<div className="row">
					{/* Sales Leaderboard */}
					<div className="col-xl-6 d-flex">
						<div className="card flex-fill">
							<div className="card-header d-flex align-items-center justify-content-between flex-wrap gap-2">
								<h2 className="mb-0 card-title">Sales Leaderboard</h2>
							</div>
							<div className="card-body p-0">
								<div className="table-responsive custom-table">
									<table className="table table-nowrap table-striped custom-table mb-0">
										<thead>
											<tr>
												<th>REP NAME</th>
												<th>WON DEALS</th>
												<th>GENERATED REVENUE</th>
												<th>WIN RATE</th>
											</tr>
										</thead>
										<tbody>
											<tr className="d-none"></tr>
											<tr>
												<td><span className="fw-medium text-dark">Divya Vinubhai Dhandhukiya</span></td>
												<td>1 / 4</td>
												<td><span className="fw-bold">₹85,000.00</span></td>
												<td><span className="badge bg-warning-transparent text-warning">25%</span></td>
											</tr>
											<tr>
												<td><span className="fw-medium text-dark">Krisha Rameshbhai Shah</span></td>
												<td>1 / 3</td>
												<td><span className="fw-bold">₹70,000.00</span></td>
												<td><span className="badge bg-warning-transparent text-warning">33.3%</span></td>
											</tr>
											<tr>
												<td><span className="fw-medium text-dark">Vatsal Prakashbahi Kamliya</span></td>
												<td>1 / 1</td>
												<td><span className="fw-bold">₹35,000.00</span></td>
												<td><span className="badge bg-success-transparent text-success">100%</span></td>
											</tr>
											<tr>
												<td><span className="fw-medium text-dark">Parth Lathiya</span></td>
												<td>0 / 1</td>
												<td><span className="fw-bold">₹0.00</span></td>
												<td><span className="badge bg-warning-transparent text-warning">0%</span></td>
											</tr>
											<tr>
												<td><span className="fw-medium text-dark">Hetal Sudhirbhai Sudani</span></td>
												<td>0 / 1</td>
												<td><span className="fw-bold">₹0.00</span></td>
												<td><span className="badge bg-warning-transparent text-warning">0%</span></td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>

					{/* Recent Big Wins */}
					<div className="col-xl-6 d-flex">
						<div className="card flex-fill">
							<div className="card-header d-flex align-items-center justify-content-between flex-wrap gap-2">
								<h2 className="mb-0 card-title">Recent Big Wins</h2>
							</div>
							<div className="card-body p-0">
								<div className="table-responsive custom-table">
									<table className="table table-nowrap table-striped custom-table mb-0">
										<thead>
											<tr>
												<th>DEAL</th>
												<th>AMOUNT</th>
												<th>CLOSED BY</th>
											</tr>
										</thead>
										<tbody>
											<tr className="d-none"></tr>
											<tr>
												<td>
													<h6 className="fw-medium text-dark mb-1">Soap Website</h6>
													<span className="fs-12 text-muted">Aug 18, 2026 10:06 AM</span>
												</td>
												<td><span className="fw-bold">₹85,000.00</span></td>
												<td>Divya Vinubhai Dhandhukiya</td>
											</tr>
											<tr>
												<td>
													<h6 className="fw-medium text-dark mb-1">Test Deal</h6>
													<span className="fs-12 text-muted">Aug 07, 2026 10:12 AM</span>
												</td>
												<td><span className="fw-bold">₹35,000.00</span></td>
												<td>Vatsal Prakashbahi Kamliya</td>
											</tr>
											<tr>
												<td>
													<h6 className="fw-medium text-dark mb-1">AI Agent</h6>
													<span className="fs-12 text-muted">Aug 06, 2026 6:11 PM</span>
												</td>
												<td><span className=" fw-bold">₹70,000.00</span></td>
												<td>Krisha Rameshbhai Shah</td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
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

export default SalesDashboard;
