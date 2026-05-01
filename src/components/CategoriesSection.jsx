import React from 'react';

const CATEGORIES = [
  { name: 'ELECTRONICS', icon: '💻' },
  { name: 'FASHION', icon: '👕' },
  { name: 'HOME', icon: '🛋️' },
  { name: 'LUXURY', icon: '⌚' },
  { name: 'CREATIVE', icon: '✨' },
  { name: 'AUDIO', icon: '🎧' },
];

export default function CategoriesSection() {
  return (
    <section>
      <div className="flex justify-between items-end border-b border-gray-200 pb-4 mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-extrabold text-[#0F172A] tracking-tight">Categories</h2>
        <button className="text-[10px] font-bold text-[#1D4ED8] uppercase tracking-widest hover:text-blue-800 transition-colors border-b border-transparent hover:border-blue-800 pb-1">
          EXPLORE ALL
        </button>
      </div>

      <div className="flex gap-4 sm:gap-0 sm:justify-between items-center px-1 sm:px-4 overflow-x-auto pb-2 scrollbar-hide snap-x">
        {CATEGORIES.map(cat => (
          <div key={cat.name} className="flex flex-col items-center gap-3 sm:gap-4 cursor-pointer group snap-start shrink-0">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#EEF2FF] flex items-center justify-center text-2xl sm:text-3xl group-hover:scale-110 group-hover:bg-[#E0E7FF] group-hover:shadow-md transition-all">
              {cat.icon}
            </div>
            <span className="text-[9px] sm:text-[10px] font-bold text-gray-500 tracking-widest uppercase transition-colors group-hover:text-gray-900">
              {cat.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
