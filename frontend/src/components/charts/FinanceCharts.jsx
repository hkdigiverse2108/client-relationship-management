import React from 'react';
import ReactApexChart from 'react-apexcharts';

export const PayrollPaymentChart = () => {
  const options = {
    chart: { type: 'bar', stacked: true, stackType: '100%', toolbar: { show: false }, sparkline: { enabled: true } },
    plotOptions: { bar: { horizontal: true, barHeight: '100%' } },
    colors: ['#54C564', '#E5E7EB'],
    fill: { type: 'pattern', opacity: 1, pattern: { style: 'verticalLines', width: 6, strokeWidth: 4 } },
    tooltip: { enabled: true },
    xaxis: { categories: ['Total'] }
  };
  const series = [{ name: 'Payroll', data: [600] }, { name: 'Remaining', data: [1000] }];
  return <ReactApexChart options={options} series={series} type="bar" height={45} />;
};

export const ReimbrusementChart = () => {
  const options = {
    chart: { type: 'bar', stacked: true, stackType: '100%', toolbar: { show: false }, sparkline: { enabled: true } },
    plotOptions: { bar: { horizontal: true, barHeight: '100%' } },
    colors: ['#7298A4', '#E5E7EB'],
    fill: { type: 'pattern', opacity: 1, pattern: { style: 'verticalLines', width: 6, strokeWidth: 4 } },
    tooltip: { enabled: true },
    xaxis: { categories: ['Total'] }
  };
  const series = [{ name: 'Reimbrusement', data: [1000] }, { name: 'Remaining', data: [600] }];
  return <ReactApexChart options={options} series={series} type="bar" height={45} />;
};

export const HeadcountChart = () => {
  const options = {
    chart: { type: 'bar', stacked: true, zoom: { enabled: true } },
    colors: ['#F26522', '#E5E7EB'],
    grid: { padding: { top: 5, right: 0 } },
    plotOptions: { bar: { horizontal: false, borderRadius: 8, borderRadiusApplication: "around", borderRadiusWhenStacked: "all", columnWidth: '40%' } },
    dataLabels: { enabled: false },
    yaxis: { opposite: true, labels: { offsetX: -5, formatter: (val) => { return val / 1 + 'K' } }, min: -30, max: 30, tickAmount: 6 },
    xaxis: { categories: ['', '', 'Jan', '', '', '', 'Feb', '', '', '', 'Mar', '', '', '', 'Apr', ''] },
    legend: { show: false },
    fill: { opacity: 1 }
  };
  const series = [{ name: 'Revenue', data: [20, 28, 29, 20, 15, 30, 25, 20, 20, 12, 20, 20, 30, 15, 20, 25] }, { name: 'Expenses', data: [-20, -30, -20, -20, -25, -25, -20, -30, -20, -25, -30, -20, -30, -20, -10, -28] }];
  return <ReactApexChart options={options} series={series} type="bar" height={240} />;
};

export const BudgetChart = ({ budgetData = null }) => {
  // If no dynamic data is passed, use a default skeleton or empty values
  // Format labels from YYYY-MM to Month YY
  const labels = budgetData?.labels?.length > 0 ? budgetData.labels.map(l => {
    if(typeof l === 'string' && l.match(/^\d{4}-\d{2}$/)) {
      const [year, month] = l.split('-');
      const date = new Date(year, month - 1);
      return date.toLocaleString('default', { month: 'short' }) + " '" + year.substring(2);
    }
    return l;
  }) : ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"];
  const actualData = budgetData?.actual?.length > 0 ? budgetData.actual : [0, 0, 0, 0, 0, 0, 0, 0];
  const projectedData = budgetData?.projected?.length > 0 ? budgetData.projected : [0, 0, 0, 0, 0, 0, 0, 0];
  
  // Find maximum value to appropriately scale the y-axis, ensure at least 1000 so it doesn't look weird when empty
  const maxVal = Math.max(...actualData, ...projectedData, 1000);

  const options = {
    chart: { type: 'area', toolbar: { show: false } },
    colors: ['#F26522', '#0C4B5E'],
    dataLabels: { enabled: false },
    stroke: { curve: 'straight', width: 1 },
    fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.35, opacityTo: 0.05, stops: [0, 100] } },
    xaxis: { 
      categories: labels, 
      axisBorder: { show: false }, 
      axisTicks: { show: false } 
    },
    yaxis: { 
      min: 0, 
      max: maxVal * 1.1, // Add 10% padding on top 
      labels: { 
        offsetX: -15, 
        formatter: function (value) { 
          if (value >= 1000000) return (value / 1000000).toFixed(1) + "M";
          if (value >= 1000) return (value / 1000).toFixed(1) + "k";
          return Math.round(value);
        } 
      } 
    },
    grid: { show: false, padding: { left: 0, right: -15, top: 0 } },
    tooltip: {
      y: {
        formatter: function (val) {
          return "₹" + val.toLocaleString();
        }
      }
    }
  };

  const series = [
    { name: 'Actual Earnings', data: actualData },
    { name: 'Projected Budget', data: projectedData }
  ];

  return <ReactApexChart options={options} series={series} type="area" height={280} />;
};

export const FinanceChart = () => {
  const options = {
    chart: { type: 'bar', toolbar: { show: false }, sparkline: { enabled: true } },
    colors: ['#FF7129'],
    fill: { type: 'gradient', gradient: { shade: 'light', type: 'vertical', shadeIntensity: 0.5, opacityFrom: 1, opacityTo: 1, stops: [0, 100], colorStops: [{ offset: 0, color: '#9CB9C2', opacity: 0.5 }, { offset: 100, color: '#F8F9FA', opacity: 0.5 }] } },
    plotOptions: { bar: { columnWidth: '80%', borderRadius: 12, horizontal: false, endingShape: 'rounded', dataLabels: { position: 'bottom' }, colors: { backgroundBarColors: ['#F8F9FA'], backgroundBarOpacity: 0.5 } } },
    dataLabels: { enabled: false, formatter: function (val) { return "$" + val; }, offsetY: 10, style: { fontSize: '12px', colors: ['#F26522'], fontWeight: 'bold' } },
    xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], axisBorder: { show: false }, axisTicks: { show: false }, labels: { style: { colors: '#111827', fontSize: '13px' } } },
    yaxis: { min: 0, max: 100, labels: { show: false } },
    grid: { show: false, strokeDashArray: 5, padding: { left: 0, right: 0, top: 0 } },
    legend: { show: false }
  };
  const series = [{ name: 'Amount', data: [30, 60, 30, 40, 100, 80, 90, 50, 60, 40, 30, 60] }];
  return <ReactApexChart options={options} series={series} type="bar" height={140} />;
};
