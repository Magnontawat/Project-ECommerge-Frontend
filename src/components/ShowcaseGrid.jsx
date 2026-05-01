import React from 'react';
import { Link } from 'react-router-dom';

export default function ShowcaseGrid({ items }) {
  if (!items || items.length === 0) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {items.map(item => (
        <Link to={`/product/${item.id}`} key={item.id} className="group cursor-pointer block rounded-3xl overflow-hidden hover:opacity-90 transition-opacity">
          <div className="bg-[#475569] rounded-[24px] sm:rounded-[32px] overflow-hidden aspect-square mb-4 relative drop-shadow-sm flex items-center justify-center p-8 transition-transform duration-500">
             {/* Background gradient overlay for a premium look similar to the mockup */}
             <div className="absolute inset-0 bg-gradient-to-tr from-black/40 to-transparent mix-blend-multiply opacity-50"></div>
             <img src={item.image} alt={item.name} className="w-full max-h-full object-contain drop-shadow-2xl opacity-90 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700 relative z-10 mix-blend-screen" />
          </div>
          <div className="flex justify-between items-start mt-4 px-2">
            <div>
              <h3 className="text-sm font-bold text-[#0F172A] mb-1 group-hover:text-[#032b82] transition-colors">{item.name}</h3>
              <p className="text-[9px] text-gray-400 uppercase font-bold tracking-widest">{item.category}</p>
            </div>
            <p className="text-sm font-bold text-[#032b82]">฿{item.price.toFixed(2)}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
