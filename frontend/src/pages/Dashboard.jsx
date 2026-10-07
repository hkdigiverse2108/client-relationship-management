import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CompanyBar1, CompanyBar2, CompanyBar3, CompanyBar4, PlanOverviewChart } from '../components/charts/DashboardCharts';
import PageHeader from '../components/common/PageHeader';
import ConversionFunnelChart from '../components/charts/ConversionFunnelChart';
import WhatsAppEngagementChart from '../components/charts/WhatsAppEngagementChart';
import ActivityHeatmapChart from '../components/charts/ActivityHeatmapChart';
import { BudgetChart } from '../components/charts/FinanceCharts';
import axiosClient from '../api/axiosClient';

const Dashboard = () => {
  const [statsData, setStatsData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const res = await axiosClient.get('/dashboard/stats');
        setStatsData(res.data || res);
      } catch (err) {
        console.error("Error fetching dashboard stats:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return <div className="p-5 text-center">Loading dashboard data...</div>;
  }

  // Extract stats
  const stats = statsData?.stats || [];
  const getStat = (key) => stats.find(s => s.key === key) || { value: 0, delta: 0, trend: 'up' };

  const revenueStat = getStat('revenue');
  const leadsStat = getStat('deals');
  const convStat = getStat('leads');
  const waStat = getStat('winrate'); // using the static one as defined in backend

  // Extract sources
  const sources = statsData?.sources || [];
  const sourceColors = ['#FFC107', '#1B84FF', '#F26522', '#2DCB73', '#4B3088', '#E91E63', '#9C27B0', '#00BCD4', '#8BC34A', '#795548'];
  
  // Format Currency
  const formatCurrency = (val) => {
    if (val >= 1000000) return `₹${(val / 1000000).toFixed(1)}M`;
    if (val >= 1000) return `₹${(val / 1000).toFixed(1)}K`;
    return `₹${val.toLocaleString()}`;
  };

  return (
    <>
      <div className="page-wrapper">
			<div className="content">

				{/* Breadcrumb */}
				<PageHeader 
					title="Dashboard"
					breadcrumbs={[
						{ label: 'Dashboard' },
						{ label: 'Dashboard' },
						{ label: 'Main KPI', active: true }
					]}
				>
					<div className="d-flex align-items-center flex-wrap">
						<div className="me-2 mb-2">
							<a href="#" onClick={(e) => e.preventDefault()} className="btn btn-white d-inline-flex align-items-center">
								<i className="ti ti-calendar me-1"></i>Last 30 Days
							</a>
						</div>
					</div>
				</PageHeader>
				{/* /Breadcrumb */}

			
				<div className="row">

					{/* Total Revenue */}
					<div className="col-xl-3 col-sm-6 d-flex">
						<div className="card flex-fill">
							<div className="card-body">
								<div className="d-flex align-items-center justify-content-between">
									<span className="avatar avatar-md bg-dark mb-3">
										<i className="ti ti-report-money fs-16"></i>
									</span>
									<span className={`badge bg-${revenueStat.trend === 'up' ? 'success' : 'danger'} fw-normal mb-3`}>
										{revenueStat.trend === 'up' ? '+' : ''}{revenueStat.delta}%
									</span>
								</div>
								<div className="d-flex align-items-center justify-content-between">
									<div>
										<h2 className="mb-1">{formatCurrency(revenueStat.value)}</h2>
										<p className="fs-13">{revenueStat.label}</p>
									</div>
									<CompanyBar1 />
								</div>
							</div>
						</div>
					</div>
					{/* /Total Revenue */}

					{/* Active Leads */}
					<div className="col-xl-3 col-sm-6 d-flex">
						<div className="card flex-fill">
							<div className="card-body">
								<div className="d-flex align-items-center justify-content-between">
									<span className="avatar avatar-md bg-dark mb-3">
										<i className="ti ti-target fs-16"></i>
									</span>
									<span className={`badge bg-${leadsStat.trend === 'up' ? 'success' : 'danger'} fw-normal mb-3`}>
										{leadsStat.trend === 'up' ? '+' : ''}{leadsStat.delta}%
									</span>
								</div>
								<div className="d-flex align-items-center justify-content-between">
									<div>
										<h2 className="mb-1">{leadsStat.value.toLocaleString()}</h2>
										<p className="fs-13">{leadsStat.label}</p>
									</div>
									<CompanyBar2 />
								</div>
							</div>
						</div>
					</div>
					{/* /Active Leads */}

					{/* Conversion Rate */}
					<div className="col-xl-3 col-sm-6 d-flex">
						<div className="card flex-fill">
							<div className="card-body">
								<div className="d-flex align-items-center justify-content-between">
									<span className="avatar avatar-md bg-dark mb-3">
										<i className="ti ti-trending-up fs-16"></i>
									</span>
									<span className={`badge bg-${convStat.trend === 'up' ? 'success' : 'danger'} fw-normal mb-3`}>
										{convStat.trend === 'up' ? '+' : ''}{convStat.delta}%
									</span>
								</div>
								<div className="d-flex align-items-center justify-content-between">
									<div>
										<h2 className="mb-1">{convStat.value}%</h2>
										<p className="fs-13">{convStat.label}</p>
									</div>
									<CompanyBar3 />
								</div>
							</div>
						</div>
					</div>
					{/* /Conversion Rate */}

					{/* WhatsApp Volume */}
					<div className="col-xl-3 col-sm-6 d-flex">
						<div className="card flex-fill">
							<div className="card-body">
								<div className="d-flex align-items-center justify-content-between">
									<span className="avatar avatar-md bg-dark mb-3">
										<i className="ti ti-brand-whatsapp fs-16"></i>
									</span>
									<span className={`badge bg-${waStat.trend === 'up' ? 'success' : 'danger'} fw-normal mb-3`}>
										{waStat.trend === 'up' ? '+' : ''}{waStat.delta}%
									</span>
								</div>
								<div className="d-flex align-items-center justify-content-between">
									<div>
										<h2 className="mb-1">{waStat.value}K</h2>
										<p className="fs-13">{waStat.label}</p>
									</div>
									<CompanyBar4 />
								</div>
							</div>
						</div>
					</div>
					{/* /WhatsApp Volume */}

				</div>

				<div className="row">

					{/* Revenue */}
					<div className="col-lg-8 d-flex">
						<div className="card flex-fill">
							<div className="card-header pb-2 d-flex align-items-center justify-content-between flex-wrap">
								<div>
								<h5 className="">Department Budget vs Actual</h5>
								<p className='text-muted'>Projected vs. Actual monthly earnings</p>
								</div>
							</div>
							<div className="card-body pb-0">
								<BudgetChart />
							</div>
						</div>
					</div>
					{/* /Revenue */}

					{/* Lead Sources */}
					<div className="col-lg-4 d-flex">
						<div className="card flex-fill">
							<div className="card-header pb-2 d-flex align-items-center justify-content-between flex-wrap">
								<h5 className="mb-2">Lead sources</h5>
							</div>
							<div className="card-body">
								<PlanOverviewChart sources={sources} />
								{sources.map((src, idx) => (
									<div key={idx} className={`d-flex align-items-center justify-content-between mb-${idx === sources.length - 1 ? '0' : '2'}`}>
										<p className="f-13 mb-0">
											<i className="ti ti-circle-filled me-1" style={{ color: sourceColors[idx % sourceColors.length] }}></i>
											{src.label.split('(')[0].trim()}
										</p>
										<p className="f-13 fw-medium text-gray-9">{src.label.match(/\((.*?)\)/)?.[1]}</p>
									</div>
								))}
                {sources.length === 0 && (
                  <div className="text-center text-muted mt-4">No sources found</div>
                )}
							</div>
						</div>
					</div>
					{/* /Lead Sources */}

				</div>

				<div className="row">

					{/* Conversion Funnel */}
					<div className="col-lg-6 d-flex">
						<div className="card flex-fill">
							<div className="card-header pb-2 d-flex align-items-center justify-content-between flex-wrap">
								<h5 className="mb-2">Conversion Funnel</h5>
							</div>
							<div className="card-body">
								<ConversionFunnelChart funnelData={statsData?.funnel || []} />
							</div>
						</div>
					</div>
					{/* /Conversion Funnel */}
					
					{/* WhatsApp Engagement */}
					<div className="col-lg-6 d-flex">
						<div className="card flex-fill">
							<div className="card-header pb-2 d-flex align-items-center justify-content-between flex-wrap">
								<h5 className="mb-2 d-flex align-items-center"><span className="bg-success me-2" style={{ width: '4px', height: '16px', borderRadius: '2px' }}></span>WhatsApp Engagement</h5>
								<span className="badge bg-success-transparent text-success fw-medium d-inline-flex align-items-center px-2 py-1 rounded">
									<i className="ti ti-circle-filled fs-10 me-1"></i>Live
								</span>
							</div>
							<div className="card-body">
								<WhatsAppEngagementChart />
							</div>
						</div>
					</div>
					{/* /WhatsApp Engagement */}
					
				</div>

				<div className="row">

					{/* Recent Activity */}
					<div className="col-xl-6 d-flex">
						<div className="card flex-fill">
							<div className="card-header pb-2 d-flex align-items-center justify-content-between flex-wrap">
								<h5 className="mb-2">Recent activity</h5>
							</div>
							<div className="card-body pb-2">
								{statsData?.activity?.map((act, index) => (
									<div key={act.id || index} className="d-sm-flex justify-content-between flex-wrap mb-3">
										<div className="d-flex align-items-center mb-2">
											<div className="avatar avatar-md bg-gray-100 rounded-circle flex-shrink-0 d-flex align-items-center justify-content-center">
                        {act.profile_photo ? (
                          <img 
                            src={`${import.meta.env.VITE_APP_API_URL?.replace('/api/v1', '') || 'http://localhost:8000'}${act.profile_photo}`} 
                            alt="Profile" 
                            className="img-fluid rounded-circle w-100 h-100" 
                            style={{ objectFit: 'cover' }}
                          />
                        ) : (
                          <span className="text-primary fs-14 fw-bold">
                            {act.user_name ? act.user_name.substring(0, 2).toUpperCase() : 'NA'}
                          </span>
                        )}
											</div>
											<div className="ms-2 flex-fill">
												<h6 className="fs-medium text-truncate mb-1">{act.text}</h6>
												<p className="fs-13">{new Date(act.time).toLocaleString()}</p>
											</div>
										</div>
									</div>
								))}
                {(!statsData?.activity || statsData.activity.length === 0) && (
                  <div className="text-center text-muted py-4">No recent activity</div>
                )}
							</div>
						</div>
					</div>
					{/* /Recent Activity */}

					{/* Activity Heatmap */}
					<div className="col-xl-6 d-flex">
						<div className="card flex-fill">
							<div className="card-header pb-2 d-flex align-items-center justify-content-between flex-wrap">
								<h5 className="mb-2 d-flex align-items-center"><i className="ti ti-activity text-primary fs-20 me-2"></i>Activity Heatmap — 30 Days</h5>
							</div>
							<div className="card-body">
								<ActivityHeatmapChart heatmapData={statsData?.heatmap || []} />
							</div>
						</div>
					</div>
					{/* /Activity Heatmap */}
				
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

export default Dashboard;
