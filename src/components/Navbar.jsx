import React, { useState } from 'react';
import { Search, Menu, X, ShoppingBag, LogOut, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isLoggedIn, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
    setMenuOpen(false);
  };

  return (
    <nav className="w-full bg-white px-4 sm:px-8 lg:px-12 py-4 flex items-center justify-between shadow-sm sticky top-0 z-50">
      {/* Logo */}
      <Link to="/" className="text-xl font-extrabold text-[#0F172A] tracking-tight shrink-0">
        SHOPTER
      </Link>

      {/* Search bar — hidden on mobile */}
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

      {/* Desktop actions */}
      <div className="hidden lg:flex items-center gap-6">
        {isLoggedIn ? (
          <>
            <span className="flex items-center gap-2 text-sm font-bold text-[#0F172A]">
              <User size={16} className="text-[#032b82]" />
              {user?.name}
            </span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-red-500 transition-colors"
            >
              <LogOut size={16} />
              Sign Out
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-sm font-bold text-gray-600 hover:text-[#1D4ED8] transition-colors">
              Sign In
            </Link>
            <Link
              to="/register"
              className="text-sm font-bold bg-[#1D4ED8] text-white px-6 py-2.5 rounded-full hover:bg-blue-800 transition-colors shadow-md shadow-blue-900/10"
            >
              Register
            </Link>
          </>
        )}
      </div>

      {/* Mobile actions */}
      <div className="flex lg:hidden items-center gap-3">
        <button className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-600">
          <Search size={20} />
        </button>
        <button className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-600">
          <ShoppingBag size={20} />
        </button>
        <button
          className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-600"
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile slide-down menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-t border-gray-100 shadow-lg px-4 py-6 flex flex-col gap-4 lg:hidden z-50">
          {/* Mobile search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search..."
              className="w-full bg-[#F3F4F6] text-sm py-2.5 pl-10 pr-4 rounded-full outline-none focus:ring-2 focus:ring-[#1D4ED8]/20 transition-all text-gray-700 font-medium"
            />
          </div>

          {isLoggedIn ? (
            <>
              <div className="flex items-center gap-2 text-sm font-bold text-[#0F172A] py-1">
                <User size={16} className="text-[#032b82]" />
                {user?.name}
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-sm font-bold text-red-500 hover:text-red-700 transition-colors text-left py-1"
              >
                <LogOut size={16} />
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="text-sm font-bold text-gray-700 hover:text-[#1D4ED8] transition-colors text-left py-1"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                onClick={() => setMenuOpen(false)}
                className="text-sm font-bold bg-[#1D4ED8] text-white py-3 rounded-full hover:bg-blue-800 transition-colors text-center"
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
