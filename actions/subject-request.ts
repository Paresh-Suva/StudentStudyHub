"use server";

import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

// --- CREATE REQUEST ---
export async function createSubjectRequest(data: {
    streamId: string;
    branchId: string;
    semesterId: string;
    subjectName: string;
    message?: string;
}) {
    const user = await currentUser();

    if (!user) {
        return { success: false, error: "Unauthorized" };
    }

    try {
        await db.subjectRequest.create({
            data: {
                userId: user.id,
                streamId: data.streamId,
                branchId: data.branchId,
                semesterId: data.semesterId,
                subjectName: data.subjectName,
                message: data.message,
                status: "PENDING",
            },
        });

        revalidatePath("/admin/requests");
        return { success: true };
    } catch (error) {
        console.error("Subject Request Error:", error);
        return { success: false, error: "Failed to submit request" };
    }
}

// --- UPDATE STATUS (Admin) ---
export async function updateSubjectRequestStatus(requestId: string, status: "APPROVED" | "REJECTED") {
    const user = await currentUser();

    if (!user || user.publicMetadata.role !== "admin") {
        return { success: false, error: "Unauthorized" };
    }

    try {
        await db.subjectRequest.update({
            where: { id: requestId },
            data: { status },
        });

        revalidatePath("/admin/requests");
        return { success: true };
    } catch (error) {
        return { success: false, error: "Failed to update status" };
    }
}

// --- GET PENDING REQUESTS (Admin) ---
export async function getPendingRequests() {
    const user = await currentUser();

    if (!user || user.publicMetadata.role !== "admin") {
        return [];
    }

    return await db.subjectRequest.findMany({
        where: { status: "PENDING" },
        orderBy: { createdAt: "desc" },
    });
}
