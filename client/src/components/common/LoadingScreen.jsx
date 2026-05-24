import React from 'react';
import { motion } from 'framer-motion';

const LoadingScreen = () => {
  return (
    <motion.div
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-dark"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
    >
      <div className="text-center">
        <motion.h1 
          className="text-4xl md:text-6xl font-black text-gradient"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          TUSHAR
        </motion.h1>
        <motion.div 
          className="h-1 bg-primary mt-4"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
        <motion.p 
          className="text-white/50 tracking-[0.5em] mt-4 uppercase text-xs"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          Loading Experience
        </motion.p>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
