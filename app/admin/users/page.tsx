import { db } from "@/lib/db";
import { format } from "date-fns";
import {
    Shield,
    User as UserIcon,
    DownloadCloud
} from "lucide-react";
import Image from "next/image";
import UsersToolbar from "@/components/admin/UsersToolbar";
import UserRowActions from "@/components/admin/UserRowActions";
import { Prisma } from "@prisma/client";

interface AdminUsersPageProps {
    searchParams: Promise<{
        search?: string;
        role?: string;
        page?: string;
    }>;
}

export default async function AdminUsersPage({ searchParams }: AdminUsersPageProps) {
    const params = await searchParams;
    const query = params?.search || "";
    const roleFilter = params?.role === "ALL" ? undefined : (params?.role as any);

    // Build Where Clause
    const whereClause: Prisma.UserWhereInput = {};

    if (query) {
        whereClause.OR = [
            { name: { contains: query, mode: 'insensitive' } },
            { email: { contains: query, mode: 'insensitive' } },
            { id: { contains: query } } // Support searching by ID too
        ];
    }

    if (roleFilter && (roleFilter === "ADMIN" || roleFilter === "STUDENT")) {
        whereClause.role = roleFilter;
    }

    // 1. Fetch Users
    const users = await db.user.findMany({
        where: whereClause,
        orderBy: {
            createdAt: 'desc',
        },
        include: {
            _count: {
                select: { contributions: true },
            },
        },
        take: 50 // Limit for safety
    });

    const totalCount = await db.user.count({ where: whereClause });

    return (
        <div className="p-6 space-y-6 bg-black min-h-screen text-white/90">

            {/* --- Header --- */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black tracking-tight text-white mb-2">
                        User Database
                    </h1>
                    <p className="text-zinc-500 text-sm font-mono">
                        Manage permissions and view platform activity.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 flex items-center gap-2">
                        <UsersIcon className="w-4 h-4 text-cyan-400" />
                        <span className="text-xl font-bold text-white animated-number">{totalCount}</span>
                        <span className="text-xs text-zinc-500 uppercase tracking-wider">Filtered Users</span>
                    </div>
                </div>
            </div>

            {/* --- Toolbar (Client Component) --- */}
            <UsersToolbar />

            {/* --- Data Table --- */}
            <div className="rounded-xl border border-white/10 bg-white/5 overflow-hidden backdrop-blur-sm shadow-2xl">

                {users.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 border border-white/10">
                            <UserIcon className="w-8 h-8 text-zinc-600" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">No Users Found</h3>
                        <p className="text-zinc-500 max-w-sm">The database is currently empty or the search filters returned no results.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-white/10 bg-black/40">
                                    <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-widest font-mono">User Identity</th>
                                    <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-widest font-mono">Role</th>
                                    <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-widest font-mono">Reputation</th>
                                    <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-widest font-mono">Uploads</th>
                                    <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-widest font-mono">Joined</th>
                                    <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-widest font-mono text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {users.map((user) => (
                                    <tr key={user.id} className="group hover:bg-white/5 transition-colors">

                                        {/* Col 1: Identity */}
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-zinc-800 border border-white/10 overflow-hidden relative flex-shrink-0">
                                                    {user.imageUrl ? (
                                                        <Image
                                                            src={user.imageUrl}
                                                            alt={user.name || "User"}
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-zinc-500">
                                                            <UserIcon className="w-5 h-5" />
                                                        </div>
                                                    )}
                                                </div>
                                                <div>
                                                    <div className="font-bold text-white text-sm group-hover:text-cyan-400 transition-colors">
                                                        {user.name || "Anonymous User"}
                                                    </div>
                                                    <div className="text-xs text-zinc-500 font-mono truncate max-w-[200px]">
                                                        {user.email}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Col 2: Role */}
                                        <td className="p-4">
                                            {user.role === "ADMIN" ? (
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold bg-purple-500/20 text-purple-400 border border-purple-500/20">
                                                    <Shield className="w-3 h-3" />
                                                    ADMIN
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold bg-cyan-500/20 text-cyan-400 border border-cyan-500/20">
                                                    <UserIcon className="w-3 h-3" />
                                                    STUDENT
                                                </span>
                                            )}
                                        </td>

                                        {/* Col 3: Reputation */}
                                        <td className="p-4">
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm font-bold text-amber-400 font-mono">
                                                    {user.reputation} XP
                                                </span>
                                            </div>
                                        </td>

                                        {/* Col 4: Uploads */}
                                        <td className="p-4">
                                            <div className="flex items-center gap-2">
                                                <DownloadCloud className="w-4 h-4 text-zinc-600 group-hover:text-blue-400 transition-colors" />
                                                <span className="text-sm font-medium text-zinc-300">
                                                    {user._count.contributions}
                                                </span>
                                            </div>
                                        </td>

                                        {/* Col 5: Joined Date */}
                                        <td className="p-4">
                                            <span className="text-sm text-zinc-400 font-mono">
                                                {format(new Date(user.createdAt), "MMM d, yyyy")}
                                            </span>
                                        </td>

                                        {/* Col 6: Actions (Client Component) */}
                                        <td className="p-4 text-right">
                                            <UserRowActions
                                                userId={user.id}
                                                userName={user.name || "User"}
                                                role={user.role}
                                            />
                                        </td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}

// Helper generic icon for the header Summary (Used if simpler version needed)
function UsersIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
    )
}
