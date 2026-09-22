import React from 'react';
import ReactApexChart from 'react-apexcharts';

export const AttendanceTrendChart = () => {
  const options = {
    chart: { type: 'bar', toolbar: { show: false } },
    plotOptions: { bar: { columnWidth: '55%', borderRadius: 6, borderRadiusApplication: 'around', distributed: true, colors: { backgroundBarColors: ['#F8F9FA'], backgroundBarOpacity: 1, backgroundBarRadius: 6 } } },
    colors: ['#F4CACB', '#F4CACB', '#F4CACB', '#F4CACB', '#F4CACB', '#E70D0D', '#F4CACB', '#F4CACB', '#F4CACB', '#F4CACB', '#F4CACB', '#F4CACB'],
    fill: { type: 'gradient', gradient: { type: 'vertical', shadeIntensity: 1, opacityFrom: 1, opacityTo: 1, colorStops: [[{ offset: 0, color: "#F4CACB", opacity: 1 }, { offset: 100, color: "#FDE0D3", opacity: 1 }], [{ offset: 0, color: "#F4CACB", opacity: 1 }, { offset: 100, color: "#FDE0D3", opacity: 1 }], [{ offset: 0, color: "#F4CACB", opacity: 1 }, { offset: 100, color: "#FDE0D3", opacity: 1 }], [{ offset: 0, color: "#F4CACB", opacity: 1 }, { offset: 100, color: "#FDE0D3", opacity: 1 }], [{ offset: 0, color: "#F4CACB", opacity: 1 }, { offset: 100, color: "#FDE0D3", opacity: 1 }], [{ offset: 0, color: "#E70D0D", opacity: 1 }, { offset: 100, color: "#F26522", opacity: 1 }], [{ offset: 0, color: "#F4CACB", opacity: 1 }, { offset: 100, color: "#FDE0D3", opacity: 1 }], [{ offset: 0, color: "#F4CACB", opacity: 1 }, { offset: 100, color: "#FDE0D3", opacity: 1 }], [{ offset: 0, color: "#F4CACB", opacity: 1 }, { offset: 100, color: "#FDE0D3", opacity: 1 }], [{ offset: 0, color: "#F4CACB", opacity: 1 }, { offset: 100, color: "#FDE0D3", opacity: 1 }], [{ offset: 0, color: "#F4CACB", opacity: 1 }, { offset: 100, color: "#FDE0D3", opacity: 1 }], [{ offset: 0, color: "#F4CACB", opacity: 1 }, { offset: 100, color: "#FDE0D3", opacity: 1 }]] } },
    xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], axisBorder: { show: false }, axisTicks: { show: false }, labels: { show: true, offsetY: -20, style: { colors: ['#374151', '#374151', '#374151', '#374151', '#374151', '#FFFFFF', '#374151', '#374151', '#374151', '#374151', '#374151', '#374151'], fontSize: '13px', fontWeight: 500 } } },
    dataLabels: { enabled: true, formatter: function (val, opt) { return opt.dataPointIndex === 5 ? val + "%" : ""; }, offsetY: -22, style: { fontSize: '12px', fontWeight: 500, colors: ["#fff"] }, background: { enabled: true, foreColor: '#fff', padding: 5, borderRadius: 8, backgroundColor: '#1F2937', borderWidth: 0 } },
    legend: { show: false },
    yaxis: { max: 100, tickAmount: 5, labels: { formatter: (val) => val + "%", style: { fontSize: '13px', fontWeight: 500, colors: '#6B7280' }, padding: { right: 0, left: 0 } } },
    grid: { strokeDashArray: 4, yaxis: { lines: { show: true } }, padding: { top: 0, bottom: -30, right: -5 } }
  };
  const series = [{ name: 'Attendance', data: [40, 22, 53, 25, 56, 90, 43, 25, 68, 80, 35, 20] }];
  return <ReactApexChart options={options} series={series} type="bar" height={375} />;
};

