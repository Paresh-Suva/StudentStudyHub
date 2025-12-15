"use server";

import { db } from "@/lib/db";

export async function searchSubjects(query: string) {
    if (!query) return [];

    try {
        const subjects = await db.subject.findMany({
            where: {
                OR: [
                    { name: { contains: query, mode: "insensitive" } },
                    { branch: { contains: query, mode: "insensitive" } },
                    { stream: { contains: query, mode: "insensitive" } }
                ]
            },
            take: 10,
        });

        // Ensure we return clean objects (Prisma objects are usually fine but being explicit helps)
        return subjects;

    } catch (error) {
        console.error("Search Error:", error);
        return [];
    }
}
