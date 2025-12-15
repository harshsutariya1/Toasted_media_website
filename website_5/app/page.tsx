'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate, AnimatePresence } from 'framer-motion';
import { ArrowRight, Instagram, TrendingUp, PenTool, Search, Send, Menu, X, Check } from 'lucide-react';

// --- Brand Colors & Assets ---
const BRAND_COLORS = {
  blue: '#3b82f6',
  orange: '#f97316',
  yellow: '#eab308',
  purple: '#a855f7',
  teal: '#14b8a6',
  dark: '#0a0a0a',
  light: '#f5f5f5',
};

const BRAND_GRADIENT = `linear-gradient(to right, ${BRAND_COLORS.blue}, ${BRAND_COLORS.orange}, ${BRAND_COLORS.yellow}, ${BRAND_COLORS.purple}, ${BRAND_COLORS.teal})`;

// --- Reusable Components ---

// 1. Magnetic Button
interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const MagneticButton = ({ children, className = "", onClick }: MagneticButtonProps) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.15, y: middleY * 0.15 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;

  return (
    <motion.button
      ref={ref}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      onClick={onClick}
      className={`relative group overflow-hidden rounded-full px-8 py-4 font-sans font-medium text-white transition-all duration-300 ${className}`}
      style={{ backgroundColor: 'transparent' }} // Handled by inner layers
    >
      {/* Background Layers for "Spectral Separation" on Hover */}
      <span className="absolute inset-0 bg-neutral-900 z-10 transition-colors group-hover:bg-black" />

      {/* Colorful borders/glows that reveal on hover */}
      <span className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0 blur-md" />

      {/* Border ring */}
      <span className="absolute inset-0 rounded-full border border-white/20 z-20 group-hover:border-transparent transition-colors" />

      <div className="relative z-30 flex items-center gap-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:via-purple-400 group-hover:to-orange-400 transition-all">
        {children}
      </div>
    </motion.button>
  );
};

// 2. Section Wrapper
interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

const Section = ({ children, className = "", id = "" }: SectionProps) => (
  <section id={id} className={`relative px-6 py-24 md:px-12 md:py-32 ${className}`}>
    {children}
  </section>
);

// --- Main App Component ---

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-[#0a0a0a] min-h-screen text-[#f5f5f5] selection:bg-orange-500 selection:text-white overflow-x-hidden font-sans">
      {/* Inject Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;400;600;700&family=Inter:wght@300;400;500;600&display=swap');
        
        .font-serif { font-family: 'Fraunces', serif; }
        .font-sans { font-family: 'Inter', sans-serif; }
        
        /* Custom Scrollbar */
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #0a0a0a; }
        ::-webkit-scrollbar-thumb { background: #333; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: #555; }
      `}</style>

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-12 flex justify-between items-center transition-all duration-300 ${isScrolled ? 'bg-black/80 backdrop-blur-md py-4 shadow-lg border-b border-white/10' : 'py-6 mix-blend-difference'
        } text-white`}>
        <a href="#" className="flex items-center gap-3 text-2xl font-serif font-bold tracking-tighter relative group">
          <div className="w-10 h-10 rounded-full overflow-hidden border border-white/20">
            <img src="/logo.jpg" alt="The Toasted Media Logo" className="w-full h-full object-cover" />
          </div>
          <span>the toasted media</span>
          <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-orange-500 transition-all group-hover:w-full"></span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 font-sans text-sm tracking-wide">
          {['Services', 'Process', 'Story', 'Contact'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-orange-400 transition-colors">
              {item}
            </a>
          ))}
          <MagneticButton className="!px-6 !py-2 text-xs uppercase tracking-widest border-white/20">
            Let's Talk
          </MagneticButton>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-[#0a0a0a] z-40 flex flex-col items-center justify-center gap-8 text-3xl font-serif"
          >
            {['Services', 'Process', 'Story', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setIsMenuOpen(false)}>
                {item}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <Hero />

      {/* Industries Ticker */}
      <IndustryTicker />

      {/* Services Section */}
      <Services />

      {/* Story Timeline */}
      <CompanyStory />

      {/* Process Section */}
      <Process />

      {/* Testimonials */}
      <Testimonials />

      {/* Contact & Footer */}
      <Footer />

      {/* Scroll Progress Bar */}
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="fixed bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-orange-500 to-purple-500 origin-left z-50"
      />
    </div>
  );
}

// --- Sub-Components ---

const Hero = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set(clientX / innerWidth);
    mouseY.set(clientY / innerHeight);
  };

  return (
    <div
      className="relative h-screen w-full flex flex-col justify-center items-center overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Background Abstract "Prism" Effect */}
      <div className="absolute inset-0 z-0 opacity-40">
        {[BRAND_COLORS.blue, BRAND_COLORS.orange, BRAND_COLORS.purple, BRAND_COLORS.teal, BRAND_COLORS.yellow].map((color, i) => (
          <motion.div
            key={i}
            className="absolute top-1/2 left-1/2 w-[60vw] h-[60vw] rounded-full blur-[100px]"
            style={{
              backgroundColor: color,
              x: useTransform(mouseX, [0, 1], [-50 * (i + 1), 50 * (i + 1)]),
              y: useTransform(mouseY, [0, 1], [-30 * (i + 1), 30 * (i + 1)]),
              opacity: useTransform(mouseX, [0, 0.5, 1], [0.3, 0.6, 0.3]),
              translateX: '-50%',
              translateY: '-50%',
              scale: 1 - (i * 0.1),
            }}
          />
        ))}
      </div>

      {/* Grid Texture */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 z-0"></div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="inline-block py-1 px-3 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-xs font-sans tracking-widest uppercase mb-6 text-orange-400">
            Digital Alchemy
          </span>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif font-bold leading-[0.9] tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-neutral-500 mb-8">
            We Don't Just Post. <br />
            <span className="italic font-light text-white mix-blend-overlay">We Ignite.</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="flex justify-center mt-8"
        >
          <MagneticButton>
            Start The Fire <ArrowRight className="w-4 h-4" />
          </MagneticButton>
        </motion.div>
      </div>
    </div>
  );
};

