"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface MobileMenuProps {
    navItems: { label: string; href: string }[];
}

export default function MobileMenu({ navItems }: MobileMenuProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="md:hidden">
            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-zinc-400 hover:text-white transition-colors"
            >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Overlay Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-full left-0 right-0 bg-black/95 border-b border-white/10 backdrop-blur-xl p-6 shadow-2xl z-50 rounded-b-2xl overflow-hidden"
                    >
                        {/* Background Effect */}
                        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />

                        <div className="flex flex-col gap-4 relative z-10">
                            {navItems.map((item) => (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    onClick={() => setIsOpen(false)}
                                    className="text-lg font-medium text-zinc-400 hover:text-cyan-400 hover:pl-2 transition-all block py-2 border-b border-white/5 last:border-0"
                                >
                                    {item.label}
                                </Link>
                            ))}

                            <Link href="/dashboard" onClick={() => setIsOpen(false)} className="mt-4">
                                <button className="w-full py-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-bold tracking-wide hover:bg-cyan-500/20 transition-all">
                                    Dashboard
                                </button>
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
