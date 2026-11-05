// src/features/datve/components/ghe/BookingInfo.jsx

import React from 'react';
import SelectedSeatsList from './SelectedSeatsList';
import { formatPrice, formatDisplayDate, formatDisplayTime, getSeatPrice } from './utils';

export default function BookingInfo({
  movieTitle,
  roomName,
  roomType,
  showDate,
  showTimeRaw,
  basePrice,
  selectedSeats,
  onContinue,
}) {
  const calculateTotal = () =>
    selectedSeats.reduce((total, s) => total + getSeatPrice(s.SeatType, basePrice), 0);

  const infoItems = [
    { label: 'Phim:', value: movieTitle },
    { label: 'Phòng chiếu:', value: roomName },
    { label: 'Định dạng:', value: roomType },
    { label: 'Ngày chiếu:', value: formatDisplayDate(showDate) },
    { label: 'Giờ chiếu:', value: formatDisplayTime(showTimeRaw) },
    { label: 'Giá vé gốc:', value: basePrice > 0 ? formatPrice(basePrice) : '—' },
  ];

  return (
    <div
      style={{
        background: 'rgba(255,255,255,0.03)',
        backdropFilter: 'blur(12px)',
        borderRadius: '20px',
        padding: '24px',
        border: '1px solid rgba(255,255,255,0.06)',
        boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
        position: 'sticky',
        top: '20px',
      }}
    >
      <h2 style={{ fontSize: '18px', fontWeight: 'bold', margin: 0, color: '#ffffff' }}>
        Thông tin đặt vé
      </h2>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          marginTop: '16px',
          marginBottom: '16px',
        }}
      >
        {infoItems.map(({ label, value }) => (
          <div
            key={label}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '13px',
              padding: '4px 0',
            }}
          >
            <span style={{ color: '#9ca3af' }}>{label}</span>
            <span
              style={{ fontWeight: '600', color: '#d1d5db', maxWidth: '55%', textAlign: 'right' }}
            >
              {value}
            </span>
          </div>
        ))}
      </div>

      {/* Selected Seats */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ color: '#9ca3af', fontSize: '13px' }}>Ghế đã chọn:</span>
          <span style={{ fontWeight: '700', fontSize: '15px', color: '#fb923c' }}>
            {selectedSeats.length} ghế
          </span>
        </div>
        <SelectedSeatsList selectedSeats={selectedSeats} basePrice={basePrice} />
      </div>

      {/* Total */}
      <div
        style={{
          borderTop: '1px solid rgba(255,255,255,0.06)',
          paddingTop: '16px',
          marginTop: '16px',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ color: '#9ca3af', fontSize: '16px' }}>Tổng tiền:</span>
          <span
            style={{
              fontSize: '24px',
              fontWeight: 'bold',
              background: 'linear-gradient(135deg,#fb923c,#ea580c)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {formatPrice(calculateTotal())}
          </span>
        </div>
      </div>

      {/* Continue Button */}
      <button
        disabled={selectedSeats.length === 0}
        onClick={onContinue}
        style={{
          width: '100%',
          padding: '14px',
          borderRadius: '12px',
          fontWeight: '700',
          color: 'white',
          fontSize: '16px',
          border: 'none',
          cursor: selectedSeats.length > 0 ? 'pointer' : 'not-allowed',
          background:
            selectedSeats.length > 0 ? 'linear-gradient(135deg,#f97316,#ea580c)' : '#374151',
          opacity: selectedSeats.length > 0 ? 1 : 0.5,
          marginTop: '16px',
          transition: 'all 0.3s',
          boxShadow: selectedSeats.length > 0 ? '0 10px 30px -5px rgba(249,115,22,0.4)' : 'none',
        }}
      >
        {selectedSeats.length > 0 ? 'Tiếp tục' : 'Vui lòng chọn ghế'}
      </button>

      <p
        style={{
          textAlign: 'center',
          color: '#6b7280',
          fontSize: '11px',
          marginTop: '12px',
          marginBottom: 0,
        }}
      >
        Vui lòng kiểm tra thông tin trước khi tiếp tục
      </p>
    </div>
  );
}
