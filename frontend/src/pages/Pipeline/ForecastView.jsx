import React, { useMemo } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { formatCurrency, formatDate } from "@/utils/formatters";
import dayjs from "dayjs";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const StatCard = ({ label, value, type = "default" }) => (
  <div className="card p-3 shadow-sm border-0 h-100" style={{ backgroundColor: type === "primary" ? "#f0fdf4" : "#fff" }}>
    <div className="text-muted" style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.5px", fontWeight: 600 }}>{label}</div>
    <div className={`mt-2 fw-bold fs-4 ${type === "primary" ? "text-success" : ""}`}>{value}</div>
  </div>
);

export default function ForecastView({ deals, usersMap }) {
  // 1. Calculate Metrics
  const metrics = useMemo(() => {
    let totalPipeline = 0;
    let weightedPipeline = 0;
    let expectedThisMonth = 0;

    const currentMonth = dayjs().format("YYYY-MM");

    deals.forEach(d => {
      // Ignore lost/won deals for active pipeline forecasting
      if (d.stage === "lost" || d.stage === "won") return;

      const amt = Number(d.amount) || 0;
      const prob = Number(d.probability) || 0;
      const weight = amt * (prob / 100);

      totalPipeline += amt;
      weightedPipeline += weight;

      if (d.expected_close_date && dayjs(d.expected_close_date).format("YYYY-MM") === currentMonth) {
        expectedThisMonth += weight;
      }
    });

    return { totalPipeline, weightedPipeline, expectedThisMonth };
  }, [deals]);

  // 2. Prepare Chart Data (Forecast by Month for next 6 months)
  const chartData = useMemo(() => {
    const months = [];
    for (let i = 0; i < 6; i++) {
      months.push(dayjs().add(i, "month").format("YYYY-MM"));
    }

    const dataByMonth = {};
    months.forEach(m => dataByMonth[m] = 0);

    deals.forEach(d => {
      if (d.stage === "lost" || d.stage === "won") return;
      if (d.expected_close_date) {
        const m = dayjs(d.expected_close_date).format("YYYY-MM");
        if (dataByMonth[m] !== undefined) {
          const amt = Number(d.amount) || 0;
          const prob = Number(d.probability) || 0;
          dataByMonth[m] += amt * (prob / 100);
        }
      }
    });

    return {
      labels: months.map(m => dayjs(m).format("MMM YYYY")),
      datasets: [
        {
          label: "Expected Revenue (Weighted)",
          data: months.map(m => dataByMonth[m]),
          backgroundColor: "#3b82f6",
          borderRadius: 4,
        }
      ]
    };
  }, [deals]);

  // 3. High Priority Deals (>70% prob, closing within 30 days)
  const hotDeals = useMemo(() => {
    const next30Days = dayjs().add(30, "day");
    return deals.filter(d => {
      if (d.stage === "lost" || d.stage === "won") return false;
      const prob = Number(d.probability) || 0;
      if (prob < 70) return false;
      if (!d.expected_close_date) return false;
      
      const closeDate = dayjs(d.expected_close_date);
      return closeDate.isBefore(next30Days) && closeDate.isAfter(dayjs().subtract(1, "day"));
    }).sort((a, b) => dayjs(a.expected_close_date).valueOf() - dayjs(b.expected_close_date).valueOf());
  }, [deals]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => formatCurrency(context.raw)
        }
      }
    },
    scales: {
      y: {
        ticks: {
          callback: (val) => "₹" + (val / 1000) + "k"
        },
        beginAtZero: true,
      }
    }
  };

  return (
    <div className="forecast-view animate-fade-in p-2">
      {/* Metrics Row */}
      <div className="row g-3 mb-4">
        <div className="col-12 col-md-4">
          <StatCard label="Total Pipeline (Active)" value={formatCurrency(metrics.totalPipeline)} />
        </div>
        <div className="col-12 col-md-4">
          <StatCard label="Weighted Forecast" value={formatCurrency(metrics.weightedPipeline)} type="primary" />
        </div>
        <div className="col-12 col-md-4">
          <StatCard label="Expected This Month" value={formatCurrency(metrics.expectedThisMonth)} />
        </div>
      </div>

      <div className="row g-4">
        {/* Chart */}
        <div className="col-12 col-xl-8">
          <div className="card shadow-sm border-0 h-100 p-4">
            <h5 className="mb-4">6-Month Revenue Forecast</h5>
            <div style={{ height: "300px" }}>
              <Bar data={chartData} options={chartOptions} />
            </div>
          </div>
        </div>

        {/* Hot Deals */}
        <div className="col-12 col-xl-4">
          <div className="card shadow-sm border-0 h-100 p-4">
            <h5 className="mb-4">Hot Deals Closing Soon</h5>
            <div className="d-flex flex-column gap-3 overflow-auto" style={{ maxHeight: "300px" }}>
              {hotDeals.length === 0 ? (
                <div className="text-muted text-center py-4">No hot deals closing in next 30 days.</div>
              ) : (
                hotDeals.map(d => (
                  <div key={d.id || d._id} className="d-flex justify-content-between align-items-center p-2 rounded" style={{ backgroundColor: "#f8fafc" }}>
                    <div>
                      <div className="fw-bold" style={{ fontSize: "14px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "150px" }}>{d.title}</div>
                      <div className="text-muted" style={{ fontSize: "12px" }}>{formatDate(d.expected_close_date)}</div>
                    </div>
                    <div className="text-end">
                      <div className="fw-bold text-success" style={{ fontSize: "14px" }}>{formatCurrency(d.amount)}</div>
                      <div className="badge bg-primary-subtle text-primary border-0">{d.probability}%</div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
