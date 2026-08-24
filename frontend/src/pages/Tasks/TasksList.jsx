import React, { useState, useEffect, useMemo } from "react";
import { FiPlus, FiClock, FiEdit2, FiTrash2, FiCalendar, FiTrello } from "react-icons/fi";
import PageHeader from "@/components/common/PageHeader/PageHeader";
import { confirmDialog } from "@/components/common/ConfirmDialog/confirmDialog";
import Button from "@/components/common/Button/Button";
import Loader from "@/components/common/Loader/Loader";
import api from "@/api/axiosClient";
import toast from "react-hot-toast";
import TaskFormModal from "./TaskFormModal";
import CalendarView from "@/pages/Calendar/Calendar";
import { formatDate } from "@/utils/formatters";
import "@/pages/Project/ProjectPipeline.css";

const STATUSES = [
  { id: "To Do", label: "To Do" },
  { id: "In Progress", label: "In Progress" },
  { id: "In Review", label: "In Review" },
  { id: "On Hold", label: "On Hold" },
  { id: "Completed", label: "Completed" }
];

export default function TasksList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [viewMode, setViewMode] = useState("board"); 

  const loadTasks = async () => {
    setLoading(true);
    try {
      const res = await api.get("/tasks/");
      setTasks(res || []);
    } catch (err) {
      toast.error("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const columns = useMemo(() => {
    const cols = {};
    STATUSES.forEach(s => cols[s.id] = []);
    tasks.forEach(t => {
      if (cols[t.status]) cols[t.status].push(t);
      else cols["To Do"].push(t);
    });
    return cols;
  }, [tasks]);

  const handleDragStart = (e, taskId) => {
    e.dataTransfer.setData("taskId", taskId);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = async (e, newStatus) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("taskId");
    if (!taskId) return;

    const activeTask = tasks.find(t => t.id === taskId || t._id === taskId);
    if (!activeTask || activeTask.status === newStatus) return;

    // Optimistic UI update
    const previousTasks = [...tasks];
    setTasks(prev => prev.map(t => 
      (t.id === taskId || t._id === taskId) ? { ...t, status: newStatus } : t
    ));

    try {
      await api.put(`/tasks/${taskId}`, { status: newStatus });
    } catch (err) {
      toast.error("Failed to update task status");
      setTasks(previousTasks);
    }
  };

  const handleSaveTask = async (values) => {
    setSubmitting(true);
    try {
      if (editingTask) {
        await api.put(`/tasks/${editingTask.id || editingTask._id}`, values);
        toast.success("Task updated successfully");
      } else {
        await api.post("/tasks/", values);
        toast.success("Task created successfully");
      }
      setModalOpen(false);
      setEditingTask(null);
      loadTasks();
    } catch (err) {
      toast.error("Failed to save task");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setModalOpen(true);
  };

  const handleDelete = async (taskId) => {
    const confirm = await confirmDialog("Delete Task", "Are you sure you want to delete this task?");
    if (confirm) {
      try {
        await api.delete(`/tasks/${taskId}`);
        toast.success("Task deleted successfully");
        loadTasks();
      } catch (err) {
        toast.error("Failed to delete task");
      }
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'high': return 'var(--color-warning)';
      case 'critical': return 'var(--color-danger)';
      case 'medium': return 'var(--color-info)';
      case 'low': return 'var(--color-success)';
      default: return 'var(--color-text-muted)';
    }
  };

  const getTypeBadge = (type) => {
    return <span className="badge bg-light text-dark border">{type}</span>;
  };

  if (loading) return <Loader />;

  return (
    <>
      <PageHeader
        title="Task Board"
        description="Manage and track all your tasks across projects."
        actions={
          <>
            {/* Desktop Actions */}
            <div className="d-none d-md-flex align-items-center gap-3">
              <div className="btn-group bg-surface border rounded-pill">
                <button 
                  className={`btn btn-sm rounded-pill border-0 ${viewMode !== 'board' ? 'bg-transparent text-subtle' : ''}`}
                  style={{ whiteSpace: "nowrap", ...(viewMode === 'board' ? { backgroundColor: 'var(--color-primary)', color: '#fff' } : {}) }}
                  onClick={() => setViewMode('board')}
                >
                  <FiTrello className="me-1" /> Task Board
                </button>
                <button 
                  className={`btn btn-sm rounded-pill border-0 ${viewMode !== 'calendar' ? 'bg-transparent text-subtle' : ''}`}
                  style={{ whiteSpace: "nowrap", ...(viewMode === 'calendar' ? { backgroundColor: 'var(--color-primary)', color: '#fff' } : {}) }}
                  onClick={() => setViewMode('calendar')}
                >
                  <FiCalendar className="me-1" /> Calendar
                </button>
              </div>
              <Button variant="gradient" icon={FiPlus} onClick={() => { setEditingTask(null); setModalOpen(true); }}>
                New Task
              </Button>
            </div>

            {/* Mobile Actions */}
            <div className="d-flex d-md-none">
              <Button variant="gradient" icon={FiPlus} onClick={() => { setEditingTask(null); setModalOpen(true); }}>
                New Task
              </Button>
            </div>
          </>
        }
      />

      {/* Mobile Toolbar */}
      <div className="d-flex d-md-none mb-4">
        <div className="btn-group bg-surface border rounded-pill w-100">
          <button 
            className={`btn rounded-pill border-0 w-50 ${viewMode !== 'board' ? 'bg-transparent text-subtle' : ''}`}
            style={{
              padding: "0.4rem",
              fontSize: "0.8rem", 
              whiteSpace: "nowrap",
              ...(viewMode === 'board' ? { backgroundColor: 'var(--color-primary)', color: '#fff' } : {})
            }}
            onClick={() => setViewMode('board')}
          >
            <FiTrello className="me-1" /> Task Board
          </button>
          <button 
            className={`btn rounded-pill border-0 w-50 ${viewMode !== 'calendar' ? 'bg-transparent text-subtle' : ''}`}
            style={{
              padding: "0.4rem",
              fontSize: "0.8rem", 
              whiteSpace: "nowrap",
              ...(viewMode === 'calendar' ? { backgroundColor: 'var(--color-primary)', color: '#fff' } : {})
            }}
            onClick={() => setViewMode('calendar')}
          >
            <FiCalendar className="me-1" /> Calendar
          </button>
        </div>
      </div>

      {viewMode === "calendar" ? (
        <div className="mt-4">
          <CalendarView hideHeader={true} />
        </div>
      ) : (
        <div className="pipeline-board-container mt-4">
          <div className="pipeline-board">
            {STATUSES.map(status => (
              <div 
                key={status.id} 
                className="pipeline-column" 
                onDragOver={handleDragOver} 
                onDrop={(e) => handleDrop(e, status.id)}
              >
                <div className="column-header">
                  <div className="column-title">
                    {status.label}
                    <span className="column-count">{columns[status.id].length}</span>
                  </div>
                </div>
                
                <div className="column-body">
                  {columns[status.id].map(task => (
                    <div
                      key={task.id || task._id}
                      className="project-card"
                      draggable
                      onDragStart={(e) => handleDragStart(e, task.id || task._id)}
                    >
                      <div className="card-header">
                        <div>
                           <h4 className="card-title">{task.title}</h4>
                        </div>
                        <div className="d-flex gap-2">
                          <button className="btn btn-sm text-muted p-0" onClick={() => handleEdit(task)} title="Edit">
                            <FiEdit2 size={14} />
                          </button>
                          <button className="btn btn-sm text-danger p-0" onClick={() => handleDelete(task.id || task._id)} title="Delete">
                            <FiTrash2 size={14} />
                          </button>
                        </div>
                      </div>
                      <div className="card-badges mb-2 mt-2">
                        {getTypeBadge(task.task_type)}
                        <span className={`badge-priority`} style={{ color: '#fff', backgroundColor: getPriorityColor(task.priority) }}>
                          {task.priority}
                        </span>
                      </div>
                      <div className="card-footer mt-2 pt-2 border-top" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '4px' }}>
                        <div className="card-client text-muted" style={{ fontSize: '0.8rem' }}>
                          {task.assigned_to}
                        </div>
                        {task.end_date && (
                          <div className="card-date" style={{ fontSize: '0.75rem', color: 'var(--color-text-subtle)' }}>
                            <FiClock className="me-1" />
                            {formatDate(task.end_date)}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {modalOpen && (
        <TaskFormModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onSubmit={handleSaveTask}
          submitting={submitting}
          defaultValues={editingTask || undefined}
        />
      )}
    </>
  );
}