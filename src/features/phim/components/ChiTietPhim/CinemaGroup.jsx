// src/features/phim/components/ChiTietPhim/CinemaGroup.jsx

import React from 'react';
import CinemaHeader from './CinemaHeader';
import ShowtimeList from './ShowtimeList';

export default function CinemaGroup({ cinema, isExpanded, onToggle, movie, onSelectShowtime }) {
  return (
    <div key={cinema.CinemaId} style={{ marginBottom: '15px' }}>
      <CinemaHeader cinema={cinema} isExpanded={isExpanded} onToggle={onToggle} />

      <div
        style={{
          height: isExpanded ? 'auto' : '0px',
          overflow: 'hidden',
          transition: 'height 0.3s ease',
        }}
      >
        {cinema.Movies?.map((movieEntry) =>
          movieEntry.Movies?.map((day) => (
            <ShowtimeList
              key={day.Date}
              showtimes={day.Showtimes}
              date={day.Date}
              movie={movie}
              onSelectShowtime={onSelectShowtime}
            />
          )),
        )}
      </div>
    </div>
  );
}
