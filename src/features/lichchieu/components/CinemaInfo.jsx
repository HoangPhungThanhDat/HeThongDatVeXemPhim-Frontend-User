import React from 'react';

export default function CinemaInfo({ cinemaInfo, loading }) {
  return (
    <div
      className="browse-option-box"
      style={{
        background: 'transparent',
        padding: '10px',
        width: '100%',
        display: 'block',
        marginBottom: '5px',
        border: '3px solid #f37737',
      }}
    >
      <h3 style={{ width: '100%', textAlign: 'center', color: '#f37a3b' }}>
        {loading
          ? 'ĐANG TẢI...'
          : cinemaInfo
            ? cinemaInfo.Name.toUpperCase()
            : 'KHÔNG TÌM THẤY RẠP'}
      </h3>
      <p style={{ width: '100%', textAlign: 'center', color: '#22272b' }}>
        {cinemaInfo?.Phone || '1900 1722'}
      </p>
      <p style={{ width: '100%', textAlign: 'center', color: '#22272b' }}>
        {cinemaInfo?.Address || ''}
      </p>
    </div>
  );
}
