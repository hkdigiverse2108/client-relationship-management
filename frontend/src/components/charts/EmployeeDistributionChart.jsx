import React from 'react';
import ReactApexChart from 'react-apexcharts';

const EmployeeDistributionChart = () => {
  const series = [{
    name: 'Company',
    data: [40, 20, 35, 10]
  }];

  const options = {
    colors: ['#FF7129'],
    chart: {
      height: 340,
      type: 'bar',
      toolbar: {
        show: false,
      },
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'light',
        type: 'vertical',
        shadeIntensity: 0.5,
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100],
        colorStops: [
          {
            offset: 0,
            color: '#FF7129',
            opacity: 0.5
          },
          {
            offset: 100,
            color: '#FFFFFF',
            opacity: 1
          }
        ]
      }
    },
    responsive: [{
      breakpoint: 480,
      options: {
        legend: {
          position: 'bottom',
          offsetY: 10
        }
      }
    }],
    plotOptions: {
      bar: {
        columnWidth: '90%',
        borderRadius: 10,
        borderRadiusWhenStacked: 'all',
        horizontal: false,
        dataLabels: {
          position: 'bottom',
        },
        colors: {
          backgroundBarColors: ['#F8F9FA'],
          backgroundBarOpacity: 0.5,
          backgroundBarRadius: 10,
        }
      },
    },
    dataLabels: {
      enabled: true,
      position: 'bottom',
      formatter: function (val) {
        return val + "%";
      },
      offsetY: 10,
      style: {
        fontSize: '12px',
        colors: ['#111827'],
        fontWeight: 'bold'
      }
    },
    xaxis: {
      categories: ['Sales', 'Front End', 'React', 'UI'],
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: {
        style: {
          colors: '#111827',
          fontSize: '13px',
        }
      }
    },
    yaxis: {
      min: 0,
      max: 50,
      labels: {
        show: false
      }
    },
    grid: {
      show: false,
      strokeDashArray: 5,
      padding: {
        left: -10,
        right: -30,
        bottom: -10
      },
    },
    legend: {
      show: false
    }
  };

  return (
    <div className="employee-distribution-chart">
      <style>{`
        .employee-distribution-chart .apexcharts-bar-area:hover {
          fill: #FF7129 !important;
          opacity: 1 !important;
        }
        .employee-distribution-chart .apexcharts-tooltip {
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06) !important;
          border-radius: 4px !important;
          border: 1px solid #e2e8f0 !important;
          background: #ffffff !important;
        }
        .employee-distribution-chart .apexcharts-tooltip-title {
          background: #f8fafc !important;
          border-bottom: 1px solid #e2e8f0 !important;
          font-weight: 500 !important;
          padding: 6px 12px !important;
        }
        .employee-distribution-chart .apexcharts-tooltip-series-group {
          padding: 6px 12px !important;
        }
      `}</style>
      <ReactApexChart options={options} series={series} type="bar" height={340} />
    </div>
  );
};

export default EmployeeDistributionChart;
