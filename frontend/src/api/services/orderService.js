import api from "../axiosClient";

export const orderService = {
  list: async () => {
    return await api.get("/orders");
  },
  
  get: async (id) => {
    return await api.get(`/orders/${id}`);
  },

  create: async (data) => {
    return await api.post("/orders", data);
  },

  update: async (id, data) => {
    return await api.put(`/orders/${id}`, data);
  },

  remove: async (id) => {
    return await api.delete(`/orders/${id}`);
  }
};
