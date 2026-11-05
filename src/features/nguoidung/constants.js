// src/features/nguoidung/constants.js

export const STATUS_MAP = {
  pending: { text: 'Chờ xử lý', class: 'badge-warning' },
  paid: { text: 'Đã thanh toán', class: 'badge-success' },
  cancelled: { text: 'Đã hủy', class: 'badge-danger' },
  completed: { text: 'Hoàn thành', class: 'badge-info' },
};

export const DEFAULT_STATUS = { text: 'Không xác định', class: 'badge-secondary' };

export const MESSAGES = {
  LOADING: 'Đang tải thông tin...',
  ERROR: 'Không thể tải thông tin cá nhân',
  NO_TRANSACTIONS: 'Không có dữ liệu',
  NO_DATA: 'Không có giao dịch nào',
};
