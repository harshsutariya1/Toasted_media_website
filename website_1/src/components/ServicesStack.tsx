"use client";

import { useScroll, useTransform, motion, MotionValue } from "framer-motion";
import { useRef } from "react";

const services = [
    {
        title: "SEO Optimization",
        description: "Dominate the rankings with heat-seeking keywords that burn through the noise.",
        color: "#00E5FF", // Teal
    },
    {
        title: "Content Strategy",
        description: "Stories that ignite interest and spread like wildfire across your audience.",
        color: "#9D00FF", // Purple
    },
    {
        title: "PPC Performance",
        description: "Instant voltage. High-frequency campaigns that convert cold leads into hot customers.",
        color: "#FF5E00", // Orange
    }
];

interface CardProps {
    i: number;
    title: string;
    description: string;
    color: string;
    progress: MotionValue<number>;
    range: [number, number];
    targetScale: number;
}

const Card = ({ i, title, description, color, progress, range, targetScale }: CardProps) => {
    const container = useRef(null);

    // Scale down as the scroll progresses past this card's active window
    // When next card comes up, this card scales to targetScale.
    const scale = useTransform(progress, range, [1, targetScale]);

    // Optionally fade it out? User didn't ask, but "deck of cards" Usually stays visible.

    return (
        <div ref={container} className="h-screen flex items-center justify-center sticky top-0">
            <motion.div
                style={{
                    scale,
                    top: `calc(-10vh + ${i * 25}px)` // Offset slightly to see the stack effect
                }}
                className="relative flex flex-col justify-center h-[500px] w-[90vw] md:w-[800px] rounded-3xl p-12 border border-white/10 glass-panel overflow-hidden transform-gpu origin-top"
            >
                {/* Glow Border Effect */}
                <div
                    className="absolute inset-0 rounded-3xl opacity-50 pointer-events-none transition-opacity duration-500"
                    style={{ boxShadow: `inset 0 0 40px ${color}20` }}
                />

                {/* Gradient Blob */}
                <div
                    className="absolute -top-20 -right-20 w-96 h-96 rounded-full blur-[100px] opacity-20 pointer-events-none"
                    style={{ backgroundColor: color }}
                />

                <div className="relative z-10">
                    <h2 className="text-4xl md:text-6xl font-black mb-6 uppercase tracking-tighter" style={{ color: color, textShadow: `0 0 20px ${color}40` }}>
                        {title}
                    </h2>
                    <p className="text-lg md:text-2xl font-light text-white/80 max-w-md leading-relaxed">
                        {description}
                    </p>

                    <div className="mt-8 flex items-center gap-4 cursor-pointer group">
                        <div className="h-[1px] w-12 bg-white/30 group-hover:w-24 transition-all duration-300" />
                        <span className="text-sm font-bold uppercase tracking-widest opacity-70 group-hover:opacity-100 transition-opacity">Learn More</span>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

export default function ServicesStack() {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start start', 'end end']
    });

    return (
        <section ref={container} className="relative content-container bg-toasted-black" style={{ height: `${services.length * 100}vh` }}>
            {/* Scroll indicator or title? Optional */}
            <div className="sticky top-20 text-center mb-10 z-0 opacity-50">
                <span className="text-xs font-mono text-white/40">OUR SERVICES</span>
            </div>

            {services.map((service, i) => {
                // Calculate the range for scaling.
                // Card i scales from 1 to targetScale as scroll goes from i/N to 1
                // This is a naive approximation but works for "Stacking".

                const targetScale = 1 - ((services.length - 1 - i) * 0.05);
                return (
                    <Card
                        key={i}
                        i={i}
                        {...service}
                        progress={scrollYProgress}
                        range={[i * 0.25, 1]}
                        targetScale={targetScale}
                    />
                );
            })}
        </section>
    );
}
