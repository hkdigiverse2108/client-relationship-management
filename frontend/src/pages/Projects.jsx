import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/common/PageHeader';
import CustomDataTable from '../components/common/CustomDataTable';
import ProjectFormModal from '../components/projects/ProjectFormModal';
import ProjectsGridView from '../components/projects/ProjectsGridView';
import CustomDatePicker from '../components/common/CustomDatePicker';

const Projects = () => {
  const [viewMode, setViewMode] = useState('list');
  const [sidebarFilters, setSidebarFilters] = useState({ status: "all", priority: "all", category: "all" });
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

  const recentProjectsData = [
    {
      id: 'PRO-001',
      name: 'Office Management App',
      leader: { name: 'Michael Walker', avatar: '/assets/img/users/user-39.jpg' },
      team: ['/assets/img/profiles/avatar-02.jpg', '/assets/img/profiles/avatar-03.jpg', '/assets/img/profiles/avatar-05.jpg'],
      teamExtra: '+1',
      deadline: '12 Sep 2024',
      priority: 'High',
      priorityColor: 'danger',
      status: 'Active',
      statusColor: 'success',
      category: 'Web Development'
    },
    {
      id: 'PRO-002',
      name: 'Clinic Management',
      leader: { name: 'Brian Villalobos', avatar: '/assets/img/users/user-09.jpg' },
      team: ['/assets/img/profiles/avatar-01.jpg', '/assets/img/profiles/avatar-04.jpg'],
      teamExtra: '',
      deadline: '24 Oct 2024',
      priority: 'Medium',
      priorityColor: 'warning',
      status: 'Active',
      statusColor: 'success',
      category: 'App Development'
    },
    {
      id: 'PRO-003',
      name: 'E-commerce Platform',
      leader: { name: 'Sarah Connor', avatar: '/assets/img/users/user-05.jpg' },
      team: ['/assets/img/profiles/avatar-06.jpg', '/assets/img/profiles/avatar-07.jpg'],
      teamExtra: '+2',
      deadline: '05 Nov 2024',
      priority: 'High',
      priorityColor: 'danger',
      status: 'On Hold',
      statusColor: 'warning',
      category: 'Web Development'
    },
    {
      id: 'PRO-004',
      name: 'HR Portal Dashboard',
      leader: { name: 'John Doe', avatar: '/assets/img/users/user-12.jpg' },
      team: ['/assets/img/profiles/avatar-08.jpg', '/assets/img/profiles/avatar-09.jpg'],
      teamExtra: '',
      deadline: '15 Dec 2024',
      priority: 'Low',
      priorityColor: 'secondary',
      status: 'Completed',
      statusColor: 'primary',
      category: 'App Development'
    },
    {
      id: 'PRO-005',
      name: 'Inventory System',
      leader: { name: 'Alice Smith', avatar: '/assets/img/users/user-15.jpg' },
      team: ['/assets/img/profiles/avatar-10.jpg', '/assets/img/profiles/avatar-11.jpg'],
      teamExtra: '+3',
      deadline: '20 Jan 2025',
      priority: 'Medium',
      priorityColor: 'warning',
      status: 'Active',
      statusColor: 'success',
      category: 'Web Development'
    },
    {
      id: 'PRO-006',
      name: 'CRM Mobile App',
      leader: { name: 'Tom Hanks', avatar: '/assets/img/users/user-22.jpg' },
      team: ['/assets/img/profiles/avatar-12.jpg'],
      teamExtra: '',
      deadline: '10 Feb 2025',
      priority: 'High',
      priorityColor: 'danger',
      status: 'Active',
      statusColor: 'success',
      category: 'App Development'
    },
    {
      id: 'PRO-007',
      name: 'Corporate Website',
      leader: { name: 'Emily Blunt', avatar: '/assets/img/users/user-28.jpg' },
      team: ['/assets/img/profiles/avatar-13.jpg', '/assets/img/profiles/avatar-14.jpg'],
      teamExtra: '+1',
      deadline: '25 Mar 2025',
      priority: 'Medium',
      priorityColor: 'warning',
      status: 'Cancelled',
      statusColor: 'danger',
      category: 'Web Development'
    },
    {
      id: 'PRO-008',
      name: 'Billing Software',
      leader: { name: 'Chris Evans', avatar: '/assets/img/users/user-33.jpg' },
      team: ['/assets/img/profiles/avatar-15.jpg', '/assets/img/profiles/avatar-16.jpg', '/assets/img/profiles/avatar-17.jpg'],
      teamExtra: '',
      deadline: '30 Apr 2025',
      priority: 'High',
      priorityColor: 'danger',
      status: 'Active',
      statusColor: 'success',
      category: 'App Development'
    },
    {
      id: 'PRO-009',
      name: 'Marketing Dashboard',
      leader: { name: 'Natalie Portman', avatar: '/assets/img/users/user-40.jpg' },
      team: ['/assets/img/profiles/avatar-18.jpg', '/assets/img/profiles/avatar-19.jpg'],
      teamExtra: '+4',
      deadline: '15 May 2025',
      priority: 'Low',
      priorityColor: 'secondary',
      status: 'On Hold',
      statusColor: 'warning',
      category: 'Web Development'
    },
    {
      id: 'PRO-010',
      name: 'Sales Tracker',
      leader: { name: 'Will Smith', avatar: '/assets/img/users/user-45.jpg' },
      team: ['/assets/img/profiles/avatar-20.jpg', '/assets/img/profiles/avatar-21.jpg'],
      teamExtra: '',
      deadline: '10 Jun 2025',
      priority: 'Medium',
      priorityColor: 'warning',
      status: 'Active',
      statusColor: 'success',
      category: 'App Development'
    }
  ];

  const statusCounts = { all: recentProjectsData.length };
  const priorityCounts = { all: recentProjectsData.length };
  const categoryCounts = { all: recentProjectsData.length };

  recentProjectsData.forEach(p => {
    const s = p.status.toLowerCase();
    statusCounts[s] = (statusCounts[s] || 0) + 1;
    const pr = p.priority.toLowerCase();
    priorityCounts[pr] = (priorityCounts[pr] || 0) + 1;
    const c = p.category;
    categoryCounts[c] = (categoryCounts[c] || 0) + 1;
  });

  // Filtering data for sidebar
  const filteredProjects = recentProjectsData.filter(p => {
    let match = true;
    if (sidebarFilters.status !== 'all' && p.status.toLowerCase() !== sidebarFilters.status) match = false;
    if (sidebarFilters.priority !== 'all' && p.priority.toLowerCase() !== sidebarFilters.priority) match = false;
    if (sidebarFilters.category !== 'all' && p.category !== sidebarFilters.category) match = false;
    return match;
  });

  const projectColumns = [
    { name: 'Project', selector: row => row.name, sortable: true },
    { name: 'Category', selector: row => row.category, sortable: true },
    { 
      name: 'Priority', 
      selector: row => row.priority, 
      sortable: true,
      cell: (row) => (
        <div className="dropdown">
          <Link to="#" className="dropdown-toggle btn btn-sm btn-white d-inline-flex align-items-center" data-bs-toggle="dropdown">
            <span className={`rounded-circle bg-transparent-${row.priorityColor} d-flex justify-content-center align-items-center me-2`}>
              <i className={`ti ti-point-filled text-${row.priorityColor}`}></i>
            </span> {row.priority}
          </Link>
        </div>
      )
    },
    { 
      name: 'Status', 
      selector: row => row.status, 
      sortable: true,
      cell: (row) => (
        <span className={`badge badge-${row.statusColor} badge-xs d-inline-flex align-items-center`}>
          <i className="ti ti-point-filled me-1"></i>{row.status}
        </span>
      )
    },
    { name: 'Value', selector: row => row.value || '$25,000', sortable: true },
    { 
      name: 'Assigned to', 
      selector: row => row.leader.name, 
      sortable: true,
      cell: (row) => (
        <div className="d-flex align-items-center">
          <Link to="#" className="avatar avatar-sm border avatar-rounded me-2">
            <img src={row.leader.avatar} className="img-fluid" alt="img" />
          </Link>
          <h6 className="fw-normal mb-0"><Link to="#">{row.leader.name}</Link></h6>
        </div>
      )
    },
    { name: 'Deadline', selector: row => row.deadline, sortable: true },
    { 
      name: 'Action', 
      selector: row => row.id, 
      sortable: false,
      cell: (row) => (
        <div className="action-icon d-inline-flex">
          <Link to="#" className="me-2"><i className="ti ti-edit"></i></Link>
          <Link to="#"><i className="ti ti-trash"></i></Link>
        </div>
      )
    }
  ];

  const statusItems = [
    { id: "all", label: "All", count: statusCounts.all },
    { id: "active", label: "Active", count: statusCounts.active || 0 },
    { id: "hold", label: "On Hold", count: statusCounts.hold || 0 },
    { id: "completed", label: "Completed", count: statusCounts.completed || 0 },
    { id: "cancelled", label: "Cancelled", count: statusCounts.cancelled || 0 }
  ];

  const priorityItems = [
    { id: "all", label: "All", count: priorityCounts.all },
    { id: "high", label: "High", count: priorityCounts.high || 0 },
    { id: "medium", label: "Medium", count: priorityCounts.medium || 0 },
    { id: "low", label: "Low", count: priorityCounts.low || 0 }
  ];

  const categoryItems = [
    { id: "all", label: "All", count: categoryCounts.all },
    { id: "Web Development", label: "Web Development", count: categoryCounts['Web Development'] || 0 },
    { id: "App Development", label: "App Development", count: categoryCounts['App Development'] || 0 }
  ];

  const SidebarSection = ({ title, items, selectedId, onSelect }) => (
    <>
      <h6 className="fw-semibold text-muted mb-3 text-uppercase fs-12" style={{ letterSpacing: '0.5px' }}>{title}</h6>
      <ul className="list-unstyled mb-3">
        {items.map((item, i) => (
          <li className={i === items.length - 1 ? "mb-0" : "mb-2"} key={i}>
            <Link 
              to="#" 
              onClick={(e) => { e.preventDefault(); onSelect(item.id); }} 
              className={`sidebar-item d-flex align-items-center justify-content-between rounded p-2 fw-medium ${selectedId === item.id ? 'bg-primary-transparent text-primary' : 'text-dark'}`}
            >
              {item.label} 
              <span className={`badge rounded-pill ${selectedId === item.id ? 'bg-primary text-white' : 'bg-light text-muted border'}`}>{item.count}</span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );

  return (
    <div className="page-wrapper">
      <div className="content">
        {/* Breadcrumb */}
        <PageHeader 
          title="Project Workspace"
          breadcrumbs={[
            { label: 'Dashboard' },
            { label: 'Projects' },
            { label: viewMode === 'list' ? 'Project List' : 'Project Grid', active: true }
          ]}
        >
          <div className="me-2 mb-2">
            <div className="d-flex align-items-center border bg-white rounded p-1 me-2 icon-list">
              <Link to="#" onClick={(e) => { e.preventDefault(); setViewMode('list'); }} className={`btn btn-icon btn-sm me-1 ${viewMode === 'list' ? 'active bg-primary text-white' : ''}`}><i className="ti ti-list-tree"></i></Link>
              <Link to="#" onClick={(e) => { e.preventDefault(); setViewMode('grid'); }} className={`btn btn-icon btn-sm ${viewMode === 'grid' ? 'active bg-primary text-white' : ''}`}><i className="ti ti-layout-grid"></i></Link>
            </div>
          </div>
         
          <div className="me-2 mb-2">
            <div className="dropdown">
              <Link to="#" onClick={(e) => e.preventDefault()}
                className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
                data-bs-toggle="dropdown">
                <i className="ti ti-file-export me-1"></i>Export
              </Link>
              <ul className="dropdown-menu dropdown-menu-end p-3">
                <li>
                  <Link to="#" onClick={(e) => e.preventDefault()} className="dropdown-item rounded-1"><i className="ti ti-file-type-pdf me-1"></i>Export as PDF</Link>
                </li>
                <li>
                  <Link to="#" onClick={(e) => e.preventDefault()} className="dropdown-item rounded-1"><i className="ti ti-file-type-xls me-1"></i>Export as Excel</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mb-2">
            <Link to="#" onClick={(e) => { e.preventDefault(); setIsProjectModalOpen(true); }} className="btn btn-primary d-flex align-items-center"><i className="ti ti-circle-plus me-2"></i>Create Project</Link>
          </div>
        </PageHeader>

        {/* Projects Layout */}
        <div className="row position-relative">
          <style>
          {`
            .sidebar-item {
              transition: background-color 0.2s ease, color 0.2s ease;
            }
            .sidebar-item:hover {
              background-color: var(--primary-transparent) !important;
              color: var(--primary) !important;
            }
            .sidebar-scroll {
              overflow-y: auto;
              -ms-overflow-style: none;
              scrollbar-width: none;
              height: 100%;
            }
            .sidebar-scroll::-webkit-scrollbar {
              display: none;
            }
            .sidebar-wrapper {
              padding-right: 12px;
              padding-left: 12px;
            }
            @media (max-width: 1199.98px) {
              .sidebar-wrapper {
                position: relative !important;
                height: auto !important;
                margin-bottom: 24px;
              }
            }
          `}
          </style>

          {/* Sidebar */}
          <div className="col-xl-2 d-none d-xl-block"></div>
          <div className="col-xl-2 position-absolute h-100 start-0 top-0 sidebar-wrapper pb-xl-3">
            <div className="card h-100 mb-0">
              <div className="card-body p-3 sidebar-scroll">
                <SidebarSection 
                  title="PROJECT STATUS" 
                  items={statusItems} 
                  selectedId={sidebarFilters.status} 
                  onSelect={(id) => setSidebarFilters(prev => ({ ...prev, status: id }))} 
                />
                <hr className="my-3 border-dark" />
                <SidebarSection 
                  title="PRIORITY" 
                  items={priorityItems} 
                  selectedId={sidebarFilters.priority} 
                  onSelect={(id) => setSidebarFilters(prev => ({ ...prev, priority: id }))} 
                />
                <hr className="my-3 border-dark" />
                <SidebarSection 
                  title="CATEGORY" 
                  items={categoryItems} 
                  selectedId={sidebarFilters.category} 
                  onSelect={(id) => setSidebarFilters(prev => ({ ...prev, category: id }))} 
                />
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-xl-10 d-flex flex-column">
            <div className="card flex-fill">
              <div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
                <h5>Projects List</h5>
                <div className="d-flex my-xl-auto right-content align-items-center flex-wrap row-gap-3">
                  <div className="me-3">
                    <CustomDatePicker 
                      isRange={true} 
                      placeholderText="" 
                    />
                  </div>
                  <div className="dropdown me-3">
                    <Link to="#" className="dropdown-toggle btn btn-white d-inline-flex align-items-center" data-bs-toggle="dropdown">
                      Tags
                    </Link>
                    <ul className="dropdown-menu dropdown-menu-end p-3">
                      <li><Link to="#" className="dropdown-item rounded-1">Urgent</Link></li>
                      <li><Link to="#" className="dropdown-item rounded-1">VIP</Link></li>
                    </ul>
                  </div>
                  <div className="dropdown">
                    <Link to="#" className="dropdown-toggle btn btn-white d-inline-flex align-items-center" data-bs-toggle="dropdown">
                      Sort By : Last 7 Days
                    </Link>
                    <ul className="dropdown-menu dropdown-menu-end p-3">
                      <li><Link to="#" className="dropdown-item rounded-1">Recently Added</Link></li>
                      <li><Link to="#" className="dropdown-item rounded-1">Ascending</Link></li>
                      <li><Link to="#" className="dropdown-item rounded-1">Descending</Link></li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="card-body p-0">
                {viewMode === 'list' ? (
                  <div className="custom-datatable-filter table-responsive">
                    <CustomDataTable 
                      columns={projectColumns}
                      data={filteredProjects}
                      defaultRowsPerPage={10}
                    />
                  </div>
                ) : (
                  <ProjectsGridView data={filteredProjects} />
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
      
      {/* Project Form Modal */}
      <ProjectFormModal 
        open={isProjectModalOpen} 
        onClose={() => setIsProjectModalOpen(false)} 
      />
    </div>
  );
};

export default Projects;
