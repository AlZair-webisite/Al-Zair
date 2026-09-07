'use client';

import { ArrowRight, KeyRound, Lock, Mail, ShieldAlert, Sparkles } from 'lucide-react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useState } from 'react';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTarget = searchParams.get('from') || '/admin';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Invalid admin credentials');
      }

      if (typeof window !== 'undefined' && data.user) {
        localStorage.setItem('alzair_admin_session', JSON.stringify(data.user));
      }

      // Hard redirect to ensure fresh cookies load instantly
      window.location.href = redirectTarget;
    } catch (err: any) {
      setErrorMsg(err?.message || 'Invalid admin email or password.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemo = () => {
    setEmail('admin@alzair.com');
    setPassword('admin@alzair2024');
  };

  return (
    <div className="min-h-screen bg-[#0a0908] text-white flex flex-col justify-center items-center px-4 relative overflow-hidden font-sans">
      {/* Background Decorative Gold Ambient Glows */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#c49a4a]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#c49a4a]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-md">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center mb-5">
            <Image
              src="/images/logo.png"
              alt="Al Zair"
              width={340}
              height={110}
              className="h-20 w-auto object-contain drop-shadow-[0_4px_18px_rgba(0,0,0,0.7)]"
              priority
            />
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#c49a4a]/30 bg-[#c49a4a]/10 text-[#d6b15e] text-[11px] font-bold tracking-widest uppercase">
            <KeyRound size={12} />
            <span>Admin Management Portal</span>
          </div>
          <h1 className="mt-3 font-serif text-2xl sm:text-3xl text-white font-normal">
            Welcome Back
          </h1>
          <p className="mt-1 text-xs text-white/60">
            Sign in to manage catalog, orders, and system settings.
          </p>
        </div>

        {/* Login Card */}
        <div className="rounded-2xl border border-white/10 bg-[#12110e]/90 p-7 sm:p-8 shadow-2xl backdrop-blur-xl">
          {errorMsg && (
            <div className="mb-5 flex items-start gap-2.5 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3.5 text-xs text-rose-300">
              <ShieldAlert size={16} className="shrink-0 text-rose-400 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email Field */}
            <div>
              <label className="block text-xs font-semibold text-white/80 uppercase tracking-wider mb-1.5">
                Admin Email
              </label>
              <div className="relative flex items-center">
                <Mail size={16} className="absolute left-3.5 text-[#c49a4a]" />
                <input
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@alzair.com"
                  className="w-full rounded-xl border border-white/15 bg-white/5 py-3 pl-10 pr-4 text-xs text-white placeholder:text-white/30 outline-none transition focus:border-[#c49a4a] focus:bg-white/10 focus:ring-1 focus:ring-[#c49a4a]"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-semibold text-white/80 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative flex items-center">
                <Lock size={16} className="absolute left-3.5 text-[#c49a4a]" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full rounded-xl border border-white/15 bg-white/5 py-3 pl-10 pr-4 text-xs text-white placeholder:text-white/30 outline-none transition focus:border-[#c49a4a] focus:bg-white/10 focus:ring-1 focus:ring-[#c49a4a]"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#b89047] py-3.5 text-xs font-bold tracking-widest text-[#171513] uppercase shadow-lg shadow-[#b89047]/20 transition duration-300 hover:bg-[#c9a154] active:scale-[0.98] disabled:opacity-50"
            >
              {loading ? (
                <span>Signing In...</span>
              ) : (
                <>
                  <span>Sign In To Admin</span>
                  <ArrowRight size={15} />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Credentials helper */}
          <div className="mt-6 pt-5 border-t border-white/10 text-center">
            <p className="text-[11px] text-white/50 mb-2">Need admin credentials?</p>
            <button
              type="button"
              onClick={handleQuickDemo}
              className="inline-flex items-center gap-1.5 text-xs text-[#d6b15e] hover:text-[#e4c274] transition font-medium"
            >
              <Sparkles size={13} />
              <span>Fill Admin Credentials</span>
            </button>
          </div>
        </div>

        {/* Footer info */}
        <p className="mt-8 text-center text-[11px] text-white/40">
          © 2024 Alzair. Custom Next.js Admin Backend.
        </p>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0a0908] flex items-center justify-center text-[#d6b15e]">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#d6b15e] border-t-transparent" />
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
