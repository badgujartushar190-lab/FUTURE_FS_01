import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, ExternalLink } from 'lucide-react';

const Portfolio = () => {
  const [filter, setFilter] = useState('All');

  const projects = [
    { id: 1, category: 'Reels', title: 'Street Style Cinematic', video: 'https://assets.mixkit.co/videos/preview/mixkit-girl-in-neon-city-4006-large.mp4', thumbnail: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&q=80' },
    { id: 2, category: 'YouTube', title: 'Tech Review Intro', video: 'https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-a-circuit-board-14115-large.mp4', thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80' },
    { id: 3, category: 'Motion Graphics', title: 'Logo Animation', video: 'https://assets.mixkit.co/videos/preview/mixkit-abstract-modern-loop-of-glowing-shapes-22709-large.mp4', thumbnail: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&q=80' },
    { id: 4, category: 'Photo', title: 'Cyberpunk Edit', video: '', thumbnail: 'https://images.unsplash.com/photo-1510511459019-5dee997ddfdf?w=800&q=80' },
    { id: 5, category: 'Reels', title: 'Travel Vlog Opener', video: 'https://assets.mixkit.co/videos/preview/mixkit-landscape-of-a-mountain-at-sunset-1065-large.mp4', thumbnail: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80' },
    { id: 6, category: 'YouTube', title: 'Gaming Montage', video: 'https://assets.mixkit.co/videos/preview/mixkit-gaming-setup-with-neon-lights-27901-large.mp4', thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80' },
  ];

  const filteredProjects = filter === 'All' ? projects : projects.filter(p => p.category === filter);

  return (
    <div className="container">
      <div className="section-header">
        <h2 className="text-gradient">Portfolio</h2>
        <div className="filter-tabs">
          {['All', 'Reels', 'YouTube', 'Photo', 'Motion Graphics'].map(tab => (
            <button 
              key={tab}
              onClick={() => setFilter(tab)}
              className={filter === tab ? 'active' : ''}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="portfolio-grid">
        <AnimatePresence mode='popLayout'>
          {filteredProjects.map((project) => (
            <motion.div
              layout
              key={project.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="portfolio-item glass-card"
            >
              <div className="portfolio-preview">
                <img src={project.thumbnail} alt={project.title} />
                {project.video && (
                  <video 
                    src={project.video} 
                    loop 
                    muted 
                    playsInline 
                    className="hover-video"
                    onMouseEnter={(e) => e.target.play()}
                    onMouseLeave={(e) => { e.target.pause(); e.target.currentTime = 0; }}
                  />
                )}
                <div className="overlay">
                  <Play size={40} className="play-icon" />
                </div>
              </div>
              <div className="portfolio-info">
                <span className="category">{project.category}</span>
                <h3>{project.title}</h3>
                <ExternalLink size={20} className="link-icon" />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <style jsx>{`
        .filter-tabs {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          margin-top: 1.5rem;
        }

        .filter-tabs button {
          background: transparent;
          border: 1px solid var(--glass-border);
          color: var(--text-dim);
          padding: 0.5rem 1.5rem;
          border-radius: 30px;
          cursor: pointer;
          font-family: var(--font-header);
          font-size: 0.8rem;
          transition: var(--transition-smooth);
        }

        .filter-tabs button.active, .filter-tabs button:hover {
          border-color: var(--secondary-color);
          color: var(--secondary-color);
          background: rgba(0, 255, 229, 0.05);
        }

        .portfolio-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 2rem;
          margin-top: 3rem;
        }

        .portfolio-item {
          padding: 0;
          overflow: hidden;
          cursor: pointer;
        }

        .portfolio-preview {
          position: relative;
          aspect-ratio: 16/9;
          overflow: hidden;
        }

        .portfolio-preview img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: var(--transition-smooth);
        }

        .hover-video {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .portfolio-preview:hover .hover-video {
          opacity: 1;
        }

        .overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: var(--transition-smooth);
        }

        .portfolio-preview:hover .overlay {
          opacity: 1;
        }

        .play-icon {
          color: var(--secondary-color);
          filter: drop-shadow(0 0 10px var(--secondary-color));
        }

        .portfolio-info {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          position: relative;
        }

        .category {
          font-size: 0.7rem;
          color: var(--primary-color);
          font-weight: 700;
          text-transform: uppercase;
          margin-bottom: 5px;
        }

        .link-icon {
          position: absolute;
          right: 1.5rem;
          bottom: 1.5rem;
          color: var(--text-dim);
          transition: var(--transition-smooth);
        }

        .portfolio-item:hover .link-icon {
          color: var(--secondary-color);
          transform: rotate(-45deg);
        }
      `}</style>
    </div>
  );
};

export default Portfolio;
