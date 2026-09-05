'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';

const testimonials = [
  {
    name: 'Ayesha Khan',
    quote: 'The quality of dates is exceptional. Fresh, soft and so delicious! Will definitely order again.',
    initials: 'AK',
  },
  {
    name: 'Rizwan Ali',
    quote: "Best dates laddu I've ever had. Perfect taste and very healthy. Highly recommended!",
    initials: 'RA',
  },
  {
    name: 'Sara Ahmed',
    quote: 'Premium quality and hygienic packing. You can truly taste the difference in every single date.',
    initials: 'SA',
  },
  {
    name: 'Fatima Zahra',
    quote: 'Luxury packaging and authentic Arabian taste. Perfect for gifting on festivals and celebrations.',
    initials: 'FZ',
  },
  {
    name: 'Mohammad Tariq',
    quote: 'The stuffed dates are out of this world. Crunchy nuts and juicy sweet dates.',
    initials: 'MT',
  },
  {
    name: 'Zainab Noor',
    quote: 'Ordered gift packs for the whole family. Beautiful presentation and supreme freshness!',
    initials: 'ZN',
  },
];

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const total = testimonials.length;

  const move = (dir: number) => {
    setIndex((prev) => (prev + dir + total) % total);
  };

  // On desktop (md:), display 3 cards:
  const desktopCards = [0, 1, 2].map((offset) => testimonials[(index + offset) % total]);
  // On mobile (< md:), display exactly 1 card:
  const mobileCard = testimonials[index];

  return (
    <section id="testimonials" className="bg-[#f6f1e8] px-4 py-14 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-[1100px] text-center">
        <SectionHeading eyebrow="Testimonials" title="Loved By Our Customers" fontFamily="sans" />

        <div className="mt-8 flex items-center justify-center gap-2.5 sm:mt-10 sm:gap-4">
          {/* Previous Button */}
          <button
            type="button"
            aria-label="Previous testimonial"
            onClick={() => move(-1)}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#c49a4a]/60 bg-white/60 text-[#c49a4a] shadow-sm transition hover:border-[#c49a4a] hover:bg-[#c49a4a]/10 active:scale-95 cursor-pointer"
          >
            <ChevronLeft size={20} />
          </button>

          {/* Mobile View: Exactly ONE Card shown at a time */}
          <div className="w-full max-w-[340px] md:hidden">
            <article
              key={`${mobileCard.name}-${index}`}
              className="flex min-h-[220px] flex-col justify-between rounded-xl border border-[#e4d9c7] bg-[#ffffff] px-6 py-7 text-left shadow-[0_4px_18px_rgba(72,53,35,0.06)] transition-all duration-300 animate-in fade-in zoom-in-95"
            >
              <div>
                <div className="mb-3 text-xs tracking-[0.2em] text-[#c49a4a]">★★★★★</div>
                <p className="font-sans text-[14px] leading-6 text-[#36322d]">&quot;{mobileCard.quote}&quot;</p>
              </div>
              <div className="mt-6 flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#76543d] text-[10px] font-bold text-white">
                  {mobileCard.initials}
                </span>
                <span className="font-sans text-xs font-semibold text-[#1a1714]">{mobileCard.name}</span>
              </div>
            </article>
          </div>

          {/* Desktop View (md: and up): 3 Cards shown side by side */}
          <div className="hidden flex-1 gap-5 md:grid md:grid-cols-3">
            {desktopCards.map((t, offset) => (
              <article
                key={`${t.name}-${index}-${offset}`}
                className="flex flex-col justify-between rounded-xl border border-[#e4d9c7] bg-[#ffffff] px-6 py-7 text-left shadow-[0_4px_18px_rgba(72,53,35,0.06)] transition-all duration-300 hover:shadow-[0_8px_24px_rgba(72,53,35,0.12)]"
              >
                <div>
                  <div className="mb-3 text-xs tracking-[0.2em] text-[#c49a4a]">★★★★★</div>
                  <p className="font-sans text-[14px] leading-6 text-[#36322d]">&quot;{t.quote}&quot;</p>
                </div>
                <div className="mt-6 flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#76543d] text-[10px] font-bold text-white">
                    {t.initials}
                  </span>
                  <span className="font-sans text-xs font-semibold text-[#1a1714]">{t.name}</span>
                </div>
              </article>
            ))}
          </div>

          {/* Next Button */}
          <button
            type="button"
            aria-label="Next testimonial"
            onClick={() => move(1)}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#c49a4a]/60 bg-white/60 text-[#c49a4a] shadow-sm transition hover:border-[#c49a4a] hover:bg-[#c49a4a]/10 active:scale-95 cursor-pointer"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Indicator Dots */}
        <div className="mt-7 flex justify-center gap-1.5 sm:mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Show testimonial ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                i === index ? 'w-6 bg-[#b89047]' : 'w-2 bg-[#d6cbba] hover:bg-[#c49a4a]/70'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
