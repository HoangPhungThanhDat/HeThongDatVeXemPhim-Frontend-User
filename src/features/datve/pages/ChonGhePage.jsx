// src/features/datve/pages/ChonGhePage.jsx

import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import {
  ArrowLeft,
  MapPin,
  Calendar,
  Clock,
  CountdownTimer,
  SeatMap,
  BookingInfo,
  LoadingState,
  ErrorState,
  useSeatData,
  useSeatSelection,
} from '../components/ghe';

export default function ChonGhePage() {
  const navigate = useNavigate();
  const location = useLocation();

  // Get data from state
  const { showtimeId, showtimeInfo, movie, selectedDate, cinemaName = '' } = location.state || {};

  // Extract info from showtimeInfo
  const movieTitle = showtimeInfo?.Title || movie?.Title || '—';
  const roomName = showtimeInfo?.Room || '—';
  const roomType = showtimeInfo?.RoomType || '2D';
  const showTimeRaw = showtimeInfo?.StartTime || '';
  const basePrice = parseFloat(showtimeInfo?.Price || 0);
  const showDate = showtimeInfo?.Date || selectedDate || '';

  // Hooks
  const { seatMap, loading, error } = useSeatData(showtimeId);
  const { selectedSeats, handleSeatClick, clearSelectedSeats } = useSeatSelection();

  // Redirect if no showtime
  useEffect(() => {
    if (!showtimeId) {
      navigate('/lich-chieu', { replace: true });
    }
  }, [showtimeId, navigate]);

  // Handle timer expiration
  const handleExpire = () => {
    Swal.fire({
      title: '⏰ Hết thời gian!',
      text: 'Bạn đã quá thời gian giữ ghế. Vui lòng chọn lại suất chiếu.',
      icon: 'warning',
      confirmButtonColor: '#f97316',
      confirmButtonText: 'Quay lại lịch chiếu',
      allowOutsideClick: false,
      allowEscapeKey: false,
    }).then(() => navigate('/lich-chieu'));
  };

  // Handle continue to combo
  const handleContinue = () => {
    if (selectedSeats.length === 0) return;
    navigate('/combo', {
      state: {
        showtimeId,
        showtimeInfo,
        movie,
        selectedSeats,
        totalAmount: selectedSeats.reduce((total, s) => {
          const price =
            s.SeatType === 'VIP' ? Math.round(basePrice * 1.5) : Math.round(basePrice * 1.0);
          return total + price;
        }, 0),
        movieTitle,
        roomName,
        roomType,
        cinemaName,
        showTimeRaw,
        showDate,
      },
    });
  };

  // Loading state
  if (loading) {
    return <LoadingState />;
  }

  // Error state
  if (error) {
    return <ErrorState error={error} onRetry={() => window.location.reload()} />;
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg,#0f0f1a,#1a1a2e,#0f172a)',
        color: 'white',
      }}
    >
      <style>{`
        @media(max-width: 768px) {
          .seat-row { gap: 4px !important; }
          .seat-btn { width: 28px !important; height: 28px !important; }
          .seat-couple { width: 44px !important; height: 28px !important; }
        }
        @media(max-width: 480px) {
          .seat-row { gap: 3px !important; }
          .seat-btn { width: 22px !important; height: 22px !important; font-size: 7px !important; }
          .seat-couple { width: 36px !important; height: 22px !important; }
        }
      `}</style>

      {/* Header */}
      <div
        style={{
          background: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(249,115,22,0.2)',
        }}
      >
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '12px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          <button
            onClick={() => window.history.back()}
            style={{
              padding: '8px',
              background: 'rgba(255,255,255,0.05)',
              border: 'none',
              cursor: 'pointer',
              borderRadius: '10px',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <ArrowLeft />
          </button>
          <div style={{ flex: 1, minWidth: 0 }}>
            <h1 style={{ fontSize: 'clamp(16px,3vw,22px)', fontWeight: 'bold', margin: 0 }}>
              {movieTitle}
            </h1>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginTop: '4px',
                fontSize: 'clamp(11px,2vw,14px)',
                color: '#9ca3af',
                flexWrap: 'wrap',
              }}
            >
              {cinemaName && (
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <MapPin style={{ width: '14px', height: '14px' }} />
                  {cinemaName}
                </span>
              )}
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Calendar style={{ width: '14px', height: '14px' }} />
                {new Date(showDate).toLocaleDateString('vi-VN', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                })}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Clock style={{ width: '14px', height: '14px' }} />
                {showTimeRaw}
              </span>
            </div>
          </div>
          <CountdownTimer onExpire={handleExpire} />
        </div>
      </div>

      {/* Body */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '24px' }}>
          {/* Seat Map */}
          <div
            style={{
              background: 'rgba(255,255,255,0.03)',
              backdropFilter: 'blur(12px)',
              borderRadius: '20px',
              padding: '24px',
              border: '1px solid rgba(255,255,255,0.06)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
            }}
          >
            <SeatMap
              seatMap={seatMap}
              selectedSeats={selectedSeats}
              onSeatClick={(seat) => handleSeatClick(seat, seatMap)}
              basePrice={basePrice}
            />
          </div>

          {/* Booking Info */}
          <BookingInfo
            movieTitle={movieTitle}
            roomName={roomName}
            roomType={roomType}
            showDate={showDate}
            showTimeRaw={showTimeRaw}
            basePrice={basePrice}
            selectedSeats={selectedSeats}
            onContinue={handleContinue}
          />
        </div>
      </div>
    </div>
  );
}
