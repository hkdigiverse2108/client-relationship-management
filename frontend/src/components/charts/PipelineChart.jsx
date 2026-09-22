import React from 'react';
import ReactApexChart from 'react-apexcharts';

const PipelineChart = () => {
  const series = [{
    name: "Pipeline",
    data: [130, 110, 90, 70, 50, 40],
  }];

  const options = {
    chart: {
      type: 'bar',
      toolbar: { show: false },
      sparkline: { enabled: true }
    },
    plotOptions: {
      bar: {
        horizontal: true,
        distributed: true,
        barHeight: '100%',
        borderRadius: 10,
        borderRadiusApplication: 'around',
        isFunnel: true,
      },
    },
    colors: ['#F26522', '#F37438', '#F5844E', '#F69364', '#F7A37A', '#F9B291'],
    dataLabels: {
      enabled: true,
      textAnchor: 'middle',
      formatter: function (val, opt) {
        return opt.w.globals.labels[opt.dataPointIndex]
      },
      style: {
        fontSize: '14px',
        fontFamily: 'Public Sans, sans-serif',
        fontWeight: 500,
        colors: ['#fff']
      },
      dropShadow: { enabled: false }
    },
    xaxis: {
      categories: [
        'Marketing : 7,898', 'Sales : 4,658', 'Email : 2,898',
        'Chat : 789', 'Operational : 655', 'Calls : 454'
      ],
      min: -25,
      max: 125
    },
    tooltip: { enabled: false },
    states: {
      hover: { filter: { type: 'none' } },
      active: { filter: { type: 'none' } }
    },
    grid: {
      padding: {
        top: 20,
        bottom: 20,
        left: 20,
        right: 20
      }
    }
  };

  return (
    <div>
      <ReactApexChart options={options} series={series} type="bar" height={300} />
    </div>
  );
};

export default PipelineChart;
