import React from 'react';
import ReactApexChart from 'react-apexcharts';

const ConversionFunnelChart = () => {
  // Use the theme's primary CSS variable, fallback to default orange if not found
  const primaryColor = typeof window !== 'undefined' 
    ? getComputedStyle(document.documentElement).getPropertyValue('--primary').trim() || '#FF6F28'
    : '#FF6F28';

  const options = {
    chart: {
      height: 220,
      type: 'bar',
      padding: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
      },
      toolbar: {
        show: false,
      }
    },
    colors: [primaryColor],
    grid: {
      borderColor: '#E5E7EB',
      strokeDashArray: 5,
      padding: {
        top: -20,
        left: 0,
        right: 0,
        bottom: 0
      }
    },
    plotOptions: {
      bar: {
        borderRadius: 5,
        horizontal: true,
        barHeight: '35%',
        endingShape: 'rounded'
      }
    },
    dataLabels: {
      enabled: false
    },
    xaxis: {
      categories: ['Visitors', 'Leads Captured', 'Qualified', 'Closed Won'],
      labels: {
        style: {
          colors: '#111827',
          fontSize: '13px',
        }
      }
    }
  };

  const series = [{
    data: [0, 16, 8, 6],
    name: 'Count'
  }];

  return (
    <div>
      <ReactApexChart options={options} series={series} type="bar" height={190} />
    </div>
  );
};

export default ConversionFunnelChart;
