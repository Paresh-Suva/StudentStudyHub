"use client";

import { motion } from "framer-motion";
import { RefreshCcw, AlertTriangle } from "lucide-react";
import { useEffect } from "react";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error("System Error Detected:", error);
    }, [error]);

    return (
        <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-black text-white px-4 pt-24">
            {/* Background Grid Pattern */}
            <div
                className="absolute inset-0 z-0 opacity-[0.15]"
                style={{
                    backgroundImage: `linear-gradient(to right, #333 1px, transparent 1px), linear-gradient(to bottom, #333 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                }}
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000_90%)] z-0 pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative z-10 flex flex-col items-center text-center max-w-xl p-8 rounded-2xl border border-red-900/50 bg-black/80 backdrop-blur-md"
            >
                <div className="mb-6 rounded-full bg-red-500/10 p-4 border border-red-500/20 shadow-[0_0_30px_-5px_rgba(239,68,68,0.3)]">
                    <AlertTriangle className="h-10 w-10 text-red-500" />
                </div>

                <h2 className="text-3xl font-black text-white uppercase tracking-tighter mb-2">
                    Critical Failure
                </h2>
                <p className="text-red-400 font-mono text-xs tracking-widest uppercase mb-6">
                    Runtime Exception Detected // Code: 500
                </p>

                <p className="text-zinc-500 mb-8">
                    An unexpected error has occurred in the neural network. The system has paused to prevent further data corruption.
                </p>

                <button
                    onClick={() => reset()}
                    className="group relative flex items-center gap-2 px-8 py-3 rounded-full bg-red-600 text-white font-bold text-sm tracking-wider uppercase transition-all hover:bg-red-500 hover:shadow-[0_0_20px_rgba(239,68,68,0.4)]"
                >
                    <RefreshCcw className="h-4 w-4 transition-transform group-hover:rotate-180 duration-500" />
                    Reboot System
                </button>
            </motion.div>

        </div>
    );
}
