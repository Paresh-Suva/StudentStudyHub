"use strict"; // Server Component

import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import SubjectSelectionGrid from "@/components/SubjectSelectionGrid";
import SubjectRequestSection from "@/components/SubjectRequestSection";

export default async function SemesterPage({ params }: { params: Promise<{ streamId: string; branchId: string; semesterId: string }> }) {
    const { streamId, branchId, semesterId } = await params;
    const user = await currentUser();
    const isAdmin = user?.publicMetadata?.role === "admin";

    // Map URL params to Database Schema
    // 'cse' URL -> 'computer' in DB (from seed data)
    // 'prof-1' URL -> '1' in DB (for regex match or exact string)

    let dbBranch = branchId.toLowerCase();
    if (dbBranch === "cse") dbBranch = "computer";

    // Clean semester string for DB query (e.g. "sem-3" -> "3", "prof-1" -> "1")
    const cleanSemester = semesterId.replace(/^(sem-|prof-)/, "");

    // REFACTOR: Fetch from StreamSubject (Junction Table)
    const streamSubjects = await db.streamSubject.findMany({
        where: {
            stream: streamId.toLowerCase(),
            branch: dbBranch,
            semester: cleanSemester
        },
        include: {
            globalSubject: {
                include: {
                    _count: {
                        select: { contributions: true }
                    }
                }
            }
        },
        orderBy: {
            // We can't order by globalSubject.name directly in relational query easily without raw query
            // So we sort in memory (safe for page size < 100)
            id: 'asc'
        }
    });

    // Transform to UI format
    const subjects = streamSubjects
        .map((link, index) => ({
            id: link.globalSubject.id, // Use GLOBAL ID
            code: link.globalSubject.code || `SUB-${100 + index}`,
            title: link.globalSubject.name,
            credits: 4,
            fileCount: link.globalSubject._count.contributions
        }))
        .sort((a, b) => a.title.localeCompare(b.title)); // Sort alphabetically

    const formattedSemTitle = semesterId.replace("sem-", "Semester ").replace("prof-", "Prof ");

    return (
        <div className="min-h-screen bg-transparent pt-40 p-4 md:p-8 lg:p-12">
            <div className="mx-auto max-w-7xl">

                {/* Back Link */}
                <Link
                    href={`/stream/${streamId}/${branchId}`}
                    className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors mb-8 text-sm"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Semester List
                </Link>

                {/* Header */}
                <header className="mb-12">
                    {/* Framer motion needs to be strictly clinet side but we are server component.
                        We can wrap this in a client component or simpler standard div for now if motion fails.
                        For now, removing motion wrapper or assuming it's handled by a client wrapper file.
                        Actually, 'motion' cannot be used directly in Server Component. 
                        I will replace motion.div with standard div to avoid error. 
                    */}
                    <div className="animate-fade-in-up">
                        <div className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-zinc-500">
                            <span>{streamId}</span>
                            <span className="text-zinc-700">/</span>
                            <span>{branchId}</span>
                            <span className="text-zinc-700">/</span>
                            <span className="text-cyan-400">{semesterId}</span>
                        </div>
                        <h1 className="text-4xl font-black uppercase tracking-tight text-white md:text-6xl mb-4">
                            {formattedSemTitle} <span className="ml-3">Subjects</span>
                        </h1>
                        <p className="text-zinc-400 text-lg">
                            Select a subject to access notes, papers, and lectures.
                        </p>
                    </div>
                </header>

                {/* Subject Grid */}
                <div className="mb-20">
                    <SubjectSelectionGrid
                        subjects={subjects}
                        basePath={`/stream/${streamId}/${branchId}/${semesterId}`}
                        isAdmin={isAdmin}
                        actionCard={isAdmin ? (
                            <SubjectRequestSection
                                isAdmin={true}
                                streamId={streamId}
                                branchId={branchId}
                                semesterId={semesterId}
                            />
                        ) : undefined}
                    />

                    {/* Student Request Button (Only if NOT admin) */}
                    {!isAdmin && (
                        <SubjectRequestSection
                            isAdmin={false}
                            streamId={streamId}
                            branchId={branchId}
                            semesterId={semesterId}
                        />
                    )}

                    {subjects.length === 0 && !isAdmin && (
                        <div className="mt-8 py-12 text-center border rounded-2xl border-white/5 bg-white/5">
                            <h3 className="text-xl font-bold text-zinc-400">No Subjects Found</h3>
                            <p className="text-zinc-600 mt-2">
                                Database returned 0 subjects for {dbBranch} - Sem {cleanSemester}.
                            </p>
                            <p className="text-xs text-zinc-700 mt-4">Debug: {streamId} / {dbBranch} / {cleanSemester}</p>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}
