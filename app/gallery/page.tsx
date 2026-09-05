import { GalleryGrid } from '@/components/gallery/GalleryGrid';
import { GalleryHero } from '@/components/gallery/GalleryHero';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';

export const metadata = {
  title: 'Gallery | Syab Dates Dry Fruits',
  description: 'Explore the visual journey and rich collection of premium Arabian dates, date creations, and luxury gift packaging from Syab Dates.',
};

export default function GalleryPage() {
  return (
    <main className="overflow-hidden bg-[#f5f0e7] text-[#171513]">
      <Header />
      <GalleryHero />
      <GalleryGrid />
      <Footer />
    </main>
  );
}
