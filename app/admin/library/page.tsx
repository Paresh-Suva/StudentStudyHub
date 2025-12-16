"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Trash2, Loader2, BookOpen, Link as LinkIcon, FileText } from "lucide-react";
import NeonButton from "@/components/NeonButton";
import { toast } from "sonner";
import { deleteSubject } from "@/actions/subject";

interface GlobalSubject {
    id: string;
    name: string;
    code: string | null;
    _count: {
        instances: number;
        contributions: number;
    };
}

export default function AdminLibraryPage() {
    const [subjects, setSubjects] = useState<GlobalSubject[]>([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const fetchSubjects = async () => {
        try {
            const res = await fetch("/api/admin/global-subjects");
            const data = await res.json();
            setSubjects(data);
        } catch (error) {
            toast.error("Failed to load subjects");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSubjects();
    }, []);

    const handleDelete = async (id: string, name: string) => {
        if (!confirm(`Are you sure you want to delete "${name}"? This will remove it from ALL streams and delete ALL linked files.`)) return;

        setDeletingId(id);
        const res = await deleteSubject(id, "/admin/library"); // Path is for revalidation
        setDeletingId(null);

        if (res.success) {
            toast.success("Subject Deleted Globally");
            // Optimistic update
            setSubjects(prev => prev.filter(s => s.id !== id));
        } else {
            toast.error(res.error || "Delete failed");
        }
    };

    const filteredSubjects = subjects.filter(s =>
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        (s.code && s.code.toLowerCase().includes(search.toLowerCase()))
    );

    return (
        <div className="p-8 max-w-7xl mx-auto">
            <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Global Subject Library</h1>
                    <p className="text-zinc-400">Master database of all {subjects.length} subjects.</p>
                </div>

                {/* Search Bar */}
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <input
                        type="text"
                        placeholder="Search global database..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full bg-black/50 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-cyan-500/50 transition-colors"
                    />
                </div>
            </header>

            {loading ? (
                <div className="flex justify-center py-20">
                    <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
                </div>
            ) : (
                <div className="rounded-xl border border-white/5 bg-black/20 overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-white/5 bg-white/5 text-xs text-zinc-400 uppercase tracking-wider">
                                <th className="p-4 pl-6">Subject</th>
                                <th className="p-4">Global Code</th>
                                <th className="p-4 text-center">Linked Streams</th>
                                <th className="p-4 text-center">Files</th>
                                <th className="p-4 text-right pr-6">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {filteredSubjects.map((subject) => (
                                <tr key={subject.id} className="group hover:bg-white/5 transition-colors">
                                    <td className="p-4 pl-6">
                                        <div className="font-medium text-white group-hover:text-cyan-400 transition-colors">
                                            {subject.name}
                                        </div>
                                        <div className="text-xs text-zinc-600 font-mono mt-1">{subject.id}</div>
                                    </td>
                                    <td className="p-4 text-zinc-400 font-mono text-sm">
                                        {subject.code || "-"}
                                    </td>
                                    <td className="p-4 text-center">
                                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold border border-blue-500/20">
                                            <LinkIcon className="w-3 h-3" />
                                            {subject._count.instances}
                                        </div>
                                    </td>
                                    <td className="p-4 text-center">
                                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20">
                                            <FileText className="w-3 h-3" />
                                            {subject._count.contributions}
                                        </div>
                                    </td>
                                    <td className="p-4 text-right pr-6">
                                        <button
                                            onClick={() => handleDelete(subject.id, subject.name)}
                                            disabled={deletingId === subject.id}
                                            className="p-2 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-colors disabled:opacity-50"
                                            title="Delete Globally"
                                        >
                                            {deletingId === subject.id ? (
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                            ) : (
                                                <Trash2 className="w-4 h-4" />
                                            )}
                                        </button>
                                    </td>
                                </tr>
                            ))}

                            {filteredSubjects.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="p-12 text-center text-zinc-500">
                                        No subjects found matching "{search}"
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
