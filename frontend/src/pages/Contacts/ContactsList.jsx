import { useCallback, useMemo, useState } from "react";
import { FiPlus, FiEdit2, FiTrash2, FiMoreVertical } from "react-icons/fi";
import toast from "react-hot-toast";
import PageHeader from "@/components/common/PageHeader/PageHeader";
import Button from "@/components/common/Button/Button";
import Table from "@/components/common/Table/Table";
import Badge from "@/components/common/Badge/Badge";
import Avatar from "@/components/common/Avatar/Avatar";
import SearchBar from "@/components/common/SearchBar/SearchBar";
import Dropdown from "@/components/common/Dropdown/Dropdown";
import ContactFormModal from "./ContactFormModal";
import { contactService } from "@/api/services/contactService";
import { useAsync } from "@/hooks/useAsync";
import { useDebounce } from "@/hooks/useDebounce";
import { filterBySearch } from "@/utils/helpers";
import { formatDate } from "@/utils/formatters";
import { CONTACT_STATUS_LABEL, CONTACT_STATUS_VARIANT, CONTACT_DEPARTMENTS } from "@/utils/constants";
import { confirmDialog } from "@/components/common/ConfirmDialog/confirmDialog";

export default function ContactsList() {
  const load = useCallback(() => contactService.list(), []);
  const { data: rawContacts, loading, refetch } = useAsync(load, [], []);
  const contacts = useMemo(() => rawContacts || [], [rawContacts]);
  
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [tagFilter, setTagFilter] = useState("all");
  const [deptFilter, setDeptFilter] = useState("all");
  const [companyFilter, setCompanyFilter] = useState("all");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const debounced = useDebounce(search, 250);
  
  const uniqueTags = useMemo(() => {
     const tags = new Set();
     contacts.forEach(c => {
        if(c.tags) c.tags.split(",").forEach(t => tags.add(t.trim()));
     });
     return Array.from(tags).filter(Boolean);
  }, [contacts]);

  const uniqueCompanies = useMemo(() => {
     const companies = new Set();
     contacts.forEach(c => {
        if(c.company_name) companies.add(c.company_name);
     });
     return Array.from(companies);
  }, [contacts]);

  const filtered = useMemo(() => {
    let items = contacts;
    if (statusFilter !== "all") items = items.filter((c) => c.status === statusFilter);
    if (tagFilter !== "all") items = items.filter(c => (c.tags || "").split(",").map(t=>t.trim()).includes(tagFilter));
    if (deptFilter !== "all") items = items.filter((c) => c.department === deptFilter);
    if (companyFilter !== "all") items = items.filter((c) => c.company_name === companyFilter);
    
    if (dateRange.start) {
      const start = new Date(dateRange.start).getTime();
      items = items.filter(c => new Date(c.created_at).getTime() >= start);
    }
    if (dateRange.end) {
      const end = new Date(dateRange.end).getTime() + 86400000;
      items = items.filter(c => new Date(c.created_at).getTime() <= end);
    }
    
    return filterBySearch(items, debounced, [
      "contact_name", "company_name", "contact_number", "email", 
      "department", "city", "state", "country", "gstin", "tags", "address"
    ]);
  }, [contacts, statusFilter, tagFilter, deptFilter, companyFilter, dateRange, debounced]);

  const openCreate = () => { setEditing(null); setModalOpen(true); };
  const openEdit = (contact) => { setEditing(contact); setModalOpen(true); };
  
  const handleSubmit = async (values) => {
    setSubmitting(true);
    try {
      if (editing) {
        const idToUpdate = editing.id || editing._id;
        await contactService.update(idToUpdate, values);
        toast.success("Contact updated");
      } else {
        await contactService.create(values);
        toast.success("Contact created");
      }
      setModalOpen(false);
      setEditing(null);
      refetch();
    } catch (e) {
      try {
        const status = e.status || e.raw?.response?.status;
        const detailObj = e.raw?.response?.data?.detail;
        
        if (status === 409 && detailObj && typeof detailObj === 'object' && detailObj.merge_candidate_id) {
          const ok = await confirmDialog({
            title: "Merge Contact?",
            text: `${detailObj.message || "Contact already exists"}. Do you want to merge it and update with these new details?`,
          });
          if (ok) {
            try {
              await contactService.update(detailObj.merge_candidate_id, values);
              toast.success("Contact merged successfully");
              setModalOpen(false);
              setEditing(null);
              refetch();
            } catch (err) {
              const errDetail = err.raw?.response?.data?.detail || err.message;
              const errMsg = typeof errDetail === 'string' ? errDetail : (errDetail?.message || "Failed to merge contact");
              toast.error(errMsg);
            }
          }
        } else {
          const msg = e.message || e.raw?.message;
          const displayMsg = typeof msg === 'string' ? msg : (msg?.message || "Failed to save contact");
          toast.error(displayMsg);
        }
      } catch (fatalError) {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (contact) => {
    const ok = await confirmDialog({
      title: "Delete contact?",
      text: `${contact.contact_name} will be permanently removed.`,
    });
    if (!ok) return;
    const idToDelete = contact.id || contact._id;
    await contactService.remove(idToDelete);
    toast.success("Contact deleted");
    refetch();
  };

  const handleStatusChange = async (contact, newStatus) => {
    if (contact.status === newStatus) return;
    const toastId = toast.loading("Updating status...");
    try {
      const idToUpdate = contact.id || contact._id;
      await contactService.update(idToUpdate, { status: newStatus });
      toast.success("Status updated", { id: toastId });
      refetch();
    } catch (err) {
      toast.error(err.message || "Failed to update status", { id: toastId });
    }
  };

  const columns = [
    {
      key: "contact_name", label: "Contact Persona", sortable: true,
      render: (r) => (
        <div className="d-flex align-items-center gap-2">
          <Avatar name={r.contact_name} size={34} />
          <div>
            <div style={{ fontWeight: 600, color: "var(--color-text)" }}>{r.contact_name}</div>
            <div className="text-subtle" style={{ fontSize: 12 }}>{r.email}</div>
          </div>
        </div>
      ),
    },
    { key: "company_name", label: "Company", sortable: true },
    { key: "contact_number", label: "Phone", sortable: true },
    { key: "department", label: "Department", sortable: true, render: (r) => <span className="text-capitalize">{r.department || "-"}</span> },
    {
      key: "status", label: "Status", sortable: true,
      render: (r) => (
        <Dropdown
          align="left"
          trigger={({ onClick }) => (
            <div onClick={(e) => { e.stopPropagation(); onClick(); }} style={{ cursor: "pointer", display: "inline-block" }}>
              <Badge variant={CONTACT_STATUS_VARIANT[r.status] || "secondary"}>
                {CONTACT_STATUS_LABEL[r.status] || r.status} <span style={{ fontSize: 10, marginLeft: 4 }}>▼</span>
              </Badge>
            </div>
          )}
          items={Object.entries(CONTACT_STATUS_LABEL).map(([k, v]) => ({
            label: v,
            onClick: () => handleStatusChange(r, k),
          }))}
        />
      ),
    },
    { key: "city", label: "City", sortable: true },
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
        title="Contacts Workspace"
        description={`${filtered.length} Contacts available`}
        actions={
          <Button variant="gradient" icon={FiPlus} onClick={openCreate}>Create New Contact</Button>
        }
      />
      <div className="card p-3 mb-3">
        <div className="row g-2 align-items-center">
          <div className="col-12 col-xl-3">
            <SearchBar value={search} onChange={setSearch} placeholder="Search anything…" />
          </div>
          
          <div className="col-6 col-xl-1">
            <select className="form-select form-select-sm" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="all">Status</option>
              {Object.entries(CONTACT_STATUS_LABEL).map(([k, v]) => (
                <option key={k} value={k}>{v}</option>
              ))}
            </select>
          </div>
          
          <div className="col-6 col-xl-1">
            <select className="form-select form-select-sm" value={deptFilter} onChange={(e) => setDeptFilter(e.target.value)}>
              <option value="all">Dept.</option>
              {Object.entries(CONTACT_DEPARTMENTS).map(([k, v]) => (
                <option key={k} value={k}>{v}</option>
              ))}
            </select>
          </div>
          
          <div className="col-6 col-xl-1">
            <select className="form-select form-select-sm" value={tagFilter} onChange={(e) => setTagFilter(e.target.value)}>
              <option value="all">Tags</option>
              {uniqueTags.map((tag, i) => (
                <option key={i} value={tag}>{tag}</option>
              ))}
            </select>
          </div>

          <div className="col-6 col-xl-1">
            <select className="form-select form-select-sm" value={companyFilter} onChange={(e) => setCompanyFilter(e.target.value)}>
              <option value="all">Company</option>
              {uniqueCompanies.map((c, i) => (
                <option key={i} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="col-12 col-md-6 col-xl-2 mt-2 mt-xl-0">
            <div className="d-flex align-items-center gap-2">
              <span className="text-muted" style={{ fontSize: '0.85rem' }}>From</span>
              <input type="date" className="form-control form-control-sm" value={dateRange.start} onChange={e => setDateRange(prev => ({...prev, start: e.target.value}))} />
            </div>
          </div>

          <div className="col-12 col-md-6 col-xl-2 mt-2 mt-xl-0">
            <div className="d-flex align-items-center gap-2">
              <span className="text-muted" style={{ fontSize: '0.85rem' }}>To</span>
              <input type="date" className="form-control form-control-sm" value={dateRange.end} onChange={e => setDateRange(prev => ({...prev, end: e.target.value}))} />
            </div>
          </div>

          <div className="col-12 col-xl-1 text-xl-end mt-2 mt-xl-0">
            <span className="text-muted-2" style={{ fontSize: 12, fontWeight: 600 }}>
              {filtered.length} / {contacts.length}
            </span>
          </div>
        </div>
      </div>
      <Table columns={columns} data={filtered} loading={loading} />
      
      <ContactFormModal
        open={modalOpen}
        onClose={() => { setModalOpen(false); setEditing(null); }}
        onSubmit={handleSubmit}
        initialValues={editing}
        submitting={submitting}
      />
    </>
  );
}