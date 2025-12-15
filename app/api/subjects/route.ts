import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const stream = searchParams.get("stream");
        const branch = searchParams.get("branch");
        const semester = searchParams.get("semester");

        // Build generic where clause
        const whereClause: any = {};

        if (stream) {
            whereClause.stream = stream.toLowerCase();
        }

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
            const dbBranch = branchMap[rawBranch] || rawBranch;

            whereClause.branch = dbBranch;
        }

        if (semester) {
            // Normalize semester
            const semMatch = semester.match(/(\d+)/);
            const cleanSemester = semMatch ? semMatch[0] : semester.replace(/^(sem-|prof-)/, "");

            whereClause.semester = cleanSemester;
        }

        const subjects = await db.subject.findMany({
            where: whereClause,
            orderBy: {
                name: 'asc'
            },
            take: 100 // Limit for performance safety if no filters
        });

        return NextResponse.json(subjects);

    } catch (error) {
        console.error("[SUBJECTS_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
