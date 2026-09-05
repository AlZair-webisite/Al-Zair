import { ContactHero } from '@/components/contact/ContactHero';
import { ContactMap } from '@/components/contact/ContactMap';
import { ContactSection } from '@/components/contact/ContactSection';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';

export const metadata = {
  title: 'Contact Us | Syab Dates Dry Fruits',
  description: 'Reach out to Syab Dates for inquiries, product questions, custom orders, or customer support. We are here to help.',
};

export default function ContactPage() {
  return (
    <main className="overflow-hidden bg-[#f5f0e7] text-[#171513]">
      <Header />
      <ContactHero />
      <ContactSection />
      <ContactMap />
      <Footer />
    </main>
  );
}
