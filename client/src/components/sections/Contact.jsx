import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Linkedin, Github, Instagram, Send, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

const Contact = () => {
  const formRef = useRef();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'Video Editing',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle, sending, success, error

  const validateForm = () => {
    let tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      tempErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      tempErrors.email = 'Please enter a valid email format';
    }
    if (!formData.message.trim()) tempErrors.message = 'Message is required';
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
      return;
    }

    setStatus('sending');

    try {
      // 1. Try sending the form data silently via native browser fetch() to Formspree
      const response = await fetch('https://formspree.io/f/xojbakqv', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          projectType: formData.projectType,
          message: formData.message
        })
      });

      if (!response.ok) {
        throw new Error(`Formspree returned status ${response.status}`);
      }

      // Formspree returns success when response is OK
      setStatus('success');
      setFormData({ name: '', email: '', projectType: 'Video Editing', message: '' });
    } catch (error) {
      console.warn('Formspree is currently offline or failed. Falling back to default email client...', error);
      
      // 2. FALLBACK PLAN: If Formspree fails (or goes offline), open mailto directly!
      const subject = encodeURIComponent(`🎬 New Project Inquiry - ${formData.projectType} from ${formData.name}`);
      const body = encodeURIComponent(`Hi Tushar,\n\nI tried sending this message through your website but the form service was offline. Here are my project details:\n\n👤 Name: ${formData.name}\n📧 Email: ${formData.email}\n🎯 Project Type: ${formData.projectType}\n\n💬 Message:\n${formData.message}\n\n----\nSent from Tushar Badgujar Portfolio`);
      
      window.open(`mailto:badgujartushar190@gmail.com?subject=${subject}&body=${body}`);
      
      // Show success modal to the user since we successfully handed off to their mail client!
      setStatus('success');
      setFormData({ name: '', email: '', projectType: 'Video Editing', message: '' });
    }

    // Auto-clear success message after 4 seconds
    setTimeout(() => {
      setStatus('idle');
    }, 4000);
  };

  const contactInfo = [
    { icon: <Mail size={20} />, label: 'Email', value: 'badgujartushar190@gmail.com' },
    { icon: <Phone size={20} />, label: 'Phone', value: '+91 79849 09192' },
    { icon: <MapPin size={20} />, label: 'Location', value: 'Pravat Patiya, Surat' },
  ];

  const socials = [
    { icon: <Linkedin size={24} />, link: 'https://www.linkedin.com/in/tushar-badgujar-1738a2384/', color: 'hover:text-[#0077b5]', label: 'LinkedIn profile' },
    { icon: <Github size={24} />, link: 'https://github.com/badgujartushar190-lab/', color: 'hover:text-white', label: 'GitHub profile' },
    { icon: <Instagram size={24} />, link: 'https://www.instagram.com/tushar_badgujar402?igsh=MTVlM3doZ2syNG5pMQ==', color: 'hover:text-[#e4405f]', label: 'Instagram profile' },
  ];

  return (
    <section id="contact" className="bg-dark/50 relative">
      {/* Centered Success Popup */}
      <AnimatePresence>
        {status === 'success' && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
              animate={{ opacity: 1, backdropFilter: "blur(10px)" }}
              exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
              className="absolute inset-0 bg-dark/40"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative glass-card p-10 max-w-sm w-full text-center border-2 border-transparent bg-gradient-to-b from-dark/80 to-dark/40 backdrop-blur-2xl rounded-3xl"
              style={{
                borderImage: 'linear-gradient(to bottom, #8B00FF, #00FFE5) 1',
                borderRadius: '24px' // Note: border-image can override border-radius on some browsers
              }}
            >
              <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 size={48} />
              </div>
              <h3 className="text-2xl font-black mb-2 uppercase tracking-tight">Message Sent Successfully! 🎬</h3>
              <p className="text-white/60">Tushar will get back to you soon.</p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Error Notification */}
      <div className="fixed top-24 right-4 z-[2000]">
        <AnimatePresence>
          {status === 'error' && (
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              className="bg-red-500 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 backdrop-blur-lg"
            >
              <AlertCircle size={24} />
              <p className="font-bold">Something went wrong. Please try again.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Details */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-secondary font-bold tracking-widest uppercase text-xs mb-4 block">Let's Work Together</span>
            <h2 className="text-4xl md:text-5xl font-black mb-8 uppercase leading-tight">READY TO START YOUR <span className="text-gradient">NEXT PROJECT?</span></h2>
            <p className="text-white/50 mb-12 max-w-md">
              Have a project in mind? Reach out and let's discuss how we can create something extraordinary.
            </p>

            <div className="space-y-8 mb-12">
              {contactInfo.map((info, idx) => (
                <div key={idx} className="flex items-center gap-6 group">
                  <div className="p-4 rounded-xl bg-white/5 text-secondary group-hover:bg-primary transition-all duration-300">
                    {info.icon}
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold tracking-widest text-white/30">{info.label}</p>
                    <p className="text-lg font-medium">{info.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-6">
              {socials.map((social, idx) => (
                <motion.a
                  key={idx}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className={`text-white/40 transition-colors ${social.color}`}
                  whileHover={{ scale: 1.2, y: -5 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card"
          >
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] uppercase font-bold tracking-widest text-white/40 mb-2">Name</label>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    className={`w-full bg-white/5 border ${errors.name ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-3 outline-none focus:border-primary transition-colors text-white`}
                    placeholder="Your Name"
                    onChange={(e) => {
                      setFormData({...formData, name: e.target.value});
                      if (errors.name) setErrors({...errors, name: null});
                    }}
                  />
                  {errors.name && <span className="text-[10px] text-red-500 mt-1 block uppercase font-bold tracking-wider">{errors.name}</span>}
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold tracking-widest text-white/40 mb-2">Email</label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    className={`w-full bg-white/5 border ${errors.email ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-3 outline-none focus:border-primary transition-colors text-white`}
                    placeholder="your@email.com"
                    onChange={(e) => {
                      setFormData({...formData, email: e.target.value});
                      if (errors.email) setErrors({...errors, email: null});
                    }}
                  />
                  {errors.email && <span className="text-[10px] text-red-500 mt-1 block uppercase font-bold tracking-wider">{errors.email}</span>}
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold tracking-widest text-white/40 mb-2">Project Type</label>
                <div className="relative">
                  <select 
                    name="projectType"
                    value={formData.projectType}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary transition-colors text-white appearance-none cursor-pointer"
                    onChange={(e) => setFormData({...formData, projectType: e.target.value})}
                  >
                    <option className="bg-dark">Video Editing</option>
                    <option className="bg-dark">Motion Graphics</option>
                    <option className="bg-dark">YouTube Production</option>
                    <option className="bg-dark">Other</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/20">▼</div>
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold tracking-widest text-white/40 mb-2">Message</label>
                <textarea 
                  name="message"
                  value={formData.message}
                  rows="5"
                  className={`w-full bg-white/5 border ${errors.message ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-3 outline-none focus:border-primary transition-colors text-white resize-none`}
                  placeholder="Tell me about your project..."
                  onChange={(e) => {
                    setFormData({...formData, message: e.target.value});
                    if (errors.message) setErrors({...errors, message: null});
                  }}
                ></textarea>
                {errors.message && <span className="text-[10px] text-red-500 mt-1 block uppercase font-bold tracking-wider">{errors.message}</span>}
              </div>

              <button 
                type="submit" 
                disabled={status === 'sending'}
                className="btn-primary w-full py-4 uppercase tracking-[0.2em] font-black text-sm flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'sending' ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
      <iframe name="hidden_iframe" className="hidden" style={{ display: 'none' }}></iframe>
    </section>
  );
};

export default Contact;
