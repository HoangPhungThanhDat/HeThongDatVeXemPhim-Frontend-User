import React from 'react';
import {
  getUserDisplayName,
  getUserPhone,
  getUserAddress,
  getUserEmail,
} from '../../utils/userUtils';

export default function UserInfoCard({ userInfo }) {
  return (
    <div className="auth-box-right">
      <h3>Thông tin cá nhân</h3>
      <div className="login-box">
        <p>
          <strong>Họ tên:</strong> {getUserDisplayName(userInfo)}
        </p>
        <p>
          <strong>Điện thoại:</strong> {getUserPhone(userInfo)}
        </p>
        <p>
          <strong>Địa chỉ:</strong> {getUserAddress(userInfo)}
        </p>
        <p>
          <strong>Email:</strong> {getUserEmail(userInfo)}
        </p>
      </div>
    </div>
  );
}
