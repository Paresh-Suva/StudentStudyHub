"use client";

import Link from "next/link";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import * as Icons from "lucide-react";
import { LucideIcon } from "lucide-react";
import { MouseEvent } from "react";

interface BranchCardProps {
    title: string;
    description: string;
    iconName: string;
    colorGradient: string;
    href: string;
}

export default function BranchCard({
    title,
    description,
    iconName,
    colorGradient,
    href
}: BranchCardProps) {
    // Dynamic Icon Resolution
    const IconComponent = (Icons[iconName as keyof typeof Icons] as LucideIcon) || Icons.Book;

    // 3D Tilt Effect Variables
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
        const { left, top, width, height } = currentTarget.getBoundingClientRect();
        mouseX.set((clientX - left) / width);
        mouseY.set((clientY - top) / height);
    }

    return (
        <Link href={href} className="block h-full perspective-1000">
            <motion.div
                onMouseMove={handleMouseMove}
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="group relative h-full overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-b from-white/5 to-transparent p-6 backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:shadow-2xl hover:shadow-cyan-500/20"
                style={{
                    transformStyle: "preserve-3d",
                }}
            >
                {/* Dynamic Spotlight Effect */}
                <motion.div
                    className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                        background: useMotionTemplate`
                            radial-gradient(
                                650px circle at ${mouseX}px ${mouseY}px,
                                rgba(255,255,255,0.15),
                                transparent 80%
                            )
                        `,
                    }}
                />

                {/* Animated Gradient Background Blob */}
                <div className={`absolute -right-20 -top-20 h-64 w-64 rounded-full opacity-0 blur-[100px] transition-all duration-500 group-hover:opacity-30 bg-gradient-to-br ${colorGradient}`} />

                <div className="relative z-10 flex h-full flex-col justify-between">
                    <div>
                        {/* 3D Icon Container */}
                        <div className="mb-6 inline-flex transform-gpu items-center justify-center rounded-2xl bg-white/5 p-4 shadow-[0_8px_30px_rgb(0,0,0,0.12)] ring-1 ring-white/10 backdrop-blur-md transition-all duration-500 group-hover:-translate-y-2 group-hover:scale-110 group-hover:shadow-lg">
                            <div className={`rounded-xl bg-gradient-to-br ${colorGradient} p-3 shadow-inner`}>
                                <IconComponent className="h-8 w-8 text-white drop-shadow-md" />
                            </div>
                        </div>

                        {/* Title */}
                        <h3 className="mb-3 text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400 group-hover:from-white group-hover:to-white transition-all">
                            {title}
                        </h3>

                        {/* Description */}
                        <p className="text-sm font-medium leading-relaxed text-zinc-400/80">
                            {description}
                        </p>
                    </div>

                    {/* Bottom Action Area */}
                    <div className="mt-8 flex items-center justify-between border-t border-white/5 pt-4">
                        <span className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-500 group-hover:text-cyan-400 transition-colors">
                            Explore Branch
                        </span>
                        <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-all duration-300 group-hover:bg-cyan-500 group-hover:border-cyan-500 group-hover:text-black">
                            <Icons.ArrowRight className="h-4 w-4" />
                        </div>
                    </div>
                </div>
            </motion.div>
        </Link>
    );
}
