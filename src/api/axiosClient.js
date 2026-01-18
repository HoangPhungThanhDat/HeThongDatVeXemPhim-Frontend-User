import axios from "axios";


// Cấu hình base URL cho API
const axiosClient = axios.create({
  baseURL: 'http://127.0.0.1:8000/api', 
  timeout: 10000, // Timeout 10 giây
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor cho request - thêm token vào header nếu có
axiosClient.interceptors.request.use(
  (config) => {
    // Lấy token từ localStorage nếu có
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
// Kiểm tra response: nếu token hết hạn → tự động logout
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
   

      // Xóa toàn bộ thông tin đăng nhập
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("fullname");
      localStorage.removeItem("UserId");

      // Chuyển về trang đăng nhập
      window.location.href = "http://localhost:3003";
    }
    return Promise.reject(error);
  }
);
// Interceptor cho response - xử lý lỗi chung
axiosClient.interceptors.response.use(
  (response) => {
    // Trả về data trực tiếp
    return response.data;
  },
  (error) => {
    // Xử lý các lỗi phổ biến
    if (error.response) {
      // Lỗi từ server (status code khác 2xx)
      const { status } = error.response;
      
      switch (status) {
        case 401:
          // Unauthorized - token hết hạn hoặc không hợp lệ
          console.error('Phiên đăng nhập đã hết hạn');
          localStorage.removeItem('access_token');
          // Có thể redirect về trang login
          // window.location.href = '/login';
          break;
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
      // Request được gửi nhưng không nhận được response
      console.error('Không thể kết nối đến server');
    } else {
      // Lỗi khác
      console.error('Lỗi:', error.message);
    }
    
    return Promise.reject(error);
  }
);

export default axiosClient;
