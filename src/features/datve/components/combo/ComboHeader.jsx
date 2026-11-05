import React from 'react';
import CountdownTimer from './CountdownTimer';
import { CATEGORIES } from './constants';

export default function ComboHeader({
  movieTitle,
  showTimeRaw,
  showDate,
  cinemaName,
  roomName,
  roomType,
  selectedSeats,
  timeLeft,
  activeCat,
  setActiveCat,
}) {
  const formatDisplayTime = (t) =>
    t && t.includes(':') ? t.split(':').slice(0, 2).join(':') : t || '—';

  const formatDisplayDate = (d) => {
    if (!d) return '—';
    const date = new Date(d);
    return isNaN(date)
      ? d
      : date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  return (
    <div className="sn-hdr">
      <div className="sn-hdr-inner">
        <div className="sn-hdr-top">
          <div className="sn-steps">
            {[
              { label: 'Phim', state: 'done' },
              { label: 'Ghế', state: 'done' },
              { label: 'Đồ ăn', state: 'active' },
              { label: 'Thanh toán', state: 'idle' },
            ].map((s, i) => (
              <React.Fragment key={s.label}>
                {i > 0 && <div className="sn-step-sep" />}
                <div className="sn-step">
                  <div className={`sn-step-n ${s.state}`}>{s.state === 'done' ? '✓' : i + 1}</div>
                  <span className={`sn-step-lbl ${s.state}`}>{s.label}</span>
                </div>
              </React.Fragment>
            ))}
          </div>

          <div className="sn-movie">
            <div className="sn-movie-name">{movieTitle}</div>
            <div className="sn-movie-meta">
              <span className="sn-meta-chip">
                🕐 {formatDisplayTime(showTimeRaw)} · {formatDisplayDate(showDate)}
              </span>
              <div className="sn-meta-dot" />
              <span className="sn-meta-chip">
                📍 {cinemaName} · {roomName} ({roomType})
              </span>
            </div>
          </div>

          <div className="sn-hdr-right">
            <div className="sn-seats">
              {selectedSeats.map((s) => (
                <div key={s.ShowtimeSeatId} className="sn-seat">
                  {s.Row}
                  {s.Number}
                </div>
              ))}
            </div>
            <CountdownTimer timeLeft={timeLeft} />
          </div>
        </div>

        <div className="sn-tabs-outer">
          <div className="sn-tabs">
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                className={`sn-tab${activeCat === c.id ? 'on' : ''}`}
                onClick={() => setActiveCat(c.id)}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
