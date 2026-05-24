import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Video, Layers, Heart, X } from 'lucide-react';

// ─── Hardcoded Google Drive video IDs (always works, no server needed) ────────
const VIDEO_EDITING_VIDEOS = [
  { id: 1, title: 'VIDEO EDITING PROJECT 1', fileId: '1Xneaas4g10V6kMBXBIIdOc6Iko07rnyJ', label: 'VIDEO EDITING' },
  { id: 2, title: 'VIDEO EDITING PROJECT 2', fileId: '1CGIpTgKU4i2vjfKjDdirFR4IFjn7hSAw', label: 'VIDEO EDITING' },
  { id: 3, title: 'VIDEO EDITING PROJECT 3', fileId: '1qbY7etnac0FYsen_JRpall88TLJ2O7FQ', label: 'VIDEO EDITING' },
  { id: 4, title: 'VIDEO EDITING PROJECT 4', fileId: '17MVZToPti7SEec2Zm1oYlGEHk7jXcFdj', label: 'VIDEO EDITING' },
  { id: 5, title: 'VIDEO EDITING PROJECT 5', fileId: '128k2vqPaGn_NxQU_nmMZruGdS-KCMFJf', label: 'VIDEO EDITING' },
  { id: 6, title: 'VIDEO EDITING PROJECT 6', fileId: '19VPmjmmnGhbXKIfpLPh80hvY2Y0wsQnz', label: 'VIDEO EDITING' },
  { id: 7, title: 'VIDEO EDITING PROJECT 7', fileId: '1XbfFRFewnqLYYjlvi6djx15DcOz8abiT', label: 'VIDEO EDITING' },
  { id: 8, title: 'VIDEO EDITING PROJECT 8', fileId: '1Ae3fG9qAnMxqZt4o7Iy_5ldWD8QpgxuJ', label: 'VIDEO EDITING' },
  { id: 9, title: 'VIDEO EDITING PROJECT 9', fileId: '1tHxeOzX9sBUrJL5KlUa-Tv8lO_ygzFhH', label: 'VIDEO EDITING' },
  { id: 10, title: 'VIDEO EDITING PROJECT 10', fileId: '1RFDyllcMzXyPAYRbj4b6mIPHnkxb34el', label: 'VIDEO EDITING' },
];

// ─── Motion Graphics Placeholder Videos ────────────────────────────────────────
const MOTION_GRAPHICS_VIDEOS = [
  { id: 1, title: 'MOTION GRAPHICS PROJECT 1', fileId: '1nyt0l1c8VYOHg_jQln_Z6I9kL3whWBs9', label: 'MOTION GRAPHICS' },
  { id: 2, title: 'MOTION GRAPHICS PROJECT 2', fileId: '1PX9TQByHn97NQgNUgJwqYLqtJTGlrfYP', label: 'MOTION GRAPHICS' },
  { id: 3, title: 'MOTION GRAPHICS PROJECT 3', fileId: '1n_Rj8xl1LCF-9DWaLDoQ__DWc35RHCN9', label: 'MOTION GRAPHICS' },
  { id: 4, title: 'MOTION GRAPHICS PROJECT 4', fileId: '17H8JqhVSAa_iwu0ysGpvYefa3tTnD5nP', label: 'MOTION GRAPHICS' }
];

const MARRIAGE_EDITING_VIDEOS = [
  { id: 1, title: 'MARRIAGE EDITING PROJECT 1', fileId: '15JWBeVLVfcJvCfnlXUc9qntUAxBB7eHT', label: 'MARRIAGE EDITING' },
  { id: 2, title: 'MARRIAGE EDITING PROJECT 2', fileId: '1CaNPaKuFTWAn7th55gHSUs-qhom4DbcZ', label: 'MARRIAGE EDITING' },
  { id: 3, title: 'MARRIAGE EDITING PROJECT 3', fileId: '1ognVG7pbeFWierDr794RMdmMeFj_S3V2', label: 'MARRIAGE EDITING' },
  { id: 4, title: 'MARRIAGE EDITING PROJECT 4', fileId: '1lJDzkxB54dpoZneoNFEOaeRK55HsNblY', label: 'MARRIAGE EDITING' },
  { id: 5, title: 'MARRIAGE EDITING PROJECT 5', fileId: '1DHPbybx2IAW-PYmlz-B1ycogXXBbbkU8', label: 'MARRIAGE EDITING' },
];

