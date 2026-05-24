import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, Star } from 'lucide-react';

const Testimonials = () => {
  const reviews = [
    {
      name: "Alex Rivera",
      role: "YouTube Creator",
      text: "Tushar's editing style is exactly what my channel needed. The transitions are fluid and the pacing is perfect. He truly understands storytelling through visuals.",
      rating: 5
    },
    {
      name: "Sarah Chen",
      role: "Marketing Director",
      text: "Exceptional color grading! He took our product launch video from standard to premium. Professional, fast, and very responsive to feedback.",
      rating: 5
    },
    {
      name: "Marcus Storm",
      role: "Music Producer",
      text: "The motion graphics he added to our music video were mind-blowing. He has a unique eye for detail that you don't find easily.",
      rating: 5
    }
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % reviews.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="testimonials" className="relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/5 -z-10" />
      
      <div className="max-w-4xl mx-auto text-center px-4">
        <div className="mb-12">
          <Quote className="w-16 h-16 text-primary mx-auto opacity-20" />
        </div>

        <div className="relative h-[350px] md:h-[250px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.8, ease: "anticipate" }}
              className="absolute inset-0"
            >
              <div className="flex justify-center gap-1 mb-6">
                {[...Array(reviews[index].rating)].map((_, i) => (
                  <Star key={i} size={16} fill="var(--secondary-color)" color="var(--secondary-color)" />
                ))}
              </div>
              
              <p className="text-xl md:text-3xl font-medium italic leading-relaxed text-white/90 mb-8">
                "{reviews[index].text}"
              </p>
              
              <div>
                <h4 className="text-lg font-black text-secondary uppercase tracking-widest">{reviews[index].name}</h4>
                <p className="text-xs text-white/40 uppercase font-bold tracking-[0.3em] mt-1">{reviews[index].role}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center gap-4 mt-12">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-1 transition-all duration-500 ${
                i === index ? 'w-12 bg-secondary' : 'w-4 bg-white/20'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
