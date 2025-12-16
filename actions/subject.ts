"use server";

import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

// Refactored for Global Subject Library (Many-to-Many)
export async function createSubject({
    name,
    code,
    streamId,
    branchId,
    semesterId
}: {
    name: string;
    code?: string;
    streamId: string;
    branchId: string;
    semesterId: string;
}) {
    const user = await currentUser();

    if (!user || user.publicMetadata.role !== "admin") {
        return { success: false, error: "Unauthorized" };
    }

    // Normalize data
    let dbBranch = branchId.toLowerCase();
    if (dbBranch === "cse") dbBranch = "computer";
    const cleanSemester = semesterId.replace(/^(sem-|prof-)/, "");
    const cleanStream = streamId.toLowerCase();

    try {
        // 1. Check if Global Subject exists
        let globalSubject = await db.globalSubject.findFirst({
            where: { name: { equals: name, mode: "insensitive" } }
        });

        // 2. If not, Create it
        if (!globalSubject) {
            let finalCode = code;

            // Auto-generate code if not provided
            if (!finalCode) {
                const count = await db.globalSubject.count();
                finalCode = String(count + 1).padStart(3, '0'); // "001", "002", etc.
            }

            globalSubject = await db.globalSubject.create({
                data: {
                    name,
                    code: finalCode
                }
            });
        }

        // 3. Create Link (Junction Record) - Idempotent
        const existingLink = await db.streamSubject.findUnique({
            where: {
                stream_branch_semester_globalSubjectId: {
                    stream: cleanStream,
                    branch: dbBranch,
                    semester: cleanSemester,
                    globalSubjectId: globalSubject.id
                }
            }
        });

        if (!existingLink) {
            await db.streamSubject.create({
                data: {
                    stream: cleanStream,
                    branch: dbBranch,
                    semester: cleanSemester,
                    globalSubjectId: globalSubject.id
                }
            });
        }

        revalidatePath(`/stream/${streamId}/${branchId}/${semesterId}`);
        return { success: true, linked: !!existingLink };
    } catch (error) {
        console.error("Create Subject Error:", error);
        return { success: false, error: "Failed to create/link subject" };
    }
}

export async function deleteSubject(subjectId: string, path: string) {
    const user = await currentUser();

    if (!user || user.publicMetadata.role !== "admin") {
        return { success: false, error: "Unauthorized" };
    }

    try {
        await db.globalSubject.delete({
            where: {
                id: subjectId
            }
        });

        revalidatePath(path);
        // Also revalidate admin library
        revalidatePath("/admin/library");
        return { success: true };
    } catch (error) {
        console.error("Delete Subject Error:", error);
        return { success: false, error: "Failed to delete subject" };
    }
}
