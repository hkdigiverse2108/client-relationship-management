import React, { useState } from 'react';
import PageHeader from '../components/common/PageHeader';
import StockTab from '../components/inventory/StockTab';
import AlertsTab from '../components/inventory/AlertsTab';
import LogsTab from '../components/inventory/LogsTab';
import AnalyticsTab from '../components/inventory/AnalyticsTab';

const Inventory = () => {
  const [activeTab, setActiveTab] = useState('stock');

  return (
    <>
      <div className="page-wrapper">
        <div className="content">

          {/* Breadcrumb */}
          <PageHeader 
            title="Inventory Control Center"
            breadcrumbs={[
              { label: 'Dashboard' },
              { label: 'E-Commerce' },
              { label: 'Inventory', active: true }
            ]}
          />
          {/* /Breadcrumb */}

          <div className="bg-white rounded mb-4">
            <ul className="nav nav-tabs nav-tabs-bottom nav-justified flex-wrap" role="tablist">
              <li className="nav-item" role="presentation">
                <a className={`nav-link fw-medium d-flex align-items-center justify-content-center ${activeTab === 'stock' ? 'active' : ''}`}
                  href="#bottom-justified-tab1" data-bs-toggle="tab" aria-selected={activeTab === 'stock'} role="tab"
                  onClick={() => setActiveTab('stock')}>
                  <i className="ti ti-box me-1"></i>
                  Stock
                </a>
              </li>
              <li className="nav-item" role="presentation">
                <a className={`nav-link fw-medium d-flex align-items-center justify-content-center ${activeTab === 'alerts' ? 'active' : ''}`}
                  href="#bottom-justified-tab2" data-bs-toggle="tab" aria-selected={activeTab === 'alerts'} role="tab"
                  onClick={() => setActiveTab('alerts')}>
                  <i className="ti ti-alert-circle me-1"></i>
                  Alerts
                </a>
              </li>
              <li className="nav-item" role="presentation">
                <a className={`nav-link fw-medium d-flex align-items-center justify-content-center ${activeTab === 'logs' ? 'active' : ''}`}
                  href="#bottom-justified-tab3" data-bs-toggle="tab" aria-selected={activeTab === 'logs'} role="tab"
                  onClick={() => setActiveTab('logs')}>
                  <i className="ti ti-history me-1"></i>
                  Logs
                </a>
              </li>
              <li className="nav-item" role="presentation">
                <a className={`nav-link fw-medium d-flex align-items-center justify-content-center ${activeTab === 'analytics' ? 'active' : ''}`}
                  href="#bottom-justified-tab4" data-bs-toggle="tab" aria-selected={activeTab === 'analytics'} role="tab"
                  onClick={() => setActiveTab('analytics')}>
                  <i className="ti ti-chart-pie me-1"></i>
                  Analytics
                </a>
              </li>
            </ul>
          </div>

          <div className="tab-content pb-1">
            <div className={`tab-pane ${activeTab === 'stock' ? 'show active' : ''}`} id="bottom-justified-tab1" role="tabpanel">
              <StockTab />
            </div>
            
            <div className={`tab-pane ${activeTab === 'alerts' ? 'show active' : ''}`} id="bottom-justified-tab2" role="tabpanel">
              <AlertsTab />
            </div>

            <div className={`tab-pane ${activeTab === 'logs' ? 'show active' : ''}`} id="bottom-justified-tab3" role="tabpanel">
              <LogsTab />
            </div>

            <div className={`tab-pane ${activeTab === 'analytics' ? 'show active' : ''}`} id="bottom-justified-tab4" role="tabpanel">
              <AnalyticsTab />
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default Inventory;
