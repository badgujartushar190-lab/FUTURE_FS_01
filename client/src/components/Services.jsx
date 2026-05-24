import React from 'react';
import { motion } from 'framer-motion';
import { Video, Film, Palette, Zap, Heart, Megaphone } from 'lucide-react';

const Services = () => {
  const services = [
    { title: 'Video Editing', icon: <Video />, desc: 'High-end post-production for all platforms.' },
    { title: 'Reels & Shorts', icon: <Zap />, desc: 'Engaging vertical content with viral potential.' },
    { title: 'Color Grading', icon: <Palette />, desc: 'Cinematic looks that set the mood and tone.' },
    { title: 'Motion Graphics', icon: <Film />, desc: 'Dynamic text and visual elements.' },
    { title: 'Marriage Editing', icon: <Heart />, desc: 'Cinematic wedding films with elegant cuts and timeless storytelling.' },
    { title: 'Promotional Videos', icon: <Megaphone />, desc: 'High-impact ads for brands and products.' },
  ];

  return (
    <div className="container">
      <div className="section-header">
        <h2 className="text-gradient">Services</h2>
        <p style={{ color: 'var(--text-dim)', marginTop: '10px' }}>Elevating your vision through premium post-production.</p>
      </div>

      <div className="services-grid">
        {services.map((service, index) => (
          <motion.div 
            key={service.title}
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 30 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            className="service-card glass-card"
          >
            <div className="service-icon">{service.icon}</div>
            <h3>{service.title}</h3>
            <p>{service.desc}</p>
          </motion.div>
        ))}
      </div>

      <style jsx>{`
        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          margin-top: 3rem;
        }

        .service-card {
          text-align: center;
        }

        .service-icon {
          width: 60px;
          height: 60px;
          background: rgba(139, 0, 255, 0.1);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.5rem;
          color: var(--secondary-color);
          border: 1px solid rgba(139, 0, 255, 0.2);
        }

        .service-card h3 {
          margin-bottom: 1rem;
          font-size: 1.2rem;
        }

        .service-card p {
          color: var(--text-dim);
          font-size: 0.95rem;
        }
      `}</style>
    </div>
  );
};

export default Services;
