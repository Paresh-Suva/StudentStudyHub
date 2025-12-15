"use client";

import { useState } from "react";
import { Send, MessageSquare } from "lucide-react";
import { createDiscussion } from "@/actions/discussion";
import { toast } from "sonner";
import { motion } from "framer-motion";

const CATEGORIES = [
    { id: "REQUEST", label: "Request Help", color: "bg-red-500/10 text-red-400 border-red-500/20 hover:bg-red-500/20" },
    { id: "NOTES", label: "Sharing Notes", color: "bg-green-500/10 text-green-400 border-green-500/20 hover:bg-green-500/20" },
    { id: "PYQ", label: "PYQ", color: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20 hover:bg-yellow-500/20" },
    { id: "GENERAL", label: "General Chat", color: "bg-blue-500/10 text-blue-400 border-blue-500/20 hover:bg-blue-500/20" },
];

export default function DiscussionForm() {
    const [content, setContent] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("GENERAL");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!content.trim()) return;

        setIsSubmitting(true);
        try {
            await createDiscussion(content, selectedCategory);
            toast.success("Posted successfully!");
            setContent("");
        } catch (error) {
            toast.error("Failed to post discussion");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-[#0A0A0A] border border-white/5 rounded-2xl p-6 mb-8 shadow-xl">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-cyan-400" />
                Start a Discussion
            </h3>

            <form onSubmit={handleSubmit}>
                <div className="mb-4 flex flex-wrap gap-2">
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat.id}
                            type="button"
                            onClick={() => setSelectedCategory(cat.id)}
                            className={`
                                text-xs font-bold px-3 py-1.5 rounded-full border transition-all
                                ${selectedCategory === cat.id ? cat.color + " ring-1 ring-white/20 scale-105" : "bg-zinc-900 border-zinc-800 text-zinc-500 hover:text-zinc-300"}
                            `}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>

                <div className="relative">
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="What's on your mind? Ask for notes, share tips..."
                        className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 min-h-[100px] resize-none"
                    />
                    <div className="absolute bottom-3 right-3">
                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            type="submit"
                            disabled={isSubmitting || !content.trim()}
                            className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold p-2.5 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Send className="w-4 h-4" />
                        </motion.button>
                    </div>
                </div>
            </form>
        </div>
    );
}
