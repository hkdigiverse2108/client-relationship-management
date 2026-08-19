// Centralized endpoint registry. Keeping paths here means only one file changes
// when the backend contract evolves.
export const ENDPOINTS = {
  auth: {
    login: "/auth/login",
    register: "/auth/register",
    logout: "/auth/logout",
    me: "/auth/me",
    forgotPassword: "/auth/forgot-password",
  },
  dashboard: {
    summary: "/dashboard/summary",
    revenue: "/dashboard/revenue",
    pipeline: "/dashboard/pipeline",
  },
  leads: {
    list: "/leads",
    byId: (id) => `/leads/${id}`,
  },
  contacts: {
    list: "/contacts",
    byId: (id) => `/contacts/${id}`,
  },
  companies: {
    list: "/companies",
    byId: (id) => `/companies/${id}`,
  },
  deals: {
    list: "/deals",
    byId: (id) => `/deals/${id}`,
  },
  tasks: {
    list: "/tasks/",
    byId: (id) => `/tasks/${id}`,
  },
  users: {
    list: "/users",
    byId: (id) => `/users/${id}`,
  },
};
