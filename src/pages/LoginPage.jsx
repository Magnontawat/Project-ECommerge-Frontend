import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, ArrowRight, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, isLoading, error, clearError } = useAuth();

  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  // ── Validation ────────────────────────────────────────────────────────────
  const validate = () => {
    const errs = {};
    if (!form.email.trim()) errs.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Enter a valid email address.';
    if (!form.password) errs.password = 'Password is required.';
    else if (form.password.length < 5) errs.password = 'Password must be at least 5 characters.';
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    // Clear error for this field on change
    if (fieldErrors[name]) setFieldErrors(prev => ({ ...prev, [name]: '' }));
    if (error) clearError();
  };

  // ── Submit ────────────────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setFieldErrors(errs);
      return;
    }

    const result = await login({ email: form.email, password: form.password });
    if (result.success) {
      navigate('/'); // redirect to home on success
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex">
      {/* ── Left Panel (decorative) ── only visible on large screens */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#032b82] relative overflow-hidden flex-col items-center justify-center p-16">
        {/* Background gradient orb */}
        <div className="absolute top-[-120px] right-[-80px] w-[500px] h-[500px] rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute bottom-[-100px] left-[-60px] w-[400px] h-[400px] rounded-full bg-indigo-700/30 blur-3xl" />

        <div className="relative z-10 max-w-md text-center">
          {/* Logo */}
          <Link to="/" className="inline-block text-3xl font-extrabold text-white tracking-tight mb-16">
            SHOPTER
          </Link>

          {/* Headline */}
          <h2 className="text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-6 tracking-tight">
            Premium goods, curated for you.
          </h2>
          <p className="text-blue-200 font-medium leading-relaxed text-base">
            Join thousands of members who access exclusive drops, early access, and personalized recommendations.
          </p>

          {/* Floating product images */}
          <div className="mt-14 grid grid-cols-3 gap-3">
            {[
              'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&q=80',
              'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=300&q=80',
              'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&q=80',
            ].map((src, i) => (
              <div
                key={i}
                className="aspect-square rounded-2xl bg-white/10 overflow-hidden backdrop-blur-sm border border-white/10 p-2 flex items-center justify-center"
                style={{ transform: i === 1 ? 'translateY(-10px)' : 'none', transition: 'transform 0.3s' }}
              >
                <img src={src} alt="" className="w-full h-full object-contain mix-blend-screen opacity-80" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Right Panel (form) ──────────────────────────────────────────────── */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 sm:px-12">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <Link to="/" className="lg:hidden block text-2xl font-extrabold text-[#032b82] tracking-tight mb-10 text-center">
            SHOPTER
          </Link>

          {/* Header */}
          <div className="mb-10">
            <h1 className="text-3xl sm:text-[36px] font-extrabold text-[#0F172A] mb-2 tracking-tight">
              Welcome back
            </h1>
            <p className="text-gray-500 font-medium text-sm">
              Sign in to access your account and continue shopping.
            </p>
          </div>

          {/* Global API error */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-4 mb-6 text-sm text-red-600 font-medium flex items-start gap-2 animate-[fadeIn_0.2s_ease]">
              <span className="mt-0.5">⚠️</span>
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">

            {/* Email */}
            <div>
              <label className="text-[10px] uppercase font-bold tracking-widest text-gray-500 block mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                <input
                  id="login-email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className={`w-full pl-11 pr-4 py-4 rounded-2xl border text-sm font-medium outline-none transition-all bg-white
                    ${fieldErrors.email
                      ? 'border-red-400 focus:ring-2 focus:ring-red-200'
                      : 'border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
                    }`}
                />
              </div>
              {fieldErrors.email && (
                <p className="text-red-500 text-xs font-medium mt-1.5 ml-1">{fieldErrors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-[10px] uppercase font-bold tracking-widest text-gray-500">
                  Password
                </label>
                <Link to="/forgot-password" className="text-[11px] font-bold text-[#032b82] hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  autoComplete="current-password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={`w-full pl-11 pr-12 py-4 rounded-2xl border text-sm font-medium outline-none transition-all bg-white
                    ${fieldErrors.password
                      ? 'border-red-400 focus:ring-2 focus:ring-red-200'
                      : 'border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
                    }`}
                />
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={() => setShowPassword(v => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {fieldErrors.password && (
                <p className="text-red-500 text-xs font-medium mt-1.5 ml-1">{fieldErrors.password}</p>
              )}
            </div>

            {/* Submit */}
            <button
              id="login-submit"
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 bg-[#032b82] text-white font-bold py-4 rounded-full
                         shadow-lg shadow-blue-900/20 hover:bg-blue-900 active:scale-[0.98] transition-all mt-2
                         disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Signing in…
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          {/* Register link */}
          <p className="text-sm text-center text-gray-500 font-medium mt-8">
            Don't have an account?{' '}
            <Link to="/register" className="text-[#032b82] font-bold hover:underline">
              Create one
            </Link>
          </p>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
