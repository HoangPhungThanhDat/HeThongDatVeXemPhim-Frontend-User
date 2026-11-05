// src/features/nguoidung/components/CapNhatTaiKhoan/LoadingState.jsx

import React from 'react';

export default function LoadingState() {
  return (
    <div
      className="sign section--bg"
      style={{
        background: '#e6e7e9',
        maxWidth: '100%',
        borderTop: '1px solid',
        minHeight: '400px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div className="text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Đang tải...</span>
        </div>
        <p style={{ marginTop: '10px', color: 'black' }}>Đang tải thông tin...</p>
      </div>
    </div>
  );
}
