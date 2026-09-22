import React from 'react';
import ReactApexChart from 'react-apexcharts';

export const HiringTimelineChart = () => {
  const options = {
    chart: { type: "line", height: 330, toolbar: { show: false }, zoom: { enabled: false }, background: "transparent" },
    colors: ["#0B556B", "#FF5B14"],
    stroke: { width: 2.5, curve: "straight" },
    dataLabels: { enabled: false },
    grid: { borderColor: "#E5E7EB", strokeDashArray: 4, xaxis: { lines: { show: true } }, yaxis: { lines: { show: true } }, padding: { top: 0, right: 0, bottom: -10, left: 10 } },
    markers: {
      size: [7, 7], strokeWidth: 2, hover: { size: 8 },
      discrete: [
        { seriesIndex: 0, dataPointIndex: 0, fillColor: "#0B556B", strokeColor: "#0B556B", size: 8, shape: "square" },
        { seriesIndex: 0, dataPointIndex: 2, fillColor: "#0B556B", strokeColor: "#0B556B", size: 8, shape: "square" },
        { seriesIndex: 0, dataPointIndex: 4, fillColor: "#0B556B", strokeColor: "#0B556B", size: 8, shape: "square" },
        { seriesIndex: 0, dataPointIndex: 6, fillColor: "#0B556B", strokeColor: "#0B556B", size: 8, shape: "square" },
        { seriesIndex: 0, dataPointIndex: 7, fillColor: "#0B556B", strokeColor: "#0B556B", size: 8, shape: "square" },
        { seriesIndex: 0, dataPointIndex: 8, fillColor: "#0B556B", strokeColor: "#0B556B", size: 8, shape: "square" },
        { seriesIndex: 0, dataPointIndex: 9, fillColor: "#0B556B", strokeColor: "#0B556B", size: 8, shape: "square" },
        { seriesIndex: 0, dataPointIndex: 10, fillColor: "#0B556B", strokeColor: "#0B556B", size: 8, shape: "square" },
        { seriesIndex: 0, dataPointIndex: 11, fillColor: "#0B556B", strokeColor: "#0B556B", size: 8, shape: "square" },
        { seriesIndex: 1, dataPointIndex: 0, fillColor: "#fff", strokeColor: "#FF5B14", size: 8, shape: "circle" },
        { seriesIndex: 1, dataPointIndex: 1, fillColor: "#fff", strokeColor: "#FF5B14", size: 8, shape: "circle" },
        { seriesIndex: 1, dataPointIndex: 2, fillColor: "#fff", strokeColor: "#FF5B14", size: 8, shape: "circle" },
        { seriesIndex: 1, dataPointIndex: 3, fillColor: "#fff", strokeColor: "#FF5B14", size: 8, shape: "circle" },
        { seriesIndex: 1, dataPointIndex: 4, fillColor: "#fff", strokeColor: "#FF5B14", size: 8, shape: "circle" },
        { seriesIndex: 1, dataPointIndex: 5, fillColor: "#fff", strokeColor: "#FF5B14", size: 8, shape: "circle" },
        { seriesIndex: 1, dataPointIndex: 6, fillColor: "#fff", strokeColor: "#FF5B14", size: 8, shape: "circle" },
        { seriesIndex: 1, dataPointIndex: 7, fillColor: "#fff", strokeColor: "#FF5B14", size: 8, shape: "circle" },
        { seriesIndex: 1, dataPointIndex: 8, fillColor: "#fff", strokeColor: "#FF5B14", size: 8, shape: "circle" },
        { seriesIndex: 1, dataPointIndex: 9, fillColor: "#fff", strokeColor: "#FF5B14", size: 8, shape: "circle" },
        { seriesIndex: 1, dataPointIndex: 10, fillColor: "#fff", strokeColor: "#FF5B14", size: 8, shape: "circle" },
        { seriesIndex: 1, dataPointIndex: 11, fillColor: "#fff", strokeColor: "#FF5B14", size: 8, shape: "circle" }
      ]
    },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      axisBorder: { show: false }, axisTicks: { show: false },
      labels: { offsetY: 0, style: { colors: "#111827", fontSize: "14px", fontWeight: 500 } }, crosshairs: { show: false }
    },
    yaxis: { min: 0, max: 250, tickAmount: 5, labels: { offsetX: -10, style: { colors: "#111827", fontSize: "14px", fontWeight: 500 } } },
    fill: { opacity: 1 }, legend: { show: false }, tooltip: { theme: "light" }
  };
  const series = [
    { name: "Predicted Hire", data: [110, 95, 152, 62, 80, 42, 185, 118, 170, 232, 135, 165] },
    { name: "Actual Hire", data: [28, 18, 65, 102, 20, 55, 95, 68, 110, 180, 92, 122] }
  ];
  return <ReactApexChart options={options} series={series} type="line" height={330} />;
};

