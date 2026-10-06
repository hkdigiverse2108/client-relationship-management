import React, { useState, useEffect, useMemo } from 'react';
import ReactApexChart from 'react-apexcharts';
import axiosClient from '../../api/axiosClient';
import { APP_CONFIG } from '../../config/appConfig';

// Custom Inventory Charts
const SalesTrendChart = ({ data }) => {
  const options = {
    chart: { height: 310, type: 'area', toolbar: { show: false }, sparkline: { enabled: false } },
    colors: ['#f25c05'],
    stroke: { show: true, curve: 'straight', width: 2 },
    fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.4, opacityTo: 0.05, stops: [0, 90, 100] } },
    xaxis: { categories: data.categories, axisBorder: { show: false }, axisTicks: { show: false }, labels: { style: { colors: '#6B7280', fontSize: '12px' } } },
    yaxis: { labels: { formatter: (val) => "₹" + val.toLocaleString(), style: { colors: '#6B7280', fontSize: '12px' } } },
    grid: { show: true, borderColor: '#f1f1f1', strokeDashArray: 3 },
    dataLabels: { enabled: false },
    tooltip: { enabled: true, y: { formatter: (val) => "₹" + val.toLocaleString() } }
  };
  const series = [{ name: "Sales", data: data.series }];
  return <ReactApexChart options={options} series={series} type="area" height={310} />;
};

const SalesPlatformChart = ({ data, platformsList }) => {
  const PLATFORM_BRAND_COLORS = {
    Amazon: "#ff9900", Flipkart: "#2874f0", Meesho: "#f43397", Shopify: "#95bf47",
    WooCommerce: "#96588a", Myntra: "#ff3f6c", Ajio: "#2c4152", Warehouse: "#607d8b",
  };
  const predefinedColors = ['#007bff', '#28a745', '#dc3545', '#ffc107', '#17a2b8', '#6610f2', '#e83e8c', '#fd7e14'];
  
  const getPlatformColor = (platform, index = 0) => {
    return PLATFORM_BRAND_COLORS[platform] || predefinedColors[index % predefinedColors.length];
  };

  const labels = data.map(d => d.name);
  const series = data.map(d => d.value);
  const colors = labels.map((l, i) => getPlatformColor(l, i));

  const options = {
    chart: { type: 'radialBar', sparkline: { enabled: true } },
    plotOptions: { radialBar: { startAngle: -120, endAngle: 240, hollow: { size: '20%' }, track: { background: '#f2f2f2', strokeWidth: '100%', margin: 6 }, dataLabels: { show: false } } },
    stroke: { lineCap: 'round' },
    colors: colors,
    labels: labels,
    tooltip: { enabled: true }
  };
  
  return (
    <div>
       {series.length > 0 ? (
         <ReactApexChart options={options} series={series} type="radialBar" height={270} />
       ) : (
         <div className="d-flex align-items-center justify-content-center text-muted" style={{ height: 270 }}>No Data</div>
       )}
       <div className="d-flex flex-wrap justify-content-center gap-4 mt-3">
         {labels.map((lbl, idx) => (
           <div key={lbl} className="d-flex align-items-center fs-13">
             <span className="rounded-circle me-2" style={{width: '8px', height: '8px', backgroundColor: colors[idx]}}></span> {lbl}
           </div>
         ))}
       </div>
    </div>
  );
};

