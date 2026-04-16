import React, { useState } from 'react';

export default function ProductGallery({ images, title }) {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <div className="w-full lg:w-1/2 flex flex-col gap-4">
      {/* Main Image */}
      <div className="w-full bg-[#f8fafc] sm:bg-[#F1F5F9] rounded-[24px] sm:rounded-[32px] overflow-hidden aspect-[4/5] sm:aspect-square relative flex items-center justify-center p-8 border border-gray-100">
        <div className="absolute top-6 left-6 z-10 bg-[#032b82] text-white text-[9px] sm:text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-md">
          Editor's Pick
        </div>
        <img src={images[activeIdx]} alt={title} className="w-full max-h-full object-contain drop-shadow-2xl mix-blend-multiply" />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-3 sm:gap-4 mt-2">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIdx(idx)}
              className={`w-full aspect-square rounded-2xl overflow-hidden bg-white border-2 transition-all p-1 
                ${idx === activeIdx ? 'border-[#032b82] opacity-100 shadow-sm' : 'border-transparent opacity-60 hover:opacity-100'}`}
            >
              <div className="w-full h-full bg-[#F1F5F9] rounded-xl flex items-center justify-center overflow-hidden">
                <img src={img} alt={`thumb-${idx}`} className="w-full h-full object-cover mix-blend-multiply" />
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
