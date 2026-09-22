import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const SemiDonutChart = () => {
  const data = {
    labels: ['Ongoing', 'Onhold', 'Completed', 'Overdue'],
    datasets: [{
      label: 'Semi Donut',
      data: [20, 40, 20, 10],
      backgroundColor: ['#FFC107', '#1B84FF', '#44c4fa', '#0D7858'],
      borderWidth: -10,
      borderColor: 'transparent',
      hoverBorderWidth: 0,
      cutout: '75%',
      borderRadius: 30,
      spacing: -30,
    }]
  };

  const options = {
    rotation: -90,
    circumference: 180,
    layout: {
      padding: {
        top: -20,    
        bottom: 20, 
      }
    },
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false 
      }
    },
    elements: {
      arc: {
        borderWidth: -30, 
      }
    }
  };

  return (
    <div style={{ height: '190px' }}>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default SemiDonutChart;
