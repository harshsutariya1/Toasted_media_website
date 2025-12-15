'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence, Variants } from 'framer-motion';
import {
  ArrowRight,
  TrendingUp,
  MessageCircle,
  Search,
  Zap,
  Instagram,
  Twitter,
  Linkedin,
  Mail,
  Menu,
  X,
  CheckCircle2
} from 'lucide-react';

// --- Brand Configuration ---
const COLORS = {
  blue: '#3b82f6',   // Royal Blue
  orange: '#f97316', // Tangerine
  yellow: '#eab308', // Sunshine
  purple: '#a855f7', // Violet
  teal: '#14b8a6',   // Teal
  bg: '#FDFBF7',     // Warm Cream
  text: '#1e293b',   // Slate 800
};

// --- Fonts & Global Styles ---
// Note: In a real Next.js app, these would be in layout.js or tailwind.config.js
const StyleReset = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap');
    
    body {
      background-color: ${COLORS.bg};
      color: ${COLORS.text};
      font-family: 'Inter', sans-serif;
      overflow-x: hidden;
    }
    
    h1, h2, h3, h4, h5, h6 {
      font-family: 'Playfair Display', serif;
    }

    .text-outline {
      -webkit-text-stroke: 1px ${COLORS.text};
      color: transparent;
    }
    
    /* Custom Scrollbar */
    ::-webkit-scrollbar {
      width: 10px;
    }
    ::-webkit-scrollbar-track {
      background: ${COLORS.bg};
    }
    ::-webkit-scrollbar-thumb {
      background: ${COLORS.orange};
      border-radius: 5px;
    }

    .clip-text-image {
      background-clip: text;
      -webkit-background-clip: text;
      color: transparent;
      background-image: linear-gradient(45deg, ${COLORS.blue}, ${COLORS.purple}, ${COLORS.orange});
    }
  `}</style>
);

// --- Components ---

const CursorTrail = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState("default");

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    window.addEventListener("mousemove", mouseMove);
    return () => {
      window.removeEventListener("mousemove", mouseMove);
    };
  }, []);

  const variants: Variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      backgroundColor: "rgba(255, 255, 255, 0)",
      transition: {
        type: "spring",
        mass: 0.1, // Reduced mass for snappier movement
        stiffness: 800, // Increased stiffness
        damping: 25 // Slightly lower damping for responsiveness
      }
    }
  };

  const trailColors = [COLORS.blue, COLORS.orange, COLORS.purple, COLORS.teal, COLORS.yellow];

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] overflow-hidden">
      <motion.div
        variants={variants}
        animate={cursorVariant}
        className="fixed w-8 h-8 rounded-full border border-slate-900 z-50 mix-blend-difference hidden md:block" // Main cursor ring
        style={{ left: 0, top: 0 }}
      />
      {trailColors.map((color, index) => (
        <motion.div
          key={index}
          className="fixed w-4 h-4 rounded-full opacity-60 hidden md:block"
          animate={{
            x: mousePosition.x - 8, // Center the smaller dots
            y: mousePosition.y - 8,
          }}
          transition={{
            type: "spring",
            mass: 0.5 + index * 0.1, // Staggering effect by increasing mass
            stiffness: 150 - index * 10,
            damping: 15,
          }}
          style={{
            backgroundColor: color,
            left: 0,
            top: 0,
            zIndex: 40 - index, // Stack them behind
          }}
        />
      ))}
    </div>
  );
};


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#FDFBF7]/90 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo Mark */}
        <div className="text-2xl font-bold tracking-tighter flex items-center gap-1 group cursor-pointer">
          <div className="relative w-10 h-10 mr-2 rounded-full overflow-hidden border border-slate-200">
            <img src="/logo.png" alt="Toasted Media Logo" className="w-full h-full object-cover" />
          </div>
          <span className="font-serif italic text-slate-900">toasted.</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 items-center font-medium">
          {['Services', 'Work', 'Process', 'About'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-orange-500 transition-colors relative group">
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transition-all group-hover:w-full" />
            </a>
          ))}
          <a href="#contact" className="bg-black text-white px-6 py-2.5 rounded-full font-bold hover:bg-transparent hover:text-black border-2 border-black transition-all shadow-[4px_4px_0px_0px_rgba(249,115,22,1)] hover:shadow-[2px_2px_0px_0px_rgba(20,184,166,1)] hover:translate-x-[2px] hover:translate-y-[2px]">
            Get Toasted
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden absolute top-full left-0 w-full bg-[#FDFBF7] border-b border-gray-200 overflow-hidden shadow-xl"
          >
            <div className="flex flex-col p-6 gap-4">
              {['Services', 'Work', 'Process', 'About'].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className="text-xl font-serif hover:text-orange-500" onClick={() => setIsOpen(false)}>
                  {item}
                </a>
              ))}
              <a href="#contact" onClick={() => setIsOpen(false)} className="w-full bg-black text-white py-3 rounded-md mt-4 font-bold text-center block">Let's Talk</a>
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
      {/* Background Decor */}
      <div className="absolute top-1/4 left-10 w-32 h-32 bg-purple-400 rounded-full blur-[80px] opacity-40 mix-blend-multiply animate-pulse" />
      <div className="absolute bottom-1/4 right-10 w-40 h-40 bg-orange-400 rounded-full blur-[80px] opacity-40 mix-blend-multiply animate-pulse delay-700" />

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block py-1 px-3 border border-slate-900 rounded-full text-sm font-semibold tracking-wider uppercase mb-6 bg-white shadow-[3px_3px_0px_0px_#14B8A6]">
            The Social Agency for Bold Brands
          </span>

          <h1 className="text-5xl md:text-8xl lg:text-9xl font-black leading-[0.9] tracking-tight mb-8 text-slate-900">
            <span className="block hover:translate-x-2 transition-transform duration-500 cursor-default">We Don't</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-orange-500 italic pr-2 hover:-translate-x-2 transition-transform duration-500 cursor-default">
              Just Post.
            </span>
            <div className="relative inline-block mt-2">
              <span className="relative z-10">We Roast & Toast.</span>
              <span className="absolute top-1 left-1 md:top-2 md:left-2 text-yellow-400 -z-10 opacity-90 select-none blur-[1px]">We Roast & Toast.</span>
              <span className="absolute top-2 left-2 md:top-4 md:left-4 text-teal-400 -z-20 opacity-90 select-none blur-[2px]">We Roast & Toast.</span>
            </div>
          </h1>

          <p className="max-w-xl mx-auto text-lg md:text-xl text-slate-600 mb-10 font-medium leading-relaxed">
            Stop being boring. We inject heat, flavor, and conversion-focused creativity into stale marketing strategies.
          </p>

          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block group relative px-8 py-4 bg-slate-900 text-white text-lg font-bold rounded-lg overflow-hidden cursor-pointer"
          >
            <span className="relative z-10 flex items-center gap-2">
              Get Your Free Audit <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
            {/* Multi-colored hover background */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Hard Shadow that shifts */}
            <div className="absolute -bottom-2 -right-2 w-full h-full bg-yellow-400 -z-10 rounded-lg transition-transform group-hover:translate-x-1 group-hover:translate-y-1" />
          </motion.a>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-400 flex flex-col items-center gap-2"
      >
        <span className="text-xs uppercase tracking-widest">Scroll to heat up</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-slate-400 to-transparent" />
      </motion.div>
    </section>
  );
};

const Marquee = () => {
  return (
    <div className="py-12 bg-slate-900 overflow-hidden transform -skew-y-2 border-y-4 border-yellow-400">
      <div className="flex whitespace-nowrap gap-16 animate-[marquee_20s_linear_infinite]">
        {[...Array(2)].map((_, i) => (
          <React.Fragment key={i}>
            {["E-COMMERCE", "SAAS", "LIFESTYLE", "FINTECH", "HOSPITALITY", "CREATOR ECONOMY"].map((industry) => (
              <div key={industry} className="flex items-center gap-8">
                <span className="text-4xl md:text-6xl font-serif italic text-transparent font-bold opacity-50 hover:opacity-100 hover:text-white transition-all cursor-crosshair" style={{ WebkitTextStroke: '1px white' }}>
                  {industry}
                </span>
                <span className="text-orange-500 text-2xl">★</span>
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};

const BentoGrid = () => {
  const services = [
    {
      title: "Social Strategy",
      icon: <MessageCircle size={32} />,
      desc: "Community building that actually builds community.",
      color: "bg-blue-100",
      accent: "text-blue-600",
      colSpan: "md:col-span-2"
    },
    {
      title: "Paid Media",
      icon: <TrendingUp size={32} />,
      desc: "ROAS so high it feels illegal.",
      color: "bg-orange-100",
      accent: "text-orange-600",
      colSpan: "md:col-span-1"
    },
    {
      title: "Content Creation",
      icon: <Zap size={32} />,
      desc: "Thumb-stopping visuals designed to roast the competition.",
      color: "bg-purple-100",
      accent: "text-purple-600",
      colSpan: "md:col-span-1"
    },
    {
      title: "SEO & Copy",
      icon: <Search size={32} />,
      desc: "We speak robot and human fluently.",
      color: "bg-teal-100",
      accent: "text-teal-600",
      colSpan: "md:col-span-2"
    }
  ];

  return (
    <section id="services" className="py-24 px-6 container mx-auto">
      <div className="mb-16">
        <h2 className="text-5xl font-bold mb-4 font-serif text-slate-900">Our Menu</h2>
        <div className="h-2 w-24 bg-gradient-to-r from-blue-500 to-teal-400" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
        {services.map((service, idx) => (
          <motion.div
            key={idx}
            whileHover={{ y: -8 }}
            className={`${service.colSpan} ${service.color} relative p-8 rounded-3xl border-2 border-slate-900 flex flex-col justify-between overflow-hidden group shadow-[6px_6px_0px_0px_rgba(30,41,59,1)] hover:shadow-[10px_10px_0px_0px_rgba(249,115,22,1)] transition-all`}
          >
            <div className={`absolute top-0 right-0 p-4 opacity-20 transform rotate-12 scale-150 transition-transform group-hover:scale-125 group-hover:rotate-6`}>
              {React.cloneElement(service.icon, { size: 120 })}
            </div>

            <div className="relative z-10">
              <div className={`inline-block p-3 bg-white rounded-xl border border-slate-900 mb-4 ${service.accent} shadow-sm`}>
                {service.icon}
              </div>
              <h3 className="text-3xl font-bold font-serif mb-2 leading-tight">{service.title}</h3>
              <p className="text-slate-700 font-medium leading-relaxed">{service.desc}</p>
            </div>

            <div className="flex justify-end">
              <button className="h-10 w-10 rounded-full border border-slate-900 flex items-center justify-center bg-white group-hover:bg-slate-900 group-hover:text-white transition-colors">
                <ArrowRight size={18} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const Work = () => {
  return (
    <section id="work" className="py-24 bg-slate-900 text-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h2 className="text-5xl font-serif font-bold mb-4">Selected Heat</h2>
            <div className="h-2 w-24 bg-gradient-to-r from-orange-500 to-purple-600" />
          </div>
          <a href="#contact" className="text-orange-400 hover:text-white transition-colors flex items-center gap-2 font-bold group">
            View Full Portfolio <ArrowRight className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { title: "Neon Verse", cat: "Strategy & Content", bg: "bg-blue-600", img: "NV" },
            { title: "Spicy Buns", cat: "Rebranding", bg: "bg-orange-500", img: "SB" },
            { title: "Velvet Tech", cat: "Paid Media", bg: "bg-purple-600", img: "VT" },
            { title: "Green Soul", cat: "Social Growth", bg: "bg-teal-500", img: "GS" }
          ].map((project, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 0.98 }}
              className="group relative aspect-video bg-slate-800 rounded-3xl overflow-hidden cursor-pointer"
            >
              <div className={`absolute inset-0 ${project.bg} opacity-20 group-hover:opacity-40 transition-opacity duration-500`} />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-9xl font-black text-white opacity-5 group-hover:opacity-20 transition-opacity select-none">{project.img}</span>
              </div>
              {/* Floating mockup effect */}
              <div className="absolute inset-x-8 bottom-0 h-4/5 bg-slate-950/50 backdrop-blur-xl border-t border-x border-white/10 rounded-t-2xl p-6 transition-all group-hover:h-[85%]">
                <h3 className="text-3xl font-serif font-bold mb-2">{project.title}</h3>
                <p className="text-slate-400 font-medium">{project.cat}</p>
                <div className="mt-6 flex gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500" />
                  <div className="w-2 h-2 rounded-full bg-yellow-500" />
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Story = () => {
  return (
    <section id="about" className="py-24 bg-white border-y border-slate-200">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-16">
          <div className="w-full md:w-1/2 relative">
            {/* Abstract Art representing "Layered t" */}
            <div className="relative aspect-square max-w-md mx-auto">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border-[40px] border-blue-500/20 rounded-full border-t-blue-500"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute inset-8 border-[30px] border-orange-500/20 rounded-full border-r-orange-500"
              />
              <motion.div
                animate={{ rotate: 180 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute inset-20 border-[20px] border-yellow-500/20 rounded-full border-b-yellow-500"
              />
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="w-32 h-32 bg-slate-900 rotate-3 shadow-xl flex items-center justify-center">
                  <span className="text-6xl font-serif text-white italic">t.</span>
                </div>
              </motion.div>
            </div>
          </div>

          <div className="w-full md:w-1/2">
            <h2 className="text-5xl md:text-7xl font-serif font-black mb-8 leading-none">
              Marketing was <span className="text-gray-400 line-through decoration-orange-500 decoration-4">stale.</span><br />
              So we turned up <span className="text-orange-500">the heat.</span>
            </h2>
            <div className="space-y-6 text-lg text-slate-600 leading-relaxed font-light">
              <p>
                <strong className="text-slate-900 font-bold">The Toasted Origin:</strong> Most agencies give you vanilla. Safe. Predictable. We realized that in a feed scrolling at 60mph, "safe" is invisible.
              </p>
              <p>
                We founded Toasted Media on a simple principle: <span className="bg-yellow-200 px-1 font-medium text-slate-900">Be bold or go home.</span> We layer strategy, creative, and data just like our logo layers color—creating a complex, rich, and undeniable presence for your brand.
              </p>
              <div className="pt-4 flex gap-4">
                <div className="flex flex-col">
                  <span className="text-4xl font-bold font-serif text-blue-600">450%</span>
                  <span className="text-sm uppercase tracking-wide">Avg ROI</span>
                </div>
                <div className="w-px bg-slate-200" />
                <div className="flex flex-col">
                  <span className="text-4xl font-bold font-serif text-purple-600">50+</span>
                  <span className="text-sm uppercase tracking-wide">Brands Toasted</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Process = () => {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const steps = [
    { title: "The Prep", subtitle: "Discovery & Audit", color: "bg-blue-500", text: "We analyze your current state, find the gaps, and season the plan." },
    { title: "The Heat", subtitle: "Strategy Design", color: "bg-orange-500", text: "Turning up the temperature with a roadmap tailored to your audience." },
    { title: "The Toast", subtitle: "Execution", color: "bg-purple-600", text: "This is where the magic happens. Content, ads, and engagement go live." },
    { title: "The Jam", subtitle: "Growth & Optimization", color: "bg-teal-500", text: "The sweet result. We analyze data and spread the success further." }
  ];

  return (
    <section id="process" className="py-24 bg-[#FDFBF7]">
      <div className="container mx-auto px-6 max-w-4xl">
        <h2 className="text-center text-5xl font-serif font-bold mb-20">How We Cook</h2>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-slate-200 -translate-x-1/2" />
          <motion.div
            style={{ scaleY, transformOrigin: "top" }}
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-orange-500 to-teal-500 -translate-x-1/2"
          />

          {steps.map((step, idx) => (
            <div key={idx} className={`relative flex items-center gap-8 mb-16 ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>

              {/* Dot */}
              <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full border-4 border-[#FDFBF7] z-10 shadow-lg" style={{ backgroundColor: step.color === 'bg-blue-500' ? COLORS.blue : step.color === 'bg-orange-500' ? COLORS.orange : step.color === 'bg-purple-600' ? COLORS.purple : COLORS.teal }}></div>

              <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${idx % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  className="bg-white p-6 rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] border border-slate-100 hover:shadow-[4px_4px_0px_0px_rgba(249,115,22,0.4)] transition-shadow"
                >
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold text-white mb-2 ${step.color}`}>STEP 0{idx + 1}</span>
                  <h3 className="text-2xl font-bold font-serif mb-1">{step.title}</h3>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-3">{step.subtitle}</h4>
                  <p className="text-slate-600 text-sm">{step.text}</p>
                </motion.div>
              </div>
              <div className="hidden md:block w-1/2" /> {/* Spacer */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  return (
    <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
      {/* Abstract blurred shapes */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-blue-600 rounded-full mix-blend-screen filter blur-[100px] opacity-20" />
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-orange-600 rounded-full mix-blend-screen filter blur-[100px] opacity-20" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <h2 className="text-center text-4xl font-serif font-bold mb-16">Fresh from the Toaster</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { q: "Our engagement didn't just go up, it exploded. The Toasted team understands culture.", author: "Sarah Jenkins, CMO at TechFlow", color: "border-blue-500" },
            { q: "Finally, an agency that doesn't use corporate speak. Bold, fast, and effective.", author: "Mark D., Founder of Sip & Co.", color: "border-orange-500" },
            { q: "They roasted our old strategy, and honestly? It was the best thing to happen to us.", author: "Elena R., VP Marketing", color: "border-teal-500" }
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              className={`bg-white/5 backdrop-blur-md border-t-4 ${item.color} p-8 rounded-2xl relative`}
            >
              <div className="text-6xl font-serif absolute top-4 left-4 opacity-10">"</div>
              <p className="text-lg font-medium leading-relaxed mb-6 relative z-10">{item.q}</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-700 to-slate-600 flex items-center justify-center font-bold">
                  {item.author[0]}
                </div>
                <div className="text-sm text-slate-400">{item.author}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-4xl text-center">
        <h2 className="text-6xl md:text-8xl font-black font-serif mb-6 tracking-tight">
          Ready to <span className="text-orange-500 italic">Heat Up?</span>
        </h2>
        <p className="text-xl text-slate-600 mb-12">Drop your details. We'll bring the matches.</p>

        <form className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl border border-slate-100 text-left relative overflow-hidden">
          {/* Form decorative border */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="space-y-2">
              <label className="text-sm font-bold uppercase tracking-wide text-slate-400">Name</label>
              <input type="text" placeholder="John Doe" className="w-full bg-slate-50 border-b-2 border-slate-200 p-4 text-lg font-bold focus:outline-none focus:border-orange-500 transition-colors" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold uppercase tracking-wide text-slate-400">Email</label>
              <input type="email" placeholder="john@company.com" className="w-full bg-slate-50 border-b-2 border-slate-200 p-4 text-lg font-bold focus:outline-none focus:border-orange-500 transition-colors" />
            </div>
          </div>
          <div className="space-y-2 mb-10">
            <label className="text-sm font-bold uppercase tracking-wide text-slate-400">What's the challenge?</label>
            <textarea rows={3} placeholder="We need more leads and cooler vibes..." className="w-full bg-slate-50 border-b-2 border-slate-200 p-4 text-lg font-bold focus:outline-none focus:border-orange-500 transition-colors resize-none"></textarea>
          </div>

          <button className="w-full bg-black text-white text-xl font-bold py-6 rounded-xl hover:bg-orange-600 transition-colors flex items-center justify-center gap-3 group">
            Send It <Zap className="group-hover:text-yellow-300 transition-colors" />
          </button>
        </form>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-white pt-20 pb-10 border-t-8 border-purple-600">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-1">
            <div className="text-3xl font-serif font-black italic mb-6">toasted.</div>
            <p className="text-slate-400 leading-relaxed mb-6">
              A digital agency for brands that refuse to be boring. Based in the cloud, grounded in results.
            </p>
            <div className="flex gap-4">
              <div className="p-2 bg-white/10 rounded-full hover:bg-blue-500 hover:text-white transition-colors cursor-pointer"><Twitter size={20} /></div>
              <div className="p-2 bg-white/10 rounded-full hover:bg-pink-500 hover:text-white transition-colors cursor-pointer"><Instagram size={20} /></div>
              <div className="p-2 bg-white/10 rounded-full hover:bg-blue-700 hover:text-white transition-colors cursor-pointer"><Linkedin size={20} /></div>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6 text-purple-400">Menu</h4>
            <ul className="space-y-4 text-slate-300">
              <li><a href="#services" className="hover:text-white hover:translate-x-1 inline-block transition-transform">Services</a></li>
              <li><a href="#work" className="hover:text-white hover:translate-x-1 inline-block transition-transform">Our Work</a></li>
              <li><a href="#about" className="hover:text-white hover:translate-x-1 inline-block transition-transform">About Us</a></li>
              <li><a href="#contact" className="hover:text-white hover:translate-x-1 inline-block transition-transform">Careers</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6 text-orange-400">Industries</h4>
            <ul className="space-y-4 text-slate-300">
              <li>E-Commerce</li>
              <li>Tech / SaaS</li>
              <li>Lifestyle</li>
              <li>Hospitality</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6 text-teal-400">Stay Toasted</h4>
            <p className="text-sm text-slate-400 mb-4">Get the hottest marketing trends delivered fresh.</p>
            <div className="flex">
              <input type="email" placeholder="Email..." className="bg-white/10 border-none px-4 py-2 w-full focus:ring-2 focus:ring-teal-400 rounded-l-md" />
              <button className="bg-teal-500 text-black font-bold px-4 py-2 rounded-r-md hover:bg-teal-400"><ArrowRight size={18} /></button>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
          <p>&copy; 2024 The Toasted Media. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Main App Component ---

export default function App() {
  return (
    <div className="antialiased selection:bg-orange-200 selection:text-orange-900 cursor-none">
      <CursorTrail />
      <StyleReset />
      <Navbar />
      <Hero />
      <Marquee />
      <BentoGrid />
      <Work />
      <Process />
      <Story />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}