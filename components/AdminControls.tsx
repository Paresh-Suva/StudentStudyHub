"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import {
  MoreVertical,
  Trash2,
  Pencil,
  X,
  Save,
  AlertTriangle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { deleteFile, renameFile } from "@/actions/admin-files";

interface AdminControlsProps {
  contributionId: string;
  fileUrl: string;
  currentTitle: string;
}

export default function AdminControls({
  contributionId,
  fileUrl,
  currentTitle,
}: AdminControlsProps) {
  const { user } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [newTitle, setNewTitle] = useState(currentTitle);

  // Only render for admins
  if (!user || String(user.publicMetadata.role).toLowerCase() !== "admin") {
    return null;
  }

  const handleDelete = async () => {
    const fileKey = fileUrl.split("/").pop(); // Simple extraction
    if (!fileKey) return toast.error("Invalid File URL");

    toast.promise(deleteFile(contributionId), {
      loading: "Deleting...",
      success: "File deleted permanently.",
      error: "Failed to delete file",
    });
    setIsOpen(false);
  };

  const handleRename = async () => {
    if (!newTitle.trim()) return;

    const result = await renameFile(contributionId, newTitle);
    if (result.success) {
      toast.success("Renamed successfully");
      setIsEditing(false);
      setIsOpen(false);
    } else {
      toast.error("Rename failed");
    }
  };

  return (
    <div className="absolute top-3 right-3 z-20">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-1 rounded-full bg-black/50 text-white/50 hover:bg-black/80 hover:text-white backdrop-blur-sm transition-all"
      >
        <MoreVertical className="h-4 w-4" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay to close */}
            <div
              className="fixed inset-0 z-10 cursor-default"
              onClick={() => {
                setIsOpen(false);
                setIsEditing(false);
                setIsDeleting(false);
              }}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="absolute right-0 top-8 z-30 w-48 rounded-xl border border-white/10 bg-[#0A0A0A] p-2 shadow-xl backdrop-blur-xl"
            >
              {/* Deleting State */}
              {isDeleting ? (
                <div className="p-2 space-y-2">
                  <div className="flex items-center gap-2 text-red-500 font-bold text-xs uppercase">
                    <AlertTriangle className="h-3 w-3" />
                    Confirm Delete?
                  </div>
                  <p className="text-[10px] text-zinc-500 leading-tight">
                    This action is irreversible.
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={handleDelete}
                      className="flex-1 rounded bg-red-500/20 py-1 text-xs font-bold text-red-500 hover:bg-red-500 hover:text-white"
                    >
                      YES
                    </button>
                    <button
                      onClick={() => setIsDeleting(false)}
                      className="flex-1 rounded bg-zinc-800 py-1 text-xs font-bold text-zinc-400 hover:bg-zinc-700"
                    >
                      NO
                    </button>
                  </div>
                </div>
              ) : isEditing ? (
                <div className="p-2 space-y-2">
                  <label className="text-xs font-bold text-zinc-500">
                    New Title
                  </label>
                  <input
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full rounded bg-zinc-900 border border-zinc-700 px-2 py-1 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleRename}
                      className="flex-1 rounded bg-green-500/20 py-1 text-xs font-bold text-green-500 hover:bg-green-500 hover:text-black"
                    >
                      SAVE
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="rounded bg-zinc-800 p-1 text-zinc-400 hover:text-white"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              ) : (
                // Default Menu
                <div className="space-y-1">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-xs font-medium text-zinc-400 hover:bg-blue-500/10 hover:text-blue-400 transition-colors"
                  >
                    <Pencil className="h-3 w-3" />
                    Edit Details
                  </button>
                  <button
                    onClick={() => setIsDeleting(true)}
                    className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-xs font-medium text-zinc-400 hover:bg-red-500/10 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="h-3 w-3" />
                    Delete Permanently
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
