import React, { useState, useMemo, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import PageHeader from '../components/common/PageHeader';
import CustomDataTable from '../components/common/CustomDataTable';
import CustomSelect from '../components/common/CustomSelect';
import CustomDatePicker from '../components/common/CustomDatePicker';
import FilterBar from '../components/common/FilterBar';
import axiosClient from '../api/axiosClient';

const AuditLog = () => {
  const { user } = useAuth();
  const backendUrl = import.meta.env.VITE_APP_API_URL?.replace('/api/v1', '') || 'http://localhost:8000';
  
  const getAvatarUrl = (avatar) => {
    if (!avatar) return null;
    if (avatar.startsWith('http') || avatar.startsWith('data:')) return avatar;
    const slash = avatar.startsWith('/') ? '' : '/';
    return `${backendUrl}${slash}${avatar}`;
  };

  const [moduleFilter, setModuleFilter] = useState("all");
  const [userFilter, setUserFilter] = useState("all");
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [auditLogData, setAuditLogData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAuditLogs = async () => {
      try {
        setLoading(true);
        const response = await axiosClient.get('/audit');
        setAuditLogData(response.data || response);
      } catch (error) {
        console.error("Error fetching audit logs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAuditLogs();
  }, []);

  const hasActiveFilters = moduleFilter !== "all" || userFilter !== "all" || startDate !== null || endDate !== null;

  const handleClearFilters = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    setModuleFilter("all");
    setUserFilter("all");
    setDateRange([null, null]);
  };

  const uniqueModules = useMemo(() => {
    return Array.from(new Set(auditLogData.map(l => l.module).filter(Boolean))).sort();
  }, [auditLogData]);

  const uniqueUsers = useMemo(() => {
    return Array.from(new Set(auditLogData.map(l => l.user_name || "System").filter(Boolean))).sort();
  }, [auditLogData]);

  const filteredLogs = useMemo(() => {
    return auditLogData.filter(log => {
      // Filter by Module
      const matchModule = moduleFilter === "all" || log.module === moduleFilter;
      
      // Filter by User
      const matchUser = userFilter === "all" || (log.user_name || "System") === userFilter;
      
      // Filter by Date Range
      let matchDate = true;
      if (startDate && endDate) {
        const logDate = new Date(log.timestamp);
        // Normalize time for inclusive day boundaries
        const start = new Date(startDate).setHours(0,0,0,0);
        const end = new Date(endDate).setHours(23,59,59,999);
        matchDate = logDate.getTime() >= start && logDate.getTime() <= end;
      }
      
      return matchModule && matchUser && matchDate;
    });
  }, [moduleFilter, userFilter, startDate, endDate, auditLogData]);

  const filterConfig = [
    {
      type: 'select',
      value: userFilter,
      onChange: setUserFilter,
      options: [
        { value: 'all', label: 'All Users' },
        ...uniqueUsers.map(u => ({ value: u, label: u }))
      ]
    },
    {
      type: 'select',
      value: moduleFilter,
      onChange: setModuleFilter,
      options: [
        { value: 'all', label: 'All Modules' },
        ...uniqueModules.map(m => ({ value: m, label: m }))
      ]
    },
    {
      type: 'date',
      value: dateRange,
      onChange: setDateRange,
      placeholder: 'Select Date Range'
    }
  ];

  const getActionBadge = (action) => {
    const act = action.toLowerCase();
    if (act.includes('create') || act.includes('add') || act.includes('login')) return 'badge-success d-inline-flex align-items-center badge-sm';
    if (act.includes('delete') || act.includes('remove')) return 'badge-danger d-inline-flex align-items-center badge-sm';
    if (act.includes('update') || act.includes('edit')) return 'badge-warning d-inline-flex align-items-center badge-sm';
    return 'badge-info d-inline-flex align-items-center badge-sm';
  };

  const getInitials = (name) => {
    if (!name || name === "System") return "SY";
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString('en-IN', { 
      day: '2-digit', month: 'short', year: 'numeric', 
      hour: '2-digit', minute: '2-digit', hour12: true 
    });
  };

  const columns = [
    { 
      name: 'Timestamp', 
      selectorKey: 'timestamp',
      cell: row => <span className="text-muted fs-14">{formatDate(row.timestamp)}</span>, 
      sortable: true 
    },
    { 
      name: 'User', 
      selectorKey: 'user_name',
      cell: row => (
        <div className="d-flex align-items-center gap-2">
          {getAvatarUrl(row.avatar) ? (
            <img src={getAvatarUrl(row.avatar)} alt={row.user_name} className="rounded-circle" style={{ width: '32px', height: '32px', objectFit: 'cover' }} />
          ) : (
            <div className="rounded-circle d-flex align-items-center justify-content-center bg-primary text-white" style={{ width: '32px', height: '32px', fontSize: '13px', fontWeight: 'bold' }}>
              {getInitials(row.user_name)}
            </div>
          )}
          <span className="fw-medium text-dark">{row.user_name || "System"}</span>
        </div>
      ),
      sortable: true
    },
    { 
      name: 'Action', 
      selectorKey: 'action',
      cell: row => (
        <span className={getActionBadge(row.action)}>
          <i className="ti ti-point-filled me-1"></i>{row.action}
        </span>
      ),
      sortable: true
    },
    { 
      name: 'Module', 
      selectorKey: 'module', 
      cell: row => <span className="fw-medium">{row.module}</span>, 
      sortable: true 
    },
    { 
      name: 'Details', 
      selectorKey: 'details',
      cell: row => <span className="text-muted" style={{ maxWidth: '300px', whiteSpace: 'normal' }}>{row.details}</span> 
    }
  ];

  const hasAccess = user && (user.role === 'Super Admin' || (user.permissions && user.permissions['/audit-log'] && user.permissions['/audit-log'].view));

  if (!hasAccess) {
    return (
      <div className="page-wrapper">
        <div className="content d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
          <div className="text-center">
            <h1 className="display-1 fw-bold text-danger">403</h1>
            <h3 className="mb-3">Access Denied</h3>
            <p className="text-muted mb-4">You do not have permission to view Audit Logs.</p>
            <a href="/" className="btn btn-primary">Back to Dashboard</a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <div className="content">
        <PageHeader 
          title="Audit Logs"
          breadcrumbs={[
            { label: 'Dashboard' },
            { label: 'Admin Console' },
            { label: 'Audit Logs', active: true }
          ]}
        />

        <div className="card">
          <div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
            <h5 className="mb-0">System Activity Logs</h5>
            <div className="d-flex align-items-center flex-wrap row-gap-3 gap-2">
              <FilterBar 
                filters={filterConfig} 
                onClear={handleClearFilters} 
                hasActiveFilters={hasActiveFilters} 
              />
            </div>
          </div>

          {/* Centralized Table Component */}
          <div className="card-body p-0">
            {loading ? (
              <div className="text-center p-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              <CustomDataTable 
                columns={columns}
                data={filteredLogs}
                defaultRowsPerPage={10}
              />
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default AuditLog;
