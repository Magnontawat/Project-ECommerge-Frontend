import { useState, useCallback, createContext, useContext } from 'react';
import { loginUser, registerUser, logoutUser } from '../services/authService';

// ---------------------------------------------------------------------------
// AuthContext — Global state สำหรับทั้งแอป
// ---------------------------------------------------------------------------

export const AuthContext = createContext(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside <AuthProvider>');
  }
  return context;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('shopter_user');
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
      localStorage.setItem('shopter_user', JSON.stringify(loggedInUser));
      localStorage.setItem('shopter_token', token);
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, message: err.message };
    } finally {
      setIsLoading(false);
    }
  }, []);

  // ── Register ───────────────────────────────────────────────────────────────
  const register = useCallback(async ({ email, username, password }) => {
    setIsLoading(true);
    setError(null);
    try {
      const { user: registeredUser, token } = await registerUser({ email, username, password });
      setUser(registeredUser);
      localStorage.setItem('shopter_user', JSON.stringify(registeredUser));
      localStorage.setItem('shopter_token', token);
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
      // silent fail
    } finally {
      setUser(null);
      localStorage.removeItem('shopter_user');
      localStorage.removeItem('shopter_token');
      setIsLoading(false);
    }
  }, []);

  const clearError = useCallback(() => setError(null), []);

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, isLoading, error, login, register, logout, clearError }}>
      {children}
    </AuthContext.Provider>
  );
}

