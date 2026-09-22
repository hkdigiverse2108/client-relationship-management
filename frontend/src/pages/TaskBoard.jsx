import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CustomDatePicker from '../components/common/CustomDatePicker';
import PageHeader from '../components/common/PageHeader';
import TaskModal from '../components/tasks/TaskModal';
import KanbanBoard from '../components/tasks/KanbanBoard';
import CalendarView from '../components/tasks/CalendarView';

const TaskBoard = () => {
  const [activePriority, setActivePriority] = useState('All');
  const [isTaskModalOpen, setTaskModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState('board'); // 'board' or 'calendar'

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
              <a href="#" onClick={(e) => { e.preventDefault(); setTaskModalOpen(true); }} className="btn btn-primary d-inline-flex align-items-center">
                <i className="ti ti-circle-plus me-1"></i>Add Task
              </a>
            </div>
          </PageHeader>
          <TaskModal isOpen={isTaskModalOpen} onClose={() => setTaskModalOpen(false)} />
          
          {viewMode === 'board' ? (
          <div className="card">
            <div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
              <h4>Task Board</h4>
              <div className="d-flex align-items-center flex-wrap row-gap-3">
                <div className="avatar-list-stacked avatar-group-sm me-3">
                  <span className="avatar avatar-rounded">
                    <img className="border border-white" src="assets/img/profiles/avatar-19.jpg" alt="img" />
                  </span>
                  <span className="avatar avatar-rounded">
                    <img className="border border-white" src="assets/img/profiles/avatar-29.jpg" alt="img" />
                  </span>
                  <span className="avatar avatar-rounded">
                    <img className="border border-white" src="assets/img/profiles/avatar-16.jpg" alt="img" />
                  </span>
                  <span className="avatar avatar-rounded bg-primary fs-12">1+</span>
                </div>
                <div className="d-flex align-items-center me-3">
                  <p className="mb-0 me-3 pe-3 border-end fs-14">Total Task : <span className="text-dark">55</span></p>
                  <p className="mb-0 me-3 pe-3 border-end fs-14">Pending : <span className="text-dark">15</span></p>
                  <p className="mb-0 fs-14">Completed : <span className="text-dark">40</span></p>
                </div>
                <div className="input-icon-start position-relative">
                  <span className="input-icon-addon">
                    <i className="ti ti-search"></i>
                  </span>
                  <input type="text" className="form-control" placeholder="Search Tasks" />
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
                    <div className="input-icon w-120 position-relative me-2">
                      <span className="input-icon-addon"><i className="ti ti-calendar"></i></span>
                      <CustomDatePicker type="text" className="form-control" placeholder="Created Date" isRange={false} />
                    </div>
                    <div className="input-icon w-120 position-relative me-2">
                      <span className="input-icon-addon"><i className="ti ti-calendar"></i></span>
                      <CustomDatePicker type="text" className="form-control" placeholder="Due Date" isRange={false} />
                    </div>
                    <div className="dropdown me-2">
                      <a href="#" onClick={(e) => e.preventDefault()} className="dropdown-toggle btn btn-white d-inline-flex align-items-center" data-bs-toggle="dropdown">Select Status</a>
                      <ul className="dropdown-menu dropdown-menu-end p-3">
                        <li><a href="#" onClick={(e) => e.preventDefault()} className="dropdown-item rounded-1">Inprogress</a></li>
                        <li><a href="#" onClick={(e) => e.preventDefault()} className="dropdown-item rounded-1">On-hold</a></li>
                        <li><a href="#" onClick={(e) => e.preventDefault()} className="dropdown-item rounded-1">Completed</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              
              <KanbanBoard onAddTask={() => setTaskModalOpen(true)} />
              
            </div>
          </div>
          ) : (
            <CalendarView />
          )}
        </div>
        <div className="footer d-sm-flex align-items-center justify-content-between border-top bg-white p-3">
          <p className="mb-0">2014 - 2026 &copy; SmartHR.</p>
          <p>Designed &amp; Developed By <a href="#" className="text-primary">Dreams</a></p>
        </div>
      </div>
    </>
  );
};

export default TaskBoard;
