import React from 'react';
import { Download, FileText, Star, Briefcase, GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';

const Resume = () => {
  const experiences = [
    { year: '2023 - Present', role: 'Senior Video Editor', company: 'Gravity Media Lab', desc: 'Leading post-production for high-tier YouTube creators and brands.' },
    { year: '2021 - 2023', role: 'Social Media Editor', company: 'Digital Pulse', desc: 'Crafted viral reels and shorts with over 10M+ combined views.' },
  ];

  return (
    <div className="container">
      <div className="section-header">
        <h2 className="text-gradient">Experience</h2>
      </div>

      <div className="resume-content">
        <div className="timeline">
          {experiences.map((exp, index) => (
            <motion.div 
              key={index}
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: -30 }}
              transition={{ delay: index * 0.2 }}
              className="timeline-item glass-card"
            >
              <div className="time-badge">{exp.year}</div>
              <h3>{exp.role}</h3>
              <p className="company">{exp.company}</p>
              <p className="desc">{exp.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="resume-download glass-card">
          <FileText size={50} color="var(--primary-color)" />
          <h3>Ready to work?</h3>
          <p>Download my full CV for more details on my professional journey.</p>
          <a href="#" className="btn-primary" download>
            <Download size={18} style={{ marginRight: '8px' }} />
            Download Resume
          </a>
        </div>
      </div>

      <style jsx>{`
        .resume-content {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 2rem;
          margin-top: 3rem;
        }

        .timeline {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .timeline-item {
          position: relative;
          padding-left: 2rem;
          border-left: 2px solid var(--primary-color);
        }

        .time-badge {
          background: var(--primary-color);
          color: white;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 700;
          display: inline-block;
          margin-bottom: 10px;
        }

        .company {
          color: var(--secondary-color);
          font-weight: 600;
          margin-bottom: 10px;
        }

        .desc {
          color: var(--text-dim);
          font-size: 0.95rem;
        }

        .resume-download {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          gap: 1.5rem;
        }

        @media (max-width: 992px) {
          .resume-content {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default Resume;
