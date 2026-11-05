// src/features/datve/components/ghe/hooks/useSeatData.js

import { useState, useEffect } from 'react';
import axiosClient from '../../../../../api/axiosClient';

export function useSeatData(showtimeId) {
  const [seatMap, setSeatMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!showtimeId) {
      setError('Không tìm thấy suất chiếu. Vui lòng chọn lại từ trang chi tiết phim.');
      setLoading(false);
      return;
    }

    const id = parseInt(showtimeId);
    if (isNaN(id) || id <= 0) {
      setError('ID suất chiếu không hợp lệ');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    Promise.all([axiosClient.get(`/showtimes/${id}`), axiosClient.get(`/showtimes/${id}/seats`)])
      .then(([showtimeRes, seatsRes]) => {
        const st = showtimeRes?.data?.data ?? showtimeRes?.data ?? showtimeRes;
        if (!st || Object.keys(st).length === 0) {
          throw new Error('Không tìm thấy thông tin suất chiếu');
        }
        const seatData = seatsRes?.data?.data ?? seatsRes?.data ?? seatsRes ?? {};
        setSeatMap(seatData);
      })
      .catch((err) => {
        console.error('❌ Lỗi tải dữ liệu:', err);
        setError(err.message || 'Không thể tải dữ liệu. Vui lòng thử lại.');
      })
      .finally(() => setLoading(false));
  }, [showtimeId]);

  return { seatMap, loading, error };
}
