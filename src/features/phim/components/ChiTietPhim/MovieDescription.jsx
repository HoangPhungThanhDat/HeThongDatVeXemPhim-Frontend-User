// src/features/phim/components/ChiTietPhim/MovieDescription.jsx

import React from 'react';

export default function MovieDescription({ description }) {
  return (
    <div className="movie-details-page-box" style={{ marginTop: '16px' }}>
      <p style={{ color: '#333', lineHeight: '1.7' }}>{description || 'Không có mô tả'}</p>
    </div>
  );
}
