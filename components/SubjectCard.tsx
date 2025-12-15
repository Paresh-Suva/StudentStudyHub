"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Download, LucideIcon } from "lucide-react";
import { clsx } from "clsx";

interface SubjectCardProps {
    id: number;
    title: string;
    code: string;
    slug: string;
    streamId: string;
    icon: LucideIcon;
    color: "blue" | "purple" | "green" | "orange" | "pink" | "yellow";
}

const colorStyles = {
    blue: "text-blue-500 drop-shadow-[0_10px_10px_rgba(59,130,246,0.5)]",
    purple: "text-purple-500 drop-shadow-[0_10px_10px_rgba(168,85,247,0.5)]",
    green: "text-green-500 drop-shadow-[0_10px_10px_rgba(34,197,94,0.5)]",
    orange: "text-orange-500 drop-shadow-[0_10px_10px_rgba(249,115,22,0.5)]",
    pink: "text-pink-500 drop-shadow-[0_10px_10px_rgba(236,72,153,0.5)]",
    yellow: "text-yellow-500 drop-shadow-[0_10px_10px_rgba(234,179,8,0.5)]",
};

export default function SubjectCard({
    title,
    code,
    slug,
    streamId,
    icon: Icon,
    color,
}: SubjectCardProps) {
    return (
        <Link href={`/stream/${streamId}/${slug}`} className="block group font-sans">
            <div className="relative flex h-[450px] w-full flex-col overflow-hidden rounded-[30px] bg-[#18181b] p-6 transition-transform duration-300 hover:-translate-y-2">

                {/* Top Section: Brand & Badge (Fixed Height) */}
                <div className="flex-none flex items-start justify-between z-20">
                    <div className="flex flex-col">
                        <span className="text-xs font-black uppercase tracking-widest text-zinc-500">
                            {streamId.replace(/-/g, ' ')}
                        </span>
                        <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-tighter">
                            STUDY MATERIAL
                        </span>
                    </div>

                    <div className="flex items-center justify-center rounded-full bg-black px-4 py-1.5 shadow-lg border border-white/5">
                        <span className="text-[11px] font-bold text-white tracking-wide">
                            Sem 1
                        </span>
                    </div>
                </div>

                {/* Middle Section: Hero Icon (Flex 1 to take available space) */}
                <div className="flex-1 flex items-center justify-center py-4 relative z-10">
                    {/* Background Blob */}
                    <div className="absolute inset-0 flex items-center justify-center -z-10">
                        <div className="h-32 w-32 rounded-full bg-gradient-to-tr from-white/5 to-transparent blur-3xl opacity-20" />
                    </div>

                    <motion.div
                        whileHover={{ scale: 1.15, rotate: -12, y: -10 }}
                        transition={{ type: "spring", stiffness: 200, damping: 10 }}
                        className="relative"
                    >
                        <Icon
                            strokeWidth={1.5}
                            className={clsx(
                                "h-32 w-32 transition-all duration-500",
                                colorStyles[color]
                            )}
                        />
                    </motion.div>
                </div>

                {/* Bottom Section: Details & Action (Auto height) */}
                <div className="flex-none z-20">
                    <h3 className="text-2xl font-bold text-white leading-tight mb-1 tracking-tight line-clamp-2 min-h-[3.5rem]">
                        {title}
                    </h3>
                    <p className="font-mono text-sm text-zinc-500 font-medium mb-6">
                        Subject Code: {code}
                    </p>

                    <div className="flex items-center justify-between gap-4">
                        {/* Download Button */}
                        <button className="flex h-12 w-12 items-center justify-center rounded-full bg-[#27272a] text-zinc-400 transition-colors hover:bg-white hover:text-black hover:shadow-lg">
                            <Download className="h-5 w-5" />
                        </button>

                        {/* View Notes Button */}
                        <div className="flex h-12 flex-1 items-center justify-center rounded-full bg-white text-sm font-bold text-black shadow-lg transition-transform active:scale-95 group-hover:bg-[#10b981] group-hover:text-white">
                            View Notes
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}
