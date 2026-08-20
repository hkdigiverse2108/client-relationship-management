import React, { useState, useEffect } from 'react';
import PageHeader from '@/components/common/PageHeader/PageHeader';
import Button from '@/components/common/Button/Button';
import InvoiceModal from './InvoiceModal';
import { FiDollarSign, FiAlertCircle, FiClock, FiTrendingDown, FiPlus } from 'react-icons/fi';
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { formatCurrency } from '@/utils/formatters';

import { financeService } from '@/api/services/financeService';
import toast from 'react-hot-toast';

const BillingDashboard = () => {
  const [isGstInclusive, setIsGstInclusive] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  const [dashboardData, setDashboardData] = useState({
    metrics: { revenue: 0, pending: 0, overdue: 0, expenses: 0 },
    cashFlow: [],
    sourceBreakdown: [],
    recentTransactions: []
  });

  const fetchDashboardData = async () => {
    setIsLoading(true);
    try {
      const response = await financeService.getDashboardData();
      setDashboardData(response);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast.error('Failed to load finance data');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleSeedData = async () => {
    try {
      await financeService.seedDummyData();
      toast.success('Test data seeded successfully!');
      fetchDashboardData();
    } catch (error) {
      toast.error('Failed to seed data');
    }
  };

  // GST calculation logic (assuming base amounts are exclusive of GST, and GST is 18%)
  const gstRate = 0.18;
  const calculateAmount = (baseAmount) => {
    return isGstInclusive ? baseAmount * (1 + gstRate) : baseAmount;
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Paid': return <span className="badge bg-success-soft text-success">Paid</span>;
      case 'Pending': return <span className="badge bg-warning-soft text-warning">Pending</span>;
      case 'Overdue': return <span className="badge bg-danger-soft text-danger">Overdue</span>;
      default: return <span className="badge bg-light text-dark">{status}</span>;
    }
  };

  const getSourceBadge = (source) => {
    switch (source) {
      case 'Project': return <span className="badge border border-primary text-primary bg-transparent">💼 Project</span>;
      case 'E-commerce': return <span className="badge border border-success text-success bg-transparent">🛒 Store</span>;
      case 'Retainer': return <span className="badge border border-warning text-warning bg-transparent">🔄 Retainer</span>;
      default: return <span className="badge border border-secondary text-secondary bg-transparent">📄 {source}</span>;
    }
  };

  return (
    <div className="finance-dashboard">
      <PageHeader 
        title="Billing Dashboard" 
        description="Financial overview, invoices, and payment tracking" 
        actions={
          <div className="d-flex justify-content-end align-items-center gap-3">
            <div className="form-check form-switch d-flex align-items-center gap-2 m-0 p-0">
              <label className={`form-check-label ${!isGstInclusive ? 'fw-bold text-white' : 'text-white-50'} mb-0`} htmlFor="gstToggle" style={{ cursor: 'pointer', fontSize: '14px' }}>
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
              <label className={`form-check-label ${isGstInclusive ? 'fw-bold text-white' : 'text-white-50'} mb-0`} htmlFor="gstToggle" style={{ cursor: 'pointer', fontSize: '14px' }}>
                GST Incl
              </label>
            </div>
            
            <div className="d-flex align-items-center gap-3">
              {dashboardData.recentTransactions.length === 0 && (
                <Button variant="outline-warning" onClick={handleSeedData} disabled={isLoading}>
                  Generate Demo Data
                </Button>
              )}
              <Button variant="primary" onClick={() => setIsInvoiceModalOpen(true)}>
                <FiPlus className="me-2" /> Create Invoice
              </Button>
            </div>
          </div>
        }
      />

      <div className="row g-4 mb-4">
        {/* Total Revenue */}
        <div className="col-md-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start mb-2">
                <div>
                  <h6 className="text-muted mb-1 text-uppercase" style={{ fontSize: '12px', letterSpacing: '0.5px' }}>Total Revenue (YTD)</h6>
                  <h3 className="mb-0 fw-bold">{formatCurrency(calculateAmount(dashboardData.metrics.revenue))}</h3>
                </div>
                <div className="p-2 bg-primary-soft text-primary rounded">
                  <FiDollarSign size={20} />
                </div>
              </div>
              <div className="text-success small fw-medium">
                <i className="bi bi-arrow-up-right me-1"></i> +12% from last year
              </div>
            </div>
          </div>
        </div>

        {/* Pending Receivables */}
        <div className="col-md-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start mb-2">
                <div>
                  <h6 className="text-muted mb-1 text-uppercase" style={{ fontSize: '12px', letterSpacing: '0.5px' }}>Pending Receivables</h6>
                  <h3 className="mb-0 fw-bold text-warning">{formatCurrency(calculateAmount(dashboardData.metrics.pending))}</h3>
                </div>
                <div className="p-2 bg-warning-soft text-warning rounded">
                  <FiClock size={20} />
                </div>
              </div>
              <div className="text-muted small">
                12 Unpaid Invoices
              </div>
            </div>
          </div>
        </div>

        {/* Overdue */}
        <div className="col-md-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start mb-2">
                <div>
                  <h6 className="text-muted mb-1 text-uppercase" style={{ fontSize: '12px', letterSpacing: '0.5px' }}>Overdue Collections</h6>
                  <h3 className="mb-0 fw-bold text-danger">{formatCurrency(calculateAmount(dashboardData.metrics.overdue))}</h3>
                </div>
                <div className="p-2 bg-danger-soft text-danger rounded">
                  <FiAlertCircle size={20} />
                </div>
              </div>
              <div className="text-danger small fw-medium">
                Action Required! (4 Invoices)
              </div>
            </div>
          </div>
        </div>

        {/* Total Expenses */}
        <div className="col-md-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start mb-2">
                <div>
                  <h6 className="text-muted mb-1 text-uppercase" style={{ fontSize: '12px', letterSpacing: '0.5px' }}>Total Expenses</h6>
                  <h3 className="mb-0 fw-bold text-secondary">{formatCurrency(calculateAmount(dashboardData.metrics.expenses))}</h3>
                </div>
                <div className="p-2 bg-secondary-soft text-secondary rounded">
                  <FiTrendingDown size={20} />
                </div>
              </div>
              <div className="text-muted small">
                Operating Cost & Payouts
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4 mb-4">
        {/* Cash Flow Chart */}
        <div className="col-md-8">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-header bg-white border-bottom-0 pt-4 pb-0">
              <h6 className="fw-bold mb-0">CASH FLOW TREND</h6>
            </div>
            <div className="card-body" style={{ height: '350px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dashboardData.cashFlow} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#888' }} />
                  <YAxis axisLine={false} tickLine={false} tickFormatter={(val) => `₹${val/1000}k`} tick={{ fontSize: 12, fill: '#888' }} />
                  <Tooltip formatter={(value) => formatCurrency(calculateAmount(value))} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                  <Legend verticalAlign="top" height={36} />
                  <Line type="monotone" dataKey="income" name="Income" stroke="#20c997" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                  <Line type="monotone" dataKey="expense" name="Expense" stroke="#ff6b6b" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Source Breakdown Chart */}
        <div className="col-md-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-header bg-white border-bottom-0 pt-4 pb-0">
              <h6 className="fw-bold mb-0">REVENUE BY SOURCE</h6>
            </div>
            <div className="card-body d-flex flex-column align-items-center justify-content-center" style={{ height: '350px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={dashboardData.sourceBreakdown}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {dashboardData.sourceBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => formatCurrency(calculateAmount(value))} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Transactions Table */}
      <div className="card border-0 shadow-sm">
        <div className="card-header bg-white pt-4 pb-3 border-bottom d-flex justify-content-between align-items-center">
          <h6 className="fw-bold mb-0">RECENT TRANSACTIONS</h6>
          <Button variant="outline-primary" size="sm">View All Ledger</Button>
        </div>
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light text-muted" style={{ fontSize: '13px' }}>
              <tr>
                <th className="ps-4">INVOICE / ID</th>
                <th>DATE</th>
                <th>CLIENT / ENTITY</th>
                <th>SOURCE</th>
                <th className="text-end">AMOUNT</th>
                <th className="text-center">STATUS</th>
                <th className="text-end pe-4">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {dashboardData.recentTransactions.map((trx, idx) => (
                <tr key={idx}>
                  <td className="ps-4 fw-medium text-primary">{trx.id}</td>
                  <td style={{ fontSize: '14px' }}>{new Date(trx.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                  <td className="fw-medium">{trx.client}</td>
                  <td>{getSourceBadge(trx.source)}</td>
                  <td className="text-end fw-bold">{formatCurrency(calculateAmount(trx.amount))}</td>
                  <td className="text-center">{getStatusBadge(trx.status)}</td>
                  <td className="text-end pe-4">
                    <Button variant="primary" size="sm" className="me-2">View</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <InvoiceModal 
        isOpen={isInvoiceModalOpen}
        onClose={() => setIsInvoiceModalOpen(false)}
        onSave={() => {
          setIsInvoiceModalOpen(false);
          fetchDashboardData();
        }}
        invoice={null}
      />
    </div>
  );
};

export default BillingDashboard;
