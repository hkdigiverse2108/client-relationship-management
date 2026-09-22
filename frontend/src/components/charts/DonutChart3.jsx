import React from 'react';
import ReactApexChart from 'react-apexcharts';

const DonutChart3 = () => {
  const series = [15, 10, 5, 10, 60];

  const options = {
    chart: {
      type: 'donut',
      height: 290,
    },
    labels: ['Paid', 'Google', 'Referals', 'Campaigns', 'Campaigns'],
    colors: ['#F26522', '#FFC107', '#E70D0D', '#1B84FF', '#0C4B5E'],
    plotOptions: {
      pie: {
        donut: {
          size: '60%',
          labels: {
            show: true,
            total: {
              show: true,
              label: 'Leads',
              formatter: function (w) {
                return '589';
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
      show: false,
    }
  };

  return (
    <div>
      <ReactApexChart options={options} series={series} type="donut" height={290} />
    </div>
  );
};

export default DonutChart3;
