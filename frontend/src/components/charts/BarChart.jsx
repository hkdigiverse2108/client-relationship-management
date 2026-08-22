import { Bar } from "react-chartjs-2";
import "./chartSetup";
export default function BarChart({ labels, datasets, height = 280, horizontal = false, minWidth = "400px", formatLabel }) {
  const data = { labels, datasets: datasets.map((ds) => ({ borderRadius: 6, borderSkipped: false, ...ds })) };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: horizontal ? "y" : "x",
    plugins: { legend: { display: false } },
    scales: {
      x: { 
        grid: { display: false }, 
        ticks: { 
          color: "#94a3b8",
          ...( !horizontal && formatLabel ? { callback: function(val, i) { return formatLabel(labels[i]); } } : {} )
        } 
      },
      y: { 
        grid: { color: "rgba(148,163,184,0.15)" }, 
        ticks: { 
          color: "#94a3b8",
          ...( horizontal && formatLabel ? { callback: function(val, i) { return formatLabel(labels[i]); } } : {} )
        }, 
        beginAtZero: true 
      },
    },
  };
  return (
    <div className="aio-linechart-wrapper" style={{ overflowX: "auto", overflowY: "hidden", width: "100%", maxWidth: "100%", paddingBottom: "12px" }}>
      <div style={{ height, width: horizontal ? "100%" : `max(100%, ${minWidth})`, position: "relative" }}>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}