// src/features/phim/components/ChiTietPhim/ShowtimeButton.jsx

import React from 'react';
import { isGoldRoom, getShowtimeTooltip } from '../../utils/showtimeUtils';

const timeButtonBase = {
  display: 'inline-flex',
  marginBottom: '3px',
  marginRight: '4px',
  padding: '6px 12px',
  color: 'white',
  border: 'none',
  borderRadius: '3px',
  cursor: 'pointer',
  fontWeight: '500',
  fontSize: '14px',
  textDecoration: 'none',
};

export default function ShowtimeButton({ slot, date, movie, onSelect }) {
  const isGold = isGoldRoom(slot.Room);
  const tooltip = getShowtimeTooltip(slot);

  const handleClick = (e) => {
    e.preventDefault();
    onSelect(slot, date);
  };

  return (
    <button
      onClick={handleClick}
      style={{
        ...timeButtonBase,
        background: isGold ? '#c8a84b' : '#f37737',
      }}
      title={tooltip}
    >
      {slot.StartTime}
    </button>
  );
}
