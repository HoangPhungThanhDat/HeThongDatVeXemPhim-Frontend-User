// src/features/nguoidung/hooks/useCapNhatTaiKhoan.js

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosClient from '../../../api/axiosClient';
import Swal from 'sweetalert2';
import { formatDateToDisplay, formatDateToApi, validateProfileForm } from '../utils/profileUtils';

export function useCapNhatTaiKhoan() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    FullName: '',
    Email: '',
    PhoneNumber: '',
    Address: '',
    DateOfBirth: '',
    Gender: 'Male',
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/dang-nhap');
      return;
    }
    fetchUserProfile();
  }, [navigate]);

  // Toast thông báo thành công
  const showSuccessToast = (message) => {
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'success',
      title: message,
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      customClass: {
        popup: 'swal-success-toast',
      },
      showClass: {
        popup: 'animate__animated animate__slideInRight',
      },
      hideClass: {
        popup: 'animate__animated animate__slideOutRight',
      },
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
    });
  };

  // Toast thông báo lỗi
  const showErrorToast = (message) => {
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'error',
      title: message,
      showConfirmButton: false,
      timer: 4000,
      timerProgressBar: true,
      customClass: {
        popup: 'swal-error-toast',
      },
      showClass: {
        popup: 'animate__animated animate__slideInRight',
      },
      hideClass: {
        popup: 'animate__animated animate__slideOutRight',
      },
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
    });
  };

  // Lấy thông tin user từ endpoint /profile
  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem('token');

      const response = await axiosClient.get('/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const userData = response.data.data || response.data;

      console.log('User data:', userData);

      setFormData({
        FullName: userData.FullName || '',
        Email: userData.Email || '',
        PhoneNumber: userData.PhoneNumber || '',
        Address: userData.Address || '',
        DateOfBirth: formatDateToDisplay(userData.DateOfBirth),
        Gender: userData.Gender || 'Male',
      });

      setLoading(false);
    } catch (error) {
      console.error('Lỗi khi lấy thông tin user:', error);

      if (error.response?.status === 401) {
        localStorage.clear();
        navigate('/dang-nhap');
      } else {
        showErrorToast('Không thể tải thông tin cá nhân');
        setLoading(false);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleGenderChange = (e) => {
    setFormData({
      ...formData,
      Gender: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validation = validateProfileForm(formData);
    if (!validation.isValid) {
      showErrorToast(validation.message);
      return;
    }

    setSubmitting(true);

    try {
      const token = localStorage.getItem('token');

      const dataToSend = {
        FullName: formData.FullName,
        Email: formData.Email,
        PhoneNumber: formData.PhoneNumber,
        Address: formData.Address,
        DateOfBirth: formatDateToApi(formData.DateOfBirth),
        Gender: formData.Gender,
      };

      console.log('Đang gửi dữ liệu:', dataToSend);

      const response = await axiosClient.put('/profile', dataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('Cập nhật thành công:', response.data);

      if (response.data.data) {
        localStorage.setItem('fullname', response.data.data.FullName);
      }

      showSuccessToast('🎉 ' + (response.data.message || 'Cập nhật thông tin thành công!'));

      setTimeout(() => {
        navigate('/thong-tin-ca-nhan');
      }, 2000);
    } catch (error) {
      console.error('Lỗi khi cập nhật thông tin:', error);
      console.error('Chi tiết lỗi:', error.response);

      if (error.response?.status === 401) {
        localStorage.clear();
        navigate('/dang-nhap');
      } else if (error.response?.status === 422) {
        const errorData = error.response.data;

        if (errorData.errors) {
          const errorMessages = Object.values(errorData.errors).flat().join(', ');
          showErrorToast(errorMessages);
        } else if (errorData.message) {
          showErrorToast(errorData.message);
        } else {
          showErrorToast('Dữ liệu không hợp lệ. Vui lòng kiểm tra lại thông tin');
        }
      } else {
        showErrorToast(error.response?.data?.message || 'Cập nhật thất bại. Vui lòng thử lại');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return {
    formData,
    loading,
    submitting,
    handleInputChange,
    handleGenderChange,
    handleSubmit,
  };
}
