// src/api/ContactApi.js
import axiosClient from './axiosClient';

const ContactApi = {
  // Lấy tất cả liên hệ
  getAll: () => axiosClient.get('/contacts'),

  // Tạo liên hệ mới
  create: (data) => axiosClient.post('/contacts', data),

  // Lấy 1 liên hệ theo ID
  getById: (id) => axiosClient.get(`/contacts/${id}`),

  // Cập nhật liên hệ
  update: (id, data) => axiosClient.put(`/contacts/${id}`, data),

  // Xóa liên hệ
  delete: (id) => axiosClient.delete(`/contacts/${id}`),
};

export default ContactApi;