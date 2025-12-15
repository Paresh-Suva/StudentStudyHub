"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Cpu, Stethoscope, Briefcase, ChevronRight, Activity, Ban } from "lucide-react";
import TracingBeamGrid from "@/components/TracingBeamGrid";
import { clsx } from "clsx";

const STREAMS = [
    {
        id: "engineering",
        title: "Engineering",
        description: "Computer, IT, Mechanical, Civil & more.",
        icon: Cpu,
        accent: "cyan",
        status: "ONLINE",
        href: "/stream/engineering",
        available: true,
        colors: {
            border: "border-cyan-500/20",
            hoverBorder: "hover:border-cyan-500",
            hoverShadow: "hover:shadow-[0_0_30px_rgba(6,182,212,0.2)]",
            text: "text-cyan-400",
            bg: "bg-cyan-500/10",
        }
    },
    {
        id: "medical",
        title: "Medical",
        description: "MBBS, B.Pharm, Anatomy & Clinicals.",
        icon: Stethoscope,
        accent: "rose",
        status: "ONLINE",
        href: "/stream/medical",
        available: true,
        colors: {
            border: "border-rose-500/20",
            hoverBorder: "hover:border-rose-500",
            hoverShadow: "hover:shadow-[0_0_30px_rgba(244,63,94,0.2)]",
            text: "text-rose-400",
            bg: "bg-rose-500/10",
        }
    },
    {
        id: "commerce",
        title: "Commerce & Arts",
        description: "CA, B.Com, Psychology & Economics.",
        icon: Briefcase,
        accent: "zinc",
        status: "SYSTEM OFFLINE",
        href: "#",
        available: false,
        colors: {
            border: "border-zinc-700/50",
            hoverBorder: "hover:border-zinc-700",
            hoverShadow: "",
            text: "text-zinc-500",
            bg: "bg-zinc-800/20",
        }
    }
];

export default function StreamsGatewayPage() {
    return (
        <div className="relative w-full overflow-x-hidden bg-black text-white pt-32 px-6 pb-20">

            {/* Background */}
            <div className="absolute inset-0 z-0">
                <TracingBeamGrid />
            </div>

            <main className="relative z-10 mx-auto max-w-7xl flex flex-col items-center">

                {/* --- HEADER --- */}
                <header className="text-center mb-20">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-black tracking-tight mb-4"
                    >
                        ACADEMIC STREAMS
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto font-mono"
                    >
                        Select your domain to initialize the syllabus mainframe.
                    </motion.p>
                </header>

                {/* --- GATEWAY CARDS --- */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                    {STREAMS.map((stream, idx) => (
                        <motion.div
                            key={stream.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.15 }}
                            className={clsx(
                                "group relative flex flex-col justify-between min-h-[450px] rounded-[2rem] border bg-white/5 backdrop-blur-md p-8 transition-all duration-500",
                                stream.colors.border,
                                stream.available ? `${stream.colors.hoverBorder} ${stream.colors.hoverShadow} hover:scale-105 hover:-translate-y-2` : "opacity-50 grayscale hover:opacity-60 cursor-not-allowed"
                            )}
                        >
                            {/* Card Content Top */}
                            <div>
                                {/* Status Indicator */}
                                <div className="flex items-center justify-between mb-8">
                                    <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-white/5 bg-black/20 text-xs font-mono tracking-widest">
                                        <div className={clsx("h-2 w-2 rounded-full animate-pulse", stream.available ? "bg-green-500" : "bg-red-500")} />
                                        {stream.status}
                                    </div>
                                    <stream.icon className={clsx("h-8 w-8 opacity-50 transition-opacity group-hover:opacity-100", stream.colors.text)} />
                                </div>

                                {/* Title & Icon Visual */}
                                <div className="mb-6">
                                    <div className={clsx("mb-6 inline-flex p-4 rounded-2xl border border-white/5 transition-colors duration-500 group-hover:bg-white/5", stream.colors.bg)}>
                                        <stream.icon className={clsx("h-12 w-12", stream.colors.text)} />
                                    </div>
                                    <h2 className="text-4xl font-black uppercase tracking-tighter mb-4 text-white">
                                        {stream.title}
                                    </h2>
                                    <p className="text-zinc-400 leading-relaxed">
                                        {stream.description}
                                    </p>
                                </div>
                            </div>

                            {/* Card Action Bottom */}
                            <div>
                                {stream.available ? (
                                    <Link href={stream.href} className="block w-full">
                                        <button className={clsx(
                                            "w-full flex items-center justify-between px-6 py-4 rounded-xl border border-white/10 bg-white/5 text-white transition-all duration-300 group-hover:bg-white/10",
                                            `group-hover:border-${stream.accent}-500/50`
                                        )}>
                                            <span className="font-bold tracking-wider">ENTER TERMINAL</span>
                                            <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                                        </button>
                                    </Link>
                                ) : (
                                    <button disabled className="w-full flex items-center justify-center px-6 py-4 rounded-xl border border-white/5 bg-black/20 text-zinc-500 cursor-not-allowed">
                                        <Ban className="h-4 w-4 mr-2" />
                                        <span className="font-bold tracking-wider">ACCESS DENIED</span>
                                    </button>
                                )}
                            </div>

                            {/* Decorative Background Glow */}
                            {stream.available && (
                                <div className={clsx(
                                    "absolute inset-0 rounded-[2rem] opacity-0 transition-opacity duration-500 group-hover:opacity-10 pointer-events-none",
                                    stream.id === 'engineering' ? 'bg-cyan-500' : 'bg-rose-500'
                                )} />
                            )}
                        </motion.div>
                    ))}
                </div>

            </main>
        </div>
    );
}
