import React from 'react';
import ReactApexChart from 'react-apexcharts';

export const VarianceChart = () => {
  const options = {
    chart: { height: 280, type: 'bar', stacked: true, toolbar: { show: false } },
    plotOptions: { bar: { columnWidth: '55%', borderRadius: 0 } },
    colors: ['rgba(245, 130, 41, 0.08)', '#0C4B5E'],
    stroke: { show: true, width: [0, 3], colors: ['transparent', '#0C4B5E'] },
    dataLabels: {
      enabled: true,
      textAnchor: 'middle',
      formatter: function (val, opts) {
        if (opts.seriesIndex === 1) {
          var percentages = ['0.9%', '5.1%', '', '(0.1%)', '(2.5%)', '(4.5%)'];
          return percentages[opts.dataPointIndex];
        }
        return '';
      },
      offsetY: -28,
      style: { fontSize: '12px', fontWeight: '600', colors: ['#000000'] },
      background: {
        enabled: true, color: '#ffffff', foreColor: '#000000', padding: 6, borderRadius: 12,
        borderWidth: 1, borderColor: '#EAEAEA', opacity: 1, dropShadow: { enabled: false }
      }
    },
    grid: { show: true, borderColor: '#F1F3F5', strokeDashArray: 4, xaxis: { lines: { show: false } }, yaxis: { lines: { show: true } } },
    xaxis: { axisBorder: { show: false }, axisTicks: { show: false }, labels: { style: { colors: '#7A7A7A', fontSize: '13px', fontWeight: 500 } } },
    yaxis: {
      min: 0, max: 250000, tickAmount: 5,
      labels: { offsetX: -15, style: { colors: '#7A7A7A', fontSize: '13px' }, formatter: function (value) { if (value === 0) return "0"; return "$" + (value / 1000) + "K"; } }
    },
    legend: { show: false }
  };
  const series = [
    {
      name: 'Actual',
      type: 'bar',
      data: [
        { x: 'Dev', y: 108000 },
        { x: 'Sales', y: 138000 },
        { x: 'Marketing', y: 10000 },
        { x: 'UI/UX Design', y: 92000 },
        { x: 'Support', y: 92000 },
        { x: 'Operations', y: 202000 }
      ]
    },
    {
      name: 'Top Indicator',
      type: 'bar',
      data: [
        { x: 'Dev', y: 4000 },
        { x: 'Sales', y: 4000 },
        { x: 'Marketing', y: 4000 },
        { x: 'UI/UX Design', y: 4000 },
        { x: 'Support', y: 4000 },
        { x: 'Operations', y: 4000 }
      ]
    }
  ];
  return <ReactApexChart options={options} series={series} type="bar" height={280} />;
};

export const ForecastChart = () => {
  const options = {
    chart: { type: 'rangeBar', height: 60, width: 80, toolbar: { show: false }, sparkline: { enabled: true } },
    plotOptions: { bar: { columnWidth: '65%', distributed: true, borderRadius: 2 } },
    colors: ['#F26522', '#F26522', '#F26522', '#F26522', '#F26522', '#F26522', '#F26522'],
    tooltip: { enabled: true }
  };
  const series = [{
    name: 'Forecast',
    data: [
      { x: 'Mon', y: [15, 75] }, { x: 'Tue', y: [25, 65] }, { x: 'Wed', y: [0, 90] },
      { x: 'Thu', y: [15, 75] }, { x: 'Fri', y: [35, 55] }, { x: 'Sat', y: [15, 75] }, { x: 'Sun', y: [15, 75] }
    ]
  }];
  return <ReactApexChart options={options} series={series} type="rangeBar" height={60} width={80} />;
};

export const ProjectionChart = () => {
  const options = {
    chart: { type: 'rangeBar', height: 60, width: 80, toolbar: { show: false }, sparkline: { enabled: true } },
    plotOptions: { bar: { columnWidth: '55%', distributed: true, borderRadius: 2 } },
    colors: ['#0C4B5E', '#0C4B5E', '#0C4B5E', '#0C4B5E', '#0B4F6C', '#0C4B5E', '#0C4B5E', '#0C4B5E'],
    tooltip: { enabled: true }
  };
  const series = [{
    name: 'Projection',
    data: [
      { x: 'Mon', y: [12, 18] }, { x: 'Tue', y: [6, 24] }, { x: 'Wed', y: [6, 24] },
      { x: 'Thu', y: [9, 21] }, { x: 'Fri', y: [0, 30] }, { x: 'Sat', y: [10, 20] }, { x: 'Sun', y: [11, 19] }
    ]
  }];
  return <ReactApexChart options={options} series={series} type="rangeBar" height={60} width={80} />;
};

