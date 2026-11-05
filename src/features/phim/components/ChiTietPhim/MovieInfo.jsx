// src/features/phim/components/ChiTietPhim/MovieInfo.jsx

import React from 'react';
import { formatDirectors, formatActors, getGenreName } from '../../utils/movieUtils';
import { formatDuration, formatDate } from '../../utils/showtimeUtils';

export default function MovieInfo({ movie, onTrailerClick }) {
  if (!movie) return null;

  // Kiểm tra trailerUrl hợp lệ
  const hasValidTrailer =
    movie.TrailerUrl && typeof movie.TrailerUrl === 'string' && movie.TrailerUrl.trim() !== '';

  const handleTrailerClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    console.log('🎬 Movie Trailer Data:', {
      TrailerUrl: movie.TrailerUrl,
      type: typeof movie.TrailerUrl,
      hasValid: hasValidTrailer,
    });

    if (hasValidTrailer) {
      onTrailerClick(movie.TrailerUrl);
    } else {
      alert('Không có trailer cho phim này.');
    }
  };

  return (
    <div className="details-banner-info">
      <h3 style={{ color: '#22272b' }}>{movie.Title}</h3>

      {movie.Rated && (
        <p
          style={{
            background: '#f37737',
            display: 'inline-block',
            width: '35px',
            height: '35px',
            textAlign: 'center',
            lineHeight: '35px',
            borderRadius: '2px',
            color: 'white',
            fontWeight: 'bold',
            letterSpacing: '2px',
            boxShadow: '1px 1px 4px 0px #4e4e54',
            margin: '6px 0',
          }}
        >
          {movie.Rated}
        </p>
      )}

      <p style={{ color: '#22272b' }} className="details-genre">
        {getGenreName(movie.genre)} - <span>2D</span>
      </p>

      {hasValidTrailer && (
        <a
          href="#"
          className="filmoja-btn tablet-action"
          style={{ marginBottom: '12px', display: 'inline-block' }}
          onClick={handleTrailerClick}
        >
          <i className="fa fa-play" /> trailer
        </a>
      )}

      <ul style={{ margin: '12px 0', paddingLeft: 0, listStyle: 'none' }}>
        <li>
          <b>Đạo diễn</b> : {formatDirectors(movie.directors)}
        </li>
        <li>
          <b>Ngày chiếu</b> : {formatDate(movie.ReleaseDate)}
        </li>
        <li>
          <b>Diễn viên</b> : {formatActors(movie.actors)}
        </li>
        <li>
          <b>Thời lượng</b> : {formatDuration(movie.Duration)}
        </li>
      </ul>

      <div className="fb-share-button">
        <a
          target="_blank"
          rel="noreferrer"
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
        >
          Chia sẻ
        </a>
      </div>
    </div>
  );
}
