import React from 'react';
import ReactApexChart from 'react-apexcharts';

// Custom Inventory Charts
const SalesTrendChart = () => {
  const options = {
    chart: { height: 310, type: 'area', toolbar: { show: false }, sparkline: { enabled: false } },
    colors: ['#f25c05'],
    stroke: { show: true, curve: 'straight', width: 2 },
    fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.4, opacityTo: 0.05, stops: [0, 90, 100] } },
    xaxis: { categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], axisBorder: { show: false }, axisTicks: { show: false }, labels: { style: { colors: '#6B7280', fontSize: '12px' } } },
    yaxis: { min: 0, max: 5000, labels: { formatter: (val) => "₹" + val.toLocaleString(), style: { colors: '#6B7280', fontSize: '12px' } } },
    grid: { show: true, borderColor: '#f1f1f1', strokeDashArray: 3 },
    dataLabels: { enabled: false },
    tooltip: { enabled: true, y: { formatter: (val) => "₹" + val.toLocaleString() } }
  };
  const series = [{ name: "Sales", data: [1200, 2400, 1800, 4200, 3100, 4800, 3900] }];
  return <ReactApexChart options={options} series={series} type="area" height={310} />;
};

const SalesPlatformChart = () => {
  const options = {
    chart: { type: 'radialBar', sparkline: { enabled: true } },
    plotOptions: { radialBar: { startAngle: -120, endAngle: 240, hollow: { size: '20%' }, track: { background: '#f2f2f2', strokeWidth: '100%', margin: 6 }, dataLabels: { show: false } } },
    stroke: { lineCap: 'round' },
    colors: ['#f25c05', '#1B84FF', '#FFC107', '#AB47BC'],
    labels: ['Amazon', 'Shopify', 'Website', 'Flipkart'],
    tooltip: { enabled: true }
  };
  const series = [45, 25, 20, 10];
  return (
    <div>
       <ReactApexChart options={options} series={series} type="radialBar" height={270} />
       <div className="d-flex flex-wrap justify-content-center gap-4 mt-3">
         <div className="d-flex align-items-center fs-13"><span className="rounded-circle me-2" style={{width: '8px', height: '8px', backgroundColor: '#f25c05'}}></span> Amazon</div>
         <div className="d-flex align-items-center fs-13"><span className="rounded-circle me-2" style={{width: '8px', height: '8px', backgroundColor: '#1B84FF'}}></span> Shopify</div>
         <div className="d-flex align-items-center fs-13"><span className="rounded-circle me-2" style={{width: '8px', height: '8px', backgroundColor: '#FFC107'}}></span> Website</div>
         <div className="d-flex align-items-center fs-13"><span className="rounded-circle me-2" style={{width: '8px', height: '8px', backgroundColor: '#AB47BC'}}></span> Flipkart</div>
       </div>
    </div>
  );
};

const TopProductsChart = () => {
  const options = {
    chart: { height: 260, type: 'bar', toolbar: { show: false } },
    colors: ['#f25c05'],
    grid: { borderColor: '#E5E7EB', strokeDashArray: 5, padding: { top: -20, bottom: -10 } },
    plotOptions: { bar: { borderRadius: 4, horizontal: true, barHeight: '40%' } },
    dataLabels: { enabled: true, textAnchor: 'start', offsetX: 10, style: { colors: ['#6B7280'] }, formatter: (val) => val + " Units" },
    xaxis: { categories: ['iPhone 14 Pro', 'MacBook Air', 'Sony WH-1000XM5', 'AirPods Pro', 'Galaxy S23'], labels: { show: false }, axisBorder: { show: false }, axisTicks: { show: false } },
    yaxis: { labels: { style: { colors: '#111827', fontSize: '13px' } } },
    tooltip: { enabled: true }
  };
  const series = [{ name: 'Units Sold', data: [850, 620, 480, 310, 250] }];
  return <ReactApexChart options={options} series={series} type="bar" height={260} />;
};

