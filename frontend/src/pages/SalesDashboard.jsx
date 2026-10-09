import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CompanyBar1, CompanyBar2, CompanyBar3, CompanyBar4, CompaniesChart, RevenueChart, PlanOverviewChart, RepPerformanceChart } from '../components/charts/DashboardCharts';
import PageHeader from '../components/common/PageHeader';
import { UptimeChart, ApiChart, TicketsChart, JobsChart } from '../components/charts/ItAdminCharts';
import axiosClient from '../api/axiosClient';
import { APP_CONFIG } from '../config/appConfig';
import Loader from '../components/common/Loader';

const SalesDashboard = () => {
  const [salesData, setSalesData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeFilter, setTimeFilter] = useState('all');

  useEffect(() => {
    const fetchSalesMetrics = async () => {
      try {
        setLoading(true);
        const res = await axiosClient.get(`/dashboard/sales-metrics?time_filter=${timeFilter}`);
        setSalesData(res.data || res);
      } catch (err) {
        console.error("Error fetching sales metrics:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSalesMetrics();
  }, [timeFilter]);


  const kpis = salesData?.kpis || {};
  const target = salesData?.target || {};
  const repPerformance = salesData?.rep_performance || [];
  const stageBreakdown = salesData?.stage_breakdown || [];
  const recentWins = salesData?.recent_wins || [];

  const formatCurrency = (val) => `₹${Number(val || 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  const getInitials = (name) => {
    if (!name) return '??';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    return name.substring(0, 2).toUpperCase();
  };

  const chartSources = stageBreakdown.map(s => ({ label: s.id, value: s.value }));
  const totalStageValue = stageBreakdown.reduce((sum, item) => sum + item.value, 0);
  const donutColors = ['#FFC107', '#1B84FF', '#F26522', '#2DCB73', '#4B3088', '#E91E63', '#9C27B0', '#00BCD4', '#8BC34A', '#795548'];

  const targetAchieved = target.monthly_achieved || 0;
  const targetGoal = target.monthly_target || 1;
  const targetPercent = Math.min(100, Math.round((targetAchieved / targetGoal) * 100));

  const backendUrl = APP_CONFIG.apiBaseUrl.replace('/api/v1', '');

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

				{loading ? (
					<Loader />
				) : (
					<>
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
												className="ti ti-calendar-stats me-1"></i>Updated : {target.updated_at ? new Date(target.updated_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
									</div>
								</div>
								
								<div className="row g-2">
									<div className="col-12">
										<div className="d-flex align-items-center justify-content-between mb-2">
											<p className="fs-13 text-dark mb-0">{formatCurrency(targetAchieved)} / {formatCurrency(targetGoal)} achieved</p>
											<h3 className="d-inline-flex align-items-center text-primary mb-0">{targetPercent.toFixed(1)}%</h3>
										</div>
										<div className="progress progress-xl mb-1" role="progressbar" aria-valuenow={targetPercent}
											aria-valuemin="0" aria-valuemax="100">
											<div className="progress-bar progress-bar-striped bg-primary" style={{width: `${targetPercent}%`}}>
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
										<h2 className="main-title mb-1">{formatCurrency(kpis.total_pipeline)}</h2>
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
										<h2 className="main-title mb-1">{formatCurrency(kpis.closed_revenue)}</h2>
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
										<h2 className="main-title mb-1">{formatCurrency(kpis.avg_deal_size)}</h2>
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
										<h2 className="main-title mb-1">{kpis.win_rate}%</h2>
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
										<p className="mb-0"><i className="ti ti-square-filled text-primary me-2"></i>Won Revenue</p>
										<p className="mb-0"><i className="ti ti-square-filled text-gray-2 me-2"></i>Active Pipeline</p>
									</div>
									<div className="dropdown mb-2">
										<Link to="#"
											className="btn btn-white border btn-sm d-inline-flex align-items-center"
											data-bs-toggle="dropdown">
											<i className="ti ti-calendar me-1"></i>{timeFilter === 'all' ? 'All Time' : timeFilter.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
										</Link>
										<ul className="dropdown-menu dropdown-menu-end p-3">
											<li><Link to="#" onClick={() => setTimeFilter('all')} className="dropdown-item rounded-1">All Time</Link></li>
											<li><Link to="#" onClick={() => setTimeFilter('1_month')} className="dropdown-item rounded-1">1 Month</Link></li>
											<li><Link to="#" onClick={() => setTimeFilter('3_months')} className="dropdown-item rounded-1">3 Months</Link></li>
											<li><Link to="#" onClick={() => setTimeFilter('6_months')} className="dropdown-item rounded-1">6 Months</Link></li>
											<li><Link to="#" onClick={() => setTimeFilter('1_year')} className="dropdown-item rounded-1">1 Year</Link></li>
										</ul>
									</div>
								</div>
								
								<div className="mt-auto">
									<RepPerformanceChart data={repPerformance} />
								</div>
							</div>
						</div>
					</div>
					{/* /Revenue */}

					{/* Top Plans */}
					<div className="col-lg-4 d-flex">
						<div className="card flex-fill">
							
							<div className="card-header pb-2 d-flex align-items-center justify-content-between flex-wrap">
								<h5 className="mb-2">Sales by Stage</h5>
							</div>
							<div className="card-body">
								<PlanOverviewChart sources={chartSources} />
								
								<div className="mt-3 pe-2 custom-scrollbar" style={{ maxHeight: '180px', overflowY: 'auto' }}>
									{stageBreakdown.length > 0 ? (
										stageBreakdown.map((stage, idx) => {
											const percent = totalStageValue > 0 ? Math.round((stage.value / totalStageValue) * 100) : 0;
											const color = donutColors[idx % donutColors.length];
											return (
												<div key={idx} className="d-flex align-items-center justify-content-between mb-2">
													<p className="f-13 mb-0">
														<i className="ti ti-circle-filled me-2" style={{ color: color }}></i>
														{stage.id} 
													</p>
													<div className="d-flex align-items-center gap-2">
														<p className="f-12 text-muted mb-0">{formatCurrency(stage.value)}</p>
														<p className="f-13 fw-medium text-gray-9 mb-0" style={{ minWidth: '35px', textAlign: 'right' }}>{percent}%</p>
													</div>
												</div>
											);
										})
									) : (
										<div className="text-center text-muted">No data available</div>
									)}
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
											{repPerformance.length > 0 ? (
                        repPerformance.map((rep, idx) => (
                          <tr key={idx}>
                            <td>
                              <div className="d-flex align-items-center">
                                {rep.profile_photo ? (
                                  <Link to="#" className="avatar avatar-md me-2 flex-shrink-0">
                                    <img src={rep.profile_photo.startsWith('http') ? rep.profile_photo : `${backendUrl}${rep.profile_photo}`} className="rounded-circle" alt="user" />
                                  </Link>
                                ) : (
                                  <Link to="#" className="avatar avatar-md me-2 bg-primary flex-shrink-0 rounded-circle">
                                    <span className="text-white fs-12">{getInitials(rep.name)}</span>
                                  </Link>
                                )}
                                <span className="fw-medium text-dark text-truncate d-inline-block" style={{ maxWidth: '120px' }} title={rep.name}>{rep.name}</span>
                              </div>
                            </td>
                            <td>{rep.won_deals} / {rep.total_deals}</td>
                            <td><span className="fw-bold">{formatCurrency(rep.won_revenue)}</span></td>
                            <td>
                              <span className={`badge ${rep.win_rate >= 50 ? 'bg-success-transparent text-success' : rep.win_rate > 0 ? 'bg-warning-transparent text-warning' : 'bg-danger-transparent text-danger'}`}>
                                {rep.win_rate}%
                              </span>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="4" className="text-center text-muted">No data available</td>
                        </tr>
                      )}
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
											{recentWins.length > 0 ? (
                        recentWins.map((win, idx) => (
                          <tr key={idx}>
                            <td>
                              <h6 className="fw-medium text-dark mb-1 text-truncate d-inline-block" style={{ maxWidth: '100px' }} title={win.title}>{win.title}</h6>
                              <div className="fs-12 text-muted">{new Date(win.date).toLocaleString()}</div>
                            </td>
                            <td><span className="fw-bold">{formatCurrency(win.amount)}</span></td>
                            <td>
                              <div className="d-flex align-items-center">
                                {win.rep_photo ? (
                                  <Link to="#" className="avatar avatar-sm me-2 flex-shrink-0">
                                    <img src={win.rep_photo.startsWith('http') ? win.rep_photo : `${backendUrl}${win.rep_photo}`} className="rounded-circle" alt="user" />
                                  </Link>
                                ) : (
                                  <Link to="#" className="avatar avatar-sm me-2 bg-primary flex-shrink-0 rounded-circle">
                                    <span className="text-white fs-12">{getInitials(win.rep_name)}</span>
                                  </Link>
                                )}
                                <span className="text-truncate d-inline-block text-dark fw-medium" style={{ maxWidth: '100px' }} title={win.rep_name}>{win.rep_name}</span>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="3" className="text-center text-muted">No recent wins</td>
                        </tr>
                      )}
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
				</div>
					</>
				)}
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
