import React from 'react';
import ReactApexChart from 'react-apexcharts';

export const ProjectCategoryChart = () => {
  const options = {
    chart: { type: 'radialBar', height: 400, width: '100%' },
    colors: ['#03C95A', '#AB47BC', '#FFC107', '#1B84FF', '#FF6F28'],
    plotOptions: { radialBar: { startAngle: -90, endAngle: 90, hollow: { size: '10%', background: 'transparent' }, track: { background: '#E5E5E5', strokeWidth: '100%', margin: 10 }, dataLabels: { show: false } } },
    grid: { show: false, padding: { top: -30, bottom: -10, left: -30, right: -30 } },
    stroke: { lineCap: 'butt' }, 
    labels: ['Design', 'Development', 'Marketing', 'Sales', 'Maintenance']
  };
  const series = [85, 70, 60, 55, 50];
  return <ReactApexChart options={options} series={series} type="radialBar" height={400} />;
};

export const ProjectStatusChart = () => {
  const options = {
    chart: { type: 'bar', height: 240, toolbar: { show: false } },
    plotOptions: {
      bar: {
        horizontal: true, distributed: true, isFunnel: true, isFunnel3d: false, barHeight: '75%', borderRadius: 0,
        dropShadow: { enabled: true, top: 6, left: 0, blur: 3, color: '#000000', opacity: 0.3 }
      }
    },
    colors: ['#1B84FF', '#03C95A', '#0C4B5E', '#F26522', '#FFC107'], // Pending(primary/blue), Active(info/greenish), Completed(success), Overdue(danger/orange), OnHold(warning)
    dataLabels: { 
      enabled: true, 
      dropShadow: { enabled: false }, 
      formatter: function (val, opt) { return opt.w.globals.labels[opt.dataPointIndex]; }, 
      style: { colors: ['#ffffff'], fontSize: '14px', fontWeight: '600', fontFamily: 'Archivo, sans-serif' } 
    },
    xaxis: { categories: ['Pending : 15%', 'Active : 50%', 'Completed : 20%', 'Overdue : 10%', 'On Hold : 5%'], labels: { show: false }, axisBorder: { show: false }, axisTicks: { show: false } },
    yaxis: { labels: { show: false } },
    grid: { show: false, padding: { top: -20, bottom: 0, left: 0, right: 0 } },
    tooltip: { enabled: true, theme: 'dark' }, legend: { show: false },
    states: { hover: { filter: { type: 'darken', value: 0.9 } }, active: { filter: { type: 'none' } } }
  };
  const series = [{ name: 'Projects', data: [150, 120, 80, 50, 20] }];
  return <ReactApexChart options={options} series={series} type="bar" height={240} />;
};

export const TeamProductivityChart = () => {
  const options = {
    chart: { type: 'bar', height: 320, toolbar: { show: false } },
    plotOptions: {
      bar: { horizontal: false, columnWidth: '45%', borderRadius: 4, borderRadiusApplication: 'end' }
    },
    colors: ['#1B84FF', '#03C95A'], 
    dataLabels: { enabled: false },
    stroke: { show: true, width: 2, colors: ['transparent'] },
    xaxis: { 
      categories: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
      axisBorder: { show: false }, 
      axisTicks: { show: false },
      labels: { style: { colors: '#6B7280', fontSize: '13px' } }
    },
    yaxis: { 
      labels: { style: { colors: '#6B7280', fontSize: '13px' } }
    },
    grid: { show: true, borderColor: '#E5E7EB', strokeDashArray: 3, padding: { top: 0, bottom: 0, left: 10, right: 10 } },
    fill: { opacity: 1 },
    tooltip: { y: { formatter: function (val) { return val + " Tasks" } } },
    legend: { position: 'bottom', markers: { radius: 12 } }
  };
  const series = [
    { name: 'Total Tasks', data: [76, 85, 101, 98, 87] },
    { name: 'Completed Tasks', data: [44, 55, 57, 56, 61] }
  ];
  return <ReactApexChart options={options} series={series} type="bar" height={320} />;
};

export const FinancialOverviewChart = () => {
  const options = {
    chart: { type: 'radialBar', height: 340, toolbar: { show: false } },
    plotOptions: {
      radialBar: {
        hollow: { size: '45%' },
        track: { background: '#f2f2f2', strokeWidth: '100%', margin: 8 },
        dataLabels: {
          name: { fontSize: '14px', color: '#6B7280', offsetY: -10 },
          value: { fontSize: '24px', fontWeight: 700, color: '#111827', formatter: function (val) { return val + "%" } },
          total: {
            show: true,
            label: 'Total Value',
            fontSize: '14px',
            color: '#6B7280',
            formatter: function (w) {
              return "₹10.25M";
            }
          }
        }
      }
    },
    colors: ['#1B84FF', '#03C95A', '#FFC107', '#FF6F28'], 
    labels: ['Total Value', 'Amount Received', 'Pending Payments', 'Net Profit'],
    stroke: { lineCap: 'round' },
    legend: { show: true, position: 'bottom', markers: { radius: 12 } }
  };
  // Series for RadialBar should be percentages (0-100)
  // Total: 100%, Received: ~70%, Pending: ~30%, Net Profit: ~46%
  const series = [100, 70, 30, 46]; 
  return <ReactApexChart options={options} series={series} type="radialBar" height={340} />;
};
