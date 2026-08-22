import { Line } from "react-chartjs-2";
import "./chartSetup";
import "./LineChart.css";

export default function LineChart({ labels, datasets, height = 280, minWidth = "500px" }) {
  const data = {
    labels,
    datasets: datasets.map((ds) => ({
      tension: 0.4,
      borderWidth: 2,
      pointRadius: 0,
      pointHoverRadius: 5,
      fill: ds.fill ?? true,
      ...ds,
    })),
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { intersect: false, mode: "index" },
    plugins: {
      legend: { position: "bottom", labels: { usePointStyle: true, boxWidth: 8 } },
    },
    scales: {
      x: { grid: { display: false }, ticks: { color: "#94a3b8" } },
      y: { grid: { color: "rgba(148,163,184,0.15)" }, ticks: { color: "#94a3b8" }, beginAtZero: true },
    },
  };
  return (
    <div className="aio-linechart-wrapper">
      <div style={{ height, width: `max(100%, ${minWidth})`, position: "relative" }}>
        <Line data={data} options={options} />
      </div>
    </div>
  );
}