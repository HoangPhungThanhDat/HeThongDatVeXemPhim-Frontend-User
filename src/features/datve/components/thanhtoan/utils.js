// src/features/datve/components/thanhtoan/utils.js

export const formatPrice = (n) => new Intl.NumberFormat('vi-VN').format(n) + 'đ';

export const formatCardNumber = (val) => {
  return val
    .replace(/\D/g, '')
    .slice(0, 16)
    .replace(/(.{4})/g, '$1 ')
    .trim();
};

export const formatExpiry = (val) => {
  const v = val.replace(/\D/g, '').slice(0, 4);
  return v.length >= 3 ? v.slice(0, 2) + '/' + v.slice(2) : v;
};

export const formatDisplayTime = (t) =>
  t && t.includes(':') ? t.split(':').slice(0, 2).join(':') : t || '—';

export const formatDisplayDate = (d) => {
  if (!d) return '—';
  const date = new Date(d);
  return isNaN(date)
    ? d
    : date.toLocaleDateString('vi-VN', {
        weekday: 'long',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });
};

export const getUserInfo = () => {
  return {
    fullname: localStorage.getItem('fullname') || '',
    email: localStorage.getItem('email') || '',
    phone: localStorage.getItem('phone') || '',
    userId: localStorage.getItem('UserId') || '',
  };
};

export const generateBookingCode = () => {
  return 'GAU' + Math.random().toString(36).slice(2, 8).toUpperCase();
};
