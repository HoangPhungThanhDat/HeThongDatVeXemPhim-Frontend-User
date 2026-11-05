// src/features/datve/components/ghe/CountdownTimer.jsx

import React from 'react';
import { Clock } from './icons';
import { useCountdown } from './hooks/useCountdown';

export default function CountdownTimer({ onExpire }) {
  const timeLeft = useCountdown(onExpire);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const isUrgent = timeLeft <= 60;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        background: isUrgent ? 'rgba(239,68,68,0.2)' : 'rgba(249,115,22,0.2)',
        padding: '8px 14px',
        borderRadius: '10px',
        border: `1px solid ${isUrgent ? 'rgba(239,68,68,0.4)' : 'rgba(249,115,22,0.4)'}`,
      }}
    >
      <Clock style={{ width: '18px', height: '18px', color: isUrgent ? '#ef4444' : '#fb923c' }} />
      <span
        style={{
          fontSize: '18px',
          fontWeight: 'bold',
          color: isUrgent ? '#ef4444' : '#fb923c',
          fontFamily: 'monospace',
          minWidth: '60px',
        }}
      >
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </span>
    </div>
  );
}
