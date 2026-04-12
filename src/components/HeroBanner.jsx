import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * HeroBanner
 * ----------
 * รับ `products` array (สินค้า 5 อันดับล่าสุด) จาก useLatestProducts
 * จัดการ carousel state ทั้งหมดภายใน component นี้
 * รองรับ Mobile / Tablet / Desktop
 *
 * @param {{ products: Array, loading?: boolean }} props
 */

export default function HeroBanner({ products = [], loading = false }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);

  // Touch swipe support
  const touchStartX = useRef(null);

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

  // ── Auto-slide every 5s, pause on hover ──────────────────────────────────
  useEffect(() => {
    if (isPaused || products.length === 0) return;
    intervalRef.current = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % products.length);
    }, 5000);
    return () => clearInterval(intervalRef.current);
  }, [isPaused, products.length]);

  // Reset when products change
  useEffect(() => { setCurrentSlide(0); }, [products]);

  // ── Touch swipe handlers ─────────────────────────────────────────────────
  const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) diff > 0 ? goNext() : goPrev();
    touchStartX.current = null;
  };

  const activeProduct = products[currentSlide];

  return (
    <>
      {/* ── Hero Banner wrapper ─────────────────────────────────────────── */}
      <div
        className="relative w-full rounded-[24px] sm:rounded-[32px] overflow-hidden shadow-lg bg-[#0A1128] flex items-center
                   h-[420px] sm:h-[460px] lg:h-[500px]"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Background gradient */}
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
            {/* Left: Product info */}
            <div
              key={`info-${currentSlide}`}
              className="relative z-10 w-full lg:w-1/2
                         px-6 py-8 sm:px-10 sm:py-10 lg:p-16
                         flex flex-col justify-center text-white"
              style={{ animation: 'heroFadeSlideIn 0.6s ease forwards' }}
            >
              <span className="bg-white/10 border border-white/20 backdrop-blur-sm px-3 py-1 text-[10px] uppercase font-bold tracking-widest rounded-full w-max mb-4 text-gray-300">
                {activeProduct.category}
              </span>

              <h2 className="font-extrabold leading-[1.1] tracking-tight text-white mb-3
                             text-3xl sm:text-4xl lg:text-6xl">
                {activeProduct.name}
              </h2>

              <p className="font-bold text-[#60A5FA] mb-6
                            text-lg sm:text-xl lg:text-2xl">
                ฿{activeProduct.price.toFixed(2)}
              </p>

              <div className="flex gap-3 flex-wrap">
                <button className="bg-[#1D4ED8] text-white font-bold shadow-lg hover:scale-105 hover:bg-blue-600 transition-all rounded-xl
                                   text-xs sm:text-sm py-3 px-6 sm:py-3.5 sm:px-8">
                  Shop Now
                </button>
              </div>
            </div>

            {/* Right: Product image — hidden on small mobile, shown md+ */}
            <div className="absolute right-0 top-0 bottom-0 w-1/2 items-center justify-end pr-6 sm:pr-10 lg:pr-16
                            bg-gradient-to-l from-transparent via-[#0A1128]/40 to-[#0A1128]
                            hidden sm:flex">
              <div
                key={`img-${currentSlide}`}
                className="relative w-full max-w-[320px] lg:max-w-[420px] h-full flex flex-col items-center justify-center pt-6"
                style={{ animation: 'heroImageIn 0.7s ease forwards' }}
              >
                <img
                  src={activeProduct.image}
                  alt={activeProduct.name}
                  className="w-full object-contain mix-blend-screen opacity-90 drop-shadow-2xl hover:scale-105 transition-transform duration-700
                             h-[260px] sm:h-[300px] lg:h-[380px]"
                />
              </div>
            </div>

            {/* Prev / Next arrows — hidden on mobile */}
            <button
              onClick={goPrev}
              className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-20 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors
                         hidden sm:flex w-9 h-9 sm:w-10 sm:h-10"
            >
              <ChevronLeft size={18} className="text-white" />
            </button>
            <button
              onClick={goNext}
              className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-20 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors
                         hidden sm:flex w-9 h-9 sm:w-10 sm:h-10"
            >
              <ChevronRight size={18} className="text-white" />
            </button>

            {/* Dot indicators */}
            <div className="absolute bottom-5 sm:bottom-8 flex gap-2 z-20 items-center
                            left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0 sm:right-8">
              {products.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goToSlide(idx)}
                  className={`rounded-full transition-all duration-300 ${idx === currentSlide
                    ? 'w-6 h-1.5 bg-white'
                    : 'w-1.5 h-1.5 bg-white/40 hover:bg-white/60'
                    }`}
                />
              ))}
            </div>

            {/* Slide counter — desktop only */}
            <div className="absolute left-8 bottom-8 z-20 text-white/40 text-xs font-bold tracking-widest hidden sm:block">
              {String(currentSlide + 1).padStart(2, '0')} / {String(products.length).padStart(2, '0')}
            </div>
          </>
        )}
      </div>

      {/* Keyframe animations */}
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
