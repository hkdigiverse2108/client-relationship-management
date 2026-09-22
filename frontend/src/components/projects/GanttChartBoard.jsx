import React, { useMemo, useState } from 'react';
import './GanttChartBoard.css';

// Helper to format date
const formatDate = (date) => {
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(date);
};

// Helper to add days
const addDays = (date, days) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

// Helper to difference in days
const diffDays = (date1, date2) => {
  const diffTime = Math.abs(date2 - date1);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

const GanttChartBoard = ({ data }) => {
  const [collapsedProjects, setCollapsedProjects] = useState({});

  const toggleProject = (projectId) => {
    setCollapsedProjects(prev => ({
      ...prev,
      [projectId]: !prev[projectId]
    }));
  };

  const { chartDates, totalDays, startDate } = useMemo(() => {
    let minDate = new Date();
    let maxDate = new Date();
    let isFirst = true;

    // Find the global min and max dates
    data.forEach(project => {
      project.tasks.forEach(task => {
        const taskStart = new Date(task.startDate);
        const taskEnd = new Date(task.endDate);
        if (isFirst) {
          minDate = taskStart;
          maxDate = taskEnd;
          isFirst = false;
        } else {
          if (taskStart < minDate) minDate = taskStart;
          if (taskEnd > maxDate) maxDate = taskEnd;
        }
      });
    });

    // Pad dates
    const start = addDays(minDate, -2);
    const end = addDays(maxDate, 5);
    const daysCount = diffDays(start, end) + 1;
    
    const datesArr = [];
    for (let i = 0; i < daysCount; i++) {
      datesArr.push(addDays(start, i));
    }

    return {
      chartDates: datesArr,
      totalDays: daysCount,
      startDate: start
    };
  }, [data]);

  const gridTemplate = `300px repeat(${totalDays}, 50px)`;

  let currentRowIndex = 1;

  return (
    <div className="gantt-board-wrapper">
      <div className="gantt-grid" style={{ gridTemplateColumns: gridTemplate }}>
        
        {/* Header Row */}
        <div className="gantt-header-row" style={{ gridRow: currentRowIndex }}>
          <div className="gantt-header-cell task-col d-flex align-items-center" style={{ gridRow: currentRowIndex }}>
            Project / Task Name
          </div>
          {chartDates.map((date, i) => {
            const isWeekend = date.getDay() === 0 || date.getDay() === 6;
            return (
              <div key={i} className="gantt-header-cell d-flex flex-column align-items-center justify-content-center" style={{ gridColumn: i + 2, gridRow: currentRowIndex, backgroundColor: isWeekend ? '#f1f5f9' : '' }}>
                <span style={{ fontSize: '11px', color: '#64748b' }}>{date.toLocaleDateString('en-US', { weekday: 'short' })}</span>
                <span>{date.getDate()}</span>
              </div>
            );
          })}
        </div>

        {/* Data Rows */}
        {data.map(project => {
          currentRowIndex++; // Advance to Project Row
          const projectRowIndex = currentRowIndex;
          
          // Calculate Project start and end based on its tasks
          let pStart = new Date();
          let pEnd = new Date();
          if (project.tasks.length > 0) {
            pStart = new Date(Math.min(...project.tasks.map(t => new Date(t.startDate))));
            pEnd = new Date(Math.max(...project.tasks.map(t => new Date(t.endDate))));
          }
          
          const pStartOffset = diffDays(startDate, pStart) + 2; // +2 because column 1 is titles
          const pDuration = diffDays(pStart, pEnd) + 1;

          const isCollapsed = collapsedProjects[project.id];

          return (
            <React.Fragment key={project.id}>
              {/* Project Row */}
              <div className="gantt-project-row">
                <div className="gantt-project-title" style={{ gridRow: projectRowIndex, cursor: 'pointer' }} onClick={() => toggleProject(project.id)}>
                  <i className={`ti ti-chevron-${isCollapsed ? 'right' : 'down'} text-muted me-2 fs-5`}></i>
                  <i className="ti ti-folder text-primary me-2 fs-20"></i>
                  <span className="text-truncate">{project.title}</span>
                </div>
                
                {/* Background Grid for Project Row */}
                {chartDates.map((_, i) => (
                  <div key={i} className="gantt-cell-bg" style={{ gridColumn: i + 2, gridRow: projectRowIndex, zIndex: 1 }}></div>
                ))}
                
                {/* Project Bar */}
                <div 
                  className="gantt-bar-container" 
                  style={{ gridColumn: `${pStartOffset} / span ${pDuration}`, gridRow: projectRowIndex, zIndex: 5 }}
                  title="Total Project Duration"
                >
                  <div className="gantt-project-bar"></div>
                </div>
              </div>

              {/* Task Rows */}
              {!isCollapsed && project.tasks.map(task => {
                currentRowIndex++; // Advance to Task Row
                const taskRowIndex = currentRowIndex;

                const tStart = new Date(task.startDate);
                const tEnd = new Date(task.endDate);
                const tStartOffset = diffDays(startDate, tStart) + 2;
                const tDuration = diffDays(tStart, tEnd) + 1;
                
                return (
                  <div key={task.id} className="gantt-task-row">
                    <div className="gantt-task-title" style={{ gridRow: taskRowIndex }}>
                      <i className="ti ti-clipboard-list text-muted me-2 fs-13"></i>
                      <span className="text-truncate">{task.title}</span>
                    </div>

                    {/* Background Grid for Task Row */}
                    {chartDates.map((d, i) => {
                      const isWeekend = d.getDay() === 0 || d.getDay() === 6;
                      return (
                        <div key={i} className={`gantt-cell-bg ${isWeekend ? 'weekend' : ''}`} style={{ gridColumn: i + 2, gridRow: taskRowIndex, zIndex: 1 }}></div>
                      );
                    })}

                    {/* Task Bar */}
                    <div 
                      className="gantt-bar-container"
                      style={{ gridColumn: `${tStartOffset} / span ${tDuration}`, gridRow: taskRowIndex, zIndex: 5 }}
                    >
                      <div className={`gantt-task-bar status-${task.status.toLowerCase().replace(' ', '-')}`}>
                        <span className="text-truncate">{task.title}</span>
                        
                        {/* Tooltip */}
                        <div className="gantt-tooltip">
                          <div className="mb-1 text-white fw-bold">{task.title}</div>
                          <div className="text-white-50">{formatDate(tStart)} - {formatDate(tEnd)} ({tDuration} Days)</div>
                          <div className="text-white-50 text-capitalize">Status: {task.status}</div>
                        </div>
                      </div>
                      
                      {/* Avatars */}
                      {task.assignees && task.assignees.length > 0 && (
                        <div className="gantt-avatar-group ms-2 position-absolute" style={{ right: '-35px' }}>
                          {task.assignees.map((img, idx) => (
                            <img key={idx} src={img} onError={(e) => { e.target.onerror = null; e.target.src = '/assets/img/profiles/avatar-01.jpg'; }} alt="Assignee" className="gantt-avatar" />
                          ))}
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
    </div>
  );
};

export default GanttChartBoard;
