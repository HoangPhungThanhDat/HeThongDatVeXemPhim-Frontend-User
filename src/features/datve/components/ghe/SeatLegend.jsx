// src/features/datve/components/ghe/SeatLegend.jsx

import React from 'react';
import { formatPrice, getSeatPrice } from './utils';

export default function SeatLegend({ basePrice }) {
  const legendItems = [
    {
      color: '#eab308',
      label: 'Ghế Thường',
      price: basePrice > 0 ? formatPrice(getSeatPrice('Normal', basePrice)) : '—',
    },
    {
      color: '#8b5cf6',
      label: '⭐ Ghế VIP',
      price: basePrice > 0 ? formatPrice(getSeatPrice('VIP', basePrice)) : '—',
    },
    {
      color: '#ec4899',
      label: '💑 Ghế Đôi',
      price: basePrice > 0 ? formatPrice(getSeatPrice('Couple', basePrice)) : '—',
    },
    { color: '#f97316', label: '🟠 Đang chọn', price: 'Đã chọn' },
    { color: '#374151', label: '🔒 Đã bán', price: 'Không thể chọn' },
  ];

  return (
    <div
      style={{
        marginTop: '24px',
        paddingTop: '20px',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
        gap: '12px',
      }}
    >
      {legendItems.map((item, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '6px',
              background: item.color,
              border: `2px solid ${item.color === '#374151' ? '#1f2937' : 'rgba(255,255,255,0.1)'}`,
              flexShrink: 0,
            }}
          />
          <div>
            <div style={{ fontSize: '12px', fontWeight: '600', color: '#d1d5db' }}>
              {item.label}
            </div>
            <div style={{ fontSize: '10px', color: '#9ca3af' }}>{item.price}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
