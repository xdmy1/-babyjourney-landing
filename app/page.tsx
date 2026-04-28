import ScrollProgress from '@/components/ScrollProgress';
import Hero from '@/components/Hero';
import ProblemSection from '@/components/ProblemSection';
import SolutionSection from '@/components/SolutionSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <main>
        <Hero />
        <ProblemSection />
        <SolutionSection />
        <TestimonialsSection />
        <Footer />
      </main>
    </>
  );
}
