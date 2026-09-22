import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const DealChart = () => {
  const data = {
    labels: ['Email', 'Chat', 'Sales'],
    datasets: [{
      data: [45, 25, 30],
      backgroundColor: [
        '#3f6f7f', // blue
        '#ffc107', // yellow
        '#ff6a2c'  // orange
      ],
      borderWidth: 0,
      borderRadius: 20,
      spacing: 6
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '75%',
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        enabled: false
      }
    }
  };

  return (
    <div className="mx-auto" style={{ width: '240px', height: '240px' }}>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default DealChart;
