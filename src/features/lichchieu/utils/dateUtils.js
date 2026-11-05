// FIX: Dùng local time thay vì toISOString() để tránh lệch múi giờ UTC+7
export const toLocalDateStr = (d) => {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// Helper: tạo 7 ngày từ hôm nay (giờ Việt Nam)
export const generateDates = () => {
  const days = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
  const result = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date();
    d.setDate(d.getDate() + i);
    result.push({
      label: i === 0 ? 'Hôm Nay' : days[d.getDay()],
      dateStr: toLocalDateStr(d),
      display: d.toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      }),
    });
  }
  return result;
};

// Helper: kiểm tra suất chiếu đã qua chưa
export const isShowtimePast = (selectedDate, startTime) => {
  const today = toLocalDateStr(new Date());
  if (selectedDate !== today) return false;
  const now = new Date();
  const [hour, minute] = startTime.split(':').map(Number);
  const showDate = new Date();
  showDate.setHours(hour, minute, 0, 0);
  return showDate < now;
};
