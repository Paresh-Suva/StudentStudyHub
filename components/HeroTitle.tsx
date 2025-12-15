"use client";

import { motion } from "framer-motion";

export default function HeroTitle() {
    return (
        <div className="w-full max-w-5xl px-4">
            <motion.svg
                viewBox="0 0 800 130"
                className="w-full h-auto overflow-visible"
                initial="hidden"
                animate="visible"
            >
                <defs>
                    <linearGradient id="laserGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#22c55e" /> {/* Neon Green */}
                        <stop offset="100%" stopColor="#ef4444" /> {/* Neon Red */}
                    </linearGradient>

                    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                <motion.text
                    x="50%"
                    y="50%"
                    dominantBaseline="middle"
                    textAnchor="middle"
                    fontSize="90"
                    fontWeight="900"
                    fontFamily="var(--font-sans)" // Uses the Tailwind Inter font
                    fill="transparent"
                    stroke="url(#laserGradient)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    filter="url(#glow)"
                    variants={{
                        hidden: {
                            pathLength: 0,
                            fillOpacity: 0,
                            strokeDasharray: 0, // Reset logic handled by pathLength in FM
                        },
                        visible: {
                            pathLength: 1,
                            fillOpacity: 1,
                            transition: {
                                pathLength: { duration: 2, ease: "easeInOut" },
                                fillOpacity: { duration: 1, ease: "easeOut", delay: 2 } // Fade fill after drawing
                            }
                        }
                    }}
                >
                    Don&apos;t just memorize.
                </motion.text>

                {/* Fill Layer for White Fade In (Overlaid to ensure clean white fill on top of gradient stroke if needed, 
            or we can just animate the fill of the text above. 
            However, user asked for White fill. 
            The existing text has stroke=gradient. 
            If we set fill=white, the stroke is half-covered. 
            Let's animate the fill of the MAIN text element to white. 
        */}
                <motion.text
                    x="50%"
                    y="50%"
                    dominantBaseline="middle"
                    textAnchor="middle"
                    fontSize="90"
                    fontWeight="900"
                    fontFamily="var(--font-sans)"
                    fill="#ffffff"
                    fillOpacity="0"
                    stroke="none"
                    animate={{
                        fillOpacity: 1,
                        // Pulse animation after initial load
                        scale: [1, 1.02, 1],
                        textShadow: ["0px 0px 0px rgba(255,255,255,0)", "0px 0px 20px rgba(255,255,255,0.5)", "0px 0px 0px rgba(255,255,255,0)"]
                    }}
                    transition={{
                        fillOpacity: { delay: 2, duration: 1 },
                        scale: { delay: 3, duration: 4, repeat: Infinity, ease: "easeInOut" },
                        textShadow: { delay: 3, duration: 4, repeat: Infinity, ease: "easeInOut" }
                    }}
                    style={{ transformOrigin: "center" }}
                >
                    Don&apos;t just memorize.
                </motion.text>
            </motion.svg>
        </div>
    );
}
