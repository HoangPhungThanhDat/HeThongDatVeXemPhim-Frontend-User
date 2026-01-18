import React, { useState, useEffect } from "react";
import ManHinh from "../assets/images/ManHinh.png";

const ArrowLeft = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M19 12H5M12 19l-7-7 7-7"/>
  </svg>
);

const Users = ({ style }) => (
  <svg style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const Crown = ({ style }) => (
  <svg style={style} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l3 7 7-3-3 7h-14l-3-7 7 3z"/>
    <rect x="4" y="16" width="16" height="2" rx="1"/>
  </svg>
);

const Clock = ({ style }) => (
  <svg style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"/>
    <path d="M12 6v6l4 2"/>
  </svg>
);

const Calendar = ({ style }) => (
  <svg style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
    <path d="M16 2v4M8 2v4M3 10h18"/>
  </svg>
);

const MapPin = ({ style }) => (
  <svg style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState(240); // 4 phút = 240 giây

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      background: timeLeft <= 60 ? 'rgba(239, 68, 68, 0.2)' : 'rgba(249, 115, 22, 0.2)',
      padding: '8px 12px',
      borderRadius: '8px',
      border: `1px solid ${timeLeft <= 60 ? 'rgba(239, 68, 68, 0.4)' : 'rgba(249, 115, 22, 0.4)'}`,
      animation: timeLeft <= 10 ? 'pulse 1s infinite' : 'none'
    }}>
      <Clock style={{ width: '16px', height: '16px', color: timeLeft <= 60 ? '#ef4444' : '#fb923c' }} />
      <span style={{
        fontSize: 'clamp(14px, 3vw, 18px)',
        fontWeight: 'bold',
        color: timeLeft <= 60 ? '#ef4444' : '#fb923c',
        fontFamily: 'monospace',
        minWidth: '55px'
      }}>
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </span>
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}

