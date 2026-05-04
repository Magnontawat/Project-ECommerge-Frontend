import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

// คอมโพเนนต์แถบนำทาง (Navbar) รองรับ Mobile & Desktop
export default function Navbar() {
  const { isLoggedIn, logout, openLogin, openRegister } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 h-[70px] md:h-[80px] bg-bg-main z-50 border-b border-border-color">
      <div className="h-full flex items-center justify-between w-full max-w-[1200px] mx-auto px-4 md:px-8 relative">
        
        {/* โลโก้แบรนด์ (ซ้ายมือ) */}
        <Link to="/" className="font-serif text-xl md:text-2xl font-bold text-text-main z-50">
          BaBaBook
        </Link>

        {/* ปุ่ม Hamburger สำหรับ Mobile */}
        <button 
          className="md:hidden z-50 p-2 text-text-main"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* เมนูตรงกลาง (สำหรับ Desktop) */}
        <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 gap-10">
          <Link to="/" className="text-[0.9rem] text-text-muted hover:text-text-main transition-colors">Best Sellers</Link>
          <Link to="/" className="text-[0.9rem] text-text-muted hover:text-text-main transition-colors">New Releases</Link>
        </nav>

        {/* ส่วนปุ่ม Login/Register หรือปุ่ม Logout ทางขวามือ (สำหรับ Desktop) */}
        <div className="hidden md:flex items-center gap-6">
          {isLoggedIn ? (
            <button className="text-[0.9rem] text-text-main hover:text-brand transition-colors" onClick={logout}>
              Logout
            </button>
          ) : (
            <>
              <button 
                onClick={openLogin}
                className="text-[0.9rem] text-text-muted hover:text-text-main transition-colors cursor-pointer"
              >
                Login
              </button>
              <button 
                onClick={openRegister}
                className="inline-flex items-center justify-center font-sans font-normal text-[0.9rem] cursor-pointer transition-colors border-none py-[0.5rem] px-[1.2rem] bg-brand text-white hover:bg-brand-hover rounded-sm"
              >
                Register
              </button>
            </>
          )}
        </div>

        {/* เมนูแบบ Dropdown สำหรับ Mobile */}
        <div className={`
          absolute top-[70px] left-0 w-full bg-white shadow-lg border-b border-border-color md:hidden
          transition-all duration-300 ease-in-out origin-top
          ${isMenuOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 pointer-events-none'}
        `}>
          <div className="flex flex-col p-4 gap-4">
            <Link to="/" className="text-text-main font-medium py-2 border-b border-gray-100" onClick={() => setIsMenuOpen(false)}>Best Sellers</Link>
            <Link to="/" className="text-text-main font-medium py-2 border-b border-gray-100" onClick={() => setIsMenuOpen(false)}>New Releases</Link>
            
            <div className="flex flex-col gap-3 mt-2">
              {isLoggedIn ? (
                <button className="text-left text-text-main py-2" onClick={() => { logout(); setIsMenuOpen(false); }}>
                  Logout
                </button>
              ) : (
                <>
                  <button 
                    onClick={() => { openLogin(); setIsMenuOpen(false); }}
                    className="text-center text-text-main py-2 border border-border-color rounded-sm cursor-pointer"
                  >
                    Login
                  </button>
                  <button 
                    onClick={() => { openRegister(); setIsMenuOpen(false); }}
                    className="text-center text-white bg-brand py-2 rounded-sm cursor-pointer"
                  >
                    Register
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

      </div>
    </header>
  )
}
