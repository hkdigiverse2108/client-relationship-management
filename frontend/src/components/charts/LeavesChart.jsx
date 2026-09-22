import React from 'react';
import ReactApexChart from 'react-apexcharts';

const LeavesChart = () => {
  const series = [15, 10, 5, 10, 60];

  const options = {
    chart: {
      height: 185,
      type: 'donut',
      toolbar: {
        show: false,
      }
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '50%'
      },
    },
    dataLabels: {
      enabled: false
    },
    grid: {
      padding: {
        right: 0, 
        left: 10
      },
    },
    yaxis: {
      labels: {
        offsetX: -10, 
        style: {
          colors: '#6B7280',
          fontSize: '13px',
        }
      }
    },
    colors: ['#F26522', '#FFC107', '#E70D0D', '#03C95A', '#0C4B5E'],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            show: false
          }
        }
      },
      {
        breakpoint: 576,
        options: {
          grid: {
            padding: {
              right: 0,
            },
            offsetX: -200
          },
          plotOptions: {
            bar: {
              columnWidth: '60%' 
            }
          }
        }
      }
    ],
    legend: {
      show: false
    }
  };

  return (
    <div>
      <ReactApexChart options={options} series={series} type="donut" height={185} />
    </div>
  );
};

export default LeavesChart;
