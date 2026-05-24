import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote } from 'lucide-react';

const Testimonials = () => {
  const reviews = [
    { name: 'Alex Rivera', role: 'YouTube Creator', text: 'ANTIGRAVITY completely transformed my channel visuals. The transitions are on another level!' },
    { name: 'Sarah Chen', role: 'Marketing Director', text: 'The cinematic color grading added so much value to our product launch. Highly recommended.' },
    { name: 'Jason Storm', role: 'Influencer', text: 'Fast, creative, and professional. The best editor I have worked with so far.' },
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="container">
      <div className="section-header" style={{ textAlign: 'center' }}>
        <h2 className="text-gradient">Client Reviews</h2>
      </div>

      <div className="carousel-container">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="testimonial-card glass-card"
          >
            <Quote size={40} color="var(--secondary-color)" style={{ marginBottom: '1.5rem', opacity: 0.5 }} />
            <p className="review-text">"{reviews[current].text}"</p>
            <div className="client-info">
              <h4>{reviews[current].name}</h4>
              <span>{reviews[current].role}</span>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="carousel-dots">
          {reviews.map((_, i) => (
            <div 
              key={i} 
              className={`dot ${i === current ? 'active' : ''}`}
              onClick={() => setCurrent(i)}
            ></div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .carousel-container {
          max-width: 800px;
          margin: 4rem auto 0;
          position: relative;
        }

        .testimonial-card {
          text-align: center;
          padding: 3rem;
          min-height: 300px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .review-text {
          font-size: 1.5rem;
          font-style: italic;
          color: var(--text-color);
          margin-bottom: 2rem;
          line-height: 1.4;
        }

        .client-info h4 {
          color: var(--secondary-color);
          margin-bottom: 5px;
        }

        .client-info span {
          color: var(--text-dim);
          font-size: 0.85rem;
        }

        .carousel-dots {
          display: flex;
          justify-content: center;
          gap: 10px;
          margin-top: 2rem;
        }

        .dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.2);
          cursor: pointer;
          transition: var(--transition-smooth);
        }

        .dot.active {
          background: var(--secondary-color);
          width: 30px;
          border-radius: 5px;
        }

        @media (max-width: 768px) {
          .review-text {
            font-size: 1.1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Testimonials;
