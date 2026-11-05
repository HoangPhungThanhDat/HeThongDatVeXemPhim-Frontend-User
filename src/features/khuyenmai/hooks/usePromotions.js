import { useState, useEffect } from 'react';
import promotionApi from '../../../api/promotionApi';
import { formatPromotionData } from '../utils';

export function usePromotions() {
  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        setLoading(true);
        const response = await promotionApi.getAll();
        const data = response.data || response;
        setPromotions(formatPromotionData(data));
        setError(null);
      } catch (err) {
        console.error('Lỗi khi tải khuyến mãi:', err);
        setError('Không thể tải danh sách khuyến mãi');
      } finally {
        setLoading(false);
      }
    };

    fetchPromotions();
  }, []);

  return { promotions, loading, error };
}
