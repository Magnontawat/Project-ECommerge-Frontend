import React from 'react';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ProductCard({ item, showPlusButton = false, useSquareAspect = false }) {
  return (
    <div className={`group cursor-pointer bg-white p-3 sm:p-5 rounded-[20px] sm:rounded-3xl shadow-sm border border-gray-100 hover:shadow-lg transition-all`}>
      <div className={`bg-gray-50 rounded-xl sm:rounded-2xl overflow-hidden mb-3 sm:mb-4 relative ${useSquareAspect ? 'aspect-square' : 'aspect-[4/5]'}`}>
        <img src={item.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={item.name} />
      </div>
      <div className="relative">
        <div className="text-[8px] sm:text-[9px] text-[#64748B] font-bold tracking-widest uppercase mb-1">{item.category}</div>
        <div className="text-xs sm:text-sm font-bold text-[#0F172A] mb-1 group-hover:text-[#1D4ED8] transition-colors line-clamp-1">{item.name}</div>
        <div className="text-[10px] sm:text-xs font-bold text-[#1D4ED8]">฿{item.price.toFixed(2)}</div>
        {showPlusButton && (
          <button className="absolute right-0 bottom-0 p-1 sm:p-1.5 bg-[#F1F5F9] rounded-full text-gray-600 hover:bg-[#1D4ED8] hover:text-white transition-colors">
            <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" strokeWidth={2.5} />
          </button>
        )}
      </div>
    </div>
  );
}
