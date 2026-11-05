// src/features/trangchu/components/TimRap.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import arrowDown from '../../../assets/images/icons/black-ar-down.png';
import cinemaApi from '../../../api/cinemaApi';

function TimRap() {
  const navigate = useNavigate();

  // ─── State ──────────────────────────────────────────────────────
  const [cinemas, setCinemas] = useState([]);
  const [movies, setMovies] = useState([]);
  const [dates, setDates] = useState([]);
  const [showtimes, setShowtimes] = useState([]);

  const [selectedCinema, setSelectedCinema] = useState('');
  const [selectedMovie, setSelectedMovie] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedShowtime, setSelectedShowtime] = useState('');

  const [loadingCinemas, setLoadingCinemas] = useState(false);
  const [loadingMovies, setLoadingMovies] = useState(false);
  const [loadingDates, setLoadingDates] = useState(false);
  const [loadingShowtimes, setLoadingShowtimes] = useState(false);

  // State cho dropdown - mỗi dropdown có state riêng
  const [isCinemaOpen, setIsCinemaOpen] = useState(false);
  const [isMovieOpen, setIsMovieOpen] = useState(false);
  const [isDateOpen, setIsDateOpen] = useState(false);
  const [isShowtimeOpen, setIsShowtimeOpen] = useState(false);

  // ─── Refs ──────────────────────────────────────────────────────
  const cinemaRef = useRef(null);
  const movieRef = useRef(null);
  const dateRef = useRef(null);
  const showtimeRef = useRef(null);

  // ─── Lấy danh sách rạp ────────────────────────────────────────
  useEffect(() => {
    fetchCinemas();
  }, []);

  // ─── Click outside để đóng dropdown ──────────────────────────
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cinemaRef.current && !cinemaRef.current.contains(event.target)) {
        setIsCinemaOpen(false);
      }
      if (movieRef.current && !movieRef.current.contains(event.target)) {
        setIsMovieOpen(false);
      }
      if (dateRef.current && !dateRef.current.contains(event.target)) {
        setIsDateOpen(false);
      }
      if (showtimeRef.current && !showtimeRef.current.contains(event.target)) {
        setIsShowtimeOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchCinemas = async () => {
    try {
      setLoadingCinemas(true);
      const result = await cinemaApi.getActiveCinemas();
      if (result.success) {
        setCinemas(result.data || []);
      }
    } catch (error) {
      console.error('Lỗi lấy danh sách rạp:', error);
    } finally {
      setLoadingCinemas(false);
    }
  };

  // ─── Lấy danh sách phim theo rạp ─────────────────────────────
  const fetchMoviesByCinema = async (cinemaId) => {
    if (!cinemaId) {
      setMovies([]);
      return;
    }

    try {
      setLoadingMovies(true);
      const result = await cinemaApi.getMoviesByCinema(cinemaId);
      console.log('📽️ Movies by cinema:', result.data);

      if (result.success) {
        setMovies(result.data || []);
      } else {
        setMovies([]);
      }
    } catch (error) {
      console.error('Lỗi lấy danh sách phim theo rạp:', error);
      setMovies([]);
    } finally {
      setLoadingMovies(false);
    }
  };

  // ─── Lấy danh sách ngày chiếu ────────────────────────────────
  const fetchDatesByCinemaAndMovie = async (cinemaId, movieId) => {
    if (!cinemaId || !movieId) {
      setDates([]);
      return;
    }

    try {
      setLoadingDates(true);
      const result = await cinemaApi.getDatesByCinemaAndMovie(cinemaId, movieId);
      console.log('📅 Dates:', result.data);

      if (result.success) {
        setDates(result.data || []);
      } else {
        setDates([]);
      }
    } catch (error) {
      console.error('Lỗi lấy danh sách ngày chiếu:', error);
      setDates([]);
    } finally {
      setLoadingDates(false);
    }
  };

  // ─── Lấy danh sách suất chiếu ────────────────────────────────
  const fetchShowtimesByCinemaMovieDate = async (cinemaId, movieId, date) => {
    if (!cinemaId || !movieId || !date) {
      setShowtimes([]);
      return;
    }

    try {
      setLoadingShowtimes(true);
      const result = await cinemaApi.getShowtimesByMovieAndDate(cinemaId, movieId, date);
      console.log('🕐 Showtimes:', result.data);

      if (result.success) {
        setShowtimes(result.data || []);
      } else {
        setShowtimes([]);
      }
    } catch (error) {
      console.error('Lỗi lấy danh sách suất chiếu:', error);
      setShowtimes([]);
    } finally {
      setLoadingShowtimes(false);
    }
  };

  // ─── Xử lý chọn rạp ──────────────────────────────────────────
  const handleCinemaSelect = (cinemaId) => {
    setSelectedCinema(cinemaId);
    setSelectedMovie('');
    setSelectedDate('');
    setSelectedShowtime('');
    setMovies([]);
    setDates([]);
    setShowtimes([]);
    setIsCinemaOpen(false);
    fetchMoviesByCinema(cinemaId);
  };

  // ─── Xử lý chọn phim ──────────────────────────────────────────
  const handleMovieSelect = (movieId) => {
    setSelectedMovie(movieId);
    setSelectedDate('');
    setSelectedShowtime('');
    setDates([]);
    setShowtimes([]);
    setIsMovieOpen(false);
    fetchDatesByCinemaAndMovie(selectedCinema, movieId);
  };

  // ─── Xử lý chọn ngày ──────────────────────────────────────────
  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedShowtime('');
    setShowtimes([]);
    setIsDateOpen(false);
    fetchShowtimesByCinemaMovieDate(selectedCinema, selectedMovie, date);
  };

  // ─── Xử lý chọn suất chiếu ────────────────────────────────────
  const handleShowtimeSelect = (showtime) => {
    setSelectedShowtime(showtime.ShowtimeId);
    setIsShowtimeOpen(false);

    const movie = movies.find((m) => m.MovieId === selectedMovie);
    const cinema = cinemas.find((c) => c.CinemaId === selectedCinema);

    navigate('/chon-ghe', {
      state: {
        showtimeId: showtime.ShowtimeId,
        showtimeInfo: {
          StartTime: showtime.StartTime,
          Date: selectedDate,
          Room: showtime.Room || 'Phòng chiếu',
          RoomType: showtime.RoomType || '2D',
          Price: showtime.Price || 0,
          MovieId: selectedMovie,
          Title: movie?.Title || '',
          PosterUrl: movie?.PosterUrl || '',
          Rated: movie?.Rated || '',
        },
        movie: movie,
        cinemaName: cinema?.Name || '',
        selectedDate: selectedDate,
      },
    });
  };

  // ─── Toggle dropdown ──────────────────────────────────────────
  const toggleCinema = () => {
    setIsCinemaOpen(!isCinemaOpen);
    setIsMovieOpen(false);
    setIsDateOpen(false);
    setIsShowtimeOpen(false);
  };

  const toggleMovie = () => {
    if (!selectedCinema) return;
    setIsMovieOpen(!isMovieOpen);
    setIsCinemaOpen(false);
    setIsDateOpen(false);
    setIsShowtimeOpen(false);
  };

  const toggleDate = () => {
    if (!selectedMovie) return;
    setIsDateOpen(!isDateOpen);
    setIsCinemaOpen(false);
    setIsMovieOpen(false);
    setIsShowtimeOpen(false);
  };

  const toggleShowtime = () => {
    if (!selectedDate) return;
    setIsShowtimeOpen(!isShowtimeOpen);
    setIsCinemaOpen(false);
    setIsMovieOpen(false);
    setIsDateOpen(false);
  };

  // ─── Format hiển thị ──────────────────────────────────────────
  const getCinemaName = (id) => {
    const cinema = cinemas.find((c) => c.CinemaId === id);
    return cinema ? cinema.Name : 'Rạp';
  };

  const getMovieName = (id) => {
    const movie = movies.find((m) => m.MovieId === id);
    return movie ? movie.Title : 'Phim';
  };

  const formatDateDisplay = (dateStr) => {
    if (!dateStr) return 'Ngày xem';
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  const formatTimeDisplay = (timeStr) => {
    if (!timeStr) return '';
    if (timeStr.includes(':')) {
      const parts = timeStr.split(':');
      return `${parts[0]}:${parts[1]}`;
    }
    return timeStr;
  };

  // ─── Render ────────────────────────────────────────────────────
  return (
    <div>
      <div className="booking-form">
        <div className="col-lg-12 flex flex-wrap">
          {/* ── Select Rạp ── */}
          <div
            className="booking-form-item"
            style={{ width: '20%', position: 'relative' }}
            ref={cinemaRef}
          >
            <div
              className="select-box slTheater"
              onClick={toggleCinema}
              style={{ cursor: 'pointer' }}
            >
              <div className="select-box__current uServer" tabIndex={1}>
                <div className="select-box__value">
                  <p className="select-box__input-text" style={{ margin: 0 }}>
                    {selectedCinema ? getCinemaName(selectedCinema) : 'Rạp'}
                  </p>
                </div>
                <img
                  className="select-box__icon"
                  src={arrowDown}
                  alt="Arrow Icon"
                  style={{
                    transform: isCinemaOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s ease',
                  }}
                />
              </div>
            </div>

            {/* Dropdown Rạp */}
            {isCinemaOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  right: 0,
                  zIndex: 9999,
                  backgroundColor: '#36373b',
                  borderRadius: '0 0 8px 8px',
                  maxHeight: '250px',
                  overflowY: 'auto',
                  marginTop: '4px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                  border: '1px solid #555',
                }}
              >
                {loadingCinemas ? (
                  <div style={{ padding: '10px 15px', color: '#fff' }}>Đang tải...</div>
                ) : cinemas.length === 0 ? (
                  <div style={{ padding: '10px 15px', color: '#fff' }}>Không có rạp</div>
                ) : (
                  cinemas.map((cinema) => (
                    <div
                      key={cinema.CinemaId}
                      onClick={() => handleCinemaSelect(cinema.CinemaId)}
                      style={{
                        padding: '10px 15px',
                        cursor: 'pointer',
                        color: '#fff',
                        backgroundColor:
                          selectedCinema === cinema.CinemaId ? '#f37737' : 'transparent',
                        borderBottom: '1px solid #444',
                        transition: 'background-color 0.2s',
                      }}
                      onMouseEnter={(e) => {
                        if (selectedCinema !== cinema.CinemaId) {
                          e.target.style.backgroundColor = '#4a4a50';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (selectedCinema !== cinema.CinemaId) {
                          e.target.style.backgroundColor = 'transparent';
                        }
                      }}
                    >
                      {cinema.Name}
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          {/* ── Select Phim ── */}
          <div
            className="booking-form-item"
            style={{ width: '20%', position: 'relative' }}
            ref={movieRef}
          >
            <div
              className="select-box slFilm"
              onClick={toggleMovie}
              style={{
                cursor: selectedCinema ? 'pointer' : 'not-allowed',
                opacity: selectedCinema ? 1 : 0.6,
              }}
            >
              <div className="select-box__current uFilm" tabIndex={1}>
                <div className="select-box__value">
                  <p className="select-box__input-text" style={{ margin: 0 }}>
                    {selectedMovie ? getMovieName(selectedMovie) : 'Phim'}
                  </p>
                </div>
                <img
                  className="select-box__icon"
                  src={arrowDown}
                  alt="Arrow Icon"
                  style={{
                    opacity: selectedCinema ? 0.6 : 0.3,
                    transform: isMovieOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s ease',
                  }}
                />
              </div>
            </div>

            {/* Dropdown Phim */}
            {isMovieOpen && selectedCinema && (
              <div
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  right: 0,
                  zIndex: 9999,
                  backgroundColor: '#36373b',
                  borderRadius: '0 0 8px 8px',
                  maxHeight: '250px',
                  overflowY: 'auto',
                  marginTop: '4px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                  border: '1px solid #555',
                }}
              >
                {loadingMovies ? (
                  <div style={{ padding: '10px 15px', color: '#fff' }}>Đang tải...</div>
                ) : movies.length === 0 ? (
                  <div style={{ padding: '10px 15px', color: '#fff' }}>Không có phim</div>
                ) : (
                  movies.map((movie) => (
                    <div
                      key={movie.MovieId}
                      onClick={() => handleMovieSelect(movie.MovieId)}
                      style={{
                        padding: '10px 15px',
                        cursor: 'pointer',
                        color: '#fff',
                        backgroundColor:
                          selectedMovie === movie.MovieId ? '#f37737' : 'transparent',
                        borderBottom: '1px solid #444',
                        transition: 'background-color 0.2s',
                      }}
                      onMouseEnter={(e) => {
                        if (selectedMovie !== movie.MovieId) {
                          e.target.style.backgroundColor = '#4a4a50';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (selectedMovie !== movie.MovieId) {
                          e.target.style.backgroundColor = 'transparent';
                        }
                      }}
                    >
                      {movie.Title}
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          {/* ── Select Ngày xem ── */}
          <div
            className="booking-form-item"
            style={{ width: '20%', position: 'relative' }}
            ref={dateRef}
          >
            <div
              className="select-box slDate"
              onClick={toggleDate}
              style={{
                cursor: selectedMovie ? 'pointer' : 'not-allowed',
                opacity: selectedMovie ? 1 : 0.6,
              }}
            >
              <div className="select-box__current uDate" tabIndex={1}>
                <div className="select-box__value">
                  <p className="select-box__input-text" style={{ margin: 0 }}>
                    {selectedDate ? formatDateDisplay(selectedDate) : 'Ngày xem'}
                  </p>
                </div>
                <img
                  className="select-box__icon"
                  src={arrowDown}
                  alt="Arrow Icon"
                  style={{
                    opacity: selectedMovie ? 0.6 : 0.3,
                    transform: isDateOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s ease',
                  }}
                />
              </div>
            </div>

            {/* Dropdown Ngày */}
            {isDateOpen && selectedMovie && (
              <div
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  right: 0,
                  zIndex: 9999,
                  backgroundColor: '#36373b',
                  borderRadius: '0 0 8px 8px',
                  maxHeight: '250px',
                  overflowY: 'auto',
                  marginTop: '4px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                  border: '1px solid #555',
                }}
              >
                {loadingDates ? (
                  <div style={{ padding: '10px 15px', color: '#fff' }}>Đang tải...</div>
                ) : dates.length === 0 ? (
                  <div style={{ padding: '10px 15px', color: '#fff' }}>Không có ngày chiếu</div>
                ) : (
                  dates.map((date, index) => (
                    <div
                      key={index}
                      onClick={() => handleDateSelect(date)}
                      style={{
                        padding: '10px 15px',
                        cursor: 'pointer',
                        color: '#fff',
                        backgroundColor: selectedDate === date ? '#f37737' : 'transparent',
                        borderBottom: '1px solid #444',
                        transition: 'background-color 0.2s',
                      }}
                      onMouseEnter={(e) => {
                        if (selectedDate !== date) {
                          e.target.style.backgroundColor = '#4a4a50';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (selectedDate !== date) {
                          e.target.style.backgroundColor = 'transparent';
                        }
                      }}
                    >
                      {formatDateDisplay(date)}
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          {/* ── Select Suất chiếu ── */}
          <div
            className="booking-form-item"
            style={{ width: '20%', position: 'relative' }}
            ref={showtimeRef}
          >
            <div
              className="select-box slTime"
              onClick={toggleShowtime}
              style={{
                cursor: selectedDate ? 'pointer' : 'not-allowed',
                opacity: selectedDate ? 1 : 0.6,
              }}
            >
              <div className="select-box__current uTime" tabIndex={1}>
                <div className="select-box__value">
                  <p className="select-box__input-text" style={{ margin: 0 }}>
                    {selectedShowtime
                      ? formatTimeDisplay(
                          showtimes.find((s) => s.ShowtimeId === selectedShowtime)?.StartTime || '',
                        )
                      : 'Suất chiếu'}
                  </p>
                </div>
                <img
                  className="select-box__icon"
                  src={arrowDown}
                  alt="Arrow Icon"
                  style={{
                    opacity: selectedDate ? 0.6 : 0.3,
                    transform: isShowtimeOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s ease',
                  }}
                />
              </div>
            </div>

            {/* Dropdown Suất chiếu */}
            {isShowtimeOpen && selectedDate && (
              <div
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  right: 0,
                  zIndex: 9999,
                  backgroundColor: '#36373b',
                  borderRadius: '0 0 8px 8px',
                  maxHeight: '250px',
                  overflowY: 'auto',
                  marginTop: '4px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                  border: '1px solid #555',
                }}
              >
                {loadingShowtimes ? (
                  <div style={{ padding: '10px 15px', color: '#fff' }}>Đang tải...</div>
                ) : showtimes.length === 0 ? (
                  <div style={{ padding: '10px 15px', color: '#fff' }}>Không có suất chiếu</div>
                ) : (
                  showtimes.map((showtime) => (
                    <div
                      key={showtime.ShowtimeId}
                      onClick={() => handleShowtimeSelect(showtime)}
                      style={{
                        padding: '10px 15px',
                        cursor: 'pointer',
                        color: '#fff',
                        backgroundColor:
                          selectedShowtime === showtime.ShowtimeId ? '#f37737' : 'transparent',
                        borderBottom: '1px solid #444',
                        transition: 'background-color 0.2s',
                      }}
                      onMouseEnter={(e) => {
                        if (selectedShowtime !== showtime.ShowtimeId) {
                          e.target.style.backgroundColor = '#4a4a50';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (selectedShowtime !== showtime.ShowtimeId) {
                          e.target.style.backgroundColor = 'transparent';
                        }
                      }}
                    >
                      {formatTimeDisplay(showtime.StartTime)}
                      {showtime.Price && ` - ${showtime.Price.toLocaleString('vi-VN')}đ`}
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TimRap;
