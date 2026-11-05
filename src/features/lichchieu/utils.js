import { DEFAULT_CINEMA_IMAGE, DEFAULT_PHONE } from './constants';

export const handleImageError = (e) => {
  e.target.src = DEFAULT_CINEMA_IMAGE;
};

export const getCinemaImage = (cinema) => {
  return cinema.ImageUrl || DEFAULT_CINEMA_IMAGE;
};

export const getCinemaPhone = (cinema) => {
  return cinema.Phone || DEFAULT_PHONE;
};

export const getCinemaName = (cinema) => {
  return cinema.Name || 'Rạp chiếu phim';
};

export const getCinemaAddress = (cinema) => {
  return cinema.Address || 'Đang cập nhật';
};
