import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, Linkedin, Github, Instagram } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'Video Editing',
    message: ''
  });

  const [status, setStatus] = useState('idle');

  const socials = [
    { icon: <Linkedin size={24} />, link: 'https://www.linkedin.com/in/tushar-badgujar-1738a2384/', label: 'LinkedIn profile', color: 'hover:text-[#0077b5]' },
    { icon: <Github size={24} />, link: 'https://github.com/badgujartushar190-lab/', label: 'GitHub profile', color: 'hover:text-white' },
    { icon: <Instagram size={24} />, link: 'https://www.instagram.com/tushar_badgujar402?igsh=MTVlM3doZ2syNG5pMQ==', label: 'Instagram profile', color: 'hover:text-[#e4405f]' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
      return;
    }

    const subject = encodeURIComponent(`New Project Inquiry - ${formData.projectType} from ${formData.name}`);
    const body = encodeURIComponent(`Hi Tushar,\n\nYou have a new message from your portfolio!\n\n👤 Name: ${formData.name}\n📧 Email: ${formData.email}\n🎯 Project Type: ${formData.projectType}\n\n💬 Message:\n${formData.message}\n\n----\nSent from tusharbadgujar portfolio`);
    
    window.open(`mailto:badgujartushar190@gmail.com?subject=${subject}&body=${body}`);

    setStatus('success');
    setTimeout(() => {
      setFormData({ name: '', email: '', projectType: 'Video Editing', message: '' });
      setStatus('idle');
    }, 1000);
  };

  return (
    <section id="contact" className="py-20 px-4">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-4xl font-black mb-6 uppercase tracking-tighter">Ready to start?</h2>
          <p className="text-white/60 mb-8">Reach out and let's create something extraordinary.</p>
          
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/20 rounded-lg text-primary"><Mail size={24} /></div>
              <div>
                <p className="text-xs uppercase font-bold text-white/40">Email</p>
                <p>badgujartushar190@gmail.com</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/20 rounded-lg text-primary"><Phone size={24} /></div>
              <div>
                <p className="text-xs uppercase font-bold text-white/40">Phone</p>
                <p>+91 79849 09192</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/20 rounded-lg text-primary"><MapPin size={24} /></div>
              <div>
                <p className="text-xs uppercase font-bold text-white/40">Location</p>
                <p>Pravat Patiya, Surat</p>
              </div>
            </div>
          </div>

          <div className="flex gap-6 mt-8">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className={`text-white/40 transition-colors ${social.color}`}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        <div>
          <form className="bg-white/5 p-8 space-y-6 rounded-2xl border border-white/5 shadow-2xl backdrop-blur-xl" onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-6">
              <input 
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary text-white"
                type="text" 
                placeholder="Name" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
              <input 
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary text-white"
                type="email" 
                placeholder="Email" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
            <select 
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary text-white appearance-none"
              value={formData.projectType}
              onChange={(e) => setFormData({...formData, projectType: e.target.value})}
            >
              <option className="bg-dark">Video Editing</option>
              <option className="bg-dark">Color Grading</option>
              <option className="bg-dark">Motion Graphics</option>
            </select>
            <textarea 
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary text-white resize-none"
              placeholder="Message" 
              rows="5"
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
            />
            
            <button type="submit" className="w-full py-4 bg-gradient-to-r from-primary to-secondary rounded-xl font-bold uppercase tracking-widest hover:scale-[1.02] transition-transform flex items-center justify-center gap-2 text-white">
              <Send size={18} /> Send Message
            </button>

            <AnimatePresence>
              {status === 'success' && (
                <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0}} className="text-green-500 text-sm font-bold text-center flex items-center justify-center gap-2">
                  <CheckCircle2 size={16} /> Email client opened! Send the email to reach Tushar 🎬
                </motion.div>
              )}
              {status === 'error' && (
                <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0}} className="text-red-500 text-sm font-bold text-center flex items-center justify-center gap-2">
                  <AlertCircle size={16} /> Please fill all fields
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
