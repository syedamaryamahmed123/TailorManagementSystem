import apiClient from './client';

const orderApi = {
  getAll: (params) =>
    apiClient.get('/orders', { params }),

  getById: (id) =>
    apiClient.get(`/orders/${id}`),

  create: (data) =>
    apiClient.post('/orders', data),

  update: (id, data) =>
    apiClient.put(`/orders/${id}`, data),

  updateStatus: (id, status) =>
    apiClient.patch(`/orders/${id}/status`, { status }),

  delete: (id) =>
    apiClient.delete(`/orders/${id}`),
};

export default orderApi;
