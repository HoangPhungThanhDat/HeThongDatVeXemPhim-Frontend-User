// src/features/datve/pages/ThanhToanPage.jsx

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import {
  Steps,
  CountdownTimer,
  SuccessScreen,
  PaymentMethods,
  CardForm,
  QRHint,
  BookingSummary,
  TimerBar,
  useTimer,
  usePaymentForm,
  useBookingData,
} from '../components/thanhtoan';

import { thanhToanService } from '../../../services/thanhToanService';
import '../../../assets/styles/ThanhToan.css';

export default function ThanhToanPage() {
  const location = useLocation();
  const navigate = useNavigate();

  // Get booking data
  const { booking, grandTotal, isValid, showtimeId, selectedSeats } = useBookingData(location.state);

  // Timer
  const { timeLeft, resetTimer } = useTimer();

  // Payment form
  const { form, card, errors, agreed, setAgreed, setField, setCardField, setErrors, validate } =
    usePaymentForm();

  // State
  const [paymentMethod, setPaymentMethod] = useState('vnpay'); // Mặc định chọn VNPAY
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Validate booking data
  useEffect(() => {
    if (!isValid) {
      navigate('/lich-chieu', { replace: true });
    }
  }, [isValid, navigate]);

  // Handle payment submission
  const handleSubmit = async () => {
    // 1. Validate form (Họ tên, SĐT, Email...)
    const { isValid: formValid } = validate(paymentMethod);
    if (!formValid) return;

    // 2. Kiểm tra dữ liệu ghế và suất chiếu
    if (!showtimeId || !selectedSeats || selectedSeats.length === 0) {
      alert('Không tìm thấy thông tin ghế hoặc suất chiếu. Vui lòng chọn lại!');
      return;
    }

    setLoading(true);

    try {
      // 3. Map ID ghế (Backend yêu cầu mảng các SeatId)
      const seatIds = selectedSeats.map((seat) => seat.SeatId);
      
      // 4. Map dữ liệu Combo chuẩn xác từ ChonComboPage
      // Dữ liệu từ ChonComboPage gửi sang có dạng: { itemId, name, size, qty, price }
      const combos = (location.state?.snacks || []).map((snack) => ({
        id: snack.itemId,     // Lấy đúng itemId
        quantity: snack.qty,  // Lấy đúng qty
        price: snack.price,   // Lấy đúng price
      }));

      // 5. Tạo Payload gửi xuống Backend
      const payload = {
        amount: grandTotal,
        booking_info: {
          ShowtimeId: parseInt(showtimeId),
          seats: seatIds,
          combos: combos,
        },
      };

      // 6. Gọi API
      const res = await thanhToanService.createPaymentUrl(payload);

      // 7. Chuyển hướng sang VNPAY
      if (res.status === 'success' && res.payment_url) {
        window.location.href = res.payment_url;
      } else {
        alert('Có lỗi xảy ra khi tạo link thanh toán!');
        setLoading(false);
      }
    } catch (error) {
      console.error('Lỗi thanh toán:', error);
      alert(error.response?.data?.message || 'Lỗi kết nối đến server!');
      setLoading(false);
    }
  };

  const goHome = () => navigate('/');

  if (success) {
    return <SuccessScreen booking={booking} total={grandTotal} onHome={goHome} />;
  }

  const showExpiredBanner = timeLeft === 0;

  return (
    <div className="ck">
      {/* Header */}
      <div className="ck-hdr">
        <div className="ck-hdr-inner">
          <Steps current={3} />
          <div className="ck-hdr-movie">
            <div className="ck-hdr-movie-name">{booking.movieTitle}</div>
            <div className="ck-hdr-movie-meta">
              <span>
                🕐 {booking.showTime} · {booking.showDate}
              </span>
              <span className="ck-hdot" />
              <span>📍 {booking.cinemaName}</span>
            </div>
          </div>
          <CountdownTimer timeLeft={timeLeft} />
        </div>
      </div>

      {/* Expired Banner */}
      {showExpiredBanner && (
        <div className="ck-expired-banner">
          Phiên đặt vé đã hết hạn — Ghế của bạn có thể đã được người khác đặt
          <button className="ck-expired-refresh" onClick={resetTimer}>
            Gia hạn thêm
          </button>
        </div>
      )}

      {/* Body */}
      <div className="ck-body">
        <div className="ck-layout">
          {/* Left: Form */}
          <div className="ck-left">
            {/* Personal Info */}
            <div className="ck-section" style={{ animationDelay: '0s' }}>
              <div className="ck-section-hd">
                <div className="ck-section-num">01</div>
                <div className="ck-section-title">Thông tin người đặt</div>
              </div>

              <div className="ck-field-row">
                <div className={`ck-field${errors.name ? 'error' : ''}`}>
                  <label className="ck-label">Họ và tên</label>
                  <input
                    className="ck-input"
                    placeholder="Nguyễn Văn A"
                    value={form.name}
                    onChange={(e) => setField('name', e.target.value)}
                  />
                  {errors.name && <span className="ck-err">{errors.name}</span>}
                </div>
                <div className={`ck-field${errors.phone ? 'error' : ''}`}>
                  <label className="ck-label">Số điện thoại</label>
                  <input
                    className="ck-input"
                    placeholder="0901 234 567"
                    value={form.phone}
                    onChange={(e) => setField('phone', e.target.value)}
                  />
                  {errors.phone && <span className="ck-err">{errors.phone}</span>}
                </div>
              </div>

              <div className={`ck-field${errors.email ? 'error' : ''}`}>
                <label className="ck-label">Email nhận vé</label>
                <input
                  className="ck-input"
                  placeholder="email@example.com"
                  type="email"
                  value={form.email}
                  onChange={(e) => setField('email', e.target.value)}
                />
                {errors.email && <span className="ck-err">{errors.email}</span>}
              </div>
            </div>

            {/* Payment Methods */}
            <div className="ck-section" style={{ animationDelay: '.08s' }}>
              <div className="ck-section-hd">
                <div className="ck-section-num">02</div>
                <div className="ck-section-title">Phương thức thanh toán</div>
              </div>

              <PaymentMethods selected={paymentMethod} onChange={setPaymentMethod} />

              {/* Card Form */}
              {paymentMethod === 'card' && (
                <CardForm card={card} errors={errors} onChange={setCardField} />
              )}

              {/* QR Hint for wallets */}
              {paymentMethod !== 'card' && <QRHint />}
            </div>

            {/* Agreement */}
            <div className="ck-agree-wrap">
              <label className={`ck-agree${errors.agreed ? 'error' : ''}`}>
                <input
                  type="checkbox"
                  className="ck-checkbox"
                  checked={agreed}
                  onChange={(e) => {
                    setAgreed(e.target.checked);
                    setErrors((er) => ({ ...er, agreed: undefined }));
                  }}
                />
                <span className="ck-agree-text">
                  Tôi đồng ý với <span className="ck-link">Điều khoản sử dụng</span> và{' '}
                  <span className="ck-link">Chính sách bảo mật</span> của Gấu Phim
                </span>
              </label>
              {errors.agreed && (
                <span className="ck-err" style={{ marginLeft: 28 }}>
                  {errors.agreed}
                </span>
              )}
            </div>
          </div>

          {/* Right: Summary */}
          <div className="ck-right">
            <BookingSummary
              booking={booking}
              ticketTotal={location.state?.ticketTotal || 0}
              snackTotal={location.state?.snackTotal || 0}
              grandTotal={grandTotal}
            />

            <TimerBar timeLeft={timeLeft} />

            <button className="ck-btn-pay" onClick={handleSubmit} disabled={loading}>
              {loading ? (
                <span className="ck-spinner" />
              ) : (
                <>
                  <span>Thanh toán ngay</span>
                  <span>{grandTotal.toLocaleString('vi-VN') + 'đ'}</span>
                </>
              )}
            </button>

            <div className="ck-secure-note">
              <span className="ck-lock">🔒</span>
              Thanh toán được bảo mật bởi SSL 256-bit
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}