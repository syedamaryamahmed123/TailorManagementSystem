import apiClient from './client';

const designApi = {
  getAll: (params) =>
    apiClient.get('/designs', { params }),

  getById: (id) =>
    apiClient.get(`/designs/${id}`),

  create: (formData) =>
    apiClient.post('/designs', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),

  update: (id, data) =>
    apiClient.put(`/designs/${id}`, data),

  delete: (id) =>
    apiClient.delete(`/designs/${id}`),

  uploadImage: (id, formData) =>
    apiClient.post(`/designs/${id}/images`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
};

export default designApi;
