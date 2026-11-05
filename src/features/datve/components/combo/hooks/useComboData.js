// src/features/datve/components/combo/hooks/useComboData.js

import { useState, useEffect } from 'react';
import FoodAndDrinkApi from '../../../../../api/foodAndDrinkApi';
import { mapItem } from '../utils';

export function useComboData() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    FoodAndDrinkApi.getAll()
      .then((res) => {
        const raw = res.data?.data ?? res.data ?? [];
        const active = raw.filter((item) => item.Status === 'Active' && item.IsAvailable);
        const mapped = active.map(mapItem);
        setProducts(mapped);
      })
      .catch((err) => {
        console.error('Lỗi load combo:', err);
        setError('Không thể tải danh sách sản phẩm.');
      })
      .finally(() => setLoading(false));
  }, []);

  return { products, loading, error };
}
