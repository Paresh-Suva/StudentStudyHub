
const { PrismaClient } = require('@prisma/client');
const db = new PrismaClient();

async function inspect() {
    console.log("--- INSPECTING DATA ---");

    const streamSubjects = await db.streamSubject.findMany();
    console.log("StreamSubjects (Current Links):");
    console.table(streamSubjects.map(s => ({
        stream: s.stream,
        branch: s.branch,
        sem: s.semester,
        subjectId: s.subjectId
    })));

    const contributions = await db.contribution.findMany({ take: 5, where: { subjectId: { not: null } } });
    console.log("\nContributions (Source Data):");
    console.table(contributions.map(c => ({
        stream: c.stream,
        branch: c.branch,
        sem: c.semester,
        subjectId: c.subjectId
    })));
}

inspect()
    .catch(e => console.error(e))
    .finally(() => db.$disconnect());
