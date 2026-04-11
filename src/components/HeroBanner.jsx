import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * HeroBanner
 * ----------
 * รับ `products` array (สินค้า 5 อันดับล่าสุด) จาก useLatestProducts
 * จัดการ carousel state ทั้งหมดภายใน component นี้
 *
 * @param {{ products: Array, loading?: boolean }} props
 */
export default function HeroBanner({ products = [], loading = false }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);

  // ── Navigation helpers ────────────────────────────────────────────────────
  const goToSlide = useCallback((index) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide(index);
    setTimeout(() => setIsTransitioning(false), 600);
  }, [isTransitioning]);

  const goNext = useCallback(() => {
    if (!products.length) return;
    goToSlide((currentSlide + 1) % products.length);
  }, [currentSlide, products.length, goToSlide]);

  const goPrev = useCallback(() => {
    if (!products.length) return;
    goToSlide((currentSlide - 1 + products.length) % products.length);
  }, [currentSlide, products.length, goToSlide]);

  // ── Auto-slide ทุก 5 วินาที, หยุดเมื่อ hover ─────────────────────────────
  useEffect(() => {
    if (isPaused || products.length === 0) return;
    intervalRef.current = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % products.length);
    }, 5000);
    return () => clearInterval(intervalRef.current);
  }, [isPaused, products.length]);

  // reset slide index เมื่อ products เปลี่ยน (เช่น reload จาก API)
  useEffect(() => {
    setCurrentSlide(0);
  }, [products]);

  const activeProduct = products[currentSlide];

  return (
    <>
      {/* ── Hero Banner wrapper ─────────────────────────────────────────── */}
      <div
        className="relative w-full h-[500px] rounded-[32px] overflow-hidden shadow-lg bg-[#0A1128] flex items-center"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A1128] via-[#0D1A3A] to-[#111827] z-0" />

        {/* ── Loading state ────────────────────────────────────────────── */}
        {loading && (
          <div className="relative z-10 w-full flex items-center justify-center h-full">
            <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
          </div>
        )}

        {/* ── Slide content ────────────────────────────────────────────── */}
        {!loading && activeProduct && (
          <>
            {/* Left: ข้อมูลสินค้า (image, name, price, category) จาก mock data */}
            <div
              key={`info-${currentSlide}`}
              className="relative z-10 w-full lg:w-1/2 p-16 flex flex-col justify-center text-white pb-10"
              style={{ animation: 'heroFadeSlideIn 0.6s ease forwards' }}
            >
              <span className="bg-white/10 border border-white/20 backdrop-blur-sm px-3 py-1 text-[10px] uppercase font-bold tracking-widest rounded-full w-max mb-6 text-gray-300">
                {activeProduct.category}
              </span>
              <h2 className="text-6xl font-extrabold leading-[1.1] mb-6 tracking-tight text-white">
                {activeProduct.name}
              </h2>
              <p className="text-base text-gray-300 mb-8 max-w-md leading-relaxed font-medium">
                ${activeProduct.price.toFixed(2)}
              </p>
              <div className="flex gap-4">
                <button className="bg-[#1D4ED8] text-white font-bold py-3.5 px-8 shadow-lg hover:scale-105 hover:bg-blue-600 transition-all text-sm rounded-xl">
                  Explore Now
                </button>
                <button className="bg-transparent border-2 border-white/20 text-white font-bold py-3.5 px-8 hover:bg-white/10 hover:border-white/40 transition-colors text-sm rounded-xl">
                  View Lookbook
                </button>
              </div>
            </div>

            {/* Right: รูปสินค้าจาก mock data */}
            <div className="absolute right-0 top-0 bottom-0 w-1/2 flex items-center justify-end pr-16 bg-gradient-to-l from-transparent via-[#0A1128]/40 to-[#0A1128]">
              <div
                key={`img-${currentSlide}`}
                className="relative w-[500px] h-full flex flex-col items-center justify-center pt-8"
                style={{ animation: 'heroImageIn 0.7s ease forwards' }}
              >
                <img
                  src={activeProduct.image}
                  alt={activeProduct.name}
                  className="w-full object-contain mix-blend-screen opacity-90 drop-shadow-2xl hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>

            {/* Prev / Next arrows */}
            <button
              onClick={goPrev}
              className="absolute left-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <ChevronLeft size={18} className="text-white" />
            </button>
            <button
              onClick={goNext}
              className="absolute right-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <ChevronRight size={18} className="text-white" />
            </button>

            {/* Dot indicators — คลิกเพื่อเลือก slide */}
            <div className="absolute right-8 bottom-8 flex gap-2 z-20 items-center">
              {products.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goToSlide(idx)}
                  className={`rounded-full transition-all duration-300 ${
                    idx === currentSlide
                      ? 'w-6 h-1.5 bg-white'
                      : 'w-1.5 h-1.5 bg-white/40 hover:bg-white/60'
                  }`}
                />
              ))}
            </div>

            {/* Slide counter */}
            <div className="absolute left-8 bottom-8 z-20 text-white/40 text-xs font-bold tracking-widest">
              {String(currentSlide + 1).padStart(2, '0')} / {String(products.length).padStart(2, '0')}
            </div>
          </>
        )}
      </div>

      {/* Keyframe animations สำหรับ slide transition */}
      <style>{`
        @keyframes heroFadeSlideIn {
          from { opacity: 0; transform: translateX(-24px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes heroImageIn {
          from { opacity: 0; transform: translateX(24px) scale(0.96); }
          to   { opacity: 1; transform: translateX(0) scale(1); }
        }
      `}</style>
    </>
  );
}
