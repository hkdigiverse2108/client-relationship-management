import api from "../axiosClient";

export const contactService = {
  list: async () => {
    return await api.get("/contacts");
  },

  get: async (id) => {
    return await api.get(`/contacts/${id}`);
  },

  create: async (data) => {
    return await api.post("/contacts", data);
  },

  update: async (id, data) => {
    return await api.put(`/contacts/${id}`, data);
  },

  remove: async (id) => {
    return await api.delete(`/contacts/${id}`);
  }
};
