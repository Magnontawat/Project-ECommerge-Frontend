import React, { useState } from 'react';
import { LayoutGrid, List } from 'lucide-react';
import ProductCard from './ProductCard';
import { ALL_PRODUCTS } from '../data/mock';

export default function ProductsGridSection() {
  const getLoadCount = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 1024) return 24; // 6 cols * 4 rows
      if (window.innerWidth >= 768) return 16;  // 4 cols * 4 rows
    }
    return 8; // 2 cols * 4 rows (Mobile)
  };

  const [visibleProducts, setVisibleProducts] = useState(getLoadCount);

  const loadMoreProducts = () => {
    setVisibleProducts(prev => prev + getLoadCount());
  };

  return (
    <section className="pt-4 sm:pt-8">
      <div className="flex justify-between items-end mb-6 sm:mb-8">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#0F172A] tracking-tight mb-1 sm:mb-2">Products</h2>
          <p className="text-sm text-gray-500 font-medium hidden sm:block">Explore our complete collection.</p>
        </div>
      </div>

      {/* Responsive Grid: gap-3 on mobile to make cards smaller, gap-6 on desktop */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-6">
        {ALL_PRODUCTS.slice(0, visibleProducts).map(item => (
          <ProductCard key={item.id} item={item} showPlusButton={true} />
        ))}
      </div>

      {visibleProducts < ALL_PRODUCTS.length && (
        <div className="flex justify-center mt-10">
          <button
            onClick={loadMoreProducts}
            className="px-8 py-3 rounded-full border border-gray-300 text-sm font-bold text-gray-700 hover:border-[#1D4ED8] hover:text-[#1D4ED8] transition-colors"
          >
            Load More
          </button>
        </div>
      )}
    </section>
  );
}
