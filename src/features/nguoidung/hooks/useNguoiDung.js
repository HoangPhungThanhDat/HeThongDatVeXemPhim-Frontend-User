import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosClient from '../../../api/axiosClient';

export function useNguoiDung() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [transactions, setTransactions] = useState([]);
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
    fetchTransactions();
  }, []);

  const fetchUserInfo = async () => {
    try {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('UserId');

      const response = await axiosClient.get(`/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUserInfo(response.data);
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

  const fetchTransactions = async () => {
    try {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('UserId');

      const response = await axiosClient.get(`/users/${userId}/transactions`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setTransactions(response.data || []);
    } catch (error) {
      console.error('Lỗi khi lấy lịch sử giao dịch:', error);
      if (error.response?.status !== 404) {
        setTransactions([]);
      }
    }
  };

  return {
    userInfo,
    transactions,
    loading,
    error,
    refetch: () => {
      fetchUserInfo();
      fetchTransactions();
    },
  };
}
