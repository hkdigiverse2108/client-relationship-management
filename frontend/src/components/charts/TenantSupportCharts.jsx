import React from 'react';
import ReactApexChart from 'react-apexcharts';

export const TenantSupportChart = ({ color, data, bgColor, name = 'Tickets', category = 'Day' }) => {
  const options = {
    chart: {
      width: 50,
      height: 115,
      type: 'bar',
      toolbar: { show: false },
      sparkline: { enabled: true }
    },
    colors: [color],
    fill: {
      colors: [color],
      opacity: 1
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
        columnWidth: '60%',
        colors: {
          backgroundBarColors: [bgColor],
          backgroundBarOpacity: 0.5,
          backgroundBarRadius: 10
        }
      }
    },
    states: {
      normal: { filter: { type: 'none' } },
      hover: { filter: { type: 'darken', value: 0.8 } },
      active: { allowMultipleDataPointsSelection: false, filter: { type: 'none' } }
    },
    dataLabels: {
      enabled: true,
      formatter: function (val) { return val + "%"; },
      offsetY: 0,
      style: {
        fontSize: '12px',
        colors: ['#fff'],
        fontWeight: 'bold'
      }
    },
    xaxis: {
      categories: [category],
      labels: { show: false },
      axisTicks: { show: false },
      axisBorder: { show: false }
    },
    yaxis: { show: false, min: 0, max: 100 },
    grid: { show: false },
    tooltip: { enabled: true }
  };

  return <ReactApexChart options={options} series={[{ name: name, data: [data] }]} type="bar" height={115} width={50} />;
};
