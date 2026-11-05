// src/features/nguoidung/utils/transactionUtils.js

import { STATUS_MAP, DEFAULT_STATUS } from '../constants';

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(amount || 0);
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
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return dateString;
  }
};

export const getTransactionId = (transaction) => {
  return transaction.TransactionId || transaction.id;
};

export const getTransactionCode = (transaction) => {
  return transaction.TransactionCode || transaction.TransactionId || transaction.id;
};

export const getTransactionDate = (transaction) => {
  return transaction.CreatedAt || transaction.date || transaction.createdAt;
};

export const getTransactionAmount = (transaction) => {
  return transaction.TotalAmount || transaction.amount || transaction.Amount || 0;
};

export const getTransactionStatus = (transaction) => {
  return transaction.Status || transaction.status || 'pending';
};

export const getStatusBadge = (status) => {
  const statusInfo = STATUS_MAP[status] || DEFAULT_STATUS;
  return statusInfo;
};
