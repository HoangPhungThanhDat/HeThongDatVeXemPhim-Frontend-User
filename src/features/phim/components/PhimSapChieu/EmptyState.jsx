// src/features/phim/components/PhimSapChieu/EmptyState.jsx

import React from 'react';

export default function EmptyState() {
  return (
    <div
      style={{
        width: '100%',
        textAlign: 'center',
        padding: '50px 0',
        fontSize: '18px',
      }}
    >
      <i className="fa fa-film" style={{ marginRight: '10px' }}></i>
      Hiện tại chưa có phim sắp chiếu
    </div>
  );
}
