"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { clsx } from "clsx";
import { Shield, FileText, Cookie } from "lucide-react";

const navItems = [
    { label: "Privacy Policy", href: "/legal/privacy", icon: Shield },
    { label: "Terms of Service", href: "/legal/terms", icon: FileText },
    { label: "Cookie Policy", href: "/legal/cookie", icon: Cookie },
];

export default function LegalSidebar() {
    const pathname = usePathname();

    return (
        <nav className="space-y-2 sticky top-32">
            <div className="mb-6 px-4">
                <h3 className="text-xs font-mono font-bold text-zinc-500 uppercase tracking-widest">
                    Legal & Compliance
                </h3>
            </div>

            {navItems.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;

                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        className="block relative group"
                    >
                        {isActive && (
                            <motion.div
                                layoutId="activeLegalNav"
                                className="absolute inset-0 bg-white/5 border border-white/10 rounded-lg"
                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            />
                        )}
                        <div className={clsx(
                            "relative z-10 flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                            isActive ? "text-white" : "text-zinc-500 hover:text-zinc-300"
                        )}>
                            <Icon className={clsx("h-4 w-4", isActive ? "text-cyan-400" : "text-zinc-600 group-hover:text-zinc-400")} />
                            <span className="text-sm font-medium">{item.label}</span>
                        </div>
                    </Link>
                );
            })}
        </nav>
    );
}
