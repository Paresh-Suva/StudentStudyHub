"use server";

import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function syncUser(shouldRevalidate: boolean = true) {
    const user = await currentUser();

    if (!user) return null;

    const existingUser = await db.user.findUnique({
        where: { id: user.id }
    });

    const name = `${user.firstName} ${user.lastName}`.trim();
    const email = user.emailAddresses[0]?.emailAddress || "";
    const imageUrl = user.imageUrl;


    if (existingUser) {
        // Update if changed
        if (existingUser.imageUrl !== imageUrl || existingUser.name !== name) {
            await db.user.update({
                where: { id: user.id },
                data: {
                    name,
                    imageUrl,
                    email // Ensure email is fresh too
                }
            });
        }
    } else {
        // Create new user (Lazy creation)
        await db.user.create({
            data: {
                id: user.id,
                email,
                name,
                imageUrl,
                role: "STUDENT" // Default
            }
        });
    }

    if (shouldRevalidate) {
        revalidatePath("/leaderboard");
        revalidatePath("/dashboard");
    }
    return true;
}
