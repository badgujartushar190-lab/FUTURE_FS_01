import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <div className="hero-container container">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="hero-content"
      >
        <h1 className="glitch hero-title" data-text="Tushar Badgujar">
          Tushar Badgujar
        </h1>
        <p className="hero-tagline">
          Defy the Ordinary. <span className="text-gradient">Edit the Impossible.</span>
        </p>
        
        <div className="hero-cta">
          <a href="#portfolio" className="btn-primary">View My Work</a>
        </div>
      </motion.div>

      <style jsx>{`
        .hero-container {
          text-align: center;
          height: 80vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .hero-title {
          font-size: 5rem;
          margin-bottom: 1rem;
          font-weight: 900;
          text-transform: uppercase;
        }

        .hero-tagline {
          font-size: 1.5rem;
          color: var(--text-dim);
          margin-bottom: 1.5rem;
          letter-spacing: 1px;
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.5rem;
          }
          .hero-tagline {
            font-size: 1.1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Hero;