export const ViolationChart = () => {
  const options = {
    chart: { type: 'bar', toolbar: { show: false }, sparkline: { enabled: true } },
    colors: ['#FF5504', '#47BCB2', '#EFCE6B'],
    fill: { type: 'gradient', gradient: { shade: 'light', type: "vertical", shadeIntensity: 0.5, inverseColors: false, opacityFrom: 1, opacityTo: 1, stops: [0, 100], colorStops: [[{ offset: 0, color: '#F37438', opacity: 1 }, { offset: 100, color: '#FF5504', opacity: 1 }], [{ offset: 0, color: '#0C4B5E', opacity: 1 }, { offset: 100, color: '#47BCB2', opacity: 1 }], [{ offset: 0, color: '#2DA17C', opacity: 1 }, { offset: 100, color: '#EFCE6B', opacity: 1 }]] } },
    plotOptions: { bar: { columnWidth: '80%', distributed: true, borderRadius: 5, borderRadiusApplication: 'around', borderRadiusWhenStacked: 'all', dataLabels: { position: 'top' } } },
    dataLabels: { enabled: true, formatter: function (val) { return val + "%"; }, offsetY: -20, style: { fontSize: '12px', colors: ['#333'], fontWeight: 'bold' } },
    xaxis: { categories: ['Sales', 'Front End', 'React', 'UI'], labels: { show: false }, axisBorder: { show: false }, axisTicks: { show: false } },
    yaxis: { min: 0, max: 110, labels: { show: false } },
    grid: { padding: { top: 0, right: -30, bottom: 0, left: 0 } },
    legend: { show: false }
  };
  const series = [{ name: 'Company', data: [90, 50, 75] }];
  return <ReactApexChart options={options} series={series} type="bar" height={120} width={150} />;
};

export const OfficeChart = () => {
  const options = {
    colors: ['#0C4B5E', '#F26522'],
    chart: { type: 'scatter', toolbar: { show: false }, zoom: { enabled: false } },
    grid: { borderColor: '#E2E8F0', strokeDashArray: 4, xaxis: { lines: { show: false } }, yaxis: { lines: { show: true } }, padding: { top: 0, right: 10, bottom: -10, left: -10 } },
    markers: { size: 6, strokeWidth: 0, hover: { size: 8 } },
    xaxis: { min: 0.5, max: 7.5, tickAmount: 7, labels: { style: { colors: '#64748B', fontSize: '12px' }, formatter: function(val) { const days = ["", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]; return days[Math.round(val)] || ""; } }, axisBorder: { show: false }, axisTicks: { show: false } },
    yaxis: { min: 0, max: 400, tickAmount: 4, labels: { offsetX: -15, style: { colors: '#64748B', fontSize: '12px' }, formatter: (val) => val.toFixed(0) }, axisBorder: { show: false } },
    legend: { show: false }
  };
  const series = [{ name: "Series A (Teal)", data: [[1, 220], [1.2, 230], [1.5, 280], [1.8, 240], [2, 270], [2.2, 340], [2.5, 270], [3, 250], [3.5, 300], [4, 250], [4.2, 310], [4.5, 320], [5, 280], [5.5, 320], [5.8, 300], [6, 310], [6.2, 360], [6.5, 320], [7, 300]] }, { name: "Series B (Orange)", data: [[1, 100], [1.2, 20], [1.4, 40], [1.6, 80], [2, 30], [2.2, 100], [2.5, 40], [2.8, 80], [3, 110], [3.2, 160], [3.5, 170], [4, 150], [4.2, 230], [4.5, 260], [4.8, 240], [5, 290], [5.2, 240], [5.5, 270], [5.8, 250], [6, 300], [6.5, 260], [7, 300], [7.5, 330]] }];
  return <ReactApexChart options={options} series={series} type="scatter" height={200} />;
};

