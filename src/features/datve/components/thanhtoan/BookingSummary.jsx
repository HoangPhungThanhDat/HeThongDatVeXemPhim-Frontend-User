// src/features/datve/components/thanhtoan/BookingSummary.jsx

import React from 'react';
import { formatPrice } from './utils';

export default function BookingSummary({ booking, ticketTotal, snackTotal, grandTotal }) {
  return (
    <div className="ck-summary">
      <div className="ck-poster-wrap">
        <img className="ck-poster" src={booking.moviePoster} alt={booking.movieTitle} />
        <div className="ck-poster-overlay" />
        <div className="ck-poster-info">
          <div className="ck-poster-title">{booking.movieTitle}</div>
          <div className="ck-poster-chips">
            <span className="ck-chip">{booking.rating}</span>
            <span className="ck-chip">{booking.duration}</span>
            <span className="ck-chip">{booking.genre}</span>
          </div>
        </div>
      </div>

      <div className="ck-info-block">
        <div className="ck-info-row">
          <span className="ck-info-lbl">Ngày chiếu</span>
          <span className="ck-info-val">{booking.showDate}</span>
        </div>
        <div className="ck-info-row">
          <span className="ck-info-lbl">Giờ chiếu</span>
          <span className="ck-info-val">{booking.showTime}</span>
        </div>
        <div className="ck-info-row">
          <span className="ck-info-lbl">Rạp</span>
          <span className="ck-info-val">{booking.cinemaName}</span>
        </div>
        <div className="ck-info-row">
          <span className="ck-info-lbl">Phòng</span>
          <span className="ck-info-val">{booking.hall}</span>
        </div>
        <div className="ck-info-row">
          <span className="ck-info-lbl">Ghế ngồi</span>
          <span className="ck-info-val ck-info-seats">
            {booking.seats.map((s) => (
              <span key={s} className="ck-seat-pill">
                {s}
              </span>
            ))}
          </span>
        </div>
      </div>

      <div className="ck-divider" />

      <div className="ck-price-block">
        <div className="ck-price-row">
          <span className="ck-price-lbl">Vé ({booking.seats.length} ghế)</span>
          <span className="ck-price-val">{formatPrice(ticketTotal)}</span>
        </div>

        {booking.snacks.length > 0 && (
          <>
            <div className="ck-price-row ck-price-sub-hd">
              <span className="ck-price-lbl">Đồ ăn & thức uống</span>
            </div>
            {booking.snacks.map((s, i) => (
              <div key={i} className="ck-price-row ck-price-snack">
                <span className="ck-price-lbl">
                  {s.name} <span className="ck-size-tag">{s.size}</span>
                  {s.qty > 1 && <span className="ck-qty-tag"> ×{s.qty}</span>}
                </span>
                <span className="ck-price-val">{formatPrice(s.price * s.qty)}</span>
              </div>
            ))}
          </>
        )}

        <div className="ck-price-row">
          <span className="ck-price-lbl">Phí dịch vụ</span>
          <span className="ck-price-val">{formatPrice(booking.serviceFee)}</span>
        </div>
      </div>

      <div className="ck-divider" />

      <div className="ck-total-row">
        <span className="ck-total-lbl">Tổng thanh toán</span>
        <span>{formatPrice(grandTotal)}</span>
      </div>
    </div>
  );
}
