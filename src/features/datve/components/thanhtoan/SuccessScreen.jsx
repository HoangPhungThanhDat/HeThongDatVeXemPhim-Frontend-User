// src/features/datve/components/thanhtoan/SuccessScreen.jsx

import React, { useState } from 'react';
import { formatPrice, generateBookingCode } from './utils';

export default function SuccessScreen({ booking, total, onHome }) {
  const code = generateBookingCode();
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard?.writeText(code).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="ck-success">
      <div className="ck-success-inner">
        <div className="ck-check-wrap">
          <svg className="ck-check-svg" viewBox="0 0 80 80">
            <circle
              cx="40"
              cy="40"
              r="38"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeDasharray="239"
              strokeDashoffset="239"
              style={{ animation: 'circleIn .6s .1s cubic-bezier(.4,0,.2,1) forwards' }}
            />
            <polyline
              points="22,42 34,54 58,28"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="60"
              strokeDashoffset="60"
              style={{ animation: 'checkIn .4s .65s cubic-bezier(.4,0,.2,1) forwards' }}
            />
          </svg>
        </div>

        <div className="ck-success-title">Đặt vé thành công!</div>
        <div className="ck-success-sub">Vé đã được gửi về email của bạn</div>

        <div className="ck-ticket">
          <div className="ck-ticket-top">
            <div className="ck-ticket-movie">{booking.movieTitle}</div>
            <div className="ck-ticket-meta">
              <span>{booking.showDate}</span>
              <span className="ck-ticket-dot" />
              <span>{booking.showTime}</span>
            </div>
            <div className="ck-ticket-meta" style={{ marginTop: 4 }}>
              <span>{booking.cinemaName}</span>
              <span className="ck-ticket-dot" />
              <span>{booking.hall}</span>
            </div>
          </div>

          <div className="ck-ticket-tear">
            {Array.from({ length: 18 }).map((_, i) => (
              <div key={i} className="ck-tear-dot" />
            ))}
          </div>

          <div className="ck-ticket-bot">
            <div className="ck-ticket-seats">
              {booking.seats.map((s) => (
                <div key={s} className="ck-ticket-seat">
                  {s}
                </div>
              ))}
            </div>
            <div className="ck-ticket-total">{formatPrice(total)}</div>
          </div>

          <div className="ck-ticket-code-row">
            <span className="ck-ticket-code-lbl">Mã vé</span>
            <button className="ck-ticket-code" onClick={copy}>
              {code}
              <span className="ck-copy-icon">{copied ? '✓' : '⧉'}</span>
            </button>
          </div>

          <div className="ck-barcode">
            {Array.from({ length: 40 }).map((_, i) => (
              <div
                key={i}
                className="ck-bar"
                style={{
                  width: [1, 2, 1, 3, 1, 2][i % 6] + 'px',
                  height: i % 5 === 0 ? 36 : i % 3 === 0 ? 28 : 22,
                }}
              />
            ))}
          </div>
        </div>

        <button className="ck-btn-home" onClick={onHome}>
          Về trang chủ
        </button>
        <button className="ck-btn-view-ticket">Xem vé của tôi</button>
      </div>
    </div>
  );
}
