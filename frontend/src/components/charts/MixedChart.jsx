import { Chart } from "react-chartjs-2";
import "./chartSetup";

export default function MixedChart({ labels, datasets, height = 300, minWidth = "500px" }) {
  const data = {
    labels,
    datasets: datasets.map((ds) => {
      // If it's a bar chart, add rounded corners
      if (ds.type === "bar" || !ds.type) {
        return { borderRadius: 6, borderSkipped: false, ...ds };
      }
      // If it's a line chart, make it smooth and thicker
      if (ds.type === "line") {
        return {
          tension: 0.4,
          borderWidth: 3,
          pointRadius: 4,
          pointHoverRadius: 6,
          ...ds
        };
      }
      return ds;
    }),
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top',
        align: 'end',
        labels: {
          usePointStyle: true,
          boxWidth: 8,
          color: "#64748b"
        }
      },
      tooltip: {
        backgroundColor: "rgba(15, 23, 42, 0.9)",
        titleFont: { size: 13 },
        bodyFont: { size: 14, weight: "500" },
        padding: 12,
        cornerRadius: 8,
        displayColors: true
      }
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "#94a3b8" }
      },
      y: {
        grid: {
          color: "rgba(148,163,184,0.1)",
          drawBorder: false,
        },
        ticks: {
          color: "#94a3b8",
          callback: function(value) {
            if (value >= 1000) return '₹' + (value / 1000) + 'k';
            return '₹' + value;
          }
        },
        beginAtZero: true
      },
    },
  };

  return (
    <div className="aio-linechart-wrapper" style={{ overflowX: "auto", overflowY: "hidden", width: "100%", maxWidth: "100%", paddingBottom: "12px" }}>
      <div style={{ height, width: `max(100%, ${minWidth})`, position: "relative" }}>
        <Chart type="bar" data={data} options={options} />
      </div>
    </div>
  );
}
