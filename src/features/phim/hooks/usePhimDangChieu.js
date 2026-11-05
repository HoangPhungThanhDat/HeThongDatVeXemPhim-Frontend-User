// src/features/phim/hooks/usePhimDangChieu.js

import { useQuery } from '@tanstack/react-query';
import MovieApi from '../../../api/movieApi';

export function usePhimDangChieu() {
  const query = useQuery({
    queryKey: ['phim', 'dang-chieu'],
    queryFn: async () => {
      const result = await MovieApi.getNowShowing();
      console.log('📥 Movies data:', result.data);
      if (!result.success) {
        throw new Error(result.message || 'Không thể tải danh sách phim.');
      }
      return result.data;
    },
    // Giữ dữ liệu cũ khi refetch để tránh màn hình trắng
    placeholderData: (prev) => prev,
  });

  return {
    movies: query.data ?? [],
    loading: query.isLoading,
    error: query.error ? query.error.message : null,
    // Giữ tên cũ để page không phải sửa — refetch toàn bộ
    fetchNowShowingMovies: query.refetch,
    // Bonus: trạng thái fetch nền (dùng nếu muốn hiện spinner nhỏ)
    isFetching: query.isFetching,
  };
}