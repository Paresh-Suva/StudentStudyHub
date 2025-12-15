"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Home, Search } from "lucide-react";
import NeonButton from "@/components/NeonButton";

export default function NotFound() {
    return (
        <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-black text-white px-4 pt-24">

            {/* Background Effects */}
            <div className="absolute inset-0 z-0">
                {/* Subtle Grid */}
                <div
                    className="absolute inset-0 opacity-[0.05]"
                    style={{
                        backgroundImage: `linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)`,
                        backgroundSize: '32px 32px'
                    }}
                />
                {/* Central Spotlight */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative z-10 flex flex-col items-center text-center max-w-2xl px-6"
            >
                {/* 404 Display */}
                <div className="relative mb-2">
                    <h1 className="text-[120px] md:text-[180px] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/10 select-none drop-shadow-2xl">
                        404
                    </h1>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-cyan-500/20 blur-[80px] -z-10 rounded-full" />
                </div>

                {/* Divider */}
                <div className="w-24 h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent mb-8" />

                {/* Message */}
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-tight">
                    Page Not Found
                </h2>
                <p className="text-zinc-400 text-lg max-w-md mx-auto mb-10 leading-relaxed">
                    The resource you are looking for has been moved, deleted, or possibly never existed.
                </p>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row items-center gap-4">
                    <Link href="/">
                        <NeonButton variant="primary" className="pl-6 pr-8 h-12">
                            <Home className="w-4 h-4 mr-2" />
                            Return Home
                        </NeonButton>
                    </Link>

                    <Link href="/streams">
                        <button className="h-12 px-8 rounded-full border border-white/10 bg-white/5 text-sm font-medium text-white hover:bg-white/10 transition-colors flex items-center gap-2">
                            <Search className="w-4 h-4 text-zinc-400" />
                            Browse Library
                        </button>
                    </Link>
                </div>

                {/* Tech Deco */}
                <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 flex gap-2 opacity-20">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="w-2 h-2 rounded-full bg-white animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
                    ))}
                </div>

            </motion.div>
        </div>
    );
}
