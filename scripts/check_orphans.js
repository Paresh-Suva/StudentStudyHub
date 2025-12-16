
const { PrismaClient } = require('@prisma/client');
const db = new PrismaClient();

async function checkOrphans() {
    console.log("Checking for Orphaned Subjects...");

    // Find subjects where stream is empty or null (orphaned from location)
    const orphans = await db.subject.findMany({
        where: {
            OR: [
                { stream: { equals: "" } },
                { stream: { equals: null } },
                { branch: { equals: "" } },
                { branch: { equals: null } }
            ]
        }
    });

    const total = await db.subject.count();

    console.log(`Total Subjects: ${total}`);
    console.log(`Orphaned Subjects (No Location): ${orphans.length}`);

    if (orphans.length > 0) {
        console.table(orphans.map(s => ({ id: s.id, name: s.name })));
    } else {
        console.log("No orphans found. All subjects have valid location data.");
    }
}

checkOrphans()
    .catch(e => console.error(e))
    .finally(() => db.$disconnect());
