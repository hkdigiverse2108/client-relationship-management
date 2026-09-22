import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const centerTextPlugin = {
  id: 'centerText',
  beforeDraw(chart) {
    const { ctx, chartArea } = chart;
    if (!chartArea) return;

    const value = '20%';

    ctx.save();
    ctx.font = '600 12px Arial';
    ctx.fillStyle = '#fff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const x = (chartArea.left + chartArea.right) / 2;
    const y = (chartArea.top + chartArea.bottom) / 2;

    ctx.fillText(value, x, y);
    ctx.restore();
  }
};

const TrainingChart = () => {
  const data = {
    labels: ['Training', 'Completed'],
    datasets: [{
      label: 'Semi Donut',
      data: [80, 20],
      backgroundColor: ['#fff', '#F26522'],
      borderWidth: 2,
      borderRadius: 10,
      borderColor: '#3B7080', 
      hoverBorderWidth: 0,   
      cutout: '60%',
    }]
  };

  const options = {
    rotation: -90,
    circumference: 360,
    layout: {
      padding: {
        top: -20,    
        bottom: -20, 
      }
    },
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false 
      },
      tooltip: {
        enabled: false 
      }
    },
  };

  return (
    <div style={{ height: '50px', width: '50px' }}>
      <Doughnut data={data} options={options} plugins={[centerTextPlugin]} />
    </div>
  );
};

export default TrainingChart;
