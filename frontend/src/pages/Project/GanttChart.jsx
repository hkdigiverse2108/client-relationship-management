import React, { useState, useEffect, useMemo } from "react";
import { FiPlus, FiCalendar, FiClock } from "react-icons/fi";
import PageHeader from "@/components/common/PageHeader/PageHeader";
import Button from "@/components/common/Button/Button";
import Loader from "@/components/common/Loader/Loader";
import api from "@/api/axiosClient";
import toast from "react-hot-toast";
import ProjectFormModal from "./ProjectFormModal";
import "./GanttChart.css";

// --- Date Helpers ---
const differenceInDays = (date2, date1) => {
  const diffTime = Math.abs(date2.getTime() - date1.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};
const addDays = (date, days) => new Date(date.getTime() + days * 24 * 60 * 60 * 1000);
const minDate = (dates) => new Date(Math.min(...dates.map(d => d.getTime())));
const maxDate = (dates) => new Date(Math.max(...dates.map(d => d.getTime())));
const startOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1);
const endOfMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0);
const eachDayOfInterval = ({ start, end }) => {
  const arr = [];
  let current = new Date(start);
  while (current <= end) {
    arr.push(new Date(current));
    current = addDays(current, 1);
  }
  return arr;
};
const formatDay = (date) => date.getDate().toString().padStart(2, '0');
const formatMonth = (date) => date.toLocaleString('default', { month: 'short' });

export default function GanttChart() {
  const [projects, setProjects] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState("");
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [modalOpen, setModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const loadProjects = async () => {
    try {
      const res = await api.get("/projects");
      setProjects(res || []);
      if (res && res.length > 0) {
        setSelectedProjectId(res[0].id || res[0]._id);
      }
    } catch (err) {
      toast.error("Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  const loadTasks = async (projectId) => {
    if (!projectId) return;
    try {
      const res = await api.get(`/tasks?project_id=${projectId}`);
      setTasks(res || []);
    } catch (err) {
      toast.error("Failed to load tasks");
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  useEffect(() => {
    if (selectedProjectId) {
      loadTasks(selectedProjectId);
    }
  }, [selectedProjectId]);

  const handleSaveProject = async (values) => {
    setSubmitting(true);
    try {
      await api.post("/projects", values);
      toast.success("Project created successfully");
      setModalOpen(false);
      loadProjects();
    } catch (err) {
      toast.error("Failed to create project");
    } finally {
      setSubmitting(false);
    }
  };

  // Gantt Chart Logic
  const { chartDates, totalDays, startDate } = useMemo(() => {
    if (tasks.length === 0) {
      const today = new Date();
      const start = startOfMonth(today);
      const end = endOfMonth(today);
      return { 
        chartDates: eachDayOfInterval({ start, end }), 
        totalDays: differenceInDays(end, start) + 1,
        startDate: start
      };
    }

    const dates = tasks.map(t => [new Date(t.start_date), new Date(t.end_date)]).flat();
    const mDate = minDate(dates);
    const mxDate = maxDate(dates);
    
    // Pad by a few days
    const start = addDays(mDate, -3);
    const end = addDays(mxDate, 5);
    
    return {
      chartDates: eachDayOfInterval({ start, end }),
      totalDays: differenceInDays(end, start) + 1,
      startDate: start
    };
  }, [tasks]);

  const getGridTemplate = () => {
    return `250px repeat(${totalDays}, 40px)`;
  };

  if (loading) return <Loader />;

  return (
    <>
      <PageHeader
        title="Gantt Chart"
        description="Visualize project timelines, tasks, and milestones."
        actions={
          <div className="d-flex align-items-center gap-2">
            <select 
              className="form-select form-select-sm"
              style={{ minWidth: "200px", height: "38px", borderRadius: "var(--radius-full)" }}
              value={selectedProjectId}
              onChange={(e) => setSelectedProjectId(e.target.value)}
            >
              <option value="" disabled>Select Project...</option>
              {projects.map(p => (
                <option key={p.id || p._id} value={p.id || p._id}>{p.title}</option>
              ))}
            </select>
            <Button icon={FiPlus} onClick={() => setModalOpen(true)}>
              New Project
            </Button>
          </div>
        }
      />

      <div className="gantt-container">
        {tasks.length === 0 ? (
          <div className="gantt-empty-state">
            <FiCalendar size={48} className="text-subtle mb-3" />
            <h5>No tasks scheduled yet</h5>
            <p className="text-subtle mb-4">Tasks will be displayed here once the Tasks module is completed later.</p>
          </div>
        ) : (
          <div className="gantt-grid" style={{ gridTemplateColumns: getGridTemplate() }}>
            {/* Header Row */}
            <div className="gantt-header-row">
              <div className="gantt-header-cell task-col d-flex align-items-center">
                Task Name
              </div>
              {chartDates.map((date, i) => (
                <div key={i} className="gantt-header-cell">
                  <div style={{ fontWeight: 600 }}>{formatDay(date)}</div>
                  <div style={{ fontSize: 10 }}>{formatMonth(date)}</div>
                </div>
              ))}
            </div>

            {/* Task Rows */}
            {tasks.map(task => {
              const taskStart = new Date(task.start_date);
              const taskEnd = new Date(task.end_date);
              
              const startOffset = differenceInDays(taskStart, startDate);
              const duration = differenceInDays(taskEnd, taskStart) + 1;
              
              const left = `${startOffset * 40}px`;
              const width = `${duration * 40}px`;

              return (
                <div key={task.id || task._id} className="gantt-task-row">
                  <div className="gantt-task-cell task-title-col">
                    {task.is_milestone ? '💎 ' : ''}{task.title}
                  </div>
                  <div className="gantt-task-cell" style={{ gridColumn: `2 / span ${totalDays}` }}>
                    {task.is_milestone ? (
                      <div 
                        className="gantt-milestone" 
                        style={{ left: `calc(${left} + 20px)` }} 
                        title={`${task.title} - ${formatMonth(taskStart)} ${formatDay(taskStart)}`}
                      />
                    ) : (
                      <div className="gantt-bar-wrapper" style={{ left, width }}>
                        <div className="gantt-bar-title">{task.title}</div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {modalOpen && (
        <ProjectFormModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onSubmit={handleSaveProject}
          submitting={submitting}
        />
      )}
    </>
  );
}