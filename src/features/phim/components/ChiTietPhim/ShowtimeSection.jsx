// src/features/phim/components/ChiTietPhim/ShowtimeSection.jsx

import React from 'react';
import CinemaGroup from './CinemaGroup';

export default function ShowtimeSection({
  showtimes,
  expandedCinemas,
  onToggleCinema,
  movie,
  onSelectShowtime,
  loading,
}) {
  if (loading) {
    return <p style={{ padding: '20px', color: '#666' }}>Đang tải lịch chiếu...</p>;
  }

  if (Object.keys(showtimes).length === 0) {
    return <p style={{ padding: '20px', color: '#666' }}>Chưa có lịch chiếu</p>;
  }

  return (
    <>
      {Object.entries(showtimes).map(([city, cinemas]) => (
        <div key={city} style={{ marginBottom: '30px' }}>
          <h5
            style={{
              color: '#555',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              fontSize: '13px',
              marginBottom: '10px',
              paddingLeft: '4px',
              borderLeft: '3px solid #f37737',
              paddingLeft: '10px',
            }}
          >
            {city}
          </h5>

          {cinemas?.map((cinema) => (
            <CinemaGroup
              key={cinema.CinemaId}
              cinema={cinema}
              isExpanded={expandedCinemas[cinema.CinemaId]}
              onToggle={() => onToggleCinema(cinema.CinemaId)}
              movie={movie}
              onSelectShowtime={onSelectShowtime}
            />
          ))}
        </div>
      ))}
    </>
  );
}
