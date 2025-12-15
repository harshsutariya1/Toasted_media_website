"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useSpring } from 'framer-motion';
import {
  Menu, X, Moon, Sun, ArrowRight, CheckCircle, BarChart3,
  Globe, Zap, Users, Send, Layers, ChevronRight, TrendingUp,
  MessageSquare, LayoutGrid, Award, Briefcase, PlayCircle
} from 'lucide-react';
import { useForm } from 'react-hook-form';

// --- Brand Colors & Config ---
const COLORS = {
  blue: '#2f72e7',
  orange: '#f78f2d',
  yellow: '#f7c73d',
  purple: '#7e3af1',
  teal: '#00c1a3',
};

// --- Components ---

// 1. Navigation
const Navbar = ({ darkMode, toggleTheme }: { darkMode: boolean; toggleTheme: () => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Work', href: '#work' },
    { name: 'Process', href: '#process' },
    { name: 'About', href: '#story' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${isScrolled
        ? 'bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-slate-200 dark:border-slate-800 py-4'
        : 'bg-transparent border-transparent py-6'
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo Area */}
        <a href="#" className="text-2xl font-bold tracking-tighter flex items-center gap-2 group">
          <div className="relative w-8 h-8 overflow-hidden rounded-lg bg-gradient-to-br from-[#2f72e7] via-[#7e3af1] to-[#f78f2d] group-hover:rotate-12 transition-transform duration-500">
            <span className="absolute inset-0 flex items-center justify-center text-white font-serif italic text-lg">t</span>
          </div>
          <span className="dark:text-white text-slate-900">
            The Toasted<span className="text-[#f78f2d]">.</span>
          </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-400"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <a href="#contact" className="px-5 py-2.5 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-semibold hover:opacity-90 transition-opacity">
            Start Project
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-slate-600 dark:text-slate-300"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-lg font-medium text-slate-900 dark:text-white"
                >
                  {link.name}
                </a>
              ))}
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100 dark:border-slate-900">
                <span className="text-slate-500">Theme</span>
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-full bg-slate-100 dark:bg-slate-800"
                >
                  {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

// 2. Hero Section
const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

        {/* Left: Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-[#2f72e7] text-xs font-bold uppercase tracking-wider mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2f72e7] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2f72e7]"></span>
            </span>
            Accepting New Clients for 2025
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 dark:text-white mb-6 leading-[1.1]">
            We <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f78f2d] via-[#f7c73d] to-[#f78f2d]">Toast</span> the <br /> Competition.
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-8 max-w-lg leading-relaxed">
            A digital growth agency fusing data-driven strategy with world-class creative to scale brands faster than you can say "breakfast."
          </p>
          <div className="flex flex-wrap gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#2f72e7] to-[#7e3af1] text-white font-semibold shadow-lg shadow-blue-500/30 flex items-center gap-2"
            >
              Get Your Audit <ArrowRight size={18} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 font-semibold flex items-center gap-2"
            >
              View Work <PlayCircle size={18} />
            </motion.button>
          </div>
        </motion.div>

        {/* Right: Bento Visualization */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative h-[500px] w-full"
        >
          {/* Abstract Grid Container */}
          <div className="absolute inset-0 grid grid-cols-2 grid-rows-6 gap-4">

            {/* Main Growth Card */}
            <motion.div
              whileHover={{ y: -5 }}
              className="col-span-2 row-span-3 bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-3xl p-6 shadow-2xl relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#2f72e7]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-slate-500 dark:text-slate-400 text-sm font-medium">Total Reach</h3>
                  <p className="text-3xl font-bold text-slate-900 dark:text-white">2.4M+</p>
                </div>
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg text-green-600 dark:text-green-400">
                  <TrendingUp size={20} />
                </div>
              </div>
              {/* Fake Graph */}
              <div className="h-32 flex items-end gap-2">
                {[40, 65, 45, 80, 55, 90, 75, 100].map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ duration: 1, delay: i * 0.1 }}
                    className="flex-1 bg-gradient-to-t from-[#2f72e7] to-[#7e3af1] rounded-t-sm opacity-80"
                  />
                ))}
              </div>
            </motion.div>

            {/* Client Avatar Stack */}
            <motion.div
              whileHover={{ y: -5 }}
              className="col-span-1 row-span-3 bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-3xl p-6 flex flex-col justify-center items-center shadow-xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#f78f2d]/20 rounded-full blur-2xl -mr-10 -mt-10" />
              <div className="flex -space-x-4 mb-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className={`w-12 h-12 rounded-full border-2 border-white dark:border-slate-800 bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-xs font-bold`}>
                    {i === 1 ? 'N' : i === 2 ? 'A' : 'T'}
                  </div>
                ))}
              </div>
              <p className="text-center font-semibold text-slate-900 dark:text-white">50+ Active Clients</p>
              <div className="mt-2 flex gap-1">
                {[1, 2, 3, 4, 5].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#f7c73d]" />)}
              </div>
            </motion.div>

            {/* ROI Card */}
            <motion.div
              whileHover={{ y: -5 }}
              className="col-span-1 row-span-3 bg-[#00c1a3] text-white rounded-3xl p-6 flex flex-col justify-between shadow-xl relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
              <Award className="w-8 h-8 opacity-80" />
              <div>
                <p className="text-3xl font-bold">300%</p>
                <p className="text-white/80 text-sm">Avg. ROI</p>
              </div>
            </motion.div>

          </div>
        </motion.div>
      </div>

      {/* Background Decor */}
      <div className="absolute top-0 right-0 -z-10 w-[800px] h-[800px] bg-gradient-to-b from-[#2f72e7]/10 to-transparent rounded-full blur-3xl opacity-50 pointer-events-none" />
      <div className="absolute bottom-0 left-0 -z-10 w-[600px] h-[600px] bg-gradient-to-t from-[#f78f2d]/10 to-transparent rounded-full blur-3xl opacity-50 pointer-events-none" />
    </section>
  );
};