const AnalyticsTab = () => {
  return (
    <div className="analytics-insights-tab">
      
      {/* 4 Summary Cards Container */}
      <div className="card mb-4 shadow-sm border-0" style={{ borderRadius: '8px', overflow: 'hidden' }}>
        <div className="card-body p-0">
          <div className="row g-0">
            {/* Card 1: Total Revenue */}
            <div className="col-12 col-md-6 col-xxl-3 border-end">
              <div className="p-4 text-center">
                <div className="d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '42px', height: '42px', borderRadius: '12px', border: '1.5px solid #ffdec2', backgroundColor: '#fff9f5' }}>
                  <i className="ti ti-currency-rupee fs-20" style={{ color: '#ff7722' }}></i>
                </div>
                <h3 className="fw-bold mb-1" style={{ fontSize: '24px', color: '#111827' }}>₹4,50,000</h3>
                <p className="text-muted mb-0 fs-14">Total Revenue</p>
              </div>
            </div>
            
            {/* Card 2: Total Units Sold */}
            <div className="col-12 col-md-6 col-xxl-3 border-end">
              <div className="p-4 text-center">
                <div className="d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '42px', height: '42px', borderRadius: '12px', border: '1.5px solid #c7d2d8', backgroundColor: '#f0f5f7' }}>
                  <i className="ti ti-box fs-20" style={{ color: '#3f576e' }}></i>
                </div>
                <h3 className="fw-bold mb-1" style={{ fontSize: '24px', color: '#111827' }}>2,384</h3>
                <p className="text-muted mb-0 fs-14">Total Units Sold</p>
              </div>
            </div>
            
            {/* Card 3: Inventory Health Score */}
            <div className="col-12 col-md-6 col-xxl-3 border-end">
              <div className="p-4 text-center">
                <div className="d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '42px', height: '42px', borderRadius: '12px', border: '1.5px solid #d1d5db', backgroundColor: '#f3f4f6' }}>
                  <i className="ti ti-heartbeat fs-20" style={{ color: '#4b5563' }}></i>
                </div>
                <h3 className="fw-bold mb-1" style={{ fontSize: '24px', color: '#111827' }}>85%</h3>
                <p className="text-muted mb-0 fs-14">Inventory Health</p>
              </div>
            </div>
            
            {/* Card 4: Avg Daily Velocity */}
            <div className="col-12 col-md-6 col-xxl-3">
              <div className="p-4 text-center">
                <div className="d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '42px', height: '42px', borderRadius: '12px', border: '1.5px solid #bfdbfe', backgroundColor: '#eff6ff' }}>
                  <i className="ti ti-chart-arrows fs-20" style={{ color: '#3b82f6' }}></i>
                </div>
                <h3 className="fw-bold mb-1" style={{ fontSize: '24px', color: '#111827' }}>112</h3>
                <p className="text-muted mb-0 fs-14">Avg Daily Velocity</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4 mb-4">
        {/* Sales Trend (Last 7 Days) */}
        <div className="col-12 col-xl-8">
          <div className="card h-100 mb-0">
            <div className="card-header border-bottom">
              <h5 className="card-title mb-0">Sales Trend (Last 7 Days)</h5>
            </div>
            <div className="card-body">
              <SalesTrendChart />
            </div>
          </div>
        </div>
        
        {/* Sales by Platform */}
        <div className="col-12 col-xl-4">
          <div className="card h-100 mb-0">
            <div className="card-header border-bottom">
              <h5 className="card-title mb-0">Sales by Platform</h5>
            </div>
            <div className="card-body d-flex flex-column justify-content-center">
              <SalesPlatformChart />
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4 mb-4">
        {/* Top 5 Best-Selling Products */}
        <div className="col-12 col-xl-6">
          <div className="card h-100 mb-0">
            <div className="card-header border-bottom">
              <h5 className="card-title mb-0">Top 5 Best-Selling Products</h5>
            </div>
            <div className="card-body">
              <TopProductsChart />
            </div>
          </div>
        </div>
        
        {/* Smart Insights & Warnings */}
        <div className="col-12 col-xl-6">
          <div className="card h-100 mb-0">
            <div className="card-header border-bottom d-flex align-items-center justify-content-between">
              <h5 className="card-title mb-0">Smart Insights & Warnings</h5>
              <span className="badge bg-primary-transparent text-primary badge-sm"><i className="ti ti-sparkles me-1"></i>AI Insight</span>
            </div>
            <div className="card-body">
              
              <div className="d-flex align-items-start mb-4 p-3 bg-warning-transparent rounded border border-warning-subtle">
                <span className="avatar avatar-sm bg-warning text-white rounded flex-shrink-0 me-3 shadow-sm">
                  <i className="ti ti-bolt fs-16"></i>
                </span>
                <div>
                  <h6 className="fw-semibold mb-1 text-dark">Fast Moving Product Alert</h6>
                  <p className="text-muted fs-13 mb-0">
                    <strong className="text-dark">iPhone 14 Pro</strong> is selling 3x faster this week. Consider restocking before the weekend to avoid stockouts.
                  </p>
                </div>
              </div>

              <div className="d-flex align-items-start mb-4 p-3 bg-danger-transparent rounded border border-danger-subtle">
                <span className="avatar avatar-sm bg-danger text-white rounded flex-shrink-0 me-3 shadow-sm">
                  <i className="ti ti-trending-down fs-16"></i>
                </span>
                <div>
                  <h6 className="fw-semibold mb-1 text-dark">Dead Stock Warning</h6>
                  <p className="text-muted fs-13 mb-0">
                    <strong className="text-dark">Wireless Earbuds V1</strong> hasn't sold in 45 days. Recommended action: create a discount bundle or flash sale.
                  </p>
                </div>
              </div>

              <div className="d-flex align-items-start p-3 bg-success-transparent rounded border border-success-subtle">
                <span className="avatar avatar-sm bg-success text-white rounded flex-shrink-0 me-3 shadow-sm">
                  <i className="ti ti-discount-check fs-16"></i>
                </span>
                <div>
                  <h6 className="fw-semibold mb-1 text-dark">Platform Optimization</h6>
                  <p className="text-muted fs-13 mb-0">
                    Your Shopify store has the highest margin this month. Shifting 15% inventory from Amazon could yield a <strong className="text-success">+5% profit increase</strong>.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsTab;
