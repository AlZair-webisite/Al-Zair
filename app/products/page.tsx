import { ProductsGrid } from '@/components/products/ProductsGrid';
import { ProductsHero } from '@/components/products/ProductsHero';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';

export const metadata = {
  title: 'All Products | Syab Dates Dry Fruits',
  description: 'Shop our full collection of premium Arabian dates, stuffed dates, date laddus, date bites, and luxury gift packs from Syab Dates.',
};

export default function ProductsPage() {
  return (
    <main className="overflow-hidden bg-[#f5f0e7] text-[#171513]">
      <Header />
      <ProductsHero />
      <ProductsGrid />
      <Footer />
    </main>
  );
}
