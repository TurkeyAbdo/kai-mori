'use client';
import Hero from '@/components/Sections/Hero';
import About from '@/components/Sections/About';
import Services from '@/components/Sections/Services';
import Process from '@/components/Sections/Process';
import Portfolio from '@/components/Sections/Portfolio';
import Testimonials from '@/components/Sections/Testimonials';
import Journal from '@/components/Sections/Journal';
import Contact from '@/components/Sections/Contact';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Process />
      <Portfolio />
      <Testimonials />
      <Journal />
      <Contact />
    </>
  );
}
