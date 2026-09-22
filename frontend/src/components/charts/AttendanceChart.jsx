import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const AttendanceChart = () => {
  const data = {
    labels: ['Late', 'Present', 'Permission', 'Absent'],
    datasets: [{
      label: 'Semi Donut',
      data: [40, 20, 30, 10],
      backgroundColor: ['#0C4B5E', '#03C95A', '#FFC107', '#E70D0D'],
      borderWidth: 5,
      borderRadius: 10,
      borderColor: '#fff', 
      hoverBorderWidth: 0,
      cutout: '60%',
    }]
  };

  const options = {
    rotation: -100,
    circumference: 200,
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
      }
    },
  };

  return (
    <div style={{ height: '200px' }}>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default AttendanceChart;
