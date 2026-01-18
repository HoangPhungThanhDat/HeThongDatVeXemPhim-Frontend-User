import React, { useState, useEffect } from "react";
import MovieApi from "../api/MovieApi";

function PhimDangChieu() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch phim đang chiếu từ API
  useEffect(() => {
    fetchNowShowingMovies();
  }, []);

  const fetchNowShowingMovies = async () => {
    try {
      setLoading(true);
      const result = await MovieApi.getNowShowing();
      if (result.success) {
        setMovies(result.data);
      }
    } catch (error) {
      console.error("Error fetching now showing movies:", error);
    } finally {
      setLoading(false);
    }
  };

  // Khởi tạo Swiper sau khi movies đã load
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
          0: {
            slidesPerView: 2, // Mobile
          },
          768: {
            slidesPerView: 3, // Tablet
          },
          1024: {
            slidesPerView: 3, // Desktop
          },
        },
      });

      // cleanup khi component unmount
      return () => {
        movieSwiper.destroy();
      };
    }
  }, [loading, movies]);

  // Format thời lượng
  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours} giờ ${mins} phút`;
    }
    return `${mins} phút`;
  };

  return (
    <div>
      <section className="phimdangchieu">
        <div className="col-md-12">
          <div className="filmoja-heading">
            <h2>
              Phim:<span> Đang chiếu</span>
            </h2>
          </div>
        </div>
        <div className="swiper mySwiper">
          <div className="swiper-wrapper">
            {movies.map((movie) => (
              <div className="swiper-slide" key={movie.MovieId}>
                <div className="movie-card">
                  {/* <!-- Poster bên trái --> */}
                  <div className="movie-poster">
                    <img 
                      src={movie.PosterUrl} 
                      alt={movie.Title}
                      onError={(e) => {
                        e.target.src = "/default-poster.jpg";
                      }}
                    />
                  </div>

                  {/* <!-- Thông tin bên phải --> */}
                  <div className="movie-info">
                    <h3>{movie.Title}</h3>
                    <div className="tags">
                      <span className="tag">2D</span>
                      <span className="tag">⏱ {formatDuration(movie.Duration)}</span>
                      <span className="tag age">{movie.Rated}</span>
                    </div>
                    <p>
                      <b>Thể loại:</b> {movie.Genre}
                    </p>
                    <p>
                      <b>Đạo diễn:</b> {movie.Director}
                    </p>
                    <p>
                      <b>Diễn viên:</b> {movie.Cast}
                    </p>
                    <p className="desc">
                      {movie.Description}
                    </p>
                    <a href={`/movie/${movie.MovieId}`} className="btn-book">
                      🎟 Đặt vé
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* <!-- Nút điều hướng --> */}
          <div className="swiper-button-prev"></div>
          <div className="swiper-button-next"></div>
        </div>
      </section>
    </div>
  );
}

export default PhimDangChieu;