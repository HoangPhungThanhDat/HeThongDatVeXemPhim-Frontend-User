// src/pages/PhimDangChieu.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import MovieApi from '../../../api/movieApi';

function PhimDangChieu() {
  const navigate = useNavigate();

  /* ─── TanStack Query: tự refetch khi focus cửa sổ ──────────── */
  const {
    data: movies = [],
    isLoading: loading,
    error: queryError,
    refetch,
  } = useQuery({
    queryKey: ['phim', 'dang-chieu', 'trang-chu'],
    queryFn: async () => {
      const result = await MovieApi.getNowShowing();
      if (!result.success || !result.data) {
        throw new Error(result.message || 'Không thể tải phim');
      }
      return result.data;
    },
    placeholderData: (prev) => prev,
  });

  const error = queryError ? queryError.message : null;

  /* ─── Khởi tạo Swiper sau khi movies load xong ──────────────── */
  useEffect(() => {
    if (!loading && movies.length > 0 && window.Swiper) {
      const swiper = new window.Swiper('.mySwiper', {
        loop: true,
        centeredSlides: true,
        spaceBetween: 20,
        autoplay: { delay: 3500, disableOnInteraction: false },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        speed: 800,
        grabCursor: true,
        breakpoints: {
          0: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 3 },
        },
      });
      return () => {
        if (swiper) swiper.destroy(true, true);
      };
    }
  }, [loading, movies]);

  /* ─── Khi bấm "Đặt vé" → navigate sang chi tiết phim ───────── */
  const handleBooking = (movie) => {
    navigate(`/chi-tiet-phim/${movie.Slug || movie.MovieId}`, {
      state: { movie },
    });
  };

  /* ─── Helper formatters ─────────────────────────────────────── */
  const formatDuration = (minutes) => {
    if (!minutes) return 'N/A';
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return h > 0 ? `${h} giờ ${m} phút` : `${m} phút`;
  };

  const formatActors = (actors, max = 3) => {
    if (!Array.isArray(actors) || actors.length === 0) return 'N/A';
    const names = actors.map((a) => a.Name);
    return names.length > max ? names.slice(0, max).join(', ') + '...' : names.join(', ');
  };

  const formatDirectors = (directors) => {
    if (!Array.isArray(directors) || directors.length === 0) return 'N/A';
    return directors.map((d) => d.Name).join(', ');
  };

  const getGenreName = (genre) => genre?.Name || 'N/A';

  /* ─── States UI ─────────────────────────────────────────────── */
  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <p>Đang tải phim đang chiếu...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '50px', color: 'red' }}>
        <p>{error}</p>
        <button
          onClick={() => refetch()}
          style={{
            padding: '10px 20px',
            backgroundColor: '#e74c3c',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Thử lại
        </button>
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <p>Không có phim đang chiếu</p>
      </div>
    );
  }

  /* ─── Styles ────────────────────────────────────────────────── */
  const styles = {
    card: {
      display: 'flex',
      flexDirection: 'row',
      height: '260px',
      borderRadius: '10px',
      overflow: 'hidden',
      backgroundColor: '#1e2a3a',
    },
    poster: { flexShrink: 0, width: '160px', overflow: 'hidden' },
    posterImg: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      display: 'block',
    },
    info: {
      flex: 1,
      padding: '12px',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      minWidth: 0,
    },
    title: {
      fontSize: '15px',
      fontWeight: 'bold',
      color: '#f39c12',
      margin: '0 0 6px 0',
      overflow: 'hidden',
      display: '-webkit-box',
      WebkitLineClamp: 2,
      WebkitBoxOrient: 'vertical',
      lineHeight: '1.3',
    },
    tags: { display: 'flex', gap: '4px', flexWrap: 'wrap', marginBottom: '8px' },
    tag: {
      fontSize: '11px',
      padding: '2px 6px',
      borderRadius: '4px',
      backgroundColor: '#2c3e50',
      color: '#ccc',
      whiteSpace: 'nowrap',
    },
    tagAge: { backgroundColor: '#c0392b', color: '#fff' },
    metaRow: {
      fontSize: '13px',
      color: '#bbb',
      margin: '2px 0',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
    },
    metaLabel: { fontWeight: 'bold', color: '#ddd' },
    desc: {
      fontSize: '12px',
      color: '#888',
      margin: '6px 0 0 0',
      overflow: 'hidden',
      display: '-webkit-box',
      WebkitLineClamp: 2,
      WebkitBoxOrient: 'vertical',
      flex: 1,
    },
    btnBook: {
      marginTop: 'auto',
      padding: '7px 14px',
      backgroundColor: '#e74c3c',
      color: '#fff',
      borderRadius: '5px',
      border: 'none',
      fontSize: '13px',
      fontWeight: 'bold',
      cursor: 'pointer',
      alignSelf: 'flex-start',
      flexShrink: 0,
    },
  };

  /* ─── Render ────────────────────────────────────────────────── */
  return (
    <div>
      <section className="phimdangchieu">
        <div className="col-md-12">
          <div className="filmoja-heading">
            <h2>
              Phim: <span>Đang chiếu</span>
            </h2>
            <p style={{ color: '#999', fontSize: '14px', marginTop: '5px' }}>
              Tổng cộng: {movies.length} phim
            </p>
          </div>
        </div>

        <div className="swiper mySwiper">
          <div className="swiper-wrapper">
            {movies.map((movie) => (
              <div className="swiper-slide" key={movie.MovieId}>
                <div className="movie-card" style={styles.card}>
                  {/* Poster */}
                  <div style={styles.poster}>
                    <img
                      src={movie.PosterUrl || '/default-poster.jpg'}
                      alt={movie.Title}
                      style={styles.posterImg}
                      onError={(e) => {
                        e.target.src = '/default-poster.jpg';
                      }}
                    />
                  </div>

                  {/* Thông tin */}
                  <div style={styles.info}>
                    <h3 style={styles.title}>{movie.Title}</h3>

                    <div style={styles.tags}>
                      <span style={styles.tag}>2D</span>
                      <span style={styles.tag}>⏱ {formatDuration(movie.Duration)}</span>
                      <span style={{ ...styles.tag, ...styles.tagAge }}>
                        {movie.Rated || 'N/A'}
                      </span>
                    </div>

                    <p style={styles.metaRow}>
                      <span style={styles.metaLabel}>Thể loại: </span>
                      {getGenreName(movie.genre)}
                    </p>
                    <p style={styles.metaRow}>
                      <span style={styles.metaLabel}>Đạo diễn: </span>
                      {formatDirectors(movie.directors)}
                    </p>
                    <p style={styles.metaRow}>
                      <span style={styles.metaLabel}>Diễn viên: </span>
                      {formatActors(movie.actors, 3)}
                    </p>

                    <p style={styles.desc}>{movie.Description || 'Không có mô tả'}</p>

                    <button style={styles.btnBook} onClick={() => handleBooking(movie)}>
                      🎟 Đặt vé ngay
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="swiper-button-prev"></div>
          <div className="swiper-button-next"></div>
        </div>
      </section>
    </div>
  );
}

export default PhimDangChieu;