// src/features/nguoidung/components/CapNhatTaiKhoan/CapNhatTaiKhoanForm.jsx

import React from 'react';
import FormInput from './FormInput';
import GenderRadio from './GenderRadio';
import FormActions from './FormActions';

export default function CapNhatTaiKhoanForm({
  formData,
  submitting,
  handleInputChange,
  handleGenderChange,
  handleSubmit,
}) {
  return (
    <form onSubmit={handleSubmit}>
      <div className="row register-form">
        <div className="col-md-6">
          <FormInput
            name="FullName"
            placeholder="Họ & tên (*)"
            value={formData.FullName}
            onChange={handleInputChange}
            disabled={submitting}
            required
          />
          <FormInput
            name="Address"
            placeholder="Địa chỉ"
            value={formData.Address}
            onChange={handleInputChange}
            disabled={submitting}
          />
          <FormInput
            name="DateOfBirth"
            placeholder="Ngày sinh (DD/MM/YYYY)"
            value={formData.DateOfBirth}
            onChange={handleInputChange}
            disabled={submitting}
          />
        </div>

        <div className="col-md-6">
          <FormInput
            name="PhoneNumber"
            type="tel"
            placeholder="Điện thoại (*)"
            value={formData.PhoneNumber}
            onChange={handleInputChange}
            disabled={submitting}
            required
            minLength="10"
            maxLength="10"
          />
          <FormInput
            name="Email"
            type="email"
            placeholder="Email (*)"
            value={formData.Email}
            onChange={handleInputChange}
            disabled={submitting}
            required
          />
          <GenderRadio
            value={formData.Gender}
            onChange={handleGenderChange}
            disabled={submitting}
          />

          <FormActions submitting={submitting} />
        </div>

        <p style={{ color: '#333', width: '100%', marginTop: '10px' }}>
          Vui lòng nhập đầy đủ thông tin vào các trường có đánh dấu{' '}
          <b style={{ color: 'red' }}>(*)</b>
        </p>
      </div>
    </form>
  );
}
