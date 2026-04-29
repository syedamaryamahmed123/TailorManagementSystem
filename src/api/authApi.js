import apiClient from './client';

const authApi = {
  login: (email, password) =>
    apiClient.post('/auth/login', { email, password }),

  register: (data) =>
    apiClient.post('/auth/register', data),

  logout: () =>
    apiClient.post('/auth/logout'),

  getProfile: () =>
    apiClient.get('/auth/profile'),

  updateProfile: (data) =>
    apiClient.put('/auth/profile', data),

  changePassword: (currentPassword, newPassword) =>
    apiClient.put('/auth/password', { currentPassword, newPassword }),
};

export default authApi;
