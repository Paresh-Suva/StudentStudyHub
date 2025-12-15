"use client";

import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { clsx } from "clsx";
import { motion } from "framer-motion";

// --- Anim Components (Same as BranchCard) ---

const CircuitAnim = ({ color = "#52525b" }: { color?: string }) => (
    <div className="absolute inset-0 z-0 overflow-hidden opacity-20 transition-opacity duration-300 group-hover:opacity-50">
        <svg className="h-full w-full" viewBox="0 0 400 400" preserveAspectRatio="none">
            {/* Matte Grid */}
            <path d="M40,0 V400 M80,0 V400 M120,0 V400 M160,0 V400 M200,0 V400 M240,0 V400 M280,0 V400 M320,0 V400 M360,0 V400" stroke={color} strokeWidth="0.5" opacity="0.1" />
            <path d="M0,40 H400 M0,80 H400 M0,120 H400 M0,160 H400 M0,200 H400 M0,240 H400 M0,280 H400 M0,320 H400 M0,360 H400" stroke={color} strokeWidth="0.5" opacity="0.1" />

            {/* Path */}
            <motion.path
                d="M40,40 H120 V120 H200 V80 H320"
                stroke={color} strokeWidth="2" fill="none"
                style={{ filter: `drop-shadow(0 0 2px ${color})` }}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: [0, 1, 1, 0], opacity: [0, 1, 1, 0], pathOffset: [0, 0, 1, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />
        </svg>
    </div>
);

interface SemesterCardProps {
    id: string;
    streamId: string;
    branchId: string;
    title: string;
    index: number;
}

export default function SemesterCard({ id, streamId, branchId, title, index }: SemesterCardProps) {
    // Cycle through colors based on index for variety
    const colors = ["#3b82f6", "#a855f7", "#22c55e", "#f97316"];
    const hexColor = colors[index % colors.length];

    return (
        <Link href={`/stream/${streamId}/${branchId}/${id}`}>
            <div className={clsx(
                "group relative flex aspect-[4/3] flex-col justify-between overflow-hidden rounded-[2rem] border border-zinc-800 bg-[#050505] p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl",
                // Dynamic border class isn't reliable with arbitrary hex, so we use style or safelisted classes. 
                // Using a generic hover border class and letting style handle color
                "hover:border-[var(--hover-color)]"
            )}
                style={{
                    // @ts-ignore
                    "--hover-color": hexColor
                }}
            >

                {/* Animated Background */}
                <CircuitAnim color={hexColor} />

                {/* Top Right Arrow */}
                <div className="absolute right-6 top-6 z-20">
                    <div
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-all duration-300 group-hover:bg-[var(--hover-color)] group-hover:text-white"
                    >
                        <ArrowRight className="h-4 w-4 -rotate-45 transition-transform duration-300 group-hover:rotate-0" />
                    </div>
                </div>

                {/* Icon */}
                <div className="z-10 mt-2">
                    <div
                        className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-900 text-zinc-500 transition-colors duration-300 group-hover:bg-[var(--hover-color)] group-hover:text-white"
                    >
                        <BookOpen className="h-6 w-6" />
                    </div>
                </div>

                {/* Content */}
                <div className="relative z-20 mt-auto">
                    <p className="text-xs font-bold tracking-widest text-zinc-600 uppercase mb-1">
                        Explore
                    </p>
                    <h3
                        className="text-2xl font-bold uppercase leading-tight text-white transition-colors duration-300 group-hover:text-[var(--hover-color)]"
                    >
                        {title}
                    </h3>
                </div>
            </div>
        </Link>
    );
}
