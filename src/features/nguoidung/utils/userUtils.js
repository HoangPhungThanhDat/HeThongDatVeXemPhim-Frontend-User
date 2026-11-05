// src/features/nguoidung/utils/userUtils.js

export const generateQRData = (userInfo) => {
  if (!userInfo) return '';

  const qrData = {
    name: userInfo.FullName,
    phone: userInfo.PhoneNumber || 'N/A',
    email: userInfo.Email,
    address: userInfo.Address || 'N/A',
    userId: userInfo.UserId,
  };

  return JSON.stringify(qrData);
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
