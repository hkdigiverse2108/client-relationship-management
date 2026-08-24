import React, { useState, useEffect, useMemo } from "react";
import {
  FiPlus,
  FiSearch,
  FiFilter,
  FiCheckCircle,
  FiClock,
  FiAlertCircle,
  FiEdit2,
  FiTrash2
} from "react-icons/fi";
import PageHeader from "@/components/common/PageHeader/PageHeader";
import { confirmDialog } from "@/components/common/ConfirmDialog/confirmDialog";
import Button from "@/components/common/Button/Button";
import Loader from "@/components/common/Loader/Loader";
import api from "@/api/axiosClient";
import toast from "react-hot-toast";
import ReminderFormModal from "./ReminderFormModal";
import { formatDate } from "@/utils/formatters";

export default function RemindersList() {
  const [reminders, setReminders] = useState([]);
  const [clients, setClients] = useState({});
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingReminder, setEditingReminder] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("all");

  const loadData = async () => {
    setLoading(true);
    try {
      const [remindersRes, clientsRes] = await Promise.all([
        api.get("/reminders"),
        api.get("/clients")
      ]);
      
      setReminders(remindersRes || []);
      
      // Create client map for quick lookup
      const clientMap = {};
      const clientsList = clientsRes || [];
      clientsList.forEach(c => {
        clientMap[c.id || c._id] = c.client_name || c.company_name || "Unknown Client";
      });
      setClients(clientMap);
    } catch (err) {
      toast.error("Failed to load reminders data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSaveReminder = async (values) => {
    setSubmitting(true);
    try {
      if (editingReminder) {
        await api.put(`/reminders/${editingReminder.id || editingReminder._id}`, values);
        toast.success("Reminder updated successfully");
      } else {
        await api.post("/reminders", values);
        toast.success("Reminder created successfully");
      }
      setModalOpen(false);
      loadData();
    } catch (err) {
      toast.error("Failed to save reminder");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    const confirm = await confirmDialog("Delete Reminder", "Are you sure you want to delete this reminder?");
    if (confirm) {
      try {
        await api.delete(`/reminders/${id}`);
        toast.success("Reminder deleted");
        loadData();
      } catch (err) {
        toast.error("Failed to delete reminder");
      }
    }
  };

  const handleMarkComplete = async (reminder) => {
    try {
      await api.put(`/reminders/${reminder.id || reminder._id}`, { ...reminder, status: "completed" });
      toast.success("Reminder marked as completed");
      loadData();
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  const openEditModal = (reminder) => {
    setEditingReminder(reminder);
    setModalOpen(true);
  };

  const openNewModal = () => {
    setEditingReminder(null);
    setModalOpen(true);
  };

  // Calculate metrics
  const metrics = useMemo(() => {
    const now = new Date();
    const todayString = now.toISOString().split('T')[0];
    
    let active = 0;
    let overdue = 0;
    let completedToday = 0;

    reminders.forEach(r => {
      if (r.status === "completed") {
        // Check if updated_at was today
        if (r.updated_at && r.updated_at.startsWith(todayString)) {
          completedToday++;
        }
      } else {
        active++;
        const dueDate = new Date(r.due_date);
        if (dueDate < now) {
          overdue++;
        }
      }
    });
    return { active, overdue, completedToday };
  }, [reminders]);

  // Filter reminders
  const filteredReminders = useMemo(() => {
    return reminders.filter(r => {
      const searchLower = searchQuery.toLowerCase();
      const clientName = (clients[r.client_id] || "").toLowerCase();
      const matchesSearch = 
        r.description.toLowerCase().includes(searchLower) || 
        clientName.includes(searchLower);
        
      const matchesPriority = priorityFilter === "all" || r.priority === priorityFilter;
      
      return matchesSearch && matchesPriority;
    }).sort((a, b) => new Date(a.due_date) - new Date(b.due_date)); // Sort by closest date
  }, [reminders, searchQuery, priorityFilter, clients]);

  const getPriorityBadge = (priority) => {
    const p = priority.toLowerCase();
    if (p === 'critical') return <span className="badge bg-danger">Critical</span>;
    if (p === 'high') return <span className="badge bg-warning text-dark">High</span>;
    if (p === 'medium') return <span className="badge bg-info text-dark">Medium</span>;
    return <span className="badge bg-success">Low</span>;
  };

  if (loading) return <Loader />;

  return (
    <>
      <PageHeader
        title="Reminders"
        description="Set and manage scheduled follow-up reminders."
        actions={
          <Button variant="gradient" icon={FiPlus} onClick={openNewModal}>
            Create Reminder
          </Button>
        }
      />

      {/* Metric Cards */}
      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body d-flex align-items-center">
              <div className="bg-primary bg-opacity-10 p-3 rounded me-3">
                <FiClock className="text-primary" size={24} />
              </div>
              <div>
                <h6 className="text-subtle mb-1">Active Reminders</h6>
                <h3 className="mb-0">{metrics.active}</h3>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body d-flex align-items-center">
              <div className="bg-danger bg-opacity-10 p-3 rounded me-3">
                <FiAlertCircle className="text-danger" size={24} />
              </div>
              <div>
                <h6 className="text-subtle mb-1">Overdue Alerts</h6>
                <h3 className="mb-0">{metrics.overdue}</h3>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body d-flex align-items-center">
              <div className="bg-success bg-opacity-10 p-3 rounded me-3">
                <FiCheckCircle className="text-success" size={24} />
              </div>
              <div>
                <h6 className="text-subtle mb-1">Completed Today</h6>
                <h3 className="mb-0">{metrics.completedToday}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body d-flex flex-column flex-md-row gap-3 justify-content-between align-items-center">
          <div className="position-relative" style={{ maxWidth: '400px', width: '100%' }}>
            <FiSearch 
              className="text-subtle position-absolute" 
              style={{ left: '12px', top: '50%', transform: 'translateY(-50%)' }} 
            />
            <input 
              type="text" 
              className="form-control"
              style={{ paddingLeft: '35px' }}
              placeholder="Search reminders or clients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="d-flex align-items-center gap-2">
            <FiFilter className="text-subtle" />
            <select 
              className="form-select"
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              style={{ minWidth: '150px' }}
            >
              <option value="all">All Priorities</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="critical">Critical</option>
            </select>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="card border-0 shadow-sm">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="bg-light">
                <tr>
                  <th className="ps-4">Reminder Details</th>
                  <th>Type</th>
                  <th>Due Time</th>
                  <th>Linked Client</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th className="text-end pe-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredReminders.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center py-5 text-subtle">
                      No reminders found.
                    </td>
                  </tr>
                ) : (
                  filteredReminders.map(reminder => (
                    <tr key={reminder.id || reminder._id} className={reminder.status === 'completed' ? 'opacity-50' : ''}>
                      <td className="ps-4">
                        <div className="fw-medium" style={{ textDecoration: reminder.status === 'completed' ? 'line-through' : 'none' }}>
                          {reminder.description}
                        </div>
                      </td>
                      <td>
                        <span className="badge bg-secondary bg-opacity-10 text-secondary border">
                          {reminder.category}
                        </span>
                      </td>
                      <td>
                        <div className={`d-flex align-items-center ${new Date(reminder.due_date) < new Date() && reminder.status !== 'completed' ? 'text-danger fw-bold' : ''}`}>
                          <FiClock className="me-1" />
                          {formatDate(reminder.due_date)}
                        </div>
                      </td>
                      <td>
                        <span className="text-muted">
                          {clients[reminder.client_id] || "Unknown"}
                        </span>
                      </td>
                      <td>
                        {getPriorityBadge(reminder.priority)}
                      </td>
                      <td>
                        {reminder.status === 'completed' ? (
                          <span className="badge bg-success bg-opacity-10 text-success">
                            Completed
                          </span>
                        ) : (
                          <span className="badge bg-warning bg-opacity-10 text-warning">
                            Pending
                          </span>
                        )}
                      </td>
                      <td className="text-end pe-4">
                        <div className="d-flex justify-content-end gap-2">
                          {reminder.status !== 'completed' && (
                            <button 
                              className="btn btn-sm btn-outline-success"
                              title="Mark Complete"
                              onClick={() => handleMarkComplete(reminder)}
                            >
                              <FiCheckCircle />
                            </button>
                          )}
                          <button 
                            className="btn btn-sm btn-outline-primary"
                            title="Edit"
                            onClick={() => openEditModal(reminder)}
                          >
                            <FiEdit2 />
                          </button>
                          <button 
                            className="btn btn-sm btn-outline-danger"
                            title="Delete"
                            onClick={() => handleDelete(reminder.id || reminder._id)}
                          >
                            <FiTrash2 />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {modalOpen && (
        <ReminderFormModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onSubmit={handleSaveReminder}
          submitting={submitting}
          defaultValues={editingReminder}
        />
      )}
    </>
  );
}
