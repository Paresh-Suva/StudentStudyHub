"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, FileText, Download, AlertCircle } from "lucide-react";
import { useEffect, useState } from "react";

interface PDFViewerModalProps {
    isOpen: boolean;
    onClose: () => void;
    fileUrl: string;
    title: string;
}

export default function PDFViewerModal({ isOpen, onClose, fileUrl, title }: PDFViewerModalProps) {
    const [loading, setLoading] = useState(true);

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
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">

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
                        initial={{ y: "100%", opacity: 0 }}
                        animate={{ y: "0%", opacity: 1 }}
                        exit={{ y: "100%", opacity: 0 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="relative w-[90%] h-[90%] flex flex-col rounded-2xl border border-white/10 bg-[#0A0A0A] shadow-2xl overflow-hidden"
                    >

                        {/* Control Bar (Header) */}
                        <div className="flex items-center justify-between border-b border-white/10 bg-white/5 px-6 py-4">
                            <div className="flex items-center gap-4">
                                <div className="p-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500">
                                    <FileText className="h-5 w-5" />
                                </div>
                                <h3 className="font-mono text-lg font-bold text-white truncate max-w-md md:max-w-xl">
                                    {title}
                                </h3>
                            </div>

                            <div className="flex items-center gap-4">
                                <button className="p-2 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors">
                                    <Download className="h-5 w-5" />
                                </button>
                                <button
                                    onClick={onClose}
                                    className="p-2 rounded-full text-zinc-400 hover:text-white hover:bg-red-500/80 transition-all duration-300"
                                >
                                    <X className="h-6 w-6" />
                                </button>
                            </div>
                        </div>

                        {/* PDF Preview Area */}
                        <div className="relative flex-1 bg-zinc-900 w-full h-full">

                            {/* Loading State */}
                            {loading && (
                                <div className="absolute inset-0 flex items-center justify-center text-zinc-500">
                                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-cyan-500 mr-3"></div>
                                    <span className="font-mono text-sm">LOADING STREAM...</span>
                                </div>
                            )}

                            <iframe
                                src={`https://docs.google.com/viewer?url=${encodeURIComponent(fileUrl)}&embedded=true`}
                                className="w-full h-full"
                                onLoad={() => setLoading(false)}
                                onError={() => setLoading(false)}
                            />

                            {/* Fallback Overlay (If iframe fails visually or loading persists too long, though iframe logic varies) 
                                Note: iframe error handling is limited. We simply render the iframe. 
                            */}

                            {!loading && (
                                <div className="absolute inset-0 -z-10 flex flex-col items-center justify-center text-zinc-500">
                                    <AlertCircle className="h-12 w-12 mb-4 opacity-50" />
                                    <p className="font-mono">PREVIEW NOT AVAILABLE</p>
                                    <button className="mt-4 px-6 py-2 bg-white/10 border border-white/10 rounded-full hover:bg-white/20 transition-colors text-white text-sm">
                                        Download File
                                    </button>
                                </div>
                            )}
                        </div>

                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
