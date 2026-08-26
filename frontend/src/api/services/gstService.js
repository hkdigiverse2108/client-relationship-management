import apiClient from '../axiosClient';

class GSTService {
  async verifyGSTIN(gstin) {
    return await apiClient.post('/gst/verify', { gstin });
  }

  async getCrmSummary(gstin) {
    return await apiClient.get(`/gst/crm-summary/${gstin}`);
  }
}

export const gstService = new GSTService();