const driveEmbed     = (id) => `https://drive.google.com/file/d/${id}/preview`;

const Services = () => {
  const [activeGallery, setActiveGallery] = useState(null); // 'videoEditing', 'motionGraphics', or 'marriageEditing'
  const [selectedVideo, setSelectedVideo] = useState(null);

  // ESC key handler and body scroll lock
  useEffect(() => {
    if (!activeGallery) {
      document.body.style.overflow = 'auto';
      return;
    }
    
    // Lock body scroll
    document.body.style.overflow = 'hidden';
    
    const onKey = (e) => {
      if (e.key === 'Escape') {
        if (selectedVideo) setSelectedVideo(null);
        else setActiveGallery(null);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = 'auto';
    };
  }, [activeGallery, selectedVideo]);

  const closeGallery = () => {
    setActiveGallery(null);
    setSelectedVideo(null);
  };

  return (
    <section id="services" className="bg-dark/50">
      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.span
            className="text-secondary font-bold tracking-widest uppercase text-xs mb-4 block"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
          >
            What I Offer
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            CORE <span className="text-gradient">SERVICES</span>
          </h2>
          <p className="text-white/40 max-w-2xl mx-auto">
            High-end visual solutions tailored to your unique storytelling needs. From concept to final render.
          </p>
        </div>

        {/* Service Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: 'Video Editing',
              description: 'Professional cutting and pacing for commercials, documentaries, and social media.',
              icon: <Video className="w-8 h-8 text-secondary" />,
              actionText: 'Learn More',
              onClick: () => { setSelectedVideo(null); setActiveGallery('videoEditing'); },
            },
            {
              title: 'Motion Graphics',
              description: 'Dynamic titles, logo animations, and VFX that bring your visuals to life.',
              icon: <Layers className="w-8 h-8 text-secondary" />,
              actionText: 'Learn More',
              onClick: () => { setSelectedVideo(null); setActiveGallery('motionGraphics'); },
            },
            {
              title: 'Marriage Editing',
              description: 'Cinematic wedding films with emotional pacing, elegant cuts, and timeless storytelling.',
              icon: <Heart className="w-8 h-8 text-secondary" />,
              actionText: 'Learn More',
              onClick: () => { setSelectedVideo(null); setActiveGallery('marriageEditing'); },
            },
          ].map((service, idx) => (
            <motion.button
              key={idx}
              type="button"
              onClick={service.onClick}
              className={`glass-card group text-left transition-all duration-300 ease-out flex flex-col h-full ${
                service.onClick
                  ? 'cursor-pointer hover:border-secondary/50 hover:shadow-[0_0_40px_rgba(0,255,229,0.18)]'
                  : 'cursor-default'
              }`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={service.onClick ? { y: -10, scale: 1.02 } : {}}
            >
              <div className="mb-6 group-hover:scale-110 transition-transform duration-500">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold mb-4 group-hover:text-secondary transition-colors">
                {service.title}
              </h3>
              <p className="text-white/50 text-sm leading-relaxed flex-grow">
                {service.description}
              </p>
              {service.actionText && (
                <div className="mt-8 flex items-center text-xs font-bold uppercase tracking-widest text-primary group-hover:text-secondary transition-all duration-300">
                  {service.actionText} <span className="ml-2">→</span>
                </div>
              )}
            </motion.button>
          ))}
        </div>
      </div>

      {/* ── Video Editing Gallery Modal ─────────────────────────────────────── */}
      <AnimatePresence>
        {activeGallery === 'videoEditing' && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8">

            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeGallery}
              className="absolute inset-0 bg-[#050508]/95 backdrop-blur-xl cursor-pointer"
            />

            {/* Modal Shell */}
            <motion.div
              initial={{ opacity: 0, y: 28, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 28, scale: 0.97 }}
              transition={{ type: 'spring', damping: 26, stiffness: 220 }}
              className="relative w-full max-w-7xl h-[90vh] bg-[#050508] rounded-[32px] overflow-hidden border border-[#00FFD1]/30 shadow-[0_0_80px_rgba(0,255,209,0.18)] z-50 flex flex-col"
            >
              {/* Scanlines */}
              <div className="absolute inset-0 pointer-events-none opacity-[0.035] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.4)_50%)] bg-[length:100%_4px] z-0" />
              {/* Ambient orbs */}
              <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#00FFD1]/10 rounded-full blur-[120px] pointer-events-none z-0" />
              <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none z-0" />

              {/* Header */}
              <div className="flex items-center justify-between px-8 py-6 border-b border-[#00FFD1]/10 bg-black/40 backdrop-blur-md relative z-10 flex-shrink-0">
                <div>
                  <p className="text-[#00FFD1] text-[10px] tracking-[0.4em] font-black uppercase mb-1">
                    VIDEO EDITING GALLERY
                  </p>
                  <h3 className="text-2xl md:text-3xl font-black tracking-[0.15em] text-white font-orbitron uppercase relative inline-block">
                    AENIGRAVITY
                    <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00FFD1] to-transparent shadow-[0_0_10px_#00FFD1]" />
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={closeGallery}
                  className="rounded-full border border-[#00FFD1]/20 bg-black/30 p-3 text-white/80 hover:bg-white/10 hover:text-[#00FFD1] hover:border-[#00FFD1]/50 hover:shadow-[0_0_15px_rgba(0,255,209,0.3)] transition-all duration-300"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Video Grid */}
              <div className="flex-1 overflow-y-auto px-8 py-8 relative z-10 scrollbar-thin scrollbar-thumb-[#00FFD1]/20">
                <div className="max-w-6xl mx-auto w-full">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[16px]">
                    {VIDEO_EDITING_VIDEOS.map((video) => (
                      <div
                        key={video.id}
                        onClick={() => setSelectedVideo(video)}
                        className="group bg-[#141414] rounded-[12px] overflow-hidden cursor-pointer transition-all duration-300 border border-transparent hover:border-[#00f5d4]/50 hover:shadow-[0_0_20px_rgba(0,245,212,0.2)]"
                      >
                        {/* Thumbnail Container */}
                        <div className="relative w-full h-[220px] overflow-hidden bg-[#111]">
                          <img 
                            src={`https://drive.google.com/thumbnail?id=${video.fileId}&sz=w800`}
                            alt={video.title}
                            loading="lazy"
                            onError={(e) => { e.target.style.background='#1a1a1a'; e.target.src=''; }}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                          <span className="absolute bottom-[10px] left-[10px] bg-black/85 text-[#00f5d4] text-[9px] tracking-[2px] px-[10px] py-[4px] rounded font-bold z-10" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
                            {video.label}
                          </span>
                          <div className="absolute inset-0 bg-transparent flex items-center justify-center transition-all duration-300 opacity-0 group-hover:bg-black/55 group-hover:opacity-100 z-20">
                            <svg viewBox="0 0 24 24" width="48" height="48" fill="white">
                              <polygon points="5,3 19,12 5,21"/>
                            </svg>
                          </div>
                        </div>

                        {/* Card Info Area */}
                        <div className="px-5 py-5 flex flex-col bg-[#141414]">
                          <span className="text-[#00f5d4] text-[11px] tracking-wider uppercase mb-1.5 font-bold" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
                            {video.label}
                          </span>
                          <h4 className="text-[18px] font-bold text-white uppercase leading-tight" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
                            {video.title}
                          </h4>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Video Player Lightbox */}
              <AnimatePresence>
                {selectedVideo && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/95 z-50 flex flex-col items-center justify-center p-6 md:p-10"
                  >
                    <div className="absolute inset-0 pointer-events-none opacity-[0.035] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.4)_50%)] bg-[length:100%_4px]" />
                    <div className="absolute top-6 left-6 md:left-10 pointer-events-none">
                      <span className="text-[#00FFD1] text-[10px] tracking-[0.4em] font-bold uppercase">
                        AENIGRAVITY THEATER
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSelectedVideo(null)}
                      className="absolute top-6 right-6 md:right-10 rounded-full border border-white/10 bg-white/5 p-3 text-white/80 hover:bg-white/10 hover:text-[#00FFD1] hover:border-[#00FFD1]/50 hover:shadow-[0_0_15px_rgba(0,255,209,0.3)] transition-all duration-300 z-[60]"
                    >
                      <X size={20} />
                    </button>
                    <motion.div
                      initial={{ scale: 0.94, y: 18 }}
                      animate={{ scale: 1, y: 0 }}
                      exit={{ scale: 0.94, y: 18 }}
                      transition={{ type: 'spring', damping: 26, stiffness: 190 }}
                      className="relative w-full max-w-5xl aspect-video rounded-[20px] overflow-hidden border border-[#00FFD1]/30 shadow-[0_0_60px_rgba(0,255,209,0.2)] bg-black"
                    >
                      <iframe
                        className="w-full h-full"
                        src={driveEmbed(selectedVideo.fileId)}
                        title={selectedVideo.title}
                        allow="autoplay; encrypted-media; fullscreen"
                        allowFullScreen
                        frameBorder="0"
                      />
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 12 }}
                      transition={{ delay: 0.15 }}
                      className="w-full max-w-5xl mt-5 px-6 py-4 rounded-[18px] border border-white/10 bg-[#0d0d0d]/80 backdrop-blur-md text-left"
                    >
                      <span className="inline-flex rounded-full bg-[#00FFD1]/15 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-[#00FFD1] font-bold mb-2">
                        {selectedVideo.label}
                      </span>
                      <h3 className="text-lg md:text-2xl font-black tracking-wider text-white uppercase font-orbitron">
                        {selectedVideo.title}
                      </h3>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── Motion Graphics Gallery Modal ─────────────────────────────────────── */}
      {/* Marriage Editing Gallery Modal */}
      <AnimatePresence>
        {activeGallery === 'marriageEditing' && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8">

            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeGallery}
              className="absolute inset-0 bg-black/80 backdrop-blur-xl cursor-pointer"
            />

            {/* Modal Shell */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="relative w-full max-w-7xl h-[90vh] bg-[#0d0d0d] rounded-[32px] overflow-hidden border border-[#00f5d4]/15 shadow-[0_0_80px_rgba(0,245,212,0.15)] z-50 flex flex-col"
            >
              {/* Header */}
              <div className="flex items-start justify-between px-6 py-6 md:px-10 md:py-8 sticky top-0 bg-[#0d0d0d]/90 backdrop-blur-md border-b border-[#00f5d4]/10 z-30 flex-shrink-0">
                <div>
                  <p className="text-[#00f5d4] text-[11px] tracking-[3px] uppercase mb-2 font-bold" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
                    MARRIAGE EDITING GALLERY
                  </p>
                  <div className="relative inline-block">
                    <h3 className="text-[32px] md:text-[42px] font-bold text-white uppercase leading-none" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                      TUSHAR BADGUJAR
                    </h3>
                    <div className="absolute -bottom-2 left-0 right-0 h-[3px] bg-[#00f5d4] shadow-[0_0_15px_#00f5d4]" />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={closeGallery}
                  className="w-[44px] h-[44px] rounded-full bg-[#1a1a1a] flex items-center justify-center text-white hover:bg-[#222] hover:text-[#00f5d4] transition-colors flex-shrink-0 mt-2"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Video Grid */}
              <div className="flex-1 overflow-y-auto px-6 py-8 md:px-10 md:py-10 relative z-10 scrollbar-thin scrollbar-thumb-[#00f5d4]/20">
                <div className="max-w-6xl mx-auto w-full">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[16px]">
                  {MARRIAGE_EDITING_VIDEOS.map((video) => (
                    <div
                      key={video.id}
                      onClick={() => setSelectedVideo(video)}
                      className="group bg-[#141414] rounded-[12px] overflow-hidden cursor-pointer transition-all duration-300 border border-transparent hover:border-[#00f5d4]/50 hover:shadow-[0_0_20px_rgba(0,245,212,0.2)]"
                    >
                      {/* Thumbnail Container */}
                      <div className="relative w-full h-[220px] overflow-hidden bg-[#111]">
                        <img 
                          src={`https://drive.google.com/thumbnail?id=${video.fileId}&sz=w800`}
                          alt={video.title}
                          loading="lazy"
                          onError={(e) => { e.target.style.display = 'none'; }}
                          style={{ width: '100%', height: '220px', objectFit: 'cover', display: 'block' }}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <span className="absolute bottom-[10px] left-[10px] bg-black/85 text-[#00f5d4] text-[9px] tracking-[2px] px-[10px] py-[4px] rounded font-bold z-10" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
                          {video.label}
                        </span>
                        <div className="absolute inset-0 bg-transparent flex items-center justify-center transition-all duration-300 opacity-0 group-hover:bg-black/55 group-hover:opacity-100 z-20">
                          <svg viewBox="0 0 24 24" width="48" height="48" fill="white">
                            <polygon points="5,3 19,12 5,21"/>
                          </svg>
                        </div>
                      </div>

                      {/* Card Info Area */}
                      <div className="px-5 py-5 flex flex-col bg-[#141414]">
                        <span className="text-[#00f5d4] text-[11px] tracking-wider uppercase mb-1.5 font-bold" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
                          {video.label}
                        </span>
                        <h4 className="text-[18px] font-bold text-white uppercase leading-tight" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
                          {video.title}
                        </h4>
                      </div>
                    </div>
                  ))}
                  </div>
                </div>
              </div>
              {/* Video Player Lightbox */}
              <AnimatePresence>
                {selectedVideo && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/95 z-50 flex flex-col items-center justify-center p-6 md:p-10"
                  >
                    <div className="absolute inset-0 pointer-events-none opacity-[0.035] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.4)_50%)] bg-[length:100%_4px]" />
                    <div className="absolute top-6 left-6 md:left-10 pointer-events-none">
                      <span className="text-[#00FFD1] text-[10px] tracking-[0.4em] font-bold uppercase">
                        AENIGRAVITY THEATER
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSelectedVideo(null)}
                      className="absolute top-6 right-6 md:right-10 rounded-full border border-white/10 bg-white/5 p-3 text-white/80 hover:bg-white/10 hover:text-[#00FFD1] hover:border-[#00FFD1]/50 hover:shadow-[0_0_15px_rgba(0,255,209,0.3)] transition-all duration-300 z-[60]"
                    >
                      <X size={20} />
                    </button>
                    <motion.div
                      initial={{ scale: 0.94, y: 18 }}
                      animate={{ scale: 1, y: 0 }}
                      exit={{ scale: 0.94, y: 18 }}
                      transition={{ type: 'spring', damping: 26, stiffness: 190 }}
                      className="relative w-full max-w-5xl aspect-video rounded-[20px] overflow-hidden border border-[#00FFD1]/30 shadow-[0_0_60px_rgba(0,255,209,0.2)] bg-black"
                    >
                      <iframe
                        className="w-full h-full"
                        src={driveEmbed(selectedVideo.fileId)}
                        title={selectedVideo.title}
                        allow="autoplay; encrypted-media; fullscreen"
                        allowFullScreen
                        frameBorder="0"
                      />
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 12 }}
                      transition={{ delay: 0.15 }}
                      className="w-full max-w-5xl mt-5 px-6 py-4 rounded-[18px] border border-white/10 bg-[#0d0d0d]/80 backdrop-blur-md text-left"
                    >
                      <span className="inline-flex rounded-full bg-[#00FFD1]/15 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-[#00FFD1] font-bold mb-2">
                        {selectedVideo.label}
                      </span>
                      <h3 className="text-lg md:text-2xl font-black tracking-wider text-white uppercase font-orbitron">
                        {selectedVideo.title}
                      </h3>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {activeGallery === 'motionGraphics' && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8">

            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeGallery}
              className="absolute inset-0 bg-black/80 backdrop-blur-xl cursor-pointer"
            />

            {/* Modal Shell */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="relative w-full max-w-7xl h-[90vh] bg-[#0d0d0d] rounded-[32px] overflow-hidden border border-[#00f5d4]/15 shadow-[0_0_80px_rgba(0,245,212,0.15)] z-50 flex flex-col"
            >
              {/* Header */}
              <div className="flex items-start justify-between px-6 py-6 md:px-10 md:py-8 sticky top-0 bg-[#0d0d0d]/90 backdrop-blur-md border-b border-[#00f5d4]/10 z-30 flex-shrink-0">
                <div>
                  <p className="text-[#00f5d4] text-[11px] tracking-[3px] uppercase mb-2 font-bold" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
                    MOTION GRAPHICS GALLERY
                  </p>
                  <div className="relative inline-block">
                    <h3 className="text-[32px] md:text-[42px] font-bold text-white uppercase leading-none" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                      TUSHAR BADGUJAR
                    </h3>
                    <div className="absolute -bottom-2 left-0 right-0 h-[3px] bg-[#00f5d4] shadow-[0_0_15px_#00f5d4]" />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={closeGallery}
                  className="w-[44px] h-[44px] rounded-full bg-[#1a1a1a] flex items-center justify-center text-white hover:bg-[#222] hover:text-[#00f5d4] transition-colors flex-shrink-0 mt-2"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Video Grid */}
              <div className="flex-1 overflow-y-auto px-6 py-8 md:px-10 md:py-10 relative z-10 scrollbar-thin scrollbar-thumb-[#00f5d4]/20">
                <div className="max-w-6xl mx-auto w-full">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[16px]">
                  {MOTION_GRAPHICS_VIDEOS.map((video) => (
                    <div
                      key={video.id}
                      onClick={() => setSelectedVideo(video)}
                      className="group bg-[#141414] rounded-[12px] overflow-hidden cursor-pointer transition-all duration-300 border border-transparent hover:border-[#00f5d4]/50 hover:shadow-[0_0_20px_rgba(0,245,212,0.2)]"
                    >
                      {/* Thumbnail Container */}
                      <div className="relative w-full h-[220px] overflow-hidden bg-[#111]">
                        <img 
                          src={`https://drive.google.com/thumbnail?id=${video.fileId}&sz=w800`}
                          alt={video.title}
                          loading="lazy"
                          onError={(e) => { e.target.style.background='#1a1a1a'; e.target.src=''; }}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <span className="absolute bottom-[10px] left-[10px] bg-black/85 text-[#00f5d4] text-[9px] tracking-[2px] px-[10px] py-[4px] rounded font-bold z-10" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
                          {video.label}
                        </span>
                        <div className="absolute inset-0 bg-transparent flex items-center justify-center transition-all duration-300 opacity-0 group-hover:bg-black/55 group-hover:opacity-100 z-20">
                          <svg viewBox="0 0 24 24" width="48" height="48" fill="white">
                            <polygon points="5,3 19,12 5,21"/>
                          </svg>
                        </div>
                      </div>

                      {/* Card Info Area */}
                      <div className="px-5 py-5 flex flex-col bg-[#141414]">
                        <span className="text-[#00f5d4] text-[11px] tracking-wider uppercase mb-1.5 font-bold" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
                          {video.label}
                        </span>
                        <h4 className="text-[18px] font-bold text-white uppercase leading-tight" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
                          {video.title}
                        </h4>
                      </div>
                    </div>
                  ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Lightbox for Selected Video */}
            <AnimatePresence>
              {selectedVideo && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/95 z-[99999] flex flex-col items-center justify-center"
                >
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); setSelectedVideo(null); }}
                    className="absolute top-6 right-6 md:top-10 md:right-10 w-[44px] h-[44px] rounded-full bg-[#1a1a1a] flex items-center justify-center text-white hover:bg-[#222] hover:text-[#00f5d4] transition-colors z-50"
                  >
                    <X size={24} />
                  </button>
                  <div className="w-full max-w-[1200px] aspect-video px-4 md:px-10">
                    <iframe
                      className="w-full h-full rounded-[8px]"
                      src={`https://drive.google.com/file/d/${selectedVideo.fileId}/preview`}
                      title={selectedVideo.title}
                      allow="autoplay; encrypted-media; fullscreen"
                      allowFullScreen
                      frameBorder="0"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Services;
