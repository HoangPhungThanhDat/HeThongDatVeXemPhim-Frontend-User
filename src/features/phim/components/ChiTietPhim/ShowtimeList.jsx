// src/features/phim/components/ChiTietPhim/ShowtimeList.jsx

import React from 'react';
import ShowtimeButton from './ShowtimeButton';
import { isGoldRoom } from '../../utils/showtimeUtils';

export default function ShowtimeList({ showtimes, date, movie, onSelectShowtime }) {
  const regular = showtimes?.filter((s) => !isGoldRoom(s.Room)) || [];
  const gold = showtimes?.filter((s) => isGoldRoom(s.Room)) || [];

  if (regular.length === 0 && gold.length === 0) return null;

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        margin: '15px 0',
        borderBottom: '1px dotted #bbb',
        paddingBottom: '10px',
      }}
    >
      {/* Ngày */}
      <div className="col-lg-2 col-md-3 col-sm-12" style={{ padding: 0 }}>
        <span
          style={{
            background: '#444444',
            display: 'inline-flex',
            width: '100%',
            minHeight: '50px',
            alignItems: 'center',
            padding: '0 8px',
            color: 'white',
            fontWeight: '500',
          }}
        >
          {date}
        </span>
      </div>

      {/* Giờ chiếu */}
      <div className="col-lg-10 col-md-9 col-sm-12" style={{ paddingRight: 0 }}>
        {regular.map((slot) => (
          <ShowtimeButton
            key={slot.ShowtimeId}
            slot={slot}
            date={date}
            movie={movie}
            onSelect={onSelectShowtime}
          />
        ))}

        {gold.length > 0 && (
          <>
            <div style={{ clear: 'both' }} />
            <img
              src="https://starlight.vn/Areas/Admin/Content/Fileuploads/images/goldclass.png"
              style={{ width: '150px', height: 'auto', display: 'block', margin: '6px 0' }}
              alt="Gold Class"
            />
            {gold.map((slot) => (
              <ShowtimeButton
                key={slot.ShowtimeId}
                slot={slot}
                date={date}
                movie={movie}
                onSelect={onSelectShowtime}
              />
            ))}
          </>
        )}
        <div style={{ clear: 'both' }} />
      </div>
    </div>
  );
}
