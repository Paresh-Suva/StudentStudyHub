"use client";

import { Command } from "cmdk";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Monitor, Rocket, FileText, LayoutDashboard, Database, Home } from "lucide-react";
import { searchSubjects } from "@/actions/search";

interface Subject {
    id: string;
    name: string;
    code: string | null;
    semester: string;
    branch: string;
    stream: string;
}

export default function CommandMenu({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (open: boolean) => void }) {
    const router = useRouter();
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [query, setQuery] = useState("");

    // Debounce Search
    useEffect(() => {
        const timer = setTimeout(async () => {
            if (query.length > 0) {
                const results = await searchSubjects(query);
                // @ts-ignore - Prisma return type mismatch with simple interface
                setSubjects(results);
            } else {
                // Optional: Fetch default/recent items? For now, clear or fetch all.
                // Let's keep it empty to encourage searching or we can fetch a few defaults.
                // Reverting to fetch all for "browse" mode if query is empty might be nice but let's stick to search for perf.
                if (query === "") {
                    const results = await searchSubjects(""); // Fetch generic list
                    // @ts-ignore
                    setSubjects(results);
                }
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [query]);

    // Initial Fetch (browse mode)
    useEffect(() => {
        if (isOpen) {
            setQuery(""); // Reset query on open
        }
    }, [isOpen]);


    // Toggle with Ctrl+K
    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setIsOpen(!isOpen);
            }
        };

        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, [isOpen, setIsOpen]);

    if (!isOpen) return null;

    const runCommand = (command: () => void) => {
        setIsOpen(false);
        command();
    };

    const constructLink = (s: Subject) => {
        try {
            // Robust link construction: Encodes parts to handle spaces
            const cleanStream = encodeURIComponent((s.stream || "").toLowerCase());
            const cleanBranch = encodeURIComponent((s.branch || "").toLowerCase());
            const cleanSem = s.semester || "1";
            const cleanId = s.id || "";

            return `/stream/${cleanStream}/${cleanBranch}/${cleanSem}/${cleanId}`;
        } catch (e) {
            console.error("Link construction failed", s, e);
            return "/dashboard";
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] bg-black/80 backdrop-blur-md" onClick={() => setIsOpen(false)}>
            <div
                className="w-full max-w-2xl overflow-hidden rounded-xl border border-white/20 bg-[#050505] shadow-[0_0_50px_rgba(0,0,0,0.8)] ring-1 ring-white/10 animate-in fade-in zoom-in-95 duration-100"
                onClick={(e) => e.stopPropagation()}
            >
                <Command className="w-full bg-transparent" shouldFilter={false}>
                    <div className="flex items-center border-b border-white/10 px-4 py-2" cmdk-input-wrapper="">
                        <Search className="mr-3 h-6 w-6 shrink-0 text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.6)]" />
                        <Command.Input
                            placeholder="Search anything..."
                            className="flex h-14 w-full rounded-md bg-transparent py-3 text-xl outline-none placeholder:text-zinc-600 disabled:cursor-not-allowed disabled:opacity-50 text-white font-bold tracking-wide selection:bg-yellow-500/30"
                            value={query}
                            onValueChange={setQuery}
                            autoFocus
                        />
                    </div>

                    <Command.List className="max-h-[60vh] overflow-y-auto overflow-x-hidden p-3 scrollbar-hide">
                        <Command.Empty className="py-8 text-center text-lg text-zinc-500 font-medium">
                            {query ? "No results found." : "Start typing to search..."}
                        </Command.Empty>

                        <Command.Group heading="GENERAL COMMANDS" className="text-xs font-black text-zinc-500 px-2 py-2 mb-1 uppercase tracking-widest">
                            <Command.Item
                                onSelect={() => runCommand(() => router.push("/"))}
                                className="relative flex cursor-pointer select-none items-center rounded-lg px-4 py-3 text-lg outline-none aria-selected:bg-orange-500/10 aria-selected:border-l-4 aria-selected:border-orange-500 transition-all text-zinc-300 group hover:bg-white/5 active:scale-[0.99] mb-1"
                            >
                                <Home className="mr-4 h-6 w-6 text-orange-500 group-aria-selected:text-orange-400 drop-shadow-[0_0_5px_rgba(249,115,22,0.5)]" />
                                <span className="font-bold text-orange-100 group-aria-selected:text-orange-400">Home</span>
                            </Command.Item>
                            <Command.Item
                                onSelect={() => runCommand(() => router.push("/dashboard"))}
                                className="relative flex cursor-pointer select-none items-center rounded-lg px-4 py-3 text-lg outline-none aria-selected:bg-green-500/10 aria-selected:border-l-4 aria-selected:border-green-500 transition-all text-zinc-300 group hover:bg-white/5 active:scale-[0.99] mb-1"
                            >
                                <LayoutDashboard className="mr-4 h-6 w-6 text-green-500 group-aria-selected:text-green-400 drop-shadow-[0_0_5px_rgba(34,197,94,0.5)]" />
                                <span className="font-bold text-green-100 group-aria-selected:text-green-400">Dashboard</span>
                            </Command.Item>
                            <Command.Item
                                onSelect={() => runCommand(() => router.push("/contribute"))}
                                className="relative flex cursor-pointer select-none items-center rounded-lg px-4 py-3 text-lg outline-none aria-selected:bg-yellow-500/10 aria-selected:border-l-4 aria-selected:border-yellow-500 transition-all text-zinc-300 group hover:bg-white/5 active:scale-[0.99]"
                            >
                                <Database className="mr-4 h-6 w-6 text-yellow-500 group-aria-selected:text-yellow-400 drop-shadow-[0_0_5px_rgba(234,179,8,0.5)]" />
                                <span className="font-bold text-yellow-100 group-aria-selected:text-yellow-400">Contribute</span>
                            </Command.Item>
                        </Command.Group>

                        <div className="my-4 h-px bg-white/10" />

                        <Command.Group heading="ACADEMIC SUBJECTS" className="text-xs font-black text-zinc-500 px-2 py-2 mb-1 uppercase tracking-widest">
                            {subjects.map((subject) => (
                                <Command.Item
                                    key={subject.id}
                                    value={subject.name || ""}
                                    keywords={[subject.code || "", subject.stream || "", subject.branch || ""]}
                                    onSelect={() => runCommand(() => router.push(constructLink(subject)))}
                                    className="relative flex cursor-pointer select-none items-center rounded-lg px-4 py-3 text-lg outline-none aria-selected:bg-pink-500/10 aria-selected:border-l-4 aria-selected:border-pink-500 transition-all text-zinc-300 group hover:bg-white/5 active:scale-[0.99] mb-1"
                                >
                                    <FileText className="mr-4 h-6 w-6 text-pink-500 group-aria-selected:text-pink-400 drop-shadow-[0_0_5px_rgba(236,72,153,0.5)]" />
                                    <div className="flex flex-col gap-0.5">
                                        <span className="font-bold text-pink-100 group-aria-selected:text-pink-400 transition-colors">{subject.name}</span>
                                        <span className="text-xs text-zinc-400 group-aria-selected:text-pink-200/70 font-bold tracking-tight uppercase">
                                            {subject.stream} <span className="text-zinc-600 mx-1">/</span> {subject.branch} <span className="text-zinc-600 mx-1">/</span> Sem {subject.semester}
                                        </span>
                                    </div>
                                </Command.Item>
                            ))}
                        </Command.Group>
                    </Command.List>
                </Command>
            </div>
        </div>
    );
}
