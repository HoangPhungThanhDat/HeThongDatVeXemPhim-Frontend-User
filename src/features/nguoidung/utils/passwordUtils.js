// src/features/nguoidung/utils/passwordUtils.js

export const validatePassword = (password) => {
  if (!password) return { isValid: false, message: 'Vui lòng nhập mật khẩu' };
  if (password.length < 6) return { isValid: false, message: 'Mật khẩu phải có ít nhất 6 ký tự' };
  return { isValid: true, message: '' };
};

export const validatePasswordMatch = (password, confirmation) => {
  if (!confirmation) return { isValid: false, message: 'Vui lòng xác nhận mật khẩu mới' };
  if (password !== confirmation) return { isValid: false, message: 'Mật khẩu xác nhận không khớp' };
  return { isValid: true, message: '' };
};

export const checkPasswordStrength = (password) => {
  if (!password) return { level: 0, label: '', class: '' };

  const length = password.length;
  const hasLower = /[a-z]/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  const score = [hasLower, hasUpper, hasNumber, hasSpecial].filter(Boolean).length;

  if (length < 6) {
    return { level: 0, label: 'Yếu (tối thiểu 6 ký tự)', class: 'strength-weak' };
  }

  if (length >= 6 && length < 10 && score >= 2) {
    return { level: 1, label: 'Trung bình', class: 'strength-medium' };
  }

  if (length >= 10 && score >= 3) {
    return { level: 2, label: 'Mạnh', class: 'strength-strong' };
  }

  return { level: 1, label: 'Trung bình', class: 'strength-medium' };
};

export const getPasswordValidationMessage = (password, confirmation) => {
  const passwordValidation = validatePassword(password);
  if (!passwordValidation.isValid) return passwordValidation.message;

  if (confirmation) {
    const matchValidation = validatePasswordMatch(password, confirmation);
    if (!matchValidation.isValid) return matchValidation.message;
  }

  return '';
};
