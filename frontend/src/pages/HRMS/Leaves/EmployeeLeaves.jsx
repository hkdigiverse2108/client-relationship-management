import React, { useState, useEffect } from 'react';
import PageHeader from '@/components/common/PageHeader/PageHeader';
import Button from '@/components/common/Button/Button';
import Input from '@/components/common/Input/Input';
import Table from '@/components/common/Table/Table';
import { FiPlus, FiSearch, FiRefreshCw, FiCalendar, FiActivity, FiCoffee, FiUserX, FiMoreHorizontal } from 'react-icons/fi';
import LeaveForm from './LeaveForm';
import api from '@/api/axiosClient';
import './Leaves.css';

export default function EmployeeLeaves({ isHR, view, setView }) {
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // New States
  const [balance, setBalance] = useState(null);
  const [activeTab, setActiveTab] = useState('Leave History');
  
  // Filter States
  const [filterType, setFilterType] = useState('All Leave Types');
  const [filterStatus, setFilterStatus] = useState('All');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const fetchData = async () => {
    try {
      setLoading(true);
      const [leavesRes, balanceRes] = await Promise.all([
        api.get('/hrms/leaves'),
        api.get('/hrms/leaves/balance')
      ]);
      setLeaves(leavesRes || []);
      setBalance(balanceRes || null);
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
    setFilterType('All Leave Types');
    setFilterStatus('All');
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

  const checkIsUpcoming = (startDateStr) => {
    if (!startDateStr) return false;
    const today = new Date();
    today.setHours(0,0,0,0);
    const parts = startDateStr.split('-');
    if (parts.length === 3) {
      const [year, month, day] = parts;
      const startDateObj = new Date(parseInt(year, 10), parseInt(month, 10) - 1, parseInt(day, 10));
      startDateObj.setHours(0,0,0,0);
      return startDateObj > today;
    }
    return false;
  };

  // Filter logic
  let filtered = leaves.filter(l => {
    if (filterType !== 'All Leave Types' && l.leave_type !== filterType) return false;
    if (filterStatus !== 'All' && l.status !== filterStatus) return false;
    
    if (startDate) {
      if (new Date(l.start_date) < new Date(startDate)) return false;
    }
    if (endDate) {
      if (new Date(l.end_date) > new Date(endDate)) return false;
    }
    
    // Tab logic
    const isUpcoming = checkIsUpcoming(l.start_date);
    
    if (activeTab === 'Upcoming Time Off' && !isUpcoming) return false;
    if (activeTab === 'Leave History' && isUpcoming) return false;
    
    return true;
  });

  const columns = [
    { label: "Sr. No.", key: "sr_no", render: (row) => filtered.indexOf(row) + 1 },
    { label: "Leave Type", key: "leave_type" },
    { label: "Day Type", key: "day_type", render: (row) => row.day_type || "Full Day" },
    { label: "From", key: "start_date", render: (row) => formatDate(row.start_date) },
    { label: "Approved By", key: "reviewer_name", render: (row) => row.reviewer_name || "-" }, 
    { label: "To", key: "end_date", render: (row) => formatDate(row.end_date) },
    { label: "No of Days", key: "no_of_days", render: (row) => calculateDays(row.start_date, row.end_date, row.day_type) },
    { 
      label: "Status", 
      key: "status",
      render: (row) => {
        let badgeClass = "badge bg-secondary";
        const status = row.status || "Pending";
        if (status === "Approved") badgeClass = "badge bg-success";
        if (status === "Rejected") badgeClass = "badge bg-danger";
        if (status === "Cancelled") badgeClass = "badge bg-dark";
        if (status === "Pending") badgeClass = "badge bg-warning text-dark";
        return <span className={badgeClass}>{status}</span>;
      }
    }
  ];

  const statCards = [
    { title: "Monthly Leave", key: "Monthly Leave", icon: FiCalendar, color: "primary" },
    { title: "Sick Leave", key: "Sick Leave", icon: FiActivity, color: "danger" },
    { title: "Casual Leave", key: "Casual Leave", icon: FiCoffee, color: "warning" },
    { title: "Unpaid Leave", key: "Unpaid Leave", icon: FiUserX, color: "secondary" },
    { title: "Other Leave", key: "Other Leave", icon: FiMoreHorizontal, color: "info" }
  ];

  return (
    <div className="aio-leaves-page">
      <PageHeader 
        title="Leave Management"
        description="Manage employee leave requests & approvals"
        actions={
          <div className="d-flex align-items-center gap-3">
            {isHR && (
              <div className="d-flex align-items-center gap-2 me-2">
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
            )}
            <Button 
              variant="gradient" 
              icon={FiPlus}
              onClick={() => setShowRequestModal(true)}
            >
              Request Leave
            </Button>
          </div>
        }
      />

      <div className="container-fluid flex-grow-1">
        
        {/* Stat Cards */}
        <div className="row g-3 mb-4">
          {statCards.map((card, idx) => {
            let data = balance?.[card.key] || { allowed: 0, taken: 0, pending: 0, remaining: 0 };
            
            // Merge "Other" and "Other Leave" for backward compatibility
            if (card.key === "Other Leave" && balance?.["Other"]) {
              data = {
                allowed: (data.allowed || 0) + (balance["Other"].allowed || 0),
                taken: (data.taken || 0) + (balance["Other"].taken || 0),
                pending: (data.pending || 0) + (balance["Other"].pending || 0),
              };
            }

            const taken = data.taken || 0;
            const pending = data.pending || 0;
            const overall = taken + pending; // Overall means total taken + pending leaves of this type
            
            const Icon = card.icon;
            const isMonthly = card.key === "Monthly Leave";

            // For Monthly Leave, calculate unpaid days (anything beyond the 1 free day)
            const unpaid = isMonthly ? Math.max(0, overall - 1) : 0;
            const currentMonth = new Date().toLocaleString('default', { month: 'long' });
            const currentMonthShort = new Date().toLocaleString('default', { month: 'short' });

            return (
              <div className="col" key={idx} style={{ minWidth: "220px" }}>
                <div className="aio-card h-100 p-3 d-flex flex-column justify-content-between">
                  
                  {/* Top Row: Title and Icon */}
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <span className="text-dark fw-semibold" style={{ fontSize: '13px' }}>{card.title}</span>
                    <div className="d-flex align-items-center justify-content-center rounded" style={{ width: '28px', height: '28px', backgroundColor: '#e8f5e9', color: '#2e7d32' }}>
                      <Icon size={14} />
                    </div>
                  </div>
                  
                  {/* Middle Row: Big Number */}
                  <div className="d-flex align-items-baseline mb-3">
                    <h2 className="mb-0 fw-bold me-2 text-dark" style={{ fontSize: '28px' }}>{taken}</h2>
                    <span className="text-muted" style={{ fontSize: '11px' }}>Days Taken ({currentMonth})</span>
                  </div>
                  
                  {/* Bottom Row: Details */}
                  {isMonthly ? (
                    <div className="d-flex justify-content-between text-muted border-top pt-2" style={{ fontSize: '11px' }}>
                      <div className="d-flex flex-column">
                        <span className="mb-1">Pending</span>
                        <strong className="text-dark">{pending} Days</strong>
                      </div>
                      <div className="d-flex flex-column text-center">
                        <span className="mb-1">Free Allowance</span>
                        <strong className="text-dark">1 Free Day</strong>
                      </div>
                      <div className="d-flex flex-column text-end">
                        <span className="mb-1">Unpaid ({currentMonthShort})</span>
                        <strong className="text-warning">{unpaid} Day(s)</strong>
                      </div>
                    </div>
                  ) : (
                    <div className="d-flex justify-content-between text-muted border-top pt-2" style={{ fontSize: '11px' }}>
                      <div className="d-flex flex-column">
                        <span className="mb-1">Pending</span>
                        <strong className="text-dark">{pending} Days</strong>
                      </div>
                      <div className="d-flex flex-column text-end">
                        <span className="mb-1">Overall</span>
                        <strong className="text-warning">{overall} Days</strong>
                      </div>
                    </div>
                  )}
                  
                </div>
              </div>
            );
          })}
        </div>

        {/* Filters */}
        <div className="aio-card p-3 mb-4 border">
          <div className="row g-3 align-items-end">
            <div className="col-md-3">
              <label className="form-label small fw-medium text-muted">Leave Type</label>
              <select className="form-select" value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                <option value="All Leave Types">All Leave Types</option>
                <option value="Monthly Leave">Monthly Leave</option>
                <option value="Sick Leave">Sick Leave</option>
                <option value="Casual Leave">Casual Leave</option>
                <option value="Unpaid Leave">Unpaid Leave</option>
                <option value="Other">Other Leave</option>
              </select>
            </div>
            <div className="col-md-2">
              <label className="form-label small fw-medium text-muted">Status</label>
              <select className="form-select" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                <option value="All">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
            <div className="col-md-4">
              <label className="form-label small fw-medium text-muted">Date Range</label>
              <div className="d-flex align-items-center gap-2">
                <input type="date" className="form-control" value={startDate} onChange={e => setStartDate(e.target.value)} />
                <span className="text-muted">&rarr;</span>
                <input type="date" className="form-control" value={endDate} onChange={e => setEndDate(e.target.value)} />
              </div>
            </div>
            <div className="col-md-3 d-flex gap-2">
              <Button variant="primary" icon={FiSearch} className="flex-grow-1">
                Search
              </Button>
              <Button variant="outline" icon={FiRefreshCw} onClick={handleReset}>
                Reset
              </Button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <ul className="nav nav-tabs aio-nav-tabs">
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'Leave History' ? 'active' : ''}`}
              onClick={() => setActiveTab('Leave History')}
            >
              Leave History ({leaves.filter(l => !checkIsUpcoming(l.start_date)).length})
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'Upcoming Time Off' ? 'active' : ''}`}
              onClick={() => setActiveTab('Upcoming Time Off')}
            >
              Upcoming Time Off ({leaves.filter(l => checkIsUpcoming(l.start_date)).length})
            </button>
          </li>
        </ul>

        {/* Table */}
        <div className="aio-card p-0">
          <div className="p-3 border-bottom d-flex justify-content-between align-items-center">
            <h5 className="mb-0 fw-bold">{activeTab === 'Leave History' ? 'Leave Requests' : 'Upcoming Requests'}</h5>
            <span className="small text-muted">{filtered.length} records found</span>
          </div>
          <Table 
            columns={columns} 
            data={filtered} 
            loading={loading}
            emptyMessage={`No ${activeTab.toLowerCase()} found.`}
          />
        </div>
      </div>

      <LeaveForm 
        show={showRequestModal} 
        handleClose={() => setShowRequestModal(false)}
        onSuccess={fetchData}
        globalBalance={balance}
      />
    </div>
  );
}
