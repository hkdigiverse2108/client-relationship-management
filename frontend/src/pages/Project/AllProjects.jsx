import { useCallback, useMemo, useState, useEffect } from "react";
import { FiPlus, FiEdit2, FiTrash2, FiMoreVertical, FiDownload, FiFilter } from "react-icons/fi";
import toast from "react-hot-toast";
import PageHeader from "@/components/common/PageHeader/PageHeader";
import Button from "@/components/common/Button/Button";
import Table from "@/components/common/Table/Table";
import Badge from "@/components/common/Badge/Badge";
import SearchBar from "@/components/common/SearchBar/SearchBar";
import Dropdown from "@/components/common/Dropdown/Dropdown";
import ProjectFormModal from "./ProjectFormModal";
import ProjectSidebar from "./ProjectSidebar";
import { projectService } from "@/api/services/projectService";
import { useAsync } from "@/hooks/useAsync";
import { useDebounce } from "@/hooks/useDebounce";
import { filterBySearch } from "@/utils/helpers";
import { formatCurrency, formatDate } from "@/utils/formatters";
import { confirmDialog } from "@/components/common/ConfirmDialog/confirmDialog";
import api from "@/api/axiosClient";

const STATUS_LABELS = {
  active: "Active",
  hold: "On Hold",
  completed: "Completed",
  cancelled: "Cancelled"
};

const STATUS_VARIANTS = {
  active: "success",
  hold: "warning",
  completed: "primary",
  cancelled: "danger"
};

const PRIORITY_VARIANTS = {
  critical: "danger",
  high: "warning",
  medium: "primary",
  low: "secondary"
};

