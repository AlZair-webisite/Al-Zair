'use client';

import { CheckCircle2, ShoppingBag, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export function ToastContainer() {
  const { toasts, removeToast } = useCart();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-[9999] flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-center justify-between gap-3 rounded-xl border border-[#c49a4a]/70 bg-[#14120f]/95 p-3.5 shadow-[0_12px_36px_rgba(0,0,0,0.6)] backdrop-blur-md transition-all duration-300 animate-in slide-in-from-bottom-3"
        >
          <div className="flex items-center gap-3">
            {toast.productImage ? (
              <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg border border-[#c49a4a]/40 bg-[#1f1b16]">
                <Image
                  src={toast.productImage}
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#b89047] text-[#171513]">
                <CheckCircle2 size={18} strokeWidth={2.5} />
              </div>
            )}

            <div>
              {toast.productName && (
                <p className="text-xs font-bold text-white leading-tight font-sans">
                  {toast.productName}
                </p>
              )}
              <p className="text-[11px] font-medium text-[#c49a4a] leading-tight mt-0.5 font-sans">
                {toast.message}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Link
              href="/cart"
              className="flex items-center gap-1 rounded-md bg-[#b89047] px-2.5 py-1 text-[10px] font-bold tracking-wider text-[#171513] hover:bg-[#a67e35] transition"
            >
              <ShoppingBag size={11} />
              <span>VIEW</span>
            </Link>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-white/60 hover:text-white transition p-1"
              aria-label="Close notification"
            >
              <X size={14} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
