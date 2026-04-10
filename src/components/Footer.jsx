import React from 'react';

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-12 py-10 flex justify-between items-center text-sm">
        <div className="flex items-center gap-6">
          <span className="text-xl font-extrabold text-[#1D4ED8] tracking-tight">SHOPTER</span>
          <span className="text-[11px] text-gray-400 font-bold tracking-wider">© {new Date().getFullYear()} Shopter. All rights reserved.</span>
        </div>

        <div className="flex items-center gap-8 text-[11px] font-bold text-gray-500 uppercase tracking-widest">
          <a href="#" className="hover:text-[#1D4ED8] transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-[#1D4ED8] transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-[#1D4ED8] transition-colors">Help Center</a>
          <div className="w-px h-4 bg-gray-300 mx-2"></div>
          <div className="flex gap-3">
            <a href="#" className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-[#1D4ED8] hover:text-white transition-colors text-gray-600 font-serif font-black">X</a>
            <a href="#" className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-[#1D4ED8] hover:text-white transition-colors text-gray-600 font-serif font-black">in</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
