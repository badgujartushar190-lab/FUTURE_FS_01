import React from 'react';
import { motion } from 'framer-motion';
import { Video, Camera, Layers, Zap } from 'lucide-react';

const About = () => {
  const skills = [
    { name: 'After Effects', level: 95, icon: <Layers size={20} /> },
    { name: 'Premiere Pro', level: 90, icon: <Video size={20} /> },
    { name: 'CapCut', level: 85, icon: <Zap size={20} /> },
    { name: 'Alight Motion', level: 80, icon: <Layers size={20} /> },
  ];

  return (
    <div className="container">
      <div className="section-header">
        <h2 className="text-gradient">The Creator</h2>
        <div className="divider"></div>
      </div>

      <div className="about-grid">
        <motion.div 
          whileInView={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: -50 }}
          className="about-text glass-card"
        >
          <h3>About Me</h3>
          <p>
            Professional video and photo editor specializing in social media content, 
            reels, YouTube videos, and promotional projects. I don't just edit; I craft 
            visual experiences that defy gravity.
          </p>
          <p>
            Known for smooth transitions, cinematic color grading, and motion graphics 
            that capture attention instantly.
          </p>
        </motion.div>

        <div className="skills-grid">
          {skills.map((skill, index) => (
            <motion.div 
              key={skill.name}
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              transition={{ delay: index * 0.1 }}
              className="skill-item glass-card"
            >
              <div className="skill-info">
                {skill.icon}
                <span>{skill.name}</span>
                <span className="skill-level">{skill.level}%</span>
              </div>
              <div className="progress-bar">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="progress-fill"
                ></motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .section-header {
          margin-bottom: 3rem;
        }

        .divider {
          width: 60px;
          height: 4px;
          background: var(--accent-gradient);
          margin-top: 0.5rem;
        }

        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          align-items: start;
        }

        .about-text h3 {
          margin-bottom: 1rem;
          color: var(--secondary-color);
        }

        .about-text p {
          margin-bottom: 1.5rem;
          color: var(--text-dim);
        }

        .skills-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
        }

        .skill-item {
          padding: 1rem 1.5rem;
        }

        .skill-info {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 10px;
        }

        .skill-level {
          margin-left: auto;
          font-weight: 700;
          color: var(--secondary-color);
        }

        .progress-bar {
          height: 4px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 2px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          background: var(--accent-gradient);
        }

        @media (max-width: 992px) {
          .about-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default About;
