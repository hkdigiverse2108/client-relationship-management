import React, { useState } from 'react';
import PageHeader from '../components/common/PageHeader';
import ClientStatCard from '../components/common/ClientStatCard';
import ChartStatCard from '../components/common/ChartStatCard';
import { StatisticsChart, StatisticsChartTwo, StatisticsChartThree, StatisticsChartFour } from '../components/charts/AiHiringCharts';
import { ProjectCategoryChart, ProjectStatusChart, TeamProductivityChart, FinancialOverviewChart } from '../components/charts/ProjectDashboardCharts';
import CustomDataTable from '../components/common/CustomDataTable';

const ProjectDashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const recentProjectsData = [
    {
      id: '1',
      name: 'Office Management App',
      category: 'Web Application',
      status: 'Active',
      endDate: '12 Sep 2024',
      value: '$25,000'
    },
    {
      id: '2',
      name: 'Clinic Management',
      category: 'Healthcare',
      status: 'Pending',
      endDate: '24 Oct 2024',
      value: '$18,500'
    }
  ];

  const projectColumns = [
    { name: 'PROJECT NAME', selector: row => row.name, sortable: true },
    { name: 'CATEGORY', selector: row => row.category, sortable: true },
    { 
      name: 'STATUS', 
      selector: row => row.status, 
      sortable: true,
      cell: (row) => (
        <span className={`badge badge-${row.status === 'Active' ? 'success' : 'warning'} badge-xs d-inline-flex align-items-center`}>
          <i className="ti ti-point-filled me-1"></i>{row.status}
        </span>
      )
    },
    { name: 'END DATE', selector: row => row.endDate, sortable: true },
    { name: 'VALUE', selector: row => row.value, sortable: true }
  ];

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
            value="150"
            icon="ti ti-box"
            iconBgClass="bg-pink-transparent border border-pink"
            iconColorClass="text-pink"
          />
          <ClientStatCard 
            colClass="col-xl-2 col-lg-4 col-md-6 d-flex"
            title="Active Projects"
            value="120"
            icon="ti ti-activity"
            iconBgClass="bg-success-transparent border border-success"
            iconColorClass="text-success"
          />
          <ClientStatCard 
            colClass="col-xl-2 col-lg-4 col-md-6 d-flex"
            title="Completed Projects"
            value="20"
            icon="ti ti-check"
            iconBgClass="bg-danger-transparent border border-danger"
            iconColorClass="text-danger"
          />
          <ClientStatCard 
            colClass="col-xl-2 col-lg-4 col-md-6 d-flex"
            title="Overdue Projects"
            value="10"
            icon="ti ti-clock"
            iconBgClass="bg-info-transparent border border-info"
            iconColorClass="text-info"
          />
          <ClientStatCard 
            colClass="col-xl-2 col-lg-4 col-md-6 d-flex"
            title="On Hold"
            value="5"
            icon="ti ti-player-pause"
            iconBgClass="bg-warning-transparent border border-warning"
            iconColorClass="text-warning"
          />
          <ClientStatCard 
            colClass="col-xl-2 col-lg-4 col-md-6 d-flex"
            title="Ending Soon"
            value="2"
            icon="ti ti-hourglass-empty"
            iconBgClass="bg-secondary-transparent border border-secondary"
            iconColorClass="text-secondary"
          />
        </div>

        <h4 className="mb-3 mt-4">Financial Metrics</h4>
        <div className="row row-gap-4">
          <ChartStatCard 
            title="Total Project Value"
            value="₹10.25M"
            icon="ti ti-coin"
            iconBgClass="bg-primary"
            trendValue="+4"
            trendIcon="ti ti-arrow-up-right"
            trendBgClass="bg-success"
            chart={StatisticsChart}
          />
          <ChartStatCard 
            title="Amount Received"
            value="₹7.2M"
            icon="ti ti-moneybag"
            iconBgClass="bg-secondary"
            trendValue="+18%"
            trendIcon="ti ti-arrow-up-right"
            trendBgClass="bg-success"
            chart={StatisticsChartTwo}
          />
          <ChartStatCard 
            title="Pending Payments"
            value="₹3.05M"
            icon="ti ti-clock-dollar"
            iconBgClass="bg-purple"
            trendValue="-16%"
            trendIcon="ti ti-arrow-down-right"
            trendBgClass="bg-danger"
            chart={StatisticsChartThree}
          />
          <ChartStatCard 
            title="Net Profit (Est)"
            value="₹4.75M"
            icon="ti ti-trending-up"
            iconBgClass="bg-info"
            trendValue="+8%"
            trendIcon="ti ti-arrow-up-right"
            trendBgClass="bg-success"
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
                <ProjectCategoryChart />
                <p className="d-flex align-items-center justify-content-between gap-2 mb-2 pb-2 border-bottom-dashed">Design <span className="badge bg-success">32%</span></p>
                <p className="d-flex align-items-center justify-content-between gap-2 mb-2 pb-2 border-bottom-dashed">Development <span className="badge bg-purple">24%</span></p>
                <p className="d-flex align-items-center justify-content-between gap-2 mb-2 pb-2 border-bottom-dashed">Marketing <span className="badge bg-warning">24%</span></p>
                <p className="d-flex align-items-center justify-content-between gap-2 mb-2 pb-2 border-bottom-dashed">Sales <span className="badge bg-info">20%</span></p>
                <p className="d-flex align-items-center justify-content-between gap-2 mb-0 pb-0">Maintenance <span className="badge bg-primary">10%</span></p>
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
                <ProjectStatusChart />
                <div className="pipeline-value mt-3">
                  <div className="value position-relative d-flex align-items-center justify-content-between text-dark">
                    <p className="d-flex align-items-center gap-2 mb-0"><span className="bg-primary line"></span> Pending </p>
                    <span className="fs-20 fw-semibold">15%</span>
                  </div>
                  <div className="value position-relative d-flex align-items-center justify-content-between text-dark">
                    <p className="d-flex align-items-center gap-2 mb-0"><span className="bg-info line"></span> Active </p>
                    <span className="fs-20 fw-semibold">50%</span>
                  </div>
                  <div className="value position-relative d-flex align-items-center justify-content-between text-dark">
                    <p className="d-flex align-items-center gap-2 mb-0"><span className="bg-success line"></span> Completed </p>
                    <span className="fs-20 fw-semibold">20%</span>
                  </div>
                  <div className="value position-relative d-flex align-items-center justify-content-between text-dark">
                    <p className="d-flex align-items-center gap-2 mb-0"><span className="bg-danger line"></span> Overdue </p>
                    <span className="fs-20 fw-semibold">10%</span>
                  </div>
                  <div className="value position-relative d-flex align-items-center justify-content-between text-dark">
                    <p className="d-flex align-items-center gap-2 mb-0"><span className="bg-warning line"></span> On Hold </p>
                    <span className="fs-20 fw-semibold">5%</span>
                  </div>
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
                <FinancialOverviewChart />
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
                <a href="/projects" className="btn btn-sm btn-primary">View All</a>
              </div>
              <div className="card-body p-0">
                <CustomDataTable 
                  columns={projectColumns}
                  data={recentProjectsData}
                  defaultRows={5}
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
