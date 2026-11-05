import React from 'react';

export default function LoadingSpinner({ message = 'Đang tải lịch chiếu...' }) {
  return (
    <div style={{ textAlign: 'center', padding: '50px 0' }}>
      <i className="fa fa-spinner fa-spin" style={{ fontSize: '36px', color: '#f37737' }} />
      <p style={{ marginTop: '12px', color: '#666' }}>{message}</p>
    </div>
  );
}
