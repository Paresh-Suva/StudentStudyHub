"use client";
// Force dynamic rebuild

import { motion } from "framer-motion";
import { ArrowRight, Hexagon, Lock, Mail, Disc } from "lucide-react";
import { Pi, Dna, Zap, Cpu, Atom, Binary } from "lucide-react";
import TracingBeamGrid from "@/components/TracingBeamGrid";
import Link from "next/link";
import { useState } from "react";
import { clsx } from "clsx";
import { SignIn } from "@clerk/nextjs";

// --- Zero-G Floating Icons Configuration ---
const FLOATING_ICONS = [
    { Icon: Pi, color: "text-cyan-500/20", size: "w-32 h-32", top: "10%", left: "10%" },
    { Icon: Dna, color: "text-rose-500/20", size: "w-28 h-28", top: "20%", right: "15%" },
    { Icon: Zap, color: "text-yellow-500/20", size: "w-24 h-24", bottom: "15%", left: "20%" },
    { Icon: Cpu, color: "text-cyan-500/20", size: "w-40 h-40", top: "40%", right: "10%" },
    { Icon: Atom, color: "text-purple-500/20", size: "w-36 h-36", bottom: "10%", right: "25%" },
    { Icon: Binary, color: "text-green-500/20", size: "w-20 h-20", top: "15%", left: "40%" },
];

export default function LoginPage() {
    const [focusedField, setFocusedField] = useState<string | null>(null);

    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-black text-white flex pt-20">

            {/* Background Grid */}
            <div className="absolute inset-0 z-0">
                <TracingBeamGrid />
            </div>

            {/* Left Side - Zero-G Knowledge Field (Hidden on Mobile) */}
            <div className="hidden w-1/2 relative z-10 lg:flex items-center justify-center overflow-hidden">

                {/* Floating Icons Container */}
                <div className="absolute inset-0 z-0">
                    {FLOATING_ICONS.map((item, index) => (
                        <motion.div
                            key={index}
                            className={clsx("absolute", item.color)}
                            style={{
                                top: item.top,
                                left: item.left,
                                right: item.right,
                                bottom: item.bottom
                            }}
                            animate={{
                                y: [0, -20, 0],
                                rotate: [0, 10, -10, 0]
                            }}
                            transition={{
                                duration: 4 + Math.random() * 3, // Random 4-7s
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: index * 0.5 // Stagger start
                            }}
                        >
                            <item.Icon className={clsx(item.size)} />
                        </motion.div>
                    ))}
                </div>

                {/* Center Content */}
                <div className="relative z-10 p-12 text-center rounded-3xl bg-black/10 backdrop-blur-sm border border-white/5 mx-8">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-6xl font-black tracking-tight uppercase mb-4 drop-shadow-[0_0_15px_rgba(0,0,0,0.8)]">
                            Welcome Back
                            <span className="block text-cyan-400">Learner</span>
                        </h1>
                        <p className="text-zinc-400 font-mono text-sm tracking-widest uppercase bg-black/40 inline-block px-4 py-1 rounded-full">
                            System Live. Zero-Gravity Environment.
                        </p>
                    </motion.div>
                </div>

            </div>

            {/* Right Side - Form */}
            <div className="flex w-full items-center justify-center p-4 lg:w-1/2 relative z-10">
                <motion.div
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="w-full max-w-md flex justify-center"
                >
                    <SignIn
                        appearance={{
                            elements: {
                                formButtonPrimary: 'bg-cyan-500 hover:bg-cyan-400 text-black',
                                footerActionLink: 'text-cyan-400 hover:text-cyan-300',
                                card: 'bg-black/40 backdrop-blur-xl border border-white/10 shadow-2xl rounded-2xl'
                            }
                        }}

                    />
                </motion.div>
            </div>

        </div>
    );
}
