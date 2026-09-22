import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CustomDataTable from '../common/CustomDataTable';
import { productsData } from '../../pages/productsData';

const AlertsTab = () => {
  // Generate some dummy alerts based on products data
  const alertsData = productsData.slice(0, 5).map((product, index) => {
    const isOutOfStock = index % 2 === 0;
    const currentStock = isOutOfStock ? 0 : Math.floor(Math.random() * 10) + 1;
    const threshold = 10;
    
    return {
      ...product,
      current_stock: currentStock,
      threshold: threshold,
      platform: index % 3 === 0 ? "Amazon" : (index % 2 === 0 ? "Shopify" : "All Platforms"),
      alert_type: isOutOfStock ? "out_of_stock" : "low_stock",
      alert_message: isOutOfStock ? "Critical: Out of Stock" : `Warning: Low Stock (Only ${currentStock} left)`
    };
  });

  const globalAlertsStats = {
    outOfStock: alertsData.filter(a => a.alert_type === 'out_of_stock').length,
    lowStock: alertsData.filter(a => a.alert_type === 'low_stock').length,
  };

  const columns = [
    {
      name: 'Product Details',
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
          <span className="badge bg-light text-dark border d-inline-flex align-items-center">
            <i className="ti ti-alert-circle me-1 text-muted"></i>
            {row.alert_message}
          </span>
        </div>
      ),
      minWidth: '220px'
    },
    {
      name: 'Action',
      cell: (row) => (
        <div className="dropdown">
          <button className="btn btn-sm btn-light d-flex align-items-center dropdown-toggle" type="button" data-bs-toggle="dropdown">
            Take Action
          </button>
          <ul className="dropdown-menu">
            <li><Link className="dropdown-item d-flex align-items-center" to="#"><i className="ti ti-circle-plus me-2"></i>Restock</Link></li>
            <li><Link className="dropdown-item d-flex align-items-center" to="#"><i className="ti ti-arrows-right-left me-2"></i>Transfer Stock</Link></li>
            <li><hr className="dropdown-divider" /></li>
            <li><Link className="dropdown-item text-danger d-flex align-items-center" to="#"><i className="ti ti-player-pause me-2"></i>Pause Listings</Link></li>
          </ul>
        </div>
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
        <div className="card-header border-bottom">
          <h5 className="card-title mb-0">Active Channel Alerts Log</h5>
        </div>
        <div className="card-body p-0">
          <div className="custom-datatable-filter table-responsive">
            <CustomDataTable columns={columns} data={alertsData} />
          </div>
        </div>
      </div>

    </div>
  );
};

export default AlertsTab;
