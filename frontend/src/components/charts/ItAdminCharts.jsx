import React from 'react';
import ReactApexChart from 'react-apexcharts';

export const JobsChart = () => {
  const options = {
    chart: {
      width: 80,
      height: 50,
      type: 'bar',
      toolbar: { show: false },
      sparkline: { enabled: true },
    },
    plotOptions: {
      bar: {
        columnWidth: '60%',
        borderRadius: 2,
        distributed: true,
      },
    },
    grid: {
      show: false,
      padding: {
        left: 2,
        right: 2,
        bottom: 2
      }
    },
    colors: [
      '#E9ECEF', '#E9ECEF', '#E9ECEF', '#E9ECEF', '#E9ECEF',
      '#F26522',
      '#E9ECEF', '#E9ECEF', '#E9ECEF', '#E9ECEF', '#E9ECEF'
    ],
    xaxis: { labels: { show: false }, axisBorder: { show: false } },
    yaxis: { show: false },
    tooltip: { enabled: true },
    legend: { show: false }
  };
  const series = [{
    name: 'Jobs',
    data: [45, 30, 70, 15, 45, 100, 45, 35, 25, 15, 25]
  }];
  return <ReactApexChart options={options} series={series} type="bar" height={50} width={80} />;
};

export const StoragesChart = () => {
  const options = {
    colors: ['#0C4B5E', '#0C4B5E', '#F26522', '#0C4B5E', '#0C4B5E', '#0C4B5E'],
    chart: {
      height: 264,
      type: 'bar',
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        columnWidth: '65%',
        borderRadius: 10,
        distributed: true,
        colors: {
          backgroundBarColors: ['#E5E7EB'],
          backgroundBarOpacity: 0.4,
          backgroundBarRadius: 10,
        },
        dataLabels: {
          position: 'bottom',
        },
      },
    },
    dataLabels: {
      enabled: true,
      offsetY: 10,
      style: {
        fontSize: '14px',
        colors: ['#FFFFFF'],
        fontWeight: '500'
      },
      formatter: function (val) {
        return val + " GB";
      },
    },
    xaxis: {
      categories: ['HR', 'Payroll', 'Attendance', 'Recruitment', 'Leaves', 'Document'],
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: {
        offsetY: 5,
        style: {
          colors: '#6B7280',
          fontSize: '13px',
          fontWeight: 500,
        }
      }
    },
    yaxis: {
      min: 0,
      max: 320,
      tickAmount: 4,
      labels: {
        offsetX: -15,
        style: {
          fontSize: '13px',
          fontWeight: 500,
          colors: '#6B7280',
        }
      }
    },
    grid: {
      show: true,
      borderColor: '#F3F4F6',
      strokeDashArray: 3,
      position: 'back',
      padding: {
        bottom: 0,
        left: -10,
        right: -55
      },
      xaxis: { lines: { show: false } },
      yaxis: { lines: { show: true } },
    },
    legend: { show: false },
    tooltip: { enabled: true }
  };
  const series = [{
    name: 'Storage',
    data: [280, 260, 140, 68, 120, 260]
  }];
  return <ReactApexChart options={options} series={series} type="bar" height={264} />;
};

export const MfaChart = () => {
  const totalBlocks = 15;
  const filledBlocks = 11;
  const options = {
    chart: {
      type: 'bar',
      height: 16,
      width: '100%',
      toolbar: { show: false },
      sparkline: { enabled: true },
    },
    plotOptions: {
      bar: {
        distributed: true,
        columnWidth: '85%',
        borderRadius: 8,
        borderRadiusApplication: 'around',
      }
    },
    colors: [
      ({ dataPointIndex }) =>
        dataPointIndex < filledBlocks
          ? '#F26522'
          : '#E5E7EB'
    ],
    dataLabels: { enabled: false },
    grid: { show: false },
    xaxis: {
      labels: { show: false },
      axisBorder: { show: false },
      axisTicks: { show: false }
    },
    yaxis: { show: false, max: 1 },
    tooltip: { enabled: false },
    states: {
      hover: { filter: { type: 'none' } },
      active: { filter: { type: 'none' } }
    }
  };
  const series = [{
    data: Array(totalBlocks).fill(1)
  }];
  return <ReactApexChart options={options} series={series} type="bar" height={16} width="100%" />;
};

