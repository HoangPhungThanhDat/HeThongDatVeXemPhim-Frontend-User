import { useState, useEffect } from 'react';
import CinemaApi from '../../../api/cinemaApi';

export function useCinemas() {
  const [cinemas, setCinemas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActiveCinemas = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await CinemaApi.getActiveCinemas();

        if (result.success) {
          setCinemas(result.data);
        } else {
          setError(result.message || 'Không thể tải danh sách rạp');
          console.error('Lỗi:', result.message);
        }
      } catch (error) {
        console.error('Lỗi khi tải danh sách rạp:', error);
        setError('Không thể tải danh sách rạp');
      } finally {
        setLoading(false);
      }
    };

    fetchActiveCinemas();
  }, []);

  return { cinemas, loading, error };
}
