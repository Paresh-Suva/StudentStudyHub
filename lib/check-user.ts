import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export const checkUser = async () => {
    const user = await currentUser();

    if (!user) {
        return null;
    }

    // 1. CONVERT Clerk "admin" to Database "ADMIN"
    // This prevents the "Invalid Enum" crash
    const metadataRole = user.publicMetadata.role as string | undefined;
    const roleToApply = metadataRole === "admin" ? "ADMIN" : "STUDENT";

    const loggedInUser = await db.user.findUnique({
        where: { id: user.id },
    });

    // 2. UPDATE if role mismatch
    if (loggedInUser) {
        if (loggedInUser.role !== roleToApply) {
            await db.user.update({
                where: { id: user.id },
                data: { role: roleToApply },
            });
        }
        return loggedInUser;
    }

    // 3. CREATE new user
    const newUser = await db.user.create({
        data: {
            id: user.id,
            name: `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim(),
            imageUrl: user.imageUrl,
            email: user.emailAddresses[0].emailAddress,
            role: roleToApply,
        },
    });

    return newUser;
};