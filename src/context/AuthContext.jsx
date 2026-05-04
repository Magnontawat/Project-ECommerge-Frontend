import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { loginUser, registerUser, logoutUser } from '../services/authService'

// สร้าง Context สำหรับจัดการข้อมูลผู้ใช้งาน (Authentication) ส่วนกลาง
const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  // Drawer State
  const [isAuthDrawerOpen, setIsAuthDrawerOpen] = useState(false)
  const [authMode, setAuthMode] = useState('login') // 'login' or 'register'
  
  const isLoggedIn = !!user

  // เมื่อโหลดเว็บครั้งแรก: ดึงข้อมูล user จาก localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('shopter_user')
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch {
        localStorage.removeItem('shopter_user')
        localStorage.removeItem('shopter_token')
      }
    }
  }, [])

  // ── Login ──────────────────────────────────────────────────────────────────
  const login = useCallback(async ({ email, password }) => {
    setIsLoading(true)
    setError(null)
    try {
      const { user: loggedInUser, token } = await loginUser({ email, password })
      setUser(loggedInUser)
      localStorage.setItem('shopter_user', JSON.stringify(loggedInUser))
      localStorage.setItem('shopter_token', token)
      return { success: true }
    } catch (err) {
      setError(err.message)
      return { success: false, message: err.message }
    } finally {
      setIsLoading(false)
    }
  }, [])

  // ── Register ───────────────────────────────────────────────────────────────
  const register = useCallback(async ({ email, username, password }) => {
    setIsLoading(true)
    setError(null)
    try {
      const { user: registeredUser, token } = await registerUser({ email, username, password })
      setUser(registeredUser)
      localStorage.setItem('shopter_user', JSON.stringify(registeredUser))
      localStorage.setItem('shopter_token', token)
      return { success: true }
    } catch (err) {
      setError(err.message)
      return { success: false, message: err.message }
    } finally {
      setIsLoading(false)
    }
  }, [])

  // ── Logout ─────────────────────────────────────────────────────────────────
  const logout = useCallback(async () => {
    setIsLoading(true)
    try {
      await logoutUser()
    } catch {
      // silent fail
    } finally {
      setUser(null)
      localStorage.removeItem('shopter_user')
      localStorage.removeItem('shopter_token')
      setIsLoading(false)
    }
  }, [])

  const clearError = useCallback(() => setError(null), [])

  const openLogin = useCallback(() => {
    setAuthMode('login')
    setIsAuthDrawerOpen(true)
    setError(null)
  }, [])

  const openRegister = useCallback(() => {
    setAuthMode('register')
    setIsAuthDrawerOpen(true)
    setError(null)
  }, [])

  const closeAuthDrawer = useCallback(() => {
    setIsAuthDrawerOpen(false)
  }, [])

  return (
    <AuthContext.Provider value={{ 
      user, 
      isLoggedIn, 
      isLoading, 
      error, 
      login, 
      register, 
      logout, 
      clearError,
      isAuthDrawerOpen,
      authMode,
      setAuthMode,
      openLogin,
      openRegister,
      closeAuthDrawer
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth ต้องถูกเรียกใช้ภายใต้ <AuthProvider> เท่านั้น')
  return ctx
}

