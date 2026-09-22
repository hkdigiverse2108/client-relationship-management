import React from 'react';
import ReactApexChart from 'react-apexcharts';

const PerformanceChart2 = () => {
  const series = [{
    name: "performance",
    data: [20, 20, 35, 35, 40, 60, 60]
  }];

  const options = {
    chart: {
      height: 273,
      type: 'area',
      zoom: {
        enabled: false
      }
    },
    colors: ['#03C95A'],
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'straight'
    },
    title: {
      text: '',
      align: 'left'
    },
    grid: {
       padding : {
        left : -8,
        right : -4,
       }
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    },
    yaxis: {
      min: 10,
      max: 60,
      tickAmount: 5,
      labels: {
        offsetX : -15,
        formatter: (val) => {
          return val / 1 + 'K'
        }
      }
    },
    legend: {
      position: 'top',
      horizontalAlign: 'left'
    }
  };

  return (
    <div>
      <ReactApexChart options={options} series={series} type="area" height={273} />
    </div>
  );
};

export default PerformanceChart2;
