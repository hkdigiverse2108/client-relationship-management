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
  const [projects, setProjects] = useState([]);
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axiosClient.get('/projects');
        const pData = Array.isArray(res) ? res : (res.data || []);
        setProjects(pData.filter(p => !p.is_deleted));
      } catch (err) {
        console.error("Error fetching projects:", err);
      }
    };
    const fetchPayments = async () => {
      try {
        const res = await axiosClient.get('/payments');
        const payData = Array.isArray(res) ? res : (res.data || []);
        setPayments(payData);
      } catch (err) {
        console.error("Error fetching payments:", err);
      }
    };
    fetchProjects();
    fetchPayments();
  }, []);

  const stats = useMemo(() => {
    const validProjects = projects.filter(p => {
      const stage = (p.stage || '').toLowerCase();
      const status = (p.status || '').toLowerCase();
      return !['cancelled'].includes(stage) && !['cancelled'].includes(status);
    });

    const isCompleted = (p) => ['completed'].includes((p.stage || '').toLowerCase()) || ['completed'].includes((p.status || '').toLowerCase());
    const isOnHold = (p) => ['on hold', 'on_hold', 'hold'].includes((p.stage || '').toLowerCase()) || ['on hold', 'on_hold', 'hold'].includes((p.status || '').toLowerCase());
    
    const now = new Date();
    now.setHours(0, 0, 0, 0);

    const sevenDaysFromNow = new Date(now);
    sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7);

    const total = validProjects.length;
    const completed = validProjects.filter(isCompleted).length;
    const onHold = validProjects.filter(isOnHold).length;
    
    // Active: Neither completed nor on hold
    const active = validProjects.filter(p => !isCompleted(p) && !isOnHold(p)).length;

    // Overdue: Not completed, end date is in the past
    const overdue = validProjects.filter(p => {
      if (isCompleted(p) || !p.end_date) return false;
      return new Date(p.end_date) < now;
    }).length;

    // Ending Soon: Not completed, end date is between today and next 7 days
    const endingSoon = validProjects.filter(p => {
      if (isCompleted(p) || !p.end_date) return false;
      const end = new Date(p.end_date);
      return end >= now && end <= sevenDaysFromNow;
    }).length;

    return { total, active, completed, overdue, onHold, endingSoon };
  }, [projects]);

  const finStats = useMemo(() => {
    const validProjects = projects.filter(p => {
      const stage = (p.stage || '').toLowerCase();
      const status = (p.status || '').toLowerCase();
      return !['cancelled'].includes(stage) && !['cancelled'].includes(status);
    });

    const now = new Date();
    const last7 = new Date(now.getTime() - 7 * 86400000);
    const prev7 = new Date(now.getTime() - 14 * 86400000);

    let totalValue = 0;
    let totalBudget = 0;
    let tvCurrent = 0;
    let tvPrev = 0;

    validProjects.forEach(p => {
      const val = parseFloat(p.project_value) || 0;
      const budget = parseFloat(p.budget) || 0;
      totalValue += val;
      totalBudget += budget;

      const dateStr = p.created_at || p.start_date;
      if (dateStr) {
        const d = new Date(dateStr);
        if (d >= last7) tvCurrent += val;
        else if (d >= prev7 && d < last7) tvPrev += val;
      }
    });

    let amountReceived = 0;
    let pendingPayments = 0;
    let arCurrent = 0, arPrev = 0;
    let ppCurrent = 0, ppPrev = 0;

    payments.forEach(p => {
      const amt = parseFloat(p.amount_received) || 0;
      const pDate = p.payment_date || p.created_at;
      const d = pDate ? new Date(pDate) : null;

      if (p.status === 'Completed') {
        amountReceived += amt;
        if (d) {
          if (d >= last7) arCurrent += amt;
          else if (d >= prev7 && d < last7) arPrev += amt;
        }
      }
      if (p.status === 'Pending') {
        pendingPayments += amt;
        if (d) {
          if (d >= last7) ppCurrent += amt;
          else if (d >= prev7 && d < last7) ppPrev += amt;
        }
      }
    });

    const netProfit = totalValue - totalBudget;
    
    // Estimate net profit trends based on Project Value trends minus previous budget
    const npCurrent = tvCurrent - (tvCurrent * 0.7); // Roughly estimating a 30% margin for current week trend
    const npPrev = tvPrev - (tvPrev * 0.7);

    const calcTrend = (current, prev) => {
      if (prev === 0 && current === 0) return { text: '0%', isUp: true };
      if (prev === 0) return { text: current > 0 ? '+100%' : (current < 0 ? '-100%' : '0%'), isUp: current >= 0 };
      const diff = current - prev;
      const percent = Math.round((diff / Math.abs(prev)) * 100);
      return {
        text: `${percent > 0 ? '+' : ''}${percent}%`,
        isUp: percent >= 0
      };
    };

    const formatCurrency = (val) => {
      const isNegative = val < 0;
      const absVal = Math.abs(val);
      let formatted = '';
      if (absVal >= 10000000) formatted = `₹${(absVal / 10000000).toFixed(2)}Cr`;
      else if (absVal >= 100000) formatted = `₹${(absVal / 100000).toFixed(2)}L`;
      else if (absVal >= 1000) formatted = `₹${(absVal / 1000).toFixed(2)}K`;
      else formatted = `₹${absVal.toFixed(2)}`;
      
      return isNegative ? `-${formatted}` : formatted;
    };

    const tvTrend = calcTrend(tvCurrent, tvPrev);
    const arTrend = calcTrend(arCurrent, arPrev);
    const ppTrend = calcTrend(ppCurrent, ppPrev);
    const npTrend = calcTrend(npCurrent, npPrev);

    return {
      totalValue: formatCurrency(totalValue),
      amountReceived: formatCurrency(amountReceived),
      pendingPayments: formatCurrency(pendingPayments),
      netProfit: formatCurrency(netProfit),
      tvTrend,
      arTrend,
      ppTrend,
      npTrend,
      rawValues: {
        totalValue,
        amountReceived,
        pendingPayments,
        netProfit
      }
    };
  }, [projects, payments]);

  const categoryData = useMemo(() => {
    const validProjects = projects.filter(p => !p.is_deleted);
    const catMap = {};
    let total = 0;
    
    validProjects.forEach(p => {
      const cat = p.category || 'Uncategorized';
      catMap[cat] = (catMap[cat] || 0) + 1;
      total++;
    });

    const sortedCats = Object.keys(catMap).map(key => ({
      name: key,
      count: catMap[key],
      percent: total > 0 ? Math.round((catMap[key] / total) * 100) : 0
    })).sort((a, b) => b.count - a.count);

    let topCats = sortedCats.slice(0, 4);
    if (sortedCats.length > 5) {
      const othersCount = sortedCats.slice(4).reduce((sum, c) => sum + c.count, 0);
      const othersPercent = total > 0 ? Math.round((othersCount / total) * 100) : 0;
      topCats.push({ name: 'Others', count: othersCount, percent: othersPercent });
    } else {
      topCats = sortedCats;
    }

    const defaultColors = ['#03C95A', '#AB47BC', '#FFC107', '#1B84FF', '#FF6F28'];
    const cssClasses = ['bg-success', 'bg-purple', 'bg-warning', 'bg-info', 'bg-primary'];

    topCats = topCats.map((c, i) => ({
      ...c,
      color: defaultColors[i % defaultColors.length],
      cssClass: cssClasses[i % cssClasses.length]
    }));

    if (topCats.length === 0) {
      topCats = [{ name: 'No Projects', count: 0, percent: 0, color: '#E5E5E5', cssClass: 'bg-secondary' }];
    }

    return topCats;
  }, [projects]);

  const statusData = useMemo(() => {
    const validProjects = projects.filter(p => {
      const stage = (p.stage || '').toLowerCase();
      const status = (p.status || '').toLowerCase();
      return !['cancelled'].includes(stage) && !['cancelled'].includes(status);
    });
    
    const total = validProjects.length;
    let comp = 0, hold = 0, od = 0, pend = 0, act = 0;

    const now = new Date();
    now.setHours(0,0,0,0);

    validProjects.forEach(p => {
      const s = (p.status || '').toLowerCase();
      const st = (p.stage || '').toLowerCase();
      
      const isComp = ['completed', 'finished', 'done'].includes(s) || ['completed', 'finished', 'done'].includes(st);
      const isHold = s.includes('hold') || st.includes('hold');
      const isOd = !isComp && p.end_date && new Date(p.end_date) < now;
      const isPend = !isComp && !isHold && !isOd && (['pending', 'not started', 'new'].includes(s) || ['pending', 'not started', 'new'].includes(st));

      if (isComp) comp++;
      else if (isHold) hold++;
      else if (isOd) od++;
      else if (isPend) pend++;
      else act++;
    });

    const getPct = (val) => total > 0 ? Math.round((val / total) * 100) : 0;
    
    return [
      { name: 'Pending', count: pend, percent: getPct(pend), colorClass: 'bg-primary' },
      { name: 'Active', count: act, percent: getPct(act), colorClass: 'bg-info' },
      { name: 'Completed', count: comp, percent: getPct(comp), colorClass: 'bg-success' },
      { name: 'Overdue', count: od, percent: getPct(od), colorClass: 'bg-danger' },
      { name: 'On Hold', count: hold, percent: getPct(hold), colorClass: 'bg-warning' }
    ];
  }, [projects]);

  const recentProjectsData = useMemo(() => {
    const validProjects = projects.filter(p => !p.is_deleted);
    const sorted = [...validProjects].sort((a, b) => {
      const d1 = new Date(a.created_at || a.start_date || 0);
      const d2 = new Date(b.created_at || b.start_date || 0);
      return d2 - d1;
    });

    return sorted.slice(0, 10).map(p => {
      let pStage = (p.stage || 'New').toLowerCase();
      let displayStage = 'New';
      if (pStage === 'in_progress' || pStage.includes('progress')) displayStage = 'In Progress';
      else if (pStage === 'review' || pStage.includes('review')) displayStage = 'In Review';
      else if (pStage === 'completed') displayStage = 'Completed';
      else if (pStage === 'hold' || pStage.includes('hold')) displayStage = 'On Hold';
      else displayStage = (p.stage || 'New').charAt(0).toUpperCase() + (p.stage || 'New').slice(1);
      
      const val = parseFloat(p.project_value) || 0;
      let valStr = `₹${val.toFixed(2)}`;
      if (val >= 10000000) valStr = `₹${(val / 10000000).toFixed(2)}Cr`;
      else if (val >= 100000) valStr = `₹${(val / 100000).toFixed(2)}L`;
      else if (val >= 1000) valStr = `₹${(val / 1000).toFixed(2)}K`;

      let badgeClass = 'success';
      if (pStage.includes('pending') || pStage.includes('new') || pStage.includes('not started')) badgeClass = 'primary';
      else if (pStage.includes('hold')) badgeClass = 'warning';
      else if (pStage.includes('cancel')) badgeClass = 'danger';
      else if (pStage.includes('progress') || pStage.includes('active')) badgeClass = 'info';

      return {
        id: p._id || p.id,
        name: p.project_name || p.title || '-',
        category: (!p.category || p.category === 'Uncategorized') ? '-' : p.category,
        stage: displayStage,
        badgeClass: badgeClass,
        endDate: p.end_date ? new Date(p.end_date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '-',
        value: valStr
      };
    });
  }, [projects]);

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
