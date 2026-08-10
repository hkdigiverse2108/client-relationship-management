import React, { useState, useEffect } from "react";
import PageHeader from "@/components/common/PageHeader/PageHeader";
import Button from "@/components/common/Button/Button";
import { NAV_SECTIONS } from "@/config/navConfig";
import { roleService } from "@/api/services/roleService";
import toast from "react-hot-toast";
import Modal from "@/components/common/Modal/Modal";
import Input from "@/components/common/Input/Input";

const ROLES = ["admin", "manager", "HR", "sales", "support"];

// Calculate all dynamic pages to build default empty permissions
const DYNAMIC_PAGES = [];
NAV_SECTIONS.forEach(section => {
  section.items.forEach(item => {
    if (item.subItems) {
      item.subItems.forEach(sub => {
        DYNAMIC_PAGES.push({ path: sub.path, label: `${section.title} > ${item.label} > ${sub.label}` });
      });
    } else {
      DYNAMIC_PAGES.push({ path: item.path, label: `${section.title} > ${item.label}` });
    }
  });
});

const getEmptyPermissions = () => {
  return DYNAMIC_PAGES.reduce((acc, page) => {
    acc[page.path] = { view: false, add: false, edit: false, delete: false };
    if (page.path === "/dashboard") acc[page.path].view = true;
    return acc;
  }, {});
};

