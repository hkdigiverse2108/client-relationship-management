import React from 'react';
import ReactApexChart from 'react-apexcharts';

export const InsurenceChart = () => {
  const options = {
    chart: { type: 'bar', stacked: true, toolbar: { show: false }, sparkline: { enabled: true }, width: 100 },
    plotOptions: { bar: { columnWidth: '45%', borderRadius: 2, colors: { backgroundBarColors: ['#F8F9FA', '#F8F9FA', '#F8F9FA', '#F8F9FA', '#F8F9FA'], backgroundBarOpacity: 1, backgroundBarRadius: 5 } } },
    colors: ['#F26522'],
    grid: { show: false },
    xaxis: { labels: { show: false } },
    yaxis: { min: -50, max: 50, show: false },
    tooltip: { enabled: true }
  };
  const series = [{ name: 'Positive', data: [15, 40, 30, 35, 40, 35, 32] }, { name: 'Negative', data: [-15, -40, -30, -35, -40, -35, -32] }];
  return <ReactApexChart options={options} series={series} type="bar" height={45} width={100} />;
};

export const ContributionChart = () => {
  const options = {
    chart: { type: 'bar', stacked: true, toolbar: { show: false }, sparkline: { enabled: true }, width: 100 },
    plotOptions: { bar: { columnWidth: '45%', borderRadius: 2, colors: { backgroundBarColors: ['#F8F9FA', '#F8F9FA', '#F8F9FA', '#F8F9FA', '#F8F9FA'], backgroundBarOpacity: 1, backgroundBarRadius: 5 } } },
    colors: ['#0C4B5E'],
    grid: { show: false, padding: { left: 0, right: 0 } },
    xaxis: { labels: { show: false }, axisBorder: { show: false }, axisTicks: { show: false } },
    yaxis: { min: -50, max: 50, show: false, axisBorder: { show: false } },
    tooltip: { enabled: true }
  };
  const series = [{ name: 'Positive', data: [10, 30, 20, 25, 30, 25, 22] }, { name: 'Negative', data: [-10, -30, -20, -25, -30, -25, -22] }];
  return <ReactApexChart options={options} series={series} type="bar" height={45} width={100} />;
};

export const HealthChart = () => {
  const options = {
    chart: { type: 'bar', stacked: true, toolbar: { show: false }, sparkline: { enabled: true }, width: 100 },
    plotOptions: { bar: { columnWidth: '45%', borderRadius: 2, colors: { backgroundBarColors: ['#F8F9FA', '#F8F9FA', '#F8F9FA', '#F8F9FA', '#F8F9FA'], backgroundBarOpacity: 1, backgroundBarRadius: 5 } } },
    colors: ['#FFC107'],
    grid: { show: false, padding: { left: 0, right: 0 } },
    xaxis: { labels: { show: false }, axisBorder: { show: false }, axisTicks: { show: false } },
    yaxis: { min: -50, max: 50, show: false, axisBorder: { show: false } },
    tooltip: { enabled: true }
  };
  const series = [{ name: 'Positive', data: [20, 40, 30, 35, 40, 35, 32] }, { name: 'Negative', data: [-20, -40, -30, -35, -40, -35, -32] }];
  return <ReactApexChart options={options} series={series} type="bar" height={45} width={100} />;
};

export const DistributionChart = () => {
  const options = {
    chart: { type: 'bar', toolbar: { show: false } },
    plotOptions: { bar: { columnWidth: '15px', borderRadius: 6, distributed: true } },
    colors: ['#E5E7EB', '#f26522', '#E5E7EB', '#E5E7EB', '#E5E7EB', '#E5E7EB', '#E5E7EB', '#E5E7EB', '#E5E7EB', '#E5E7EB', '#E5E7EB'],
    dataLabels: { enabled: false },
    grid: { show: true, borderColor: '#F3F4F6', strokeDashArray: 3, xaxis: { lines: { show: false } }, yaxis: { lines: { show: true } }, padding: { left: 10 } },
    xaxis: { labels: { show: false }, axisBorder: { show: false }, axisTicks: { show: false }, tooltip: { enabled: false } },
    yaxis: { min: 0, max: 100, tickAmount: 4, labels: { show: true, align: 'left', style: { colors: '#6B7280', fontSize: '13px' }, offsetX: 6, formatter: function (val) { if (val === 25) return "$30k-50k"; if (val === 50) return "$50k-80k"; if (val === 75) return "$80k-120k"; if (val === 100) return "$120k-180k"; return ""; } }, axisBorder: { show: false } },
    legend: { show: false },
    annotations: { points: [{ x: 2, y: 0, marker: { size: 5, fillColor: '#E5E7EB', strokeColor: '#fff', strokeWidth: 2 } }] },
    tooltip: { enabled: true }
  };
  const series = [{ name: 'Income Range', data: [40, 96, 50, 40, 65, 45, 75, 70, 60, 45, 80] }];
  return <ReactApexChart options={options} series={series} type="bar" height={240} />;
};

export const ChartTrend = () => {
  const options = {
    chart: { type: 'line', toolbar: { show: false } },
    stroke: { curve: 'stepline', width: 2.5 },
    markers: { size: 5, strokeWidth: 0, hover: { sizeOffset: 2 } },
    xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May'], labels: { show: true, style: { colors: '#6B7280', fontSize: '13px', fontWeight: '500' } }, axisBorder: { show: false }, axisTicks: { show: false } },
    yaxis: { min: 0, max: 350, tickAmount: 4, labels: { align: 'left', offsetX: -15, style: { colors: '#6B7280', fontSize: '13px', fontWeight: '500' }, formatter: function (val) { return "$" + val + "k"; } } },
    grid: { borderColor: '#f1f1f1', xaxis: { lines: { show: true } }, yaxis: { lines: { show: true } }, padding: { right: -7 } },
    title: { text: undefined },
    dataLabels: { enabled: false },
    legend: { show: false }
  };
  const series = [{ name: "Line 1", data: [300, 300, 225, 225, 225], color: '#12434e' }, { name: "Line 2", data: [150, 150, 5, 75, 150], color: '#f46a25' }];
  return <ReactApexChart options={options} series={series} type="line" height={305} />;
};
