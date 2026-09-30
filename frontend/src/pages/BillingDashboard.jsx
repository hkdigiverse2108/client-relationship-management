import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/common/PageHeader';
import ReactApexChart from 'react-apexcharts';
import CustomDataTable from '../components/common/CustomDataTable';
import InvoiceModal from '../components/finance/InvoiceModal';
import api from '../api/axiosClient';
import toast from 'react-hot-toast';

const BillingDashboard = () => {
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  const [isGstInclusive, setIsGstInclusive] = useState(true);
  const [updateTrigger, setUpdateTrigger] = useState(0);
  
  const [invoices, setInvoices] = useState([]);
  const [payments, setPayments] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [metrics, setMetrics] = useState({
    totalRevenue: 0,
    pendingReceivables: 0,
    overdueInvoices: 0,
    totalExpenses: 0,
  });

  const [chartData, setChartData] = useState({
    incomeData: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    expenseData: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    sourceData: [0, 0, 0, 0] // Projects, E-Commerce, Retainers, Other
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get('/finance/dashboard/metrics');
        const data = Array.isArray(res) ? res[0] : (res.data || res);

        if (data.metrics) {
          setMetrics({
            totalRevenue: data.metrics.revenue,
            pendingReceivables: data.metrics.pending,
            overdueInvoices: data.metrics.overdue,
            totalExpenses: data.metrics.expenses,
            revenueGrowth: data.metrics.revenue_growth,
            pendingGrowth: data.metrics.pending_growth,
            overdueGrowth: data.metrics.overdue_growth,
            expensesGrowth: data.metrics.expenses_growth
          });
        }

        if (data.cashFlow) {
          const incData = data.cashFlow.map(c => c.income || 0);
          const expData = data.cashFlow.map(c => c.expense || 0);
          const labels = data.cashFlow.map(c => c.name);
          setChartData(prev => ({ ...prev, incomeData: incData, expenseData: expData, cashFlowLabels: labels }));
        }

        if (data.sourceBreakdown) {
          const sources = data.sourceBreakdown.map(s => s.value);
          const sourceLabels = data.sourceBreakdown.map(s => s.name);
          const sourceColors = data.sourceBreakdown.map(s => s.color);
          setChartData(prev => ({ ...prev, sourceData: sources.length ? sources : [0], sourceLabels: sourceLabels.length ? sourceLabels : ['None'], sourceColors: sourceColors.length ? sourceColors : ['#ccc'] }));
        }

        if (data.recentTransactions) {
          setPayments(data.recentTransactions);
        }

      } catch (err) {
        console.error("Error fetching finance data:", err);
      }
    };
    fetchData();
  }, [updateTrigger]);

  const handleSaveInvoice = async (formData) => {
    try {
      const totalBeforeTax = formData.line_items.reduce((sum, item) => sum + Number(item.amount), 0) - Number(formData.additional_discount || 0);
      let taxAmount = 0;
      if (formData.tax_type === 'CGST + SGST') {
        taxAmount = (totalBeforeTax * formData.cgst_percent / 100) + (totalBeforeTax * formData.sgst_percent / 100);
      } else if (formData.tax_type === 'IGST') {
        taxAmount = totalBeforeTax * formData.igst_percent / 100;
      }
      const rawTotal = totalBeforeTax + taxAmount;
      const roundedTotal = Math.round(rawTotal);
      const roundOff = roundedTotal - rawTotal;

      const payload = {
        ...formData,
        total_amount: totalBeforeTax,
        total_tax_amount: taxAmount,
        rounded_total: roundedTotal,
        calculated_round_off: roundOff,
        total_due: roundedTotal,
        status: formData.status || 'Draft'
      };
      
      await api.post('/invoices', payload);
      toast.success('Invoice created successfully!');
      setIsInvoiceModalOpen(false);
      setUpdateTrigger(prev => prev + 1); // Refresh data
    } catch (error) {
      console.error(error);
      toast.error('Failed to save invoice');
    }
  };

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(val || 0);
  };

  // Cash Flow Trend Options (from InvoiceReport Expense chart style)
  const cashFlowOptions = {
    series: [
      { name: 'Income', data: chartData.incomeData },
      { name: 'Expense', data: chartData.expenseData }
    ],
    chart: { height: 260, type: 'area', toolbar: { show: false } },
    colors: ['#22c55e', '#ef4444'],
    fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.5, opacityTo: 0.1, stops: [0, 90, 100] } },
    dataLabels: { enabled: false },
    stroke: { curve: 'straight', width: 2 },
    xaxis: { categories: chartData.cashFlowLabels || ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'] },
    yaxis: { labels: { formatter: (val) => '₹' + (val/1000).toFixed(1) + 'k' } },
    legend: { position: 'bottom' }
  };

    // Revenue By Source Options (New Trending Donut Chart)
    const revenueSourceOptions = {
      series: chartData.sourceData,
      chart: { type: 'donut', height: 260 },
      labels: chartData.sourceLabels || ['Projects', 'E-Commerce', 'Retainers', 'Other'],
      colors: chartData.sourceColors || ['#3b82f6', '#f59e0b', '#10b981', '#8b5cf6'],
      plotOptions: {
        pie: {
          donut: {
            size: '65%',
            labels: {
              show: true,
              name: { show: true, fontSize: '14px', color: '#64748b' },
              value: { show: true, fontSize: '13px', fontWeight: 'bold', color: '#0f172a', formatter: (val) => formatCurrency(val) },
              total: { 
                show: true, 
                showAlways: true, 
                label: 'Total', 
                fontSize: '14px', 
                color: '#64748b', 
                formatter: function (w) { 
                  const total = w.globals.seriesTotals.reduce((a, b) => a + b, 0);
                  return formatCurrency(total);
                } 
              }
            }
          }
        }
      },
      dataLabels: { enabled: false },
      legend: { position: 'right', offsetY: 0, height: 200, horizontalAlign: 'left' },
      tooltip: { 
        enabled: true, 
        y: { 
          formatter: function(val, opts) {
            const total = opts.globals.seriesTotals.reduce((a, b) => a + b, 0);
            const percent = total > 0 ? ((val / total) * 100).toFixed(1) : 0;
            return formatCurrency(val) + " (" + percent + "%)";
          }
        } 
      }
    };

  // Recent Transactions Data
  const columns = [
    { name: 'Transaction ID', selector: row => row.id, sortable: true, minWidth: '150px' },
    { name: 'Date', selector: row => row.date, sortable: true, minWidth: '120px', cell: row => row.date ? new Date(row.date).toLocaleDateString() : '-' },
    { name: 'Client / Source', selector: row => row.client || row.source || '-', sortable: true, minWidth: '200px' },
    { name: 'Amount', selector: row => row.amount, sortable: true, minWidth: '120px', cell: row => <span className="fw-medium">{formatCurrency(row.amount)}</span> },
    { 
      name: 'Status', 
      selector: row => row.status, 
      minWidth: '120px',
      cell: row => {
        let badgeClass = 'bg-light text-dark';
        if (row.status === 'Completed' || row.status === 'Credit') badgeClass = 'bg-success-transparent text-success';
        if (row.status === 'Pending') badgeClass = 'bg-warning-transparent text-warning';
        if (row.status === 'Failed' || row.status === 'Debit') badgeClass = 'bg-danger-transparent text-danger';
        return <span className={`badge ${badgeClass}`}>{row.status}</span>;
      }
    }
  ];

  const transactionsData = [...payments];

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
                          <i className="ti ti-currency-rupee fs-24 text-primary"></i>
                        </span>
                        <div>
                          <p className="fs-14 fw-normal mb-1 text-truncate">Total Revenue (YTD)</p>
                          <h4 className="mb-0 fw-bold">{formatCurrency(metrics.totalRevenue)}</h4>
                        </div>
                      </div>
                      <div>
                        <p className="fs-12 fw-normal d-flex align-items-center text-truncate mb-0">
                          <span className={`${metrics.revenueGrowth >= 0 ? "text-success" : "text-danger"} fs-12 d-flex align-items-center me-1`}>
                            <i className={`ti ${metrics.revenueGrowth >= 0 ? "ti-arrow-wave-right-up" : "ti-arrow-wave-right-down"} me-1`}></i>
                            {metrics.revenueGrowth > 0 ? "+" : ""}{metrics.revenueGrowth || 0}%
                          </span>
                          from last year
                        </p>
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
                          <h4 className="mb-0 fw-bold">{formatCurrency(metrics.pendingReceivables)}</h4>
                        </div>
                      </div>
                      <div>
                        <p className="fs-12 fw-normal d-flex align-items-center text-truncate mb-0">
                          <span className={`${metrics.pendingGrowth >= 0 ? "text-success" : "text-danger"} fs-12 d-flex align-items-center me-1`}>
                            <i className={`ti ${metrics.pendingGrowth >= 0 ? "ti-arrow-wave-right-up" : "ti-arrow-wave-right-down"} me-1`}></i>
                            {metrics.pendingGrowth > 0 ? "+" : ""}{metrics.pendingGrowth || 0}%
                          </span>
                          from last month
                        </p>
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
                          <h4 className="mb-0 fw-bold">{formatCurrency(metrics.overdueInvoices)}</h4>
                        </div>
                      </div>
                      <div>
                        <p className="fs-12 fw-normal d-flex align-items-center text-truncate mb-0">
                          <span className={`${metrics.overdueGrowth > 0 ? "text-danger" : "text-success"} fs-12 d-flex align-items-center me-1`}>
                            <i className={`ti ${metrics.overdueGrowth > 0 ? "ti-arrow-wave-right-up" : "ti-arrow-wave-right-down"} me-1`}></i>
                            {metrics.overdueGrowth > 0 ? "+" : ""}{metrics.overdueGrowth || 0}%
                          </span>
                          from last month
                        </p>
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
                          <i className="ti ti-receipt-rupee fs-24 text-info"></i>
                        </span>
                        <div>
                          <p className="fs-14 fw-normal mb-1 text-truncate">Total Expenses</p>
                          <h4 className="mb-0 fw-bold">{formatCurrency(metrics.totalExpenses)}</h4>
                        </div>
                      </div>
                      <div>
                        <p className="fs-12 fw-normal d-flex align-items-center text-truncate mb-0">
                          <span className={`${metrics.expensesGrowth > 0 ? "text-danger" : "text-success"} fs-12 d-flex align-items-center me-1`}>
                            <i className={`ti ${metrics.expensesGrowth > 0 ? "ti-arrow-wave-right-up" : "ti-arrow-wave-right-down"} me-1`}></i>
                            {metrics.expensesGrowth > 0 ? "+" : ""}{metrics.expensesGrowth || 0}%
                          </span>
                          from last year
                        </p>
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
                  <Link to="/ledger" className="btn btn-light btn-sm d-flex align-items-center">
                    <i className="ti ti-list-details me-1"></i>View All Ledger
                  </Link>
                </div>
                <div className="card-body p-0">
                  <div className="custom-datatable-filter table-responsive">
                    <CustomDataTable 
                      columns={columns} 
                      data={transactionsData} 
                      showPagination={false} 
                      showToolbar={false} 
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Invoice Modal */}
      <InvoiceModal 
        isOpen={isInvoiceModalOpen} 
        onClose={() => setIsInvoiceModalOpen(false)} 
        onSave={handleSaveInvoice}
      />
    </>
  );
};

export default BillingDashboard;
