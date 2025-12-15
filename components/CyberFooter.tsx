"use client";

import Link from "next/link";
import NextImage from "next/image";
import { motion } from "framer-motion";
import { Zap, HeartPulse, Activity, ShieldCheck, Cpu } from "lucide-react";

export default function CyberFooter() {
    return (
        <footer className="relative border-t border-white/10 bg-black py-20 overflow-hidden">
            <div className="mx-auto max-w-7xl px-6 md:px-12 relative z-10">
                <div className="grid grid-cols-1 gap-12 md:grid-cols-4 lg:gap-8">
                    {/* COL 1: BRAND */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <div className="h-10 w-10 relative flex items-center justify-center">
                                <NextImage src="/logo.png" alt="Logo" fill className="object-contain" />
                            </div>
                            <span className="text-xl font-bold text-white tracking-widest">STUDENT STUDY HUB</span>
                        </div>
                        <p className="text-zinc-500 max-w-[200px]">
                            Built for the 1% who defy the syllabus. The ultimate academic arsenal.
                        </p>
                        <div className="flex gap-4">
                            <Link href="/community" className="text-zinc-500 hover:text-white transition-colors">Community</Link>
                            <Link href="/about" className="text-zinc-500 hover:text-white transition-colors">About</Link>
                            <Link href="/support" className="text-zinc-500 hover:text-cyan-400 transition-colors">Support</Link>
                        </div>
                        <div className="flex gap-4 text-xs font-mono">
                            <Link href="/legal/privacy" className="text-zinc-600 hover:text-zinc-400 transition-colors">Privacy</Link>
                            <Link href="/legal/terms" className="text-zinc-600 hover:text-zinc-400 transition-colors">Terms</Link>
                            <Link href="/legal/cookie" className="text-zinc-600 hover:text-zinc-400 transition-colors">Cookies</Link>
                        </div>
                    </div>

                    {/* COL 2: ENGINEERING */}
                    <div>
                        <h4 className="mb-6 font-mono text-sm font-bold text-white/50 uppercase tracking-wider">Engineering</h4>
                        <ul className="space-y-3">
                            {[
                                { name: "Computer Engineering", href: "/stream/engineering/computer" },
                                { name: "Information Technology", href: "/stream/engineering/it" },
                                { name: "Civil Engineering", href: "/stream/engineering/civil" },
                                { name: "Mechanical Engineering", href: "/stream/engineering/mechanical" },
                            ].map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="group flex items-center gap-2 text-zinc-500 transition-all duration-300 hover:text-cyan-400 hover:translate-x-2">
                                        <Cpu className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* COL 3: MEDICAL */}
                    <div>
                        <h4 className="mb-6 font-mono text-sm font-bold text-white/50 uppercase tracking-wider">Medical</h4>
                        <ul className="space-y-3">
                            {[
                                { name: "MBBS", href: "/stream/medical/mbbs" },
                                { name: "Anatomy", href: "#" },
                                { name: "Clinical Rotation", href: "#" },
                                { name: "PYQs Archive", href: "#" },
                            ].map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="group flex items-center gap-2 text-zinc-500 transition-all duration-300 hover:text-rose-400 hover:translate-x-2">
                                        <HeartPulse className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* COL 4: SYSTEM STATUS */}
                    <div className="space-y-6">
                        <h4 className="mb-6 font-mono text-sm font-bold text-white/50 uppercase tracking-wider">System Status</h4>

                        {/* Status Pod */}
                        <Link href="/status" className="block group">
                            <div className="rounded-xl border border-white/5 bg-zinc-900/50 p-4 backdrop-blur-sm transition-all group-hover:border-emerald-500/30 group-hover:bg-emerald-500/5">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm text-zinc-400 group-hover:text-zinc-300">Server Status</span>
                                    <div className="flex items-center gap-2">
                                        <span className="relative flex h-2 w-2">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                        </span>
                                        <span className="text-xs font-bold text-emerald-500">ONLINE</span>
                                    </div>
                                </div>
                                <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-emerald-500 w-[98%] shadow-[0_0_10px_#10b981]" />
                                </div>
                            </div>
                        </Link>

                        {/* Stats Pod */}
                        <div className="rounded-xl border border-white/5 bg-zinc-900/50 p-4 backdrop-blur-sm">
                            <div className="flex items-center gap-3">
                                <Activity className="h-5 w-5 text-indigo-400" />
                                <div>
                                    <div className="text-2xl font-bold text-white leading-none">10,420</div>
                                    <div className="text-xs text-zinc-500 uppercase tracking-wide">Active Students</div>
                                </div>
                            </div>
                        </div>

                        <Link href="/legal/privacy" className="flex items-center gap-2 text-xs text-zinc-600 hover:text-zinc-400 transition-colors">
                            <ShieldCheck className="h-3 w-3" />
                            <span>Protected by 256-bit Encryption</span>
                        </Link>
                    </div>
                </div>
            </div>

            {/* MEGA WATERMARK TEXT */}
            <div className="pointer-events-none absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none select-none z-0">
                <h1 className="text-[15vw] font-black text-transparent bg-clip-text bg-gradient-to-b from-zinc-900 to-black text-center opacity-50 tracking-tighter">
                    STUDENT STUDY HUB
                </h1>
            </div>

            {/* Copyright Line */}
            <div className="relative z-10 mt-20 border-t border-white/5 pt-8 text-center">
                <p className="text-sm text-zinc-600">
                    &copy; {new Date().getFullYear()} Student Study Hub. All rights reserved. Logic &gt; Emotion.
                </p>
            </div>
        </footer>
    );
}
