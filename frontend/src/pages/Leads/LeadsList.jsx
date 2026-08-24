import { useCallback, useMemo, useState, useEffect, useRef } from "react";
import { FiPlus, FiEdit2, FiTrash2, FiMoreVertical, FiDownload, FiFilter } from "react-icons/fi";
import toast from "react-hot-toast";
import PageHeader from "@/components/common/PageHeader/PageHeader";
import Button from "@/components/common/Button/Button";
import Table from "@/components/common/Table/Table";
import Badge from "@/components/common/Badge/Badge";
import Avatar from "@/components/common/Avatar/Avatar";
import SearchBar from "@/components/common/SearchBar/SearchBar";
import Dropdown from "@/components/common/Dropdown/Dropdown";
import LeadFormModal from "./LeadFormModal";
import LeadsSidebar from "./LeadsSidebar";
import ExportModal from "@/components/common/ExportModal/ExportModal";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { leadService } from "@/api/services/leadService";
import { useAsync } from "@/hooks/useAsync";
import { useDebounce } from "@/hooks/useDebounce";
import { filterBySearch } from "@/utils/helpers";
import { formatCurrency, formatDate } from "@/utils/formatters";
import { LEAD_STATUS_LABEL, LEAD_STATUS_VARIANT } from "@/utils/constants";
import { confirmDialog } from "@/components/common/ConfirmDialog/confirmDialog";
import api from "@/api/axiosClient";

import { createPortal } from "react-dom";

const AssigneeDropdown = ({ lead, usersMap, users, onAssign }) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef();
  const menuRef = useRef();
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  
  useEffect(() => {
    if (!open) return;
    
    const updateCoords = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        setCoords({ top: rect.bottom + 6, left: rect.left });
      }
    };
    
    updateCoords();
    window.addEventListener("resize", updateCoords);
    window.addEventListener("scroll", updateCoords, true);
    
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target) && menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => {
      window.removeEventListener("resize", updateCoords);
      window.removeEventListener("scroll", updateCoords, true);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  // Priority sorting: sales first, then match search
  const filteredUsers = useMemo(() => {
     let sorted = [...users].sort((a, b) => {
        if (a.role === 'sales' && b.role !== 'sales') return -1;
        if (a.role !== 'sales' && b.role === 'sales') return 1;
        return a.name.localeCompare(b.name);
     });
     if (search) {
        sorted = sorted.filter(u => u.name.toLowerCase().includes(search.toLowerCase()) || u.role.toLowerCase().includes(search.toLowerCase()));
     }
     return sorted;
  }, [users, search]);

  const menu = open ? createPortal(
    <div 
      ref={menuRef}
      className="aio-dropdown__menu aio-dropdown__menu--left" 
      style={{ position: "fixed", top: coords.top, left: coords.left, minWidth: 220, maxHeight: 300, overflowY: 'auto', padding: 0, zIndex: 9999 }}
    >
      <div style={{ padding: "8px" }}>
        <input 
          type="text" 
          className="form-control form-control-sm" 
          placeholder="Search user..." 
          value={search} 
          onChange={e => setSearch(e.target.value)}
          onClick={e => e.stopPropagation()}
          autoFocus
        />
      </div>
      <div className="aio-dropdown__divider" style={{ margin: 0 }} />
      <div style={{ padding: '4px' }}>
        {filteredUsers.map(u => (
          <button
            key={u.id}
            className="aio-dropdown__item"
            onClick={() => {
              setOpen(false);
              onAssign(lead, u.id);
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontWeight: 600 }}>{u.name}</span>
              <span style={{ fontSize: 10, color: 'var(--color-text-subtle)' }}>{u.role}</span>
            </div>
          </button>
        ))}
        {filteredUsers.length === 0 && <div style={{ padding: '8px', fontSize: 12, textAlign: 'center', color: 'var(--color-text-muted)' }}>No users found</div>}
      </div>
    </div>,
    document.body
  ) : null;

  return (
    <div className="aio-dropdown" ref={ref}>
      <div onClick={(e) => { e.stopPropagation(); setOpen(!open); }} style={{ cursor: "pointer", display: "inline-block" }}>
         <Badge variant="primary" style={{ backgroundColor: 'var(--color-surface-alt)', color: 'var(--color-text)', border: '1px solid var(--color-border)' }}>
           {usersMap[lead.assigned_to] || "Unknown"} <span style={{ fontSize: 10, marginLeft: 4 }}>▼</span>
         </Badge>
      </div>
      {menu}
    </div>
  );
};

