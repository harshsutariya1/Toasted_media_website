"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, Variants } from 'framer-motion';
import {
  Lightbulb,
  PenTool,
  Monitor,
  Rocket,
  Coffee,
  ArrowRight,
  Mail,
  Instagram,
  Linkedin,
  Twitter
} from 'lucide-react';

// --- VISUAL ASSETS & STYLES (Simulating globals.css) ---

const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;800&family=Patrick+Hand&display=swap');

    :root {
      /* Palette based on the uploaded logo, softened to pastels/crayons */
      --paper: #FBF7F4;
      --charcoal: #2d2a26;
      --pencil: #4a4a4a;
      
      /* Crayon Accents */
      --crayon-blue: #7dd3fc;
      --crayon-purple: #c084fc;
      --crayon-orange: #fdba74;
      --crayon-yellow: #fde047;
      --crayon-green: #86efac;
      --crayon-red: #fca5a5;
    }

    body {
      background-color: var(--paper);
      color: var(--charcoal);
      font-family: 'Nunito', sans-serif;
      overflow-x: hidden;
    }

    /* Paper Texture Overlay */
    .texture-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 50;
      opacity: 0.4;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.5'/%3E%3C/svg%3E");
    }

    h1, h2, h3, h4, h5, h6 {
      font-family: 'Patrick Hand', cursive;
    }

    /* The "Doodle" Border Utility */
    .doodle-border {
      border: 2px solid var(--charcoal);
      border-radius: 255px 15px 225px 15px / 15px 225px 15px 255px;
      transition: all 0.3s ease;
    }
    
    .doodle-border:hover {
      border-radius: 15px 225px 15px 255px / 255px 15px 225px 15px; 
    }

    .doodle-box-shadow {
      box-shadow: 4px 4px 0px var(--charcoal);
    }

    /* Washi Tape Effect */
    .washi-tape {
      position: absolute;
      width: 100px;
      height: 30px;
      background-color: rgba(255, 255, 255, 0.4);
      box-shadow: 0 1px 3px rgba(0,0,0,0.2);
      transform: rotate(-3deg);
      backdrop-filter: blur(2px);
      z-index: 10;
    }
    
    .washi-tape::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: repeating-linear-gradient(
        45deg,
        transparent,
        transparent 10px,
        rgba(255,255,255,0.5) 10px,
        rgba(255,255,255,0.5) 20px
      );
    }
    
    /* Hide scrollbar for horizontal scroll */
    .no-scrollbar::-webkit-scrollbar {
      display: none;
    }
    .no-scrollbar {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
  `}</style>
);

// --- ANIMATION VARIANTS ---

const handDrawnTransition = {
  type: "spring",
  stiffness: 200,
  damping: 10
};

const sketchIn = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 1.5, ease: "easeInOut" }
  }
};

const doodlePop: Variants = {
  hidden: { scale: 0.8, opacity: 0, rotate: -2 },
  visible: { scale: 1, opacity: 1, rotate: 0, transition: { type: 'spring', bounce: 0.5 } }
};

// --- COMPONENTS ---

const Navigation = () => (
  <nav className="fixed top-0 left-0 w-full z-40 px-6 py-4 flex justify-between items-center bg-[var(--paper)]/80 backdrop-blur-sm border-b-2 border-[var(--charcoal)]/10">
    <div className="flex items-center gap-2">
      <img src="/logo.jpg" alt="Toasted Media" className="w-10 h-10 rounded-full border-2 border-[var(--charcoal)] doodle-box-shadow object-cover" />
      <span className="font-['Patrick_Hand'] text-xl font-bold tracking-wide">The Toasted Media</span>
    </div>
    <div className="hidden md:flex gap-8 font-['Patrick_Hand'] text-lg">
      {['Work', 'Services', 'Process', 'About'].map((item) => (
        <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-[var(--crayon-purple)] hover:underline decoration-wavy underline-offset-4 transition-all">
          {item}
        </a>
      ))}
    </div>
    <button className="bg-[var(--charcoal)] text-[var(--paper)] px-6 py-2 font-['Patrick_Hand'] text-lg doodle-border hover:bg-[var(--pencil)] hover:scale-105 transition-transform">
      Let's Talk
    </button>
  </nav>
);

const Hero = () => {
  return (
    <section className="min-h-screen pt-32 pb-20 px-6 flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto overflow-hidden">
      <div className="md:w-1/2 z-10 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-block bg-[var(--crayon-yellow)] px-4 py-1 transform -rotate-2 mb-4 doodle-border">
            <span className="font-['Patrick_Hand'] font-bold text-lg">Fresh from the sketchbook</span>
          </div>
          <h1 className="text-6xl md:text-8xl leading-[0.9] text-[var(--charcoal)] mb-6">
            We sketch up <br />
            <span className="relative inline-block text-[var(--crayon-blue)]">
              big ideas
              <svg className="absolute -bottom-2 left-0 w-full" height="10" viewBox="0 0 200 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.00026 6.99997C38.5003 3.49998 84.5003 -1.00004 197.5 4.49998" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </span>
            <br /> & toast them.
          </h1>
          <p className="text-xl md:text-2xl font-light max-w-lg mb-8 text-[var(--pencil)]">
            A digital agency that believes in messy brainstorming, sharp strategy, and perfectly crisp execution.
          </p>
          <div className="flex flex-wrap gap-4">
            <motion.button
              whileHover={{ scale: 1.05, rotate: 2 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[var(--crayon-orange)] text-[var(--charcoal)] text-xl px-8 py-4 font-['Patrick_Hand'] doodle-border doodle-box-shadow flex items-center gap-3"
            >
              Start a Project <ArrowRight className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, rotate: -2 }}
              className="bg-transparent border-2 border-[var(--charcoal)] text-[var(--charcoal)] text-xl px-8 py-4 font-['Patrick_Hand'] rounded-full hover:bg-[var(--crayon-blue)] transition-colors"
            >
              View Our Work
            </motion.button>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="md:w-1/2 relative mt-12 md:mt-0"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        {/* Abstract "Toaster" Illustration */}
        <div className="relative w-full aspect-square max-w-lg mx-auto">
          {/* Blobs */}
          <motion.div
            animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.02, 0.98, 1] }}
            transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
            className="absolute top-10 right-10 w-64 h-64 bg-[var(--crayon-purple)] rounded-full mix-blend-multiply filter blur-xl opacity-60"
          />
          <motion.div
            animate={{ rotate: [0, -5, 5, 0], scale: [1, 0.98, 1.02, 1] }}
            transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
            className="absolute bottom-10 left-10 w-72 h-72 bg-[var(--crayon-blue)] rounded-full mix-blend-multiply filter blur-xl opacity-60"
          />

          {/* Main Graphic */}
          <div className="relative z-10 bg-white border-2 border-[var(--charcoal)] p-8 doodle-border transform rotate-2">
            <div className="w-full h-full border-2 border-dashed border-[var(--charcoal)]/30 rounded-3xl flex items-center justify-center p-12">
              <svg viewBox="0 0 200 200" className="w-full h-full text-[var(--charcoal)]">
                {/* Simple SVG Toaster Doodle */}
                <path d="M40 80 H160 V160 C160 170 150 180 140 180 H60 C50 180 40 170 40 160 V80 Z" fill="none" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
                <path d="M50 80 V50 C50 40 60 30 70 30 H130 C140 30 150 40 150 50 V80" fill="none" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
                <path d="M170 100 V130" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                <circle cx="170" cy="90" r="5" fill="currentColor" />

                {/* Flying Toast/Elements */}
                <motion.g
                  animate={{ y: [-10, -40, -10] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                >
                  <path d="M70 30 L60 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                  <path d="M130 30 L140 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                  <rect x="80" y="0" width="40" height="40" rx="5" stroke="currentColor" strokeWidth="3" fill="var(--crayon-yellow)" transform="rotate(15 100 20)" />
                </motion.g>
              </svg>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

interface ServiceCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
  rotation: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon: Icon, title, description, color, rotation }) => (
  <motion.div
    variants={doodlePop}
    whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
    className={`p-6 bg-[var(--paper)] border-2 border-[var(--charcoal)] relative flex flex-col gap-4 shadow-lg`}
    style={{
      transform: `rotate(${rotation}deg)`,
      borderRadius: '2px', // Post-it look
      backgroundColor: color
    }}
  >
    {/* Pin graphic */}
    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-[var(--charcoal)] border-2 border-white shadow-sm z-20"></div>

    <div className="w-12 h-12 rounded-full bg-white/50 border-2 border-[var(--charcoal)] flex items-center justify-center">
      <Icon className="w-6 h-6 text-[var(--charcoal)]" strokeWidth={2.5} />
    </div>
    <h3 className="text-2xl font-bold leading-tight">{title}</h3>
    <p className="font-semibold text-sm opacity-80 leading-relaxed">{description}</p>
  </motion.div>
);

const Services = () => {
  const services = [
    { icon: Lightbulb, title: "Brand Strategy", description: "Finding your 'why' before we draw your 'what'.", color: "var(--crayon-yellow)", rotation: -2 },
    { icon: PenTool, title: "UI/UX Design", description: "Interfaces that feel human, not robotic.", color: "var(--crayon-blue)", rotation: 1 },
    { icon: Monitor, title: "Web Development", description: "Clean code wrapped in messy creativity.", color: "var(--crayon-green)", rotation: -1.5 },
    { icon: Rocket, title: "Growth Marketing", description: "Launching your ideas into orbit.", color: "var(--crayon-red)", rotation: 2 },
  ];

  return (
    <section id="services" className="py-24 bg-white relative overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#2d2a26 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl mb-4 text-[var(--charcoal)]">The Scrapbook</h2>
          <p className="text-xl max-w-2xl mx-auto font-light">Services we've pinned to our board.</p>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {services.map((s, i) => (
            <ServiceCard key={i} {...s} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const Industries = () => {
  const containerRef = useRef(null);
  const { scrollXProgress } = useScroll({ container: containerRef });

  const industries = ["Fintech", "Healthcare", "E-Commerce", "Education", "Real Estate", "Non-Profit", "Web3"];

  return (
    <section className="py-20 border-y-2 border-[var(--charcoal)] bg-[var(--crayon-purple)]/20 overflow-hidden">
      <div className="mb-8 px-6 text-center">
        <h2 className="text-3xl font-bold font-['Patrick_Hand']">Who we sketch for</h2>
      </div>

      <div className="relative w-full">
        <motion.div
          className="flex gap-12 px-6 overflow-x-auto no-scrollbar pb-10"
          ref={containerRef}
          style={{ cursor: 'grab' }}
          drag="x"
          dragConstraints={containerRef}
        >
          {industries.map((ind, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.1, rotate: i % 2 === 0 ? 5 : -5 }}
              className="flex-shrink-0"
            >
              <div className="relative group">
                {/* Cloud SVG Background */}
                <svg width="180" height="100" viewBox="0 0 180 100" className="text-white drop-shadow-md transition-colors group-hover:text-[var(--crayon-yellow)]">
                  <path d="M20,60 Q0,60 0,40 Q0,10 30,10 Q40,-10 70,0 Q100,-20 120,10 Q150,0 160,30 Q190,40 170,70 Q160,90 130,90 Q110,100 80,90 Q40,100 20,60 Z" fill="currentColor" />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center font-bold text-lg text-[var(--charcoal)] font-['Patrick_Hand']">
                  {ind}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const Process = () => {
  return (
    <section id="process" className="py-32 bg-[var(--paper)] relative">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-5xl text-center mb-24">Our Sketchpath</h2>

        <div className="relative">
          {/* The Connecting Path */}
          <svg className="absolute top-0 left-0 w-full h-full pointer-events-none hidden md:block" style={{ zIndex: 0 }}>
            <motion.path
              d="M100,50 C200,50 200,250 100,250 C0,250 0,450 100,450 C200,450 200,650 100,650"
              fill="none"
              stroke="var(--charcoal)"
              strokeWidth="3"
              strokeDasharray="10 10"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
          </svg>

          <div className="space-y-32 relative z-10">
            {[
              { step: "01", title: "Discovery Doodle", desc: "We sit down (virtually) and draw out the mess inside your head." },
              { step: "02", title: "Wireframe Sketches", desc: "Low fidelity skeletons. No colors, just structure and flow." },
              { step: "03", title: "The Masterpiece", desc: "High fidelity design, adding the paint, texture, and soul." },
              { step: "04", title: "Toast & Launch", desc: "Development, QA, and the sweet smell of going live." }
            ].map((item, i) => (
              <div key={i} className={`flex ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12`}>
                <div className="w-full md:w-1/2 flex justify-center">
                  <div className="w-24 h-24 rounded-full border-4 border-[var(--charcoal)] flex items-center justify-center bg-white text-4xl font-bold font-['Patrick_Hand'] doodle-box-shadow">
                    {item.step}
                  </div>
                </div>
                <div className="w-full md:w-1/2">
                  <div className="bg-white p-8 doodle-border relative">
                    <h3 className="text-3xl mb-4 font-bold text-[var(--crayon-purple)]">{item.title}</h3>
                    <p className="text-lg leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-24 bg-[var(--charcoal)] text-[var(--paper)] relative">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-5xl md:text-6xl mb-8 text-[var(--crayon-yellow)]">Ready to get messy?</h2>
        <p className="text-xl mb-12 opacity-80 font-light">Let's create something that doesn't look like a template.</p>

        <div className="relative bg-[var(--paper)] text-[var(--charcoal)] p-8 md:p-12 max-w-2xl mx-auto rotate-1 doodle-border">
          {/* Washi Tape Decorations */}
          <div className="washi-tape -top-4 left-1/2 transform -translate-x-1/2"></div>
          <div className="washi-tape -bottom-4 right-10 rotate-3"></div>

          <form className="space-y-6 text-left">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block font-bold mb-2 ml-2 font-['Patrick_Hand'] text-lg">Name</label>
                <input type="text" className="w-full bg-transparent border-b-2 border-[var(--charcoal)] focus:border-[var(--crayon-blue)] outline-none py-2 px-2 transition-colors font-sans" placeholder="Picasso" />
              </div>
              <div>
                <label className="block font-bold mb-2 ml-2 font-['Patrick_Hand'] text-lg">Email</label>
                <input type="email" className="w-full bg-transparent border-b-2 border-[var(--charcoal)] focus:border-[var(--crayon-blue)] outline-none py-2 px-2 transition-colors font-sans" placeholder="hello@art.com" />
              </div>
            </div>
            <div>
              <label className="block font-bold mb-2 ml-2 font-['Patrick_Hand'] text-lg">Your Idea</label>
              <textarea rows={4} className="w-full bg-transparent border-2 border-[var(--charcoal)] rounded-lg p-4 focus:border-[var(--crayon-purple)] outline-none transition-colors font-sans" placeholder="Draw us a picture with words..."></textarea>
            </div>
            <div className="text-center pt-4">
              <button type="button" className="bg-[var(--crayon-green)] text-[var(--charcoal)] px-10 py-3 text-xl font-bold font-['Patrick_Hand'] doodle-border hover:scale-105 transition-transform doodle-box-shadow">
                Send it!
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="bg-[var(--charcoal)] text-[var(--paper)] py-12 border-t border-white/10">
    <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
      <div className="text-center md:text-left">
        <h4 className="text-2xl font-bold font-['Patrick_Hand'] text-[var(--crayon-blue)] mb-2">The Toasted Media</h4>
        <p className="text-sm opacity-60">© 2024. All rights drawn by hand.</p>
      </div>
      <div className="flex gap-6">
        <Instagram className="w-6 h-6 hover:text-[var(--crayon-orange)] cursor-pointer transition-colors" />
        <Linkedin className="w-6 h-6 hover:text-[var(--crayon-blue)] cursor-pointer transition-colors" />
        <Twitter className="w-6 h-6 hover:text-[var(--crayon-purple)] cursor-pointer transition-colors" />
        <Mail className="w-6 h-6 hover:text-[var(--crayon-green)] cursor-pointer transition-colors" />
      </div>
    </div>
  </footer>
);

export default function App() {
  return (
    <div className="relative">
      <GlobalStyles />
      <div className="texture-overlay"></div>

      <Navigation />

      <main>
        <Hero />
        <Services />
        <Industries />
        <Process />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}