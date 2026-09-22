import React from 'react';
import ReactApexChart from 'react-apexcharts';

const WorkloadDistributionChart = () => {
  const series = [45, 25, 20, 10]; 

  const options = {
    chart: {
      type: 'donut',
      height: 300,
    },
    labels: ['Development', 'Support', 'Sales', 'Marketing'],
    colors: ['#0C4B5E', '#FFC107', '#AB47BC', '#FD3995'],
    plotOptions: {
      pie: {
        donut: {
          size: '65%',
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: '22px',
            },
            value: {
              show: true,
              fontSize: '16px',
            },
            total: {
              show: true,
              showAlways: true,
              label: 'Total Tasks',
              formatter: function (w) {
                return '100';
              }
            }
          }
        }
      }
    },
    stroke: {
      lineCap: 'round',
      show: true,
      width: 2,
      colors: '#fff'
    },
    legend: {
      position: 'bottom',
    },
    dataLabels: {
      enabled: false,
    },
  };

  return (
    <div id="workload-distribution-chart">
      <ReactApexChart options={options} series={series} type="donut" height={300} />
    </div>
  );
};

export default WorkloadDistributionChart;
