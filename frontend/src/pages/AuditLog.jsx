import React, { useState, useMemo } from 'react';
import PageHeader from '../components/common/PageHeader';
import { auditLogData } from './auditLogData';
import CustomDataTable from '../components/common/CustomDataTable';
import CustomSelect from '../components/common/CustomSelect';
import CustomDatePicker from '../components/common/CustomDatePicker';

const AuditLog = () => {
  const [moduleFilter, setModuleFilter] = useState("all");
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  const hasActiveFilters = moduleFilter !== "all" || startDate !== null || endDate !== null;

  const handleClearFilters = (e) => {
    e.preventDefault();
    setModuleFilter("all");
    setDateRange([null, null]);
  };

  const uniqueModules = useMemo(() => {
    return Array.from(new Set(auditLogData.map(l => l.module))).sort();
  }, []);

  const filteredLogs = useMemo(() => {
    return auditLogData.filter(log => {
      // Filter by Module
      const matchModule = moduleFilter === "all" || log.module === moduleFilter;
      
      // Filter by Date Range
      let matchDate = true;
      if (startDate && endDate) {
        const logDate = new Date(log.timestamp);
        // Normalize time for inclusive day boundaries
        const start = new Date(startDate).setHours(0,0,0,0);
        const end = new Date(endDate).setHours(23,59,59,999);
        matchDate = logDate.getTime() >= start && logDate.getTime() <= end;
      }
      
      return matchModule && matchDate;
    });
  }, [moduleFilter, startDate, endDate]);

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
          {row.avatar ? (
            <img src={row.avatar} alt={row.user_name} className="rounded-circle" style={{ width: '32px', height: '32px', objectFit: 'cover' }} />
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
    },
    { 
      name: 'IP Address', 
      selectorKey: 'ip_address',
      cell: row => (
        <span className="font-monospace text-muted bg-light px-2 py-1 rounded border fs-13">
          {row.ip_address}
        </span>
      )
    }
  ];

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
              {hasActiveFilters && (
                <a href="#" className="text-danger fw-medium fs-13 d-inline-flex align-items-center me-2" onClick={handleClearFilters}>
                  Clear
                </a>
              )}
              <div style={{ width: '250px' }}>
                <CustomDatePicker
                  isRange
                  selected={startDate}
                  onChange={(update) => setDateRange(update)}
                  startDate={startDate}
                  endDate={endDate}
                  placeholderText="Select Date Range"
                />
              </div>
              <div style={{ width: '180px' }}>
                <CustomSelect
                  options={[
                    { value: 'all', label: 'All Modules' },
                    ...uniqueModules.map(m => ({ value: m, label: m }))
                  ]}
                  value={{ value: moduleFilter, label: moduleFilter === 'all' ? 'All Modules' : moduleFilter }}
                  onChange={(selected) => setModuleFilter(selected.value)}
                />
              </div>
            </div>
          </div>

          {/* Centralized Table Component */}
          <CustomDataTable 
            columns={columns}
            data={filteredLogs}
            defaultRowsPerPage={10}
          />

        </div>
      </div>
    </div>
  );
};

export default AuditLog;
