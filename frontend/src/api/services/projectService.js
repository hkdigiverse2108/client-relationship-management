import api from "../axiosClient";

export const projectService = {
  list: async () => {
    return await api.get("/projects");
  },

  get: async (id) => {
    return await api.get(`/projects/${id}`);
  },

  create: async (data) => {
    return await api.post("/projects", data);
  },

  update: async (id, data) => {
    return await api.put(`/projects/${id}`, data);
  },

  remove: async (id) => {
    return await api.delete(`/projects/${id}`);
  }
};
