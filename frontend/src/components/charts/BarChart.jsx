import { Bar } from "react-chartjs-2";
import "./chartSetup";
export default function BarChart({ labels, datasets, height = 280, horizontal = false }) {
  const data = { labels, datasets: datasets.map((ds) => ({ borderRadius: 6, borderSkipped: false, ...ds })) };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: horizontal ? "y" : "x",
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { display: false }, ticks: { color: "#94a3b8" } },
      y: { grid: { color: "rgba(148,163,184,0.15)" }, ticks: { color: "#94a3b8" }, beginAtZero: true },
    },
  };
  return <div style={{ height }}><Bar data={data} options={options} /></div>;
}