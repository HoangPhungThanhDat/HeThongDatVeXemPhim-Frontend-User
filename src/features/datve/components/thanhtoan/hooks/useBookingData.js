// src/features/datve/components/thanhtoan/hooks/useBookingData.js

import { useMemo } from 'react';
import { SERVICE_FEE } from '../constants';
import { formatDisplayDate, formatDisplayTime } from '../utils';

export function useBookingData(locationState) {
  const {
    showtimeId,
    showtimeInfo,
    movie,
    selectedSeats = [],
    ticketTotal = 0,
    movieTitle = '—',
    roomName = '—',
    roomType = '2D',
    cinemaName = '',
    showTimeRaw = '',
    showDate = '',
    snacks = [],
    snackTotal = 0,
  } = locationState || {};

  const booking = useMemo(
    () => ({
      movieTitle,
      moviePoster: movie?.PosterUrl || movie?.Poster || '',
      genre: movie?.Genre || 'Đang cập nhật',
      duration: movie?.Duration ? `${movie.Duration} phút` : '—',
      rating: movie?.AgeRating || movie?.Rating || '—',
      showTime: formatDisplayTime(showTimeRaw),
      showDate: formatDisplayDate(showDate),
      cinemaName,
      cinemaAddress: showtimeInfo?.CinemaAddress || '',
      hall: `${roomName} · ${roomType}`,
      seats: selectedSeats.map((s) => `${s.Row}${s.Number}`),
      snacks,
      serviceFee: SERVICE_FEE,
    }),
    [
      movieTitle,
      movie,
      showTimeRaw,
      showDate,
      cinemaName,
      showtimeInfo,
      roomName,
      roomType,
      selectedSeats,
      snacks,
    ],
  );

  const grandTotal = ticketTotal + snackTotal + SERVICE_FEE;

  return {
    showtimeId,
    showtimeInfo,
    movie,
    selectedSeats,
    ticketTotal,
    snackTotal,
    booking,
    grandTotal,
    isValid: showtimeId && selectedSeats.length > 0,
  };
}
