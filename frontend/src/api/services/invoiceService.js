import apiClient from '../axiosClient';

class InvoiceService {
  async getAllInvoices() {
    return await apiClient.get('/invoices');
  }

  async getInvoiceById(id) {
    return await apiClient.get(`/invoices/${id}`);
  }

  async createInvoice(invoiceData) {
    return await apiClient.post('/invoices', invoiceData);
  }

  async updateInvoice(id, invoiceData) {
    return await apiClient.put(`/invoices/${id}`, invoiceData);
  }

  async deleteInvoice(id) {
    return await apiClient.delete(`/invoices/${id}`);
  }
}

export const invoiceService = new InvoiceService();
