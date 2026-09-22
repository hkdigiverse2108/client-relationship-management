import React from 'react';
import ReactApexChart from 'react-apexcharts';

const SalesIncomeChart = () => {
  const options = {
    chart: {
      height: 290,
      type: 'bar',
      stacked: true,
      toolbar: { show: false }
    },
    colors: ['#FF6F28', '#F8F9FA'],
    plotOptions: {
      bar: {
        columnWidth: '60%',       
        borderRadius: 5,         
        borderRadiusWhenStacked: 'all', 
        borderRadiusApplication: 'around', 
        horizontal: false,
      },
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      labels: {
        style: {
          colors: '#6B7280',
          fontSize: '13px',
        }
      }
    },
    yaxis: {
      labels: { offsetX: -15, style: { colors: '#6B7280', fontSize: '13px' } }
    },
    grid: {
      borderColor: '#E5E7EB',
      strokeDashArray: 5,
    },
    legend: { show: false },
    dataLabels: { enabled: false },
    tooltip: {
      enabled: true,
      shared: true,
      intersect: false,
      theme: 'dark',
      custom: function ({ series, dataPointIndex }) {
        var incomeStr = '$' + Math.round(series[0][dataPointIndex]) + 'K';
        var expensesStr = '$' + Math.round(series[1][dataPointIndex]) + 'K';
        return (
          '<div style="background:#1F2937; color:#ffffff; padding:10px 14px; border-radius:8px; min-width:165px;">' +
            '<div style="display:flex; justify-content:space-between; margin-bottom: 6px;"><span>Income</span><span>' + incomeStr + '</span></div>' +
            '<div style="display:flex; justify-content:space-between;"><span>Expenses</span><span>' + expensesStr + '</span></div>' +
          '</div>'
        );
      }
    }
  };

  const series = [{
    name: 'Income',
    data: [40, 30, 45, 80, 85, 90, 80, 80, 80, 85, 20, 80]
  }, {
    name: 'Expenses',
    data: [60, 70, 55, 20, 15, 10, 20, 20, 20, 15, 80, 20]
  }];

  return (
    <div>
      <ReactApexChart options={options} series={series} type="bar" height={290} />
    </div>
  );
};

export default SalesIncomeChart;
