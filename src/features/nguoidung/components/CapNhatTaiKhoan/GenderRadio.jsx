// src/features/nguoidung/components/CapNhatTaiKhoan/GenderRadio.jsx

import React from 'react';

export default function GenderRadio({ value, onChange, disabled = false }) {
  return (
    <div className="form-group">
      <div className="maxl">
        <label className="radio inline">
          <input
            type="radio"
            name="Gender"
            value="Male"
            checked={value === 'Male'}
            onChange={onChange}
            disabled={disabled}
          />
          <span> Nam </span>
        </label>
        <label className="radio inline">
          <input
            type="radio"
            name="Gender"
            value="Female"
            checked={value === 'Female'}
            onChange={onChange}
            disabled={disabled}
          />
          <span> Nữ </span>
        </label>
      </div>
    </div>
  );
}
