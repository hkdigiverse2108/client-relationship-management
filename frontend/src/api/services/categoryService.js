import api from '../axiosClient';

export const categoryService = {
  list: async () => {
    return api.get('/categories');
  },

  create: async (data) => {
    return api.post('/categories', data);
  },

  update: async (id, data) => {
    return api.put(`/categories/${id}`, data);
  },

  remove: async (id) => {
    return api.delete(`/categories/${id}`);
  }
};
