"use client";

import { motion } from "framer-motion";
import { clsx } from "clsx";

interface Tab {
    id: string;
    label: string;
}

interface CyberTabsProps {
    tabs: Tab[];
    activeTab: string;
    onTabChange: (id: string) => void;
}

export default function CyberTabs({ tabs, activeTab, onTabChange }: CyberTabsProps) {
    return (
        <div className="inline-flex rounded-full bg-white/5 p-1 backdrop-blur-sm border border-white/5 relative z-10">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => onTabChange(tab.id)}
                    className={clsx(
                        "relative px-6 py-2 rounded-full text-sm font-medium transition-colors duration-300 outline-none focus-visible:ring-2 focus-visible:ring-cyan-500",
                        activeTab === tab.id ? "text-white text-shadow-glow" : "text-zinc-500 hover:text-zinc-300"
                    )}
                    style={{
                        textShadow: activeTab === tab.id ? "0 0 10px rgba(255,255,255,0.5)" : "none"
                    }}
                >
                    {activeTab === tab.id && (
                        <motion.div
                            layoutId="active-tab-pill"
                            className="absolute inset-0 z-[-1] rounded-full bg-cyan-500/20"
                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                    )}
                    <span className="relative z-10">{tab.label}</span>
                </button>
            ))}
        </div>
    );
}
