import axios from 'axios';

// Base URL for the Spring Boot REST API
const API_BASE_URL = 'http://localhost:8080/api/transactions';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const transactionService = {
  // 1. Get all transactions, with optional filtering parameters
  getAll: async (filters = {}) => {
    const params = {};
    if (filters.type && filters.type !== 'ALL') params.type = filters.type;
    if (filters.category && filters.category !== 'ALL') params.category = filters.category;
    if (filters.startDate) params.startDate = filters.startDate;
    if (filters.endDate) params.endDate = filters.endDate;

    const response = await apiClient.get('', { params });
    return response.data;
  },

  // 2. Get single transaction by ID
  getById: async (id) => {
    const response = await apiClient.get(`/${id}`);
    return response.data;
  },

  // 3. Create a new transaction
  create: async (transactionData) => {
    const response = await apiClient.post('', transactionData);
    return response.data;
  },

  // 4. Update an existing transaction
  update: async (id, transactionData) => {
    const response = await apiClient.put(`/${id}`, transactionData);
    return response.data;
  },

  // 5. Delete a transaction
  delete: async (id) => {
    const response = await apiClient.delete(`/${id}`);
    return response.data;
  },

  // 6. Get dashboard balance summary (Total Income, Expenses, Balance)
  getSummary: async () => {
    const response = await apiClient.get('/summary');
    return response.data;
  },

  // 7. Get category breakdown for expenses
  getCategorySummary: async () => {
    const response = await apiClient.get('/category-summary');
    return response.data;
  },

  // 8. Get monthly income vs expenses report
  getMonthlySummary: async () => {
    const response = await apiClient.get('/monthly-summary');
    return response.data;
  },

  // 9. Get all category names
  getCategories: async () => {
    const response = await apiClient.get('/categories');
    return response.data;
  },
};

export default transactionService;
