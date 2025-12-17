
const { PrismaClient } = require('@prisma/client');
const db = new PrismaClient();

async function main() {
    try {
        const subjectCount = await db.globalSubject.count();
        const streamSubjectCount = await db.streamSubject.count();
        const contributionCount = await db.contribution.count();

        console.log(`DIAGNOSIS_RESULT: Subjects=${subjectCount} | StreamSubjects=${streamSubjectCount} | Contributions=${contributionCount}`);

    } catch (error) {
        console.error("Error:", error);
    } finally {
        await db.$disconnect();
    }
}

main();
