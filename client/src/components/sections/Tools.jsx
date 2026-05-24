import React from 'react';
import { motion } from 'framer-motion';

const Tools = () => {
  const tools = [
    {
      name: 'CapCut',
      level: 'EXPERT',
      logoBg: '#111111',
      logo: (
        <svg width="42" height="42" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g transform="translate(50, 50)">
            {/* Tilted Rounded Rect 1 */}
            <rect x="-32" y="-10" width="64" height="20" rx="10" transform="rotate(-45)" fill="white" />
            {/* Tilted Rounded Rect 2 with dark cut out for interlocking scissor look */}
            <rect x="-32" y="-10" width="64" height="20" rx="10" transform="rotate(45)" fill="white" stroke="#111111" stroke-width="5" />
          </g>
        </svg>
      )
    },
    {
      name: 'After Effects',
      level: 'EXPERT',
      logoBg: '#1a1fc4',
      logo: (
        <svg width="44" height="44" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="6" y="6" width="88" height="88" rx="14" stroke="#90A4FC" stroke-width="5" />
          <text 
            x="50" 
            y="66" 
            fontFamily="'Inter', system-ui, -apple-system, sans-serif" 
            fontWeight="900" 
            fontSize="44" 
            fill="#D3C2FF" 
            textAnchor="middle" 
            letterSpacing="-0.03em"
          >
            Ae
          </text>
        </svg>
      )
    },
    {
      name: 'DaVinci Resolve',
      level: 'ADVANCED',
      logoBg: '#1c2333',
      logo: (
        <svg width="46" height="46" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="cyanOrb" cx="50%" cy="35%" r="25%">
              <stop offset="0%" stopColor="#00FFFF" stopOpacity="1" />
              <stop offset="60%" stopColor="#00D8FF" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#00D8FF" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="greenOrb" cx="35%" cy="61%" r="25%">
              <stop offset="0%" stopColor="#7CFF01" stopOpacity="1" />
              <stop offset="60%" stopColor="#6BD500" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#6BD500" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="redOrb" cx="65%" cy="61%" r="25%">
              <stop offset="0%" stopColor="#FF006B" stopOpacity="1" />
              <stop offset="60%" stopColor="#D50059" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#D50059" stopOpacity="0" />
            </radialGradient>
          </defs>
          {/* Overlay orbs representing the three DaVinci primary wheels */}
          <circle cx="50" cy="35" r="22" fill="url(#cyanOrb)" />
          <circle cx="35" cy="61" r="22" fill="url(#greenOrb)" />
          <circle cx="65" cy="61" r="22" fill="url(#redOrb)" />
          {/* Core dark center hub */}
          <circle cx="50" cy="52" r="8" fill="#1c2333" />
        </svg>
      )
    },
    {
      name: 'Premiere Pro',
      level: 'EXPERT',
      logoBg: '#000066',
      logo: (
        <svg width="44" height="44" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="6" y="6" width="88" height="88" rx="14" stroke="#D3C2FF" stroke-width="5" />
          <text 
            x="50" 
            y="66" 
            fontFamily="'Inter', system-ui, -apple-system, sans-serif" 
            fontWeight="900" 
            fontSize="44" 
            fill="#E6C5FF" 
            textAnchor="middle" 
            letterSpacing="-0.03em"
          >
            Pr
          </text>
        </svg>
      )
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
  };

  return (
    <section id="tools" className="bg-[#0d0d0d] py-24 px-4 md:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-secondary font-bold tracking-[0.2em] uppercase text-xs mb-3 block">
            Software Capabilities
          </span>
          <h2 
            className="text-4xl md:text-5xl font-black mb-4 uppercase leading-tight tracking-tight text-white"
            style={{ fontFamily: "'Rajdhani', sans-serif" }}
          >
            SOFTWARE <span className="text-gradient">ARSENAL</span>
          </h2>
          <p className="text-white/40 max-w-md mx-auto text-sm">
            Top-tier production tools utilized to craft premium, cinematic visual experiences.
          </p>
        </div>

        {/* 4 Cards Grid - collapes to 2 cols on mobile, 4 cols on large screens */}
        <motion.div 
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full justify-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {tools.map((tool, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ y: -3 }}
              className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-[14px] p-8 flex flex-col items-center justify-center gap-6 transition-all duration-300 hover:border-[#444444] w-full shadow-2xl"
            >
              {/* Logo Box (80x80px with 18px border radius) */}
              <div 
                className="w-20 h-20 rounded-[18px] flex items-center justify-center transition-all duration-300"
                style={{ backgroundColor: tool.logoBg }}
              >
                {tool.logo}
              </div>

              {/* Software Details */}
              <div className="text-center flex flex-col gap-1.5">
                {/* Software Name: Bold, Uppercase, letter-spacing 0.12em, #e8e8e8, Rajdhani Font */}
                <h3 
                  className="font-bold text-base uppercase tracking-[0.12em] text-[#e8e8e8]"
                  style={{ fontFamily: "'Rajdhani', sans-serif" }}
                >
                  {tool.name}
                </h3>
                {/* Skill Level: uppercase, size 10px, letter-spacing 0.18em, #666666 */}
                <span className="text-[10px] text-[#666666] uppercase font-bold tracking-[0.18em]">
                  {tool.level}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Tools;
