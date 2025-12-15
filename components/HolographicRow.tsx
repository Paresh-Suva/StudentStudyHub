"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { clsx } from "clsx";

interface HolographicRowProps {
    code: string;
    title: string;
    subtitle?: string; // Additional context (e.g. subjects)
    status?: "available" | "locked" | "coming_soon";
    href: string;
    index: number;
    color?: string; // Hex color for the neon accent
}

export default function HolographicRow({ code, title, subtitle, status = "available", href, index, color = "#06b6d4" }: HolographicRowProps) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05, duration: 0.4 }}
        >
            <Link href={href} className="group block relative">
                <div className="relative flex h-24 w-full items-center justify-between border-b border-white/5 bg-[#0F0F0F] px-6 transition-all duration-300 hover:bg-white/5">

                    {/* Neon Vertical Line (Left Edge) */}
                    <div
                        className="absolute left-0 top-0 h-full w-[2px] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                        style={{ backgroundColor: color, boxShadow: `0 0 10px ${color}` }}
                    />

                    {/* Left Side: Code & Title */}
                    <div className="flex items-center gap-6">
                        <span className="font-mono text-sm text-zinc-600 group-hover:text-zinc-400 transition-colors w-16">
                            {code}
                        </span>
                        <div className="flex flex-col">
                            <h3 className="text-lg font-medium text-zinc-100 group-hover:text-white transition-colors">
                                {title}
                            </h3>
                            {subtitle && (
                                <p className="text-xs text-zinc-500 font-mono mt-0.5 group-hover:text-zinc-400 transition-colors">
                                    {subtitle}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Right Side: Status & Action */}
                    <div className="flex items-center gap-6">
                        {/* Arrow Icon */}
                        <div
                            className="flex h-8 w-8 items-center justify-center rounded-full text-zinc-500 transition-all duration-300 group-hover:bg-white/10 group-hover:text-white group-hover:translate-x-1"
                        >
                            <ArrowRight className="h-4 w-4" />
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