export const OvertimeChart = () => {
  const options = {
    chart: { type: 'rangeBar', height: 60, width: 80, toolbar: { show: false }, sparkline: { enabled: true } },
    plotOptions: { bar: { columnWidth: '55%', distributed: true, borderRadius: 2 } },
    colors: ['#1B84FF', '#1B84FF', '#1B84FF', '#1B84FF', '#1B84FF', '#1B84FF', '#1B84FF'],
    tooltip: { enabled: true }
  };
  const series = [{
    name: 'Overtime',
    data: [
      { x: 'Mon', y: [25, 75] }, { x: 'Tue', y: [35, 65] }, { x: 'Wed', y: [10, 90] },
      { x: 'Thu', y: [40, 60] }, { x: 'Fri', y: [25, 75] }, { x: 'Sat', y: [15, 85] }, { x: 'Sun', y: [20, 80] }
    ]
  }];
  return <ReactApexChart options={options} series={series} type="rangeBar" height={60} width={80} />;
};

export const RiskChart = () => {
  const options = {
    chart: { type: 'rangeBar', height: 80, width: 80, toolbar: { show: false }, sparkline: { enabled: true } },
    plotOptions: { bar: { columnWidth: '55%', distributed: true, borderRadius: 2 } },
    colors: ['#E70D0D', '#E70D0D', '#E70D0D', '#E70D0D', '#E70D0D', '#E70D0D', '#E70D0D'],
    tooltip: { enabled: true }
  };
  const series = [{
    name: 'Risk',
    data: [
      { x: 'Mon', y: [20, 75] }, { x: 'Tue', y: [28, 68] }, { x: 'Wed', y: [10, 85] },
      { x: 'Thu', y: [-15, 110] }, { x: 'Fri', y: [35, 60] }, { x: 'Sat', y: [20, 75] }, { x: 'Sun', y: [20, 75] }
    ]
  }];
  return <ReactApexChart options={options} series={series} type="rangeBar" height={80} width={80} />;
};

export const BreakdownChart = () => {
  const options = {
    chart: { type: 'donut', height: 220, parentHeightOffset: 0, sparkline: { enabled: true } },
    labels: ['Salary', 'Taxes', 'Bonuses', 'Benefits'],
    grid: { padding: { top: -10, bottom: -25, left: 0, right: 0 } },
    plotOptions: { pie: { startAngle: -110, endAngle: 110, customScale: 1.1, offsetY: 0, donut: { size: '60%' } } },
    stroke: { show: true, width: 5, colors: ['var(--white-color)'], lineCap: 'round' },
    colors: ['#0B4F6C', '#FFC107', '#1B84FF', '#FF6B2C'],
    dataLabels: { enabled: false },
    legend: { show: false },
    tooltip: { enabled: true }
  };
  const series = [70, 10, 14, 6];
  return <ReactApexChart options={options} series={series} type="donut" height={220} />;
};

export const PayrollForecastChart = () => {
  const options = {
    chart: { height: 320, type: 'line', toolbar: { show: false }, fontFamily: '"Roboto", sans-serif' },
    colors: ['#FF6B2C', '#0B4F6C', 'rgba(11, 79, 108, 0.15)', 'var(--white-color)'],
    fill: { type: ['solid', 'solid', 'solid', 'solid'], opacity: [1, 1, 1, 1] },
    stroke: { width: [3, 3, 0, 0], dashArray: [0, 5, 0, 0], curve: 'straight' },
    grid: { borderColor: 'var(--border-color)', strokeDashArray: 4, xaxis: { lines: { show: false } }, yaxis: { lines: { show: true } } },
    dataLabels: { enabled: false },
    markers: { size: 5, colors: ['#FF6B2C', '#0B4F6C', 'transparent', 'transparent'], strokeColors: '#ffffff', strokeWidth: 0, hover: { size: 7 } },
    xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], axisBorder: { show: false }, axisTicks: { show: false }, labels: { style: { fontSize: '12px' } } },
    yaxis: { min: 0, max: 6, tickAmount: 6, labels: { offsetX: -15, formatter: function (val) { return val + "M"; }, style: { fontSize: '12px' } } },
    legend: { show: false }
  };
  const series = [
    { name: 'Actual Payroll', type: 'line', data: [1.1, 1.8, 1.5, 1.7, 2.1, 2.7, 3.4, 3.9, 4.1, null, null, null] },
    { name: 'Forecast', type: 'line', data: [null, null, null, null, null, null, null, null, 4.1, 4.3, 4.6, 5.0] },
    { name: 'Prediction Cone Upper', type: 'area', data: [null, null, null, null, null, null, null, null, 4.1, 4.8, 5.2, 5.6] },
    { name: 'Prediction Cone Lower', type: 'area', data: [null, null, null, null, null, null, null, null, 4.1, 3.4, 3.6, 3.8] }
  ];
  return <ReactApexChart options={options} series={series} type="line" height={320} />;
};
