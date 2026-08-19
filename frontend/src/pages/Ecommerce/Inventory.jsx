import { useState, useMemo, useCallback } from "react";
import PageHeader from "@/components/common/PageHeader/PageHeader";
import { productService } from "@/api/services/productService";
import { orderService } from "@/api/services/orderService";
import { auditService } from "@/api/services/auditService";
import { useAsync } from "@/hooks/useAsync";
import { formatCurrency } from "@/utils/formatters";
import { APP_CONFIG } from "@/config/appConfig";
import ProductFormModal from "./ProductFormModal";
import Dropdown from "@/components/common/Dropdown/Dropdown";
import Modal from "@/components/common/Modal/Modal";
import Button from "@/components/common/Button/Button";
import { confirmDialog } from "@/components/common/ConfirmDialog/confirmDialog";
import toast from "react-hot-toast";
import { FiBox, FiAlertCircle, FiActivity, FiPieChart, FiRefreshCw, FiPlusCircle, FiRepeat, FiLayers, FiShield, FiEdit2, FiTrash2, FiMoreVertical } from "react-icons/fi";
import { BiSync } from "react-icons/bi";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import "./Inventory.css";

const PLATFORMS = [
  "Amazon", "Flipkart", "Meesho", "Shopify", "WooCommerce", 
  "Myntra", "Ajio", "Warehouse", "Other"
];

const PLATFORM_COLORS = {
  Amazon: "#ff9900",
  Flipkart: "#2874f0",
  Meesho: "#ff3f6c",
  Shopify: "#95bf47",
  WooCommerce: "#96588a",
  Myntra: "#ff3f6c",
  Ajio: "#2e3192",
  Warehouse: "#607d8b",
  Other: "#888888"
};

