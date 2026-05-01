import React, { useState } from 'react';
import { Truck, ShieldCheck } from 'lucide-react';

export default function ProductInfo({ product }) {
  const [selectedOpt, setSelectedOpt] = useState('');

  return (
    <div className="w-full lg:w-1/2 flex flex-col pt-4 lg:pt-10 mb-8 lg:mb-0">
      {/* Breadcrumb */}
      <div className="text-[9px] sm:text-[10px] text-gray-400 font-bold tracking-widest uppercase mb-4">
        {product.category} &nbsp;/&nbsp; COLLECTION &nbsp;/&nbsp; NEW
      </div>

      <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-[#032b82] mb-4 tracking-tight leading-tight">
        {product.name}
      </h1>
      
      <p className="text-xl sm:text-2xl text-[#60A5FA] font-bold mb-8">
        ฿{product.price.toFixed(2)}
      </p>

      {/* Description */}
      <div className="mb-8">
        <h3 className="text-[10px] font-bold tracking-widest uppercase text-gray-900 mb-3">Description</h3>
        <p className="text-sm text-gray-500 leading-relaxed font-medium">
          {product.description || "Designed for the modern sanctuary, this piece combines sculptural precision with unparalleled comfort."}
        </p>
      </div>

      {/* Options Dropdown */}
      {product.options && product.options.length > 0 && (
        <div className="mb-8">
           <h3 className="text-[10px] font-bold tracking-widest uppercase text-gray-900 mb-3">Size Options</h3>
           <div className="relative">
             <select 
               value={selectedOpt} 
               onChange={(e) => setSelectedOpt(e.target.value)}
               className="w-full p-4 pr-10 border border-gray-200 rounded-2xl bg-white text-sm font-medium text-gray-700 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 appearance-none cursor-pointer"
             >
               <option value="" disabled>Select Option</option>
               {product.options.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
               ))}
             </select>
             <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
             </div>
           </div>
        </div>
      )}

      {/* CTA Button */}
      <button className="w-full bg-[#032b82] text-white font-bold py-4 rounded-full shadow-lg hover:bg-blue-800 transition-colors mb-10 hover:-translate-y-0.5 active:translate-y-0">
        ADD TO CART
      </button>

      {/* Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-[#f8fafc] p-5 rounded-2xl border border-gray-50">
          <Truck size={20} className="text-[#032b82] mb-3" strokeWidth={2.5} />
          <h4 className="text-[10px] font-bold text-gray-900 tracking-widest uppercase mb-2">White Glove Delivery</h4>
          <p className="text-xs text-gray-500 font-medium leading-relaxed">Complimentary assembly and packaging removal.</p>
        </div>
        <div className="bg-[#f8fafc] p-5 rounded-2xl border border-gray-50">
          <ShieldCheck size={20} className="text-[#032b82] mb-3" strokeWidth={2.5} />
          <h4 className="text-[10px] font-bold text-gray-900 tracking-widest uppercase mb-2">Lifetime Warranty</h4>
          <p className="text-xs text-gray-500 font-medium leading-relaxed">We stand by our craftsmanship for decades to come.</p>
        </div>
      </div>
    </div>
  );
}
