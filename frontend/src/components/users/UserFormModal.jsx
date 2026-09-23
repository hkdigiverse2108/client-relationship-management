import React, { useState, useEffect } from 'react';
import CustomSelect from '../common/CustomSelect';
import { FiEye, FiEyeOff } from "react-icons/fi";
import axiosClient from '../../api/axiosClient';

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
      { path: "/users", label: "User Management" },
      { path: "/roles-and-permissions", label: "Roles & Permissions" },
      { path: "/audit-log", label: "Audit Logs" },
      { path: "/appearance", label: "Appearance & Theme" }
    ]
  }
];

const UserFormModal = ({ isOpen, onClose, initialData, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'sales',
    parent_id: '',
    password: '',
    confirmPassword: '',
    permissions: {}
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [roleOptions, setRoleOptions] = useState([
    { value: 'admin', label: 'Admin' },
    { value: 'manager', label: 'Manager' },
    { value: 'HR', label: 'HR' }
  ]);

  const [rolePresets, setRolePresets] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  // Fetch dynamic roles
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const res = await axiosClient.get('/roles/presets');
        if (res && res.length > 0) {
          setRolePresets(res);
          const dynamicRoles = res.map(r => ({ value: r.role_name, label: r.role_name }));
          
          // Merge avoiding duplicates
          const baseRoles = [
            { value: 'admin', label: 'Admin' },
          ];
          
          const existingValues = new Set(baseRoles.map(r => r.value.toLowerCase()));
          const extraRoles = dynamicRoles.filter(r => !existingValues.has(r.value.toLowerCase()));
          
          setRoleOptions([...baseRoles, ...extraRoles]);
        }
      } catch (err) {
        console.error("Failed to load roles", err);
      }
    };
    fetchRoles();
  }, []);

  // Initialize form
  useEffect(() => {
    if (initialData) {
      setFormData({ ...initialData, password: '', confirmPassword: '' });
    } else {
      const defaultPerms = {};
      NAV_SECTIONS.forEach(section => {
        section.items.forEach(item => {
          defaultPerms[item.path] = { view: false, add: false, edit: false, delete: false };
        });
      });
      defaultPerms['/dashboard'].view = true;
      setFormData({
        name: '', email: '', phone: '', role: 'sales', parent_id: '', password: '', confirmPassword: '', permissions: defaultPerms
      });
    }
  }, [initialData, isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (selected) => {
    setFormData(prev => {
      let perms = { ...prev.permissions };
      
      const preset = rolePresets.find(p => p.role_name === selected);
      if (preset && preset.permissions) {
        perms = preset.permissions;
      } else if (selected === 'Super Admin') {
        Object.keys(perms).forEach(k => {
          perms[k] = { view: true, add: true, edit: true, delete: true };
        });
      } else if (selected === 'admin') {
        Object.keys(perms).forEach(k => {
          perms[k] = { view: true, add: true, edit: true, delete: true };
        });
      }
      return { ...prev, role: selected, permissions: perms };
    });
  };

  const handlePermissionChange = (path, action, checked) => {
    setFormData(prev => {
      const newPerms = { ...prev.permissions };
      if (!newPerms[path]) newPerms[path] = { view: false, add: false, edit: false, delete: false };
      newPerms[path][action] = checked;
      return { ...prev, permissions: newPerms };
    });
  };

  const handlePageAll = (path, checked) => {
    setFormData(prev => {
      const newPerms = { ...prev.permissions };
      newPerms[path] = { view: checked, add: checked, edit: checked, delete: checked };
      return { ...prev, permissions: newPerms };
    });
  };

  const handleSectionAll = (section, checked) => {
    setFormData(prev => {
      const newPerms = { ...prev.permissions };
      section.items.forEach(item => {
        newPerms[item.path] = { view: checked, add: checked, edit: checked, delete: checked };
      });
      return { ...prev, permissions: newPerms };
    });
  };

  const handleMasterAll = (checked) => {
    setFormData(prev => {
      const newPerms = { ...prev.permissions };
      Object.keys(newPerms).forEach(path => {
        newPerms[path] = { view: checked, add: checked, edit: checked, delete: checked };
      });
      return { ...prev, permissions: newPerms };
    });
  };

  const isPageAllChecked = (path) => {
    const p = formData.permissions[path];
    return p?.view && p?.add && p?.edit && p?.delete;
  };

  const isSectionAllChecked = (section) => {
    return section.items.every(item => isPageAllChecked(item.path));
  };

  const isMasterAllChecked = () => {
    if (Object.keys(formData.permissions).length === 0) return false;
    return Object.values(formData.permissions).every(p => p.view && p.add && p.edit && p.delete);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    
    // Check required fields based on whether we are creating or editing
    const isEditing = !!initialData;
    if (!formData.name || !formData.role || (!isEditing && (!formData.email || !formData.password || !formData.confirmPassword))) {
      return; // Stop if required fields are missing
    }

    if (formData.password || formData.confirmPassword || !initialData) {
      if (formData.password !== formData.confirmPassword) {
        import('react-hot-toast').then(({ toast }) => toast.error("Passwords do not match!"));
        return;
      }
    }
    if (onSave) {
      const dataToSave = { ...formData };
      delete dataToSave.confirmPassword;
      if (!dataToSave.password) {
        delete dataToSave.password;
      }
      if (dataToSave.phone === '') dataToSave.phone = null;
      if (dataToSave.parent_id === '') dataToSave.parent_id = null;
      onSave(dataToSave);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)', overflowY: 'auto' }}>
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{initialData ? 'Edit User' : 'Add New User'}</h5>
            <button type="button" className="btn-close" onClick={onClose} aria-label="Close">✕</button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit} noValidate>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Full Name <span className="text-danger">*</span></label>
                  <input type="text" className={`form-control ${submitted && !formData.name ? 'is-invalid' : ''}`} name="name" value={formData.name} onChange={handleInputChange} required />
                  {submitted && !formData.name && <div className="invalid-feedback d-block mt-1">Full Name is required</div>}
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Email <span className="text-danger">*</span></label>
                  <input type="email" className={`form-control ${submitted && !formData.email && !initialData ? 'is-invalid' : ''}`} name="email" value={formData.email} onChange={handleInputChange} required disabled={!!initialData} />
                  {submitted && !formData.email && !initialData && <div className="invalid-feedback d-block mt-1">Email is required</div>}
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Phone</label>
                  <input type="text" className="form-control" name="phone" value={formData.phone} onChange={handleInputChange} />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Role <span className="text-danger">*</span></label>
                  <div className={submitted && !formData.role ? 'border border-danger rounded' : ''}>
                    <CustomSelect 
                      options={roleOptions} 
                      value={roleOptions.find(r => r.value === formData.role) || { value: formData.role, label: formData.role }}
                      onChange={(val) => handleRoleChange(val?.value)}
                    />
                  </div>
                  {submitted && !formData.role && <div className="text-danger mt-1" style={{ fontSize: '0.875em' }}>Role is required</div>}
                </div>
                
                <div className="col-md-6 mb-3">
                  <label className="form-label">Password {initialData ? '' : <span className="text-danger">*</span>}</label>
                  <div className="position-relative">
                    <input 
                      type={showPassword ? "text" : "password"} 
                      className={`form-control ${submitted && !formData.password && !initialData ? 'is-invalid' : ''}`} 
                      name="password" 
                      placeholder={initialData ? "Leave blank to keep unchanged" : ""}
                      value={formData.password} 
                      onChange={handleInputChange} 
                      required={!initialData} 
                      style={{ backgroundImage: 'none' }}
                    />
                    <button 
                      type="button"
                      className="btn btn-link position-absolute p-0"
                      style={{ right: '10px', top: '50%', transform: 'translateY(-50%)', color: "#6c757d" }}
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                    </button>
                  </div>
                  {submitted && !formData.password && !initialData && <div className="invalid-feedback d-block mt-1">Password is required</div>}
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Confirm Password {initialData ? '' : <span className="text-danger">*</span>}</label>
                  <div className="position-relative">
                    <input 
                      type={showConfirmPassword ? "text" : "password"} 
                      className={`form-control ${submitted && !formData.confirmPassword && !initialData ? 'is-invalid' : ''} ${submitted && formData.password !== formData.confirmPassword && (formData.password || formData.confirmPassword) ? 'is-invalid' : ''}`} 
                      name="confirmPassword" 
                      placeholder={initialData ? "Leave blank to keep unchanged" : ""}
                      value={formData.confirmPassword} 
                      onChange={handleInputChange} 
                      required={!initialData} 
                      style={{ backgroundImage: 'none' }}
                    />
                    <button 
                      type="button"
                      className="btn btn-link position-absolute p-0"
                      style={{ right: '10px', top: '50%', transform: 'translateY(-50%)', color: "#6c757d" }}
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                    </button>
                  </div>
                  {submitted && !formData.confirmPassword && !initialData && <div className="invalid-feedback d-block mt-1">Confirm Password is required</div>}
                </div>
              </div>

              <hr className="my-4" />
              
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h6 className="m-0">Permissions</h6>
                <div className="form-check d-flex align-items-center">
                  <input 
                    className="form-check-input border-primary me-2" 
                    type="checkbox" 
                    id="master-all"
                    checked={isMasterAllChecked()}
                    onChange={(e) => handleMasterAll(e.target.checked)}
                  />
                  <label className="form-check-label fw-bold text-primary mb-0" htmlFor="master-all">
                    Master All
                  </label>
                </div>
              </div>

              <div className="table-responsive" style={{ maxHeight: '400px', overflowY: "auto", border: "1px solid #e3e3e3", borderRadius: '6px' }}>
                <table className="table table-bordered align-middle table-sm m-0" style={{ fontSize: '14px' }}>
                  <thead className="sticky-top bg-light" style={{ zIndex: 1, boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}>
                    <tr>
                      <th>Module / Page</th>
                      <th className="text-center" style={{ width: '80px' }}>View</th>
                      <th className="text-center" style={{ width: '80px' }}>Add</th>
                      <th className="text-center" style={{ width: '80px' }}>Edit</th>
                      <th className="text-center" style={{ width: '80px' }}>Delete</th>
                      <th className="text-center border-primary border-bottom border-2 bg-light text-primary" style={{ width: '80px' }}>All</th>
                    </tr>
                  </thead>
                  <tbody>
                    {NAV_SECTIONS.map((section) => (
                      <React.Fragment key={section.id}>
                        {/* Section Row */}
                        <tr className="bg-light">
                          <td className="fw-bold text-dark" style={{ fontSize: '13px' }}>
                            <div className="d-flex align-items-center gap-2">
                              <i className={section.icon}></i>
                              {section.title}
                            </div>
                          </td>
                          <td colSpan={4} className="bg-light"></td>
                          <td className="text-center bg-light">
                            <input 
                              type="checkbox" 
                              className="form-check-input border-primary" 
                              checked={isSectionAllChecked(section)}
                              onChange={(e) => handleSectionAll(section, e.target.checked)}
                            />
                          </td>
                        </tr>
                        
                        {/* Page Rows */}
                        {section.items.map((item) => (
                          <tr key={item.path}>
                            <td className="fw-medium ps-4 text-muted" style={{ fontSize: '13px' }}>{item.label}</td>
                            <td className="text-center">
                              <input 
                                type="checkbox" 
                                className="form-check-input" 
                                checked={formData.permissions[item.path]?.view || false}
                                onChange={(e) => handlePermissionChange(item.path, 'view', e.target.checked)}
                              />
                            </td>
                            <td className="text-center">
                              <input 
                                type="checkbox" 
                                className="form-check-input" 
                                checked={formData.permissions[item.path]?.add || false}
                                onChange={(e) => handlePermissionChange(item.path, 'add', e.target.checked)}
                              />
                            </td>
                            <td className="text-center">
                              <input 
                                type="checkbox" 
                                className="form-check-input" 
                                checked={formData.permissions[item.path]?.edit || false}
                                onChange={(e) => handlePermissionChange(item.path, 'edit', e.target.checked)}
                              />
                            </td>
                            <td className="text-center">
                              <input 
                                type="checkbox" 
                                className="form-check-input" 
                                checked={formData.permissions[item.path]?.delete || false}
                                onChange={(e) => handlePermissionChange(item.path, 'delete', e.target.checked)}
                              />
                            </td>
                            <td className="text-center bg-light">
                              <input 
                                type="checkbox" 
                                className="form-check-input border-primary" 
                                checked={isPageAllChecked(item.path)}
                                onChange={(e) => handlePageAll(item.path, e.target.checked)}
                              />
                            </td>
                          </tr>
                        ))}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="d-flex align-items-center justify-content-end gap-2 mt-4">
                <button type="button" className="btn btn-light border" onClick={onClose}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {initialData ? 'Update User' : 'Create User'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserFormModal;
