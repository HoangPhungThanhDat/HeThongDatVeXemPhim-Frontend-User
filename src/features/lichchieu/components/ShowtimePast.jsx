import React from 'react';

export default function ShowtimePast({ showtime }) {
  const { StartTime, Price } = showtime;
  const priceLabel = Price ? `${Number(Price).toLocaleString('vi-VN')} đ` : '';

  return (
    <span
      className="time past item"
      style={{
        display: 'inline-flex',
        marginBottom: '10px',
        marginRight: '8px',
        opacity: 0.5,
        cursor: 'not-allowed',
      }}
      title={priceLabel}
    >
      {StartTime}
    </span>
  );
}
