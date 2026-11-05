// src/features/nguoidung/components/CapNhatTaiKhoan/ProfileImage.jsx

import React from 'react';
import bannergau2 from '../../../../assets/images/banners/bannergau2.png';

export default function ProfileImage() {
  return (
    <div className="col-md-3 register-left">
      <img
        src={bannergau2}
        alt="logo"
        style={{
          width: '2000px',
          height: 'auto',
          display: 'block',
        }}
      />
      <p>Cập nhật thông tin tài khoản của bạn!</p>
      <br />
    </div>
  );
}
