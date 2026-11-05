// src/features/phim/components/ChiTietPhim/MovieHeader.jsx

import React from 'react';
import MoviePoster from './MoviePoster';
import MovieInfo from './MovieInfo';
import MovieDescription from './MovieDescription';

export default function MovieHeader({ movie, onTrailerClick }) {
  if (!movie) return null;

  return (
    <section
      style={{
        background: '#e6e7e9',
        maxWidth: '100%',
        borderTop: '1px solid #ccc',
        padding: '30px 0',
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="movie-details-banner">
              <div className="row">
                <MoviePoster posterUrl={movie.PosterUrl} title={movie.Title} />

                <div className="col-lg-9 col-sm-8">
                  <MovieInfo movie={movie} onTrailerClick={onTrailerClick} />
                  <MovieDescription description={movie.Description} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
