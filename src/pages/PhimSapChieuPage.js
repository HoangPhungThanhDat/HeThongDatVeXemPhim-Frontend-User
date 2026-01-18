import React, { useState, useEffect } from "react";
import MovieApi from "../api/MovieApi";

const PhimSapChieuPage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedTrailer, setSelectedTrailer] = useState("");

  useEffect(() => {
    fetchComingSoonMovies();
  }, []);

  const fetchComingSoonMovies = async () => {
    try {
      setLoading(true);
      const result = await MovieApi.getComingSoonMovies(20); // Lấy 20 phim sắp chiếu
      
      if (result.success) {
        setMovies(result.data);
        setError(null);
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError("Không thể tải danh sách phim. Vui lòng thử lại sau.");
      console.error("Error fetching movies:", err);
    } finally {
      setLoading(false);
    }
  };

  // Chuyển đổi URL YouTube thành embed URL
  const getYouTubeEmbedUrl = (url) => {
    if (!url) return "";
    
    console.log("Original trailer URL:", url);
    
    // Nếu là YouTube ID thuần (11 ký tự)
    if (!url.includes("http") && url.length === 11) {
      return `https://www.youtube.com/embed/${url}?autoplay=1&rel=0`;
    }
    
    // Xử lý các dạng URL YouTube khác
    let videoId = "";
    
    try {
      if (url.includes("youtube.com/watch?v=")) {
        videoId = url.split("v=")[1]?.split("&")[0];
      } else if (url.includes("youtu.be/")) {
        videoId = url.split("youtu.be/")[1]?.split("?")[0];
      } else if (url.includes("youtube.com/embed/")) {
        videoId = url.split("embed/")[1]?.split("?")[0];
      } else if (url.includes("youtube.com/v/")) {
        videoId = url.split("v/")[1]?.split("?")[0];
      }
      
      // Loại bỏ ký tự không hợp lệ
      if (videoId) {
        videoId = videoId.replace(/[^a-zA-Z0-9_-]/g, '');
      }
    } catch (error) {
      console.error("Error parsing YouTube URL:", error);
    }
    
    const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0` : "";
    console.log("Embed URL:", embedUrl);
    
    return embedUrl;
  };

  const handleTrailerClick = (e, trailerUrl) => {
    e.preventDefault();
    e.stopPropagation();
    
    console.log("Play trailer clicked:", trailerUrl);
    
    const embedUrl = getYouTubeEmbedUrl(trailerUrl);
    
    if (embedUrl) {
      setSelectedTrailer(embedUrl);
      setShowModal(true);
      document.body.style.overflow = 'hidden';
      console.log("Modal should open now");
    } else {
      console.error("Invalid trailer URL:", trailerUrl);
      alert("Không thể phát trailer. URL không hợp lệ.");
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedTrailer("");
    document.body.style.overflow = 'auto';
  };

  // Đóng modal khi nhấn ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && showModal) {
        handleCloseModal();
      }
    };
    
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [showModal]);

  // Format ngày tháng
  const formatDate = (dateString) => {
    if (!dateString) return "Chưa xác định";
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric' 
    });
  };

  const renderMovieCard = (movie) => {
    // Xử lý tên field có thể khác nhau từ API
    const posterUrl = movie.PosterUrl || movie.PosterURL || movie.posterUrl || movie.ImageUrl;
    const movieId = movie.MovieId || movie.MovieID || movie.movieId || movie.id;
    
    return (
      <div 
        key={movieId} 
        className="col-lg-3 col-md-6 col-sm-12 grid-item" 
        style={{ float: "left" }}
      >
        <article className="entry-item">
          <div className="front">
            <div className="entry-thumb">
              <img 
                src={posterUrl || "https://via.placeholder.com/300x450?text=No+Image"} 
                alt={movie.Title}
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/300x450?text=No+Image";
                }}
              />
              {/* Badge Sắp Chiếu */}
              <div style={{
                position: 'absolute',
                top: '10px',
                left: '10px',
                backgroundColor: '#ff9800',
                color: 'white',
                padding: '5px 10px',
                borderRadius: '4px',
                fontSize: '12px',
                fontWeight: 'bold'
              }}>
                SẮP CHIẾU
              </div>
            </div>
            <a href={`/film/${movieId}`}>
              <h4 className="entry-title">{movie.Title}</h4>
            </a>
            <div className="entry-genre">
              <p>{movie.Genre || "Chưa phân loại"}</p>
            </div>
          </div>
        
          <div className="back">
            <h3 className="entry-title">
              <a href={`/film/${movieId}`}>{movie.Title}</a>
            </h3>
            <span className="pg">{movie.Rated || movie.AgeRating || "P"}</span>
            
            <div className="movie-char-info-left">
              <p style={{ fontStyle: 'italic' }}>{movie.Genre || "Chưa phân loại"}</p>
            </div>
            
            {/* Ngày khởi chiếu */}
            <div className="entry-time" style={{ marginBottom: '10px' }}>
              <i className="fa fa-calendar"></i>
              <span style={{ marginLeft: '5px', fontWeight: 'bold', color: '#ff9800' }}>
                Khởi chiếu: {formatDate(movie.ReleaseDate)}
              </span>
            </div>
            
            <div className="entry-time">
              <i className="fa fa-clock-o"></i>
              {movie.Duration ? `${movie.Duration} phút` : "Chưa cập nhật"}
            </div>
            
            <p>{movie.Description || "Chưa có mô tả"}</p>
            
            <div className="entry-button">
              {(movie.TrailerUrl || movie.TrailerURL) && (
                <a 
                  href="#"
                  className="play-video"
                  onClick={(e) => handleTrailerClick(e, movie.TrailerUrl || movie.TrailerURL)}
                  style={{ cursor: 'pointer' }}
                >
                  <i aria-hidden="true" className="fa fa-play"></i>Trailer
                </a>
              )}
              <a href={`/film/${movieId}`}>
                <i aria-hidden="true" className="fa fa-info-circle"></i>Chi tiết
              </a>
            </div>
            
            <div className="movie-char-info">
              <div className="clearfix"></div>
              
              {movie.Director && (
                <>
                  <div className="movie-char-info-left">
                    <h6>Đạo diễn</h6>
                    <span>{movie.Director}</span>
                  </div>
                  <div className="clearfix"></div>
                </>
              )}
              
              {movie.Cast && (
                <>
                  <div className="movie-char-info-right">
                    <h6>Diễn viên</h6>
                    <span>{movie.Cast}</span>
                  </div>
                  <div className="clearfix"></div>
                </>
              )}
            </div>
          </div>
        </article>
      </div>
    );
  };

  return (
    <div>
      <section
      className="filmoja-login-area section_70 bg-main"
      style={{
        background: "#e6e7e9",
        maxWidth: "100%",
        borderTop: "1px solid #ccc",
      }}
    >
        <div className="container">
          <div className="movie-grid-box list-film">
            <div className="amy-mv-grid layout3" style={{ textAlign: 'center' }}>
              
              {/* Loading State */}
              {loading && (
                <div style={{ 
                  width: '100%', 
                  textAlign: 'center', 
                  padding: '50px 0',
                  fontSize: '18px'
                }}>
                  <i className="fa fa-spinner fa-spin" style={{ marginRight: '10px' }}></i>
                  Đang tải danh sách phim sắp chiếu...
                </div>
              )}

              {/* Error State */}
              {error && !loading && (
                <div style={{ 
                  width: '100%', 
                  textAlign: 'center', 
                  padding: '50px 0',
                  color: '#d32f2f'
                }}>
                  <i className="fa fa-exclamation-triangle" style={{ marginRight: '10px' }}></i>
                  {error}
                  <br />
                  <button 
                    onClick={fetchComingSoonMovies}
                    style={{
                      marginTop: '20px',
                      padding: '10px 20px',
                      backgroundColor: '#f50057',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    Thử lại
                  </button>
                </div>
              )}

              {/* No Data State */}
              {!loading && !error && movies.length === 0 && (
                <div style={{ 
                  width: '100%', 
                  textAlign: 'center', 
                  padding: '50px 0',
                  fontSize: '18px'
                }}>
                  <i className="fa fa-film" style={{ marginRight: '10px' }}></i>
                  Hiện tại chưa có phim sắp chiếu
                </div>
              )}

              {/* Movie List */}
              {!loading && !error && movies.length > 0 && (
                movies.map(movie => renderMovieCard(movie))
              )}

              <div className="clearfix"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal Trailer YouTube */}
      {showModal && (
        <div 
          className="trailer-modal-overlay"
          onClick={handleCloseModal}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            animation: 'fadeIn 0.3s ease-in-out'
          }}
        >
          <style>{`
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            @keyframes slideUp {
              from {
                transform: translateY(50px);
                opacity: 0;
              }
              to {
                transform: translateY(0);
                opacity: 1;
              }
            }
          `}</style>
          
          <div 
            className="trailer-modal-content" 
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative',
              width: '90%',
              maxWidth: '1200px',
              animation: 'slideUp 0.3s ease-in-out'
            }}
          >
            <button 
              className="trailer-modal-close"
              onClick={handleCloseModal}
              style={{
                position: 'absolute',
                top: '-40px',
                right: 0,
                background: 'transparent',
                border: 'none',
                color: 'white',
                fontSize: '30px',
                cursor: 'pointer',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease',
                zIndex: 10000
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#ff0000';
                e.currentTarget.style.transform = 'rotate(90deg)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'white';
                e.currentTarget.style.transform = 'rotate(0deg)';
              }}
            >
              <i className="fa fa-times"></i>
            </button>
            
            <div 
              className="trailer-video-wrapper"
              style={{
                position: 'relative',
                paddingBottom: '56.25%',
                height: 0,
                overflow: 'hidden',
                background: '#000',
                borderRadius: '8px'
              }}
            >
              {selectedTrailer ? (
                <iframe
                  src={selectedTrailer}
                  title="Movie Trailer"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    border: 'none',
                    borderRadius: '8px'
                  }}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  color: 'white',
                  fontSize: '18px',
                  textAlign: 'center'
                }}>
                  <i className="fa fa-exclamation-circle" style={{ marginRight: '10px' }}></i>
                  Không thể tải trailer
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhimSapChieuPage;