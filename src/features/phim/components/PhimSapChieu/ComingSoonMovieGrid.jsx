// src/features/phim/components/PhimSapChieu/ComingSoonMovieGrid.jsx

import React from 'react';
import ComingSoonMovieCard from './ComingSoonMovieCard';

export default function ComingSoonMovieGrid({ movies, onTrailerClick }) {
  return (
    <>
      {movies.map((movie) => (
        <ComingSoonMovieCard
          key={movie.MovieId || movie.id}
          movie={movie}
          onTrailerClick={onTrailerClick}
        />
      ))}
      <div className="clearfix" />
    </>
  );
}
