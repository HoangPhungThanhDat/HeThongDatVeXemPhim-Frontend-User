// src/features/nguoidung/components/DoiMatKhau/PasswordConfirm.jsx

import React from 'react';

export default function PasswordConfirm({ password, confirmation }) {
  if (!confirmation) return null;

  const isMatch = password === confirmation && password.length > 0;

  return (
    <div className="password-strength">
      {isMatch ? (
        <span className="strength-strong">✓ Mật khẩu khớp</span>
      ) : (
        <span className="strength-weak">✗ Mật khẩu không khớp</span>
      )}
    </div>
  );
}
