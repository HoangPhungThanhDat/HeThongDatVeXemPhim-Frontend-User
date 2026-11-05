import React from 'react';

export default function UserActions() {
  return (
    <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
      <a
        href="/cap-nhat-mat-khau"
        className="btn btn-primary"
        style={{
          flex: '1',
          padding: '10px',
          textAlign: 'center',
          backgroundColor: '#f37737',
          color: 'white',
          borderRadius: '5px',
          textDecoration: 'none',
        }}
      >
        Đổi mật khẩu
      </a>
      <a
        href="/cap-nhat-tai-khoan"
        className="btn btn-secondary"
        style={{
          flex: '1',
          padding: '10px',
          textAlign: 'center',
          backgroundColor: '#6c757d',
          color: 'white',
          borderRadius: '5px',
          textDecoration: 'none',
        }}
      >
        Cập nhật thông tin
      </a>
    </div>
  );
}
