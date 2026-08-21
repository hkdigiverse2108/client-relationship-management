import apiClient from '../axiosClient';

class GSTService {
  async verifyGSTIN(gstin) {
    return await apiClient.post('/gst/verify', { gstin });
  }
}

export const gstService = new GSTService();
