import React, { useState, useEffect } from 'react';
import PageHeader from '../components/common/PageHeader';
import axiosClient from '../api/axiosClient';
import toast from 'react-hot-toast';

import { menuConfig as NAV_SECTIONS } from '../config/menuConfig';

const DEFAULT_ROLES = ["admin", "manager", "HR"];

const getEmptyPermissions = () => {
  const perms = {};
  NAV_SECTIONS.forEach(section => {
    section.items.forEach(item => {
      if (item.subMenu) {
        item.subMenu.forEach(subItem => {
          perms[subItem.path] = { view: false, add: false, edit: false, delete: false };
        });
      } else {
        perms[item.path] = { view: false, add: false, edit: false, delete: false };
      }
    });
  });
  // Default allow dashboard view
  perms['/dashboard'].view = true;
  return perms;
};

const RolesPermissions = () => {
  const [roles, setRoles] = useState(DEFAULT_ROLES);
  const [selectedRole, setSelectedRole] = useState(DEFAULT_ROLES[0]);
  const [presets, setPresets] = useState({});
  const [currentPermissions, setCurrentPermissions] = useState(getEmptyPermissions());
  
  // Custom role modal
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [newRoleName, setNewRoleName] = useState('');
  
  // Rename role modal
  const [showRenameModal, setShowRenameModal] = useState(false);
  const [roleToRename, setRoleToRename] = useState('');
  const [renameInputValue, setRenameInputValue] = useState('');
  
  // Confirm delete modal
  const [confirmDeleteModal, setConfirmDeleteModal] = useState({ isOpen: false, roleName: null });

  // Add custom styles for theme-colored checkboxes and hidden scrollbar
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      .custom-primary-checkbox {
        color: inherit;
      }
      .custom-primary-checkbox:checked {
        background-color: currentColor !important;
        border-color: currentColor !important;
      }
      .custom-primary-checkbox:focus {
        border-color: currentColor !important;
        box-shadow: none !important;
      }
      .hide-scrollbar::-webkit-scrollbar {
        display: none;
      }
      .hide-scrollbar {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  // Initialize data from backend
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const res = await axiosClient.get('/roles/presets');
        const mockPresets = {
          "admin": { ...getEmptyPermissions() },
          "manager": { ...getEmptyPermissions() },
          "HR": { ...getEmptyPermissions() }
        };
        
        let fetchedRolesList = [];
        if (res && res.length > 0) {
          res.forEach(preset => {
            mockPresets[preset.role_name] = preset.permissions;
            if (!DEFAULT_ROLES.map(r => r.toLowerCase()).includes(preset.role_name.toLowerCase())) {
              fetchedRolesList.push(preset.role_name);
            }
          });
        }
        
        setPresets(mockPresets);
        
        // Remove duplicates case-insensitively
        const baseRolesLower = DEFAULT_ROLES.map(r => r.toLowerCase());
        const uniqueFetched = fetchedRolesList.filter(r => !baseRolesLower.includes(r.toLowerCase()));
        setRoles([...DEFAULT_ROLES, ...uniqueFetched]);
        
      } catch (err) {
        console.error("Failed to fetch roles", err);
        toast.error("Failed to load roles");
      }
    };
    fetchRoles();
  }, []);

  // Update permissions when role changes
  useEffect(() => {
    if (presets[selectedRole]) {
      setCurrentPermissions(JSON.parse(JSON.stringify(presets[selectedRole])));
    } else {
      setCurrentPermissions(getEmptyPermissions());
    }
  }, [selectedRole, presets]);

  const handlePermissionChange = (path, action, checked) => {
    setCurrentPermissions(prev => ({
      ...prev,
      [path]: {
        ...prev[path],
        [action]: checked
      }
    }));
  };

  const areAllSelected = (section, type) => {
    return section.items.every(item => {
      if (item.subMenu) {
        return item.subMenu.every(subItem => currentPermissions[subItem.path]?.[type]);
      }
      return currentPermissions[item.path]?.[type];
    });
  };

  const handleSelectAll = (section, type, isChecked) => {
    const updated = { ...currentPermissions };
    section.items.forEach(item => {
      if (item.subMenu) {
        item.subMenu.forEach(subItem => {
          if (!updated[subItem.path]) updated[subItem.path] = {};
          updated[subItem.path][type] = isChecked;
        });
      } else {
        if (!updated[item.path]) updated[item.path] = {};
        updated[item.path][type] = isChecked;
      }
    });
    setCurrentPermissions(updated);
  };

  const handleMasterAll = (checked) => {
    const updated = { ...currentPermissions };
    Object.keys(updated).forEach(path => {
      updated[path] = { view: checked, add: checked, edit: checked, delete: checked };
    });
    setCurrentPermissions(updated);
  };

  const isMasterAllChecked = () => {
    if (Object.keys(currentPermissions).length === 0) return false;
    return Object.values(currentPermissions).every(p => p.view && p.add && p.edit && p.delete);
  };

  const handleSave = async () => {
    try {
      await axiosClient.put(`/roles/presets/${selectedRole}`, {
        role_name: selectedRole,
        permissions: currentPermissions
      });
      setPresets(prev => ({
        ...prev,
        [selectedRole]: currentPermissions
      }));
      toast.success(`Permissions for ${selectedRole} saved successfully!`);
    } catch (err) {
      toast.error(err.response?.data?.detail || "Failed to save permissions");
    }
  };

  const handleCreateCustomRole = async (e) => {
    e.preventDefault();
    if (!newRoleName.trim()) return;
    
    const roleName = newRoleName.trim();
    if (roles.includes(roleName)) {
      alert("Role already exists!");
      return;
    }
    
    const emptyPerms = getEmptyPermissions();
    try {
      await axiosClient.put(`/roles/presets/${roleName}`, {
        role_name: roleName,
        permissions: emptyPerms
      });
      
      setRoles([...roles, roleName]);
      setPresets(prev => ({
        ...prev,
        [roleName]: emptyPerms
      }));
      setNewRoleName('');
      setShowRoleModal(false);
      setSelectedRole(roleName);
      toast.success(`Custom role ${roleName} created!`);
    } catch (err) {
      toast.error(err.response?.data?.detail || "Failed to create custom role");
    }
  };

  const handleDeleteRoleClick = (roleName, e) => {
    e.stopPropagation();
    setConfirmDeleteModal({ isOpen: true, roleName });
  };

  const confirmDeleteRole = async () => {
    const roleName = confirmDeleteModal.roleName;
    if (!roleName) return;
    
    try {
      await axiosClient.delete(`/roles/presets/${roleName}`);
      setRoles(roles.filter(r => r !== roleName));
      const newPresets = { ...presets };
      delete newPresets[roleName];
      setPresets(newPresets);
      if (selectedRole === roleName) {
        setSelectedRole(DEFAULT_ROLES[0]);
      }
      toast.success(`Role ${roleName} deleted successfully`);
    } catch (err) {
      toast.error(err.response?.data?.detail || "Failed to delete role");
    } finally {
      setConfirmDeleteModal({ isOpen: false, roleName: null });
    }
  };

  const handleOpenRenameModal = (roleName, e) => {
    e.stopPropagation();
    setRoleToRename(roleName);
    setRenameInputValue(roleName);
    setShowRenameModal(true);
  };

  const handleRenameRole = async (e) => {
    e.preventDefault();
    if (!renameInputValue.trim() || renameInputValue.trim() === roleToRename) {
      setShowRenameModal(false);
      return;
    }
    
    const newName = renameInputValue.trim();
    if (roles.includes(newName)) {
      alert("A role with this name already exists!");
      return;
    }
    
    try {
      await axiosClient.put(`/roles/presets/${roleToRename}/rename`, {
        new_role_name: newName
      });
      
      setRoles(roles.map(r => r === roleToRename ? newName : r));
      const newPresets = { ...presets };
      newPresets[newName] = newPresets[roleToRename];
      delete newPresets[roleToRename];
      setPresets(newPresets);
      
      if (selectedRole === roleToRename) {
        setSelectedRole(newName);
      }
      
      setShowRenameModal(false);
      toast.success(`Role renamed to ${newName}`);
    } catch (err) {
      toast.error(err.response?.data?.detail || "Failed to rename role");
    }
  };

  return (
    <div className="page-wrapper">
      <div className="content">
        <PageHeader 
          title="Roles & Permissions"
          breadcrumbs={[
            { label: 'Dashboard' },
            { label: 'Admin Console' },
            { label: 'Roles & Permissions', active: true }
          ]}
        >
          <div className="mb-2">
            <button 
              className="btn btn-primary d-flex align-items-center"
              onClick={() => setShowRoleModal(true)}
            >
              <i className="ti ti-circle-plus me-2"></i>Add Custom Role
            </button>
          </div>
        </PageHeader>

        <div className="row">
          {/* Roles Sidebar */}
          <div className="col-md-3 mb-1">
            <div className="card d-flex flex-column" style={{ height: 'calc(100vh - 220px)', minHeight: '600px' }}>
              <div className="card-header bg-light pb-3 border-bottom">
                <h6 className="card-title mb-0 fs-15 fw-bold text-dark">System Roles</h6>
              </div>
              <div className="card-body d-flex flex-column" style={{ overflow: 'hidden' }}>
                <div className="d-flex flex-column gap-2 hide-scrollbar" style={{ overflowY: 'auto', flexGrow: 1, paddingRight: '5px' }}>
                  {roles.map(role => (
                    <div
                      key={role}
                      className={`btn d-flex justify-content-between align-items-center w-100 ${selectedRole === role ? 'btn-primary' : 'btn-light text-dark'}`}
                      onClick={() => setSelectedRole(role)}
                      style={{ padding: '10px 15px', borderRadius: '6px', cursor: 'pointer' }}
                    >
                      <span className="text-capitalize text-start">{role}</span>
                      {!DEFAULT_ROLES.includes(role) && (
                        <div className="d-flex gap-2">
                          <i 
                            className="ti ti-edit fs-16 text-muted hover-text-white" 
                            style={{ cursor: 'pointer' }}
                            onClick={(e) => handleOpenRenameModal(role, e)}
                            title="Edit Role Name"
                          ></i>
                          <i 
                            className="ti ti-trash fs-16 text-danger hover-text-white" 
                            style={{ cursor: 'pointer' }}
                            onClick={(e) => handleDeleteRoleClick(role, e)}
                            title="Delete Role"
                          ></i>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                
                <div className="mt-3 p-3 rounded bg-light text-muted" style={{ fontSize: '13px', flexShrink: 0 }}>
                  Select a role to configure its default permission preset. These permissions will be automatically applied when creating a new user with this role.
                </div>
              </div>
            </div>
          </div>

          {/* Permissions Grid */}
          <div className="col-md-9 mb-1">
            <div className="card d-flex flex-column" style={{ height: 'calc(100vh - 220px)', minHeight: '600px' }}>
              <div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3 border-bottom">
                <h5 className="mb-0 fs-16 fw-bold">
                  Permissions Matrix: <span className="text-primary">{selectedRole}</span>
                </h5>
                <div className="d-flex align-items-center gap-3">
                  <div className="form-check d-flex align-items-center mb-0">
                    <input 
                      className="form-check-input border-primary me-2 mt-0 text-primary custom-primary-checkbox" 
                      type="checkbox" 
                      id="master-all"
                      checked={isMasterAllChecked()}
                      onChange={(e) => handleMasterAll(e.target.checked)}
                      style={{ cursor: 'pointer' }}
                    />
                    <label className="form-check-label fw-bold text-primary mb-0" htmlFor="master-all" style={{ cursor: 'pointer' }}>
                      Master All
                    </label>
                  </div>
                  <button className="btn btn-primary btn-sm px-4 rounded-pill" onClick={handleSave}>
                    Save Changes
                  </button>
                </div>
              </div>

              <div className="card-body p-0 d-flex flex-column" style={{ overflow: 'hidden' }}>
                <div className="table-responsive hide-scrollbar" style={{ overflowY: "auto", flexGrow: 1 }}>
                  <table className="table table-bordered align-middle table-sm m-0 border-0" style={{ fontSize: '14px' }}>
                    <thead className="sticky-top bg-white" style={{ zIndex: 1, boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}>
                      <tr>
                        <th className="bg-light text-dark fw-semibold py-3 border-start-0">Module / Page</th>
                        <th className="bg-light text-center fw-semibold py-3" style={{ width: '80px' }}>View</th>
                        <th className="bg-light text-center fw-semibold py-3" style={{ width: '80px' }}>Add</th>
                        <th className="bg-light text-center fw-semibold py-3" style={{ width: '80px' }}>Edit</th>
                        <th className="bg-light text-center fw-semibold py-3" style={{ width: '80px' }}>Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {NAV_SECTIONS.map((section) => (
                        <React.Fragment key={section.id}>
                          {/* Section Header Row */}
                          <tr style={{ backgroundColor: 'var(--custom-hover-bg, #f8f9fa)' }}>
                            <td className="fw-semibold text-dark border-start-0 py-2">
                              <i className={`${section.icon} me-2`}></i> {section.title}
                            </td>
                            <td className="text-center py-2">
                              <input type="checkbox" className="form-check-input text-primary custom-primary-checkbox" checked={areAllSelected(section, 'view')} onChange={(e) => handleSelectAll(section, 'view', e.target.checked)} style={{ cursor: 'pointer' }} />
                            </td>
                            <td className="text-center py-2">
                              <input type="checkbox" className="form-check-input text-primary custom-primary-checkbox" checked={areAllSelected(section, 'add')} onChange={(e) => handleSelectAll(section, 'add', e.target.checked)} style={{ cursor: 'pointer' }} />
                            </td>
                            <td className="text-center py-2">
                              <input type="checkbox" className="form-check-input text-primary custom-primary-checkbox" checked={areAllSelected(section, 'edit')} onChange={(e) => handleSelectAll(section, 'edit', e.target.checked)} style={{ cursor: 'pointer' }} />
                            </td>
                            <td className="text-center py-2 border-end-0">
                              <input type="checkbox" className="form-check-input text-primary custom-primary-checkbox" checked={areAllSelected(section, 'delete')} onChange={(e) => handleSelectAll(section, 'delete', e.target.checked)} style={{ cursor: 'pointer' }} />
                            </td>
                          </tr>
                          
                          {/* Sub-items rows */}
                          {section.items.map((item) => {
                            if (item.subMenu) {
                              return (
                                <React.Fragment key={item.label}>
                                  <tr key={item.label} style={{ backgroundColor: 'var(--custom-bg, #fff)' }}>
                                    <td className="ps-4 fw-medium text-dark py-2 border-start-0 border-end-0">
                                      {item.label}
                                    </td>
                                    <td colSpan="4" className="border-start-0 border-end-0"></td>
                                  </tr>
                                  {item.subMenu.map(subItem => (
                                    <tr key={subItem.path}>
                                      <td className="ps-5 text-muted py-2 border-start-0">
                                        {subItem.label}
                                      </td>
                                      <td className="text-center py-2">
                                        <input type="checkbox" className="form-check-input text-primary custom-primary-checkbox" checked={currentPermissions[subItem.path]?.view || false} onChange={(e) => handlePermissionChange(subItem.path, 'view', e.target.checked)} style={{ cursor: 'pointer' }} />
                                      </td>
                                      <td className="text-center py-2">
                                        <input type="checkbox" className="form-check-input text-primary custom-primary-checkbox" checked={currentPermissions[subItem.path]?.add || false} onChange={(e) => handlePermissionChange(subItem.path, 'add', e.target.checked)} style={{ cursor: 'pointer' }} />
                                      </td>
                                      <td className="text-center py-2">
                                        <input type="checkbox" className="form-check-input text-primary custom-primary-checkbox" checked={currentPermissions[subItem.path]?.edit || false} onChange={(e) => handlePermissionChange(subItem.path, 'edit', e.target.checked)} style={{ cursor: 'pointer' }} />
                                      </td>
                                      <td className="text-center py-2 border-end-0">
                                        <input type="checkbox" className="form-check-input text-primary custom-primary-checkbox" checked={currentPermissions[subItem.path]?.delete || false} onChange={(e) => handlePermissionChange(subItem.path, 'delete', e.target.checked)} style={{ cursor: 'pointer' }} />
                                      </td>
                                    </tr>
                                  ))}
                                </React.Fragment>
                              );
                            }
                            
                            return (
                            <tr key={item.path}>
                              <td className="ps-4 text-muted py-2 border-start-0">
                                {item.label}
                              </td>
                              <td className="text-center py-2">
                                <input type="checkbox" className="form-check-input text-primary custom-primary-checkbox" checked={currentPermissions[item.path]?.view || false} onChange={(e) => handlePermissionChange(item.path, 'view', e.target.checked)} style={{ cursor: 'pointer' }} />
                              </td>
                              <td className="text-center py-2">
                                <input type="checkbox" className="form-check-input text-primary custom-primary-checkbox" checked={currentPermissions[item.path]?.add || false} onChange={(e) => handlePermissionChange(item.path, 'add', e.target.checked)} style={{ cursor: 'pointer' }} />
                              </td>
                              <td className="text-center py-2">
                                <input type="checkbox" className="form-check-input text-primary custom-primary-checkbox" checked={currentPermissions[item.path]?.edit || false} onChange={(e) => handlePermissionChange(item.path, 'edit', e.target.checked)} style={{ cursor: 'pointer' }} />
                              </td>
                              <td className="text-center py-2 border-end-0">
                                <input type="checkbox" className="form-check-input text-primary custom-primary-checkbox" checked={currentPermissions[item.path]?.delete || false} onChange={(e) => handlePermissionChange(item.path, 'delete', e.target.checked)} style={{ cursor: 'pointer' }} />
                              </td>
                            </tr>
                            );
                          })}
                        </React.Fragment>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Add Role Modal */}
        {showRoleModal && (
          <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Create Custom Role</h5>
                  <button type="button" className="btn-close" onClick={() => setShowRoleModal(false)}></button>
                </div>
                <div className="modal-body">
                  <form onSubmit={handleCreateCustomRole}>
                    <div className="mb-3">
                      <label className="form-label fw-medium">Role Name <span className="text-danger">*</span></label>
                      <input 
                        type="text" 
                        className="form-control" 
                        placeholder="e.g. Content Editor"
                        value={newRoleName}
                        onChange={(e) => setNewRoleName(e.target.value)}
                        required
                        autoFocus
                      />
                    </div>
                    <div className="d-flex justify-content-end gap-2 mt-4">
                      <button type="button" className="btn btn-light" onClick={() => setShowRoleModal(false)}>Cancel</button>
                      <button type="submit" className="btn btn-primary px-4">Create Role</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Rename Role Modal */}
        {showRenameModal && (
          <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Rename Role</h5>
                  <button type="button" className="btn-close" onClick={() => setShowRenameModal(false)}></button>
                </div>
                <div className="modal-body">
                  <form onSubmit={handleRenameRole}>
                    <div className="mb-3">
                      <label className="form-label fw-medium">Role Name <span className="text-danger">*</span></label>
                      <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Enter new role name" 
                        value={renameInputValue}
                        onChange={(e) => setRenameInputValue(e.target.value)}
                        required
                        autoFocus
                      />
                    </div>
                    <div className="d-flex justify-content-end gap-2 mt-4">
                      <button type="button" className="btn btn-light" onClick={() => setShowRenameModal(false)}>Cancel</button>
                      <button type="submit" className="btn btn-primary px-4">Rename Role</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {confirmDeleteModal.isOpen && (
          <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Delete Role</h5>
                  <button type="button" className="btn-close" onClick={() => setConfirmDeleteModal({ isOpen: false, roleName: null })} aria-label="Close"></button>
                </div>
                <div className="modal-body text-center py-4">
                  <i className="ti ti-alert-circle text-danger mb-3" style={{ fontSize: '48px' }}></i>
                  <h5 className="mb-2">Are you sure?</h5>
                  <p className="text-muted mb-0">Do you really want to delete the role <strong>{confirmDeleteModal.roleName}</strong>? This process cannot be undone.</p>
                </div>
                <div className="modal-footer justify-content-center border-0 pt-0">
                  <button type="button" className="btn btn-light me-2" onClick={() => setConfirmDeleteModal({ isOpen: false, roleName: null })}>Cancel</button>
                  <button type="button" className="btn btn-danger" onClick={confirmDeleteRole}>Delete Role</button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default RolesPermissions;