export const StatisticsChart = () => {
  const options = {
    chart: { type: 'area', height: 70, sparkline: { enabled: true }, toolbar: { show: false } },
    colors: ['#f26522'],
    stroke: { curve: 'smooth', width: 2, lineCap: 'round' },
    fill: { type: 'gradient', gradient: { shadeIntensity: 1, inverseColors: false, opacityFrom: 0.6, opacityTo: 0.1, stops: [0, 90, 100] } },
    grid: { show: false, padding: { left: 0, right: 0, top: 10, bottom: 0 } },
    dataLabels: { enabled: false },
    xaxis: { labels: { show: false }, axisBorder: { show: false }, axisTicks: { show: false } },
    yaxis: { show: false },
    tooltip: { enabled: false }
  };
  const series = [{ name: "Performance", data: [2, 18, 20, 22, 22, 38, 42, 42] }];
  return <ReactApexChart options={options} series={series} type="area" height={70} />;
};

export const StatisticsChartTwo = () => {
  const options = {
    chart: { type: 'area', height: 70, sparkline: { enabled: true }, toolbar: { show: false } },
    colors: ['#0C4B5E'],
    stroke: { curve: 'smooth', width: 2, lineCap: 'round' },
    fill: { type: 'gradient', gradient: { shadeIntensity: 1, inverseColors: false, opacityFrom: 0.6, opacityTo: 0.1, stops: [0, 90, 100] } },
    grid: { show: false, padding: { left: 0, right: 0, top: 10, bottom: 0 } },
    dataLabels: { enabled: false },
    xaxis: { labels: { show: false }, axisBorder: { show: false }, axisTicks: { show: false } },
    yaxis: { show: false },
    tooltip: { enabled: false }
  };
  const series = [{ name: "Performance", data: [4, 16, 18, 30, 32, 40, 38, 42] }];
  return <ReactApexChart options={options} series={series} type="area" height={70} />;
};

export const StatisticsChartThree = () => {
  const options = {
    chart: { type: 'area', height: 70, sparkline: { enabled: true }, toolbar: { show: false } },
    colors: ['#AB47BC'],
    stroke: { curve: 'smooth', width: 2, lineCap: 'round' },
    fill: { type: 'gradient', gradient: { shadeIntensity: 1, inverseColors: false, opacityFrom: 0.6, opacityTo: 0.1, stops: [0, 90, 100] } },
    grid: { show: false, padding: { left: 0, right: 0, top: 10, bottom: 0 } },
    dataLabels: { enabled: false },
    xaxis: { labels: { show: false }, axisBorder: { show: false }, axisTicks: { show: false } },
    yaxis: { show: false },
    tooltip: { enabled: false }
  };
  const series = [{ name: "Performance", data: [4, 20, 30, 35, 20, 25, 38, 42] }];
  return <ReactApexChart options={options} series={series} type="area" height={70} />;
};

export const StatisticsChartFour = () => {
  const options = {
    chart: { type: 'area', height: 70, sparkline: { enabled: true }, toolbar: { show: false } },
    colors: ['#1b84ff'],
    stroke: { curve: 'smooth', width: 2, lineCap: 'round' },
    fill: { type: 'gradient', gradient: { shadeIntensity: 1, inverseColors: false, opacityFrom: 0.6, opacityTo: 0.1, stops: [0, 90, 100] } },
    grid: { show: false, padding: { left: 0, right: 0, top: 10, bottom: 0 } },
    dataLabels: { enabled: false },
    xaxis: { labels: { show: false }, axisBorder: { show: false }, axisTicks: { show: false } },
    yaxis: { show: false },
    tooltip: { enabled: false }
  };
  const series = [{ name: "Performance", data: [8, 22, 34, 33, 25, 32, 38, 50] }];
  return <ReactApexChart options={options} series={series} type="area" height={70} />;
};

