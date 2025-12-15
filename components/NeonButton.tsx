"use client";

import { clsx } from "clsx";
import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";

interface NeonButtonProps extends HTMLMotionProps<"button"> {
    children: React.ReactNode;
    variant?: "primary" | "secondary" | "outline";
    className?: string;
}

export default function NeonButton({
    children,
    variant = "primary",
    className,
    ...props
}: NeonButtonProps) {

    // Variant Styles
    const variants = {
        primary: "bg-cyan-500 text-black border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_35px_rgba(6,182,212,0.6)] hover:bg-cyan-400",
        secondary: "bg-pink-500 text-white border-pink-400 shadow-[0_0_20px_rgba(236,72,153,0.3)] hover:shadow-[0_0_35px_rgba(236,72,153,0.6)] hover:bg-pink-400",
        outline: "bg-transparent text-white border-white/20 hover:border-white hover:bg-white/5 hover:text-white hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
    };

    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={clsx(
                "relative flex items-center justify-center rounded-xl border px-6 py-2 font-bold tracking-wide transition-all duration-300",
                variants[variant],
                className
            )}
            {...props}
        >
            <span className="relative z-10">{children}</span>
        </motion.button>
    );
}
