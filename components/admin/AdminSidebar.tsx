"use client";

import { LayoutDashboard, Users, FileText, BarChart3, ShieldAlert, LogOut, GitPullRequest } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { clsx } from "clsx";
import { UserButton } from "@clerk/nextjs";
import { useState, useEffect } from "react";

interface AdminSidebarProps {
    pendingCount: number;
}

const MENU_ITEMS = [
    { name: "Overview", icon: LayoutDashboard, href: "/admin" },
    { name: "Requests", icon: GitPullRequest, href: "/admin/requests" },
    { name: "User Database", icon: Users, href: "/admin/users" },
    { name: "Content Moderation", icon: FileText, href: "/admin/moderation" },
    { name: "Analytics", icon: BarChart3, href: "/admin/analytics" },
];

export default function AdminSidebar({ pendingCount }: AdminSidebarProps) {
    const pathname = usePathname();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <aside className="w-72 flex-shrink-0 border-r border-white/10 bg-black flex flex-col relative z-20">
            {/* Glossy Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

            {/* Logo Area */}
            <div className="flex items-center gap-4 px-6 h-24 border-b border-white/5 relative">
                <div className="relative group">
                    <div className="absolute inset-0 bg-red-500/20 blur-xl rounded-full opacity-50 group-hover:opacity-100 transition-opacity" />
                    <div className="p-2.5 bg-black border border-white/10 rounded-xl relative hover:border-red-500/50 transition-colors">
                        <ShieldAlert className="h-6 w-6 text-red-500" />
                    </div>
                </div>
                <div>
                    <h1 className="font-black tracking-widest text-lg text-white">OVERWATCH</h1>
                    <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                        <p className="text-[10px] text-zinc-500 font-mono tracking-wider">SYSTEM ONLINE</p>
                    </div>
                </div>
            </div>

            {/* Menu */}
            <nav className="flex-1 py-8 px-4 space-y-2 overflow-y-auto">
                {MENU_ITEMS.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={clsx(
                                "group relative flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 overflow-hidden",
                                isActive
                                    ? "text-white bg-white/5 border border-white/5"
                                    : "text-zinc-500 hover:text-white hover:bg-white/5 hover:border hover:border-white/5 border border-transparent"
                            )}
                        >
                            {/* Active Glow Bar */}
                            {isActive && (
                                <motion.div
                                    layoutId="activeGlow"
                                    className="absolute left-0 top-0 bottom-0 w-1 bg-cyan-500 shadow-[0_0_15px_rgba(34,211,238,0.8)]"
                                />
                            )}

                            <item.icon className={clsx(
                                "h-5 w-5 transition-colors relative z-10",
                                isActive ? "text-cyan-400" : "text-zinc-600 group-hover:text-zinc-300"
                            )} />

                            <span className="relative z-10">{item.name}</span>

                            {/* Notifications Badge */}
                            {item.name === "Content Moderation" && pendingCount > 0 && (
                                <div className="ml-auto relative flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500 border border-black start-0"></span>
                                </div>
                            )}

                            {/* Hover Background */}
                            <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Link>
                    )
                })}
            </nav>

            {/* Footer User */}
            <div className="p-6 border-t border-white/5 relative bg-black/50 backdrop-blur-xl">
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-full blur-md opacity-40" />
                        {isMounted ? (
                            <UserButton
                                appearance={{
                                    elements: {
                                        avatarBox: "w-10 h-10 border-2 border-black ring-1 ring-white/10"
                                    }
                                }}
                            />
                        ) : (
                            <div className="w-10 h-10 rounded-full bg-white/10 animate-pulse border-2 border-black ring-1 ring-white/10" />
                        )}
                    </div>
                    <div className="overflow-hidden">
                        <p className="text-sm font-bold text-white px-1">Admin Panel</p>
                        <p className="text-[10px] text-zinc-600 font-mono tracking-widest px-1">SECURE_ID_8492</p>
                    </div>
                </div>
            </div>
        </aside>
    );
}
