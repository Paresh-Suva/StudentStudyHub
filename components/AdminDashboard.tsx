"use client";

import { motion } from "framer-motion";
import { Users, Activity, UploadCloud, Server, Terminal } from "lucide-react";
import { clsx } from "clsx";
import Link from "next/link";
import AdminCharts from "@/components/AdminCharts";
import { useState } from "react";

interface AdminDashboardProps {
    chartData: any[]; // Typed as any for simplicity, but matches getAdminAnalytics return
    stats: {
        totalUsers: number;
        totalFiles: number;
        totalPending: number;
    };
}

const LOGS = [
    { id: 1, text: "User [Alex01] registered via Engineering Stream.", time: "2m ago", type: "info" },
    { id: 2, text: "User [Sarah_M] uploaded 'Anatomy_Notes_Ch1.pdf'.", time: "15m ago", type: "success" },
    { id: 3, text: "System blocked 3 suspicious requests from IP 192.168.x.x.", time: "1h ago", type: "warning" },
    { id: 4, text: "Database backup completed successfully.", time: "2h ago", type: "info" },
    { id: 5, text: "New comment reported on 'Community Hive'.", time: "3h ago", type: "error" },
];

export default function AdminDashboard({ chartData, stats }: AdminDashboardProps) {

    const TELEMETRY = [
        { title: "Total Users", value: stats.totalUsers.toLocaleString(), change: "Live", color: "border-cyan-500", icon: Users, text: "text-cyan-400" },
        { title: "Total Files", value: stats.totalFiles.toLocaleString(), change: "Library", color: "border-purple-500", icon: Server, text: "text-purple-400", href: "/admin/files" },
        { title: "Pending Uploads", value: stats.totalPending.toString(), change: "Action Req.", color: "border-orange-500", icon: UploadCloud, text: "text-orange-400" },
        { title: "System Status", value: "Online", change: "99.9%", color: "border-emerald-500", icon: Activity, text: "text-emerald-400" },
    ];

    return (
        <div className="space-y-12">

            {/* Header */}
            <div>
                <h1 className="text-3xl font-black tracking-tight text-white mb-2">SYSTEM OVERWATCH</h1>
                <p className="text-zinc-500 font-mono">Welcome back, Admin. All systems nominal.</p>
            </div>

            {/* --- SECTION A: TELEMETRY CARDS --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {TELEMETRY.map((item, idx) => {
                    const CardContent = (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className={clsx(
                                "relative overflow-hidden rounded-xl border-t-4 bg-[#0F0F0F] p-6 shadow-2xl transition-all hover:bg-white/5",
                                item.color,
                                item.href && "cursor-pointer hover:scale-105"
                            )}
                        >
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-sm font-medium text-zinc-500 uppercase tracking-widest">{item.title}</span>
                                <item.icon className={clsx("h-5 w-5", item.text)} />
                            </div>
                            <div className="flex items-baseline gap-4">
                                <h2 className="text-3xl font-bold text-white">{item.value}</h2>
                                <span className={clsx("text-xs font-mono font-bold", item.text)}>{item.change}</span>
                            </div>
                            {/* Background Glow */}
                            <div className={clsx("absolute -right-4 -bottom-4 h-24 w-24 rounded-full opacity-10 blur-2xl", item.text.replace("text-", "bg-"))} />
                        </motion.div>
                    );

                    if (item.href) {
                        return (
                            <Link href={item.href} key={item.title}>
                                {CardContent}
                            </Link>
                        );
                    }

                    return <div key={item.title}>{CardContent}</div>;
                })}
            </div>

            {/* --- SECTION B & C: ANALYTICS & LOGS --- */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Traffic Chart (2/3 width) */}
                <div className="lg:col-span-2 rounded-xl border border-white/10 bg-[#0F0F0F] p-8">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                            <Activity className="h-5 w-5 text-cyan-400" />
                            TRAFFIC ANALYSIS (LAST 7 DAYS)
                        </h3>
                        {/* Legend */}
                        <div className="flex gap-4">
                            <div className="flex items-center gap-2">
                                <span className="h-2 w-2 rounded-full bg-purple-500" />
                                <span className="text-xs text-zinc-500 uppercase">Users</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="h-2 w-2 rounded-full bg-cyan-500" />
                                <span className="text-xs text-zinc-500 uppercase">Uploads</span>
                            </div>
                        </div>
                    </div>

                    <AdminCharts data={chartData} />
                </div>

                {/* Live Logs (1/3 width) */}
                <div className="rounded-xl border border-white/10 bg-[#0F0F0F] p-8 flex flex-col">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-6">
                        <Terminal className="h-5 w-5 text-green-400" />
                        LIVE LOGS
                    </h3>

                    <div className="flex-1 overflow-y-auto space-y-4 max-h-[300px] pr-2 custom-scrollbar">
                        {LOGS.map((log) => (
                            <div key={log.id} className="border-l-2 border-white/10 pl-4 py-1 relative">
                                <div className={clsx(
                                    "absolute -left-[5px] top-2 h-2 w-2 rounded-full",
                                    log.type === "info" && "bg-blue-500",
                                    log.type === "success" && "bg-green-500",
                                    log.type === "warning" && "bg-orange-500",
                                    log.type === "error" && "bg-red-500",
                                )} />
                                <p className="text-xs font-mono text-zinc-300 mb-1 leading-relaxed">
                                    {log.text}
                                </p>
                                <span className="text-[10px] text-zinc-600 font-mono uppercase">
                                    {log.time}
                                </span>
                            </div>
                        ))}
                    </div>

                    <button className="mt-6 w-full py-2 border border-white/10 rounded-lg text-xs font-mono text-zinc-400 hover:bg-white/5 hover:text-white transition-colors">
                        VIEW FULL SYSTEM LOG
                    </button>
                </div>

            </div>
        </div>
    );
}
