import apiClient from './client';

const customerApi = {
  getAll: (params) =>
    apiClient.get('/customers', { params }),

  getById: (id) =>
    apiClient.get(`/customers/${id}`),

  create: (data) =>
    apiClient.post('/customers', data),

  update: (id, data) =>
    apiClient.put(`/customers/${id}`, data),

  delete: (id) =>
    apiClient.delete(`/customers/${id}`),

  getMeasurements: (id) =>
    apiClient.get(`/customers/${id}/measurements`),

  updateMeasurements: (id, data) =>
    apiClient.put(`/customers/${id}/measurements`, data),
};

export default customerApi;
