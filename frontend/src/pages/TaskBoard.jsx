import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CustomDatePicker from '../components/common/CustomDatePicker';
import PageHeader from '../components/common/PageHeader';
import TaskModal from '../components/tasks/TaskModal';
import KanbanBoard from '../components/tasks/KanbanBoard';
import CalendarView from '../components/tasks/CalendarView';
import FilterBar from '../components/common/FilterBar';
import axiosClient from '../api/axiosClient';
import toast from 'react-hot-toast';

const TaskBoard = () => {
  const [activePriority, setActivePriority] = useState('All');
  const [isTaskModalOpen, setTaskModalOpen] = useState(false);
  const [taskModalInitialData, setTaskModalInitialData] = useState(null);
  const [confirmDeleteModal, setConfirmDeleteModal] = useState({ isOpen: false, id: null, title: '' });
  const [viewMode, setViewMode] = useState('board'); // 'board' or 'calendar'
  const [calendarControls, setCalendarControls] = useState(null);
  
  const [tasks, setTasks] = useState([]);
  
  const [projectOptions, setProjectOptions] = useState([]);
  const [assigneeOptions, setAssigneeOptions] = useState([]);
  const [filters, setFilters] = useState({ project: '', status: '', assignee: '', dateRange: [null, null] });
  const [searchQuery, setSearchQuery] = useState('');

  const fetchTasks = async () => {
    try {
      const res = await axiosClient.get('/tasks');
      setTasks(res);
    } catch (err) {
      toast.error("Failed to fetch tasks");
    }
  };

  useEffect(() => {
    fetchTasks();
    axiosClient.get('/projects').then(res => {
      if (res && Array.isArray(res)) setProjectOptions([{value: '', label: 'Select Project'}, ...res.map(p => ({ value: p.id || p._id, label: p.title }))]);
    }).catch(console.error);
    axiosClient.get('/users').then(res => {
      if (res && Array.isArray(res)) setAssigneeOptions([{value: '', label: 'Select Assignee'}, ...res.map(u => ({ value: u.id || u._id, label: u.name }))]);
    }).catch(console.error);
  }, []);

  const filterConfig = [
    { type: 'select', value: filters.project, options: projectOptions.length ? projectOptions : [{value: '', label: 'Select Project'}], onChange: (val) => setFilters(prev => ({...prev, project: val})) },
    { type: 'select', value: filters.status, options: [{value: '', label: 'Select Status'}, {value: 'To Do', label: 'To Do'}, {value: 'Inprogress', label: 'Inprogress'}, {value: 'Pending', label: 'Pending'}, {value: 'Review', label: 'Review'}, {value: 'On-hold', label: 'On-hold'}, {value: 'Completed', label: 'Completed'}], onChange: (val) => setFilters(prev => ({...prev, status: val})) },
    { type: 'select', value: filters.assignee, options: assigneeOptions.length ? assigneeOptions : [{value: '', label: 'Select Assignee'}], onChange: (val) => setFilters(prev => ({...prev, assignee: val})) },
    { type: 'date', value: filters.dateRange, placeholder: 'Date Range', onChange: (update) => setFilters(prev => ({...prev, dateRange: update})) }
  ];

  const hasActiveFilters = filters.project !== '' || filters.status !== '' || filters.assignee !== '' || filters.dateRange[0] !== null || filters.dateRange[1] !== null || activePriority !== 'All' || searchQuery !== '';

  const handleClear = () => {
    setFilters({ project: '', status: '', assignee: '', dateRange: [null, null] });
    setActivePriority('All');
    setSearchQuery('');
  };

  const filteredTasks = tasks.filter(task => {
    let match = true;
    if (activePriority !== 'All' && task.priority !== activePriority) match = false;
    if (filters.project && String(task.project_id) !== String(filters.project)) match = false;
    if (filters.status && task.status !== filters.status) match = false;
    if (filters.assignee && String(task.assigned_to) !== String(filters.assignee)) match = false;
    
    if (filters.dateRange[0] && filters.dateRange[1]) {
      if (task.due_date) {
        const taskDate = new Date(task.due_date);
        const start = new Date(filters.dateRange[0]);
        start.setHours(0, 0, 0, 0);
        const end = new Date(filters.dateRange[1]);
        end.setHours(23, 59, 59, 999);
        if (taskDate < start || taskDate > end) match = false;
      } else {
        match = false;
      }
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const searchableStr = `${task.title || ''} ${task.description || ''} ${task.assignee_name || ''} ${task.priority || ''} ${task.status || ''}`.toLowerCase();
      if (!searchableStr.includes(query)) match = false;
    }
    
    return match;
  });

  const handleSaveTask = async (taskData) => {
    try {
      if (taskData.id) {
        await axiosClient.put(`/tasks/${taskData.id}`, taskData);
        toast.success("Task updated successfully!");
      } else {
        await axiosClient.post('/tasks', taskData);
        toast.success("Task created successfully!");
      }
      setTaskModalOpen(false);
      setTaskModalInitialData(null);
      fetchTasks();
    } catch (err) {
      toast.error(err.response?.data?.detail || "Failed to save task");
    }
  };

  const executeDelete = async () => {
    if (!confirmDeleteModal.id) return;
    try {
      await axiosClient.delete(`/tasks/${confirmDeleteModal.id}`);
      toast.success("Task deleted successfully!");
      setConfirmDeleteModal({ isOpen: false, id: null, title: '' });
      fetchTasks();
    } catch (err) {
      toast.error("Failed to delete task");
    }
  };

  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <PageHeader 
            title="Manage and track all your tasks across projects."
            breadcrumbs={[
              { label: 'Dashboard' },
              { label: 'Tasks & Calendar' },
              { label: viewMode === 'calendar' ? 'Calendar' : 'Task Board', active: true }
            ]}
          >
            <div className="d-flex align-items-center gap-2">
              <div className="btn-group" role="group">
                <button type="button" className={`btn ${viewMode === 'board' ? 'btn-primary' : 'btn-white border'}`} onClick={() => setViewMode('board')}>
                  <i className="ti ti-layout-kanban me-1"></i> Task Board
                </button>
                <button type="button" className={`btn ${viewMode === 'calendar' ? 'btn-primary' : 'btn-white border'}`} onClick={() => setViewMode('calendar')}>
                  <i className="ti ti-calendar-time me-1"></i> Calendar
                </button>
              </div>
              {viewMode === 'board' ? (
                <a href="#" onClick={(e) => { e.preventDefault(); setTaskModalInitialData(null); setTaskModalOpen(true); }} className="btn btn-primary d-inline-flex align-items-center">
                  <i className="ti ti-circle-plus me-1"></i>Add Task
                </a>
              ) : (
                <a href="#" onClick={(e) => { e.preventDefault(); calendarControls?.openEventModal(); }} className="btn btn-primary d-inline-flex align-items-center">
                  <i className="ti ti-circle-plus me-1"></i>Add Event
                </a>
              )}
            </div>
          </PageHeader>
          <TaskModal isOpen={isTaskModalOpen} onClose={() => { setTaskModalOpen(false); setTaskModalInitialData(null); }} initialData={taskModalInitialData} onSave={handleSaveTask} />
          
          {viewMode === 'board' ? (
          <div className="card">
            <div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
              <h4>Task Board</h4>
              <div className="d-flex align-items-center flex-wrap row-gap-3">
                <div className="d-flex align-items-center me-3">
                  <p className="mb-0 me-3 pe-3 border-end fs-14">Total Task : <span className="text-dark">{tasks.length}</span></p>
                  <p className="mb-0 me-3 pe-3 border-end fs-14">Pending : <span className="text-dark">{tasks.filter(t => t.status === 'Pending').length}</span></p>
                  <p className="mb-0 fs-14">Completed : <span className="text-dark">{tasks.filter(t => t.status === 'Completed').length}</span></p>
                </div>
                <div className="input-icon-start position-relative">
                  <span className="input-icon-addon">
                    <i className="ti ti-search"></i>
                  </span>
                  <input type="text" className="form-control" placeholder="Search Tasks" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                </div>
              </div>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-lg-4">
                  <div className="d-flex align-items-center flex-wrap row-gap-3 mb-3">
                    <h6 className="me-2">Priority</h6>
                    <ul className="nav nav-pills border d-inline-flex p-1 rounded bg-light todo-tabs">
                      <li className="nav-item">
                        <button className={`nav-link btn btn-sm btn-icon py-3 d-flex align-items-center justify-content-center w-auto ${activePriority === 'All' ? 'active' : ''}`} onClick={() => setActivePriority('All')}>All</button>
                      </li>
                      <li className="nav-item">
                        <button className={`nav-link btn btn-sm btn-icon py-3 d-flex align-items-center justify-content-center w-auto ${activePriority === 'Critical' ? 'active' : ''}`} onClick={() => setActivePriority('Critical')}>Critical</button>
                      </li>
                      <li className="nav-item">
                        <button className={`nav-link btn btn-sm btn-icon py-3 d-flex align-items-center justify-content-center w-auto ${activePriority === 'High' ? 'active' : ''}`} onClick={() => setActivePriority('High')}>High</button>
                      </li>
                      <li className="nav-item">
                        <button className={`nav-link btn btn-sm btn-icon py-3 d-flex align-items-center justify-content-center w-auto ${activePriority === 'Medium' ? 'active' : ''}`} onClick={() => setActivePriority('Medium')}>Medium</button>
                      </li>
                      <li className="nav-item">
                        <button className={`nav-link btn btn-sm btn-icon py-3 d-flex align-items-center justify-content-center w-auto ${activePriority === 'Low' ? 'active' : ''}`} onClick={() => setActivePriority('Low')}>Low</button>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-8">
                  <div className="d-flex align-items-center justify-content-lg-end flex-wrap row-gap-3 mb-3">
                    <FilterBar filters={filterConfig} hasActiveFilters={hasActiveFilters} onClear={handleClear} />
                  </div>
                </div>
              </div>
              
              <KanbanBoard 
                tasks={filteredTasks} 
                onAddTask={(status) => { setTaskModalInitialData({ status }); setTaskModalOpen(true); }} 
                onEditTask={(task) => { setTaskModalInitialData(task); setTaskModalOpen(true); }}
                onDeleteTask={(taskId, taskTitle) => setConfirmDeleteModal({ isOpen: true, id: taskId, title: taskTitle })}
                onTaskUpdate={fetchTasks} 
              />
              
            </div>
          </div>
          ) : (
            <CalendarView onReady={setCalendarControls} />
          )}
        </div>
        <div className="footer d-sm-flex align-items-center justify-content-between border-top bg-white p-3">
          <p className="mb-0">2014 - 2026 &copy; SmartHR.</p>
          <p>Designed &amp; Developed By <a href="#" className="text-primary">Dreams</a></p>
        </div>
      </div>
      
      {confirmDeleteModal.isOpen && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Delete Task</h5>
                <button type="button" className="btn-close" onClick={() => setConfirmDeleteModal({ isOpen: false, id: null, title: '' })} aria-label="Close"></button>
              </div>
              <div className="modal-body text-center py-4">
                <i className="ti ti-alert-circle text-danger mb-3" style={{ fontSize: '48px' }}></i>
                <h5 className="mb-2">Are you sure?</h5>
                <p className="text-muted mb-0">Do you really want to delete the task <strong>{confirmDeleteModal.title}</strong>?</p>
              </div>
              <div className="modal-footer justify-content-center border-0 pt-0">
                <button className="btn btn-light px-4" onClick={() => setConfirmDeleteModal({ isOpen: false, id: null, title: '' })}>Cancel</button>
                <button className="btn btn-danger px-4" onClick={executeDelete}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TaskBoard;
