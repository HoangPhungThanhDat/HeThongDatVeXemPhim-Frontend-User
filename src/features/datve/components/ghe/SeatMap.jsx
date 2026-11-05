// src/features/datve/components/ghe/SeatMap.jsx

import React from 'react';
import ManHinh from '../../../../assets/images/backgrounds/ManHinh.png';
import Seat from './Seat';
import SeatLegend from './SeatLegend';
import { isVipSeat, isCoupleSeat, isSeatSold } from './utils';

export default function SeatMap({ seatMap, selectedSeats, onSeatClick, basePrice }) {
  const isSeatSelected = (id) => selectedSeats.some((s) => s.ShowtimeSeatId === id);

  if (!seatMap || Object.keys(seatMap).length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 0', color: '#9ca3af' }}>
        <div style={{ fontSize: '48px', marginBottom: '12px' }}>🪑</div>
        <p>Chưa có dữ liệu ghế cho suất chiếu này.</p>
      </div>
    );
  }

  return (
    <>
      {/* Screen */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{ position: 'relative', perspective: '800px' }}>
          <div
            style={{
              width: '100%',
              height: '100px',
              background: `url(${ManHinh}) center/cover`,
              borderRadius: '12px',
              border: '2px solid rgba(249,115,22,0.3)',
              boxShadow: '0 20px 40px -10px rgba(249,115,22,0.3), inset 0 0 60px rgba(0,0,0,0.8)',
              transform: 'rotateX(-10deg)',
              transformStyle: 'preserve-3d',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '40%',
                background: 'linear-gradient(to top,rgba(249,115,22,0.15),transparent)',
              }}
            />
          </div>
          <div
            style={{
              textAlign: 'center',
              color: '#fb923c',
              fontSize: '14px',
              fontWeight: '700',
              marginTop: '12px',
              letterSpacing: '4px',
              textShadow: '0 0 20px rgba(251,146,60,0.3)',
            }}
          >
            MÀN HÌNH
          </div>
        </div>
      </div>

      {/* Seats */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          overflowX: 'auto',
          padding: '4px',
        }}
      >
        {Object.entries(seatMap).map(([row, seats]) => (
          <div
            key={row}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '2px 0',
            }}
          >
            <div
              style={{
                width: '28px',
                textAlign: 'center',
                color: '#6b7280',
                fontWeight: '700',
                fontSize: '12px',
                flexShrink: 0,
              }}
            >
              {row}
            </div>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'nowrap' }}>
              {(Array.isArray(seats) ? seats : Object.values(seats)).map((seat) => {
                const sold = isSeatSold(seat.Status);
                const selected = isSeatSelected(seat.ShowtimeSeatId);
                const vip = isVipSeat(seat.SeatType);
                const couple = isCoupleSeat(seat.SeatType);
                return (
                  <Seat
                    key={seat.ShowtimeSeatId}
                    seat={seat}
                    isSelected={selected}
                    isSold={sold}
                    isVip={vip}
                    isCouple={couple}
                    onSelect={onSeatClick}
                  />
                );
              })}
            </div>
            <div
              style={{
                width: '28px',
                textAlign: 'center',
                color: '#6b7280',
                fontWeight: '700',
                fontSize: '12px',
                flexShrink: 0,
              }}
            >
              {row}
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <SeatLegend basePrice={basePrice} />
    </>
  );
}
