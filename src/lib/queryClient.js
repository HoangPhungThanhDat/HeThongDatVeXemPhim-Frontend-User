// src/lib/queryClient.js
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Dữ liệu được coi là "cũ" sau 1 phút → tự động refetch khi focus lại tab
      staleTime: 60 * 1000,

      // Giữ cache 5 phút sau khi không còn component nào dùng
      gcTime: 5 * 60 * 1000,

      // Tự động refetch khi cửa sổ được focus lại (ĐÂY LÀ ĐIỀU BẠN CẦN)
      refetchOnWindowFocus: true,

      // Refetch khi mất mạng rồi có lại
      refetchOnReconnect: true,

      // Không refetch khi component mount lại nếu dữ liệu còn "tươi"
      refetchOnMount: true,

      // Thử lại 1 lần nếu lỗi
      retry: 1,

      // Không hiện loading khi đã có dữ liệu cũ (mượt hơn)
      placeholderData: (previousData) => previousData,
    },
  },
});