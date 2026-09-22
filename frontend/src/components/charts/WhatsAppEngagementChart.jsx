import React from 'react';
import ReactApexChart from 'react-apexcharts';

const WhatsAppEngagementChart = () => {
  const options = {
    chart: {
      type: 'bar',
      height: 250,
      toolbar: { show: false },
      parentHeightOffset: 0
    },
    colors: ['#25D366', '#A7F3D0'], // WhatsApp green and a lighter soft green
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '35%',
        borderRadius: 4,
        endingShape: 'rounded'
      },
    },
    dataLabels: { enabled: false },
    stroke: { show: true, width: 3, colors: ['transparent'] },
    xaxis: {
      categories: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
      axisBorder: { show: true, color: '#E5E7EB' },
      axisTicks: { show: false },
      labels: {
        style: { colors: '#6B7280', fontSize: '12px', fontWeight: 500 }
      }
    },
    yaxis: { show: false },
    grid: { show: false },
    legend: {
      position: 'bottom',
      horizontalAlign: 'left',
      markers: { radius: 12 },
      itemMargin: { horizontal: 15, vertical: 10 },
      labels: { colors: '#6B7280' }
    },
    fill: { opacity: 1 }
  };

  const series = [
    { name: 'Received', data: [45, 60, 42, 70, 55, 38, 41] },
    { name: 'Sent', data: [35, 45, 38, 55, 48, 30, 32] }
  ];

  return (
    <div className="row align-items-center h-100">
      <div className="col-md-8 mb-3 mb-md-0">
        <p className="text-muted fs-11 text-uppercase fw-semibold mb-0" style={{ letterSpacing: '0.5px' }}>Sent vs. Received</p>
        <div style={{ marginLeft: '-10px' }}>
            <ReactApexChart options={options} series={series} type="bar" height={250} />
        </div>
      </div>
      <div className="col-md-4 d-flex align-items-center justify-content-center">
        <div className="bg-success-transparent rounded text-center p-3 w-100 h-100 d-flex flex-column justify-content-center border border-success-transparent" style={{ minHeight: '220px' }}>
         <div className="mb-3">
  <span 
    className="avatar avatar-md text-success rounded-circle d-inline-flex align-items-center justify-content-center"
    
  >
    <i className="ti ti-clock-hour-3 fs-3"></i>
  </span>
</div>
          <p className="text-muted fs-11 text-uppercase fw-semibold mb-1" style={{ letterSpacing: '0.5px' }}>Avg. Response Time</p>
          <h2 className="text-success fw-bold mb-2">1.8m</h2>
          <p className="fs-12 text-muted mb-0">98% within SLA threshold</p>
        </div>
      </div>
    </div>
  );
};

export default WhatsAppEngagementChart;
