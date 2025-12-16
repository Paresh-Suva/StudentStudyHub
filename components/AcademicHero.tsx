"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { clsx } from "clsx";
import NeonButton from "./NeonButton";
import { SignedIn, SignedOut } from "@clerk/nextjs";

const PHRASES = [
    "Ace Your Exams.",
    "Master The Logic.",
    "Build The Future.",
    "Defy The Syllabus.",
    "Decode The Code.",
    "Heal The World.",
    "Visualize The Complex.",
    "Engineer Your Dreams.",
    "Understanding > Memorizing.",
    "Unlock Your Potential."
];

export default function AcademicHero() {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Update mouse position for the spotlight effect
    function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <div
            className="relative flex min-h-[80vh] w-full flex-col items-center justify-center overflow-hidden bg-[#0A0A0A] px-4 py-20 text-center antialiased"
            onMouseMove={handleMouseMove}
        >
            {/* Grid Background */}
            <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#333_1px,transparent_1px),linear-gradient(to_bottom,#333_1px,transparent_1px)] bg-[size:40px_40px] opacity-[0.1]" />

            {/* High-Voltage Spotlight Effect (Neon Cyan) */}
            <motion.div
                className="pointer-events-none absolute inset-0 z-0 bg-transparent transition-opacity duration-300"
                style={{
                    background: useMotionTemplate`
                        radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(6,182,212,0.15), transparent 80%),
                        radial-gradient(100px circle at ${mouseX}px ${mouseY}px, rgba(255,255,255,0.1), transparent 50%)
                    `
                }}
            />

            <div className="relative z-10 mx-auto max-w-5xl">
                <HeroContent />
            </div>
        </div>
    );
}

function HeroContent() {
    // Animation delay to sync with Navbar entrance
    const [startAnimation, setStartAnimation] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setStartAnimation(true), 800);
        return () => clearTimeout(timer);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            {/* Badge */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={startAnimation ? { opacity: 1, y: 0 } : {}}
                className="mb-8 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-950/20 px-4 py-1.5 text-sm font-medium text-cyan-400"
            >
                <Sparkles className="h-4 w-4" />
                <span>The Future of Study</span>
            </motion.div>

            {/* Static H1 */}
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-white sm:text-6xl md:text-8xl">
                Don't just memorize.
            </h1>

            {/* Dynamic Typewriter H2 */}
            <div className="mb-8 min-h-[1.2em]"> {/* Fixed height container */}
                <h2 className="text-4xl font-extrabold tracking-tight text-cyan-400 sm:text-6xl md:text-7xl">
                    <Typewriter phrases={PHRASES} start={startAnimation} />
                </h2>
            </div>

            {/* Description & Buttons */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={startAnimation ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5, duration: 0.8 }}
            >
                <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-zinc-400 sm:text-xl font-medium">
                    The ultimate resource for Engineering and Medical students. Access vivid concept maps, verified PYQs, and topper notes instantly.
                </p>

                {/* 3D Buttons */}
                <div className="flex flex-col items-center justify-center gap-8 sm:flex-row">
                    <SignedOut>
                        <Link href="/sign-in">
                            <NeonButton variant="primary" className="h-14 min-w-[200px] text-lg">
                                Get Started
                            </NeonButton>
                        </Link>
                    </SignedOut>
                    <SignedIn>
                        <Link href="/streams">
                            <NeonButton variant="primary" className="h-14 min-w-[200px] text-lg">
                                Go to Streams
                            </NeonButton>
                        </Link>
                    </SignedIn>

                    <Link href="/community">
                        <NeonButton variant="outline" className="h-14 min-w-[200px] text-lg">
                            Join Community
                        </NeonButton>
                    </Link>
                </div>
            </motion.div>
        </motion.div>
    );
}

// --- Typewriter Component ---
function Typewriter({ phrases, start }: { phrases: string[], start: boolean }) {
    const [text, setText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const [loopNum, setLoopNum] = useState(0);
    const [typingSpeed, setTypingSpeed] = useState(150);

    useEffect(() => {
        if (!start) return;

        const i = loopNum % phrases.length;
        const fullText = phrases[i];

        const handleTyping = () => {
            setText(isDeleting
                ? fullText.substring(0, text.length - 1)
                : fullText.substring(0, text.length + 1)
            );

            // Typing Speed Logic
            setTypingSpeed(isDeleting ? 30 : 50);

            if (!isDeleting && text === fullText) {
                // Finished typing phrase
                setTimeout(() => setIsDeleting(true), 2000);
            } else if (isDeleting && text === "") {
                // Finished deleting
                setIsDeleting(false);
                setLoopNum(loopNum + 1);
            }
        };

        const timer = setTimeout(handleTyping, typingSpeed);
        return () => clearTimeout(timer);
    }, [text, isDeleting, loopNum, phrases, start, typingSpeed]);

    return (
        <span>
            {text}
            <span className="animate-blink ml-1 inline-block h-[0.8em] w-1 align-middle bg-cyan-400" />
        </span>
    );
}
