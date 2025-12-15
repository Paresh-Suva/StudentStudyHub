"use client";

import { Trash2, User as UserIcon } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { deleteDiscussion } from "@/actions/discussion";
import { toast } from "sonner";
import { useState } from "react";

interface DiscussionItemProps {
    discussion: {
        id: string;
        content: string;
        category: string;
        createdAt: Date;
        user: {
            id: string;
            name: string | null;
            reputation: number;
        };
    };
    currentUserId: string | null;
    isAdmin: boolean;
}

const BADGE_COLORS: Record<string, string> = {
    "REQUEST": "text-red-400 bg-red-500/10 border-red-500/20",
    "NOTES": "text-green-400 bg-green-500/10 border-green-500/20",
    "PYQ": "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
    "GENERAL": "text-blue-400 bg-blue-500/10 border-blue-500/20",
};

export default function DiscussionItem({ discussion, currentUserId, isAdmin }: DiscussionItemProps) {
    const [isDeleting, setIsDeleting] = useState(false);
    const isOwner = currentUserId === discussion.user.id;
    const canDelete = isOwner || isAdmin;

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this post?")) return;
        setIsDeleting(true);
        try {
            await deleteDiscussion(discussion.id);
            toast.success("Discussion deleted");
        } catch (error) {
            toast.error("Failed to delete");
            setIsDeleting(false);
        }
    };

    if (isDeleting) return null; // Optimistic hide

    return (
        <div className="group bg-zinc-900/30 border border-white/5 rounded-xl p-5 hover:bg-zinc-900/50 transition-colors mb-4">
            <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white shrink-0 shadow-lg">
                    {discussion.user.name?.[0] || <UserIcon className="w-5 h-5" />}
                </div>

                <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                            <span className="font-bold text-white text-sm">{discussion.user.name || "Anonymous"}</span>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase ${BADGE_COLORS[discussion.category] || "text-zinc-400 border-zinc-700"}`}>
                                {discussion.category}
                            </span>
                            <span className="text-xs text-zinc-500">
                                {formatDistanceToNow(discussion.createdAt, { addSuffix: true })}
                            </span>
                        </div>

                        {canDelete && (
                            <button
                                onClick={handleDelete}
                                className="opacity-0 group-hover:opacity-100 p-2 text-zinc-500 hover:text-red-400 transition-all"
                                title="Delete Post"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        )}
                    </div>

                    <p className="text-zinc-300 text-sm leading-relaxed whitespace-pre-wrap">
                        {discussion.content}
                    </p>
                </div>
            </div>
        </div>
    );
}
