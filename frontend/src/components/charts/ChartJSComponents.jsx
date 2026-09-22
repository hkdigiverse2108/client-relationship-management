import React from 'react';
import { Doughnut, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

export const CostChart = () => {
  const data = {
    labels: ['Salaries', 'Benefits', 'Bonuses', 'Overtime', 'Training', 'Incentives'],
    datasets: [{
      label: 'Semi Donut',
      data: [40, 10, 10, 20, 10, 10],
      backgroundColor: ['#0C4B5E', '#618B98', '#7298A4', '#84A5AF', '#95B2BB', '#A7BFC6'],
      borderWidth: 5,
      borderRadius: 10,
      borderColor: '#fff',
      hoverBorderWidth: 0,
      cutout: '80%',
    }]
  };

  const options = {
    rotation: -90,
    circumference: 180,
    layout: { padding: { top: -20, bottom: -20 } },
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } }
  };

  const centerTextPlugin = {
    id: 'centerText',
    beforeDraw(chart) {
      const { ctx, chartArea } = chart;
      if (!chartArea) return;
      const value = '$2,458,900';
      ctx.save();
      ctx.font = '600 12px Arial';
      ctx.fillStyle = '#111827';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'bottom';
      const x = (chartArea.left + chartArea.right) / 2;
      const y = chartArea.bottom - 50;
      ctx.fillText(value, x, y);
      ctx.restore();
    }
  };

  return (
    <div style={{ height: '180px' }}>
      <Doughnut data={data} options={options} plugins={[centerTextPlugin]} />
    </div>
  );
};

export const TicketCategoryChart = () => {
  const data = {
    labels: ['IT Support', 'HR', 'Payroll', 'Access', 'Hardware', 'Other'],
    datasets: [{
      data: [30, 12, 10, 18, 8, 12],
      backgroundColor: ['#F68B4A', '#6E8F99', '#45C676', '#F2BE1A', '#4C8DFF', '#E53935'],
      borderColor: '#ffffff',
      borderWidth: 3,
      borderRadius: 8,
      spacing: 1
    }]
  };

  const options = {
    rotation: -90,
    circumference: 180,
    cutout: '72%',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: true,
        backgroundColor: '#111827',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        padding: 10,
        cornerRadius: 6,
        displayColors: false,
        callbacks: {
          label: function (context) {
            return `${context.label}: ${context.parsed}`;
          }
        }
      }
    }
  };

  return (
    <div style={{ height: '200px' }}>
      <Doughnut data={data} options={options} />
    </div>
  );
};
