"use server";

import { auth, currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

interface Contribution {
    id: string;
    title: string;
    status: string;
    type: string;
    subject: string;
    createdAt: Date;
    fileUrl: string;
    stream: string;
    branch: string;
}

export async function getUserDashboardData() {
    const user = await currentUser();

    if (!user) {
        throw new Error("Unauthorized");
    }

    const { publicMetadata } = user;
    const isAdmin = String(publicMetadata.role).toLowerCase() === "admin";

    // 1. SCENARIO: ADMIN
    if (isAdmin) {
        return {
            isAdmin: true,
            contributions: [] as Contribution[],
            stats: null
        };
    }

    // 2. SCENARIO: STUDENT
    // Determine user ID (ensure we have a synced user in DB, or use Clerk ID directly)
    // The schema says User.id is the Clerk ID.
    const userId = user.id;

    // Fetch Contributions
    const contributions = await db.contribution.findMany({
        where: { userId: userId },
        orderBy: { createdAt: "desc" },
        select: {
            id: true,
            title: true,
            status: true,
            type: true,
            subject: true,
            createdAt: true,
            fileUrl: true,
            stream: true,
            branch: true,
        }
    });

    // Fetch User with full contribution data to calculate 'True Score'
    // We explicitly include 'likes' to recalculate total earned points
    const dbUser = await db.user.findUnique({
        where: { id: userId },
        include: {
            contributions: {
                where: { status: "APPROVED" },
                include: { likes: true }
            }
        }
    });

    const approvedContributions = dbUser?.contributions || [];
    const approvedCount = approvedContributions.length;

    // Calculate True Score based on current rules
    // 1. Uploads: 50 XP each
    const uploadPoints = approvedCount * 50;

    // 2. Likes Received: 5 XP each
    const totalLikesReceived = approvedContributions.reduce((acc, curr) => acc + curr.likes.length, 0);
    const likePoints = totalLikesReceived * 5;

    const expectedPoints = uploadPoints + likePoints;

    // Self-Healing: If DB is out of sync (e.g., from old logic), fix it now.
    if (dbUser && dbUser.reputation !== expectedPoints) {
        await db.user.update({
            where: { id: userId },
            data: { reputation: expectedPoints }
        });
    }

    const points = expectedPoints;
    const totalUploads = contributions.length;

    // Rank Logic
    let rank = "Beginner";
    if (points >= 500) rank = "Scholar";
    else if (points >= 100) rank = "Contributor";

    // Calculate XP for next rank
    let nextRankXP = 100;
    if (rank === "Contributor") nextRankXP = 500;
    if (rank === "Scholar") nextRankXP = 1000; // Cap or theoretical max

    const progress = Math.min((points / nextRankXP) * 100, 100);

    // Fetch User's Bookmarks
    const bookmarks = await db.bookmark.findMany({
        where: { userId },
        include: {
            contribution: true
        },
        orderBy: { createdAt: "desc" }
    });

    const savedFiles = bookmarks.map(b => b.contribution);

    return {
        isAdmin: false,
        contributions: contributions as Contribution[],
        savedFiles: savedFiles as unknown as Contribution[],
        stats: {
            points,
            rank,
            totalUploads,
            approvedCount,
            nextRankXP,
            progress
        }
    };
}
