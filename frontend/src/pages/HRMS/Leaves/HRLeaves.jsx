import React, { useState, useEffect } from 'react';
import PageHeader from '@/components/common/PageHeader/PageHeader';
import Button from '@/components/common/Button/Button';
import Table from '@/components/common/Table/Table';
import { FiClock, FiCheck, FiX, FiUsers, FiRefreshCw, FiEye, FiCalendar } from 'react-icons/fi';
import api from '@/api/axiosClient';
import toast from 'react-hot-toast';

export default function HRLeaves({ isHR, view, setView }) {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Filter States
  const [filterEmployee, setFilterEmployee] = useState('All Employees');
  const [filterType, setFilterType] = useState('All Leave Types');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  
  // Tab State
  const [activeTab, setActiveTab] = useState('Pending');

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await api.get('/hrms/leaves');
      setLeaves(res || []);
    } catch (error) {
      console.error("Failed to fetch leaves data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleReset = () => {
    setFilterEmployee('All Employees');
    setFilterType('All Leave Types');
    setStartDate('');
    setEndDate('');
  };

  const calculateDays = (start, end, dayType) => {
    if (!start || !end) return 1;
    const s = new Date(start);
    const e = new Date(end);
    let days = Math.round((e - s) / (1000 * 60 * 60 * 24)) + 1;
    if (dayType === "First Half" || dayType === "Second Half") {
      days = days * 0.5;
    }
    return days;
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-GB');
  };

  const formatDateTime = (dateStr) => {
    if (!dateStr) return "-";
    const d = new Date(dateStr);
    return `${d.toLocaleDateString('en-GB')} ${d.toLocaleTimeString('en-US', {hour: '2-digit', minute:'2-digit', hour12: false})}`;
  };

  const updateLeaveStatus = async (id, status) => {
    try {
      await api.put(`/hrms/leaves/${id}/status`, { status });
      toast.success(`Leave ${status} successfully`);
      fetchData(); // Refresh data
    } catch (err) {
      console.error(err);
      toast.error('Failed to update leave status');
    }
  };

  // Get unique employees for dropdown
  const uniqueEmployees = [...new Set(leaves.map(l => l.employee_name).filter(Boolean))];

  // Filtering Logic
  let filtered = leaves.filter(l => {
    if (filterEmployee !== 'All Employees' && l.employee_name !== filterEmployee) return false;
    if (filterType !== 'All Leave Types' && l.leave_type !== filterType) return false;
    
    if (startDate) {
      if (new Date(l.start_date) < new Date(startDate)) return false;
    }
    if (endDate) {
      if (new Date(l.end_date) > new Date(endDate)) return false;
    }
    
    // Tab logic
    if (activeTab === 'Pending' && l.status !== 'Pending') return false;
    if (activeTab === 'Approved' && l.status !== 'Approved') return false;
    
    return true;
  });

  const columns = [
    { label: "Sr. No.", key: "sr_no", render: (row) => filtered.indexOf(row) + 1 },
    { 
      label: "Employee", 
      key: "employee", 
      render: (row) => {
        const name = row.employee_name || "Unknown";
        const initials = name.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase();
        return (
          <div className="d-flex align-items-center gap-2">
            <div className="rounded-circle d-flex align-items-center justify-content-center text-warning" style={{ width: 32, height: 32, backgroundColor: '#fef3c7', fontWeight: 600, fontSize: '12px' }}>
              {initials}
            </div>
            <span className="fw-semibold text-dark">{name}</span>
          </div>
        );
      }
    },
    { 
      label: "Leave Type", 
      key: "leave_type",
      render: (row) => <span className="text-muted small border px-2 py-1 rounded-pill">{row.leave_type}</span>
    },
    { 
      label: "Leave Period", 
      key: "period", 
      render: (row) => (
        <span className="text-muted small">
          <FiCalendar className="me-1" /> {formatDate(row.start_date)} to {formatDate(row.end_date)}
        </span>
      )
    },
    { label: "Duration", key: "duration", render: (row) => <span className="fw-bold">{calculateDays(row.start_date, row.end_date, row.day_type)} Day</span> },
    { label: "Submitted", key: "submitted", render: (row) => <span className="text-muted small">{formatDateTime(row.created_at)}</span> },
    { 
      label: "Status", 
      key: "status",
      render: (row) => {
        const status = row.status || "Pending";
        let colorClass = "text-warning border-warning";
        if (status === "Approved") colorClass = "text-success border-success";
        if (status === "Rejected" || status === "Cancelled") colorClass = "text-danger border-danger";
        
        return (
          <select 
            className={`form-select form-select-sm fw-semibold rounded-pill bg-transparent border pe-4 ${colorClass}`} 
            style={{ width: 'auto', fontSize: '12px', minWidth: '100px' }}
            value={status}
            onChange={(e) => updateLeaveStatus(row._id, e.target.value)}
          >
            <option value="Pending" className="text-dark">PENDING</option>
            <option value="Approved" className="text-success">APPROVED</option>
            <option value="Rejected" className="text-danger">REJECTED</option>
            <option value="Cancelled" className="text-danger">CANCELLED</option>
          </select>
        );
      }
    },
    { 
      label: "Approver / Reviewer", 
      key: "approver", 
      render: (row) => {
        if (!row.reviewer_name || row.status === 'Pending') return <span className="text-muted fst-italic small"><FiClock className="me-1"/>Awaiting Action</span>;
        return <span className="text-muted small">{row.reviewer_name}</span>;
      }
    }
  ];

  // Stats
  const pendingCount = leaves.filter(l => l.status === 'Pending').length;
  const approvedCount = leaves.filter(l => l.status === 'Approved').length;
  const rejectedCount = leaves.filter(l => ['Rejected', 'Cancelled'].includes(l.status)).length;
  const totalCount = leaves.length;

  return (
    <div className="aio-hr-leaves-page aio-leaves-page h-100 d-flex flex-column">
      <PageHeader 
        title="Employee Leave Requests"
        description="Review, filter, and approve time-off and leave requests submitted by all organization members."
        actions={
          isHR && (
            <div className="d-flex align-items-center gap-2">
              <div className="btn-group" role="group">
                <button 
                  type="button" 
                  className="btn btn-sm"
                  style={view === 'team' 
                    ? { backgroundColor: 'var(--color-primary)', borderColor: 'var(--color-primary)', color: 'white' } 
                    : { backgroundColor: 'transparent', borderColor: 'rgba(255,255,255,0.3)', color: 'rgba(255,255,255,0.8)' }}
                  onClick={() => setView('team')}
                  onMouseEnter={(e) => { if(view !== 'team') e.target.style.color = 'white'; }}
                  onMouseLeave={(e) => { if(view !== 'team') e.target.style.color = 'rgba(255,255,255,0.8)'; }}
                >
                  Employee Requests
                </button>
                <button 
                  type="button" 
                  className="btn btn-sm"
                  style={view === 'personal' 
                    ? { backgroundColor: 'var(--color-primary)', borderColor: 'var(--color-primary)', color: 'white' } 
                    : { backgroundColor: 'transparent', borderColor: 'rgba(255,255,255,0.3)', color: 'rgba(255,255,255,0.8)' }}
                  onClick={() => setView('personal')}
                  onMouseEnter={(e) => { if(view !== 'personal') e.target.style.color = 'white'; }}
                  onMouseLeave={(e) => { if(view !== 'personal') e.target.style.color = 'rgba(255,255,255,0.8)'; }}
                >
                  My Leaves
                </button>
              </div>
            </div>
          )
        }
      />

      <div className="container-fluid flex-grow-1">
        
        {/* Stat Cards */}
        <div className="row g-3 mb-4 mt-2">
          
          {/* Card 1: Pending Review */}
          <div className="col-12 col-md-6 col-lg-3">
            <div className="aio-card p-3 h-100 d-flex align-items-center gap-3">
              <div className="icon-wrapper bg-warning-subtle text-warning p-3 rounded-circle">
                <FiClock size={24} />
              </div>
              <div>
                <div className="text-muted small fw-medium text-uppercase tracking-wider mb-1">Pending Review</div>
                <h3 className="mb-0 fw-bold">{pendingCount}</h3>
              </div>
            </div>
          </div>

          {/* Card 2: Approved Leaves */}
          <div className="col-12 col-md-6 col-lg-3">
            <div className="aio-card p-3 h-100 d-flex align-items-center gap-3">
              <div className="icon-wrapper bg-success-subtle text-success p-3 rounded-circle">
                <FiCheck size={24} />
              </div>
              <div>
                <div className="text-muted small fw-medium text-uppercase tracking-wider mb-1">Approved Leaves</div>
                <h3 className="mb-0 fw-bold">{approvedCount}</h3>
              </div>
            </div>
          </div>

          {/* Card 3: Rejected / Cancelled */}
          <div className="col-12 col-md-6 col-lg-3">
            <div className="aio-card p-3 h-100 d-flex align-items-center gap-3">
              <div className="icon-wrapper bg-danger-subtle text-danger p-3 rounded-circle">
                <FiX size={24} />
              </div>
              <div>
                <div className="text-muted small fw-medium text-uppercase tracking-wider mb-1">Rejected / Cancelled</div>
                <h3 className="mb-0 fw-bold">{rejectedCount}</h3>
              </div>
            </div>
          </div>

          {/* Card 4: Total Requests */}
          <div className="col-12 col-md-6 col-lg-3">
            <div className="aio-card p-3 h-100 d-flex align-items-center gap-3">
              <div className="icon-wrapper bg-primary-subtle text-primary p-3 rounded-circle">
                <FiUsers size={24} />
              </div>
              <div>
                <div className="text-muted small fw-medium text-uppercase tracking-wider mb-1">Total Requests</div>
                <h3 className="mb-0 fw-bold">{totalCount}</h3>
              </div>
            </div>
          </div>
          
        </div>

        {/* Filters */}
        <div className="aio-card p-3 mb-4">
          <div className="row g-3 align-items-end">
            <div className="col-md-3">
              <label className="form-label small fw-medium text-muted">Filter Employee</label>
              <select className="form-select bg-light-subtle" value={filterEmployee} onChange={(e) => setFilterEmployee(e.target.value)}>
                <option value="All Employees">All Employees</option>
                {uniqueEmployees.map(name => <option key={name} value={name}>{name}</option>)}
              </select>
            </div>
            <div className="col-md-2">
              <label className="form-label small fw-medium text-muted">Leave Type</label>
              <select className="form-select bg-light-subtle" value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                <option value="All Leave Types">All Leave Types</option>
                <option value="Monthly Leave">Monthly Leave</option>
                <option value="Sick Leave">Sick Leave</option>
                <option value="Casual Leave">Casual Leave</option>
                <option value="Unpaid Leave">Unpaid Leave</option>
                <option value="Other">Other Leave</option>
              </select>
            </div>
            <div className="col-md-4">
              <label className="form-label small fw-medium text-muted">Leave Period Range</label>
              <div className="d-flex align-items-center gap-2 bg-light-subtle rounded border p-1 px-2">
                <input type="date" className="form-control border-0 bg-transparent py-1 shadow-none" value={startDate} onChange={e => setStartDate(e.target.value)} />
                <span className="text-muted">&rarr;</span>
                <input type="date" className="form-control border-0 bg-transparent py-1 shadow-none" value={endDate} onChange={e => setEndDate(e.target.value)} />
                <FiCalendar className="text-muted" />
              </div>
            </div>
            <div className="col-md-3 d-flex gap-2">
              <Button variant="outline" icon={FiRefreshCw} onClick={handleReset} className="w-100 bg-light-subtle border text-muted">
                Reset Filters
              </Button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <ul className="nav nav-tabs aio-nav-tabs">
          <li className="nav-item flex-grow-1 text-center" style={{ maxWidth: '200px' }}>
            <button
              className={`nav-link w-100 ${activeTab === 'Pending' ? 'active' : ''}`}
              onClick={() => setActiveTab('Pending')}
            >
              Pending
            </button>
          </li>
          <li className="nav-item flex-grow-1 text-center" style={{ maxWidth: '200px' }}>
            <button
              className={`nav-link w-100 ${activeTab === 'Approved' ? 'active' : ''}`}
              onClick={() => setActiveTab('Approved')}
            >
              Approved
            </button>
          </li>
          <li className="nav-item flex-grow-1 text-center" style={{ maxWidth: '200px' }}>
            <button
              className={`nav-link w-100 ${activeTab === 'All' ? 'active' : ''}`}
              onClick={() => setActiveTab('All')}
            >
              All
            </button>
          </li>
        </ul>

        {/* Table */}
        <div className="aio-card p-0 mt-n1 border-top-0" style={{ borderTopLeftRadius: 0 }}>
          <div className="p-3 border-bottom d-flex justify-content-between align-items-center">
            <span className="small text-muted">Showing 1 to {filtered.length} of {filtered.length} requests</span>
          </div>
          <Table 
            columns={columns} 
            data={filtered} 
            loading={loading}
            emptyMessage={`No ${activeTab.toLowerCase()} requests found.`}
          />
        </div>
      </div>
    </div>
  );
}
