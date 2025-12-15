"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { Code2, Zap, Users, ArrowRight, Terminal, Network, ShieldCheck } from "lucide-react";
import TracingBeamGrid from "@/components/TracingBeamGrid";
import { clsx } from "clsx";
import React, { useRef } from "react";

const MILESTONES = [
    {
        year: "2023",
        title: "The Zero Point",
        description: "Late night coding sessions. 404s, bugs, and caffeine using Next.js 13 beta.",
        color: "text-blue-400",
        border: "border-blue-500",
        bg: "bg-blue-500",
    },
    {
        year: "2024",
        title: "The Beta Protocol",
        description: "First 100 students join. The server crashed twice. We fixed it.",
        color: "text-purple-400",
        border: "border-purple-500",
        bg: "bg-purple-500",
    },
    {
        year: "2025",
        title: "The Singularity",
        description: "A complete academic ecosystem. Notes, papers, and community in one place.",
        color: "text-green-400",
        border: "border-green-500",
        bg: "bg-green-500",
    },
];

const VALUES = [
    {
        title: "Open Source Core",
        desc: "Knowledge should be free. No paywalls, no hidden fees. Just pure data.",
        icon: Code2,
        color: "text-cyan-400",
        shadow: "group-hover:shadow-[0_0_30px_rgba(34,211,238,0.2)]",
        border: "group-hover:border-cyan-500/50",
    },
    {
        title: "Velocity Optimized",
        desc: "No ads, no lag. We optimized every byte to save you seconds before exams.",
        icon: Zap,
        color: "text-amber-400",
        shadow: "group-hover:shadow-[0_0_30px_rgba(251,191,36,0.2)]",
        border: "group-hover:border-amber-500/50",
    },
    {
        title: "Hive Mind",
        desc: "Built by students, for students. We know the pain because we lived it.",
        icon: Network, // Changed icon for variety
        color: "text-pink-400",
        shadow: "group-hover:shadow-[0_0_30px_rgba(244,114,182,0.2)]",
        border: "group-hover:border-pink-500/50",
    },
];

