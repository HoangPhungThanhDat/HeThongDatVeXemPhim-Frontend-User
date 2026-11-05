// src/features/phim/hooks/usePhimSapChieu.js

import { useQuery } from '@tanstack/react-query';
import MovieApi from '../../../api/movieApi';

export function usePhimSapChieu() {
  const query = useQuery({
    queryKey: ['phim', 'sap-chieu'],
    queryFn: async () => {
      const result = await MovieApi.getComingSoonMovies(20);
      console.log('📥 Coming Soon Movies:', result.data);
      if (!result.success) {
        throw new Error(result.message || 'Không thể tải danh sách phim.');
      }
      return result.data;
    },
    placeholderData: (prev) => prev,
  });

  return {
    movies: query.data ?? [],
    loading: query.isLoading,
    error: query.error ? query.error.message : null,
    fetchComingSoonMovies: query.refetch,
    isFetching: query.isFetching,
  };
}