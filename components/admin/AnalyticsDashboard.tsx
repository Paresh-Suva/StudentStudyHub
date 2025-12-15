"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
    Activity,
    Users,
    FileText,
    TrendingUp,
    Zap,
    Terminal,
    Clock,
    Radar
} from "lucide-react";
import { clsx } from "clsx";
import { formatDistanceToNow } from 'date-fns';
import { useState, useEffect } from "react";
import CountUp from 'react-countup';

interface AnalyticsDashboardProps {
    metrics: {
        totalUsers: number;
        totalFiles: number;
    };
    streams: {
        stream: string;
        _count: { _all: number };
    }[];
    recentUploads: {
        id: string;
        title: string;
        createdAt: Date;
        user: { name: string | null; email: string | null } | null;
    }[];
}

export default function AnalyticsDashboard({ metrics, streams, recentUploads }: AnalyticsDashboardProps) {
    const [elapsed, setElapsed] = useState(0);

    // Mock Timer for "Live" feel
    useEffect(() => {
        const interval = setInterval(() => setElapsed(e => e + 1), 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="space-y-8">

            {/* --- SECTION 1: GROWTH METRICS --- */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <MetricCard
                    label="Total Users"
                    value={metrics.totalUsers}
                    subValue="Registered Accounts"
                    icon={Users}
                    color="cyan"
                    trend="Active"
                    delay={0}
                />
                <MetricCard
                    label="Knowledge Base"
                    value={metrics.totalFiles}
                    subValue="Total Contributions"
                    icon={FileText}
                    color="purple"
                    trend="+100% Organic"
                    delay={0.1}
                />
                <MetricCard
                    label="System Status"
                    value={100}
                    isPercent={true}
                    subValue="Uptime (Last 30 Days)"
                    icon={Activity}
                    color="green"
                    trend="Stable"
                    delay={0.2}
                />
            </div>

            {/* --- SECTION 2: LIVE METRICS --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* --- 1. Stream Velocity (Liquid Neon) --- */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="p-6 rounded-2xl bg-black border border-white/10 relative overflow-hidden group"
                >
                    {/* Background Neon Pulse */}
                    <motion.div
                        animate={{ opacity: [0.05, 0.15, 0.05] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-cyan-500/20 to-transparent"
                    />

                    <div className="flex items-center justify-between mb-8 relative z-10">
                        <h3 className="text-xl font-black italic tracking-tighter flex items-center gap-2 text-white drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">
                            <TrendingUp className="w-5 h-5 text-cyan-400" />
                            STREAM VELOCITY
                        </h3>
                    </div>

                    <div className="space-y-6 relative z-10">
                        {streams.map((item, idx) => (
                            <motion.div
                                key={item.stream}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 + (idx * 0.1) }}
                                whileHover={{ scale: 1.02, x: 5 }}
                                className="group/bar relative cursor-pointer"
                            >
                                <div className="flex justify-between text-sm mb-2 font-mono uppercase tracking-wider">
                                    <span className="text-zinc-400 group-hover/bar:text-cyan-400 transition-colors group-hover/bar:drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]">
                                        {item.stream}
                                    </span>
                                    <span className="text-white font-bold">
                                        <CountUp end={item._count._all} duration={2} /> <span className="text-zinc-600 text-[10px]">UPLOADS</span>
                                    </span>
                                </div>

                                <div className="h-3 w-full bg-zinc-900/50 rounded-full overflow-hidden border border-white/5 relative shadow-inner">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${(item._count._all / metrics.totalFiles) * 100}%` }}
                                        transition={{ duration: 1.5, ease: "circOut", delay: 0.6 + (idx * 0.1) }}
                                        className={clsx("h-full rounded-full relative overflow-hidden shadow-[0_0_15px_rgba(0,0,0,0.5)]",
                                            idx === 0 ? "bg-cyan-500 shadow-[0_0_20px_rgba(34,211,238,0.5)]" :
                                                idx === 1 ? "bg-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.5)]" :
                                                    "bg-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.5)]"
                                        )}
                                    >
                                        {/* Liquid Shimmer Effect */}
                                        <motion.div
                                            animate={{ x: ["-100%", "100%"] }}
                                            transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent w-1/2 blur-sm"
                                        />
                                    </motion.div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* --- 2. Live Transmission (Terminal) --- */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="p-6 rounded-2xl bg-black border border-green-500/20 backdrop-blur-sm flex flex-col relative overflow-hidden group hover:border-green-500/50 transition-colors"
                >
                    {/* Matrix Digital Rain Background (Simplified) */}
                    <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://upload.wikimedia.org/wikipedia/commons/1/17/Matrix_digital_rain_gif.gif')] bg-cover mix-blend-screen" style={{ filter: 'grayscale(100%) brightness(0.5) sepia(1) hue-rotate(70deg)' }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />

                    <div className="flex items-center justify-between mb-6 relative z-10 border-b border-green-500/20 pb-4">
                        <h3 className="text-xl font-bold flex items-center gap-2 text-green-500 font-mono tracking-tight drop-shadow-[0_0_8px_rgba(34,197,94,0.6)]">
                            <Terminal className="w-5 h-5" />
                            LIVE_FEED
                        </h3>
                        <div className="flex items-center gap-3 bg-green-900/20 px-3 py-1 rounded-sm border border-green-500/30">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>
                            <span className="text-[10px] text-green-400 font-mono uppercase tracking-widest">
                                RX_ACTIVE <span className="animate-pulse">_</span>
                            </span>
                        </div>
                    </div>

                    <div className="space-y-4 flex-1 overflow-hidden font-mono text-xs relative z-10">
                        {/* Static Noise Overlay */}
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none mix-blend-overlay"></div>

                        {recentUploads.map((file, i) => (
                            <motion.div
                                key={file.id}
                                initial={{ opacity: 0, x: -10, height: 0 }}
                                animate={{ opacity: 1, x: 0, height: "auto" }}
                                transition={{ delay: 0.5 + (i * 0.2) }}
                                whileHover={{ x: 10, backgroundColor: "rgba(34, 197, 94, 0.05)" }}
                                className="group relative pl-4 py-2 border-l-2 border-zinc-800 hover:border-green-400 hover:shadow-[0_0_15px_-5px_rgba(34,197,94,0.3)] transition-all duration-300"
                            >
                                <div className="absolute left-[-5px] top-1/2 -translate-y-1/2 w-2 h-2 bg-green-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-[0_0_10px_rgba(34,197,94,1)]" />

                                <span className="text-zinc-600 text-[10px] uppercase tracking-wider mb-1 block group-hover:text-green-500/70 transition-colors">
                                    &gt; {formatDistanceToNow(new Date(file.createdAt), { addSuffix: true })}
                                </span>
                                <div className="text-zinc-300 group-hover:text-white transition-colors">
                                    User <span className="text-green-400 font-bold drop-shadow-[0_0_5px_rgba(34,197,94,0.5)]">{file.user?.name || "Anonymous_Agent"}</span>
                                    <span className="text-zinc-600 mx-1">::</span>
                                    pushed payload
                                    <span className="text-cyan-400 ml-2 font-bold drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]">
                                        {file.title}
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

            </div>

            {/* --- SECTION 3: SYSTEM HEALTH (Full Width) --- */}
            <div className="grid grid-cols-1">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    whileHover={{ scale: 1.01 }}
                    className="relative p-8 rounded-2xl bg-black border border-white/10 overflow-hidden group hover:border-green-500/50 transition-colors duration-500"
                >
                    {/* Radar Background */}
                    <div className="absolute inset-0 overflow-hidden">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                            className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_340deg,rgba(34,197,94,0.05)_360deg)]"
                        />
                    </div>

                    <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 justify-between">
                        <div className="flex items-center gap-6">
                            <div className="relative flex items-center justify-center w-20 h-20">
                                <div className="absolute inset-0 bg-green-500/20 rounded-full blur-xl animate-pulse" />
                                <Zap className="w-10 h-10 text-green-400 relative z-10 drop-shadow-[0_0_10px_rgba(34,197,94,0.8)]" />
                                {/* Spinning Rings */}
                                <motion.div animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }} className="absolute inset-0 border-t-2 border-green-500/50 rounded-full" />
                                <motion.div animate={{ rotate: -360 }} transition={{ duration: 5, repeat: Infinity, ease: "linear" }} className="absolute inset-2 border-b-2 border-green-500/30 rounded-full" />
                            </div>
                            <div>
                                <h4 className="text-2xl font-black text-white mb-2 tracking-tight">SYSTEM CORE ONLINE</h4>
                                <div className="flex gap-4 text-xs font-mono">
                                    <span className="text-green-400 bg-green-900/20 px-2 py-1 rounded border border-green-500/30 shadow-[0_0_10px_rgba(34,197,94,0.2)]">STATUS: OPTIMAL</span>
                                    <span className="text-zinc-500">SESSION_TIME: {elapsed}s</span>
                                </div>
                            </div>
                        </div>

                        {/* Mini Stats Grid */}
                        <div className="grid grid-cols-2 gap-8 text-right">
                            <div>
                                <div className="text-[10px] text-zinc-500 uppercase tracking-widest mb-1">Database Latency</div>
                                <div className="text-xl font-bold text-white font-mono">24<span className="text-zinc-600 text-sm">ms</span></div>
                            </div>
                            <div>
                                <div className="text-[10px] text-zinc-500 uppercase tracking-widest mb-1">Memory Load</div>
                                <div className="text-xl font-bold text-white font-mono">41<span className="text-zinc-600 text-sm">%</span></div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

function MetricCard({ label, value, subValue, icon: Icon, color, trend, delay, isPercent }: any) {
    const colorClasses: Record<string, string> = {
        cyan: "text-cyan-400 hover:shadow-[0_0_40px_-10px_rgba(34,211,238,0.4)] border-cyan-500/20",
        purple: "text-purple-400 hover:shadow-[0_0_40px_-10px_rgba(168,85,247,0.4)] border-purple-500/20",
        green: "text-green-400 hover:shadow-[0_0_40px_-10px_rgba(34,197,94,0.4)] border-green-500/20",
    };

    const colors = colorClasses[color] || colorClasses.cyan;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.5 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className={`p-6 rounded-2xl border backdrop-blur-xl bg-black transition-all duration-300 group relative overflow-hidden ${colors}`}
        >
            <div className={`absolute -top-20 -right-20 w-64 h-64 rounded-full blur-[80px] opacity-10 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none ${color === 'cyan' ? 'bg-cyan-500' :
                    color === 'purple' ? 'bg-purple-500' : 'bg-green-500'
                }`}
            />

            <div className="flex justify-between items-start mb-4 relative z-10">
                <div className={`p-3 rounded-xl bg-white/5 border border-white/10 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-6 h-6" />
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold font-mono text-zinc-400">
                    <TrendingUp className="w-3 h-3" />
                    {trend}
                </div>
            </div>

            <div className="relative z-10">
                <h3 className="text-zinc-400 text-sm font-medium mb-1 tracking-wide">{label}</h3>
                <div className="text-4xl font-black text-white mb-2 tracking-tight drop-shadow-lg">
                    <CountUp end={value} duration={2.5} suffix={isPercent ? "%" : ""} separator="," />
                </div>
                <div className="text-xs text-zinc-500 font-mono uppercase tracking-wider">{subValue}</div>
            </div>
        </motion.div>
    );
}
