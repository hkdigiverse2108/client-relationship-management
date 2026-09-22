import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/common/PageHeader';
import ExpenseModal from '../components/finance/ExpenseModal';
import ExpenseStatCard from '../components/common/ExpenseStatCard';
import CustomDataTable from '../components/common/CustomDataTable';
import CustomDatePicker from '../components/common/CustomDatePicker';
import CustomSelect from '../components/common/CustomSelect';

const Expenses = () => {
  const [searchQuery_expenses, setSearchQuery_expenses] = useState('');
  const [isExpenseModalOpen, setExpenseModalOpen] = useState(false);
  const [dateRange, setDateRange] = useState([null, null]);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const categoryOptions = [
    { value: '', label: 'All Categories' },
    { value: 'Software', label: 'Software' },
    { value: 'Travel', label: 'Travel' },
    { value: 'Office Supplies', label: 'Office Supplies' },
    { value: 'Marketing', label: 'Marketing' }
  ];

  const statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'Cleared', label: 'Cleared' },
    { value: 'Pending', label: 'Pending' }
  ];

  const columns = [
    { 
      name: 'Expense ID', 
      selector: row => row.expense_id, 
      cell: row => <span className="text-primary fw-medium">{row.expense_id}</span>,
      sortable: true 
    },
    { name: 'Date', selector: row => row.date, sortable: true },
    { name: 'Merchant / Vendor', selector: row => row.merchant, sortable: true },
    { 
      name: 'Category', 
      selector: row => row.category, 
      cell: row => <span className="badge badge-soft-dark border">{row.category}</span>,
      sortable: true 
    },
    { 
      name: 'Amount', 
      selector: row => row.amount, 
      cell: row => <span className="fw-bold text-dark">Rs. {row.amount}</span>,
      sortable: true 
    },
    { 
      name: 'Status', 
      selector: row => row.status,
      cell: row => (
        <span className={`badge badge-xs ${row.status === 'Cleared' ? 'badge-success' : 'badge-warning'}`}>
          {row.status}
        </span>
      ),
      sortable: true 
    }
  ];

  const expenseList = [
    { expense_id: 'EXP-1454', date: '25 Aug 2024', merchant: 'Amazon Web Services', category: 'Software', amount: '2,500', status: 'Cleared' },
    { expense_id: 'EXP-1455', date: '28 Aug 2024', merchant: 'Office Depot', category: 'Office Supplies', amount: '120', status: 'Pending' },
    { expense_id: 'EXP-1456', date: '02 Sep 2024', merchant: 'Uber', category: 'Travel', amount: '45', status: 'Cleared' },
    { expense_id: 'EXP-1457', date: '05 Sep 2024', merchant: 'Facebook Ads', category: 'Marketing', amount: '3,200', status: 'Cleared' },
  ];

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
              <a href="#" onClick={(e) => { e.preventDefault(); setExpenseModalOpen(true); }}
                className="btn btn-primary d-flex align-items-center">
                <i className="ti ti-circle-plus me-2"></i>Add Expenses
              </a>
            </div>
          </PageHeader>

          <div className="row">
            <ExpenseStatCard 
              title="Total Expense"
              value="$45,221"
              icon="ti-brand-shopee"
              iconColor="primary"
              bgImage="/assets/img/reports-img/total-expense.svg"
              trendValue="+20.01%"
              trendColor="success"
            />
            <ExpenseStatCard 
              title="Approved Expense"
              value="$45,221"
              icon="ti-brand-shopee"
              iconColor="success"
              bgImage="/assets/img/reports-img/approved-expense.svg"
              trendValue="+17.01%"
              trendColor="success"
            />
            <ExpenseStatCard 
              title="Net Pay"
              value="$45,221,45"
              icon="ti-brand-shopee"
              iconColor="skyblue"
              bgImage="/assets/img/reports-img/pending-expense.svg"
              trendValue="+10.13%"
              trendColor="success"
            />
            <ExpenseStatCard 
              title="Allowances"
              value="$45,221,45"
              icon="ti-brand-shopee"
              iconColor="danger"
              bgImage="/assets/img/reports-img/reject-expense.svg"
              trendValue="-10.17%"
              trendColor="danger"
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
                      placeholderText=""
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
                <div style={{ minWidth: '150px' }}>
                  <CustomSelect 
                    options={statusOptions}
                    value={statusOptions.find(o => o.value === statusFilter) || statusOptions[0]}
                    onChange={(option) => setStatusFilter(option ? option.value : '')}
                  />
                </div>
              </div>
            </div>
            
            <div className="card-body p-0">
              <CustomDataTable 
                columns={columns}
                data={expenseList}
                searchQuery={searchQuery_expenses}
                onSearch={(e) => setSearchQuery_expenses(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="footer d-sm-flex align-items-center justify-content-between border-top bg-white p-3">
          <p className="mb-0">2014 - 2026 &copy; SmartHR.</p>
          <p>Designed &amp; Developed By <a href="#" onClick={(e) => e.preventDefault()} className="text-primary">Dreams</a></p>
        </div>
      </div>
      
      <ExpenseModal isOpen={isExpenseModalOpen} onClose={() => setExpenseModalOpen(false)} />
    </>
  );
};

export default Expenses;