const IndustryTicker = () => {
  return (
    <div className="w-full bg-[#0a0a0a] border-y border-white/10 py-6 overflow-hidden flex">
      <motion.div
        className="flex whitespace-nowrap gap-16 text-neutral-500 font-sans font-medium text-lg uppercase tracking-widest items-center"
        animate={{ x: [0, -1000] }}
        transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
      >
        {[...Array(2)].map((_, i) => (
          <React.Fragment key={i}>
            <span>E-Commerce</span> <span className="text-orange-500 text-xs">●</span>
            <span>SaaS</span> <span className="text-blue-500 text-xs">●</span>
            <span>Fintech</span> <span className="text-purple-500 text-xs">●</span>
            <span>Hospitality</span> <span className="text-teal-500 text-xs">●</span>
            <span>Real Estate</span> <span className="text-yellow-500 text-xs">●</span>
            <span>Healthcare</span> <span className="text-orange-500 text-xs">●</span>
            <span>Fashion</span> <span className="text-blue-500 text-xs">●</span>
            <span>Technology</span> <span className="text-purple-500 text-xs">●</span>
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
};

const Services = () => {
  const services = [
    { title: "Social Media", icon: Instagram, desc: "Community management & viral strategies.", color: "from-blue-500 to-cyan-500", span: "md:col-span-2 md:row-span-2" },
    { title: "SEO & Blogging", icon: Search, desc: "Ranking you where it matters most.", color: "from-orange-500 to-red-500", span: "md:col-span-1 md:row-span-1" },
    { title: "Paid Ads", icon: TrendingUp, desc: "High ROAS campaigns across Meta & Google.", color: "from-purple-500 to-pink-500", span: "md:col-span-1 md:row-span-1" },
    { title: "Content Creation", icon: PenTool, desc: "Visuals that stop the scroll.", color: "from-teal-500 to-emerald-500", span: "md:col-span-2 md:row-span-1" },
  ];

  return (
    <Section id="services" className="bg-[#0f0f0f]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 md:flex justify-between items-end"
        >
          <h2 className="text-5xl md:text-7xl font-serif font-light">
            Our <span className="italic text-neutral-500">Craft</span>
          </h2>
          <p className="md:max-w-xs text-neutral-400 mt-6 md:mt-0">
            We blend data with design to create campaigns that don't just look good—they convert.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[200px] md:auto-rows-[250px]">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`group relative p-8 rounded-2xl bg-[#0a0a0a] border border-white/5 overflow-hidden hover:border-transparent transition-all duration-500 ${service.span}`}
            >
              {/* Hover Gradient Border Effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`} style={{ margin: '-1px' }} />
              <div className="absolute inset-[1px] bg-[#0a0a0a] rounded-[15px] z-0" />

              <div className="relative z-10 h-full flex flex-col justify-between">
                <div className={`w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors`}>
                  <service.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-serif mb-2">{service.title}</h3>
                  <p className="text-sm text-neutral-500 group-hover:text-neutral-300 transition-colors">{service.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
};

const CompanyStory = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });

  const milestones = [
    { year: "2020", title: "The Spark", desc: "Founded in a garage with nothing but a laptop and too much coffee." },
    { year: "2021", title: "The Heat", desc: "Landed our first Fortune 500 client. Realized we needed a bigger office." },
    { year: "2023", title: "The Toast", desc: "Rebranded to 'The Toasted Media'. 50+ Team members across 3 continents." },
    { year: "2025", title: "The Blaze", desc: "Launching proprietary AI tools to revolutionize ad spend optimization." },
  ];

  return (
    <Section id="story">
      <div ref={containerRef} className="max-w-5xl mx-auto flex flex-col md:flex-row gap-16">
        <div className="md:w-1/3 sticky top-32 h-fit">
          <h2 className="text-4xl md:text-6xl font-serif leading-tight">
            From raw ideas to <span className="text-orange-500">perfectly toasted</span> results.
          </h2>
        </div>

        <div className="md:w-2/3 relative pl-8 md:pl-16 border-l border-white/10">
          {milestones.map((item, index) => (
            <StoryItem key={index} item={item} index={index} />
          ))}
        </div>
      </div>
    </Section>
  );
};

interface StoryItemProps {
  item: {
    year: string;
    title: string;
    desc: string;
  };
  index: number;
}

const StoryItem = ({ item, index }: StoryItemProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="mb-24 relative"
    >
      <span className="absolute -left-[41px] md:-left-[73px] top-2 w-4 h-4 rounded-full bg-neutral-800 border-2 border-orange-500 z-10" />
      <span className="text-8xl font-serif text-white/5 absolute -top-10 -left-4 -z-10 select-none">
        {item.year}
      </span>
      <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
      <p className="text-neutral-400">{item.desc}</p>
    </motion.div>
  );
};

const Process = () => {
  const steps = [
    { num: "01", title: "Discovery", desc: "We deep dive into your brand DNA." },
    { num: "02", title: "Strategy", desc: "Mapping the path to domination." },
    { num: "03", title: "Execution", desc: "High-octane content & campaigns." },
    { num: "04", title: "Optimization", desc: "Refining data for better ROI." },
  ];

  return (
    <Section id="process" className="bg-[#0f0f0f]">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-center text-4xl md:text-5xl font-serif mb-24">The Process</h2>

        <div className="relative grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-12 left-0 w-full h-[2px] bg-white/10">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 via-orange-500 to-purple-500"
              initial={{ width: "0%" }}
              whileInView={{ width: "100%" }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          </div>

          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="relative pt-8 md:pt-16 px-4 text-center md:text-left"
            >
              <div className="md:absolute top-8 left-0 w-8 h-8 rounded-full bg-[#0f0f0f] border border-orange-500 flex items-center justify-center text-xs font-bold mx-auto md:mx-0 z-10 mb-4 md:mb-0">
                <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
              </div>
              <h4 className="text-6xl font-serif text-white/5 mb-4">{step.num}</h4>
              <h3 className="text-xl font-bold mb-2">{step.title}</h3>
              <p className="text-sm text-neutral-400">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
};

const Testimonials = () => {
  const [active, setActive] = useState(0);
  const testimonials = [
    { quote: "They didn't just understand our brand, they elevated it to a level we didn't think possible.", author: "Sarah Jenkins, CEO TechFlow" },
    { quote: "The ROI on our paid ads increased by 200% in the first three months. Absolute wizards.", author: "Marcus Thorne, CMO Veloce" },
    { quote: "Finally, an agency that cares about the bottom line as much as the creative.", author: "Elena Rodriguez, Founder Aura" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <Section className="flex items-center justify-center py-32">
      <div className="max-w-4xl mx-auto text-center relative px-6">
        <span className="text-9xl font-serif text-orange-500/20 absolute -top-12 left-0">“</span>

        <div className="h-[200px] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-2xl md:text-4xl font-serif leading-relaxed mb-8 text-white">
                {testimonials[active].quote}
              </p>
              <p className="text-sm font-sans tracking-widest uppercase text-neutral-500">
                — {testimonials[active].author}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${active === i ? 'w-8 bg-orange-500' : 'bg-white/20'}`}
            />
          ))}
        </div>
      </div>
    </Section>
  );
};

const Footer = () => {
  const [activeInterest, setActiveInterest] = useState<string | null>(null);

  const interests = [
    "Social Media", "Paid Ads", "Content Creation", "SEO & Blogging", "Other"
  ];

  return (
    <footer className="bg-[#050505] pt-32 pb-12 relative overflow-hidden" id="contact">
      {/* Background Gradients */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-24 mb-32 relative z-10">

        {/* Left Column: Information */}
        <div className="flex flex-col justify-between">
          <div>
            <span className="text-orange-500 font-sans text-sm tracking-widest uppercase mb-6 block">Contact Us</span>
            <h2 className="text-5xl md:text-7xl font-serif font-medium leading-tight mb-8">
              Got a vision? <br />
              Let’s <span className="italic text-neutral-500">ignite</span> it.
            </h2>
            <p className="text-neutral-400 text-lg max-w-md mb-12">
              We help ambitious brands scale through creative strategy and data-driven execution.
              Ready to start?
            </p>

            <div className="flex flex-col gap-6">
              <a href="mailto:hello@thetoastedmedia.com" className="text-3xl md:text-4xl text-white hover:text-orange-500 transition-colors font-serif border-b border-white/20 hover:border-orange-500 pb-2 w-fit">
                hello@thetoastedmedia.com
              </a>
              <p className="text-neutral-500 text-xl font-sans">+91 987-654-3210</p>
            </div>
          </div>

          <div className="mt-16 flex gap-6">
            <SocialLink icon={<Instagram />} href="#" />
            <SocialLink icon={<TrendingUp />} href="#" />
            <SocialLink icon={<Send />} href="#" />
          </div>
        </div>

        {/* Right Column: Interactive Form */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-3xl relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-orange-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />

          <form className="space-y-8">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FloatingInput label="Your Name" />
                <FloatingInput label="Email Address" type="email" />
              </div>
              <FloatingInput label="Company Website" />

              <div>
                <label className="block text-sm text-neutral-400 mb-4 font-sans tracking-wide">I'm interested in...</label>
                <div className="flex flex-wrap gap-3">
                  {interests.map((interest) => (
                    <button
                      key={interest}
                      type="button"
                      onClick={() => setActiveInterest(interest)}
                      className={`px-4 py-2 rounded-full text-sm border transition-all duration-300 ${activeInterest === interest
                        ? 'bg-white text-black border-white'
                        : 'bg-transparent text-neutral-400 border-white/20 hover:border-white/50'
                        }`}
                    >
                      {interest}
                    </button>
                  ))}
                </div>
              </div>

              <FloatingInput label="Tell us about your project" textarea />
            </div>

            <button type="submit" className="w-full bg-white text-black py-4 rounded-xl font-bold hover:bg-orange-500 hover:text-white transition-all duration-300 flex items-center justify-center gap-2 group/btn">
              Send Message <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </form>
        </div>

      </div>

      {/* Massive Footer Text */}
      <div className="relative w-full overflow-hidden leading-none mt-24 mb-12 select-none pointer-events-none flex justify-center">
        <h1 className="text-[7vw] md:text-[8vw] font-serif font-bold text-center tracking-tighter text-[#1a1a1a] whitespace-nowrap">
          THE TOASTED MEDIA
        </h1>
      </div>

      <div className="border-t border-white/10 pt-12 pb-6 px-6 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-neutral-500 text-sm">
        <div className="flex gap-8">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
        </div>
        <p>© 2025 The Toasted Media. All rights reserved.</p>
      </div>

    </footer>
  );
};

const SocialLink = ({ icon, href }: { icon: React.ReactNode, href: string }) => (
  <a href={href} className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300 hover:scale-110">
    {icon}
  </a>
);

const FloatingInput = ({ label, type = "text", textarea = false }: { label: string, type?: string, textarea?: boolean }) => {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState("");

  const Element = textarea ? 'textarea' : 'input';

  return (
    <div className="relative">
      <div className={`absolute left-0 transition-all duration-300 ${focused || value ? '-top-6 text-xs text-orange-500' : 'top-3 text-neutral-500'
        }`}>
        {label}
      </div>
      {textarea ? (
        <textarea
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={(e) => setValue(e.target.value)}
          className="w-full bg-transparent border-b border-white/20 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors h-32 resize-none"
        />
      ) : (
        <input
          type={type}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={(e) => setValue(e.target.value)}
          className="w-full bg-transparent border-b border-white/20 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors"
        />
      )}
    </div>
  );
};