const TopProductsChart = ({ data }) => {
  const categories = data.map(d => d.name);
  const seriesData = data.map(d => d.value);

  const options = {
    chart: { height: 260, type: 'bar', toolbar: { show: false } },
    colors: ['#f25c05'],
    grid: { borderColor: '#E5E7EB', strokeDashArray: 5, padding: { top: -20, bottom: -10 } },
    plotOptions: { bar: { borderRadius: 4, horizontal: true, barHeight: '40%' } },
    dataLabels: { enabled: true, textAnchor: 'start', offsetX: 10, style: { colors: ['#6B7280'] }, formatter: (val) => val + " Units" },
    xaxis: { categories: categories, labels: { show: false }, axisBorder: { show: false }, axisTicks: { show: false } },
    yaxis: { labels: { style: { colors: '#111827', fontSize: '13px' }, maxWidth: 150 } },
    tooltip: { enabled: true }
  };
  const series = [{ name: 'Units Sold', data: seriesData }];
  return (
    <div style={{minHeight: 260}}>
      {categories.length > 0 ? (
        <ReactApexChart options={options} series={series} type="bar" height={260} />
      ) : (
        <div className="d-flex align-items-center justify-content-center text-muted h-100">No Data</div>
      )}
    </div>
  );
};

const AnalyticsTab = () => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ordRes, prodRes, platRes] = await Promise.all([
          axiosClient.get('/orders'),
          axiosClient.get('/products'),
          axiosClient.get('/platforms')
        ]);
        setOrders(ordRes.data?.data || ordRes.data || ordRes || []);
        setProducts(prodRes.data?.data || prodRes.data || prodRes || []);
        setPlatforms(platRes.data?.data || platRes.data || platRes || []);
      } catch (err) {
        console.error("Error fetching analytics data", err);
      }
    };
    fetchData();
  }, []);

  const stats = useMemo(() => {
    let totalRevenue = 0;
    let totalUnitsSold = 0;
    
    // Revenue and Units Sold
    orders.forEach(o => {
      if (o.order_status !== 'cancelled' && o.order_status !== 'returned') {
        const qty = Number(o.quantity) || 0;
        const price = Number(o.unit_price) || 0;
        const discount = Number(o.discount) || 0;
        const tax = Number(o.tax) || 0;
        totalUnitsSold += qty;
        totalRevenue += (qty * price) - discount + tax;
      }
    });

    // Velocity (assuming all orders are within 30 days for demo, calculate daily average)
    const velocity = Math.round(totalUnitsSold / 30) || 0;

    // Inventory Health
    let healthyCount = 0;
    let totalStockedSkus = 0;
    products.forEach(p => {
      const initial = Number(p.initial_stock_qty) || 0;
      const safety = Number(p.safety_stock_limit) || 10;
      if (initial > 0) {
        totalStockedSkus++;
        if (initial >= safety) healthyCount++;
      }
    });
    const healthPercent = totalStockedSkus > 0 ? Math.round((healthyCount / totalStockedSkus) * 100) : 100;

    // Sales Trend (Last 7 Days)
    const trendData = { categories: [], series: [] };
    const today = new Date();
    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      trendData.categories.push(d.toLocaleDateString('en-US', { weekday: 'short' }));
      // Compute revenue for this day
      let dayRev = 0;
      orders.forEach(o => {
        if (o.created_at) {
          const oDate = new Date(o.created_at);
          if (oDate.toDateString() === d.toDateString() && o.order_status !== 'cancelled') {
             const qty = Number(o.quantity) || 0;
             const price = Number(o.unit_price) || 0;
             dayRev += (qty * price) - (Number(o.discount) || 0) + (Number(o.tax) || 0);
          }
        }
      });
      // If we don't have historical real data, maybe add a small randomizer for display? No, let's keep it real.
      trendData.series.push(dayRev);
    }
    
    // Platform distribution
    const platStats = {};
    orders.forEach(o => {
      if (o.order_status !== 'cancelled') {
        const plat = o.platform || "Direct";
        platStats[plat] = (platStats[plat] || 0) + (Number(o.quantity) || 0);
      }
    });
    const platformData = Object.keys(platStats).map(k => ({ name: k, value: platStats[k] })).filter(d => d.value > 0).sort((a,b) => b.value - a.value).slice(0, 4);

    // Top Products
    const prodStats = {};
    orders.forEach(o => {
       if (o.order_status !== 'cancelled' && o.product_name) {
          prodStats[o.product_name] = (prodStats[o.product_name] || 0) + (Number(o.quantity) || 0);
       }
    });
    const topProducts = Object.keys(prodStats).map(k => ({ name: k, value: prodStats[k] })).sort((a,b) => b.value - a.value).slice(0, 5);

    // --- Smart Insights Logic ---
    let fastestProduct = null;
    let fastestVelocity = 0;
    
    const recentProdStats = {};
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    orders.forEach(o => {
       if (o.order_status !== 'cancelled' && o.product_name && o.created_at) {
          const oDate = new Date(o.created_at);
          if (oDate >= sevenDaysAgo) {
             recentProdStats[o.product_name] = (recentProdStats[o.product_name] || 0) + (Number(o.quantity) || 0);
             if (recentProdStats[o.product_name] > fastestVelocity) {
                 fastestVelocity = recentProdStats[o.product_name];
                 fastestProduct = o.product_name;
             }
          }
       }
    });

    let deadStockProduct = null;
    let maxDeadStock = 0;
    products.forEach(p => {
       if (!prodStats[p.product_name] && p.product_name) {
          const stock = Number(p.initial_stock_qty) || 0;
          if (stock > maxDeadStock) {
              maxDeadStock = stock;
              deadStockProduct = p.product_name;
          }
       }
    });
    
    if (!deadStockProduct && topProducts.length > 0) {
       const allSoldNames = Object.keys(prodStats);
       let leastSold = allSoldNames[0];
       let leastQty = prodStats[leastSold];
       allSoldNames.forEach(name => {
           if (prodStats[name] < leastQty) {
               leastQty = prodStats[name];
               leastSold = name;
           }
       });
       deadStockProduct = leastSold;
    }

    let bestPlatform = null;
    let bestPlatformRev = 0;
    const platRevStats = {};
    orders.forEach(o => {
      if (o.order_status !== 'cancelled') {
        const plat = o.platform || "Direct";
        const rev = (Number(o.quantity) || 0) * (Number(o.unit_price) || 0) - (Number(o.discount) || 0) + (Number(o.tax) || 0);
        platRevStats[plat] = (platRevStats[plat] || 0) + rev;
        if (platRevStats[plat] > bestPlatformRev) {
           bestPlatformRev = platRevStats[plat];
           bestPlatform = plat;
        }
      }
    });

    const insights = {
       fastestProduct: fastestProduct || (topProducts[0] ? topProducts[0].name : "N/A"),
       fastestVelocity: fastestVelocity || (topProducts[0] ? topProducts[0].value : 0),
       deadStockProduct: deadStockProduct || "N/A",
       maxDeadStock: maxDeadStock || 0,
       bestPlatform: bestPlatform || "N/A",
       bestPlatformRev: bestPlatformRev || 0
    };

    return { totalRevenue, totalUnitsSold, healthPercent, velocity, trendData, platformData, topProducts, insights };
  }, [orders, products]);

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
                <h3 className="fw-bold mb-1" style={{ fontSize: '24px', color: '#111827' }}>₹{stats.totalRevenue.toLocaleString()}</h3>
                <p className="text-muted mb-0 fs-14">Total Revenue</p>
              </div>
            </div>
            
            {/* Card 2: Total Units Sold */}
            <div className="col-12 col-md-6 col-xxl-3 border-end">
              <div className="p-4 text-center">
                <div className="d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '42px', height: '42px', borderRadius: '12px', border: '1.5px solid #c7d2d8', backgroundColor: '#f0f5f7' }}>
                  <i className="ti ti-box fs-20" style={{ color: '#3f576e' }}></i>
                </div>
                <h3 className="fw-bold mb-1" style={{ fontSize: '24px', color: '#111827' }}>{stats.totalUnitsSold.toLocaleString()}</h3>
                <p className="text-muted mb-0 fs-14">Total Units Sold</p>
              </div>
            </div>
            
            {/* Card 3: Inventory Health Score */}
            <div className="col-12 col-md-6 col-xxl-3 border-end">
              <div className="p-4 text-center">
                <div className="d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '42px', height: '42px', borderRadius: '12px', border: '1.5px solid #d1d5db', backgroundColor: '#f3f4f6' }}>
                  <i className="ti ti-heartbeat fs-20" style={{ color: '#4b5563' }}></i>
                </div>
                <h3 className="fw-bold mb-1" style={{ fontSize: '24px', color: '#111827' }}>{stats.healthPercent}%</h3>
                <p className="text-muted mb-0 fs-14">Inventory Health</p>
              </div>
            </div>
            
            {/* Card 4: Avg Daily Velocity */}
            <div className="col-12 col-md-6 col-xxl-3">
              <div className="p-4 text-center">
                <div className="d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '42px', height: '42px', borderRadius: '12px', border: '1.5px solid #bfdbfe', backgroundColor: '#eff6ff' }}>
                  <i className="ti ti-chart-arrows fs-20" style={{ color: '#3b82f6' }}></i>
                </div>
                <h3 className="fw-bold mb-1" style={{ fontSize: '24px', color: '#111827' }}>{stats.velocity}</h3>
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
              <SalesTrendChart data={stats.trendData} />
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
              <SalesPlatformChart data={stats.platformData} platformsList={platforms} />
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
              <TopProductsChart data={stats.topProducts} />
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
              {stats.insights.fastestProduct !== "N/A" && (
                <div className="d-flex align-items-start mb-4 p-3 bg-warning-transparent rounded border border-warning-subtle">
                  <span className="avatar avatar-sm bg-warning text-white rounded flex-shrink-0 me-3 shadow-sm">
                    <i className="ti ti-bolt fs-16"></i>
                  </span>
                  <div>
                    <h6 className="fw-semibold mb-1 text-dark">Fast Moving Product Alert</h6>
                    <p className="text-muted fs-13 mb-0">
                      <strong className="text-dark">{stats.insights.fastestProduct}</strong> is selling fast this week ({stats.insights.fastestVelocity} units). Consider restocking to avoid stockouts.
                    </p>
                  </div>
                </div>
              )}

              {stats.insights.deadStockProduct !== "N/A" && (
                <div className="d-flex align-items-start mb-4 p-3 bg-danger-transparent rounded border border-danger-subtle">
                  <span className="avatar avatar-sm bg-danger text-white rounded flex-shrink-0 me-3 shadow-sm">
                    <i className="ti ti-trending-down fs-16"></i>
                  </span>
                  <div>
                    <h6 className="fw-semibold mb-1 text-dark">Dead Stock / Low Sales Warning</h6>
                    <p className="text-muted fs-13 mb-0">
                      <strong className="text-dark">{stats.insights.deadStockProduct}</strong> has very low or zero recent sales. Recommended action: create a discount bundle or flash sale.
                    </p>
                  </div>
                </div>
              )}

              {stats.insights.bestPlatform !== "N/A" && (
                <div className="d-flex align-items-start p-3 bg-success-transparent rounded border border-success-subtle">
                  <span className="avatar avatar-sm bg-success text-white rounded flex-shrink-0 me-3 shadow-sm">
                    <i className="ti ti-discount-check fs-16"></i>
                  </span>
                  <div>
                    <h6 className="fw-semibold mb-1 text-dark">Platform Optimization</h6>
                    <p className="text-muted fs-13 mb-0">
                      Your <strong className="text-success">{stats.insights.bestPlatform}</strong> store has the highest revenue (₹{stats.insights.bestPlatformRev.toLocaleString()}). Focus your marketing efforts here for maximum ROI.
                    </p>
                  </div>
                </div>
              )}

              {stats.insights.fastestProduct === "N/A" && stats.insights.deadStockProduct === "N/A" && stats.insights.bestPlatform === "N/A" && (
                <div className="text-center text-muted p-4">
                  Not enough data to generate insights yet. Start adding orders!
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsTab;
