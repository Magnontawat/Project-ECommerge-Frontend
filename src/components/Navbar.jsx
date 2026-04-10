import React from 'react';
import { Search } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="w-full bg-white px-12 py-4 flex items-center justify-between shadow-sm sticky top-0 z-50">
      <Link to="/" className="text-xl font-extrabold text-[#0F172A] tracking-tight">SHOPTER</Link>

      <div className="flex-1 max-w-2xl px-8 hidden lg:block">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search for luxury goods, tech, and lifestyle art..."
            className="w-full bg-[#F3F4F6] text-sm py-2.5 pl-11 pr-4 rounded-full outline-none focus:ring-2 focus:ring-[#1D4ED8]/20 transition-all text-gray-700 font-medium"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button className="text-sm font-bold text-gray-600 hover:text-[#1D4ED8] transition-colors">Sign In</button>
        <button className="text-sm font-bold bg-[#1D4ED8] text-white px-6 py-2.5 rounded-full hover:bg-blue-800 transition-colors shadow-md shadow-blue-900/10">Register</button>
      </div>
    </nav>
  );
}
