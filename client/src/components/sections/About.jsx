import React from 'react';
import { motion } from 'framer-motion';
import profileImg from '../../assets/profile.jpg';

const About = () => {
  const stats = [
    { label: 'Years Experience', value: '5+' },
    { label: 'Projects Completed', value: '250+' },
    { label: 'Happy Clients', value: '120+' },
    { label: 'Awards Won', value: '12' },
  ];

  const skills = [
    { name: 'Premiere Pro', level: 95 },
    { name: 'After Effects', level: 90 },
    { name: 'DaVinci Resolve', level: 85 },
    { name: 'Photoshop', level: 80 },
  ];

  return (
    <section id="about" className="max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        {/* Profile Image with Cinematic Frame */}
        <motion.div 
          className="relative group"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="absolute -inset-4 border border-primary/30 rounded-2xl group-hover:border-secondary/50 transition-all duration-500" />
          <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-charcoal">
             {/* Profile photo */}
            <div 
              className="w-full h-full bg-cover bg-center" 
              style={{ backgroundImage: `url(${profileImg})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent opacity-60" />
          </div>
          {/* Animated badge */}
          <motion.div 
            className="absolute -bottom-6 -right-6 bg-primary p-6 rounded-2xl shadow-2xl"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <span className="text-3xl font-black block">5+</span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/70">Years Experience</span>
          </motion.div>
        </motion.div>

        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-secondary font-bold tracking-widest uppercase text-xs mb-4 block">The Creator</span>
          <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
            I EDIT THE <span className="text-gradient">IMPOSSIBLE.</span>
          </h2>
          <p className="text-white/60 text-lg mb-8 leading-relaxed">
            I am Tushar Badgujar, a professional video editor and colorist dedicated to crafting visual masterpieces. With over 5 years of experience in high-end post-production, I specialize in transforming raw footage into cinematic stories that captivate audiences.
          </p>

          {/* Animated Counter Stats */}
          <div className="grid grid-cols-2 gap-8 mb-10">
            {stats.map((stat, idx) => (
              <div key={idx}>
                <h3 className="text-3xl font-black text-secondary">{stat.value}</h3>
                <p className="text-white/40 text-xs uppercase font-bold tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Skills Progress */}
          <div className="space-y-6">
            {skills.map((skill, idx) => (
              <div key={idx}>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-bold uppercase tracking-widest">{skill.name}</span>
                  <span className="text-sm text-secondary font-black">{skill.level}%</span>
                </div>
                <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-primary to-secondary"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
