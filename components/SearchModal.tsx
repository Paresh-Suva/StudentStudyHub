"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Command, ArrowRight, X, Layout, Library, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { clsx } from "clsx";

interface SearchModalProps {
    isOpen: boolean;
    onClose: () => void;
}

// Dummy Data
const SEARCH_ITEMS = [
    { id: "1", title: "Computer Engineering", type: "Stream", url: "/stream/engineering/computer", icon: Layout },
    { id: "2", title: "Information Technology", type: "Stream", url: "/stream/engineering/it", icon: Layout },
    { id: "3", title: "MBBS", type: "Stream", url: "/stream/medical/mbbs", icon: Layout },
    { id: "4", title: "B.Pharm", type: "Stream", url: "/stream/medical/b-pharm", icon: Layout },
    { id: "5", title: "Engineering Mathematics-I", type: "Subject", url: "/stream/engineering/computer/sem-1/maths", icon: Library },
    { id: "6", title: "Human Anatomy", type: "Subject", url: "/stream/medical/mbbs/prof-1/anatomy", icon: Library },
    { id: "7", title: "Community Hive", type: "Page", url: "/community", icon: Users },
    { id: "8", title: "Streams Gateway", type: "Page", url: "/streams", icon: Layout },
];

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
    const [query, setQuery] = useState("");
    const router = useRouter();

    // Filter items
    const filteredItems = SEARCH_ITEMS.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase())
    );

    // Reset query when closed
    useEffect(() => {
        if (!isOpen) setQuery("");
    }, [isOpen]);

    // Handle Keyboard Navigation (Escape)
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [onClose]);

    const handleSelect = (url: string) => {
        router.push(url);
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[60] flex items-start justify-center pt-24 px-4">

                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="relative w-full max-w-2xl overflow-hidden rounded-xl border border-white/20 bg-[#0A0A0A] shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header / Input */}
                        <div className="flex items-center border-b border-white/10 px-4">
                            <Search className={clsx(
                                "h-6 w-6 transition-colors",
                                query ? "text-cyan-400" : "text-zinc-500"
                            )} />
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search for streams, subjects, or resources..."
                                className="h-16 w-full bg-transparent px-4 text-xl text-white placeholder-zinc-500 focus:outline-none"
                                autoFocus
                            />
                            <div className="hidden md:flex items-center gap-2">
                                <span className="rounded border border-white/10 bg-white/5 px-2 py-1 text-xs font-mono text-zinc-500">ESC</span>
                            </div>
                        </div>

                        {/* Results */}
                        <div className="max-h-[60vh] overflow-y-auto py-2">
                            {filteredItems.length > 0 ? (
                                <div className="space-y-1 px-2">
                                    {filteredItems.map((item) => (
                                        <div
                                            key={item.id}
                                            onClick={() => handleSelect(item.url)}
                                            className="group flex cursor-pointer items-center justify-between rounded-lg px-4 py-3 transition-colors hover:bg-white/5"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/5 bg-white/5 text-zinc-400 group-hover:border-cyan-500/30 group-hover:text-cyan-400 transition-colors">
                                                    <item.icon className="h-5 w-5" />
                                                </div>
                                                <div>
                                                    <h4 className="font-medium text-zinc-200 group-hover:text-white">
                                                        {item.title}
                                                    </h4>
                                                    <span className="text-xs font-mono text-zinc-500">
                                                        {item.type}
                                                    </span>
                                                </div>
                                            </div>

                                            <ArrowRight className="h-5 w-5 -translate-x-2 text-cyan-400 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center py-12 text-zinc-500">
                                    <Command className="h-12 w-12 mb-4 opacity-20" />
                                    <p>No results found for "{query}"</p>
                                </div>
                            )}

                            {/* Helper Text */}
                            {query === "" && (
                                <div className="px-6 py-4 text-xs text-zinc-600 font-mono border-t border-white/5 mt-2">
                                    <p className="mb-2 uppercase tracking-widest font-bold opacity-50">Quick Links</p>
                                    <div className="flex gap-4">
                                        <button onClick={() => handleSelect("/streams")} className="hover:text-cyan-400 transition-colors">Academic Streams</button>
                                        <button onClick={() => handleSelect("/community")} className="hover:text-cyan-400 transition-colors">Community Hive</button>
                                    </div>
                                </div>
                            )}
                        </div>

                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
