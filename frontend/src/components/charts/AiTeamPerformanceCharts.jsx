import React from 'react';
import ReactApexChart from 'react-apexcharts';

export const PerformanceChart = () => {
  const totalBlocks = 15;
  const filledBlocks = 11;
  const options = {
    chart: { type: 'bar', height: 16, width: '100%', toolbar: { show: false }, sparkline: { enabled: true } },
    plotOptions: { bar: { distributed: true, columnWidth: '80%', borderRadius: 8, borderRadiusApplication: 'around' } },
    colors: [({ dataPointIndex }) => (dataPointIndex < filledBlocks ? '#F26522' : '#E5E7EB')],
    dataLabels: { enabled: false },
    grid: { show: false },
    xaxis: { labels: { show: false }, axisBorder: { show: false }, axisTicks: { show: false } },
    yaxis: { show: false, max: 1 },
    tooltip: { enabled: false },
    states: { hover: { filter: { type: 'none' } }, active: { filter: { type: 'none' } } }
  };
  const series = [{ data: Array(totalBlocks).fill(1) }];
  return <ReactApexChart options={options} series={series} type="bar" height={16} />;
};

export const PerformersChart = () => {
  const options = {
    chart: { width: 80, height: 40, type: 'bar', stacked: true, toolbar: { show: false }, sparkline: { enabled: true } },
    plotOptions: { bar: { columnWidth: '45%', borderRadius: 2, colors: { backgroundBarColors: ['#F8F9FA', '#F8F9FA', '#F8F9FA', '#F8F9FA', '#F8F9FA'], backgroundBarOpacity: 1, backgroundBarRadius: 2 } } },
    colors: ['#1B84FF'],
    grid: { show: false },
    xaxis: { labels: { show: false } },
    yaxis: { min: -50, max: 50, show: false },
    tooltip: { enabled: true }
  };
  const series = [
    { name: 'Positive', data: [15, 40, 30, 35, 40, 35, 32] },
    { name: 'Negative', data: [-15, -40, -30, -35, -40, -35, -32] }
  ];
  return <ReactApexChart options={options} series={series} type="bar" height={40} width={80} />;
};

export const GoalsChart = () => {
  const options = {
    chart: { width: 80, height: 40, type: 'bar', toolbar: { show: false }, sparkline: { enabled: true } },
    plotOptions: { bar: { columnWidth: '90%', borderRadius: 2, distributed: true } },
    grid: { show: false, padding: { left: 2, right: 2, bottom: 2 } },
    colors: ['#E9ECEF', '#E9ECEF', '#E9ECEF', '#E9ECEF', '#E9ECEF', '#F26522', '#E9ECEF', '#E9ECEF', '#E9ECEF', '#E9ECEF', '#E9ECEF'],
    xaxis: { labels: { show: false }, axisBorder: { show: false } },
    yaxis: { show: false },
    tooltip: { enabled: true },
    legend: { show: false }
  };
  const series = [{ name: 'Jobs', data: [45, 30, 70, 15, 45, 100, 45, 35, 25, 15, 25] }];
  return <ReactApexChart options={options} series={series} type="bar" height={40} width={80} />;
};

export const ProductivityChart = () => {
  const options = {
    chart: { type: 'area', height: 50, width: 110, sparkline: { enabled: true }, toolbar: { show: false } },
    colors: ['#f26522'],
    stroke: { curve: 'straight', width: 2, lineCap: 'round' },
    fill: { type: 'gradient', gradient: { shadeIntensity: 1, inverseColors: false, opacityFrom: 0.20, opacityTo: 0.02, stops: [0, 100] } },
    grid: { show: false, padding: { left: 0, right: 0, top: 2, bottom: 0 } },
    dataLabels: { enabled: false },
    xaxis: { labels: { show: false }, axisBorder: { show: false }, axisTicks: { show: false } },
    yaxis: { show: false },
    tooltip: { enabled: false }
  };
  const series = [{ name: "Performance", data: [8, 18, 32, 32, 36, 40, 40, 58, 58] }];
  return <ReactApexChart options={options} series={series} type="area" height={50} width={110} />;
};

export const EngagementChart = () => {
  const options = {
    chart: { height: 40, width: "125", type: 'area', toolbar: { show: false }, zoom: { enabled: false }, sparkline: { enabled: true } },
    colors: ['#F2994A'],
    dataLabels: { enabled: false },
    stroke: { show: true, curve: 'smooth', width: 0 },
    fill: { type: 'gradient', gradient: { shadeIntensity: 1, inverseColors: false, opacityFrom: 0.9, opacityTo: 0.08, stops: [0, 100] } },
    xaxis: { labels: { show: false }, axisBorder: { show: false }, axisTicks: { show: false } },
    yaxis: { show: false },
    grid: { show: false, padding: { top: -10, right: 0, bottom: -8, left: 0 } },
    tooltip: { enabled: false }
  };
  const series = [{ name: "performance", data: [2, 35, 32, 78, 25, 72, 18, 82, 40, 88, 55, 68, 48, 60, 10, 30, 0, 12] }];
  return <ReactApexChart options={options} series={series} type="area" height={40} width={125} />;
};

