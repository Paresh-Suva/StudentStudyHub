"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, FileQuestion, BookOpen, Search, Filter, Download, Eye, User, Calendar, Book } from "lucide-react";
import { format } from "date-fns";
import { clsx } from "clsx";
import Link from "next/link";
import AdminControls from "@/components/AdminControls";

interface Resource {
    id: string;
    title: string;
    type: string; // "Book" | "Notes" | "PYQ"
    fileUrl: string;
    createdAt: Date;
    user: {
        name: string | null;
    };
}

interface ResourceGridProps {
    resources: Resource[];
}

export default function ResourceGrid({ resources }: ResourceGridProps) {
    const [filter, setFilter] = useState<"All" | "Book" | "Notes" | "PYQ">("All");
    const [searchQuery, setSearchQuery] = useState("");

    // Filter Logic
    const filteredResources = resources.filter((res) => {
        const matchesFilter = filter === "All" || res.type === filter;
        const matchesSearch = res.title.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    // Helper for styling
    const getTypeStyle = (type: string) => {
        switch (type) {
            case "Book":
                return {
                    bg: "bg-emerald-500/10",
                    text: "text-emerald-400",
                    border: "border-emerald-500/20",
                    bgBadge: "bg-emerald-500/5",
                    icon: <Book className="h-5 w-5" />
                };
            case "PYQ":
                return {
                    bg: "bg-purple-500/10",
                    text: "text-purple-400",
                    border: "border-purple-500/20",
                    bgBadge: "bg-purple-500/5",
                    icon: <FileQuestion className="h-5 w-5" />
                };
            default: // Notes
                return {
                    bg: "bg-blue-500/10",
                    text: "text-blue-400",
                    border: "border-blue-500/20",
                    bgBadge: "bg-blue-500/5",
                    icon: <FileText className="h-5 w-5" />
                };
        }
    };

    return (
        <div>
            {/* Controls Bar */}
            <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                {/* Search */}
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                    <input
                        type="text"
                        placeholder="Search resources..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full rounded-xl border border-white/10 bg-black/40 py-2.5 pl-10 pr-4 text-sm text-white focus:border-cyan-500/50 focus:outline-none focus:ring-1 focus:ring-cyan-500/50"
                    />
                </div>

                {/* Filters */}
                <div className="flex bg-black/40 p-1 rounded-xl border border-white/10">
                    {(["All", "Book", "Notes", "PYQ"] as const).map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={clsx(
                                "flex-1 px-4 py-1.5 rounded-lg text-xs font-bold transition-all",
                                filter === f
                                    ? "bg-white/10 text-white shadow-sm"
                                    : "text-zinc-500 hover:text-zinc-300"
                            )}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence mode="popLayout">
                    {filteredResources.map((res) => {
                        const style = getTypeStyle(res.type);

                        return (
                            <motion.div
                                key={res.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.2 }}
                                className="group relative"
                            >
                                <div className="absolute inset-0 bg-cyan-500/5 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                                <div className="relative flex flex-col overflow-hidden rounded-2xl border border-white/5 bg-[#0A0A0A]/60 backdrop-blur-md p-5 hover:border-cyan-500/30 transition-colors h-full">
                                    <AdminControls
                                        contributionId={res.id}
                                        fileUrl={res.fileUrl}
                                        currentTitle={res.title}
                                    />

                                    {/* Icon & Tag */}
                                    <div className="flex items-start justify-between mb-4">
                                        <div className={clsx("p-3 rounded-xl", style.bg, style.text)}>
                                            {style.icon}
                                        </div>
                                        <span className={clsx(
                                            "text-[10px] font-bold px-2 py-1 rounded-full border",
                                            style.border, style.text, style.bgBadge
                                        )}>
                                            {res.type.toUpperCase()}
                                        </span>
                                    </div>

                                    {/* Content */}
                                    <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-cyan-200 transition-colors">
                                        {res.title}
                                    </h3>

                                    <div className="mt-auto pt-4 border-t border-white/5 flex flex-col gap-2">
                                        {/* Meta */}
                                        <div className="flex items-center gap-2 text-xs text-zinc-500">
                                            <User className="h-3 w-3" />
                                            <span className="truncate max-w-[100px]">{res.user.name || "Anonymous"}</span>
                                            <span className="text-zinc-700">•</span>
                                            <Calendar className="h-3 w-3" />
                                            <span>{format(new Date(res.createdAt), "MMM d, yyyy")}</span>
                                        </div>

                                        {/* Action */}
                                        <Link
                                            href={`/view/${res.id}`}
                                            className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-white/5 py-2 text-xs font-bold text-white hover:bg-cyan-500 hover:text-black transition-all"
                                        >
                                            <Eye className="h-3 w-3" />
                                            VIEW DOCUMENT
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        )
                    })}
                </AnimatePresence>
            </div>

            {/* Empty State */}
            {filteredResources.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 text-center rounded-3xl border border-white/5 bg-white/[0.02]">
                    <div className="mb-4 rounded-full bg-zinc-900 p-6">
                        <Filter className="h-8 w-8 text-zinc-600" />
                    </div>
                    <h3 className="text-xl font-bold text-white">No Resources Found</h3>
                    <p className="text-zinc-500 max-w-sm mt-2 mb-8">
                        We couldn't find any {filter === "All" ? "" : filter} files matching your search. Be the first to add one!
                    </p>
                </div>
            )}
        </div>
    );
}

