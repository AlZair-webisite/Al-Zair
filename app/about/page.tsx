import { AboutHero } from '@/components/about/AboutHero';
import { MissionAndPromise } from '@/components/about/MissionAndPromise';
import { OurStory } from '@/components/about/OurStory';
import { QualityAndCta } from '@/components/about/QualityAndCta';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';

export const metadata = {
  title: 'About Us | Alzair Dates & Dry Fruits',
  description: "Learn about Alzair's journey of purity, authentic Arabian taste, and our commitment to bringing nature's finest dates to your table.",
};

export default function AboutPage() {
  return (
    <main className="overflow-hidden bg-[#f5f0e7] text-[#171513]">
      <Header />
      <AboutHero />
      <OurStory />
      <MissionAndPromise />
      <QualityAndCta />
      <Footer />
    </main>
  );
}
