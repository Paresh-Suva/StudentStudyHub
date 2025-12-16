import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const stream = searchParams.get("stream");
        const branch = searchParams.get("branch");
        const semester = searchParams.get("semester");

        // Build relation where clause
        const contextFilter: any = {};

        if (stream) {
            contextFilter.stream = stream.toLowerCase();
        }

        let dbBranch: string | undefined = undefined;

        if (branch) {
            // Normalize branch for DB lookup
            const branchMap: Record<string, string> = {
                "computer science": "computer",
                "cse": "computer",
                "information technology": "it",
                "it": "it",
                "mechanical engineering": "mechanical",
                "mechanical": "mechanical",
                "civil engineering": "civil",
                "civil": "civil",
                "electrical engineering": "ee",
                "electrical": "ee",
                "ee": "ee",
                "electronics": "electronics",
                "mbbs": "mbbs",
                "b.pharm": "b.pharm"
            };

            const rawBranch = branch.toLowerCase().trim();
            dbBranch = branchMap[rawBranch] || rawBranch;

            contextFilter.branch = dbBranch;
        }

        if (semester) {
            // Normalize semester
            const semMatch = semester.match(/(\d+)/);
            const cleanSemester = semMatch ? semMatch[0] : semester.replace(/^(sem-|prof-)/, "");

            contextFilter.semester = cleanSemester;
        }

        // Query the Junction Table (StreamSubject)
        const streamSubjects = await (db as any).streamSubject.findMany({
            where: contextFilter,
            include: {
                globalSubject: {
                    include: {
                        _count: {
                            select: { contributions: true }
                        }
                    }
                }
            },
            take: 100
        });

        // Transform to flat format for Frontend
        const subjects = streamSubjects.map((link: any) => ({
            id: link.globalSubject.id, // Use Global ID
            name: link.globalSubject.name,
            code: link.globalSubject.code,
            _count: link.globalSubject._count
        }));

        // Sort by name
        subjects.sort((a: any, b: any) => a.name.localeCompare(b.name));

        return NextResponse.json(subjects);

    } catch (error) {
        console.error("[SUBJECTS_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
