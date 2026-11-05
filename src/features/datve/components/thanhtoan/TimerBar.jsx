// src/features/datve/components/thanhtoan/TimerBar.jsx

import React from 'react';
import { TIMER_DURATION } from './constants';

export default function TimerBar({ timeLeft }) {
  const mins = String(Math.floor(timeLeft / 60)).padStart(2, '0');
  const secs = String(timeLeft % 60).padStart(2, '0');
  const isUrgent = timeLeft <= 60 && timeLeft > 0;
  const isExpired = timeLeft === 0;

  return (
    <div className={`ck-timer-bar${isUrgent ? 'urgent' : ''}${isExpired ? 'expired' : ''}`}>
      <div className="ck-timer-bar-left">
        <svg width="14" height="14" viewBox="0 0 48 48" style={{ flexShrink: 0 }}>
          <circle
            cx="24"
            cy="24"
            r="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            opacity="0.2"
          />
          <circle
            cx="24"
            cy="24"
            r="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeDasharray={2 * Math.PI * 20}
            strokeDashoffset={2 * Math.PI * 20 * (1 - timeLeft / TIMER_DURATION)}
            strokeLinecap="round"
            transform="rotate(-90 24 24)"
            style={{ transition: 'stroke-dashoffset 1s linear' }}
          />
        </svg>
        <span className="ck-timer-bar-txt">
          {isExpired
            ? 'Phiên đã hết hạn'
            : isUrgent
              ? 'Sắp hết thời gian giữ ghế!'
              : 'Thời gian giữ ghế'}
        </span>
      </div>
      <span className="ck-timer-bar-time">
        {mins}:{secs}
      </span>
    </div>
  );
}
