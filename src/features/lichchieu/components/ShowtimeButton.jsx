import React from 'react';
import { formatPrice } from '../utils/showtimeUtils';

export default function ShowtimeButton({ showtime, selectedDate, onSelect }) {
  const { StartTime, ShowtimeId, Price } = showtime;
  const priceLabel = Price ? formatPrice(Price) : '';

  return (
    <button
      onClick={(e) => onSelect(e, showtime)}
      style={{
        display: 'inline-flex',
        marginBottom: '10px',
        marginRight: '8px',
        padding: '6px 14px',
        background: '#f37737',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontWeight: '500',
        fontSize: '14px',
        transition: 'all 0.2s ease',
      }}
      title={priceLabel}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = '#e0682a';
        e.currentTarget.style.transform = 'scale(1.05)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = '#f37737';
        e.currentTarget.style.transform = 'scale(1)';
      }}
    >
      {StartTime}
    </button>
  );
}
