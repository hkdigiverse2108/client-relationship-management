import React from 'react';
import { Link } from 'react-router-dom';
import { CompanyBar1, CompanyBar2, CompanyBar3, CompanyBar4, CompaniesChart, RevenueChart, PlanOverviewChart } from '../components/charts/DashboardCharts';
import PageHeader from '../components/common/PageHeader';
import ConversionFunnelChart from '../components/charts/ConversionFunnelChart';
import WhatsAppEngagementChart from '../components/charts/WhatsAppEngagementChart';
import ActivityHeatmapChart from '../components/charts/ActivityHeatmapChart';
import { BudgetChart } from '../components/charts/FinanceCharts';

const Dashboard = () => {
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
						<div className="mb-2">
							<div className="dropdown">
								<a href="#" onClick={(e) => e.preventDefault()}
									className="dropdown-toggle btn btn-primary d-inline-flex align-items-center"
									data-bs-toggle="dropdown">
									<i className="ti ti-file-export me-1"></i>Export Report
								</a>
								<ul className="dropdown-menu dropdown-menu-end p-3">
									<li>
										<a href="#" onClick={(e) => e.preventDefault()} className="dropdown-item rounded-1"><i
												className="ti ti-file-type-pdf me-1"></i>Export as PDF</a>
									</li>
									<li>
										<a href="#" onClick={(e) => e.preventDefault()} className="dropdown-item rounded-1"><i
												className="ti ti-file-type-xls me-1"></i>Export as Excel </a>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</PageHeader>
				{/* /Breadcrumb */}

			
				<div className="row">

					{/* Total Companies */}
					<div className="col-xl-3 col-sm-6 d-flex">
						<div className="card flex-fill">
							<div className="card-body">
								<div className="d-flex align-items-center justify-content-between">
									<span className="avatar avatar-md bg-dark mb-3">
										<i className="ti ti-report-money fs-16"></i>
									</span>
									<span className="badge bg-success fw-normal mb-3">
										+19.01%
									</span>
								</div>
								<div className="d-flex align-items-center justify-content-between">
									<div>
										<h2 className="mb-1">5468</h2>
										<p className="fs-13">Total Revenue</p>
									</div>
									<CompanyBar1 />
								</div>
							</div>
						</div>
					</div>
					{/* /Total Companies */}

					{/* Active Companies */}
					<div className="col-xl-3 col-sm-6 d-flex">
						<div className="card flex-fill">
							<div className="card-body">
								<div className="d-flex align-items-center justify-content-between">
									<span className="avatar avatar-md bg-dark mb-3">
										<i className="ti ti-target fs-16"></i>
									</span>
									<span className="badge bg-danger fw-normal mb-3">
										-12%
									</span>
								</div>
								<div className="d-flex align-items-center justify-content-between">
									<div>
										<h2 className="mb-1">4598</h2>
										<p className="fs-13">Active Leads</p>
									</div>
									<CompanyBar2 />
								</div>
							</div>
						</div>
					</div>
					{/* /Active Companies */}

					{/* Total Subscribers */}
					<div className="col-xl-3 col-sm-6 d-flex">
						<div className="card flex-fill">
							<div className="card-body">
								<div className="d-flex align-items-center justify-content-between">
									<span className="avatar avatar-md bg-dark mb-3">
										<i className="ti ti-trending-up fs-16"></i>
									</span>
									<span className="badge bg-success fw-normal mb-3">
										+6%
									</span>
								</div>
								<div className="d-flex align-items-center justify-content-between">
									<div>
										<h2 className="mb-1">3698</h2>
										<p className="fs-13">Conversion Rate</p>
									</div>
									<CompanyBar3 />
								</div>
							</div>
						</div>
					</div>
					{/* /Total Subscribers */}

					{/* Total Earnings */}
					<div className="col-xl-3 col-sm-6 d-flex">
						<div className="card flex-fill">
							<div className="card-body">
								<div className="d-flex align-items-center justify-content-between">
									<span className="avatar avatar-md bg-dark mb-3">
										<i className="ti ti-brand-whatsapp fs-16"></i>
									</span>
									<span className="badge bg-danger fw-normal mb-3">
										-16%
									</span>
								</div>
								<div className="d-flex align-items-center justify-content-between">
									<div>
										<h2 className="mb-1">$89,878,58</h2>
										<p className="fs-13">WhatsApp Volume
</p>
									</div>
									<CompanyBar4 />
								</div>
							</div>
						</div>
					</div>
					{/* /Total Earnings */}

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
								<div className="dropdown mb-2">
									<Link to="#"
										className="btn btn-white border btn-sm d-inline-flex align-items-center"
										data-bs-toggle="dropdown">
										<i className="ti ti-calendar me-1"></i>1 Month
									</Link>
									<ul className="dropdown-menu  dropdown-menu-end p-3">
										<li>
											<Link to="#" className="dropdown-item rounded-1">1 Month</Link>
										</li>
										<li>
											<Link to="#" className="dropdown-item rounded-1">3 Months</Link>
										</li>
										<li>
											<Link to="#" className="dropdown-item rounded-1">6 Months</Link>
										</li>
										<li>
											<Link to="#" className="dropdown-item rounded-1">1 Year</Link>
										</li>
									</ul>
								</div>
							</div>
							<div className="card-body pb-0">
								<BudgetChart />
							</div>
						</div>
					</div>
					{/* /Revenue */}

					{/* Top Plans */}
					<div className="col-lg-4 d-flex">
						<div className="card flex-fill">
							
							<div className="card-header pb-2 d-flex align-items-center justify-content-between flex-wrap">
								<h5 className="mb-2">Lead sources
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

					{/* Conversion Funnel */}
					<div className="col-lg-6 d-flex">
						<div className="card flex-fill">
							<div className="card-header pb-2 d-flex align-items-center justify-content-between flex-wrap">
								<h5 className="mb-2">Conversion Funnel</h5>
							</div>
							<div className="card-body">
								<ConversionFunnelChart />
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
								<div className="d-sm-flex justify-content-between flex-wrap mb-3">
									<div className="d-flex align-items-center mb-2">
										<a href="#" onClick={(e) => e.preventDefault()}
											className="avatar avatar-md bg-gray-100 rounded-circle flex-shrink-0">
											<img src="/assets/img/icons/company-icon-11.svg"
												className="img-fluid w-auto h-auto" alt="img" />
										</a>
										<div className="ms-2 flex-fill">
											<h6 className="fs-medium text-truncate mb-1"><a
													href="#" onClick={(e) => e.preventDefault()}>Pitch</a></h6>
											<p className="fs-13">Basic (Monthly)</p>
										</div>
									</div>
									
								</div>
								<div className="d-sm-flex justify-content-between flex-wrap mb-3">
									<div className="d-flex align-items-center mb-2">
										<a href="#" onClick={(e) => e.preventDefault()}
											className="avatar avatar-md bg-gray-100 rounded-circle flex-shrink-0">
											<img src="/assets/img/icons/company-icon-12.svg"
												className="img-fluid w-auto h-auto" alt="img" />
										</a>
										<div className="ms-2 flex-fill">
											<h6 className="fs-medium text-truncate mb-1"><a
													href="#" onClick={(e) => e.preventDefault()}>Initech</a></h6>
											<p className="fs-13">Enterprise (Yearly)</p>
										</div>
									</div>
									
								</div>
								<div className="d-sm-flex justify-content-between flex-wrap mb-3">
									<div className="d-flex align-items-center mb-2">
										<a href="#" onClick={(e) => e.preventDefault()}
											className="avatar avatar-md bg-gray-100 rounded-circle flex-shrink-0">
											<img src="/assets/img/icons/company-icon-13.svg"
												className="img-fluid w-auto h-auto" alt="img" />
										</a>
										<div className="ms-2 flex-fill">
											<h6 className="fs-medium text-truncate mb-1"><a
													href="#" onClick={(e) => e.preventDefault()}>Umbrella Corp</a></h6>
											<p className="fs-13">Advanced (Monthly)</p>
										</div>
									</div>
									
								</div>
								<div className="d-sm-flex justify-content-between flex-wrap mb-3">
									<div className="d-flex align-items-center mb-2">
										<a href="#" onClick={(e) => e.preventDefault()}
											className="avatar avatar-md bg-gray-100 rounded-circle flex-shrink-0">
											<img src="/assets/img/icons/company-icon-14.svg"
												className="img-fluid w-auto h-auto" alt="img" />
										</a>
										<div className="ms-2 flex-fill">
											<h6 className="fs-medium text-truncate mb-1"><a
													href="#" onClick={(e) => e.preventDefault()}>Capital Partners</a></h6>
											<p className="fs-13">Enterprise (Monthly)</p>
										</div>
									</div>
									
								</div>
								<div className="d-sm-flex justify-content-between flex-wrap mb-1">
									<div className="d-flex align-items-center mb-2">
										<a href="#" onClick={(e) => e.preventDefault()}
											className="avatar avatar-md bg-gray-100 rounded-circle flex-shrink-0">
											<img src="/assets/img/icons/company-icon-15.svg"
												className="img-fluid w-auto h-auto" alt="img" />
										</a>
										<div className="ms-2 flex-fill">
											<h6 className="fs-medium text-truncate mb-1"><a
													href="#" onClick={(e) => e.preventDefault()}>Massive Dynamic</a></h6>
											<p className="fs-13">Premium (Yearly)</p>
										</div>
									</div>
									
								</div>
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
								<ActivityHeatmapChart />
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
