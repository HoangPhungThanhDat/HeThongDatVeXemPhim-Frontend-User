import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import ManHinh from "../assets/images/ManHinh.png";
import Swal from "sweetalert2";

// ── SVG Icons ────────────────────────────────────────────────────────────────
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

// ── Countdown Timer ──────────────────────────────────────────────────────────
function CountdownTimer({ onExpire }) {
  const [timeLeft, setTimeLeft] = useState(240);

  useEffect(() => {
    if (timeLeft <= 0) {
      onExpire?.();
      return;
    }
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, onExpire]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '8px',
      background: timeLeft <= 60 ? 'rgba(239,68,68,0.2)' : 'rgba(249,115,22,0.2)',
      padding: '8px 12px', borderRadius: '8px',
      border: `1px solid ${timeLeft <= 60 ? 'rgba(239,68,68,0.4)' : 'rgba(249,115,22,0.4)'}`,
      animation: timeLeft <= 10 ? 'pulse 1s infinite' : 'none',
    }}>
      <Clock style={{ width: '16px', height: '16px', color: timeLeft <= 60 ? '#ef4444' : '#fb923c' }} />
      <span style={{
        fontSize: 'clamp(14px,3vw,18px)', fontWeight: 'bold',
        color: timeLeft <= 60 ? '#ef4444' : '#fb923c',
        fontFamily: 'monospace', minWidth: '55px'
      }}>
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </span>
      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }`}</style>
    </div>
  );
}

// ── SeatIcon ─────────────────────────────────────────────────────────────────
const SeatIcon = ({ sold, selected, vip, couple, seat }) => (
  <div style={{ position: 'relative', width: '100%', height: '100%' }}>
    <svg viewBox="0 0 24 24" style={{ width: '100%', height: '100%' }}>
      <rect x="2" y="8" width="2" height="8" rx="1"
        fill={sold ? '#374151' : selected ? '#f97316' : vip ? '#fbbf24' : couple ? '#ec4899' : '#eab308'} />
      <rect x="20" y="8" width="2" height="8" rx="1"
        fill={sold ? '#374151' : selected ? '#f97316' : vip ? '#fbbf24' : couple ? '#ec4899' : '#eab308'} />
      <rect x="4" y="10" width="16" height="7" rx="2"
        fill={sold ? '#1f2937' : selected ? '#ea580c' : vip ? 'rgba(251,191,36,0.7)' : couple ? 'rgba(219,39,119,0.6)' : 'rgba(202,138,4,0.6)'} />
      <path d="M5 10 L5 5 Q5 3 7 3 L17 3 Q19 3 19 5 L19 10"
        fill={sold ? '#374151' : selected ? '#f97316' : vip ? '#fbbf24' : couple ? '#ec4899' : '#eab308'} />
      {!sold && (
        <ellipse cx="12" cy="8" rx="6" ry="2"
          fill={selected ? 'rgba(251,146,60,0.3)' : vip ? 'rgba(252,211,77,0.4)' : couple ? 'rgba(251,207,232,0.2)' : 'rgba(250,204,21,0.2)'} />
      )}
      {selected && <rect x="3" y="3" width="18" height="15" rx="3" stroke="#fb923c" fill="none" strokeWidth="2" opacity="0.6" />}
    </svg>
    {couple ? (
      <Users style={{ width:'12px', height:'12px', position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', color: sold ? '#6b7280' : 'white', opacity:0.9 }} />
    ) : vip ? (
      <Crown style={{ width:'10px', height:'10px', position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', color: sold ? '#6b7280' : selected ? 'white' : '#fef3c7', opacity:0.9 }} />
    ) : (
      <span style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', fontSize:'10px', fontWeight:'bold', color: sold ? '#6b7280' : selected ? 'white' : '#fef3c7' }}>
        {seat}
      </span>
    )}
    {selected && <div style={{ position:'absolute', inset:0, zIndex:-1, filter:'blur(6px)', borderRadius:'8px', background:'rgba(234,88,12,0.6)' }} />}
  </div>
);

// ── HELPERS ───────────────────────────────────────────────────────────────────
// ✅ Parse "DD-MM-YYYY HH:mm:ss" → Date object
const parseViDate = (dateStr) => {
  if (!dateStr) return null;
  // Đã là ISO format
  if (dateStr.includes('T') || dateStr.match(/^\d{4}-\d{2}-\d{2}/)) {
    const d = new Date(dateStr);
    return isNaN(d) ? null : d;
  }
  // Format "DD-MM-YYYY HH:mm:ss"
  const [datePart, timePart] = dateStr.split(' ');
  const parts = datePart.split('-');
  if (parts.length !== 3) return null;
  const [day, month, year] = parts;
  const isoStr = `${year}-${month}-${day}${timePart ? 'T' + timePart : ''}`;
  const d = new Date(isoStr);
  return isNaN(d) ? null : d;
};

// ✅ Helper kiểm tra Date hợp lệ
const isValidDate = (d) => d instanceof Date && !isNaN(d);

const extractInfo = (info) => {
  if (!info) return { movieTitle: '—', roomName: '—', roomType: '—', cinemaName: '', startTime: null };

  // MovieId là object trực tiếp (theo log: MovieId: {Title: 'THỎ ƠI!!', ...})
  const movieTitle =
    info?.MovieId?.Title ??
    info?.Movie?.Title ??
    '—';

  // RoomId là object trực tiếp (theo log: RoomId: {Name: 'Phòng Chiếu 1 - DN', ...})
  const roomName =
    info?.RoomId?.Name ??
    info?.Room?.Name ??
    '—';

  const roomType =
    info?.RoomId?.RoomType ??
    info?.Room?.RoomType ??
    '—';

  // Cinema nằm trong RoomId (nếu có load relation)
  const cinemaName =
    info?.RoomId?.Cinema?.Name ??
    info?.RoomId?.cinema?.Name ??
    info?.Room?.Cinema?.Name ??
    '';

  // ✅ Parse date "22-03-2026 22:47:00"
  const startTime = parseViDate(info?.StartTime ?? info?.start_time ?? null);

  return { movieTitle, roomName, roomType, cinemaName, startTime };
};

// ── MAIN COMPONENT ────────────────────────────────────────────────────────────
function ChonGhe() {
  const { showtimeId } = useParams();
  const navigate       = useNavigate();

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [seatMap, setSeatMap]             = useState({});
  const [showtimeInfo, setShowtimeInfo]   = useState(null);
  const [loading, setLoading]             = useState(true);
  const [error, setError]                 = useState(null);

  useEffect(() => {
    if (!showtimeId) return;
    setLoading(true);
    setError(null);
    setSelectedSeats([]);

    Promise.all([
      axiosClient.get(`/showtimes/${showtimeId}`),
      axiosClient.get(`/showtimes/${showtimeId}/seats`),
    ])
      .then(([showtimeRes, seatsRes]) => {
        const st =
          showtimeRes?.data?.data ??
          showtimeRes?.data ??
          showtimeRes;
        setShowtimeInfo(st);

        const seatsData =
          seatsRes?.data?.data ??
          seatsRes?.data ??
          seatsRes;
        setSeatMap(seatsData);
      })
      .catch((err) => {
        console.error("❌ Lỗi tải dữ liệu:", err);
        setError("Không thể tải dữ liệu. Vui lòng thử lại.");
      })
      .finally(() => setLoading(false));
  }, [showtimeId]);

  // ── Hết giờ → popup → redirect ──
  const handleExpire = () => {
    Swal.fire({
      title: '⏰ Hết thời gian!',
      text: 'Bạn đã quá thời gian giữ ghế. Vui lòng chọn lại suất chiếu.',
      icon: 'warning',
      confirmButtonColor: '#f97316',
      confirmButtonText: 'Quay lại lịch chiếu',
      allowOutsideClick: false,
      allowEscapeKey: false,
    }).then(() => {
      navigate('/lich-chieu');
    });
  };

  // ── Seat helpers ──
  const isVipSeat      = (t) => t === "VIP";
  const isCoupleSeat   = (t) => t === "Couple";
  const isSeatSold     = (s) => s === "Reserved" || s === "Broken" || s === "Inactive";
  const isSeatSelected = (id) => selectedSeats.some((s) => s.ShowtimeSeatId === id);

  const handleSeatClick = (seat) => {
    if (isSeatSold(seat.Status)) return;

    if (isCoupleSeat(seat.SeatType)) {
      const rowSeats   = seatMap[seat.Row] ?? [];
      const idx        = rowSeats.findIndex((s) => s.ShowtimeSeatId === seat.ShowtimeSeatId);
      const partnerIdx = seat.Number % 2 === 1 ? idx + 1 : idx - 1;
      const partner    = rowSeats[partnerIdx];
      if (!partner || isSeatSold(partner.Status)) return;

      const bothSelected = isSeatSelected(seat.ShowtimeSeatId) && isSeatSelected(partner.ShowtimeSeatId);
      if (bothSelected) {
        setSelectedSeats(prev => prev.filter(s =>
          s.ShowtimeSeatId !== seat.ShowtimeSeatId &&
          s.ShowtimeSeatId !== partner.ShowtimeSeatId
        ));
      } else {
        setSelectedSeats(prev => [
          ...prev.filter(s =>
            s.ShowtimeSeatId !== seat.ShowtimeSeatId &&
            s.ShowtimeSeatId !== partner.ShowtimeSeatId
          ),
          seat, partner,
        ]);
      }
      return;
    }

    setSelectedSeats(prev =>
      isSeatSelected(seat.ShowtimeSeatId)
        ? prev.filter(s => s.ShowtimeSeatId !== seat.ShowtimeSeatId)
        : [...prev, seat]
    );
  };

  const getSeatPrice   = (t) => t === "Couple" ? 180000 : t === "VIP" ? 90000 : 70000;
  const calculateTotal = () => selectedSeats.reduce((total, s) => total + getSeatPrice(s.SeatType), 0);
  const formatPrice    = (p) => p.toLocaleString("vi-VN") + "đ";

  const handleContinue = () => {
    if (selectedSeats.length === 0) return;
    navigate("/thanh-toan", {
      state: { showtimeId, showtimeInfo, selectedSeats, totalAmount: calculateTotal() },
    });
  };

  // ✅ Extract thông tin — xử lý đúng cấu trúc từ log
  const { movieTitle, roomName, roomType, cinemaName, startTime } = extractInfo(showtimeInfo);

  // ── Loading ──
  if (loading) return (
    <div style={{ minHeight:'100vh', background:'linear-gradient(to bottom right,#0f172a,#7c2d12,#0f172a)', display:'flex', alignItems:'center', justifyContent:'center' }}>
      <div style={{ textAlign:'center', color:'white' }}>
        <i className="fa fa-spinner fa-spin" style={{ fontSize:'48px', color:'#f37737' }} />
        <p style={{ marginTop:'16px', fontSize:'16px' }}>Đang tải sơ đồ ghế...</p>
      </div>
    </div>
  );

  // ── Error ──
  if (error) return (
    <div style={{ minHeight:'100vh', background:'linear-gradient(to bottom right,#0f172a,#7c2d12,#0f172a)', display:'flex', alignItems:'center', justifyContent:'center' }}>
      <div style={{ textAlign:'center', color:'white' }}>
        <p style={{ fontSize:'18px', color:'#ef4444' }}>{error}</p>
        <button onClick={() => window.history.back()} style={{ marginTop:'16px', padding:'10px 24px', background:'#f97316', border:'none', borderRadius:'8px', color:'white', cursor:'pointer' }}>
          Quay lại
        </button>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight:'100vh', background:'linear-gradient(to bottom right,#0f172a,#7c2d12,#0f172a)', color:'white' }}>
      <style>{`
        @media(min-width:640px){.mobile-only{display:none!important}.desktop-only{display:inline!important}}
        @media(max-width:639px){.mobile-only{display:inline!important}.desktop-only{display:none!important}}
      `}</style>

      {/* ── Header ── */}
      <div style={{ background:'rgba(0,0,0,0.4)', backdropFilter:'blur(12px)', borderBottom:'1px solid rgba(249,115,22,0.2)' }}>
        <div style={{ maxWidth:'1280px', margin:'0 auto', padding:'12px 16px', display:'flex', alignItems:'center', gap:'12px' }}>
          <button onClick={() => window.history.back()} style={{ padding:'8px', background:'transparent', border:'none', cursor:'pointer', borderRadius:'8px', color:'white' }}>
            <ArrowLeft />
          </button>
          <div style={{ flex:1, minWidth:0 }}>
            <h1 style={{ fontSize:'clamp(14px,4vw,20px)', fontWeight:'bold', margin:0, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
              {movieTitle}
            </h1>
            <div style={{ display:'flex', alignItems:'center', gap:'6px', marginTop:'4px', fontSize:'clamp(10px,2.5vw,14px)', color:'#d1d5db', flexWrap:'wrap' }}>
              {cinemaName && (
                <span style={{ display:'flex', alignItems:'center', gap:'4px' }}>
                  <MapPin style={{ width:'12px', height:'12px' }} />
                  {cinemaName}
                </span>
              )}
              {/* ✅ startTime đã là Date object — dùng trực tiếp */}
              <span style={{ display:'flex', alignItems:'center', gap:'4px' }}>
                <Calendar style={{ width:'12px', height:'12px' }} />
                {isValidDate(startTime)
                  ? startTime.toLocaleDateString("vi-VN")
                  : ""}
              </span>
              <span style={{ display:'flex', alignItems:'center', gap:'4px' }}>
                <Clock style={{ width:'12px', height:'12px' }} />
                {isValidDate(startTime)
                  ? startTime.toLocaleTimeString("vi-VN", { hour:"2-digit", minute:"2-digit" })
                  : ""}
              </span>
            </div>
          </div>
          <CountdownTimer onExpire={handleExpire} />
        </div>
      </div>

      {/* ── Body ── */}
      <div style={{ maxWidth:'1280px', margin:'0 auto', padding:'clamp(12px,3vw,16px)' }}>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(min(100%,400px),1fr))', gap:'clamp(16px,3vw,24px)' }}>

          {/* ── Sơ đồ ghế ── */}
          <div style={{ gridColumn: window.innerWidth > 1024 ? 'span 2' : 'span 1' }}>
            <div style={{ background:'rgba(255,255,255,0.05)', backdropFilter:'blur(12px)', borderRadius:'16px', padding:'clamp(16px,3vw,24px)', border:'1px solid rgba(255,255,255,0.1)' }}>

              {/* Màn hình */}
              <div style={{ marginBottom:'clamp(24px,6vw,48px)' }}>
                <div style={{ position:'relative', perspective:'1000px' }}>
                  <div style={{ width:'100%', height:'clamp(80px,15vw,150px)', background:`url(${ManHinh}) center/cover`, borderRadius:'12px', border:'2px solid rgba(249,115,22,0.3)', boxShadow:'0 20px 40px -10px rgba(249,115,22,0.5),inset 0 0 30px rgba(0,0,0,0.8)', transform:'rotateX(-15deg)', transformStyle:'preserve-3d', overflow:'hidden' }}>
                    <div style={{ position:'absolute', bottom:0, left:0, right:0, height:'40%', background:'linear-gradient(to top,rgba(249,115,22,0.3),transparent)' }} />
                  </div>
                  <div style={{ textAlign:'center', color:'#fb923c', fontSize:'clamp(11px,2.5vw,16px)', fontWeight:'700', marginTop:'12px', letterSpacing:'0.15em', textShadow:'0 0 10px rgba(251,146,60,0.5)' }}>
                    MÀN HÌNH
                  </div>
                </div>
              </div>

              {/* Ghế */}
              {Object.keys(seatMap).length === 0 ? (
                <div style={{ textAlign:'center', padding:'40px 0', color:'#9ca3af' }}>
                  <i className="fa fa-chair" style={{ fontSize:'32px', marginBottom:'12px', display:'block' }} />
                  <p>Chưa có dữ liệu ghế cho suất chiếu này.</p>
                </div>
              ) : (
                <div style={{ display:'flex', flexDirection:'column', gap:'clamp(4px,1.5vw,10px)', overflowX:'auto', paddingBottom:'8px' }}>
                  {Object.entries(seatMap).map(([row, seats]) => (
                    <div key={row} style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'clamp(3px,1vw,6px)', minWidth:'fit-content' }}>
                      <div style={{ width:'clamp(18px,4vw,28px)', textAlign:'center', color:'#9ca3af', fontWeight:'600', fontSize:'clamp(9px,2vw,13px)', flexShrink:0 }}>
                        {row}
                      </div>
                      <div style={{ display:'flex', gap:'clamp(3px,1vw,6px)' }}>
                        {(Array.isArray(seats) ? seats : Object.values(seats)).map((seat) => {
                          const sold     = isSeatSold(seat.Status);
                          const selected = isSeatSelected(seat.ShowtimeSeatId);
                          const vip      = isVipSeat(seat.SeatType);
                          const couple   = isCoupleSeat(seat.SeatType);
                          return (
                            <button
                              key={seat.ShowtimeSeatId}
                              onClick={() => handleSeatClick(seat)}
                              disabled={sold}
                              title={`${seat.Row}${seat.Number} - ${seat.SeatType} - ${seat.Status}`}
                              style={{
                                width: couple ? 'clamp(36px,8vw,52px)' : 'clamp(20px,4.5vw,30px)',
                                height: 'clamp(20px,4.5vw,30px)',
                                transition:'all 0.3s',
                                transform: selected ? 'scale(1.1) translateY(-2px)' : 'scale(1)',
                                cursor: sold ? 'not-allowed' : 'pointer',
                                border:'none', background:'transparent', padding:0, flexShrink:0,
                              }}
                            >
                              <SeatIcon sold={sold} selected={selected} vip={vip} couple={couple} seat={seat.Number} />
                            </button>
                          );
                        })}
                      </div>
                      <div style={{ width:'clamp(18px,4vw,28px)', textAlign:'center', color:'#9ca3af', fontWeight:'600', fontSize:'clamp(9px,2vw,13px)', flexShrink:0 }}>
                        {row}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Chú thích */}
              <div style={{ marginTop:'clamp(16px,3vw,24px)', paddingTop:'clamp(12px,3vw,20px)', borderTop:'1px solid rgba(249,115,22,0.2)' }}>
                <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(80px,1fr))', gap:'clamp(8px,2vw,16px)', fontSize:'clamp(10px,2vw,13px)' }}>
                  {[
                    { sold:false, selected:false, vip:false, couple:false, label:'Thường' },
                    { sold:false, selected:false, vip:true,  couple:false, label:'VIP' },
                    { sold:false, selected:false, vip:false, couple:true,  label:'Đôi' },
                    { sold:false, selected:true,  vip:false, couple:false, label:'Đang chọn' },
                    { sold:true,  selected:false, vip:false, couple:false, label:'Đã bán' },
                  ].map((item, i) => (
                    <div key={i} style={{ display:'flex', alignItems:'center', gap:'6px', justifyContent:'center' }}>
                      <div style={{ width:'clamp(22px,4vw,28px)', height:'clamp(22px,4vw,28px)', position:'relative', flexShrink:0, opacity:item.sold ? 0.4 : 1 }}>
                        <SeatIcon {...item} seat="" />
                      </div>
                      <span style={{ color:'#d1d5db', whiteSpace:'nowrap' }}>{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── Thông tin đặt vé ── */}
          <div>
            <div style={{ background:'rgba(255,255,255,0.05)', backdropFilter:'blur(12px)', borderRadius:'16px', padding:'clamp(16px,4vw,24px)', border:'1px solid rgba(255,255,255,0.1)' }}>
              <h2 style={{ fontSize:'clamp(15px,3.5vw,20px)', fontWeight:'bold', margin:0 }}>
                Thông tin đặt vé
              </h2>

              <div style={{ display:'flex', flexDirection:'column', gap:'clamp(8px,2vw,12px)', marginTop:'16px', marginBottom:'clamp(12px,3vw,20px)' }}>
                <div style={{ display:'flex', justifyContent:'space-between', fontSize:'clamp(11px,2.5vw,14px)' }}>
                  <span style={{ color:'#9ca3af' }}>Phim:</span>
                  <span style={{ fontWeight:'600', maxWidth:'60%', textAlign:'right' }}>{movieTitle}</span>
                </div>
                <div style={{ display:'flex', justifyContent:'space-between', fontSize:'clamp(11px,2.5vw,14px)' }}>
                  <span style={{ color:'#9ca3af' }}>Phòng chiếu:</span>
                  <span style={{ fontWeight:'600' }}>{roomName}</span>
                </div>
                <div style={{ display:'flex', justifyContent:'space-between', fontSize:'clamp(11px,2.5vw,14px)' }}>
                  <span style={{ color:'#9ca3af' }}>Định dạng:</span>
                  <span style={{ fontWeight:'600' }}>{roomType}</span>
                </div>
                <div style={{ display:'flex', justifyContent:'space-between', fontSize:'clamp(11px,2.5vw,14px)' }}>
                  <span style={{ color:'#9ca3af' }}>Ngày chiếu:</span>
                  <span style={{ fontWeight:'600' }}>
                    {/* ✅ startTime là Date object — dùng trực tiếp không new Date() */}
                    {isValidDate(startTime)
                      ? startTime.toLocaleDateString("vi-VN", { weekday:'long', day:'2-digit', month:'2-digit', year:'numeric' })
                      : "—"}
                  </span>
                </div>
                <div style={{ display:'flex', justifyContent:'space-between', fontSize:'clamp(11px,2.5vw,14px)' }}>
                  <span style={{ color:'#9ca3af' }}>Giờ chiếu:</span>
                  <span style={{ fontWeight:'600' }}>
                    {isValidDate(startTime)
                      ? startTime.toLocaleTimeString("vi-VN", { hour:"2-digit", minute:"2-digit" })
                      : "—"}
                  </span>
                </div>
              </div>

              {/* Ghế đã chọn */}
              <div style={{ borderTop:'1px solid rgba(255,255,255,0.1)', paddingTop:'clamp(12px,3vw,16px)', marginBottom:'clamp(12px,3vw,16px)' }}>
                <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'8px' }}>
                  <span style={{ color:'#9ca3af', fontSize:'clamp(11px,2.5vw,14px)' }}>Ghế đã chọn:</span>
                  <span style={{ fontWeight:'600', fontSize:'clamp(11px,2.5vw,14px)' }}>{selectedSeats.length} ghế</span>
                </div>
                {selectedSeats.length > 0 && (
                  <div style={{ display:'flex', flexWrap:'wrap', gap:'6px', marginTop:'10px' }}>
                    {selectedSeats.map((s) => (
                      <span key={s.ShowtimeSeatId} style={{ padding:'4px 10px', background:'rgba(249,115,22,0.2)', color:'#fb923c', borderRadius:'6px', fontSize:'clamp(10px,2vw,13px)', fontWeight:'600', border:'1px solid rgba(249,115,22,0.3)' }}>
                        {s.Row}{s.Number}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Tổng tiền */}
              <div style={{ borderTop:'1px solid rgba(255,255,255,0.1)', paddingTop:'clamp(12px,3vw,16px)', marginBottom:'clamp(16px,4vw,20px)' }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                  <span style={{ color:'#9ca3af', fontSize:'clamp(13px,3vw,18px)' }}>Tổng tiền:</span>
                  <span style={{ fontSize:'clamp(18px,4.5vw,24px)', fontWeight:'bold', background:'linear-gradient(to right,#fb923c,#ea580c)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>
                    {formatPrice(calculateTotal())}
                  </span>
                </div>
              </div>

              {/* Nút tiếp tục */}
              <button
                disabled={selectedSeats.length === 0}
                onClick={handleContinue}
                style={{
                  width:'100%', padding:'clamp(12px,3vw,16px)', borderRadius:'12px',
                  fontWeight:'bold', color:'white', fontSize:'clamp(14px,3vw,18px)',
                  border:'none',
                  cursor: selectedSeats.length > 0 ? 'pointer' : 'not-allowed',
                  background: selectedSeats.length > 0 ? 'linear-gradient(to right,#f97316,#ea580c)' : '#374151',
                  opacity: selectedSeats.length > 0 ? 1 : 0.5,
                  transition:'all 0.3s',
                  boxShadow: selectedSeats.length > 0 ? '0 10px 15px -3px rgba(249,115,22,0.4)' : 'none',
                }}
              >
                Tiếp tục
              </button>

              <p style={{ textAlign:'center', color:'#9ca3af', fontSize:'clamp(10px,2vw,12px)', marginTop:'clamp(12px,3vw,16px)', marginBottom:0 }}>
                Vui lòng kiểm tra thông tin trước khi tiếp tục
              </p>

              {/* Quy định */}
              <div style={{ marginTop:'clamp(16px,4vw,24px)', padding:'clamp(12px,3vw,16px)', background:'rgba(249,115,22,0.1)', borderRadius:'12px', border:'1px solid rgba(249,115,22,0.2)' }}>
                <h3 style={{ fontSize:'clamp(12px,2.5vw,14px)', fontWeight:'bold', color:'#fb923c', marginTop:0, marginBottom:'clamp(8px,2vw,12px)', display:'flex', alignItems:'center', gap:'6px' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                  </svg>
                  Quy định đặt vé
                </h3>
                <ul style={{ margin:0, padding:'0 0 0 20px', fontSize:'clamp(10px,2vw,12px)', color:'#d1d5db', lineHeight:'1.6' }}>
                  <li style={{ marginBottom:'6px' }}>Vé đã mua không thể đổi hoặc hoàn lại</li>
                  <li style={{ marginBottom:'6px' }}>Vui lòng có mặt trước giờ chiếu 15 phút</li>
                  <li style={{ marginBottom:'6px' }}>Không mang đồ ăn, thức uống từ bên ngoài</li>
                  <li style={{ marginBottom:'6px' }}>Xuất trình vé trước khi vào phòng chiếu</li>
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