import React, { useState } from 'react';
import CustomDataTable from '../common/CustomDataTable';

const LogsTab = () => {
  const [filterAction, setFilterAction] = useState("All");

  const dummyLogs = [
    { id: 1, timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), user: "Super Admin", action: "Restock", module: "Inventory", details: "Added 50 units to Apple iPhone 15 Pro Max" },
    { id: 2, timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), user: "System", action: "Update", module: "Orders", details: "Reserved 2 units for Order #1024 (Amazon)" },
    { id: 3, timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), user: "Store Manager", action: "Transfer", module: "Inventory", details: "Transferred 10 units from Main Warehouse to Local Store" },
    { id: 4, timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), user: "Super Admin", action: "Delete", module: "Products", details: "Deleted obsolete SKU: OBS-001" },
    { id: 5, timestamp: new Date(Date.now() - 1000 * 60 * 60 * 28).toISOString(), user: "System", action: "Update", module: "Orders", details: "Stock reduced by 1 for Order #1023 (Shopify)" },
    { id: 6, timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), user: "Store Manager", action: "Restock", module: "Inventory", details: "Received shipment of 100 units for Samsung Galaxy S24" },
  ];

  const filteredLogs = filterAction === "All" ? dummyLogs : dummyLogs.filter(log => log.action === filterAction);

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
      selector: row => row.user,
      cell: (row) => (
        <div className="d-flex align-items-center">
          <span className="avatar avatar-sm bg-primary-transparent rounded-circle me-2 text-primary">
            {row.user.charAt(0)}
          </span>
          <span className="fw-medium text-dark">{row.user}</span>
        </div>
      ),
      minWidth: '150px'
    },
    {
      name: 'Action',
      selector: row => row.action,
      cell: (row) => {
        let badgeClass = "bg-light text-dark";
        if (row.action === "Restock") badgeClass = "bg-success-transparent text-success";
        if (row.action === "Update") badgeClass = "bg-info-transparent text-info";
        if (row.action === "Transfer") badgeClass = "bg-warning-transparent text-warning";
        if (row.action === "Delete") badgeClass = "bg-danger-transparent text-danger";
        
        return (
          <span className={`badge ${badgeClass} badge-sm`}>
            {row.action}
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

  const actionTypes = ["All", "Restock", "Update", "Transfer", "Delete"];

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
            <CustomDataTable columns={columns} data={filteredLogs} />
          </div>
        </div>
      </div>

    </div>
  );
};

export default LogsTab;
