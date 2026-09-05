'use client';

import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { galleryImages } from '@/data/products';

const tabs = ['ALL', 'PRODUCTS', 'PACKAGING', 'DATES', 'GIFT PACKS'];

export function GalleryGrid() {
  const [activeTab, setActiveTab] = useState('ALL');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredImages =
    activeTab === 'ALL'
      ? galleryImages
      : galleryImages.filter(
          (img) => img.category?.toUpperCase() === activeTab.toUpperCase()
        );

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredImages.length);
    }
  };

  const prevImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredImages.length) % filteredImages.length);
    }
  };

  return (
    <section className="bg-[#f5f0e7] px-5 py-12 sm:py-16 text-[#171513]">
      <div className="mx-auto max-w-[1240px]">
        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mb-12">
          {tabs.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`rounded-full px-5 py-2 text-[11px] font-bold tracking-[.18em] uppercase transition duration-200 ${
                  isActive
                    ? 'bg-[#b89047] text-[#171513] shadow-[0_4px_14px_rgba(184,144,71,0.3)]'
                    : 'border border-[#dccbb4] bg-white/60 text-[#554e44] hover:border-[#b89047] hover:text-[#171513]'
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* Responsive Grid with Universal Image Fit */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          {filteredImages.map((item, idx) => (
            <div
              key={`${item.image}-${idx}`}
              onClick={() => openLightbox(idx)}
              className="group relative aspect-square w-full cursor-pointer overflow-hidden rounded-xl border border-[#c49a4a]/40 bg-[#171512] shadow-[0_4px_16px_rgba(72,53,35,0.08)] transition duration-300 hover:border-[#c49a4a] hover:shadow-[0_8px_24px_rgba(184,144,71,0.25)] hover:-translate-y-0.5"
            >
              <Image
                src={item.image}
                alt={item.alt}
                fill
                className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && filteredImages[lightboxIndex] && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md">
          {/* Close button */}
          <button
            onClick={closeLightbox}
            aria-label="Close image"
            className="absolute right-5 top-5 z-50 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 transition"
          >
            <X size={24} />
          </button>

          {/* Prev button */}
          <button
            onClick={prevImage}
            aria-label="Previous image"
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 transition"
          >
            <ChevronLeft size={28} />
          </button>

          {/* Next button */}
          <button
            onClick={nextImage}
            aria-label="Next image"
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 transition"
          >
            <ChevronRight size={28} />
          </button>

          {/* Image Container */}
          <div className="relative max-h-[85vh] max-w-[90vw] aspect-square w-[750px] overflow-hidden rounded-2xl border border-[#c49a4a]/40 bg-[#171512]">
            <Image
              src={filteredImages[lightboxIndex].image}
              alt={filteredImages[lightboxIndex].alt}
              fill
              className="object-contain p-2"
              sizes="90vw"
              priority
            />
          </div>
        </div>
      )}
    </section>
  );
}
