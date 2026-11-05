// src/features/nguoidung/hooks/useDoiMatKhau.js

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosClient from '../../../api/axiosClient';
import Swal from 'sweetalert2';

export function useDoiMatKhau() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    current_password: '',
    new_password: '',
    new_password_confirmation: '',
  });

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    // Validate mật khẩu cũ
    if (!formData.current_password) {
      showErrorToast('Vui lòng nhập mật khẩu hiện tại');
      return false;
    }

    // Validate mật khẩu mới
    if (!formData.new_password) {
      showErrorToast('Vui lòng nhập mật khẩu mới');
      return false;
    }

    if (formData.new_password.length < 6) {
      showErrorToast('Mật khẩu mới phải có ít nhất 6 ký tự');
      return false;
    }

    // Validate xác nhận mật khẩu
    if (!formData.new_password_confirmation) {
      showErrorToast('Vui lòng xác nhận mật khẩu mới');
      return false;
    }

    if (formData.new_password !== formData.new_password_confirmation) {
      showErrorToast('Mật khẩu xác nhận không khớp');
      return false;
    }

    // Kiểm tra mật khẩu mới khác mật khẩu cũ
    if (formData.current_password === formData.new_password) {
      showErrorToast('Mật khẩu mới phải khác mật khẩu hiện tại');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setSubmitting(true);

    try {
      const token = localStorage.getItem('token');

      const dataToSend = {
        current_password: formData.current_password,
        new_password: formData.new_password,
        new_password_confirmation: formData.new_password_confirmation,
      };

      console.log('Đang gửi yêu cầu đổi mật khẩu...');

      const response = await axiosClient.put('/change-password', dataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('Response đầy đủ:', response);
      console.log('Response data:', response.data);

      const responseData = response?.data || response;
      const successMessage = responseData?.message || 'Đổi mật khẩu thành công!';

      showSuccessToast('🎉 ' + successMessage);

      setFormData({
        current_password: '',
        new_password: '',
        new_password_confirmation: '',
      });

      setTimeout(() => {
        navigate('/thong-tin-ca-nhan');
      }, 2000);
    } catch (error) {
      console.error('Lỗi khi đổi mật khẩu:', error);
      console.error('Chi tiết lỗi:', error.response);

      if (error.response?.status === 401) {
        showErrorToast('Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại');
        localStorage.clear();
        setTimeout(() => {
          navigate('/dang-nhap');
        }, 1500);
      } else if (error.response?.status === 422) {
        const errorData = error.response.data;

        if (errorData.message) {
          showErrorToast(errorData.message);
        } else if (errorData.errors) {
          const errorMessages = Object.values(errorData.errors).flat().join(', ');
          showErrorToast(errorMessages);
        } else {
          showErrorToast('Dữ liệu không hợp lệ. Vui lòng kiểm tra lại');
        }
      } else if (error.response?.status === 500) {
        showErrorToast(error.response?.data?.message || 'Lỗi hệ thống. Vui lòng thử lại sau');
      } else {
        showErrorToast(error.response?.data?.message || 'Đổi mật khẩu thất bại. Vui lòng thử lại');
      }
    } finally {
      setSubmitting(false);
    }
  };

  const toggleShowOldPassword = () => setShowOldPassword(!showOldPassword);
  const toggleShowNewPassword = () => setShowNewPassword(!showNewPassword);
  const toggleShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  return {
    formData,
    submitting,
    showOldPassword,
    showNewPassword,
    showConfirmPassword,
    handleInputChange,
    handleSubmit,
    toggleShowOldPassword,
    toggleShowNewPassword,
    toggleShowConfirmPassword,
  };
}
