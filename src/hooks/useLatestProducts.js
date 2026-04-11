import { useState, useEffect, useMemo } from 'react';
import { ALL_PRODUCTS } from '../data/mock';

/**
 * useLatestProducts
 * -----------------
 * ดึงสินค้าล่าสุด N อันดับจาก mock data
 * ออกแบบให้ง่ายต่อการเปลี่ยนเป็น API call ในอนาคต:
 *   แค่แทน `ALL_PRODUCTS` ด้วย `await fetch('/api/products')` ใน useEffect
 *
 * @param {number} limit - จำนวนสินค้าที่ต้องการ (default: 5)
 * @returns {{ products: Array, loading: boolean, error: string|null }}
 */
export function useLatestProducts(limit = 5) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Simulate async fetch (swap ด้วย real fetch ตรงนี้ได้เลย)
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const products = useMemo(() => {
    try {
      return [...ALL_PRODUCTS]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, limit);
    } catch (err) {
      setError('Failed to load products');
      return [];
    }
  }, [limit]);

  return { products, loading, error };
}
