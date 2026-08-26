import apiClient from '../axiosClient';

class PaymentService {
  async getAllPayments() {
    return await apiClient.get('/payments');
  }

  async getPaymentById(id) {
    return await apiClient.get(`/payments/${id}`);
  }

  async createPayment(paymentData) {
    return await apiClient.post('/payments', paymentData);
  }

  async updatePayment(id, paymentData) {
    return await apiClient.put(`/payments/${id}`, paymentData);
  }

  async deletePayment(id) {
    return await apiClient.delete(`/payments/${id}`);
  }
}

export const paymentService = new PaymentService();