export const UptimeChart = () => {
  const options = {
    chart: {
      height: 50,
      width: 80,
      type: 'area',
      toolbar: { show: false },
      zoom: { enabled: false },
      sparkline: { enabled: true }
    },
    colors: ['#FF8C42'],
    dataLabels: { enabled: false },
    stroke: { show: true, curve: 'smooth', width: 2 },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.6,
        opacityTo: 0.1,
        stops: [0, 90, 100]
      }
    },
    xaxis: { labels: { show: false }, axisBorder: { show: false }, axisTicks: { show: false } },
    yaxis: { show: false },
    grid: { show: false },
    tooltip: { enabled: false }
  };
  const series = [{ name: "performance", data: [6, 20, 75, 40, 100, 92, 43, 76, 5] }];
  return <ReactApexChart options={options} series={series} type="area" height={50} width={80} />;
};

export const ApiChart = () => {
  const options = {
    chart: {
      width: 80,
      height: 60,
      type: 'bar',
      stacked: true,
      toolbar: { show: false },
      sparkline: { enabled: true },
    },
    plotOptions: {
      bar: {
        columnWidth: '45%',
        borderRadius: 2,
        colors: {
          backgroundBarColors: ['#F8F9FA', '#F8F9FA', '#F8F9FA', '#F8F9FA', '#F8F9FA'],
          backgroundBarOpacity: 1,
          backgroundBarRadius: 2,
        },
      },
    },
    colors: ['#F26522'],
    grid: { show: false },
    xaxis: { labels: { show: false } },
    yaxis: { min: -50, max: 50, show: false },
    tooltip: { enabled: true }
  };
  const series = [
    { name: 'Positive', data: [15, 40, 30, 35, 40, 35, 32] },
    { name: 'Negative', data: [-15, -40, -30, -35, -40, -35, -32] }
  ];
  return <ReactApexChart options={options} series={series} type="bar" height={60} width={80} />;
};

export const TicketsChart = () => {
  const options = {
    chart: {
      width: 80,
      height: 50,
      type: 'bar',
      stacked: true,
      toolbar: { show: false },
      sparkline: { enabled: true },
    },
    plotOptions: {
      bar: {
        columnWidth: '45%',
        borderRadius: 2,
        colors: {
          backgroundBarColors: ['#F8F9FA', '#F8F9FA', '#F8F9FA', '#F8F9FA', '#F8F9FA'],
          backgroundBarOpacity: 1,
          backgroundBarRadius: 2,
        },
      },
    },
    colors: ['#F26522'],
    grid: { show: false },
    xaxis: { labels: { show: false } },
    yaxis: { min: -50, max: 50, show: false },
    tooltip: { enabled: true }
  };
  const series = [
    { name: 'Positive', data: [60, 0, 60, 0, 60, 0, 60] },
    { name: 'Negative', data: [-60, -0, -60, -0, -60, -0, -60] }
  ];
  return <ReactApexChart options={options} series={series} type="bar" height={50} width={80} />;
};

