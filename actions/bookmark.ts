"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function toggleBookmark(contributionId: string) {
    const { userId } = await auth();

    if (!userId) {
        throw new Error("Unauthorized");
    }

    const existingBookmark = await db.bookmark.findUnique({
        where: {
            userId_contributionId: {
                userId,
                contributionId
            }
        }
    });

    if (existingBookmark) {
        await db.bookmark.delete({
            where: {
                id: existingBookmark.id
            }
        });
        revalidatePath("/dashboard");
        revalidatePath(`/view/${contributionId}`);
        return { bookmarked: false };
    } else {
        await db.bookmark.create({
            data: {
                userId,
                contributionId
            }
        });
        revalidatePath("/dashboard");
        revalidatePath(`/view/${contributionId}`);
        return { bookmarked: true };
    }
}
