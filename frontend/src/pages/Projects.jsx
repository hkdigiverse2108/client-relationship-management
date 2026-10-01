import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/common/PageHeader';
import CustomDataTable from '../components/common/CustomDataTable';
import ProjectFormModal from '../components/projects/ProjectFormModal';
import ProjectsGridView from '../components/projects/ProjectsGridView';
import CustomDatePicker from '../components/common/CustomDatePicker';
import CustomSelect from '../components/common/CustomSelect';
import ConfirmationModal from '../components/ConfirmationModal';
import axiosClient from '../api/axiosClient';
import toast from 'react-hot-toast';

const Projects = () => {
  const [viewMode, setViewMode] = useState('list');
  const [selectedClient, setSelectedClient] = useState('All');
  const [dateRange, setDateRange] = useState([null, null]);
  const [sortBy, setSortBy] = useState('Recently Added');
  const [sidebarFilters, setSidebarFilters] = useState({ status: "all", priority: "all", category: "all" });
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState({});
  const [clients, setClients] = useState({});
  const [editingCell, setEditingCell] = useState({ rowId: null, field: null });
  const [projectToEdit, setProjectToEdit] = useState(null);
  const [projectToDelete, setProjectToDelete] = useState(null);

  const handleUpdateProject = async (id, field, value) => {
    try {
      await axiosClient.put(`/projects/${id}`, { [field]: value });
      setProjects(prev => prev.map(p => p._id === id ? { ...p, [field]: value } : p));
      import('react-hot-toast').then(({ default: toast }) => toast.success(`${field.charAt(0).toUpperCase() + field.slice(1)} updated successfully`));
      setEditingCell({ rowId: null, field: null });
    } catch (err) {
      console.error(err);
      import('react-hot-toast').then(({ default: toast }) => toast.error(`Failed to update ${field}`));
    }
  };

  const handleDeleteProject = async () => {
    if (!projectToDelete) return;
    try {
      await axiosClient.delete(`/projects/${projectToDelete._id || projectToDelete.id}`);
      toast.success("Project deleted successfully");
      fetchData(); // Refresh list to exclude deleted data
      setProjectToDelete(null);
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete project");
    }
  };

  const getInitials = (name) => {
    if (!name) return 'UN';
    const parts = name.split(' ').filter(p => p.length > 0);
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return 'UN';
  };
  
  const getAvatarUrl = (avatarStr) => {
    if (!avatarStr) return null;
    if (avatarStr.startsWith('http') || avatarStr.startsWith('/assets')) return avatarStr;
    const backendUrl = import.meta.env.VITE_APP_API_URL?.replace('/api/v1', '') || 'http://localhost:8000';
    const slash = avatarStr.startsWith('/') ? '' : '/';
    return `${backendUrl}${slash}${avatarStr}`;
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [projRes, usersRes, clientsRes] = await Promise.all([
        axiosClient.get('/projects'),
        axiosClient.get('/users'),
        axiosClient.get('/clients')
      ]);
      setProjects(projRes || []);
      
      const usersMap = {};
      const usersList = Array.isArray(usersRes) ? usersRes : (usersRes.data || []);
      usersList.forEach(u => {
        usersMap[u._id || u.id] = u;
      });
      setUsers(usersMap);

      const clientsMap = {};
      const clientsList = Array.isArray(clientsRes) ? clientsRes : (clientsRes.data || []);
      clientsList.forEach(c => {
        clientsMap[c._id || c.id] = c;
      });
      setClients(clientsMap);
    } catch (e) {
      console.error(e);
    }
  };

  const statusCounts = { all: projects.length };
  const priorityCounts = { all: projects.length };
  const categoryCounts = { all: projects.length };

  projects.forEach(p => {
    const s = (p.status || 'unknown').toLowerCase();
    statusCounts[s] = (statusCounts[s] || 0) + 1;
    const pr = (p.priority || 'medium').toLowerCase();
    priorityCounts[pr] = (priorityCounts[pr] || 0) + 1;
    const c = p.category || 'Unknown';
    categoryCounts[c] = (categoryCounts[c] || 0) + 1;
  });

  // Filtering data for sidebar
  let filteredProjects = projects.filter(p => {
    let match = true;
    if (sidebarFilters.status !== 'all' && (p.status || 'unknown').toLowerCase() !== sidebarFilters.status) match = false;
    if (sidebarFilters.priority !== 'all' && (p.priority || 'medium').toLowerCase() !== sidebarFilters.priority) match = false;
    if (sidebarFilters.category !== 'all' && (p.category || 'Unknown') !== sidebarFilters.category) match = false;
    if (selectedClient !== 'All' && p.client_id !== selectedClient) match = false;
    
    const pDate = p.created_at ? new Date(p.created_at) : (p.start_date ? new Date(p.start_date) : new Date());
    
    // Date Range Filter
    if (dateRange[0] && dateRange[1]) {
      // Set time to boundaries for accurate inclusive comparison
      const start = new Date(dateRange[0]); start.setHours(0,0,0,0);
      const end = new Date(dateRange[1]); end.setHours(23,59,59,999);
      if (pDate < start || pDate > end) match = false;
    }
    
    // Last 7 Days Filter
    if (sortBy === 'Last 7 Days') {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      if (pDate < sevenDaysAgo) match = false;
    }

    return match;
  });

  // Sorting
  if (sortBy === 'Recently Added' || sortBy === 'Last 7 Days') {
    filteredProjects.sort((a, b) => {
      const aDate = a.created_at ? new Date(a.created_at) : (a.start_date ? new Date(a.start_date) : new Date());
      const bDate = b.created_at ? new Date(b.created_at) : (b.start_date ? new Date(b.start_date) : new Date());
      return bDate - aDate;
    });
  } else if (sortBy === 'Ascending') {
    filteredProjects.sort((a, b) => (a.title || '').localeCompare(b.title || ''));
  } else if (sortBy === 'Descending') {
    filteredProjects.sort((a, b) => (b.title || '').localeCompare(a.title || ''));
  }

  const uniqueClientIds = [...new Set(projects.map(p => p.client_id).filter(Boolean))];

  const hasActiveFilters = 
    sidebarFilters.status !== "all" ||
    sidebarFilters.priority !== "all" ||
    sidebarFilters.category !== "all" ||
    selectedClient !== "All" ||
    (dateRange[0] !== null || dateRange[1] !== null) ||
    sortBy !== "Recently Added";

  const clearFilters = () => {
    setSidebarFilters({ status: "all", priority: "all", category: "all" });
    setSelectedClient('All');
    setDateRange([null, null]);
    setSortBy('Recently Added');
  };

  const getPriorityColor = (p) => {
    if (!p) return 'secondary';
    const pl = p.toLowerCase();
    if (pl === 'critical' || pl === 'high') return 'danger';
    if (pl === 'medium') return 'warning';
    if (pl === 'low') return 'secondary';
    return 'primary';
  };

  const getStatusColor = (s) => {
    if (!s) return 'secondary';
    const sl = s.toLowerCase();
    if (sl === 'active' || sl === 'in_progress') return 'success';
    if (sl === 'completed') return 'primary';
    if (sl === 'on hold' || sl === 'hold') return 'warning';
    if (sl === 'cancelled') return 'danger';
    return 'info';
  };

  const projectColumns = [
    { name: 'Project', selector: row => row.title, sortable: true },
    { 
      name: 'Client', 
      selector: row => row.client_id,
      sortable: true,
      cell: (row) => {
        const client = clients[row.client_id] || {};
        const avatar = client.profile_photo || client.avatar || client.clientAvatar;
        const name = client.client_name || client.company_name || `${client.first_name || ''} ${client.last_name || ''}`.trim() || 'Unknown Client';
        const avatarUrl = getAvatarUrl(avatar);
        
        return (
          <div className="d-flex align-items-center py-2">
            {avatarUrl ? (
              <Link to="/client-details" state={{ client }} className="avatar avatar-sm border avatar-rounded me-2">
                <img src={avatarUrl} className="img-fluid rounded-circle" alt="img" style={{width:'100%', height:'100%', objectFit:'cover'}} />
              </Link>
            ) : (
              <Link to="/client-details" state={{ client }} className="avatar avatar-sm border-0 me-2 d-flex align-items-center justify-content-center bg-primary text-white text-decoration-none" style={{ borderRadius: '50%' }}>
                <span className="fw-bold" style={{ fontSize: '12px' }}>{getInitials(name)}</span>
              </Link>
            )}
            <h6 className="fw-normal mb-0"><Link to="/client-details" state={{ client }}>{name}</Link></h6>
          </div>
        );
      }
    },
    { name: 'Category', selector: row => row.category || 'N/A', sortable: true, cell: row => <div className="py-2">{row.category || 'N/A'}</div> },
    { 
      name: 'Priority', 
      selector: row => row.priority, 
      sortable: true,
      cell: (row) => {
        const isEditing = editingCell.rowId === row._id && editingCell.field === 'priority';
        const color = getPriorityColor(row.priority);
        const prioText = row.priority ? row.priority.charAt(0).toUpperCase() + row.priority.slice(1) : 'Medium';
        
        if (isEditing) {
          const priorityOptions = [
            { value: 'critical', label: 'Critical' },
            { value: 'high', label: 'High' },
            { value: 'medium', label: 'Medium' },
            { value: 'low', label: 'Low' }
          ];
          const currValue = (row.priority || 'medium').toLowerCase();
          const badgeColor = color;
          
          return (
            <div className="py-2" style={{ position: 'relative', display: 'inline-block' }}>
              <div style={{ visibility: 'hidden' }}>
                <span className="d-inline-flex align-items-center">
                  <span className={`rounded-circle bg-transparent-${badgeColor} d-flex justify-content-center align-items-center me-2`}>
                    <i className={`ti ti-point-filled text-${badgeColor}`}></i>
                  </span> {prioText}
                </span>
              </div>
              <div style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: 0, zIndex: 1050, width: '130px', backgroundColor: 'var(--custom-menu-bg, #fff)', borderRadius: '5px' }}>
                <CustomSelect 
                  options={priorityOptions}
                  value={priorityOptions.find(o => o.value === currValue) || priorityOptions[2]}
                  onChange={(opt) => {
                    if (opt && opt.value !== currValue) handleUpdateProject(row._id, 'priority', opt.value);
                    setEditingCell({ rowId: null, field: null });
                  }}
                  menuPortalTarget={document.body}
                  menuPosition="fixed"
                  autoFocus
                  defaultMenuIsOpen
                  onBlur={() => setEditingCell({ rowId: null, field: null })}
                />
              </div>
            </div>
          );
        }
        
        return (
          <div className="py-2" onClick={() => setEditingCell({ rowId: row._id, field: 'priority' })} style={{ cursor: 'pointer' }} title="Click to edit">
            <span className="d-inline-flex align-items-center">
              <span className={`rounded-circle bg-transparent-${color} d-flex justify-content-center align-items-center me-2`}>
                <i className={`ti ti-point-filled text-${color}`}></i>
              </span> {prioText}
            </span>
          </div>
        );
      }
    },
    { 
      name: 'Status', 
      selector: row => row.status, 
      sortable: true,
      cell: (row) => {
        const isEditing = editingCell.rowId === row._id && editingCell.field === 'status';
        const color = getStatusColor(row.status);
        const statusText = row.status ? row.status.charAt(0).toUpperCase() + row.status.slice(1) : 'Active';
        
        if (isEditing) {
          const statusOptions = [
            { value: 'active', label: 'Active' },
            { value: 'hold', label: 'On Hold' },
            { value: 'completed', label: 'Completed' },
            { value: 'cancelled', label: 'Cancelled' }
          ];
          const currValue = (row.status || 'active').toLowerCase();
          
          return (
            <div className="py-2" style={{ position: 'relative', display: 'inline-block' }}>
              <div style={{ visibility: 'hidden' }}>
                <span className={`badge badge-${color} badge-xs d-inline-flex align-items-center`}>
                  <i className="ti ti-point-filled me-1"></i>{statusText}
                </span>
              </div>
              <div style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: 0, zIndex: 1050, width: '130px', backgroundColor: 'var(--custom-menu-bg, #fff)', borderRadius: '5px' }}>
                <CustomSelect 
                  options={statusOptions}
                  value={statusOptions.find(o => o.value === currValue) || statusOptions[0]}
                  onChange={(opt) => {
                    if (opt && opt.value !== currValue) handleUpdateProject(row._id, 'status', opt.value);
                    setEditingCell({ rowId: null, field: null });
                  }}
                  menuPortalTarget={document.body}
                  menuPosition="fixed"
                  autoFocus
                  defaultMenuIsOpen
                  onBlur={() => setEditingCell({ rowId: null, field: null })}
                />
              </div>
            </div>
          );
        }

        return (
          <div className="py-2" onClick={() => setEditingCell({ rowId: row._id, field: 'status' })} style={{ cursor: 'pointer' }} title="Click to edit">
            <span className={`badge badge-${color} badge-xs d-inline-flex align-items-center`}>
              <i className="ti ti-point-filled me-1"></i>{statusText}
            </span>
          </div>
        );
      }
    },
    { name: 'Value', selector: row => `₹${row.project_value || 0}`, sortable: true, cell: row => <div className="py-2">₹{row.project_value || 0}</div> },
    { 
      name: 'Assigned to', 
      selector: row => row.assigned_to, 
      sortable: true,
      cell: (row) => {
        const user = users[row.assigned_to] || {};
        const avatar = user.profile_photo || user.avatar || user.clientAvatar;
        const name = user.name || 'Unassigned';
        const avatarUrl = getAvatarUrl(avatar);
        return (
          <div className="d-flex align-items-center py-2">
            {avatarUrl ? (
              <span className="avatar avatar-sm border avatar-rounded me-2">
                <img src={avatarUrl} className="img-fluid rounded-circle" alt="img" style={{width:'100%', height:'100%', objectFit:'cover'}} />
              </span>
            ) : (
              <span className={`avatar avatar-sm border-0 me-2 d-flex align-items-center justify-content-center ${name === 'Unassigned' ? 'bg-light text-secondary' : 'bg-primary text-white'}`} style={{ borderRadius: '50%' }}>
                <span className="fw-bold" style={{ fontSize: '12px' }}>{getInitials(name)}</span>
              </span>
            )}
            <h6 className="fw-normal mb-0">
              <span className={name === 'Unassigned' ? 'text-muted' : ''}>{name}</span>
            </h6>
          </div>
        );
      }
    },
    { name: 'Deadline', selector: row => row.end_date || 'N/A', sortable: true },
    { 
      name: 'Action', 
      selector: row => row._id, 
      sortable: false,
      cell: (row) => (
        <div className="action-icon d-inline-flex">
          <Link to="#" className="me-2" onClick={(e) => {
            e.preventDefault();
            setProjectToEdit(row);
            setIsProjectModalOpen(true);
          }}><i className="ti ti-edit"></i></Link>
          <Link to="#" data-bs-toggle="modal" data-bs-target="#delete_project_modal" onClick={() => {
            setProjectToDelete(row);
          }}><i className="ti ti-trash"></i></Link>
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
    { id: "critical", label: "Critical", count: priorityCounts.critical || 0 },
    { id: "high", label: "High", count: priorityCounts.high || 0 },
    { id: "medium", label: "Medium", count: priorityCounts.medium || 0 },
    { id: "low", label: "Low", count: priorityCounts.low || 0 }
  ];

  const categoryItems = [
    { id: "all", label: "All", count: categoryCounts.all },
    ...Object.keys(categoryCounts).filter(k => k !== 'all').map(k => ({
      id: k, label: k, count: categoryCounts[k]
    }))
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
          <div className="col-xl-2 position-absolute h-100 start-0 top-0 sidebar-wrapper pb-xl-4">
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
                      placeholderText="Select Date Range" 
                      startDate={dateRange[0]}
                      endDate={dateRange[1]}
                      onChange={(update) => setDateRange(update)}
                    />
                  </div>
                  <div className="me-3" style={{ width: '200px' }}>
                    <CustomSelect 
                      options={[
                        { value: 'All', label: 'All Clients' },
                        ...uniqueClientIds.map(clientId => {
                          const c = clients[clientId];
                          const name = c ? (c.client_name || c.company_name || `${c.first_name || ''} ${c.last_name || ''}`.trim() || 'Unknown') : 'Unknown';
                          return { value: clientId, label: name };
                        })
                      ]}
                      value={{ value: selectedClient, label: selectedClient === 'All' ? 'All Clients' : (clients[selectedClient] ? (clients[selectedClient].client_name || clients[selectedClient].company_name || clients[selectedClient].first_name) : 'Unknown') }}
                      onChange={(opt) => setSelectedClient(opt ? opt.value : 'All')}
                      placeholder="Select Client"
                      isSearchable={true}
                    />
                  </div>
                  <div style={{ width: '180px' }}>
                    <CustomSelect 
                      options={[
                        { value: 'Recently Added', label: 'Recently Added' },
                        { value: 'Ascending', label: 'Ascending (A-Z)' },
                        { value: 'Descending', label: 'Descending (Z-A)' },
                        { value: 'Last 7 Days', label: 'Last 7 Days' }
                      ]}
                      value={{ value: sortBy, label: sortBy === 'Ascending' ? 'Ascending (A-Z)' : (sortBy === 'Descending' ? 'Descending (Z-A)' : sortBy) }}
                      onChange={(opt) => setSortBy(opt ? opt.value : 'Recently Added')}
                      isSearchable={false}
                    />
                  </div>
                  {hasActiveFilters && (
                    <div className="ms-1">
                      <Link to="#" onClick={(e) => { e.preventDefault(); clearFilters(); }} className="btn btn-outline-danger d-inline-flex align-items-center">
                        <i className="ti ti-x me-1"></i>Clear
                      </Link>
                    </div>
                  )}
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
                  <ProjectsGridView 
                    data={filteredProjects} 
                    users={users}
                    clients={clients} 
                    setProjectToEdit={setProjectToEdit}
                    setIsProjectModalOpen={setIsProjectModalOpen}
                    setProjectToDelete={setProjectToDelete}
                  />
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
      
      <ProjectFormModal 
        open={isProjectModalOpen} 
        onClose={() => {
          setIsProjectModalOpen(false);
          setProjectToEdit(null);
        }} 
        onSuccess={fetchData}
        projectData={projectToEdit}
      />

      <ConfirmationModal 
        id="delete_project_modal"
        onConfirm={handleDeleteProject}
        title="Delete Project"
        description={
          <>
            Are you sure you want to delete <strong>{projectToDelete?.title || 'this project'}</strong>? This process cannot be undone.
          </>
        }
        confirmText="Delete"
      />
    </div>
  );
};

export default Projects;
