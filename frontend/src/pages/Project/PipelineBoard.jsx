import React, { useState, useEffect, useMemo, useCallback } from "react";
import { FiPlus, FiClock, FiDollarSign, FiEdit2, FiTrash2 } from "react-icons/fi";
import PageHeader from "@/components/common/PageHeader/PageHeader";
import { confirmDialog } from "@/components/common/ConfirmDialog/confirmDialog";
import Button from "@/components/common/Button/Button";
import Loader from "@/components/common/Loader/Loader";
import SearchInput from "@/components/common/PageHeaderSearchBar/SearchInput";
import api from "@/api/axiosClient";
import toast from "react-hot-toast";
import ProjectFormModal from "./ProjectFormModal";
import { formatCurrency, formatDate } from "@/utils/formatters";
import "./ProjectPipeline.css";

const STAGES = [
  { id: "new", label: "New" },
  { id: "in_progress", label: "In Progress" },
  { id: "review", label: "In Review" },
  { id: "completed", label: "Completed" },
  { id: "hold", label: "On Hold" }
];

export default function PipelineBoard() {
  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [stageFilter, setStageFilter] = useState("all");
  const [editingProject, setEditingProject] = useState(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [projRes, cliRes] = await Promise.all([
        api.get("/projects"),
        api.get("/clients")
      ]);
      setProjects(projRes || []);
      setClients(cliRes || []);
    } catch (error) {
      console.error("Failed to load pipeline data:", error);
      toast.error("Failed to load projects");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const clientsMap = useMemo(() => {
    const map = {};
    clients.forEach(c => map[c.id || c._id] = c.company_name || c.client_name);
    return map;
  }, [clients]);

  const filteredProjects = useMemo(() => {
    return projects.filter(p => {
      const matchesSearch = !searchQuery || 
        p.title?.toLowerCase().includes(searchQuery.toLowerCase()) || 
        (clientsMap[p.client_id] || "").toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStage = stageFilter === "all" || (p.stage || "new") === stageFilter;
      return matchesSearch && matchesStage;
    });
  }, [projects, searchQuery, stageFilter, clientsMap]);

  const grouped = useMemo(() => {
    const g = {};
    STAGES.forEach(s => g[s.id] = []);
    filteredProjects.forEach(p => {
      const stage = p.stage || "new"; // fallback to 'new' if no stage
      if (g[stage]) {
        g[stage].push(p);
      } else {
        g["new"].push(p);
      }
    });
    return g;
  }, [filteredProjects]);

  const handleDragStart = (e, projectId) => {
    e.dataTransfer.setData("projectId", projectId);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = async (e, newStage) => {
    e.preventDefault();
    const projectId = e.dataTransfer.getData("projectId");
    if (!projectId) return;

    const projectToMove = projects.find(p => (p.id || p._id) === projectId);
    if (!projectToMove || projectToMove.stage === newStage) return;

    // Optimistic UI update
    setProjects(prev => prev.map(p => (p.id || p._id) === projectId ? { ...p, stage: newStage } : p));

    try {
      await api.put(`/projects/${projectId}`, { stage: newStage });
      toast.success("Project stage updated");
    } catch (err) {
      toast.error("Failed to update project stage");
      loadData(); // Revert on failure
    }
  };

  const handleSaveProject = async (values) => {
    setSubmitting(true);
    try {
      if (editingProject) {
        await api.put(`/projects/${editingProject.id || editingProject._id}`, values);
        toast.success("Project updated successfully");
      } else {
        await api.post("/projects", values);
        toast.success("Project created successfully");
      }
      setModalOpen(false);
      setEditingProject(null);
      loadData();
    } catch (err) {
      toast.error("Failed to save project");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteProject = async (projectId) => {
    const confirmed = await confirmDialog({ text: "Are you sure you want to delete this project?" });
    if (confirmed) {
      try {
        await api.delete(`/projects/${projectId}`);
        toast.success("Project deleted successfully");
        loadData();
      } catch (err) {
        toast.error("Failed to delete project");
      }
    }
  };

  const openEdit = (project) => {
    setEditingProject(project);
    setModalOpen(true);
  };

  const openCreate = () => {
    setEditingProject(null);
    setModalOpen(true);
  };

  if (loading) return <Loader />;

  return (
    <>
      <PageHeader 
        title="Pipeline Board"
        description="Manage project lifecycle stages visually"
        actions={
          <>
            {/* Desktop Actions */}
            <div className="d-none d-lg-flex align-items-center gap-2">
              <SearchInput
                dark
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <select 
                className="form-select form-select-sm"
                style={{ width: "150px", height: "38px", borderRadius: "var(--radius-full)" }}
                value={stageFilter}
                onChange={(e) => setStageFilter(e.target.value)}
              >
                <option value="all">All Stages</option>
                {STAGES.map(s => (
                  <option key={s.id} value={s.id}>{s.label}</option>
                ))}
              </select>
              <Button variant="gradient" onClick={openCreate}>
                <FiPlus className="me-2" /> New Project
              </Button>
            </div>

            {/* Mobile Actions */}
            <div className="d-flex d-lg-none">
              <Button variant="gradient" onClick={openCreate}>
                <FiPlus className="me-2" /> New Project
              </Button>
            </div>
          </>
        }
      />

      {/* Mobile Toolbar */}
      <div className="d-flex d-lg-none flex-wrap align-items-center mb-4 gap-2">
        <select 
          className="form-select"
          style={{ width: "140px", flexShrink: 0, borderRadius: "var(--radius-full)" }}
          value={stageFilter}
          onChange={(e) => setStageFilter(e.target.value)}
        >
          <option value="all">All Stages</option>
          {STAGES.map(s => (
            <option key={s.id} value={s.id}>{s.label}</option>
          ))}
        </select>
        <div style={{ flex: "1 1 200px" }}>
          <SearchInput
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="project-pipeline-container">
        <div className="pipeline-board">
          {STAGES.map(stage => {
            const columnProjects = grouped[stage.id];
            const columnTotalValue = columnProjects.reduce((sum, p) => sum + (p.project_value || 0), 0);

            return (
              <div 
                key={stage.id} 
                className="pipeline-column"
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, stage.id)}
              >
                <div className="column-header">
                  <div className="column-title">
                    {stage.label}
                    <span className="column-count">{columnProjects.length}</span>
                  </div>
                  <div className="column-total">
                    {formatCurrency(columnTotalValue)}
                  </div>
                </div>
                
                <div className="column-body">
                  {columnProjects.map(project => (
                    <div 
                      key={project.id || project._id} 
                      className="project-card"
                      draggable
                      onDragStart={(e) => handleDragStart(e, project.id || project._id)}
                    >
                      <div className="card-header">
                        <div>
                          <h4 className="card-title">{project.title}</h4>
                          <div className="card-client">{clientsMap[project.client_id] || "Unknown Client"}</div>
                        </div>
                        <div className="d-flex gap-2">
                          <button 
                            className="btn btn-sm text-muted p-0" 
                            onClick={() => openEdit(project)}
                            title="Edit"
                          >
                            <FiEdit2 size={14} />
                          </button>
                          <button 
                            className="btn btn-sm text-danger p-0" 
                            onClick={() => handleDeleteProject(project.id || project._id)}
                            title="Delete"
                          >
                            <FiTrash2 size={14} />
                          </button>
                        </div>
                      </div>

                      <div className="card-badges">
                        <span className="badge-category">{project.category}</span>
                        <span className={`badge-priority priority-${(project.priority || 'medium').toLowerCase()}`}>
                          {project.priority ? project.priority.charAt(0).toUpperCase() + project.priority.slice(1) : 'Medium'}
                        </span>
                      </div>

                      <div className="card-footer">
                        <div className="card-date">
                          <FiClock /> {project.end_date ? formatDate(project.end_date) : 'No Deadline'}
                        </div>
                        <div className="card-value">
                          {formatCurrency(project.project_value || 0)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {modalOpen && (
        <ProjectFormModal 
          open={modalOpen}
          onClose={() => { setModalOpen(false); setEditingProject(null); }}
          onSubmit={handleSaveProject}
          initialValues={editingProject}
          submitting={submitting}
        />
      )}
    </>
  );
}