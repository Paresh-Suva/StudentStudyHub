import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export async function GET(req: Request) {
    try {
        const { userId } = await auth();
        const user = await currentUser();

        if (!userId || !user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const email = user.emailAddresses[0]?.emailAddress;

        if (!email) {
            return new NextResponse("User email not found", { status: 400 });
        }

        // Upsert user and force ADMIN role
        await db.user.upsert({
            where: { id: userId },
            update: {
                role: "ADMIN",
                reputation: 100 // Boost rep for admin
            },
            create: {
                id: userId,
                email: email,
                name: `${user.firstName} ${user.lastName}`.trim() || user.username || "Anonymous",
                role: "ADMIN",
                reputation: 100
            }
        });

        // Log the event
        await db.systemLog.create({
            data: {
                action: "ADMIN_PROMOTION",
                details: `User ${userId} promoted themselves via backdoor.`
            }
        });

        return NextResponse.json({ message: "You are now an Admin." });

    } catch (error) {
        console.error("[ADMIN_PROMOTE]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
