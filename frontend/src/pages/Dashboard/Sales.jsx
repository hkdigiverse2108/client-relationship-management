import { useCallback, useState, useEffect } from "react";
import { FiDollarSign, FiTrendingUp, FiTarget, FiPieChart, FiBarChart2 } from "react-icons/fi";
import PageHeader from "@/components/common/PageHeader/PageHeader";
import StatCard from "@/components/common/StatCard/StatCard";
import Loader from "@/components/common/Loader/Loader";
import BarChart from "@/components/charts/BarChart";
import DoughnutChart from "@/components/charts/DoughnutChart";
import { dashboardService } from "@/api/services/dashboardService";
import { formatCurrency, formatDateTime } from "@/utils/formatters";

export default function SalesDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await dashboardService.getSalesMetrics();
    setData(res);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  if (loading || !data) return <Loader />;

  const { kpis, target, rep_performance, stage_breakdown, recent_wins } = data;

  const targetProgress = Math.min((target.monthly_achieved / target.monthly_target) * 100, 100) || 0;

  // Chart Data preparation
  const repLabels = rep_performance.map(r => r.name);
  const repWon = rep_performance.map(r => r.won_revenue);
  const repPipeline = rep_performance.map(r => r.pipeline);

  const stageLabels = stage_breakdown.map(s => s.id);
  const stageValues = stage_breakdown.map(s => s.value);

  return (
    <>
      <PageHeader
        title="Sales Dashboard"
        description="Track team performance and revenue targets"
      />

      {/* Target Progress Bar */}
      <div className="card p-3 p-md-4 mb-4 border-0 shadow-sm" style={{ background: "linear-gradient(135deg, var(--color-primary-soft), #fff)" }}>
        <div className="d-flex justify-content-between align-items-end mb-2">
          <div>
            <h5 className="mb-1 fw-bold text-primary">Monthly Sales Target</h5>
            <span className="text-muted-2" style={{ fontSize: "14px" }}>
              {formatCurrency(target.monthly_achieved)} / {formatCurrency(target.monthly_target)} achieved
            </span>
          </div>
          <div className="fw-bold fs-4 text-primary">{targetProgress.toFixed(1)}%</div>
        </div>
        <div className="progress" style={{ height: "12px", borderRadius: "10px", backgroundColor: "rgba(0,0,0,0.05)" }}>
          <div 
            className="progress-bar bg-primary" 
            role="progressbar" 
            style={{ width: `${targetProgress}%`, borderRadius: "10px" }} 
            aria-valuenow={targetProgress} 
            aria-valuemin="0" 
            aria-valuemax="100"
          ></div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="row g-3 mb-4">
        <div className="col-12 col-sm-6 col-xl-3">
          <StatCard label="Total Pipeline" value={kpis.total_pipeline} format="currency" icon={FiPieChart} trend="up" delta={0} />
        </div>
        <div className="col-12 col-sm-6 col-xl-3">
          <StatCard label="Closed Won Revenue" value={kpis.closed_revenue} format="currency" icon={FiDollarSign} trend="up" delta={0} />
        </div>
        <div className="col-12 col-sm-6 col-xl-3">
          <StatCard label="Average Deal Size" value={kpis.avg_deal_size} format="currency" icon={FiTrendingUp} trend="up" delta={0} />
        </div>
        <div className="col-12 col-sm-6 col-xl-3">
          <StatCard label="Win Rate" value={kpis.win_rate} format="percent" icon={FiTarget} trend="up" delta={0} />
        </div>
      </div>

      {/* Charts Row */}
      <div className="row g-3 mb-4">
        <div className="col-12 col-xl-8">
          <div className="card p-3 p-md-4 h-100 border-0 shadow-sm">
            <h3 className="mb-4" style={{ fontSize: "1.1rem" }}>Rep-wise Performance</h3>
            {repLabels.length > 0 ? (
              <BarChart
                labels={repLabels}
                datasets={[
                  { label: "Closed Won", data: repWon, backgroundColor: "#10b981", borderColor: "#10b981" },
                  { label: "Active Pipeline", data: repPipeline, backgroundColor: "#3b82f6", borderColor: "#3b82f6" }
                ]}
                height={300}
              />
            ) : (
              <div className="d-flex flex-column justify-content-center align-items-center h-100 text-muted-2">
                <FiBarChart2 size={48} style={{ opacity: 0.2, marginBottom: "1rem" }} />
                <p>No records found</p>
              </div>
            )}
          </div>
        </div>

        <div className="col-12 col-xl-4">
          <div className="card p-3 p-md-4 h-100 border-0 shadow-sm">
            <h3 className="mb-4" style={{ fontSize: "1.1rem" }}>Sales by Stage</h3>
            {stageLabels.length > 0 ? (
              <DoughnutChart
                labels={stageLabels.map(l => l.replace("_", " ").toUpperCase())}
                values={stageValues}
                height={300}
              />
            ) : (
              <div className="d-flex flex-column justify-content-center align-items-center h-100 text-muted-2">
                <FiPieChart size={48} style={{ opacity: 0.2, marginBottom: "1rem" }} />
                <p>No pipeline data</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tables Row */}
      <div className="row g-3">
        <div className="col-12 col-xl-7">
          <div className="card p-3 p-md-4 h-100 border-0 shadow-sm">
            <h3 className="mb-4" style={{ fontSize: "1.1rem" }}>Sales Leaderboard</h3>
            <div className="table-responsive">
              <table className="table align-middle border-light">
                <thead>
                  <tr className="text-muted-2">
                    <th style={{ fontWeight: 500 }}>Rep Name</th>
                    <th style={{ fontWeight: 500 }}>Won Deals</th>
                    <th style={{ fontWeight: 500 }}>Generated Revenue</th>
                    <th style={{ fontWeight: 500 }}>Win Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {rep_performance.map((rep) => (
                    <tr key={rep.id}>
                      <td className="fw-medium">{rep.name}</td>
                      <td>{rep.won_deals} / {rep.total_deals}</td>
                      <td className="text-success fw-bold">{formatCurrency(rep.won_revenue)}</td>
                      <td>
                        <span className={`badge ${rep.win_rate >= 50 ? 'bg-success-subtle text-success' : 'bg-warning-subtle text-warning'} border-0`}>
                          {rep.win_rate}%
                        </span>
                      </td>
                    </tr>
                  ))}
                  {rep_performance.length === 0 && (
                    <tr>
                      <td colSpan="4" className="text-center text-muted py-4">No data available</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="col-12 col-xl-5">
          <div className="card p-3 p-md-4 h-100 border-0 shadow-sm">
            <h3 className="mb-4" style={{ fontSize: "1.1rem" }}>Recent Big Wins</h3>
            <div className="table-responsive">
              <table className="table align-middle border-light">
                <thead>
                  <tr className="text-muted-2">
                    <th style={{ fontWeight: 500 }}>Deal</th>
                    <th style={{ fontWeight: 500 }}>Amount</th>
                    <th style={{ fontWeight: 500 }}>Closed By</th>
                  </tr>
                </thead>
                <tbody>
                  {recent_wins.map((deal) => (
                    <tr key={deal.id}>
                      <td>
                        <div className="fw-medium text-truncate" style={{ maxWidth: "150px" }}>{deal.title}</div>
                        <div className="text-muted" style={{ fontSize: "12px" }}>{formatDateTime(deal.date)}</div>
                      </td>
                      <td className="text-success fw-bold">{formatCurrency(deal.amount)}</td>
                      <td style={{ fontSize: "14px" }}>{deal.rep_name}</td>
                    </tr>
                  ))}
                  {recent_wins.length === 0 && (
                    <tr>
                      <td colSpan="3" className="text-center text-muted py-4">No recent wins</td>
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