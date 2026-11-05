// src/features/phim/components/PhimDangChieu/LoadingState.jsx

import React from 'react';

export default function LoadingState() {
  return (
    <div
      style={{
        width: '100%',
        textAlign: 'center',
        padding: '50px 0',
        fontSize: '18px',
      }}
    >
      <i className="fa fa-spinner fa-spin" style={{ marginRight: '10px' }}></i>
      Đang tải danh sách phim...
    </div>
  );
}
