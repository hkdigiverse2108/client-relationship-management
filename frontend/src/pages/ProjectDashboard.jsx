import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/common/PageHeader';
import ClientStatCard from '../components/common/ClientStatCard';
import ChartStatCard from '../components/common/ChartStatCard';
import { StatisticsChart, StatisticsChartTwo, StatisticsChartThree, StatisticsChartFour } from '../components/charts/AiHiringCharts';
import { ProjectCategoryChart, ProjectStatusChart, TeamProductivityChart, FinancialOverviewChart } from '../components/charts/ProjectDashboardCharts';
import CustomDataTable from '../components/common/CustomDataTable';
import axiosClient from '../api/axiosClient';

const ProjectDashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const res = await axiosClient.get('/project-dashboard/stats');
        setDashboardData(res.data || res);
      } catch (err) {
        console.error("Error fetching dashboard stats:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardStats();
  }, []);

  const stats = dashboardData?.projectStats || { total: 0, active: 0, completed: 0, overdue: 0, onHold: 0, endingSoon: 0 };

  const finStats = dashboardData?.finStats || { 
    totalValue: '₹0', amountReceived: '₹0', pendingPayments: '₹0', netProfit: '₹0',
    tvTrend: { isUp: true, percent: 0, text: '0%' },
    arTrend: { isUp: true, percent: 0, text: '0%' },
    ppTrend: { isUp: true, percent: 0, text: '0%' },
    npTrend: { isUp: true, percent: 0, text: '0%' },
    rawValues: { totalValue: 0, amountReceived: 0, pendingPayments: 0, netProfit: 0 }
  };

  const categoryData = dashboardData?.categoryData || [];

  const statusData = dashboardData?.statusData || [];
  const recentProjectsData = dashboardData?.recentProjectsData || [];

  const projectColumns = [
    { name: 'PROJECT NAME', selector: row => row.name, sortable: true },
    { name: 'CATEGORY', selector: row => row.category, sortable: true },
    { 
      name: 'STAGE', 
      selector: row => row.stage, 
      sortable: true,
      cell: (row) => (
        <span className={`badge badge-${row.badgeClass} badge-xs d-inline-flex align-items-center`}>
          <i className="ti ti-point-filled me-1"></i>{row.stage}
        </span>
      )
    },
    { name: 'END DATE', selector: row => row.endDate, sortable: true },
    { name: 'VALUE', selector: row => row.value, sortable: true }
  ];

  if (loading) {
    return (
      <div className="page-wrapper d-flex justify-content-center align-items-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <div className="content">
        {/* Breadcrumb */}
        <PageHeader 
          title="Project Dashboard"
          breadcrumbs={[
            { label: 'Dashboard' },
            { label: 'Projects' },
            { label: 'Dashboard', active: true }
          ]}
        >
          <div className="input-icon-start position-relative">
            <span className="input-icon-addon">
              <i className="ti ti-search"></i>
            </span>
            <input 
              type="text" 
              className="form-control" 
              placeholder="Search" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </PageHeader>
        {/* /Breadcrumb */}

        <h4 className="mb-3">Project Metrics</h4>
        <div className="row">
          <ClientStatCard 
            colClass="col-xl-2 col-lg-4 col-md-6 d-flex"
            title="Total Projects"
            value={stats.total.toString()}
            icon="ti ti-box"
            iconBgClass="bg-pink-transparent border border-pink"
            iconColorClass="text-pink"
          />
          <ClientStatCard 
            colClass="col-xl-2 col-lg-4 col-md-6 d-flex"
            title="Active Projects"
            value={stats.active.toString()}
            icon="ti ti-activity"
            iconBgClass="bg-success-transparent border border-success"
            iconColorClass="text-success"
          />
          <ClientStatCard 
            colClass="col-xl-2 col-lg-4 col-md-6 d-flex"
            title="Completed Projects"
            value={stats.completed.toString()}
            icon="ti ti-check"
            iconBgClass="bg-danger-transparent border border-danger"
            iconColorClass="text-danger"
          />
          <ClientStatCard 
            colClass="col-xl-2 col-lg-4 col-md-6 d-flex"
            title="Overdue Projects"
            value={stats.overdue.toString()}
            icon="ti ti-clock"
            iconBgClass="bg-info-transparent border border-info"
            iconColorClass="text-info"
          />
          <ClientStatCard 
            colClass="col-xl-2 col-lg-4 col-md-6 d-flex"
            title="On Hold"
            value={stats.onHold.toString()}
            icon="ti ti-player-pause"
            iconBgClass="bg-warning-transparent border border-warning"
            iconColorClass="text-warning"
          />
          <ClientStatCard 
            colClass="col-xl-2 col-lg-4 col-md-6 d-flex"
            title="Ending Soon"
            value={stats.endingSoon.toString()}
            icon="ti ti-hourglass-empty"
            iconBgClass="bg-secondary-transparent border border-secondary"
            iconColorClass="text-secondary"
          />
        </div>

        <h4 className="mb-3 mt-4">Financial Metrics</h4>
        <div className="row row-gap-4">
          <ChartStatCard 
            title="Total Project Value"
            value={finStats.totalValue}
            icon="ti ti-currency-rupee"
            iconBgClass="bg-primary"
            trendValue={finStats.tvTrend.text}
            trendIcon={finStats.tvTrend.isUp ? "ti ti-arrow-up-right" : "ti ti-arrow-down-right"}
            trendBgClass={finStats.tvTrend.isUp ? "bg-success" : "bg-danger"}
            chart={StatisticsChart}
          />
          <ChartStatCard 
            title="Amount Received"
            value={finStats.amountReceived}
            icon="ti ti-moneybag"
            iconBgClass="bg-secondary"
            trendValue={finStats.arTrend.text}
            trendIcon={finStats.arTrend.isUp ? "ti ti-arrow-up-right" : "ti ti-arrow-down-right"}
            trendBgClass={finStats.arTrend.isUp ? "bg-success" : "bg-danger"}
            chart={StatisticsChartTwo}
          />
          <ChartStatCard 
            title="Pending Payments"
            value={finStats.pendingPayments}
            icon="ti ti-clock-pause"
            iconBgClass="bg-purple"
            trendValue={finStats.ppTrend.text}
            trendIcon={finStats.ppTrend.isUp ? "ti ti-arrow-up-right" : "ti ti-arrow-down-right"}
            trendBgClass={!finStats.ppTrend.isUp ? "bg-success" : "bg-danger"}
            chart={StatisticsChartThree}
          />
          <ChartStatCard 
            title="Net Profit (Est)"
            value={finStats.netProfit}
            icon="ti ti-trending-up"
            iconBgClass="bg-info"
            trendValue={finStats.npTrend.text}
            trendIcon={finStats.npTrend.isUp ? "ti ti-arrow-up-right" : "ti ti-arrow-down-right"}
            trendBgClass={finStats.npTrend.isUp ? "bg-success" : "bg-danger"}
            chart={StatisticsChartFour}
          />
        </div>

        <div className="row mt-4 row-gap-4">
          {/* Category Distribution */}
          <div className="col-md-6 d-flex">
            <div className="card mb-0 flex-fill">
              <div className="card-body">
                <div className="mb-4">
                  <h2 className="mb-0 card-title">Category Distribution</h2>
                </div>
                <ProjectCategoryChart 
                  series={categoryData.map(c => c.percent)} 
                  labels={categoryData.map(c => c.name)} 
                  colors={categoryData.map(c => c.color)} 
                />
                
                {categoryData.map((c, index) => (
                  <p key={index} className={`d-flex align-items-center justify-content-between gap-2 mb-2 pb-2 ${index !== categoryData.length - 1 ? 'border-bottom-dashed' : 'mb-0 pb-0'}`}>
                    {c.name} <span className={`badge ${c.cssClass}`}>{c.percent}%</span>
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* Status Breakdown */}
          <div className="col-md-6 d-flex">
            <div className="card mb-0 flex-fill">
              <div className="card-body">
                <div className="mb-4">
                  <h2 className="mb-0 card-title">Status Breakdown</h2>
                </div>
                <ProjectStatusChart 
                  data={statusData.map(s => s.count)} 
                  categories={statusData.map(s => `${s.name} : ${s.percent}%`)} 
                />
                <div className="pipeline-value mt-3">
                  {statusData.map((s, idx) => (
                    <div key={idx} className="value position-relative d-flex align-items-center justify-content-between text-dark">
                      <p className="d-flex align-items-center gap-2 mb-0"><span className={`${s.colorClass} line`}></span> {s.name} </p>
                      <span className="fs-20 fw-semibold">{s.percent}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="row mt-4">
          <div className="col-md-6 d-flex">
            <div className="card flex-fill">
              <div className="card-header border-0 pb-0">
                <h2 className="card-title">Team Productivity (Tasks)</h2>
              </div>
              <div className="card-body">
                <TeamProductivityChart />
              </div>
            </div>
          </div>
          <div className="col-md-6 d-flex">
            <div className="card flex-fill">
              <div className="card-header border-0 pb-0">
                <h2 className="card-title">Financial Overview</h2>
              </div>
              <div className="card-body">
                <FinancialOverviewChart 
                  series={[
                    100, // Total Value is the base (100%)
                    Math.max(0, Math.round((finStats.rawValues.amountReceived / (finStats.rawValues.totalValue || 1)) * 100)) || 0,
                    Math.max(0, Math.round((finStats.rawValues.pendingPayments / (finStats.rawValues.totalValue || 1)) * 100)) || 0,
                    Math.max(0, Math.round((finStats.rawValues.netProfit / (finStats.rawValues.totalValue || 1)) * 100)) || 0
                  ]}
                  amounts={[
                    finStats.totalValue,
                    finStats.amountReceived,
                    finStats.pendingPayments,
                    finStats.netProfit
                  ]}
                  formattedTotal={finStats.totalValue}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Recent Projects Table */}
        <div className="row mt-2">
          <div className="col-12">
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center border-0">
                <h2 className="card-title">Recent Projects</h2>
                <Link to="/all-projects" className="btn btn-sm btn-primary">View All</Link>
              </div>
              <div className="card-body p-0">
                <CustomDataTable 
                  columns={projectColumns}
                  data={recentProjectsData}
                  defaultRows={10}
                  showPagination={false}
                  showToolbar={false}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDashboard;
