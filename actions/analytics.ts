"use server";

import { db } from "@/lib/db";
import { startOfDay, endOfDay, subDays, format } from "date-fns";

export async function getAdminAnalytics() {
    // 1. Calculate the last 7 days
    const today = new Date();
    const analytics = [];

    for (let i = 6; i >= 0; i--) {
        const date = subDays(today, i);
        const start = startOfDay(date);
        const end = endOfDay(date);

        // Count Users Registered on this day
        const userCount = await db.user.count({
            where: {
                createdAt: {
                    gte: start,
                    lte: end
                }
            }
        });

        // Count Uploads on this day
        const uploadCount = await db.contribution.count({
            where: {
                createdAt: {
                    gte: start,
                    lte: end
                }
            }
        });

        analytics.push({
            date: format(date, "EEE"), // "Mon", "Tue"
            users: userCount,
            uploads: uploadCount
        });
    }

    // 2. Get Global Stats
    const totalUsers = await db.user.count();
    const totalFiles = await db.contribution.count();
    const totalPending = await db.contribution.count({
        where: { status: "PENDING" }
    });

    return {
        chartData: analytics, // [{ date: 'Mon', users: 10, uploads: 5 }]
        stats: {
            totalUsers,
            totalFiles,
            totalPending
        }
    };
}
