// src/features/phim/hooks/useChiTietPhim.js

import { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import MovieApi from '../../../api/movieApi';
import { groupShowtimesByCity } from '../utils/showtimeUtils';

export function useChiTietPhim(slugOrId) {
  const { state } = useLocation();
  const preloadedMovie = state?.movie || null;

  // --- Query 1: chi tiết phim ---
  const movieQuery = useQuery({
    queryKey: ['phim', 'chi-tiet', slugOrId],
    queryFn: async () => {
      if (!slugOrId) return null;
      const result = await MovieApi.getMovieDetail(slugOrId);
      if (!result.success || !result.data) {
        throw new Error('Không tìm thấy thông tin phim');
      }
      return result.data;
    },
    enabled: !!slugOrId,
    // Nếu đã có movie từ navigate state → dùng luôn làm dữ liệu khởi tạo
    initialData: preloadedMovie ?? undefined,
    // Nếu có initialData, coi như mới trong 30s đầu (không fetch lại ngay)
    initialDataUpdatedAt: preloadedMovie ? Date.now() : 0,
    placeholderData: (prev) => prev,
  });

  // --- Query 2: lịch chiếu ---
  const showtimesQuery = useQuery({
    queryKey: ['phim', 'lich-chieu', slugOrId],
    queryFn: async () => {
      if (!slugOrId) return {};
      const result = await MovieApi.getShowtimes(slugOrId);
      if (!result.success || !result.data) {
        // Không throw — lịch chiếu lỗi không nên chặn cả trang
        return {};
      }
      return groupShowtimesByCity(result.data);
    },
    enabled: !!slugOrId,
    placeholderData: (prev) => prev,
  });

  // --- State UI cho accordion rạp ---
  const [expandedCinemas, setExpandedCinemas] = useState({});

  // Mỗi khi showtimes thay đổi → mở rộng tất cả rạp mặc định
  useEffect(() => {
    const cinemasByCity = showtimesQuery.data;
    if (!cinemasByCity || Object.keys(cinemasByCity).length === 0) return;

    const defaultExpanded = {};
    Object.values(cinemasByCity).forEach((cinemas) => {
      if (Array.isArray(cinemas)) {
        cinemas.forEach((cinema) => {
          if (cinema?.CinemaId) {
            defaultExpanded[cinema.CinemaId] = true;
          }
        });
      }
    });
    setExpandedCinemas(defaultExpanded);
  }, [showtimesQuery.data]);

  const toggleCinema = (cinemaId) => {
    setExpandedCinemas((prev) => ({ ...prev, [cinemaId]: !prev[cinemaId] }));
  };

  const error = useMemo(() => {
    if (!slugOrId) return 'Không tìm thấy thông tin phim';
    return movieQuery.error ? movieQuery.error.message : null;
  }, [slugOrId, movieQuery.error]);

  return {
    movie: movieQuery.data ?? null,
    showtimes: showtimesQuery.data ?? {},
    expandedCinemas,
    loadingMovie: movieQuery.isLoading,
    loadingShow: showtimesQuery.isLoading,
    error,
    toggleCinema,
    // Refetch cả 2 — giữ tên cũ
    refetch: () => {
      movieQuery.refetch();
      showtimesQuery.refetch();
    },
  };
}