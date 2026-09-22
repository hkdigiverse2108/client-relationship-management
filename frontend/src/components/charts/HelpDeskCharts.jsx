import React from 'react';
import ReactApexChart from 'react-apexcharts';

export const TicketTrendsChart = () => {
  const options = {
    chart: { type: 'area', toolbar: { show: false }, zoom: { enabled: false }, fontFamily: "'Public Sans', sans-serif" },
    colors: ['#F26522', '#0D4C63'],
    stroke: { curve: 'straight', width: 1.5 },
    fill: { type: 'gradient', gradient: { shadeIntensity: 0, opacityFrom: 0.35, opacityTo: 0.05, stops: [0, 100] } },
    markers: { size: 4, colors: ['#F26522', '#0D4C63'], strokeColors: '#fff', strokeWidth: 2, hover: { size: 6 } },
    grid: { borderColor: '#f1f1f1', strokeDashArray: 3, padding: { right: -8 }, xaxis: { lines: { show: false } }, yaxis: { lines: { show: true } } },
    xaxis: { categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], axisBorder: { show: false }, axisTicks: { show: false }, labels: { offsetX: 2, style: { colors: ['#8e94a9', '#8e94a9', '#8e94a9', '#F26522', '#8e94a9', '#8e94a9', '#8e94a9'], fontSize: '13px' } } },
    yaxis: { min: 0, max: 400, tickAmount: 4, labels: { offsetX: -15, style: { colors: '#8e94a9', fontSize: '13px' } } },
    tooltip: { shared: true, intersect: false },
    legend: { show: false },
    dataLabels: { enabled: false }
  };
  const series = [{ name: 'Created', data: [45, 60, 95, 70, 75, 60, 75] }, { name: 'Resolved', data: [145, 155, 185, 145, 145, 170, 170] }];
  return <ReactApexChart options={options} series={series} type="area" height={241} />;
};

export const TicketStatusChart = () => {
  const options = {
    chart: { type: 'radialBar', sparkline: { enabled: true } },
    plotOptions: { radialBar: { startAngle: -120, endAngle: 240, hollow: { size: '18%' }, track: { background: '#f2f2f2', strokeWidth: '100%', opacity: 1, margin: 6 }, dataLabels: { show: false } } },
    stroke: { lineCap: 'round' },
    colors: ['#F26522', '#1B84FF', '#FFC107', '#AB47BC'],
    labels: ['Open', 'In Progres', 'On Hold', 'Closed']
  };
  const series = [72, 55, 38, 22];
  return <ReactApexChart options={options} series={series} type="radialBar" height={296} />;
};

export const SlaComplianceChart = () => {
  const options = {
    chart: { type: 'radialBar', sparkline: { enabled: true } },
    colors: ['#F26522'],
    plotOptions: { radialBar: { startAngle: -110, endAngle: 250, hollow: { size: '62%' }, track: { background: '#E5E7EB', strokeWidth: '100%' }, dataLabels: { name: { show: false }, value: { fontSize: '24px', fontWeight: 600, color: '#1F2937', offsetY: 0, offsetX: 0, formatter: function (val) { return val.toFixed(1) + '%'; } } } } },
    stroke: { lineCap: 'round' }
  };
  const series = [80.5];
  return <ReactApexChart options={options} series={series} type="radialBar" height={230} />;
};

export const BacklogGrowthChart = () => {
  const actual = [80, 280, 330, 410, 470, 520, 560];
  const remaining = actual.map(v => 700 - v);
  const options = {
    chart: { type: 'bar', stacked: true, toolbar: { show: false } },
    colors: ['#0C4B5E', '#F3F4F6'],
    plotOptions: { bar: { columnWidth: '70%', borderRadius: 4 } },
    dataLabels: { enabled: false },
    stroke: { width: 0 },
    xaxis: { categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], axisBorder: { show: false }, axisTicks: { show: false }, labels: { style: { colors: '#6B7280', fontSize: '13px' } } },
    yaxis: { min: 0, max: 700, tickAmount: 7, labels: { style: { colors: '#6B7280', fontSize: '13px' } } },
    grid: { borderColor: '#F3F4F6', strokeDashArray: 4, xaxis: { lines: { show: false } }, yaxis: { lines: { show: true } } },
    legend: { show: false },
    fill: { opacity: 1 }
  };
  const series = [{ name: 'Growth', data: actual }, { name: 'Remaining', data: remaining }];
  return <ReactApexChart options={options} series={series} type="bar" height={300} />;
};

export const AgentPerformanceChart = ({ filledDots = 0 }) => {
  const totalDots = 24;
  const options = {
    chart: { type: 'scatter', height: 18, sparkline: { enabled: true } },
    markers: { size: 5.5, shape: 'circle', strokeWidth: 0 },
    xaxis: { min: 0, max: totalDots + 1, labels: { show: false } },
    yaxis: { show: false },
    grid: { show: false },
    tooltip: { enabled: false },
    legend: { show: false }
  };
  const series = [{
    data: Array.from({ length: totalDots }, (_, i) => ({
      x: i + 1,
      y: 1,
      fillColor: i < filledDots ? '#F26522' : '#E5E7EB'
    }))
  }];
  return <ReactApexChart options={options} series={series} type="scatter" height={18} />;
};
