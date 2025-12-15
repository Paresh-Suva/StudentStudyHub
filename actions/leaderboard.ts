"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function getTopScholars() {
    const users = await db.user.findMany({
        where: {
            role: { not: "ADMIN" }
        },
        orderBy: { reputation: "desc" },
        take: 10,
        select: {
            id: true,
            name: true,
            reputation: true,
            imageUrl: true
        }
    });

    const mappedUsers = users.map(user => {
        const nameParts = (user.name || "Anonymous").split(" ");
        const firstName = nameParts[0];
        const lastName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : "";

        return {
            id: user.id,
            firstName,
            lastName,
            imageUrl: user.imageUrl, // Real image from DB
            points: user.reputation
        };
    });

    return mappedUsers;
}