export default function AboutPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: containerRef });
    const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

    return (
        <div ref={containerRef} className="relative w-full overflow-x-hidden bg-black text-white pt-32 px-6 pb-20 selection:bg-cyan-500/30">

            {/* Background Layers */}
            <div className="absolute inset-0 z-0">
                <TracingBeamGrid />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
            </div>

            <main className="relative z-10 mx-auto max-w-5xl">

                {/* --- 1. HERO SECTION WITH SPOTLIGHT --- */}
                <section className="relative text-center mb-40">

                    {/* Ambient Glow */}
                    <motion.div
                        animate={{ opacity: [0.5, 0.8, 0.5], scale: [1, 1.2, 1] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[100px] -z-10 pointer-events-none"
                    />

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                    >
                        <h1 className="text-5xl md:text-8xl font-black tracking-wide mb-8 leading-tight">
                            THE SYLLABUS IS<br />
                            <span className="relative inline-block mx-4 my-2 group">
                                <span className="absolute inset-0 bg-red-500/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <span className="relative z-10 text-zinc-600 line-through decoration-red-500 decoration-4 md:decoration-8 px-2">
                                    OUTDATED.
                                </span>
                            </span>
                            <br className="md:hidden" />
                            <motion.span
                                animate={{ textShadow: ["0 0 10px rgba(74,222,128,0)", "0 0 30px rgba(74,222,128,0.5)", "0 0 10px rgba(74,222,128,0)"] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="text-green-400"
                            >
                                DECODED.
                            </motion.span>
                        </h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5, duration: 1 }}
                            className="text-xl md:text-2xl text-zinc-400 max-w-3xl mx-auto font-mono"
                        >
                            We didn't build this to replace your college. <br className="hidden md:block" />
                            We built this to help you <span className="text-white font-bold bg-white/10 px-1 rounded">survive it.</span>
                        </motion.p>
                    </motion.div>
                </section>

                {/* --- 2. ORIGIN STORY TIMELINE (ANIMATED) --- */}
                <section className="mb-40">
                    <div className="flex items-center gap-4 mb-20 justify-center">
                        <Terminal className="h-8 w-8 text-cyan-400 animate-pulse" />
                        <h2 className="text-3xl font-black uppercase tracking-[0.3em] text-white">Origin Story</h2>
                    </div>

                    <div className="relative mx-auto max-w-3xl">
                        {/* Animated Vertical Line */}
                        <motion.div
                            initial={{ height: 0 }}
                            whileInView={{ height: "100%" }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.5, ease: "easeInOut" }}
                            className="absolute left-6 md:left-1/2 top-0 w-0.5 -ml-[1px] bg-gradient-to-b from-cyan-500/0 via-cyan-500 to-cyan-500/0"
                        />

                        <div className="space-y-24">
                            {MILESTONES.map((item, index) => (
                                <motion.div
                                    key={item.year}
                                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.6, delay: index * 0.2 }}
                                    className={clsx(
                                        "relative flex flex-col md:flex-row gap-12 items-start md:items-center",
                                        index % 2 === 0 ? "md:flex-row-reverse" : ""
                                    )}
                                >
                                    {/* Content Card */}
                                    <div className={clsx(
                                        "w-full md:w-1/2 pl-16 md:pl-0",
                                        index % 2 === 0 ? "md:text-left md:pr-16" : "md:text-right md:pl-16"
                                    )}>
                                        <div className="group relative p-6 rounded-2xl border border-white/5 bg-white/5 backdrop-blur-sm hover:border-white/10 hover:bg-white/10 transition-all duration-300">
                                            <div className={clsx("text-5xl font-black mb-2 opacity-20 absolute -top-8 transition-all duration-300",
                                                index % 2 === 0 ? "right-4 group-hover:-top-10" : "left-4 group-hover:-top-10",
                                                item.color
                                            )}>
                                                {item.year}
                                            </div>
                                            <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                                            <p className="text-zinc-400 text-sm font-mono leading-relaxed">
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Center Node */}
                                    <div className="absolute left-6 md:left-1/2 -translate-x-1/2 flex items-center justify-center">
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            whileInView={{ scale: 1 }}
                                            viewport={{ once: true }}
                                            className={clsx("h-4 w-4 rounded-full border-2 bg-black z-10 shadow-[0_0_20px_currentColor]", item.border, item.color)}
                                        />
                                        <div className={clsx("absolute h-12 w-12 rounded-full opacity-20 animate-ping", item.bg)} />
                                    </div>

                                    <div className="hidden md:block w-1/2" />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* --- 3. MISSION PROTOCOL (HOLOGRAPHIC GRID) --- */}
                <section className="mb-40">
                    <div className="flex items-center gap-4 mb-20 justify-center">
                        <div className="h-px w-10 md:w-20 bg-gradient-to-r from-transparent to-zinc-800" />
                        <h2 className="text-3xl font-black uppercase tracking-[0.3em] text-white text-center">Mission Protocol</h2>
                        <div className="h-px w-10 md:w-20 bg-gradient-to-l from-transparent to-zinc-800" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {VALUES.map((val, idx) => (
                            <motion.div
                                key={val.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                whileHover={{ y: -5 }}
                                className={clsx(
                                    "group relative overflow-hidden rounded-3xl border border-white/5 bg-black/50 p-8 transition-all duration-500",
                                    val.shadow, val.border
                                )}
                            >
                                {/* Gradient Background on Hover */}
                                <div className={clsx("absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-current", val.color.replace('text-', 'bg-'))} />

                                <div className={clsx("relative z-10 mb-6 inline-flex p-4 rounded-xl border border-white/5 bg-white/5", val.color)}>
                                    <val.icon className="h-8 w-8" />
                                </div>

                                <h3 className="relative z-10 text-xl font-bold text-white mb-4 uppercase tracking-wider">{val.title}</h3>
                                <p className="relative z-10 text-zinc-400 font-mono text-sm leading-relaxed group-hover:text-zinc-300 transition-colors">
                                    {val.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* --- 4. CTA FOOTER --- */}
                <section className="text-center pb-20">
                    <motion.div
                        whileInView={{ scale: [0.95, 1], opacity: [0, 1] }}
                        transition={{ duration: 0.5 }}
                    >
                        <Link href="/register">
                            <button className="group relative inline-flex items-center gap-4 px-12 py-6 bg-white text-black rounded-full text-xl font-black tracking-tighter transition-all hover:scale-105 hover:bg-cyan-50 hover:shadow-[0_0_60px_-15px_rgba(255,255,255,0.6)]">
                                JOIN THE REVOLUTION
                                <ArrowRight className="h-6 w-6 transition-transform group-hover:translate-x-1" />
                            </button>
                        </Link>
                    </motion.div>
                </section>

            </main>
        </div>
    );
}
