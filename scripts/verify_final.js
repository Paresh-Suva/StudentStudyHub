
const { PrismaClient } = require('@prisma/client');
const db = new PrismaClient();

async function verify() {
    console.log("--- FINAL VERIFICATION ---");

    const subjectCount = await db.subject.count();
    const linkCount = await db.streamSubject.count();
    const contribCount = await db.contribution.count();

    console.log(`Subjects: ${subjectCount} (Expected: 105)`);
    console.log(`Links (StreamSubject): ${linkCount} (Expected: >= 105)`);
    console.log(`Contributions: ${contribCount}`);

    // Check a sample recovered link
    const recovered = await db.streamSubject.findFirst({
        where: { stream: "Recovered_Library" }
    });
    console.log("Sample Recovered Link:", recovered);
}

verify()
    .catch(e => console.error(e))
    .finally(() => db.$disconnect());
