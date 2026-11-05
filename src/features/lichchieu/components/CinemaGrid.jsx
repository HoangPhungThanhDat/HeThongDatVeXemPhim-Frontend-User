import React from 'react';
import CinemaCard from './CinemaCard';

export default function CinemaGrid({ cinemas }) {
  return (
    <div className="blog-page-list row">
      {cinemas.map((cinema) => (
        <CinemaCard key={cinema.CinemaId} cinema={cinema} />
      ))}
    </div>
  );
}
