"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";

interface Beam {
    id: number;
    x: number;
    y: number;
    width: number; // Length of the beam
    direction: "horizontal" | "vertical";
    delay: number;
    color: string;
}

const NEON_COLORS = [
    "cyan",   // Cyan-400
    "pink",   // Pink-500
    "green",  // Green-400
    "yellow", // Yellow-400
    "purple"  // Purple-500
];

export default function TracingBeamGrid() {
    const [beams, setBeams] = useState<Beam[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);
    const counterRef = useRef(0);

    // Beam spawner logic
    useEffect(() => {
        if (!containerRef.current) return;

        const spawnBeam = () => {
            if (!containerRef.current) return;
            const { width, height } = containerRef.current.getBoundingClientRect();

            const gridSize = 50; // Must match the CSS grid size
            const cols = Math.floor(width / gridSize);
            const rows = Math.floor(height / gridSize);

            const isHorizontal = Math.random() > 0.5;
            const x = Math.floor(Math.random() * cols) * gridSize;
            const y = Math.floor(Math.random() * rows) * gridSize;

            const beamLength = gridSize * (Math.floor(Math.random() * 3) + 2); // 2 to 4 grid cells long
            const randomColor = NEON_COLORS[Math.floor(Math.random() * NEON_COLORS.length)];

            const newBeam: Beam = {
                id: counterRef.current++,
                x,
                y,
                width: beamLength,
                direction: isHorizontal ? "horizontal" : "vertical",
                delay: Math.random() * 0.5,
                color: randomColor
            };

            setBeams((prev) => {
                // Keep only recent beams to prevent memory leak, though AnimatePresence handles cleanup mostly
                const cleanup = prev.filter(b => b.id > (counterRef.current - 10));
                return [...cleanup, newBeam];
            });
        };

        const interval = setInterval(spawnBeam, 400); // Spawn frequency

        return () => clearInterval(interval);
    }, []);

    return (
        <div ref={containerRef} className="fixed inset-0 z-[-1] min-h-screen w-full bg-[#050505] overflow-hidden">
            {/* 1. The Static Grid (SVG Pattern) */}
            <div
                className="absolute inset-0 opacity-[0.1]"
                style={{
                    backgroundImage: `linear-gradient(to right, #333 1px, transparent 1px), linear-gradient(to bottom, #333 1px, transparent 1px)`,
                    backgroundSize: '50px 50px'
                }}
            />

            {/* 2. The Tracing Beams */}
            <AnimatePresence>
                {beams.map((beam) => (
                    <BeamItem key={beam.id} beam={beam} />
                ))}
            </AnimatePresence>

            {/* 3. Radial Vignette Overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000_100%)] opacity-80 pointer-events-none" />
        </div>
    );
}

function BeamItem({ beam }: { beam: Beam }) {
    const isHorizontal = beam.direction === "horizontal";

    return (
        <motion.div
            initial={{
                opacity: 0,
                left: beam.x,
                top: beam.y,
                scale: 0.5
            }}
            animate={{
                opacity: [0, 1, 0], // Fade in, highlight, fade out
                scale: [0.5, 1, 0.5],
                [isHorizontal ? "left" : "top"]: [
                    isHorizontal ? beam.x : beam.y,
                    (isHorizontal ? beam.x : beam.y) + beam.width
                ]
            }}
            transition={{
                duration: 1.5,
                ease: "easeInOut",
                delay: beam.delay
            }}
            className={clsx(
                "absolute h-[1px] w-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_10px_2px_rgba(34,211,238,0.5)] z-0",
                isHorizontal
                    ? "h-[2px]"
                    : "w-[2px] bg-gradient-to-b"
            )}
            style={{
                width: isHorizontal ? "100px" : "2px", // Initial visual length of the traveling 'head'
                height: isHorizontal ? "2px" : "100px",
            }}
            onAnimationComplete={() => {
                // Optional: Removing from state here is complex with React batching, 
                // we rely on the spawner's cleanup or AnimatePresence
            }}
        />
    );
}
