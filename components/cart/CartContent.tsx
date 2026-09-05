'use client';

import { ArrowRight, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';

export function CartContent() {
  const { cart, removeFromCart, updateQuantity, clearCart, subtotal } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');

  const shipping = subtotal > 999 || subtotal === 0 ? 0 : 99;
  const total = Math.max(0, subtotal - discount + shipping);

  const applyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    setPromoSuccess('');

    if (promoCode.trim().toUpperCase() === 'SYAB10') {
      const disc = Math.round(subtotal * 0.1);
      setDiscount(disc);
      setPromoSuccess('Promo code SYAB10 applied! (10% OFF)');
    } else if (promoCode.trim().toUpperCase() === 'FIRST50') {
      setDiscount(50);
      setPromoSuccess('Promo code FIRST50 applied! (₹50 OFF)');
    } else {
      setPromoError('Invalid coupon code. Try SYAB10');
    }
  };

  // EMPTY STATE MATCHING SCREENSHOT EXACTLY
  if (cart.length === 0) {
    return (
      <section className="bg-[#f5f0e7] px-5 py-20 text-[#171513]">
        <div className="mx-auto max-w-[900px]">
          <div className="rounded-2xl border border-[#dccbb4] bg-[#ede5d8]/75 p-12 sm:p-16 text-center shadow-[0_8px_30px_rgba(72,53,35,0.06)]">
            {/* Bag Icon in frame */}
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-[#c49a4a]/50 bg-white/70 text-[#a9823b] shadow-sm">
              <ShoppingBag size={24} strokeWidth={1.5} />
            </div>

            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#1a1714] font-sans">
              Your cart is empty
            </h2>

            <p className="mt-2.5 text-sm sm:text-[15px] text-[#5e5850] font-sans max-w-md mx-auto">
              Browse our collection and find something you love.
            </p>

            <div className="mt-8">
              <Link
                href="/#products"
                className="inline-flex items-center gap-2 rounded-full bg-[#b89047] px-8 py-3.5 text-xs font-bold tracking-widest text-[#171513] shadow-[0_4px_16px_rgba(184,144,71,0.25)] transition duration-300 hover:bg-[#a67e35] hover:shadow-[0_6px_22px_rgba(184,144,71,0.35)]"
              >
                START SHOPPING <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // POPULATED CART STATE
  return (
    <section className="bg-[#f5f0e7] px-5 py-16 sm:py-20 text-[#171513]">
      <div className="mx-auto max-w-[1240px]">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:gap-12 items-start">
          {/* Left: Cart Items List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-[#dccbb4] pb-4">
              <h2 className="text-lg font-bold text-[#1a1714] font-sans">
                Cart Items ({cart.length})
              </h2>
              <button
                onClick={clearCart}
                className="text-xs font-semibold text-rose-600 hover:text-rose-700 transition font-sans"
              >
                Clear Cart
              </button>
            </div>

            <div className="divide-y divide-[#ebdcca]">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-5"
                >
                  <div className="flex items-center gap-4">
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-[#c49a4a]/40 bg-[#171512] shadow-sm">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-[#1a1714] font-sans">
                        {item.name}
                      </h3>
                      {item.weight && (
                        <p className="text-xs text-[#5e5850] font-sans">
                          {item.weight}
                        </p>
                      )}
                      <p className="mt-1 text-sm font-bold text-[#a9823b] font-sans">
                        ₹{item.price.toLocaleString('en-IN')}
                      </p>
                    </div>
                  </div>

                  {/* Quantity & Actions */}
                  <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                    {/* Stepper */}
                    <div className="flex items-center rounded-lg border border-[#d5c7b3] bg-white shadow-sm">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-2 text-[#554e44] hover:text-[#1a1714] transition"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-8 text-center text-xs font-bold text-[#1a1714]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-2 text-[#554e44] hover:text-[#1a1714] transition"
                        aria-label="Increase quantity"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    <div className="text-right min-w-[80px]">
                      <p className="text-sm font-bold text-[#1a1714] font-sans">
                        ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                      </p>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-rose-500 hover:text-rose-700 transition p-1.5"
                      aria-label="Remove item"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <Link
                href="/#products"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#a9823b] hover:text-[#8a6828] transition font-sans"
              >
                ← Continue Shopping
              </Link>
            </div>
          </div>

          {/* Right: Order Summary Card */}
          <div className="rounded-2xl border border-[#dccbb4] bg-[#ede5d8]/80 p-7 sm:p-8 shadow-[0_10px_30px_rgba(72,53,35,0.06)]">
            <h3 className="text-xl font-bold tracking-tight text-[#1a1714] font-sans border-b border-[#ebdcca] pb-4">
              Order Summary
            </h3>

            <div className="mt-5 space-y-3.5 text-sm font-sans">
              <div className="flex justify-between text-[#5e5850]">
                <span>Subtotal</span>
                <span className="font-semibold text-[#1a1714]">
                  ₹{subtotal.toLocaleString('en-IN')}
                </span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>Discount</span>
                  <span className="font-semibold">-₹{discount.toLocaleString('en-IN')}</span>
                </div>
              )}

              <div className="flex justify-between text-[#5e5850]">
                <span>Shipping</span>
                <span className="font-semibold text-[#1a1714]">
                  {shipping === 0 ? (
                    <span className="text-emerald-700 font-bold">FREE</span>
                  ) : (
                    `₹${shipping}`
                  )}
                </span>
              </div>

              {subtotal < 999 && (
                <p className="text-[11px] text-[#8c7e6c]">
                  Add ₹{(999 - subtotal).toLocaleString('en-IN')} more for free delivery!
                </p>
              )}

              <div className="border-t border-[#ebdcca] pt-4">
                <div className="flex justify-between text-base font-bold text-[#1a1714]">
                  <span>Total Amount</span>
                  <span className="text-[#a9823b] text-lg font-bold">
                    ₹{total.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </div>

            {/* Promo Code Form */}
            <form onSubmit={applyPromo} className="mt-6">
              <label className="block text-[10px] font-bold uppercase tracking-[.18em] text-[#554e44]">
                Coupon Code
              </label>
              <div className="mt-1.5 flex gap-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="e.g. SYAB10"
                  className="w-full rounded-md border border-[#d5c7b3] bg-white px-3.5 py-2 text-xs text-[#1a1714] uppercase outline-none focus:border-[#a9823b]"
                />
                <button
                  type="submit"
                  className="rounded-md bg-[#171513] px-4 py-2 text-[11px] font-bold tracking-wider text-white hover:bg-[#a9823b] transition shrink-0"
                >
                  APPLY
                </button>
              </div>
              {promoSuccess && (
                <p className="mt-1.5 text-[11px] font-medium text-emerald-700">
                  {promoSuccess}
                </p>
              )}
              {promoError && (
                <p className="mt-1.5 text-[11px] font-medium text-rose-600">
                  {promoError}
                </p>
              )}
            </form>

            {/* Checkout Button */}
            <div className="mt-6">
              <button
                type="button"
                onClick={() =>
                  alert('Thank you for choosing Syab Dates! Checkout gateway is initializing.')
                }
                className="w-full flex items-center justify-center gap-2 rounded-full bg-[#b89047] py-3.5 text-xs font-bold tracking-widest text-[#171513] shadow-[0_4px_16px_rgba(184,144,71,0.25)] transition duration-300 hover:bg-[#a67e35] hover:shadow-[0_6px_22px_rgba(184,144,71,0.35)] active:scale-[0.99]"
              >
                PROCEED TO CHECKOUT <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
