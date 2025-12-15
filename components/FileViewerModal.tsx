"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, FileText, Video, AlertCircle } from "lucide-react";
import { useEffect } from "react";

interface FileViewerModalProps {
    isOpen: boolean;
    onClose: () => void;
    file: {
        title: string;
        type: "pdf" | "video";
        size?: string;
    } | null;
}

export default function FileViewerModal({ isOpen, onClose, file }: FileViewerModalProps) {
    // Lock body scroll when open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && file && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                    />

                    {/* Modal Container */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-4xl overflow-hidden rounded-2xl border border-white/10 bg-[#0F0F0F] shadow-2xl"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between border-b border-white/5 bg-white/5 px-6 py-4">
                            <div className="flex items-center gap-3">
                                {file.type === "pdf" ? (
                                    <FileText className="h-5 w-5 text-rose-400" />
                                ) : (
                                    <Video className="h-5 w-5 text-cyan-400" />
                                )}
                                <h3 className="text-lg font-bold text-white max-w-[200px] md:max-w-md truncate">
                                    {file.title}
                                </h3>
                            </div>
                            <button
                                onClick={onClose}
                                className="rounded-full p-2 text-zinc-400 transition-colors hover:bg-white/10 hover:text-white"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        {/* Content Area (Simulation) */}
                        <div className="relative flex aspect-video w-full flex-col items-center justify-center bg-black/50 p-12 text-center">

                            {/* Scanning Effect */}
                            <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
                                <div className="absolute top-0 h-[2px] w-full bg-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.5)] animate-scan" style={{ animation: "scan 3s linear infinite" }} />
                                <style jsx>{`
                                    @keyframes scan {
                                        0% { top: 0% }
                                        100% { top: 100% }
                                    }
                                `}</style>
                            </div>

                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.2 }}
                                className="mb-6 rounded-full bg-white/5 p-6"
                            >
                                {file.type === "pdf" ? (
                                    <FileText className="h-16 w-16 text-zinc-600" />
                                ) : (
                                    <Video className="h-16 w-16 text-zinc-600" />
                                )}
                            </motion.div>

                            <h4 className="mb-2 text-xl font-bold text-white">Preview Mode</h4>
                            <p className="mb-6 max-w-md text-zinc-400">
                                This is a demonstration interface. In the production build, this window would render the PDF viewer or Video player component.
                            </p>

                            <div className="flex items-center gap-2 rounded-lg border border-amber-500/20 bg-amber-500/10 px-4 py-2 text-amber-500">
                                <AlertCircle className="h-4 w-4" />
                                <span className="text-sm font-medium">No physical file connected</span>
                            </div>

                        </div>

                        {/* Footer actions */}
                        <div className="flex justify-end gap-3 border-t border-white/5 bg-zinc-900/50 px-6 py-4">
                            <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors">
                                Close
                            </button>
                            <button className="rounded-lg bg-white px-4 py-2 text-sm font-bold text-black transition-transform hover:scale-105">
                                Download Mock File
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
