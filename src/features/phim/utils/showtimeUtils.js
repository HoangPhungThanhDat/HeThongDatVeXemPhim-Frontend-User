// src/features/phim/utils/showtimeUtils.js

export const isGoldRoom = (room = '') => room?.toLowerCase().includes('gold') || false;

export const formatDuration = (minutes) => {
  if (!minutes) return 'N/A';
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return h > 0 ? `${h} giờ ${m} phút` : `${m} phút`;
};

export const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  try {
    const date = new Date(dateString);
    if (isNaN(date)) return dateString;
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  } catch {
    return dateString;
  }
};

export const groupShowtimesByCity = (data) => {
  return data?.CinemasByCity || {};
};

export const getShowtimePrice = (slot) => {
  return slot.Price ? slot.Price.toLocaleString('vi-VN') + 'đ' : '';
};

export const getShowtimeTooltip = (slot) => {
  let tooltip = slot.Room || 'Phòng chiếu';
  if (slot.RoomType) tooltip += ` - ${slot.RoomType}`;
  if (slot.Price) tooltip += ` | ${slot.Price.toLocaleString('vi-VN')}đ`;
  return tooltip;
};
