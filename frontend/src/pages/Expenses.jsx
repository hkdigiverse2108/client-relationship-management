import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/common/PageHeader';
import ExpenseModal from '../components/finance/ExpenseModal';
import ConfirmationModal from '../components/ConfirmationModal';
import ExpenseStatCard from '../components/common/ExpenseStatCard';
import CustomDataTable from '../components/common/CustomDataTable';
import CustomDatePicker from '../components/common/CustomDatePicker';
import CustomSelect from '../components/common/CustomSelect';
import api from '../api/axiosClient';
import toast from 'react-hot-toast';

const formatCurrency = (amount) => {
  if (amount === undefined || amount === null || amount === '') return '-';
  return 'Rs. ' + Number(amount).toLocaleString('en-IN');
};

const formatDate = (dateString) => {
  if (!dateString) return '-';
  const d = new Date(dateString);
  if (isNaN(d.getTime())) return dateString;
  return d.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
};

const Expenses = () => {
  const [searchQuery_expenses, setSearchQuery_expenses] = useState('');
  const [isExpenseModalOpen, setExpenseModalOpen] = useState(false);
  const [expenseToEdit, setExpenseToEdit] = useState(null);
  const [expenseToDelete, setExpenseToDelete] = useState(null);
  
  const [dateRange, setDateRange] = useState([null, null]);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [stats, setStats] = useState({ total: 0, approved: 0, pending: 0, rejected: 0 });

  const fetchExpenses = async () => {
    try {
      let url = '/expenses?';
      if (categoryFilter) url += `category=${categoryFilter}&`;
      if (dateRange[0]) url += `start_date=${dateRange[0].toISOString().split('T')[0]}&`;
      if (dateRange[1]) url += `end_date=${dateRange[1].toISOString().split('T')[0]}&`;
      
      const res = await api.get(url);
      const data = Array.isArray(res) ? res : [];
      setExpenses(data);
      
      // Calculate Stats
      let total = 0;
      let approved = 0;
      let pending = 0;
      let other = 0;
      data.forEach(exp => {
        const amt = Number(exp.amount) || 0;
        total += amt;
        if (exp.status === 'Cleared') approved += amt;
        if (exp.status === 'Pending') pending += amt;
        if (exp.category && exp.category.toLowerCase() === 'other') other += amt;
      });
      setStats({ total, approved, pending, other });
    } catch (error) {
      toast.error('Failed to load expenses');
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await api.get('/categories');
      setCategories(Array.isArray(res) ? res : []);
    } catch (error) {
      // toast.error('Failed to load categories');
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, [categoryFilter, dateRange]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCreateCategory = async (categoryName) => {
    try {
      const res = await api.post('/categories', { name: categoryName });
      setCategories(prev => [...prev, res]);
      toast.success('Category created successfully');
    } catch (error) {
      toast.error('Failed to create category');
    }
  };

  const handleSaveExpense = async (formData) => {
    try {
      if (expenseToEdit) {
        await api.put(`/expenses/${expenseToEdit._id}`, formData);
        toast.success('Expense updated successfully');
      } else {
        await api.post('/expenses', formData);
        toast.success('Expense added successfully');
      }
      setExpenseModalOpen(false);
      setExpenseToEdit(null);
      fetchExpenses();
    } catch (error) {
      toast.error('Failed to save expense');
    }
  };

  const handleDeleteExpense = async () => {
    if (!expenseToDelete) return;
    try {
      // Soft delete using PUT by setting is_deleted
      await api.put(`/expenses/${expenseToDelete._id}`, { is_deleted: true });
      toast.success('Expense deleted successfully');
      setExpenseToDelete(null);
      fetchExpenses();
    } catch (error) {
      toast.error('Failed to delete expense');
    }
  };

  const categoryOptions = [
    { value: '', label: 'All Categories' },
    ...(Array.isArray(categories) ? categories : []).map(c => ({ value: c.name, label: c.name }))
  ];

  const statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'Cleared', label: 'Cleared' },
    { value: 'Pending', label: 'Pending' }
  ];

  const filteredExpenses = expenses.filter(exp => {
    if (statusFilter && exp.status !== statusFilter) return false;
    return true;
  });

  const columns = [
    { 
      name: 'Expense ID', 
      selector: row => row.expense_id, 
      cell: row => <span className="text-primary fw-medium">{row.expense_id || '-'}</span>,
      sortable: true 
    },
    { name: 'Date', selector: row => row.date, cell: row => formatDate(row.date), sortable: true },
    { name: 'Merchant / Vendor', selector: row => row.merchant, cell: row => row.merchant || '-', sortable: true },
    { 
      name: 'Category', 
      selector: row => row.category, 
      cell: row => row.category ? <span className="badge badge-soft-dark border">{row.category}</span> : '-',
      sortable: true 
    },
    { 
      name: 'Amount', 
      selector: row => row.amount, 
      cell: row => <span className="fw-bold text-dark">{formatCurrency(row.amount)}</span>,
      sortable: true 
    },
    { 
      name: 'Status', 
      selector: row => row.status,
      cell: row => (
        <span className={`badge badge-xs ${row.status === 'Cleared' ? 'badge-success' : 'badge-warning'}`}>
          {row.status || '-'}
        </span>
      ),
      sortable: true 
    },
    {
      name: 'Action',
      cell: row => (
        <div className="action-icon d-inline-flex">
          <Link to="#" onClick={(e) => { e.preventDefault(); setExpenseToEdit(row); setExpenseModalOpen(true); }} className="me-2 text-muted" title="Edit">
            <i className="ti ti-edit"></i>
          </Link>
          <Link to="#" onClick={(e) => { e.preventDefault(); setExpenseToDelete(row); }} data-bs-toggle="modal" data-bs-target="#deleteExpenseModal" className="text-muted" title="Delete">
            <i className="ti ti-trash"></i>
          </Link>
        </div>
      ),
      right: true
    }
  ];

  const clearFilters = () => {
    setDateRange([null, null]);
    setCategoryFilter('');
    setStatusFilter('');
  };

  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <PageHeader 
            title="Expense Tracker"
            breadcrumbs={[
              { label: 'Dashboard' },
              { label: 'Finance & Billing' },
              { label: 'Expenses', active: true }
            ]}
          >
            <div className="mb-2">
              <a href="#" onClick={(e) => { e.preventDefault(); setExpenseToEdit(null); setExpenseModalOpen(true); }}
                className="btn btn-primary d-flex align-items-center">
                <i className="ti ti-circle-plus me-2"></i>Add Expenses
              </a>
            </div>
          </PageHeader>

          <div className="row">
            <ExpenseStatCard 
              title="Total Expense"
              value={formatCurrency(stats.total)}
              icon="ti-brand-shopee"
              iconColor="primary"
              bgImage="/assets/img/reports-img/total-expense.svg"
            />
            <ExpenseStatCard 
              title="Cleared Expense"
              value={formatCurrency(stats.approved)}
              icon="ti-brand-shopee"
              iconColor="success"
              bgImage="/assets/img/reports-img/approved-expense.svg"
            />
            <ExpenseStatCard 
              title="Pending Expense"
              value={formatCurrency(stats.pending)}
              icon="ti-brand-shopee"
              iconColor="skyblue"
              bgImage="/assets/img/reports-img/pending-expense.svg"
            />
            <ExpenseStatCard 
              title="Other Category"
              value={formatCurrency(stats.other)}
              icon="ti-brand-shopee"
              iconColor="danger"
              bgImage="/assets/img/reports-img/reject-expense.svg"
            />
          </div>

          <div className="card">
            <div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
              <h5>Expense List</h5>
              <div className="d-flex my-xl-auto right-content align-items-center flex-wrap row-gap-3">
                <div className="me-3">
                  <div className="input-icon position-relative w-100">
                    <span className="input-icon-addon"><i className="ti ti-calendar"></i></span>
                    <CustomDatePicker 
                      selected={dateRange[0]}
                      onChange={(update) => setDateRange(update)}
                      startDate={dateRange[0]}
                      endDate={dateRange[1]}
                      isRange={true}
                      placeholderText="Select Date"
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="me-3" style={{ minWidth: '150px' }}>
                  <CustomSelect 
                    options={categoryOptions}
                    value={categoryOptions.find(o => o.value === categoryFilter) || categoryOptions[0]}
                    onChange={(option) => setCategoryFilter(option ? option.value : '')}
                  />
                </div>
                <div className="me-3" style={{ minWidth: '150px' }}>
                  <CustomSelect 
                    options={statusOptions}
                    value={statusOptions.find(o => o.value === statusFilter) || statusOptions[0]}
                    onChange={(option) => setStatusFilter(option ? option.value : '')}
                  />
                </div>
                {(dateRange[0] || dateRange[1] || categoryFilter || statusFilter) && (
                  <div>
                    <button onClick={clearFilters} className="btn btn-outline-danger d-inline-flex align-items-center">
                      <i className="ti ti-x me-1"></i>Clear
                    </button>
                  </div>
                )}
              </div>
            </div>
            
            <div className="card-body p-0">
              <CustomDataTable 
                columns={columns}
                data={filteredExpenses}
                searchQuery={searchQuery_expenses}
                onSearch={(e) => setSearchQuery_expenses(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
      
      {isExpenseModalOpen && (
        <ExpenseModal 
          isOpen={isExpenseModalOpen} 
          onClose={() => setExpenseModalOpen(false)} 
          expense={expenseToEdit}
          categories={categories}
          onCreateCategory={handleCreateCategory}
          onSave={handleSaveExpense}
        />
      )}

      <ConfirmationModal 
        id="deleteExpenseModal"
        title="Delete Expense"
        message="Are you sure you want to delete this expense? This action cannot be undone."
        onConfirm={handleDeleteExpense}
      />
    </>
  );
};

export default Expenses;
