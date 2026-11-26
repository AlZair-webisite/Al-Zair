'use client';

import { useEffect, useState } from 'react';
import { DEFAULT_GALLERY_VIDEOS, GalleryVideo } from '@/data/galleryVideos';
import { images } from '@/data/products';
import { ResponsiveVideo } from '@/components/gallery/ResponsiveVideo';

export function GalleryVideoSection() {
  const [videos, setVideos] = useState(DEFAULT_GALLERY_VIDEOS);

  useEffect(() => {
    let active = true;

    const loadVideos = async () => {
      try {
        const response = await fetch('/api/gallery-videos', { cache: 'no-store' });
        const result = await response.json();
        if (response.ok && result.success && Array.isArray(result.data) && active) {
          setVideos(result.data as GalleryVideo[]);
        }
      } catch {
        // Keep the included videos available if the gallery API is unreachable.
      }
    };

    void loadVideos();
    return () => {
      active = false;
    };
  }, []);

  const desktopVideo = videos.find((video) => video.variant === 'desktop');
  const mobileVideo = videos.find((video) => video.variant === 'mobile');

  if (!desktopVideo || !mobileVideo) return null;

  return (
    <section
      aria-labelledby="gallery-video-heading"
      className="bg-[#f5f0e7] px-5 pb-12 pt-20 text-[#171513] sm:pb-16 sm:pt-24"
    >
      <div className="mx-auto max-w-[1240px]">
        <h2
          id="gallery-video-heading"
          className="text-center font-serif text-3xl font-semibold tracking-tight sm:text-4xl"
        >
          A Closer Look
        </h2>
        <p className="mx-auto mt-3 max-w-md text-center text-sm leading-relaxed text-[#5a544b]">
          Explore Alzair dates and gift packaging up close.
        </p>
        <div className="relative mx-auto mt-8 aspect-[9/16] w-full max-w-[280px] overflow-hidden rounded-2xl border border-[#c49a4a]/35 bg-[#0d0d0b] shadow-[0_20px_60px_rgba(23,21,19,0.18)] sm:max-w-[320px] lg:aspect-video lg:max-w-[960px]">
          <ResponsiveVideo
            poster={images.hero}
            desktopSrc={desktopVideo.url}
            mobileSrc={mobileVideo.url}
          />
        </div>
      </div>
    </section>
  );
}
