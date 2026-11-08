import React from 'react';

export default function TransactionRow({ transaction }) {
  // Format ngày tháng
  const formatDate = (dateString) => {
    if (!dateString) return '—';
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  };

  // Format tiền tệ
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount || 0);
  };

  // Lấy trạng thái
  const status = transaction.Status || transaction.status || 'Pending';

  // Map trạng thái ra text và màu sắc (Badge)
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Paid':
        return { text: 'Đã thanh toán', color: '#28a745', bg: '#e8f5e9' };
      case 'Cancelled':
        return { text: 'Đã hủy', color: '#dc3545', bg: '#ffebee' };
      case 'Pending':
      default:
        return { text: 'Chờ thanh toán', color: '#e67e22', bg: '#fff3e0' };
    }
  };

  const statusInfo = getStatusBadge(status);

  return (
    <tr>
      {/* Mã đơn hàng */}
      <td style={{ fontWeight: 'bold' }}>
        DH{String(transaction.OrderId || transaction.id).padStart(5, '0')}
      </td>
      
      {/* Ngày đặt */}
      <td>{formatDate(transaction.OrderDate || transaction.created_at)}</td>
      
      {/* Tổng tiền */}
      <td style={{ color: '#d35400', fontWeight: 'bold' }}>
        {formatCurrency(transaction.TotalAmount || transaction.total_amount)}
      </td>
      
      {/* Trạng thái */}
      <td>
        <span style={{
          padding: '4px 10px',
          borderRadius: '20px',
          fontSize: '12px',
          fontWeight: '600',
          color: statusInfo.color,
          backgroundColor: statusInfo.bg,
          display: 'inline-block'
        }}>
          {statusInfo.text}
        </span>
      </td>
    </tr>
  );
}