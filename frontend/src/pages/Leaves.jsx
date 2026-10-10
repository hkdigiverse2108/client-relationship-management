import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/common/PageHeader';
import CustomDataTable from '../components/common/CustomDataTable';
import CustomSelect from '../components/common/CustomSelect';
import CustomDatePicker from '../components/common/CustomDatePicker';
import LeaveForm from '../components/hrms/LeaveForm';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import axiosClient from '../api/axiosClient';

const getInitials = (name) => {
  if (!name) return '??';
  const parts = name.trim().split(' ');
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return name.substring(0, 2).toUpperCase();
};

const Leaves = () => {
  const { user } = useAuth();
  const userRole = user?.role?.toLowerCase() || '';
  const isSuperAdmin = ['admin', 'super admin', 'superadmin'].includes(userRole);
  const isHR = ['hr'].includes(userRole);
  const isHRAdmin = isSuperAdmin || isHR;

  const backendUrl = import.meta.env.VITE_APP_API_URL?.replace('/api/v1', '') || 'http://localhost:8000';

  const [viewMode, setViewMode] = useState(isSuperAdmin ? 'team_leaves' : (isHR ? 'team_leaves' : 'my_leaves'));

  const [confirmCancelModal, setConfirmCancelModal] = useState({ isOpen: false, leaveId: null });
  const [confirmDeleteModal, setConfirmDeleteModal] = useState({ isOpen: false, leaveId: null });
  const [editingLeave, setEditingLeave] = useState(null);

  useEffect(() => {
    setViewMode(isSuperAdmin ? 'team_leaves' : (isHR ? 'team_leaves' : 'my_leaves'));
  }, [isSuperAdmin, isHR]);

  const [leaves, setLeaves] = useState([]);
  const [balances, setBalances] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('Leave History'); // 'Leave History' or 'Upcoming Time Off'

  // Filters
  const [filterEmployee, setFilterEmployee] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  // Form
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [leavesRes, balanceRes] = await Promise.all([
        axiosClient.get('/hrms/leaves'),
        axiosClient.get('/hrms/leaves/balance')
      ]);
      setLeaves(leavesRes || []);
      setBalances(balanceRes || null);
    } catch (err) {
      toast.error('Failed to load leaves data');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axiosClient.put(`/hrms/leaves/${id}/status`, { status: newStatus });
      setLeaves(leaves.map(l => l._id === id ? { ...l, status: newStatus, reviewer_name: user?.name } : l));
      toast.success(`Leave request ${newStatus.toLowerCase()} successfully`);
      fetchData(); // Refresh to update balances etc
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Failed to update status');
    }
  };

  const handleSaveLeave = async (newLeave) => {
    try {
      if (editingLeave) {
        const res = await axiosClient.put(`/hrms/leaves/${editingLeave._id}`, newLeave);
        setLeaves(leaves.map(l => l._id === editingLeave._id ? res : l));
        toast.success('Leave request updated successfully');
      } else {
        const res = await axiosClient.post('/hrms/leaves', newLeave);
        setLeaves([res, ...leaves]);
        toast.success('Leave request submitted successfully');
      }
      setIsModalOpen(false);
      setEditingLeave(null);
      fetchData();
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Failed to save leave request');
    }
  };

  const confirmCancel = (id) => {
    setConfirmCancelModal({ isOpen: true, leaveId: id });
  };

  const executeCancel = async () => {
    if (!confirmCancelModal.leaveId) return;
    await handleStatusChange(confirmCancelModal.leaveId, 'Cancelled');
    setConfirmCancelModal({ isOpen: false, leaveId: null });
  };

  const confirmDelete = (id) => {
    setConfirmDeleteModal({ isOpen: true, leaveId: id });
  };

  const executeDelete = async () => {
    if (!confirmDeleteModal.leaveId) return;
    try {
      await axiosClient.delete(`/hrms/leaves/${confirmDeleteModal.leaveId}`);
      setLeaves(leaves.filter(l => l._id !== confirmDeleteModal.leaveId));
      toast.success('Leave request deleted successfully');
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Failed to delete leave request');
    } finally {
      setConfirmDeleteModal({ isOpen: false, leaveId: null });
    }
  };

  const filteredLeaves = useMemo(() => {
    const today = new Date();
    today.setHours(0,0,0,0);

    return leaves.filter(l => {
      // View Mode Filter
      const isOwnLeave = l.employee_id === user?._id || l.employee_id === user?.id;
      if (viewMode === 'my_leaves' && !isOwnLeave) return false;
      if (viewMode === 'team_leaves' && isOwnLeave && !isSuperAdmin) return false;

      // Tab filter
      const startDateObj = new Date(l.start_date);
      startDateObj.setHours(0,0,0,0);
      const isUpcoming = startDateObj > today;

      if (activeTab === 'Upcoming Time Off' && !isUpcoming) return false;
      if (activeTab === 'Leave History' && isUpcoming) return false;

      // Custom Filters
      if (filterStatus && l.status !== filterStatus) return false;
      if (filterEmployee) {
        const lowerName = (l.employee_name || '').toLowerCase();
        if (!lowerName.includes(filterEmployee.toLowerCase())) return false;
      }
      if (filterType && l.leave_type !== filterType) return false;
      if (startDate && new Date(l.start_date) < new Date(startDate)) return false;
      if (endDate && new Date(l.end_date) > new Date(endDate)) return false;

      return true;
    });
  }, [leaves, activeTab, filterEmployee, filterType, filterStatus, dateRange, viewMode, isSuperAdmin, user]);

  const dynamicLeaveTypes = useMemo(() => {
    const types = new Set(
      leaves
        .map(l => l.leave_type)
        .filter(t => t && t.toLowerCase() !== 'unpaid' && t.toLowerCase() !== 'unpaid leave')
    );
    return [
      { value: '', label: 'All Leave Types' },
      ...Array.from(types).map(t => ({ value: t, label: t }))
    ];
  }, [leaves]);

  const dynamicEmployees = useMemo(() => {
    const emps = new Map();
    leaves.forEach(l => {
      if (l.employee_name) {
        emps.set(l.employee_name, l.employee_name);
      }
    });
    return [
      { value: '', label: 'All Employees' },
      ...Array.from(emps.values()).map(e => ({ value: e, label: e }))
    ];
  }, [leaves]);

  const columns = [
    {
      name: 'Leave Type',
      selector: row => row.leave_type,
      sortable: true,
    },
    {
      name: 'Day Type',
      selector: row => row.day_type || 'Full Day',
      sortable: true,
    },
    {
      name: 'From',
      selector: row => row.start_date,
      sortable: true,
    },
     {
      name: 'To',
      selector: row => row.end_date,
      sortable: true,
    },
      {
      name: 'No of Days',
      selector: row => row.days,
      sortable: true,
    },
    {
      name: 'Approved By',
      selector: row => row.reviewer_name || '-',
      sortable: true,
      cell: row => {
        if (!row.reviewer_name) return '-';
        return (
          <div className="d-flex align-items-center">
            {row.reviewer_image && (row.reviewer_image.startsWith('/') || row.reviewer_image.startsWith('http')) ? (
              <img src={row.reviewer_image.startsWith('http') ? row.reviewer_image : `${backendUrl}${row.reviewer_image}`} className="avatar avatar-sm rounded-circle me-2" alt="img" style={{ width: '32px', height: '32px', objectFit: 'cover' }} />
            ) : (
              <span className="avatar avatar-sm rounded-circle bg-primary text-white me-2 d-flex align-items-center justify-content-center" style={{ width: '32px', height: '32px', fontSize: '13px' }}>
                {getInitials(row.reviewer_name)}
              </span>
            )}
            <span className="fw-medium text-dark">{row.reviewer_name}</span>
          </div>
        );
      }
    },
   
  
    {
      name: 'Status',
      selector: row => row.status,
      sortable: true,
      cell: row => {
        const isOwnLeave = row.employee_id === user?._id || row.employee_id === user?.id;
        const canChangeStatus = isHRAdmin || (isOwnLeave && row.status === 'Pending');

        let badgeClass = 'badge-soft-secondary';
        if (row.status === 'Approved') badgeClass = 'badge-soft-success';
        if (row.status === 'Pending') badgeClass = 'badge-soft-warning';
        if (row.status === 'Rejected') badgeClass = 'badge-soft-danger';
        if (row.status === 'Cancelled') badgeClass = 'badge-soft-dark';

        if (!canChangeStatus) {
            return (
              <span className={`badge ${badgeClass} d-inline-flex align-items-center badge-sm`}>
                {row.status}
              </span>
            );
        }

        const options = isHRAdmin 
            ? ['Pending', 'Approved', 'Rejected', 'Cancelled']
            : ['Pending', 'Cancelled'];

        return (
          <div className="dropdown action-label">
            <a className={`badge ${badgeClass} d-inline-flex align-items-center badge-sm text-decoration-none`} href="#" data-bs-toggle="dropdown" aria-expanded="false" style={{ cursor: 'pointer' }}>
              {row.status}

            </a>
            <div className="dropdown-menu dropdown-menu-right">
              {options.map(opt => (
                <a key={opt} className="dropdown-item" href="#" onClick={(e) => {
                  e.preventDefault();
                  if (opt === 'Cancelled') {
                    confirmCancel(row._id);
                  } else {
                    handleStatusChange(row._id, opt);
                  }
                }}>
                  {opt}
                </a>
              ))}
            </div>
          </div>
        );
      }
    },
    {
      name: 'Action',
      cell: row => {
        const isOwnLeave = row.employee_id === user?._id || row.employee_id === user?.id;
        const canEdit = row.status === 'Pending' && (isOwnLeave || isHRAdmin);
        const canDelete = isHRAdmin;

        if (!canEdit && !canDelete) return '-';

        return (
          <div className="d-flex gap-2">
            {canEdit && (
              <button 
                className="btn btn-icon btn-sm text-primary bg-primary-transparent rounded-circle" 
                onClick={() => {
                  setEditingLeave(row);
                  setIsModalOpen(true);
                }}
                title="Edit Leave"
              >
                <i className="ti ti-edit"></i>
              </button>
            )}
            {canDelete && (
              <button 
                className="btn btn-icon btn-sm text-danger bg-danger-transparent rounded-circle" 
                onClick={() => confirmDelete(row._id)}
                title="Delete Leave"
              >
                <i className="ti ti-trash"></i>
              </button>
            )}
          </div>
        );
      }
    }
  ];

  if (viewMode === 'team_leaves') {
    columns.unshift({
      name: 'Employee',
      selector: row => row.employee_name,
      sortable: true,
      cell: row => (
        <div className="d-flex align-items-center">
          {row.employee_image && (row.employee_image.startsWith('/') || row.employee_image.startsWith('http')) ? (
            <img src={row.employee_image.startsWith('http') ? row.employee_image : `${backendUrl}${row.employee_image}`} className="avatar avatar-sm rounded-circle me-2" alt="img" style={{ width: '32px', height: '32px', objectFit: 'cover' }} />
          ) : (
            <span className="avatar avatar-sm rounded-circle bg-primary text-white me-2 d-flex align-items-center justify-content-center" style={{ width: '32px', height: '32px', fontSize: '13px' }}>
              {getInitials(row.employee_name)}
            </span>
          )}
          <span className="fw-medium text-dark">{row.employee_name}</span>
        </div>
      )
    });
  }

  const myLeavesStats = useMemo(() => {
    const myOwnLeaves = leaves.filter(l => l.employee_id === user?._id || l.employee_id === user?.id);
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    
    let monthlyTaken = 0;
    let monthlyPending = 0;
    
    const overallTaken = {
      'Sick Leave': 0,
      'Casual Leave': 0,
      'Other Leave': 0
    };

    myOwnLeaves.forEach(l => {
      const d = new Date(l.start_date);
      const isCurrentMonth = d.getMonth() === currentMonth && d.getFullYear() === currentYear;
      
      if (l.leave_type === 'Monthly Leave' && isCurrentMonth) {
        if (l.status === 'Approved') monthlyTaken += l.days;
        if (l.status === 'Pending') monthlyPending += l.days;
      }

      if (overallTaken[l.leave_type] !== undefined) {
        if (l.status === 'Approved') {
           overallTaken[l.leave_type] += l.days;
        }
      }
    });

    return {
      monthly: {
        allowed: 1,
        taken: monthlyTaken,
        pending: monthlyPending,
        remaining: Math.max(0, 1 - monthlyTaken - monthlyPending)
      },
      overallTaken
    };
  }, [leaves, user]);

  const getLeaveBalance = (type) => balances?.[type] || { allowed: 0, taken: 0, pending: 0, remaining: 0 };

  const teamStats = useMemo(() => {
    let pending = 0, approved = 0, rejected = 0, total = leaves.length;
    leaves.forEach(l => {
      if (l.status === 'Pending') pending++;
      else if (l.status === 'Approved') approved++;
      else if (l.status === 'Rejected' || l.status === 'Cancelled') rejected++;
    });
    return { pending, approved, rejected, total };
  }, [leaves]);


  // Tab counts
  const today = new Date();
  today.setHours(0,0,0,0);
  const historyCount = leaves.filter(l => {
    const d = new Date(l.start_date);
    d.setHours(0,0,0,0);
    return d <= today;
  }).length;
  const upcomingCount = leaves.filter(l => {
    const d = new Date(l.start_date);
    d.setHours(0,0,0,0);
    return d > today;
  }).length;

  return (
    <>
      <div className="page-wrapper">
        <div className="content">

          {/* Breadcrumb */}
          <PageHeader 
            title="Leave Management"
            breadcrumbs={[
              { label: 'Dashboard' },
              { label: 'HRMS & Payroll' },
              { label: 'Leaves', active: true }
            ]}
          >
            <div className="me-2 mb-2">
              {isHR && (
                <div className="btn-group">
                  <button 
                    className={`btn ${viewMode === 'team_leaves' ? 'btn-primary' : 'btn-white'}`}
                    onClick={() => setViewMode('team_leaves')}
                  >
                    Team Leaves
                  </button>
                  <button 
                    className={`btn ${viewMode === 'my_leaves' ? 'btn-primary' : 'btn-white'}`}
                    onClick={() => setViewMode('my_leaves')}
                  >
                    My Leaves
                  </button>
                </div>
              )}
            </div>
            {viewMode === 'my_leaves' && (
              <div className="mb-2">
                <button onClick={() => setIsModalOpen(true)} className="btn btn-primary d-flex align-items-center">
                  <i className="ti ti-circle-plus me-2"></i>Add Leave
                </button>
              </div>
            )}
          </PageHeader>
          {/* /Breadcrumb */}

          {/* Leaves KPI Info */}
          {viewMode === 'my_leaves' && (
          <div className="row g-3 mb-4">
            {/* Card 1 */}
            <div className="col">
              <div className="card h-100 mb-0 shadow-sm" style={{ backgroundColor: '#e6f7eb', border: 'none', borderLeft: '4px solid #198754' }}>
                <div className="card-body p-3">
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <div className="flex-shrink-0">
                      <span className="avatar avatar-md rounded-circle bg-white d-flex align-items-center justify-content-center">
                        <i className="ti ti-calendar text-success fs-18"></i>
                      </span>
                    </div>
                    <div className="text-end">
                      <p className="mb-1 fw-medium text-dark">Monthly Leave</p>
                      <h4 className="text-dark">{myLeavesStats.monthly.taken} <span className="fs-12 text-muted fw-normal">Taken</span></h4>
                    </div>
                  </div>
                  <hr className="my-2" style={{ borderTop: '1px solid rgba(0,0,0,0.1)' }} />
                  <div className="d-flex justify-content-between text-start mt-2">
                    <div>
                      <p className="text-muted fs-11 mb-1">Pending</p>
                      <h6 className="fs-12 fw-semibold mb-0 text-dark">{myLeavesStats.monthly.pending} Days</h6>
                    </div>
                    <div>
                      <p className="text-muted fs-11 mb-1">Allowance</p>
                      <h6 className="fs-12 fw-semibold mb-0 text-dark">1 Free Day</h6>
                    </div>
                    <div className="text-end">
                      <p className="text-muted fs-11 mb-1">Remaining</p>
                      <h6 className="fs-12 fw-semibold mb-0 text-warning">{myLeavesStats.monthly.remaining} Day(s)</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="col">
              <div className="card h-100 mb-0 shadow-sm" style={{ backgroundColor: '#fce8ef', border: 'none', borderLeft: '4px solid #d63384' }}>
                <div className="card-body p-3">
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <div className="flex-shrink-0">
                      <span className="avatar avatar-md rounded-circle bg-white d-flex align-items-center justify-content-center">
                        <i className="ti ti-activity text-pink fs-18"></i>
                      </span>
                    </div>
                    <div className="text-end">
                      <p className="mb-1 fw-medium text-dark">Sick Leave</p>
                      <h4 className="text-dark">{getLeaveBalance('Sick Leave').taken} <span className="fs-12 text-muted fw-normal">Taken</span></h4>
                    </div>
                  </div>
                  <hr className="my-2" style={{ borderTop: '1px solid rgba(0,0,0,0.1)' }} />
                  <div className="d-flex justify-content-between text-start mt-2">
                    <div>
                      <p className="text-muted fs-11 mb-1">Pending</p>
                      <h6 className="fs-12 fw-semibold mb-0 text-dark">{getLeaveBalance('Sick Leave').pending} Days</h6>
                    </div>
                    <div className="text-end">
                      <p className="text-muted fs-11 mb-1">Overall</p>
                      <h6 className="fs-12 fw-semibold mb-0 text-warning">{myLeavesStats.overallTaken['Sick Leave']} Days</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="col">
              <div className="card h-100 mb-0 shadow-sm" style={{ backgroundColor: '#e8f3fd', border: 'none', borderLeft: '4px solid #0dcaf0' }}>
                <div className="card-body p-3">
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <div className="flex-shrink-0">
                      <span className="avatar avatar-md rounded-circle bg-white d-flex align-items-center justify-content-center shadow-sm">
                        <i className="ti ti-cup text-info fs-18"></i>
                      </span>
                    </div>
                    <div className="text-end">
                      <p className="mb-1 fw-medium text-dark">Casual Leave</p>
                      <h4 className="text-dark">{getLeaveBalance('Casual Leave').taken} <span className="fs-12 text-muted fw-normal">Taken</span></h4>
                    </div>
                  </div>
                  <hr className="my-2" style={{ borderTop: '1px solid rgba(0,0,0,0.1)' }} />
                  <div className="d-flex justify-content-between text-start mt-2">
                    <div>
                      <p className="text-muted fs-11 mb-1">Pending</p>
                      <h6 className="fs-12 fw-semibold mb-0 text-dark">{getLeaveBalance('Casual Leave').pending} Days</h6>
                    </div>
                    <div className="text-end">
                      <p className="text-muted fs-11 mb-1">Overall</p>
                      <h6 className="fs-12 fw-semibold mb-0 text-warning">{myLeavesStats.overallTaken['Casual Leave']} Days</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 4 (formerly 5) */}
            <div className="col">
              <div className="card h-100 mb-0 shadow-sm" style={{ backgroundColor: '#f3e8fd', border: 'none', borderLeft: '4px solid #6f42c1' }}>
                <div className="card-body p-3">
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <div className="flex-shrink-0">
                      <span className="avatar avatar-md rounded-circle bg-white d-flex align-items-center justify-content-center shadow-sm">
                        <i className="ti ti-dots text-purple fs-18" style={{ color: '#6f42c1' }}></i>
                      </span>
                    </div>
                    <div className="text-end">
                      <p className="mb-1 fw-medium text-dark">Other Leave</p>
                      <h4 className="text-dark">{getLeaveBalance('Other Leave').taken} <span className="fs-12 text-muted fw-normal">Taken</span></h4>
                    </div>
                  </div>
                  <hr className="my-2" style={{ borderTop: '1px solid rgba(0,0,0,0.1)' }} />
                  <div className="d-flex justify-content-between text-start mt-2">
                    <div>
                      <p className="text-muted fs-11 mb-1">Pending</p>
                      <h6 className="fs-12 fw-semibold mb-0 text-dark">{getLeaveBalance('Other Leave').pending} Days</h6>
                    </div>
                    <div className="text-end">
                      <p className="text-muted fs-11 mb-1">Overall</p>
                      <h6 className="fs-12 fw-semibold mb-0 text-warning">{myLeavesStats.overallTaken['Other Leave']} Days</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          )}

          {viewMode === 'team_leaves' && (
            <div className="row g-3 mb-4">
              <div className="col-md-3">
                <div className="card h-100 mb-0 shadow-sm" style={{ backgroundColor: '#fff7e6', border: 'none', borderLeft: '4px solid #ffc107' }}>
                  <div className="card-body p-3">
                    <div className="d-flex align-items-center justify-content-between">
                      <div>
                        <p className="mb-1 fw-medium text-dark">Pending Leaves</p>
                        <h4 className="text-dark mb-0">{teamStats.pending}</h4>
                      </div>
                      <span className="avatar avatar-md rounded-circle bg-white d-flex align-items-center justify-content-center shadow-sm">
                        <i className="ti ti-clock text-warning fs-18"></i>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="col-md-3">
                <div className="card h-100 mb-0 shadow-sm" style={{ backgroundColor: '#e6f7eb', border: 'none', borderLeft: '4px solid #198754' }}>
                  <div className="card-body p-3">
                    <div className="d-flex align-items-center justify-content-between">
                      <div>
                        <p className="mb-1 fw-medium text-dark">Approved Leaves</p>
                        <h4 className="text-dark mb-0">{teamStats.approved}</h4>
                      </div>
                      <span className="avatar avatar-md rounded-circle bg-white d-flex align-items-center justify-content-center shadow-sm">
                        <i className="ti ti-check text-success fs-18"></i>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-3">
                <div className="card h-100 mb-0 shadow-sm" style={{ backgroundColor: '#fce8ef', border: 'none', borderLeft: '4px solid #d63384' }}>
                  <div className="card-body p-3">
                    <div className="d-flex align-items-center justify-content-between">
                      <div>
                        <p className="mb-1 fw-medium text-dark">Rejected/Canceled</p>
                        <h4 className="text-dark mb-0">{teamStats.rejected}</h4>
                      </div>
                      <span className="avatar avatar-md rounded-circle bg-white d-flex align-items-center justify-content-center shadow-sm">
                        <i className="ti ti-x text-pink fs-18"></i>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-3">
                <div className="card h-100 mb-0 shadow-sm" style={{ backgroundColor: '#e8f3fd', border: 'none', borderLeft: '4px solid #0dcaf0' }}>
                  <div className="card-body p-3">
                    <div className="d-flex align-items-center justify-content-between">
                      <div>
                        <p className="mb-1 fw-medium text-dark">Total Leaves</p>
                        <h4 className="text-dark mb-0">{teamStats.total}</h4>
                      </div>
                      <span className="avatar avatar-md rounded-circle bg-white d-flex align-items-center justify-content-center shadow-sm">
                        <i className="ti ti-users text-info fs-18"></i>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* /Leaves KPI Info */}

          {/* Navigation Tabs */}
          <ul className="nav nav-tabs nav-tabs-bottom mb-4">
            <li className="nav-item">
              <a 
                className={`nav-link ${activeTab === 'Leave History' ? 'active' : ''}`} 
                href="#" 
                onClick={(e) => { e.preventDefault(); setActiveTab('Leave History'); }}
              >
                Leave History ({historyCount})
              </a>
            </li>
            <li className="nav-item">
              <a 
                className={`nav-link ${activeTab === 'Upcoming Time Off' ? 'active' : ''}`} 
                href="#" 
                onClick={(e) => { e.preventDefault(); setActiveTab('Upcoming Time Off'); }}
              >
                Upcoming Time Off ({upcomingCount})
              </a>
            </li>
          </ul>

          <div className="card">
            <div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
              <h5>Leave Requests</h5>
              <div className="d-flex my-xl-auto right-content align-items-center flex-wrap row-gap-3">
                {isHRAdmin && (
                  <div className="me-2" style={{ minWidth: '150px' }}>
                    <CustomSelect
                      options={dynamicEmployees}
                      value={filterEmployee ? { value: filterEmployee, label: filterEmployee } : { value: '', label: 'Employee' }}
                      onChange={(selected) => setFilterEmployee(selected ? selected.value : '')}
                    />
                  </div>
                )}
                <div className="me-2" style={{ minWidth: '150px' }}>
                  <CustomSelect
                    options={[
                      { value: '', label: 'All Status' },
                      { value: 'Pending', label: 'Pending' },
                      { value: 'Approved', label: 'Approved' },
                      { value: 'Rejected', label: 'Rejected' },
                      { value: 'Cancelled', label: 'Cancelled' }
                    ]}
                    value={filterStatus ? { value: filterStatus, label: filterStatus } : { value: '', label: 'Status' }}
                    onChange={(selected) => setFilterStatus(selected ? selected.value : '')}
                  />
                </div>

                <div className="me-2" style={{ minWidth: '150px' }}>
                  <CustomSelect
                    options={dynamicLeaveTypes}
                    value={filterType ? { value: filterType, label: filterType } : { value: '', label: 'Leave Type' }}
                    onChange={(selected) => setFilterType(selected ? selected.value : '')}
                  />
                </div>
                
                <div className="me-2 date-picker-wrapper" style={{ width: '220px' }}>
                  <CustomDatePicker
                    selected={startDate}
                    onChange={(update) => setDateRange(update)}
                    startDate={startDate}
                    endDate={endDate}
                    isRange={true}
                    className="form-control"
                    placeholderText="Select Date Range"
                  />
                </div>

              
                
                { (filterEmployee || filterType || filterStatus || startDate || endDate) && (
                  <button 
                    className="btn btn-sm btn-outline-danger d-inline-flex align-items-center"
                    onClick={() => {
                      setFilterEmployee('');
                      setFilterType('');
                      setFilterStatus('');
                      setDateRange([null, null]);
                    }}
                    title="Clear Filters"
                  >
                    <i className="ti ti-x me-1"></i> Clear
                  </button>
                )}
              </div>
            </div>
            <div className="card-body p-0">
              {loading ? (
                <div className="d-flex justify-content-center py-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : (
                <CustomDataTable
                  columns={columns}
                  data={filteredLeaves}
                />
              )}
            </div>
          </div>

        </div>
      </div>

      <LeaveForm
        open={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingLeave(null);
        }}
        onSubmit={handleSaveLeave}
        editingData={editingLeave}
        monthlyRemaining={myLeavesStats.monthly.remaining}
      />

      {confirmCancelModal.isOpen && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header border-0 pb-0">
                <button type="button" className="btn-close" onClick={() => setConfirmCancelModal({ isOpen: false, leaveId: null })} aria-label="Close"></button>
              </div>
              <div className="modal-body text-center py-4">
                <i className="ti ti-alert-circle text-warning mb-3" style={{ fontSize: '48px' }}></i>
                <h5 className="mb-2">Cancel Leave?</h5>
                <p className="text-muted mb-0">This will change the leave status to 'Cancelled'. Are you sure?</p>
              </div>
              <div className="modal-footer justify-content-center border-0 pt-0">
                <button className="btn btn-light px-4" onClick={() => setConfirmCancelModal({ isOpen: false, leaveId: null })}>No</button>
                <button className="btn btn-warning px-4 text-white" onClick={executeCancel}>Yes, Cancel it</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {confirmDeleteModal.isOpen && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header border-0 pb-0">
                <button type="button" className="btn-close" onClick={() => setConfirmDeleteModal({ isOpen: false, leaveId: null })} aria-label="Close"></button>
              </div>
              <div className="modal-body text-center py-4">
                <i className="ti ti-trash text-danger mb-3" style={{ fontSize: '48px' }}></i>
                <h5 className="mb-2">Delete Leave?</h5>
                <p className="text-muted mb-0">Are you sure you want to permanently delete this leave? This action cannot be undone.</p>
              </div>
              <div className="modal-footer justify-content-center border-0 pt-0">
                <button className="btn btn-light px-4" onClick={() => setConfirmDeleteModal({ isOpen: false, leaveId: null })}>Cancel</button>
                <button className="btn btn-danger px-4" onClick={executeDelete}>Yes, Delete it</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Leaves;
