import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import axiosClient from '../../../api/axiosClient'; // Đảm bảo đường dẫn này đúng với cấu trúc thư mục của bạn

export default function KetQuaThanhToanPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const responseCode = params.get('vnp_ResponseCode');
    const txnRef = params.get('vnp_TxnRef');

    // Hàm gọi API đồng bộ DB
    const syncPaymentStatus = async () => {
      if (responseCode === '00' && txnRef) {
        try {
          // Gọi backend để chốt đơn (đề phòng VNPAY gọi IPN không thành công)
          await axiosClient.post('/payment/check-status', {
            vnp_TxnRef: txnRef,
            vnp_ResponseCode: responseCode
          });
          setStatus('success');
          triggerConfetti();
        } catch (error) {
          console.error("Lỗi đồng bộ DB:", error);
          // Dù lỗi đồng bộ thì vẫn hiển thị thành công cho khách vì VNPAY đã báo mã 00
          setStatus('success'); 
          triggerConfetti();
        }
      } else if (responseCode) {
        setStatus('failed');
      } else {
        navigate('/');
      }
    };

    syncPaymentStatus();
  }, [location, navigate]);

  // Hàm tạo hiệu ứng pháo giấy
  const triggerConfetti = () => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const interval = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      
      confetti({
        ...defaults, particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });
      confetti({
        ...defaults, particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);

    setTimeout(() => {
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0 },
        colors: ['#e67e22', '#f1c40f', '#e74c3c', '#2ecc71', '#3498db']
      });
    }, 500);
  };

  // --- STYLES ĐỊNH NGHĨA TRỰC TIẾP ---
  const styles = {
    wrapper: {
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'radial-gradient(circle at top right, #2a1b15 0%, #0d0d0d 100%)',
      padding: '20px',
      position: 'relative',
      overflow: 'hidden',
    },
    glow: (color) => ({
      position: 'absolute',
      width: '300px',
      height: '300px',
      background: color,
      filter: 'blur(100px)',
      borderRadius: '50%',
      opacity: 0.4,
      zIndex: 0,
    }),
    card: {
      position: 'relative',
      zIndex: 1,
      background: 'rgba(255, 255, 255, 0.03)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      borderRadius: '24px',
      padding: '60px 40px',
      textAlign: 'center',
      maxWidth: '480px',
      width: '100%',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
      animation: 'slideUpFade 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards',
    },
    title: {
      fontSize: '32px',
      fontWeight: '800',
      marginBottom: '16px',
      color: '#ffffff',
      letterSpacing: '0.5px',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    },
    desc: {
      fontSize: '16px',
      color: '#a0a0a0',
      marginBottom: '40px',
      lineHeight: '1.6',
    },
    button: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '8px',
      width: '100%',
      padding: '16px',
      fontSize: '16px',
      fontWeight: '700',
      color: '#fff',
      background: 'linear-gradient(135deg, #e67e22, #d35400)',
      border: 'none',
      borderRadius: '12px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0 10px 20px -10px rgba(230, 126, 34, 0.5)',
    },
    iconSuccess: {
      width: '100px',
      height: '100px',
      background: 'radial-gradient(circle, rgba(46, 125, 50, 0.2) 0%, transparent 70%)',
      border: '2px solid rgba(46, 125, 50, 0.5)',
      borderRadius: '50%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      margin: '0 auto 30px',
      boxShadow: '0 0 30px rgba(46, 125, 50, 0.3)',
      animation: 'popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
    },
    iconFailed: {
      width: '100px',
      height: '100px',
      background: 'radial-gradient(circle, rgba(198, 40, 40, 0.2) 0%, transparent 70%)',
      border: '2px solid rgba(198, 40, 40, 0.5)',
      borderRadius: '50%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      margin: '0 auto 30px',
      boxShadow: '0 0 30px rgba(198, 40, 40, 0.3)',
      animation: 'popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
    }
  };

  return (
    <>
      <style>
        {`
          @keyframes slideUpFade {
            0% { opacity: 0; transform: translateY(40px) scale(0.95); }
            100% { opacity: 1; transform: translateY(0) scale(1); }
          }
          @keyframes popIn {
            0% { transform: scale(0); opacity: 0; }
            100% { transform: scale(1); opacity: 1; }
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>

      <div style={styles.wrapper}>
        {/* Glow Backgrounds */}
        <div style={{ ...styles.glow(status === 'success' ? '#2e7d32' : '#c62828'), top: '-10%', left: '-10%' }} />
        <div style={{ ...styles.glow('#e67e22'), bottom: '-10%', right: '-10%' }} />

        {status === 'loading' ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 1 }}>
            <div style={{ width: '50px', height: '50px', border: '4px solid rgba(255,255,255,0.1)', borderTop: '4px solid #e67e22', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
            <p style={{ color: '#a0a0a0', marginTop: '20px', fontSize: '18px', fontWeight: '500' }}>Đang xác thực giao dịch...</p>
          </div>
        ) : (
          <div style={styles.card}>
            {status === 'success' ? (
              <>
                <div style={styles.iconSuccess}>
                  <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <h1 style={styles.title}>Thanh toán thành công</h1>
                <p style={styles.desc}>
                  Tuyệt vời! Giao dịch của bạn đã được xử lý.<br/>Vé điện tử và mã QR đã sẵn sàng trong email của bạn.
                </p>
                <button 
                  onClick={() => navigate('/')} 
                  style={styles.button}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 15px 25px -10px rgba(230, 126, 34, 0.7)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 10px 20px -10px rgba(230, 126, 34, 0.5)'; }}
                >
                  <span>Trải nghiệm Gấu Phim ngay</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </button>
              </>
            ) : (
              <>
                <div style={styles.iconFailed}>
                  <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </div>
                <h1 style={styles.title}>Giao dịch thất bại</h1>
                <p style={styles.desc}>
                  Rất tiếc, giao dịch đã bị hủy hoặc xảy ra sự cố kết nối.<br/>Ghế của bạn sẽ được giải phóng sau ít phút.
                </p>
                <button 
                  onClick={() => navigate('/lich-chieu')} 
                  style={{...styles.button, background: 'linear-gradient(135deg, #4b5563, #374151)', boxShadow: '0 10px 20px -10px rgba(75, 85, 99, 0.5)'}}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 15px 25px -10px rgba(75, 85, 99, 0.7)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 10px 20px -10px rgba(75, 85, 99, 0.5)'; }}
                >
                  <span>Quay lại đặt vé</span>
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
}