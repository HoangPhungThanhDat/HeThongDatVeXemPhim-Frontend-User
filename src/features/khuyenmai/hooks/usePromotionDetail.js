import { useState, useEffect } from 'react';
import promotionApi from '../../../api/promotionApi';

export function usePromotionDetail(id) {
  const [promotion, setPromotion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPromotionDetail = async () => {
      if (!id) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        console.log('🔍 Đang gọi API với ID:', id);
        const response = await promotionApi.getById(id);
        console.log('✅ Response từ API:', response);
        const data = response.data || response;
        console.log('📦 Data sau khi xử lý:', data);
        setPromotion(data);
        setError(null);
      } catch (err) {
        console.error('❌ Lỗi khi tải chi tiết khuyến mãi:', err);
        console.error('❌ Chi tiết lỗi:', err.response);
        setError('Không thể tải thông tin khuyến mãi');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPromotionDetail();
    }
  }, [id]);

  return { promotion, loading, error };
}
