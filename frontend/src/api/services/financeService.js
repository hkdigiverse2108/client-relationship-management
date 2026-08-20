import apiClient from '../axiosClient';

class FinanceService {
  /**
   * Get overall dashboard metrics, charts, and recent transactions
   */
  async getDashboardData() {
    return await apiClient.get('/finance/dashboard/metrics');
  }

  /**
   * Seed dummy data for testing purposes
   */
  async seedDummyData() {
    return await apiClient.post('/finance/seed');
  }
}

export const financeService = new FinanceService();
