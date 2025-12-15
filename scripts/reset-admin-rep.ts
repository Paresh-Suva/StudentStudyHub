
import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

async function main() {
    console.log('Resetting Admin Reputation...');

    // Update all users with role ADMIN or specific email if known.
    // User said "Restart admin reputation". I'll target the ADMIN role.
    const result = await db.user.updateMany({
        where: {
            role: 'ADMIN',
        },
        data: {
            reputation: 0,
        },
    });

    console.log(`Updated ${result.count} admin(s). Reputation set to 0.`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await db.$disconnect();
    });
