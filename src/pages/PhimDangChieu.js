import React, { useState, useEffect } from "react";
import MovieApi from "../api/MovieApi";

function PhimDangChieu() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch phim đang chiếu
  useEffect(() => {
    fetchNowShowingMovies();
  }, []);

  const fetchNowShowingMovies = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await MovieApi.getNowShowing();
      
      console.log("📥 Result:", result);
      
      if (result.success && result.data) {
        setMovies(result.data);
        console.log(`✅ Loaded ${result.data.length} movies with full info`);
      } else {
        setError(result.message || "Không thể tải phim");
        console.error("❌ Failed to load movies:", result.message);
      }
    } catch (error) {
      console.error("❌ Fetch error:", error);
      setError("Lỗi khi tải danh sách phim");
    } finally {
      setLoading(false);
    }
  };

  // Khởi tạo Swiper
  useEffect(() => {
    if (!loading && movies.length > 0 && window.Swiper) {
      const movieSwiper = new window.Swiper(".mySwiper", {
        loop: true,
        centeredSlides: true,
        spaceBetween: 20,
        autoplay: {
          delay: 3500,
          disableOnInteraction: false,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        speed: 800,
        grabCursor: true,
        effect: "slide",
        breakpoints: {
          0: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 3 },
        },
      });

      return () => {
        if (movieSwiper) movieSwiper.destroy();
      };
    }
  }, [loading, movies]);

  // ✅ Format thời lượng
  const formatDuration = (minutes) => {
    if (!minutes) return "N/A";
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours} giờ ${mins} phút` : `${mins} phút`;
  };

  // ✅ Format danh sách diễn viên (từ array)
  const formatActors = (actors, maxItems = 3) => {
    if (!actors || !Array.isArray(actors) || actors.length === 0) {
      return "N/A";
    }
    
    const actorNames = actors.map(actor => actor.Name);
    
    if (actorNames.length > maxItems) {
      return actorNames.slice(0, maxItems).join(", ") + "...";
    }
    
    return actorNames.join(", ");
  };

  // ✅ Format danh sách đạo diễn (từ array)
  const formatDirectors = (directors) => {
    if (!directors || !Array.isArray(directors) || directors.length === 0) {
      return "N/A";
    }
    
    return directors.map(director => director.Name).join(", ");
  };

  // ✅ Lấy tên thể loại (từ object)
  const getGenreName = (genre) => {
    if (!genre || !genre.Name) return "N/A";
    return genre.Name;
  };

  // Loading
  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <div className="spinner"></div>
        <p>Đang tải phim đang chiếu...</p>
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '50px', color: 'red' }}>
        <p>{error}</p>
        <button 
          onClick={fetchNowShowingMovies} 
          style={{
            padding: '10px 20px',
            backgroundColor: '#e74c3c',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            marginTop: '10px'
          }}
        >
          Thử lại
        </button>
      </div>
    );
  }

  // No movies
  if (movies.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <p>Không có phim đang chiếu</p>
      </div>
    );
  }

  return (
    <div>
      <section className="phimdangchieu">
        <div className="col-md-12">
          <div className="filmoja-heading">
            <h2>
              Phim:<span> Đang chiếu</span>
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
                <div className="movie-card">
                  {/* Poster */}
                  <div className="movie-poster">
                    <img 
                      src={movie.PosterUrl || "/default-poster.jpg"} 
                      alt={movie.Title}
                      onError={(e) => {
                        e.target.src = "/default-poster.jpg";
                      }}
                    />
                  </div>

                  {/* Thông tin */}
                  <div className="movie-info">
                    <h3>{movie.Title}</h3>
                    
                    <div className="tags">
                      <span className="tag">2D</span>
                      <span className="tag">⏱ {formatDuration(movie.Duration)}</span>
                      <span className="tag age">{movie.Rated || 'N/A'}</span>
                    </div>
                    
                    {/* ✅ THỂ LOẠI - từ object genre */}
                    <p style={{ marginTop: '10px', fontSize: '14px' }}>
                      <b>Thể loại:</b> {getGenreName(movie.genre)}
                    </p>
                    
                    {/* ✅ ĐẠO DIỄN - từ array directors */}
                    <p style={{ fontSize: '14px' }}>
                      <b>Đạo diễn:</b> {formatDirectors(movie.directors)}
                    </p>
                    
                    {/* ✅ DIỄN VIÊN - từ array actors */}
                    <p style={{ fontSize: '14px' }}>
                      <b>Diễn viên:</b> {formatActors(movie.actors, 3)}
                    </p>
                    
                    <p className="desc" style={{
                      marginTop: '10px',
                      fontSize: '13px',
                      color: '#999',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical'
                    }}>
                      {movie.Description || 'Không có mô tả'}
                    </p>
                    
                    <a 
                      href={`/lich-chieu/${movie.Slug || movie.MovieId}`} 
                      className="btn-book"
                    >
                      🎟 Đặt vé ngay
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Navigation */}
          <div className="swiper-button-prev"></div>
          <div className="swiper-button-next"></div>
        </div>
      </section>
    </div>
  );
}

export default PhimDangChieu;