export const LoginCountChart = () => {
  const options = {
    chart: {
      width: '100%',
      height: 310,
      type: 'area',
      toolbar: { show: false },
      sparkline: { enabled: false },
      zoom: { enabled: false }
    },
    colors: ['#F26522'],
    stroke: {
      show: true,
      curve: 'straight',
      width: 1.5
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.4,
        opacityTo: 0.05,
        stops: [0, 90, 100]
      }
    },
    xaxis: {
      labels: {
        show: true,
        offsetX: 8,
        rotate: 0,
        style: {
          colors: '#6B7280',
          fontSize: '10px'
        },
        formatter: function (value, index) {
          const labels = [
            '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
            '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM',
            '05:00 PM', '06:00 PM', '07:00 PM', '08:00 PM',
          ];
          const step = Math.floor(50 / labels.length);
          return index % step === 0 ? labels[Math.floor(index / step)] : '';
        }
      },
      axisBorder: { show: false },
      axisTicks: { show: false },
      tooltip: { enabled: false }
    },
    yaxis: {
      min: 0,
      max: 800,
      tickAmount: 4,
      labels: {
        show: true,
        align: 'left',
        minWidth: 40,
        style: {
          colors: '#6B7280',
          fontSize: '10px'
        },
        formatter: (val) => {
          return val;
        },
        offsetX: -28
      }
    },
    grid: {
      show: false,
      padding: {
        left: 10,
        right: 2,
        bottom: 10
      }
    },
    dataLabels: { enabled: false },
    tooltip: {
      enabled: true,
      theme: 'light'
    }
  };
  const series = [{
    name: "performance",
    data: [650, 580, 700, 580, 680, 750, 620, 710, 580, 650, 750, 780, 620, 750, 650, 610, 780, 650, 750, 620, 720, 600, 780, 620, 750, 610, 710, 800, 620, 750, 610, 720, 800, 620, 710, 600, 720, 790, 620, 710, 600, 750, 620, 750, 620, 710, 800, 600, 750, 600]
  }];
  return <ReactApexChart options={options} series={series} type="area" height={310} width="100%" />;
};

export const HrmsUsageChart = () => {
  const options = {
    chart: {
      height: 220,
      type: 'area',
      toolbar: { show: false },
      zoom: { enabled: false },
      sparkline: { enabled: false }
    },
    colors: ['#2E5A65'],
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      curve: 'smooth',
      width: 3,
      lineCap: 'round'
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.5,
        opacityTo: 0.05,
        stops: [0, 90, 95]
      }
    },
    grid: {
      show: true,
      borderColor: '#E5E7EB',
      strokeDashArray: 0,
      xaxis: {
        lines: { show: true }
      },
      yaxis: {
        lines: { show: false },
      },
      padding: {
        left: 0,
        right: -20
      }
    },
    xaxis: {
      categories: ['', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', ''],
      labels: {
        style: {
          colors: '#6B7280',
          fontSize: '12px'
        }
      },
      axisBorder: { show: false },
      axisTicks: { show: true }
    },
    yaxis: {
      min: 0,
      max: 8000,
      tickAmount: 4,
      labels: {
        style: {
          colors: '#6B7280',
          fontSize: '12px'
        },
        formatter: (val) => {
          return val === 0 ? '0' : (val / 1000) + 'K';
        },
        offsetX: -15
      }
    },
    tooltip: {
      enabled: true,
      theme: 'light',
      x: { show: false }
    },
    legend: {
      show: false
    }
  };
  const series = [{
    name: "performance",
    data: [1200, 1200, 4800, 4800, 2000, 6000, 6000, 8000, 8000]
  }];
  return <ReactApexChart options={options} series={series} type="area" height={220} width="100%" />;
};

export const FailedLoginsChart = () => {
  const options = {
    chart: {
      height: 45,
      width: 100,
      type: 'area',
      toolbar: { show: false },
      zoom: { enabled: false },
      sparkline: { enabled: true }
    },
    colors: ['#E70D0D'],
    stroke: {
      show: true,
      curve: 'straight',
      width: 2
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.6,
        opacityTo: 0.1,
        stops: [0, 90, 100]
      }
    },
    grid: { show: false },
    xaxis: { labels: { show: false }, axisBorder: { show: false } },
    yaxis: { show: false },
    tooltip: { enabled: true }
  };
  const series = [{ name: "performance", data: [10, 85, 15, 45, 20, 50, 30, 15] }];
  return <ReactApexChart options={options} series={series} type="area" height={45} width={100} />;
};

