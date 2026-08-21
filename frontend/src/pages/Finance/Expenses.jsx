import React, { useState, useEffect } from 'react';
import PageHeader from '@/components/common/PageHeader/PageHeader';
import StatCard from '@/components/common/StatCard/StatCard';
import Table from '@/components/common/Table/Table';
import Button from '@/components/common/Button/Button';
import Badge from '@/components/common/Badge/Badge';
import { expenseService } from '@/api/services/expenseService';
import { FiTrendingUp, FiTrendingDown, FiList, FiDollarSign, FiSearch, FiFilter, FiPlus, FiEdit, FiTrash2, FiPieChart } from 'react-icons/fi';
import { toast } from 'react-hot-toast';
import ExpenseModal from './ExpenseModal';
import SearchBar from "@/components/common/SearchBar/SearchBar";
import { confirmDialog } from "@/components/common/ConfirmDialog/confirmDialog";

const categories = [
  'All', 'Software', 'Travel', 'Office Supplies', 'Marketing', 
  'Utilities', 'Payroll', 'Legal', 'Meals', 'Other'
];

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [metrics, setMetrics] = useState({
    this_month: 0,
    ytd: 0,
    average_daily: 0,
    top_category: 'N/A',
    top_category_amount: 0
  });
  
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);
  
  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  const fetchData = async () => {
    setLoading(true);
    try {
      const params = {};
      if (selectedCategory !== 'All') params.category = selectedCategory;
      if (dateRange.start) params.start_date = dateRange.start;
      if (dateRange.end) params.end_date = dateRange.end;

      const [expData, metricsData] = await Promise.all([
        expenseService.getAllExpenses(params),
        expenseService.getMetrics()
      ]);
      
      setExpenses(Array.isArray(expData) ? expData : (expData.data || []));
      setMetrics(metricsData.data || metricsData);
    } catch (error) {
      console.error(error);
      toast.error('Failed to load expenses');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedCategory, dateRange]);

  const handleAdd = () => {
    setSelectedExpense(null);
    setIsModalOpen(true);
  };

  const handleEdit = (expense) => {
    setSelectedExpense(expense);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    const ok = await confirmDialog({
      title: "Delete Expense?",
      text: "This expense and its associated ledger entries will be permanently removed.",
    });
    if (!ok) return;

    try {
      await expenseService.deleteExpense(id);
      toast.success("Expense deleted successfully");
      fetchData();
    } catch (error) {
      toast.error("Failed to delete expense");
    }
  };

  const handleModalSave = () => {
    setIsModalOpen(false);
    fetchData();
  };

  const filteredExpenses = expenses.filter(exp => {
    const matchesSearch = exp.merchant?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          exp.expense_id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          exp.reference_id?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'All' || exp.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const columns = [
    { 
      key: 'expense_id', 
      label: 'Expense ID',
      render: (row) => <span className="text-muted fw-medium">{row.expense_id}</span>
    },
    { 
      key: 'date', 
      label: 'Date', 
      render: (row) => new Date(row.date).toLocaleDateString() 
    },
    { 
      key: 'merchant', 
      label: 'Merchant / Vendor',
      render: (row) => <span className="fw-medium text-dark">{row.merchant}</span>
    },
    { 
      key: 'category', 
      label: 'Category',
      render: (row) => (
        <span className="badge bg-light text-secondary border">
          {row.category}
        </span>
      )
    },
    { 
      key: 'amount', 
      label: 'Amount',
      render: (row) => <span className="fw-bold">Rs. {row.amount}</span>
    },
    { 
      key: 'status', 
      label: 'Status',
      render: (row) => (
        <Badge variant={row.status === 'Cleared' ? 'success' : 'warning'}>
          {row.status}
        </Badge>
      )
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (row) => (
        <div className="d-flex gap-2">
          <button 
            className="btn btn-sm btn-light text-primary"
            onClick={() => handleEdit(row)}
            title="Edit"
          >
            <FiEdit />
          </button>
          <button 
            className="btn btn-sm btn-light text-danger"
            onClick={() => handleDelete(row._id || row.id)}
            title="Delete"
          >
            <FiTrash2 />
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="container-fluid p-4">
      <PageHeader
        title="Expense Tracker"
        description="Monitor and categorize business expenses"
        actions={
          <Button variant="primary" onClick={handleAdd}>
            <FiPlus className="me-2" /> Add Expense
          </Button>
        }
      />

      {/* Metrics Row */}
      <div className="row g-4 mb-4">
        <div className="col-12 col-md-3">
          <StatCard
            label="This Month's Expenses"
            value={metrics.this_month}
            format="currency"
            icon={FiTrendingDown}
            trend="up" // Since it's expenses, going up could be bad or expected, just a visual indicator
          />
        </div>
        <div className="col-12 col-md-3">
          <StatCard
            label="Top Category"
            value={metrics.top_category}
            icon={FiPieChart}
            format="text"
            trend={`Rs. ${metrics.top_category_amount}`}
          />
        </div>
        <div className="col-12 col-md-3">
          <StatCard
            label="Average Daily Expense"
            value={metrics.average_daily}
            format="currency"
            icon={FiDollarSign}
          />
        </div>
        <div className="col-12 col-md-3">
          <StatCard
            label="Year-to-Date (YTD)"
            value={metrics.ytd}
            format="currency"
            icon={FiList}
          />
        </div>
      </div>

      <div className="card shadow-sm border-0">
        <div className="card-header bg-white border-bottom pt-4 pb-3">
          <div className="d-flex flex-column flex-xl-row justify-content-between align-items-xl-center gap-3">
            <h5 className="mb-0 text-nowrap">All Expenses</h5>
            
            {/* Filters */}
            <div className="d-flex flex-wrap flex-xl-nowrap gap-2 align-items-center justify-content-xl-end w-100">
              <div style={{ minWidth: '220px', flex: 1 }}>
                <SearchBar 
                  value={searchTerm} 
                  onChange={setSearchTerm} 
                  placeholder="Search merchant or ID..." 
                />
              </div>

              <select 
                className="form-select bg-light"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                style={{ width: '140px' }}
              >
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>

              <select 
                className="form-select bg-light"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                style={{ width: '140px' }}
              >
                <option value="All">All Status</option>
                <option value="Cleared">Cleared</option>
                <option value="Pending">Pending</option>
              </select>

              <div className="d-flex align-items-center gap-1 bg-light rounded p-1 border">
                <span className="text-muted small ms-2">From:</span>
                <input 
                  type="date" 
                  className="form-control form-control-sm border-0 bg-transparent px-1" 
                  value={dateRange.start}
                  onChange={(e) => setDateRange(prev => ({...prev, start: e.target.value}))}
                  style={{ width: '110px' }}
                />
                <span className="text-muted small ms-1">To:</span>
                <input 
                  type="date" 
                  className="form-control form-control-sm border-0 bg-transparent px-1" 
                  value={dateRange.end}
                  onChange={(e) => setDateRange(prev => ({...prev, end: e.target.value}))}
                  style={{ width: '110px' }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="card-body p-0">
          <Table 
            columns={columns} 
            data={filteredExpenses} 
            loading={loading}
            emptyMessage="No expenses found matching your filters."
          />
        </div>
      </div>

      <ExpenseModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        expense={selectedExpense}
        onSave={handleModalSave}
      />
    </div>
  );
};

export default Expenses;
