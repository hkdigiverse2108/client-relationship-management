import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/common/PageHeader';
import LeadFormModal from '../components/leads/LeadFormModal';
import LeadsKanbanView from '../components/leads/LeadsKanbanView';
import CustomDataTable from '../components/common/CustomDataTable';
import CustomSelect from '../components/common/CustomSelect';
import { leadsData } from './leadsData';
import CustomDatePicker from '../components/common/CustomDatePicker';
import ConfirmationModal from '../components/ConfirmationModal';
import axiosClient from '../api/axiosClient';
import toast from 'react-hot-toast';

const Leads = () => {
  const [viewMode, setViewMode] = useState('list');
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [selectedLead, setSelectedLead] = useState(null);
  const [leads, setLeads] = useState([]);
  const [users, setUsers] = useState([]);
  const [editingCell, setEditingCell] = useState({ rowId: null, field: null });
  const [activeStatusFilter, setActiveStatusFilter] = useState('All');
  const [activeSourceFilter, setActiveSourceFilter] = useState('All');
  const [activeTagFilter, setActiveTagFilter] = useState('All');
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [sortBy, setSortBy] = useState('Recently Added');
  
  const [stats, setStats] = useState({
    total_leads: { count: 0, percent_change: 0, is_positive: true },
    new_leads: { count: 0, percent_change: 0, is_positive: true },
    lost_leads: { count: 0, percent_change: 0, is_positive: true },
    qualified_leads: { count: 0, percent_change: 0, is_positive: true }
  });

  const fetchLeadsAndUsers = async () => {
    try {
      const [leadsRes, usersRes, statsRes] = await Promise.all([
        axiosClient.get('/leads'),
        axiosClient.get('/users'),
        axiosClient.get('/leads/stats')
      ]);
      const leadsData = leadsRes || [];
      setLeads(leadsData);
      setUsers(usersRes || []);
      
      if (statsRes) {
        setStats(statsRes);
      }
    } catch (error) {
      console.error("Error fetching leads/users for stats:", error);
    }
  };

  useEffect(() => {
    fetchLeadsAndUsers();
  }, []);

  const openAddModal = (e) => {
    e.preventDefault();
    setModalMode('add');
    setSelectedLead(null);
    setIsLeadModalOpen(true);
  };

  const openEditModal = (e, lead) => {
    e.preventDefault();
    setModalMode('edit');
    setSelectedLead(lead);
    setIsLeadModalOpen(true);
  };

  const openDeleteModal = (e, lead) => {
    setSelectedLead(lead);
  };

  const handleDelete = async () => {
    try {
      await axiosClient.delete(`/leads/${selectedLead._id || selectedLead.id}`);
      toast.success("Lead deleted successfully!");
      fetchLeadsAndUsers();
    } catch (error) {
      console.error("Error deleting lead:", error);
      toast.error(error.response?.data?.detail || "Error deleting lead");
    }
  };

  const handleInlineUpdate = async (row, field, value) => {
    if (row[field] === value) {
      setEditingCell({ rowId: null, field: null });
      return;
    }
    
    const previousLeads = [...leads];
    setLeads(leads.map(l => (l._id || l.id) === (row._id || row.id) ? { ...l, [field]: value } : l));
    setEditingCell({ rowId: null, field: null });

    try {
      await axiosClient.put(`/leads/${row._id || row.id}`, { [field]: value });
      toast.success(`${field === 'assigned_to' ? 'Assignee' : 'Status'} updated successfully!`);
      fetchLeadsAndUsers();
    } catch (error) {
      console.error(`Error updating ${field}:`, error);
      toast.error(`Error updating ${field}`);
      setLeads(previousLeads);
    }
  };

  const fileInputRef = useRef(null);
  
  const handleImportClick = (e) => {
    e.preventDefault();
    fileInputRef.current.click();
  };
  
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    if (!file.name.endsWith('.csv')) {
      toast.error('Only CSV files are allowed');
      e.target.value = '';
      return;
    }
    
    const formData = new FormData();
    formData.append('file', file);
    
    try {
      await axiosClient.post('/leads/import', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      toast.success('Leads imported successfully!');
      fetchLeadsAndUsers();
    } catch (error) {
      console.error('Error importing leads:', error);
      toast.error(error.response?.data?.detail || 'Error importing leads');
    }
    
    e.target.value = '';
  };

  const exportToExcel = (e) => {
    e.preventDefault();
    if (!filteredLeads || filteredLeads.length === 0) {
      toast.error('No data to export');
      return;
    }
    const headers = ['Lead Name', 'Company Name', 'Email', 'Mobile', 'Source', 'Status', 'Assigned To'];
    const csvRows = [];
    csvRows.push(headers.join(','));
    
    filteredLeads.forEach(lead => {
      const assignedUser = users.find(u => (u._id || u.id) === lead.assigned_to);
      const assignedName = assignedUser ? assignedUser.name : (lead.assigned_to || 'Unassigned');
      
      const row = [
        `"${lead.lead_name || ''}"`,
        `"${lead.company_name || ''}"`,
        `"${lead.email || ''}"`,
        `"${lead.mobile_number || ''}"`,
        `"${lead.source || ''}"`,
        `"${lead.status || ''}"`,
        `"${assignedName}"`
      ];
      csvRows.push(row.join(','));
    });
    
    const csvContent = "data:text/csv;charset=utf-8," + csvRows.join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "Leads_Export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Exported to Excel successfully');
  };

  const exportToPDF = (e) => {
    e.preventDefault();
    if (!filteredLeads || filteredLeads.length === 0) {
      toast.error('No data to export');
      return;
    }
    
    const printWindow = window.open('', '_blank');
    
    let html = `
      <html>
        <head>
          <title>Leads Export</title>
          <style>
            @page { size: landscape; margin: 15mm; }
            body { font-family: 'Segoe UI', Arial, sans-serif; padding: 0; margin: 0; color: #333; }
            h2 { text-align: center; color: #ff6a00; font-weight: 600; margin-bottom: 20px; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; font-size: 12px; }
            th, td { border: 1px solid #e0e0e0; padding: 10px 12px; text-align: left; vertical-align: middle; }
            th { background-color: #f8f9fa; color: #495057; font-weight: 600; text-transform: uppercase; font-size: 11px; white-space: nowrap; }
            tr:nth-child(even) { background-color: #fafafa; }
            .no-wrap { white-space: nowrap; }
          </style>
        </head>
        <body>
          <h2>Leads List</h2>
          <table>
            <thead>
              <tr>
                <th>Lead Name</th>
                <th>Company Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Status</th>
                <th>Assigned To</th>
              </tr>
            </thead>
            <tbody>
    `;
    
    filteredLeads.forEach(lead => {
      const assignedUser = users.find(u => (u._id || u.id) === lead.assigned_to);
      const assignedName = assignedUser ? assignedUser.name : (lead.assigned_to || 'Unassigned');
      
      html += `
        <tr>
          <td class="no-wrap">${lead.lead_name || ''}</td>
          <td class="no-wrap">${lead.company_name || ''}</td>
          <td>${lead.email || ''}</td>
          <td class="no-wrap">${lead.mobile_number || ''}</td>
          <td class="no-wrap" style="text-transform: capitalize;">${lead.status || ''}</td>
          <td class="no-wrap">${assignedName}</td>
        </tr>
      `;
    });
    
    html += `
            </tbody>
          </table>
          <script>
            window.onload = function() {
              window.print();
              setTimeout(function() { window.close(); }, 500);
            }
          </script>
        </body>
      </html>
    `;
    
    printWindow.document.write(html);
    printWindow.document.close();
  };

  const getSelectValue = (val, options = []) => {
    if (!val) return null;
    const existing = options.find(o => o.value === val);
    if (existing) return existing;
    return { value: val, label: val.charAt(0).toUpperCase() + val.slice(1) };
  };

  const getStatusBadgeClass = (status) => {
    const s = (status || '').toLowerCase();
    switch (s) {
      case 'new': return 'badge-info-transparent';
      case 'contacted': return 'badge-warning-transparent';
      case 'qualified': return 'badge-secondary-transparent';
      case 'negotiation': return 'badge-purple-transparent';
      case 'won': return 'badge-success-transparent';
      case 'lost': return 'badge-danger-transparent';
      default: return 'badge-secondary-transparent';
    }
  };

  const renderStatChange = (statObj) => {
    const { is_positive, percent_change } = statObj || { is_positive: true, percent_change: 0 };
    return (
      <p className="fw-medium fs-13 mb-0">
        <span className={`${is_positive ? 'text-success' : 'text-danger'} fs-12`}>
          <i className={`ti ${is_positive ? 'ti-arrow-wave-right-up' : 'ti-arrow-wave-right-down'} me-1`}></i>
          {is_positive ? '+' : '-'}{percent_change}% 
        </span> from last week
      </p>
    );
  };

  const statusCounts = leads.reduce((acc, lead) => {
    const s = lead.status ? lead.status.toLowerCase() : 'unknown';
    acc[s] = (acc[s] || 0) + 1;
    return acc;
  }, {});

  const sourceCounts = leads.reduce((acc, lead) => {
    const s = lead.source ? lead.source.toLowerCase() : 'unknown';
    acc[s] = (acc[s] || 0) + 1;
    return acc;
  }, {});

  const tagCounts = leads.reduce((acc, lead) => {
    const t = lead.tags ? lead.tags.toLowerCase() : 'unknown';
    acc[t] = (acc[t] || 0) + 1;
    return acc;
  }, {});

  const filteredLeads = leads.filter(lead => {
    let statusMatch = true;
    let sourceMatch = true;
    let tagMatch = true;
    if (activeStatusFilter !== 'All') {
      const s = lead.status ? lead.status.toLowerCase() : 'unknown';
      statusMatch = s === activeStatusFilter.toLowerCase();
    }
    if (activeSourceFilter !== 'All') {
      const s = lead.source ? lead.source.toLowerCase() : 'unknown';
      sourceMatch = s === activeSourceFilter.toLowerCase();
    }
    if (activeTagFilter !== 'All') {
      const t = lead.tags ? lead.tags.toLowerCase() : 'unknown';
      tagMatch = t === activeTagFilter.toLowerCase();
    }
    let dateMatch = true;
    if (startDate && endDate) {
      const leadDate = new Date(lead.created_at);
      // set hours to 0 to compare days properly
      const start = new Date(startDate);
      start.setHours(0, 0, 0, 0);
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);
      if (leadDate < start || leadDate > end) dateMatch = false;
    }
    
    if (sortBy === 'Last 7 Days') {
      const leadDate = new Date(lead.created_at);
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setHours(0, 0, 0, 0);
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      if (leadDate < sevenDaysAgo) dateMatch = false;
    }

    return statusMatch && sourceMatch && tagMatch && dateMatch;
  });

  const hasActiveFilters = activeStatusFilter !== 'All' || activeSourceFilter !== 'All' || activeTagFilter !== 'All' || (startDate && endDate) || sortBy !== 'Recently Added';
  
  const clearFilters = (e) => {
    if (e) e.preventDefault();
    setActiveStatusFilter('All');
    setActiveSourceFilter('All');
    setActiveTagFilter('All');
    setDateRange([null, null]);
    setSortBy('Recently Added');
  };

  if (sortBy === 'Ascending') {
    filteredLeads.sort((a, b) => (a.lead_name || '').localeCompare(b.lead_name || ''));
  } else if (sortBy === 'Descending') {
    filteredLeads.sort((a, b) => (b.lead_name || '').localeCompare(a.lead_name || ''));
  } else {
    // Recently Added (Default)
    filteredLeads.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  }

  const renderSidebarItem = (label, count, activeFilter, setActiveFilter) => {
    const isActive = activeFilter === label;
    return (
      <li className="mb-2" key={label}>
        <a 
          href="#" 
          onClick={(e) => { e.preventDefault(); setActiveFilter(label); }} 
          className={`sidebar-item d-flex align-items-center justify-content-between rounded p-2 fw-medium ${isActive ? 'bg-primary-transparent text-primary' : 'text-dark'}`}
        >
          {label} <span className={`badge rounded-pill ${isActive ? 'bg-primary text-white' : 'bg-light text-muted border'}`}>{count || 0}</span>
        </a>
      </li>
    );
  };
  
  const columns = [
    {
      name: 'Lead name',
      sortable: true,
      selector: row => row.lead_name,
      cell: (row) => (
        <h6 className="fs-14 fw-medium">{row.lead_name}</h6>
      ),
    },
    {
      name: 'Company name ',
      sortable: true,
      selector: row => row.company_name,
      cell: (row) => (
        <div className="d-flex align-items-center file-name-icon">
          <div className="avatar avatar-md border avatar-rounded">
            <div className="bg-primary rounded d-flex align-items-center justify-content-center w-100 h-100">
              <span className="fs-12 text-white fw-bold">{row.company_name?.charAt(0).toUpperCase()}</span>
            </div>
          </div>
          <div className="ms-2">
            <h6 className="fw-normal fs-14 text-gray-5">{row.company_name}</h6>
          </div>
        </div>
      ),
    },
    {
      name: 'Source',
      sortable: true,
      selector: row => row.source,
    },
    {
      name: 'Status',
      sortable: true,
      selector: row => row.status,
      cell: (row) => {
        const isEditing = editingCell.rowId === (row._id || row.id) && editingCell.field === 'status';
        if (isEditing) {
          const statusOptions = [
            { value: 'new', label: 'New' },
            { value: 'contacted', label: 'Contacted' },
            { value: 'qualified', label: 'Qualified' },
            { value: 'negotiation', label: 'Negotiation' },
            { value: 'won', label: 'Won' },
            { value: 'lost', label: 'Lost' }
          ];
          return (
            <div style={{ minWidth: '130px' }}>
              <CustomSelect 
                options={statusOptions}
                value={getSelectValue(row.status, statusOptions)}
                onChange={(selected) => handleInlineUpdate(row, 'status', selected.value)}
                menuPortalTarget={document.body}
                menuPosition="fixed"
                autoFocus
                defaultMenuIsOpen
                onBlur={() => setEditingCell({ rowId: null, field: null })}
              />
            </div>
          );
        }
        return (
          <span 
            className={`badge ${getStatusBadgeClass(row.status)} cursor-pointer`}
            onClick={() => setEditingCell({ rowId: (row._id || row.id), field: 'status' })}
            title="Click to edit"
          >
            {row.status ? row.status.charAt(0).toUpperCase() + row.status.slice(1) : ''}
          </span>
        );
      },
    },
    {
      name: 'Value',
      sortable: true,
      selector: row => row.expected_value,
    },
    {
      name: 'Assigned To',
      sortable: true,
      selector: row => row.assigned_to,
      cell: (row) => {
        const isEditing = editingCell.rowId === (row._id || row.id) && editingCell.field === 'assigned_to';
        const userOptions = users.map(u => ({ value: u._id || u.id, label: u.name }));
        
        if (isEditing) {
          return (
            <div style={{ minWidth: '150px' }}>
              <CustomSelect 
                options={userOptions}
                value={getSelectValue(row.assigned_to, userOptions)}
                onChange={(selected) => handleInlineUpdate(row, 'assigned_to', selected.value)}
                menuPortalTarget={document.body}
                menuPosition="fixed"
                autoFocus
                defaultMenuIsOpen
                onBlur={() => setEditingCell({ rowId: null, field: null })}
              />
            </div>
          );
        }

        const user = users.find(u => (u._id || u.id) === row.assigned_to);
        return (
          <span 
            className="cursor-pointer d-flex align-items-center"
            onClick={() => setEditingCell({ rowId: (row._id || row.id), field: 'assigned_to' })}
            title="Click to edit"
          >
            {user && user.image ? (
              <img src={user.image} alt={user.name} className="avatar avatar-xs rounded-circle me-2 flex-shrink-0" style={{width: '24px', height: '24px', minWidth: '24px', objectFit: 'cover'}} />
            ) : user ? (
              <span className="avatar avatar-xs rounded-circle bg-primary me-2 d-flex justify-content-center align-items-center text-white fw-bold flex-shrink-0" style={{width: '24px', height: '24px', minWidth: '24px', fontSize: '11px'}}>
                {user.name.substring(0, 2).toUpperCase()}
              </span>
            ) : null}
            {user ? user.name : (row.assigned_to || 'Unassigned')}
          </span>
        );
      }
    },
    {
      name: 'Created',
      sortable: true,
      selector: row => row.created_at,
      cell: (row) => (
        <span>{row.created_at ? new Date(row.created_at).toLocaleDateString() : ''}</span>
      ),
    },
    {
      name: 'Action',
      cell: (row) => (
        <div className="action-icon d-inline-flex">
          <Link to="#" className="me-2" onClick={(e) => openEditModal(e, row)}><i className="ti ti-edit"></i></Link>
          <Link to="#" data-bs-toggle="modal" data-bs-target="#delete_modal" onClick={(e) => openDeleteModal(e, row)}><i className="ti ti-trash"></i></Link>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="page-wrapper">
			<div className="content">

				{/* Breadcrumb */}
				<PageHeader 
					title="Leads"
					breadcrumbs={[
						{ label: 'Dashboard' },
						{ label: 'CRM & Sales' },
						{ label: viewMode === 'list' ? 'Leads List' : 'Leads Grid', active: true }
					]}
				>
						<div className="me-2 mb-2">
							<div className="d-flex align-items-center border bg-white rounded p-1 me-2 icon-list">
								<a href="#" onClick={(e) => { e.preventDefault(); setViewMode('list'); }} className={`btn btn-icon btn-sm me-1 ${viewMode === 'list' ? 'active bg-primary text-white' : ''}`}><i
										className="ti ti-list-tree"></i></a>
								<a href="#" onClick={(e) => { e.preventDefault(); setViewMode('grid'); }} className={`btn btn-icon btn-sm ${viewMode === 'grid' ? 'active bg-primary text-white' : ''}`}><i
										className="ti ti-layout-grid"></i></a>
							</div>
						</div>
						
						<div className="me-2 mb-2">
							<a href="#" onClick={handleImportClick} className="btn btn-white d-inline-flex align-items-center">
								<i className="ti ti-file-import me-1"></i>Import
							</a>
              <input 
                type="file" 
                ref={fileInputRef} 
                style={{ display: 'none' }} 
                accept=".csv"
                onChange={handleFileChange} 
              />
						</div>

						<div className="me-2 mb-2">
							<div className="dropdown">
								<a href="#" onClick={(e) => e.preventDefault()}
									className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
									data-bs-toggle="dropdown">
									<i className="ti ti-file-export me-1"></i>Export
								</a>
								<ul className="dropdown-menu  dropdown-menu-end p-3">
									<li>
										<a href="#" onClick={exportToPDF} className="dropdown-item rounded-1"><i
												className="ti ti-file-type-pdf me-1"></i>Export as PDF</a>
									</li>
									<li>
										<a href="#" onClick={exportToExcel} className="dropdown-item rounded-1"><i
												className="ti ti-file-type-xls me-1"></i>Export as Excel </a>
									</li>
								</ul>
							</div>
						</div>
						<div className="mb-2">
							<a href="#" onClick={openAddModal}
								className="btn btn-primary d-flex align-items-center"><i
									className="ti ti-circle-plus me-2"></i>Add Lead</a>
						</div>
						
				</PageHeader>
				{/* /Breadcrumb */}

				<div className="row">
					<div className="col-xl-3 col-md-6">
						<div className="card position-relative">
							<div className="card-body">
								<div className="d-flex align-items-center mb-3">
									<div className="avatar avatar-md br-10 icon-rotate bg-primary flex-shrink-0">
										<span className="d-flex align-items-center"><i
												className="ti ti-delta text-white fs-16"></i></span>
									</div>
									<div className="ms-3">
										<p className="fw-medium text-truncate mb-1">Total No of Leads</p>
										<h5>{stats.total_leads?.count || 0}</h5>
									</div>
								</div>
								<div className="progress progress-xs mb-2">
									<div className="progress-bar bg-primary" role="progressbar" style={{width: '40%'}}></div>
								</div>
								{renderStatChange(stats.total_leads)}
							</div>
						</div>
					</div>
					<div className="col-xl-3 col-md-6">
						<div className="card position-relative">
							<div className="card-body">
								<div className="d-flex align-items-center mb-3">
									<div className="avatar avatar-md br-10 icon-rotate bg-secondary flex-shrink-0">
										<span className="d-flex align-items-center"><i
												className="ti ti-currency text-white fs-16"></i></span>
									</div>
									<div className="ms-3">
										<p className="fw-medium text-truncate mb-1">No of New Leads</p>
										<h5>{stats.new_leads?.count || 0}</h5>
									</div>
								</div>
								<div className="progress progress-xs mb-2">
									<div className="progress-bar bg-secondary" role="progressbar" style={{width: '40%'}}></div>
								</div>
								{renderStatChange(stats.new_leads)}
							</div>
						</div>
					</div>
					<div className="col-xl-3 col-md-6">
						<div className="card position-relative">
							<div className="card-body">
								<div className="d-flex align-items-center mb-3">
									<div className="avatar avatar-md br-10 icon-rotate bg-danger flex-shrink-0">
										<span className="d-flex align-items-center"><i
												className="ti ti-stairs-up text-white fs-16"></i></span>
									</div>
									<div className="ms-3">
										<p className="fw-medium text-truncate mb-1">No of Lost Leads</p>
										<h5>{stats.lost_leads?.count || 0}</h5>
									</div>
								</div>
								<div className="progress progress-xs mb-2">
									<div className="progress-bar bg-pink" role="progressbar" style={{width: '40%'}}></div>
								</div>
								{renderStatChange(stats.lost_leads)}
							</div>
						</div>
					</div>
					<div className="col-xl-3 col-md-6">
						<div className="card position-relative">
							<div className="card-body">
								<div className="d-flex align-items-center mb-3">
									<div className="avatar avatar-md br-10 icon-rotate bg-purple flex-shrink-0">
										<span className="d-flex align-items-center"><i
												className="ti ti-users-group text-white fs-16"></i></span>
									</div>
									<div className="ms-3">
										<p className="fw-medium text-truncate mb-1">No of Qualified Leads</p>
										<h5>{stats.qualified_leads?.count || 0}</h5>
									</div>
								</div>
								<div className="progress progress-xs mb-2">
									<div className="progress-bar bg-purple" role="progressbar" style={{width: '40%'}}></div>
								</div>
								{renderStatChange(stats.qualified_leads)}
							</div>
						</div>
					</div>
				</div>

				{/* Leads List */}
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
							-ms-overflow-style: none;  /* IE and Edge */
							scrollbar-width: none;  /* Firefox */
							height: 100%;
						}
						.sidebar-scroll::-webkit-scrollbar {
							display: none; /* Chrome, Safari and Opera */
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
					<div className="col-xl-2 d-none d-xl-block"></div>
					<div className="col-xl-2 position-absolute h-100 start-0 top-0 sidebar-wrapper pb-xl-4">
						<div className="card h-100 mb-0">
							<div className="card-body p-3 sidebar-scroll">
								<h6 className="fw-semibold text-muted mb-3 text-uppercase fs-12" style={{ letterSpacing: '0.5px' }}>Lead Statuses</h6>
								<ul className="list-unstyled mb-3">
                  {renderSidebarItem('All', leads.length, activeStatusFilter, setActiveStatusFilter)}
                  {renderSidebarItem('New', statusCounts['new'], activeStatusFilter, setActiveStatusFilter)}
                  {renderSidebarItem('Contacted', statusCounts['contacted'], activeStatusFilter, setActiveStatusFilter)}
                  {renderSidebarItem('Qualified', statusCounts['qualified'], activeStatusFilter, setActiveStatusFilter)}
                  {renderSidebarItem('Negotiation', statusCounts['negotiation'], activeStatusFilter, setActiveStatusFilter)}
                  {renderSidebarItem('Won', statusCounts['won'], activeStatusFilter, setActiveStatusFilter)}
                  {renderSidebarItem('Lost', statusCounts['lost'], activeStatusFilter, setActiveStatusFilter)}
								</ul>

								<hr className="my-3 border-dark" />

								<h6 className="fw-semibold text-muted mb-3 text-uppercase fs-12" style={{ letterSpacing: '0.5px' }}>Sources</h6>
								<ul className="list-unstyled mb-3">
                  {renderSidebarItem('All', leads.length, activeSourceFilter, setActiveSourceFilter)}
                  {renderSidebarItem('Google ads', sourceCounts['google ads'], activeSourceFilter, setActiveSourceFilter)}
                  {renderSidebarItem('Linkedin', sourceCounts['linkedin'], activeSourceFilter, setActiveSourceFilter)}
                  {renderSidebarItem('Website', sourceCounts['website'], activeSourceFilter, setActiveSourceFilter)}
                  {renderSidebarItem('Referral', sourceCounts['referral'], activeSourceFilter, setActiveSourceFilter)}
                  {renderSidebarItem('Whatsapp', sourceCounts['whatsapp'], activeSourceFilter, setActiveSourceFilter)}
								</ul>

								<hr className="my-3 border-dark" />

								<h6 className="fw-semibold text-muted mb-3 text-uppercase fs-12" style={{ letterSpacing: '0.5px' }}>Lead Tags</h6>
								<ul className="list-unstyled mb-0">
                  {renderSidebarItem('All', leads.length, activeTagFilter, setActiveTagFilter)}
                  {renderSidebarItem('IT', tagCounts['it'], activeTagFilter, setActiveTagFilter)}
                  {renderSidebarItem('vip', tagCounts['vip'], activeTagFilter, setActiveTagFilter)}
                  {renderSidebarItem('urgent', tagCounts['urgent'], activeTagFilter, setActiveTagFilter)}
                  {renderSidebarItem('warm', tagCounts['warm'], activeTagFilter, setActiveTagFilter)}
								</ul>
							</div>
						</div>
					</div>
					
					<div className="col-xl-10 d-flex flex-column">
						<div className="card flex-fill">
					
					<div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
						<h5>Leads List</h5>
						<div className="d-flex my-xl-auto right-content align-items-center flex-wrap row-gap-3">
							<div className="me-3">
								<CustomDatePicker 
									isRange={true} 
									placeholderText="Select Date Range" 
                  startDate={startDate}
                  endDate={endDate}
                  onChange={(update) => setDateRange(update)}
								/>
							</div>
							<div className="dropdown">
								<Link to="#"
									className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
									data-bs-toggle="dropdown">
									Sort By: {sortBy}
								</Link>
								<ul className="dropdown-menu  dropdown-menu-end p-3">
									<li>
										<Link to="#" onClick={(e) => { e.preventDefault(); setSortBy('Recently Added'); }} className="dropdown-item rounded-1">Recently Added</Link>
									</li>
									<li>
										<Link to="#" onClick={(e) => { e.preventDefault(); setSortBy('Ascending'); }} className="dropdown-item rounded-1">Ascending (A-Z)</Link>
									</li>
									<li>
										<Link to="#" onClick={(e) => { e.preventDefault(); setSortBy('Descending'); }} className="dropdown-item rounded-1">Descending (Z-A)</Link>
									</li>
									<li>
										<Link to="#" onClick={(e) => { e.preventDefault(); setSortBy('Last 7 Days'); }} className="dropdown-item rounded-1">Last 7 Days</Link>
									</li>
								</ul>
							</div>
              {hasActiveFilters && (
                <div className="ms-2">
                  <button onClick={clearFilters} className="btn btn-outline-danger d-inline-flex align-items-center">
                    Clear
                  </button>
                </div>
              )}
						</div>
					</div>
							<div className="card-body p-0">
								{viewMode === 'list' ? (
									<div className="custom-datatable-filter table-responsive">
										<CustomDataTable columns={columns} data={filteredLeads} />
									</div>
								) : (
									<div className="p-3 sidebar-scroll" style={{ overflowY: 'hidden', overflowX: 'auto', minHeight: '600px' }}>
										<LeadsKanbanView 
                      data={filteredLeads} 
                      users={users}
                      onInlineUpdate={handleInlineUpdate}
                      onEdit={openEditModal}
                      onDelete={openDeleteModal}
                      getStatusBadgeClass={getStatusBadgeClass}
                    />
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
				
				{/* /Leads List */}

			</div>

			<div className="footer d-sm-flex align-items-center justify-content-between border-top bg-white p-3">
				<p className="mb-0">2014 - 2026 &copy; SmartHR.</p>
				<p>Designed &amp; Developed By <a href="#" onClick={(e) => e.preventDefault()} className="text-primary">Dreams</a></p>
			</div>
</div>
	
		<LeadFormModal 
      open={isLeadModalOpen} 
      onClose={() => setIsLeadModalOpen(false)} 
      mode={modalMode}
      leadData={selectedLead}
      onSuccess={fetchLeadsAndUsers}
    />
    <ConfirmationModal 
      id="delete_modal"
      onConfirm={handleDelete}
      title="Delete Lead"
      description={`Are you sure you want to delete lead "${selectedLead?.lead_name}"? This action cannot be undone.`}
    />
    </>
  );
};

export default Leads;
