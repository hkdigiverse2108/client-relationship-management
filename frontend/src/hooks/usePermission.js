import { useAuth } from '../context/AuthContext';

/**
 * Hook to retrieve RBAC permissions for a given module/page path.
 * 
 * @param {string} path - Menu config path, e.g. '/customers', '/orders', '/leads'
 * @returns {object} { canView, canAdd, canEdit, canDelete, isSuperAdmin, canAny }
 */
export const usePermission = (path) => {
  const { user } = useAuth();

  if (!user) {
    return {
      canView: false,
      canAdd: false,
      canEdit: false,
      canDelete: false,
      isSuperAdmin: false,
      canAny: false,
    };
  }

  const role = (user.role || '').toLowerCase();
  const isSuperAdmin = role === 'super admin' || role === 'superadmin';

  // Super Admin always has full access
  if (isSuperAdmin) {
    return {
      canView: true,
      canAdd: true,
      canEdit: true,
      canDelete: true,
      isSuperAdmin: true,
      canAny: true,
    };
  }

  const permissions = user.permissions || {};
  const pagePerms = permissions[path];

  // If permissions not explicitly defined for this path:
  // If role is admin and no explicit permissions, default to true for backward compatibility
  if (!pagePerms) {
    const isAdmin = role === 'admin';
    return {
      canView: isAdmin,
      canAdd: isAdmin,
      canEdit: isAdmin,
      canDelete: isAdmin,
      isSuperAdmin: false,
      canAny: isAdmin,
    };
  }

  const canView = Boolean(pagePerms.view);
  const canAdd = Boolean(pagePerms.add);
  const canEdit = Boolean(pagePerms.edit);
  const canDelete = Boolean(pagePerms.delete);

  return {
    canView,
    canAdd,
    canEdit,
    canDelete,
    isSuperAdmin: false,
    canAny: canView || canAdd || canEdit || canDelete,
  };
};

export default usePermission;
