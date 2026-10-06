import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import CustomDataTable from '../common/CustomDataTable';
import CustomSelect from '../common/CustomSelect';
import FilterBar from '../common/FilterBar';
import ProductFormModal from '../products/ProductFormModal';
import axiosClient from '../../api/axiosClient';
import { APP_CONFIG } from '../../config/appConfig';
import toast from 'react-hot-toast';



const StockTab = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [categories, setCategories] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const platformNames = useMemo(() => platforms.filter(p => p.status === 'Active').map(p => p.name), [platforms]);
  
  
  const predefinedColors = ['#007bff', '#28a745', '#dc3545', '#ffc107', '#17a2b8', '#6610f2', '#e83e8c', '#fd7e14'];
  const PLATFORM_BRAND_COLORS = {
    Amazon: "#ff9900",
    Flipkart: "#2874f0",
    Meesho: "#f43397",
    Shopify: "#95bf47",
    WooCommerce: "#96588a",
    Myntra: "#ff3f6c",
    Ajio: "#2c4152",
    Warehouse: "#607d8b",
  };
  const getPlatformColor = (platform, index = 0) => {
    return PLATFORM_BRAND_COLORS[platform] || predefinedColors[index % predefinedColors.length];
  };
  
  // Modals state
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [currentEditProduct, setCurrentEditProduct] = useState(null);
  const [confirmDeleteModal, setConfirmDeleteModal] = useState({ isOpen: false, id: null, name: '' });

  const fetchProductsAndCategories = async () => {
    try {
      setLoading(true);
      const [prodRes, catRes, platRes] = await Promise.all([
        axiosClient.get('/products'),
        axiosClient.get('/categories'),
        axiosClient.get('/platforms')
      ]);
      const fetchedProducts = prodRes.data?.data || prodRes.data || prodRes || [];
      const fetchedCategories = catRes.data?.data || catRes.data || catRes || [];
      const fetchedPlatforms = platRes.data?.data || platRes.data || platRes || [];
      setProducts(Array.isArray(fetchedProducts) ? fetchedProducts : []);
      setCategories(Array.isArray(fetchedCategories) ? fetchedCategories : []);
      setPlatforms(Array.isArray(fetchedPlatforms) ? fetchedPlatforms : []);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductsAndCategories();
  }, []);

  const handleEditClick = (product) => {
    setCurrentEditProduct(product);
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
      fetchProductsAndCategories();
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

  const handleDeleteProduct = async () => {
    if (!confirmDeleteModal.id) return;
    try {
      await axiosClient.delete(`/products/${confirmDeleteModal.id}`);
      toast.success('Product deleted successfully');
      fetchProductsAndCategories();
      setConfirmDeleteModal({ isOpen: false, id: null, name: '' });
    } catch (error) {
      console.error(error);
      toast.error('Failed to delete product');
    }
  };

  const { totalUnits, costValue, retailValue, platformStats, filteredProducts } = useMemo(() => {
    let tUnits = 0;
    let cValue = 0;
    let rValue = 0;
    const stats = {};
    platformNames.forEach(plat => {
      stats[plat] = { available: 0, reserved: 0, lowStockSkus: 0, outOfStockSkus: 0 };
    });

    const filtered = products.filter(p => {
      let match = true;
      if (filterCategory && p.category !== filterCategory) match = false;
      if (filterStatus && p.status !== (filterStatus.toLowerCase())) match = false;
      if (searchQuery && !p.product_name?.toLowerCase().includes(searchQuery.toLowerCase()) && !p.sku_code?.toLowerCase().includes(searchQuery.toLowerCase())) match = false;
      return match;
    });

    filtered.forEach(p => {
      const qty = Number(p.initial_stock_qty) || 0;
      tUnits += qty;
      cValue += (Number(p.cost_price) || 0) * qty;
      rValue += (Number(p.retail_price) || 0) * qty;
      
      const safetyLimit = Number(p.safety_stock_limit) || 10;
      
      const productPlatforms = Array.isArray(p.platforms) && p.platforms.length > 0 ? p.platforms : [];
      const validPlatforms = productPlatforms.filter(plat => platformNames.includes(plat));
      
      validPlatforms.forEach(plat => {
        const platQty = p.platform_stocks?.[plat] || 0;
        if (!stats[plat]) return;
        stats[plat].available += platQty;
        stats[plat].reserved += Math.floor(platQty * 0.1); // Mock 10% reserved
        if (platQty === 0) {
          stats[plat].outOfStockSkus += 1;
        } else if (platQty < safetyLimit) {
          stats[plat].lowStockSkus += 1;
        }
      });
    });

    return { totalUnits: tUnits, costValue: cValue, retailValue: rValue, platformStats: stats, filteredProducts: filtered };
  }, [products, filterCategory, filterStatus, searchQuery, platformNames]);

  const clearFilters = () => {
    setFilterCategory("");
    setFilterStatus("");
    setSearchQuery("");
  };

  const uniqueCategories = [...new Set(products.map(p => p.category).filter(Boolean))].map(c => ({ value: c, label: c }));

  const filterConfig = [
    {
      type: 'search',
      value: searchQuery,
      onChange: setSearchQuery,
      placeholder: 'Search Products...'
    },
    {
      type: 'select',
      value: filterCategory,
      onChange: setFilterCategory,
      options: [{ value: '', label: 'All Categories' }, ...uniqueCategories]
    },
    {
      type: 'select',
      value: filterStatus,
      onChange: setFilterStatus,
      options: [
        { value: '', label: 'All Statuses' },
        { value: 'active', label: 'Active' },
        { value: 'inactive', label: 'Inactive' },
        { value: 'out of stock', label: 'Out of Stock' }
      ]
    }
  ];

  const hasFilters = filterCategory || filterStatus || searchQuery;


  const columns = [
    {
      name: 'PRODUCT DETAILS',
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
      name: 'TOTAL',
      selector: row => row.initial_stock_qty,
      cell: (row) => <span className="fw-semibold">{row.initial_stock_qty}</span>,
      center: true,
      minWidth: '100px'
    },
    ...platformNames.map(plat => ({
      name: plat.toUpperCase(),
      cell: (row) => {
        const productPlatforms = Array.isArray(row.platforms) && row.platforms.length > 0 ? row.platforms : [];
        if (!productPlatforms.includes(plat)) return <span className="text-muted">-</span>;
        
        const qty = row.platform_stocks?.[plat] || 0;
        return <span className={qty === 0 ? "text-danger" : "text-muted"}>{qty}</span>;
      },
      center: true,
      minWidth: '120px'
    })),
    {
      name: 'THRESHOLDS',
      cell: (row) => (
        <div>
          <span className="fs-12 text-muted d-block">Limit: {row.safety_stock_limit || 10}</span>
        </div>
      ),
      minWidth: '120px'
    },
    {
      name: 'ACTION',
      cell: (row) => (
        <div className="action-icon d-inline-flex">
          <Link to="#" className="me-2" onClick={(e) => { e.preventDefault(); handleEditClick(row); }}><i className="ti ti-edit"></i></Link>
          <Link to="#" onClick={(e) => { e.preventDefault(); setConfirmDeleteModal({ isOpen: true, id: row._id || row.id, name: row.product_name }); }}><i className="ti ti-trash"></i></Link>
        </div>
      )
    }
  ];

  return (
    <div className="stock-control-tab">
      {/* Top Summary Cards */}
      <div className="row g-3 mb-4">
        <div className="col-12 col-md-6 col-xxl-3">
          <div className="card h-100 mb-0">
            <div className="card-body">
              <div className="d-flex align-items-center mb-2">
                <span className="avatar avatar-md bg-primary-transparent rounded me-2">
                  <i className="ti ti-box text-primary fs-20"></i>
                </span>
                <span className="fw-medium text-muted">Total Stocked Units</span>
              </div>
              <h4 className="fw-bold mb-0">{totalUnits.toLocaleString()}</h4>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6 col-xxl-3">
          <div className="card h-100 mb-0">
            <div className="card-body">
              <div className="d-flex align-items-center mb-2">
                <span className="avatar avatar-md bg-warning-transparent rounded me-2">
                  <i className="ti ti-chart-pie text-warning fs-20"></i>
                </span>
                <span className="fw-medium text-muted">Cost Value</span>
              </div>
              <h4 className="fw-bold mb-0">₹{costValue.toLocaleString()}</h4>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6 col-xxl-3">
          <div className="card h-100 mb-0">
            <div className="card-body">
              <div className="d-flex align-items-center mb-2">
                <span className="avatar avatar-md bg-success-transparent rounded me-2">
                  <i className="ti ti-activity text-success fs-20"></i>
                </span>
                <span className="fw-medium text-muted">Retail Value</span>
              </div>
              <h4 className="fw-bold mb-0">₹{retailValue.toLocaleString()}</h4>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6 col-xxl-3">
          <div className="card h-100 mb-0">
            <div className="card-body">
              <div className="d-flex align-items-center mb-2">
                <span className="avatar avatar-md bg-info-transparent rounded me-2">
                  <i className="ti ti-alert-circle text-info fs-20"></i>
                </span>
                <span className="fw-medium text-muted">Total Platforms</span>
              </div>
              <h4 className="fw-bold mb-0">{platformNames.length}</h4>
            </div>
          </div>
        </div>
      </div>

      {/* Platform Cards Grid */}
      <div className="row g-3 mb-4">
        {platformNames.map((platform, idx) => {
          const stat = platformStats[platform];
          return (
            <div className="col-12 col-md-6 col-xxl-3" key={platform}>
              <div className="card h-100 mb-0 border-0 shadow-sm">
                <div className="card-header border-bottom d-flex align-items-center justify-content-between p-3">
                  <div className="d-flex align-items-center gap-2">
                    <span className="avatar avatar-sm rounded" style={{ backgroundColor: getPlatformColor(platform, idx) }}>
                      <i className="ti ti-brand-shopee text-white"></i>
                    </span>
                    <div>
                      <h6 className="fw-semibold mb-0">{platform}</h6>
                      <span className="fs-12 text-muted">Live SKUs</span>
                    </div>
                  </div>
                  <span className="badge bg-success-transparent text-success badge-sm"><i className="ti ti-check me-1"></i>Synced</span>
                </div>
                
                <div className="card-body p-3">
                  <div className="row text-center mb-3">
                    <div className="col-6 border-end">
                      <span className="fs-11 text-muted d-block mb-1">AVAILABLE</span>
                      <h6 className="fw-semibold mb-0">{stat.available} U</h6>
                    </div>
                    <div className="col-6">
                      <span className="fs-11 text-muted d-block mb-1">RESERVED</span>
                      <h6 className="fw-semibold mb-0">{stat.reserved} U</h6>
                    </div>
                  </div>
                  <div className="row text-center">
                    <div className="col-6 border-end">
                      <span className="fs-11 text-muted d-block mb-1">LOW STOCK</span>
                      <h6 className="fw-semibold mb-0 text-warning">{stat.lowStockSkus} SKU</h6>
                    </div>
                    <div className="col-6">
                      <span className="fs-11 text-muted d-block mb-1">OUT OF STOCK</span>
                      <h6 className="fw-semibold mb-0 text-danger">{stat.outOfStockSkus} SKU</h6>
                    </div>
                  </div>
                </div>
                <div className="card-footer p-3 bg-light d-flex justify-content-between align-items-center">
                  <span className="fs-12 text-muted"><i className="ti ti-clock me-1"></i>Sync: Just now</span>
                  <Link to="#" className="fs-12 fw-medium text-primary">Audit API <i className="ti ti-arrow-right"></i></Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Global Sales Platform Stock Distribution */}
      <div className="card mb-4">
        <div className="card-body">
          <h6 className="fw-semibold mb-3 text-uppercase text-muted fs-13">Global Sales Platform Stock Distribution</h6>
          <div className="progress mb-3" style={{ height: '10px' }}>
            {platformNames.map((plat, idx) => {
              const percent = totalUnits > 0 ? (platformStats[plat]?.available / totalUnits) * 100 : 0;
              return (
                <div 
                  key={plat} 
                  className="progress-bar" 
                  role="progressbar" 
                  style={{ width: `${percent}%`, backgroundColor: getPlatformColor(plat, idx) }}
                  title={`${plat}: ${platformStats[plat]?.available} Units`}
                ></div>
              );
            })}
          </div>
          <div className="d-flex flex-wrap gap-4 mt-2">
            {platformNames.map((plat, idx) => (
              <div className="d-flex align-items-center" key={plat}>
                <span className="rounded-circle d-block me-2" style={{ width: '8px', height: '8px', backgroundColor: getPlatformColor(plat, idx) }}></span>
                <span className="fs-12 fw-medium text-uppercase text-muted">{plat} STORE ({platformStats[plat]?.available} UNITS)</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Inventory Command Actions */}
      <div className="card mb-4">
        <div className="card-body d-flex flex-wrap align-items-center justify-content-between gap-3">
          <h6 className="fw-semibold mb-0 text-uppercase text-muted fs-13">Inventory Command Actions</h6>
          <div className="d-flex flex-wrap gap-2">
            <button className="btn btn-primary btn-sm d-flex align-items-center"><i className="ti ti-refresh me-1"></i> Sync Inventory</button>
            <button className="btn btn-outline-primary btn-sm d-flex align-items-center"><i className="ti ti-reload me-1"></i> Refresh</button>
            <button className="btn btn-outline-primary btn-sm d-flex align-items-center"><i className="ti ti-circle-plus me-1"></i> Restock</button>
            <button className="btn btn-outline-primary btn-sm d-flex align-items-center"><i className="ti ti-arrows-right-left me-1"></i> Transfer</button>
            <button className="btn btn-outline-primary btn-sm d-flex align-items-center"><i className="ti ti-layers-intersect me-1"></i> Bulk Update</button>
          </div>
        </div>
      </div>

      {/* Stock Allocations Table */}
      <div className="card">
        <div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
          <h5 className="mb-0">Stock Allocations</h5>
          <FilterBar 
            filters={filterConfig} 
            onClear={clearFilters} 
            hasActiveFilters={hasFilters} 
          />
        </div>
        <div className="card-body p-0">
          <div className="custom-datatable-filter table-responsive">
            <CustomDataTable columns={columns} data={filteredProducts} progressPending={loading} />
          </div>
        </div>
      </div>
      
      <ProductFormModal 
        open={isProductModalOpen} 
        onClose={() => { setIsProductModalOpen(false); setCurrentEditProduct(null); }} 
        onSave={handleSaveProduct}
        initialData={currentEditProduct}
        categories={categories}
        platforms={platforms}
      />
      
      {/* Delete Confirmation Modal */}
      {confirmDeleteModal.isOpen && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Delete Product</h5>
                <button type="button" className="btn-close" onClick={() => setConfirmDeleteModal({ isOpen: false, id: null, name: '' })} aria-label="Close"></button>
              </div>
              <div className="modal-body text-center py-4">
                <i className="ti ti-alert-circle text-danger mb-3" style={{ fontSize: '48px' }}></i>
                <h5 className="mb-2">Are you sure?</h5>
                <p className="text-muted mb-0">
                  Do you really want to delete <strong>{confirmDeleteModal.name}</strong>? This process cannot be undone.
                </p>
              </div>
              <div className="modal-footer justify-content-center border-0 pt-0">
                <button className="btn btn-light px-4" onClick={() => setConfirmDeleteModal({ isOpen: false, id: null, name: '' })}>Cancel</button>
                <button className="btn btn-danger px-4" onClick={handleDeleteProduct}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StockTab;
