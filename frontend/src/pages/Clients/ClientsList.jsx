import { useState, useEffect, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { FiPlus, FiEdit2, FiTrash2, FiMoreVertical, FiDownload, FiSearch } from "react-icons/fi";
import PageHeader from "@/components/common/PageHeader/PageHeader";
import Table from "@/components/common/Table/Table";
import Button from "@/components/common/Button/Button";
import Dropdown from "@/components/common/Dropdown/Dropdown";
import SearchBar from "@/components/common/SearchBar/SearchBar";
import Badge from "@/components/common/Badge/Badge";
import { clientService } from "@/api/services/clientService";
import { useAsync } from "@/hooks/useAsync";
import { confirmDialog } from "@/components/common/ConfirmDialog/confirmDialog";
import { CLIENT_STATUS_LABEL, CLIENT_STATUS_VARIANT, LEAD_CUSTOMER_TYPES } from "@/utils/constants";
import { formatDate } from "@/utils/formatters";
import ClientFormModal from "./ClientFormModal";
import api from "@/api/axiosClient";

export default function ClientsList() {
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [customerTypeFilter, setCustomerTypeFilter] = useState("all");
  const [clientTypeFilter, setClientTypeFilter] = useState("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [usersMap, setUsersMap] = useState({});

  const load = () => clientService.list();
  const { data: rawClients, loading, refetch } = useAsync(load, [], []);
  const clients = useMemo(() => rawClients || [], [rawClients]);

  useEffect(() => {
    api.get("/users").then((res) => {
      const map = {};
      const arr = res || [];
      arr.forEach(u => map[u.id] = u.name);
      setUsersMap(map);
    }).catch(console.error);
  }, []);

  const filtered = useMemo(() => {
    let items = clients;
    if (search) {
      const q = search.toLowerCase();
      items = items.filter(
        (c) =>
          c.company_name?.toLowerCase().includes(q) ||
          c.client_name?.toLowerCase().includes(q) ||
          c.email?.toLowerCase().includes(q) ||
          c.mobile_number?.includes(q) ||
          c.client_id?.toLowerCase().includes(q)
      );
    }
    if (statusFilter !== "all") {
      items = items.filter((c) => (c.status || "active").toLowerCase() === statusFilter);
    }
    if (customerTypeFilter !== "all") {
      items = items.filter((c) => (c.customer_type || "").toLowerCase() === customerTypeFilter.toLowerCase());
    }
    if (clientTypeFilter !== "all") {
      if (clientTypeFilter === "manual") {
        items = items.filter((c) => c.converted_from_lead_id === "Manual" || !c.converted_from_lead_id);
      } else {
        items = items.filter((c) => c.converted_from_lead_id && c.converted_from_lead_id !== "Manual");
      }
    }
    if (dateFrom) {
      items = items.filter((c) => new Date(c.created_at) >= new Date(dateFrom));
    }
    if (dateTo) {
      const end = new Date(dateTo);
      end.setDate(end.getDate() + 1); // include the end date fully
      items = items.filter((c) => new Date(c.created_at) < end);
    }
    return items;
  }, [clients, search, statusFilter, customerTypeFilter, clientTypeFilter, dateFrom, dateTo]);

  const openCreate = () => {
    setEditing(null);
    setModalOpen(true);
  };

  const openEdit = (client) => {
    setEditing(client);
    setModalOpen(true);
  };

  const handleSubmit = async (values) => {
    setSubmitting(true);
    try {
      if (editing) {
        const idToUpdate = editing.id || editing._id;
        await clientService.update(idToUpdate, values);
        toast.success("Client updated");
      } else {
        await clientService.create(values);
        toast.success("Client created");
      }
      setModalOpen(false);
      setEditing(null);
      refetch();
    } catch (e) {
      try {
        const msg = e.message || e.raw?.message;
        const displayMsg = typeof msg === 'string' ? msg : (msg?.message || "Failed to save client");
        toast.error(displayMsg);
      } catch (fatalError) {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (client) => {
    const ok = await confirmDialog({
      title: "Delete client?",
      text: `${client.company_name} will be permanently removed.`,
    });
    if (!ok) return;
    const idToDelete = client.id || client._id;
    await clientService.remove(idToDelete);
    toast.success("Client deleted");
    refetch();
  };

  const handleStatusChange = async (client, newStatus) => {
    const toastId = toast.loading("Updating status...");
    try {
      const idToUpdate = client.id || client._id;
      await clientService.update(idToUpdate, { status: newStatus });
      toast.success("Status updated", { id: toastId });
      refetch();
    } catch (err) {
      const msg = err.message || err.raw?.message;
      const displayMsg = typeof msg === 'string' ? msg : (msg?.message || "Failed to update status");
      toast.error(displayMsg, { id: toastId });
    }
  };

  const columns = [
    { key: "client_id", label: "Client ID", sortable: true, width: 100, render: (r) => <div style={{ whiteSpace: "nowrap", fontWeight: 600, color: 'var(--color-primary)' }}>{r.client_id}</div> },
    { key: "company_name", label: "Company Name", sortable: true, width: 160, render: (r) => <div style={{ whiteSpace: "nowrap", fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis" }}><Link to={`/clients/${r.id || r._id}`} style={{ textDecoration: 'none', color: 'var(--color-text)' }}>{r.company_name}</Link></div> },
    { key: "client_name", label: "Client Name", sortable: true, width: 150, render: (r) => <div style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{r.client_name || "—"}</div> },
    { key: "contact_person", label: "Contact Person", sortable: true, width: 150, render: (r) => <div style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{r.contact_person || "—"}</div> },
    { key: "email", label: "Email", sortable: true, width: 200, render: (r) => <div style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{r.email}</div> },
    { key: "mobile_number", label: "Mobile", sortable: true, width: 130, render: (r) => <div style={{ whiteSpace: "nowrap" }}>{r.mobile_number}</div> },
    { key: "customer_type", label: "Customer Type", sortable: true, width: 130, render: (r) => <div className="text-capitalize" style={{ whiteSpace: "nowrap" }}>{r.customer_type || "—"}</div> },
    { key: "client_type", label: "Client Type", sortable: true, width: 120, render: (r) => <div style={{ whiteSpace: "nowrap" }}>{(r.converted_from_lead_id === "Manual" || !r.converted_from_lead_id) ? "Manual" : "Converted"}</div> },
    { key: "assigned_to", label: "Account Manager", sortable: true, width: 150, render: (r) => <div className="text-muted-2" style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{usersMap[r.assigned_to] || "Unknown"}</div> },
    {
      key: "status", label: "Status", sortable: true, width: 120,
      render: (r) => {
        const s = (r.status || "active").toLowerCase();
        return (
          <Dropdown
            align="left"
            trigger={({ onClick }) => (
              <div onClick={(e) => { e.stopPropagation(); onClick(); }} style={{ cursor: "pointer", display: "inline-block" }}>
                <Badge variant={CLIENT_STATUS_VARIANT[s] || "secondary"}>
                  {CLIENT_STATUS_LABEL[s] || s} <span style={{ fontSize: 10, marginLeft: 4 }}>▼</span>
                </Badge>
              </div>
            )}
            items={Object.entries(CLIENT_STATUS_LABEL).map(([k, v]) => ({
              label: v,
              onClick: () => handleStatusChange(r, k),
            }))}
          />
        );
      },
    },
    { key: "created_at", label: "Created At", sortable: true, width: 140, render: (r) => <div style={{ whiteSpace: "nowrap" }}>{formatDate(r.created_at)}</div> },
    {
      key: "actions", label: "", width: 60, align: "right",
      render: (r) => (
        <Dropdown
          align="right"
          trigger={({ onClick }) => (
            <button className="btn btn-sm btn-light" onClick={(e) => { e.stopPropagation(); onClick(); }}>
              <FiMoreVertical />
            </button>
          )}
          items={[
            { label: "Edit", icon: FiEdit2, onClick: () => openEdit(r) },
            { label: "Delete", icon: FiTrash2, danger: true, onClick: () => handleDelete(r) },
          ]}
        />
      ),
    },
  ];

  return (
    <>
      <PageHeader
        title="Clients Workspace"
        description={`${filtered.length} Clients total`}
        actions={
          <>
            <Button variant="gradient" icon={FiPlus} onClick={openCreate}>Add new client</Button>
          </>
        }
      />
      <div className="card p-3 mb-3">
        <div className="row g-2 align-items-center">
          <div className="col-12 col-xl-2">
            <SearchBar value={search} onChange={setSearch} placeholder="Search clients…" />
          </div>
          
          <div className="col-6 col-xl-2">
            <select className="form-select form-select-sm" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="all">All Status</option>
              {Object.entries(CLIENT_STATUS_LABEL).map(([k, v]) => (
                <option key={k} value={k}>{v}</option>
              ))}
            </select>
          </div>

          <div className="col-6 col-xl-2">
            <select className="form-select form-select-sm" value={customerTypeFilter} onChange={(e) => setCustomerTypeFilter(e.target.value)}>
              <option value="all">Customer Type</option>
              {LEAD_CUSTOMER_TYPES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          <div className="col-6 col-xl-2">
            <select className="form-select form-select-sm" value={clientTypeFilter} onChange={(e) => setClientTypeFilter(e.target.value)}>
              <option value="all">Client Type</option>
              <option value="manual">Manual</option>
              <option value="converted">Auto Converted</option>
            </select>
          </div>

          <div className="col-12 col-md-6 col-xl-2">
            <div className="d-flex align-items-center gap-2">
              <span className="text-muted" style={{ fontSize: '0.85rem' }}>From</span>
              <input 
                type="date" 
                className="form-control form-control-sm" 
                value={dateFrom} 
                onChange={(e) => setDateFrom(e.target.value)} 
              />
            </div>
          </div>

          <div className="col-12 col-md-6 col-xl-2">
            <div className="d-flex align-items-center gap-2">
              <span className="text-muted" style={{ fontSize: '0.85rem' }}>To</span>
              <input 
                type="date" 
                className="form-control form-control-sm" 
                value={dateTo} 
                onChange={(e) => setDateTo(e.target.value)} 
              />
            </div>
          </div>
        </div>
      </div>
      <div className="aio-card p-0">
        <Table
          columns={columns}
          data={filtered}
          loading={loading}
          emptyTitle="No clients found"
          emptyDescription={search ? "Try adjusting your search or filters." : "Add a new client to get started."}
        />
      </div>

      <ClientFormModal
        open={modalOpen}
        onClose={() => { setModalOpen(false); setEditing(null); }}
        onSubmit={handleSubmit}
        initialValues={editing}
        submitting={submitting}
      />
    </>
  );
}