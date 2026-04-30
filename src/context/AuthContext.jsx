import { createContext, useContext, useState, useEffect } from 'react'

// สร้าง Context สำหรับจัดการข้อมูลผู้ใช้งาน (Authentication) ส่วนกลาง
const AuthContext = createContext(null)

// คอมโพเนนต์ Provider เอาไว้ครอบส่วนที่ต้องการให้เข้าถึงข้อมูลผู้ใช้ได้ (ปกติครอบทั้ง App)
export function AuthProvider({ children }) {
  // สถานะผู้ใช้งานปัจจุบัน และ Token รหัสผ่าน
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(() => localStorage.getItem('token') || null)
  
  // เช็คว่าล็อกอินอยู่หรือไม่ โดยดูจากการมี Token
  const isLoggedIn = !!token

  // เมื่อโหลดเว็บครั้งแรก: ให้ลองดึงข้อมูล user กลับมาจาก localStorage (ถ้าเคยล็อกอินไว้)
  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch {
        localStorage.removeItem('user')
      }
    }
  }, [])

  // ฟังก์ชันสำหรับล็อกอิน (บันทึกข้อมูลลง State และ localStorage)
  const login = (newToken, newUser) => {
    setToken(newToken)
    setUser(newUser)
    localStorage.setItem('token', newToken)
    localStorage.setItem('user', JSON.stringify(newUser))
  }

  // ฟังก์ชันสำหรับออกจากระบบ (ลบข้อมูลทิ้งทั้งหมด)
  const logout = () => {
    setToken(null)
    setUser(null)
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  return (
    // ส่งผ่านข้อมูลและฟังก์ชันทั้งหมดลงไปให้ลูกๆ ใช้งาน
    <AuthContext.Provider value={{ user, token, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// Custom hook เพื่อให้คอมโพเนนต์อื่นๆ สามารถเรียกใช้ข้อมูล Auth ได้ง่ายๆ
export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth ต้องถูกเรียกใช้ภายใต้ <AuthProvider> เท่านั้น')
  return ctx
}
