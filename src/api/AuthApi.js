import axiosClient from './axiosClient';

const authApi = {
  Login: (credentials) => axiosClient.post('/login', credentials),
  Logout: () => axiosClient.post('/logout'),
  Register: (data) => axiosClient.post('/register', data),
  RefreshToken: () => axiosClient.post('/auth/refresh'),
  GetProfile: () => axiosClient.get('/auth/me'),
  
  // ⭐ Xử lý Google Login
  googleLogin: () => {
    // Trỏ thẳng đến backend (không qua fwd.host nữa)
    window.location.href = "http://localhost/api/auth/google?app=client";
  },
  verifyGoogleToken: (token) => {
    return axiosClient.get(`/auth/google/check?token=${encodeURIComponent(token)}`);
  },
};

export default authApi;