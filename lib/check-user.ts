import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export const checkUser = async () => {
    const user = await currentUser();

    // 1. Not logged in -> No sync needed
    if (!user) {
        return null;
    }

    // 2. Check if user already exists in DB
    const loggedInUser = await db.user.findUnique({
        where: {
            id: user.id,
        },
    });

    // 3. User exists -> Update their details to match Clerk (Self-Healing)
    if (loggedInUser) {
        // If you manually changed the role in Clerk, this ensures it syncs to DB
        const clerkRole = (user.publicMetadata.role as string) || "STUDENT";

        // Only update if something changed (Optimization)
        if (loggedInUser.imageUrl !== user.imageUrl || loggedInUser.role !== clerkRole) {
            return await db.user.update({
                where: { id: user.id },
                data: {
                    name: `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim(),
                    imageUrl: user.imageUrl,
                    email: user.emailAddresses[0].emailAddress,
                    role: clerkRole
                }
            });
        }
        return loggedInUser;
    }

    // 4. User does not exist -> Create new user
    const newUser = await db.user.create({
        data: {
            id: user.id,
            name: `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim(),
            imageUrl: user.imageUrl,
            email: user.emailAddresses[0].emailAddress,
        },
    });

    return newUser;
};