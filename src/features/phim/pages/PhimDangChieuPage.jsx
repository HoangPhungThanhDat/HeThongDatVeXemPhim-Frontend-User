// src/features/phim/pages/PhimDangChieuPage.jsx

import React from 'react';
import { usePhimDangChieu } from '../hooks/usePhimDangChieu';
import { useTrailerModal } from '../hooks/useTrailerModal';
import {
  MovieGrid,
  LoadingState,
  ErrorState,
  EmptyState,
  TrailerModal,
} from '../components/PhimDangChieu';

function PhimDangChieuPage() {
  const { movies, loading, error, fetchNowShowingMovies } = usePhimDangChieu();
  const { showModal, selectedTrailer, openTrailer, closeTrailer } = useTrailerModal();

  return (
    <div>
      <section
        className="filmoja-login-area section_70 bg-main"
        style={{
          background: '#e6e7e9',
          maxWidth: '100%',
          borderTop: '1px solid #ccc',
        }}
      >
        <div className="container">
          <div className="movie-grid-box list-film">
            <div className="amy-mv-grid layout3" style={{ textAlign: 'center' }}>
              {/* Loading State */}
              {loading && <LoadingState />}

              {/* Error State */}
              {error && !loading && <ErrorState error={error} onRetry={fetchNowShowingMovies} />}

              {/* No Data State */}
              {!loading && !error && movies.length === 0 && <EmptyState />}

              {/* Movie List */}
              {!loading && !error && movies.length > 0 && (
                <MovieGrid movies={movies} onTrailerClick={openTrailer} />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Trailer Modal */}
      <TrailerModal show={showModal} trailerUrl={selectedTrailer} onClose={closeTrailer} />
    </div>
  );
}

export default PhimDangChieuPage;
