import React, { useState, useEffect, useMemo, useCallback } from "react";
import { FiPlus, FiClock, FiDollarSign } from "react-icons/fi";
import PageHeader from "@/components/common/PageHeader/PageHeader";
import Button from "@/components/common/Button/Button";
import Loader from "@/components/common/Loader/Loader";
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

export default function ProjectPipeline() {
  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

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

  const grouped = useMemo(() => {
    const g = {};
    STAGES.forEach(s => g[s.id] = []);
    projects.forEach(p => {
      const stage = p.stage || "new"; // fallback to 'new' if no stage
      if (g[stage]) {
        g[stage].push(p);
      } else {
        g["new"].push(p);
      }
    });
    return g;
  }, [projects]);

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

  const handleCreateProject = async (values) => {
    setSubmitting(true);
    try {
      await api.post("/projects", values);
      toast.success("Project created successfully");
      setModalOpen(false);
      loadData();
    } catch (err) {
      toast.error("Failed to create project");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <>
      <PageHeader 
        title="Project Pipeline"
        description="Manage project lifecycle stages visually"
        action={
          <Button onClick={() => setModalOpen(true)}>
            <FiPlus className="me-2" /> New Project
          </Button>
        }
      />

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
          onClose={() => setModalOpen(false)}
          onSubmit={handleCreateProject}
          submitting={submitting}
        />
      )}
    </>
  );
}
