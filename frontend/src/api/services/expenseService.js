import apiClient from '../axiosClient';

class ExpenseService {
  async getAllExpenses(params = {}) {
    // Expected params: category, start_date, end_date
    return await apiClient.get('/expenses', { params });
  }

  async getMetrics() {
    return await apiClient.get('/expenses/metrics');
  }

  async createExpense(data) {
    return await apiClient.post('/expenses', data);
  }

  async updateExpense(id, data) {
    return await apiClient.put(`/expenses/${id}`, data);
  }

  async deleteExpense(id) {
    return await apiClient.delete(`/expenses/${id}`);
  }
}

export const expenseService = new ExpenseService();
