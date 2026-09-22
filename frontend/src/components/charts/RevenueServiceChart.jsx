import React from 'react';
import ReactApexChart from 'react-apexcharts';

const RevenueServiceChart = () => {
  const options = {
    chart: { type: 'pie' },
    labels: ['Consulting', 'Subscriptions', 'Support', 'Implementation', 'Others'],
    colors: ['#3B7080', '#7fa2ad', '#9fb9c2', '#b7ccd3', '#d3e1e6'],
    legend: { show: false },
    dataLabels: { enabled: false },
    stroke: { width: 0 }
  };
  const series = [40, 25, 15, 10, 10];
  return <ReactApexChart options={options} series={series} type="pie" height={290} />;
};

export default RevenueServiceChart;
