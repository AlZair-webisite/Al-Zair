'use client';

import { ChevronDown, Menu, Search, ShoppingBag, UserRound, X } from 'lucide-react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';

const productCategories = [
  'Dates',
  'Dates Laddu',
  'Stuffed Dates',
  'Date Bites',
  'Gift Packs',
];

export function Header() {
  const pathname = usePathname();
  const { totalItems } = useCart();
  const isAbout = pathname === '/about' || pathname === '/about-us';
  const isContact = pathname === '/contact' || pathname === '/contact-us';
  const isGallery = pathname === '/gallery';
  const isProducts = pathname === '/products';
  const isHome = !isAbout && !isContact && !isGallery && !isProducts && pathname !== '/cart';

  const [open, setOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="absolute inset-x-0 top-0 z-30 border-b border-white/10 bg-black/20 text-white backdrop-blur-[2px]">
      <div className="mx-auto flex h-[74px] max-w-[1240px] items-center justify-between px-5 lg:px-8">
        {/* Brand Logo */}
        <a href="/" className="flex items-center" aria-label="Syab Dates home">
          <Image
            src="/images/logo.png"
            alt="Syab Dates Dry Fruits"
            width={240}
            height={76}
            className="h-8 w-auto object-contain sm:h-9"
            priority
          />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-7 text-[13.5px] font-medium tracking-wide lg:flex">
          <a
            href="/"
            className={`transition-colors ${
              isHome ? 'text-[#d6b15e] hover:text-[#e4c274]' : 'text-white/90 hover:text-[#d6b15e]'
            }`}
          >
            Home
          </a>

          {/* Products Dropdown (Desktop) */}
          <div className="group relative py-4">
            <a
              href="/products"
              className={`flex items-center gap-1.5 transition-colors ${
                isProducts ? 'text-[#d6b15e] hover:text-[#e4c274]' : 'text-white/90 hover:text-[#d6b15e]'
              }`}
            >
              Products
              <ChevronDown size={13} className="text-[#c49a4a] transition-transform duration-200 group-hover:rotate-180" />
            </a>

            {/* Dropdown Menu */}
            <div className="invisible absolute left-0 top-full -mt-1 w-48 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 z-50">
              <div className="rounded-lg border border-[#c49a4a]/40 bg-[#0d0d0b]/95 p-2 shadow-2xl backdrop-blur-md">
                <a
                  href="/products"
                  className="block rounded-md px-3 py-2 text-xs font-bold text-white/95 transition-colors hover:bg-[#c49a4a]/15 hover:text-[#d6b15e]"
                >
                  All Products
                </a>
                <div className="my-1 border-t border-white/10" />
                {productCategories.map((item) => (
                  <a
                    key={item}
                    href={`/products?category=${encodeURIComponent(item)}`}
                    className="block rounded-md px-3 py-1.5 text-xs text-white/85 transition-colors hover:bg-[#c49a4a]/15 hover:text-[#d6b15e]"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <a
            href="/about"
            className={`transition-colors ${
              isAbout ? 'text-[#d6b15e] hover:text-[#e4c274]' : 'text-white/90 hover:text-[#d6b15e]'
            }`}
          >
            About Us
          </a>
          <a
            href="/gallery"
            className={`transition-colors ${
              isGallery ? 'text-[#d6b15e] hover:text-[#e4c274]' : 'text-white/90 hover:text-[#d6b15e]'
            }`}
          >
            Gallery
          </a>
          <a
            href="/contact"
            className={`transition-colors ${
              isContact ? 'text-[#d6b15e] hover:text-[#e4c274]' : 'text-white/90 hover:text-[#d6b15e]'
            }`}
          >
            Contact
          </a>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <button
            aria-label="Search"
            onClick={() => setSearchOpen(!searchOpen)}
            className="text-white/90 transition-colors hover:text-[#d6b15e]"
          >
            <Search size={16} />
          </button>
          <a
            href="#account"
            aria-label="Account"
            className="hidden text-white/90 transition-colors hover:text-[#d6b15e] sm:block"
          >
            <UserRound size={16} />
          </a>
          <a
            href="/cart"
            aria-label="Shopping Cart"
            className="relative text-white/90 transition-colors hover:text-[#d6b15e]"
          >
            <ShoppingBag size={17} />
            {totalItems > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#b89047] text-[9px] font-bold text-[#171513] shadow-sm animate-in zoom-in-75">
                {totalItems}
              </span>
            )}
          </a>
          <button
            aria-label="Open menu"
            className="text-white/90 transition-colors hover:text-[#d6b15e] lg:hidden"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Search Bar Dropdown */}
      {searchOpen && (
        <div className="border-t border-white/10 bg-[#0d0d0b] px-5 py-3">
          <div className="mx-auto flex max-w-[1240px] items-center gap-3">
            <Search size={16} className="text-[#c49a4a]" />
            <input
              autoFocus
              placeholder="Search our collection..."
              className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/40"
            />
          </div>
        </div>
      )}

      {/* Mobile Menu with Products Dropdown */}
      {open && (
        <nav className="border-t border-white/10 bg-[#0d0d0b]/98 px-6 py-5 lg:hidden backdrop-blur-md">
          <div className="flex flex-col gap-4 text-[15px] font-medium">
            <a
              href="/"
              onClick={() => setOpen(false)}
              className={`transition-colors ${
                isHome ? 'text-[#d6b15e]' : 'text-white/90 hover:text-[#d6b15e]'
              }`}
            >
              Home
            </a>

            {/* Mobile Products Dropdown Accordion */}
            <div>
              <button
                type="button"
                onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                className={`flex w-full items-center justify-between py-1 text-left transition-colors ${
                  isProducts ? 'text-[#d6b15e]' : 'text-white/90 hover:text-[#d6b15e]'
                }`}
              >
                <span>Products</span>
                <ChevronDown
                  size={16}
                  className={`text-[#c49a4a] transition-transform duration-200 ${
                    mobileProductsOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {mobileProductsOpen && (
                <div className="mt-2.5 flex flex-col gap-2 rounded-lg border border-white/10 bg-white/5 py-2.5 pl-4 pr-3 text-sm">
                  <a
                    href="/products"
                    onClick={() => {
                      setMobileProductsOpen(false);
                      setOpen(false);
                    }}
                    className="py-1 font-bold text-white/95 transition-colors hover:text-[#d6b15e]"
                  >
                    All Products
                  </a>
                  <div className="my-0.5 border-t border-white/10" />
                  {productCategories.map((cat) => (
                    <a
                      key={cat}
                      href={`/products?category=${encodeURIComponent(cat)}`}
                      onClick={() => {
                        setMobileProductsOpen(false);
                        setOpen(false);
                      }}
                      className="py-1 text-white/80 transition-colors hover:text-[#d6b15e]"
                    >
                      {cat}
                    </a>
                  ))}
                </div>
              )}
            </div>

            <a
              href="/about"
              onClick={() => setOpen(false)}
              className={`transition-colors ${
                isAbout ? 'text-[#d6b15e]' : 'text-white/90 hover:text-[#d6b15e]'
              }`}
            >
              About Us
            </a>

            <a
              href="/gallery"
              onClick={() => setOpen(false)}
              className={`transition-colors ${
                isGallery ? 'text-[#d6b15e]' : 'text-white/90 hover:text-[#d6b15e]'
              }`}
            >
              Gallery
            </a>
            <a
              href="/contact"
              onClick={() => setOpen(false)}
              className={`transition-colors ${
                isContact ? 'text-[#d6b15e]' : 'text-white/90 hover:text-[#d6b15e]'
              }`}
            >
              Contact
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
