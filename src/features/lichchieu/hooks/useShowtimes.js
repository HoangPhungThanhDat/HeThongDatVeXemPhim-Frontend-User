import { useState, useEffect } from 'react';
import axiosClient from '../../../api/axiosClient';

export function useShowtimes(cinemaId, selectedDate) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!cinemaId) {
      setLoading(false);
      return;
    }

    const fetchShowtimes = async () => {
      setLoading(true);
      setMovies([]);
      try {
        const raw = await axiosClient.get(`/cinemas/${cinemaId}/showtimes?date=${selectedDate}`);

        console.log('Backend trả về:', raw);

        let movieList = [];

        if (raw && Array.isArray(raw.movies)) {
          movieList = raw.movies;
        } else if (raw && Array.isArray(raw.data?.movies)) {
          movieList = raw.data.movies;
        } else if (raw && Array.isArray(raw.data)) {
          movieList = raw.data;
        } else if (Array.isArray(raw)) {
          movieList = raw;
        }

        setMovies(movieList);
      } catch (err) {
        console.error('Lỗi lấy lịch chiếu:', err);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchShowtimes();
  }, [cinemaId, selectedDate]);

  return { movies, loading };
}
