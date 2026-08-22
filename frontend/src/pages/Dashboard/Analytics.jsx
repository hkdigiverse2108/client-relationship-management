import { useCallback, useState, useEffect } from "react";
import { FiTrendingUp, FiPieChart, FiBarChart2, FiActivity, FiDollarSign } from "react-icons/fi";
import PageHeader from "@/components/common/PageHeader/PageHeader";
import StatCard from "@/components/common/StatCard/StatCard";
import Loader from "@/components/common/Loader/Loader";
import MixedChart from "@/components/charts/MixedChart";
import DoughnutChart from "@/components/charts/DoughnutChart";
import { dashboardService } from "@/api/services/dashboardService";

export default function AnalyticsDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dateFilter, setDateFilter] = useState("this_month");

  const load = useCallback(async () => {
    setLoading(true);
    let startDate = "";
    let endDate = "";
    
    const now = new Date();
    if (dateFilter === "this_month") {
      startDate = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
      endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59).toISOString();
    } else if (dateFilter === "last_30_days") {
      const past = new Date();
      past.setDate(now.getDate() - 30);
      startDate = past.toISOString();
      endDate = now.toISOString();
    } else if (dateFilter === "this_year") {
      startDate = new Date(now.getFullYear(), 0, 1).toISOString();
      endDate = new Date(now.getFullYear(), 11, 31, 23, 59, 59).toISOString();
    }

    const res = await dashboardService.getAnalyticsMetrics(startDate, endDate);
    setData(res);
    setLoading(false);
  }, [dateFilter]);

  useEffect(() => {
    load();
  }, [load]);

  if (loading || !data) return <Loader />;

  const { kpis, growth_dynamics, channel_attribution, revenue_by_service } = data;

  // Chart Data: MRR vs ARR
  const growthDatasets = [
    {
      type: "bar",
      label: "ARR",
      data: growth_dynamics.arr,
      backgroundColor: "rgba(79, 70, 229, 0.2)",
      borderColor: "#4f46e5",
      borderWidth: 1,
    },
    {
      type: "line",
      label: "MRR",
      data: growth_dynamics.mrr,
      borderColor: "#10b981",
      backgroundColor: "#10b981",
      fill: false,
    }
  ];



  return (
    <>
      <PageHeader
        title="Analytics Overview"
        description="Deep dive into revenue, growth dynamics, and attribution"
        actions={
          <select 
            className="form-select aio-input" 
            style={{ width: "200px" }}
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
          >
            <option value="this_month">This Month</option>
            <option value="last_30_days">Last 30 Days</option>
            <option value="this_year">This Year</option>
            <option value="all_time">All Time</option>
          </select>
        }
      />

      {/* KPIs Row */}
      <div className="row g-4 mb-4">
        <div className="col-12 col-md-6 col-lg-3">
          <StatCard 
            label="Total Revenue" 
            value={kpis.total_revenue} 
            format="currency"
            delta={kpis.revenue_growth} 
            trend={kpis.revenue_growth >= 0 ? "up" : "down"}
            icon={FiDollarSign} 
          />
        </div>
        <div className="col-12 col-md-6 col-lg-3">
          <StatCard 
            label="Net Profit" 
            value={kpis.net_profit} 
            format="currency"
            delta={kpis.profit_growth} 
            trend={kpis.profit_growth >= 0 ? "up" : "down"}
            icon={FiTrendingUp} 
          />
        </div>
        <div className="col-12 col-md-6 col-lg-3">
          <StatCard 
            label="MRR" 
            value={kpis.mrr} 
            format="currency"
            delta={kpis.mrr_growth} 
            trend={kpis.mrr_growth >= 0 ? "up" : "down"}
            icon={FiBarChart2} 
          />
        </div>
        <div className="col-12 col-md-6 col-lg-3">
          <StatCard 
            label="Churn Rate" 
            value={kpis.churn_rate} 
            format="percent"
            delta={kpis.churn_growth} 
            trend={kpis.churn_growth <= 0 ? "up" : "down"} // Lower churn is better
            icon={FiActivity} 
          />
        </div>
      </div>

      {/* Row 2: Growth Dynamics & Channel Attribution */}
      <div className="row g-4 mb-4">
        <div className="col-12 col-xl-8">
          <div className="card h-100">
            <div className="card-header border-0 bg-transparent pt-4 pb-0">
              <h5 className="mb-0">Growth Dynamics</h5>
              <p className="text-muted small mb-0">Monthly vs Annual Recurring Revenue</p>
            </div>
            <div className="card-body" style={{ height: "360px" }}>
              <MixedChart labels={growth_dynamics.labels} datasets={growthDatasets} />
            </div>
          </div>
        </div>

        <div className="col-12 col-xl-4">
          <div className="card h-100">
            <div className="card-header border-0 bg-transparent pt-4 pb-0">
              <h5 className="mb-0">Channel Attribution</h5>
              <p className="text-muted small mb-0">Revenue by Source</p>
            </div>
            <div className="card-body d-flex flex-column justify-content-center">
              {channel_attribution && channel_attribution.length > 0 ? (
                channel_attribution.map((ch, idx) => (
                  <div key={idx} className="mb-4">
                    <div className="d-flex justify-content-between mb-2">
                      <span className="fw-medium">{ch.name}</span>
                      <span className="fw-bold" style={{ color: ch.color }}>{ch.percentage}%</span>
                    </div>
                    <div className="progress" style={{ height: "8px", backgroundColor: "rgba(148,163,184,0.15)" }}>
                      <div 
                        className="progress-bar rounded-pill" 
                        role="progressbar" 
                        style={{ width: `${ch.percentage}%`, backgroundColor: ch.color }} 
                      ></div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-muted text-center py-4">No attribution data available</div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Row 3: Revenue by Service & Deal Velocity */}
      <div className="row g-4 mb-4">
        <div className="col-12 col-lg-6">
          <div className="card h-100">
            <div className="card-header border-0 bg-transparent pt-4 pb-0">
              <h5 className="mb-0">Revenue by Service</h5>
            </div>
            <div className="card-body d-flex flex-column align-items-center justify-content-center" style={{ height: "320px" }}>
              <div style={{ height: "100%", width: "100%" }}>
                <DoughnutChart 
                  labels={revenue_by_service.labels} 
                  values={revenue_by_service.values} 
                />
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-6">
          <div className="card h-100">
            <div className="card-body d-flex flex-column align-items-center justify-content-center text-center p-5">
              <div className="bg-primary bg-opacity-10 text-primary rounded-circle p-3 mb-4">
                <FiPieChart size={32} />
              </div>
              <h3 className="display-4 fw-bold mb-2">{kpis.deal_velocity} <span style={{ fontSize: "1.5rem", color: "var(--color-text-muted)" }}>Days</span></h3>
              <h5 className="mb-0 text-muted">Average Deal Velocity</h5>
              <p className="mt-3 text-muted" style={{ maxWidth: "300px" }}>
                This is the average time it takes for your team to move a deal from "New Lead" to "Won".
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}