export const PipelineOverviewChart = () => {
  const options = {
    chart: { type: 'bar', height: 240, toolbar: { show: false } },
    plotOptions: {
      bar: {
        horizontal: true, distributed: true, isFunnel: true, isFunnel3d: false, barHeight: '75%', borderRadius: 0,
        dropShadow: { enabled: true, top: 6, left: 0, blur: 3, color: '#000000', opacity: 0.3 }
      }
    },
    colors: ['#F26522', '#0C4B5E', '#FFC107', '#03C95A'],
    dataLabels: { enabled: true, dropShadow: { enabled: false }, formatter: function (val, opt) { return opt.w.globals.labels[opt.dataPointIndex]; }, style: { colors: ['#ffffff'], fontSize: '14px', fontWeight: '600', fontFamily: 'Archivo, sans-serif' } },
    xaxis: { categories: ['Applied : 165', 'Screening : 96', 'Interview : 82', 'Accepted : 26'], labels: { show: false }, axisBorder: { show: false }, axisTicks: { show: false } },
    yaxis: { labels: { show: false } },
    grid: { show: false, padding: { top: -20, bottom: 0, left: 0, right: 0 } },
    tooltip: { enabled: true, theme: 'dark' }, legend: { show: false },
    states: { hover: { filter: { type: 'darken', value: 0.9 } }, active: { filter: { type: 'none' } } }
  };
  const series = [{ name: 'Candidates', data: [165, 130, 110, 80] }];
  return <ReactApexChart options={options} series={series} type="bar" height={240} />;
};

export const BudgetAllocationChart = () => {
  const options = {
    chart: { height: 255, width: '100%', type: 'bar', stacked: true, parentHeightOffset: 0, toolbar: { show: false } },
    colors: ['#FF6F28', '#FEF1EB'],
    responsive: [
      { breakpoint: 1399, options: { chart: { height: 360 } } },
      { breakpoint: 576, options: { chart: { height: 200 }, legend: { position: 'bottom', offsetX: -10, offsetY: 0 } } }
    ],
    plotOptions: { bar: { horizontal: false, columnWidth: '65%', borderRadius: 5, borderRadiusApplication: 'end' } },
    xaxis: { categories: ['Dev', 'Sales', 'Marketing', 'Support'], axisBorder: { show: false }, axisTicks: { show: false }, labels: { offsetY: 0, style: { colors: '#6B7280', fontSize: '13px' } } },
    yaxis: { max: 100, tickAmount: 5, labels: { offsetX: -20, style: { colors: '#6B7280', fontSize: '13px' } } },
    grid: { show: true, borderColor: '#E5E7EB', strokeDashArray: 3, padding: { top: 0, bottom: -5, left: -10, right: -25 }, xaxis: { lines: { show: true } }, yaxis: { lines: { show: false } } },
    legend: { show: false }, dataLabels: { enabled: false }, fill: { opacity: 1 }
  };
  const series = [
    { name: 'Used', data: [80, 43, 60, 43] },
    { name: 'Available', data: [20, 57, 40, 57] }
  ];
  return <ReactApexChart options={options} series={series} type="bar" height={255} />;
};

export const RoleDemandChart = () => {
  const options = {
    chart: { type: 'radialBar', height: 400, width: '100%' },
    colors: ['#03C95A', '#AB47BC', '#FFC107', '#1B84FF', '#FF6F28'],
    plotOptions: { radialBar: { startAngle: -90, endAngle: 90, hollow: { size: '10%', background: 'transparent' }, track: { background: '#E5E5E5', strokeWidth: '100%', margin: 10 }, dataLabels: { show: false } } },
    grid: { show: false, padding: { top: -30, bottom: -10, left: -30, right: -30 } },
    stroke: { lineCap: 'butt' }, labels: ['Green', 'Purple', 'Yellow', 'Blue', 'Red']
  };
  const series = [85, 70, 60, 55, 50];
  return <ReactApexChart options={options} series={series} type="radialBar" height={400} />;
};
