import React from 'react';
import MovieCard from './MovieCard';

export default function MovieList({ movies, selectedDate, cinemaInfo }) {
  return (
    <div className="tab-movies movie-list-box">
      {movies.map((movie) => (
        <MovieCard
          key={movie.MovieId}
          movie={movie}
          selectedDate={selectedDate}
          cinemaInfo={cinemaInfo}
        />
      ))}
    </div>
  );
}
