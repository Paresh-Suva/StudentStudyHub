import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export const checkUser = async () => {
    const user = await currentUser();

    // 1. Not logged in -> No sync needed
    if (!user) {
        return null;
    }

    // 2. DETERMINE THE ROLE FIRST 🧠
    // We check Clerk metadata. If it says "admin", we force "ADMIN".
    // Otherwise, everyone else is "STUDENT".
    const metadataRole = user.publicMetadata.role as string | undefined;
    const roleToApply = metadataRole === "admin" ? "ADMIN" : "STUDENT";

    // 3. Check if user already exists in DB
    // (Note: Using 'id' here assumes your Prisma schema maps 'id' to the Clerk ID string)
    const loggedInUser = await db.user.findUnique({
        where: {
            id: user.id,
        },
    });

    // 4. UPDATE EXISTING USER (Self-Healing)
    if (loggedInUser) {
        // If the image changed OR the role in Clerk is different from DB...
        if (loggedInUser.imageUrl !== user.imageUrl || loggedInUser.role !== roleToApply) {
            return await db.user.update({
                where: { id: user.id },
                data: {
                    name: `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim(),
                    imageUrl: user.imageUrl,
                    email: user.emailAddresses[0].emailAddress,
                    role: roleToApply, // <--- Updates role if you changed it in Clerk
                },
            });
        }
        return loggedInUser;
    }

    // 5. CREATE NEW USER
    const newUser = await db.user.create({
        data: {
            id: user.id,
            name: `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim(),
            imageUrl: user.imageUrl,
            email: user.emailAddresses[0].emailAddress,
            role: roleToApply, // <--- CRITICAL: Apply the correct role on creation!
        },
    });

    return newUser;
};