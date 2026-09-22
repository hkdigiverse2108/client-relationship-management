import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CustomDataTable from '../common/CustomDataTable';
import { productsData } from '../../pages/productsData';
import CustomSelect from '../common/CustomSelect';

const PLATFORMS = ["Amazon", "Flipkart", "Shopify", "Warehouse"];

const StockTab = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const totalUnits = 1250;
  const costValue = 450000;
  const retailValue = 890000;

  const platformStats = {
    Amazon: { available: 450, reserved: 20, lowStockSkus: 2, outOfStockSkus: 0 },
    Flipkart: { available: 320, reserved: 15, lowStockSkus: 1, outOfStockSkus: 1 },
    Shopify: { available: 150, reserved: 5, lowStockSkus: 0, outOfStockSkus: 0 },
    Warehouse: { available: 330, reserved: 0, lowStockSkus: 3, outOfStockSkus: 0 },
  };

  const PLATFORM_COLORS = {
    Amazon: "#ff9900",
    Flipkart: "#2874f0",
    Shopify: "#95bf47",
    Warehouse: "#607d8b",
  };

  const columns = [
    {
      name: 'PRODUCT DETAILS',
      selector: row => row.product_name,
      cell: (row) => (
        <div className="d-flex align-items-center">
          <Link to="#" className="avatar avatar-md border avatar-rounded me-2">
            <img src={row.image} className="img-fluid" alt="img" />
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
    ...PLATFORMS.map(plat => ({
      name: plat.toUpperCase(),
      cell: (row) => (
        <span className="text-muted">{Math.floor(row.initial_stock_qty / PLATFORMS.length)}</span>
      ),
      center: true,
      minWidth: '120px'
    })),
    {
      name: 'THRESHOLDS',
      cell: (row) => (
        <div>
          <span className="fs-12 text-muted d-block">Limit: 10</span>
        </div>
      ),
      minWidth: '120px'
    },
    {
      name: 'ACTION',
      cell: (row) => (
        <div className="action-icon d-inline-flex">
          <Link to="#" className="me-2"><i className="ti ti-edit"></i></Link>
          <Link to="#"><i className="ti ti-trash"></i></Link>
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
              <h4 className="fw-bold mb-0">{PLATFORMS.length}</h4>
            </div>
          </div>
        </div>
      </div>

      {/* Platform Cards Grid */}
      <div className="row g-3 mb-4">
        {PLATFORMS.map(platform => {
          const stat = platformStats[platform];
          return (
            <div className="col-12 col-md-6 col-xxl-3" key={platform}>
              <div className="card h-100 mb-0 border-0 shadow-sm">
                <div className="card-header border-bottom d-flex align-items-center justify-content-between p-3">
                  <div className="d-flex align-items-center gap-2">
                    <span className="avatar avatar-sm rounded" style={{ backgroundColor: PLATFORM_COLORS[platform] }}>
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
            {PLATFORMS.map(plat => {
              const percent = (platformStats[plat].available / totalUnits) * 100;
              return (
                <div 
                  key={plat} 
                  className="progress-bar" 
                  role="progressbar" 
                  style={{ width: `${percent}%`, backgroundColor: PLATFORM_COLORS[plat] }}
                  title={`${plat}: ${platformStats[plat].available} Units`}
                ></div>
              );
            })}
          </div>
          <div className="d-flex flex-wrap gap-4 mt-2">
            {PLATFORMS.map(plat => (
              <div className="d-flex align-items-center" key={plat}>
                <span className="rounded-circle d-block me-2" style={{ width: '8px', height: '8px', backgroundColor: PLATFORM_COLORS[plat] }}></span>
                <span className="fs-12 fw-medium text-uppercase text-muted">{plat} STORE ({platformStats[plat].available} UNITS)</span>
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
          <div className="d-flex flex-wrap gap-3">

            <div className="custom-select-wrapper" style={{ width: '150px' }}>
              <CustomSelect 
                options={[
                  { value: '', label: 'All Categories' },
                  { value: 'Electronics', label: 'Electronics' },
                  { value: 'Clothing', label: 'Clothing' },
                ]}
                value={filterCategory ? { value: filterCategory, label: filterCategory } : { value: '', label: 'All Categories' }}
                onChange={(selected) => setFilterCategory(selected ? selected.value : '')}
              />
            </div>
            <div className="custom-select-wrapper" style={{ width: '150px' }}>
              <CustomSelect 
                options={[
                  { value: '', label: 'All Statuses' },
                  { value: 'Active', label: 'Active' },
                  { value: 'Inactive', label: 'Inactive' },
                ]}
                value={filterStatus ? { value: filterStatus, label: filterStatus } : { value: '', label: 'All Statuses' }}
                onChange={(selected) => setFilterStatus(selected ? selected.value : '')}
              />
            </div>
          </div>
        </div>
        <div className="card-body p-0">
          <div className="custom-datatable-filter table-responsive">
            <CustomDataTable columns={columns} data={productsData} />
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default StockTab;
