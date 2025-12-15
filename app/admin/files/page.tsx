import { getAllFiles } from "@/actions/admin-files";
import Link from "next/link";
import { ArrowLeft, FileText, ExternalLink, User } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminFilesPage() {
    const files = await getAllFiles();

    return (
        <div className="min-h-screen bg-[#050505] text-white p-6 md:p-12 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-purple-900/10 to-transparent pointer-events-none" />
            <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-cyan-500/5 blur-[100px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12">
                    <div>
                        <Link
                            href="/admin"
                            className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-sm font-mono mb-4"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to Dashboard
                        </Link>
                        <h1 className="text-3xl md:text-4xl font-black tracking-tight text-white">
                            Master <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">File Archive</span>
                        </h1>
                        <p className="text-zinc-500 font-mono mt-2">
                            Full inventory of database. Total Records: {files.length}
                        </p>
                    </div>
                </div>

                {/* Table Container */}
                <div className="bg-zinc-900/30 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-md shadow-2xl">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-white/10 bg-white/5">
                                    <th className="p-4 md:p-6 text-xs font-bold uppercase text-zinc-500 tracking-wider">File Name</th>
                                    <th className="p-4 md:p-6 text-xs font-bold uppercase text-zinc-500 tracking-wider">Subject</th>
                                    <th className="p-4 md:p-6 text-xs font-bold uppercase text-zinc-500 tracking-wider">Author</th>
                                    <th className="p-4 md:p-6 text-xs font-bold uppercase text-zinc-500 tracking-wider text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {files.map((file) => (
                                    <tr key={file.id} className="hover:bg-white/5 transition-colors group">
                                        {/* File Name */}
                                        <td className="p-4 md:p-6">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-500/20 transition-colors">
                                                    <FileText className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <div className="font-semibold text-zinc-200 group-hover:text-white transition-colors truncate max-w-[200px] md:max-w-[300px]">
                                                        {file.title}
                                                    </div>
                                                    <div className="text-xs text-zinc-500 font-mono">
                                                        {file.type} • {new Date(file.createdAt).toLocaleDateString()}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Subject */}
                                        <td className="p-4 md:p-6">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-zinc-800 text-zinc-300 border border-white/10">
                                                {file.subject}
                                            </span>
                                        </td>

                                        {/* Author */}
                                        <td className="p-4 md:p-6">
                                            <div className="flex items-center gap-2">
                                                <div className="w-6 h-6 rounded-full bg-zinc-800 flex items-center justify-center overflow-hidden border border-white/10">
                                                    {file.user.imageUrl ? (
                                                        <img src={file.user.imageUrl} alt="User" className="w-full h-full object-cover" />
                                                    ) : (
                                                        <User className="w-3 h-3 text-zinc-500" />
                                                    )}
                                                </div>
                                                <span className="text-sm text-zinc-400">
                                                    {file.user.name || "Unknown"}
                                                </span>
                                            </div>
                                        </td>

                                        {/* Action */}
                                        <td className="p-4 md:p-6 text-right">
                                            <a
                                                href={`/view/${file.id}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 text-xs font-bold hover:bg-cyan-500 hover:text-black transition-all"
                                            >
                                                View Loop
                                                <ExternalLink className="w-3 h-3" />
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {files.length === 0 && (
                        <div className="p-12 text-center text-zinc-500">
                            No files found in the archive.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
