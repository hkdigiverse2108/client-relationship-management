import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/common/PageHeader';
import GanttChartBoard from '../components/projects/GanttChartBoard';
import ProjectFormModal from '../components/projects/ProjectFormModal';

// Mock Hierarchical Data for Gantt Chart
const mockGanttData = [
  {
    id: 'proj-1',
    title: 'Enterprise CRM Development',
    tasks: [
      { id: 'task-101', title: 'Requirement Gathering', startDate: '2026-09-10', endDate: '2026-09-14', status: 'Completed', assignees: ['/assets/img/profiles/avatar-02.jpg'] },
      { id: 'task-102', title: 'UI/UX Design', startDate: '2026-09-15', endDate: '2026-09-22', status: 'In Progress', assignees: ['/assets/img/profiles/avatar-03.jpg', '/assets/img/profiles/avatar-04.jpg'] },
      { id: 'task-103', title: 'API Integration', startDate: '2026-09-20', endDate: '2026-09-28', status: 'New', assignees: ['/assets/img/profiles/avatar-05.jpg'] },
      { id: 'task-104', title: 'Frontend Layouts', startDate: '2026-09-25', endDate: '2026-10-02', status: 'On Hold', assignees: ['/assets/img/profiles/avatar-06.jpg'] }
    ]
  },
  {
    id: 'proj-2',
    title: 'Marketing Website Overhaul',
    tasks: [
      { id: 'task-201', title: 'Content Strategy', startDate: '2026-09-12', endDate: '2026-09-16', status: 'Completed', assignees: ['/assets/img/profiles/avatar-12.jpg'] },
      { id: 'task-202', title: 'Frontend Development', startDate: '2026-09-17', endDate: '2026-09-26', status: 'In Progress', assignees: ['/assets/img/profiles/avatar-16.jpg'] },
      { id: 'task-203', title: 'QA & Testing', startDate: '2026-09-26', endDate: '2026-09-30', status: 'On Hold', assignees: ['/assets/img/profiles/avatar-19.jpg'] },
      { id: 'task-204', title: 'SEO Optimization', startDate: '2026-09-28', endDate: '2026-10-05', status: 'New', assignees: ['/assets/img/profiles/avatar-14.jpg'] }
    ]
  },
  {
    id: 'proj-3',
    title: 'Mobile App Launch (iOS)',
    tasks: [
      { id: 'task-301', title: 'Beta Testing', startDate: '2026-09-22', endDate: '2026-09-29', status: 'In Progress', assignees: ['/assets/img/profiles/avatar-10.jpg', '/assets/img/profiles/avatar-11.jpg'] },
      { id: 'task-302', title: 'Bug Fixing', startDate: '2026-09-29', endDate: '2026-10-06', status: 'New', assignees: ['/assets/img/profiles/avatar-08.jpg'] },
      { id: 'task-303', title: 'App Store Submission', startDate: '2026-10-07', endDate: '2026-10-09', status: 'New', assignees: ['/assets/img/profiles/avatar-21.jpg'] }
    ]
  },
  {
    id: 'proj-4',
    title: 'Cloud Infrastructure Upgrade',
    tasks: [
      { id: 'task-401', title: 'Server Auditing', startDate: '2026-09-10', endDate: '2026-09-13', status: 'Completed', assignees: ['/assets/img/profiles/avatar-25.jpg'] },
      { id: 'task-402', title: 'Data Migration', startDate: '2026-09-14', endDate: '2026-09-20', status: 'In Progress', assignees: ['/assets/img/profiles/avatar-26.jpg'] },
      { id: 'task-403', title: 'Security Checks', startDate: '2026-09-20', endDate: '2026-09-25', status: 'In Progress', assignees: ['/assets/img/profiles/avatar-27.jpg'] }
    ]
  }
];

const ProjectsGanttChart = () => {
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

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
              <input type="text" className="form-control" placeholder="Search Project..." />
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
                <span className="badge bg-light text-dark border me-2"><i className="ti ti-point-filled text-primary me-1"></i>In Progress</span>
                <span className="badge bg-light text-dark border me-2"><i className="ti ti-point-filled text-warning me-1"></i>New</span>
                <span className="badge bg-light text-dark border"><i className="ti ti-point-filled text-danger me-1"></i>On Hold</span>
              </div>
            </div>
          </div>
          <div className="card-body">
            {/* Custom Modern Gantt Chart Component */}
            <GanttChartBoard data={mockGanttData} />
          </div>
        </div>

        {/* Modal */}
        <ProjectFormModal open={isProjectModalOpen} onClose={() => setIsProjectModalOpen(false)} />

      </div>
    </div>
  );
};

export default ProjectsGanttChart;
