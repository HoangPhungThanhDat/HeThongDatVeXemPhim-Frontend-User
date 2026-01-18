import React, { useState, useEffect } from "react";
import MovieApi from "../api/MovieApi";

function PhimSapChieu() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedTrailer, setSelectedTrailer] = useState("");

  useEffect(() => {
    fetchComingSoonMovies();
  }, []);

  const fetchComingSoonMovies = async () => {
    try {
      setLoading(true);
      const result = await MovieApi.getComingSoonMovies(10);
      
      if (result.success) {
        setMovies(result.data);
      } else {
        console.error("Lỗi khi lấy phim sắp chiếu:", result.message);
      }
    } catch (error) {
      console.error("Lỗi:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (movies.length > 0 && window.$) {
      const $carousel = window.$(".top-movie-slider");
      if ($carousel.hasClass("owl-loaded")) {
        $carousel.trigger("destroy.owl.carousel");
        $carousel.removeClass("owl-loaded");
      }

      setTimeout(() => {
        $carousel.owlCarousel({
          loop: true,
          margin: 10,
          nav: true,
          dots: false,
          autoplay: true,
          autoplayTimeout: 3000,
          responsive: {
            0: { items: 1 },
            600: { items: 3 },
            1000: { items: 5 },
          },
        });
      }, 100);
    }
  }, [movies]);

  // Chuyển đổi URL YouTube thành embed URL
  const getYouTubeEmbedUrl = (url) => {
    if (!url) return "";
    
    // Nếu là YouTube ID thuần
    if (!url.includes("http")) {
      return `https://www.youtube.com/embed/${url}?autoplay=1`;
    }
    
    // Xử lý các dạng URL YouTube khác
    let videoId = "";
    
    if (url.includes("youtube.com/watch?v=")) {
      videoId = url.split("v=")[1]?.split("&")[0];
    } else if (url.includes("youtu.be/")) {
      videoId = url.split("youtu.be/")[1]?.split("?")[0];
    } else if (url.includes("youtube.com/embed/")) {
      videoId = url.split("embed/")[1]?.split("?")[0];
    }
    
    return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1` : "";
  };

  // Mở modal với trailer
  const handlePlayTrailer = (e, trailerUrl) => {
    e.preventDefault();
    e.stopPropagation();
    
    const embedUrl = getYouTubeEmbedUrl(trailerUrl);
    if (embedUrl) {
      setSelectedTrailer(embedUrl);
      setShowModal(true);
      // Ngăn scroll khi modal mở
      document.body.style.overflow = 'hidden';
    }
  };

  // Đóng modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedTrailer("");
    // Cho phép scroll lại
    document.body.style.overflow = 'auto';
  };

  if (loading) {
    return (
      <section className="filmoja-top-movies-area section_30">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="filmoja-heading">
                <h2>
                  Phim:<span> Sắp chiếu</span>
                </h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Đang tải...</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!movies || movies.length === 0) {
    return (
      <section className="filmoja-top-movies-area section_30">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="filmoja-heading">
                <h2>
                  Phim:<span> Sắp chiếu</span>
                </h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 text-center py-5">
              <p className="text-muted">Chưa có phim sắp chiếu</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <div>
      <section className="filmoja-top-movies-area section_30">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="filmoja-heading">
                <h2>
                  Phim:<span> Sắp chiếu</span>
                </h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="top-movie-slider owl-carousel">
                {movies.map((movie) => (
                  <div className="single-top-movie" key={movie.MovieId}>
                    <div className="top-movie-wrap">
                      <div className="top-movie-img">
                        <a href={`/movie/${movie.MovieId}`}>
                          <img
                            src={movie.PosterUrl || "/default-poster.jpg"}
                            alt={movie.Title}
                            onError={(e) => {
                              e.target.src = "/default-poster.jpg";
                            }}
                          />
                        </a>
                      </div>
                      <div className="thumb-hover">
                        {movie.TrailerUrl && (
                          <a
                            className="play-video"
                            href="#"
                            onClick={(e) => handlePlayTrailer(e, movie.TrailerUrl)}
                          >
                            <i className="fa fa-play"></i>
                          </a>
                        )}
                        <div className="thumb-date">
                          {movie.ReleaseDate && (
                            <span>
                              {new Date(movie.ReleaseDate).toLocaleDateString(
                                "vi-VN"
                              )}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="top-movie-details">
                      <h4>
                        <a href={`/movie/${movie.MovieId}`}>{movie.Title}</a>
                      </h4>
                      {movie.Rated && (
                        <span className="movie-rated">({movie.Rated})</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal Trailer YouTube */}
      {showModal && (
        <div 
          className="trailer-modal-overlay"
          onClick={handleCloseModal}
        >
          <div className="trailer-modal-content" onClick={(e) => e.stopPropagation()}>
            <button 
              className="trailer-modal-close"
              onClick={handleCloseModal}
            >
              <i className="fa fa-times"></i>
            </button>
            <div className="trailer-video-wrapper">
              <iframe
                src={selectedTrailer}
                title="Movie Trailer"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .trailer-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          animation: fadeIn 0.3s ease-in-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .trailer-modal-content {
          position: relative;
          width: 90%;
          max-width: 1200px;
          animation: slideUp 0.3s ease-in-out;
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

        .trailer-modal-close {
          position: absolute;
          top: -40px;
          right: 0;
          background: transparent;
          border: none;
          color: white;
          font-size: 30px;
          cursor: pointer;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          z-index: 10000;
        }

        .trailer-modal-close:hover {
          color: #ff0000;
          transform: rotate(90deg);
        }

        .trailer-video-wrapper {
          position: relative;
          padding-bottom: 56.25%; /* 16:9 aspect ratio */
          height: 0;
          overflow: hidden;
          background: #000;
          border-radius: 8px;
        }

        .trailer-video-wrapper iframe {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: 8px;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .trailer-modal-content {
            width: 95%;
          }

          .trailer-modal-close {
            top: -35px;
            font-size: 25px;
            width: 35px;
            height: 35px;
          }
        }
      `}</style>
    </div>
  );
}

export default PhimSapChieu;