// src/features/datve/components/combo/hooks/useCart.js

import { useState, useEffect, useRef } from 'react';
import { getCartKey } from '../utils';

export function useCart(products) {
  const [cart, setCart] = useState({});
  const [selectedSize, setSelectedSize] = useState({});
  const [bursts, setBursts] = useState([]);
  const burstId = useRef(0);

  // Initialize selectedSize
  useEffect(() => {
    if (products.length > 0) {
      setSelectedSize(Object.fromEntries(products.map((p) => [p.id, 0])));
    }
  }, [products]);

  const totalItems = Object.values(cart).reduce((s, v) => s + v, 0);

  const totalPrice = Object.entries(cart).reduce((s, [key, qty]) => {
    const [pid, sidx] = key.split('_').map(Number);
    const p = products.find((x) => x.id === pid);
    return s + (p ? p.sizes[sidx].price * qty : 0);
  }, 0);

  const cartList = Object.entries(cart)
    .filter(([, qty]) => qty > 0)
    .map(([key, qty]) => {
      const [pid, sidx] = key.split('_').map(Number);
      const p = products.find((x) => x.id === pid);
      if (!p) return null;
      return {
        ...p,
        sizeIdx: sidx,
        sizeLabel: p.sizes[sidx].label,
        unitPrice: p.sizes[sidx].price,
        qty,
        key,
      };
    })
    .filter(Boolean);

  const add = (productId, sizeIdx, e) => {
    e?.stopPropagation();
    const key = getCartKey(productId, sizeIdx);
    setCart((c) => ({ ...c, [key]: (c[key] || 0) + 1 }));

    if (e) {
      const rect = e.currentTarget.getBoundingClientRect();
      const bid = ++burstId.current;
      const product = products.find((p) => p.id === productId);
      setBursts((b) => [
        ...b,
        {
          id: bid,
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
          color: product?.color || '#c9a84c',
          pid: bid,
        },
      ]);
      setTimeout(() => setBursts((b) => b.filter((x) => x.id !== bid)), 900);
    }
  };

  const sub = (key, e) => {
    e?.stopPropagation();
    setCart((c) => {
      const n = { ...c };
      if (!n[key] || n[key] <= 1) delete n[key];
      else n[key]--;
      return n;
    });
  };

  const pickSize = (productId, sizeIdx, e) => {
    e?.stopPropagation();
    setSelectedSize((s) => ({ ...s, [productId]: sizeIdx }));
  };

  return {
    cart,
    selectedSize,
    bursts,
    totalItems,
    totalPrice,
    cartList,
    add,
    sub,
    pickSize,
    setBursts,
  };
}