export const PerformanceProductivityEngagementChart = () => {
  const options = {
    chart: { height: 320, type: 'bar', stacked: true, toolbar: { show: false }, parentHeightOffset: 0 },
    colors: ['#F37438', '#F9B291', '#FCE0D3'],
    plotOptions: { bar: { horizontal: false, columnWidth: '48%', borderRadius: 6, borderRadiusApplication: 'around', borderRadiusWhenStacked: 'all', distributed: false } },
    stroke: { show: true, width: 4, colors: ['#fff'] },
    dataLabels: { enabled: false },
    grid: { borderColor: '#E5E7EB', strokeDashArray: 5, padding: { top: -10, right: -10, left: -10, bottom: 0 } },
    legend: { show: true, position: 'bottom', horizontalAlign: 'center', fontSize: '14px', fontWeight: 500, offsetY: 8, markers: { width: 14, height: 5, radius: 50, offsetX: -4 }, itemMargin: { horizontal: 16, vertical: 6 }, labels: { colors: '#111827' } },
    xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], axisBorder: { show: false }, axisTicks: { show: false }, labels: { style: { colors: '#111827', fontSize: '13px', fontWeight: 500 } } },
    yaxis: { min: 0, max: 100, tickAmount: 5, labels: { offsetX: -20, style: { colors: '#111827', fontSize: '13px', fontWeight: 500 } } },
    fill: { opacity: 1 },
    tooltip: { enabled: true, shared: true, intersect: false }
  };
  const series = [
    { name: 'Performance', data: [45, 22, 38, 8, 22, 32, 40, 10, 45, 40, 22, 40] },
    { name: 'Productivity', data: [18, 16, 8, 40, 16, 40, 25, 35, 26, 10, 28, 16] },
    { name: 'Engagement', data: [15, 14, 42, 6, 16, 28, 18, 6, 15, 16, 16, 38] }
  ];
  return <ReactApexChart options={options} series={series} type="bar" height={320} />;
};

export const ProductivityQualityChart = () => {
  const options = {
    chart: { height: 300, type: 'area', toolbar: { show: false }, zoom: { enabled: false } },
    colors: ['#0F5B78', '#FF6B1A'],
    dataLabels: { enabled: false },
    stroke: { curve: 'straight', width: 1, dashArray: [4, 4] },
    markers: { size: 0, hover: { size: 5 } },
    fill: { type: 'solid', opacity: [0.06, 0.04] },
    grid: { borderColor: '#E5E7EB', strokeDashArray: 4, xaxis: { lines: { show: false } }, padding: { top: 0, right: 10, bottom: 0, left: -10 } },
    legend: { show: false },
    xaxis: { categories: ['', 'Jan', '', '', 'Feb', '', '', 'Mar', '', ''], axisBorder: { show: false }, axisTicks: { show: false }, labels: { style: { colors: '#6B7280', fontSize: '13px', fontWeight: 500 } } },
    yaxis: { min: 0, max: 100, tickAmount: 5, labels: { offsetX: -15, style: { colors: '#6B7280', fontSize: '13px', fontWeight: 500 } } },
    tooltip: { enabled: false }
  };
  const series = [
    { name: 'Productivity', data: [66, 74, 90, 66, 67, 82, 80, 103, 84, 100] },
    { name: 'Quality', data: [36, 44, 66, 50, 53, 41, 56, 78, 55, 74] }
  ];
  return <ReactApexChart options={options} series={series} type="area" height={300} />;
};

export const TeamCollaborationChart = () => {
  const orangeData = [];
  const blueData = [];
  [68, 45, 95, 88, 52].forEach((val, i) => {
    for (let y = 4; y <= val; y += 7) {
      orangeData.push([i + 1 - 0.1, y]);
    }
  });
  [38, 24, 68, 24, 31].forEach((val, i) => {
    for (let y = 4; y <= val; y += 7) {
      blueData.push([i + 1 + 0.1, y]);
    }
  });

  const options = {
    chart: { type: 'scatter', height: 260, toolbar: { show: false }, zoom: { enabled: false } },
    colors: ['#F97316', '#0F5B78'],
    markers: { size: 7, strokeWidth: 0, hover: { size: 10 } },
    dataLabels: { enabled: false },
    legend: { show: false },
    xaxis: { type: 'numeric', min: 0, max: 6, tickAmount: 6, axisBorder: { show: false }, axisTicks: { show: false }, labels: { formatter: function(val) { var categories = ['Dev', 'Operations', 'Sales', 'Marketing', 'Support']; return categories[Math.round(val) - 1] || ''; }, style: { colors: '#6B7280', fontSize: '13px', fontWeight: 500 } } },
    yaxis: { min: 0, max: 100, tickAmount: 5, labels: { offsetX: -15, style: { colors: '#6B7280', fontSize: '13px', fontWeight: 500 } } },
    grid: { borderColor: '#E5E7EB', strokeDashArray: 5, xaxis: { lines: { show: false } }, padding: { left: 10, right: 10, top: -10, bottom: -0 } },
    tooltip: { enabled: false }
  };
  const series = [
    { name: 'Performance', data: orangeData },
    { name: 'Productivity', data: blueData }
  ];
  return <ReactApexChart options={options} series={series} type="scatter" height={260} />;
};