export const SuspiciousAlertsChart = () => {
  const options = {
    chart: {
      height: 45,
      width: 100,
      type: 'area',
      toolbar: { show: false },
      zoom: { enabled: false },
      sparkline: { enabled: true }
    },
    colors: ['#0C4B5E'],
    stroke: {
      show: true,
      curve: 'straight',
      width: 2
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.6,
        opacityTo: 0.1,
        stops: [0, 90, 100]
      }
    },
    grid: { show: false },
    xaxis: { labels: { show: false }, axisBorder: { show: false } },
    yaxis: { show: false },
    tooltip: { enabled: true }
  };
  const series = [{ name: "performance", data: [10, 25, 15, 45, 20, 50, 30, 15] }];
  return <ReactApexChart options={options} series={series} type="area" height={45} width={100} />;
};

export const BlockedIpsChart = () => {
  const options = {
    chart: {
      height: 45,
      width: 100,
      type: 'area',
      toolbar: { show: false },
      zoom: { enabled: false },
      sparkline: { enabled: true }
    },
    colors: ['#FD3995'],
    stroke: {
      show: true,
      curve: 'straight',
      width: 2
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.6,
        opacityTo: 0.1,
        stops: [0, 90, 100]
      }
    },
    grid: { show: false },
    xaxis: { labels: { show: false }, axisBorder: { show: false } },
    yaxis: { show: false },
    tooltip: { enabled: true }
  };
  const series = [{ name: "performance", data: [30, 15, 25, 35, 10, 40, 20, 45] }];
  return <ReactApexChart options={options} series={series} type="area" height={45} width={100} />;
};

export const IntegrationErrorChart = () => {
  const options = {
    chart: {
      height: 310,
      type: 'heatmap',
      toolbar: { show: false }
    },
    stroke: {
      width: 4,
      colors: ['#fff']
    },
    plotOptions: {
      heatmap: {
        radius: 8,
        enableShades: false,
        colorScale: {
          ranges: [
            { from: 0, to: 0, name: 'none', color: '#F1F3F4' },
            { from: 1, to: 50, name: 'low', color: '#FFB38A' },
            { from: 51, to: 100, name: 'high', color: '#F26522' }
          ]
        }
      }
    },
    dataLabels: {
      enabled: false
    },
    tooltip: {
      enabled: true,
      x: { show: false },
      marker: { show: false }
    },
    xaxis: {
      labels: { show: false },
      axisBorder: { show: false },
      axisTicks: { show: false },
      tooltip: { enabled: false }
    },
    yaxis: {
      labels: { show: false }
    },
    grid: {
      padding: { right: -0, left: -10 }
    },
    legend: {
      show: false
    }
  };
  const series = [
    { name: 'M9', data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 40, 80] },
    { name: 'M8', data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 80, 80] },
    { name: 'M7', data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 40, 80] },
    { name: 'M6', data: [0, 0, 0, 0, 0, 40, 0, 0, 0, 0, 0, 0, 40, 0, 0, 0, 80, 80] },
    { name: 'M5', data: [0, 0, 0, 40, 0, 80, 80, 0, 0, 0, 80, 80, 0, 0, 80, 0, 40, 80] },
    { name: 'M4', data: [80, 80, 0, 80, 0, 0, 80, 0, 40, 80, 0, 0, 0, 0, 0, 40, 80, 80] },
    { name: 'M3', data: [80, 80, 80, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
    { name: 'M2', data: [80, 80, 80, 0, 0, 80, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
    { name: 'M1', data: [80, 80, 80, 0, 0, 40, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] }
  ];
  return <ReactApexChart options={options} series={series} type="heatmap" height={310} />;
};
