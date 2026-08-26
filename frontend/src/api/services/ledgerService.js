import api from '../axiosClient';

export const ledgerService = {
  getLedgerEntries: async () => {
    const data = await api.get('/ledger/');
    return data;
  },

  getMetrics: async () => {
    const data = await api.get('/ledger/metrics');
    return data;
  }
};
