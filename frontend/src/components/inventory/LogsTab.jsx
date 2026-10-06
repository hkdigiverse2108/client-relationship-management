import React, { useState, useEffect, useMemo } from 'react';
import CustomDataTable from '../common/CustomDataTable';
import axiosClient from '../../api/axiosClient';
import { APP_CONFIG } from '../../config/appConfig';
import toast from 'react-hot-toast';

const LogsTab = () => {
  const [filterAction, setFilterAction] = useState("All");
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        setLoading(true);
        const res = await axiosClient.get('/audit');
        const data = res.data?.data || res.data || res || [];
        // Filter only inventory-related logs (Products, Orders)
        const inventoryLogs = (Array.isArray(data) ? data : []).filter(log => 
          ['Products', 'Orders', 'Inventory'].includes(log.module)
        );
        setLogs(inventoryLogs);
      } catch (error) {
        console.error('Error fetching logs:', error);
        toast.error('Failed to fetch logs');
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, []);

  const actionTypes = useMemo(() => {
    const actions = [...new Set(logs.map(log => log.action).filter(Boolean))];
    return ["All", ...actions];
  }, [logs]);

  const filteredLogs = filterAction === "All" ? logs : logs.filter(log => log.action === filterAction);

  const columns = [
    {
      name: 'Timestamp',
      selector: row => row.timestamp,
      cell: (row) => {
        const d = new Date(row.timestamp);
        return (
          <div>
            <span className="d-block fw-medium text-dark">{d.toLocaleDateString()}</span>
            <span className="fs-12 text-muted">{d.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
          </div>
        );
      },
      sortable: true,
      minWidth: '150px'
    },
    {
      name: 'User',
      selector: row => row.user_name,
      cell: (row) => {
        const userName = row.user_name || "System";
        const initials = userName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
        return (
          <div className="d-flex align-items-center">
            {row.avatar ? (
              <img 
                src={row.avatar.startsWith('http') ? row.avatar : `${new URL(APP_CONFIG.apiBaseUrl).origin}${row.avatar}`} 
                alt="user" 
                className="avatar avatar-sm rounded-circle me-2 object-fit-cover"
              />
            ) : (
              <span className="avatar avatar-sm bg-primary-transparent rounded-circle me-2 text-primary d-flex align-items-center justify-content-center">
                {initials}
              </span>
            )}
            <span className="fw-medium text-dark">{userName}</span>
          </div>
        );
      },
      minWidth: '150px'
    },
    {
      name: 'Action',
      selector: row => row.action,
      cell: (row) => {
        let badgeClass = "bg-light text-dark";
        const actionStr = (row.action || "").toLowerCase();
        if (actionStr.includes("restock") || actionStr.includes("create")) badgeClass = "bg-success-transparent text-success";
        else if (actionStr.includes("update") || actionStr.includes("edit")) badgeClass = "bg-info-transparent text-info";
        else if (actionStr.includes("transfer")) badgeClass = "bg-warning-transparent text-warning";
        else if (actionStr.includes("delete") || actionStr.includes("remove")) badgeClass = "bg-danger-transparent text-danger";
        
        return (
          <span className={`badge ${badgeClass} badge-sm`}>
            {row.action || "Action"}
          </span>
        );
      },
      minWidth: '120px'
    },
    {
      name: 'Module',
      selector: row => row.module,
      cell: (row) => <span className="text-muted">{row.module}</span>,
      minWidth: '120px'
    },
    {
      name: 'Details',
      selector: row => row.details,
      cell: (row) => <span className="text-dark line-clamp-2" title={row.details}>{row.details}</span>,
      minWidth: '350px'
    }
  ];


  return (
    <div className="logs-control-tab">
      
      {/* Filters */}
      <div className="d-flex align-items-center flex-wrap gap-2 mb-4">
        <span className="fw-medium text-muted me-2">Filter by Action:</span>
        {actionTypes.map(action => (
          <button 
            key={action}
            className={`btn btn-sm rounded-pill ${filterAction === action ? 'btn-primary' : 'btn-light'}`}
            onClick={() => setFilterAction(action)}
          >
            {action}
          </button>
        ))}
      </div>

      {/* Logs Table */}
      <div className="card mb-4">
        <div className="card-header border-bottom">
          <h5 className="card-title mb-0">Stock Movement & Action History</h5>
        </div>
        <div className="card-body p-0">
          <div className="custom-datatable-filter table-responsive">
            <CustomDataTable columns={columns} data={filteredLogs} progressPending={loading} />
          </div>
        </div>
      </div>

    </div>
  );
};

export default LogsTab;
