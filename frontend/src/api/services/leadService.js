import api from "../axiosClient";

export const leadService = {
  list: async () => {
    return await api.get("/leads");
  },
  
  get: async (id) => {
    return await api.get(`/leads/${id}`);
  },

  create: async (data) => {
    return await api.post("/leads", data);
  },

  update: async (id, data) => {
    return await api.put(`/leads/${id}`, data);
  },

  importLeads: async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    return await api.post("/leads/import", formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });
  },

  remove: async (id) => {
    return await api.delete(`/leads/${id}`);
  }
};
