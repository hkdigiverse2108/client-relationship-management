import React, { useState, useEffect, useMemo, useCallback } from "react";
import { FiPlus, FiEdit2, FiTrash2, FiSearch, FiMail, FiPhone, FiPower } from "react-icons/fi";
import toast from "react-hot-toast";
import PageHeader from "@/components/common/PageHeader/PageHeader";
import Button from "@/components/common/Button/Button";
import Table from "@/components/common/Table/Table";
import Badge from "@/components/common/Badge/Badge";
import Avatar from "@/components/common/Avatar/Avatar";
import SearchBar from "@/components/common/SearchBar/SearchBar";
import { useAsync } from "@/hooks/useAsync";
import { useDebounce } from "@/hooks/useDebounce";
import { filterBySearch, getProfilePhotoUrl } from "@/utils/helpers";
import { confirmDialog } from "@/components/common/ConfirmDialog/confirmDialog";
import api from "@/api/axiosClient";
import EmployeeForm from "./EmployeeForm";
import "./Directory.css";

export default function Directory() {
  const load = useCallback(async () => {
    return await api.get("/hrms/employees").catch(() => []);
  }, []);

  const { data: rawEmployees, loading, refetch } = useAsync(load, [], []);
  const employees = useMemo(() => rawEmployees || [], [rawEmployees]);
  
  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const debounced = useDebounce(search, 250);
  const filtered = useMemo(() => {
    let result = employees;
    if (filterRole !== "All") {
      result = result.filter(e => (e.role === filterRole || e.department === filterRole));
    }
    if (filterStatus !== "All") {
      result = result.filter(e => (e.attendance_status || "N/A") === filterStatus);
    }
    return filterBySearch(result, debounced, ["name", "email", "employee_id", "designation", "department"]);
  }, [employees, debounced, filterRole, filterStatus]);

  const openCreate = () => { setEditing(null); setModalOpen(true); };
  const openEdit = (emp) => { setEditing(emp); setModalOpen(true); };

  const handleToggleStatus = async (emp) => {
    const action = emp.is_active !== false ? "deactivate" : "activate"; // Assuming is_active defaults to true if missing
    const ok = await confirmDialog({
      title: `${action.charAt(0).toUpperCase() + action.slice(1)} Employee?`,
      text: `Are you sure you want to ${action} this employee?`,
      confirmText: action.charAt(0).toUpperCase() + action.slice(1),
      icon: "warning",
      danger: action === "deactivate"
    });
    if (!ok) return;
    try {
      await api.patch(`/users/${emp.id}/status`, { is_active: action === "activate" });
      toast.success(`Employee ${action}d successfully`);
      refetch();
    } catch (err) {
      toast.error(err.response?.data?.detail || `Failed to ${action}`);
    }
  };

  const handleDelete = async (id) => {
    const ok = await confirmDialog({
      title: "Delete Employee?",
      text: "Are you sure you want to delete this employee permanently? This action cannot be undone.",
      confirmText: "Delete",
      icon: "error",
      danger: true
    });
    if (!ok) return;
    try {
      await api.delete(`/users/${id}`);
      toast.success("Employee deleted permanently");
      refetch();
    } catch (err) {
      toast.error(err.response?.data?.detail || "Failed to delete");
    }
  };

  const columns = [
    { 
      key: "employee", 
      label: "Employee", 
      render: (row) => (
        <div className="dir-employee-cell" style={{ opacity: row.is_active === false ? 0.6 : 1 }}>
          <Avatar src={getProfilePhotoUrl(row.profile_photo)} name={row.name} size={36} />
          <div className="dir-employee-info">
            <span className="dir-name">
              {row.name}
              {row.is_active === false && (
                <span className="badge bg-danger ms-2" style={{fontSize: "10px"}}>Deactivated</span>
              )}
            </span>
            <span className="dir-id">{row.employee_id || "N/A"}</span>
          </div>
        </div>
      ) 
    },
    { 
      key: "contact", 
      label: "Contact", 
      render: (row) => (
        <div className="dir-contact-cell">
          <div className="dir-contact-item" title={row.email}>
            <FiMail size={12} /> <span className="text-truncate" style={{maxWidth: 120}}>{row.email}</span>
          </div>
          {row.phone && (
            <div className="dir-contact-item">
              <FiPhone size={12} /> <span>{row.phone}</span>
            </div>
          )}
        </div>
      ) 
    },
    { 
      key: "role", 
      label: "Role / Dept", 
      render: (row) => (
        <div className="dir-role-cell">
          <span className="dir-designation">{row.designation || row.role}</span>
          <span className="dir-department">{row.department || "N/A"}</span>
        </div>
      ) 
    },
    { 
      key: "attendance_status", 
      label: "Status", 
      render: (row) => {
        let variant = "secondary";
        const st = row.attendance_status?.toLowerCase();
        if (st === "present") variant = "success";
        if (st === "absent") variant = "danger";
        if (st === "on leave") variant = "warning";
        return <Badge variant={variant}>{row.attendance_status || "N/A"}</Badge>;
      }
    },
    {
      key: "actions",
      label: "Action",
      render: (row) => (
        <div className="dir-actions d-flex gap-2 justify-content-end">
          <button className="icon-btn edit" onClick={() => openEdit(row)} title="Edit Employee">
            <FiEdit2 size={14} />
          </button>
          <button 
            className={row.is_active !== false ? "icon-btn text-warning" : "icon-btn text-success"} 
            onClick={() => handleToggleStatus(row)} 
            title={row.is_active !== false ? "Deactivate Employee" : "Activate Employee"}
          >
            <FiPower size={14} />
          </button>
          <button className="icon-btn delete" onClick={() => handleDelete(row.id)} title="Delete Employee Permanently">
            <FiTrash2 size={14} />
          </button>
        </div>
      ),
      width: 120, 
      align: "right"
    }
  ];

  return (
    <div className="aio-directory-page">
      <PageHeader 
        title="Employee Directory" 
        description="Complete employee database & profile management"
        actions={
          <Button variant="primary" icon={FiPlus} onClick={openCreate}>
            Add New Employee
          </Button>
        }
      />

      <div className="aio-card p-0 mt-4 dir-card">
        <div className="dir-toolbar p-3 border-bottom d-flex gap-3 align-items-center flex-wrap">
          <div className="dir-search" style={{ flexGrow: 1, minWidth: "250px" }}>
            <SearchBar 
              value={search} 
              onChange={setSearch} 
              placeholder="Search by name, ID, email or role..." 
            />
          </div>
          <div className="d-flex gap-2">
            <select 
              className="form-select form-select-sm text-muted" 
              style={{ width: "150px" }}
              value={filterRole} 
              onChange={(e) => setFilterRole(e.target.value)}
            >
              <option value="All">All Roles / Depts</option>
              {Array.from(new Set(employees.map(e => e.role).filter(Boolean))).map(r => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
            <select 
              className="form-select form-select-sm text-muted" 
              style={{ width: "150px" }}
              value={filterStatus} 
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="All">All Statuses</option>
              {Array.from(new Set(employees.map(e => e.attendance_status).filter(Boolean))).map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>
        
        <Table 
          columns={columns} 
          data={filtered} 
          loading={loading}
          emptyMessage="No employees found in the directory."
        />
      </div>

      <EmployeeForm 
        open={modalOpen} 
        onClose={() => setModalOpen(false)} 
        onSuccess={refetch}
        employee={editing}
      />
    </div>
  );
}
