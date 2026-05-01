import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout() {
  return (
    <div className="min-h-screen bg-[#F8F9FA] font-sans text-gray-900 pb-20 lg:pb-0">
      <Navbar />
      <div className="flex-1 flex flex-col w-full relative">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
