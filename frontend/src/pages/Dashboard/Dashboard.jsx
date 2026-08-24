import { useCallback, useState, useEffect } from "react";
import { FiDollarSign, FiUsers, FiTrendingUp, FiActivity, FiDownload, FiCalendar, FiBarChart2 } from "react-icons/fi";
import PageHeader from "@/components/common/PageHeader/PageHeader";
import StatCard from "@/components/common/StatCard/StatCard";
import Button from "@/components/common/Button/Button";
import Loader from "@/components/common/Loader/Loader";
import LineChart from "@/components/charts/LineChart";
import DoughnutChart from "@/components/charts/DoughnutChart";
import ConversionFunnel from "@/components/charts/ConversionFunnel";
import WhatsAppEngagement from "@/components/charts/WhatsAppEngagement";
import ActivityHeatmap from "@/components/charts/ActivityHeatmap";
import { dashboardService } from "@/api/services/dashboardService";
import { useAsync } from "@/hooks/useAsync";
import { timeAgo } from "@/utils/formatters";
const ICONS = { revenue: FiDollarSign, deals: FiTrendingUp, leads: FiUsers, winrate: FiActivity };
export default function Dashboard() {
  const load = useCallback(() => dashboardService.summary(), []);
  const { data, loading } = useAsync(load, []);
  
  const [revenueRange, setRevenueRange] = useState("1m");
  const [chartData, setChartData] = useState({ labels: [], actual: [], projected: [] });
  const [chartLoading, setChartLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setChartLoading(true);
    dashboardService.getRevenueChart(revenueRange).then((res) => {
      if (isMounted) {
        setChartData(res);
        setChartLoading(false);
      }
    });
    return () => { isMounted = false; };
  }, [revenueRange]);

  if (loading || !data) return <Loader />;

  const hasChartData = chartData.actual.some(v => v > 0) || chartData.projected.some(v => v > 0);
  return (
    <>
      <PageHeader
        title="Executive Command Center"
        description="Organization performance pulse dashboard"
        actions={
          <>
           <Button variant="hero" icon={FiCalendar} >Last 30 Days</Button>
            <Button icon={FiDownload}>Export Report</Button>
             
          </>
        }
      />
      <div className="row g-3 mb-4">
        {data.stats.map((s) => (
          <div className="col-12 col-sm-6 col-xl-3" key={s.key}>
            <StatCard {...s} icon={ICONS[s.key]} />
          </div>
        ))}
      </div>
      <div className="row g-3 mb-4">
        <div className="col-12 col-xl-8">
          <div className="card p-3 p-md-4 h-100">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <div>
                <h3 style={{ fontSize: "1.1rem" }}>Revenue Growth</h3>
                <span className="text-muted-2" style={{ fontSize: 13 }}>Projected vs. Actual monthly earnings</span>
              </div>
              <select 
                className="form-select form-select-sm w-auto"
                value={revenueRange}
                onChange={(e) => setRevenueRange(e.target.value)}
                style={{ background: "var(--color-bg-secondary)", color: "var(--color-text)", border: "1px solid var(--color-border)" }}
              >
                <option value="1m">1 Month</option>
                <option value="3m">3 Months</option>
                <option value="6m">6 Months</option>
                <option value="1y">1 Year</option>
              </select>
            </div>
            
            <div style={{ minHeight: 300, position: "relative" }}>
              {chartLoading ? (
                <div className="d-flex justify-content-center align-items-center h-100" style={{ minHeight: 300 }}>
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : !hasChartData ? (
                <div className="d-flex flex-column justify-content-center align-items-center h-100 text-muted-2" style={{ minHeight: 300 }}>
                  <FiBarChart2 size={48} style={{ opacity: 0.2, marginBottom: "1rem" }} />
                  <p>No record found</p>
                </div>
              ) : (
                <LineChart
                  labels={chartData.labels}
                  datasets={[
                    { label: "Actual", data: chartData.actual, borderColor: "#4f46e5", backgroundColor: "rgba(79,70,229,0.12)" },
                    { label: "Projected", data: chartData.projected, borderColor: "#06b6d4", backgroundColor: "rgba(6,182,212,0.10)" },
                  ]}
                  height={300}
                />
              )}
            </div>
          </div>
        </div>
        <div className="col-12 col-xl-4">
          <div className="card p-3 p-md-4 h-100">
            <h3 className="mb-3" style={{ fontSize: "1.1rem" }}>Lead sources</h3>
            {data.sources && data.sources.length > 0 ? (
              <DoughnutChart
                labels={data.sources.map((s) => s.label)}
                values={data.sources.map((s) => s.value)}
                height={280}
              />
            ) : (
              <div className="d-flex flex-column justify-content-center align-items-center h-100 text-muted-2" style={{ minHeight: 280 }}>
                <FiBarChart2 size={48} style={{ opacity: 0.2, marginBottom: "1rem" }} />
                <p>No record found</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="row g-3 mb-4">
        <div className="col-12 col-xl-5">
          <div className="card p-3 p-md-4 h-100">
            {/* Using the image layout, the title is inside the Conversion Funnel or above it. 
                Our component currently doesn't have the title inside it, so we leave it here. */}
            <h3 className="mb-3" style={{ fontSize: "1.1rem" }}>Conversion Funnel</h3>
            {data.funnel && data.funnel.length > 0 ? (
              <ConversionFunnel data={data.funnel} />
            ) : (
              <div className="d-flex flex-column justify-content-center align-items-center h-100 text-muted-2" style={{ minHeight: 280 }}>
                <FiBarChart2 size={48} style={{ opacity: 0.2, marginBottom: "1rem" }} />
                <p>No record found</p>
              </div>
            )}
          </div>
        </div>
        <div className="col-12 col-xl-7">
          <div className="card p-3 p-md-4 h-100">
            <WhatsAppEngagement />
          </div>
        </div>
      </div>
      
      <div className="row g-3">
        <div className="col-12 col-xl-5">
          <div className="card p-3 p-md-4 h-100">
            <h3 className="mb-3" style={{ fontSize: "1.1rem" }}>Recent activity</h3>
            {data.activity && data.activity.length > 0 ? (
              <ul className="list-unstyled m-0">
                {data.activity.map((a) => (
                  <li key={a.id} className="d-flex gap-3 py-2" style={{ borderBottom: "1px solid var(--color-divider)" }}>
                    <div style={{
                      width: 8, height: 8, borderRadius: "50%",
                      background: "var(--color-primary)", marginTop: 8, flexShrink: 0,
                    }}/>
                    <div className="flex-grow-1">
                      <div style={{ fontSize: 14, color: "var(--color-text)" }}>{a.text}</div>
                      <div className="text-subtle" style={{ fontSize: 12 }}>{timeAgo(a.time)}</div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="d-flex flex-column justify-content-center align-items-center h-100 text-muted-2" style={{ minHeight: 150 }}>
                <FiActivity size={32} style={{ opacity: 0.2, marginBottom: "0.5rem" }} />
                <p style={{ margin: 0 }}>No recent activity</p>
              </div>
            )}
          </div>
        </div>
        <div className="col-12 col-xl-7">
          <div className="card p-3 p-md-4 h-100">
            <ActivityHeatmap data={data.heatmap || []} />
          </div>
        </div>
      </div>
    </>
  );
}