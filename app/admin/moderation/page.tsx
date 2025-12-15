"use client";

import { useEffect, useState } from "react";
import { getPendingContributions, moderateContribution, updateAndApproveContribution } from "@/actions/moderation";
import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Eye, X, AlertCircle, ShieldCheck, Pencil, Save, XCircle } from "lucide-react";
import { toast } from "sonner";
import PDFViewerModal from "@/components/PDFViewerModal";
import NeonButton from "@/components/NeonButton";

// Define Type manually since we can't import Prisma types easily on client sometimes
type ContributionWithUser = {
    id: string;
    title: string;
    stream: string;
    semester?: string;
    branch: string; // Ensure branch is here
    subject: string;
    type: string;
    fileUrl: string;
    createdAt: Date;
    user: {
        name: string | null;
        email: string;
    };
};

export default function ModerationPage() {
    const [queue, setQueue] = useState<ContributionWithUser[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedDocs, setSelectedDocs] = useState<{ url: string; title: string } | null>(null);

    // Editing State
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editForm, setEditForm] = useState({
        title: "",
        subject: "",
        semester: "",
        branch: ""
    });

    // Fetch Data
    useEffect(() => {
        async function load() {
            try {
                // @ts-ignore
                const data = await getPendingContributions();
                setQueue(data.map((d: any) => ({
                    ...d,
                    semester: d.semester || "1",
                    branch: d.branch || "General",
                    createdAt: new Date(d.createdAt)
                })));
            } catch (error) {
                toast.error("Failed to load moderation queue");
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
        load();
    }, []);

    // Helper: Start Editing
    const startEditing = (item: ContributionWithUser) => {
        setEditingId(item.id);
        setEditForm({
            title: item.title,
            subject: item.subject,
            semester: item.semester || "1",
            branch: item.branch || "General"
        });
    };

    // Helper: Save & Approve
    const handleSaveAndApprove = async (id: string) => {
        try {
            // Optimistic Remove
            setQueue((prev) => prev.filter((item) => item.id !== id));
            setEditingId(null);

            const result = await updateAndApproveContribution(
                id,
                editForm.title,
                editForm.subject,
                editForm.semester,
                editForm.branch
            );

            if (result.success) {
                toast.success("Contribution Edited & Approved!");
            }
        } catch (error) {
            toast.error("Save failed");
            window.location.reload();
        }
    };

    // Handle Actions (Normal Approve/Reject)
    const handleDecision = async (id: string, decision: "APPROVED" | "REJECTED") => {
        // ... (same as before)
        try {
            setQueue((prev) => prev.filter((item) => item.id !== id));
            const result = await moderateContribution(id, decision);
            if (result.success) {
                decision === "APPROVED" ? toast.success("Approved!") : toast.error("Rejected.");
            }
        } catch (error) {
            toast.error("Action failed");
            window.location.reload();
        }
    };

    return (
        <div className="min-h-screen bg-[#0A0A0A] p-8 pt-24 text-white">
            <PDFViewerModal
                isOpen={!!selectedDocs}
                onClose={() => setSelectedDocs(null)}
                fileUrl={selectedDocs?.url || ""}
                title={selectedDocs?.title || "Document Preview"}
            />

            <div className="mx-auto max-w-7xl">

                {/* Header */}
                <div className="mb-8 flex items-center gap-4">
                    <ShieldCheck className="h-10 w-10 text-orange-500" />
                    <div>
                        <h1 className="text-3xl font-black tracking-tight text-white uppercase">
                            Content Moderation Queue
                        </h1>
                        <p className="text-zinc-400 font-mono text-sm">
                            ADMIN ACCESS LEVEL 5 // REVIEW PENDING UPLOADS
                        </p>
                    </div>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="flex h-64 items-center justify-center">
                        <div className="h-8 w-8 animate-spin rounded-full border-2 border-orange-500 border-t-transparent" />
                    </div>
                )}

                {/* Empty State */}
                {!loading && queue.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-center justify-center rounded-3xl border border-white/5 bg-white/5 py-20 text-center backdrop-blur-sm"
                    >
                        <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-green-500/10 text-green-500">
                            <Check className="h-10 w-10" />
                        </div>
                        <h2 className="text-2xl font-bold text-white">All Caught Up!</h2>
                        <p className="max-w-md text-zinc-400">
                            There are no pending contributions to review. Excellent work, Admin.
                        </p>
                    </motion.div>
                )}

                {/* Table */}
                {!loading && queue.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="overflow-hidden rounded-xl border border-white/10 bg-black/40 backdrop-blur-md"
                    >
                        <table className="w-full text-left">
                            <thead className="bg-white/5 text-xs font-bold uppercase tracking-wider text-zinc-400">
                                <tr>
                                    <th className="p-4">Date</th>
                                    <th className="p-4">Author</th>
                                    <th className="p-4">Details (Title / Stream / Sem)</th>
                                    <th className="p-4">Subject</th>
                                    <th className="p-4">Type</th>
                                    <th className="p-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5 text-sm">
                                <AnimatePresence>
                                    {queue.map((item) => (
                                        <motion.tr
                                            key={item.id}
                                            layout
                                            exit={{ opacity: 0, x: -20 }}
                                            className="group hover:bg-white/5 transition-colors"
                                        >
                                            <td className="p-4 font-mono text-zinc-500 w-32">
                                                {format(item.createdAt, "MMM dd")}
                                            </td>
                                            <td className="p-4 font-medium text-white w-48">
                                                <div className="flex flex-col">
                                                    <span>{item.user.name || "Anonymous"}</span>
                                                    <span className="text-xs text-zinc-500 truncate max-w-[150px]">{item.user.email}</span>
                                                </div>
                                            </td>

                                            {/* EDITABLE COLUMN: Details */}
                                            <td className="p-4 text-zinc-300 w-96">
                                                {editingId === item.id ? (
                                                    <div className="space-y-2">
                                                        <input
                                                            value={editForm.title}
                                                            onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                                                            className="w-full bg-black border border-zinc-700 rounded px-2 py-1 text-white text-xs"
                                                            placeholder="Title"
                                                        />
                                                        <div className="flex gap-2">
                                                            <input
                                                                value={editForm.semester}
                                                                onChange={(e) => setEditForm({ ...editForm, semester: e.target.value })}
                                                                className="w-16 bg-black border border-zinc-700 rounded px-2 py-1 text-white text-xs"
                                                                placeholder="Sem"
                                                            />
                                                            <span className="text-zinc-500 text-xs py-1">•</span>
                                                            {/* Branch is hidden/auto or we can add input if needed. For now keeping text for stream but input for sem */}
                                                            <span className="text-xs text-zinc-500 py-1">{item.stream}</span>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div>
                                                        <div className="font-bold text-white">{item.title}</div>
                                                        <div className="text-xs text-cyan-400">
                                                            {item.stream} • Sem {item.semester || "1"}
                                                        </div>
                                                    </div>
                                                )}
                                            </td>

                                            {/* EDITABLE COLUMN: Subject */}
                                            <td className="p-4 text-zinc-300 w-48">
                                                {editingId === item.id ? (
                                                    <input
                                                        value={editForm.subject}
                                                        onChange={(e) => setEditForm({ ...editForm, subject: e.target.value })}
                                                        className="w-full bg-black border border-zinc-700 rounded px-2 py-1 text-white text-xs"
                                                        placeholder="Subject"
                                                    />
                                                ) : (
                                                    item.subject
                                                )}
                                            </td>

                                            <td className="p-4 w-24">
                                                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium 
                                                    ${item.type === "Note" ? "bg-blue-500/10 text-blue-400" :
                                                        item.type === "PYQ" ? "bg-purple-500/10 text-purple-400" :
                                                            "bg-zinc-500/10 text-zinc-400"}`}
                                                >
                                                    {item.type}
                                                </span>
                                            </td>

                                            {/* ACTIONS */}
                                            <td className="p-4 text-right w-48">
                                                <div className="flex items-center justify-end gap-2">

                                                    {editingId === item.id ? (
                                                        <>
                                                            <button
                                                                onClick={() => handleSaveAndApprove(item.id)}
                                                                className="flex items-center gap-1 rounded-lg bg-green-500 px-3 py-2 text-xs font-bold text-black hover:bg-green-400"
                                                            >
                                                                <Save className="h-3 w-3" /> SAVE
                                                            </button>
                                                            <button
                                                                onClick={() => setEditingId(null)}
                                                                className="rounded-lg bg-zinc-800 p-2 text-zinc-400 hover:bg-zinc-700 hover:text-white"
                                                            >
                                                                <XCircle className="h-4 w-4" />
                                                            </button>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <button
                                                                onClick={() => startEditing(item)}
                                                                className="rounded-lg bg-blue-500/10 p-2 text-blue-400 hover:bg-blue-500/20 transition-colors"
                                                                title="Edit"
                                                            >
                                                                <Pencil className="h-4 w-4" />
                                                            </button>
                                                            <button
                                                                onClick={() => setSelectedDocs({ url: item.fileUrl, title: item.title })}
                                                                className="rounded-lg bg-zinc-800 p-2 text-zinc-400 hover:bg-zinc-700 hover:text-white transition-colors"
                                                                title="View PDF"
                                                            >
                                                                <Eye className="h-4 w-4" />
                                                            </button>
                                                            <button
                                                                onClick={() => handleDecision(item.id, "APPROVED")}
                                                                className="rounded-lg bg-green-500/10 p-2 text-green-500 hover:bg-green-500/20 transition-colors"
                                                                title="Approve"
                                                            >
                                                                <Check className="h-4 w-4" />
                                                            </button>
                                                            <button
                                                                onClick={() => handleDecision(item.id, "REJECTED")}
                                                                className="rounded-lg bg-red-500/10 p-2 text-red-500 hover:bg-red-500/20 transition-colors"
                                                                title="Reject"
                                                            >
                                                                <X className="h-4 w-4" />
                                                            </button>
                                                        </>
                                                    )}
                                                </div>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </AnimatePresence>
                            </tbody>
                        </table>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
