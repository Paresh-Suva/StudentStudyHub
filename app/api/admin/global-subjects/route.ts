
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";

export async function GET() {
    try {
        const user = await currentUser();
        if (!user || user.publicMetadata.role !== "admin") {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const subjects = await db.globalSubject.findMany({
            orderBy: { name: 'asc' },
            include: {
                _count: {
                    select: {
                        instances: true, // How many streams it's linked to
                        contributions: true
                    }
                }
            }
        });

        return NextResponse.json(subjects);

    } catch (error) {
        console.error("[GLOBAL_SUBJECTS_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
