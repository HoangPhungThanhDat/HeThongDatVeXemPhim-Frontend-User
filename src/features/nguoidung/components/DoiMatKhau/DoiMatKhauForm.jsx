// src/features/nguoidung/components/DoiMatKhau/DoiMatKhauForm.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import PasswordInput from './PasswordInput';
import PasswordStrength from './PasswordStrength';
import PasswordConfirm from './PasswordConfirm';
import PasswordNotes from './PasswordNotes';

export default function DoiMatKhauForm({
  formData,
  submitting,
  showOldPassword,
  showNewPassword,
  showConfirmPassword,
  handleInputChange,
  handleSubmit,
  toggleShowOldPassword,
  toggleShowNewPassword,
  toggleShowConfirmPassword,
}) {
  return (
    <form onSubmit={handleSubmit}>
      <div className="row register-form">
        <div className="col-md-6">
          {/* Mật khẩu hiện tại */}
          <PasswordInput
            name="current_password"
            placeholder="Mật khẩu hiện tại (*)"
            value={formData.current_password}
            onChange={handleInputChange}
            showPassword={showOldPassword}
            toggleShow={toggleShowOldPassword}
            disabled={submitting}
          />
        </div>

        <div className="col-md-6">
          {/* Mật khẩu mới */}
          <div className="form-group">
            <PasswordInput
              name="new_password"
              placeholder="Mật khẩu mới (*)"
              value={formData.new_password}
              onChange={handleInputChange}
              showPassword={showNewPassword}
              toggleShow={toggleShowNewPassword}
              disabled={submitting}
            />
            <PasswordStrength password={formData.new_password} />
          </div>

          {/* Xác nhận mật khẩu mới */}
          <div className="form-group">
            <PasswordInput
              name="new_password_confirmation"
              placeholder="Xác nhận mật khẩu mới (*)"
              value={formData.new_password_confirmation}
              onChange={handleInputChange}
              showPassword={showConfirmPassword}
              toggleShow={toggleShowConfirmPassword}
              disabled={submitting}
            />
            <PasswordConfirm
              password={formData.new_password}
              confirmation={formData.new_password_confirmation}
            />
          </div>

          {/* Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginTop: '20px' }}>
            <Link
              to="/thong-tin-ca-nhan"
              style={{
                color: '#f37737',
                textDecoration: 'none',
                display: 'inline-block',
                fontSize: '14px',
                whiteSpace: 'nowrap',
              }}
            >
              <i className="fa fa-arrow-left"></i> Quay lại trang thông tin
            </Link>
            <input
              type="submit"
              className="btnRegister"
              value={submitting ? 'Đang cập nhật...' : 'Đổi mật khẩu'}
              disabled={submitting}
              style={{
                cursor: submitting ? 'not-allowed' : 'pointer',
                opacity: submitting ? 0.7 : 1,
                margin: 0,
              }}
            />
          </div>
        </div>

        <div className="col-md-12">
          <PasswordNotes />
        </div>

        <p style={{ color: '#333', width: '100%', marginTop: '10px' }}>
          Vui lòng nhập đầy đủ thông tin vào các trường có đánh dấu{' '}
          <b style={{ color: 'red' }}>(*)</b>
        </p>
      </div>
    </form>
  );
}
