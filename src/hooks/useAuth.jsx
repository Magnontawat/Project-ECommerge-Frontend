import { useState, useCallback, createContext, useContext } from 'react';
import { loginUser, logoutUser } from '../services/authService';

// ---------------------------------------------------------------------------
// AuthContext — Global state สำหรับทั้งแอป
// ใช้ Context เพื่อส่ง user state ให้ทุก Component โดยไม่ต้อง prop-drill
// ---------------------------------------------------------------------------

export const AuthContext = createContext(null);

/**
 * useAuth — Custom hook สำหรับเข้าถึง auth state และ actions
 * ใช้งาน: const { user, isLoggedIn, login, logout } = useAuth();
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside <AuthProvider>');
  }
  return context;
}

/**
 * AuthProvider — Wrap รอบแอปใน App.jsx
 * จัดการ state: user, token, loading, error
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    // Persist login across page refresh via sessionStorage
    // อนาคต: เปลี่ยนเป็น localStorage หรือ cookie secure
    try {
      const saved = sessionStorage.getItem('shopter_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const isLoggedIn = Boolean(user);

  // ── Login ──────────────────────────────────────────────────────────────────
  const login = useCallback(async ({ email, password }) => {
    setIsLoading(true);
    setError(null);
    try {
      const { user: loggedInUser, token } = await loginUser({ email, password });
      setUser(loggedInUser);
      sessionStorage.setItem('shopter_user', JSON.stringify(loggedInUser));
      sessionStorage.setItem('shopter_token', token);
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, message: err.message };
    } finally {
      setIsLoading(false);
    }
  }, []);

  // ── Logout ─────────────────────────────────────────────────────────────────
  const logout = useCallback(async () => {
    setIsLoading(true);
    try {
      await logoutUser();
    } catch {
      // silent fail on logout
    } finally {
      setUser(null);
      sessionStorage.removeItem('shopter_user');
      sessionStorage.removeItem('shopter_token');
      setIsLoading(false);
    }
  }, []);

  const clearError = useCallback(() => setError(null), []);

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, isLoading, error, login, logout, clearError }}>
      {children}
    </AuthContext.Provider>
  );
}
