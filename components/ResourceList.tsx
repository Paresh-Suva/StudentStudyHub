"use client";

import { motion } from "framer-motion";
import { FileText, Video, Download, Eye, Lock } from "lucide-react";
import Link from "next/link";

interface Resource {
    id: string;
    title: string;
    type: "pdf" | "video";
    size?: string;
    locked?: boolean;
}

interface ResourceListProps {
    resources: Resource[];
    onView: (resource: Resource) => void;
}

export default function ResourceList({ resources, onView }: ResourceListProps) {
    return (
        <div className="flex flex-col gap-3">
            {resources.map((res, index) => (
                <motion.div
                    key={res.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="group relative flex items-center justify-between rounded-xl border border-white/5 bg-[#0F0F0F] p-4 transition-all duration-300 hover:bg-white/5 hover:border-white/10"
                >
                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none"
                        style={{ boxShadow: "inset 0 0 20px rgba(6, 182, 212, 0.05)" }}
                    />

                    {/* Left: Icon & Info */}
                    <div className="flex items-center gap-4 relative z-10">
                        <div className={`flex h-12 w-12 items-center justify-center rounded-lg border border-white/5 bg-black/50 ${res.type === 'pdf' ? 'text-rose-400' : 'text-cyan-400'}`}>
                            {res.type === 'pdf' ? <FileText className="h-6 w-6" /> : <Video className="h-6 w-6" />}
                        </div>
                        <div>
                            <h4 className="font-medium text-zinc-100 group-hover:text-white transition-colors">{res.title}</h4>
                            <div className="flex items-center gap-2 text-xs text-zinc-500 font-mono">
                                <span className="uppercase">{res.type}</span>
                                {res.size && <><span>•</span><span>{res.size}</span></>}
                            </div>
                        </div>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex items-center gap-3 relative z-10">
                        {res.locked ? (
                            <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/5 bg-white/5 text-zinc-500 cursor-not-allowed">
                                <Lock className="h-4 w-4" />
                                <span className="text-xs font-bold tracking-wider">LOCKED</span>
                            </div>
                        ) : (
                            <>
                                <button
                                    onClick={() => onView(res)}
                                    className="flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 transition-colors text-xs font-bold tracking-wider group-hover:shadow-[0_0_15px_-5px_rgba(6,182,212,0.5)]"
                                >
                                    <Eye className="h-4 w-4" />
                                    VIEW
                                </button>
                                <button className="p-2 rounded-full text-zinc-500 hover:text-white hover:bg-white/10 transition-colors">
                                    <Download className="h-4 w-4" />
                                </button>
                            </>
                        )}
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
