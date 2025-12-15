"use client";

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { Sparkles, Zap, BarChart3, Globe, Rocket, ArrowRight, Instagram, Linkedin, Twitter, Mail } from 'lucide-react';

/* --- GLOBAL STYLES & TAILWIND V4 CONFIGURATION SIMULATION ---
  In a real Next.js 15 app, these variables go into src/app/globals.css 
  using the @theme directive.
*/
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Calistoga&family=Inter:wght@300;400;500;600&display=swap');

    :root {
      --color-toasted-blue: #3b82f6;
      --color-toasted-orange: #f97316;
      --color-toasted-yellow: #eab308;
      --color-toasted-purple: #a855f7;
      --color-toasted-green: #10b981;
      --color-toasted-dark: #050505;
      
      --font-display: 'Calistoga', serif;
      --font-sans: 'Inter', sans-serif;
    }

    body {
      background-color: var(--color-toasted-dark);
      color: #ffffff;
      font-family: var(--font-sans);
      overflow-x: hidden;
    }

    /* Noise Texture */
    .bg-noise {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 50;
      opacity: 0.03;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
    }

    /* Scrollbar */
    ::-webkit-scrollbar {
      width: 8px;
    }
    ::-webkit-scrollbar-track {
      background: #000;
    }
    ::-webkit-scrollbar-thumb {
      background: #333;
      border-radius: 4px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: var(--color-toasted-orange);
    }

    .font-display { font-family: var(--font-display); }
    
    .text-gradient-animate {
      background-size: 200% auto;
      animation: shine 4s linear infinite;
    }
    
    @keyframes shine {
      to {
        background-position: 200% center;
      }
    }
  `}</style>
);

/* --- COMPONENTS --- */

// 1. HERO COMPONENT
const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Aurora Background Effect */}
      <div className="absolute inset-0 bg-black">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--color-toasted-blue)] rounded-full mix-blend-screen filter blur-[120px] opacity-20 animate-pulse" />
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-[var(--color-toasted-purple)] rounded-full mix-blend-screen filter blur-[100px] opacity-20" />
        <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-[var(--color-toasted-orange)] rounded-full mix-blend-screen filter blur-[100px] opacity-10" />
      </div>

      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-sm tracking-wider uppercase mb-6 text-gray-300 backdrop-blur-md">
            The Digital Alchemy Agency
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-9xl font-display font-bold leading-tight tracking-tight mb-8">
            We Don't Just <br />
            <span className="text-white">Bake Content.</span>
            <br />
            <span
              className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-toasted-blue)] via-[var(--color-toasted-purple)] to-[var(--color-toasted-orange)] text-gradient-animate"
              style={{ paddingBottom: '0.1em' }} // Fix clip cut-off
            >
              We Toast It.
            </span>
          </h1>

          <motion.p
            className="max-w-2xl mx-auto text-lg md:text-xl text-gray-400 mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            Turning raw data into digital gold. We blend strategy, design, and technology to heat up your brand's presence.
          </motion.p>

          <motion.div
            className="flex flex-col md:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <button className="group relative px-8 py-4 bg-white text-black font-bold text-lg rounded-full overflow-hidden transition-all hover:scale-105">
              <span className="relative z-10 flex items-center gap-2">
                Start the Fire <Zap className="w-5 h-5 fill-current" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-toasted-orange)] to-[var(--color-toasted-yellow)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
            <button className="px-8 py-4 bg-transparent border border-white/20 text-white font-medium text-lg rounded-full hover:bg-white/5 transition-all">
              View Our Work
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-white rounded-full" />
        </div>
      </motion.div>
    </section>
  );
};

// 2. SERVICES COMPONENT (Bento Grid)
interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
  colorClass: string;
  delay: number;
  colSpan: string;
}

const ServiceCard = ({ title, description, icon: Icon, colorClass, delay, colSpan }: ServiceCardProps) => {
  return (
    <motion.div
      className={`group relative p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md overflow-hidden hover:border-transparent transition-colors duration-500 ${colSpan}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6 }}
    >
      {/* Hover Glow Effect */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-br ${colorClass}`} />

      {/* Border Gradient on Hover */}
      <div className={`absolute inset-0 rounded-3xl p-[1px] bg-gradient-to-br ${colorClass} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`} style={{ mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', maskComposite: 'exclude' }} />

      <div className="relative z-10 h-full flex flex-col justify-between">
        <div className="mb-6">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center bg-white/10 mb-4 group-hover:scale-110 transition-transform duration-500`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-2xl font-display font-bold mb-2">{title}</h3>
          <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
        </div>
        <div className="flex items-center text-sm font-medium text-white/60 group-hover:text-white transition-colors">
          Learn more <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </motion.div>
  );
};

