"use client";

import { useState } from "react";
import Link from "next/link";
import { format } from "date-fns";
import {
    ArrowLeft, FileText, Share2, Shield, Calendar,
    User as UserIcon, Maximize2, Minimize2, X, Lock, Info
} from "lucide-react";
import LikeButton from "@/components/LikeButton";
import BookmarkButton from "@/components/BookmarkButton";
import { clsx } from "clsx";

interface FileViewWorkspaceProps {
    file: any; // Using any for simplicity as we know the shape from server
    isLiked: boolean;
    isBookmarked: boolean;
    relatedFiles: any[];
    userId: string | null;
}

export default function FileViewWorkspace({
    file,
    isLiked,
    isBookmarked,
    relatedFiles,
    userId
}: FileViewWorkspaceProps) {

    const [isFullscreen, setIsFullscreen] = useState(false);
    const isLocked = !userId;

    // Toggle logic
    const toggleFullscreen = () => setIsFullscreen(!isFullscreen);

    return (
        <div className="min-h-screen bg-[#050505] text-white flex flex-col pt-16">

            {/* Top Bar Navigation (Hidden in Fullscreen) */}
            {!isFullscreen && (
                <div className="h-14 border-b border-white/10 flex items-center px-6 bg-[#0A0A0A]/50 backdrop-blur-md sticky top-16 z-40">
                    <Link href="/dashboard" className="flex items-center text-sm text-zinc-400 hover:text-white transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Dashboard
                    </Link>
                    <div className="mx-4 h-4 w-px bg-white/10" />
                    <div className="flex items-center text-sm overflow-hidden">
                        <span className="text-zinc-500 truncate max-w-[150px]">{file.stream}</span>
                        <span className="mx-2 text-zinc-700">/</span>
                        <span className="text-zinc-500 truncate max-w-[150px]">{file.subject}</span>
                        <span className="mx-2 text-zinc-700">/</span>
                        <span className="text-cyan-400 font-medium truncate">{file.title}</span>
                    </div>
                </div>
            )}

            {/* Main Workspace */}
            <div className={clsx(
                "flex-1 flex flex-col lg:flex-row overflow-hidden transition-all",
                !isFullscreen ? "h-[calc(100vh-7.5rem)]" : "h-screen"
            )}>

                {/* LEFT: PDF Viewer Area */}
                <div className={clsx(
                    "bg-[#020202] relative transition-all duration-300",
                    isFullscreen
                        ? "fixed inset-0 z-[100] w-screen h-screen p-0"
                        : "flex-1 p-4 lg:p-6 flex flex-col overflow-hidden"
                )}>
                    <div className={clsx(
                        "w-full h-full border-cyan-500/20 bg-zinc-900/50 relative group overflow-hidden",
                        !isFullscreen && "rounded-2xl border shadow-[0_0_30px_rgba(6,182,212,0.05)]"
                    )}>

                        {/* LOCKED STATE OVERLAY */}
                        {isLocked ? (
                            <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#050505]/80 backdrop-blur-sm p-6 text-center">
                                <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:20px_20px]" />
                                <div className="relative z-10 max-w-md w-full bg-[#0A0A0A] border border-white/10 p-8 rounded-2xl shadow-2xl overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-[50px] pointer-events-none" />

                                    <div className="w-16 h-16 bg-zinc-800/50 rounded-full flex items-center justify-center mx-auto mb-6 border border-white/5">
                                        <Lock className="w-8 h-8 text-cyan-400" />
                                    </div>

                                    <h3 className="text-2xl font-bold text-white mb-2">Unlock this Material</h3>
                                    <p className="text-zinc-400 mb-8">
                                        Join 10,000+ students to access notes, save files, and contribute to the community.
                                    </p>

                                    <Link href="/register" className="block w-full">
                                        <button className="w-full py-3 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-bold transition-all transform hover:scale-[1.02]">
                                            Register to Access
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        ) : (
                            /* NORMAL PDF VIEWER */
                            <>
                                {/* Focus Mode Toggle (Only if logged in) */}
                                <button
                                    onClick={toggleFullscreen}
                                    className="absolute top-4 right-4 z-20 p-2 rounded-lg bg-black/50 hover:bg-cyan-500/20 text-white/50 hover:text-cyan-400 border border-white/10 backdrop-blur-md transition-all"
                                    title={isFullscreen ? "Exit Focus Mode" : "Enter Focus Mode"}
                                >
                                    {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
                                </button>

                                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/5 via-transparent to-pink-500/5 pointer-events-none" />

                                {file.fileUrl ? (
                                    <iframe
                                        src={file.fileUrl}
                                        className="w-full h-full border-none"
                                        title={file.title}
                                    />
                                ) : (
                                    <div className="w-full h-full flex flex-col items-center justify-center text-zinc-500">
                                        <FileText className="w-16 h-16 mb-4 opacity-20" />
                                        <p>Document Preview Unavailable</p>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>

                {/* RIGHT: Sidebar (Rendered but blurry/disabled if locked, or just hidden? Let's hide it if locked for cleaner look, or maybe show it but blurry) */}
                {/* User asked to "Hide the PDF... Replace with Locked Content Card". Sidebar can be hidden too. */}
                {!isFullscreen && !isLocked && (
                    <div className="w-full lg:w-[400px] border-l border-white/10 bg-[#0A0A0A] flex flex-col overflow-y-auto custom-scrollbar z-30">
                        {/* Header Info */}
                        <div className="p-6 border-b border-white/5">
                            <h1 className="text-2xl font-bold text-white mb-2 leading-tight">{file.title}</h1>
                            <div className="flex items-center gap-2 mb-6">
                                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-950 text-cyan-400 border border-cyan-900 uppercase tracking-wider">
                                    {file.type}
                                </span>
                                <span className="text-xs text-zinc-500 flex items-center">
                                    <Calendar className="w-3 h-3 mr-1" />
                                    {format(new Date(file.createdAt), "MMM d, yyyy")}
                                </span>
                            </div>

                            {/* Author Card */}
                            <div className="flex items-center p-3 rounded-lg bg-white/5 border border-white/5 mb-6">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-sm font-bold text-white shadow-lg">
                                    {file.user.name?.[0] || <UserIcon className="w-5 h-5" />}
                                </div>
                                <div className="ml-3 flex-1 overflow-hidden">
                                    <p className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">Uploaded by</p>
                                    <p className="text-sm font-medium text-white truncate">{file.user.name || "Anonymous Scholar"}</p>
                                </div>
                                {/* Rank Badge - Simple Logic for now */}
                                <div className="px-2 py-1 bg-yellow-500/10 border border-yellow-500/20 rounded text-[10px] text-yellow-400 font-bold">
                                    {file.user.reputation > 500 ? "SCHOLAR" : "STUDENT"}
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-4 flex-wrap">
                                <LikeButton
                                    fileId={file.id}
                                    initialIsLiked={isLiked}
                                    initialCount={file.likes.length}
                                    isOwner={file.userId === userId}
                                    userId={userId}
                                />

                                <BookmarkButton
                                    fileId={file.id}
                                    initialState={isBookmarked}
                                />

                                <button className="flex items-center gap-2 group ml-auto">
                                    <div className="p-3 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors">
                                        <Share2 className="w-6 h-6 text-zinc-400 group-hover:text-cyan-400 transition-colors" />
                                    </div>
                                </button>
                            </div>

                            {/* Community Notice Card */}
                            <div className="mt-6 p-4 rounded-lg bg-blue-500/5 border border-blue-500/20">
                                <div className="flex items-center gap-2 mb-2 text-blue-400">
                                    <div className="p-1 rounded bg-blue-500/10">
                                        <Info className="w-4 h-4" />
                                    </div>
                                    <span className="text-xs font-bold uppercase tracking-wider">Educational Use Only</span>
                                </div>
                                <p className="text-xs text-zinc-400 leading-relaxed mb-3">
                                    This document is shared strictly for student study purposes to help the community. We do not claim ownership. All credit and rights go to the original authors and institutions.
                                </p>
                                <a
                                    href={`mailto:studentstudyhub123@gmail.com?subject=Copyright Removal Request: ${file.id}`}
                                    className="text-[10px] text-red-400 hover:text-red-300 underline underline-offset-2 flex items-center gap-1 transition-colors"
                                >
                                    Original Author? Request Removal
                                </a>
                            </div>
                        </div>

                        {/* Related Files */}
                        <div className="p-6">
                            <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-widest mb-4">Related Intelligence</h3>
                            <div className="flex flex-col gap-3">
                                {relatedFiles.length > 0 ? relatedFiles.map((item) => (
                                    <Link
                                        key={item.id}
                                        href={`/view/${item.id}`}
                                        className="block p-3 rounded-lg bg-zinc-900/50 border border-white/5 hover:border-cyan-500/30 hover:bg-cyan-950/10 transition-all group"
                                    >
                                        <div className="flex items-start gap-3">
                                            <div className="p-2 rounded bg-[#0A0A0A] text-zinc-500 group-hover:text-cyan-400 transition-colors">
                                                <FileText className="w-5 h-5" />
                                            </div>
                                            <div className="flex-1 overflow-hidden">
                                                <h4 className="text-sm font-medium text-zinc-300 group-hover:text-white truncate transition-colors">
                                                    {item.title}
                                                </h4>
                                                <p className="text-[10px] text-zinc-600 mt-1 uppercase">
                                                    {item.type} • {format(new Date(item.createdAt), "MMM d")}
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                )) : (
                                    <div className="text-center py-8 border border-dashed border-white/10 rounded-lg">
                                        <p className="text-xs text-zinc-600">No related data found in sector.</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Footer Info */}
                        <div className="mt-auto p-6 border-t border-white/5">
                            <div className="p-4 rounded-lg bg-cyan-950/20 border border-cyan-900/30 flex gap-3">
                                <Shield className="w-8 h-8 text-cyan-500 shrink-0" />
                                <div>
                                    <h4 className="text-xs font-bold text-cyan-400 mb-1">Study Room Protocol</h4>
                                    <p className="text-[10px] text-cyan-300/70 leading-relaxed">
                                        This material is for educational use only. Respect copyright and author integrity. Report anomalies to Admin.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* LOCKED: Show simplified sidebar or placeholder? User said "Unlock this Material" card. 
                    I'll hide the sidebar entirely when locked to focus on the CTA. */}

            </div>
        </div>
    );
}
