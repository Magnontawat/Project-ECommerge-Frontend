import React from 'react';

export default function Footer() {
  return (
    <footer className="mt-16 sm:mt-24 border-t border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-8 sm:py-10 text-sm">

        {/* Top row */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 sm:gap-0">
          {/* Brand */}
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6">
            <span className="text-xl font-extrabold text-[#1D4ED8] tracking-tight">SHOPTER</span>
            <span className="text-[11px] text-gray-400 font-bold tracking-wider text-center sm:text-left">
              © {new Date().getFullYear()} Shopter. All rights reserved.
            </span>
          </div>

          {/* Links + socials */}
          <div className="flex flex-wrap justify-center sm:justify-end items-center gap-4 sm:gap-8 text-[11px] font-bold text-gray-500 uppercase tracking-widest">
            <a href="#" className="hover:text-[#1D4ED8] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#1D4ED8] transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-[#1D4ED8] transition-colors">Help Center</a>
            <div className="hidden sm:block w-px h-4 bg-gray-300" />
            <div className="flex gap-3">
              <a href="#" className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-[#1D4ED8] hover:text-white transition-colors text-gray-600 font-serif font-black">X</a>
              <a href="#" className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-[#1D4ED8] hover:text-white transition-colors text-gray-600 font-serif font-black">in</a>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
