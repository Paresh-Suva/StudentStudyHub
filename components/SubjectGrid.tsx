"use client";

import { motion } from "framer-motion";
import { Terminal, Activity, Ruler, Settings, ArrowUpRight } from "lucide-react";
import Link from "next/link";

interface SubjectCardProps {
    title: string;
    description: string;
    icon: React.ReactNode;
    href: string;
    className?: string; // For bento grid positioning
    BackgroundAnimation: React.FC;
}

// --- Animated Background Components ---

const ComputerScienceBg = () => (
    <svg
        viewBox="0 0 200 160"
        className="absolute bottom-4 right-4 h-32 w-40 opacity-[0.08]"
    >
        {/* IDE Window Frame */}
        <rect x="10" y="10" width="180" height="140" rx="4" stroke="currentColor" strokeWidth="2" fill="none" />
        <circle cx="25" cy="25" r="3" fill="currentColor" />
        <circle cx="35" cy="25" r="3" fill="currentColor" />
        <circle cx="45" cy="25" r="3" fill="currentColor" />

        {/* Typing Code Lines */}
        <motion.line
            x1="20" y1="50" x2="100" y2="50"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: [0, 1, 1, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", times: [0, 0.4, 0.8, 1] }}
        />
        <motion.line
            x1="20" y1="70" x2="140" y2="70"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: [0, 1, 1, 0] }}
            transition={{ duration: 3, delay: 0.5, repeat: Infinity, ease: "easeInOut", times: [0, 0.4, 0.8, 1] }}
        />
        <motion.line
            x1="20" y1="90" x2="80" y2="90"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: [0, 1, 1, 0] }}
            transition={{ duration: 3, delay: 1, repeat: Infinity, ease: "easeInOut", times: [0, 0.4, 0.8, 1] }}
        />
    </svg>
);

const MedicalBg = () => (
    <svg viewBox="0 0 200 100" className="absolute bottom-4 right-4 h-24 w-48 opacity-[0.08]">
        <motion.path
            d="M 0 50 L 30 50 L 40 20 L 50 80 L 60 50 L 90 50 L 100 20 L 110 80 L 120 50 L 200 50"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
                repeatType: "loop"
            }}
        />
    </svg>
);

const CivilBg = () => (
    <svg viewBox="0 0 200 100" className="absolute bottom-4 right-4 h-32 w-64 opacity-[0.08]">
        {/* Bridge Truss Structure */}
        <path d="M 0 90 L 200 90" stroke="currentColor" strokeWidth="2" />
        <path d="M 0 90 L 200 10" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" opacity="0.5" />

        <motion.path
            d="M 20 90 L 40 50 L 60 90 L 80 50 L 100 90 L 120 50 L 140 90 L 160 50 L 180 90"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
    </svg>
);

const MechanicalBg = () => (
    <div className="absolute bottom-4 right-4 opacity-[0.08]">
        <svg viewBox="0 0 100 100" className="h-24 w-24">
            <motion.g
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                style={{ originX: "50%", originY: "50%" }}
            >
                {/* Simple Gear Path */}
                <path
                    d="M50 25 L55 15 L65 15 L70 25 L80 28 L88 20 L94 26 L86 34 L89 44 L99 47 L99 53 L89 56 L86 66 L94 74 L88 80 L80 72 L70 75 L65 85 L55 85 L50 75 L40 75 L35 85 L25 85 L20 75 L10 72 L4 80 L-2 74 L6 66 L3 56 L-7 53 L-7 47 L3 44 L6 34 L-2 26 L4 20 L12 28 L20 25 L25 15 L35 15 L40 25 Z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    transform="translate(0,0)"
                />
                <circle cx="50" cy="50" r="15" stroke="currentColor" strokeWidth="4" fill="none" />
            </motion.g>
        </svg>
        <svg viewBox="0 0 100 100" className="h-16 w-16 absolute -bottom-2 -left-8">
            <motion.g
                animate={{ rotate: -360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                style={{ originX: "50%", originY: "50%" }}
            >
                <path
                    d="M50 25 L55 15 L65 15 L70 25 L80 28 L88 20 L94 26 L86 34 L89 44 L99 47 L99 53 L89 56 L86 66 L94 74 L88 80 L80 72 L70 75 L65 85 L55 85 L50 75 L40 75 L35 85 L25 85 L20 75 L10 72 L4 80 L-2 74 L6 66 L3 56 L-7 53 L-7 47 L3 44 L6 34 L-2 26 L4 20 L12 28 L20 25 L25 15 L35 15 L40 25 Z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    transform="scale(0.8) translate(10,10)"
                />
            </motion.g>
        </svg>
    </div>
);


// --- Main Component ---

const subjects = [
    {
        title: "Computer Science",
        description: "Algorithms, Data Structures & Systems",
        icon: <Terminal className="h-6 w-6 text-green-400" />,
        href: "/stream/engineering/cs", // Assuming routing structure
        BackgroundAnimation: ComputerScienceBg,
        className: "md:col-span-2", // Bento grid span
    },
    {
        title: "Medical / MBBS",
        description: "Anatomy, Physiology & Pathology",
        icon: <Activity className="h-6 w-6 text-rose-500" />,
        href: "/stream/medical/mbbs",
        BackgroundAnimation: MedicalBg,
        className: "md:col-span-1",
    },
    {
        title: "Civil Engineering",
        description: "Structural Design & Mechanics",
        icon: <Ruler className="h-6 w-6 text-yellow-500" />,
        href: "/stream/engineering/civil",
        BackgroundAnimation: CivilBg,
        className: "md:col-span-1",
    },
    {
        title: "Mechanical Engineering",
        description: "Thermodynamics & Kinetics",
        icon: <Settings className="h-6 w-6 text-blue-500" />,
        href: "/stream/engineering/mechanical",
        BackgroundAnimation: MechanicalBg,
        className: "md:col-span-2",
    },
];

export default function SubjectGrid() {
    return (
        <section className="w-full max-w-7xl mx-auto px-4 py-20">
            <div className="mb-12">
                <h2 className="text-3xl font-bold text-[#E0E0E0] md:text-4xl">Explore Concepts</h2>
                <p className="mt-2 text-gray-500">Select your field to dive deep.</p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {subjects.map((subject, index) => (
                    <Link
                        key={index}
                        href={subject.href}
                        className={`group relative overflow-hidden rounded-2xl border border-white/5 bg-[#252525] p-8 transition-all hover:border-white/20 hover:scale-[1.01] ${subject.className || ""}`}
                    >
                        {/* Animated Background */}
                        <div className="pointer-events-none text-gray-500">
                            <subject.BackgroundAnimation />
                        </div>

                        {/* Content */}
                        <div className="relative z-10 flex flex-col items-start justify-between h-full">
                            <div className="mb-4 rounded-lg bg-white/5 p-3 backdrop-blur-sm">
                                {subject.icon}
                            </div>

                            <div>
                                <h3 className="text-xl font-bold text-[#E0E0E0] mb-1">{subject.title}</h3>
                                <p className="text-sm text-gray-400">{subject.description}</p>
                            </div>

                            <div className="absolute top-4 right-4 opacity-0 transition-opacity group-hover:opacity-100">
                                <ArrowUpRight className="h-5 w-5 text-white/50" />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
