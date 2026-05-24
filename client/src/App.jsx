import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';

// Common Components
import Navbar from './components/common/Navbar';
import LoadingScreen from './components/common/LoadingScreen';
import { FilmGrain, ScrollProgress, BackToTop } from './components/common/ExtraTouches';

// Sections
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Services from './components/sections/Services';
import Portfolio from './components/sections/Portfolio';
import Tools from './components/sections/Tools';
import Testimonials from './components/sections/Testimonials';
import Contact from './components/sections/Contact';
import Footer from './components/sections/Footer';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-dark min-h-screen">
      <AnimatePresence>
        {loading && <LoadingScreen />}
      </AnimatePresence>

      {!loading && (
        <>
          <FilmGrain />
          <ScrollProgress />
          <BackToTop />
          <Navbar />
          
          <main>
            <Hero />
            <About />
            <Services />
            <Portfolio />
            <Tools />
            <Testimonials />
            <Contact />
          </main>

          <Footer />
        </>
      )}
    </div>
  );
}

export default App;