export default function RolesPermissionsPage() {
  const [dynamicRoles, setDynamicRoles] = useState(ROLES);
  const [selectedRole, setSelectedRole] = useState(ROLES[0]);
  const [presets, setPresets] = useState({});
  const [currentPermissions, setCurrentPermissions] = useState(getEmptyPermissions());
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Custom role modal state
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [newRoleName, setNewRoleName] = useState("");
  const [creatingRole, setCreatingRole] = useState(false);

  useEffect(() => {
    fetchPresets();
  }, []);

  useEffect(() => {
    if (presets[selectedRole]) {
      setCurrentPermissions(presets[selectedRole].permissions);
    } else {
      setCurrentPermissions(getEmptyPermissions());
    }
  }, [selectedRole, presets]);

  const fetchPresets = async () => {
    try {
      setLoading(true);
      const data = await roleService.getPresets();
      const presetMap = {};
      const fetchedRoles = [];
      data.forEach(p => { 
        presetMap[p.role_name] = p;
        fetchedRoles.push(p.role_name);
      });
      setPresets(presetMap);
      setDynamicRoles(Array.from(new Set([...ROLES, ...fetchedRoles])));
    } catch (error) {
      toast.error("Failed to load role presets");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const payload = {
        role_name: selectedRole,
        permissions: currentPermissions
      };
      const updated = await roleService.updatePreset(selectedRole, payload);
      setPresets(prev => ({ ...prev, [selectedRole]: updated }));
      toast.success(`${selectedRole} default permissions saved successfully.`);
    } catch (error) {
      toast.error("Failed to save permissions preset.");
    } finally {
      setSaving(false);
    }
  };

  const handleCreateCustomRole = async () => {
    if (!newRoleName.trim()) {
      toast.error("Role name is required");
      return;
    }
    const roleName = newRoleName.trim().toLowerCase();
    if (dynamicRoles.includes(roleName)) {
      toast.error("Role already exists");
      return;
    }

    try {
      setCreatingRole(true);
      const payload = {
        role_name: roleName,
        permissions: getEmptyPermissions()
      };
      const updated = await roleService.updatePreset(roleName, payload);
      setPresets(prev => ({ ...prev, [roleName]: updated }));
      setDynamicRoles(prev => [...prev, roleName]);
      setSelectedRole(roleName);
      setShowRoleModal(false);
      setNewRoleName("");
      toast.success("Custom role created successfully.");
    } catch (error) {
      toast.error("Failed to create custom role.");
    } finally {
      setCreatingRole(false);
    }
  };

  // Matrix logic
  const handlePermissionChange = (module, action, checked) => {
    setCurrentPermissions(prev => ({
      ...prev,
      [module]: { ...prev[module], [action]: checked }
    }));
  };

  const isMasterAllChecked = DYNAMIC_PAGES.every(p => currentPermissions?.[p.path]?.view && currentPermissions?.[p.path]?.add && currentPermissions?.[p.path]?.edit && currentPermissions?.[p.path]?.delete);
  
  const isSectionAllChecked = (section) => {
    let allPaths = [];
    section.items.forEach(item => {
      if (item.subItems) allPaths.push(...item.subItems.map(s => s.path));
      else allPaths.push(item.path);
    });
    if (allPaths.length === 0) return false;
    return allPaths.every(path => currentPermissions?.[path]?.view && currentPermissions?.[path]?.add && currentPermissions?.[path]?.edit && currentPermissions?.[path]?.delete);
  };

  const isPageAllChecked = (path) => {
    return currentPermissions?.[path]?.view && currentPermissions?.[path]?.add && currentPermissions?.[path]?.edit && currentPermissions?.[path]?.delete;
  };

  const handleMasterAll = (checked) => {
    const updated = { ...currentPermissions };
    Object.keys(updated).forEach(path => {
      updated[path] = { view: checked, add: checked, edit: checked, delete: checked };
    });
    setCurrentPermissions(updated);
  };

  const handleSectionAll = (section, checked) => {
    const updated = { ...currentPermissions };
    section.items.forEach(item => {
      if (item.subItems) {
        item.subItems.forEach(sub => {
          if (updated[sub.path]) {
            updated[sub.path] = { view: checked, add: checked, edit: checked, delete: checked };
          }
        });
      } else {
        if (updated[item.path]) {
          updated[item.path] = { view: checked, add: checked, edit: checked, delete: checked };
        }
      }
    });
    setCurrentPermissions(updated);
  };

  const handlePageAll = (path, checked) => {
    setCurrentPermissions(prev => ({
      ...prev,
      [path]: { view: checked, add: checked, edit: checked, delete: checked }
    }));
  };

  const renderPageRow = (path, label) => (
    <tr key={path}>
      <td className="fw-medium text-muted ps-4" style={{ fontSize: 13 }}>{label}</td>
      <td className="text-center">
        <input 
          type="checkbox" 
          className="form-check-input" 
          checked={currentPermissions?.[path]?.view || false}
          onChange={(e) => handlePermissionChange(path, 'view', e.target.checked)}
        />
      </td>
      <td className="text-center">
        <input 
          type="checkbox" 
          className="form-check-input" 
          checked={currentPermissions?.[path]?.add || false}
          onChange={(e) => handlePermissionChange(path, 'add', e.target.checked)}
        />
      </td>
      <td className="text-center">
        <input 
          type="checkbox" 
          className="form-check-input" 
          checked={currentPermissions?.[path]?.edit || false}
          onChange={(e) => handlePermissionChange(path, 'edit', e.target.checked)}
        />
      </td>
      <td className="text-center">
        <input 
          type="checkbox" 
          className="form-check-input" 
          checked={currentPermissions?.[path]?.delete || false}
          onChange={(e) => handlePermissionChange(path, 'delete', e.target.checked)}
        />
      </td>
      <td className="text-center bg-light">
        <input 
          type="checkbox" 
          className="form-check-input border-primary" 
          checked={isPageAllChecked(path)}
          onChange={(e) => handlePageAll(path, e.target.checked)}
        />
      </td>
    </tr>
  );

  return (
    <>
      <PageHeader 
        title="Roles & Permissions" 
        description="Configure granular access profiles and SaaS security matrices" 
        actions={<Button onClick={() => setShowRoleModal(true)}>+ Create Custom Role</Button>}
      />
      <div className="row g-4">
        {/* Roles Sidebar */}
        <div className="col-12 col-md-3">
          <div className="card p-3">
            <h6 className="mb-3 text-primary">System Roles</h6>
            <div className="d-flex flex-column gap-2">
              {dynamicRoles.map(role => (
                <button
                  key={role}
                  className={`btn text-start border-0 ${selectedRole !== role ? 'btn-light text-dark' : 'text-white'}`}
                  onClick={() => setSelectedRole(role)}
                  style={{ 
                    textTransform: 'capitalize',
                    backgroundColor: selectedRole === role ? 'var(--color-primary)' : ''
                  }}
                >
                  {role}
                </button>
              ))}
            </div>
            <div className="mt-4 p-3 bg-light rounded text-muted" style={{ fontSize: 13 }}>
              Select a role to configure its default permission preset. These permissions will be automatically applied when creating a new user with this role.
            </div>
          </div>
        </div>

        {/* Matrix */}
        <div className="col-12 col-md-9">
          <div className="card p-4">
            {loading ? (
              <div className="text-center py-5">Loading...</div>
            ) : (
              <>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="m-0" style={{ textTransform: 'capitalize' }}>{selectedRole} Default Permissions</h5>
                  <div className="d-flex align-items-center gap-3">
                    <div className="form-check m-0">
                      <input 
                        className="form-check-input border-primary" 
                        type="checkbox" 
                        id="master-all-preset"
                        checked={isMasterAllChecked}
                        onChange={(e) => handleMasterAll(e.target.checked)}
                      />
                      <label className="form-check-label fw-bold text-primary" htmlFor="master-all-preset">
                        Master All
                      </label>
                    </div>
                    <Button onClick={handleSave} loading={saving}>Save Role Defaults</Button>
                  </div>
                </div>

                <div className="table-responsive" style={{ maxHeight: 600, overflowY: "auto", border: "1px solid var(--color-divider)", borderRadius: 6 }}>
                  <table className="table table-bordered align-middle table-sm m-0" style={{ fontSize: 14 }}>
                    <thead className="table-light sticky-top" style={{ zIndex: 1, boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}>
                      <tr>
                        <th>Module / Page</th>
                        <th className="text-center" style={{ width: 80 }}>View</th>
                        <th className="text-center" style={{ width: 80 }}>Add</th>
                        <th className="text-center" style={{ width: 80 }}>Edit</th>
                        <th className="text-center" style={{ width: 80 }}>Delete</th>
                        <th className="text-center bg-light" style={{ width: 80, borderBottom: "2px solid var(--color-primary)" }}>All</th>
                      </tr>
                    </thead>
                    <tbody>
                      {NAV_SECTIONS.map((section) => (
                        <React.Fragment key={section.id}>
                          <tr className="table-secondary">
                            <td className="fw-bold text-dark" style={{ fontSize: 13 }}>
                              <div className="d-flex align-items-center gap-2">
                                <section.icon />
                                {section.title}
                              </div>
                            </td>
                            <td colSpan={4} className="table-secondary"></td>
                            <td className="text-center table-secondary">
                              <input 
                                type="checkbox" 
                                className="form-check-input border-primary" 
                                checked={isSectionAllChecked(section)}
                                onChange={(e) => handleSectionAll(section, e.target.checked)}
                              />
                            </td>
                          </tr>
                          
                          {section.items.map((item) => {
                            if (item.subItems) {
                              return item.subItems.map(sub => renderPageRow(sub.path, `${item.label} > ${sub.label}`));
                            }
                            return renderPageRow(item.path, item.label);
                          })}
                        </React.Fragment>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <Modal
        open={showRoleModal}
        onClose={() => setShowRoleModal(false)}
        title="Create Custom Role"
        footer={
          <>
            <Button variant="secondary" onClick={() => setShowRoleModal(false)}>Cancel</Button>
            <Button onClick={handleCreateCustomRole} loading={creatingRole}>Create Role</Button>
          </>
        }
      >
        <Input 
          label="Role Name" 
          placeholder="e.g., marketing" 
          value={newRoleName} 
          onChange={(e) => setNewRoleName(e.target.value)}
          autoFocus
        />
        <div className="form-text mt-2 text-muted">
          The role name will be converted to lowercase automatically. After creation, you can configure its permissions.
        </div>
      </Modal>
    </>
  );
}
