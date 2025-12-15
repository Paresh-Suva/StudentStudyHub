"use client";

import { updateSubjectRequestStatus } from "@/actions/subject-request";
import { createSubject } from "@/actions/subject";
import { toast } from "sonner";
import { Check, X, Loader2, Clock, Plus } from "lucide-react";
import { useState, useTransition } from "react";
import NeonButton from "@/components/NeonButton";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

interface SubjectRequest {
    id: string;
    userId: string;
    streamId: string;
    branchId: string;
    semesterId: string;
    subjectName: string;
    message?: string | null;
    status: string;
    createdAt: Date;
}

export default function RequestList({ initialRequests }: { initialRequests: SubjectRequest[] }) {
    const router = useRouter();
    const [requests, setRequests] = useState(initialRequests);
    const [actionId, setActionId] = useState<string | null>(null);

    // Create Modal State
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [selectedReq, setSelectedReq] = useState<SubjectRequest | null>(null);
    const [subjectName, setSubjectName] = useState("");
    const [subjectCode, setSubjectCode] = useState("");
    const [isCreating, startCreate] = useTransition();

    const handleReject = async (id: string) => {
        setActionId(id);
        const result = await updateSubjectRequestStatus(id, "REJECTED");
        if (result.success) {
            toast.success("Request Rejected");
            setRequests((prev) => prev.filter((r) => r.id !== id));
        } else {
            toast.error("Action failed");
        }
        setActionId(null);
    };

    const openApproveModal = (req: SubjectRequest) => {
        setSelectedReq(req);
        setSubjectName(req.subjectName);
        setSubjectCode(`SUB-${Math.floor(Math.random() * 1000)}`); // Placeholder code
        setIsCreateOpen(true);
    };

    const handleCreateSubject = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedReq) return;

        startCreate(async () => {
            // 1. Create the Subject
            const createRes = await createSubject({
                name: subjectName,
                code: subjectCode,
                streamId: selectedReq.streamId,
                branchId: selectedReq.branchId,
                semesterId: selectedReq.semesterId
            });

            if (!createRes.success) {
                toast.error(createRes.error || "Failed to create subject");
                return;
            }

            // 2. Mark Request as Approved
            const updateRes = await updateSubjectRequestStatus(selectedReq.id, "APPROVED");

            if (updateRes.success) {
                toast.success("Subject Created & Request Approved!");
                setRequests((prev) => prev.filter((r) => r.id !== selectedReq.id));
                setIsCreateOpen(false);
                router.refresh();
            } else {
                toast.warning("Subject Created, but failed to update Request status");
            }
        });
    };

    if (requests.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center p-12 border border-white/5 rounded-2xl bg-white/5">
                <div className="p-4 bg-white/5 rounded-full mb-4">
                    <Check className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-xl font-bold text-white">All Caught Up!</h3>
                <p className="text-zinc-500 mt-2">No pending subject requests.</p>
            </div>
        );
    }

    return (
        <div className="grid gap-4">
            {requests.map((req) => (
                <div key={req.id} className="group relative overflow-hidden rounded-xl bg-white/5 border border-white/10 p-6 hover:border-cyan-500/30 transition-all">
                    <div className="flex items-start justify-between">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <span className="px-2 py-0.5 rounded-md bg-cyan-500/10 text-cyan-400 text-[10px] font-bold uppercase tracking-wider border border-cyan-500/20">
                                    {req.streamId} / {req.branchId} / {req.semesterId}
                                </span>
                                <span className="flex items-center gap-1 text-[10px] text-zinc-500">
                                    <Clock className="w-3 h-3" />
                                    {new Date(req.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                            <h3 className="text-lg font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors">
                                {req.subjectName}
                            </h3>
                            {req.message && (
                                <p className="text-sm text-zinc-400 line-clamp-2">{req.message}</p>
                            )}
                        </div>

                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => handleReject(req.id)}
                                disabled={actionId === req.id}
                                className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20 disabled:opacity-50"
                                title="Reject"
                            >
                                {actionId === req.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <X className="w-4 h-4" />}
                            </button>
                            <button
                                onClick={() => openApproveModal(req)}
                                className="p-2 rounded-lg bg-green-500/10 text-green-400 hover:bg-green-500/20 border border-green-500/20"
                                title="Approve & Create"
                            >
                                <Check className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            ))}

            {/* --- CREATE SUBJECT MODAL --- */}
            <AnimatePresence>
                {isCreateOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsCreateOpen(false)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="relative w-full max-w-md rounded-2xl border border-white/10 bg-zinc-900 p-6 shadow-2xl"
                        >
                            <button onClick={() => setIsCreateOpen(false)} className="absolute top-4 right-4 text-zinc-500 hover:text-white">
                                <X className="w-5 h-5" />
                            </button>

                            <h2 className="text-xl font-bold text-white mb-2">Approve & Create</h2>
                            <p className="text-sm text-zinc-400 mb-6">
                                Review details before creating the subject.
                            </p>

                            <form onSubmit={handleCreateSubject} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-medium text-zinc-500 mb-1 uppercase tracking-wider">Subject Name</label>
                                    <input
                                        type="text"
                                        value={subjectName}
                                        onChange={(e) => setSubjectName(e.target.value)}
                                        required
                                        className="w-full rounded-lg bg-black border border-white/10 px-4 py-2.5 text-white focus:border-cyan-500 transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-zinc-500 mb-1 uppercase tracking-wider">Subject Code</label>
                                    <input
                                        type="text"
                                        value={subjectCode}
                                        onChange={(e) => setSubjectCode(e.target.value)}
                                        required
                                        className="w-full rounded-lg bg-black border border-white/10 px-4 py-2.5 text-white focus:border-cyan-500 transition-all uppercase"
                                        placeholder="e.g. CSC-101"
                                    />
                                </div>

                                <NeonButton disabled={isCreating} className="w-full justify-center">
                                    {isCreating ? <Loader2 className="w-4 h-4 animate-spin" /> : "Create Subject & Approve"}
                                </NeonButton>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
