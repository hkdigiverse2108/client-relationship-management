import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { APP_CONFIG } from '../../config/appConfig';

const getInitials = (name) => {
  if (!name) return '??';
  const parts = name.trim().split(' ');
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return name.substring(0, 2).toUpperCase();
};

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

export const PlanOverviewChart = ({ sources = [] }) => {
  const defaultColors = ['#FFC107', '#1B84FF', '#F26522', '#2DCB73', '#4B3088', '#E91E63', '#9C27B0', '#00BCD4', '#8BC34A', '#795548'];
  const labels = sources.length > 0 ? sources.map(s => s.label.split('(')[0].trim()) : ['Enterprise', 'Premium', 'Basic'];
  const series = sources.length > 0 ? sources.map(s => Number(s.value)) : [20, 60, 20];
  
  // Ensure we have enough colors even if there are many sources
  let colors = [];
  for (let i = 0; i < series.length; i++) {
    colors.push(defaultColors[i % defaultColors.length]);
  }

  if (sources.length === 0) {
    colors = ['#FFC107', '#1B84FF', '#F26522'];
  }

  const options = {
    chart: {
      height: 240,
      type: 'donut',
      toolbar: { show: false }
    },
    colors: colors,
    labels: labels,
    plotOptions: {
      pie: {
        donut: {
          size: '70%',
          labels: { show: false }
        }
      }
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
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

  return <ReactApexChart key={series.join('-')} options={options} series={series} type="donut" height={240} />;
};

export const RepPerformanceChart = ({ data = [] }) => {
  const fullLabels = data.map(r => r.name || 'Unknown');
  const revenueData = data.map(r => r.won_revenue || 0);
  const pipelineData = data.map(r => -(r.pipeline || 0)); // negative for UI effect

  const maxVal = Math.max(...revenueData, ...data.map(r => r.pipeline || 0), 1000);
  const backendUrl = APP_CONFIG.apiBaseUrl.replace('/api/v1', '');

  const options = {
    chart: { type: 'bar', stacked: true, zoom: { enabled: true }, toolbar: { show: false } },
    colors: ['#F26522', '#E5E7EB'],
    grid: { padding: { top: 5, right: 0 } },
    plotOptions: { bar: { horizontal: false, borderRadius: 8, borderRadiusApplication: "around", borderRadiusWhenStacked: "all", columnWidth: '40%' } },
    dataLabels: { enabled: false },
    yaxis: { 
      opposite: true, 
      labels: { 
        offsetX: -5, 
        formatter: (val) => { 
          const absVal = Math.round(Math.abs(val));
          if (absVal < 1) return '0';
          if (absVal >= 100000) return (absVal / 100000).toFixed(1) + 'L';
          if (absVal >= 1000) return (absVal / 1000).toFixed(1) + 'K';
          return absVal;
        } 
      },
      min: -maxVal * 1.1,
      max: maxVal * 1.1,
      tickAmount: 6
    },
    xaxis: { 
      categories: fullLabels,
      labels: {
        formatter: function (val) {
          if (!val) return 'Unknown';
          return val.length > 12 ? val.substring(0, 10) + '...' : val;
        }
      },
      tooltip: { 
        enabled: true,
        formatter: function (val) {
          if (!val) return val;
          const cleanVal = val.replace('...', '');
          const match = fullLabels.find(l => l.startsWith(cleanVal));
          return match || val;
        }
      }
    },
    legend: { show: false },
    fill: { opacity: 1 },
    tooltip: {
      custom: function({series, seriesIndex, dataPointIndex, w}) {
        const rep = data[dataPointIndex];
        const val = Math.abs(series[seriesIndex][dataPointIndex]).toLocaleString('en-IN');
        const seriesName = w.globals.seriesNames[seriesIndex];
        
        let avatarHtml = '';
        if (rep.profile_photo) {
           const photoUrl = rep.profile_photo.startsWith('http') ? rep.profile_photo : `${backendUrl}${rep.profile_photo}`;
           avatarHtml = `<img src="${photoUrl}" class="rounded-circle flex-shrink-0 me-2" style="width: 32px; height: 32px; object-fit: cover;" alt="user" />`;
        } else {
           avatarHtml = `<div class="bg-primary rounded-circle flex-shrink-0 me-2 d-flex align-items-center justify-content-center text-white fw-medium" style="width: 32px; height: 32px; font-size: 12px;">${getInitials(rep.name)}</div>`;
        }
        
        return `
          <div class="p-2 d-flex align-items-center bg-white border rounded">
            ${avatarHtml}
            <div>
              <div class="fw-bold fs-13 text-dark text-truncate" style="max-width: 150px;" title="${rep.name}">${rep.name}</div>
              <div class="fs-12 text-muted mt-1 d-flex align-items-center">
                <span class="d-inline-block rounded-circle me-1" style="width:8px;height:8px;background-color:${w.globals.colors[seriesIndex]}"></span>
                <span>${seriesName}: <span class="fw-medium text-dark">₹${val}</span></span>
              </div>
            </div>
          </div>
        `;
      }
    }
  };

  const series = [
    { name: 'Won Revenue', data: revenueData }, 
    { name: 'Active Pipeline', data: pipelineData }
  ];

  return <ReactApexChart key={JSON.stringify(data)} options={options} series={series} type="bar" height={360} />;
};

export const WorkloadDistributionChart = ({ data }) => {
  const users = data?.users || [];
  const deals = data?.deals || [];
  const projects = data?.projects || [];
  const tasks = data?.tasks || [];

  const options = {
    chart: { type: 'bar', stacked: true, toolbar: { show: false } },
    colors: ['#F26522', '#4B3088', '#0C4B5E'],
    plotOptions: { bar: { columnWidth: '50%', borderRadius: 4 } },
    dataLabels: { enabled: false },
    stroke: { width: 0 },
    xaxis: { 
      categories: data?.full_names || users, 
      axisBorder: { show: false }, 
      axisTicks: { show: false }, 
      labels: { 
        style: { colors: '#6B7280', fontSize: '12px' },
        formatter: function (val) {
          if (!val) return 'U';
          const parts = val.trim().split(' ');
          if (parts.length >= 2) return (parts[0][0] + parts[parts.length-1][0]).toUpperCase();
          return val.substring(0, 2).toUpperCase();
        }
      },
      tooltip: { 
        enabled: true,
        formatter: function (val) {
          return val;
        }
      }
    },
    yaxis: { tickAmount: 5, labels: { style: { colors: '#6B7280', fontSize: '13px' } } },
    grid: { borderColor: '#F3F4F6', strokeDashArray: 4, xaxis: { lines: { show: false } }, yaxis: { lines: { show: true } } },
    legend: { show: true, position: 'top', horizontalAlign: 'right' },
    fill: { opacity: 1 },
    tooltip: {
      custom: function ({ series, seriesIndex, dataPointIndex, w }) {
        const fullName = data?.full_names?.[dataPointIndex] || users[dataPointIndex] || 'Unknown';
        let avatar = data?.avatars?.[dataPointIndex];
        if (avatar && !avatar.startsWith('http')) {
            const hostUrl = APP_CONFIG.apiBaseUrl.replace('/api/v1', '');
            avatar = hostUrl + (avatar.startsWith('/') ? '' : '/') + avatar;
        }
        const dealsCount = series[0][dataPointIndex];
        const projectsCount = series[1][dataPointIndex];
        const tasksCount = series[2][dataPointIndex];

        return `
          <div class="px-3 py-2 bg-white rounded shadow-sm border border-light" style="min-width: 180px;">
            <div class="d-flex align-items-center mb-2 border-bottom pb-2">
              ${avatar 
                ? '<img src="' + avatar + '" class="rounded-circle me-2 flex-shrink-0" style="width: 28px; height: 28px; object-fit: cover; min-width: 28px;" />'
                : '<div class="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-2 flex-shrink-0" style="width: 28px; height: 28px; min-width: 28px; font-size: 11px;">' + users[dataPointIndex] + '</div>'
              }
              <span class="fw-bold fs-13 text-dark text-truncate" style="max-width: 150px;" title="${fullName}">${fullName}</span>
            </div>
            <div class="d-flex flex-column gap-1">
              <div class="d-flex justify-content-between align-items-center">
                <span class="d-flex align-items-center fs-12 text-muted"><span class="rounded-circle me-1" style="width:8px;height:8px;background:#F26522"></span> Deals</span>
                <span class="fw-bold fs-12 ms-3">${dealsCount}</span>
              </div>
              <div class="d-flex justify-content-between align-items-center">
                <span class="d-flex align-items-center fs-12 text-muted"><span class="rounded-circle me-1" style="width:8px;height:8px;background:#4B3088"></span> Projects</span>
                <span class="fw-bold fs-12 ms-3">${projectsCount}</span>
              </div>
              <div class="d-flex justify-content-between align-items-center">
                <span class="d-flex align-items-center fs-12 text-muted"><span class="rounded-circle me-1" style="width:8px;height:8px;background:#0C4B5E"></span> Tasks</span>
                <span class="fw-bold fs-12 ms-3">${tasksCount}</span>
              </div>
            </div>
          </div>
        `;
      }
    }
  };
  const series = [
    { name: 'Active Deals', data: deals },
    { name: 'Active Projects', data: projects },
    { name: 'Open Tasks', data: tasks }
  ];
  return <ReactApexChart key={JSON.stringify(data)} options={options} series={series} type="bar" height={300} />;
};

export const TeamCompositionChart = ({ data = [] }) => {
  const labels = data.map(d => d.id || 'Unknown');
  const series = data.map(d => d.value || 0);

  const options = {
    chart: { type: 'donut', toolbar: { show: false } },
    labels: labels,
    colors: ['#F26522', '#4B3088', '#0C4B5E', '#10B981', '#F59E0B', '#3B82F6', '#8B5CF6', '#EC4899'],
    plotOptions: {
      pie: {
        donut: {
          size: '75%',
          labels: {
            show: true,
            name: { show: true, fontSize: '14px', color: '#6B7280' },
            value: { show: true, fontSize: '24px', fontWeight: 600, color: '#111827' },
            total: {
              show: true,
              showAlways: true,
              label: 'Total Team',
              fontSize: '14px',
              color: '#6B7280',
              formatter: function (w) {
                return w.globals.seriesTotals.reduce((a, b) => {
                  return a + b
                }, 0)
              }
            }
          }
        }
      }
    },
    dataLabels: { enabled: false },
    stroke: { show: false },
    legend: { show: false },
    tooltip: {
      theme: 'light',
      y: { formatter: (val) => val + ' Members' }
    }
  };

  return <ReactApexChart key={JSON.stringify(data)} options={options} series={series} type="donut" height={220} />;
};
