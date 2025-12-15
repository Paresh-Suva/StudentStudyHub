"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { Trophy, FileText, Users, Unlock, Target, BookOpen, Sparkles } from "lucide-react";
import { clsx } from "clsx";
import { MouseEvent } from "react";

export default function FeatureGrid() {
    return (
        <section className="relative py-24 px-6 md:px-12 max-w-7xl mx-auto z-10">
            {/* Section Header */}
            <div className="mb-20 text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-xs font-mono text-cyan-500 tracking-[0.3em] uppercase mb-4"
                >
                    MISSION PROTOCOL
                </motion.h2>
                <motion.h3
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-tight"
                >
                    WHY WE <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">EXIST</span>
                </motion.h3>
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mt-4 text-zinc-400 max-w-2xl mx-auto text-lg leading-relaxed"
                >
                    The education system is broken. We built the patch. <br className="hidden md:block" />
                    Here is how we help you survive the academic grind.
                </motion.p>
            </div>

            {/* Compact Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[280px]">

                {/* 1. Kill The Backlog (XP/Game) */}
                <FeatureCard
                    colSpan="lg:col-span-2"
                    icon={Target}
                    color="text-red-400"
                    glow="from-red-500/20"
                    title="Gamified Learning"
                    description="Turn studying into a game. Earn XP for every upload. Unlock new ranks and badges as you master your syllabus."
                >
                    {/* Visual: Holographic Rank Badge */}
                    <div className="absolute bottom-8 right-8 z-10 group-hover:scale-110 transition-transform duration-500">
                        <div className="relative">
                            <div className="absolute inset-0 bg-red-500/20 blur-[30px] rounded-full animate-pulse" />
                            <div className="relative w-32 h-12 rounded-full border border-red-500/30 bg-[#09090b]/90 backdrop-blur-xl flex items-center justify-between px-4 shadow-[0_0_20px_rgba(239,68,68,0.2)]">
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">Current Rank</span>
                                    <span className="text-sm font-bold text-red-400 drop-shadow-[0_0_5px_rgba(239,68,68,0.5)]">SCHOLAR</span>
                                </div>
                                <Trophy className="w-5 h-5 text-red-500 animate-bounce" />
                            </div>
                        </div>
                    </div>
                </FeatureCard>

                {/* 2. Decentralized Library (Files) */}
                <FeatureCard
                    colSpan="lg:col-span-1"
                    icon={BookOpen}
                    color="text-cyan-400"
                    glow="from-cyan-500/20"
                    title="The Archive"
                    description="Organized notes, PYQs, and cheat sheets. Curated by top students. Sorted by University & Branch."
                >
                    <motion.div
                        className="absolute top-8 right-8 z-10"
                        whileHover={{ y: -5, rotate: 5 }}
                    >
                        <div className="relative w-20 h-24 bg-gradient-to-br from-zinc-800 to-zinc-900 border border-white/10 rounded-lg transform rotate-6 shadow-2xl group-hover:shadow-cyan-500/20 transition-all duration-500 flex items-center justify-center">
                            <div className="absolute -top-2 -right-2 w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center shadow-lg shadow-cyan-500/30">
                                <Sparkles className="w-3 h-3 text-black fill-current" />
                            </div>
                            <FileText className="w-8 h-8 text-zinc-600 group-hover:text-cyan-400 transition-colors duration-500" />
                            <div className="absolute bottom-3 left-3 right-3 h-1 bg-zinc-700/50 rounded-full overflow-hidden">
                                <div className="w-2/3 h-full bg-cyan-500" />
                            </div>
                        </div>
                    </motion.div>
                </FeatureCard>

                {/* 3. The Hive Mind (Community) */}
                <FeatureCard
                    colSpan="lg:col-span-1"
                    icon={Users}
                    color="text-yellow-400"
                    glow="from-yellow-500/20"
                    title="Hive Mind"
                    description="Don't study alone. Join the community to discuss concepts, share hacks, and find study buddies."
                >
                    <div className="absolute bottom-6 right-6 z-10">
                        <div className="flex -space-x-3 group-hover:space-x-1 transition-all duration-500">
                            {[1, 2, 3].map(i => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="w-10 h-10 rounded-full border-2 border-[#09090b] bg-zinc-800 flex items-center justify-center shadow-lg relative overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-yellow-400/10" />
                                    <Users className="w-4 h-4 text-yellow-400/50" />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </FeatureCard>

                {/* 4. Community Driven */}
                <FeatureCard
                    colSpan="lg:col-span-2"
                    icon={Unlock}
                    color="text-green-400"
                    glow="from-green-500/20"
                    title="Community Driven"
                    description="Built by students, for students. We believe in open knowledge sharing. Contribute your notes and help the next batch survive."
                >
                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                        <div className="font-mono text-xs space-y-2 text-green-400">
                            <div>git commit -m "added_notes"</div>
                            <div>git push origin master</div>
                            <div className="text-green-500 font-bold">Deploying... v2.0</div>
                        </div>
                    </div>
                </FeatureCard>

                {/* 5. Peer Verified (Quality) */}
                <FeatureCard
                    colSpan="lg:col-span-2"
                    icon={Trophy}
                    color="text-purple-400"
                    glow="from-purple-500/20"
                    title="Peer Verified"
                    description="Quality over quantity. Resources are reviewed by seniors to ensure you only study what matters for the exam."
                >
                    <div className="absolute bottom-8 right-8 flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold uppercase tracking-wider group-hover:bg-purple-500/20 transition-colors">
                        <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
                        Verified Content
                    </div>
                </FeatureCard>

            </div>
        </section>
    );
}

function FeatureCard({ colSpan, icon: Icon, color, glow, title, description, children }: any) {
    let mouseX = useMotionValue(0);
    let mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
        let { left, top } = currentTarget.getBoundingClientRect();

        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <div
            className={clsx(
                "group relative border border-white/5 bg-zinc-900/30 overflow-hidden rounded-3xl",
                colSpan
            )}
            onMouseMove={handleMouseMove}
        >
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`
                        radial-gradient(
                        650px circle at ${mouseX}px ${mouseY}px,
                        var(--tw-gradient-from),
                        transparent 80%
                        )
                    `,
                }}
            >
                <div className={clsx("w-full h-full bg-gradient-to-t to-transparent opacity-20", glow)} />
            </motion.div>

            <div className="relative h-full p-8 flex flex-col z-10">
                <div className={clsx("w-12 h-12 rounded-xl flex items-center justify-center mb-6 bg-white/5 backdrop-blur-sm border border-white/5", color)}>
                    <Icon className="w-6 h-6" />
                </div>

                <h4 className="text-xl font-bold text-white mb-3 tracking-tight group-hover:translate-x-1 transition-transform duration-300">{title}</h4>
                <p className="text-zinc-400 text-sm leading-relaxed max-w-sm group-hover:text-zinc-300 transition-colors">
                    {description}
                </p>

                {children}
            </div>

            {/* Grid Pattern Overlay */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02] pointer-events-none" />
        </div>
    );
}
