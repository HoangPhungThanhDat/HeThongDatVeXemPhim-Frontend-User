// src/features/nguoidung/utils/profileUtils.js

export const formatDateToDisplay = (dateString) => {
  if (!dateString) return '';
  try {
    const date = new Date(dateString);
    if (isNaN(date)) return '';
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  } catch {
    return '';
  }
};

export const formatDateToApi = (dateString) => {
  if (!dateString) return null;
  const parts = dateString.split('/');
  if (parts.length === 3) {
    const [day, month, year] = parts;
    return `${year}-${month}-${day}`;
  }
  return null;
};

export const validateFullName = (name) => {
  if (!name || name.trim().length < 2) {
    return { isValid: false, message: 'Họ tên phải có ít nhất 2 ký tự' };
  }
  return { isValid: true, message: '' };
};

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return { isValid: false, message: 'Email không hợp lệ' };
  }
  return { isValid: true, message: '' };
};

export const validatePhone = (phone) => {
  if (!phone) {
    return { isValid: false, message: 'Vui lòng nhập số điện thoại' };
  }
  const phoneRegex = /^[0-9]{10}$/;
  if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
    return { isValid: false, message: 'Số điện thoại phải có đúng 10 chữ số' };
  }
  return { isValid: true, message: '' };
};

export const validateDateOfBirth = (date) => {
  if (!date) return { isValid: true, message: '' };
  const dateRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
  if (!dateRegex.test(date)) {
    return { isValid: false, message: 'Ngày sinh phải có định dạng DD/MM/YYYY' };
  }
  return { isValid: true, message: '' };
};

export const validateProfileForm = (formData) => {
  const validations = {
    FullName: validateFullName(formData.FullName),
    Email: validateEmail(formData.Email),
    PhoneNumber: validatePhone(formData.PhoneNumber),
    DateOfBirth: validateDateOfBirth(formData.DateOfBirth),
  };

  for (const [field, result] of Object.entries(validations)) {
    if (!result.isValid) {
      return { isValid: false, message: result.message, field };
    }
  }

  return { isValid: true, message: '' };
};
