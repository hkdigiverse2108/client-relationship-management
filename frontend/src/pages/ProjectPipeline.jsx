import React, { useState, useEffect, useMemo } from 'react';
import KanbanBoard from '../components/common/KanbanBoard';
import PageHeader from '../components/common/PageHeader';
import ProjectFormModal from '../components/projects/ProjectFormModal';
import ForecastView from './ForecastView';
import axiosClient from '../api/axiosClient';
import CustomDatePicker from '../components/common/CustomDatePicker';
import CustomSelect from '../components/common/CustomSelect';
import { toast } from 'react-hot-toast';
import ConfirmationModal from '../components/ConfirmationModal';


const ProjectPipeline = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectToEdit, setProjectToEdit] = useState(null);
  const [projectToDelete, setProjectToDelete] = useState(null);
  const [activePriority, setActivePriority] = useState('All');
  const [viewMode, setViewMode] = useState('pipeline');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeStage, setActiveStage] = useState('All');
  const [dateRange, setDateRange] = useState([null, null]);
  const [activeClient, setActiveClient] = useState('All');
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeDepartment, setActiveDepartment] = useState('All');

  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState({});
  const [users, setUsers] = useState({});

  const fetchData = async () => {
    try {
      const pRes = await axiosClient.get('/projects');
      const pData = Array.isArray(pRes) ? pRes : (pRes.data || []);
      setProjects(pData.filter(p => !p.is_deleted));
      
      const uRes = await axiosClient.get('/users');
      const uData = Array.isArray(uRes) ? uRes : (uRes.data || []);
      const um = {};
      uData.forEach(u => { um[u.id || u._id] = u; });
      setUsers(um);

      const cRes = await axiosClient.get('/clients');
      const cData = Array.isArray(cRes) ? cRes : (cRes.data || []);
      const cm = {};
      cData.forEach(c => { cm[c._id || c.client_id || c.id] = c; });
      setClients(cm);
    } catch(err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const backendUrl = import.meta.env.VITE_APP_API_URL?.replace('/api/v1', '') || 'http://localhost:8000';
  const getAvatarUrl = (avatarStr) => {
    if (!avatarStr) return null;
    if (avatarStr.startsWith('http') || avatarStr.startsWith('/assets')) return avatarStr;
    const slash = avatarStr.startsWith('/') ? '' : '/';
    return `${backendUrl}${slash}${avatarStr}`;
  };

  const stageOptions = [
    { value: 'All', label: 'All Stages' },
    { value: 'New', label: 'New' },
    { value: 'In Progress', label: 'In Progress' },
    { value: 'In Review', label: 'In Review' },
    { value: 'On Hold', label: 'On Hold' },
    { value: 'Completed', label: 'Completed' }
  ];

  const clientOptions = useMemo(() => {
    const uniqueClients = [...new Set(projects.map(p => p.client_id).filter(Boolean))];
    const opts = uniqueClients.map(id => {
       const c = clients[id] || {};
       return { value: id, label: c.client_name || c.company_name || `${c.first_name || ''} ${c.last_name || ''}`.trim() || 'Unknown Client' };
    });
    return [{ value: 'All', label: 'All Clients' }, ...opts];
  }, [projects, clients]);

  const categoryOptions = useMemo(() => {
    const uniqueCats = [...new Set(projects.map(p => p.category).filter(Boolean))];
    return [{ value: 'All', label: 'All Categories' }, ...uniqueCats.map(c => ({ value: c, label: c }))];
  }, [projects]);

  const departmentOptions = useMemo(() => {
    const uniqueDeps = [...new Set(projects.map(p => p.department).filter(Boolean))];
    return [{ value: 'All', label: 'All Departments' }, ...uniqueDeps.map(d => ({ value: d, label: d }))];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    return projects.filter(p => {
      // 1. Priority
      if (activePriority !== 'All') {
        const priorityStr = (p.priority || 'medium').toLowerCase();
        if (priorityStr !== activePriority.toLowerCase()) return false;
      }

      // 2. Search
      if (searchTerm) {
        const query = searchTerm.toLowerCase();
        
        // Resolve client name
        const c = clients[p.client_id] || {};
        const clientName = (c.client_name || c.company_name || `${c.first_name || ''} ${c.last_name || ''}`).toLowerCase();
        
        // Resolve assigned user name
        const u = users[p.assigned_to] || {};
        const userName = (u.name || '').toLowerCase();
        
        const searchableText = [
          p.title,
          p.tags,
          p.category,
          p.department,
          p.priority,
          p.status,
          p.stage,
          p.description,
          p.project_value,
          p.budget,
          clientName,
          userName
        ].map(val => (val || '').toString().toLowerCase()).join(' ');

        if (!searchableText.includes(query)) return false;
      }

      // 3. Stage Dropdown
      if (activeStage !== 'All') {
        const stageMap = {
          'New': 'new',
          'In Progress': 'in_progress',
          'In Review': 'review',
          'On Hold': 'hold',
          'Completed': 'completed'
        };
        const st = stageMap[activeStage];
        if (st && p.stage !== st) return false;
      }

      // 4. Date Range
      const [start, end] = dateRange;
      if (start || end) {
        const pDateStr = p.start_date || p.created_at;
        if (!pDateStr) return false;
        const pDate = new Date(pDateStr);
        if (start && pDate < start) return false;
        if (end && pDate > end) return false;
      }

      // 5. Client
      if (activeClient !== 'All' && p.client_id !== activeClient) return false;
      // 6. Category
      if (activeCategory !== 'All' && p.category !== activeCategory) return false;
      // 7. Department
      if (activeDepartment !== 'All' && p.department !== activeDepartment) return false;

      return true;
    });
  }, [projects, activePriority, searchTerm, activeStage, dateRange, activeClient, activeCategory, activeDepartment, clients, users]);

  const initialPipelineData = useMemo(() => {
    const cols = [
      { id: 'col-1', title: 'New', color: 'purple', match: 'new', cards: [] },
      { id: 'col-2', title: 'In Progress', color: 'pink', match: 'in_progress', cards: [] },
      { id: 'col-3', title: 'In Review', color: 'warning', match: 'review', cards: [] },
      { id: 'col-4', title: 'On Hold', color: 'info', match: 'hold', cards: [] },
      { id: 'col-5', title: 'Completed', color: 'success', match: 'completed', cards: [] }
    ];

    filteredProjects.forEach(p => {
      let stage = p.stage || 'new';
      let col = cols.find(c => c.match === stage) || cols[0];
      
      const client = clients[p.client_id] || {};
      const clientName = client.client_name || client.company_name || `${client.first_name || ''} ${client.last_name || ''}`.trim() || 'Unknown Client';
      const clientAvatar = getAvatarUrl(client.profile_photo || client.avatar || client.clientAvatar);
      
      let assignee = null;
      if (p.assigned_to) {
        const u = users[p.assigned_to];
        if (u) {
          assignee = {
            name: u.name || 'Unassigned',
            avatar: getAvatarUrl(u.profile_photo) || null
          };
        }
      }

      col.cards.push({
        id: p._id || p.id,
        _original: p,
        title: p.title || 'Untitled Project',
        client: clientName,
        clientAvatar: clientAvatar,
        tag: p.category || 'General',
        value: p.project_value ? `₹${p.project_value}` : '₹0',
        probability: p.priority ? p.priority.charAt(0).toUpperCase() + p.priority.slice(1) : 'Medium',
        dueDate: p.end_date ? new Date(p.end_date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : 'No Deadline',
        assignee: assignee,
        comments: 0,
        attachments: 0
      });
    });

    return cols;
  }, [filteredProjects, clients, users]);

  const allDeals = useMemo(() => {
    return initialPipelineData.flatMap(col => 
      col.cards.map(card => ({
        ...card,
        stage: col.title,
        amount: card.value ? parseInt(card.value.replace(/[^0-9]/g, ''), 10) : 0,
        expected_close_date: new Date(new Date().setDate(new Date().getDate() + Math.random() * 60)), // mock date since original data lacks it
        probability: Math.floor(Math.random() * (100 - 40 + 1) + 40) // mock probability
      }))
    );
  }, [initialPipelineData]);

  const headerStats = useMemo(() => {
    const total = filteredProjects.length;
    const value = filteredProjects.reduce((sum, p) => sum + (parseFloat(p.project_value) || 0), 0);
    const won = filteredProjects.filter(p => p.stage === 'completed').reduce((sum, p) => sum + (parseFloat(p.project_value) || 0), 0);
    
    return {
      total,
      value: `₹${value.toLocaleString()}`,
      won: `₹${won.toLocaleString()}`
    };
  }, [filteredProjects]);

  const hasActiveFilters = searchTerm !== '' || activePriority !== 'All' || activeStage !== 'All' || dateRange[0] !== null || dateRange[1] !== null || activeClient !== 'All' || activeCategory !== 'All' || activeDepartment !== 'All';

  const handleResetFilters = () => {
    setSearchTerm('');
    setActivePriority('All');
    setActiveStage('All');
    setDateRange([null, null]);
    setActiveClient('All');
    setActiveCategory('All');
    setActiveDepartment('All');
  };

  const handleCardMove = async (cardId, newStageTitle, reason) => {
    const stageMap = {
      'New': 'new',
      'In Progress': 'in_progress',
      'In Review': 'review',
      'On Hold': 'hold',
      'Completed': 'completed'
    };
    const newStageKey = stageMap[newStageTitle] || 'new';

    try {
      await axiosClient.put(`/projects/${cardId}`, { stage: newStageKey });
      toast.success(`Project moved to ${newStageTitle}`);
      fetchData(); // refresh
    } catch (err) {
      console.error(err);
      toast.error('Failed to update project stage');
    }
  };

  const handleAddDeal = (stageTitle) => {
    const stageMap = {
      'New': 'new',
      'In Progress': 'in_progress',
      'In Review': 'review',
      'On Hold': 'hold',
      'Completed': 'completed'
    };
    setProjectToEdit({ stage: stageMap[stageTitle] || 'new' });
    setIsModalOpen(true);
  };

  const handleEditCard = (cardId) => {
    const proj = projects.find(p => p._id === cardId || p.id === cardId);
    if (proj) {
      setProjectToEdit(proj);
      setIsModalOpen(true);
    }
  };

  const handleDeleteClick = (cardId) => {
    const proj = projects.find(p => p._id === cardId || p.id === cardId);
    if (proj) {
      setProjectToDelete(proj);
    }
  };

  const confirmDelete = async () => {
    if (!projectToDelete) return;
    try {
      await axiosClient.delete(`/projects/${projectToDelete._id || projectToDelete.id}`);
      toast.success('Project deleted successfully');
      setProjectToDelete(null);
      fetchData();
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete project');
    }
  };

  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          {/* Breadcrumb */}
          <PageHeader 
            title="Projects Pipeline Board"
            breadcrumbs={[
              { label: 'Dashboard' },
              { label: 'Projects' },
              { label: 'Pipeline Board', active: true }
            ]}
          >
            <div className="d-flex my-xl-auto right-content align-items-center flex-wrap ">
            
              <a href="#" onClick={(e) => { e.preventDefault(); setProjectToEdit(null); setIsModalOpen(true); }} className="btn btn-primary d-inline-flex align-items-center mb-2">
                <i className="ti ti-circle-plus me-1"></i>New Project
              </a>
             
            </div>
          </PageHeader>
          {/* /Breadcrumb */}

          <div className="card">
            {viewMode === 'pipeline' && (
              <div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
                <h4 className="mb-0">Projects Pipeline Overview</h4>
                <div className="d-flex align-items-center flex-wrap row-gap-3">
                  <div className="d-flex align-items-center me-3">
                    <p className="mb-0 me-3 pe-3 border-end fs-14">Total Projects : <span className="text-dark"> {headerStats.total} </span></p>
                    <p className="mb-0 me-3 pe-3 border-end fs-14">Total Value : <span className="text-dark"> {headerStats.value} </span></p>
                    <p className="mb-0 fs-14">Won Value : <span className="text-dark"> {headerStats.won} </span></p>
                  </div>
                  <div className="input-icon-start position-relative">
                    <span className="input-icon-addon">
                      <i className="ti ti-search"></i>
                    </span>
                    <input type="text" className="form-control" placeholder="Search Projects" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                  </div>
                </div>
              </div>
            )}
            <div className="card-body">
              {viewMode === 'pipeline' && (
                <div className="row">
                  <div className="col-lg-4">
                    <div className="d-flex align-items-center flex-wrap row-gap-3 mb-3">
                    <h6 className="me-2">Priority</h6>
                    <ul className="nav nav-pills border d-inline-flex p-1 rounded bg-light todo-tabs" role="tablist">
                      <li className="nav-item" role="presentation">
                        <button
                          className={`nav-link btn btn-sm btn-icon py-3 d-flex align-items-center justify-content-center w-auto ${activePriority === 'All' ? 'active' : ''}`}
                          onClick={() => setActivePriority('All')}
                          type="button">All</button>
                      </li>
                      <li className="nav-item" role="presentation">
                        <button
                          className={`nav-link btn btn-sm btn-icon py-3 d-flex align-items-center justify-content-center w-auto ${activePriority === 'Critical' ? 'active' : ''}`}
                          onClick={() => setActivePriority('Critical')}
                          type="button">Critical</button>
                      </li>
                      <li className="nav-item" role="presentation">
                        <button
                          className={`nav-link btn btn-sm btn-icon py-3 d-flex align-items-center justify-content-center w-auto ${activePriority === 'High' ? 'active' : ''}`}
                          onClick={() => setActivePriority('High')}
                          type="button">High</button>
                      </li>
                      <li className="nav-item" role="presentation">
                        <button
                          className={`nav-link btn btn-sm btn-icon py-3 d-flex align-items-center justify-content-center w-auto ${activePriority === 'Medium' ? 'active' : ''}`}
                          onClick={() => setActivePriority('Medium')}
                          type="button">Medium</button>
                      </li>
                      <li className="nav-item" role="presentation">
                        <button
                          className={`nav-link btn btn-sm btn-icon py-3 d-flex align-items-center justify-content-center w-auto ${activePriority === 'Low' ? 'active' : ''}`}
                          onClick={() => setActivePriority('Low')}
                          type="button">Low</button>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-8">
                  <div className="d-flex align-items-center justify-content-lg-end flex-wrap row-gap-3 mb-3">
                    
                    <div className="me-2" style={{ width: '150px' }}>
                      <CustomSelect 
                        options={stageOptions}
                        value={stageOptions.find(o => o.value === activeStage)}
                        onChange={(selected) => setActiveStage(selected ? selected.value : 'All')}
                      />
                    </div>

                    <div className="me-2" style={{ width: '150px' }}>
                      <CustomSelect 
                        options={clientOptions}
                        value={clientOptions.find(o => o.value === activeClient) || clientOptions[0]}
                        onChange={(selected) => setActiveClient(selected ? selected.value : 'All')}
                        placeholder="Client"
                      />
                    </div>
                    <div className="me-2" style={{ width: '150px' }}>
                      <CustomSelect 
                        options={categoryOptions}
                        value={categoryOptions.find(o => o.value === activeCategory) || categoryOptions[0]}
                        onChange={(selected) => setActiveCategory(selected ? selected.value : 'All')}
                        placeholder="Category"
                      />
                    </div>
                    <div className="me-2" style={{ width: '150px' }}>
                      <CustomSelect 
                        options={departmentOptions}
                        value={departmentOptions.find(o => o.value === activeDepartment) || departmentOptions[0]}
                        onChange={(selected) => setActiveDepartment(selected ? selected.value : 'All')}
                        placeholder="Department"
                      />
                    </div>
                    <div className="input-icon position-relative me-2">
                      <span className="input-icon-addon">
                        <i className="ti ti-calendar"></i>
                      </span>
                      <CustomDatePicker 
                        isRange={true} 
                        startDate={dateRange[0]} 
                        endDate={dateRange[1]} 
                        onChange={(dates) => setDateRange(dates)} 
                        className="form-control" 
                        placeholder="Select Date" 
                      />
                    </div>
                    
                    {hasActiveFilters && (
                      <div className="ms-1">
                        <a href="#" onClick={(e) => { e.preventDefault(); handleResetFilters(); }} className="btn btn-outline-danger d-inline-flex align-items-center">
                          <i className="ti ti-x me-1"></i>Clear
                        </a>
                      </div>
                    )}
                    
                  </div>
                </div>
              </div>
              )}

            {/* Render View based on toggle */}
            {viewMode === 'pipeline' ? (
              <KanbanBoard 
                initialColumns={initialPipelineData} 
                itemType="Project" 
                onCardMove={handleCardMove} 
                onAddDeal={handleAddDeal} 
                onEditCard={handleEditCard}
                onDeleteCard={handleDeleteClick}
              />
            ) : (
              <ForecastView deals={allDeals} />
            )}

          </div>
        </div>
      </div>
    </div>

    {/* Project Form Modal Component */}
    <ProjectFormModal 
      open={isModalOpen} 
      onClose={() => { setIsModalOpen(false); setProjectToEdit(null); }} 
      onSuccess={fetchData} 
      projectData={projectToEdit}
    />

    {/* Confirmation Modal for Delete */}
    <ConfirmationModal 
      id="delete_modal"
      title="Delete Project"
      message="Are you sure you want to delete this project?"
      onConfirm={confirmDelete}
    />

  </>
);
};

export default ProjectPipeline;
