import React, { useState, useEffect } from "react";
import { FiBriefcase, FiDollarSign, FiCheckCircle, FiClock, FiAlertCircle, FiTrendingUp } from "react-icons/fi";
import PageHeader from "@/components/common/PageHeader/PageHeader";
import Loader from "@/components/common/Loader/Loader";
import SearchInput from "@/components/common/PageHeaderSearchBar/SearchInput";
import { projectService } from "@/api/services/projectService";
import api from "@/api/axiosClient";
import { formatCurrency, formatDate } from "@/utils/formatters";
import {
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import "./ProjectDashboard.css";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#a832a8', '#32a883'];

export default function ProjectDashboard() {
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState(null);
  const [recentProjects, setRecentProjects] = useState([]);
  const [teamProductivityData, setTeamProductivityData] = useState([]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [analyticsData, projectsData, tasksRes] = await Promise.all([
        projectService.getAnalytics(),
        projectService.list(),
        api.get("/tasks")
      ]);
      
      setAnalytics(analyticsData.data || analyticsData);
      
      // Sort projects by created_at desc to get recent ones
      const sorted = (projectsData.data || projectsData).sort((a, b) => 
        new Date(b.created_at) - new Date(a.created_at)
      );
      setRecentProjects(sorted.slice(0, 5));
      
      // Process tasks for Team Productivity chart (last 6 months)
      const tasks = Array.isArray(tasksRes) ? tasksRes : (tasksRes?.data || []);
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const today = new Date();
      const prodData = [];
      
      for (let i = 5; i >= 0; i--) {
        const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
        prodData.push({ 
          name: months[d.getMonth()], 
          monthNum: d.getMonth(),
          yearNum: d.getFullYear(),
          tasksCompleted: 0, 
          totalTasks: 0 
        });
      }
      
      tasks.forEach(task => {
        const d = new Date(task.created_at || task.start_date || new Date());
        const item = prodData.find(m => m.monthNum === d.getMonth() && m.yearNum === d.getFullYear());
        if (item) {
          item.totalTasks += 1;
          if (task.status === 'Completed') item.tasksCompleted += 1;
        }
      });
      
      setTeamProductivityData(prodData);

    } catch (error) {
      console.error("Failed to load project dashboard data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) return <Loader />;

  const { metrics, charts } = analytics || { metrics: {}, charts: { categories: [], statuses: [] } };

  // Formatting for charts
  const statusData = charts?.statuses || [];
  const categoryData = charts?.categories || [];

  // Mock data for Financial Overview
  const financialOverviewData = [
    { 
      name: 'Financials', 
      Value: metrics?.total_value || 0, 
      Received: metrics?.amount_received || 0, 
      Pending: metrics?.pending_payments || 0 
    }
  ];

  return (
    <>
      <PageHeader
        title="Project Command Center"
        description="Enterprise Project Lifecycle Management & Analytics"
        actions={<SearchInput dark placeholder="Search projects..." />}
      />

      <div className="project-dashboard-container">
        {/* Row 1: Project Metrics */}
        <h4 className="dashboard-section-title">Project Metrics</h4>
        <div className="kpi-grid">
          <div className="kpi-card glass">
            <div className="kpi-icon total"><FiBriefcase /></div>
            <div className="kpi-details">
              <span className="kpi-label">Total Projects</span>
              <h3 className="kpi-value">{metrics?.total || 0}</h3>
            </div>
          </div>
          <div className="kpi-card glass">
            <div className="kpi-icon active"><FiTrendingUp /></div>
            <div className="kpi-details">
              <span className="kpi-label">Active</span>
              <h3 className="kpi-value">{metrics?.active || 0}</h3>
            </div>
          </div>
          <div className="kpi-card glass">
            <div className="kpi-icon completed"><FiCheckCircle /></div>
            <div className="kpi-details">
              <span className="kpi-label">Completed</span>
              <h3 className="kpi-value">{metrics?.completed || 0}</h3>
            </div>
          </div>
          <div className="kpi-card glass">
            <div className="kpi-icon overdue"><FiAlertCircle /></div>
            <div className="kpi-details">
              <span className="kpi-label">Overdue</span>
              <h3 className="kpi-value">{metrics?.overdue || 0}</h3>
            </div>
          </div>
          <div className="kpi-card glass">
            <div className="kpi-icon ending-soon"><FiClock /></div>
            <div className="kpi-details">
              <span className="kpi-label">Ending Soon</span>
              <h3 className="kpi-value">{metrics?.ending_soon || 0}</h3>
            </div>
          </div>
          <div className="kpi-card glass">
            <div className="kpi-icon rate"><FiTrendingUp /></div>
            <div className="kpi-details">
              <span className="kpi-label">Completion Rate</span>
              <h3 className="kpi-value">{Math.round(metrics?.completion_rate || 0)}%</h3>
            </div>
          </div>
        </div>

        {/* Row 2: Financial Metrics */}
        <h4 className="dashboard-section-title mt-4">Financial Metrics</h4>
        <div className="kpi-grid financial">
          <div className="kpi-card glass">
            <div className="kpi-icon total-val"><FiDollarSign /></div>
            <div className="kpi-details">
              <span className="kpi-label">Total Project Value</span>
              <h3 className="kpi-value">{formatCurrency(metrics?.total_value || 0)}</h3>
            </div>
          </div>
          <div className="kpi-card glass">
            <div className="kpi-icon received"><FiDollarSign /></div>
            <div className="kpi-details">
              <span className="kpi-label">Amount Received</span>
              <h3 className="kpi-value text-success">{formatCurrency(metrics?.amount_received || 0)}</h3>
            </div>
          </div>
          <div className="kpi-card glass">
            <div className="kpi-icon pending"><FiDollarSign /></div>
            <div className="kpi-details">
              <span className="kpi-label">Pending Payments</span>
              <h3 className="kpi-value text-warning">{formatCurrency(metrics?.pending_payments || 0)}</h3>
            </div>
          </div>
          <div className="kpi-card glass">
            <div className="kpi-icon profit"><FiTrendingUp /></div>
            <div className="kpi-details">
              <span className="kpi-label">Net Profit (Est)</span>
              <h3 className="kpi-value text-primary">{formatCurrency(metrics?.net_profit || 0)}</h3>
            </div>
          </div>
        </div>

        {/* Row 3: Charts */}
        <div className="charts-grid mt-4">
          <div className="chart-card glass">
            <h5 className="chart-title">Category Distribution</h5>
            <div className="chart-wrapper">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="chart-card glass">
            <h5 className="chart-title">Status Breakdown</h5>
            <div className="chart-wrapper">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[(index + 2) % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="chart-card glass">
            <h5 className="chart-title">Team Productivity (Tasks)</h5>
            <div className="chart-wrapper">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={teamProductivityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis dataKey="name" stroke="var(--color-text-subtle)" />
                  <YAxis stroke="var(--color-text-subtle)" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="tasksCompleted" name="Tasks Completed" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="totalTasks" name="Total Tasks" fill="var(--color-surface-hover)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

        {/* Row 4: Financial Overview & Recent Projects */}
        <div className="bottom-grid mt-4">
          <div className="chart-card glass">
            <h5 className="chart-title">Financial Overview</h5>
            <div className="chart-wrapper">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={financialOverviewData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis dataKey="name" stroke="var(--color-text-subtle)" />
                  <YAxis stroke="var(--color-text-subtle)" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Value" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Received" fill="#10b981" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Pending" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="table-card glass">
            <h5 className="table-title">Recent Projects</h5>
            <div className="table-responsive">
              <table className="table align-middle border-light">
                <thead>
                  <tr className="text-muted-2">
                    <th style={{ fontWeight: 500 }}>Project Name</th>
                    <th style={{ fontWeight: 500 }}>Category</th>
                    <th style={{ fontWeight: 500 }}>Status</th>
                    <th style={{ fontWeight: 500 }}>End Date</th>
                    <th style={{ fontWeight: 500 }}>Value</th>
                  </tr>
                </thead>
                <tbody>
                  {recentProjects.length > 0 ? recentProjects.map(p => (
                    <tr key={p.id || p._id}>
                      <td className="fw-medium">{p.title}</td>
                      <td>{p.category || 'N/A'}</td>
                      <td className="text-muted" style={{ fontSize: "14px", textTransform: "capitalize" }}>
                        {(p.status || 'unknown').replace('_', ' ')}
                      </td>
                      <td className="text-muted" style={{ fontSize: "14px" }}>
                        {p.end_date ? formatDate(p.end_date) : 'No Deadline'}
                      </td>
                      <td className="fw-bold text-success">{formatCurrency(p.project_value || 0)}</td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan="5" className="text-center py-4 text-muted">No recent projects found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}