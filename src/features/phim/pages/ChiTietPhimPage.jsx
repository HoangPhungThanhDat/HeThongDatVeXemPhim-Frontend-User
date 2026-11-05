// src/features/phim/pages/ChiTietPhimPage.jsx

import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  MovieHeader,
  ShowtimeSection,
  LoadingState,
  ErrorState,
  TrailerModal,
} from '../components/ChiTietPhim';
import { useChiTietPhim } from '../hooks/useChiTietPhim';
import { useTrailerModal } from '../hooks/useTrailerModal';

function ChiTietPhimPage() {
  const { slugOrId } = useParams();
  const navigate = useNavigate();

  const { movie, showtimes, expandedCinemas, loadingMovie, loadingShow, error, toggleCinema } =
    useChiTietPhim(slugOrId);

  const { showModal, selectedTrailer, openTrailer, closeTrailer } = useTrailerModal();

  const handleSelectShowtime = (slot, date) => {
    if (!slot || !slot.ShowtimeId) {
      console.error('Suất chiếu không hợp lệ');
      return;
    }

    if (!movie || !movie.MovieId) {
      console.error('Thông tin phim không hợp lệ');
      return;
    }

    navigate('/chon-ghe', {
      state: {
        showtimeId: slot.ShowtimeId,
        showtimeInfo: {
          StartTime: slot.StartTime,
          Date: date,
          Room: slot.Room || 'Phòng chiếu',
          RoomType: slot.RoomType || '2D',
          Price: slot.Price || 0,
          MovieId: movie.MovieId,
          Title: movie.Title,
          PosterUrl: movie.PosterUrl,
          Rated: movie.Rated,
        },
        movie: movie,
        selectedDate: date,
      },
    });
  };

  if (loadingMovie) {
    return <LoadingState />;
  }

  if (error || !movie) {
    return <ErrorState error={error} onBack={() => navigate(-1)} />;
  }

  return (
    <>
      {/* Movie Header */}
      <MovieHeader movie={movie} onTrailerClick={openTrailer} />

      {/* Showtime Section */}
      <section
        style={{
          background: '#e6e7e9',
          maxWidth: '100%',
          padding: '30px 0',
          borderTop: '1px solid #ccc',
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h4
                style={{
                  marginBottom: '15px',
                  textTransform: 'uppercase',
                  fontWeight: 500,
                  color: '#444444',
                  textDecoration: 'underline',
                  paddingLeft: '30px',
                  lineHeight: '3',
                }}
              >
                Lịch chiếu
              </h4>

              <ShowtimeSection
                showtimes={showtimes}
                expandedCinemas={expandedCinemas}
                onToggleCinema={toggleCinema}
                movie={movie}
                onSelectShowtime={handleSelectShowtime}
                loading={loadingShow}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Trailer Modal */}
      <TrailerModal show={showModal} trailerUrl={selectedTrailer} onClose={closeTrailer} />
    </>
  );
}

export default ChiTietPhimPage;
