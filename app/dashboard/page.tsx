import { getUserDashboardData } from "@/actions/dashboard";
import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import { Upload, FileText, Award, Zap, BookOpen } from "lucide-react";
import NeonButton from "@/components/NeonButton";
import AvatarUploader from "@/components/AvatarUploader";
import { redirect } from "next/navigation";

import { syncUser } from "@/actions/user";

export default async function DashboardPage() {
    const user = await currentUser();

    // Sync User Data (Self-Healing)
    await syncUser(false);

    const data = await getUserDashboardData();

    if (!user) return null;

    // --- SCENARIO A: ADMIN DASHBOARD ---
    if (data.isAdmin) {
        redirect("/admin");
    }

    // --- SCENARIO B: STUDENT DASHBOARD ---
    const { stats, contributions, savedFiles } = data;

    return (
        <div className="min-h-screen bg-[#0A0A0A] text-white pt-24 pb-12 px-4 md:px-8 font-sans">
            <div className="max-w-7xl mx-auto">

                {/* Hero Section */}
                <header className="flex flex-col md:flex-row md::items-center justify-between gap-6 mb-12 border-b border-white/5 pb-8">
                    <div className="flex items-center gap-6">


                        <AvatarUploader currentUserImage={user.imageUrl} size="w-24 h-24" />
                        <div>
                            <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-2">
                                Student <span className="text-cyan-400">HQ</span>
                            </h1>
                            <p className="text-zinc-400">Track your progress and contributions.</p>
                        </div>
                    </div>

                    <Link href="/contribute">
                        <NeonButton variant="primary" className="flex items-center gap-2">
                            <Upload className="w-4 h-4" />
                            Upload New Note
                        </NeonButton>
                    </Link>
                </header>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">

                    {/* Rank Card */}
                    <div className="rounded-2xl bg-gradient-to-br from-purple-900/20 to-black border border-purple-500/20 p-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-20">
                            <Award className="w-16 h-16 text-purple-500" />
                        </div>
                        <p className="text-sm font-medium text-purple-400 mb-1">Current Rank</p>
                        <h3 className="text-3xl font-bold text-white mb-4">{stats?.rank}</h3>
                        <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-purple-500 transition-all duration-1000"
                                style={{ width: `${stats?.progress}%` }}
                            />
                        </div>
                        <p className="text-xs text-zinc-500 mt-2 text-right">{stats?.points} / {stats?.nextRankXP} XP to next rank</p>
                    </div>

                    {/* XP Card */}
                    <div className="rounded-2xl bg-gradient-to-br from-yellow-900/20 to-black border border-yellow-500/20 p-6 flex flex-col justify-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-20">
                            <Zap className="w-16 h-16 text-yellow-500" />
                        </div>
                        <div className="flex items-center gap-4 mb-2 z-10">
                            <div className="p-3 rounded-xl bg-yellow-500/10 text-yellow-500">
                                <Zap className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-yellow-400">Total XP</p>
                                <h3 className="text-2xl font-bold text-white">{stats?.points}</h3>
                            </div>
                        </div>
                        <p className="text-xs text-zinc-500 pl-16 z-10">Earn 50 XP per approved upload</p>
                    </div>

                    {/* Uploads Card */}
                    <div className="rounded-2xl bg-gradient-to-br from-cyan-900/20 to-black border border-cyan-500/20 p-6 flex flex-col justify-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-20">
                            <BookOpen className="w-16 h-16 text-cyan-500" />
                        </div>
                        <div className="flex items-center gap-4 mb-2 z-10">
                            <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400">
                                <BookOpen className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-cyan-400">Contributions</p>
                                <h3 className="text-2xl font-bold text-white">{stats?.totalUploads}</h3>
                            </div>
                        </div>
                        <p className="text-xs text-zinc-500 pl-16 z-10">{stats?.approvedCount} Approved</p>
                    </div>
                </div>

                {/* Saved Library Section */}
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2 mt-12">
                    <BookOpen className="w-5 h-5 text-purple-400" />
                    Saved Library
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
                    {savedFiles && savedFiles.length > 0 ? (
                        savedFiles.map((file: any) => (
                            <Link href={`/view/${file.id}`} key={file.id} className="group block">
                                <div className="rounded-xl bg-zinc-900 border border-white/5 p-4 hover:border-purple-500/50 hover:bg-purple-900/10 transition-all cursor-pointer">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="p-2 rounded bg-[#0A0A0A] text-zinc-400 group-hover:text-purple-400 transition-colors">
                                            <FileText className="w-6 h-6" />
                                        </div>
                                        <span className="text-[10px] font-bold px-2 py-1 rounded bg-white/5 text-zinc-500 uppercase">
                                            {file.type}
                                        </span>
                                    </div>
                                    <h3 className="font-bold text-white truncate mb-1 group-hover:text-purple-300 transition-colors">{file.title}</h3>
                                    <p className="text-xs text-zinc-500 truncate">{file.subject}</p>
                                    <p className="text-[10px] text-zinc-600 mt-3 flex items-center gap-1">
                                        Added {new Date(file.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <div className="col-span-full py-12 text-center rounded-xl bg-white/5 border border-dashed border-white/10">
                            <p className="text-zinc-500 text-sm">No saved notes yet.</p>
                        </div>
                    )}
                </div>

                {/* Contribution History */}
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-cyan-400" />
                    Upload History
                </h2>

                <div className="border border-white/10 rounded-xl overflow-hidden bg-white/5 backdrop-blur-sm">
                    {contributions && contributions.length > 0 ? (
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-white/10 bg-white/5">
                                    <th className="p-4 text-xs font-medium uppercase text-zinc-400">Title</th>
                                    <th className="p-4 text-xs font-medium uppercase text-zinc-400">Subject</th>
                                    <th className="p-4 text-xs font-medium uppercase text-zinc-400 hidden md:table-cell">Date</th>
                                    <th className="p-4 text-xs font-medium uppercase text-zinc-400">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {contributions.map((item: any) => (
                                    <tr key={item.id} className="hover:bg-white/5 transition-colors">
                                        <td className="p-4 font-medium text-white max-w-[200px] truncate">{item.title}</td>
                                        <td className="p-4 text-zinc-400">{item.subject}</td>
                                        <td className="p-4 text-zinc-500 text-sm hidden md:table-cell">
                                            {new Date(item.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="p-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${item.status === 'APPROVED' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                                                item.status === 'REJECTED' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                                                    'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                                                }`}>
                                                {item.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="text-center py-12 text-zinc-500">
                            <p>No contributions yet. Start your journey!</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
