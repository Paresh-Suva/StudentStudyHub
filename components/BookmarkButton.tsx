"use client";

import { useState } from "react";
import { Bookmark } from "lucide-react";
import { toggleBookmark } from "@/actions/bookmark";
import { toast } from "sonner";
import { motion } from "framer-motion";

interface BookmarkButtonProps {
    fileId: string;
    initialState: boolean;
}

export default function BookmarkButton({ fileId, initialState }: BookmarkButtonProps) {
    const [isBookmarked, setIsBookmarked] = useState(initialState);
    const [isLoading, setIsLoading] = useState(false);

    const handleToggle = async () => {
        if (isLoading) return;
        setIsLoading(true);

        // Optimistic Update
        const newState = !isBookmarked;
        setIsBookmarked(newState);

        try {
            const result = await toggleBookmark(fileId);
            setIsBookmarked(result.bookmarked);
            if (result.bookmarked) {
                toast.success("Saved to Library");
            } else {
                toast.success("Removed from Library");
            }
        } catch (error) {
            // Revert on error
            setIsBookmarked(!newState);
            toast.error("Failed to update bookmark");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <button
            onClick={handleToggle}
            disabled={isLoading}
            className={`
                group flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-all
                ${isBookmarked
                    ? "bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20"
                    : "bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white"}
            `}
        >
            <motion.div
                whileTap={{ scale: 0.8 }}
                animate={isBookmarked ? { scale: [1, 1.2, 1] } : {}}
            >
                <Bookmark className={`w-4 h-4 ${isBookmarked ? "fill-cyan-400" : ""}`} />
            </motion.div>
            {isBookmarked ? "Saved" : "Save"}
        </button>
    );
}
