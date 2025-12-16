
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const query = searchParams.get("q");

        if (!query || query.length < 2) {
            return NextResponse.json([]);
        }

        const subjects = await db.globalSubject.findMany({
            where: {
                OR: [
                    { name: { contains: query, mode: "insensitive" } },
                    { code: { contains: query, mode: "insensitive" } }
                ]
            },
            select: {
                id: true,
                name: true,
                code: true,
                _count: {
                    select: { instances: true }
                }
            },
            take: 5
        });

        return NextResponse.json(subjects);
    } catch (error) {
        console.error("[SUBJECT_SEARCH]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
