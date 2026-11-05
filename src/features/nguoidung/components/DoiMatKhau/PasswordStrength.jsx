// src/features/nguoidung/components/DoiMatKhau/PasswordStrength.jsx

import React from 'react';
import { checkPasswordStrength } from '../../utils/passwordUtils';

export default function PasswordStrength({ password }) {
  if (!password) return null;

  const strength = checkPasswordStrength(password);
  const isMatch = password.length > 0;

  return (
    <div className="password-strength">
      <span className={strength.class}>
        {strength.level === 0 ? '⚠ ' : '✓ '}
        {strength.label}
      </span>
    </div>
  );
}
