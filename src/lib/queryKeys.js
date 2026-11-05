// src/lib/queryKeys.js
// Quản lý tập trung các query key — tránh gõ sai, dễ invalidate sau này
export const queryKeys = {
  phim: {
    dangChieu: ['phim', 'dang-chieu'],
    sapChieu: ['phim', 'sap-chieu'],
    chiTiet: (id) => ['phim', 'chi-tiet', id],
  },
  rap: {
    danhSach: ['rap', 'danh-sach'],
    chiTiet: (id) => ['rap', 'chi-tiet', id],
  },
  lichChieu: {
    theoPhim: (movieId) => ['lich-chieu', 'theo-phim', movieId],
    theoRap: (cinemaId) => ['lich-chieu', 'theo-rap', cinemaId],
  },
  khuyenMai: {
    danhSach: ['khuyen-mai', 'danh-sach'],
    chiTiet: (id) => ['khuyen-mai', 'chi-tiet', id],
  },
  tinTuc: {
    danhSach: ['tin-tuc', 'danh-sach'],
    chiTiet: (id) => ['tin-tuc', 'chi-tiet', id],
  },
};