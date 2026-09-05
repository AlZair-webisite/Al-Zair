import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { Gallery } from '@/components/home/Gallery';
import { HealthBenefits } from '@/components/home/HealthBenefits';
import { Hero } from '@/components/home/Hero';
import { Newsletter } from '@/components/home/Newsletter';
import { ProductCategories } from '@/components/home/ProductCategories';
import { Testimonials } from '@/components/home/Testimonials';
import { TrustBar } from '@/components/home/TrustBar';
import { WhyChooseUs } from '@/components/home/WhyChooseUs';

export default function Home() {
  return (
    <main className="overflow-hidden bg-[#f5f0e7] text-[#171513]">
      <Header />
      <Hero />
      <TrustBar />
      <ProductCategories />
      <WhyChooseUs />
      <HealthBenefits />
      <Gallery />
      <Testimonials />
      <Newsletter />
      <Footer />
    </main>
  );
}
