import React from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden pt-0">
      {/* Background Overlay for Cinematic Feel */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark/20 via-dark/60 to-dark z-10" />
      
      {/* Placeholder for Video Background */}
      <div className="absolute inset-0 bg-dark z-0">
        <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-30 grayscale" />
      </div>

      <div className="relative z-20 text-center max-w-5xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="inline-block px-4 py-1 mb-6 text-xs font-bold tracking-[0.3em] uppercase border border-secondary/30 rounded-full text-secondary bg-secondary/5">
            Professional Post-Production
          </span>
          
          <h1 className="text-5xl md:text-8xl font-black mb-6 tracking-tighter leading-none">
            TUSHAR <span className="text-gradient">BADGUJAR</span>
          </h1>

          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mb-10 text-white/60 font-header text-sm md:text-lg tracking-widest uppercase">
            <span>Video Editor</span>
            <span className="text-primary">•</span>
            <span>Motion Designer</span>
            <span className="text-primary">•</span>
            <span>Colorist</span>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <motion.a 
              href="#portfolio"
              className="btn-primary flex items-center gap-3 w-full md:w-auto justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Play size={18} fill="currentColor" /> Watch My Reel
            </motion.a>
            <motion.a 
              href="#contact"
              className="btn-outline w-full md:w-auto justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Hire Me
            </motion.a>
          </div>

        </motion.div>
      </div>

      {/* Floating Elements for Depth */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-1">
          <motion.div 
            className="w-1 h-2 bg-secondary rounded-full"
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
