'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { HomeGalleryItem, defaultHomepageContent } from '@/data/homepageContent';

interface GalleryProps {
  items?: HomeGalleryItem[];
}

export function Gallery({ items }: GalleryProps) {
  const galleryList = items && items.length > 0 ? items : defaultHomepageContent.home_gallery;
  const [page, setPage] = useState(0);
  const totalPages = Math.max(1, Math.ceil(galleryList.length / 4));

  const move = (dir: number) => {
    setPage((prev) => (prev + dir + totalPages) % totalPages);
  };

  return (
    <section id="gallery" className="relative bg-[#0d0d0b] px-4 py-14 text-white sm:px-6 sm:py-16 lg:px-6 lg:py-12 xl:px-8 font-sans">
      <div className="mx-auto flex max-w-[1360px] flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-4 xl:gap-6">
        {/* Desktop Left Navigation Button */}
        <button
          type="button"
          aria-label="Previous gallery images"
          onClick={() => move(-1)}
          className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#c49a4a]/50 text-[#c49a4a] transition hover:border-[#c49a4a] hover:bg-[#c49a4a]/10 hover:scale-105 active:scale-95 lg:flex"
        >
          <ChevronLeft size={18} />
        </button>

        {/* Text Block */}
        <div className="shrink-0 lg:w-[250px] xl:w-[280px]">
          <h2 className="font-serif text-3xl leading-[1.12] text-white sm:text-4xl lg:text-[38px] xl:text-[42px]">
            A Glimpse Of<br />Our Goodness
          </h2>
          <Link
            href="/gallery"
            className="mt-6 inline-flex rounded-full bg-[#b89047] px-7 py-3 text-xs sm:text-[12.5px] font-bold tracking-[.16em] text-[#171513] shadow-md transition hover:bg-[#a67e35]"
          >
            VIEW GALLERY
          </Link>
        </div>

        {/* Images Carousel Container */}
        <div className="flex min-w-0 flex-1 items-center gap-3">
          {/* Mobile Left Navigation Button */}
          <button
            type="button"
            aria-label="Previous gallery images"
            onClick={() => move(-1)}
            className="shrink-0 text-[#c49a4a] transition hover:scale-110 lg:hidden"
          >
            <ChevronLeft size={22} />
          </button>

          {/* Gallery Images Slice */}
          <div className="grid min-w-0 flex-1 grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 lg:gap-3 xl:gap-3.5">
            {galleryList.slice(page * 4, page * 4 + 4).map((item, idx) => (
              <div
                key={`${item.image}-${page}-${idx}`}
                className="group relative aspect-square overflow-hidden rounded-xl border border-[#c49a4a]/50 bg-[#171512] shadow-[0_6px_20px_rgba(0,0,0,0.4)] transition-all duration-300"
              >
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 220px"
                  priority={page === 0}
                />
              </div>
            ))}
          </div>

          {/* Mobile Right Navigation Button */}
          <button
            type="button"
            aria-label="Next gallery images"
            onClick={() => move(1)}
            className="shrink-0 text-[#c49a4a] transition hover:scale-110 lg:hidden"
          >
            <ChevronRight size={22} />
          </button>
        </div>

        {/* Desktop Right Navigation Button */}
        <button
          type="button"
          aria-label="Next gallery images"
          onClick={() => move(1)}
          className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#c49a4a]/50 text-[#c49a4a] transition hover:border-[#c49a4a] hover:bg-[#c49a4a]/10 hover:scale-105 active:scale-95 lg:flex"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </section>
  );
}
