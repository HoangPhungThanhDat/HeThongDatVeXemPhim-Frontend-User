// src/features/datve/components/ghe/Seat.jsx

import React from 'react';
import { Users, Crown } from './icons';

const Seat = ({ seat, isSelected, isSold, isVip, isCouple, onSelect }) => {
  const getSeatColor = () => {
    if (isSold) return { bg: '#374151', border: '#1f2937', text: '#6b7280' };
    if (isSelected) return { bg: '#f97316', border: '#ea580c', text: '#ffffff' };
    if (isVip) return { bg: '#8b5cf6', border: '#6d28d9', text: '#ffffff' };
    if (isCouple) return { bg: '#ec4899', border: '#be185d', text: '#ffffff' };
    return { bg: '#eab308', border: '#ca8a04', text: '#ffffff' };
  };

  const colors = getSeatColor();
  const isCoupleSeat = isCouple && !isSold;

  return (
    <button
      onClick={() => !isSold && onSelect(seat)}
      disabled={isSold}
      style={{
        width: isCoupleSeat ? '52px' : '32px',
        height: '32px',
        borderRadius: '6px 6px 4px 4px',
        background: colors.bg,
        border: `2px solid ${isSelected ? '#fb923c' : colors.border}`,
        color: colors.text,
        fontSize: '10px',
        fontWeight: 'bold',
        cursor: isSold ? 'not-allowed' : 'pointer',
        transition: 'all 0.2s ease',
        transform: isSelected ? 'scale(1.08) translateY(-3px)' : 'scale(1)',
        boxShadow: isSelected ? '0 4px 15px rgba(249,115,22,0.5)' : '0 2px 8px rgba(0,0,0,0.3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        flexShrink: 0,
      }}
    >
      {isCoupleSeat ? (
        <Users style={{ width: '16px', height: '16px', color: 'white' }} />
      ) : isVip && !isSold ? (
        <Crown style={{ width: '14px', height: '14px', color: 'white' }} />
      ) : (
        <span style={{ fontSize: '9px', fontWeight: '700' }}>{seat.Number}</span>
      )}
      {isSelected && (
        <div
          style={{
            position: 'absolute',
            inset: '-3px',
            borderRadius: '8px',
            border: '2px solid #fb923c',
            boxShadow: '0 0 20px rgba(249,115,22,0.3)',
            pointerEvents: 'none',
          }}
        />
      )}
    </button>
  );
};

export default Seat;
