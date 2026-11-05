// src/features/phim/components/PhimDangChieu/MovieCard.jsx

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
} from '../../utils/movieUtils';

export default function MovieCard({ movie, onTrailerClick }) {
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

  const handleGoToDetail = (e) => {
    e.preventDefault();
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
        <div className="front">
          <div className="entry-thumb">
            <img
              src={posterUrl || 'https://via.placeholder.com/300x450?text=No+Image'}
              alt={title}
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/300x450?text=No+Image';
              }}
            />
          </div>
          <a href={`/lich-chieu/${slug}`}>
            <h4 className="entry-title">{title}</h4>
          </a>
          <div className="entry-genre">
            <p>{genreName}</p>
          </div>
        </div>

        <div className="back">
          <h3 className="entry-title">
            <a href={`/lich-chieu/${slug}`}>{title}</a>
          </h3>
          <span className="pg">{rating}</span>

          <div className="movie-char-info-left">
            <p style={{ fontStyle: 'italic' }}>{genreName}</p>
          </div>

          <div className="entry-time">
            <i className="fa fa-clock-o"></i>
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
                <i aria-hidden="true" className="fa fa-play"></i>Trailer
              </a>
            )}
            <a href="#" onClick={handleGoToDetail}>
              <i aria-hidden="true" className="fa fa-ticket"></i>Đặt vé
            </a>
          </div>

          <div className="movie-char-info">
            <div className="clearfix"></div>

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
                <div className="clearfix"></div>
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
                <div className="clearfix"></div>
              </>
            )}
          </div>
        </div>
      </article>
    </div>
  );
}
