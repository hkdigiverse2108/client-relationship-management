import React, { useState, useRef } from 'react';

const KanbanBoard = ({ onAddTask }) => {
  // Initial Mock Data matching the original HTML columns
  const [tasks, setTasks] = useState([
    {
      id: 'task-1',
      title: 'Payment Gateway',
      category: 'Web Layout',
      priority: 'High',
      status: 'To Do',
      progress: 40,
      dueDate: '18 Apr 2024',
      avatars: ['avatar-19.jpg', 'avatar-29.jpg', 'avatar-16.jpg', 'avatar-01.jpg', 'avatar-02.jpg']
    },
    {
      id: 'task-2',
      title: 'Doctor Available Module',
      category: 'Web Layout',
      priority: 'High',
      status: 'To Do',
      progress: 0,
      dueDate: '15 Apr 2024',
      avatars: ['avatar-21.jpg']
    },
    {
      id: 'task-3',
      title: 'Update prescription links',
      category: 'UI / UX',
      priority: 'Medium',
      status: 'Inprogress',
      progress: 10,
      dueDate: '12 Apr 2024',
      avatars: ['avatar-05.jpg', 'avatar-07.jpg', 'avatar-06.jpg']
    },
    {
      id: 'task-4',
      title: 'Hospital Management',
      category: 'Development',
      priority: 'High',
      status: 'Inprogress',
      progress: 40,
      dueDate: '18 Apr 2024',
      avatars: ['avatar-13.jpg', 'avatar-14.jpg']
    },
    {
      id: 'task-5',
      title: 'Patient appointment booking',
      category: 'Web Layout',
      priority: 'High',
      status: 'On-hold',
      progress: 20,
      dueDate: '15 Apr 2024',
      avatars: ['avatar-01.jpg', 'avatar-02.jpg', 'avatar-03.jpg']
    },
    {
      id: 'task-6',
      title: 'Video call modules',
      category: 'Bug',
      priority: 'Low',
      status: 'Completed',
      progress: 100,
      dueDate: '11 Apr 2024',
      avatars: ['avatar-07.jpg', 'avatar-08.jpg']
    }
  ]);

  const [draggingTaskId, setDraggingTaskId] = useState(null);

  const columns = [
    { id: 'To Do', title: 'To Do', bgColor: 'bg-transparent-purple', dotColor: 'bg-purple' },
    { id: 'Inprogress', title: 'Inprogress', bgColor: 'bg-transparent-info', dotColor: 'bg-info' },
    { id: 'Pending', title: 'Pending', bgColor: 'bg-transparent-danger', dotColor: 'bg-danger' },
    { id: 'Review', title: 'Review', bgColor: 'bg-transparent-primary', dotColor: 'bg-primary' },
    { id: 'On-hold', title: 'On-hold', bgColor: 'bg-transparent-warning', dotColor: 'bg-warning' },
    { id: 'Completed', title: 'Completed', bgColor: 'bg-transparent-success', dotColor: 'bg-success' }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'danger';
      case 'Critical': return 'danger';
      case 'Medium': return 'warning';
      case 'Low': return 'success';
      default: return 'primary';
    }
  };

  const getProgressColor = (progress) => {
    if (progress === 100) return 'bg-success';
    if (progress > 50) return 'bg-primary';
    if (progress > 20) return 'bg-warning';
    return 'bg-danger';
  };

  // Drag and Drop Handlers
  const handleDragStart = (e, taskId) => {
    setDraggingTaskId(taskId);
    e.dataTransfer.setData('text/plain', taskId);
    e.dataTransfer.effectAllowed = 'move';
    // Add a slight delay to allow the drag image to be created before styling
    setTimeout(() => {
      if (e.target) {
        e.target.style.opacity = '0.5';
      }
    }, 0);
  };

  const handleDragEnd = (e) => {
    setDraggingTaskId(null);
    if (e.target) {
      e.target.style.opacity = '1';
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    e.currentTarget.classList.add('bg-light');
  };

  const handleDragLeave = (e) => {
    e.currentTarget.classList.remove('bg-light');
  };

  const handleDrop = (e, targetStatus) => {
    e.preventDefault();
    e.currentTarget.classList.remove('bg-light');
    
    const taskId = e.dataTransfer.getData('text/plain');
    if (!taskId) return;

    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId ? { ...task, status: targetStatus } : task
      )
    );
    setDraggingTaskId(null);
  };

  return (
    <div className="tab-content" id="pills-tabContent">
      <div className="tab-pane fade show active" id="pills-home" role="tabpanel">
        <div className="d-flex align-items-start overflow-auto project-status pb-4" style={{ minHeight: '600px' }}>
          
          {columns.map(column => {
            const columnTasks = tasks.filter(task => task.status === column.id);
            
            return (
              <div 
                key={column.id} 
                className="p-3 rounded bg-transparent-secondary w-100 me-3" 
                style={{ minWidth: '300px' }}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, column.id)}
              >
                
                {/* Column Header */}
                <div className="bg-white p-2 rounded mb-2">
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
                      <span className={`${column.bgColor} p-1 d-flex rounded-circle me-2`}>
                        <span className={`${column.dotColor} rounded-circle d-block p-1`}></span>
                      </span>
                      <h5 className="me-2">{column.title}</h5>
                      <span className="badge bg-light rounded-pill">{columnTasks.length < 10 ? `0${columnTasks.length}` : columnTasks.length}</span>
                    </div>
                    <div className="dropdown">
                      <a href="#" onClick={(e) => e.preventDefault()} className="d-inline-flex align-items-center" data-bs-toggle="dropdown">
                        <i className="ti ti-dots-vertical"></i>
                      </a>
                      <ul className="dropdown-menu dropdown-menu-end p-3">
                        <li><a href="#" onClick={(e) => e.preventDefault()} className="dropdown-item rounded-1"><i className="ti ti-edit me-2"></i>Edit</a></li>
                        <li><a href="#" onClick={(e) => e.preventDefault()} className="dropdown-item rounded-1"><i className="ti ti-trash me-2"></i>Delete</a></li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Droppable Area */}
                <div className="kanban-drag-wrap" style={{ minHeight: '150px' }}>
                  {columnTasks.map(task => (
                    <div 
                      key={task.id}
                      className="card kanban-card mb-2 cursor-pointer"
                      draggable="true"
                      onDragStart={(e) => handleDragStart(e, task.id)}
                      onDragEnd={handleDragEnd}
                      style={{ cursor: 'grab' }}
                    >
                      <div className="card-body">
                        <div className="d-flex align-items-center justify-content-between mb-3">
                          <div className="d-flex align-items-center">
                            <span className="badge bg-outline-dark me-2">{task.category}</span>
                            <span className={`badge bg-${getPriorityColor(task.priority)} badge-xs d-flex align-items-center justify-content-center`}>
                              <i className="fas fa-circle fs-6 me-1"></i>{task.priority}
                            </span>
                          </div>
                          <div className="dropdown">
                            <a href="#" onClick={(e) => e.preventDefault()} className="d-inline-flex align-items-center" data-bs-toggle="dropdown">
                              <i className="ti ti-dots-vertical"></i>
                            </a>
                            <ul className="dropdown-menu dropdown-menu-end p-3">
                              <li><a href="#" onClick={(e) => e.preventDefault()} className="dropdown-item rounded-1"><i className="ti ti-edit me-2"></i>Edit</a></li>
                              <li><a href="#" onClick={(e) => e.preventDefault()} className="dropdown-item rounded-1"><i className="ti ti-trash me-2"></i>Delete</a></li>
                            </ul>
                          </div>
                        </div>
                        
                        <div className="mb-2">
                          <h6 className="d-flex align-items-center">{task.title}</h6>
                        </div>
                        
                        <div className="d-flex align-items-center mb-2">
                          <div className="progress progress-sm flex-fill" role="progressbar" aria-valuenow={task.progress} aria-valuemin="0" aria-valuemax="100">
                            <div className={`progress-bar ${getProgressColor(task.progress)}`} style={{width: `${task.progress}%`}}></div>
                          </div>
                          <span className="d-block ms-2 text-gray-9 fw-medium">{task.progress}%</span>
                        </div>
                        
                        <p className="fw-medium mb-0">Due on : <span className="text-gray-9"> {task.dueDate}</span></p>
                        
                        <div className="d-flex align-items-center justify-content-between border-top pt-2 mt-2">
                          <div className="avatar-list-stacked avatar-group-sm me-3">
                            {task.avatars.slice(0, 4).map((avatar, index) => (
                              <span key={index} className="avatar avatar-rounded">
                                <img className="border border-white" src={`assets/img/profiles/${avatar}`} alt="img" />
                              </span>
                            ))}
                            {task.avatars.length > 4 && (
                              <span className="avatar avatar-rounded bg-primary fs-12">
                                {task.avatars.length - 4}+
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {columnTasks.length === 0 && (
                    <div className="p-4 text-center text-muted border border-dashed rounded mt-2" style={{ backgroundColor: 'rgba(255,255,255,0.5)' }}>
                      Drop tasks here
                    </div>
                  )}
                </div>

                <div className="pt-2">
                  <a href="#" className="btn btn-white border border-dashed d-flex align-items-center justify-content-center" onClick={(e) => { e.preventDefault(); if (onAddTask) onAddTask(); }}>
                    <i className="ti ti-plus me-2"></i> New Task
                  </a>
                </div>

              </div>
            );
          })}

        </div>
      </div>
    </div>
  );
};

export default KanbanBoard;
