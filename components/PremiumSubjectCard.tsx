"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ShoppingCart, Star, Copy, LucideIcon } from "lucide-react";
import { clsx } from "clsx";

interface PremiumSubjectCardProps {
    id: number;
    title: string;
    code: string;
    slug: string;
    streamId: string;
    icon: LucideIcon;
    color: "blue" | "purple" | "green" | "orange" | "pink" | "yellow";
}

const colorStyles = {
    blue: "text-blue-500 bg-blue-500",
    purple: "text-purple-500 bg-purple-500",
    green: "text-green-500 bg-green-500",
    orange: "text-orange-500 bg-orange-500",
    pink: "text-pink-500 bg-pink-500",
    yellow: "text-yellow-500 bg-yellow-500",
};

export default function PremiumSubjectCard({
    title,
    code,
    slug,
    streamId,
    icon: Icon,
    color,
}: PremiumSubjectCardProps) {
    return (
        <Link href={`/stream/${streamId}/${slug}`} className="block group">
            <div className="relative flex flex-col justify-between overflow-hidden rounded-[30px] bg-[#1e1e1e] p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/50">

                {/* Top Section */}
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                        {/* "Brand" Logo placeholder - using a generic shape or streamId letter */}
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-800 text-white font-bold">
                            {title.charAt(0)}
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs font-bold text-white uppercase tracking-wider">GTU</span>
                            <span className="text-[10px] text-zinc-500">Official</span>
                        </div>
                    </div>

                    {/* "New" Badge - styled like the image */}
                    <div className="flex items-center gap-1 rounded-full bg-[#2a2a2a] px-3 py-1.5 border border-zinc-800">
                        <span className="text-[10px] font-bold text-blue-400 uppercase">New</span>
                    </div>
                </div>

                {/* Hero Image / Icon */}
                <div className="relative my-6 flex items-center justify-center h-48">
                    <motion.div
                        whileHover={{ scale: 1.1, rotate: -5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="relative z-10"
                    >
                        {/* The "Shoe" replacement - Huge Icon */}
                        <Icon
                            className={clsx("h-32 w-32 drop-shadow-2xl filter", colorStyles[color].split(" ")[0])}
                            style={{ filter: `drop-shadow(0 10px 20px rgba(0,0,0,0.5))` }}
                        />
                    </motion.div>

                    {/* Background Blob/Circle behind icon */}
                    <div className={clsx("absolute inset-0 m-auto h-32 w-32 rounded-full opacity-20 blur-2xl", colorStyles[color].split(" ")[1])} />
                </div>

                {/* Details Section */}
                <div>
                    <h3 className="mb-1 text-xl font-bold text-white tracking-tight">
                        {title}
                    </h3>
                    <p className="font-mono text-zinc-400 text-sm">Code: {code}</p>

                    <div className="mt-6 flex items-end justify-between">
                        {/* Action Button */}
                        <div className="flex gap-2">
                            <button className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-600 text-zinc-400 transition-colors hover:bg-white hover:text-black">
                                <Copy className="h-4 w-4" />
                            </button>
                            <div className="flex h-10 items-center rounded-full bg-zinc-700 px-6 font-semibold text-white transition-colors group-hover:bg-white group-hover:text-black">
                                View Notes
                            </div>
                        </div>

                        {/* Color Options / Dots */}
                        <div className="flex flex-col items-center gap-1">
                            <span className="text-[10px] text-zinc-500">Semesters</span>
                            <div className="flex gap-1.5">
                                <div className="h-3 w-3 rounded-full bg-[#ff5e57]"></div>
                                <div className="h-3 w-3 rounded-full bg-[#ffc048]"></div>
                                <div className="h-3 w-3 rounded-full bg-[#0be881]"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}
