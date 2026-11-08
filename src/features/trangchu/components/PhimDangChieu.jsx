// src/pages/PhimDangChieu.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import MovieApi from '../../../api/movieApi';

function PhimDangChieu() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Kiểm tra kích thước màn hình để chuyển giao diện
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile(); // Kiểm tra lúc mới load
    window.addEventListener('resize', checkMobile); // Cập nhật khi xoay màn hình
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const {
    data: movies = [],
    isLoading: loading,
    error: queryError,
  } = useQuery({
    queryKey: ['phim', 'dang-chieu', 'trang-chu'],
    queryFn: async () => {
      const result = await MovieApi.getNowShowing();
      if (!result || !result.success || !result.data) {
        throw new Error(result?.message || 'Không thể tải phim');
      }
      return result.data;
    },
    placeholderData: (prev) => prev,
  });

  // Hiệu ứng búng ra cho Desktop
  useEffect(() => {
    if (!isMobile && movies.length > 0) {
      const timer = setTimeout(() => setIsExpanded(true), 100);
      return () => clearTimeout(timer);
    }
  }, [movies, activeIndex, isMobile]);

  // Tự động chuyển phim sau 4 giây
  useEffect(() => {
    if (movies.length === 0 || isMobile) return; // Không tự chuyển trên mobile
    const interval = setInterval(() => {
      setIsExpanded(false);
      setTimeout(() => {
        setActiveIndex((prev) => (prev + 1) % movies.length);
      }, 300);
    }, 4500);
    return () => clearInterval(interval);
  }, [movies.length, isMobile]);

  const formatDuration = (minutes) => {
    if (!minutes) return 'N/A';
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return h > 0 ? `${h} giờ ${m} phút` : `${m} phút`;
  };

  const formatActors = (actors) => {
    if (!Array.isArray(actors) || actors.length === 0) return 'Đang cập nhật';
    return actors.map((a) => a.Name).join(', ');
  };

  const formatDirectors = (directors) => {
    if (!Array.isArray(directors) || directors.length === 0) return 'Đang cập nhật';
    return directors.map((d) => d.Name).join(', ');
  };

  const total = movies.length;
  const prevIndex = activeIndex === 0 ? total - 1 : activeIndex - 1;
  const nextIndex = activeIndex === total - 1 ? 0 : activeIndex + 1;

  const handlePrev = () => {
    if (isMobile) return;
    setIsExpanded(false);
    setTimeout(() => setActiveIndex((prev) => (prev === 0 ? total - 1 : prev - 1)), 300);
  };

  const handleNext = () => {
    if (isMobile) return;
    setIsExpanded(false);
    setTimeout(() => setActiveIndex((prev) => (prev + 1) % total), 300);
  };

  if (loading) return <div style={{ textAlign: 'center', padding: '50px', color: '#fff' }}>Đang tải phim...</div>;
  if (queryError) return <div style={{ textAlign: 'center', padding: '50px', color: 'red' }}>Lỗi: {queryError.message}</div>;
  if (movies.length === 0) return <div style={{ textAlign: 'center', padding: '50px', color: '#fff' }}>Không có phim.</div>;

  return (
    <section className="filmoja-top-movies-area section_30" style={{ background: '#1e2a3a', paddingBottom: '30px', overflow: 'hidden' }}>
      <div className="container">
        
        <div className="row">
          <div className="col-md-12">
            <div className="filmoja-heading" style={{ marginBottom: isMobile ? '15px' : '30px' }}>
              <h2 style={{ color: '#fff', fontSize: isMobile ? '22px' : '30px', fontWeight: 'bold', margin: 0 }}>
                Phim: <span style={{ color: '#f37737' }}>Đang Chiếu</span>
              </h2>
            </div>
          </div>
        </div>
        
        {/* NẾU LÀ MOBILE: Hiển thị dạng cuộn ngang chỉ có ảnh */}
        {isMobile ? (
          <div style={{ 
            display: 'flex', 
            overflowX: 'auto', 
            gap: '15px', 
            paddingBottom: '15px',
            scrollbarWidth: 'none', // Ẩn thanh cuộn trên Firefox
            msOverflowStyle: 'none', // Ẩn thanh cuộn trên IE
          }}>
            {/* CSS ẩn thanh cuộn cho Chrome/Safari */}
            <style>{`div::-webkit-scrollbar { display: none; }`}</style>
            
            {movies.map((movie) => (
              <Link 
                key={movie.MovieId} 
                to={`/film/${movie.Slug || movie.MovieId}.html`}
                style={{ flexShrink: 0, width: '140px' }}
              >
                <img 
                  src={movie.PosterUrl || '/default-poster.jpg'} 
                  alt={movie.Title} 
                  style={{ 
                    width: '100%', 
                    height: 'auto', 
                    aspectRatio: '258/387', 
                    objectFit: 'cover', 
                    borderRadius: '5px',
                    border: '2px solid #f37737'
                  }}
                />
              </Link>
            ))}
          </div>
        ) : (
          /* NẾU LÀ DESKTOP: Hiển thị giao diện búng ra như cũ */
          <div className="row">
            <div className="col-md-12" style={{ position: 'relative' }}>
              
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                height: '420px', 
                position: 'relative',
                width: '100%',
                maxWidth: '1200px',
                margin: '0 auto'
              }}>
                
                {/* PHIM BÊN TRÁI */}
                <div 
                  onClick={handlePrev}
                  style={{
                    position: 'absolute', left: '0', width: '258px', height: '387px',
                    cursor: 'pointer', opacity: 0.4, transform: 'scale(0.9)',
                    transition: 'all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)',
                    zIndex: 1, borderRadius: '5px', overflow: 'hidden'
                  }}
                >
                  <img src={movies[prevIndex]?.PosterUrl || '/default-poster.jpg'} alt="Prev" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>

                {/* PHIM Ở GIỮA (CÓ HIỆU ỨNG BÚNG RA) */}
                <div 
                  style={{
                    display: 'flex', width: isExpanded ? '850px' : '258px', height: '387px',
                    zIndex: 10, transition: 'width 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)',
                    margin: '0 auto', position: 'relative', borderRadius: '5px',
                    boxShadow: isExpanded ? '0 10px 30px rgba(0,0,0,0.5)' : 'none'
                  }}
                >
                  <div style={{
                    width: '258px', height: '100%', flexShrink: 0,
                    borderRadius: isExpanded ? '5px 0 0 5px' : '5px', overflow: 'hidden',
                    border: '2px solid #f37737', borderRight: isExpanded ? 'none' : '2px solid #f37737',
                    transition: 'all 0.5s ease'
                  }}>
                    <img src={movies[activeIndex]?.PosterUrl || '/default-poster.jpg'} alt="Active" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>

                  <div style={{
                    width: 'calc(100% - 258px)', height: '100%', backgroundColor: '#fff',
                    border: '2px solid #f37737', borderLeft: 'none', borderRadius: '0 5px 5px 0',
                    padding: '20px 25px', display: 'flex', flexDirection: 'column', position: 'relative',
                    opacity: isExpanded ? 1 : 0, transition: 'opacity 0.3s ease', transitionDelay: isExpanded ? '0.2s' : '0s'
                  }}>
                    <div style={{ position: 'absolute', top: '50%', left: '-15px', transform: 'translateY(-50%)', width: 0, height: 0, borderTop: '15px solid transparent', borderBottom: '15px solid transparent', borderRight: '15px solid #f37737', zIndex: 20 }} />

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                      <h3 style={{ fontSize: '22px', fontWeight: 'bold', color: '#000', margin: 0, lineHeight: 1.3 }}>
                        {movies[activeIndex]?.Title}
                      </h3>
                      <span style={{ backgroundColor: '#f37737', color: '#fff', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', flexShrink: 0, fontSize: '16px' }}>
                        {movies[activeIndex]?.Rated || 'P'}
                      </span>
                    </div>

                    <div style={{ display: 'flex', gap: '15px', fontSize: '15px', color: '#666', marginBottom: '15px', alignItems: 'center' }}>
                      <span style={{ background: '#f37737', color: '#fff', padding: '2px 8px', borderRadius: '3px', fontSize: '13px' }}>2D</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <i className="fa fa-clock-o" style={{ color: '#f37737' }}></i> {formatDuration(movies[activeIndex]?.Duration)}
                      </span>
                    </div>

                    <p style={{ margin: '0 0 8px', fontSize: '15px', color: '#555', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {movies[activeIndex]?.genre?.Name || 'Đang cập nhật'}
                    </p>
                    <p style={{ margin: '0 0 8px', fontSize: '15px', color: '#555' }}><strong>Đạo diễn:</strong> {formatDirectors(movies[activeIndex]?.directors)}</p>
                    <p style={{ margin: '0 0 15px', fontSize: '15px', color: '#555', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}><strong>Diễn viên:</strong> {formatActors(movies[activeIndex]?.actors)}</p>
                    
                    <p style={{ fontSize: '15px', color: '#444', flexGrow: 1, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 6, WebkitBoxOrient: 'vertical', lineHeight: '1.6' }}>
                      {movies[activeIndex]?.Description || 'Đang cập nhật nội dung...'}
                    </p>

                    <div style={{ borderTop: '1px solid #ddd', paddingTop: '15px', marginTop: 'auto' }}>
                      <Link to={`/chi-tiet-phim/${movies[activeIndex]?.Slug || movies[activeIndex]?.MovieId}`} state={{ movie: movies[activeIndex] }} style={{ color: '#f37737', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '16px', textDecoration: 'none' }}>
                        <i className="fa fa-ticket"></i> Đặt vé
                      </Link>
                    </div>
                  </div>
                </div>

                {/* PHIM BÊN PHẢI */}
                <div 
                  onClick={handleNext}
                  style={{
                    position: 'absolute', right: '0', width: '258px', height: '387px',
                    cursor: 'pointer', opacity: 0.4, transform: 'scale(0.9)',
                    transition: 'all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)',
                    zIndex: 1, borderRadius: '5px', overflow: 'hidden'
                  }}
                >
                  <img src={movies[nextIndex]?.PosterUrl || '/default-poster.jpg'} alt="Next" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              </div>

              <button onClick={handlePrev} style={{ position: 'absolute', left: '-20px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', zIndex: 20, cursor: 'pointer' }}>
                <i className="fa fa-chevron-left" style={{ fontSize: '40px', color: '#f37737' }}></i>
              </button>
              
              <button onClick={handleNext} style={{ position: 'absolute', right: '-20px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', zIndex: 20, cursor: 'pointer' }}>
                 <i className="fa fa-chevron-right" style={{ fontSize: '40px', color: '#f37737' }}></i>
              </button>

            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default PhimDangChieu;