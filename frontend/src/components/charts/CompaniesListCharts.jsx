import React from 'react';
import ReactApexChart from 'react-apexcharts';

export const CompanySparkline = ({ data }) => {
  const options = {
    chart: {
      type: 'line',
      sparkline: { enabled: true },
      toolbar: { show: false },
    },
    stroke: {
      curve: 'smooth',
      width: 2,
    },
    colors: ['#F26522'],
    tooltip: {
      fixed: { enabled: false },
      x: { show: false },
      y: { title: { formatter: () => '' } },
      marker: { show: false }
    }
  };

  return <ReactApexChart options={options} series={[{ data }]} type="line" height={40} width={60} />;
};
