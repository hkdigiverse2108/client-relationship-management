import api from "../axiosClient";

export const customerService = {
  list: async () => {
    return await api.get("/customers");
  },
  
  get: async (id) => {
    return await api.get(`/customers/${id}`);
  },
  
  create: async (data) => {
    return await api.post("/customers", data);
  },
  
  update: async (id, data) => {
    return await api.put(`/customers/${id}`, data);
  },
  
  remove: async (id) => {
    return await api.delete(`/customers/${id}`);
  }
};