function ChonGhe() {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [movieInfo] = useState({
    title: "AVATAR: THE WAY OF WATER",
    theater: "CGV Vincom Center",
    date: "Thứ 6, 10/01/2026",
    time: "19:30",
    room: "Phòng 3",
    format: "2D Phụ Đề"
  });

  const rows = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  const seatsPerRow = 12;
  const soldSeats = ["A5", "A6", "B5", "B6", "C7", "E5", "E6", "E7", "F8", "G5", "G6", "H7"];
  
  const isVipSeat = (row, seat) => ["D", "E", "F"].includes(row) && seat >= 4 && seat <= 9;
  const isCoupleSeat = (row) => ["I", "J"].includes(row);
  const getSeatId = (row, seat) => `${row}${seat}`;
  const isSeatSold = (seatId) => soldSeats.includes(seatId);
  const isSeatSelected = (seatId) => selectedSeats.includes(seatId);

  const handleSeatClick = (seatId, row, seat) => {
    if (isSeatSold(seatId)) return;
    
    if (isCoupleSeat(row) && seat % 2 === 1) {
      const coupleSeatId = getSeatId(row, seat + 1);
      if (isSeatSold(coupleSeatId)) return;
      if (isSeatSelected(seatId)) {
        setSelectedSeats(prev => prev.filter(s => s !== seatId && s !== coupleSeatId));
      } else {
        setSelectedSeats(prev => [...prev, seatId, coupleSeatId]);
      }
    } else if (isCoupleSeat(row) && seat % 2 === 0) {
      const coupleSeatId = getSeatId(row, seat - 1);
      if (isSeatSold(coupleSeatId)) return;
      if (isSeatSelected(coupleSeatId)) {
        setSelectedSeats(prev => prev.filter(s => s !== seatId && s !== coupleSeatId));
      } else {
        setSelectedSeats(prev => [...prev, coupleSeatId, seatId]);
      }
    } else {
      setSelectedSeats(prev => 
        prev.includes(seatId) ? prev.filter(s => s !== seatId) : [...prev, seatId]
      );
    }
  };

  const getSeatPrice = (row, seat) => {
    if (isCoupleSeat(row)) return 180000;
    if (isVipSeat(row, seat)) return 90000;
    return 70000;
  };

  const calculateTotal = () => {
    return selectedSeats.reduce((total, seatId) => {
      const row = seatId[0];
      const seat = parseInt(seatId.slice(1));
      const price = getSeatPrice(row, seat);
      if (isCoupleSeat(row) && seat % 2 === 0) return total;
      return total + price;
    }, 0);
  };

  const formatPrice = (price) => price.toLocaleString('vi-VN') + 'đ';

  const SeatIcon = ({ sold, selected, vip, couple, seat }) => (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <svg viewBox="0 0 24 24" style={{ width: '100%', height: '100%' }}>
        <rect x="2" y="8" width="2" height="8" rx="1"
          fill={sold ? '#374151' : selected ? '#f97316' : (vip ? '#fbbf24' : couple ? '#ec4899' : '#eab308')} />
        <rect x="20" y="8" width="2" height="8" rx="1"
          fill={sold ? '#374151' : selected ? '#f97316' : (vip ? '#fbbf24' : couple ? '#ec4899' : '#eab308')} />
        <rect x="4" y="10" width="16" height="7" rx="2"
          fill={sold ? '#1f2937' : selected ? '#ea580c' : (vip ? 'rgba(251, 191, 36, 0.7)' : couple ? 'rgba(219, 39, 119, 0.6)' : 'rgba(202, 138, 4, 0.6)')} />
        <path d="M5 10 L5 5 Q5 3 7 3 L17 3 Q19 3 19 5 L19 10"
          fill={sold ? '#374151' : selected ? '#f97316' : (vip ? '#fbbf24' : couple ? '#ec4899' : '#eab308')} />
        {!sold && (
          <ellipse cx="12" cy="8" rx="6" ry="2"
            fill={selected ? 'rgba(251, 146, 60, 0.3)' : (vip ? 'rgba(252, 211, 77, 0.4)' : couple ? 'rgba(251, 207, 232, 0.2)' : 'rgba(250, 204, 21, 0.2)')} />
        )}
        {selected && (
          <rect x="3" y="3" width="18" height="15" rx="3" stroke="#fb923c" fill="none" strokeWidth="2" opacity="0.6" />
        )}
      </svg>
      {couple ? (
        <Users style={{
          width: '12px', height: '12px', position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)', color: sold ? '#6b7280' : 'white', opacity: 0.9
        }} />
      ) : vip ? (
        <Crown style={{
          width: '10px', height: '10px', position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)', 
          color: sold ? '#6b7280' : selected ? 'white' : '#fef3c7', opacity: 0.9
        }} />
      ) : (
        <span style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          fontSize: '10px', fontWeight: 'bold',
          color: sold ? '#6b7280' : selected ? 'white' : '#fef3c7'
        }}>
          {seat}
        </span>
      )}
      {selected && (
        <div style={{
          position: 'absolute', inset: 0, zIndex: -1, filter: 'blur(6px)',
          borderRadius: '8px', background: 'rgba(234, 88, 12, 0.6)'
        }}></div>
      )}
    </div>
  );

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #0f172a, #7c2d12, #0f172a)',
      color: 'white'
    }}>
      <style>{`
        @media (min-width: 640px) {
          .mobile-only { display: none !important; }
          .desktop-only { display: inline !important; }
        }
        @media (max-width: 639px) {
          .mobile-only { display: inline !important; }
          .desktop-only { display: none !important; }
        }
      `}</style>

      <div style={{
        background: 'rgba(0, 0, 0, 0.4)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(249, 115, 22, 0.2)'
      }}>
        <div style={{
          maxWidth: '1280px', margin: '0 auto', padding: '12px 16px',
          display: 'flex', alignItems: 'center', gap: '12px'
        }}>
          <button onClick={() => window.history.back()} style={{
            padding: '8px', background: 'transparent', border: 'none',
            cursor: 'pointer', borderRadius: '8px', color: 'white', transition: 'background 0.2s'
          }}>
            <ArrowLeft />
          </button>
          <div style={{ flex: 1, minWidth: 0 }}>
            <h1 style={{ 
              fontSize: 'clamp(14px, 4vw, 20px)', fontWeight: 'bold', margin: 0,
              overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'
            }}>
              {movieInfo.title}
            </h1>
            <div style={{ 
              display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px',
              fontSize: 'clamp(10px, 2.5vw, 14px)', color: '#d1d5db', flexWrap: 'wrap'
            }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <MapPin style={{ width: '12px', height: '12px', minWidth: '12px' }} />
                <span className="desktop-only">{movieInfo.theater}</span>
                <span className="mobile-only">CGV Vincom</span>
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Calendar style={{ width: '12px', height: '12px', minWidth: '12px' }} />
                <span className="desktop-only">{movieInfo.date}</span>
                <span className="mobile-only">10/01</span>
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Clock style={{ width: '12px', height: '12px', minWidth: '12px' }} />
                {movieInfo.time}
              </span>
            </div>
          </div>
          <CountdownTimer />
        </div>
      </div>

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: 'clamp(12px, 3vw, 16px)' }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))',
          gap: 'clamp(16px, 3vw, 24px)'
        }}>
          <div style={{ gridColumn: window.innerWidth > 1024 ? 'span 2' : 'span 1' }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(12px)',
              borderRadius: '16px', padding: 'clamp(16px, 3vw, 24px)',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <div style={{ marginBottom: 'clamp(24px, 6vw, 48px)' }}>
                <div style={{ position: 'relative', perspective: '1000px' }}>
                  {/* Hình ảnh màn hình */}
                  <div style={{
                    width: '100%',
                    height: 'clamp(80px, 15vw, 150px)',
                    background: `url(${ManHinh}) center/cover`,
                    borderRadius: '12px',
                    border: '2px solid rgba(249, 115, 22, 0.3)',
                    boxShadow: '0 20px 40px -10px rgba(249, 115, 22, 0.5), inset 0 0 30px rgba(0, 0, 0, 0.8)',
                    transform: 'rotateX(-15deg)',
                    transformStyle: 'preserve-3d',
                    position: 'relative',
                    overflow: 'hidden'
                  }}>
                    {/* Hiệu ứng phát sáng */}
                    <div style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: '40%',
                      background: 'linear-gradient(to top, rgba(249, 115, 22, 0.3), transparent)'
                    }}></div>
                  </div>
                  
                  <div style={{
                    textAlign: 'center', color: '#fb923c',
                    fontSize: 'clamp(11px, 2.5vw, 16px)', fontWeight: '700',
                    marginTop: '12px', letterSpacing: '0.15em',
                    textShadow: '0 0 10px rgba(251, 146, 60, 0.5)'
                  }}>MÀN HÌNH</div>
                </div>
              </div>

              <div style={{ 
                display: 'flex', flexDirection: 'column', gap: 'clamp(4px, 1.5vw, 10px)',
                overflowX: 'auto', paddingBottom: '8px'
              }}>
                {rows.map((row) => (
                  <div key={row} style={{ 
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    gap: 'clamp(3px, 1vw, 6px)', minWidth: 'fit-content'
                  }}>
                    <div style={{ 
                      width: 'clamp(18px, 4vw, 28px)', textAlign: 'center',
                      color: '#9ca3af', fontWeight: '600',
                      fontSize: 'clamp(9px, 2vw, 13px)', flexShrink: 0
                    }}>{row}</div>
                    
                    <div style={{ display: 'flex', gap: 'clamp(3px, 1vw, 6px)' }}>
                      {[...Array(seatsPerRow)].map((_, index) => {
                        const seat = index + 1;
                        const seatId = getSeatId(row, seat);
                        const sold = isSeatSold(seatId);
                        const selected = isSeatSelected(seatId);
                        const vip = isVipSeat(row, seat);
                        const couple = isCoupleSeat(row);
                        
                        if (couple && seat % 2 === 0) return null;

                        return (
                          <button key={seatId}
                            onClick={() => handleSeatClick(seatId, row, seat)}
                            disabled={sold}
                            style={{
                              width: couple ? 'clamp(36px, 8vw, 52px)' : 'clamp(20px, 4.5vw, 30px)',
                              height: 'clamp(20px, 4.5vw, 30px)',
                              transition: 'all 0.3s',
                              transform: selected ? 'scale(1.1) translateY(-2px)' : 'scale(1)',
                              cursor: sold ? 'not-allowed' : 'pointer',
                              border: 'none', background: 'transparent', padding: 0,
                              flexShrink: 0
                            }}>
                            <SeatIcon sold={sold} selected={selected} vip={vip} couple={couple} seat={seat} />
                          </button>
                        );
                      })}
                    </div>

                    <div style={{ 
                      width: 'clamp(18px, 4vw, 28px)', textAlign: 'center',
                      color: '#9ca3af', fontWeight: '600',
                      fontSize: 'clamp(9px, 2vw, 13px)', flexShrink: 0
                    }}>{row}</div>
                  </div>
                ))}
              </div>

              <div style={{ 
                marginTop: 'clamp(16px, 3vw, 24px)',
                paddingTop: 'clamp(12px, 3vw, 20px)',
                borderTop: '1px solid rgba(249, 115, 22, 0.2)'
              }}>
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))',
                  gap: 'clamp(8px, 2vw, 16px)', 
                  fontSize: 'clamp(10px, 2vw, 13px)'
                }}>
                  {[
                    { sold: false, selected: false, vip: false, couple: false, label: 'Thường' },
                    { sold: false, selected: false, vip: true, couple: false, label: 'VIP' },
                    { sold: false, selected: false, vip: false, couple: true, label: 'Đôi' },
                    { sold: false, selected: true, vip: false, couple: false, label: 'Đang chọn' },
                    { sold: true, selected: false, vip: false, couple: false, label: 'Đã bán' }
                  ].map((item, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'center' }}>
                      <div style={{ 
                        width: 'clamp(22px, 4vw, 28px)',
                        height: 'clamp(22px, 4vw, 28px)',
                        position: 'relative', flexShrink: 0,
                        opacity: item.sold ? 0.4 : 1
                      }}>
                        <SeatIcon {...item} seat="" />
                      </div>
                      <span style={{ color: '#d1d5db', whiteSpace: 'nowrap' }}>{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div>
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(12px)',
              borderRadius: '16px', padding: 'clamp(16px, 4vw, 24px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              position: window.innerWidth > 1024 ? 'sticky' : 'relative', top: '16px'
            }}>
              <h2 style={{ 
                fontSize: 'clamp(15px, 3.5vw, 20px)', 
                fontWeight: 'bold', 
                marginBottom: 'clamp(12px, 3vw, 16px)',
                margin: 0
              }}>
                Thông tin đặt vé
              </h2>
              
              <div style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: 'clamp(8px, 2vw, 12px)', 
                marginTop: '16px',
                marginBottom: 'clamp(12px, 3vw, 20px)' 
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'clamp(11px, 2.5vw, 14px)' }}>
                  <span style={{ color: '#9ca3af' }}>Phòng chiếu:</span>
                  <span style={{ fontWeight: '600' }}>{movieInfo.room}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'clamp(11px, 2.5vw, 14px)' }}>
                  <span style={{ color: '#9ca3af' }}>Định dạng:</span>
                  <span style={{ fontWeight: '600' }}>{movieInfo.format}</span>
                </div>
              </div>

              <div style={{ 
                borderTop: '1px solid rgba(255, 255, 255, 0.1)', 
                paddingTop: 'clamp(12px, 3vw, 16px)', 
                marginBottom: 'clamp(12px, 3vw, 16px)' 
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ color: '#9ca3af', fontSize: 'clamp(11px, 2.5vw, 14px)' }}>Ghế đã chọn:</span>
                  <span style={{ fontWeight: '600', fontSize: 'clamp(11px, 2.5vw, 14px)' }}>
                    {selectedSeats.filter((s) => {
                      const row = s[0];
                      const seat = parseInt(s.slice(1));
                      return !isCoupleSeat(row) || seat % 2 === 1;
                    }).length} ghế
                  </span>
                </div>
                {selectedSeats.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '10px' }}>
                    {selectedSeats.filter((s) => {
                      const row = s[0];
                      const seat = parseInt(s.slice(1));
                      return !isCoupleSeat(row) || seat % 2 === 1;
                    }).sort().map(seat => (
                      <span key={seat} style={{
                        padding: '4px 10px', background: 'rgba(249, 115, 22, 0.2)',
                        color: '#fb923c', borderRadius: '6px',
                        fontSize: 'clamp(10px, 2vw, 13px)', fontWeight: '600',
                        border: '1px solid rgba(249, 115, 22, 0.3)'
                      }}>
                        {seat}{isCoupleSeat(seat[0]) ? `, ${getSeatId(seat[0], parseInt(seat.slice(1)) + 1)}` : ''}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div style={{ 
                borderTop: '1px solid rgba(255, 255, 255, 0.1)', 
                paddingTop: 'clamp(12px, 3vw, 16px)', 
                marginBottom: 'clamp(16px, 4vw, 20px)' 
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#9ca3af', fontSize: 'clamp(13px, 3vw, 18px)' }}>Tổng tiền:</span>
                  <span style={{
                    fontSize: 'clamp(18px, 4.5vw, 24px)', fontWeight: 'bold',
                    background: 'linear-gradient(to right, #fb923c, #ea580c)',
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
                  }}>
                    {formatPrice(calculateTotal())}
                  </span>
                </div>
              </div>

              <button disabled={selectedSeats.length === 0} style={{
                width: '100%', padding: 'clamp(12px, 3vw, 16px)',
                borderRadius: '12px', fontWeight: 'bold', color: 'white',
                fontSize: 'clamp(14px, 3vw, 18px)', border: 'none',
                cursor: selectedSeats.length > 0 ? 'pointer' : 'not-allowed',
                background: selectedSeats.length > 0 ? 'linear-gradient(to right, #f97316, #ea580c)' : '#374151',
                opacity: selectedSeats.length > 0 ? 1 : 0.5, transition: 'all 0.3s',
                boxShadow: selectedSeats.length > 0 ? '0 10px 15px -3px rgba(249, 115, 22, 0.4)' : 'none'
              }}>
                Tiếp tục
              </button>

              <p style={{ 
                textAlign: 'center', color: '#9ca3af',
                fontSize: 'clamp(10px, 2vw, 12px)', 
                marginTop: 'clamp(12px, 3vw, 16px)', 
                marginBottom: 0
              }}>
                Vui lòng kiểm tra thông tin trước khi tiếp tục
              </p>

              {/* Quy định đặt vé */}
              <div style={{
                marginTop: 'clamp(16px, 4vw, 24px)',
                padding: 'clamp(12px, 3vw, 16px)',
                background: 'rgba(249, 115, 22, 0.1)',
                borderRadius: '12px',
                border: '1px solid rgba(249, 115, 22, 0.2)'
              }}>
                <h3 style={{
                  fontSize: 'clamp(12px, 2.5vw, 14px)',
                  fontWeight: 'bold',
                  color: '#fb923c',
                  marginTop: 0,
                  marginBottom: 'clamp(8px, 2vw, 12px)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                  </svg>
                  Quy định đặt vé
                </h3>
                <ul style={{
                  margin: 0,
                  padding: '0 0 0 20px',
                  fontSize: 'clamp(10px, 2vw, 12px)',
                  color: '#d1d5db',
                  lineHeight: '1.6'
                }}>
                  <li style={{ marginBottom: '6px' }}>Vé đã mua không thể đổi hoặc hoàn lại</li>
                  <li style={{ marginBottom: '6px' }}>Vui lòng có mặt trước giờ chiếu 15 phút</li>
                  <li style={{ marginBottom: '6px' }}>Không mang đồ ăn, thức uống từ bên ngoài</li>
                  <li style={{ marginBottom: '6px' }}>Xuất trình vé trước khi vào phòng chiếu</li>
                  <li>Giữ gìn vệ sinh trong rạp</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChonGhe;