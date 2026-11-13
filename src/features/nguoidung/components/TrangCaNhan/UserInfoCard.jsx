import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import {
  getUserDisplayName,
  getUserPhone,
  getUserAddress,
  getUserEmail,
  generateQRData,
} from '../../utils/userUtils';

export default function UserInfoCard({ userInfo }) {
  return (
    <div 
      className="auth-box-right" 
      style={{ 
        backgroundColor: '#fff', 
        padding: '20px', // Giảm padding một chút cho mobile
        borderRadius: '10px', 
        border: '1px solid #e0e0e0',
        boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
      }}
    >
      <h3 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '20px', color: '#333', textAlign: 'center' }}>
        Thông Tin Cá Nhân
      </h3>
      
      <div className="login-box" style={{ textAlign: 'center', padding: 0 }}>
        <p style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px', color: '#333' }}>
          {getUserDisplayName(userInfo)}
        </p>
        <p style={{ color: '#555', marginBottom: '8px' }}>
          Điện thoại: {getUserPhone(userInfo)}
        </p>
        <p style={{ color: '#555', marginBottom: '8px' }}>
          Địa chỉ: {getUserAddress(userInfo)}
        </p>
        <p style={{ color: '#555', marginBottom: '25px' }}>
          Email: {getUserEmail(userInfo)}
        </p>

        {/* Mã QR */}
        <div style={{ 
          display: 'inline-block', 
          padding: '10px', 
          border: '2px solid #f37737', 
          borderRadius: '8px', 
          marginBottom: '25px',
          maxWidth: '100%' // Đảm bảo QR không tràn khung
        }}>
          <QRCodeSVG 
            value={generateQRData(userInfo)} 
            size={160} // Giảm từ 180 xuống 160
            level="H" 
            style={{ maxWidth: '100%', height: 'auto' }} // Tự động thu nhỏ nếu màn hình quá bé
          />
        </div>

        {/* Nút thao tác - Dùng Flex Wrap để tự động rớt dòng trên mobile */}
        <div style={{ 
          display: 'flex', 
          gap: '10px', 
          justifyContent: 'center',
          flexWrap: 'wrap' // Cho phép rớt dòng
        }}>
          <a 
            href="/cap-nhat-mat-khau" 
            style={{ 
              backgroundColor: '#f37737', 
              color: 'white', 
              padding: '12px 20px', 
              borderRadius: '5px', 
              textDecoration: 'none', 
              flex: '1 1 120px', // Cho phép co giãn, tối thiểu 120px
              textAlign: 'center',
              fontWeight: '500',
              fontSize: '14px',
              whiteSpace: 'nowrap'
            }}
          >
            Đổi Mật Khẩu
          </a>
          <a 
            href="/cap-nhat-tai-khoan" 
            style={{ 
              backgroundColor: '#f37737', 
              color: 'white', 
              padding: '12px 20px', 
              borderRadius: '5px', 
              textDecoration: 'none', 
              flex: '1 1 120px', // Cho phép co giãn, tối thiểu 120px
              textAlign: 'center',
              fontWeight: '500',
              fontSize: '14px',
              whiteSpace: 'nowrap'
            }}
          >
            Cập Nhật Thông Tin
          </a>
        </div>
      </div>
    </div>
  );
}