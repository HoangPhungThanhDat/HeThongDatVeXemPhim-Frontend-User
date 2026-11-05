// src/features/phim/utils/movieUtils.js

export const getMovieId = (movie) => {
  return movie.MovieId || movie.MovieID || movie.movieId || movie.id;
};

export const getMovieSlug = (movie) => {
  return movie.Slug || movie.slug || getMovieId(movie);
};

export const getMoviePoster = (movie) => {
  return movie.PosterUrl || movie.PosterURL || movie.posterUrl || movie.ImageUrl;
};

export const getMovieTitle = (movie) => {
  return movie.Title || movie.title || 'Không có tiêu đề';
};

export const getMovieDuration = (movie) => {
  return movie.Duration ? `${movie.Duration} phút` : 'Chưa cập nhật';
};

export const getMovieRating = (movie) => {
  return movie.Rated || movie.AgeRating || 'P';
};

export const getMovieDescription = (movie) => {
  return movie.Description || 'Chưa có mô tả';
};

export const getMovieTrailer = (movie) => {
  return movie.TrailerUrl || movie.TrailerURL;
};

export const getGenreName = (genre) => {
  if (!genre) return 'Chưa phân loại';
  if (typeof genre === 'string') return genre;
  if (genre.Name) return genre.Name;
  if (genre.name) return genre.name;
  return 'Chưa phân loại';
};

export const formatActors = (actors, maxItems = 3) => {
  if (!actors || !Array.isArray(actors) || actors.length === 0) {
    return 'Chưa cập nhật';
  }

  const actorNames = actors.map((actor) => actor.Name || actor.name);

  if (actorNames.length > maxItems) {
    return actorNames.slice(0, maxItems).join(', ') + '...';
  }

  return actorNames.join(', ');
};

export const formatDirectors = (directors) => {
  if (!directors || !Array.isArray(directors) || directors.length === 0) {
    return 'Chưa cập nhật';
  }

  return directors.map((director) => director.Name || director.name).join(', ');
};

export const formatReleaseDate = (dateString) => {
  if (!dateString) return 'Chưa xác định';
  try {
    const date = new Date(dateString);
    if (isNaN(date)) return dateString;
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  } catch {
    return 'Chưa xác định';
  }
};
