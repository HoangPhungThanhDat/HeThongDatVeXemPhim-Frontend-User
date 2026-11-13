// src/features/nguoidung/utils/userUtils.js

export const generateQRData = (userInfo) => {
  if (!userInfo) return '';

  // ✅ RÚT GỌN: Chỉ lấy ID và Số điện thoại (để tra cứu), bỏ tên/địa chỉ để QR không bị dày.
  // Ví dụ trả về: "35|0559658221"
  const userId = userInfo.UserId || '0';
  const phone = userInfo.PhoneNumber || 'N/A';
  
  return `${userId}|${phone}`;
};

export const getUserDisplayName = (user) => {
  return user?.FullName || 'N/A';
};

export const getUserPhone = (user) => {
  return user?.PhoneNumber || 'Chưa cập nhật';
};

export const getUserAddress = (user) => {
  return user?.Address || 'Chưa cập nhật';
};

export const getUserEmail = (user) => {
  return user?.Email || 'N/A';
};

export const getLoyaltyPoints = (user) => {
  return user?.LoyaltyPoints || 0;
};

export const getRewardPoints = (user) => {
  return user?.RewardPoints || 0;
};