"use server";

import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function createSubject({
    name,
    code,
    streamId,
    branchId,
    semesterId
}: {
    name: string;
    code: string;
    streamId: string;
    branchId: string;
    semesterId: string;
}) {
    const user = await currentUser();

    if (!user || user.publicMetadata.role !== "admin") {
        return { success: false, error: "Unauthorized" };
    }

    // Normalize data to match 'SemesterPage' query logic
    let dbBranch = branchId.toLowerCase();
    if (dbBranch === "cse") dbBranch = "computer";

    const cleanSemester = semesterId.replace(/^(sem-|prof-)/, "");

    try {
        await db.subject.create({
            data: {
                name,
                code,
                stream: streamId.toLowerCase(),
                branch: dbBranch,
                semester: cleanSemester,
            }
        });

        revalidatePath(`/stream/${streamId}/${branchId}/${semesterId}`);
        return { success: true };
    } catch (error) {
        console.error("Create Subject Error:", error);
        return { success: false, error: "Failed to create subject" };
    }
}

export async function deleteSubject(subjectId: string, path: string) {
    const user = await currentUser();

    if (!user || user.publicMetadata.role !== "admin") {
        return { success: false, error: "Unauthorized" };
    }

    try {
        await db.subject.delete({
            where: {
                id: subjectId
            }
        });

        revalidatePath(path);
        return { success: true };
    } catch (error) {
        console.error("Delete Subject Error:", error);
        return { success: false, error: "Failed to delete subject" };
    }
}
