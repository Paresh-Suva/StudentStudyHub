"use client";

import { motion } from "framer-motion";

export default function Loading() {
    return (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050505]/90 backdrop-blur-md text-white">

            {/* Cyber Spinner */}
            <div className="relative h-24 w-24 mb-8">
                {/* Outer Ring */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 rounded-full border-t-2 border-r-2 border-cyan-500/30"
                />
                {/* Inner Ring (Counter-rotating) */}
                <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-4 rounded-full border-b-2 border-l-2 border-cyan-400"
                />
                {/* Center Dot */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,1)]" />
                </div>
            </div>

            {/* Text */}
            <h2 className="text-xl font-bold tracking-widest text-white uppercase mb-4">
                <span className="animate-pulse">Initializing...</span>
            </h2>

            {/* Progress Bar */}
            <div className="h-1 w-48 overflow-hidden rounded-full bg-white/10">
                <motion.div
                    initial={{ x: "-100%" }}
                    animate={{ x: "0%" }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="h-full w-full bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.8)]"
                />
            </div>

        </div>
    );
}
