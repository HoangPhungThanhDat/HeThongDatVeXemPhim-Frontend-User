// src/features/nguoidung/components/DoiMatKhau/PasswordInput.jsx

import React from 'react';

export default function PasswordInput({
  name,
  placeholder,
  value,
  onChange,
  showPassword,
  toggleShow,
  disabled,
  required = true,
}) {
  return (
    <div className="form-group">
      <div className="password-input-wrapper">
        <input
          type={showPassword ? 'text' : 'password'}
          className="form-control"
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
        />
        <i
          className={`fa ${showPassword ? 'fa-eye-slash' : 'fa-eye'} password-toggle-icon`}
          onClick={toggleShow}
        ></i>
      </div>
    </div>
  );
}
