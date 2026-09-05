import { CartContent } from '@/components/cart/CartContent';
import { CartHero } from '@/components/cart/CartHero';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';

export const metadata = {
  title: 'Shopping Cart | Syab Dates Dry Fruits',
  description: 'View your selected premium dates, laddus, bites, and luxury gift packs in your shopping cart.',
};

export default function CartPage() {
  return (
    <main className="overflow-hidden bg-[#f5f0e7] text-[#171513]">
      <Header />
      <CartHero />
      <CartContent />
      <Footer />
    </main>
  );
}
