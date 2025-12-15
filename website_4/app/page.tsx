'use client';
import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  Flame,
  Zap,
  Layers,
  TrendingUp,
  MessageSquare,
  Menu,
  X,
  CheckCircle,
  MousePointer2,
  Globe,
  Cpu
} from 'lucide-react';

// --- Brand Assets & Config ---
const BRAND_COLORS = {
  blue: '#2563EB',
  orange: '#F97316',
  yellow: '#FACC15',
  violet: '#7C3AED',
  teal: '#2DD4BF',
  bg: '#050505', // Deep Midnight
};

const SERVICES = [
  {
    title: 'SEO & Structure',
    desc: 'The bread and butter. We build foundations that search engines crave.',
    icon: <Layers size={32} />,
    color: 'text-blue-500',
    border: 'hover:border-blue-500',
    colSpan: 'col-span-12 md:col-span-4',
  },
  {
    title: 'Content Toasting',
    desc: 'Bland content gets tossed. We crisp it up with strategy, wit, and high-conversion copy.',
    icon: <Flame size={32} />,
    color: 'text-orange-500',
    border: 'hover:border-orange-500',
    colSpan: 'col-span-12 md:col-span-8',
  },
  {
    title: 'Paid Media (PPC)',
    desc: 'Gasoline on the fire. Precision targeting for instant traffic spikes.',
    icon: <MousePointer2 size={32} />,
    color: 'text-violet-500',
    border: 'hover:border-violet-500',
    colSpan: 'col-span-12 md:col-span-6',
  },
  {
    title: 'Social Growth',
    desc: 'Community management that actually builds a community.',
    icon: <TrendingUp size={32} />,
    color: 'text-teal-400',
    border: 'hover:border-teal-400',
    colSpan: 'col-span-12 md:col-span-6',
  },
];

