import React from 'react';
import { Linkedin, Github, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-16 px-[5%] border-t border-white/5 bg-dark">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-black text-gradient font-header mb-2 tracking-tighter">TB.</h2>
          <p className="text-white/30 text-xs uppercase font-bold tracking-widest">Video Editor | Motion Designer | Colorist</p>
        </div>

        <div className="flex gap-8">
          <a href="#home" className="text-[10px] uppercase font-black tracking-[0.2em] text-white/50 hover:text-secondary transition-colors">Home</a>
          <a href="#about" className="text-[10px] uppercase font-black tracking-[0.2em] text-white/50 hover:text-secondary transition-colors">About</a>
          <a href="#portfolio" className="text-[10px] uppercase font-black tracking-[0.2em] text-white/50 hover:text-secondary transition-colors">Work</a>
          <a href="#contact" className="text-[10px] uppercase font-black tracking-[0.2em] text-white/50 hover:text-secondary transition-colors">Contact</a>
        </div>

        <div className="flex gap-6">
          <a href="https://www.linkedin.com/in/tushar-badgujar-1738a2384/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile" className="text-white/30 hover:text-secondary transition-colors"><Linkedin size={18} /></a>
          <a href="https://github.com/badgujartushar190-lab/" target="_blank" rel="noopener noreferrer" aria-label="GitHub profile" className="text-white/30 hover:text-secondary transition-colors"><Github size={18} /></a>
          <a href="https://www.instagram.com/tushar_badgujar402?igsh=MTVlM3doZ2syNG5pMQ==" target="_blank" rel="noopener noreferrer" aria-label="Instagram profile" className="text-white/30 hover:text-secondary transition-colors"><Instagram size={18} /></a>
        </div>
      </div>
      
      <div className="mt-16 pt-8 border-t border-white/5 text-center">
        <p className="text-[10px] uppercase font-bold tracking-[0.3em] text-white/20">
          © 2025 Tushar Badgujar. All Rights Reserved. | Created with Cinematic Intent.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