export default function Inventory() {
  const [activeTab, setActiveTab] = useState("stock"); // "stock", "alerts", "logs", "analytics"
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("All Categories");
  const [filterStatus, setFilterStatus] = useState("All Statuses");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [restockModalOpen, setRestockModalOpen] = useState(false);
  const [restockProduct, setRestockProduct] = useState(null);
  const [restockQuantity, setRestockQuantity] = useState("");
  const [restockLocation, setRestockLocation] = useState("Main Warehouse");
  const [isRestocking, setIsRestocking] = useState(false);

  const [transferModalOpen, setTransferModalOpen] = useState(false);
  const [transferProduct, setTransferProduct] = useState(null);
  const [transferFrom, setTransferFrom] = useState("Main Warehouse");
  const [transferTo, setTransferTo] = useState("Local Store");
  const [transferQuantity, setTransferQuantity] = useState("");
  const [isTransferring, setIsTransferring] = useState(false);

  const [logFilterAction, setLogFilterAction] = useState("All");

  const loadProducts = useCallback(() => productService.list(), []);
  const { data: rawProducts, loading, refetch: refetchProducts } = useAsync(loadProducts, [], []);
  const products = useMemo(() => rawProducts || [], [rawProducts]);

  const loadOrders = useCallback(() => orderService.list(), []);
  const { data: rawOrders, refetch: refetchOrders } = useAsync(loadOrders, [], []);
  const orders = useMemo(() => rawOrders || [], [rawOrders]);

  const loadLogs = useCallback(() => auditService.list(), []);
  const { data: rawLogs, refetch: refetchLogs } = useAsync(loadLogs, [], []);
  
  const refetchAll = () => {
    refetchProducts();
    refetchOrders();
    refetchLogs();
  };

  // Compute aggregated stats
  const { totalUnits, costValue, retailValue } = useMemo(() => {
    let units = 0;
    let cost = 0;
    let retail = 0;
    products.forEach(p => {
      const qty = Number(p.initial_stock_qty) || 0;
      units += qty;
      cost += qty * (Number(p.cost_price) || 0);
      retail += qty * (Number(p.retail_price) || 0);
    });
    return { totalUnits: units, costValue: cost, retailValue: retail };
  }, [products]);

  // Compute platform wise stats
  const platformStats = useMemo(() => {
    const stats = {};
    PLATFORMS.forEach(plat => {
      stats[plat] = {
        liveSkus: 0,
        available: 0,
        reserved: 0,
        lowStockSkus: 0,
        outOfStockSkus: 0
      };
    });

    products.forEach(p => {
      const pPlatforms = Array.isArray(p.platforms) ? p.platforms : [];
      const qty = Number(p.initial_stock_qty) || 0;
      const limit = Number(p.safety_stock_limit) || 0;

      pPlatforms.forEach(plat => {
        if (stats[plat]) {
          stats[plat].liveSkus += 1;
          stats[plat].available += qty;
          // Dummy reserved calculation for now (could be from orders later)
          stats[plat].reserved += 0; 
          
          if (qty === 0) {
            stats[plat].outOfStockSkus += 1;
          } else if (qty <= limit) {
            stats[plat].lowStockSkus += 1;
          }
        }
      });
    });
    return stats;
  }, [products]);

  // Derive categories and statuses for filters
  const { categories, statuses } = useMemo(() => {
    const cats = new Set();
    const stats = new Set();
    products.forEach(p => {
      if (p.category) cats.add(p.category);
      if (p.status) stats.add(p.status);
    });
    return {
      categories: Array.from(cats),
      statuses: Array.from(stats)
    };
  }, [products]);

  // Filtered Products for Table
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchSearch = p.product_name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.sku_code?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCat = filterCategory === "All Categories" || p.category === filterCategory;
      const matchStatus = filterStatus === "All Statuses" || p.status === filterStatus;
      return matchSearch && matchCat && matchStatus;
    });
  }, [products, searchQuery, filterCategory, filterStatus]);

  // Total available units across platforms for progress bar calculation
  const totalPlatformUnits = useMemo(() => {
    return PLATFORMS.reduce((sum, plat) => sum + platformStats[plat].available, 0);
  }, [platformStats]);

  // Compute Alerts
  const alertsList = useMemo(() => {
    const list = [];
    const now = new Date();
    
    products.forEach(p => {
      if (p.status === "inactive" || p.status === "paused") return; // Filter out paused/inactive products

      const qty = Number(p.initial_stock_qty) || 0;
      const limit = Number(p.safety_stock_limit) || 0;
      const pOrders = orders.filter(o => o.product_name === p.product_name);
      
      const sales7d = pOrders.filter(o => o.created_at && (now - new Date(o.created_at)) <= 7 * 24 * 60 * 60 * 1000).reduce((sum, o) => sum + (Number(o.quantity) || 1), 0);
      const sales30d = pOrders.filter(o => o.created_at && (now - new Date(o.created_at)) <= 30 * 24 * 60 * 60 * 1000).reduce((sum, o) => sum + (Number(o.quantity) || 1), 0);
      
      const platformStr = Array.isArray(p.platforms) && p.platforms.length > 0 ? p.platforms.join(", ") : "All Platforms";

      if (qty === 0) {
        list.push({ product: p, type: "out_of_stock", message: "Critical: Out of Stock", platform: platformStr });
      } else if (qty <= limit) {
        list.push({ product: p, type: "low_stock", message: `Warning: Low Stock (Only ${qty} left)`, platform: platformStr });
      }

      if (qty > 0 && sales7d >= 10) {
         list.push({ product: p, type: "fast_depleting", message: `Trending: ${sales7d} sold in 7 days`, platform: platformStr });
      }
      
      const createdAgeDays = p.created_at ? (now - new Date(p.created_at)) / (1000 * 60 * 60 * 24) : 0;
      if (qty > 0 && createdAgeDays >= 30 && sales30d === 0) {
         list.push({ product: p, type: "dead_stock", message: `Dead Stock: No sales in 30 days`, platform: platformStr });
      }
    });
    return list;
  }, [products, orders]);

  const globalAlertsStats = useMemo(() => {
    const outOfStock = products.filter(p => (Number(p.initial_stock_qty) || 0) === 0).length;
    const lowStock = products.filter(p => {
      const q = Number(p.initial_stock_qty) || 0;
      const l = Number(p.safety_stock_limit) || 0;
      return q > 0 && q <= l;
    }).length;
    return { outOfStock, lowStock };
  }, [products]);

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleDelete = async (product) => {
    const ok = await confirmDialog({
      title: "Delete product?",
      text: `Product ${product.product_name} (${product.sku_code || 'N/A'}) will be permanently removed.`,
    });
    if (!ok) return;

    try {
      const idToDelete = product.id || product._id;
      await productService.remove(idToDelete);
      toast.success("Product deleted successfully");
      refetchAll();
    } catch (error) {
      toast.error(error?.message || "Failed to delete product");
    }
  };

  const handleModalSubmit = async (values) => {
    try {
      setIsSubmitting(true);
      if (selectedProduct) {
        await productService.update(selectedProduct.id || selectedProduct._id, values);
        toast.success("Product updated successfully");
      } else {
        await productService.create(values);
        toast.success("Product created successfully");
      }
      setIsModalOpen(false);
      refetchAll();
    } catch (error) {
      toast.error(error?.message || "Failed to save product");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePauseListings = async (product) => {
    const ok = await confirmDialog({
      title: "Pause Listings?",
      text: `Are you sure you want to pause all listings for ${product.product_name}? This will hide it from the platforms.`,
    });
    if (!ok) return;

    try {
      await productService.update(product.id || product._id, { status: "inactive" });
      toast.success("Product listings paused successfully!");
      refetchAll();
    } catch (error) {
      toast.error(error?.message || "Failed to pause listings");
    }
  };

  const handleRestockSubmit = async (e) => {
    e.preventDefault();
    if (!restockQuantity || Number(restockQuantity) <= 0) {
      toast.error("Please enter a valid quantity");
      return;
    }
    
    try {
      setIsRestocking(true);
      const currentQty = Number(restockProduct.initial_stock_qty) || 0;
      const newQty = currentQty + Number(restockQuantity);
      
      const currentWarehouseStocks = restockProduct.warehouse_stocks || {};
      const currentLocQty = currentWarehouseStocks[restockLocation] || 0;
      const newWarehouseStocks = {
        ...currentWarehouseStocks,
        [restockLocation]: currentLocQty + Number(restockQuantity)
      };
      
      await productService.update(restockProduct.id || restockProduct._id, { 
        initial_stock_qty: newQty,
        warehouse_stocks: newWarehouseStocks
      });
      toast.success(`Successfully added ${restockQuantity} units to ${restockLocation}!`);
      setRestockModalOpen(false);
      setRestockProduct(null);
      setRestockQuantity("");
      refetchAll();
    } catch (error) {
      toast.error(error?.message || "Failed to restock inventory");
    } finally {
      setIsRestocking(false);
    }
  };

  const handleTransferSubmit = async (e) => {
    e.preventDefault();
    if (!transferQuantity || Number(transferQuantity) <= 0) {
      toast.error("Please enter a valid quantity");
      return;
    }
    if (transferFrom === transferTo) {
      toast.error("Source and destination locations must be different");
      return;
    }
    
    try {
      setIsTransferring(true);
      await productService.transferStock(transferProduct.id || transferProduct._id, {
        from_location: transferFrom,
        to_location: transferTo,
        quantity: Number(transferQuantity)
      });
      toast.success(`Successfully transferred ${transferQuantity} units!`);
      setTransferModalOpen(false);
      setTransferProduct(null);
      setTransferQuantity("");
      refetchAll();
    } catch (error) {
      const msg = error.response?.data?.detail || error.message || "Failed to transfer stock";
      toast.error(msg);
    } finally {
      setIsTransferring(false);
    }
  };

  // Logs filtering logic
  const filteredLogs = useMemo(() => {
    if (!rawLogs) return [];
    // Only show logs related to products/orders which typically affect inventory
    let logs = rawLogs.filter(log => log.module === "Products" || log.module === "Orders");
    
    if (logFilterAction !== "All") {
      logs = logs.filter(log => log.action === logFilterAction);
    }
    return logs;
  }, [rawLogs, logFilterAction]);

  const uniqueActions = useMemo(() => {
    if (!rawLogs) return [];
    const actions = new Set();
    rawLogs.forEach(log => {
      if (log.module === "Products" || log.module === "Orders") {
        actions.add(log.action);
      }
    });
    return Array.from(actions);
  }, [rawLogs]);

  // Analytics Insights Processing
  const analyticsData = useMemo(() => {
    let totalRevenue = 0;
    let totalUnitsSold = 0;
    const platformMap = {};
    const productSalesMap = {};
    const dateSalesMap = {};

    // Process Orders
    const now = new Date();
    orders.forEach(order => {
      const qty = Number(order.quantity) || 0;
      const price = Number(order.unit_price) || 0;
      totalUnitsSold += qty;
      totalRevenue += (qty * price);

      // Platform distribution
      const plat = order.platform || "Direct";
      platformMap[plat] = (platformMap[plat] || 0) + qty;

      // Product top sellers
      const prodName = order.product_name || "Unknown";
      productSalesMap[prodName] = (productSalesMap[prodName] || 0) + qty;

      // Last 7 days trend
      if (order.created_at) {
        const orderDate = new Date(order.created_at);
        const diffDays = Math.floor((now - orderDate) / (1000 * 60 * 60 * 24));
        if (diffDays <= 7) {
          const dateStr = orderDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
          dateSalesMap[dateStr] = (dateSalesMap[dateStr] || 0) + qty;
        }
      }
    });

    // Format Charts Data
    const platformSalesData = Object.keys(platformMap).map((k, i) => ({
      name: k, 
      value: platformMap[k],
      color: ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'][i % 5]
    }));

    const topSellingProducts = Object.keys(productSalesMap)
      .map(k => ({ name: k, sales: productSalesMap[k] }))
      .sort((a, b) => b.sales - a.sales)
      .slice(0, 5);

    // Fill last 7 days to ensure continuous line chart
    const salesTrendData = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const dateStr = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      salesTrendData.push({
        date: dateStr,
        orders: dateSalesMap[dateStr] || 0
      });
    }

    // Health Score
    const lowOrOosCount = Object.values(platformStats).reduce((sum, stat) => sum + stat.lowStockSkus + stat.outOfStockSkus, 0);
    const totalLive = Object.values(platformStats).reduce((sum, stat) => sum + stat.liveSkus, 0);
    const healthScore = totalLive > 0 ? Math.max(0, 100 - Math.round((lowOrOosCount / totalLive) * 100)) : 100;

    // Smart Recommendations
    const smartInsights = [];
    
    topSellingProducts.forEach(ts => {
      const p = products.find(prod => prod.product_name === ts.name);
      if (p) {
        const stock = Number(p.initial_stock_qty) || 0;
        const dailyVelocity = ts.sales / 7;
        if (dailyVelocity > 0 && stock > 0 && (stock / dailyVelocity) <= 5) {
           smartInsights.push({
             type: 'warning',
             title: 'Fast Mover Running Out',
             message: `"${ts.name}" is selling at ${dailyVelocity.toFixed(1)} units/day. Current stock of ${stock} will deplete in ~${Math.ceil(stock/dailyVelocity)} days.`
           });
        }
      }
    });

    products.forEach(p => {
      if (Number(p.initial_stock_qty) > 20 && !productSalesMap[p.product_name]) {
        smartInsights.push({
          type: 'info',
          title: 'Dead Stock Alert',
          message: `"${p.product_name}" has ${p.initial_stock_qty} units in stock but 0 recent sales. Consider a discount campaign.`
        });
      }
    });

    return {
      totalRevenue,
      totalUnitsSold,
      healthScore,
      dailyVelocity: (totalUnitsSold / 30).toFixed(1),
      salesTrendData,
      platformSalesData,
      topSellingProducts,
      smartInsights: smartInsights.slice(0, 4)
    };
  }, [orders, products, platformStats]);

  return (
    <>
      <PageHeader
        title="Inventory Control Center"
        description="Platform-wise stock management & synchronization"
      />

      <div className="card mb-4">
        <div className="card-header bg-transparent border-bottom-0 pt-3 pb-0">
          <ul className="nav nav-tabs card-header-tabs">
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === "stock" ? "active" : ""}`} 
                onClick={() => setActiveTab("stock")}
                style={{ cursor: "pointer", fontWeight: activeTab === "stock" ? 600 : 400 }}
              >
                Stock control
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === "alerts" ? "active" : ""}`} 
                onClick={() => setActiveTab("alerts")}
                style={{ cursor: "pointer", fontWeight: activeTab === "alerts" ? 600 : 400 }}
              >
                Alerts ({alertsList.length})
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === "logs" ? "active" : ""}`} 
                onClick={() => setActiveTab("logs")}
                style={{ cursor: "pointer", fontWeight: activeTab === "logs" ? 600 : 400 }}
              >
                Stock Movement Logs
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === "analytics" ? "active" : ""}`} 
                onClick={() => setActiveTab("analytics")}
                style={{ cursor: "pointer", fontWeight: activeTab === "analytics" ? 600 : 400 }}
              >
                Analytics Insights
              </button>
            </li>
          </ul>
        </div>
        
        <div className="card-body">
          {activeTab === "stock" && (
            <div className="stock-control-tab">
              {/* Top Summary Cards */}
              <div className="row g-3 mb-4">
                <div className="col-md-3">
                  <div className="inventory-summary-card">
                    <div className="summary-icon bg-primary-soft text-primary"><FiBox /></div>
                    <div className="summary-details">
                      <div className="summary-label">Total Stocked Units</div>
                      <div className="summary-value">{totalUnits.toLocaleString()}</div>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="inventory-summary-card">
                    <div className="summary-icon bg-warning-soft text-warning"><FiPieChart /></div>
                    <div className="summary-details">
                      <div className="summary-label">Inventory Cost Value</div>
                      <div className="summary-value">{formatCurrency(costValue)}</div>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="inventory-summary-card">
                    <div className="summary-icon bg-success-soft text-success"><FiActivity /></div>
                    <div className="summary-details">
                      <div className="summary-label">Inventory Retail Value</div>
                      <div className="summary-value">{formatCurrency(retailValue)}</div>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="inventory-summary-card">
                    <div className="summary-icon bg-info-soft text-info"><FiAlertCircle /></div>
                    <div className="summary-details">
                      <div className="summary-label">Total Platforms</div>
                      <div className="summary-value">{PLATFORMS.length}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Platform Cards Grid */}
              <div className="row g-3">
                {PLATFORMS.map(platform => {
                  const stat = platformStats[platform];
                  return (
                    <div className="col-md-6 col-lg-3" key={platform}>
                      <div className="platform-inventory-card">
                        <div className="platform-card-header">
                          <div className="d-flex align-items-center gap-2">
                            <div className={`platform-icon-wrap icon-${platform.toLowerCase()}`}>
                              <FiBox /> {/* Or a dynamic icon depending on platform */}
                            </div>
                            <div>
                              <div className="platform-name">{platform}</div>
                              <div className="platform-live-skus">{stat.liveSkus} Live SKUs</div>
                            </div>
                          </div>
                          <div className="platform-status-badge">Synced</div>
                        </div>
                        
                        <div className="platform-card-body">
                          <div className="row text-center mb-3">
                            <div className="col-6 border-end">
                              <div className="stat-label">AVAILABLE</div>
                              <div className="stat-val">{stat.available} U</div>
                            </div>
                            <div className="col-6">
                              <div className="stat-label">RESERVED</div>
                              <div className="stat-val">{stat.reserved} U</div>
                            </div>
                          </div>
                          <div className="row text-center">
                            <div className="col-6 border-end">
                              <div className="stat-label">LOW STOCK</div>
                              <div className="stat-val">{stat.lowStockSkus} SKU(s)</div>
                            </div>
                            <div className="col-6">
                              <div className="stat-label">OUT OF STOCK</div>
                              <div className="stat-val">{stat.outOfStockSkus} SKU(s)</div>
                            </div>
                          </div>
                        </div>

                        <div className="platform-card-footer">
                          <span className="sync-time">Sync: Just now</span>
                          <span className="audit-text">Audit API</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Global Sales Platform Stock Distribution */}
              <div className="card mt-4 inventory-section-card">
                <div className="card-body">
                  <h6 className="section-title-upper">GLOBAL SALES PLATFORM STOCK DISTRIBUTION</h6>
                  
                  <div className="stock-distribution-bar mt-3 mb-3">
                    {totalPlatformUnits === 0 ? (
                      <div className="dist-segment empty" style={{ width: "100%" }}></div>
                    ) : (
                      PLATFORMS.map(plat => {
                        const units = platformStats[plat].available;
                        if (units === 0) return null;
                        const percent = (units / totalPlatformUnits) * 100;
                        return (
                          <div 
                            key={plat} 
                            className="dist-segment" 
                            style={{ width: `${percent}%`, backgroundColor: PLATFORM_COLORS[plat] }}
                            title={`${plat}: ${units} Units`}
                          ></div>
                        );
                      })
                    )}
                  </div>

                  <div className="stock-distribution-legends d-flex flex-wrap gap-4 mt-2">
                    {PLATFORMS.map(plat => (
                      <div className="dist-legend-item" key={plat}>
                        <span className="legend-dot" style={{ backgroundColor: PLATFORM_COLORS[plat] }}></span>
                        <span className="legend-text">{plat.toUpperCase()} {plat !== "Warehouse" && plat !== "Other" ? "STORE" : ""} ({platformStats[plat].available} UNITS)</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Inventory Command Actions */}
              <div className="card mt-4 inventory-section-card">
                <div className="card-body d-flex flex-wrap align-items-center justify-content-between gap-3">
                  <h6 className="section-title-upper mb-0">INVENTORY COMMAND ACTIONS</h6>
                  <div className="d-flex flex-wrap gap-2">
                    <button className="btn btn-primary btn-inventory-action"><BiSync className="me-2"/> Sync Inventory</button>
                    <button className="btn btn-outline-secondary btn-inventory-action"><FiRefreshCw className="me-2"/> Refresh Inventory</button>
                    <button className="btn btn-outline-secondary btn-inventory-action"><FiPlusCircle className="me-2"/> Restock Inventory</button>
                    <button className="btn btn-outline-secondary btn-inventory-action"><FiRepeat className="me-2"/> Transfer Stock</button>
                    <button className="btn btn-outline-secondary btn-inventory-action"><FiLayers className="me-2"/> Bulk Update Stock</button>
                    <button className="btn btn-outline-secondary btn-inventory-action"><FiShield className="me-2"/> Inventory Audit</button>
                  </div>
                </div>
              </div>

              {/* Table Filters */}
              <div className="d-flex flex-wrap gap-3 mt-4 mb-3 align-items-center justify-content-between">
                <div className="search-wrap" style={{ flex: "1", maxWidth: "400px" }}>
                  <input 
                    type="text" 
                    className="form-control rounded-pill bg-white" 
                    placeholder="Search stock allocations by name or SKU..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="d-flex gap-2">
                  <select 
                    className="form-select rounded-pill bg-white w-auto"
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                  >
                    <option value="All Categories">All Categories</option>
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <select 
                    className="form-select rounded-pill bg-white w-auto"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                  >
                    <option value="All Statuses">All Statuses</option>
                    {statuses.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>

              {/* Stock Allocations Table */}
              <div className="card inventory-section-card">
                <div className="table-responsive">
                  <table className="table inventory-table mb-0 align-middle">
                    <thead>
                      <tr>
                        <th>PRODUCT DETAILS</th>
                        <th className="text-center">TOTAL</th>
                        {PLATFORMS.map(plat => (
                          <th key={plat} className="text-center text-uppercase">{plat}</th>
                        ))}
                        <th className="text-center">THRESHOLDS</th>
                        <th className="text-end">ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProducts.length === 0 ? (
                        <tr>
                          <td colSpan={PLATFORMS.length + 4} className="text-center p-5 text-muted">
                            No inventory matches the search criteria.
                          </td>
                        </tr>
                      ) : (
                        filteredProducts.map(p => {
                          const pPlatforms = Array.isArray(p.platforms) ? p.platforms : [];
                          const qty = Number(p.initial_stock_qty) || 0;
                          return (
                            <tr key={p.id || p._id}>
                              <td>
                                <div className="d-flex align-items-center gap-2">
                                  {p.image ? (
                                    <img 
                                      src={p.image.startsWith('/') ? APP_CONFIG.apiBaseUrl.replace('/api/v1', '') + p.image : p.image} 
                                      alt={p.product_name} 
                                      style={{ width: 40, height: 40, borderRadius: 6, objectFit: 'cover' }} 
                                    />
                                  ) : (
                                    <div style={{ width: 40, height: 40, borderRadius: 6, backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FiBox className="text-muted"/></div>
                                  )}
                                  <div>
                                    <div style={{ fontWeight: 600, fontSize: 13, color: 'var(--color-text)' }}>{p.product_name}</div>
                                    <div style={{ fontSize: 11, color: 'var(--color-text-subtle)' }}>SKU: {p.sku_code || 'N/A'}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="text-center fw-bold">{qty}</td>
                              {PLATFORMS.map(plat => {
                                const hasPlat = pPlatforms.includes(plat);
                                return (
                                  <td key={plat} className="text-center">
                                    {hasPlat ? <span className="badge bg-light text-dark border">{qty}</span> : <span className="text-muted">-</span>}
                                  </td>
                                );
                              })}
                              <td className="text-center">
                                <span className="badge bg-warning-soft text-warning rounded-pill px-2">Min: {p.safety_stock_limit || 0}</span>
                              </td>
                              <td className="text-end">
                                <Dropdown
                                  trigger={({ onClick }) => (
                                    <button className="btn btn-sm btn-light" onClick={(e) => { e.stopPropagation(); onClick(); }}>
                                      <FiMoreVertical />
                                    </button>
                                  )}
                                  items={[
                                    { label: "Edit", icon: FiEdit2, onClick: () => handleEdit(p) },
                                    { label: "Delete", icon: FiTrash2, danger: true, onClick: () => handleDelete(p) }
                                  ]}
                                />
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === "alerts" && (
            <div className="alerts-control-tab">
              <div className="alert-queue-banner mt-2 mb-4 p-3 rounded" style={{ backgroundColor: '#fff5f5', border: '1px solid #ffe3e3' }}>
                <div className="d-flex align-items-center gap-2 text-danger mb-1">
                   <FiAlertCircle size={18}/> <strong style={{fontSize: 14}}>Critical Channel Restock Queue</strong>
                </div>
                <div style={{fontSize: 12, color: '#e03131'}}>
                  There are {globalAlertsStats.lowStock} platform listings running low and {globalAlertsStats.outOfStock} listings completely out of stock.
                </div>
              </div>

              <div className="card inventory-section-card">
                <div className="card-header bg-transparent py-3">
                  <h6 className="section-title-upper mb-0">Active Channel Alerts Log</h6>
                </div>
                <div className="table-responsive">
                  <table className="table inventory-table mb-0 align-middle">
                    <thead>
                      <tr>
                        <th>PRODUCT DETAILS</th>
                        <th>PLATFORM</th>
                        <th className="text-center">CURRENT STOCK</th>
                        <th className="text-center">MIN THRESHOLD</th>
                        <th>ALERT MESSAGE</th>
                        <th className="text-end">FULFILLMENT ACTION</th>
                      </tr>
                    </thead>
                    <tbody>
                      {alertsList.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="text-center p-5 text-muted">
                            <div className="d-flex align-items-center justify-content-center gap-2 text-success">
                              <FiActivity /> All platform stocks are above their safety threshold levels.
                            </div>
                          </td>
                        </tr>
                      ) : (
                        alertsList.map((alert, idx) => {
                          const p = alert.product;
                          const qty = Number(p.initial_stock_qty) || 0;
                          const limit = Number(p.safety_stock_limit) || 0;
                          return (
                            <tr key={idx}>
                              <td>
                                <div className="d-flex align-items-center gap-2">
                                  {p.image ? (
                                    <img 
                                      src={p.image.startsWith('/') ? APP_CONFIG.apiBaseUrl.replace('/api/v1', '') + p.image : p.image} 
                                      alt={p.product_name} 
                                      style={{ width: 40, height: 40, borderRadius: 6, objectFit: 'cover' }} 
                                    />
                                  ) : (
                                    <div style={{ width: 40, height: 40, borderRadius: 6, backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FiBox className="text-muted"/></div>
                                  )}
                                  <div>
                                    <div style={{ fontWeight: 600, fontSize: 13, color: 'var(--color-text)' }}>{p.product_name}</div>
                                    <div style={{ fontSize: 11, color: 'var(--color-text-subtle)' }}>SKU: {p.sku_code || 'N/A'}</div>
                                  </div>
                                </div>
                              </td>
                              <td style={{fontSize: 12, fontWeight: 500}}>{alert.platform}</td>
                              <td className="text-center fw-bold text-danger">{qty}</td>
                              <td className="text-center">
                                <span className="badge bg-warning-soft text-warning rounded-pill px-2">Min: {limit}</span>
                              </td>
                              <td>
                                <div style={{ fontSize: 12, fontWeight: 500, color: alert.type === 'out_of_stock' ? '#e03131' : (alert.type === 'low_stock' ? '#f59f00' : 'var(--color-text)') }}>
                                  {alert.message}
                                </div>
                              </td>
                              <td className="text-end">
                                <Dropdown
                                  trigger={({ onClick }) => (
                                    <button className="btn btn-sm btn-light" onClick={(e) => { e.stopPropagation(); onClick(); }}>
                                      Take Action <FiMoreVertical className="ms-1" />
                                    </button>
                                  )}
                                  items={[
                                    { label: "Restock", onClick: () => { setRestockProduct(p); setRestockQuantity(""); setRestockModalOpen(true); } },
                                    { label: "Pause Listings", danger: true, onClick: () => handlePauseListings(p) },
                                    { label: "Transfer Stock", onClick: () => { setTransferProduct(p); setTransferQuantity(""); setTransferModalOpen(true); } }
                                  ]}
                                />
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === "logs" && (
            <div className="logs-control-tab">
              <div className="d-flex align-items-center flex-wrap gap-2 mb-4">
                <span className="fw-semibold me-2" style={{ fontSize: 14 }}>Filter by Status:</span>
                <button 
                  className={`badge rounded-pill px-3 py-2 border-0 ${logFilterAction === "All" ? "bg-primary text-white" : "bg-light text-dark"}`}
                  style={{ cursor: 'pointer' }}
                  onClick={() => setLogFilterAction("All")}
                >
                  All Statuses
                </button>
                {uniqueActions.map(action => (
                  <button 
                    key={action}
                    className={`badge rounded-pill px-3 py-2 border-0 ${logFilterAction === action ? "bg-primary text-white" : "bg-light text-dark"}`}
                    style={{ cursor: 'pointer' }}
                    onClick={() => setLogFilterAction(action)}
                  >
                    {action}
                  </button>
                ))}
                {logFilterAction !== "All" && (
                  <button 
                    className="badge rounded-pill px-3 py-2 border-0 bg-danger-soft text-danger ms-auto"
                    style={{ cursor: 'pointer' }}
                    onClick={() => setLogFilterAction("All")}
                  >
                    Clear Filter ✕
                  </button>
                )}
              </div>

              <div className="card inventory-section-card">
                <div className="card-header bg-transparent py-3">
                  <h6 className="section-title-upper mb-0">Stock Movement & Action History</h6>
                </div>
                <div className="table-responsive">
                  <table className="table inventory-table mb-0 align-middle">
                    <thead>
                      <tr>
                        <th>TIMESTAMP</th>
                        <th>USER</th>
                        <th>ACTION</th>
                        <th>MODULE</th>
                        <th>DETAILS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredLogs.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="text-center p-5 text-muted">
                            No movement logs found for the selected filter.
                          </td>
                        </tr>
                      ) : (
                        filteredLogs.map(log => (
                          <tr key={log.id || log._id}>
                            <td style={{ fontSize: 13, color: 'var(--color-text-subtle)' }}>
                              {new Date(log.timestamp).toLocaleString()}
                            </td>
                            <td style={{ fontWeight: 500, fontSize: 13 }}>{log.user_name || 'System'}</td>
                            <td>
                              <span className={`badge rounded-pill ${
                                log.action === 'Create' ? 'bg-success-soft text-success' :
                                log.action === 'Update' ? 'bg-info-soft text-info' :
                                log.action === 'Delete' ? 'bg-danger-soft text-danger' :
                                'bg-light text-dark'
                              }`}>
                                {log.action}
                              </span>
                            </td>
                            <td style={{ fontSize: 13 }}>{log.module}</td>
                            <td style={{ fontSize: 13 }}>{log.details}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === "analytics" && (
            <div className="analytics-insights-tab">
              <div className="row g-3 mb-4">
                <div className="col-md-3">
                  <div className="inventory-summary-card">
                    <div className="summary-icon bg-success-soft text-success"><FiActivity /></div>
                    <div className="summary-details">
                      <div className="summary-label">Total Revenue (Simulated)</div>
                      <div className="summary-value">{formatCurrency(analyticsData.totalRevenue)}</div>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="inventory-summary-card">
                    <div className="summary-icon bg-primary-soft text-primary"><FiBox /></div>
                    <div className="summary-details">
                      <div className="summary-label">Total Units Sold</div>
                      <div className="summary-value">{analyticsData.totalUnitsSold.toLocaleString()}</div>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="inventory-summary-card">
                    <div className="summary-icon bg-info-soft text-info"><FiPieChart /></div>
                    <div className="summary-details">
                      <div className="summary-label">Inventory Health Score</div>
                      <div className="summary-value">{analyticsData.healthScore}% Healthy</div>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="inventory-summary-card">
                    <div className="summary-icon bg-warning-soft text-warning"><FiRepeat /></div>
                    <div className="summary-details">
                      <div className="summary-label">Avg Daily Velocity</div>
                      <div className="summary-value">{analyticsData.dailyVelocity} units/day</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row g-4 mb-4">
                <div className="col-md-8">
                  <div className="card inventory-section-card h-100">
                    <div className="card-header bg-transparent pt-3 pb-0 border-0">
                      <h6 className="section-title-upper">SALES TREND (LAST 7 DAYS)</h6>
                    </div>
                    <div className="card-body" style={{ height: '300px' }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={analyticsData.salesTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                          <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#888' }} />
                          <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#888' }} />
                          <Tooltip contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                          <Line type="monotone" dataKey="orders" stroke="#4dabf7" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card inventory-section-card h-100">
                    <div className="card-header bg-transparent pt-3 pb-0 border-0">
                      <h6 className="section-title-upper">SALES BY PLATFORM</h6>
                    </div>
                    <div className="card-body d-flex flex-column align-items-center justify-content-center" style={{ height: '300px' }}>
                      {analyticsData.platformSalesData.length > 0 ? (
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={analyticsData.platformSalesData}
                              cx="50%"
                              cy="50%"
                              innerRadius={60}
                              outerRadius={80}
                              paddingAngle={5}
                              dataKey="value"
                            >
                              {analyticsData.platformSalesData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <Tooltip contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                            <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: 12 }} />
                          </PieChart>
                        </ResponsiveContainer>
                      ) : (
                        <div className="text-muted text-center">No platform data available</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="row g-4">
                <div className="col-md-6">
                  <div className="card inventory-section-card h-100">
                    <div className="card-header bg-transparent pt-3 pb-2 border-0">
                      <h6 className="section-title-upper mb-0">TOP 5 BEST-SELLING PRODUCTS</h6>
                    </div>
                    <div className="card-body">
                      {analyticsData.topSellingProducts.length > 0 ? (
                        <ResponsiveContainer width="100%" height={250}>
                          <BarChart data={analyticsData.topSellingProducts} layout="vertical" margin={{ top: 0, right: 20, left: 0, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#eee" />
                            <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#888' }} />
                            <YAxis type="category" dataKey="name" width={100} axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#555' }} />
                            <Tooltip cursor={{ fill: '#f8f9fa' }} contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                            <Bar dataKey="sales" fill="#20c997" radius={[0, 4, 4, 0]} barSize={20} />
                          </BarChart>
                        </ResponsiveContainer>
                      ) : (
                        <div className="text-muted text-center p-4">No sales data to display top products.</div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card inventory-section-card h-100">
                    <div className="card-header bg-transparent pt-3 pb-2 border-0">
                      <h6 className="section-title-upper mb-0">SMART INSIGHTS & WARNINGS</h6>
                    </div>
                    <div className="card-body p-0">
                      <ul className="list-group list-group-flush">
                        {analyticsData.smartInsights.length > 0 ? (
                          analyticsData.smartInsights.map((insight, idx) => (
                            <li key={idx} className="list-group-item p-3 border-0 border-bottom">
                              <div className="d-flex gap-3 align-items-start">
                                <div className={`mt-1 text-${insight.type === 'warning' ? 'danger' : 'info'}`}>
                                  <FiAlertCircle size={20} />
                                </div>
                                <div>
                                  <h6 className="mb-1" style={{ fontSize: 14 }}>{insight.title}</h6>
                                  <p className="mb-0 text-muted" style={{ fontSize: 13 }}>{insight.message}</p>
                                </div>
                              </div>
                            </li>
                          ))
                        ) : (
                          <li className="list-group-item p-4 text-center text-muted border-0">
                            <div className="text-success mb-2"><FiActivity size={24} /></div>
                            No active warnings. Your inventory health is optimal!
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <ProductFormModal 
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
        initialValues={selectedProduct}
        submitting={isSubmitting}
      />

      <Modal
        open={restockModalOpen}
        onClose={() => { setRestockModalOpen(false); setRestockProduct(null); }}
        title="Restock Inventory"
        size="md"
        footer={
          <div className="d-flex justify-content-end gap-2 w-100">
            <Button variant="secondary" onClick={() => setRestockModalOpen(false)} disabled={isRestocking}>Cancel</Button>
            <Button variant="primary" onClick={handleRestockSubmit} loading={isRestocking}>Confirm Restock</Button>
          </div>
        }
      >
        {restockProduct && (
          <form id="restockForm" onSubmit={handleRestockSubmit}>
            <div className="mb-3">
              <label className="form-label fw-bold">Product</label>
              <div>{restockProduct.product_name} <span className="text-muted">(SKU: {restockProduct.sku_code})</span></div>
            </div>
            <div className="mb-3">
              <label className="form-label fw-bold">Current Stock</label>
              <div>{restockProduct.initial_stock_qty || 0} Units Total</div>
            </div>
            <div className="mb-3">
              <label className="form-label fw-bold">Restock Location</label>
              <select className="form-select" value={restockLocation} onChange={(e) => setRestockLocation(e.target.value)}>
                {["Main Warehouse", "Local Store", "Amazon FBA", "Retail Outlet"].map(loc => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label fw-bold">Quantity to Add</label>
              <input 
                type="number" 
                className="form-control" 
                value={restockQuantity}
                onChange={(e) => setRestockQuantity(e.target.value)}
                placeholder="Enter units to add..."
                min="1"
                required
                autoFocus
              />
            </div>
          </form>
        )}
      </Modal>

      <Modal
        open={transferModalOpen}
        onClose={() => { setTransferModalOpen(false); setTransferProduct(null); }}
        title="Transfer Stock"
        size="md"
        footer={
          <div className="d-flex justify-content-end gap-2 w-100">
            <Button variant="secondary" onClick={() => setTransferModalOpen(false)} disabled={isTransferring}>Cancel</Button>
            <Button variant="primary" onClick={handleTransferSubmit} loading={isTransferring}>Transfer Now</Button>
          </div>
        }
      >
        {transferProduct && (
          <form id="transferForm" onSubmit={handleTransferSubmit}>
            <div className="mb-3">
              <label className="form-label fw-bold">Product</label>
              <div>{transferProduct.product_name} <span className="text-muted">(SKU: {transferProduct.sku_code})</span></div>
              <div className="mt-1" style={{ fontSize: 12 }}>
                <strong>Total Stock:</strong> {transferProduct.initial_stock_qty || 0}
                <br/>
                <strong>Current Distribution:</strong>{' '}
                {transferProduct.warehouse_stocks && Object.keys(transferProduct.warehouse_stocks).length > 0
                  ? Object.entries(transferProduct.warehouse_stocks).map(([loc, q]) => `${loc}: ${q}`).join(' | ')
                  : `Main Warehouse: ${transferProduct.initial_stock_qty || 0}`}
              </div>
            </div>
            
            <div className="row g-2 mb-3">
              <div className="col-6">
                <label className="form-label fw-bold">From Location</label>
                <select className="form-select" value={transferFrom} onChange={(e) => setTransferFrom(e.target.value)}>
                  {["Main Warehouse", "Local Store", "Amazon FBA", "Retail Outlet"].map(loc => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>
              <div className="col-6">
                <label className="form-label fw-bold">To Location</label>
                <select className="form-select" value={transferTo} onChange={(e) => setTransferTo(e.target.value)}>
                  {["Main Warehouse", "Local Store", "Amazon FBA", "Retail Outlet"].map(loc => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">Quantity to Transfer</label>
              <input 
                type="number" 
                className="form-control" 
                value={transferQuantity}
                onChange={(e) => setTransferQuantity(e.target.value)}
                placeholder="Enter units to transfer..."
                min="1"
                required
              />
            </div>
          </form>
        )}
      </Modal>
    </>
  );
}
