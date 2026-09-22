import React from 'react';
import { Doughnut, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

export const RecruitmentChart = () => {
  const totalSegments = 15;
  const filledSegments = 7;
  const dataValues = Array(totalSegments).fill(1);
  const colors = dataValues.map((_, i) => i < filledSegments ? '#FF7028' : '#F3F4F6');

  const data = {
    datasets: [{
      data: dataValues,
      backgroundColor: colors,
      borderWidth: 0,
      borderRadius: 12,
      spacing: 10,
      cutout: '60%'
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    rotation: -110,
    circumference: 220,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false }
    }
  };

  return (
    <div style={{ height: '157px' }}>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export const AvgHireTimeChart = () => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar'],
    datasets: [
      { label: 'Applied to Shortlisted', data: [2, 4, 3], backgroundColor: '#0b4c5f', borderColor: '#ffffff', borderWidth: 3, borderDash: [4, 4], borderRadius: 8, borderSkipped: false, barThickness: 70, stack: 'stack1' },
      { label: 'Shortlisted', data: [1.7, 1.7, 1.7], backgroundColor: '#3e6f7c', borderColor: '#ffffff', borderWidth: 3, borderDash: [4, 4], borderRadius: 8, borderSkipped: false, barThickness: 70, stack: 'stack1' },
      { label: 'Interview to Offer', data: [4, 2, 2], backgroundColor: '#9fb8bf', borderColor: '#ffffff', borderWidth: 3, borderDash: [4, 4], borderRadius: 8, borderSkipped: false, barThickness: 70, stack: 'stack1' },
      { label: 'Acceptance', data: [3, 7, 5], backgroundColor: '#c9d8dc', borderColor: '#ffffff', borderWidth: 3, borderDash: [4, 4], borderRadius: 8, borderSkipped: false, barThickness: 70, stack: 'stack1' }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false }, tooltip: { enabled: true } },
    scales: {
      x: { stacked: true, grid: { display: false, padding: { left: -10 } }, ticks: { font: { size: 11 } } },
      y: { stacked: true, beginAtZero: true, grid: { borderDash: [4, 4], color: '#e5e7eb' }, ticks: { stepSize: 5, font: { size: 11 } } }
    }
  };

  return (
    <div style={{ height: '300px' }}>
      <Bar data={data} options={options} />
    </div>
  );
};
