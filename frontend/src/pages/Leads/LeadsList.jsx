import { useCallback, useMemo, useState } from "react";
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
import { leadService } from "@/api/services/leadService";
import { useAsync } from "@/hooks/useAsync";
import { useDebounce } from "@/hooks/useDebounce";
import { filterBySearch } from "@/utils/helpers";
import { formatCurrency, formatDate } from "@/utils/formatters";
import { LEAD_STATUS_LABEL, LEAD_STATUS_VARIANT } from "@/utils/constants";
import { confirmDialog } from "@/components/common/ConfirmDialog/confirmDialog";
export default function LeadsList() {
  const load = useCallback(() => leadService.list(), []);
  const { data: rawLeads, loading, refetch } = useAsync(load, [], []);
  const leads = useMemo(() => rawLeads || [], [rawLeads]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const debounced = useDebounce(search, 250);
  const filtered = useMemo(() => {
    let items = leads;
    if (statusFilter !== "all") items = items.filter((l) => l.status === statusFilter);
    return filterBySearch(items, debounced, ["name", "email", "company"]);
  }, [leads, statusFilter, debounced]);
  const openCreate = () => { setEditing(null); setModalOpen(true); };
  const openEdit = (lead) => { setEditing(lead); setModalOpen(true); };
  const handleSubmit = async (values) => {
    setSubmitting(true);
    try {
      if (editing) {
        await leadService.update(editing.id, values);
        toast.success("Lead updated");
      } else {
        await leadService.create({ ...values, owner: "You" });
        toast.success("Lead created");
      }
      setModalOpen(false);
      setEditing(null);
      refetch();
    } catch (e) {
      toast.error(e?.message || "Failed to save lead");
    } finally {
      setSubmitting(false);
    }
  };
  const handleDelete = async (lead) => {
    const ok = await confirmDialog({
      title: "Delete lead?",
      text: `${lead.name} will be permanently removed.`,
    });
    if (!ok) return;
    await leadService.remove(lead.id);
    toast.success("Lead deleted");
    refetch();
  };
  const columns = [
    {
      key: "name", label: "Lead", sortable: true,
      render: (r) => (
        <div className="d-flex align-items-center gap-2">
          <Avatar name={r.name} size={34} />
          <div>
            <div style={{ fontWeight: 600, color: "var(--color-text)" }}>{r.name}</div>
            <div className="text-subtle" style={{ fontSize: 12 }}>{r.email}</div>
          </div>
        </div>
      ),
    },
    { key: "company", label: "Company", sortable: true },
    { key: "source",  label: "Source",  sortable: true },
    {
      key: "status", label: "Status", sortable: true,
      render: (r) => <Badge variant={LEAD_STATUS_VARIANT[r.status]}>{LEAD_STATUS_LABEL[r.status]}</Badge>,
    },
    { key: "value", label: "Value", sortable: true, align: "right", render: (r) => formatCurrency(r.value) },
    { key: "owner", label: "Owner", sortable: true },
    { key: "createdAt", label: "Created", sortable: true, render: (r) => formatDate(r.createdAt) },
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
        description="0 Leads matching filters"
        actions={
          <>
            <Button variant="hero" icon={FiDownload}>Import</Button>
            <Button variant="hero" icon={FiDownload}>Export</Button>
            <Button variant="gradient" icon={FiPlus} onClick={openCreate}>Create lead</Button>
          </>
        }
      />
      <div className="card p-3 mb-3">
        <div className="row g-2 align-items-center">
          <div className="col-12 col-md-6 col-lg-5">
            <SearchBar value={search} onChange={setSearch} placeholder="Search by name, email, or company…" />
          </div>
          <div className="col-6 col-md-3 col-lg-2">
            <select className="form-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="all">All statuses</option>
              {Object.entries(LEAD_STATUS_LABEL).map(([k, v]) => (
                <option key={k} value={k}>{v}</option>
              ))}
            </select>
          </div>
          <div className="col-6 col-md-3 col-lg-2">
            <Button variant="secondary" icon={FiFilter} block>Filters</Button>
          </div>
          <div className="col-12 col-lg-3 text-lg-end">
            <span className="text-muted-2" style={{ fontSize: 13 }}>
              {filtered.length} of {leads.length} leads
            </span>
          </div>
        </div>
      </div>
      <Table columns={columns} data={filtered} loading={loading} />
      <LeadFormModal
        open={modalOpen}
        onClose={() => { setModalOpen(false); setEditing(null); }}
        onSubmit={handleSubmit}
        initialValues={editing}
        submitting={submitting}
      />
    </>
  );
}