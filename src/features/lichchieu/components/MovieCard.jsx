import React from 'react';
import { useNavigate } from 'react-router-dom';
import { groupShowtimesByRoom } from '../utils/showtimeUtils';
import { isShowtimePast } from '../utils/dateUtils';
import ShowtimeButton from './ShowtimeButton';
import ShowtimePast from './ShowtimePast';

export default function MovieCard({ movie, selectedDate, cinemaInfo }) {
  const navigate = useNavigate();
  const showtimeList = Array.isArray(movie.showtimes) ? movie.showtimes : [];
  const roomGroups = groupShowtimesByRoom(showtimeList);

  const handleSelectShowtime = (e, slot) => {
    e.preventDefault();

    if (!slot || !slot.ShowtimeId) {
      console.error('Suất chiếu không hợp lệ');
      return;
    }

    if (!movie || !movie.MovieId) {
      console.error('Thông tin phim không hợp lệ');
      return;
    }

    // Chuyển sang trang chọn ghế với state
    navigate('/chon-ghe', {
      state: {
        showtimeId: slot.ShowtimeId,
        showtimeInfo: {
          StartTime: slot.StartTime,
          Date: selectedDate,
          Room: slot.Room || 'Phòng chiếu',
          RoomType: slot.RoomType || '2D',
          Price: slot.Price || 0,
          MovieId: movie.MovieId,
          Title: movie.Title,
          PosterUrl: movie.PosterUrl,
          Rated: movie.Rated || movie.AgeRating || 'P',
        },
        movie: movie,
        selectedDate: selectedDate,
        cinemaName: cinemaInfo?.Name || '',
        cinemaAddress: cinemaInfo?.Address || '',
      },
    });
  };

  return (
    <div className="single-movie-list" key={movie.MovieId}>
      {/* Poster phim */}
      <div className="single-movie-list-left col-lg-3 col-md-4 col-sm-12">
        <a href={`/phim/${movie.MovieId}`}>
          <img
            src={movie.PosterUrl}
            alt={movie.Title}
            onError={(e) => {
              e.target.src = '/assets/images/default-poster.jpg';
            }}
          />
        </a>
      </div>

      {/* Thông tin + suất chiếu */}
      <div className="single-movie-list-right col-lg-9 col-md-8 col-sm-12">
        <h3>
          <a href={`/phim/${movie.MovieId}`}>{movie.Title}</a>
        </h3>
        <ul>
          <li className="rating">2D</li>
        </ul>

        {/* Thời lượng */}
        <p className="list-genre">Thời lượng: {movie.Duration} phút</p>

        {/* Đạo diễn */}
        {Array.isArray(movie.Directors) && movie.Directors.length > 0 && (
          <p className="list-genre">
            <strong>Đạo diễn: </strong>
            {movie.Directors.join(', ')}
          </p>
        )}

        {/* Diễn viên */}
        {Array.isArray(movie.Actors) && movie.Actors.length > 0 && (
          <p className="list-genre">
            <strong>Diễn viên: </strong>
            {movie.Actors.join(', ')}
          </p>
        )}

        {/* Mô tả phim - giới hạn 2 dòng */}
        {movie.Description && (
          <p
            className="list-genre"
            style={{
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {movie.Description}
          </p>
        )}

        <div className="col-md-12 col-sm-12" style={{ padding: 0 }}>
          <hr className="space-1" />

          {Object.entries(roomGroups).map(([key, sts]) => {
            const [roomName, roomType] = key.split('||');
            return (
              <div key={key} style={{ marginBottom: '12px' }}>
                {/* Label phòng */}
                <p
                  style={{
                    color: '#555',
                    fontWeight: 600,
                    marginBottom: '8px',
                    fontSize: '13px',
                  }}
                >
                  {roomName}{' '}
                  <span
                    style={{
                      color: '#f37737',
                      fontWeight: 400,
                    }}
                  >
                    ({roomType})
                  </span>
                </p>

                {/* Các suất chiếu */}
                {sts.map((st) => {
                  const past = isShowtimePast(selectedDate, st.StartTime);
                  return past ? (
                    <ShowtimePast key={st.ShowtimeId} showtime={st} />
                  ) : (
                    <ShowtimeButton
                      key={st.ShowtimeId}
                      showtime={st}
                      selectedDate={selectedDate}
                      onSelect={handleSelectShowtime}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>

      <div className="top-action"></div>
    </div>
  );
}
