import React from 'react';
import ReactApexChart from 'react-apexcharts';

const DonutChart2 = () => {
  const series = [25, 30, 10, 35];

  const options = {
    chart: {
      type: 'donut',
      height: 185,
    },
    labels: ['Paid', 'Google', 'Referals', 'Campaigns'],
    colors: ['#FFC107', '#0C4B5E', '#AB47BC', '#FD3995'],
    plotOptions: {
      pie: {
        donut: {
          size: '60%',
          labels: {
            show: true,
            total: {
              show: true,
              label: 'Google',
              formatter: function (w) {
                return '40%';
              }
            }
          }
        }
      }
    },
    stroke: {
      lineCap: 'round',
      show: true,
      width: 0,
      colors: '#fff'
    },
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false
    }
  };

  return (
    <div>
      <ReactApexChart options={options} series={series} type="donut" height={185} />
    </div>
  );
};

export default DonutChart2;