const Services = () => {
  return (
    <section className="py-24 px-6 relative z-10">
      <div className="container mx-auto">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-4">Our <span className="text-[var(--color-toasted-green)]">Ingredients</span></h2>
          <p className="text-gray-400 max-w-xl mx-auto">Specific compounds formulated to catalyze growth.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto auto-rows-[300px]">
          <ServiceCard
            title="SEO & Alchemy"
            description="Ranking isn't luck. It's science. We engineer your site to dominate search results."
            icon={BarChart3}
            colorClass="from-[var(--color-toasted-blue)] to-cyan-500"
            delay={0.1}
            colSpan="md:col-span-2"
          />
          <ServiceCard
            title="Social Ignition"
            description="Viral campaigns that spread like wildfire across all major platforms."
            icon={Sparkles}
            colorClass="from-[var(--color-toasted-orange)] to-red-500"
            delay={0.2}
            colSpan="md:col-span-1"
          />
          <ServiceCard
            title="Web Development"
            description="Blazing fast, high-performance websites built on Next.js."
            icon={Globe}
            colorClass="from-[var(--color-toasted-purple)] to-pink-500"
            delay={0.3}
            colSpan="md:col-span-1"
          />
          <ServiceCard
            title="Growth Hacking"
            description="Experimental strategies designed for rapid scaling and user acquisition."
            icon={Rocket}
            colorClass="from-[var(--color-toasted-green)] to-emerald-500"
            delay={0.4}
            colSpan="md:col-span-2"
          />
        </div>
      </div>
    </section>
  );
};

// 3. PROCESS COMPONENT (Timeline)
interface ProcessStepProps {
  number: string;
  title: string;
  text: string;
  align: 'left' | 'right';
}

const ProcessStep = ({ number, title, text, align }: ProcessStepProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-50% 0px -50% 0px" });

  return (
    <div ref={ref} className={`flex items-center justify-between w-full mb-32 relative ${align === 'right' ? 'flex-row-reverse' : ''}`}>
      {/* Content */}
      <motion.div
        className={`w-5/12 ${align === 'right' ? 'text-right' : 'text-left'}`}
        animate={{ opacity: isInView ? 1 : 0.2, x: isInView ? 0 : (align === 'right' ? 50 : -50) }}
        transition={{ duration: 0.5 }}
      >
        <span className="text-6xl font-display font-bold text-white/5 absolute -top-10 left-0 right-0 pointer-events-none select-none">0{number}</span>
        <h3 className={`text-3xl font-bold mb-4 ${isInView ? 'text-white' : 'text-gray-600'}`}>{title}</h3>
        <p className="text-gray-400">{text}</p>
      </motion.div>

      {/* Center Node */}
      <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-black border-2 border-white/20 z-10 flex items-center justify-center">
        <motion.div
          className="w-2 h-2 rounded-full bg-[var(--color-toasted-yellow)]"
          animate={{ scale: isInView ? 1.5 : 0 }}
        />
      </div>

      <div className="w-5/12" /> {/* Spacer */}
    </div>
  );
};

const Process = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 relative" ref={containerRef}>
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-6xl font-display font-bold">The <span className="text-[var(--color-toasted-yellow)]">Toast</span> Method</h2>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Glowing Line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-white/10">
            <motion.div
              style={{ height, background: 'linear-gradient(180deg, var(--color-toasted-blue), var(--color-toasted-purple), var(--color-toasted-orange))' }}
              className="w-full shadow-[0_0_20px_rgba(255,255,255,0.5)]"
            />
          </div>

          <ProcessStep
            number="1"
            title="Raw Extraction"
            text="We audit your current digital footprint, extracting data points to find what's working and what's burnt."
            align="left"
          />
          <ProcessStep
            number="2"
            title="The Mix"
            text="Our strategists blend creative direction with technical SEO to create a potent marketing compound."
            align="right"
          />
          <ProcessStep
            number="3"
            title="High Heat"
            text="We launch campaigns with aggressive intensity, monitoring real-time metrics to adjust the temperature."
            align="left"
          />
          <ProcessStep
            number="4"
            title="Golden Crust"
            text="The result? A perfectly toasted brand presence that is crispy, memorable, and impossible to ignore."
            align="right"
          />
        </div>
      </div>
    </section>
  );
};

