import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from './ProductCard';
import { useHorizontalScroll } from '../hooks/useHorizontalScroll';
import { SUGGESTED_PRODUCTS } from '../data/mock';

export default function SuggestionSection({ title = "Suggestion", subtitle = "Curated picks just for you." }) {
  const { scrollRef, scrollLeft, scrollRight } = useHorizontalScroll(284);

  return (
    <section>
      <div className="flex justify-between items-end border-b border-gray-200 pb-4 mb-6 sm:mb-8">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#0F172A] tracking-tight mb-1 sm:mb-2">{title}</h2>
          <p className="text-sm text-gray-500 font-medium hidden sm:block">{subtitle}</p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={scrollLeft}
            className="p-2 rounded-full border border-gray-200 text-gray-500 hover:bg-gray-100 transition-colors hover:text-gray-900"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={scrollRight}
            className="p-2 rounded-full border border-gray-200 text-gray-500 hover:bg-gray-100 transition-colors hover:text-gray-900"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex overflow-x-auto gap-4 sm:gap-6 pb-6 pt-2 scrollbar-hide snap-x snap-mandatory px-1"
      >
        {SUGGESTED_PRODUCTS.map((item) => (
          <div key={item.id} className="snap-start w-[44vw] sm:w-[260px] shrink-0">
            <ProductCard item={item} showPlusButton={true} useSquareAspect={true} />
          </div>
        ))}
      </div>
    </section>
  );
}
