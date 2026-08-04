import api from "../axiosClient";

export const notificationService = {
  getAll: async () => {
    return await api.get("/notifications");
  },

  markAsRead: async (notifId) => {
    return await api.patch(`/notifications/${notifId}/read`);
  },

  markAllAsRead: async () => {
    return await api.patch("/notifications/read-all");
  },
};
