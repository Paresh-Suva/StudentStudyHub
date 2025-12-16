"use client";

import { motion } from "framer-motion";
import NextImage from "next/image";
import { Search } from "lucide-react";
import Link from "next/link";
import NeonButton from "./NeonButton";
import { SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import SearchModal from "@/components/SearchModal";
import CustomUserMenu from "@/components/CustomUserMenu";
import CommandMenu from "@/components/CommandMenu";
import MobileMenu from "./MobileMenu";

export default function NavbarClient() {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isCommandOpen, setIsCommandOpen] = useState(false);

    // Ctrl+K Shortcut
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.ctrlKey && e.key === "k") {
                e.preventDefault();
                setIsCommandOpen(true);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    const navItems = [
        { label: "Streams", href: "/streams" },
        { label: "Community", href: "/community" },
        { label: "Leaderboard", href: "/leaderboard" },
        { label: "Discussion", href: "/discussion" },
        { label: "About", href: "/about" },
        { label: "Contribute", href: "/contribute" },
    ];

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                className="fixed top-0 left-0 right-0 z-50 px-4 py-4 md:px-8 bg-black/50 backdrop-blur-md border-b border-white/5"
            >
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    {/* Logo */}
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="relative w-8 h-8 flex items-center justify-center">
                            <img
                                src="/logo.png"
                                alt="Logo"
                                className="w-full h-full object-contain drop-shadow-[0_0_5px_rgba(255,255,255,0.5)] group-hover:drop-shadow-[0_0_15px_var(--glow-color)] transition-all"
                            />
                        </div>
                        <div className="relative overflow-hidden">
                            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-zinc-400 animate-text-shimmer bg-[length:200%_auto]">
                                STUDENT STUDY
                            </span>
                            <span className="text-xl font-bold text-[var(--glow-color)] ml-1 drop-shadow-[0_0_10px_rgba(6,182,212,0.5)] animate-pulse">
                                HUB
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                className={`text-sm font-medium transition-colors hover:text-[var(--glow-color)] ${item.label === "Contribute" ? "text-[var(--glow-color)]" : "text-zinc-400"
                                    }`}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>

                    {/* Mobile Login (Visible on Mobile) */}
                    <SignedOut>
                        <Link href="/sign-in" className="md:hidden mr-2">
                            <NeonButton variant="primary" className="h-8 px-3 text-xs">
                                Login
                            </NeonButton>
                        </Link>
                    </SignedOut>

                    {/* Mobile Menu Toggle */}
                    <MobileMenu navItems={navItems} />

                    {/* Actions */}
                    <div className="hidden md:flex items-center gap-4">
                        <button
                            onClick={() => setIsCommandOpen(true)}
                            className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-zinc-400 text-xs hover:border-[var(--glow-color)] hover:text-white transition-all group"
                        >
                            <Search className="w-3 h-3 group-hover:text-[var(--glow-color)]" />
                            <span>CTRL+K</span>
                        </button>

                        <SignedOut>
                            <Link href="/sign-in">
                                <NeonButton variant="primary" className="h-9 px-4 text-sm">
                                    Login
                                </NeonButton>
                            </Link>
                        </SignedOut>

                        <SignedIn>
                            <Link href="/dashboard">
                                <NeonButton variant="outline" className="hidden h-10 px-4 text-sm md:flex mr-4">
                                    Dashboard
                                </NeonButton>
                            </Link>
                            <CustomUserMenu />
                        </SignedIn>
                    </div>
                </div>
            </motion.nav>

            <CommandMenu isOpen={isCommandOpen} setIsOpen={setIsCommandOpen} />
            <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        </>
    );
}
