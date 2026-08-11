import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FiEye, FiEyeOff } from "react-icons/fi";
import toast from "react-hot-toast";
import Modal from "@/components/common/Modal/Modal";
import Input from "@/components/common/Input/Input";
import Button from "@/components/common/Button/Button";
import { classNames } from "@/utils/helpers";
import { useAuth } from "@/context/AuthContext";
import { NAV_SECTIONS } from "@/config/navConfig";
import { roleService } from "@/api/services/roleService";

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

const ROLE_CREATION_MAP = {
  "Super Admin": ["admin", "manager", "HR", "sales", "support"],
  "admin": ["manager", "HR", "sales", "support"],
  "HR": ["manager", "sales", "support"],
  "manager": ["sales", "support"],
  "sales": [],
  "support": []
};

export default function UserFormModal({ open, onClose, onSubmit, submitting, initialData = null }) {
  const { user: currentUser } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [presets, setPresets] = useState({});
  const [dynamicAvailableRoles, setDynamicAvailableRoles] = useState([]);

  useEffect(() => {
    const baseRoles = ROLE_CREATION_MAP[currentUser?.role] || [];
    const customRoles = Object.keys(presets).filter(r => !["Super Admin", "admin", "manager", "HR", "sales", "support"].includes(r));
    
    if (currentUser?.role === "Super Admin" || currentUser?.role === "admin") {
      setDynamicAvailableRoles([...baseRoles, ...customRoles]);
    } else {
      setDynamicAvailableRoles(baseRoles);
    }
  }, [currentUser?.role, presets]);

  const { register, handleSubmit, reset, watch, setValue } = useForm({
    defaultValues: {
      name: "", email: "", phone: "", role: "sales", password: "", confirmPassword: "",
      permissions: DYNAMIC_PAGES.reduce((acc, page) => {
        acc[page.path] = { view: false, add: false, edit: false, delete: false };
        if (page.path === "/dashboard") acc[page.path].view = true;
        return acc;
      }, {})
    },
  });

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  useEffect(() => {
    roleService.getPresets().then(data => {
      const presetMap = {};
      data.forEach(p => { presetMap[p.role_name] = p; });
      setPresets(presetMap);
    }).catch(err => console.error("Failed to fetch presets:", err));
  }, []);

  const selectedRole = watch("role");

  useEffect(() => {
    // Only auto-apply presets if it's a new user (not editing an existing one)
    if (!initialData && presets[selectedRole]) {
      setValue("permissions", presets[selectedRole].permissions, { shouldDirty: true });
    }
  }, [selectedRole, presets, initialData, setValue]);

  const currentPermissions = watch("permissions");
  
  const submit = async (values) => {
    if (values.password || values.confirmPassword) {
      if (values.password !== values.confirmPassword) {
        toast.error("Passwords do not match!");
        return;
      }
    } else if (!initialData) {
      toast.error("Password is required for new users.");
      return;
    }

    const payload = { ...values };
    delete payload.confirmPassword;
    if (!payload.password) {
      delete payload.password;
    }

    await onSubmit(payload, !!initialData);
    reset();
  };

  const handlePermissionChange = (module, action, checked) => {
    setValue(`permissions.${module}.${action}`, checked);
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
    setValue("permissions", updated, { shouldDirty: true });
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
    setValue("permissions", updated, { shouldDirty: true });
  };

  const handlePageAll = (path, checked) => {
    setValue(`permissions.${path}`, { view: checked, add: checked, edit: checked, delete: checked }, { shouldDirty: true });
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
    <Modal
      open={open}
      onClose={onClose}
      title={initialData ? "Edit User" : "Create New User"}
      size="lg"
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit(submit)} loading={submitting}>
            {initialData ? "Save Changes" : "Create User & Send Credentials"}
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit(submit)} noValidate>
        <h6 className="mb-3">Basic Info</h6>
        <div className="row">
          <div className="col-md-6"><Input label="Full Name" {...register("name", { required: true })} /></div>
          <div className="col-md-6"><Input label="Email Address" type="email" disabled={!!initialData} {...register("email", { required: true })} /></div>
          <div className="col-md-6"><Input label="Phone" {...register("phone")} /></div>
          <div className="col-md-6">
            <label className="form-label">Role</label>
            <select className="form-select mb-3" {...register("role")}>
              {dynamicAvailableRoles.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>
          <div className="col-md-6">
            <div className="position-relative">
              <Input 
                label="Password" 
                type={showPassword ? "text" : "password"} 
                placeholder={initialData ? "Leave blank to keep unchanged" : ""}
                {...register("password")} 
              />
              <button 
                type="button"
                className="btn btn-link position-absolute p-0"
                style={{ right: 10, top: 32, color: "var(--color-text-subtle)" }}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </button>
            </div>
          </div>
          <div className="col-md-6">
            <div className="position-relative">
              <Input 
                label="Confirm Password" 
                type={showConfirmPassword ? "text" : "password"} 
                placeholder={initialData ? "Leave blank to keep unchanged" : ""}
                {...register("confirmPassword")} 
              />
              <button 
                type="button"
                className="btn btn-link position-absolute p-0"
                style={{ right: 10, top: 32, color: "var(--color-text-subtle)" }}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </button>
            </div>
          </div>
        </div>
        
        <hr className="my-4" style={{ borderColor: "var(--color-divider)" }} />
        
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h6 className="m-0">Permissions Matrix</h6>
          <div className="form-check">
            <input 
              className="form-check-input border-primary" 
              type="checkbox" 
              id="master-all"
              checked={isMasterAllChecked}
              onChange={(e) => handleMasterAll(e.target.checked)}
            />
            <label className="form-check-label fw-bold text-primary" htmlFor="master-all">
              Master All
            </label>
          </div>
        </div>
        <div className="table-responsive" style={{ maxHeight: 400, overflowY: "auto", border: "1px solid var(--color-divider)", borderRadius: 6 }}>
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
                  {/* Section Row */}
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
                  
                  {/* Page Rows */}
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
      </form>
    </Modal>
  );
}
