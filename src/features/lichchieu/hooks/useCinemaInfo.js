import { useState, useEffect } from 'react';
import cinemaApi from '../../../api/cinemaApi';

export function useCinemaInfo(cinemaId) {
  const [cinemaInfo, setCinemaInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!cinemaId) {
      setLoading(false);
      return;
    }

    const fetchCinema = async () => {
      setLoading(true);
      try {
        const result = await cinemaApi.getActiveCinemas();
        if (result && result.success && Array.isArray(result.data)) {
          const found = result.data.find((c) => String(c.CinemaId) === String(cinemaId));
          setCinemaInfo(found || null);
        }
      } catch (err) {
        console.error('Lỗi lấy thông tin rạp:', err);
        setCinemaInfo(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCinema();
  }, [cinemaId]);

  return { cinemaInfo, loading };
}
