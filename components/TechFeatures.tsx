"use client";

import { motion } from "framer-motion";
import { Library, Zap, Share2, Award } from "lucide-react";
import { clsx } from "clsx";

// --- Background Animations ---

const ArchiveBg = () => (
    <svg className="absolute inset-0 h-full w-full opacity-10" viewBox="0 0 400 200" preserveAspectRatio="none">
        {/* Stacked Paper Lines */}
        {[20, 40, 60, 80, 100, 120, 140, 160, 180].map((y, i) => (
            <motion.line
                key={i}
                x1="20" y1={y} x2="380" y2={y}
                stroke="currentColor" strokeWidth="1"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.5, delay: i * 0.1, ease: "linear" }}
            />
        ))}
        <motion.line
            x1="20" y1="0" x2="20" y2="200"
            stroke="currentColor" strokeWidth="1"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1 }}
        />
    </svg>
);

const SpeedBg = () => (
    <svg className="absolute inset-0 h-full w-full opacity-10" viewBox="0 0 200 200" preserveAspectRatio="none">
        {/* Static Grid */}
        <defs>
            <pattern id="grid-speed" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-speed)" />

        {/* Laser Scan Line */}
        <motion.rect
            x="0" y="0" width="200" height="2"
            fill="currentColor"
            animate={{ y: [0, 200, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
    </svg>
);

const LogicBg = () => (
    <svg className="absolute inset-0 h-full w-full opacity-10" viewBox="0 0 200 200">
        {/* Network Nodes */}
        <motion.line x1="20" y1="20" x2="180" y2="180" stroke="currentColor" strokeWidth="1" />
        <motion.line x1="180" y1="20" x2="20" y2="180" stroke="currentColor" strokeWidth="1" />
        <motion.line x1="100" y1="20" x2="100" y2="180" stroke="currentColor" strokeWidth="1" />
        <motion.line x1="20" y1="100" x2="180" y2="100" stroke="currentColor" strokeWidth="1" />

        <motion.circle cx="20" cy="20" r="4" fill="currentColor" animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 2, repeat: Infinity }} />
        <motion.circle cx="180" cy="20" r="4" fill="currentColor" animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 2, delay: 0.5, repeat: Infinity }} />
        <motion.circle cx="20" cy="180" r="4" fill="currentColor" animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 2, delay: 1, repeat: Infinity }} />
        <motion.circle cx="180" cy="180" r="4" fill="currentColor" animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 2, delay: 1.5, repeat: Infinity }} />
        <motion.circle cx="100" cy="100" r="6" fill="currentColor" />
    </svg>
);

const CommunityBg = () => (
    <svg className="absolute inset-0 h-full w-full opacity-10" viewBox="0 0 400 200">
        {/* Geometric Stars */}
        {[
            { cx: 50, cy: 50, scale: 1 },
            { cx: 350, cy: 150, scale: 0.8 },
            { cx: 200, cy: 30, scale: 0.6 },
            { cx: 100, cy: 150, scale: 0.7 },
            { cx: 300, cy: 60, scale: 1.2 },
        ].map((star, i) => (
            <motion.path
                key={i}
                d={`M${star.cx},${star.cy - 10 * star.scale} L${star.cx + 2 * star.scale},${star.cy - 2 * star.scale} L${star.cx + 10 * star.scale},${star.cy} L${star.cx + 2 * star.scale},${star.cy + 2 * star.scale} L${star.cx},${star.cy + 10 * star.scale} L${star.cx - 2 * star.scale},${star.cy + 2 * star.scale} L${star.cx - 10 * star.scale},${star.cy} L${star.cx - 2 * star.scale},${star.cy - 2 * star.scale} Z`}
                fill="currentColor"
                initial={{ opacity: 0.5, scale: 0 }}
                animate={{ opacity: 1, scale: 1, rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, repeatType: "mirror", delay: i * 0.5 }}
            />
        ))}
    </svg>
);


// --- Feature Card Component ---

interface FeatureCardProps {
    title: string;
    desc: string;
    icon: any;
    className?: string;
    BgAnimation: React.FC;
}

const FeatureCard = ({ title, desc, icon: Icon, className, BgAnimation }: FeatureCardProps) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className={clsx(
            "group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/5 bg-[#0F0F0F] p-8 transition-all duration-300 hover:border-white/10 hover:scale-[1.01]",
            className
        )}
    >
        {/* Animated Background */}
        <div className="absolute inset-0 z-0 text-zinc-700">
            <BgAnimation />
        </div>

        {/* Icon */}
        <div className="relative z-10 mb-8 self-start rounded-full border border-white/10 bg-white/5 p-3 text-white backdrop-blur-sm transition-colors group-hover:bg-white/10">
            <Icon className="h-6 w-6 stroke-[1.5]" />
        </div>

        {/* Content */}
        <div className="relative z-10 mt-auto">
            <h3 className="text-xl font-bold text-white mb-1">{title}</h3>
            <p className="text-sm text-zinc-500">{desc}</p>
        </div>
    </motion.div>
);


// --- Main Grid Component ---

const FEATURES = [
    {
        title: "Topic-wise PYQs",
        desc: "Organized past year papers sorted by specific topics for targeted practice.",
        icon: Library,
        className: "md:col-span-2 md:row-span-1",
        BgAnimation: ArchiveBg,
    },
    {
        title: "Instant PDF View",
        desc: "High-speed rendering. No downloads required.",
        icon: Zap,
        className: "md:col-span-1 md:row-span-1",
        BgAnimation: SpeedBg,
    },
    {
        title: "Concept Maps",
        desc: "Visual knowledge graphs to connect complex ideas.",
        icon: Share2,
        className: "md:col-span-1 md:row-span-1",
        BgAnimation: LogicBg,
    },
    {
        title: "Topper Notes",
        desc: "Handwritten notes from university rankers.",
        icon: Award,
        className: "md:col-span-2 md:row-span-1",
        BgAnimation: CommunityBg,
    },
];


export default function TechFeatures() {
    return (
        <section className="bg-black py-16 px-4 md:px-8">
            <div className="mx-auto max-w-7xl">
                <div className="mb-10 pl-2 border-l-2 border-white/20">
                    <h2 className="text-2xl font-bold text-white uppercase tracking-wider">Why Choose Us</h2>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:auto-rows-[250px]">
                    {FEATURES.map((feature, i) => (
                        <FeatureCard
                            key={i}
                            {...feature}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
