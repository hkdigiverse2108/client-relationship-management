import React from 'react';
import ReactApexChart from 'react-apexcharts';

const StorageChart = () => {
  const options = {
    chart: {
      type: 'donut',
      toolbar: {
        show: false,
      },
      offsetY: -10,
    },
    plotOptions: {
      pie: {
        startAngle: -100,
        endAngle: 100,
        donut: {
          size: '80%',
          labels: {
            show: true,
            name: {
              show: true,
            },
            value: {
              show: true,
            },
            total: {
              show: true,
              showAlways: true,
              label: 'Total',
              fontSize: '24px',
              fontWeight: 'bold',
              formatter: function (w) {
                return '80 GB'; // You can customize this or calculate dynamically
              }
            }
          }
        }
      }
    },
    dataLabels: {
      enabled: false
    },
    legend: {
      show: false
    },
    stroke: {
      show: false
    },
    colors: ['#0C4B5E', '#FFC107', '#1B84FF', '#AB47BC', '#FD3995'],
    labels: ['Documents', 'Video', 'Music', 'Photos', 'Other'],
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }],
    grid: {
      padding: {
        bottom: -60
      }
    }
  };

  const series = [20, 20, 20, 20, 20]; // Mock data, can be updated as needed

  return (
    <div id="storage-chart" style={{ height: '200px' }}>
      <ReactApexChart options={options} series={series} type="donut" height={200} />
    </div>
  );
};

export default StorageChart;
