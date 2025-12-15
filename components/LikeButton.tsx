"use client";

import { Heart } from "lucide-react";
import { useState } from "react";
import { toggleLike } from "@/actions/file-interactions";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface LikeButtonProps {
    fileId: string;
    initialIsLiked: boolean;
    initialCount: number;
    isOwner: boolean;
    userId?: string | null;
}

export default function LikeButton({ fileId, initialIsLiked, initialCount, isOwner, userId }: LikeButtonProps) {
    const [isLiked, setIsLiked] = useState(initialIsLiked);
    const [count, setCount] = useState(initialCount);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleToggle = async () => {
        if (!userId) {
            toast.error("Please login to like files");
            return;
        }

        if (isOwner) {
            toast.error("You cannot like your own file");
            return;
        }

        // Optimistic Update
        const newIsLiked = !isLiked;
        setIsLiked(newIsLiked);
        setCount(prev => newIsLiked ? prev + 1 : prev - 1);

        setIsLoading(true);
        try {
            await toggleLike(fileId);
        } catch (error) {
            // Revert on error
            setIsLiked(!newIsLiked);
            setCount(prev => !newIsLiked ? prev + 1 : prev - 1);
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error("Failed to update like");
            }
        } finally {
            setIsLoading(false);
        }
    };

    if (isOwner) {
        return (
            <button
                disabled
                className="flex items-center gap-2 group opacity-50 cursor-not-allowed"
                title="You cannot like your own file"
            >
                <div className="p-3 rounded-full bg-white/5">
                    <Heart className="w-6 h-6 text-zinc-500" />
                </div>
                <div className="flex flex-col items-start">
                    <span className="text-sm font-bold text-zinc-500">You</span>
                    <span className="text-xs text-zinc-600">{count} Likes</span>
                </div>
            </button>
        );
    }

    return (
        <button
            onClick={handleToggle}
            disabled={isLoading}
            className="flex items-center gap-2 group"
        >
            <div className={`p-3 rounded-full transition-all duration-300 ${isLiked ? 'bg-pink-500/20' : 'bg-white/5 group-hover:bg-white/10'}`}>
                <motion.div
                    whileTap={{ scale: 0.8 }}
                    animate={isLiked ? { scale: [1, 1.2, 1] } : {}}
                >
                    <Heart
                        className={`w-6 h-6 transition-colors duration-300 ${isLiked ? 'fill-pink-500 text-pink-500' : 'text-zinc-400 group-hover:text-pink-400'}`}
                    />
                </motion.div>
            </div>
            <div className="flex flex-col items-start">
                <span className={`text-sm font-bold ${isLiked ? 'text-pink-400' : 'text-zinc-300'}`}>
                    {isLiked ? 'Liked' : 'Like File'}
                </span>
                <span className="text-xs text-zinc-500">{count} Likes</span>
            </div>
        </button>
    );
}
