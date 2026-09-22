import React from 'react';
import ReactApexChart from 'react-apexcharts';

export const RateChart = () => {
  const options = {
    chart: { type: 'bar', sparkline: { enabled: true }, toolbar: { show: false } },
    colors: ['#FF7129'],
    plotOptions: {
      bar: { columnWidth: '80%', borderRadius: 5 }
    },
    tooltip: { fixed: { enabled: false }, x: { show: false }, marker: { show: false } }
  };
  const series = [{ name: 'Rate', data: [30, 60, 30, 40, 100, 80, 90, 50, 60, 40, 30, 60] }];
  return <ReactApexChart options={options} series={series} type="bar" height={60} width="100%" />;
};

export const DayChart = () => {
  const options = {
    chart: { type: 'bar', sparkline: { enabled: true }, toolbar: { show: false } },
    colors: ['#0C4B5E'],
    plotOptions: {
      bar: { columnWidth: '80%', borderRadius: 5 }
    },
    tooltip: { fixed: { enabled: false }, x: { show: false }, marker: { show: false } }
  };
  const series = [{ name: 'Present', data: [80, 40, 20, 40, 100, 50, 40] }];
  return <ReactApexChart options={options} series={series} type="bar" height={60} width="100%" />;
};

export const WeeklyAttendanceChart = () => {
  const options = {
    chart: { type: 'line', toolbar: { show: false }, height: 290 },
    colors: ['#0C4B5E', '#A1BCC7', '#F58229'],
    stroke: { width: [0, 0, 2], curve: 'straight' },
    markers: { size: [0, 0, 5] },
    xaxis: { categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
    yaxis: { min: 0, max: 8, labels: { formatter: (val) => val === 0 ? "0" : val + "K" } },
    legend: { show: false }
  };
  const series = [
    { name: 'Present', type: 'column', data: [7.6, 5.1, 3.3, 2.8, 2.8, 3.1, 6.7] },
    { name: 'Absent', type: 'column', data: [2.0, 1.0, 5.2, 0.8, 1.4, 0.8, 1.5] },
    { name: 'Late', type: 'line', data: [3.5, 1.9, 3.6, 0.8, 1.7, 1.0, 1.7] }
  ];
  return <ReactApexChart options={options} series={series} height={290} />;
};

export const AttendanceStatisticsChart = () => {
  const options = {
    chart: { type: 'area', toolbar: { show: false }, height: 290 },
    colors: ['#F58229', '#0C4B5E'],
    dataLabels: { enabled: false },
    stroke: { curve: 'smooth', width: 2 },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        type: 'vertical',
        opacityFrom: 0.85,
        opacityTo: 0.15,
        colorStops: [
          [
            { offset: 0, color: '#F58229', opacity: 0.4 },
            { offset: 1, color: '#FEF1EB', opacity: 0.9 }
          ],
          [
            { offset: 0, color: '#0C4B5E', opacity: 0.3 },
            { offset: 1, color: '#EDF2F4', opacity: 0.9 }
          ]
        ]
      }
    },
    markers: {
      size: 5,
      strokeWidth: 0,
      hover: { size: 7 }
    },
    grid: {
      borderColor: '#EAEAEA',
      strokeDashArray: 4,
      xaxis: { lines: { show: false } },
      yaxis: { lines: { show: true } }
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: { style: { colors: '#666666', fontSize: '12px' } }
    },
    yaxis: {
      min: 100,
      max: 600,
      tickAmount: 5,
      labels: { offsetX: -15, style: { colors: '#666666', fontSize: '12px' } }
    },
    legend: { show: false },
    tooltip: { shared: true, intersect: false }
  };
  const series = [
    { name: 'Present', data: [490, 460, 380, 400, 390, 428, 380, 330, 410, 415, 410, 240] },
    { name: 'Absent', data: [235, 215, 190, 195, 195, 201, 190, 170, 200, 200, 200, 130] }
  ];
  return <ReactApexChart options={options} series={series} type="area" height={290} />;
};

export const AnalyticsChart = () => {
  const options = {
    chart: { type: 'donut', height: 250 },
    labels: ['Vacation', 'Personal', 'Sick Leave', 'Emergency'],
    colors: ['#E5A913', '#1DB469', '#3291F2', '#F27032'],
    stroke: { width: 3, colors: ['#fff'] },
    legend: { show: false }
  };
  const series = [16, 8, 12, 64];
  return <ReactApexChart options={options} series={series} type="donut" height={250} />;
};

export const DepartmentChart = () => {
  const options = {
    chart: { type: 'bar', height: 300, stacked: true, toolbar: { show: false } },
    colors: ['#1A84FF', '#FFC107', '#F5F5F5'],
    plotOptions: {
      bar: { horizontal: true, barHeight: '42%', borderRadius: 6 }
    },
    xaxis: { categories: ['Sales', 'Development', 'Marketing', 'Support'], max: 1200 },
    legend: { show: false }
  };
  const series = [
    { name: 'On-Time', data: [620, 670, 460, 650] },
    { name: 'Late', data: [300, 70, 95, 80] },
    { name: 'Remaining', data: [230, 410, 595, 420] }
  ];
  return <ReactApexChart options={options} series={series} type="bar" height={300} />;
};
