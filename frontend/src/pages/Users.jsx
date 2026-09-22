import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/common/PageHeader';
import { mockUsers } from './usersData';
import UserFormModal from '../components/users/UserFormModal';
import UserDetailsModal from '../components/users/UserDetailsModal';

const Users = () => {
  const [users, setUsers] = useState(mockUsers);
  const [expanded, setExpanded] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  
  const [viewingUser, setViewingUser] = useState(null);

  const [salesTarget, setSalesTarget] = useState('100000');
  const [savingTarget, setSavingTarget] = useState(false);

  // Initialize expanded state so root parents are open by default
  useEffect(() => {
    const defaultExpanded = {};
    users.forEach(u => {
      if (!u.parent_id) {
        defaultExpanded[u.id] = true;
      }
    });
    setExpanded(defaultExpanded);
  }, [users]);

  const handleSaveTarget = () => {
    setSavingTarget(true);
    setTimeout(() => {
      setSavingTarget(false);
      // In a real app, you'd show a toast here
    }, 1000);
  };

  const toggleExpand = (userId) => {
    setExpanded(prev => ({ ...prev, [userId]: !prev[userId] }));
  };

  const handleOpenAddModal = () => {
    setEditingUser(null);
    setIsFormModalOpen(true);
  };

  const handleOpenEditModal = (user) => {
    setEditingUser(user);
    setIsFormModalOpen(true);
  };

  const handleDeleteUser = (userId) => {
    if(window.confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter(u => u.id !== userId && u.parent_id !== userId));
    }
  };

  const handleSaveUser = (userData) => {
    if (editingUser) {
      setUsers(users.map(u => u.id === editingUser.id ? { ...userData, id: editingUser.id } : u));
    } else {
      setUsers([...users, { ...userData, id: Date.now(), avatar: '/assets/img/profiles/avatar-14.jpg' }]);
    }
  };

  // Filter Data first
  const filteredUsers = users.filter(u => {
    let match = true;
    if (searchQuery && !u.name.toLowerCase().includes(searchQuery.toLowerCase()) && !u.email.toLowerCase().includes(searchQuery.toLowerCase())) {
      match = false;
    }
    if (roleFilter && u.role !== roleFilter) match = false;
    if (statusFilter && u.status !== statusFilter) match = false;
    return match;
  });

  // Build Hierarchy
  const buildHierarchy = (userList) => {
    const map = {};
    const roots = [];

    userList.forEach(u => {
      map[u.id] = { ...u, children: [] };
    });

    userList.forEach(u => {
      if (u.parent_id && u.parent_id !== u.id && map[u.parent_id]) {
        map[u.parent_id].children.push(map[u.id]);
      } else {
        roots.push(map[u.id]);
      }
    });

    return roots;
  };

  const renderUserRow = (user, depth = 0) => {
    const hasChildren = user.children && user.children.length > 0;
    const isExpanded = !!expanded[user.id];
    
    // Padding based on depth to show hierarchy
    const paddingLeft = depth * 40 + 20;

    return (
      <div key={user.id}>
        <div 
          className="d-flex align-items-center py-3 border-bottom"
          style={{ 
            background: isExpanded && depth === 0 ? "rgba(255,155,68,0.03)" : (depth > 0 ? "rgba(0,0,0,0.01)" : "transparent"),
            transition: 'background 0.2s ease'
          }}
        >
          {/* Expand Toggle & User Info (Avatar, Name, Email) */}
          <div className="d-flex align-items-center" style={{ width: '35%', paddingLeft: `${paddingLeft}px` }}>
            <div style={{ width: '30px' }} className="me-2 text-center flex-shrink-0">
              {hasChildren ? (
                <button 
                  className="btn btn-sm btn-icon btn-white border-0" 
                  onClick={() => toggleExpand(user.id)}
                >
                  <i className={`ti ${isExpanded ? 'ti-chevron-down' : 'ti-chevron-right'} text-gray-5`}></i>
                </button>
              ) : (
                <span style={{ width: '30px', display: 'inline-block' }}></span>
              )}
            </div>
            
            <div className="d-flex align-items-center file-name-icon text-truncate">
              <span className="avatar avatar-md border avatar-rounded me-3 flex-shrink-0">
                <img src={user.avatar || "/assets/img/profiles/avatar-14.jpg"} className="img-fluid" alt="img" />
              </span>
              <div className="ms-1 text-truncate">
                <h6 className="fw-semibold text-dark mb-1 text-truncate">{user.name}</h6>
                <span className="fs-13 fw-normal text-muted text-truncate d-block">{user.email}</span>
              </div>
            </div>
          </div>

          {/* Role */}
          <div style={{ width: '15%' }}>
            <span className="badge bg-primary-transparent px-3 py-1 rounded-pill fw-medium text-capitalize" style={{ fontSize: '12px' }}>
              {user.role}
            </span>
          </div>

          {/* Password */}
          <div style={{ width: '20%' }} className="d-flex align-items-center text-muted">
            <span className="me-3 fs-14 mt-1">********</span>
            <button className="btn btn-icon btn-sm btn-white border-0 text-muted">
              <i className="ti ti-eye fs-16"></i>
            </button>
          </div>

          {/* Actions */}
          <div style={{ width: '30%' }} className="text-end pe-4">
            <div className="d-inline-flex align-items-center gap-3">
              <Link to="#" className="text-dark fw-medium fs-14" onClick={(e) => { e.preventDefault(); setViewingUser(user); }}>View</Link>
              <Link to="#" className="text-dark fw-medium fs-14" onClick={(e) => { e.preventDefault(); handleOpenEditModal(user); }}>Edit</Link>
              
              <button 
                className={`btn btn-sm px-3 rounded-pill fw-medium ${user.status === 'Active' ? 'btn-outline-danger' : 'btn-outline-success'}`}
                style={{ minWidth: '95px' }}
                onClick={() => {
                  setUsers(users.map(u => u.id === user.id ? { ...u, status: u.status === 'Active' ? 'Inactive' : 'Active' } : u));
                }}
              >
                {user.status === 'Active' ? 'Deactivate' : 'Activate'}
              </button>
              
              <button 
                className="btn btn-danger btn-sm px-3 rounded-pill fw-medium"
                onClick={() => handleDeleteUser(user.id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
        
        {/* Render Children if expanded */}
        {isExpanded && hasChildren && (
          <div className="hierarchy-children">
            {user.children.map(child => renderUserRow(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  const hierarchicalUsers = buildHierarchy(filteredUsers);

  return (
    <>
      <div className="page-wrapper">
        <div className="content">

          {/* Breadcrumb */}
          <PageHeader 
            title="User Management"
            breadcrumbs={[
              { label: 'Admin Console' },
              { label: 'User Management', active: true }
            ]}
          >
           
            <div className="mb-2">
              <button onClick={handleOpenAddModal}
                className="btn btn-primary d-flex align-items-center"><i
                  className="ti ti-circle-plus me-2"></i>Add User</button>
            </div>
          </PageHeader>
          
          {/* Sales Target Card */}
          <div className="card border-0 mb-4">
            <div className="card-body p-4 d-flex align-items-center justify-content-between flex-wrap gap-3">
              <div>
                <h5 className="mb-1">Monthly Sales Target</h5>
                <p className="text-muted mb-0 fs-13">Set the overarching sales target for the organization.</p>
              </div>
              <div className="d-flex align-items-center gap-2">
                <div className="input-group">
                  <span className="input-group-text bg-light border-end-0 text-muted">₹</span>
                  <input 
                    type="number" 
                    className="form-control border-start-0 ps-0" 
                    value={salesTarget} 
                    onChange={(e) => setSalesTarget(e.target.value)}
                    style={{ maxWidth: '200px' }}
                  />
                </div>
                <button 
                  className="btn btn-primary d-flex align-items-center text-nowrap" 
                  onClick={handleSaveTarget}
                  disabled={savingTarget}
                >
                  {savingTarget ? (
                    <><span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Saving...</>
                  ) : (
                    <><i className="ti ti-device-floppy me-2"></i> Save Target</>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Users Hierarchy List */}
          <div className="card">
            <div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
              <h5 className="mb-0">Users Hierarchy</h5>
              <div className="d-flex my-xl-auto right-content align-items-center flex-wrap row-gap-3">
                <div className="me-3">
                  <div className="input-icon-start position-relative">
                    <span className="input-icon-addon">
                      <i className="ti ti-search"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      placeholder="Search users..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="dropdown me-3">
                  <a href="#" className="dropdown-toggle btn btn-sm btn-white d-inline-flex align-items-center" data-bs-toggle="dropdown">
                    {roleFilter ? roleFilter : 'All Roles'}
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end p-3">
                    <li><a href="#" onClick={(e) => { e.preventDefault(); setRoleFilter(''); }} className="dropdown-item rounded-1">All Roles</a></li>
                    <li><a href="#" onClick={(e) => { e.preventDefault(); setRoleFilter('Super Admin'); }} className="dropdown-item rounded-1">Super Admin</a></li>
                    <li><a href="#" onClick={(e) => { e.preventDefault(); setRoleFilter('manager'); }} className="dropdown-item rounded-1">Manager</a></li>
                    <li><a href="#" onClick={(e) => { e.preventDefault(); setRoleFilter('sales'); }} className="dropdown-item rounded-1">Sales</a></li>
                  </ul>
                </div>
                
                <div className="dropdown">
                  <a href="#" className="dropdown-toggle btn btn-sm btn-white d-inline-flex align-items-center" data-bs-toggle="dropdown">
                    {statusFilter ? statusFilter : 'All Status'}
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end p-3">
                    <li><a href="#" onClick={(e) => { e.preventDefault(); setStatusFilter(''); }} className="dropdown-item rounded-1">All Status</a></li>
                    <li><a href="#" onClick={(e) => { e.preventDefault(); setStatusFilter('Active'); }} className="dropdown-item rounded-1">Active</a></li>
                    <li><a href="#" onClick={(e) => { e.preventDefault(); setStatusFilter('Inactive'); }} className="dropdown-item rounded-1">Inactive</a></li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="card-body p-0">
              {/* Hierarchy Headers */}
              <div className="d-flex align-items-center py-3 bg-light border-bottom text-muted fw-semibold fs-13">
                <div style={{ width: '35%', paddingLeft: '20px' }}>User Details</div>
                <div style={{ width: '15%' }}>Role</div>
                <div style={{ width: '20%' }}>Password</div>
                <div style={{ width: '30%' }} className="text-end pe-4">Actions</div>
              </div>

              {/* Hierarchy Body */}
              <div className="hierarchy-list-container">
                {hierarchicalUsers.length > 0 ? (
                  hierarchicalUsers.map(user => renderUserRow(user))
                ) : (
                  <div className="text-center p-5 text-muted">
                    No users found matching your search.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <UserFormModal 
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        initialData={editingUser}
        onSave={handleSaveUser}
      />
      
      <UserDetailsModal
        user={viewingUser}
        onClose={() => setViewingUser(null)}
      />
    </>
  );
};

export default Users;
