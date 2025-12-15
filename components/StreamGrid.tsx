"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Cpu, HeartPulse, ArrowRight } from "lucide-react";
import { clsx } from "clsx";

// --- Custom Background Components (Restored Neon) ---

const CircuitBackground = ({ color = "#3b82f6" }: { color?: string }) => {
    return (
        <div className="absolute inset-0 z-0 overflow-hidden opacity-20 transition-opacity duration-300 group-hover:opacity-40">
            <svg className="h-full w-full" viewBox="0 0 400 400" preserveAspectRatio="none">
                {/* Static Grid Lines */}
                <path d="M40,0 V400 M80,0 V400 M120,0 V400 M160,0 V400 M200,0 V400 M240,0 V400 M280,0 V400 M320,0 V400 M360,0 V400" stroke={color} strokeWidth="0.5" opacity="0.1" />
                <path d="M0,40 H400 M0,80 H400 M0,120 H400 M0,160 H400 M0,200 H400 M0,240 H400 M0,280 H400 M0,320 H400 M0,360 H400" stroke={color} strokeWidth="0.5" opacity="0.1" />

                {/* Circuit Paths - Neon */}
                <motion.path
                    d="M20,20 H100 V100 H200 V50 H300"
                    stroke={color} strokeWidth="1.5" fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: [0, 1, 1, 0], opacity: [0, 1, 1, 0], pathOffset: [0, 0, 1, 1] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />
                <motion.path
                    d="M380,380 V300 H300 V200 H150 V250"
                    stroke={color} strokeWidth="1.5" fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: [0, 1, 1, 0], opacity: [0, 1, 1, 0], pathOffset: [0, 0, 1, 1] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "linear", delay: 1 }}
                />
            </svg>
        </div>
    );
};

const EKGBackground = ({ color = "#be123c" }: { color?: string }) => {
    return (
        <div className="absolute inset-0 z-0 overflow-hidden opacity-20 transition-opacity duration-300 group-hover:opacity-40">
            <svg className="h-full w-full" viewBox="0 0 400 200" preserveAspectRatio="none">
                {/* Baseline */}
                <line x1="0" y1="100" x2="400" y2="100" stroke={color} strokeWidth="1" opacity="0.3" />

                {/* EKG Waves - Neon */}
                {[0, 150, 300].map((offset, i) => (
                    <motion.path
                        key={i}
                        d="M0,100 H50 L60,60 L70,140 L80,40 L90,160 L100,100 H400"
                        stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"
                        style={{ filter: `drop-shadow(0 0 2px ${color})` }}
                        initial={{ pathLength: 0, opacity: 0, x: offset }}
                        animate={{
                            pathLength: [0, 0.3, 1],
                            opacity: [0, 1, 0],
                            x: [0, 200, 400]
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "linear",
                            delay: i * 1
                        }}
                    />
                ))}
            </svg>
        </div>
    );
};


const STREAMS = [
    {
        id: "engineering",
        title: "ENGINEERING",
        subtext: "Computer, IT, Civil, Mechanical. The complete technical library.",
        icon: Cpu,
        href: "/stream/engineering",
        Background: CircuitBackground,
        color: "#06b6d4", // Cyan (Golden Standard for Engineering)
        shadowColor: "rgba(6, 182, 212, 0.5)"
    },
    {
        id: "medical",
        title: "MEDICAL",
        subtext: "MBBS, BDS, Nursing. Anatomy, Physiology, and Clinical notes.",
        icon: HeartPulse,
        href: "/stream/medical",
        Background: EKGBackground,
        color: "#f43f5e", // Rose (Golden Standard for Medical)
        shadowColor: "rgba(244, 63, 94, 0.5)"
    },
];

export default function StreamGrid() {
    return (
        <section className="bg-transparent py-20 px-4 md:px-8">
            <div className="mx-auto max-w-7xl">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {STREAMS.map((stream) => {
                        const Icon = stream.icon;
                        const Background = stream.Background;

                        return (
                            <Link key={stream.id} href={stream.href} className="block h-full cursor-pointer">
                                <div
                                    className="group relative flex h-[450px] flex-col justify-end overflow-hidden rounded-[2rem] border p-10 transition-all duration-500"
                                    // 30% Surface: Glass-Matte
                                    style={{
                                        // @ts-ignore
                                        "--stream-color": stream.color,
                                        "--shadow-color": stream.shadowColor,
                                    }}
                                >
                                    <div className={clsx(
                                        "absolute inset-0 z-[-1] bg-[#0a0a0a]/60 backdrop-blur-md transition-all duration-500", // Glass Base
                                        "border border-white/10 group-hover:border-[var(--stream-color)] group-hover:shadow-[0_0_30px_-5px_var(--shadow-color)]", // Border & Glow
                                        "rounded-[2rem]"
                                    )} />

                                    {/* Custom SVG Background - Animated Color */}
                                    <Background color={stream.color} />

                                    {/* Top Right Arrow Button */}
                                    <div className="absolute right-8 top-8 z-20">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-all duration-300 group-hover:bg-[var(--stream-color)] group-hover:text-white group-hover:scale-110">
                                            <ArrowRight className="h-5 w-5 -rotate-45 transition-transform duration-300 group-hover:rotate-0" />
                                        </div>
                                    </div>

                                    {/* Main Icon (Centered) */}
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 transition-transform duration-500 group-hover:scale-110">
                                        <Icon
                                            className="h-32 w-32 stroke-1 transition-colors duration-300 text-zinc-700 group-hover:text-[var(--stream-color)]"
                                            style={{
                                                filter: "drop-shadow(0 0 0px transparent)", // Default
                                            }}
                                        />
                                    </div>

                                    {/* Text Content (Bottom) */}
                                    <div className="relative z-20 mt-auto">
                                        <h2 className="mb-2 text-4xl font-bold tracking-tight text-white transition-colors duration-300 group-hover:text-[var(--stream-color)] md:text-5xl">
                                            {stream.title}
                                        </h2>
                                        <p className="max-w-sm text-lg font-medium text-zinc-500 group-hover:text-zinc-300">
                                            {stream.subtext}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
