// src/features/datve/components/ghe/utils.js

import { SEAT_COLORS } from './constants';

export const isVipSeat = (type) => type === 'VIP';
export const isCoupleSeat = (type) => type === 'Couple';
export const isSeatSold = (status) =>
  status === 'Reserved' || status === 'Broken' || status === 'Inactive';

export const getSeatPrice = (seatType, basePrice) => {
  switch (seatType) {
    case 'VIP':
      return Math.round(basePrice * 1.5);
    case 'Couple':
      return Math.round(basePrice * 1.0);
    default:
      return Math.round(basePrice * 1.0);
  }
};

export const getSeatColors = (seatType) => {
  return SEAT_COLORS[seatType] || SEAT_COLORS.Normal;
};

export const formatPrice = (price) => price.toLocaleString('vi-VN') + 'đ';

export const formatDisplayTime = (timeStr) => {
  if (!timeStr) return '—';
  if (timeStr.includes(':')) {
    const parts = timeStr.split(':');
    return `${parts[0]}:${parts[1]}`;
  }
  return timeStr;
};

export const formatDisplayDate = (dateStr) => {
  if (!dateStr) return '—';
  try {
    const date = new Date(dateStr);
    if (isNaN(date)) return dateStr;
    return date.toLocaleDateString('vi-VN', {
      weekday: 'long',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  } catch {
    return dateStr;
  }
};
