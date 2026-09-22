import React from 'react';
import ReactApexChart from 'react-apexcharts';

const createSparklineOptions = (color) => ({
  chart: {
    type: 'bar',
    sparkline: { enabled: true },
  },
  plotOptions: {
    bar: {
      columnWidth: '60%',
      borderRadius: 0,
    }
  },
  colors: [color],
  tooltip: {
    fixed: { enabled: false },
    x: { show: false },
    y: {
      title: { formatter: function (seriesName) { return '' } }
    },
    marker: { show: false }
  }
});

export const CompanyBar1 = () => (
  <ReactApexChart options={createSparklineOptions('#FF6F28')} series={[{ data: [5, 10, 7, 5, 10, 7, 5] }]} type="bar" height={40} width={52} />
);

export const CompanyBar2 = () => (
  <ReactApexChart options={createSparklineOptions('#4B3088')} series={[{ data: [5, 3, 7, 6, 3, 10, 5] }]} type="bar" height={40} width={52} />
);

export const CompanyBar3 = () => (
  <ReactApexChart options={createSparklineOptions('#177DBC')} series={[{ data: [8, 10, 10, 8, 8, 10, 8] }]} type="bar" height={40} width={52} />
);

export const CompanyBar4 = () => (
  <ReactApexChart options={createSparklineOptions('#2DCB73')} series={[{ data: [5, 10, 7, 5, 10, 7, 5] }]} type="bar" height={40} width={52} />
);

export const CompaniesChart = () => {
  const options = {
    chart: {
      height: 290,
      type: 'bar',
      toolbar: { show: false }
    },
    colors: ['#212529'],
    plotOptions: {
      bar: {
        borderRadius: 10,
        borderRadiusWhenStacked: 'all',
        horizontal: false,
        endingShape: 'rounded',
        colors: {
          backgroundBarColors: ['#f3f4f5'],
          backgroundBarOpacity: 0.5,
          hover: { enabled: true, borderColor: '#F26522' }
        }
      },
    },
    xaxis: {
      categories: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
      labels: { style: { colors: '#6B7280', fontSize: '13px' } }
    },
    yaxis: {
      labels: { offsetX: -15, show: false }
    },
    grid: {
      borderColor: '#E5E7EB',
      strokeDashArray: 5,
      padding: { left: -8 },
    },
    legend: { show: false },
    dataLabels: { enabled: false },
    fill: { opacity: 1 },
  };

  const series = [{ name: 'Company', data: [40, 60, 20, 80, 60, 60, 60] }];

  return <ReactApexChart options={options} series={series} type="bar" height={290} />;
};

export const RevenueChart = () => {
  const options = {
    chart: {
      height: 280,
      type: 'bar',
      stacked: true,
      toolbar: { show: false }
    },
    colors: ['#f26522', '#0c4b5e', '#1b84ff', '#F8F9FA'],
    plotOptions: {
      bar: {
        borderRadius: 5,
        borderRadiusWhenStacked: 'last',
        horizontal: false,
      },
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      labels: { style: { colors: '#6B7280', fontSize: '13px' } }
    },
    yaxis: {
      min: 0,
      max: 100,
      labels: {
        offsetX: -15,
        style: { colors: '#6B7280', fontSize: '13px' },
        formatter: function (value) { return value + "K"; }
      }
    },
    grid: {
      borderColor: 'transparent',
      padding: { left: -8 }
    },
    legend: { show: false },
    dataLabels: { enabled: false },
    tooltip: {
      shared: true,
      intersect: false,
      y: { formatter: function (val) { return val + " k"; } }
    },
    fill: { opacity: 1 },
  };

  const series = [
    { name: 'Income Base (25%)', data: [25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 20, 25] },
    { name: 'Income Mid (30%)', data: [30, 5, 20, 30, 30, 30, 30, 30, 30, 30, 0, 30] },
    { name: 'Income Top (5%)', data: [5, 0, 0, 25, 30, 35, 25, 25, 25, 30, 0, 25] },
    { name: 'Remaining/Expenses', data: [40, 70, 55, 20, 15, 10, 20, 20, 20, 15, 80, 20] }
  ];

  return <ReactApexChart options={options} series={series} type="bar" height={280} />;
};

export const PlanOverviewChart = () => {
  const options = {
    chart: {
      height: 240,
      type: 'donut',
      toolbar: { show: false }
    },
    colors: ['#FFC107', '#1B84FF', '#F26522'],
    labels: ['Enterprise', 'Premium', 'Basic'],
    plotOptions: {
      pie: {
        donut: {
          size: '70%',
          labels: { show: false },
          borderRadius: 30
        }
      }
    },
    stroke: {
      lineCap: 'round',
      show: true,
      width: 0,
      colors: '#fff'
    },
    dataLabels: { enabled: false },
    legend: { show: false },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: { height: 180 },
        legend: { position: 'bottom' }
      }
    }]
  };

  const series = [20, 60, 20];

  return <ReactApexChart options={options} series={series} type="donut" height={240} />;
};
