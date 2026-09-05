'use client';

import { ArrowUp, Facebook, Instagram, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import Image from 'next/image';

export function Footer() {
  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="hero-texture bg-[#0a0908] px-5 pb-8 pt-14 text-white sm:px-8 font-sans">
      <div className="mx-auto grid max-w-[1240px] grid-cols-2 gap-x-6 gap-y-10 border-b border-white/10 pb-12 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.1fr_1.4fr] lg:gap-8">
        {/* Brand info */}
        <div className="col-span-2 lg:col-span-1">
          <a href="/" className="mb-4 flex items-center" aria-label="Syab Dates home">
            <Image
              src="/images/logo.png"
              alt="Syab Dates Dry Fruits"
              width={240}
              height={76}
              className="h-8 w-auto object-contain sm:h-9"
            />
          </a>

          <p className="max-w-[240px] text-[13.5px] leading-6 text-white/70">
            We bring you the finest quality dates and date-based products, packed with purity, nutrition and love.
          </p>

          <div className="mt-6 flex items-center gap-3">
            <a
              href="#"
              aria-label="Facebook"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-[#c49a4a]/60 text-[#c49a4a] transition hover:border-[#c49a4a] hover:bg-[#c49a4a]/15"
            >
              <Facebook size={15} />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-[#c49a4a]/60 text-[#c49a4a] transition hover:border-[#c49a4a] hover:bg-[#c49a4a]/15"
            >
              <Instagram size={15} />
            </a>
            <a
              href="#"
              aria-label="WhatsApp"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-[#c49a4a]/60 text-[#c49a4a] transition hover:border-[#c49a4a] hover:bg-[#c49a4a]/15"
            >
              <MessageCircle size={15} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="col-span-1">
          <FooterList
            title="Quick Links"
            items={['Home', 'Products', 'About Us', 'Gallery', 'Contact Us']}
          />
        </div>

        {/* Our Products */}
        <div className="col-span-1">
          <FooterList
            title="Our Products"
            items={['Dates', 'Dates Laddu', 'Stuffed Dates', 'Date Bites', 'Gift Packs']}
          />
        </div>

        {/* Customer Care */}
        <div className="col-span-1">
          <FooterList
            title="Customer Care"
            items={['About Us', 'Shipping & Delivery', 'Return Policy', 'Privacy Policy', 'Terms & Conditions']}
          />
        </div>

        {/* Contact Us */}
        <div className="col-span-1">
          <h3 className="mb-4 text-xs font-bold uppercase tracking-[.18em] text-[#c49a4a]">
            Contact Us
          </h3>
          <div className="space-y-3.5 text-[13.5px] text-white/80">
            <div className="flex items-start gap-2.5">
              <Phone size={15} className="mt-0.5 shrink-0 text-[#c49a4a]" />
              <div>
                <p>+91 7052375313</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <Mail size={15} className="shrink-0 text-[#c49a4a]" />
              <a href="mailto:syabdatesdryfruits@gmail.com" className="break-all transition-colors hover:text-[#c49a4a]">
                syabdatesdryfruits@gmail.com
              </a>
            </div>
            <div className="flex items-start gap-2.5">
              <MapPin size={15} className="mt-0.5 shrink-0 text-[#c49a4a]" />
              <p>Madanpur Khadar,<br />New Delhi - 110076</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright & Back to Top */}
      <div className="mx-auto flex max-w-[1240px] items-center justify-between pt-6 text-[12px] tracking-wide text-white/60">
        <span>© 2024 Syab Dates Dry Fruits. All Rights Reserved.</span>
        <button
          type="button"
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="flex h-8 w-8 items-center justify-center rounded-full bg-[#b89047] text-[#171513] shadow-md transition hover:scale-105 hover:bg-[#a67e35] active:scale-95"
        >
          <ArrowUp size={15} strokeWidth={2.5} />
        </button>
      </div>
    </footer>
  );
}

function FooterList({ title, items }: { title: string; items: string[] }) {
  const getHref = (item: string) => {
    if (item === 'Home') return '/';
    if (item === 'About Us') return '/about';
    if (item === 'Products') return '/products';
    if (['Dates', 'Dates Laddu', 'Stuffed Dates', 'Date Bites', 'Gift Packs'].includes(item)) {
      return `/products?category=${encodeURIComponent(item)}`;
    }
    if (item === 'Gallery') return '/gallery';
    if (item === 'Contact Us' || item === 'Contact') return '/contact';
    if (item === 'Privacy Policy') return '/privacy-policy';
    if (item === 'Benefits') return '/#benefits';
    return `/#${item.toLowerCase().replace(/ & | /g, '-')}`;
  };

  return (
    <div>
      <h3 className="mb-4 text-xs font-bold uppercase tracking-[.18em] text-[#c49a4a]">{title}</h3>
      <ul className="space-y-2.5 text-[13.5px] text-white/75">
        {items.map((item) => (
          <li key={item}>
            <a href={getHref(item)} className="transition-colors hover:text-[#d6b15e]">
              {item}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
