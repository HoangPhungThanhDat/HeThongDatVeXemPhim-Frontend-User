import axios from "axios";

const axiosClient = axios.create({
  baseURL: 'http://127.0.0.1:8000/api', 
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - thêm token
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - chỉ 1 cái thôi
axiosClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response) {
      const { status } = error.response;
      const url = error.config?.url || "";

      // Chỉ redirect về login khi 401 VÀ route cần auth
      // Các route public như /contacts không cần redirect
      const publicRoutes = ["/contacts"];
      const isPublicRoute = publicRoutes.some((route) => url.includes(route));

      if (status === 401 && !isPublicRoute) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("fullname");
        localStorage.removeItem("UserId");
        window.location.href = "http://localhost:3003";
        return new Promise(() => {}); // Dừng xử lý tiếp
      }

      switch (status) {
        case 403:
          console.error('Bạn không có quyền truy cập');
          break;
        case 404:
          console.error('Không tìm thấy dữ liệu');
          break;
        case 500:
          console.error('Lỗi server');
          break;
        default:
          console.error('Có lỗi xảy ra:', error.response.data?.message);
      }
    } else if (error.request) {
      console.error('Không thể kết nối đến server');
    } else {
      console.error('Lỗi:', error.message);
    }

    return Promise.reject(error);
  }
);

export default axiosClient;