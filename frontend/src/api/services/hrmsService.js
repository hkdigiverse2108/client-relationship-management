import api from '../axiosClient';

export const hrmsService = {
  // --- Notices ---
  getNotices: async () => {
    const response = await api.get('/hrms/notices');
    return response;
  },
  createNotice: async (data) => {
    const response = await api.post('/hrms/notices', data);
    return response;
  },
  updateNotice: async (id, data) => {
    const response = await api.put(`/hrms/notices/${id}`, data);
    return response;
  },
  deleteNotice: async (id) => {
    const response = await api.delete(`/hrms/notices/${id}`);
    return response;
  },

  // --- Events ---
  getEvents: async () => {
    const response = await api.get('/hrms/events');
    return response;
  },
  createEvent: async (data) => {
    const response = await api.post('/hrms/events', data);
    return response;
  },
  updateEvent: async (id, data) => {
    const response = await api.put(`/hrms/events/${id}`, data);
    return response;
  },
  deleteEvent: async (id) => {
    const response = await api.delete(`/hrms/events/${id}`);
    return response;
  },

  // --- Event Types ---
  getEventTypes: async () => {
    const response = await api.get('/hrms/event-types');
    return response;
  },
  createEventType: async (data) => {
    const response = await api.post('/hrms/event-types', data);
    return response;
  },

  // --- Custom Types (Generic) ---
  getCustomTypes: async () => {
    const response = await api.get('/hrms/custom-types');
    return response;
  },
  createCustomType: async (data) => {
    const response = await api.post('/hrms/custom-types', data);
    return response;
  },

  // --- Dashboard Stats ---
  getDepartmentStats: async () => {
    const response = await api.get('/hrms/dashboard/department-stats');
    return response;
  },

  // --- Assets ---
  getAssets: async () => {
    const response = await api.get('/hrms/assets');
    return response;
  },
  createAsset: async (data) => {
    const response = await api.post('/hrms/assets', data);
    return response;
  },
  updateAsset: async (id, data) => {
    const response = await api.put(`/hrms/assets/${id}`, data);
    return response;
  },
  deleteAsset: async (id) => {
    const response = await api.delete(`/hrms/assets/${id}`);
    return response;
  },

  // --- Appraisals ---
  getAppraisals: async () => {
    const response = await api.get('/hrms/appraisals');
    return response;
  },
  createAppraisal: async (data) => {
    const response = await api.post('/hrms/appraisals', data);
    return response;
  },
  updateAppraisal: async (id, data) => {
    const response = await api.put(`/hrms/appraisals/${id}`, data);
    return response;
  },
  deleteAppraisal: async (id) => {
    const response = await api.delete(`/hrms/appraisals/${id}`);
    return response;
  }
};
