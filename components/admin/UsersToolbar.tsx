"use client";

import { Search, Filter, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useDebounce } from "@/hooks/use-debounce"; // Assuming hook exists, if not I'll implement local debounce

export default function UsersToolbar() {
    const router = useRouter();
    const searchParams = useSearchParams();

    // Initial State from URL
    const initialSearch = searchParams.get("search") || "";
    const initialRole = searchParams.get("role") || "ALL";

    const [search, setSearch] = useState(initialSearch);
    const [role, setRole] = useState(initialRole);
    const [isPending, setIsPending] = useState(false);

    // Debounce Search
    useEffect(() => {
        const timer = setTimeout(() => {
            if (search !== initialSearch) {
                updateParams({ search });
            }
        }, 500);
        return () => clearTimeout(timer);
    }, [search]);

    const updateParams = (updates: { search?: string; role?: string }) => {
        setIsPending(true);
        const params = new URLSearchParams(searchParams.toString());

        if (updates.search !== undefined) {
            if (updates.search) params.set("search", updates.search);
            else params.delete("search");
        }

        if (updates.role !== undefined) {
            if (updates.role && updates.role !== "ALL") params.set("role", updates.role);
            else params.delete("role");
        }

        router.push(`/admin/users?${params.toString()}`);
        setIsPending(false);
    };

    return (
        <div className="flex flex-col md:flex-row gap-4 p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">

            {/* Search Input */}
            <div className="relative flex-1 group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-cyan-400 transition-colors" />
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search users by email, name..."
                    className="w-full bg-black/50 border border-white/10 rounded-lg py-2 pl-10 pr-4 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 font-mono transition-all"
                />
                {search && (
                    <button
                        onClick={() => { setSearch(""); updateParams({ search: "" }); }}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-white"
                    >
                        <X className="w-3 h-3" />
                    </button>
                )}
            </div>

            {/* Filter Dropdown (Simple Select for v1) */}
            <div className="relative">
                <div className="relative">
                    <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
                    <select
                        value={role}
                        onChange={(e) => {
                            setRole(e.target.value);
                            updateParams({ role: e.target.value });
                        }}
                        className="appearance-none pl-10 pr-8 py-2 bg-black/50 border border-white/10 rounded-lg text-sm text-zinc-300 hover:text-white hover:border-white/20 transition-colors focus:outline-none focus:border-cyan-500/50 cursor-pointer"
                    >
                        <option value="ALL">Filter: All Roles</option>
                        <option value="ADMIN">Admins Only</option>
                        <option value="STUDENT">Students Only</option>
                    </select>
                </div>
            </div>
        </div>
    );
}
