"use server";

import { db } from "@/lib/db";
import { auth, currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function toggleLike(contributionId: string) {
    const { userId } = await auth();

    if (!userId) {
        throw new Error("Unauthorized");
    }

    // Check if like exists
    const existingLike = await db.like.findUnique({
        where: {
            userId_contributionId: {
                userId,
                contributionId
            }
        }
    });

    // Find the file to get the author ID
    const file = await db.contribution.findUnique({
        where: { id: contributionId },
        select: { userId: true }
    });

    if (!file) throw new Error("File not found");

    // CRITICAL: Prevent Author from liking their own file
    if (file.userId === userId) {
        throw new Error("You cannot like your own file.");
    }

    if (existingLike) {
        // UNLIKE
        await db.like.delete({
            where: {
                id: existingLike.id
            }
        });

        // Deduct reputation
        await db.user.update({
            where: { id: file.userId },
            data: { reputation: { decrement: 5 } }
        });

    } else {
        // LIKE
        await db.like.create({
            data: {
                userId,
                contributionId
            }
        });

        // Add reputation
        await db.user.update({
            where: { id: file.userId },
            data: { reputation: { increment: 5 } }
        });
    }

    revalidatePath(`/view/${contributionId}`);
}
