import React from 'react';
import ReactApexChart from 'react-apexcharts';

export const TicketChart = ({ color, data }) => {
  const options = {
    chart: {
      type: 'bar',
      sparkline: { enabled: true },
    },
    plotOptions: {
      bar: {
        columnWidth: '80%',
        borderRadius: 2,
      }
    },
    colors: [color],
    tooltip: {
      fixed: { enabled: false },
      x: { show: false },
      y: {
        title: { formatter: function () { return '' } }
      },
      marker: { show: false }
    }
  };

  return <ReactApexChart options={options} series={[{ data }]} type="bar" height={40} width={100} />;
};
