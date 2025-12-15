"use client";

import { useState, useTransition } from "react";
import { Plus, HelpCircle, X, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { createSubjectRequest } from "@/actions/subject-request";
import { createSubject } from "@/actions/subject";
import { toast } from "sonner";
import NeonButton from "./NeonButton";
import { useRouter } from "next/navigation";

interface SubjectRequestSectionProps {
    isAdmin: boolean;
    streamId: string;
    branchId: string;
    semesterId: string;
}

export default function SubjectRequestSection({ isAdmin, streamId, branchId, semesterId }: SubjectRequestSectionProps) {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [subjectName, setSubjectName] = useState("");
    const [subjectCode, setSubjectCode] = useState("");
    const [message, setMessage] = useState("");
    const [isPending, startTransition] = useTransition();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        startTransition(async () => {
            if (isAdmin) {
                // Admin: Create Subject Directly
                const result = await createSubject({
                    name: subjectName,
                    code: subjectCode,
                    streamId,
                    branchId,
                    semesterId
                });

                if (result.success) {
                    toast.success("Subject Created!");
                    setIsOpen(false);
                    setSubjectName("");
                    setSubjectCode("");
                    router.refresh(); // Refresh to show new subject
                } else {
                    toast.error(result.error || "Failed decreaseSubject");
                }
            } else {
                // Student: Request Subject
                const result = await createSubjectRequest({
                    streamId,
                    branchId,
                    semesterId,
                    subjectName,
                    message
                });

                if (result.success) {
                    toast.success("Request submitted successfully!");
                    setIsOpen(false);
                    setSubjectName("");
                    setMessage("");
                } else {
                    toast.error(result.error || "Failed to submit request");
                }
            }
        });
    };

    return (
        <>
            {/* --- ADMIN QUICK CREATE CARD --- */}
            {isAdmin && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="group relative flex flex-col items-center justify-center h-[200px] rounded-2xl border-2 border-dashed border-cyan-500/30 bg-cyan-500/5 hover:bg-cyan-500/10 hover:border-cyan-500/60 transition-all cursor-pointer"
                >
                    <div className="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <Plus className="w-6 h-6 text-cyan-400" />
                    </div>
                    <h3 className="text-lg font-bold text-cyan-400">Add New Subject</h3>
                    <p className="text-xs text-cyan-500/60 mt-2">Quick Create</p>
                </button>
            )}

            {/* --- STUDENT REQUEST CTA --- */}
            {!isAdmin && (
                <div className="mt-12 flex justify-center">
                    <motion.button
                        onClick={() => setIsOpen(true)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="group relative flex items-center gap-3 px-8 py-4 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-bold tracking-wide transition-all hover:bg-cyan-500/20 hover:border-cyan-500/50 hover:shadow-[0_0_30px_-5px_rgba(6,182,212,0.4)]"
                    >
                        {/* Pulse Effect */}
                        <span className="absolute -inset-1 rounded-full bg-cyan-500/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse" />

                        <div className="relative flex items-center gap-3">
                            <div className="p-1 rounded-full bg-cyan-500/20 group-hover:rotate-12 transition-transform">
                                <Plus className="w-5 h-5" />
                            </div>
                            <span className="text-lg">Missing a Subject? Request It</span>
                        </div>
                    </motion.button>
                </div>
            )}

            {/* --- MODAL --- */}
            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        />

                        {/* Modal */}
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="relative w-full max-w-md rounded-2xl border border-white/10 bg-zinc-900 p-6 shadow-2xl"
                        >
                            <button
                                onClick={() => setIsOpen(false)}
                                className="absolute top-4 right-4 text-zinc-500 hover:text-white"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <h2 className="text-xl font-bold text-white mb-2">
                                {isAdmin ? "Add New Subject" : "Request Subject"}
                            </h2>
                            <p className="text-sm text-zinc-400 mb-6">
                                {isAdmin ? "Instantly add a subject for this semester." : "Can't find what you're looking for? Let the admins know."}
                            </p>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-medium text-zinc-500 mb-1 uppercase tracking-wider">Subject Name</label>
                                    <input
                                        type="text"
                                        value={subjectName}
                                        onChange={(e) => setSubjectName(e.target.value)}
                                        required
                                        className="w-full rounded-lg bg-black border border-white/10 px-4 py-2.5 text-white focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-all"
                                        placeholder={isAdmin ? "e.g. Data Structures" : "e.g. Advanced Algorithms"}
                                    />
                                </div>

                                {isAdmin && (
                                    <div>
                                        <label className="block text-xs font-medium text-zinc-500 mb-1 uppercase tracking-wider">Subject Code</label>
                                        <input
                                            type="text"
                                            value={subjectCode}
                                            onChange={(e) => setSubjectCode(e.target.value)}
                                            required
                                            className="w-full rounded-lg bg-black border border-white/10 px-4 py-2.5 text-white focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-all uppercase"
                                            placeholder="e.g. CSC-201"
                                        />
                                    </div>
                                )}

                                {!isAdmin && (
                                    <div>
                                        <label className="block text-xs font-medium text-zinc-500 mb-1 uppercase tracking-wider">Reason (Optional)</label>
                                        <textarea
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                            className="w-full rounded-lg bg-black border border-white/10 px-4 py-2 text-white focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-all resize-none h-24"
                                            placeholder="Briefly explain why this subject is needed..."
                                        />
                                    </div>
                                )}

                                <NeonButton
                                    disabled={isPending}
                                    className="w-full justify-center"
                                >
                                    {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : (isAdmin ? "Create Subject" : "Submit Request")}
                                </NeonButton>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}
