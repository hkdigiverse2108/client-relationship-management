import React from 'react';
import ReactApexChart from 'react-apexcharts';

const LeaveChart = () => {
  const series = [85, 50, 20];

  const options = {
    chart: {
      type: 'radialBar',
      width: 150,
      height: 150,
      sparkline: {
        enabled: true
      }
    },
    plotOptions: {
      radialBar: {
        startAngle: -90,
        endAngle: 90,
        offsetY: 0,
        hollow: {
          margin: 0,
          size: '40%',
          background: 'transparent',
        },
        track: {
          show: true,
          background: '#F3F4F6',
          strokeWidth: '97%',
          margin: 5,
        },
        dataLabels: {
          show: false,
        }
      }
    },
    fill: {
      colors: ['#F37438', '#F5844E', '#F69364']
    },
    labels: ['Sick', 'Casual', 'Unpaid'],
    grid: {
      padding: {
        top: -50,
        left: -10,
        bottom: -150,
      }
    },
    legend: {
      show: false
    }
  };

  return (
    <div>
      <ReactApexChart options={options} series={series} type="radialBar" height={150} width={150} />
    </div>
  );
};

export default LeaveChart;
