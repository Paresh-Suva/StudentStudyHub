"use server";

import { db } from "@/lib/db";
import { auth, currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function createDiscussion(content: string, category: string) {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    if (!content || !content.trim()) throw new Error("Content is required");

    await db.discussion.create({
        data: {
            content,
            category,
            userId
        }
    });

    revalidatePath("/discussion");
    return { success: true };
}

export async function deleteDiscussion(id: string) {
    const user = await currentUser();
    if (!user) throw new Error("Unauthorized");

    const discussion = await db.discussion.findUnique({ where: { id } });
    if (!discussion) throw new Error("Not found");

    const isAdmin = user.publicMetadata.role === "admin";
    const isOwner = discussion.userId === user.id;

    if (!isOwner && !isAdmin) {
        throw new Error("Forbidden");
    }

    await db.discussion.delete({ where: { id } });
    revalidatePath("/discussion");
    return { success: true };
}
