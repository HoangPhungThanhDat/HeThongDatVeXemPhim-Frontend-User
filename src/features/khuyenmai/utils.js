import { DEFAULT_IMAGE } from './constants';

export const handleImageError = (e) => {
  e.target.src = DEFAULT_IMAGE;
};

export const formatPromotionData = (data) => {
  return Array.isArray(data) ? data : [];
};

export const getPromotionId = (promotion) => {
  return promotion.PromotionId || promotion.id || promotion._id;
};

export const getPromotionTitle = (promotion) => {
  return promotion.Title || promotion.title || promotion.name || 'Khuyến mãi';
};

export const getPromotionImage = (promotion) => {
  return promotion.ImageUrl || promotion.image || promotion.imageUrl || DEFAULT_IMAGE;
};

// 🔧 Format nội dung để tự động ngắt dòng - GIỮ NGUYÊN
export const formatDescription = (content) => {
  if (!content) return '';
  return content.replace(/\r\n/g, '<br/>').replace(/\n/g, '<br/>').replace(/\r/g, '<br/>');
};
