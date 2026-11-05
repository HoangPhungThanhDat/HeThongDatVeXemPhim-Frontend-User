// src/features/datve/components/thanhtoan/CountdownTimer.jsx

import React from 'react';
import { TIMER_DURATION } from './constants';

export default function CountdownTimer({ timeLeft }) {
  const mins = String(Math.floor(timeLeft / 60)).padStart(2, '0');
  const secs = String(timeLeft % 60).padStart(2, '0');
  const pct = timeLeft / TIMER_DURATION;
  const urgent = timeLeft <= 60 && timeLeft > 0;
  const expired = timeLeft === 0;
  const circumference = 2 * Math.PI * 20;

  return (
    <div className={`ck-timer${urgent ? 'urgent' : ''}${expired ? 'expired' : ''}`}>
      <svg className="ck-timer-svg" viewBox="0 0 48 48" aria-hidden="true">
        <circle
          cx="24"
          cy="24"
          r="20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          opacity="0.12"
        />
        <circle
          cx="24"
          cy="24"
          r="20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - pct)}
          strokeLinecap="round"
          transform="rotate(-90 24 24)"
          style={{ transition: 'stroke-dashoffset 1s linear' }}
        />
      </svg>
      <div className="ck-timer-body">
        <div className="ck-timer-lbl">{expired ? 'Hết giờ' : 'Còn lại'}</div>
        <div className="ck-timer-time">
          {mins}:{secs}
        </div>
      </div>
    </div>
  );
}
