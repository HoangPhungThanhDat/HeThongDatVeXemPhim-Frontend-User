// src/features/phim/components/PhimSapChieu/ComingSoonMovieCard.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getMovieId,
  getMovieSlug,
  getMoviePoster,
  getMovieTitle,
  getMovieDuration,
  getMovieRating,
  getMovieDescription,
  getMovieTrailer,
  getGenreName,
  formatActors,
  formatDirectors,
  formatReleaseDate,
} from '../../utils/movieUtils';

export default function ComingSoonMovieCard({ movie, onTrailerClick }) {
  const navigate = useNavigate();

  const movieId = getMovieId(movie);
  const slug = getMovieSlug(movie);
  const posterUrl = getMoviePoster(movie);
  const title = getMovieTitle(movie);
  const duration = getMovieDuration(movie);
  const rating = getMovieRating(movie);
  const description = getMovieDescription(movie);
  const trailerUrl = getMovieTrailer(movie);
  const genreName = getGenreName(movie.genre || movie.Genre);
  const releaseDate = formatReleaseDate(movie.ReleaseDate || movie.releaseDate);

  const handleGoToDetail = (movie) => {
    const movieId = movie.MovieId || movie.MovieID || movie.movieId || movie.id;
    const slug = movie.Slug || movie.slug || movieId;
    navigate(`/chi-tiet-phim/${slug}`, { state: { movie } });
  };

  const handleTrailerClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (trailerUrl) {
      onTrailerClick(trailerUrl);
    }
  };

  return (
    <div className="col-lg-3 col-md-6 col-sm-12 grid-item" style={{ float: 'left' }}>
      <article className="entry-item">
        {/* ── Mặt trước ── */}
        <div className="front">
          <div className="entry-thumb" style={{ position: 'relative' }}>
            <img
              src={posterUrl || 'https://via.placeholder.com/300x450?text=No+Image'}
              alt={title}
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/300x450?text=No+Image';
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: '10px',
                left: '10px',
                backgroundColor: '#ff9800',
                color: 'white',
                padding: '5px 10px',
                borderRadius: '4px',
                fontSize: '12px',
                fontWeight: 'bold',
              }}
            >
              SẮP CHIẾU
            </div>
          </div>

          <h4
            className="entry-title"
            style={{ cursor: 'pointer' }}
            onClick={() => handleGoToDetail(movie)}
          >
            {title}
          </h4>

          <div className="entry-genre">
            <p>{genreName}</p>
          </div>
        </div>

        {/* ── Mặt sau ── */}
        <div className="back">
          <h3
            className="entry-title"
            style={{ cursor: 'pointer' }}
            onClick={() => handleGoToDetail(movie)}
          >
            {title}
          </h3>

          <span className="pg">{rating}</span>

          <div className="movie-char-info-left">
            <p style={{ fontStyle: 'italic' }}>{genreName}</p>
          </div>

          <div className="entry-time" style={{ marginBottom: '10px' }}>
            <i className="fa fa-calendar" />
            <span style={{ marginLeft: '5px', fontWeight: 'bold', color: '#ff9800' }}>
              Khởi chiếu: {releaseDate}
            </span>
          </div>

          <div className="entry-time">
            <i className="fa fa-clock-o" />
            {duration}
          </div>

          <p
            style={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {description}
          </p>

          <div className="entry-button">
            {trailerUrl && (
              <a
                href="#"
                className="play-video"
                onClick={handleTrailerClick}
                style={{ cursor: 'pointer' }}
              >
                <i className="fa fa-play" /> Trailer
              </a>
            )}

            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleGoToDetail(movie);
              }}
            >
              <i className="fa fa-info-circle" /> Chi tiết
            </a>
          </div>

          <div className="movie-char-info">
            <div className="clearfix" />

            {(movie.directors || movie.Director) && (
              <>
                <div className="movie-char-info-left">
                  <h6>Đạo diễn</h6>
                  <span
                    style={{
                      display: 'block',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {movie.directors ? formatDirectors(movie.directors) : movie.Director}
                  </span>
                </div>
                <div className="clearfix" />
              </>
            )}

            {(movie.actors || movie.Cast) && (
              <>
                <div className="movie-char-info-right">
                  <h6>Diễn viên</h6>
                  <span
                    style={{
                      display: 'block',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {movie.actors ? formatActors(movie.actors, 3) : movie.Cast}
                  </span>
                </div>
                <div className="clearfix" />
              </>
            )}
          </div>
        </div>
      </article>
    </div>
  );
}
