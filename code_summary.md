# E-commerce Frontend Code Summary (Navbar & Auth)

ไฟล์นี้รวบรวม Code ทั้งหมดที่เกี่ยวข้องกับระบบ Navbar, การจัดการ User Profile, Dropdown ตาม Role (Admin/User), และการจัดการ Authentication Context เพื่อให้นำไปใช้ในการเรียนรู้หรือให้ AI อธิบายการทำงานครับ

---

## 1. Navbar Component

**Path:** `src/components/Navbar.jsx`

คอมโพเนนต์นี้ทำหน้าที่เป็นแถบเมนูด้านบน รองรับทั้ง Desktop และ Mobile โดยมีการดึงข้อมูล `user` มาจาก `AuthContext` เพื่อตรวจสอบ Role และแสดงเมนูที่แตกต่างกัน

```javascript
import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// ── UserDropdown Component ───────────────────────────────────────────────────
// ส่วนแสดงผล Profile Dropdown สำหรับ Desktop
function UserDropdown({ user, logout }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const navigate = useNavigate();
  const isAdmin = user?.role === "admin"; // ตรวจสอบว่าเป็น Admin หรือไม่

  // Logic: ปิด Dropdown เมื่อคลิกพื้นที่ด้านนอก
  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    setOpen(false);
    await logout();
  };

  // ดึงตัวอักษรแรกมาทำเป็น Avatar
  const initials = (user?.username || user?.email || "U")
    .charAt(0)
    .toUpperCase();

  return (
    <div className="relative flex items-center gap-4" ref={ref}>
      {/* ไอคอนตะกร้าสินค้า */}
      <Link
        to="/cart"
        className="relative text-text-muted hover:text-text-main transition-colors"
      >
        <svg
          className="w-[22px] h-[22px]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.8}
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9m12-9l2 9M9 21a1 1 0 100-2 1 1 0 000 2zm6 0a1 1 0 100-2 1 1 0 000 2z"
          />
        </svg>
      </Link>

      {/* ปุ่มกดเปิด User Menu */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 cursor-pointer group"
      >
        <span className="w-8 h-8 rounded-full bg-brand text-white text-sm font-semibold flex items-center justify-center select-none group-hover:opacity-80 transition-opacity">
          {initials}
        </span>
        <span className="text-[0.9rem] text-text-main font-medium max-w-[100px] truncate">
          {user?.username || user?.email}
        </span>
        <svg
          className={`w-4 h-4 text-text-muted transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown Panel: แยกตาม Role */}
      <div
        className={`absolute right-0 top-[calc(100%+12px)] w-44 bg-white rounded-md shadow-xl border border-border-color transition-all duration-200 origin-top-right ${open ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`}
      >
        <div className="py-1">
          {isAdmin ? (
            // เมนูสำหรับ Admin
            <>
              <button
                onClick={() => {
                  setOpen(false);
                  navigate("/admin/add-product");
                }}
                className="w-full text-left px-4 py-2.5 text-[0.875rem] text-text-main hover:bg-gray-50 flex items-center gap-2.5"
              >
                <svg
                  className="w-4 h-4 text-brand"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Add Product
              </button>
              <div className="border-t border-border-color my-1" />
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2.5 text-[0.875rem] text-red-500 hover:bg-red-50 flex items-center gap-2.5"
              >
                Logout
              </button>
            </>
          ) : (
            // เมนูสำหรับ User ทั่วไป
            <>
              <button
                onClick={() => {
                  setOpen(false);
                  navigate("/profile");
                }}
                className="w-full text-left px-4 py-2.5 text-[0.875rem] text-text-main hover:bg-gray-50 flex items-center gap-2.5"
              >
                Profile
              </button>
              <div className="border-t border-border-color my-1" />
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2.5 text-[0.875rem] text-red-500 hover:bg-red-50 flex items-center gap-2.5"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Main Navbar ──────────────────────────────────────────────────────────────
export default function Navbar() {
  const { user, isLoggedIn, logout, openLogin, openRegister } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const isAdmin = user?.role === "admin";

  return (
    <header className="fixed top-0 left-0 right-0 h-[70px] md:h-[80px] bg-bg-main z-50 border-b border-border-color">
      <div className="h-full flex items-center justify-between w-full max-w-[1200px] mx-auto px-4 md:px-8 relative">
        <Link
          to="/"
          className="font-serif text-xl md:text-2xl font-bold text-text-main z-50"
        >
          BaBaBook
        </Link>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden z-50 p-2 text-text-main"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Desktop Menus */}
        <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 gap-10">
          <Link
            to="/"
            className="text-[0.9rem] text-text-muted hover:text-text-main transition-colors"
          >
            Best Sellers
          </Link>
          <Link
            to="/"
            className="text-[0.9rem] text-text-muted hover:text-text-main transition-colors"
          >
            New Releases
          </Link>
        </nav>

        {/* Desktop Right: Login/Register or User Menu */}
        <div className="hidden md:flex items-center gap-4">
          {isLoggedIn ? (
            <UserDropdown user={user} logout={logout} />
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
                className="bg-brand text-white py-[0.5rem] px-[1.2rem] rounded-sm hover:bg-brand-hover transition-colors"
              >
                Register
              </button>
            </>
          )}
        </div>

        {/* Mobile Dropdown Menu */}
        <div
          className={`absolute top-[70px] left-0 w-full bg-white shadow-lg border-b border-border-color md:hidden transition-all duration-300 origin-top ${isMenuOpen ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0 pointer-events-none"}`}
        >
          <div className="flex flex-col p-4 gap-4">
            <Link
              to="/"
              className="text-text-main font-medium py-2 border-b border-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Best Sellers
            </Link>
            <Link
              to="/"
              className="text-text-main font-medium py-2 border-b border-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              New Releases
            </Link>

            <div className="flex flex-col gap-3 mt-2">
              {isLoggedIn ? (
                <>
                  <div className="flex items-center gap-2 py-2 border-b border-gray-100">
                    <span className="w-8 h-8 rounded-full bg-brand text-white text-sm font-semibold flex items-center justify-center">
                      {(user?.username || user?.email || "U")
                        .charAt(0)
                        .toUpperCase()}
                    </span>
                    <span className="text-[0.9rem] text-text-main font-medium">
                      {user?.username || user?.email}
                    </span>
                  </div>
                  <Link
                    to="/cart"
                    className="py-2 flex items-center gap-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Cart
                  </Link>
                  {isAdmin ? (
                    <button
                      onClick={() => {
                        setIsMenuOpen(false);
                        navigate("/admin/add-product");
                      }}
                      className="text-left py-2 flex items-center gap-2"
                    >
                      Add Product
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setIsMenuOpen(false);
                        navigate("/profile");
                      }}
                      className="text-left py-2 flex items-center gap-2"
                    >
                      Profile
                    </button>
                  )}
                  <button
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="text-left text-red-500 py-2 flex items-center gap-2"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      openLogin();
                      setIsMenuOpen(false);
                    }}
                    className="text-center py-2 border border-border-color rounded-sm"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => {
                      openRegister();
                      setIsMenuOpen(false);
                    }}
                    className="text-center text-white bg-brand py-2 rounded-sm"
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
  );
}
```

---

## 2. Auth Context

**Path:** `src/context/AuthContext.jsx`

ไฟล์นี้จัดการสถานะ (State) ของการ Login ทั้งหมดในระบบ รวมถึงข้อมูล User ที่ดึงมาจาก Local Storage และการแชร์ฟังก์ชัน `login`, `logout`, `role` ให้กับ Component อื่นๆ ใช้งาน

```javascript
import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { loginUser, registerUser, logoutUser } from "../services/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Drawer State (สำหรับ Pop-up Login/Register)
  const [isAuthDrawerOpen, setIsAuthDrawerOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");

  const isLoggedIn = !!user;

  // เมื่อโหลดเว็บครั้งแรก: ดึงข้อมูล user จาก localStorage เพื่อคงสถานะ Login
  useEffect(() => {
    const savedUser = localStorage.getItem("shopter_user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem("shopter_user");
      }
    }
  }, []);

  // ฟังก์ชัน Login
  const login = useCallback(async ({ email, password }) => {
    setIsLoading(true);
    setError(null);
    try {
      const { user: loggedInUser, token } = await loginUser({
        email,
        password,
      });
      setUser(loggedInUser);
      localStorage.setItem("shopter_user", JSON.stringify(loggedInUser));
      localStorage.setItem("shopter_token", token);
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, message: err.message };
    } finally {
      setIsLoading(false);
    }
  }, []);

  // ฟังก์ชัน Logout
  const logout = useCallback(async () => {
    setIsLoading(true);
    try {
      await logoutUser();
    } finally {
      setUser(null);
      localStorage.removeItem("shopter_user");
      localStorage.removeItem("shopter_token");
      setIsLoading(false);
    }
  }, []);

  // ... (ส่วนการควบคุม Open/Close Auth Drawer)

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn,
        isLoading,
        error,
        login,
        logout,
        openLogin,
        openRegister,
        // ... exports อื่นๆ
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Hook สำหรับดึงข้อมูลไปใช้งานในหน้าต่างๆ
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
```
