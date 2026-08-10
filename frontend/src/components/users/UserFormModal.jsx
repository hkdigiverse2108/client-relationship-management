import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FiEye, FiEyeOff } from "react-icons/fi";
import toast from "react-hot-toast";
import Modal from "@/components/common/Modal/Modal";
import Input from "@/components/common/Input/Input";
import Button from "@/components/common/Button/Button";
import { classNames } from "@/utils/helpers";
import { useAuth } from "@/context/AuthContext";
import { NAV_SECTIONS } from "@/config/navConfig";

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
  const availableRoles = ROLE_CREATION_MAP[currentUser?.role] || [];

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { register, handleSubmit, reset, watch, setValue } = useForm({
    defaultValues: {
      name: "", email: "", phone: "", role: "sales", password: "", confirmPassword: "",
      permissions: DYNAMIC_PAGES.reduce((acc, page) => {
        acc[page.path] = { view: false, edit: false, delete: false };
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
              {availableRoles.map((r) => (
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
        
        <h6 className="mb-3">Permissions Matrix</h6>
        <div className="table-responsive">
          <table className="table table-bordered align-middle" style={{ fontSize: 14 }}>
            <thead className="table-light">
              <tr>
                <th>Module</th>
                <th className="text-center">View</th>
                <th className="text-center">Edit</th>
                <th className="text-center">Delete</th>
              </tr>
            </thead>
            <tbody>
              {DYNAMIC_PAGES.map((page) => (
                <tr key={page.path}>
                  <td className="fw-medium text-muted" style={{ fontSize: 13 }}>{page.label}</td>
                  <td className="text-center">
                    <input 
                      type="checkbox" 
                      className="form-check-input" 
                      checked={currentPermissions?.[page.path]?.view || false}
                      onChange={(e) => handlePermissionChange(page.path, 'view', e.target.checked)}
                    />
                  </td>
                  <td className="text-center">
                    <input 
                      type="checkbox" 
                      className="form-check-input" 
                      checked={currentPermissions?.[page.path]?.edit || false}
                      onChange={(e) => handlePermissionChange(page.path, 'edit', e.target.checked)}
                    />
                  </td>
                  <td className="text-center">
                    <input 
                      type="checkbox" 
                      className="form-check-input" 
                      checked={currentPermissions?.[page.path]?.delete || false}
                      onChange={(e) => handlePermissionChange(page.path, 'delete', e.target.checked)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </form>
    </Modal>
  );
}