export const ArrivalChart1 = () => {
  const options = {
    chart: { type: 'bar', stacked: true, toolbar: { show: false }, sparkline: { enabled: true } },
    plotOptions: { bar: { columnWidth: '35%', borderRadius: 2, distributed: true } },
    colors: ['#F26522', '#F26522', '#F26522', '#F26522', '#F26522', '#F26522', '#F1F1F1', '#F1F1F1'],
    grid: { show: false, padding: { left: 0, right: 0 } },
    xaxis: { labels: { show: false }, axisBorder: { show: false }, axisTicks: { show: false } },
    yaxis: { min: -40, max: 40, show: false, axisBorder: { show: false } },
    legend: { show: false },
    tooltip: { enabled: true }
  };
  const series = [{ name: 'Positive', data: [30, 30, 30, 30, 30, 30, 30, 30] }, { name: 'Negative', data: [-30, -30, -30, -30, -30, -30, -30, -30] }];
  return <ReactApexChart options={options} series={series} type="bar" height={35} width={70} />;
};

export const ArrivalChart2 = () => {
  const options = {
    chart: { type: 'bar', stacked: true, toolbar: { show: false }, sparkline: { enabled: true } },
    plotOptions: { bar: { columnWidth: '35%', borderRadius: 2, distributed: true } },
    colors: ['#F26522', '#F26522', '#F26522', '#F26522', '#F26522', '#F1F1F1', '#F1F1F1', '#F1F1F1'],
    grid: { show: false, padding: { left: 0, right: 0 } },
    xaxis: { labels: { show: false }, axisBorder: { show: false }, axisTicks: { show: false } },
    yaxis: { min: -40, max: 40, show: false, axisBorder: { show: false } },
    legend: { show: false },
    tooltip: { enabled: true }
  };
  const series = [{ name: 'Positive', data: [30, 30, 30, 30, 30, 30, 30, 30] }, { name: 'Negative', data: [-30, -30, -30, -30, -30, -30, -30, -30] }];
  return <ReactApexChart options={options} series={series} type="bar" height={35} width={70} />;
};

export const ArrivalChart3 = () => {
  const options = {
    chart: { type: 'bar', stacked: true, toolbar: { show: false }, sparkline: { enabled: true } },
    plotOptions: { bar: { columnWidth: '35%', borderRadius: 2, distributed: true } },
    colors: ['#F26522', '#F26522', '#F26522', '#F26522', '#F1F1F1', '#F1F1F1', '#F1F1F1', '#F1F1F1'],
    grid: { show: false, padding: { left: 0, right: 0 } },
    xaxis: { labels: { show: false }, axisBorder: { show: false }, axisTicks: { show: false } },
    yaxis: { min: -40, max: 40, show: false, axisBorder: { show: false } },
    legend: { show: false },
    tooltip: { enabled: true }
  };
  const series = [{ name: 'Positive', data: [30, 30, 30, 30, 30, 30, 30, 30] }, { name: 'Negative', data: [-30, -30, -30, -30, -30, -30, -30, -30] }];
  return <ReactApexChart options={options} series={series} type="bar" height={35} width={70} />;
};

export const ArrivalChart4 = () => {
  const options = {
    chart: { type: 'bar', stacked: true, toolbar: { show: false }, sparkline: { enabled: true } },
    plotOptions: { bar: { columnWidth: '35%', borderRadius: 2, distributed: true } },
    colors: ['#F26522', '#F26522', '#F1F1F1', '#F1F1F1', '#F1F1F1', '#F1F1F1', '#F1F1F1', '#F1F1F1'],
    grid: { show: false, padding: { left: 0, right: 0 } },
    xaxis: { labels: { show: false }, axisBorder: { show: false }, axisTicks: { show: false } },
    yaxis: { min: -40, max: 40, show: false, axisBorder: { show: false } },
    legend: { show: false },
    tooltip: { enabled: true }
  };
  const series = [{ name: 'Positive', data: [30, 30, 30, 30, 30, 30, 30, 30] }, { name: 'Negative', data: [-30, -30, -30, -30, -30, -30, -30, -30] }];
  return <ReactApexChart options={options} series={series} type="bar" height={35} width={70} />;
};
