import React, { useState, useEffect } from 'react';
import PageHeader from '../components/common/PageHeader';

const NAV_SECTIONS = [
  {
    id: "dashboard",
    title: "Dashboard",
    icon: "ti ti-smart-home",
    items: [
      { path: "/dashboard", label: "Main KPI" },
      { path: "/sales", label: "Sales" },
      { path: "/team", label: "Team" },
      { path: "/analytics", label: "Analytics" }
    ]
  },
  {
    id: "crm",
    title: "CRM & Sales",
    icon: "ti ti-target",
    items: [
      { path: "/leads", label: "Leads" },
      { path: "/contacts", label: "Contacts" },
      { path: "/clients", label: "Clients" },
      { path: "/pipeline", label: "Pipeline" }
    ]
  },
  {
    id: "projects",
    title: "Projects",
    icon: "ti ti-briefcase",
    items: [
      { path: "/projects-dashboard", label: "Dashboard" },
      { path: "/all-projects", label: "All Projects" },
      { path: "/project-pipeline", label: "Pipeline Board" },
      { path: "/gantt-chart", label: "Gantt Chart" },
      { path: "/project-report", label: "Reports" }
    ]
  },
  {
    id: "omnichannel",
    title: "Omnichannel Hub",
    icon: "ti ti-message-circle",
    items: [
      { path: "/whatsapp-inbox", label: "WhatsApp > Inbox" },
      { path: "/whatsapp-automation-dashboard", label: "WhatsApp > Automation" },
      { path: "/call-dialer", label: "Call Dialer" },
      { path: "/email-inbox", label: "Email Inbox" },
      { path: "/sms-inbox", label: "SMS Inbox" }
    ]
  },
  {
    id: "ecommerce",
    title: "E-Commerce",
    icon: "ti ti-shopping-cart",
    items: [
      { path: "/orders", label: "Orders" },
      { path: "/customers", label: "Customers" },
      { path: "/products", label: "Products" },
      { path: "/inventory", label: "Inventory" },
      { path: "/abandoned-carts", label: "Abandoned Carts" }
    ]
  },
  {
    id: "finance",
    title: "Finance & Billing",
    icon: "ti ti-file-invoice",
    items: [
      { path: "/billing-dashboard", label: "Billing Dashboard" },
      { path: "/invoices", label: "Invoices" },
      { path: "/quotes", label: "Quotes" },
      { path: "/payments", label: "Payments" },
      { path: "/ledger", label: "Ledger" },
      { path: "/expenses", label: "Expenses" },
      { path: "/gst-reports", label: "GST Reports" }
    ]
  },
  {
    id: "hrms",
    title: "HRMS & Payroll",
    icon: "ti ti-users",
    items: [
      { path: "/hrms-dashboard", label: "HRMS Dashboard" },
      { path: "/directory", label: "Directory" },
      { path: "/attendance", label: "Attendance" },
      { path: "/leaves", label: "Leaves" },
      { path: "/payroll", label: "Payroll" }
    ]
  },
  {
    id: "tasks",
    title: "Tasks & Calendar",
    icon: "ti ti-clipboard-list",
    items: [
      { path: "/task-board", label: "Task Board" },
      { path: "/reminders", label: "Reminders" }
    ]
  },
  {
    id: "admin",
    title: "Admin Console",
    icon: "ti ti-settings",
    items: [
      { path: "/ai-assistant", label: "AI Assistant Hub" },
      { path: "/white-label-settings", label: "White Label Settings" },
      { path: "/integrations-hub", label: "Integrations Hub" },
      { path: "/api-management", label: "API Management" },
      { path: "/user-management", label: "User Management" },
      { path: "/roles-and-permissions", label: "Roles & Permissions" },
      { path: "/audit-log", label: "Audit Logs" },
      { path: "/appearance", label: "Appearance & Theme" }
    ]
  }
];

const DEFAULT_ROLES = ["Admin", "Manager", "HR", "Sales", "Support"];

