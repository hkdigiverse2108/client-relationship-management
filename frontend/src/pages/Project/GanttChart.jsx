import React, { useState, useEffect, useMemo } from "react";
import { FiPlus, FiCalendar, FiFolder, FiChevronDown, FiChevronRight } from "react-icons/fi";
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
  const [collapsedProjects, setCollapsedProjects] = useState({});

  const toggleProject = (projectId) => {
    setCollapsedProjects(prev => ({
      ...prev,
      [projectId]: !prev[projectId]
    }));
  };
  const [submitting, setSubmitting] = useState(false);

  const loadProjects = async () => {
    try {
      const res = await api.get("/projects");
      setProjects(res || []);
      setSelectedProjectId("all"); // Default to all projects
    } catch (err) {
      toast.error("Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  const loadTasks = async (projectId) => {
    if (!projectId) return;
    try {
      const endpoint = projectId === "all" ? "/tasks/" : `/tasks/?project_id=${projectId}`;
      const res = await api.get(endpoint);
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
  const { groupedProjects, chartDates, totalDays, startDate } = useMemo(() => {
    if (tasks.length === 0) {
      const today = new Date();
      const start = startOfMonth(today);
      const end = endOfMonth(today);
      return { 
        groupedProjects: [],
        chartDates: eachDayOfInterval({ start, end }), 
        totalDays: differenceInDays(end, start) + 1,
        startDate: start
      };
    }

    const projectMap = new Map();
    projects.forEach(p => projectMap.set(p.id || p._id, p));

    const taskGroups = {};
    tasks.forEach(task => {
      const pid = task.project_id || 'unassigned';
      if (!taskGroups[pid]) taskGroups[pid] = [];
      taskGroups[pid].push(task);
    });

    const groups = [];
    let globalDates = [];

    for (const [projectId, projectTasks] of Object.entries(taskGroups)) {
      const project = projectMap.get(projectId) || { title: projectId === 'unassigned' ? "Unassigned Tasks" : "Unknown Project" };
      
      const pDates = projectTasks.map(t => {
        const sDate = t.start_date ? new Date(t.start_date) : new Date();
        const eDate = t.end_date ? new Date(t.end_date) : addDays(sDate, 1);
        return [sDate, eDate];
      }).flat();
      
      const pStart = minDate(pDates);
      const pEnd = maxDate(pDates);
      
      globalDates.push(...pDates);

      groups.push({
        id: projectId,
        title: project.title,
        startDate: pStart,
        endDate: pEnd,
        tasks: projectTasks
      });
    }

    const mDate = minDate(globalDates);
    const mxDate = maxDate(globalDates);
    
    // Pad by a few days
    const start = addDays(mDate, -3);
    const end = addDays(mxDate, 5);
    
    return {
      groupedProjects: groups,
      chartDates: eachDayOfInterval({ start, end }),
      totalDays: differenceInDays(end, start) + 1,
      startDate: start
    };
  }, [tasks, projects]);

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
          <>
            {/* Desktop Actions */}
            <div className="d-none d-lg-flex align-items-center gap-2">
              <select 
                className="form-select form-select-sm"
                style={{ minWidth: "200px", height: "38px", borderRadius: "var(--radius-full)" }}
                value={selectedProjectId}
                onChange={(e) => setSelectedProjectId(e.target.value)}
              >
                <option value="all">All Projects</option>
                <option value="" disabled>Select Project...</option>
                {projects.map(p => (
                  <option key={p.id || p._id} value={p.id || p._id}>{p.title}</option>
                ))}
              </select>
              <Button icon={FiPlus} onClick={() => setModalOpen(true)}>
                New Project
              </Button>
            </div>

            {/* Mobile Actions */}
            <div className="d-flex d-lg-none">
              <Button icon={FiPlus} onClick={() => setModalOpen(true)}>
                New Project
              </Button>
            </div>
          </>
        }
      />

      {/* Mobile Toolbar */}
      <div className="d-flex d-lg-none mb-4">
        <select 
          className="form-select"
          style={{ width: "100%", borderRadius: "var(--radius-full)" }}
          value={selectedProjectId}
          onChange={(e) => setSelectedProjectId(e.target.value)}
        >
          <option value="all">All Projects</option>
          <option value="" disabled>Select Project...</option>
          {projects.map(p => (
            <option key={p.id || p._id} value={p.id || p._id}>{p.title}</option>
          ))}
        </select>
      </div>

      <div className="gantt-container">
        {tasks.length === 0 ? (
          <div className="gantt-empty-state">
            <FiCalendar size={48} className="text-subtle mb-3" />
            <h5>No tasks found</h5>
            <p className="text-subtle mb-4">Create some tasks in the Task Board and assign them to this project to view them here.</p>
          </div>
        ) : (
          <div className="gantt-grid" style={{ gridTemplateColumns: getGridTemplate() }}>
            {/* Header Row */}
            <div className="gantt-header-row">
              <div 
                className="gantt-header-cell task-col d-flex align-items-center"
                style={{ zIndex: 999, backgroundColor: 'var(--color-surface)' }}
              >
                Task Name
              </div>
              {chartDates.map((date, i) => (
                <div key={i} className="gantt-header-cell" style={{ zIndex: 10 }}>
                  <div style={{ fontWeight: 600 }}>{formatDay(date)}</div>
                  <div style={{ fontSize: 10 }}>{formatMonth(date)}</div>
                </div>
              ))}
            </div>

            {/* Hierarchical Rows */}
            {groupedProjects.map(group => {
              const groupStart = group.startDate;
              const groupEnd = group.endDate;
              
              const gStartOffset = differenceInDays(groupStart, startDate);
              const gDuration = differenceInDays(groupEnd, groupStart) + 1;
              
              const gLeft = `${gStartOffset * 40}px`;
              const gWidth = `${gDuration * 40}px`;

              return (
                <React.Fragment key={group.id}>
                  {/* Project Row */}
                  <div className="gantt-task-row gantt-project-row">
                    <div 
                      className="gantt-task-cell task-title-col gantt-project-title d-flex align-items-center" 
                      style={{ cursor: "pointer" }}
                      onClick={() => toggleProject(group.id)}
                    >
                      {collapsedProjects[group.id] ? <FiChevronRight className="me-2" /> : <FiChevronDown className="me-2" />}
                      <FiFolder className="me-2" style={{ color: 'var(--color-primary)' }} /> {group.title}
                    </div>
                    <div className="gantt-task-cell" style={{ gridColumn: `2 / span ${totalDays}`, zIndex: 1 }}>
                      <div 
                        className="gantt-project-bar" 
                        style={{ left: gLeft, width: gWidth }} 
                        title={`Project: ${group.title}\n${formatMonth(groupStart)} ${formatDay(groupStart)} - ${formatMonth(groupEnd)} ${formatDay(groupEnd)}`}
                      >
                        <div className="gantt-bar-title">{group.title}</div>
                      </div>
                    </div>
                  </div>

                  {/* Task Rows */}
                  {!collapsedProjects[group.id] && group.tasks.map(task => {
                    const taskStart = new Date(task.start_date || new Date());
                    const taskEnd = new Date(task.end_date || addDays(taskStart, 1));
                    
                    const startOffset = differenceInDays(taskStart, startDate);
                    const duration = differenceInDays(taskEnd, taskStart) + 1;
                    
                    const left = `${startOffset * 40}px`;
                    const width = `${duration * 40}px`;

                    let statusColor = 'var(--color-primary)';
                    if (task.status === 'Completed') statusColor = 'var(--color-success)';
                    else if (task.status === 'In Progress') statusColor = 'var(--color-info)';
                    else if (task.status === 'In Review') statusColor = 'var(--color-warning)';
                    else if (task.status === 'Blocked') statusColor = 'var(--color-danger)';

                    return (
                      <div key={task.id || task._id} className="gantt-task-row">
                        <div className="gantt-task-cell task-title-col gantt-task-title">
                          <span className="task-indent"></span> {task.is_milestone ? '💎 ' : ''}{task.title}
                        </div>
                        <div className="gantt-task-cell" style={{ gridColumn: `2 / span ${totalDays}`, zIndex: 1 }}>
                          {task.is_milestone ? (
                            <div 
                              className="gantt-milestone" 
                              style={{ left: `calc(${left} + 20px)` }} 
                              title={`${task.title} - ${formatMonth(taskStart)} ${formatDay(taskStart)}`}
                            />
                          ) : (
                            <div 
                              className="gantt-bar-wrapper" 
                              style={{ left, width, backgroundColor: statusColor }} 
                              title={`${task.title} (${task.status})\n${formatMonth(taskStart)} ${formatDay(taskStart)} - ${formatMonth(taskEnd)} ${formatDay(taskEnd)}`}
                            >
                              <div className="gantt-bar-title">{task.title}</div>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </React.Fragment>
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