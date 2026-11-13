

import React from 'react';

export default function FormInput({
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
  disabled = false,
  required = false,
  minLength,
  maxLength,
  className = 'form-control',
}) {
  return (
    <div className="form-group">
      <input
        type={type}
        className={className}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        minLength={minLength}
        maxLength={maxLength}
      />
    </div>
  );
}