export default function AllProjects() {
  const load = useCallback(async () => {
    return await projectService.list();
  }, []);
  const { data: rawProjects, loading, refetch } = useAsync(load, [], []);
  const projects = useMemo(() => rawProjects || [], [rawProjects]);
  
  const [search, setSearch] = useState("");
  const [sidebarFilters, setSidebarFilters] = useState({ status: "all", priority: "all", category: "all" });
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  
  const [usersMap, setUsersMap] = useState({});
  const [clientsMap, setClientsMap] = useState({});

  useEffect(() => {
    api.get("/users").then((res) => {
      const map = {};
      (res || []).forEach(u => map[u.id] = u.name);
      setUsersMap(map);
    }).catch(console.error);

    api.get("/clients").then((res) => {
      const map = {};
      (res || []).forEach(c => map[c.id || c._id] = c.company_name || c.client_name || c.name || "Unknown Client");
      setClientsMap(map);
    }).catch(console.error);
  }, []);

  const debounced = useDebounce(search, 250);
  const filtered = useMemo(() => {
    let items = projects;
    
    if (sidebarFilters.status !== "all") {
      items = items.filter((p) => (p.status || "active").toLowerCase() === sidebarFilters.status);
    }
    if (sidebarFilters.priority !== "all") {
      items = items.filter((p) => (p.priority || "medium") === sidebarFilters.priority);
    }
    if (sidebarFilters.category !== "all") {
      items = items.filter((p) => (p.category || "Web Development") === sidebarFilters.category);
    }

    return filterBySearch(items, debounced, ["title", "category", "department"]);
  }, [projects, sidebarFilters, debounced]);

  const openCreate = () => { setEditing(null); setModalOpen(true); };
  const openEdit = (project) => { setEditing(project); setModalOpen(true); };
  
  const handleSubmit = async (values) => {
    setSubmitting(true);
    try {
      if (editing) {
        const idToUpdate = editing.id || editing._id;
        await projectService.update(idToUpdate, values);
        toast.success("Project updated");
      } else {
        await projectService.create(values);
        toast.success("Project created");
      }
      setModalOpen(false);
      setEditing(null);
      refetch();
    } catch (e) {
      toast.error(e.message || "Failed to save project");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (project) => {
    const ok = await confirmDialog({
      title: "Delete project?",
      text: `${project.title} will be permanently removed.`,
    });
    if (!ok) return;
    const idToDelete = project.id || project._id;
    await projectService.remove(idToDelete);
    toast.success("Project deleted");
    refetch();
  };

  const handleStatusChange = async (project, newStatus) => {
    if (project.status === newStatus) return;
    const toastId = toast.loading("Updating status...");
    try {
      const idToUpdate = project.id || project._id;
      await projectService.update(idToUpdate, { status: newStatus });
      toast.success("Status updated", { id: toastId });
      refetch();
    } catch (err) {
      toast.error("Failed to update status", { id: toastId });
    }
  };

  const columns = [
    {
      key: "title", label: "Project", sortable: true,
      render: (r) => (
        <div>
          <div style={{ fontWeight: 600, color: "var(--color-text)" }}>{r.title}</div>
          <div className="text-subtle" style={{ fontSize: 12 }}>{clientsMap[r.client_id] || "Unknown Client"}</div>
        </div>
      ),
    },
    { key: "category", label: "Category", sortable: true },
    { 
      key: "priority", label: "Priority", sortable: true,
      render: (r) => (
        <Badge variant={PRIORITY_VARIANTS[r.priority] || "secondary"}>
          {(r.priority || "").toUpperCase()}
        </Badge>
      )
    },
    {
      key: "status", label: "Status", sortable: true,
      render: (r) => (
        <Dropdown
          align="left"
          trigger={({ onClick }) => (
            <div onClick={(e) => { e.stopPropagation(); onClick(); }} style={{ cursor: "pointer", display: "inline-block" }}>
              <Badge variant={STATUS_VARIANTS[r.status] || "secondary"}>
                {STATUS_LABELS[r.status] || r.status} <span style={{ fontSize: 10, marginLeft: 4 }}>▼</span>
              </Badge>
            </div>
          )}
          items={Object.entries(STATUS_LABELS).map(([k, v]) => ({
            label: v,
            onClick: () => handleStatusChange(r, k),
          }))}
        />
      ),
    },
    { key: "project_value", label: "Value", sortable: true, align: "right", render: (r) => formatCurrency(r.project_value) },
    { key: "assigned_to", label: "Assigned To", sortable: true, render: (r) => (
        <div style={{ fontSize: 13, fontWeight: 500 }}>
          {usersMap[r.assigned_to] || "Unassigned"}
        </div>
      ) 
    },
    { key: "end_date", label: "Deadline", sortable: true, render: (r) => r.end_date ? formatDate(r.end_date) : "-" },
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
        title="Project Workspace"
        description={`${filtered.length} Projects matching filters`}
        actions={
          <>
            <Button variant="hero" icon={FiDownload}>Export</Button>
            <Button variant="gradient" icon={FiPlus} onClick={openCreate}>Create Project</Button>
          </>
        }
      />
      <div className="row g-4">
        <div className="col-12 col-xl-2 col-lg-3">
          <ProjectSidebar projects={projects} filters={sidebarFilters} setFilters={setSidebarFilters} />
        </div>
        <div className="col-12 col-xl-10 col-lg-9">
          <div className="card p-3 mb-3">
            <div className="row g-2 align-items-center">
              <div className="col-12 col-md-6 col-lg-5">
                <SearchBar value={search} onChange={setSearch} placeholder="Search by project name or category…" />
              </div>

              <div className="col-6 col-md-3 col-lg-2">
                <Button variant="secondary" icon={FiFilter} block>Filters</Button>
              </div>
              <div className="col-12 col-lg-3 text-lg-end">
                <span className="text-muted-2" style={{ fontSize: 13 }}>
                  {filtered.length} of {projects.length} projects
                </span>
              </div>
            </div>
          </div>
          <Table columns={columns} data={filtered} loading={loading} />
        </div>
      </div>
      <ProjectFormModal
        open={modalOpen}
        onClose={() => { setModalOpen(false); setEditing(null); }}
        onSubmit={handleSubmit}
        initialValues={editing}
        submitting={submitting}
      />
    </>
  );
}