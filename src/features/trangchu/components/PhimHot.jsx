// src/features/trangchu/components/PhimHot.jsx
import React, { useState, useEffect } from 'react';
import movieApi from '../../../api/movieApi';
import { useNavigate } from 'react-router-dom';

function PhimHot() {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await movieApi.getLatestMovies(10);
      if (result.success) {
        setMovies(result.data);
      } else {
        setError(result.message || 'Không thể tải phim mới');
      }
    } catch (err) {
      console.error('Lỗi fetch phim mới:', err);
      setError('Đã xảy ra lỗi khi tải phim');
    } finally {
      setLoading(false);
    }
  };

  /* ─── Điều hướng sang trang chi tiết phim ──────────────────── */
  const handleGoToDetail = (movie) => {
    const movieId = movie.MovieId || movie.MovieID || movie.movieId || movie.id;
    const slug = movie.Slug || movie.slug || movieId;
    navigate(`/chi-tiet-phim/${slug}`, { state: { movie } });
  };

  // Format helpers
  const getGenreName = (genre) => {
    if (!genre) return 'N/A';
    if (typeof genre === 'string') return genre;
    return genre.Name || genre.name || 'N/A';
  };

  const formatDirectors = (directors) => {
    if (!Array.isArray(directors) || directors.length === 0) return 'N/A';
    return directors.map((d) => d.Name || d.name).join(', ');
  };

  const formatActors = (actors, max = 5) => {
    if (!Array.isArray(actors) || actors.length === 0) return 'N/A';
    const names = actors.map((a) => a.Name || a.name);
    return names.length > max ? names.slice(0, max).join(', ') + '...' : names.join(', ');
  };

  // Loading
  if (loading) {
    return (
      <div>
        <section className="filmoja-top-movies-area section_30" style={{ background: '#22272b' }}>
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="filmoja-heading">
                  <h2>
                    Phim:<span> Mới</span>
                  </h2>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 text-center" style={{ padding: '50px 0' }}>
                <i
                  className="fa fa-spinner fa-spin"
                  style={{ fontSize: '40px', color: '#f37737' }}
                ></i>
                <p style={{ color: '#999', marginTop: '10px' }}>Đang tải phim mới...</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div>
        <section className="filmoja-top-movies-area section_30" style={{ background: '#22272b' }}>
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="filmoja-heading">
                  <h2>
                    Phim:<span> Mới</span>
                  </h2>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 text-center" style={{ padding: '50px 0' }}>
                <p style={{ color: '#ff6b6b', fontSize: '18px' }}>⚠️ {error}</p>
                <button
                  onClick={fetchMovies}
                  style={{
                    marginTop: '15px',
                    padding: '10px 30px',
                    background: '#f37737',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                  }}
                >
                  Thử lại
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Empty
  if (movies.length === 0) {
    return (
      <div>
        <section className="filmoja-top-movies-area section_30" style={{ background: '#22272b' }}>
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="filmoja-heading">
                  <h2>
                    Phim:<span> Mới</span>
                  </h2>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 text-center" style={{ padding: '50px 0' }}>
                <i className="fa fa-film" style={{ fontSize: '48px', color: '#666' }}></i>
                <p style={{ color: '#999', marginTop: '10px' }}>Chưa có phim mới</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // ─── Render ──────────────────────────────────────────────────
  return (
    <div>
      {/* <!-- Top Movies Area End --> */}
      <section className="filmoja-top-movies-area section_30" style={{ background: '#22272b' }}>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="filmoja-heading">
                <h2>
                  Phim :<span> Mới</span>
                </h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="fw-tabs movies ui-tabs ui-widget ui-widget-content ui-corner-all">
                <div
                  id="Mon"
                  aria-labelledby="ui-id-1"
                  className="ui-tabs-panel ui-widget-content ui-corner-bottom"
                  role="tabpanel"
                  aria-hidden="false"
                  style={{ display: 'block' }}
                >
                  {movies.map((movie) => {
                    const posterUrl = movie.PosterUrl || movie.poster_url;
                    const genre = getGenreName(movie.genre || movie.Genre);
                    const directors = movie.directors || movie.Directors;
                    const actors = movie.actors || movie.Actors;
                    const rated = movie.Rated || movie.rated || movie.AgeRating || 'P';
                    const description = movie.Description || movie.description || 'Chưa có mô tả';
                    const slug = movie.Slug || movie.slug || movie.MovieId;

                    return (
                      <div key={movie.MovieId || movie.id} className="row movie-tabs">
                        <div className="col-md-2 col-sm-12">
                          <a
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              handleGoToDetail(movie);
                            }}
                            title={movie.Title}
                          >
                            <img
                              src={posterUrl || 'https://via.placeholder.com/300x450?text=No+Image'}
                              alt={movie.Title}
                              onError={(e) => {
                                e.target.src = 'https://via.placeholder.com/300x450?text=No+Image';
                              }}
                            />
                          </a>
                        </div>
                        <div className="col-md-10 col-sm-12">
                          <header>
                            <h3
                              className="no-underline"
                              style={{ cursor: 'pointer' }}
                              onClick={() => handleGoToDetail(movie)}
                            >
                              {movie.Title}
                            </h3>
                          </header>
                          <span className="title">{genre}</span>
                          <div className="col-lg-12" style={{ paddingLeft: 0 }}>
                            <p className="time">2D</p>&nbsp;
                            <p className="time red">{rated}</p>
                          </div>
                          <p className="desc">
                            <b>Đạo diễn: </b>
                            {formatDirectors(directors)}
                          </p>
                          <p className="desc">
                            <b>Diễn viên: </b>
                            {formatActors(actors, 5)}
                          </p>
                          <p>
                            <b>Mô tả: </b> {description}
                          </p>
                          <div className="col-lg-12" style={{ paddingLeft: 0 }}>
                            <a
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                handleGoToDetail(movie);
                              }}
                            >
                              <p className="time red">
                                &nbsp;<i className="fa fa-ticket"></i> &nbsp;Đặt vé&nbsp;&nbsp;
                              </p>
                            </a>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default PhimHot;
