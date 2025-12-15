"use client";

import { clsx } from "clsx";
import React from "react";

interface ThreeDButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    variant?: "primary" | "secondary" | "outline";
    className?: string;
}

export default function ThreeDButton({
    children,
    variant = "primary",
    className,
    ...props
}: ThreeDButtonProps) {

    // Color configuration to match the Cyber-Tech theme while keeping the 3D logic
    const colors = {
        primary: {
            top: "bg-white text-black",
            bottom: "bg-zinc-300",
            border: "border-black",
        },
        secondary: {
            top: "bg-cyan-400 text-black",
            bottom: "bg-cyan-600",
            border: "border-black",
        },
        outline: {
            top: "bg-[#111] text-white",
            bottom: "bg-[#222]",
            border: "border-zinc-700",
        }
    };

    const current = colors[variant] || colors.primary;

    return (
        <button className={clsx("group relative h-[50px] min-w-[140px] border-none bg-transparent p-0 outline-none", className)} {...props}>
            {/* Shadow / Base Layer (The deepest grey part in original CSS) */}
            <div
                className={clsx(
                    "absolute -left-[1px] top-[14px] z-[-1] h-full w-[calc(100%+2px)] rounded-[7mm] border-2",
                    current.border,
                    "bg-zinc-800" // Dark shadow for dark mode contrast
                )}
            />

            {/* Bottom Layer (The 3D depth part) */}
            <div
                className={clsx(
                    "absolute left-0 top-[10px] z-[-1] h-full w-full rounded-[7mm] border-2",
                    current.border,
                    current.bottom
                )}
            >
                {/* Decorative Side Lines (from user css) */}
                <div className={clsx("absolute bottom-0 left-[15%] h-[9px] w-[2px]", current.border.replace("border", "bg"))} />
                <div className={clsx("absolute bottom-0 left-[85%] h-[9px] w-[2px]", current.border.replace("border", "bg"))} />
            </div>

            {/* Top Layer (The clickable face) */}
            <div
                className={clsx(
                    "relative flex h-full w-full items-center justify-center overflow-hidden rounded-[7mm] border-2 transition-transform duration-200 active:translate-y-[10px]",
                    current.border,
                    current.top
                )}
            >
                {/* Shine Effect (Skewed highlight) */}
                <div className="absolute -left-[20px] h-full w-[15px] -skew-x-[30deg] bg-black/10 transition-all duration-300 group-active:left-[calc(100%+20px)]" />

                <span className="relative z-10 font-bold tracking-wide">
                    {children}
                </span>
            </div>
        </button>
    );
}
