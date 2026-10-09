import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/common/PageHeader';
import GanttChartBoard from '../components/projects/GanttChartBoard';
import ProjectFormModal from '../components/projects/ProjectFormModal';
import axiosClient from '../api/axiosClient';
import toast from 'react-hot-toast';
import Loader from '../components/common/Loader';

const backendUrl = import.meta.env.VITE_APP_API_URL?.replace('/api/v1', '') || 'http://localhost:8000';

// Using Live Data Instead of Mock Data

const ProjectsGanttChart = () => {
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchData = async () => {
    try {
      setLoading(true);
      const [projRes, tasksRes, usersRes] = await Promise.all([
        axiosClient.get('/projects'),
        axiosClient.get('/tasks'),
        axiosClient.get('/users')
      ]);
      setProjects(projRes || []);
      setTasks(tasksRes || []);
      setUsers(usersRes || []);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to load Gantt chart data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const ganttData = useMemo(() => {
    const sTerm = (searchTerm || '').toLowerCase();
    
    return projects.map(proj => {
      // Find tasks for this project
      const projTasks = tasks.filter(t => t.project_id === proj.id || t.project_id === proj._id);
      
      // Determine if project title matches search
      const projTitle = proj.title || 'Untitled Project';
      const projMatches = projTitle.toLowerCase().includes(sTerm);
      
      // Filter tasks if project doesn't match, otherwise keep all tasks
      const filteredTasks = projMatches 
        ? projTasks 
        : projTasks.filter(t => (t.title || 'Untitled Task').toLowerCase().includes(sTerm));

      return {
        id: proj.id || proj._id,
        title: projTitle,
        tasks: filteredTasks.map(t => {
          const assigneeId = t.assigned_to;
          const assignedUser = users.find(u => u.id === assigneeId || u._id === assigneeId);
          let avatarUrl = null;
          let initials = 'UN';
          let fullName = 'Unassigned';

          if (assignedUser) {
            fullName = assignedUser.name || 'Unknown';
            // Compute initials
            const words = fullName.trim().split(' ');
            if (words.length >= 2) {
              initials = (words[0].charAt(0) + words[1].charAt(0)).toUpperCase();
            } else {
              initials = fullName.substring(0, 2).toUpperCase();
            }

            if (assignedUser.profile_photo) {
              avatarUrl = assignedUser.profile_photo.startsWith('http') 
                ? assignedUser.profile_photo 
                : `${backendUrl}${assignedUser.profile_photo}`;
            }
          }

          let formattedStatus = 'New';
          const tStatus = (t.status || '').toLowerCase().replace(/[- ]/g, '');
          if (tStatus === 'completed') formattedStatus = 'Completed';
          else if (tStatus === 'inprogress' || tStatus === 'review') formattedStatus = 'In Progress';
          else if (tStatus === 'onhold') formattedStatus = 'On Hold';
          
          return {
            id: t.id || t._id,
            title: t.title || 'Untitled Task',
            startDate: t.start_date ? t.start_date.split('T')[0] : new Date().toISOString().split('T')[0],
            endDate: t.end_date ? t.end_date.split('T')[0] : new Date().toISOString().split('T')[0],
            status: formattedStatus,
            assignees: assignedUser ? [{ name: fullName, avatar: avatarUrl, initials: initials }] : []
          };
        })
      };
    }).filter(proj => proj.tasks.length > 0);
  }, [projects, tasks, users, searchTerm]);

  return (
    <div className="page-wrapper">
      <div className="content">
        {/* Breadcrumb */}
        <PageHeader 
          title="Gantt Flow & Milestones"
          breadcrumbs={[
            { label: 'Dashboard' },
            { label: 'Projects' },
            { label: 'Gantt Chart', active: true }
          ]}
        >
          <div className="d-flex align-items-center">
            <div className="input-icon position-relative me-3">
              <span className="input-icon-addon">
                <i className="ti ti-search"></i>
              </span>
              <input 
                type="text" 
                className="form-control" 
                placeholder="Search Project..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Link to="#" onClick={(e) => { e.preventDefault(); setIsProjectModalOpen(true); }} className="btn btn-primary d-flex align-items-center">
              <i className="ti ti-circle-plus me-2"></i>New Project
            </Link>
          </div>
        </PageHeader>
        {/* /Breadcrumb */}

        <div className="card border-0 shadow-sm">
          <div className="card-header border-bottom-0 pb-0">
            <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-3">
              <h4 className="mb-0">Project Timeline Overview</h4>
              <div className="d-flex align-items-center">
                <span className="badge bg-light text-dark border me-2"><i className="ti ti-point-filled text-success me-1"></i>Completed</span>
                <span className="badge bg-light text-dark border me-2"><i className="ti ti-point-filled me-1" style={{ color: '#8b5cf6' }}></i>In Progress</span>
                <span className="badge bg-light text-dark border me-2"><i className="ti ti-point-filled text-warning me-1"></i>New</span>
                <span className="badge bg-light text-dark border"><i className="ti ti-point-filled text-danger me-1"></i>On Hold</span>
              </div>
            </div>
          </div>
          <div className="card-body p-0">
            {loading ? (
              <Loader />
            ) : ganttData.length === 0 ? (
              <div className="text-center p-5">
                <p className="text-muted">No projects with tasks found to display on the timeline.</p>
              </div>
            ) : (
              <GanttChartBoard data={ganttData} />
            )}
          </div>
        </div>

        {/* Modal */}
        <ProjectFormModal 
          open={isProjectModalOpen} 
          onClose={() => {
            setIsProjectModalOpen(false);
            fetchData(); // refresh data after adding a new project
          }} 
        />

      </div>
    </div>
  );
};

export default ProjectsGanttChart;
