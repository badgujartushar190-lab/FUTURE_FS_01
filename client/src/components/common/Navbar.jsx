import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Work', href: '#portfolio' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-500 px-[5%] py-6 ${
        scrolled ? 'bg-dark/80 backdrop-blur-lg border-b border-white/10 py-4' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <motion.div 
          className="text-xl md:text-2xl font-black text-gradient font-header tracking-tighter"
          whileHover={{ scale: 1.05 }}
        >
          TB.
        </motion.div>

        <div className="hidden md:flex gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-white/70 hover:text-secondary transition-colors uppercase tracking-widest"
            >
              {link.name}
            </a>
          ))}
        </div>

        <motion.a 
          href="#contact"
          className="btn-primary py-2 px-6 text-sm"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Hire Me
        </motion.a>
      </div>
    </nav>
  );
};

export default Navbar;
