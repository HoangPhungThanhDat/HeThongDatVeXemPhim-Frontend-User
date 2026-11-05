// src/features/phim/components/ChiTietPhim/MoviePoster.jsx

import React from 'react';

export default function MoviePoster({ posterUrl, title }) {
  return (
    <div className="col-lg-3 col-sm-4">
      <div className="details-banner-thumb">
        <img
          src={posterUrl || '/default-poster.jpg'}
          alt={title}
          style={{ width: '100%', borderRadius: '6px' }}
          onError={(e) => {
            e.target.src = '/default-poster.jpg';
          }}
        />
      </div>
    </div>
  );
}
