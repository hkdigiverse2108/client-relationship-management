import React, { useMemo } from "react";
import ReactApexChart from "react-apexcharts";
import { TenantSupportChart } from '../components/charts/TenantSupportCharts';

// Simple native Date formatting utilities
const formatYYYYMM = (date) => {
  const d = new Date(date);
  const m = String(d.getMonth() + 1).padStart(2, '0');
  return `${d.getFullYear()}-${m}`;
};

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount || 0);
};

const formatDate = (dateStr) => {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
};

const ForecastStatCard = ({ title, value, percentage, iconClass, iconBg, chartColor, chartBg, chartData, chartName="Share", chartCategory="Stats" }) => (
  <div className="col-md-6 col-xl-3 d-flex">
    <div className="card flex-fill">
      <div className="card-body">
        <div className="row justify-content-between">
          <div className="col-8">
            <div className="flex-fill">
              <div className="rounded d-inline-flex align-items-center justify-content-center mb-3">
                <span className={`avatar avatar-lg rounded ${iconBg}`}><i className={`${iconClass} fs-20`}></i></span>
              </div>
              <div className="d-flex align-items-center mb-2">
                <h3 className="me-2 fs-20 mb-0">{value}</h3>
                <div className="d-flex flex-column justify-content-between align-items-center">
                  <span className="badge bg-transparent-purple d-inline-flex align-items-center">
                    <i className="ti ti-arrow-wave-right-down me-1"></i>
                    {percentage}
                  </span>
                </div>
              </div>
              <span className="fs-12 fw-medium text-gray-5">{title}</span>
            </div>
          </div>
          <div className="col-4">
            <div className="text-end">
              <TenantSupportChart color={chartColor} data={chartData} bgColor={chartBg} name={chartName} category={chartCategory} />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default function ForecastView({ deals, forecastStats }) {
  // 1. Metrics are calculated on backend and passed down
  const metrics = forecastStats || {
    total_pipeline: 0,
    weighted_pipeline: 0,
    won_value: 0,
    percentages: { total_pipeline: 0, weighted_pipeline: 0, expected_this_month: 0, won_value: 0 },
    growth: { total_pipeline: 0, weighted_pipeline: 0, expected_this_month: 0, won_value: 0 },
    monthly_forecast: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    hot_deals: []
  };

  // 2. Prepare Chart Data
  const chartData = metrics.monthly_forecast || [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  // 3. High Priority Deals
  const hotDeals = useMemo(() => {
    return metrics.hot_deals || [];
  }, [metrics.hot_deals]);

  // Find the index of the maximum value to highlight it
  const maxVal = Math.max(...chartData);
  const maxIndex = chartData.indexOf(maxVal);

  const dynamicColors = chartData.map((_, i) => i === maxIndex ? '#E70D0D' : '#F4CACB');
  const dynamicColorStops = chartData.map((_, i) => {
    if (i === maxIndex) return [{ offset: 0, color: "#E70D0D", opacity: 1 }, { offset: 100, color: "#F26522", opacity: 1 }];
    return [{ offset: 0, color: "#F4CACB", opacity: 1 }, { offset: 100, color: "#FDE0D3", opacity: 1 }];
  });
  const dynamicLabelColors = chartData.map((_, i) => i === maxIndex ? '#FFFFFF' : '#374151');

  const options = {
    chart: { type: 'bar', toolbar: { show: false } },
    plotOptions: { bar: { columnWidth: '55%', borderRadius: 6, borderRadiusApplication: 'around', distributed: true, colors: { backgroundBarColors: ['#F8F9FA'], backgroundBarOpacity: 1, backgroundBarRadius: 6 } } },
    colors: dynamicColors,
    fill: { type: 'gradient', gradient: { type: 'vertical', shadeIntensity: 1, opacityFrom: 1, opacityTo: 1, colorStops: dynamicColorStops } },
    xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], axisBorder: { show: false }, axisTicks: { show: false }, labels: { show: true, offsetY: -20, style: { colors: dynamicLabelColors, fontSize: '13px', fontWeight: 500 } } },
    dataLabels: { enabled: true, formatter: function (val, opt) { return opt.dataPointIndex === maxIndex ? (val > 0 ? "₹" + (val/1000).toFixed(1) + "k" : "") : ""; }, offsetY: -22, style: { fontSize: '12px', fontWeight: 500, colors: ["#fff"] }, background: { enabled: true, foreColor: '#fff', padding: 5, borderRadius: 8, backgroundColor: '#1F2937', borderWidth: 0 } },
    legend: { show: false },
    yaxis: { tickAmount: 5, labels: { formatter: (val) => "₹" + (val/1000).toFixed(0) + "k", style: { fontSize: '13px', fontWeight: 500, colors: '#6B7280' }, padding: { right: 0, left: 0 } } },
    grid: { strokeDashArray: 4, yaxis: { lines: { show: true } }, padding: { top: 0, bottom: -30, right: -5 } }
  };
  const series = [{ name: 'Expected Revenue', data: chartData }];

  return (
    <div className="forecast-view animate-fade-in p-3">
      <div className="row g-3 mb-4">
        <ForecastStatCard 
          title="Total Pipeline" 
          value={formatCurrency(metrics.total_pipeline)} 
          percentage={`${metrics.growth.total_pipeline > 0 ? '+' : ''}${metrics.growth.total_pipeline}%`} 
          iconBg="bg-primary-transparent" iconClass="ti ti-ticket" chartColor="#0C4B5E" chartBg="#F8F9FA" 
          chartData={metrics.percentages.total_pipeline} 
          chartName="Pipeline %" chartCategory="Total"
        />
        <ForecastStatCard 
          title="Weighted Forecast" 
          value={formatCurrency(metrics.weighted_pipeline)} 
          percentage={`${metrics.growth.weighted_pipeline > 0 ? '+' : ''}${metrics.growth.weighted_pipeline}%`} 
          iconBg="bg-transparent-purple" iconClass="ti ti-ticket" chartColor="#AB47BC" chartBg="#F7EEF9" 
          chartData={metrics.percentages.weighted_pipeline} 
          chartName="Weighted %" chartCategory="Forecast"
        />
        <ForecastStatCard 
          title="Expected This Month" 
          value={formatCurrency(metrics.expected_this_month)} 
          percentage={`${metrics.growth.expected_this_month > 0 ? '+' : ''}${metrics.growth.expected_this_month}%`} 
          iconBg="bg-transparent-skyblue text-skyblue" iconClass="ti ti-ticket" chartColor="#0DCAF0" chartBg="#E9FAFE" 
          chartData={metrics.percentages.expected_this_month} 
          chartName="Expected %" chartCategory="This Month"
        />
        <ForecastStatCard 
          title="Won Value" 
          value={formatCurrency(metrics.won_value)} 
          percentage={`${metrics.growth.won_value > 0 ? '+' : ''}${metrics.growth.won_value}%`} 
          iconBg="bg-transparent-success text-success" iconClass="ti ti-ticket" chartColor="#28C76F" chartBg="#EAF9F1" 
          chartData={metrics.percentages.won_value} 
          chartName="Win Rate %" chartCategory="Total"
        />
      </div>

      <div className="row g-4">
        <div className="col-12 col-xl-8">
          <div className="card shadow-sm border h-100 p-4">
            <h5 className="mb-4">12-Month Revenue Forecast</h5>
            <div style={{ height: "350px" }}>
              <ReactApexChart options={options} series={series} type="bar" height={375} />
            </div>
          </div>
        </div>

        <div className="col-12 col-xl-4">
          <div className="card shadow-sm border h-100 p-4">
            <h5 className="mb-4">Hot Deals Closing Soon</h5>
            <div className="d-flex flex-column gap-3 overflow-auto hide-scrollbar" style={{ height: "365px", scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              <style>{`.hide-scrollbar::-webkit-scrollbar { display: none !important; }`}</style>
              {hotDeals.length === 0 ? (
                <div className="text-muted text-center py-4">No hot deals closing in next 30 days.</div>
              ) : (
                hotDeals.map(d => (
                  <div key={d.id} className="d-flex justify-content-between align-items-center p-2 rounded border">
                    <div>
                      <div className="fw-bold fs-14 text-dark text-truncate" style={{ maxWidth: "150px" }}>{d.title}</div>
                      <div className="text-muted fs-12">{formatDate(d.expected_close_date)}</div>
                    </div>
                    <div className="text-end">
                      <div className="fw-bold text-success fs-14">{formatCurrency(d.amount)}</div>
                      <div className="badge bg-primary-transparent text-primary border-0">{d.probability}%</div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
