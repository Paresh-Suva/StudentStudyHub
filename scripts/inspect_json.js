
const { PrismaClient } = require('@prisma/client');
const db = new PrismaClient();

async function inspect() {
    const streamSubjects = await db.streamSubject.findMany();
    // Print as JSON for clear reading
    console.log(JSON.stringify(streamSubjects, null, 2));
}

inspect()
    .catch(e => console.error(e))
    .finally(() => db.$disconnect());
