"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";

const MagneticButton = ({ children, className }: { children: React.ReactNode; className?: string }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouse = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current!.getBoundingClientRect();
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);
        setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
    };

    const reset = () => {
        setPosition({ x: 0, y: 0 });
    };

    const { x, y } = position;
    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouse}
            onMouseLeave={reset}
            animate={{ x, y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

export default function MagneticNav() {
    return (
        <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-50">
            <div className="flex items-center gap-2 p-1.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 shadow-md shadow-black/20">
                <MagneticButton className="px-6 py-3 rounded-full cursor-pointer hover:bg-white/10 transition-colors group">
                    <span className="text-xs font-semibold uppercase tracking-wider text-white group-hover:text-toasted-teal transition-colors">Work</span>
                </MagneticButton>
                <MagneticButton className="px-6 py-3 rounded-full cursor-pointer hover:bg-white/10 transition-colors group">
                    <span className="text-xs font-semibold uppercase tracking-wider text-white group-hover:text-toasted-pink transition-colors">About</span>
                </MagneticButton>
                <MagneticButton className="px-8 py-3 rounded-full cursor-pointer bg-toasted-orange text-black font-bold hover:bg-toasted-yellow transition-colors">
                    <span className="text-xs font-black uppercase tracking-wider">Contact</span>
                </MagneticButton>
            </div>
        </nav>
    );
}