const getEmptyPermissions = () => {
  const perms = {};
  NAV_SECTIONS.forEach(section => {
    section.items.forEach(item => {
      perms[item.path] = { view: false, add: false, edit: false, delete: false };
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

  // Initialize mock data
  useEffect(() => {
    const mockPresets = {
      "Admin": { ...getEmptyPermissions() },
      "Manager": { ...getEmptyPermissions() },
      "HR": { ...getEmptyPermissions() },
      "Sales": { ...getEmptyPermissions() },
      "Support": { ...getEmptyPermissions() }
    };
    // Make Admin have all true by default
    Object.keys(mockPresets["Admin"]).forEach(path => {
      mockPresets["Admin"][path] = { view: true, add: true, edit: true, delete: true };
    });
    setPresets(mockPresets);
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

  const handlePageAll = (path, checked) => {
    setCurrentPermissions(prev => ({
      ...prev,
      [path]: { view: checked, add: checked, edit: checked, delete: checked }
    }));
  };

  const handleSectionAll = (section, checked) => {
    const updated = { ...currentPermissions };
    section.items.forEach(item => {
      updated[item.path] = { view: checked, add: checked, edit: checked, delete: checked };
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

  const isPageAllChecked = (path) => {
    const p = currentPermissions[path];
    return p?.view && p?.add && p?.edit && p?.delete;
  };

  const isSectionAllChecked = (section) => {
    return section.items.every(item => isPageAllChecked(item.path));
  };

  const isMasterAllChecked = () => {
    if (Object.keys(currentPermissions).length === 0) return false;
    return Object.values(currentPermissions).every(p => p.view && p.add && p.edit && p.delete);
  };

  const handleSave = () => {
    setPresets(prev => ({
      ...prev,
      [selectedRole]: currentPermissions
    }));
    alert(`Permissions for ${selectedRole} saved successfully!`);
  };

  const handleCreateCustomRole = (e) => {
    e.preventDefault();
    if (!newRoleName.trim()) return;
    
    const roleName = newRoleName.trim();
    if (roles.includes(roleName)) {
      alert("Role already exists!");
      return;
    }
    
    setRoles([...roles, roleName]);
    setPresets(prev => ({
      ...prev,
      [roleName]: getEmptyPermissions()
    }));
    setNewRoleName('');
    setShowRoleModal(false);
    setSelectedRole(roleName);
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
                    <button
                      key={role}
                      className={`btn text-start text-capitalize ${selectedRole === role ? 'btn-primary' : 'btn-light text-dark'}`}
                      onClick={() => setSelectedRole(role)}
                      style={{ padding: '10px 15px', borderRadius: '6px' }}
                    >
                      {role}
                    </button>
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
                        <th className="bg-light text-center fw-bold py-3 border-end-0 border-bottom-0 text-primary" style={{ width: '80px' }}>All</th>
                      </tr>
                    </thead>
                    <tbody>
                      {NAV_SECTIONS.map((section) => (
                        <React.Fragment key={section.id}>
                          {/* Section Row */}
                          <tr className="bg-light">
                            <td className="fw-bold text-dark py-2 border-start-0" style={{ fontSize: '13px' }}>
                              <div className="d-flex align-items-center gap-2">
                                <i className={section.icon}></i>
                                {section.title}
                              </div>
                            </td>
                            <td colSpan={4} className="bg-light py-2"></td>
                            <td className="bg-light text-center py-2 border-end-0">
                              <input 
                                type="checkbox" 
                                className="form-check-input border-primary text-primary custom-primary-checkbox" 
                                checked={isSectionAllChecked(section)}
                                onChange={(e) => handleSectionAll(section, e.target.checked)}
                                style={{ cursor: 'pointer' }}
                              />
                            </td>
                          </tr>
                          
                          {/* Page Rows */}
                          {section.items.map((item) => (
                            <tr key={item.path}>
                              <td className="fw-medium ps-4 text-muted py-2 border-start-0" style={{ fontSize: '13px' }}>{item.label}</td>
                              <td className="text-center py-2">
                                <input 
                                  type="checkbox" 
                                  className="form-check-input text-primary custom-primary-checkbox" 
                                  checked={currentPermissions[item.path]?.view || false}
                                  onChange={(e) => handlePermissionChange(item.path, 'view', e.target.checked)}
                                  style={{ cursor: 'pointer' }}
                                />
                              </td>
                              <td className="text-center py-2">
                                <input 
                                  type="checkbox" 
                                  className="form-check-input text-primary custom-primary-checkbox" 
                                  checked={currentPermissions[item.path]?.add || false}
                                  onChange={(e) => handlePermissionChange(item.path, 'add', e.target.checked)}
                                  style={{ cursor: 'pointer' }}
                                />
                              </td>
                              <td className="text-center py-2">
                                <input 
                                  type="checkbox" 
                                  className="form-check-input text-primary custom-primary-checkbox" 
                                  checked={currentPermissions[item.path]?.edit || false}
                                  onChange={(e) => handlePermissionChange(item.path, 'edit', e.target.checked)}
                                  style={{ cursor: 'pointer' }}
                                />
                              </td>
                              <td className="text-center py-2">
                                <input 
                                  type="checkbox" 
                                  className="form-check-input text-primary custom-primary-checkbox" 
                                  checked={currentPermissions[item.path]?.delete || false}
                                  onChange={(e) => handlePermissionChange(item.path, 'delete', e.target.checked)}
                                  style={{ cursor: 'pointer' }}
                                />
                              </td>
                              <td className="text-center py-2 border-end-0">
                                <input 
                                  type="checkbox" 
                                  className="form-check-input border-primary text-primary custom-primary-checkbox" 
                                  checked={isPageAllChecked(item.path)}
                                  onChange={(e) => handlePageAll(item.path, e.target.checked)}
                                  style={{ cursor: 'pointer' }}
                                />
                              </td>
                            </tr>
                          ))}
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

      </div>
    </div>
  );
};

export default RolesPermissions;
