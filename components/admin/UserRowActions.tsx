"use client";

import { MoreVertical, Shield, Ban, Eye, KeyRound } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

interface UserRowActionsProps {
    userId: string;
    userName: string;
    role: string;
}

export default function UserRowActions({ userId, userName, role }: UserRowActionsProps) {
    const [isOpen, setIsOpen] = useState(false);

    // Mock Actions for UI Demo (Backend implementation would go here)
    const handleAction = (action: string) => {
        setIsOpen(false);
        if (action === "view") {
            toast.info(`Viewing profile for ${userName}`);
            // router.push(`/admin/users/${userId}`);
        } else if (action === "reset") {
            toast.success(`Password reset link sent to ${userName}`);
        } else if (action === "ban") {
            toast.error(`User ${userName} has been banned.`);
        }
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                onBlur={() => setTimeout(() => setIsOpen(false), 200)}
                className="p-2 rounded-lg text-zinc-500 hover:text-white hover:bg-white/10 transition-colors"
            >
                <MoreVertical className="w-4 h-4" />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        className="absolute right-0 mt-2 w-48 bg-zinc-900 border border-white/10 rounded-xl shadow-xl z-50 overflow-hidden"
                    >
                        <div className="p-1">
                            <button
                                onClick={() => handleAction("view")}
                                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-zinc-300 hover:bg-white/10 hover:text-white rounded-lg transition-colors text-left"
                            >
                                <Eye className="w-4 h-4 text-cyan-400" />
                                View Profile
                            </button>
                            <button
                                onClick={() => handleAction("reset")}
                                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-zinc-300 hover:bg-white/10 hover:text-white rounded-lg transition-colors text-left"
                            >
                                <KeyRound className="w-4 h-4 text-amber-400" />
                                Reset Password
                            </button>
                            <div className="h-px bg-white/5 my-1" />
                            <button
                                onClick={() => handleAction("ban")}
                                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-lg transition-colors text-left"
                            >
                                <Ban className="w-4 h-4" />
                                Ban User
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
