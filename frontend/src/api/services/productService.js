import api from '../axiosClient';
import { APP_CONFIG, STORAGE_KEYS } from '@/config/appConfig';
import { storage } from '@/utils/storage';

export const productService = {
  list: async () => {
    return api.get('/products');
  },

  get: async (id) => {
    return api.get(`/products/${id}`);
  },

  create: async (data) => {
    return api.post('/products', data);
  },

  update: async (id, data) => {
    return api.put(`/products/${id}`, data);
  },

  remove: async (id) => {
    return api.delete(`/products/${id}`);
  },

  uploadImage: async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    
    const token = storage.get(STORAGE_KEYS.token);
    const headers = {};
    if (token) headers['Authorization'] = `Bearer ${token}`;
    
    const res = await fetch(`${APP_CONFIG.apiBaseUrl}/products/upload-image`, {
      method: 'POST',
      body: formData,
      headers
    });
    
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Upload failed: ${res.status} ${errorText}`);
    }
    
    return res.json();
  }
};
