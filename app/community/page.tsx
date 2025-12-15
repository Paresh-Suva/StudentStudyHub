"use client";

import { motion } from "framer-motion";
import { Gamepad2, Send, Trophy, Medal, User, Zap, Crown, Sparkles, MessageCircle, Instagram } from "lucide-react";
import TracingBeamGrid from "@/components/TracingBeamGrid";
import Link from "next/link";
import { clsx } from "clsx";

// --- Mock Leaderboard Data ---
const TOP_SCHOLARS = [
    { rank: 1, name: "NeonRunner_99", stream: "CS", xp: "15,420", avatarColor: "bg-yellow-500" },
    { rank: 2, name: "MedTech_Aria", stream: "MBBS", xp: "14,850", avatarColor: "bg-slate-300" },
    { rank: 3, name: "QuantumFizx", stream: "MECH", xp: "13,200", avatarColor: "bg-amber-600" },
    { rank: 4, name: "BinaryBard", stream: "IT", xp: "12,900", avatarColor: "bg-cyan-500" },
    { rank: 5, name: "CivilStruct", stream: "CIVIL", xp: "11,500", avatarColor: "bg-emerald-500" },
];

export default function CommunityPage() {
    return (
        <div className="relative w-full overflow-x-hidden bg-black text-white pt-32 px-6 pb-20">

            {/* Background Grid */}
            <div className="absolute inset-0 z-0">
                <TracingBeamGrid />
            </div>

            <div className="relative z-10 mx-auto max-w-6xl">

                {/* Header */}
                <div className="text-center mb-16">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-black text-white uppercase tracking-tight mb-4 drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                    >
                        The Hive Mind
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-zinc-400 text-lg md:text-xl font-mono"
                    >
                        Join 10,000+ students decoding the syllabus together.
                    </motion.p>
                </div>

                {/* Social Gateways */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">

                    {/* WhatsApp Card */}
                    <motion.a
                        href="#"
                        target="_blank"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="group relative overflow-hidden rounded-3xl border border-[#25D366]/30 bg-white/5 backdrop-blur-md p-6 transition-all hover:border-[#25D366] hover:bg-[#25D366]/10"
                    >
                        <div className="flex flex-col h-full justify-between items-start">
                            <div className="mb-6 rounded-2xl bg-[#25D366]/20 p-3 border border-[#25D366]/30 text-[#25D366]">
                                <MessageCircle className="h-8 w-8" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white mb-2 uppercase">WhatsApp Group</h3>
                                <p className="text-zinc-400 text-sm mb-4">Official Updates & Announcements.</p>
                                <div className="h-1 w-full bg-zinc-700 rounded-full overflow-hidden group-hover:bg-[#25D366]/30 transition-colors">
                                    <div className="h-full bg-[#25D366] w-3/4" />
                                </div>
                            </div>
                        </div>
                    </motion.a>

                    {/* Instagram Card */}
                    <motion.a
                        href="#"
                        target="_blank"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="group relative overflow-hidden rounded-3xl border border-pink-500/30 bg-white/5 backdrop-blur-md p-6 transition-all hover:border-pink-500 hover:bg-pink-500/10"
                    >
                        <div className="flex flex-col h-full justify-between items-start">
                            <div className="mb-6 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 p-3 border border-pink-500/30 text-pink-400">
                                <Instagram className="h-8 w-8" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white mb-2 uppercase">Instagram Feed</h3>
                                <p className="text-zinc-400 text-sm mb-4">Daily Quizzes, News & Visuals.</p>
                                <div className="h-1 w-full bg-zinc-700 rounded-full overflow-hidden group-hover:bg-pink-500/30 transition-colors">
                                    <div className="h-full bg-pink-500 w-1/2" />
                                </div>
                            </div>
                        </div>
                    </motion.a>

                    {/* Telegram Card */}
                    <motion.a
                        href="#"
                        target="_blank"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="group relative overflow-hidden rounded-3xl border border-[#0088cc]/30 bg-white/5 backdrop-blur-md p-6 transition-all hover:border-[#0088cc] hover:bg-[#0088cc]/10"
                    >
                        <div className="flex flex-col h-full justify-between items-start">
                            <div className="mb-6 rounded-2xl bg-[#0088cc]/20 p-3 border border-[#0088cc]/30 text-[#0088cc]">
                                <Send className="h-8 w-8" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white mb-2 uppercase">Telegram Archive</h3>
                                <p className="text-zinc-400 text-sm mb-4">Leaked Papers & Exclusive PDFs.</p>
                                <div className="h-1 w-full bg-zinc-700 rounded-full overflow-hidden group-hover:bg-[#0088cc]/30 transition-colors">
                                    <div className="h-full bg-[#0088cc] w-full" />
                                </div>
                            </div>
                        </div>
                    </motion.a>

                </div>
            </div>
        </div>

    );
}
