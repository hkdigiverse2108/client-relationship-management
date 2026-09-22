import React, { useState } from 'react';
import PageHeader from '../components/common/PageHeader';
import ReactApexChart from 'react-apexcharts';
import CustomDataTable from '../components/common/CustomDataTable';
import InvoiceModal from '../components/finance/InvoiceModal';

const BillingDashboard = () => {
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  const [isGstInclusive, setIsGstInclusive] = useState(true);
  // Cash Flow Trend Options (from InvoiceReport Expense chart style)
  const cashFlowOptions = {
    series: [
      { name: 'Income', data: [400, 200, 450, 300, 480, 250] },
      { name: 'Expense', data: [200, 150, 250, 150, 220, 180] }
    ],
    chart: { height: 260, type: 'area', toolbar: { show: false } },
    colors: ['#22c55e', '#ef4444'],
    fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.5, opacityTo: 0.1, stops: [0, 90, 100] } },
    dataLabels: { enabled: false },
    stroke: { curve: 'straight', width: 2 },
    xaxis: { categories: ['January', 'February', 'March', 'April', 'May', 'June'] },
    yaxis: { labels: { formatter: (val) => '$' + val + 'k' } },
    legend: { position: 'bottom' }
  };

  // Revenue By Source Options (New Trending Donut Chart)
  const revenueSourceOptions = {
    series: [45, 25, 20, 10],
    chart: { type: 'donut', height: 260 },
    labels: ['Projects', 'E-Commerce', 'Retainers', 'Other'],
    colors: ['#3b82f6', '#f59e0b', '#10b981', '#8b5cf6'],
    plotOptions: {
      pie: {
        donut: {
          size: '65%',
          labels: {
            show: true,
            name: { show: true, fontSize: '14px', color: '#64748b' },
            value: { show: true, fontSize: '24px', fontWeight: 'bold', color: '#0f172a', formatter: (val) => val + '%' },
            total: { show: true, showAlways: true, label: 'Projects', fontSize: '14px', color: '#64748b', formatter: function (w) { return "45%"; } }
          }
        }
      }
    },
    dataLabels: { enabled: false },
    legend: { position: 'right', offsetY: 0, height: 200, horizontalAlign: 'left' },
    tooltip: { enabled: true, y: { formatter: (val) => val + '%' } }
  };

  // Recent Transactions Data
  const columns = [
    { name: 'Transaction ID', selector: row => row.id, sortable: true, minWidth: '150px' },
    { name: 'Date', selector: row => row.date, sortable: true, minWidth: '120px' },
    { name: 'Client / Source', selector: row => row.client, sortable: true, minWidth: '200px' },
    { name: 'Amount', selector: row => row.amount, sortable: true, minWidth: '120px', cell: row => <span className="fw-medium">${row.amount}</span> },
    { 
      name: 'Status', 
      selector: row => row.status, 
      minWidth: '120px',
      cell: row => {
        let badgeClass = 'bg-light text-dark';
        if (row.status === 'Completed') badgeClass = 'bg-success-transparent text-success';
        if (row.status === 'Pending') badgeClass = 'bg-warning-transparent text-warning';
        if (row.status === 'Failed') badgeClass = 'bg-danger-transparent text-danger';
        return <span className={`badge ${badgeClass}`}>{row.status}</span>;
      }
    },
    {
      name: 'Action',
      cell: row => (
        <a href="#" onClick={(e) => e.preventDefault()} className="btn btn-icon btn-sm btn-light rounded-circle">
          <i className="ti ti-eye"></i>
        </a>
      ),
      minWidth: '80px',
      center: true
    }
  ];

  const transactionsData = [
    { id: 'TRX-1092', date: '15 Sep 2026', client: 'Acme Corp', amount: '2,400.00', status: 'Completed' },
    { id: 'TRX-1093', date: '14 Sep 2026', client: 'Global Tech', amount: '1,150.00', status: 'Pending' },
    { id: 'TRX-1094', date: '12 Sep 2026', client: 'Stark Industries', amount: '450.00', status: 'Completed' },
    { id: 'TRX-1095', date: '10 Sep 2026', client: 'Wayne Enterprises', amount: '3,200.00', status: 'Failed' },
    { id: 'TRX-1096', date: '09 Sep 2026', client: 'Umbrella Corp', amount: '890.00', status: 'Completed' },
  ];

  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <PageHeader 
            title="Billing Dashboard" 
            breadcrumbs={[
              { label: 'Dashboard' },
              { label: 'Finance & Billing' },
              { label: 'Billing Dashboard', active: true }
            ]} 
          >
            <div className="d-flex align-items-center gap-3 mt-2 mt-md-0">
              <div className="form-check form-switch d-flex align-items-center gap-2 m-0 p-0" style={{ whiteSpace: 'nowrap' }}>
                <label className={`form-check-label ${!isGstInclusive ? 'fw-bold text-dark' : 'text-muted'} mb-0`} htmlFor="gstToggle" style={{ cursor: 'pointer', fontSize: '14px' }}>
                  GST Excl
                </label>
                <input 
                  className="form-check-input m-0 ms-2 me-2" 
                  type="checkbox" 
                  role="switch" 
                  id="gstToggle" 
                  checked={isGstInclusive}
                  onChange={(e) => setIsGstInclusive(e.target.checked)}
                  style={{ width: '2.5rem', height: '1.25rem', cursor: 'pointer' }}
                />
                <label className={`form-check-label ${isGstInclusive ? 'fw-bold text-dark' : 'text-muted'} mb-0`} htmlFor="gstToggle" style={{ cursor: 'pointer', fontSize: '14px' }}>
                  GST Incl
                </label>
              </div>
              <button className="btn btn-primary d-inline-flex align-items-center" onClick={() => setIsInvoiceModalOpen(true)}>
                <i className="ti ti-plus me-1"></i> Create Invoice
              </button>
            </div>
          </PageHeader>

          {/* Top 4 Cards (Employee Report Layout Style) */}
          <div className="row">
            <div className="col-xl-12 d-flex">
              <div className="row flex-fill">
                
                {/* Total Revenue */}
                <div className="col-lg-3 col-md-6 d-flex">
                  <div className="card flex-fill">
                    <div className="card-body">
                      <div className="overflow-hidden d-flex mb-2 align-items-center">
                        <span className="me-3 avatar avatar-lg bg-primary-transparent rounded">
                          <i className="ti ti-currency-dollar fs-24 text-primary"></i>
                        </span>
                        <div>
                          <p className="fs-14 fw-normal mb-1 text-truncate">Total Revenue (YTD)</p>
                          <h4 className="mb-0 fw-bold">$1,245,000</h4>
                        </div>
                      </div>
                      <div>
                        <p className="fs-12 fw-normal d-flex align-items-center text-truncate mb-0"><span className="text-success fs-12 d-flex align-items-center me-1"><i className="ti ti-arrow-wave-right-up me-1"></i>+15.2%</span>from last year</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pending Receivables */}
                <div className="col-lg-3 col-md-6 d-flex">
                  <div className="card flex-fill">
                    <div className="card-body">
                      <div className="overflow-hidden d-flex mb-2 align-items-center">
                        <span className="me-3 avatar avatar-lg bg-warning-transparent rounded">
                          <i className="ti ti-clock fs-24 text-warning"></i>
                        </span>
                        <div>
                          <p className="fs-14 fw-normal mb-1 text-truncate">Pending Receivables</p>
                          <h4 className="mb-0 fw-bold">$45,200</h4>
                        </div>
                      </div>
                      <div>
                        <p className="fs-12 fw-normal d-flex align-items-center text-truncate mb-0"><span className="text-danger fs-12 d-flex align-items-center me-1"><i className="ti ti-arrow-wave-right-down me-1"></i>-2.1%</span>from last month</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Overdue Invoices */}
                <div className="col-lg-3 col-md-6 d-flex">
                  <div className="card flex-fill">
                    <div className="card-body">
                      <div className="overflow-hidden d-flex mb-2 align-items-center">
                        <span className="me-3 avatar avatar-lg bg-danger-transparent rounded">
                          <i className="ti ti-alert-triangle fs-24 text-danger"></i>
                        </span>
                        <div>
                          <p className="fs-14 fw-normal mb-1 text-truncate">Overdue Invoices</p>
                          <h4 className="mb-0 fw-bold">$12,400</h4>
                        </div>
                      </div>
                      <div>
                        <p className="fs-12 fw-normal d-flex align-items-center text-truncate mb-0"><span className="text-danger fs-12 d-flex align-items-center me-1"><i className="ti ti-arrow-wave-right-down me-1"></i>+5.4%</span>from last month</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Total Expenses */}
                <div className="col-lg-3 col-md-6 d-flex">
                  <div className="card flex-fill">
                    <div className="card-body">
                      <div className="overflow-hidden d-flex mb-2 align-items-center">
                        <span className="me-3 avatar avatar-lg bg-info-transparent rounded">
                          <i className="ti ti-receipt-2 fs-24 text-info"></i>
                        </span>
                        <div>
                          <p className="fs-14 fw-normal mb-1 text-truncate">Total Expenses</p>
                          <h4 className="mb-0 fw-bold">$385,000</h4>
                        </div>
                      </div>
                      <div>
                        <p className="fs-12 fw-normal d-flex align-items-center text-truncate mb-0"><span className="text-success fs-12 d-flex align-items-center me-1"><i className="ti ti-arrow-wave-right-up me-1"></i>-8.3%</span>from last year</p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

          <div className="row">
            {/* Cash Flow Trend */}
            <div className="col-xl-7 d-flex">
              <div className="card flex-fill mb-4">
                <div className="card-header border-bottom">
                  <h5 className="card-title mb-0">Cash Flow Trend</h5>
                </div>
                <div className="card-body pt-4">
                  <ReactApexChart options={cashFlowOptions} series={cashFlowOptions.series} type="area" height={260} />
                </div>
              </div>
            </div>

            {/* Revenue By Source */}
            <div className="col-xl-5 d-flex">
              <div className="card flex-fill mb-4">
                <div className="card-header border-bottom">
                  <h5 className="card-title mb-0">Revenue By Source</h5>
                </div>
                <div className="card-body d-flex align-items-center justify-content-start pt-4" style={{ minHeight: '250px' }}>
                  <ReactApexChart options={revenueSourceOptions} series={revenueSourceOptions.series} type="donut" height={200} width={380} />
                </div>
              </div>
            </div>
          </div>

          {/* Recent Transactions Table */}
          <div className="row">
            <div className="col-xl-12 d-flex">
              <div className="card flex-fill mb-4">
                <div className="card-header d-flex align-items-center justify-content-between flex-wrap border-bottom">
                  <h5 className="card-title mb-0">Recent Transactions</h5>
                  <a href="#" onClick={(e) => e.preventDefault()} className="btn btn-light btn-sm d-flex align-items-center">
                    <i className="ti ti-list-details me-1"></i>View All Ledger
                  </a>
                </div>
                <div className="card-body p-0">
                  <div className="custom-datatable-filter table-responsive">
                    <CustomDataTable columns={columns} data={transactionsData} />
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Invoice Modal */}
      <InvoiceModal isOpen={isInvoiceModalOpen} onClose={() => setIsInvoiceModalOpen(false)} />
    </>
  );
};

export default BillingDashboard;
