"use client";

import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Trash2 } from "lucide-react";
import Link from "next/link";
import { clsx } from "clsx";
import { deleteSubject } from "@/actions/subject";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface Subject {
    id: string;
    code: string;
    title: string;
    credits: number;
    fileCount: number;
}

interface SubjectSelectionGridProps {
    subjects: Subject[];
    basePath: string; // URL prefix for linking (e.g., /stream/eng/comp/sem-1)
    actionCard?: React.ReactNode;
    isAdmin?: boolean;
}

export default function SubjectSelectionGrid({ subjects, basePath, actionCard, isAdmin }: SubjectSelectionGridProps) {
    const router = useRouter();

    const handleDelete = async (e: React.MouseEvent, subjectId: string, subjectName: string) => {
        e.preventDefault(); // Prevent Link navigation
        e.stopPropagation();

        if (!confirm(`Are you sure you want to PERMANENTLY delete "${subjectName}"? This cannot be undone.`)) {
            return;
        }

        const result = await deleteSubject(subjectId, basePath);
        if (result.success) {
            toast.success("Subject deleted");
            // Optionally manually refresh or filter out local state if revalidation isn't instant enough
            // But router.refresh() or just waiting for server action revalidatePath usually works
        } else {
            toast.error("Failed to delete subject");
        }
    };

    return (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {subjects.map((subject, index) => (
                <motion.div
                    key={subject.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{
                        duration: 0.3,
                        delay: index * 0.05,
                        type: "spring",
                        stiffness: 260,
                        damping: 20
                    }}
                >
                    <Link href={`${basePath}/${subject.id}`} className="group relative block h-full">
                        <div className={clsx(
                            "relative flex h-full flex-col justify-between rounded-2xl border p-6 transition-all duration-300 overflow-hidden",
                            "bg-zinc-900/50 backdrop-blur-md border-white/5",
                            "hover:border-cyan-500/50 hover:shadow-[0_0_40px_-10px_rgba(6,182,212,0.3)]"
                        )}>

                            {/* Animated Gradient Background Blob */}
                            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 rounded-full bg-cyan-500/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                            <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-32 h-32 rounded-full bg-purple-500/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                            {/* Content Layer (z-10) */}
                            <div className="relative z-10 h-full flex flex-col justify-between">

                                {/* Top: Code & Delete */}
                                <div className="mb-4 flex items-start justify-between">
                                    <span className="font-mono text-sm font-bold text-zinc-500 group-hover:text-cyan-400 transition-colors">
                                        {subject.code}
                                    </span>
                                    <div className="flex gap-2">
                                        {isAdmin && (
                                            <div
                                                role="button"
                                                onClick={(e) => handleDelete(e, subject.id, subject.title)}
                                                className="rounded-full bg-red-500/10 p-2 text-red-500 mb-auto transition-colors hover:bg-red-500/20 z-10"
                                                title="Delete Subject"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </div>
                                        )}
                                        <div className="rounded-full bg-white/5 p-2 text-zinc-400 mb-auto transition-colors group-hover:bg-cyan-500/10 group-hover:text-cyan-400">
                                            <BookOpen className="h-4 w-4" />
                                        </div>
                                    </div>
                                </div>

                                {/* Middle: Title */}
                                <h3 className="mb-8 text-xl font-bold leading-tight text-white group-hover:text-cyan-100 transition-colors">
                                    {subject.title}
                                </h3>

                                {/* Bottom: Meta & Action */}
                                <div className="mt-auto flex items-center justify-between border-t border-white/5 pt-4">
                                    <div className="flex items-center gap-2">
                                        {subject.fileCount > 0 ? (
                                            <span className="text-[10px] font-mono font-bold text-cyan-400 bg-cyan-900/20 px-2 py-1 rounded-md border border-cyan-500/20 flex items-center gap-1">
                                                📄 {subject.fileCount} Resources
                                            </span>
                                        ) : (
                                            <span className="text-[10px] font-mono font-bold text-zinc-600 bg-white/5 px-2 py-1 rounded-md border border-white/5">
                                                Empty Repository
                                            </span>
                                        )}

                                    </div>
                                    <div className="flex items-center gap-1 text-sm font-bold text-zinc-400 transition-all duration-300 group-hover:translate-x-1 group-hover:text-cyan-400 group-hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]">
                                        <ArrowRight className="h-4 w-4" />
                                    </div>
                                </div>

                            </div>
                        </div>
                    </Link>
                </motion.div>
            ))}

            {/* Action Card (e.g. Admin Quick Create) */}
            {actionCard && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: subjects.length * 0.05 }}
                    className="h-full"
                >
                    {actionCard}
                </motion.div>
            )}
        </div>
    );
}
