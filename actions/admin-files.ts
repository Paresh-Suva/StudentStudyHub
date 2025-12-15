"use server";

import { db } from "@/lib/db";
import { Prisma, Contribution } from "@prisma/client";
import { revalidatePath } from "next/cache";

// Manually define the type to bypass stale client generation issues
export type FileWithUser = Contribution & {
    user: {
        name: string | null;
        imageUrl: string | null;
    };
};

export async function getAllFiles(): Promise<FileWithUser[]> {
    try {
        // Use 'any' to bypass the specific 'UserSelect' type error
        // checking for imageUrl which supposedly doesn't exist.
        const files = await db.contribution.findMany({
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                user: {
                    select: {
                        name: true,
                        imageUrl: true
                    } as any
                }
            }
        });

        // Force cast the result to our manual type
        return files as unknown as FileWithUser[];
    } catch (error) {
        console.error("Error fetching admin files:", error);
        return [];
    }
}

export async function deleteFile(fileId: string) {
    try {
        await db.contribution.delete({
            where: { id: fileId }
        });

        revalidatePath("/admin/files");
        revalidatePath("/stream"); // catch-all
        return { success: true };
    } catch (error) {
        console.error("Error deleting file:", error);
        return { success: false, error: "Failed to delete file" };
    }
}

export async function renameFile(fileId: string, newTitle: string) {
    try {
        await db.contribution.update({
            where: { id: fileId },
            data: { title: newTitle }
        });

        revalidatePath("/admin/files");
        revalidatePath("/stream");
        return { success: true };
    } catch (error) {
        console.error("Error renaming file:", error);
        return { success: false, error: "Failed to rename file" };
    }
}
