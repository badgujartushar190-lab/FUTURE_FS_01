import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, ExternalLink } from 'lucide-react';

const Portfolio = () => {
  const [filter, setFilter] = useState('All');
  const [activeSingleVideo, setActiveSingleVideo] = useState(null);
  const [activeGallery, setActiveGallery] = useState(null);

  // Close lightboxes on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (activeSingleVideo) {
          setActiveSingleVideo(null);
          if (!activeGallery) {
            document.body.style.overflow = '';
          }
        } else if (activeGallery) {
          setActiveGallery(null);
          document.body.style.overflow = '';
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeSingleVideo, activeGallery]);

  // Clean up body overflow style when component unmounts
  useEffect(() => {
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const categories = ['All', 'Videos', 'Reels', 'Motion'];

  const projects = [
    { 
      id: 1, 
      title: 'Cinematic Travel Reel', 
      category: 'Videos', 
      image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80', 
      tools: ['Premiere', 'After Effects'],
      fileIds: ['1H_g_vdWbvauM1Bhr_51R6n4CBqVDBl3H', '1tuYSZNdlNiNWl37c1viFvjDYfeh730DS', '1e68zTtYzuXtCBoVD6_KWwIJByH7SfCsy']
    },
    { 
      id: 2, 
      title: 'NFT Promo Motion', 
      category: 'Motion', 
      image: 'https://images.unsplash.com/photo-1633167606207-d840b5070fc2?auto=format&fit=crop&q=80', 
      tools: ['Cinema 4D', 'AE'],
      fileIds: ['1hRSyrRhwPb_S4NWXuntw0kC0Xpjp-w52', '1sp9qxTzsVuZ8CzFa1fMKh8z6U3SrlUit']
    },
    { 
      id: 3, 
      title: 'Gaming Montage', 
      category: 'Reels', 
      image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80', 
      tools: ['Premiere'],
      fileIds: ['1E-xGHdsBYBa94UKl6sLv1UrnUrYOMBlA']
    },
    { 
      id: 4, 
      title: 'Music Video Edit', 
      category: 'Videos', 
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&q=80', 
      tools: ['Resolve', 'Premiere'],
      fileIds: ['1pQkjRxI40gBg9xWgSsav9k6vc4DWiw00', '1zVpjbbAEhhsGYZIWFz3BbNgH87tFk5XN', '1SYHh81lAJdvGx8sMyQtqcBEwD6La-2aw']
    },
  ];

  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(p => p.category === filter);

  const handleCardClick = (project) => {
    if (project.fileIds && project.fileIds.length > 0) {
      if (project.fileIds.length === 1) {
        setActiveSingleVideo(project.fileIds[0]);
        document.body.style.overflow = 'hidden';
      } else {
        setActiveGallery({ title: project.title, fileIds: project.fileIds });
        document.body.style.overflow = 'hidden';
      }
    }
  };

  return (
    <section id="portfolio">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <span className="text-secondary font-bold tracking-widest uppercase text-xs mb-4 block">Selected Works</span>
            <h2 className="text-4xl md:text-5xl font-black">PORT<span className="text-gradient">FOLIO</span></h2>
          </div>

          <div className="flex flex-wrap gap-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
                  filter === cat 
                    ? 'bg-primary text-white' 
                    : 'bg-white/5 text-white/50 hover:bg-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <motion.div 
          layout
          className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                onClick={() => handleCardClick(project)}
                className="group relative aspect-[4/5] rounded-2xl overflow-hidden bg-charcoal cursor-pointer"
              >
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0 opacity-50 group-hover:opacity-100"
                />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-dark/80 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="mb-3">
                    <span className="text-secondary text-[10px] font-bold uppercase tracking-[0.2em]">
                      {project.category}
                    </span>
                    <h3 className="text-lg font-black text-white mt-1 uppercase leading-tight">
                      {project.title}
                    </h3>
                  </div>
                  
                  <div className="flex gap-2 mb-5 flex-wrap">
                    {project.tools.map(tool => (
                      <span key={tool} className="text-[9px] px-2 py-1 bg-white/10 rounded uppercase font-bold text-white/70">
                        {tool}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-4">
                    <button className="p-3 bg-primary rounded-full hover:bg-secondary transition-colors text-dark">
                      <Play size={18} fill="currentColor" />
                    </button>
                    <button className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                      <ExternalLink size={18} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox for Single Video */}
      {activeSingleVideo && (
        <div className="lightbox-overlay single-video-lightbox" onClick={(e) => { if (e.target === e.currentTarget) setActiveSingleVideo(null); }}>
          <div className="lightbox-content">
            <button className="lightbox-close" onClick={() => {
              setActiveSingleVideo(null);
              if (!activeGallery) {
                document.body.style.overflow = '';
              }
            }}>✕</button>
            <iframe
              src={`https://drive.google.com/file/d/${activeSingleVideo}/preview`}
              width="100%"
              height="100%"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
              title="Google Drive Video Player"
            ></iframe>
          </div>
        </div>
      )}

      {/* Lightbox for Multiple Videos (mini gallery) */}
      {activeGallery && (
        <div className="lightbox-overlay portfolio-gallery-lightbox" onClick={(e) => { if (e.target === e.currentTarget) setActiveGallery(null); }}>
          <div className="portfolio-gallery-content">
            <div className="portfolio-gallery-header">
              <h2>{activeGallery.title}</h2>
              <button className="lightbox-close-btn" onClick={() => {
                setActiveGallery(null);
                document.body.style.overflow = '';
              }}>✕</button>
            </div>
            <div className="portfolio-gallery-grid">
              {activeGallery.fileIds.map((id, index) => (
                <div key={id} className="pg-card" onClick={() => {
                  setActiveSingleVideo(id);
                }}>
                  <div className="pg-thumb">
                    <img src={`https://drive.google.com/thumbnail?id=${id}&sz=w800`}
                         loading="lazy"
                         onError={(e) => { e.target.style.display='none'; }}
                         style={{ width: '100%', height: '180px', objectFit: 'cover' }}
                         alt={`Project item ${index + 1}`} />
                    <div className="play-overlay">
                      <svg viewBox="0 0 24 24" width="36" height="36" fill="white">
                        <polygon points="5,3 19,12 5,21"/>
                      </svg>
                    </div>
                  </div>
                  <div className="pg-info" style={{ padding: '16px' }}>
                    <span style={{ color: '#00FFE5', fontSize: '10px', letterSpacing: '2px', fontWeight: 'bold' }}>PROJECT {index + 1}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .portfolio-play-btn {
          position: absolute;
          bottom: 16px;
          left: 16px;
          cursor: pointer;
          z-index: 5;
          transition: transform 0.2s ease;
        }
        .portfolio-play-btn:hover {
          transform: scale(1.15);
        }

        /* Lightbox CSS */
        .lightbox-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(5, 5, 8, 0.95);
          backdrop-filter: blur(8px);
          z-index: 150;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .lightbox-content {
          position: relative;
          width: 90vw;
          max-width: 1000px;
          aspect-ratio: 16/9;
          background: #000;
          border: 1px solid rgba(0, 255, 229, 0.3);
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 0 50px rgba(0, 255, 229, 0.25);
        }

        .lightbox-close {
          position: absolute;
          top: 20px;
          right: 20px;
          background: rgba(0, 0, 0, 0.6);
          border: 1px solid rgba(0, 255, 229, 0.3);
          color: #fff;
          font-size: 20px;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 151;
          transition: all 0.2s ease;
        }

        .lightbox-close:hover {
          transform: scale(1.1);
          border-color: #00f5d4;
          color: #00f5d4;
          box-shadow: 0 0 15px rgba(0, 245, 212, 0.4);
        }

        .portfolio-gallery-lightbox {
          z-index: 100;
        }

        .lightbox-close-btn {
          background: none;
          border: none;
          color: #fff;
          font-size: 24px;
          cursor: pointer;
          transition: color 0.2s ease;
        }

        .lightbox-close-btn:hover {
          color: #00FFE5;
        }

        .portfolio-gallery-content {
          background: #0d0d0d;
          width: 90vw;
          max-width: 1100px;
          max-height: 88vh;
          border-radius: 16px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          border: 1px solid rgba(0, 255, 229, 0.15);
          box-shadow: 0 0 40px rgba(0, 255, 229, 0.15);
        }

        .portfolio-gallery-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 28px;
          border-bottom: 1px solid rgba(0,245,212,0.15);
        }

        .portfolio-gallery-header h2 {
          color: #fff;
          font-size: 20px;
          font-weight: 700;
          letter-spacing: 2px;
          margin: 0;
        }

        .portfolio-gallery-grid {
          display: grid;
          grid-template-columns: repeat(1, 1fr);
          gap: 16px;
          padding: 24px;
          overflow-y: auto;
        }

        @media (min-width: 640px) {
          .portfolio-gallery-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 1024px) {
          .portfolio-gallery-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        .pg-card {
          background: #141414;
          border-radius: 10px;
          overflow: hidden;
          cursor: pointer;
          transition: transform 0.2s ease, border-color 0.2s ease;
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .pg-card:hover { 
          transform: scale(1.02);
          border-color: rgba(0, 255, 229, 0.3);
        }

        .pg-thumb {
          position: relative;
          overflow: hidden;
        }

        .pg-thumb .play-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: all 0.3s ease;
        }

        .pg-card:hover .play-overlay {
          background: rgba(0,0,0,0.55);
          opacity: 1;
        }

        .pg-thumb .play-overlay svg {
          transition: transform 0.2s ease;
        }

        .pg-card:hover .play-overlay svg {
          transform: scale(1.2);
        }
      `}</style>
    </section>
  );
};

export default Portfolio;
