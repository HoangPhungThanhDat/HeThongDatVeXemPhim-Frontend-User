import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost/api';

const axiosClient = axios.create({
  baseURL: API_BASE,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
  withCredentials: true, // Bắt buộc để nhận HttpOnly cookie
});

// Request: Gắn Bearer token
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token && !config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response: Tự động refresh khi 401
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((p) => (error ? p.reject(error) : p.resolve(token)));
  failedQueue = [];
};

const PUBLIC_ROUTES = ['/login', '/register', '/auth/refresh', '/auth/google', '/contacts'];
const isPublicRoute = (url = '') => PUBLIC_ROUTES.some((r) => url.includes(r));

const forceLogout = () => {
  ['access_token', 'token', 'role', 'fullname', 'UserId', 'email', 'phone', 'user'].forEach((k) => localStorage.removeItem(k));
  if (!window.location.pathname.includes('dang-nhap')) {
    window.location.href = '/dang-nhap';
  }
};

axiosClient.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const originalRequest = error.config || {};
    const status = error.response?.status;
    const url = originalRequest.url || '';

    if (status === 401 && !originalRequest._retry && !isPublicRoute(url)) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(() => axiosClient(originalRequest)).catch((e) => Promise.reject(e));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshRes = await axios.post(`${API_BASE}/auth/refresh`, {}, { withCredentials: true });
        const payload = refreshRes.data?.data ?? refreshRes.data;
        const newToken = payload?.access_token || payload?.token;
        if (!newToken) throw new Error('Refresh failed');

        localStorage.setItem('access_token', newToken);
        localStorage.setItem('token', newToken);
        axiosClient.defaults.headers.common.Authorization = `Bearer ${newToken}`;
        originalRequest.headers = originalRequest.headers || {};
        originalRequest.headers.Authorization = `Bearer ${newToken}`;

        processQueue(null, newToken);
        return axiosClient(originalRequest);
      } catch (e) {
        processQueue(e, null);
        forceLogout();
        return Promise.reject(e);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  }
);

export default axiosClient;