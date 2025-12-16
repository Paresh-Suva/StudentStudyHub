import { db } from "@/lib/db";
import { ArrowLeft, PlusCircle } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import ResourceGrid from "@/components/ResourceGrid";

export default async function SubjectDetailPage({
    params
}: {
    params: Promise<{ streamId: string; branchId: string; semesterId: string; subjectId: string }>
}) {
    const { streamId, branchId, semesterId, subjectId } = await params;

    // 1. Fetch Global Subject & Related Data
    let subject;
    try {
        subject = await db.globalSubject.findUnique({
            where: { id: subjectId },
            include: {
                contributions: {
                    where: { status: "APPROVED" },
                    orderBy: { createdAt: "desc" },
                    include: {
                        user: {
                            select: { name: true }
                        }
                    }
                }
            }
        });
    } catch (error) {
        console.error("Database Error:", error);
        return (
            <div className="min-h-screen bg-transparent pt-32 pb-20 px-4 md:px-8 lg:px-12 flex flex-col items-center justify-center text-center">
                <div className="p-4 rounded-full bg-red-500/10 mb-4 ring-1 ring-red-500/30">
                    <ArrowLeft className="h-6 w-6 text-red-500" /> {/* Reusing icon for generic alert visual */}
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">System Offline</h2>
                <p className="text-zinc-500 max-w-md mb-8">
                    Our neural link to the mainframe is temporarily disrupted. The database backend may be initializing or under maintenance.
                </p>
                <Link
                    href={`/stream/${streamId}/${branchId}/${semesterId}`}
                    className="px-6 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold transition-all"
                >
                    Return to Library
                </Link>
            </div>
        );
    }

    if (!subject) {
        return notFound();
    }

    const formattedSemTitle = semesterId.replace("sem-", "Semester ").replace("prof-", "Prof ");

    return (
        <div className="min-h-screen bg-transparent pt-32 pb-20 px-4 md:px-8 lg:px-12">
            <div className="mx-auto max-w-7xl">

                {/* Navigation & Header */}
                <div className="mb-12">
                    <Link
                        href={`/stream/${streamId}/${branchId}/${semesterId}`}
                        className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors mb-6 text-sm"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Subjects
                    </Link>

                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">
                                <span className="text-cyan-400">{subject.code || subject.id.slice(-6).toUpperCase()}</span>
                                <span className="text-zinc-700">|</span>
                                <span>{formattedSemTitle}</span>
                            </div>
                            <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">
                                {subject.name}
                            </h1>
                        </div>

                        <Link
                            href="/contribute"
                            className="flex items-center gap-2 rounded-full bg-cyan-500 px-6 py-3 text-sm font-bold text-black hover:bg-cyan-400 transition-colors"
                        >
                            <PlusCircle className="h-4 w-4" />
                            Upload Note
                        </Link>
                    </div>
                </div>

                {/* Content Area */}
                {subject.contributions.length > 0 ? (
                    <ResourceGrid resources={subject.contributions} />
                ) : (
                    <div className="flex flex-col items-center justify-center py-24 rounded-3xl border border-dashed border-white/10 bg-white/5">
                        <div className="mb-6 rounded-full bg-zinc-900 p-6 ring-1 ring-white/10">
                            <PlusCircle className="h-10 w-10 text-zinc-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-2">No Content Yet</h2>
                        <p className="text-zinc-400 max-w-md text-center mb-8">
                            This subject needs a hero. Upload the first set of notes or PYQs and earn <span className="text-cyan-400 font-bold">50 Reputation</span>.
                        </p>
                        <Link
                            href="/contribute"
                            className="px-8 py-3 rounded-xl bg-white text-black font-bold hover:bg-zinc-200 transition-colors"
                        >
                            Start Contributing
                        </Link>
                    </div>
                )}

            </div>
        </div>
    );
}
