import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import CustomDataTable from '../common/CustomDataTable';
import FilterBar from '../common/FilterBar';
import ProductFormModal from '../products/ProductFormModal';
import axiosClient from '../../api/axiosClient';
import { APP_CONFIG } from '../../config/appConfig';
import toast from 'react-hot-toast';


const AlertsTab = () => {
  const [products, setProducts] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterPlatform, setFilterPlatform] = useState("");
  const [filterAlertType, setFilterAlertType] = useState("");
  const [categories, setCategories] = useState([]);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [currentEditProduct, setCurrentEditProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const [prodRes, platRes, catRes] = await Promise.all([
          axiosClient.get('/products'),
          axiosClient.get('/platforms'),
          axiosClient.get('/categories')
        ]);
        const fetchedData = prodRes.data?.data || prodRes.data || prodRes || [];
        const fetchedPlatforms = platRes.data?.data || platRes.data || platRes || [];
        const fetchedCategories = catRes.data?.data || catRes.data || catRes || [];
        setProducts(Array.isArray(fetchedData) ? fetchedData : []);
        setPlatforms(Array.isArray(fetchedPlatforms) ? fetchedPlatforms : []);
        setCategories(Array.isArray(fetchedCategories) ? fetchedCategories : []);
      } catch (error) {
        console.error('Error fetching inventory products for alerts:', error);
        toast.error('Failed to fetch inventory');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleEditClick = (product) => {
    // The alert object might have id modified to id_platform, so find original
    const originalProduct = products.find(p => p._id === product._id) || product;
    setCurrentEditProduct(originalProduct);
    setIsProductModalOpen(true);
  };

  const handleSaveProduct = async (formData) => {
    try {
      if (currentEditProduct) {
        await axiosClient.put(`/products/${currentEditProduct._id}`, formData);
        toast.success('Product updated successfully');
      } else {
        await axiosClient.post('/products', formData);
        toast.success('Product created successfully');
      }
      // Re-fetch to update alerts
      const prodRes = await axiosClient.get('/products');
      const fetchedData = prodRes.data?.data || prodRes.data || prodRes || [];
      setProducts(Array.isArray(fetchedData) ? fetchedData : []);
      setIsProductModalOpen(false);
    } catch (error) {
      console.error(error);
      let errorMsg = 'Failed to save product';
      if (error.response?.data?.detail) {
        errorMsg = Array.isArray(error.response.data.detail) ? error.response.data.detail[0]?.msg : error.response.data.detail;
      }
      toast.error(errorMsg);
    }
  };

  const { alertsData, globalAlertsStats } = useMemo(() => {
    let rawAlerts = [];
    
    products.forEach(p => {
      const qty = Number(p.initial_stock_qty) || 0;
      const safetyLimit = Number(p.safety_stock_limit) || 10;
      
      const productPlatforms = Array.isArray(p.platforms) && p.platforms.length > 0 ? p.platforms : [];
      const platformNames = platforms.filter(pl => pl.status === 'Active').map(pl => pl.name);
      const validPlatforms = productPlatforms.filter(plat => platformNames.includes(plat));
      
      validPlatforms.forEach(plat => {
        const platQty = p.platform_stocks?.[plat] || 0;
        if (platQty === 0) {
          rawAlerts.push({
            ...p,
            id: `${p._id}_${plat}`,
            current_stock: platQty,
            threshold: safetyLimit,
            platform: plat,
            alert_type: "out_of_stock",
            alert_message: "Critical: Out of Stock"
          });
        } else if (platQty < safetyLimit) {
          rawAlerts.push({
            ...p,
            id: `${p._id}_${plat}`,
            current_stock: platQty,
            threshold: safetyLimit,
            platform: plat,
            alert_type: "low_stock",
            alert_message: `Warning: Low Stock (Only ${platQty} left)`
          });
        }
      });
    });

    const stats = {
      outOfStock: rawAlerts.filter(a => a.alert_type === 'out_of_stock').length,
      lowStock: rawAlerts.filter(a => a.alert_type === 'low_stock').length,
    };

    // Filter alerts
    const filteredAlerts = rawAlerts.filter(a => {
      if (filterPlatform && a.platform !== filterPlatform) return false;
      if (filterAlertType && a.alert_type !== filterAlertType) return false;
      if (searchQuery && !a.product_name?.toLowerCase().includes(searchQuery.toLowerCase()) && !a.sku_code?.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    });

    return { alertsData: filteredAlerts, globalAlertsStats: stats };
  }, [products, platforms, searchQuery, filterPlatform, filterAlertType]);

  const clearFilters = () => {
    setSearchQuery("");
    setFilterPlatform("");
    setFilterAlertType("");
  };

  const filterConfig = [
    {
      type: 'search',
      value: searchQuery,
      onChange: setSearchQuery,
      placeholder: 'Search Alert Products...'
    },
    {
      type: 'select',
      value: filterPlatform,
      onChange: setFilterPlatform,
      options: [{ value: '', label: 'All Platforms' }, ...platforms.filter(p => p.status === 'Active').map(p => ({ value: p.name, label: p.name }))]
    },
    {
      type: 'select',
      value: filterAlertType,
      onChange: setFilterAlertType,
      options: [
        { value: '', label: 'All Alerts' },
        { value: 'out_of_stock', label: 'Out of Stock' },
        { value: 'low_stock', label: 'Low Stock' }
      ]
    }
  ];

  const hasFilters = filterPlatform || filterAlertType || searchQuery;

  const columns = [
    {
      name: 'Product Details',
      selector: row => row.product_name,
      cell: (row) => (
        <div className="d-flex align-items-center">
          <Link to="#" className="avatar avatar-md border rounded me-2 d-flex align-items-center justify-content-center text-decoration-none bg-primary text-white">
            {row.image ? (
              <img src={row.image.startsWith('http') ? row.image : `${new URL(APP_CONFIG.apiBaseUrl).origin}${row.image}`} className="img-fluid rounded" alt="img" />
            ) : (
              <span>{row.product_name?.charAt(0)?.toUpperCase()}</span>
            )}
          </Link>
          <div>
            <h6 className="fw-medium mb-0"><Link to="#">{row.product_name}</Link></h6>
            <span className="fs-12 fw-normal text-muted d-block mt-1">SKU: {row.sku_code}</span>
          </div>
        </div>
      ),
      minWidth: '250px'
    },
    {
      name: 'Platform',
      selector: row => row.platform,
      cell: (row) => <span className="fw-medium text-dark">{row.platform}</span>,
      minWidth: '150px'
    },
    {
      name: 'Current Stock',
      selector: row => row.current_stock,
      cell: (row) => (
        <span className="fw-medium text-dark">
          {row.current_stock} Units
        </span>
      ),
      center: true,
      minWidth: '120px'
    },
    {
      name: 'Min Threshold',
      selector: row => row.threshold,
      cell: (row) => (
        <span className="badge bg-warning-transparent text-dark badge-sm">Min: {row.threshold}</span>
      ),
      center: true,
      minWidth: '130px'
    },
    {
      name: 'Alert Message',
      selector: row => row.alert_message,
      cell: (row) => (
        <div className="d-flex align-items-center">
          <span className={`badge ${row.alert_type === 'out_of_stock' ? 'bg-danger-transparent text-danger' : 'bg-warning-transparent text-warning'} border d-inline-flex align-items-center`}>
            <i className="ti ti-alert-circle me-1"></i>
            {row.alert_message}
          </span>
        </div>
      ),
      minWidth: '220px'
    },
    {
      name: 'Action',
      cell: (row) => (
        <button 
          className="btn btn-sm btn-outline-primary d-flex align-items-center"
          onClick={() => handleEditClick(row)}
        >
          <i className="ti ti-edit me-1"></i> Update Stock
        </button>
      ),
      minWidth: '140px'
    }
  ];

  return (
    <div className="alerts-control-tab">
      
      {/* Custom Animated Alert Banner */}
      <style>
        {`
          @keyframes pulseSoft {
            0% { box-shadow: 0 0 0 0 rgba(242, 92, 5, 0.4); }
            70% { box-shadow: 0 0 0 12px rgba(242, 92, 5, 0); }
            100% { box-shadow: 0 0 0 0 rgba(242, 92, 5, 0); }
          }
          @keyframes slideInDownCustom {
            from { opacity: 0; transform: translateY(-20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .custom-alert-banner {
            background: linear-gradient(135deg, #fff3e8 0%, #ffffff 100%);
            border: 1px solid #ffe1c9;
            border-left: 4px solid #f25c05;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(242, 92, 5, 0.08);
            transition: all 0.3s ease;
            animation: slideInDownCustom 0.5s ease-out;
          }
          .custom-alert-banner:hover {
            box-shadow: 0 6px 24px rgba(242, 92, 5, 0.12);
            transform: translateY(-2px);
          }
          .custom-alert-icon {
            animation: pulseSoft 2s infinite;
            background: #f25c05;
            color: #fff;
            width: 48px;
            height: 48px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            font-size: 24px;
          }
          .btn-orange-custom {
            background-color: #f25c05;
            color: #fff;
            border: none;
            border-radius: 8px;
            padding: 8px 16px;
            font-weight: 500;
            transition: all 0.3s ease;
          }
          .btn-orange-custom:hover {
            background-color: #d85204;
            color: #fff;
            transform: scale(1.02);
          }
        `}
      </style>
      
      <div className="custom-alert-banner p-4 mb-4 d-flex align-items-center justify-content-between position-relative overflow-hidden">
        <div className="d-flex align-items-center gap-4 z-1">
          <div className="custom-alert-icon flex-shrink-0">
            <i className="ti ti-bell-ringing"></i>
          </div>
          <div>
            <h5 className="fw-bold mb-1" style={{ color: '#d85204' }}>Inventory Attention Required</h5>
            <p className="mb-0 text-muted fs-14">
              We've detected <strong className="text-dark">{globalAlertsStats.lowStock}</strong> listings running low and <strong className="text-danger">{globalAlertsStats.outOfStock}</strong> listings completely out of stock.
            </p>
          </div>
        </div>
       
        {/* Decorative background element */}
        <i className="ti ti-alert-triangle position-absolute opacity-10" style={{ fontSize: '140px', right: '-10px', bottom: '-30px', transform: 'rotate(-15deg)', color: '#f25c05' }}></i>
      </div>

      {/* Active Channel Alerts Log Table */}
      <div className="card mb-4">
        <div className="card-header border-bottom d-flex align-items-center justify-content-between flex-wrap row-gap-3">
          <h5 className="card-title mb-0">Active Channel Alerts Log</h5>
          <FilterBar 
            filters={filterConfig} 
            onClear={clearFilters} 
            hasActiveFilters={hasFilters} 
          />
        </div>
        <div className="card-body p-0">
          <div className="custom-datatable-filter table-responsive">
            <CustomDataTable columns={columns} data={alertsData} progressPending={loading} />
          </div>
        </div>
      </div>
      <ProductFormModal 
        open={isProductModalOpen} 
        onClose={() => { setIsProductModalOpen(false); setCurrentEditProduct(null); }} 
        onSave={handleSaveProduct}
        initialData={currentEditProduct}
        categories={categories}
        platforms={platforms.filter(p => p.status === 'Active')}
      />
    </div>
  );
};

export default AlertsTab;
