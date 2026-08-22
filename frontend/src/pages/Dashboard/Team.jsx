import { useCallback, useState, useEffect } from "react";
import { FiUsers, FiBriefcase, FiFolder, FiActivity, FiClock } from "react-icons/fi";
import PageHeader from "@/components/common/PageHeader/PageHeader";
import StatCard from "@/components/common/StatCard/StatCard";
import Loader from "@/components/common/Loader/Loader";
import BarChart from "@/components/charts/BarChart";
import DoughnutChart from "@/components/charts/DoughnutChart";
import { dashboardService } from "@/api/services/dashboardService";
import { formatDateTime } from "@/utils/formatters";

export default function TeamDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await dashboardService.getTeamMetrics();
    setData(res);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  if (loading || !data) return <Loader />;

  const { kpis, roles_distribution, workload, recent_activities_feed } = data;

  // Bar Chart Data for Workload
  const formatRepName = (name) => {
    const parts = name.trim().split(" ");
    if (parts.length > 1) {
      return `${parts[0]} ${parts[parts.length - 1][0]}.`;
    }
    return name;
  };

  const workloadLabels = workload.map((w) => w.name);
  const dealsData = workload.map((w) => w.deals);
  const projectsData = workload.map((w) => w.projects);
  const tasksData = workload.map((w) => w.tasks);

  const workloadDatasets = [
    { label: "Active Deals", data: dealsData, backgroundColor: "#4f46e5" },
    { label: "Active Projects", data: projectsData, backgroundColor: "#10b981" },
    { label: "Open Tasks", data: tasksData, backgroundColor: "#f59e0b" },
  ];

  // Doughnut Chart Data for Roles
  const roleLabels = roles_distribution.map((r) => r.id);
  const roleCounts = roles_distribution.map((r) => r.value);
  const roleColors = ["#6366f1", "#ec4899", "#8b5cf6", "#14b8a6", "#f43f5e"];



  return (
    <>
      <PageHeader
        title="Team Dashboard"
        description="Team performance, workload distribution, and real-time activity"
      />

      <div className="row g-4 mb-4">
        <div className="col-12 col-md-6 col-lg-3">
          <StatCard label="Active Members" value={kpis.total_members} icon={FiUsers} />
        </div>
        <div className="col-12 col-md-6 col-lg-3">
          <StatCard label="Active Deals" value={kpis.open_deals} icon={FiBriefcase} />
        </div>
        <div className="col-12 col-md-6 col-lg-3">
          <StatCard label="Active Projects" value={kpis.active_projects} icon={FiFolder} />
        </div>
        <div className="col-12 col-md-6 col-lg-3">
          <StatCard label="Recent Activity" value={kpis.recent_activities} icon={FiActivity} />
        </div>
      </div>

      <div className="row g-4 mb-4">
        <div className="col-12 col-xl-8">
          <div className="card h-100">
            <div className="card-header border-0 bg-transparent pt-4 pb-0">
              <h5 className="mb-0">Workload Distribution</h5>
            </div>
            <div className="card-body" style={{ height: "350px" }}>
              {workload.length > 0 ? (
                <BarChart labels={workloadLabels} formatLabel={formatRepName} datasets={workloadDatasets} />
              ) : (
                <div className="d-flex h-100 align-items-center justify-content-center text-muted">
                  No workload data available
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="col-12 col-xl-4">
          <div className="card h-100">
            <div className="card-header border-0 bg-transparent pt-4 pb-0">
              <h5 className="mb-0">Team Composition</h5>
            </div>
            <div className="card-body d-flex flex-column align-items-center justify-content-center" style={{ height: "350px" }}>
              {roleCounts.length > 0 ? (
                <div style={{ height: "100%", width: "100%" }}>
                  <DoughnutChart labels={roleLabels} values={roleCounts} colors={roleColors} />
                </div>
              ) : (
                <span className="text-muted">No role data</span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4 mb-4">
        <div className="col-12 col-lg-8">
          <div className="card">
            <div className="card-header border-0 bg-transparent pt-4 pb-0">
              <h5 className="mb-0">Team Roster</h5>
            </div>
            <div className="card-body p-0 mt-3">
              <div className="table-responsive">
                <table className="table aio-table mb-0">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Role</th>
                      <th>Deals</th>
                      <th>Projects</th>
                      <th>Tasks</th>
                      <th>Total Items</th>
                    </tr>
                  </thead>
                  <tbody>
                    {workload.map((member) => (
                      <tr key={member.id}>
                        <td className="fw-medium">{member.name}</td>
                        <td><span className="badge bg-light text-dark">{member.role}</span></td>
                        <td>{member.deals}</td>
                        <td>{member.projects}</td>
                        <td>{member.tasks}</td>
                        <td><strong>{member.total_items}</strong></td>
                      </tr>
                    ))}
                    {workload.length === 0 && (
                      <tr><td colSpan="6" className="text-center py-4">No active team members</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-4">
          <div className="card">
            <div className="card-header border-0 bg-transparent pt-4 pb-0">
              <h5 className="mb-0">Live Activity Feed</h5>
            </div>
            <div className="card-body" style={{ maxHeight: "450px", overflowY: "auto" }}>
              <div className="activity-timeline position-relative">
                {recent_activities_feed.length === 0 ? (
                  <div className="text-muted text-center mt-4">No recent activity</div>
                ) : (
                  recent_activities_feed.map((log, i) => (
                    <div key={log.id} className="d-flex mb-4">
                      <div className="flex-shrink-0 mt-1 me-3 position-relative">
                        <div className="bg-primary bg-opacity-10 text-primary rounded-circle d-flex align-items-center justify-content-center" style={{ width: 32, height: 32 }}>
                          <FiClock size={14} />
                        </div>
                        {i !== recent_activities_feed.length - 1 && (
                          <div className="position-absolute border-start border-2 h-100" style={{ left: "15px", top: "32px", borderColor: "var(--color-border) !important" }}></div>
                        )}
                      </div>
                      <div className="flex-grow-1 pb-2">
                        <div className="fw-medium mb-1" style={{ fontSize: "14px" }}>{log.message}</div>
                        <div className="text-muted" style={{ fontSize: "12px" }}>
                          {formatDateTime(log.timestamp)}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}