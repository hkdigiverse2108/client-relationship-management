import React from 'react';
import ReactApexChart from 'react-apexcharts';

const RecurringRevenueChart = () => {
  const options = {
    chart: {
      type: 'area',
      height: 350,
      toolbar: {
        show: false
      },
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
        dynamicAnimation: {
          speed: 350
        }
      }
    },
    colors: ['#0dcaf0', '#ff6f28'],
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth',
      width: [3, 3]
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.4,
        opacityTo: 0.05,
        stops: [0, 90, 100]
      }
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          colors: '#6b7280',
          fontSize: '13px'
        }
      }
    },
    yaxis: [
      {
        title: {
          text: 'Monthly Recurring Revenue (MRR)',
          style: {
            color: '#0dcaf0',
            fontWeight: 500
          }
        },
        labels: {
          style: {
            colors: '#6b7280'
          },
          formatter: (value) => {
            return "₹" + value + "k";
          }
        }
      },
      {
        opposite: true,
        title: {
          text: 'Annual Recurring Revenue (ARR)',
          style: {
            color: '#ff6f28',
            fontWeight: 500
          }
        },
        labels: {
          style: {
            colors: '#6b7280'
          },
          formatter: (value) => {
            return "₹" + value + "L";
          }
        }
      }
    ],
    grid: {
      borderColor: '#f1f1f1',
      strokeDashArray: 4,
      yaxis: {
        lines: {
          show: true
        }
      }
    },
    legend: {
      position: 'top',
      horizontalAlign: 'right',
      offsetY: -20,
      markers: {
        radius: 12
      }
    },
    tooltip: {
      theme: 'light',
      y: {
        formatter: function (val, { seriesIndex }) {
          return seriesIndex === 0 ? "₹" + val + "k" : "₹" + val + "L";
        }
      }
    }
  };

  const series = [
    {
      name: 'MRR',
      data: [35, 41, 46, 52, 58, 65, 71, 78, 86, 92, 105, 115]
    },
    {
      name: 'ARR',
      data: [4.2, 4.9, 5.5, 6.2, 6.9, 7.8, 8.5, 9.3, 10.3, 11.0, 12.6, 13.8]
    }
  ];

  return (
    <div className="card flex-fill w-100 mb-3">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h4 className="card-title mb-0">Recurring Revenue (MRR vs ARR)</h4>
        <div className="dropdown">
          <button className="btn btn-white btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown">
            This Year
          </button>
          <ul className="dropdown-menu dropdown-menu-end">
            <li><a className="dropdown-item" href="#">This Year</a></li>
            <li><a className="dropdown-item" href="#">Last Year</a></li>
          </ul>
        </div>
      </div>
      <div className="card-body">
        <ReactApexChart options={options} series={series} type="area" height={350} />
      </div>
    </div>
  );
};

export default RecurringRevenueChart;
