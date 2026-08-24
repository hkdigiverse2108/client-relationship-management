import { Doughnut } from "react-chartjs-2";
import "./chartSetup";
export default function DoughnutChart({ labels, values, height = 240, colors }) {
  const palette = colors || ["#4f46e5", "#06b6d4", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];
  const data = {
    labels,
    datasets: [{
      data: values,
      backgroundColor: palette,
      borderWidth: 0,
      hoverOffset: 6,
    }],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "68%",
    plugins: { legend: { position: "bottom", labels: { usePointStyle: true, boxWidth: 8, color: "#94a3b8" } } },
  };
  return <div style={{ height }}><Doughnut data={data} options={options} /></div>;
}