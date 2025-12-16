
const { PrismaClient } = require('@prisma/client');
const db = new PrismaClient();

async function fixCase() {
    console.log("Fixing Recovered Library Case...");

    // updateMany is simple and fast for this
    const result = await db.streamSubject.updateMany({
        where: { stream: "Recovered_Library" },
        data: { stream: "recovered_library" }
    });

    console.log(`Updated ${result.count} records to 'recovered_library'.`);
}

fixCase()
    .catch(e => console.error(e))
    .finally(() => db.$disconnect());
