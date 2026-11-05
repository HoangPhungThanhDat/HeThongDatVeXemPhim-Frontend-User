// src/features/nguoidung/components/CapNhatTaiKhoan/FormActions.jsx

import React from 'react';
import { Link } from 'react-router-dom';

export default function FormActions({ submitting }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
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
        value={submitting ? 'Đang cập nhật...' : 'Cập nhật'}
        disabled={submitting}
        style={{
          cursor: submitting ? 'not-allowed' : 'pointer',
          opacity: submitting ? 0.7 : 1,
          margin: 0,
        }}
      />
    </div>
  );
}
