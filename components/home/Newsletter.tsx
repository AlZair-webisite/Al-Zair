'use client';

import { AlertCircle, CheckCircle2, CircleCheck, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { FormEvent, useState } from 'react';
import { images } from '@/data/products';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const cleanEmail = email.trim();
    if (!cleanEmail) return;

    setLoading(true);
    setErrorMessage('');

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: cleanEmail }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSubscribed(true);
        setToastMessage(data.message || "You're subscribed to Alzair newsletter!");
        setEmail('');
        setTimeout(() => {
          setSubscribed(false);
        }, 6000);
      } else {
        setErrorMessage(data.message || 'Failed to subscribe. Please try again.');
      }
    } catch (err: any) {
      setErrorMessage(err?.message || 'Network error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section id="contact" className="hero-texture border-b border-white/10 bg-[#0d0d0b] px-5 py-10 text-white sm:py-12 font-sans">
        <div className="mx-auto flex max-w-[1240px] flex-col items-center gap-6 lg:flex-row lg:justify-between lg:gap-8">
          {/* Left Image: Bowl of Dates */}
          <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-full border-2 border-[#c49a4a]/70 shadow-[0_8px_25px_rgba(0,0,0,0.7)] sm:h-32 sm:w-32 lg:h-36 lg:w-36">
            <Image
              src={images.footer}
              alt="Premium dates presentation"
              fill
              className="object-cover object-center"
              sizes="150px"
              priority
            />
          </div>

          {/* Center Text */}
          <div className="flex-1 text-center lg:text-left">
            <p className="text-xs sm:text-[13px] font-bold uppercase tracking-[.25em] text-[#a9823b]">
              Stay Connected
            </p>
            <h2 className="mt-1.5 font-sans font-bold tracking-tight text-3xl sm:text-4xl text-white">
              Subscribe To Our Newsletter
            </h2>
            <p className="mt-2 max-w-[480px] text-sm leading-relaxed text-white/75 sm:text-[14.5px]">
              Get the latest updates on new products, festive offers, and health tips straight to your inbox.
            </p>
            {errorMessage && (
              <p className="mt-2 text-xs font-semibold text-rose-400 flex items-center gap-1.5 justify-center lg:justify-start">
                <AlertCircle size={14} />
                <span>{errorMessage}</span>
              </p>
            )}
          </div>

          {/* Right Subscribe Form */}
          <form onSubmit={submit} className="flex w-full max-w-[460px] items-stretch shadow-md">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="min-w-0 flex-1 border border-[#c49a4a]/40 bg-[#14120e] px-4 py-3.5 text-sm text-white outline-none placeholder:text-white/40 focus:border-[#c49a4a]"
            />
            <button
              type="submit"
              disabled={loading}
              className="shrink-0 inline-flex items-center justify-center gap-1.5 bg-[#b89047] px-7 py-3.5 text-xs sm:text-[12.5px] font-bold tracking-[.16em] text-[#171513] transition hover:bg-[#a67e35] disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  <span>SUBSCRIBING...</span>
                </>
              ) : (
                <span>SUBSCRIBE</span>
              )}
            </button>
          </form>
        </div>
      </section>

      {/* Success Notification Toast */}
      {subscribed && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2.5 rounded-xl border border-[#c49a4a] bg-[#171513] px-5 py-3.5 text-xs font-bold text-[#d6b15e] shadow-2xl animate-fadeIn">
          <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
          <span>{toastMessage || "You're on the list!"}</span>
        </div>
      )}
    </>
  );
}
