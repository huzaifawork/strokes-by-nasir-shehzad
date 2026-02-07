import Header from '@/components/public/Header';
import Hero from '@/components/public/Hero';
import About from '@/components/public/About';
import Gallery from '@/components/public/Gallery';
import Exhibitions from '@/components/public/Exhibitions';
import Residencies from '@/components/public/Residencies';
import Contact from '@/components/public/Contact';
import Footer from '@/components/public/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <About />
      <Gallery />
      <Exhibitions />
      <Residencies />
      <Contact />
      <Footer />
    </>
  );
}
