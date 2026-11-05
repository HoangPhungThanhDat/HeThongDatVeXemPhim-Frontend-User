// src/features/nguoidung/components/DoiMatKhau/PasswordNotes.jsx

import React from 'react';

export default function PasswordNotes() {
  return (
    <div
      style={{
        backgroundColor: '#fff3cd',
        border: '1px solid #ffc107',
        borderRadius: '5px',
        padding: '15px',
        marginTop: '20px',
      }}
    >
      <h6 style={{ color: '#856404', marginBottom: '10px' }}>
        <i className="fa fa-info-circle"></i> Lưu ý khi đổi mật khẩu:
      </h6>
      <ul style={{ color: '#856404', fontSize: '13px', marginBottom: 0, paddingLeft: '20px' }}>
        <li>Mật khẩu phải có ít nhất 6 ký tự</li>
        <li>Nên sử dụng kết hợp chữ hoa, chữ thường, số và ký tự đặc biệt</li>
        <li>Không sử dụng mật khẩu quá đơn giản hoặc dễ đoán</li>
        <li>Mật khẩu mới phải khác với mật khẩu cũ</li>
      </ul>
    </div>
  );
}
