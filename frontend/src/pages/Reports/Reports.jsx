import PageHeader from "@/components/common/PageHeader/PageHeader";
import StatCard from "@/components/common/StatCard/StatCard";
import LineChart from "@/components/charts/LineChart";
import BarChart from "@/components/charts/BarChart";
import DoughnutChart from "@/components/charts/DoughnutChart";
import { dashboardData } from "@/data/dashboardData";
import { dealsData } from "@/data/dealsData";
import { DEAL_STAGES } from "@/utils/constants";
import SearchInput from "@/components/common/PageHeaderSearchBar/SearchInput";
import Select from "@/components/common/Select/Select";
import Button from "@/components/common/Button/Button";
import { FiPlus, FiDollarSign } from "react-icons/fi";
import { useState } from "react";

export default function Reports() {
  const [status, setStatus] = useState("all");
  const wonAmount = dealsData
    .filter((d) => d.stage === "closed_won")
    .reduce((sum, d) => sum + d.amount, 0);
  const pipelineAmount = dealsData
    .filter((d) => !["closed_won", "closed_lost"].includes(d.stage))
    .reduce((sum, d) => sum + d.amount, 0);
  const stageAmounts = DEAL_STAGES.map((s) => ({
    label: s.label,
    value: dealsData.filter((d) => d.stage === s.id).reduce((sum, d) => sum + d.amount, 0),
  }));
  return (
    <>
      

      <PageHeader
              title="Reports"
              description="Performance insights across revenue, pipeline and team."
              actions={  <>   <SearchInput
              dark
              placeholder="Search projects..."
            />  <Select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            options={[
              { label: "All Status", value: "all" },
              { label: "Active", value: "active" },
              { label: "Completed", value: "completed" },
              { label: "On Hold", value: "hold" },
              { label: "Cancelled", value: "cancelled" },
            ]}
          /> <Button icon={FiPlus} variant="gradient">New Project</Button> </>}
            />
      <div className="row g-3 mb-4">
        <div className="col-12 col-md-6 col-xl-3"><StatCard label="Won revenue"       value={wonAmount}      delta={9.4}  trend="up"   format="currency" /></div>
        <div className="col-12 col-md-6 col-xl-3"><StatCard label="Open pipeline"      value={pipelineAmount} delta={4.2}  trend="up"   format="currency" /></div>
        <div className="col-12 col-md-6 col-xl-3"><StatCard label="Avg deal size"      value={Math.round(pipelineAmount / Math.max(1, dealsData.length))} delta={-1.8} trend="down" format="currency" /></div>
        <div className="col-12 col-md-6 col-xl-3"><StatCard label="Conversion rate"    value={42} delta={3.1} trend="up" format="percent" /></div>
      </div>
      <div className="row g-3 mb-3">
        <div className="col-12 col-xl-8">
          <div className="card p-3 p-md-4">
            <h3 className="mb-3" style={{ fontSize: "1.1rem" }}>Revenue trend</h3>
            <LineChart
              labels={dashboardData.revenueSeries.labels}
              datasets={[{ label: "Revenue", data: dashboardData.revenueSeries.current, borderColor: "#10b981", backgroundColor: "rgba(16,185,129,0.15)" }]}
              height={300}
            />
          </div>
        </div>
        <div className="col-12 col-xl-4">
          <div className="card p-3 p-md-4">
            <h3 className="mb-3" style={{ fontSize: "1.1rem" }}>Lead sources</h3>
            <DoughnutChart
              labels={dashboardData.sources.map((s) => s.label)}
              values={dashboardData.sources.map((s) => s.value)}
              height={260}
            />
          </div>
        </div>
      </div>
      <div className="card p-3 p-md-4">
        <h3 className="mb-3" style={{ fontSize: "1.1rem" }}>Pipeline value by stage</h3>
        <BarChart
          labels={stageAmounts.map((s) => s.label)}
          datasets={[{ label: "Amount", data: stageAmounts.map((s) => s.value), backgroundColor: "#4f46e5" }]}
          height={300}
        />
      </div>
    </>
  );
}