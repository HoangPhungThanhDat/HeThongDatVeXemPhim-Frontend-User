import React, { useState, useEffect, useRef } from "react";
import MovieApi from "../api/MovieApi";

function PhimMoi() {
  const [movies, setMovies] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTrailer, setSelectedTrailer] = useState("");
  const carouselRef = useRef(null);
  const owlInstanceRef = useRef(null);

  useEffect(() => {
    fetchMovies();

    return () => {
      // Cleanup khi unmount
      if (owlInstanceRef.current && window.$) {
        try {
          window.$(carouselRef.current).owlCarousel("destroy");
          owlInstanceRef.current = null;
        } catch (e) {
          console.log("Cleanup error:", e);
        }
      }
    };
  }, []);

  const fetchMovies = async () => {
    const result = await MovieApi.getLatestMovies(10);
    if (result.success) {
      setMovies(result.data);
    }
  };

  useEffect(() => {
    if (
      movies.length > 0 &&
      carouselRef.current &&
      window.$ &&
      window.$.fn.owlCarousel
    ) {
      // CHỈ khởi tạo NẾU chưa có instance
      if (!owlInstanceRef.current) {
        const timer = setTimeout(() => {
          const $carousel = window.$(carouselRef.current);

          // Kiểm tra lần cuối trước khi khởi tạo
          if (!$carousel.hasClass("owl-loaded")) {
            owlInstanceRef.current = $carousel.owlCarousel({
              loop: true,
              margin: 10,
              nav: true,
              dots: false,
              autoplay: true,
              autoplayTimeout: 3000,
              navText: [
                "<i class='fa fa-angle-left'></i>",
                "<i class='fa fa-angle-right'></i>",
              ],
              responsive: {
                0: { items: 1 },
                600: { items: 3 },
                1000: { items: 5 },
              },
            });
          }
        }, 100);

        return () => clearTimeout(timer);
      }
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

  return (
    <div>
      {/* <!-- Top phim mới  --> */}
      <section className="filmoja-top-movies-area section_30">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="filmoja-heading">
                <h2>
                  Phim:<span> Mới </span>
                </h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              {movies.length === 0 ? (
                <div className="text-center" style={{ padding: "50px 0" }}>
                  <i
                    className="fa fa-spinner fa-spin"
                    style={{ fontSize: "40px" }}
                  ></i>
                  <p>Đang tải phim...</p>
                </div>
              ) : (
                <div
                  ref={carouselRef}
                  className="top-movie-slider owl-carousel"
                >
                  {movies.map((movie) => (
                    <div key={movie.MovieId} className="single-top-movie">
                      <div className="top-movie-wrap">
                        <div className="top-movie-img">
                          <a href={`/film/${movie.Slug}/${movie.MovieId}.html`}>
                            <img src={movie.PosterUrl} alt={movie.Slug} />
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
                          <div className="thumb-date"></div>
                        </div>
                      </div>
                      <div className="top-movie-details">
                        <h4>
                          <a href={`/film/${movie.Slug}/${movie.MovieId}.html`}>
                            {movie.Title}
                          </a>
                        </h4>
                      </div>
                    </div>
                  ))}
                </div>
              )}
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

export default PhimMoi;