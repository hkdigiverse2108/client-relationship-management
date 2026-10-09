import React, { useState, useEffect } from 'react';
import PageHeader from '../components/common/PageHeader';
import { TicketCategoryChart } from '../components/charts/ChartJSComponents';
import { WorkloadDistributionChart } from '../components/charts/DashboardCharts';
import TeamRosterTable from '../components/TeamRosterTable';
import TeamActivityFeed from '../components/TeamActivityFeed';
import Loader from '../components/common/Loader';
import axiosClient from '../api/axiosClient';

const Team = () => {
  const [teamData, setTeamData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [workloadFilter, setWorkloadFilter] = useState('monthly');
  const [workloadData, setWorkloadData] = useState(null);
  const [workloadLoading, setWorkloadLoading] = useState(true);

  useEffect(() => {
    const fetchTeamMetrics = async () => {
      try {
        const res = await axiosClient.get('/dashboard/team-metrics');
        setTeamData(res.data || res);
      } catch (err) {
        console.error("Error fetching team metrics:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTeamMetrics();
  }, []);

  useEffect(() => {
    const fetchWorkload = async () => {
      try {
        setWorkloadLoading(true);
        const res = await axiosClient.get(`/dashboard/workload-distribution?time_filter=${workloadFilter}`);
        setWorkloadData(res.data || res);
      } catch (err) {
        console.error("Error fetching workload:", err);
      } finally {
        setWorkloadLoading(false);
      }
    };
    fetchWorkload();
  }, [workloadFilter]);

  const kpis = teamData?.kpis || { total_members: 0, open_deals: 0, active_projects: 0, pending_tasks: 0 };
  const trends = teamData?.trends || { members: 0, deals: 0, projects: 0, tasks: 0 };

  const renderTrend = (value, badgeClass) => {
    const isUp = value >= 0;
    return (
      <span className={`badge ${badgeClass} badge-sm fw-normal`}>
        <i className={`ti ti-arrow-wave-right-${isUp ? 'up' : 'down'}`}></i>
        {isUp ? '+' : ''}{value}%
      </span>
    );
  };

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

          {loading ? (
            <Loader />
          ) : (
            <>
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
										<h4>{kpis.total_members}</h4>
									</div>
								</div>
								<div>
									{renderTrend(trends.members, 'badge-soft-purple')}
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
										<h4>{kpis.open_deals}</h4>
									</div>
								</div>
								<div>
									{renderTrend(trends.deals, 'badge-soft-primary')}
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
										<h4>{kpis.active_projects}</h4>
									</div>
								</div>
								<div>
									{renderTrend(trends.projects, 'badge-soft-dark')}
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
										<p className="fs-12 fw-medium mb-1 text-truncate">Pending Tasks</p>
										<h4>{kpis.pending_tasks}</h4>
									</div>
								</div>
								<div>
									{renderTrend(trends.tasks, 'badge-soft-secondary')}
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
                        <i className="ti ti-calendar fs-14"></i> {workloadFilter === 'all' ? 'All Time' : workloadFilter.charAt(0).toUpperCase() + workloadFilter.slice(1)}
                      </a>
                      <ul className="dropdown-menu mt-2 p-3">
                        <li>
                          <a href="#" onClick={(e) => { e.preventDefault(); setWorkloadFilter('today'); }} className="dropdown-item rounded-1">
                            Today
                          </a>
                        </li>
                        <li>
                          <a href="#" onClick={(e) => { e.preventDefault(); setWorkloadFilter('weekly'); }} className="dropdown-item rounded-1">
                            Weekly
                          </a>
                        </li>
                        <li>
                          <a href="#" onClick={(e) => { e.preventDefault(); setWorkloadFilter('monthly'); }} className="dropdown-item rounded-1">
                            Monthly
                          </a>
                        </li>
                        <li>
                          <a href="#" onClick={(e) => { e.preventDefault(); setWorkloadFilter('all'); }} className="dropdown-item rounded-1">
                            All Time
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {workloadLoading ? (
                    <div className="d-flex justify-content-center align-items-center" style={{ height: 300 }}>
                      <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </div>
                  ) : (
                    <>
                      <WorkloadDistributionChart data={workloadData} />
                      <p className="mb-0 gap-2 text-dark text-center mt-3">
                        {workloadFilter === 'all' ? (
                          <span>Overall Workload (All Time)</span>
                        ) : (
                          <>
                            <span className={`badge bg-${(workloadData?.trend || 0) >= 0 ? 'success' : 'danger'} rounded-circle p-1 me-2`}>
                              <i className={`ti ti-caret-${(workloadData?.trend || 0) >= 0 ? 'up' : 'down'}-filled text-white fs-14`}></i>
                            </span>
                            {Math.abs(workloadData?.trend || 0)}% Compared to {workloadData?.label || 'Last Period'}
                          </>
                        )}
                      </p>
                    </>
                  )}
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
                    <div className="border px-3 py-1 rounded bg-light">
                      <span className="fs-13 fw-medium text-muted me-2">Total Staff:</span>
                      <span className="fs-14 fw-bold text-dark">{teamData?.kpis?.total_members || 0}</span>
                    </div>
                  </div>

                  <div className="position-relative mb-4" style={{height: '200px'}}>
                    <TicketCategoryChart chartData={teamData?.roles_distribution} />
                    <div className="gauge-center-text">Team</div>
                  </div>

                  <div className="row row-gap-4 mt-2">
                    {teamData?.roles_distribution?.map((role, idx) => {
                      const colors = ['primary', 'secondary', 'success', 'warning', 'info', 'danger', 'dark', 'light'];
                      const colorClass = colors[idx % colors.length];
                      return (
                        <div className="col-lg-4 col-md-4" key={role.id}>
                          <div className={`border-5 border-start border-${colorClass} text-center`}>
                            <p className="fs-13 d-inline-flex align-items-center mb-1 fs-12">{role.id}</p>
                            <h4 className="fs-14">{role.value}</h4>
                          </div>
                        </div>
                      );
                    })}
                  </div>


                </div>
              </div>
            </div>
            {/* /Team Composition Chart */}
          </div>

          <div className="row mt-4">
            <div className="col-xl-8 d-flex">
              <TeamRosterTable data={teamData?.workload || []} />
            </div>
            <div className="col-xl-4 d-flex">
              <TeamActivityFeed data={teamData?.recent_activities_feed || []} />
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

export default Team;
