import React, { useState, useEffect } from 'react';
import axiosClient from '../../api/axiosClient';
import toast from 'react-hot-toast';
import TaskModal from '../tasks/TaskModal';
import ConfirmationModal from '../ConfirmationModal';
import { Link } from 'react-router-dom';

const backendUrl = import.meta.env.VITE_APP_API_URL?.replace('/api/v1', '') || 'http://localhost:8000';

export default function ClientTasks({ isAccordion, client, clientProjects = [], users = [] }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const modalId = isAccordion ? "delete_client_task_modal_mobile" : "delete_client_task_modal_desktop";
  
  const getInitials = (name) => {
    if (!name) return 'U';
    const words = name.trim().split(' ');
    if (words.length >= 2) return (words[0].charAt(0) + words[1].charAt(0)).toUpperCase();
    return name.substring(0, 2).toUpperCase();
  };
  
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await axiosClient.get('/tasks');
      if (Array.isArray(res)) {
        const projectIds = clientProjects.map(p => p._id || p.id);
        const filtered = res.filter(t => projectIds.includes(t.project_id));
        setTasks(filtered);
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (clientProjects.length > 0) {
      fetchTasks();
    } else {
      setTasks([]);
      setLoading(false);
    }
  }, [clientProjects]);

  useEffect(() => {
    if (isAccordion) return;
    const handleOpen = () => {
      setTaskToEdit(null);
      setIsTaskModalOpen(true);
    };
    document.addEventListener('openClientTaskModal', handleOpen);
    return () => {
      document.removeEventListener('openClientTaskModal', handleOpen);
    };
  }, [isAccordion]);

  const handleEdit = (task) => {
    setTaskToEdit(task);
    setIsTaskModalOpen(true);
  };

  const confirmDelete = (task) => {
    setTaskToDelete(task);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    if (!taskToDelete) return;
    try {
      await axiosClient.delete(`/tasks/${taskToDelete._id || taskToDelete.id}`);
      toast.success('Task deleted successfully');
      fetchTasks();
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete task');
    } finally {
      setIsDeleteModalOpen(false);
      setTaskToDelete(null);
    }
  };

  const handleSave = async (submitData) => {
    try {
      if (submitData.id || submitData._id) {
        await axiosClient.put(`/tasks/${submitData.id || submitData._id}`, submitData);
        toast.success('Task updated successfully');
      } else {
        await axiosClient.post('/tasks', submitData);
        toast.success('Task created successfully');
      }
      setIsTaskModalOpen(false);
      fetchTasks();
    } catch (err) {
      console.error(err);
      toast.error('Failed to save task');
    }
  };

  const statusMap = {
    'to do': 'secondary',
    'inprogress': 'info',
    'pending': 'warning',
    'review': 'primary',
    'completed': 'success',
    'on-hold': 'danger'
  };

  const priorityMap = {
    'high': 'danger',
    'critical': 'danger',
    'medium': 'warning',
    'low': 'success'
  };

  const content = (
    <div className="hide-scrollbar" style={{ minHeight: '410px', maxHeight: '425px', overflowY: 'auto' }}>
      <style>{`.hide-scrollbar::-webkit-scrollbar { display: none !important; }`}</style>
      {loading ? (
        <div className="text-center p-4">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : tasks.length === 0 ? (
        <div className="text-center p-4">
          <p className="text-muted mb-0">No tasks found for this client.</p>
        </div>
      ) : (
        <div className="list-group list-group-flush">
          {tasks.map((task) => {
            const p = clientProjects.find(cp => (cp._id || cp.id) === task.project_id);
            const projectTitle = p ? p.title : '-';
            const statusColor = statusMap[task.status?.toLowerCase()] || 'secondary';
            const priorityColor = priorityMap[task.priority?.toLowerCase()] || 'secondary';
            
            const usersList = Array.isArray(users) ? users : Object.values(users);
            const assignee = usersList.find(u => 
              String(u.id || u._id) === String(task.assigned_to) || 
              String(u.name).toLowerCase() === String(task.assigned_to).toLowerCase()
            );
            
            const displayAssigneeName = assignee ? assignee.name : task.assigned_to;
            const hasAssignee = assignee || task.assigned_to;

            return (
              <div key={task._id || task.id} className="list-group-item border rounded mb-3 p-3">
                <div className="row align-items-center row-gap-3">
                  <div className="col-md-7">
                    <div className="todo-inbox-check d-flex align-items-center flex-wrap row-gap-3">
                      <div className="strike-info">
                        <h4 className="fs-15 fw-medium mb-1">
                          <Link to="/task-board">{task.title}</Link>
                        </h4>
                        <span className="fs-13 text-muted d-block">Project: {projectTitle}</span>
                        {task.end_date && (
                          <span className="fs-12 text-muted mt-1 d-block"><i className="ti ti-calendar me-1"></i> Due: {new Date(task.end_date).toLocaleDateString()}</span>
                        )}
                        
                        <div className="mt-2 d-flex align-items-center">
                          {hasAssignee ? (
                            <>
                              <span className="avatar avatar-sm avatar-rounded me-2 border border-2 border-white flex-shrink-0" title={displayAssigneeName} data-bs-toggle="tooltip">
                                {assignee && assignee.profile_photo ? (
                                  <img 
                                    src={assignee.profile_photo.startsWith('http') ? assignee.profile_photo : backendUrl + assignee.profile_photo} 
                                    alt="img" 
                                    className="w-100 h-100 object-fit-cover rounded-circle" 
                                  />
                                ) : (
                                  <span className="w-100 h-100 d-flex justify-content-center align-items-center bg-primary text-white fs-12 rounded-circle">
                                    {getInitials(displayAssigneeName)}
                                  </span>
                                )}
                              </span>
                              <span className="fs-13 text-dark fw-medium text-truncate" style={{maxWidth: '150px'}} title={displayAssigneeName} data-bs-toggle="tooltip">
                                {displayAssigneeName}
                              </span>
                            </>
                          ) : (
                            <>
                              <span className="avatar avatar-sm avatar-rounded me-2 border border-2 border-white flex-shrink-0" title="Unassigned" data-bs-toggle="tooltip">
                                <span className="w-100 h-100 d-flex justify-content-center align-items-center bg-secondary text-white fs-12 rounded-circle">
                                  ?
                                </span>
                              </span>
                              <span className="fs-13 text-muted fw-medium">Unassigned</span>
                            </>
                          )}
                        </div>

                      </div>
                    </div>
                  </div>
                  <div className="col-md-5">
                    <div className="d-flex align-items-center justify-content-md-end flex-wrap row-gap-3">
                      
                      <span className={`badge badge-soft-${priorityColor} me-3`}>{task.priority}</span>
                      <span className={`badge badge-soft-${statusColor} me-3`}>
                        <i className="fas fa-circle fs-6 me-1" style={{fontSize: '8px'}}></i>
                        {task.status}
                      </span>
                      <div className="dropdown ms-2">
                        <a href="#" onClick={(e) => e.preventDefault()} className="d-inline-flex align-items-center" data-bs-toggle="dropdown">
                          <i className="ti ti-dots-vertical"></i>
                        </a>
                        <ul className="dropdown-menu dropdown-menu-end p-3">
                          <li>
                            <a href="#" onClick={(e) => { e.preventDefault(); handleEdit(task); }} className="dropdown-item rounded-1">
                              <i className="ti ti-edit me-2"></i>Edit
                            </a>
                          </li>
                          <li>
                            <a href="#" onClick={(e) => { e.preventDefault(); confirmDelete(task); }} className="dropdown-item rounded-1 text-danger" data-bs-toggle="modal" data-bs-target={`#${modalId}`}>
                              <i className="ti ti-trash me-2"></i>Delete
                            </a>
                          </li>
                          <li>
                            <Link to="/task-board" className="dropdown-item rounded-1">
                              <i className="ti ti-eye me-2"></i>View
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <TaskModal 
        isOpen={isTaskModalOpen} 
        onClose={() => setIsTaskModalOpen(false)}
        onSave={handleSave}
        initialData={taskToEdit}
      />
      <ConfirmationModal 
        id={modalId}
        onConfirm={handleDelete}
        title="Are you sure?"
        description={`Do you really want to delete the task ${taskToDelete ? taskToDelete.title : ''}?`}
      />
    </div>
  );

  if (isAccordion) {
    return (
      <div className="accordion-item">
        <h2 className="accordion-header" id="headingClientTasks">
          <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseClientTasks" aria-expanded="false" aria-controls="collapseClientTasks">
            Tasks
          </button>
        </h2>
        <div id="collapseClientTasks" className="accordion-collapse collapse" aria-labelledby="headingClientTasks" data-bs-parent="#overviewAccordion">
          <div className="accordion-body">
            {content}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="accordion accordions-items-seperate">
      <div className="accordion-item">
        <h2 className="accordion-header" id="headingTasksTab">
          <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTasksTab" aria-expanded="true" aria-controls="collapseTasksTab">
            Tasks
          </button>
        </h2>
        <div id="collapseTasksTab" className="accordion-collapse collapse show" aria-labelledby="headingTasksTab">
          <div className="accordion-body">
            {content}
          </div>
        </div>
      </div>
    </div>
  );
}
