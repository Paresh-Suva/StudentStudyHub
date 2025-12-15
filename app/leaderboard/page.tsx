import { getTopScholars } from "@/actions/leaderboard";
import { Crown, Trophy, Medal, User as UserIcon } from "lucide-react";
import Image from "next/image";


const AvatarDisplay = ({ user, size, borderClass, textClass }: { user: any, size: string, borderClass: string, textClass: string }) => (
    <div className={`${size} rounded-full ${borderClass} bg-zinc-800 flex items-center justify-center mb-4 shadow-lg overflow-hidden relative`}>
        {user.imageUrl ? (
            <img
                src={user.imageUrl}
                alt={user.firstName}
                className="w-full h-full object-cover"
            />
        ) : (
            <span className={`font-bold ${textClass}`}>{user.firstName[0]}</span>
        )}
    </div>
);

export default async function LeaderboardPage() {
    const scholars = await getTopScholars();
    const top3 = scholars.slice(0, 3);
    const rest = scholars.slice(3);

    return (
        <div className="min-h-screen bg-[#050505] text-white pt-24 pb-12 px-4 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-purple-900/20 to-transparent pointer-events-none" />
            <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none" />

            <div className="max-w-5xl mx-auto relative z-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 text-xs font-bold mb-4 uppercase tracking-widest">
                        <Trophy className="w-3 h-3" />
                        Live Rankings
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black mb-2 tracking-tight">
                        Hall of <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-600">Fame</span> 🏆
                    </h1>
                    <p className="text-zinc-400 font-medium">The Top 10 Scholars dominating the syllabus.</p>
                </div>

                {/* THE PODIUM (Rank 1, 2, 3) */}
                <div className="flex flex-col md:flex-row items-end justify-center gap-4 md:gap-8 mb-20">


                    {/* Rank 2 */}
                    {top3[1] && (
                        <div className="order-2 md:order-1 flex-1 max-w-[280px] w-full bg-zinc-900/50 backdrop-blur-md border border-zinc-700/50 rounded-2xl p-6 flex flex-col items-center relative transform md:translate-y-8">
                            <div className="absolute -top-4 bg-zinc-300 text-black font-bold px-3 py-1 rounded-full shadow-lg border border-white">
                                #2
                            </div>
                            <AvatarDisplay
                                user={top3[1]}
                                size="w-20 h-20"
                                borderClass="border-4 border-zinc-300"
                                textClass="text-2xl text-zinc-300"
                            />
                            <h3 className="font-bold text-lg text-white mb-1 truncate w-full text-center">{top3[1].firstName} {top3[1].lastName}</h3>
                            <p className="text-zinc-400 text-sm font-mono text-center mb-2">Student</p>
                            <div className="font-black text-2xl text-zinc-300">{top3[1].points} XP</div>
                        </div>
                    )}

                    {/* Rank 1 */}
                    {top3[0] && (
                        <div className="order-1 md:order-2 flex-1 max-w-[320px] w-full bg-gradient-to-b from-yellow-900/20 to-transparent border border-yellow-500/50 rounded-2xl p-8 flex flex-col items-center relative bg-black/40 shadow-[0_0_50px_rgba(234,179,8,0.1)] z-20">
                            <div className="absolute -top-6">
                                <Crown className="w-12 h-12 text-yellow-500 drop-shadow-lg animate-bounce" />
                            </div>
                            <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent opacity-50" />
                            <AvatarDisplay
                                user={top3[0]}
                                size="w-24 h-24"
                                borderClass="border-4 border-yellow-500"
                                textClass="text-4xl text-yellow-500"
                            />
                            <h3 className="font-bold text-2xl text-yellow-400 mb-1 truncate w-full text-center">{top3[0].firstName} {top3[0].lastName}</h3>
                            <p className="text-yellow-500/70 text-sm font-mono text-center mb-4">Supreme Scholar</p>
                            <div className="font-black text-4xl text-white drop-shadow-md">{top3[0].points} XP</div>
                        </div>
                    )}

                    {/* Rank 3 */}
                    {top3[2] && (
                        <div className="order-3 flex-1 max-w-[280px] w-full bg-zinc-900/50 backdrop-blur-md border border-amber-700/50 rounded-2xl p-6 flex flex-col items-center relative transform md:translate-y-12">
                            <div className="absolute -top-4 bg-amber-700 text-white font-bold px-3 py-1 rounded-full shadow-lg border border-amber-600">
                                #3
                            </div>
                            <AvatarDisplay
                                user={top3[2]}
                                size="w-20 h-20"
                                borderClass="border-4 border-amber-700"
                                textClass="text-2xl text-amber-600"
                            />
                            <h3 className="font-bold text-lg text-white mb-1 truncate w-full text-center">{top3[2].firstName} {top3[2].lastName}</h3>
                            <p className="text-zinc-500 text-sm font-mono text-center mb-2">Student</p>
                            <div className="font-black text-2xl text-amber-600">{top3[2].points} XP</div>
                        </div>
                    )}
                </div>

                {/* THE LIST (Rank 4-10) */}
                {rest.length > 0 && (
                    <div className="bg-white/5 backdrop-blur-xl border border-white/5 rounded-3xl overflow-hidden">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-white/5 bg-white/5">
                                    <th className="p-4 text-center text-xs font-bold uppercase text-zinc-500 w-20">Rank</th>
                                    <th className="p-4 text-xs font-bold uppercase text-zinc-500">Scholar</th>
                                    <th className="p-4 text-right text-xs font-bold uppercase text-zinc-500">XP Points</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {rest.map((user, index) => (
                                    <tr key={user.id} className="hover:bg-white/5 transition-colors group">
                                        <td className="p-4 text-center">
                                            <span className="font-mono text-zinc-400 font-bold group-hover:text-white transition-colors">
                                                #{index + 4}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 font-bold border border-white/5 group-hover:border-cyan-500/50 group-hover:text-cyan-400 transition-all overflow-hidden relative">
                                                    {user.imageUrl ? (
                                                        <img
                                                            src={user.imageUrl}
                                                            alt={user.firstName}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    ) : (
                                                        user.firstName[0]
                                                    )}
                                                </div>
                                                <div className="font-medium text-white group-hover:text-cyan-300 transition-colors">
                                                    {user.firstName} {user.lastName}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4 text-right">
                                            <span className="font-bold font-mono text-zinc-300 group-hover:text-white transition-colors">
                                                {user.points.toLocaleString()}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {scholars.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-zinc-500">No scholars found yet. Start uploading to take the lead!</p>
                    </div>
                )}
            </div>
        </div>
    );
}
