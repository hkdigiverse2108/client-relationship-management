import React from 'react';
import ReactApexChart from 'react-apexcharts';

const DeductionChart = () => {
  const series = [{
    name: 'Deduction',
    data: [15, 40, 30, 35, 40, 35, 32]
  }, {
    name: 'Deduction',
    data: [-15, -40, -30, -35, -40, -35, -32]
  }];

  const options = {
    chart: {
      type: 'bar',
      stacked: true,
      toolbar: { show: false },
      sparkline: { enabled: true },
    },
    dataLabels: { enabled: false },
    colors: ['#F26522'],
    plotOptions: {
      bar: {
        borderRadius: 4,
        colors: {
          backgroundBarColors: ['#F8F9FA'],
          backgroundBarOpacity: 0.5,
          backgroundBarRadius: 4,
          hover: {
            enabled: true,
          }
        }
      },
    },
    xaxis: {
      labels: { show: false },
      axisTicks: { show: false },
      axisBorder: { show: false }
    },
    yaxis: {
      min: -50,
      max: 50,
      show: false
    },
    grid: { show: false },
    tooltip: { enabled: true }
  };

  return (
    <div style={{ width: '100px', height: '70px' }}>
      <ReactApexChart options={options} series={series} type="bar" height={70} width={100} />
    </div>
  );
};

export default DeductionChart;
