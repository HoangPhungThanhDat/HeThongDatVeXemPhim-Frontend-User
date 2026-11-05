// src/features/datve/components/ghe/SelectedSeatsList.jsx

import React from 'react';
import { getSeatColors, getSeatPrice, formatPrice } from './utils';

export default function SelectedSeatsList({ selectedSeats, basePrice }) {
  if (selectedSeats.length === 0) return null;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        marginTop: '8px',
        maxHeight: '200px',
        overflowY: 'auto',
      }}
    >
      {selectedSeats.map((s) => {
        const colors = getSeatColors(s.SeatType);
        return (
          <div
            key={s.ShowtimeSeatId}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '6px 12px',
              background: colors.bg,
              borderRadius: '8px',
              border: `1px solid ${colors.border}`,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: colors.color, fontWeight: '700', fontSize: '14px' }}>
                {s.Row}
                {s.Number}
              </span>
              <span style={{ color: '#9ca3af', fontSize: '11px' }}>{colors.label}</span>
            </div>
            <span style={{ color: colors.color, fontWeight: '700', fontSize: '13px' }}>
              {formatPrice(getSeatPrice(s.SeatType, basePrice))}
            </span>
          </div>
        );
      })}
    </div>
  );
}