const INDUSTRIES = ['SaaS', 'E-Commerce', 'FinTech', 'Beauty', 'Web3', 'Real Estate', 'Education'];

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/50 backdrop-blur-xl border-b border-white/10' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2 font-bold text-2xl tracking-tighter text-white">
          <img src="/logo.jpg" alt="Toasted Media Logo" className="w-8 h-8 rounded-lg object-cover" />
          TOASTED.
        </div>

        <div className="hidden md:flex items-center gap-8">
          {['Services', 'Process', 'Story', 'Contact'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
              {item}
            </a>
          ))}
          <button className="px-6 py-2.5 bg-white text-black font-bold rounded-full hover:bg-orange-500 hover:text-white transition-all duration-300">
            Get Toasted
          </button>
        </div>

        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black border-b border-white/10 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {['Services', 'Process', 'Story', 'Contact'].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setIsOpen(false)} className="text-lg font-medium text-gray-300">
                  {item}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 6, repeat: Infinity, delay: 1 }}
          className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-orange-600/20 rounded-full blur-[120px]"
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-sm font-medium text-orange-400 mb-6">
            <span className="mr-2">🔥</span> Fresh out of the oven
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-8 leading-[1.1]">
            We Don't Just Bake Content. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-500">
              We Toast It.
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            The digital marketing agency for brands that are tired of being raw, doughy, and ignored. We add the heat, the crunch, and the finish.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="w-full sm:w-auto px-8 py-4 bg-orange-500 text-white font-bold rounded-full text-lg hover:bg-orange-600 transition-all flex items-center justify-center gap-2 group">
              Start The Fire
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="w-full sm:w-auto px-8 py-4 bg-white/5 border border-white/10 text-white font-medium rounded-full text-lg hover:bg-white/10 transition-all backdrop-blur-sm">
              View Our Menu
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Services = () => {
  return (
    <section id="services" className="py-24 bg-black relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Our Menu</h2>
          <p className="text-gray-400 text-lg max-w-xl">Full-stack digital ingredients prepared to perfection.</p>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {SERVICES.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`${service.colSpan} group relative p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm transition-all duration-300 ${service.border} hover:bg-white/[0.07] overflow-hidden`}
            >
              <div className={`absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-100 transition-opacity duration-500 ${service.color}`}>
                {service.icon}
              </div>
              <div className="relative z-10 h-full flex flex-col justify-between min-h-[200px]">
                <div>
                  <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 ${service.color}`}>
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{service.desc}</p>
                </div>
                <div className="mt-8 pt-6 border-t border-white/5 flex items-center text-sm font-medium text-white/50 group-hover:text-white transition-colors cursor-pointer">
                  Learn more <ArrowRight className="ml-2 w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const IndustriesTicker = () => {
  return (
    <div className="py-12 border-y border-white/5 bg-black overflow-hidden relative">
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10" />

      <div className="flex whitespace-nowrap overflow-hidden">
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          className="flex gap-16 items-center"
        >
          {[...INDUSTRIES, ...INDUSTRIES, ...INDUSTRIES].map((item, i) => (
            <div key={i} className="flex items-center gap-4 text-2xl font-bold text-white/30 uppercase tracking-widest hover:text-orange-500 transition-colors cursor-default">
              <Zap size={16} className="text-orange-500" />
              {item}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

const OurStory = () => {
  return (
    <section id="story" className="py-32 bg-black text-center relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">Why "Toasted"?</h2>
          <div className="text-xl md:text-2xl text-gray-400 space-y-8 font-light">
            <p>
              Raw bread is boring. It's soft, forgettable, and lacks character.
            </p>
            <p>
              <span className="text-orange-400 font-bold">Toasting transforms it.</span> It brings out the crunch, the warmth, and the golden finish.
            </p>
            <p>
              We do the same for brands. We take raw ideas and apply heat (strategy), timing (execution), and pressure (optimization) until they are golden, crisp, and impossible to ignore.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-gradient-to-r from-orange-500/10 via-yellow-500/10 to-transparent blur-[100px] pointer-events-none" />
    </section>
  );
};

const Process = () => {
  const steps = [
    { title: 'Discovery', desc: 'We taste test your current brand.', color: 'border-blue-500' },
    { title: 'Strategy', desc: 'Preheating the oven with data.', color: 'border-purple-500' },
    { title: 'Execution', desc: 'The actual baking process.', color: 'border-orange-500' },
    { title: 'Toasting', desc: 'Optimization for that golden crunch.', color: 'border-yellow-500' },
  ];

  return (
    <section id="process" className="py-24 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-16">The Recipe</h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="relative pt-12"
            >
              <div className="absolute top-0 left-0 w-full h-0.5 bg-white/10">
                <div className={`absolute left-0 top-0 h-full w-full bg-gradient-to-r from-transparent to-transparent ${step.color} origin-left scale-x-0 group-hover:scale-x-100 transition-transform`} />
              </div>
              <div className={`absolute top-0 left-0 w-4 h-4 -mt-[7px] rounded-full bg-black border-2 ${step.color}`} />

              <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-3">
                <span className="text-white/30">0{i + 1}</span> {step.title}
              </h3>
              <p className="text-gray-400">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-24 bg-black relative">
      <div className="max-w-3xl mx-auto px-6 relative z-10">
        <div className="bg-zinc-900/50 border border-white/10 rounded-3xl p-8 md:p-12 backdrop-blur-xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Smell something burning?</h2>
            <p className="text-gray-400">That's your potential. Let's make sure it doesn't turn to ash.</p>
          </div>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">Name</label>
                <input type="text" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors" placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">Email</label>
                <input type="email" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors" placeholder="john@company.com" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400">Message</label>
              <textarea rows={4} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors" placeholder="Tell us about your raw ideas..." />
            </div>
            <button className="w-full py-4 bg-gradient-to-r from-orange-500 to-yellow-500 text-black font-bold text-lg rounded-xl hover:shadow-[0_0_30px_-5px_rgba(249,115,22,0.5)] transition-shadow">
              Send It To The Kitchen
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-black pt-24 pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <div className="flex items-center gap-2 font-bold text-2xl tracking-tighter text-white">
              <img src="/logo.jpg" alt="Toasted Media Logo" className="w-8 h-8 rounded-lg object-cover" />
              TOASTED.
            </div>
            <p className="text-gray-500 leading-relaxed">
              A digital marketing agency for the bold, the brave, and the hungry.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Sitemap</h4>
            <ul className="space-y-4 text-gray-500">
              <li className="hover:text-orange-500 cursor-pointer transition-colors">Services</li>
              <li className="hover:text-orange-500 cursor-pointer transition-colors">Our Story</li>
              <li className="hover:text-orange-500 cursor-pointer transition-colors">Case Studies</li>
              <li className="hover:text-orange-500 cursor-pointer transition-colors">Careers</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Socials</h4>
            <ul className="space-y-4 text-gray-500">
              <li className="hover:text-orange-500 cursor-pointer transition-colors">LinkedIn</li>
              <li className="hover:text-orange-500 cursor-pointer transition-colors">Twitter / X</li>
              <li className="hover:text-orange-500 cursor-pointer transition-colors">Instagram</li>
              <li className="hover:text-orange-500 cursor-pointer transition-colors">Dribbble</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Legal</h4>
            <ul className="space-y-4 text-gray-500">
              <li className="hover:text-orange-500 cursor-pointer transition-colors">Privacy Policy</li>
              <li className="hover:text-orange-500 cursor-pointer transition-colors">Terms of Service</li>
              <li className="hover:text-orange-500 cursor-pointer transition-colors">Cookie Policy</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-sm">© 2024 The Toasted Media. All rights reserved.</p>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className={`w-2 h-2 rounded-full ${i === 1 ? 'bg-blue-600' : i === 2 ? 'bg-orange-500' : i === 3 ? 'bg-yellow-400' : i === 4 ? 'bg-purple-600' : 'bg-teal-400'}`} />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

const App = () => {
  return (
    <div className="bg-black min-h-screen text-white font-sans selection:bg-orange-500 selection:text-white">
      <Navbar />
      <Hero />
      <IndustriesTicker />
      <Services />
      <OurStory />
      <Process />
      <Contact />
      <Footer />
    </div>
  );
};

export default App;