export default function LeadsList() {
  const load = useCallback(async () => {
    const leadsData = await leadService.list();
    // Also fetch users to map names (via api client to avoid hardcoded ports)
    const usersData = await leadService.list().then(() => api.get("/users").catch(() => []));
    return leadsData;
  }, []);
  const { data: rawLeads, loading, refetch } = useAsync(load, [], []);
  const leads = useMemo(() => rawLeads || [], [rawLeads]);
  const [search, setSearch] = useState("");
  const [sidebarFilters, setSidebarFilters] = useState({ status: "all", source: "all", tag: "all" });
  const [modalOpen, setModalOpen] = useState(false);
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [usersMap, setUsersMap] = useState({});
  const [usersList, setUsersList] = useState([]);
  const fileInputRef = useRef(null);

  useEffect(() => {
    api.get("/users").then((res) => {
      const map = {};
      const arr = res || [];
      arr.forEach(u => map[u.id] = u.name);
      setUsersMap(map);
      setUsersList(arr);
    }).catch(console.error);
  }, []);

  const debounced = useDebounce(search, 250);
  const filtered = useMemo(() => {
    let items = leads;
    
    if (sidebarFilters.status !== "all") {
      items = items.filter((l) => (l.status || "new").toLowerCase() === sidebarFilters.status);
    }
    if (sidebarFilters.source !== "all") {
      items = items.filter((l) => (l.source || "website") === sidebarFilters.source);
    }
    if (sidebarFilters.tag !== "all") {
      items = items.filter((l) => {
        const tags = (l.tags || "").split(",").map(t => t.trim()).filter(Boolean);
        return tags.includes(sidebarFilters.tag);
      });
    }

    return filterBySearch(items, debounced, ["lead_name", "first_name", "last_name", "email", "company_name"]);
  }, [leads, sidebarFilters, debounced]);
  const openCreate = () => { setEditing(null); setModalOpen(true); };
  const openEdit = (lead) => { setEditing(lead); setModalOpen(true); };

  const handleExportPDF = (startDate, endDate) => {
    const toastId = toast.loading("Generating PDF...");
    const filteredExport = leads.filter(lead => {
      if (!lead.created_at) return false;
      const leadDate = lead.created_at.split("T")[0];
      return leadDate >= startDate && leadDate <= endDate;
    });

    if (filteredExport.length === 0) {
      toast.error("No leads found in this date range.", { id: toastId });
      setExportModalOpen(false);
      return;
    }

    try {
      const doc = new jsPDF();
      doc.text(`Leads Report (${startDate} to ${endDate})`, 14, 15);
      const tableColumn = ["Lead Name", "Company", "Email", "Status", "Expected Value"];
      const tableRows = [];

      filteredExport.forEach(lead => {
        tableRows.push([
          lead.lead_name || "-",
          lead.company_name || "-",
          lead.email || "-",
          lead.status || "-",
          lead.expected_value ? `$${lead.expected_value}` : "-"
        ]);
      });

      doc.autoTable({
        head: [tableColumn],
        body: tableRows,
        startY: 20,
      });

      doc.save(`leads_report_${startDate}_to_${endDate}.pdf`);
      toast.success("PDF Downloaded successfully", { id: toastId });
      setExportModalOpen(false);
    } catch (err) {
      console.error("PDF Generation Error:", err);
      toast.error(`Error: ${err.message || "Failed to generate PDF"}`, { id: toastId });
    }
  };

  const handleSubmit = async (values) => {
    setSubmitting(true);
    try {
      if (editing) {
        const idToUpdate = editing.id || editing._id;
        await leadService.update(idToUpdate, values);
        toast.success("Lead updated");
      } else {
        await leadService.create(values);
        toast.success("Lead created");
      }
      setModalOpen(false);
      setEditing(null);
      refetch();
    } catch (e) {
      try {
        const msg = e.message || e.raw?.message;
        const displayMsg = typeof msg === 'string' ? msg : (msg?.message || "Failed to save lead");
        toast.error(displayMsg);
      } catch (fatalError) {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setSubmitting(false);
    }
  };
  const handleDelete = async (lead) => {
    const ok = await confirmDialog({
      title: "Delete lead?",
      text: `${lead.lead_name} will be permanently removed.`,
    });
    if (!ok) return;
    const idToDelete = lead.id || lead._id;
    await leadService.remove(idToDelete);
    toast.success("Lead deleted");
    refetch();
  };
  const handleImport = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const toastId = toast.loading("Importing leads...");
    try {
      const res = await leadService.importLeads(file);
      toast.success(res.message || "Leads imported successfully", { id: toastId });
      refetch();
    } catch (err) {
      const msg = err.message || err.raw?.message;
      const displayMsg = typeof msg === 'string' ? msg : (msg?.message || "Import failed");
      toast.error(displayMsg, { id: toastId });
    } finally {
      // Reset input
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleStatusChange = async (lead, newStatus) => {
    if (lead.status === newStatus) return;
    const toastId = toast.loading("Updating status...");
    try {
      const idToUpdate = lead.id || lead._id;
      await leadService.update(idToUpdate, { status: newStatus });
      toast.success("Status updated", { id: toastId });
      refetch();
    } catch (err) {
      const msg = err.message || err.raw?.message;
      const displayMsg = typeof msg === 'string' ? msg : (msg?.message || "Failed to update status");
      toast.error(displayMsg, { id: toastId });
    }
  };


  const handleAssignChange = async (lead, newAssigneeId) => {
    if (lead.assigned_to === newAssigneeId) return;
    const toastId = toast.loading("Assigning lead...");
    try {
      const idToUpdate = lead.id || lead._id;
      await leadService.update(idToUpdate, { assigned_to: newAssigneeId });
      toast.success("Lead assigned successfully", { id: toastId });
      refetch();
    } catch (err) {
      const msg = err.message || err.raw?.message;
      const displayMsg = typeof msg === 'string' ? msg : (msg?.message || "Failed to assign lead");
      toast.error(displayMsg, { id: toastId });
    }
  };

  const columns = [
    {
      key: "lead_name", label: "Lead", sortable: true,
      render: (r) => (
        <div className="d-flex align-items-center gap-2">
          <Avatar name={r.lead_name} size={34} />
          <div>
            <div style={{ fontWeight: 600, color: "var(--color-text)" }}>{r.lead_name}</div>
            <div className="text-subtle" style={{ fontSize: 12 }}>{r.email}</div>
          </div>
        </div>
      ),
    },
    { key: "company_name", label: "Company", sortable: true },
    { key: "source",  label: "Source",  sortable: true },
    {
      key: "status", label: "Status", sortable: true,
      render: (r) => (
        <Dropdown
          align="left"
          trigger={({ onClick }) => (
            <div onClick={(e) => { e.stopPropagation(); onClick(); }} style={{ cursor: "pointer", display: "inline-block" }}>
              <Badge variant={LEAD_STATUS_VARIANT[r.status] || "secondary"}>
                {LEAD_STATUS_LABEL[r.status] || r.status} <span style={{ fontSize: 10, marginLeft: 4 }}>▼</span>
              </Badge>
            </div>
          )}
          items={Object.entries(LEAD_STATUS_LABEL).map(([k, v]) => ({
            label: v,
            onClick: () => handleStatusChange(r, k),
          }))}
        />
      ),
    },
    { key: "expected_value", label: "Value", sortable: true, align: "right", render: (r) => formatCurrency(r.expected_value) },
    { key: "assigned_to", label: "Assigned To", sortable: true, render: (r) => <AssigneeDropdown lead={r} usersMap={usersMap} users={usersList} onAssign={handleAssignChange} /> },
    { key: "created_at", label: "Created", sortable: true, render: (r) => formatDate(r.created_at) },
    {
      key: "actions", label: "", width: 60, align: "right",
      render: (r) => (
        <Dropdown
          trigger={({ onClick }) => (
            <button className="btn btn-sm btn-light" onClick={(e) => { e.stopPropagation(); onClick(); }}>
              <FiMoreVertical />
            </button>
          )}
          items={[
            { label: "Edit",   icon: FiEdit2,  onClick: () => openEdit(r) },
            { label: "Delete", icon: FiTrash2, danger: true, onClick: () => handleDelete(r) },
          ]}
        />
      ),
    },
  ];
  return (
    <>
      <PageHeader
        title="Lead Workspace"
        description={`${filtered.length} Leads matching filters`}
        actions={
          <>
            <input 
              type="file" 
              accept=".csv" 
              ref={fileInputRef} 
              style={{ display: "none" }} 
              onChange={handleImport} 
            />
            <Button variant="hero" icon={FiDownload} onClick={() => fileInputRef.current?.click()}>Import</Button>
            <Button variant="hero" icon={FiDownload} onClick={() => setExportModalOpen(true)}>Export</Button>
            <Button variant="gradient" icon={FiPlus} onClick={openCreate}>Create lead</Button>
          </>
        }
      />
      <div className="row g-4">
        <div className="col-12 col-xl-2 col-lg-3">
          <LeadsSidebar leads={leads} filters={sidebarFilters} setFilters={setSidebarFilters} />
        </div>
        <div className="col-12 col-xl-10 col-lg-9">
          <div className="card p-3 mb-3">
            <div className="row g-2 align-items-center">
              <div className="col-12 col-md-6 col-lg-6">
                <SearchBar value={search} onChange={setSearch} placeholder="Search by name, email, or company…" />
              </div>

              <div className="col-12 col-md-6 col-lg-6 text-md-end mt-2 mt-md-0 d-flex align-items-center justify-content-md-end">
                <span className="text-muted-2" style={{ fontSize: 13 }}>
                  {filtered.length} of {leads.length} leads
                </span>
              </div>
            </div>
          </div>
          <Table columns={columns} data={filtered} loading={loading} />
        </div>
      </div>
      <LeadFormModal
        open={modalOpen}
        onClose={() => { setModalOpen(false); setEditing(null); }}
        onSubmit={handleSubmit}
        initialValues={editing}
        submitting={submitting}
      />
      <ExportModal 
        isOpen={exportModalOpen}
        onClose={() => setExportModalOpen(false)}
        onExport={handleExportPDF}
        title="Export Leads to PDF"
      />
    </>
  );
}