// 3. Services (Bento Grid)
const Services = () => {
  const services = [
    { title: "Paid Social", icon: <Zap />, desc: "High-octane ad campaigns that convert.", color: "group-hover:shadow-[#f78f2d]/50", border: "group-hover:border-[#f78f2d]/50" },
    { title: "Content Strategy", icon: <Layers />, desc: "Storytelling that sticks like burnt toast.", color: "group-hover:shadow-[#2f72e7]/50", border: "group-hover:border-[#2f72e7]/50" },
    { title: "SEO & Growth", icon: <TrendingUp />, desc: "Climb the ranks and dominate search.", color: "group-hover:shadow-[#00c1a3]/50", border: "group-hover:border-[#00c1a3]/50" },
    { title: "Brand Identity", icon: <LayoutGrid />, desc: "Visuals so good they can't look away.", color: "group-hover:shadow-[#7e3af1]/50", border: "group-hover:border-[#7e3af1]/50" },
    { title: "Community Mgmt", icon: <MessageSquare />, desc: "Building tribes, not just followers.", color: "group-hover:shadow-[#f7c73d]/50", border: "group-hover:border-[#f7c73d]/50" },
    { title: "Web Dev", icon: <Globe />, desc: "Blazing fast sites (like this one).", color: "group-hover:shadow-[#2f72e7]/50", border: "group-hover:border-[#2f72e7]/50" },
  ];

  return (
    <section id="services" className="py-24 bg-slate-50 dark:bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Our Menu</h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl">Full-service digital nutrition for your brand.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              className={`group relative p-8 bg-white dark:bg-slate-950 rounded-3xl border border-slate-200 dark:border-slate-800 transition-all duration-300 hover:shadow-2xl ${s.color} ${s.border}`}
            >
              <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-900 flex items-center justify-center text-slate-900 dark:text-white mb-6 group-hover:scale-110 transition-transform">
                {s.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{s.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// 4. Marquee Industries
const Marquee = () => {
  const industries = [
    { name: "E-Commerce", icon: <Briefcase /> },
    { name: "SaaS", icon: <Zap /> },
    { name: "Hospitality", icon: <Users /> },
    { name: "FinTech", icon: <TrendingUp /> },
    { name: "Health & Wellness", icon: <Award /> },
    { name: "Real Estate", icon: <LayoutGrid /> },
  ];

  return (
    <div className="py-12 bg-white dark:bg-slate-950 border-y border-slate-100 dark:border-slate-800 overflow-hidden">
      <div className="flex w-full whitespace-nowrap">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ x: "-100%" }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            className="flex gap-16 px-8"
          >
            {industries.map((ind, idx) => (
              <div key={idx} className="flex items-center gap-3 text-slate-400 dark:text-slate-600 text-xl font-bold uppercase tracking-widest">
                {ind.icon}
                {ind.name}
              </div>
            ))}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// 5. Scroll Telling Story
const Story = () => {
  return (
    <section id="story" className="py-32 bg-slate-900 text-white relative">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16">
        <div className="lg:sticky lg:top-32 h-fit">
          <h2 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            More than just<br />an agency.
          </h2>
          <p className="text-xl text-slate-400 leading-relaxed mb-8">
            We started "The Toasted Media" with a simple belief: most marketing is stale. Cold. Boring.
            <br /><br />
            We wanted to bring the heat. To create campaigns that are crisp, warm, and impossible to ignore.
          </p>
          <button className="text-white border-b border-white pb-1 hover:text-blue-400 hover:border-blue-400 transition-colors">
            Read the full manifesto
          </button>
        </div>

        <div className="space-y-24">
          {[
            { title: "2019: The Spark", desc: "Founded in a small apartment with one laptop and too much coffee.", color: "bg-orange-500" },
            { title: "2021: The Heat", desc: "Scaled to 20 employees and hit our first $5M in client revenue generated.", color: "bg-yellow-500" },
            { title: "2024: The Roast", desc: "Recognized as the fastest growing creative shop in the region.", color: "bg-blue-500" },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ margin: "-100px" }}
              className="group"
            >
              <div className={`w-full aspect-video rounded-3xl ${item.color} mb-6 opacity-80 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-[1.02] flex items-center justify-center`}>
                <span className="text-white/20 text-9xl font-black">{item.title.split(':')[0]}</span>
              </div>
              <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
              <p className="text-slate-400">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// 6. Process Section (Vertical Timeline)
const Process = () => {
  const steps = [
    { id: "01", title: "Discovery", desc: "We dig deep into your data, auditing every channel to find the hidden gold." },
    { id: "02", title: "Strategy", desc: "We build a custom roadmap. No templates. Just pure, toasted strategy." },
    { id: "03", title: "Execution", desc: "Our team goes to work. Design, copy, code, and ads launch in sync." },
    { id: "04", title: "Optimization", desc: "We don't set and forget. We tweak, test, and toast until it's perfect." },
  ];

  return (
    <section id="process" className="py-32 bg-white dark:bg-slate-950">
      <div className="max-w-4xl mx-auto px-6 relative">
        <h2 className="text-4xl font-bold text-center mb-20 text-slate-900 dark:text-white">How We Work</h2>

        {/* Central Line */}
        <div className="absolute left-[27px] md:left-1/2 top-32 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-800" />

        <div className="space-y-12">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              className={`flex flex-col md:flex-row gap-8 items-start relative ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
            >
              {/* Timeline Node */}
              <div className="absolute left-0 md:left-1/2 -translate-x-[5px] md:-translate-x-1/2 w-14 h-14 rounded-full bg-white dark:bg-slate-950 border-4 border-slate-100 dark:border-slate-800 flex items-center justify-center z-10 shadow-lg">
                <span className="font-bold text-slate-400 text-sm">{step.id}</span>
              </div>

              {/* Spacer for Desktop */}
              <div className="hidden md:block w-1/2" />

              {/* Content Card */}
              <div className="pl-20 md:pl-0 w-full md:w-1/2">
                <div className={`p-8 bg-slate-50 dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 hover:border-[#2f72e7] transition-colors duration-300 ${i % 2 === 0 ? 'md:mr-12' : 'md:ml-12'}`}>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{step.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400">{step.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// 7. Contact Form
const Contact = () => {
  type ContactFormData = {
    name: string;
    email: string;
    message: string;
  };

  const { register, handleSubmit, formState: { errors } } = useForm<ContactFormData>();

  const onSubmit = (data: ContactFormData) => {
    alert(JSON.stringify(data));
    // In real app, send to API
  };

  return (
    <section id="contact" className="py-24 bg-slate-100 dark:bg-slate-900 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-[#2f72e7]/20 to-[#f78f2d]/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-xl mx-auto px-6 relative z-10">
        <div className="bg-white/70 dark:bg-slate-950/70 backdrop-blur-2xl p-8 md:p-12 rounded-[2rem] shadow-2xl border border-white/50 dark:border-slate-800">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Let's Get Toasted</h2>
          <p className="text-slate-500 mb-8">Tell us about your project. We'll bring the jam.</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Name</label>
              <input
                {...register("name", { required: true })}
                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-[#2f72e7] transition-all"
                placeholder="Jane Doe"
              />
              {errors.name && <span className="text-red-500 text-xs mt-1">Name is required</span>}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email</label>
              <input
                {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-[#2f72e7] transition-all"
                placeholder="jane@company.com"
              />
              {errors.email && <span className="text-red-500 text-xs mt-1">Valid email is required</span>}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Message</label>
              <textarea
                {...register("message", { required: true })}
                rows={4}
                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-[#2f72e7] transition-all"
                placeholder="Tell us your goals..."
              />
              {errors.message && <span className="text-red-500 text-xs mt-1">Message is required</span>}
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full py-4 rounded-xl bg-gradient-to-r from-[#2f72e7] via-[#7e3af1] to-[#f78f2d] text-white font-bold shadow-lg shadow-purple-500/30"
            >
              Send Message
            </motion.button>
          </form>
        </div>
      </div>
    </section>
  );
};

// 8. Footer
const Footer = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 py-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          <a href="#" className="text-2xl font-bold tracking-tighter text-white mb-4 block">
            The Toasted<span className="text-[#f78f2d]">.</span>
          </a>
          <p className="max-w-xs">Digital craftsmanship for brands that dare to be different.</p>
        </div>

        <div>
          <h4 className="text-white font-bold mb-4">Company</h4>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-[#2f72e7] transition-colors">Work</a></li>
            <li><a href="#" className="hover:text-[#2f72e7] transition-colors">Services</a></li>
            <li><a href="#" className="hover:text-[#2f72e7] transition-colors">About</a></li>
            <li><a href="#" className="hover:text-[#2f72e7] transition-colors">Careers</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-4">Connect</h4>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-[#2f72e7] transition-colors">Instagram</a></li>
            <li><a href="#" className="hover:text-[#2f72e7] transition-colors">LinkedIn</a></li>
            <li><a href="#" className="hover:text-[#2f72e7] transition-colors">Twitter</a></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center text-sm">
        <p>&copy; 2025 The Toasted Media. All rights reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

// Main App Wrapper
export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  // Initialize theme based on preference
  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true);
    }
  }, []);

  const toggleTheme = () => setDarkMode(!darkMode);

  return (
    <div className={`transition-colors duration-500 ${darkMode ? 'dark' : ''}`}>
      <div className="min-h-screen bg-white dark:bg-black font-sans selection:bg-[#f78f2d] selection:text-white transition-colors duration-500">
        <Navbar darkMode={darkMode} toggleTheme={toggleTheme} />
        <main>
          <Hero />
          <Marquee />
          <Services />
          <Story />
          <Process />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}