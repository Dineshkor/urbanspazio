import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import DesignPhilosophySection from '@/components/DesignPhilosophySection';
import PortfolioSection from '@/components/PortfolioSection';
import ProcessSection from '@/components/ProcessSection';
import ConsultationSection from '@/components/ConsultationSection';
import PackageSection from '@/components/PackageSection';
import BrandStorySection from '@/components/BrandStorySection';
import TestimonialSection from '@/components/TestimonialSection';
import FaqSection from '@/components/FaqSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        {/* ── Hero: Full-screen cinematic intro ── */}
        <HeroSection />

        {/* ── Services: What we offer ── */}
        <ServicesSection />

        {/* ── Design Philosophy: 4 theme showcase (dark section) ── */}
        <DesignPhilosophySection />

        {/* ── Portfolio: Bento grid of our work ── */}
        <PortfolioSection />

        {/* ── Process: How we work (stone bg) ── */}
        <ProcessSection />

        {/* ── Consultation: Multi-step booking form (dark section) ── */}
        <ConsultationSection />

        {/* ── Packages: Investment tiers (stone bg) ── */}
        <PackageSection />

        {/* ── Brand Story: About us ── */}
        <BrandStorySection />

        {/* ── Testimonials: Client quotes ── */}
        <TestimonialSection />

        {/* ── FAQ: Common questions ── */}
        <FaqSection />

        {/* ── Contact: Form + info (stone bg) ── */}
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
