// src/features/phim/components/PhimDangChieu/MovieGrid.jsx

import React from 'react';
import MovieCard from './MovieCard';

export default function MovieGrid({ movies, onTrailerClick }) {
  return (
    <>
      {movies.map((movie) => (
        <MovieCard key={movie.MovieId || movie.id} movie={movie} onTrailerClick={onTrailerClick} />
      ))}
      <div className="clearfix"></div>
    </>
  );
}
