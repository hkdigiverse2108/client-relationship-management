import apiClient from '../axiosClient';

class QuoteService {
  async getAllQuotes() {
    return await apiClient.get('/quotes');
  }

  async getQuoteById(id) {
    return await apiClient.get(`/quotes/${id}`);
  }

  async createQuote(quoteData) {
    return await apiClient.post('/quotes', quoteData);
  }

  async updateQuote(id, quoteData) {
    return await apiClient.put(`/quotes/${id}`, quoteData);
  }

  async deleteQuote(id) {
    return await apiClient.delete(`/quotes/${id}`);
  }
}

export const quoteService = new QuoteService();
