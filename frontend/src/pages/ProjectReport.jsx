import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/common/PageHeader';
import Chart from 'react-apexcharts';
import ReportProgressCard from '../components/common/ReportProgressCard';
import ProjectFormModal from '../components/projects/ProjectFormModal';
import CustomSelect from '../components/common/CustomSelect';
import ProjectReportTable from '../components/projects/ProjectReportTable';
import ImageChart from '../components/charts/ImageChart';
import axiosClient from '../api/axiosClient';
import { APP_CONFIG } from '../config/appConfig';

const ProjectReport = () => {
  const [statusFilter, setStatusFilter] = useState({ value: 'all', label: 'All Status' });
  const [stageFilter, setStageFilter] = useState({ value: 'all', label: 'All Stages' });
  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState({});
  const [users, setUsers] = useState({});
  const [revenueFilter, setRevenueFilter] = useState('This Month');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pRes, cRes, uRes] = await Promise.all([
          axiosClient.get('/projects'),
          axiosClient.get('/clients'),
          axiosClient.get('/users')
        ]);
        const pData = Array.isArray(pRes) ? pRes : (pRes.data || []);
        setProjects(pData.filter(p => !p.is_deleted));

        const cData = Array.isArray(cRes) ? cRes : (cRes.data || []);
        const cMap = {};
        cData.forEach(c => { cMap[c._id || c.client_id || c.id] = c; });
        setClients(cMap);

        const uData = Array.isArray(uRes) ? uRes : (uRes.data || []);
        const uMap = {};
        uData.forEach(u => { uMap[u._id || u.id] = u; });
        setUsers(uMap);
      } catch (err) {
        console.error("Failed to fetch data:", err);
      }
    };
    fetchData();
  }, []);

  const stats = useMemo(() => {
    const now = new Date();
    const startOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);

    const isThisMonth = (dStr) => {
      if (!dStr) return false;
      const d = new Date(dStr);
      return d >= startOfThisMonth;
    };
    
    const isLastMonth = (dStr) => {
      if (!dStr) return false;
      const d = new Date(dStr);
      return d >= startOfLastMonth && d <= endOfLastMonth;
    };

    const isCancelled = (p) => ['cancelled'].includes((p.stage || '').toLowerCase()) || ['cancelled'].includes((p.status || '').toLowerCase());
    const isCompleted = (p) => ['completed'].includes((p.stage || '').toLowerCase()) || ['completed'].includes((p.status || '').toLowerCase());

    const isOverdue = (p) => {
      if (isCompleted(p) || isCancelled(p) || !p.end_date) return false;
      return new Date(p.end_date) < now;
    };

    const getTrend = (current, previous) => {
      if (previous === 0) {
        if (current === 0) return { value: "0.00%", icon: "ti-minus", color: "secondary" };
        return { value: "+100.00%", icon: "ti-arrow-wave-right-up", color: "success" };
      }
      const percent = ((current - previous) / previous) * 100;
      if (percent > 0) return { value: `+${percent.toFixed(2)}%`, icon: "ti-arrow-wave-right-up", color: "success" };
      if (percent < 0) return { value: `${percent.toFixed(2)}%`, icon: "ti-arrow-wave-right-down", color: "danger" };
      return { value: "0.00%", icon: "ti-minus", color: "secondary" };
    };

    const validProjects = projects.filter(p => !isCancelled(p));

    // Total Projects
    const totalCount = validProjects.length;
    const totalThis = validProjects.filter(p => isThisMonth(p.created_at)).length;
    const totalLast = validProjects.filter(p => isLastMonth(p.created_at)).length;
    const totalTrend = getTrend(totalThis, totalLast);

    // Completed Projects
    const compProjects = validProjects.filter(p => isCompleted(p));
    const compCount = compProjects.length;
    const compThis = compProjects.filter(p => isThisMonth(p.created_at)).length; 
    const compLast = compProjects.filter(p => isLastMonth(p.created_at)).length;
    const compTrend = getTrend(compThis, compLast);

    // Pending Projects (not completed)
    const pendProjects = validProjects.filter(p => !isCompleted(p));
    const pendCount = pendProjects.length;
    const pendThis = pendProjects.filter(p => isThisMonth(p.created_at)).length;
    const pendLast = pendProjects.filter(p => isLastMonth(p.created_at)).length;
    const pendTrend = getTrend(pendThis, pendLast);

    // Overdue Projects
    const overdueProjects = validProjects.filter(isOverdue);
    const overdueCount = overdueProjects.length;
    const overdueThis = overdueProjects.filter(p => isThisMonth(p.created_at)).length;
    const overdueLast = overdueProjects.filter(p => isLastMonth(p.created_at)).length;
    const overdueTrend = getTrend(overdueThis, overdueLast);

    return {
      total: { count: totalCount, percent: 100, trend: totalTrend },
      comp: { count: compCount, percent: totalCount ? Math.round((compCount / totalCount) * 100) : 0, trend: compTrend },
      pend: { count: pendCount, percent: totalCount ? Math.round((pendCount / totalCount) * 100) : 0, trend: pendTrend },
      overdue: { count: overdueCount, percent: totalCount ? Math.round((overdueCount / totalCount) * 100) : 0, trend: overdueTrend }
    };
  }, [projects]);

  const clientRevenueData = useMemo(() => {
    const now = new Date();
    const startOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);

    let filteredProjects = projects.filter(p => p.stage === 'completed' || p.status === 'completed');
    
    if (revenueFilter === 'This Month') {
      filteredProjects = filteredProjects.filter(p => {
        const dStr = p.updated_at || p.end_date || p.created_at;
        return dStr && new Date(dStr) >= startOfThisMonth;
      });
    } else if (revenueFilter === 'Last Month') {
      filteredProjects = filteredProjects.filter(p => {
        const dStr = p.updated_at || p.end_date || p.created_at;
        if (!dStr) return false;
        const d = new Date(dStr);
        return d >= startOfLastMonth && d <= endOfLastMonth;
      });
    }

    const revenueMap = {};
    let totalRevenue = 0;
    filteredProjects.forEach(p => {
      const clientId = p.client_id;
      if (!clientId) return;
      const val = parseFloat(p.project_value) || 0;
      if (val > 0) {
        revenueMap[clientId] = (revenueMap[clientId] || 0) + val;
        totalRevenue += val;
      }
    });

    const sortedClients = Object.keys(revenueMap).sort((a, b) => revenueMap[b] - revenueMap[a]).slice(0, 4);
    
    const labels = [];
    const series = [];
    const details = [];
    const colors = ['#03C9D7', '#8E24AA', '#FFC107', '#28C76F'];
    const cssClasses = ['project-report-badge-blue', 'project-report-badge-purple', 'project-report-badge-warning', 'project-report-badge-success'];
    
    sortedClients.forEach((id, index) => {
      const c = clients[id] || {};
      const name = c.client_name || c.company_name || `${c.first_name || ''} ${c.last_name || ''}`.trim() || 'Unknown Client';
      const val = revenueMap[id];
      const percent = totalRevenue > 0 ? Math.round((val / totalRevenue) * 100) : 0;
      labels.push(name);
      series.push(val);
      details.push({ name, value: val, percent, color: colors[index], cssClass: cssClasses[index] });
    });

    if (labels.length === 0) {
      labels.push("No Data");
      series.push(0);
      details.push({ name: "No Data", value: 0, percent: 0, color: '#ccc', cssClass: 'text-muted' });
    }

    return { labels, series, details, totalRevenue };
  }, [projects, clients, revenueFilter]);

  const projectReportOptions = {
    series: clientRevenueData.series,
    labels: clientRevenueData.labels,
    chart: { type: 'pie', height: 200 },
    tooltip: { y: { formatter: function (val) { return "₹" + val.toLocaleString(); } } },
    colors: clientRevenueData.series.length > 0 && clientRevenueData.series[0] !== 0 ? ['#03C9D7', '#8E24AA', '#FFC107', '#28C76F'].slice(0, clientRevenueData.series.length) : ['#ccc'],
    dataLabels: { enabled: false },
    legend: { show: false },
    stroke: { show: true, colors: 'transparent' }
  };

  const workloadData = useMemo(() => {
    const activeProjects = projects.filter(p => {
      const stage = (p.stage || '').toLowerCase();
      const status = (p.status || '').toLowerCase();
      return !['completed', 'cancelled'].includes(stage) && !['completed', 'cancelled'].includes(status);
    });
    
    const userWorkload = {};
    const userOverdue = {};
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    activeProjects.forEach(p => {
      const assignee = p.assigned_to;
      if (assignee) {
        userWorkload[assignee] = (userWorkload[assignee] || 0) + 1;
        
        if (p.end_date) {
           const endDate = new Date(p.end_date);
           if (endDate < today) {
             userOverdue[assignee] = (userOverdue[assignee] || 0) + 1;
           }
        }
      }
    });

    const sortedUsers = Object.keys(userWorkload).sort((a, b) => userWorkload[b] - userWorkload[a]).slice(0, 10);
    
    const labels = [];
    const data = [];
    const overdueData = [];
    const imageUrls = [];
    const initials = [];

    const backendUrl = APP_CONFIG.apiBaseUrl.replace(/\/api\/v1\/?$/, '');

    sortedUsers.forEach(id => {
      const u = users[id] || {};
      const name = u.name || `${u.first_name || ''} ${u.last_name || ''}`.trim() || 'Unknown';
      let avatar = u.profile_photo || u.avatar || u.profile_picture || null;
      if (avatar && !avatar.startsWith('http')) {
        avatar = backendUrl + (avatar.startsWith('/') ? '' : '/') + avatar;
      }
      
      const nameParts = name.trim().split(/\s+/);
      let initial = 'U';
      if (nameParts.length >= 2) {
        initial = (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase();
      } else if (nameParts[0].length >= 1) {
        initial = nameParts[0].substring(0, 2).toUpperCase();
      }

      labels.push(name);
      data.push(userWorkload[id]);
      overdueData.push(userOverdue[id] || 0);
      imageUrls.push(avatar);
      initials.push(initial);
    });

    return { labels, data, overdueData, imageUrls, initials };
  }, [projects, users]);

  const overdueProjectsList = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const list = projects.filter(p => {
      const stage = (p.stage || '').toLowerCase();
      const status = (p.status || '').toLowerCase();
      if (['completed', 'cancelled'].includes(stage) || ['completed', 'cancelled'].includes(status)) return false;
      if (!p.end_date) return false;
      return new Date(p.end_date) < today;
    });

    return list.map(p => {
      const end = new Date(p.end_date);
      const diffTime = Math.abs(today - end);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      const client = clients[p.client_id] || {};
      const clientName = client.client_name || client.company_name || `${client.first_name || ''} ${client.last_name || ''}`.trim() || 'Unknown Client';
      
      let clientAvatar = client.profile_photo || client.avatar || client.profile_picture || null;
      if (clientAvatar && !clientAvatar.startsWith('http')) {
        clientAvatar = backendUrl + (clientAvatar.startsWith('/') ? '' : '/') + clientAvatar;
      }
      
      const clientNameParts = clientName.trim().split(/\s+/);
      let clientInitial = 'C';
      if (clientNameParts.length >= 2) {
        clientInitial = (clientNameParts[0][0] + clientNameParts[clientNameParts.length - 1][0]).toUpperCase();
      } else if (clientNameParts[0].length >= 1) {
        clientInitial = clientNameParts[0].substring(0, 2).toUpperCase();
      }
      
      let stageClass = "primary"; // Single theme color for all stages as requested
      let displayStage = "New";
      const stageLower = (p.stage || 'new').toLowerCase();
      if (stageLower === 'in_progress' || stageLower.includes('progress')) {
        displayStage = "In Progress";
      }
      else if (stageLower === 'review' || stageLower.includes('review')) {
        displayStage = "In Review";
      }
      else if (stageLower === 'new') {
        displayStage = "New";
      }
      else if (stageLower === 'hold' || stageLower.includes('hold')) {
        displayStage = "On Hold";
      }
      else {
        displayStage = stageLower; // Fallback
      }

      return {
        ...p,
        daysOverdue: diffDays,
        clientName,
        clientAvatar,
        clientInitial,
        formattedDate: end.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        stageClass,
        displayStage
      };
    }).sort((a, b) => b.daysOverdue - a.daysOverdue);
  }, [projects, clients]);

  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

  return (
    <>
      <div className="page-wrapper">
			<div className="content">

				{/* Breadcrumb */}
				<PageHeader 
					title="Project Performance Analytics"
					breadcrumbs={[
						{ label: 'Dashboard' },
						{ label: 'Projects' },
						{ label: 'Project Report', active: true }
					]}
				>
					<div className="d-flex align-items-center flex-wrap gap-2">
						<div className="input-icon position-relative">
							<span className="input-icon-addon"><i className="ti ti-search"></i></span>
							<input type="text" className="form-control" placeholder="Search Project..." />
						</div>
						<div className="custom-select-wrapper">
							<CustomSelect className="select" value={statusFilter} onChange={setStatusFilter}>
								<option value="all">All Status</option>
								<option value="active">Active</option>
								<option value="completed">Completed</option>
								<option value="onhold">On Hold</option>
								<option value="cancelled">Cancelled</option>
							</CustomSelect>
						</div>
						<div className="custom-select-wrapper">
							<CustomSelect className="select" value={stageFilter} onChange={setStageFilter}>
								<option value="all">All Stages</option>
								<option value="new">New</option>
								<option value="inprogress">In Progress</option>
								<option value="inreview">In Review</option>
								<option value="onhold">On Hold</option>
								<option value="completed">Completed</option>
							</CustomSelect>
						</div>
						<a href="#" onClick={(e) => { e.preventDefault(); setIsProjectModalOpen(true); }} className="btn btn-primary d-flex align-items-center">
							<i className="ti ti-circle-plus me-2"></i>New Project
						</a>
					</div>
				</PageHeader>
				{/* /Breadcrumb */}

				<div className="row">

					{/* Total Exponses */}
					<div className="col-lg-6 col-md-6 d-flex">
						<div className="row flex-fill">
							<ReportProgressCard 
								title="Total Projects"
								value={stats.total.count.toString()}
								progressBarColor="pink"
								progressPercent={stats.total.percent}
								trendIcon={stats.total.trend.icon}
								trendColor={stats.total.trend.color}
								trendValue={stats.total.trend.value}
								trendText="from last month"
							/>
							<ReportProgressCard 
								title="Completed Projects"
								value={stats.comp.count.toString()}
								progressBarColor="success"
								progressPercent={stats.comp.percent}
								trendIcon={stats.comp.trend.icon}
								trendColor={stats.comp.trend.color}
								trendValue={stats.comp.trend.value}
								trendText="from last month"
							/>
							<ReportProgressCard 
								title="Pending Projects"
								value={stats.pend.count.toString()}
								progressBarColor="danger"
								progressPercent={stats.pend.percent}
								trendIcon={stats.pend.trend.icon}
								trendColor={stats.pend.trend.color}
								trendValue={stats.pend.trend.value}
								trendText="from last month"
							/>
							<ReportProgressCard 
								title="Overdue Projects"
								value={stats.overdue.count.toString()}
								progressBarColor="purple"
								progressPercent={stats.overdue.percent}
								trendIcon={stats.overdue.trend.icon}
								trendColor={stats.overdue.trend.color}
								trendValue={stats.overdue.trend.value}
								trendText="from last month"
							/>
						</div>
					</div>
					{/* /Total Exponses */}

					{/* Total Exponses */}
					<div className="col-lg-6 col-md-6 d-flex">
						<div className="card flex-fill">
							
							<div className="card-header border-0">
								<div className="d-flex flex-wrap justify-content-between align-items-center">
									<div className="d-flex align-items-center ">
										<span className="me-2"><i className="ti ti-chart-pie text-danger"></i></span>
										<h5>Revenue by Client</h5>
									</div>
									<div className="dropdown">
										<Link to="#"
											className="dropdown-toggle btn btn-sm fs-12 btn-white d-inline-flex align-items-center"
											data-bs-toggle="dropdown">
											{revenueFilter}
										</Link>
										<ul className="dropdown-menu  dropdown-menu-end p-2">
											<li>
												<Link to="#" onClick={(e) => { e.preventDefault(); setRevenueFilter('This Month'); }} className="dropdown-item rounded-1">This Month</Link>
											</li>
											<li>
												<Link to="#" onClick={(e) => { e.preventDefault(); setRevenueFilter('Last Month'); }} className="dropdown-item rounded-1">Last Month</Link>
											</li>
											<li>
												<Link to="#" onClick={(e) => { e.preventDefault(); setRevenueFilter('All Time'); }} className="dropdown-item rounded-1">All Time</Link>
											</li>
										</ul>
									</div>
								</div>
							</div>
							<div className="card-body pt-0">
								<div className="row align-items-center">
									<div className="col-md-6 d-flex justify-content-center">
										<Chart options={projectReportOptions} series={projectReportOptions.series} type="pie" height={250} />
									</div>
									<div className="col-md-6">
										<div className="row gy-4">
											{clientRevenueData.details.map((item, i) => (
												<div className="col-md-6" key={i}>
													<p className={`fs-16 ${item.cssClass} fw-normal mb-0 text-gray-5`}>
														{item.name}
													</p>
													<p className="fs-20 fw-bold text-dark ">₹{item.value.toLocaleString()} <span className="fs-14 text-muted fw-normal">({item.percent}%)</span></p>
												</div>
											))}
										</div>
									</div>
								</div>


							</div>
						</div>
					</div>
					{/* /Total Exponses */}


				</div>

				<div className="row">
					{/* Team Workload Distribution */}
					<div className="col-lg-8 col-md-12 d-flex">
						<div className="card flex-fill">
							<div className="card-header border-0 pb-0">
								<div className="d-flex align-items-center">
									<span className="me-2"><i className="ti ti-users text-primary fs-18"></i></span>
									<h5>Team Workload Distribution</h5>
								</div>
							</div>
							<div className="card-body">
								<ImageChart 
                  id="workloadChart" 
                  labels={workloadData.labels.length > 0 ? workloadData.labels : undefined} 
                  data={workloadData.data.length > 0 ? workloadData.data : undefined}
                  overdueData={workloadData.overdueData.length > 0 ? workloadData.overdueData : undefined}
                  imageUrls={workloadData.imageUrls.length > 0 ? workloadData.imageUrls : undefined}
                  initials={workloadData.initials.length > 0 ? workloadData.initials : undefined}
                />
							</div>
						</div>
					</div>
					{/* /Team Workload Distribution */}

					{/* Overdue Project Summary */}
					<div className="col-lg-4 col-md-12 d-flex">
						<div className="card flex-fill">
							<div className="card-header border-0 pb-0">
								<div className="d-flex align-items-center">
									<span className="me-2"><i className="ti ti-alert-triangle text-danger fs-18"></i></span>
									<h5>Overdue Project Summary</h5>
								</div>
							</div>
							<div className="card-body">
								<div className="d-flex align-items-center justify-content-between mb-4 border-bottom pb-3">
									<div>
										<h2 className="fw-bold text-danger mb-1">{overdueProjectsList.length}</h2>
										<p className="fs-14 text-muted mb-0">Total Overdue Projects</p>
									</div>
									<div className="avatar avatar-lg bg-danger-transparent rounded-circle">
										<i className="ti ti-clock-hour-4 text-danger fs-24"></i>
									</div>
								</div>
								
								<div className="mt-4">
									<h6 className="fw-medium mb-3 text-gray-9">Critical Overdue</h6>
									
									<div className="overdue-scroll" style={{ maxHeight: '220px', overflowY: 'auto', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
										<style>{`.overdue-scroll::-webkit-scrollbar { display: none; }`}</style>
										
                    {overdueProjectsList.length === 0 ? (
                      <div className="text-center text-muted p-3">
                        No overdue projects! 🎉
                      </div>
                    ) : (
                      overdueProjectsList.map((p, index) => (
                        <div key={p.id || index} className="mb-3 border p-3 rounded bg-light">
                          <div className="d-flex align-items-center justify-content-between mb-2">
                            <h6 className="fs-14 fw-semibold text-dark mb-0 text-truncate" style={{ maxWidth: '60%' }} title={p.project_name || p.title}>
                              {p.project_name || p.title || 'Untitled Project'}
                            </h6>
                            <span className="badge badge-danger-transparent text-danger">{p.daysOverdue} Days Overdue</span>
                          </div>
                          <div className="d-flex justify-content-between text-muted fs-13 mt-2">
                            <span className="text-truncate d-flex align-items-center gap-1" style={{ maxWidth: '60%' }} title={p.clientName}>
                              {p.clientAvatar ? (
                                <img src={p.clientAvatar} alt="client" className="rounded-circle" width="16" height="16" style={{ objectFit: 'cover' }} />
                              ) : (
                                <span className="avatar avatar-xs rounded-circle bg-primary text-white d-flex align-items-center justify-content-center" style={{ width: '16px', height: '16px', fontSize: '8px' }}>
                                  {p.clientInitial}
                                </span>
                              )}
                              {p.clientName}
                            </span>
                            <span><i className="ti ti-calendar me-1"></i>{p.formattedDate}</span>
                          </div>
                          <div className="mt-2 pt-2 border-top">
                            <span className="badge bg-primary text-white border-0 fw-medium px-2 py-1"><i className="ti ti-point-filled me-1"></i>{p.displayStage}</span>
                          </div>
                        </div>
                      ))
                    )}

									</div>
								</div>
							</div>
						</div>
					</div>
					{/* /Overdue Project Summary */}
				</div>

				<ProjectReportTable projects={projects} />
			</div>
		</div>

		<ProjectFormModal open={isProjectModalOpen} onClose={() => setIsProjectModalOpen(false)} />
    </>
  );
};

export default ProjectReport;
