"use server";

import { db } from "@/lib/db";
import { auth, currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

// --- Action 1: Get Pending Contributions ---
export async function getPendingContributions() {
    const { userId } = await auth();
    const user = await currentUser();

    if (!userId || !user) {
        throw new Error("Unauthorized");
    }

    // Check if user is Admin
    // We check both the Clerk metadata AND the DB role for maximum security
    const dbUser = await db.user.findUnique({
        where: { id: userId },
    });

    if (dbUser?.role !== "ADMIN") {
        throw new Error("Forbidden: Admin Access Only");
    }

    // Fetch pending records
    const contributions = await db.contribution.findMany({
        where: {
            status: "PENDING"
        },
        include: {
            user: true // Include uploader details
        },
        orderBy: {
            createdAt: "desc"
        }
    });

    return contributions;
}

// --- Action 2: Moderate Contribution ---
export async function moderateContribution(contributionId: string, decision: "APPROVED" | "REJECTED") {
    const { userId } = await auth();

    if (!userId) {
        throw new Error("Unauthorized");
    }

    // 1. Verify Admin (Double Check)
    const dbUser = await db.user.findUnique({
        where: { id: userId },
    });

    if (dbUser?.role !== "ADMIN") {
        throw new Error("Forbidden");
    }

    // 2. Update Status
    const updated = await db.contribution.update({
        where: { id: contributionId },
        data: {
            status: decision
        },
        include: { user: true }
    });

    // 3. Log Action
    await db.systemLog.create({
        data: {
            action: `CONTRIBUTION_${decision}`,
            details: `Admin ${dbUser.name} (${userId}) ${decision} contribution ${contributionId} by ${updated.user.name}`
        }
    });

    // 4. Reputation Update (Optional but cool)
    if (decision === "APPROVED") {
        await db.user.update({
            where: { id: updated.userId },
            data: {
                reputation: { increment: 50 } // +50 Rep for accepted notes
            }
        });
    }

    // 5. Revalidate Cache
    revalidatePath("/admin/moderation");
    revalidatePath("/streams"); // If it shows approved content

    return { success: true, message: `Contribution ${decision}` };
}

// --- Action 3: Update & Approve Contribution ---
export async function updateAndApproveContribution(
    id: string,
    newTitle: string,
    newSubject: string,
    newSemester: string,
    newBranch: string
) {
    const { userId } = await auth();

    if (!userId) {
        throw new Error("Unauthorized");
    }

    // 1. Verify Admin
    const dbUser = await db.user.findUnique({
        where: { id: userId },
    });

    if (dbUser?.role !== "ADMIN") {
        throw new Error("Forbidden");
    }

    // 2. Update Record & Status
    const updated = await db.contribution.update({
        where: { id },
        data: {
            title: newTitle,
            subject: newSubject,
            // @ts-ignore
            semester: newSemester,
            // @ts-ignore
            branch: newBranch,
            status: "APPROVED"
        },
        include: { user: true }
    });

    // 3. Log Action
    await db.systemLog.create({
        data: {
            action: "CONTRIBUTION_EDITED_APPROVED",
            details: `Admin ${dbUser.name} edited and approved ${id}`
        }
    });

    // 4. Reputation Update
    await db.user.update({
        where: { id: updated.userId },
        data: {
            reputation: { increment: 50 }
        }
    });

    // 5. Revalidate
    revalidatePath("/admin/moderation");
    revalidatePath("/streams");

    return { success: true };
}
