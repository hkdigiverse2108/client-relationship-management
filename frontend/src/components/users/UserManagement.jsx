import { useState, useEffect } from "react";
import { FiEdit2, FiTrash2, FiMoreVertical, FiShield, FiMail, FiPhone, FiKey, FiCheck, FiX, FiActivity, FiPlus, FiChevronDown, FiChevronRight, FiEye, FiEyeOff } from "react-icons/fi";
import toast from "react-hot-toast";
import Avatar from "@/components/common/Avatar/Avatar";
import Badge from "@/components/common/Badge/Badge";
import Button from "@/components/common/Button/Button";
import Input from "@/components/common/Input/Input";
import { userService } from "@/api/services/userService";
import { dashboardService } from "@/api/services/dashboardService";
import UserFormModal from "./UserFormModal";
import UserDetailsModal from "./UserDetailsModal";
import { useAuth } from "@/context/AuthContext";
import { classNames, getProfilePhotoUrl } from "@/utils/helpers";
import { confirmDialog } from "@/components/common/ConfirmDialog/confirmDialog";

export default function UserManagement() {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  
  // Track which parent nodes are expanded
  const [expanded, setExpanded] = useState({});
  const [visiblePasswords, setVisiblePasswords] = useState({});

  const [editingUser, setEditingUser] = useState(null);
  const [viewingUser, setViewingUser] = useState(null);

  const [salesTarget, setSalesTarget] = useState("");
  const [savingTarget, setSavingTarget] = useState(false);

  useEffect(() => {
    fetchUsers();
    fetchSalesTarget();
  }, []);

  const fetchSalesTarget = async () => {
    try {
      const res = await dashboardService.getSalesTarget();
      if (res && res.monthly_sales_target) {
        setSalesTarget(res.monthly_sales_target.toString());
      }
    } catch (error) {
      console.error("Failed to fetch sales target", error);
    }
  };

  const handleSaveTarget = async () => {
    try {
      setSavingTarget(true);
      await dashboardService.updateSalesTarget({ monthly_sales_target: parseFloat(salesTarget) });
      toast.success("Sales target updated successfully");
    } catch (error) {
      toast.error("Failed to update sales target");
    } finally {
      setSavingTarget(false);
    }
  };

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await userService.getList();
      setUsers(data);
    } catch (error) {
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const toggleExpand = (userId) => {
    setExpanded(prev => ({ ...prev, [userId]: !prev[userId] }));
  };

  const togglePasswordVisibility = (userId) => {
    setVisiblePasswords(prev => ({ ...prev, [userId]: !prev[userId] }));
  };

  const openCreateModal = () => {
    setEditingUser(null);
    setModalOpen(true);
  };

  const openEditModal = (user) => {
    setEditingUser(user);
    setModalOpen(true);
  };

  const openViewModal = (user) => {
    setViewingUser(user);
  };

  const handleSaveUser = async (values, isEdit) => {
    try {
      setSubmitting(true);
      if (isEdit) {
        await userService.update(editingUser.id, values);
        toast.success("User updated successfully.");
      } else {
        await userService.create(values);
        toast.success("User created successfully. Credentials sent via email.");
      }
      setModalOpen(false);
      fetchUsers();
    } catch (error) {
      toast.error(error?.response?.data?.detail || "Failed to save user");
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggleStatus = async (user) => {
    const action = user.is_active ? "deactivate" : "activate";
    
    const ok = await confirmDialog({
      title: `${action.charAt(0).toUpperCase() + action.slice(1)} User?`,
      text: `Are you sure you want to ${action} this user?`,
      confirmText: action.charAt(0).toUpperCase() + action.slice(1),
      icon: "warning",
      danger: user.is_active
    });
    if (!ok) return;
    
    try {
      await userService.toggleStatus(user.id, !user.is_active);
      toast.success(`User ${action}d successfully.`);
      fetchUsers();
    } catch (error) {
      toast.error(error?.response?.data?.detail || `Failed to ${action} user`);
    }
  };

  const handleDeleteUser = async (userId) => {
    const ok = await confirmDialog({
      title: "Delete User?",
      text: "Are you sure you want to delete this user permanently? This action cannot be undone.",
      confirmText: "Delete",
      icon: "error",
      danger: true
    });
    if (!ok) return;
    
    try {
      await userService.delete(userId);
      toast.success("User deleted successfully.");
      fetchUsers();
    } catch (error) {
      toast.error(error?.response?.data?.detail || "Failed to delete user");
    }
  };

  // Build Hierarchy
  // Find top level users (those whose parent_id is themselves, or not in the list, or match current user)
  const buildHierarchy = (userList) => {
    const map = {};
    const roots = [];

    userList.forEach(u => {
      map[u.id] = { ...u, children: [] };
    });

    userList.forEach(u => {
      // If user's parent is not themselves and the parent exists in our map, attach as child
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

    return (
      <div key={user.id}>
        <div 
          className="d-flex align-items-center gap-3 py-3 px-3" 
          style={{ 
            borderBottom: "1px solid var(--color-divider)", 
            background: isExpanded ? "var(--color-primary-soft)" : (depth > 0 ? "var(--color-surface-alt)" : "transparent"),
            minWidth: "800px" // Ensure it scrolls on mobile
          }}
        >
          {/* Expand Toggle */}
          <div style={{ width: 20 }}>
            {hasChildren && (
              <button 
                className="btn btn-sm btn-link p-0 text-muted" 
                onClick={() => toggleExpand(user.id)}
              >
                {isExpanded ? <FiChevronDown /> : <FiChevronRight />}
              </button>
            )}
          </div>

          <Avatar name={user.name} size={40} src={getProfilePhotoUrl(user.profile_photo)} />
          <div className="flex-grow-1">
            <div style={{ fontWeight: 600 }}>{user.name}</div>
            <div className="text-subtle" style={{ fontSize: 12 }}>{user.email}</div>
          </div>
          
          <div style={{ width: 120 }}>
            <Badge variant="primary">{user.role}</Badge>
          </div>

          {/* Password Field (Protected) */}
          <div className="text-muted d-flex align-items-center justify-content-between" style={{ width: 150, fontSize: 13 }}>
            <span>{visiblePasswords[user.id] && user.plain_password ? user.plain_password : "********"}</span>
            {user.plain_password && (
              <button 
                className="btn btn-link p-0 text-muted"
                onClick={() => togglePasswordVisibility(user.id)}
                title={visiblePasswords[user.id] ? "Hide Password" : "Show Password"}
              >
                {visiblePasswords[user.id] ? <FiEyeOff size={16} /> : <FiEye size={16} />}
              </button>
            )}
          </div>

          {/* Actions */}
          <div style={{ width: 270 }} className="text-end d-flex gap-2 justify-content-end">
            <button 
              className="btn btn-sm btn-light"
              onClick={() => openViewModal(user)}
              title="View Details"
            >
              View
            </button>
            <button 
              className="btn btn-sm btn-light"
              onClick={() => openEditModal(user)}
              title="Edit User"
            >
              Edit
            </button>
            {["Super Admin", "admin"].includes(currentUser?.role) && user.role !== "Super Admin" && (
              <>
                <button 
                  className={classNames("btn btn-sm", user.is_active ? "btn-outline-danger" : "btn-outline-success")}
                  onClick={() => handleToggleStatus(user)}
                  title={user.is_active ? "Deactivate User" : "Activate User"}
                >
                  {user.is_active ? "Deactivate" : "Activate"}
                </button>
                <button 
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDeleteUser(user.id)}
                  title="Delete User"
                >
                  Delete
                </button>
              </>
            )}
          </div>
        </div>

        {/* Render Children if expanded */}
        {hasChildren && isExpanded && (
          <div className="hierarchy-children">
            {user.children.map(child => renderUserRow(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  const hierarchy = buildHierarchy(users);

  return (
    <div>
      {/* Sales Configuration */}
      <div className="mb-4">
        <h3 className="mb-3" style={{ fontSize: "1.15rem" }}>Sales Configuration</h3>
        <div className="d-flex align-items-end gap-3" style={{ maxWidth: "400px" }}>
          <div className="flex-grow-1">
            <Input 
              label="Monthly Sales Target (₹)" 
              type="number" 
              value={salesTarget} 
              onChange={(e) => setSalesTarget(e.target.value)} 
            />
          </div>
          <div className="mb-3">
            <Button onClick={handleSaveTarget} loading={savingTarget}>Save Target</Button>
          </div>
        </div>
      </div>
      <hr className="my-4" style={{ borderColor: "var(--color-divider)" }} />

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="m-0" style={{ fontSize: "1.15rem" }}>Team members & Hierarchy</h3>
        {["Super Admin", "admin", "HR", "manager"].includes(currentUser?.role) && (
          <Button icon={FiPlus} onClick={openCreateModal}>Create User</Button>
        )}
      </div>

      {loading ? (
        <div className="text-center py-5">Loading users...</div>
      ) : (
        <div className="card p-0" style={{ overflowX: "auto" }}>
          <div className="list-unstyled m-0" style={{ minWidth: "100%" }}>
            {hierarchy.map(u => renderUserRow(u))}
            {hierarchy.length === 0 && (
              <div className="text-center py-4 text-muted">No users found.</div>
            )}
          </div>
        </div>
      )}

      {modalOpen && (
        <UserFormModal 
          open={modalOpen} 
          onClose={() => setModalOpen(false)} 
          onSubmit={handleSaveUser}
          submitting={submitting}
          initialData={editingUser}
        />
      )}

      {viewingUser && (
        <UserDetailsModal
          open={!!viewingUser}
          user={viewingUser}
          onClose={() => setViewingUser(null)}
        />
      )}
    </div>
  );
}
