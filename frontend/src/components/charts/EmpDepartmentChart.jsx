import React from 'react';
import ReactApexChart from 'react-apexcharts';

const EmpDepartmentChart = () => {
  const options = {
    chart: {
      height: 220,
      type: 'bar',
      padding: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
      },
      toolbar: {
        show: false,
      }
    },
    colors: ['#FF6F28'],
    grid: {
      borderColor: '#E5E7EB',
      strokeDashArray: 5,
      padding: {
        top: -20,
        left: 0,
        right: 0,
        bottom: 0
      }
    },
    plotOptions: {
      bar: {
        borderRadius: 5,
        horizontal: true,
        barHeight: '35%',
        endingShape: 'rounded'
      }
    },
    dataLabels: {
      enabled: false
    },
    xaxis: {
      categories: ['UI/UX', 'Development', 'Management', 'HR', 'Testing', 'Marketing'],
      labels: {
        style: {
          colors: '#111827',
          fontSize: '13px',
        }
      }
    }
  };

  const series = [{
    data: [80, 110, 80, 20, 60, 100],
    name: 'Employee'
  }];

  return (
    <div>
      <ReactApexChart options={options} series={series} type="bar" height={190} />
    </div>
  );
};

export default EmpDepartmentChart;
