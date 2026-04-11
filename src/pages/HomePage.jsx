import React from 'react';
import { ChevronLeft, ChevronRight, LayoutGrid, List } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { useHorizontalScroll } from '../hooks/useHorizontalScroll';
import { NEW_ARRIVALS, WEEKLY_EDIT_MAIN, WEEKLY_EDIT_GRID, SUGGESTED_PRODUCTS } from '../data/mock';
import HeroBanner from '../components/HeroBanner';
import { useLatestProducts } from '../hooks/useLatestProducts';

const CATEGORIES = [
  { name: 'ELECTRONICS', icon: '💻' },
  { name: 'FASHION', icon: '👕' },
  { name: 'HOME', icon: '🛋️' },
  { name: 'LUXURY', icon: '⌚' },
  { name: 'CREATIVE', icon: '✨' },
  { name: 'AUDIO', icon: '🎧' },
];

export default function HomePage() {
  const { scrollRef, scrollLeft, scrollRight } = useHorizontalScroll(350);
  const { products: heroProducts, loading: heroLoading } = useLatestProducts(5);

  return (
    <main className="max-w-7xl mx-auto px-12 mt-8 flex flex-col gap-16 w-full">

      {/* Hero Banner — 5 สินค้าล่าสุด (จัดการโดย HeroBanner component) */}
      <HeroBanner products={heroProducts} loading={heroLoading} />


      {/* Categories Section */}
      <section>
        <div className="flex justify-between items-end border-b border-gray-200 pb-4 mb-8">
          <h2 className="text-2xl font-extrabold text-[#0F172A] tracking-tight">Categories</h2>
          <button className="text-[10px] font-bold text-[#1D4ED8] uppercase tracking-widest hover:text-blue-800 transition-colors border-b border-transparent hover:border-blue-800 pb-1">EXPLORE ALL</button>
        </div>
        <div className="flex justify-between items-center px-4">
          {CATEGORIES.map(cat => (
            <div key={cat.name} className="flex flex-col items-center gap-4 cursor-pointer group">
              <div className="w-20 h-20 rounded-full bg-[#EEF2FF] flex items-center justify-center text-3xl group-hover:scale-110 group-hover:bg-[#E0E7FF] group-hover:shadow-md transition-all">
                {cat.icon}
              </div>
              <span className="text-[10px] font-bold text-gray-500 tracking-widest uppercase transition-colors group-hover:text-gray-900">{cat.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* New Arrivals Section */}
      <section>
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl font-extrabold text-[#0F172A] tracking-tight mb-2">New Arrivals</h2>
            <p className="text-sm text-gray-500 font-medium">The latest additions to our curated gallery.</p>
          </div>
          <div className="flex gap-2">
            <button className="p-2 rounded-full border border-gray-200 text-gray-500 hover:bg-gray-100 transition-colors hover:text-gray-900"><ChevronLeft size={16} /></button>
            <button className="p-2 rounded-full border border-gray-200 text-gray-500 hover:bg-gray-100 transition-colors hover:text-gray-900"><ChevronRight size={16} /></button>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-6">
          {NEW_ARRIVALS.map(item => (
            <div key={item.id} className="group cursor-pointer">
              <div className="aspect-[4/5] bg-[#F1F5F9] rounded-2xl overflow-hidden mb-4 relative shadow-sm">
                <img src={item.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={item.name} />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors"></div>
              </div>
              <div className="text-[9px] text-[#64748B] font-bold tracking-widest uppercase mb-1.5">{item.category}</div>
              <div className="text-sm font-bold text-[#0F172A] mb-1 group-hover:text-[#1D4ED8] transition-colors">{item.name}</div>
              <div className="text-xs font-bold text-[#1D4ED8]">${item.price.toFixed(2)}</div>
            </div>
          ))}
        </div>
      </section>

      {/* The Weekly Edit Section */}
      <section className="pt-8">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl font-extrabold text-[#0F172A] tracking-tight mb-2">The Weekly Edit</h2>
            <p className="text-sm text-gray-500 font-medium">Handpicked essentials for the modern lifestyle.</p>
          </div>
          <div className="flex gap-4 items-center">
            <LayoutGrid size={20} className="text-[#1D4ED8] cursor-pointer hover:opacity-80" />
            <List size={20} className="text-gray-300 cursor-pointer hover:text-gray-500 transition-colors" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 h-[600px]">
          {/* Left Big Card */}
          <div className="relative rounded-3xl overflow-hidden bg-gray-100 group cursor-pointer h-full border border-gray-100 shadow-sm">
            <img src={WEEKLY_EDIT_MAIN.image} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={WEEKLY_EDIT_MAIN.name} />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/90 via-[#0F172A]/10 to-[#0F172A]/20 duration-500 group-hover:from-black"></div>

            <div className="absolute top-6 left-6 grid gap-2">
              <span className="bg-white text-[#0F172A] text-[9px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest w-max">
                {WEEKLY_EDIT_MAIN.badge}
              </span>
              <span className="bg-white/90 backdrop-blur-sm text-gray-900 text-[10px] font-bold px-3 py-1.5 rounded-full w-max mt-1">
                ${WEEKLY_EDIT_MAIN.price.toFixed(2)}
              </span>
            </div>

            <div className="absolute bottom-8 left-8 text-white">
              <h3 className="text-4xl font-extrabold tracking-tight mb-2">{WEEKLY_EDIT_MAIN.name}</h3>
              <p className="text-sm text-gray-300 font-medium uppercase tracking-wider text-[10px] drop-shadow-md">{WEEKLY_EDIT_MAIN.category}</p>
            </div>
          </div>

          {/* Right Quad Grid */}
          <div className="grid grid-cols-2 gap-6 h-full">
            {WEEKLY_EDIT_GRID.map(item => (
              <ProductCard key={item.id} item={item} showPlusButton={true} />
            ))}
          </div>
        </div>
      </section>

      {/* Artisan Curation Banner */}
      <section className="bg-[#EEF2FF] rounded-[32px] p-12 flex items-center justify-between shadow-[0_4px_20px_rgba(238,242,255,0.8)] border border-[#E0E7FF] mt-8">
        <div className="max-w-xl">
          <h2 className="text-[32px] font-extrabold text-[#0F172A] mb-3 tracking-tight">Artisan Curation</h2>
          <p className="text-[#475569] text-sm leading-relaxed font-medium">Every item in Shopter is vetted for design integrity and lasting quality. Join our membership for exclusive early access to heritage drops.</p>
        </div>
        <button className="bg-[#0F172A] text-white font-bold py-4 px-10 rounded-full hover:bg-black transition-colors shadow-lg hover:-translate-y-1">Join the Circle</button>
      </section>

      {/* Suggested For You Section */}
      <section className="pt-8">
        <div className="flex justify-between items-end mb-8 border-b border-gray-200 pb-4">
          <div>
            <h2 className="text-2xl font-extrabold text-[#0F172A] tracking-tight mb-2">Suggested For You</h2>
            <p className="text-sm text-gray-500 font-medium">Picked based on trending collections.</p>
          </div>
          <div className="flex gap-2">
            <button onClick={scrollLeft} className="p-2 rounded-full border border-gray-200 text-gray-500 hover:bg-gray-100 transition-colors hover:text-gray-900"><ChevronLeft size={16} /></button>
            <button onClick={scrollRight} className="p-2 rounded-full border border-gray-200 text-gray-500 hover:bg-gray-100 transition-colors hover:text-gray-900"><ChevronRight size={16} /></button>
          </div>
        </div>

        <div ref={scrollRef} className="flex overflow-x-auto gap-6 pb-6 pt-2 scrollbar-hide snap-x px-1">
          {SUGGESTED_PRODUCTS.map((item, idx) => (
            <div key={idx} className="snap-start min-w-[280px] shrink-0">
              <ProductCard item={item} showPlusButton={true} useSquareAspect={true} />
            </div>
          ))}
        </div>
      </section>

    </main>
  );
}
