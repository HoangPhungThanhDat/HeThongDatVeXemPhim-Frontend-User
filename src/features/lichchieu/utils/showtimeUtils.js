export const groupShowtimesByRoom = (showtimes) => {
  if (!Array.isArray(showtimes)) return {};

  return showtimes.reduce((acc, st) => {
    const key = `${st.Room || 'Phòng'}||${st.RoomType || '2D'}`;
    if (!acc[key]) acc[key] = [];
    acc[key].push(st);
    return acc;
  }, {});
};

export const formatPrice = (price) => {
  if (!price) return '';
  return `${Number(price).toLocaleString('vi-VN')} đ`;
};

export const getDefaultPoster = () => '/assets/images/default-poster.jpg';