export const GoalCompletionChart = () => {
  const options = {
    chart: { height: 210, type: 'radialBar', parentHeightOffset: 0 },
    plotOptions: { radialBar: { startAngle: -135, endAngle: 225, hollow: { size: '28%' }, track: { background: '#eeeeee', strokeWidth: '100%', margin: 10 }, dataLabels: { name: { show: false }, value: { show: true, fontSize: '28px', fontWeight: 600, color: '#222', offsetY: 10, formatter: function () { return '80%'; } } } } },
    stroke: { lineCap: 'round' },
    colors: ['#ff6720', '#3c7280', '#f4c542'],
    labels: ['Completed', 'Pending', 'Closed']
  };
  const series = [80, 65, 50];
  return <ReactApexChart options={options} series={series} type="radialBar" height={210} />;
};

export const ProductivityQualityMetricsChart = () => {
  const options = {
    chart: { type: 'bubble', height: 315, toolbar: { show: false }, zoom: { enabled: false }, background: 'transparent' },
    dataLabels: { enabled: false },
    fill: { opacity: 0.9 },
    stroke: { width: 0 },
    colors: ['#66929F', '#F9A375'],
    grid: { borderColor: '#E2E8F0', strokeDashArray: 4, xaxis: { lines: { show: false } }, yaxis: { lines: { show: true } }, padding: { left: 0, right: 0, top: 10, bottom: 5 } },
    plotOptions: { bubble: { minBubbleRadius: 3, maxBubbleRadius: 22 } },
    xaxis: { min: 0.6, max: 5.4, tickAmount: 4, labels: { offsetY: 10, style: { colors: '#0F172A', fontSize: '15px', fontWeight: 500, fontFamily: 'Inter, sans-serif' }, formatter: function (value) { const weeks = { 1: 'Week 1', 2: 'Week 2', 3: 'Week 3', 4: 'Week 4', 5: 'Week 5' }; return weeks[Math.round(value)] || ''; } }, axisBorder: { show: false }, axisTicks: { show: false } },
    yaxis: { min: 0, max: 100, tickAmount: 4, labels: { offsetX: -15, style: { colors: '#0F172A', fontSize: '15px', fontWeight: 500 } } },
    legend: { show: false },
    tooltip: { theme: 'light' }
  };
  const series = [
    { name: "Tasks Completed", data: [[1, 38, 22], [1.3, 55, 18], [1.9, 46, 17], [2.1, 45, 25], [2.2, 41, 14], [2.7, 57, 18], [3.2, 62, 15], [3.2, 43, 14], [3.6, 82, 16], [3.8, 35, 18], [4.2, 50, 24], [4.4, 52, 16]] },
    { name: "Quality Score", data: [[1.0, 8, 20], [1.1, 50, 26], [1.5, 57, 30], [1.8, 33, 18], [2.1, 30, 32], [2.9, 57, 45], [3.0, 47, 25], [3.4, 36, 24], [4.0, 65, 22], [4.3, 66, 28], [4.8, 82, 24], [5.0, 44, 24]] }
  ];
  return <ReactApexChart options={options} series={series} type="bubble" height={315} />;
};

export const SkillAssesmentChart = () => {
  const options = {
    chart: { height: 300, type: 'radar', toolbar: { show: false } },
    colors: ['#ED6A2A'],
    stroke: { width: 2 },
    fill: { opacity: 0.05 },
    markers: { size: 4, colors: ['#ED6A2A'], strokeColors: '#fff', strokeWidth: 2, hover: { size: 6 } },
    xaxis: { categories: ['Technical', 'Communication', 'Leadership', 'Services', 'Challenges', 'Quality', 'Collaboration', ['Problem', 'Solving']], labels: { show: true, style: { colors: '#111827', fontSize: '13px', fontWeight: 500, fontFamily: 'Inter, sans-serif' } } },
    yaxis: [{ min: 0, max: 100, tickAmount: 4 }, { show: false }],
    grid: { show: false, padding: { top: -20, bottom: 0, left: 10, right: 0 } },
    plotOptions: { radar: { size: 130, polygons: { strokeColors: '#E2E8F0', connectorColors: '#E2E8F0', fill: { colors: ['transparent', 'transparent'] } } } },
    dataLabels: { enabled: false },
    legend: { show: false },
    tooltip: { enabled: true, theme: 'light' }
  };
  const series = [{ name: 'Performance', data: [70, 38, 68, 62, 58, 72, 42, 66] }];
  return <ReactApexChart options={options} series={series} type="radar" height={300} />;
};
