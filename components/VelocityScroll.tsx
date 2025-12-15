"use client";

import { motion } from "framer-motion";
import { FileText, Zap, Network, Award, Sparkles } from "lucide-react";
import { clsx } from "clsx";

const FEATURES = [
    { title: "TOPIC-WISE PYQS", icon: FileText, color: "text-cyan-400", shadow: "drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]" },
    { title: "INSTANT PDF VIEW", icon: Zap, color: "text-amber-400", shadow: "drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]" },
    { title: "CONCEPT MAPS", icon: Network, color: "text-purple-400", shadow: "drop-shadow-[0_0_8px_rgba(192,132,252,0.8)]" },
    { title: "TOPPER NOTES", icon: Award, color: "text-green-400", shadow: "drop-shadow-[0_0_8px_rgba(74,222,128,0.8)]" },
    { title: "LIVE DISCUSSION", icon: Sparkles, color: "text-pink-400", shadow: "drop-shadow-[0_0_8px_rgba(244,114,182,0.8)]" },
];

export default function VelocityScroll() {
    // Duplicate the content multiple times to ensure seamless infinite scrolling
    // We create enough copies to fill wide screens and allow smooth looping
    const repeatedFeatures = [...FEATURES, ...FEATURES, ...FEATURES, ...FEATURES];

    return (
        <div className="relative w-full border-y border-white/5 bg-black/20 backdrop-blur-sm overflow-hidden py-4">
            {/* Gradient Masks for Edge Fading */}
            <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-black/20 to-transparent" />
            <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-black/20 to-transparent" />

            {/* Scrolling Container */}
            {/* We use a CSS animation for the infinite scroll to easily support 'pause on hover' */}
            <div
                className="flex w-max items-center gap-12 animate-scroll hover:[animation-play-state:paused]"
                style={{
                    // Define the keyframes inline or use a global class. 
                    // Tailwind 'animate-scroll' doesn't exist by default, but we can define standard CSS here for portability.
                    animation: "scroll 40s linear infinite",
                }}
            >
                {/* CSS Keyframes for the scroll */}
                <style jsx>{`
                    @keyframes scroll {
                        from { transform: translateX(0); }
                        to { transform: translateX(-50%); }
                    }
                `}</style>

                {/* We render two massive blocks of the repeated features to create the loop.
                    The animation moves from 0 to -50%, which corresponds to exactly one full width of the content block.
                    This creates the seamless illusion. */}
                <div className="flex items-center gap-12">
                    {repeatedFeatures.map((feature, i) => (
                        <FeatureItem key={`1-${i}`} {...feature} />
                    ))}
                </div>
                <div className="flex items-center gap-12">
                    {repeatedFeatures.map((feature, i) => (
                        <FeatureItem key={`2-${i}`} {...feature} />
                    ))}
                </div>
            </div>
        </div>
    );
}

function FeatureItem({ title, icon: Icon, color, shadow }: { title: string, icon: any, color: string, shadow: string }) {
    return (
        <motion.div
            className="group flex items-center gap-4 cursor-default"
            whileHover={{ scale: 1.1 }}
        >
            {/* Icon */}
            <motion.div
                className={clsx("transition-transform duration-300", color, "filter", shadow)}
                whileHover={{ rotate: 15, scale: 1.2 }}
            >
                <Icon className="h-6 w-6" strokeWidth={2.5} />
            </motion.div>

            {/* Text */}
            <span className={clsx(
                "text-base font-black tracking-widest transition-all duration-300",
                color,
                "filter", shadow
            )}>
                {title}
            </span>

            {/* Separator */}
            <div className="ml-12 flex items-center justify-center opacity-30">
                <Sparkles className="h-4 w-4 text-white animate-pulse" />
            </div>
        </motion.div>
    );
}
