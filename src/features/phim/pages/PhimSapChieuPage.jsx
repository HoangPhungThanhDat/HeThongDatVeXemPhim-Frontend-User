// src/features/phim/pages/PhimSapChieuPage.jsx

import React from 'react';
import { usePhimSapChieu } from '../hooks/usePhimSapChieu';
import { useTrailerModal } from '../hooks/useTrailerModal';
import {
  ComingSoonMovieGrid,
  LoadingState,
  ErrorState,
  EmptyState,
  TrailerModal,
} from '../components/PhimSapChieu';

function PhimSapChieuPage() {
  const { movies, loading, error, fetchComingSoonMovies } = usePhimSapChieu();
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
              {error && !loading && <ErrorState error={error} onRetry={fetchComingSoonMovies} />}

              {/* No Data State */}
              {!loading && !error && movies.length === 0 && <EmptyState />}

              {/* Movie List */}
              {!loading && !error && movies.length > 0 && (
                <ComingSoonMovieGrid movies={movies} onTrailerClick={openTrailer} />
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

export default PhimSapChieuPage;
