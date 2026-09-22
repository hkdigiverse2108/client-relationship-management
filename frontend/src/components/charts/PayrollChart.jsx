import React from 'react';
import ReactApexChart from 'react-apexcharts';

const PayrollChart = () => {
  const series = [{
    name: 'Payroll',
    data: [45, 15, 30, 25, 20, 45, 40]
  }];

  const options = {
    chart: {
      type: 'bar',
      toolbar: { show: false },
      sparkline: { enabled: true }
    },
    dataLabels: { enabled: false },
    colors: ['#0C4B5E'],
    plotOptions: {
      bar: {
        borderRadius: 4,
        borderRadiusWhenStacked: 'all',
        borderRadiusApplication: 'around',
        endingShape: 'around',
        colors: {
          backgroundBarColors: ['#F8F9FA'],
          backgroundBarOpacity: 0.5,
          backgroundBarRadius: 4,
          hover: {
            enabled: true,
            borderColor: '#F26522',
          }
        }
      },
    },
    xaxis: {
      labels: { show: false },
      axisTicks: { show: false },
      axisBorder: { show: false }
    },
    yaxis: { show: false },
    grid: { show: false },
    tooltip: { enabled: true }
  };

  return (
    <div style={{ width: '100px', height: '40px' }}>
      <ReactApexChart options={options} series={series} type="bar" height={40} width={100} />
    </div>
  );
};

export default PayrollChart;
