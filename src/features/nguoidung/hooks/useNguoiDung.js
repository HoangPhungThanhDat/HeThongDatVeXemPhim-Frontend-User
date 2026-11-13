import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosClient from '../../../api/axiosClient';

export function useNguoiDung() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Kiểm tra đăng nhập
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/dang-nhap');
      return;
    }

    fetchUserInfo();
  }, [navigate]); // Thêm navigate vào dependency array

  const fetchUserInfo = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('UserId');
      
      // Sử dụng endpoint /profile thay vì /users/{id} để bảo mật hơn (chỉ lấy được thông tin của chính mình)
      // Hoặc giữ nguyên /users/{userId} nếu backend cho phép public
      const response = await axiosClient.get(`/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Xử lý bóc tách data (tùy thuộc API trả về Resource hay bọc trong data)
      const data = response.data.data || response.data;
      setUserInfo(data);
    } catch (error) {
      console.error('Lỗi khi lấy thông tin user:', error);

      if (error.response?.status === 401) {
        localStorage.clear();
        navigate('/dang-nhap');
      } else {
        setError('Không thể tải thông tin cá nhân');
      }
    } finally {
      setLoading(false);
    }
  };

  // ❌ ĐÃ XÓA hàm fetchTransactions vì đã chuyển sang dùng API /my-orders ở TrangCaNhanPage.jsx

  return {
    userInfo,
    loading,
    error,
    refetch: fetchUserInfo,
  };
}