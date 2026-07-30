import { useCallback } from "react";
import { FiDollarSign, FiUsers, FiTrendingUp, FiActivity, FiDownload, FiCalendar } from "react-icons/fi";
import PageHeader from "@/components/common/PageHeader/PageHeader";
import StatCard from "@/components/common/StatCard/StatCard";
import Button from "@/components/common/Button/Button";
import Loader from "@/components/common/Loader/Loader";
import LineChart from "@/components/charts/LineChart";
import BarChart from "@/components/charts/BarChart";
import DoughnutChart from "@/components/charts/DoughnutChart";
import { dashboardService } from "@/api/services/dashboardService";
import { useAsync } from "@/hooks/useAsync";
import { timeAgo } from "@/utils/formatters";
const ICONS = { revenue: FiDollarSign, deals: FiTrendingUp, leads: FiUsers, winrate: FiActivity };
export default function Dashboard() {
  const load = useCallback(() => dashboardService.summary(), []);
  const { data, loading } = useAsync(load, []);
  if (loading || !data) return <Loader />;
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
                <h3 style={{ fontSize: "1.1rem" }}>Revenue overview</h3>
                <span className="text-muted-2" style={{ fontSize: 13 }}>Monthly revenue vs previous year</span>
              </div>
            </div>
            <LineChart
              labels={data.revenueSeries.labels}
              datasets={[
                { label: "This year",     data: data.revenueSeries.current,  borderColor: "#4f46e5", backgroundColor: "rgba(79,70,229,0.12)" },
                { label: "Previous year", data: data.revenueSeries.previous, borderColor: "#06b6d4", backgroundColor: "rgba(6,182,212,0.10)" },
              ]}
              height={300}
            />
          </div>
        </div>
        <div className="col-12 col-xl-4">
          <div className="card p-3 p-md-4 h-100">
            <h3 className="mb-3" style={{ fontSize: "1.1rem" }}>Lead sources</h3>
            <DoughnutChart
              labels={data.sources.map((s) => s.label)}
              values={data.sources.map((s) => s.value)}
              height={280}
            />
          </div>
        </div>
      </div>
      <div className="row g-3">
        <div className="col-12 col-xl-7">
          <div className="card p-3 p-md-4 h-100">
            <h3 className="mb-3" style={{ fontSize: "1.1rem" }}>Sales pipeline</h3>
            <BarChart
              labels={data.pipeline.map((p) => p.stage)}
              datasets={[{
                label: "Deals",
                data: data.pipeline.map((p) => p.value),
                backgroundColor: ["#4f46e5","#6366f1","#8b5cf6","#06b6d4","#10b981"],
              }]}
              height={300}
            />
          </div>
        </div>
        <div className="col-12 col-xl-5">
          <div className="card p-3 p-md-4 h-100">
            <h3 className="mb-3" style={{ fontSize: "1.1rem" }}>Recent activity</h3>
            <ul className="list-unstyled m-0">
              {data.activity.map((a) => (
                <li key={a.id} className="d-flex gap-3 py-2" style={{ borderBottom: "1px solid var(--color-divider)" }}>
                  <div style={{
                    width: 8, height: 8, borderRadius: "50%",
                    background: "var(--color-primary)", marginTop: 8, flexShrink: 0,
                  }}/>
                  <div className="flex-grow-1">
                    <div style={{ fontSize: 14 }}>{a.text}</div>
                    <div className="text-subtle" style={{ fontSize: 12 }}>{timeAgo(a.time)}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}