// 4. CONTACT COMPONENT
const Contact = () => {
  return (
    <section className="py-24 px-6 relative z-10" id="contact">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 backdrop-blur-md relative overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Background Gradient for Card */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-toasted-orange)]/10 rounded-full blur-[80px] -z-10" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[var(--color-toasted-blue)]/10 rounded-full blur-[80px] -z-10" />

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">Ready to <span className="text-[var(--color-toasted-orange)]">Ignite?</span></h2>
              <p className="text-gray-400 mb-8 text-lg">
                Tell us about your project. We'll analyze the chemistry and get back to you with a formula for growth.
              </p>

              <div className="space-y-6">
                <div className="flex items-center gap-4 text-gray-300 group cursor-pointer">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[var(--color-toasted-blue)] transition-colors duration-300">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <span className="group-hover:text-white transition-colors">hello@thetoastedmedia.com</span>
                </div>
                <div className="flex items-center gap-4 text-gray-300 group cursor-pointer">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[var(--color-toasted-purple)] transition-colors duration-300">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <span className="group-hover:text-white transition-colors">Book a Strategy Call</span>
                </div>
              </div>
            </div>

            <form className="space-y-4 bg-black/20 p-6 rounded-2xl border border-white/5">
              <div>
                <input type="text" placeholder="Name" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[var(--color-toasted-orange)] focus:bg-white/10 transition-all" />
              </div>
              <div>
                <input type="email" placeholder="Email" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[var(--color-toasted-orange)] focus:bg-white/10 transition-all" />
              </div>
              <div>
                <textarea rows={4} placeholder="Tell us your goals..." className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[var(--color-toasted-orange)] focus:bg-white/10 transition-all" />
              </div>
              <button className="w-full py-4 bg-gradient-to-r from-[var(--color-toasted-orange)] to-[var(--color-toasted-yellow)] text-black font-bold rounded-lg hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_0_20px_rgba(249,115,22,0.3)] hover:shadow-[0_0_30px_rgba(249,115,22,0.5)]">
                Send Signal
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// 5. FOOTER COMPONENT
const Footer = () => {
  return (
    <footer className="relative pt-32 pb-12 px-6 overflow-hidden">
      <div className="container mx-auto">
        <div className="border-t border-white/10 mb-12" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          <div>
            <span className="block text-sm uppercase tracking-widest text-gray-500 mb-4">What's Next?</span>
            <a href="#" className="group block w-fit">
              <h2 className="text-6xl md:text-8xl font-display font-bold leading-none mb-2 transition-colors duration-300 group-hover:text-[var(--color-toasted-orange)]">
                Let's Talk.
              </h2>
              <div className="h-1 w-0 bg-[var(--color-toasted-orange)] group-hover:w-full transition-all duration-500" />
            </a>
          </div>

          <div className="flex flex-col justify-end md:items-end">
            <div className="flex gap-4 mb-6">
              {[Instagram, Twitter, Linkedin, Mail].map((Icon, i) => (
                <a key={i} href="#" className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
            <p className="text-gray-400 text-right">hello@thetoastedmedia.com</p>
            <p className="text-gray-400 text-right">+1 (555) 000-TOAST</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-600 pt-8 border-t border-white/5">
          <p>© 2025 The Toasted Media. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>

      {/* Background Gradient Footer */}
      <div className="absolute bottom-0 left-0 w-full h-[500px] bg-gradient-to-t from-[var(--color-toasted-blue)]/10 to-transparent -z-10 pointer-events-none" />
    </footer>
  );
};

// MAIN PAGE ASSEMBLY
export default function TheToastedMedia() {
  return (
    <div className="min-h-screen text-white bg-[var(--color-toasted-dark)] selection:bg-[var(--color-toasted-orange)] selection:text-black">
      <GlobalStyles />
      <div className="bg-noise" />

      <nav className="fixed top-0 w-full z-50 px-6 py-4 bg-black/50 backdrop-blur-md border-b border-white/5 transition-all duration-300">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2 text-2xl font-display font-bold tracking-tighter">
            <img src="/logo.jpg" alt="Toasted Media Logo" className="w-10 h-10 rounded-full object-cover" />
            toasted.
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium">
            <a href="#" className="hover:text-[var(--color-toasted-orange)] transition-colors">Work</a>
            <a href="#" className="hover:text-[var(--color-toasted-orange)] transition-colors">Services</a>
            <a href="#" className="hover:text-[var(--color-toasted-orange)] transition-colors">Process</a>
            <a href="#contact" className="hover:text-[var(--color-toasted-orange)] transition-colors">Contact</a>
          </div>
        </div>
      </nav>

      <main>
        <Hero />
        <Services />
        <Process />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}