const { PrismaClient } = require('@prisma/client');
const db = new PrismaClient();

async function main() {
    console.log("--- DEBUGGING SUBJECTS ---");

    // Check Global Subjects
    const globalSubjects = await db.globalSubject.findMany({
        where: { name: { contains: "data", mode: "insensitive" } }
    });
    console.log("Found Global Subjects (matching 'data'):", globalSubjects);

    if (globalSubjects.length > 0) {
        // Check Links for these subjects
        for (const subj of globalSubjects) {
            const links = await db.streamSubject.findMany({
                where: { globalSubjectId: subj.id }
            });
            console.log(`Links for ${subj.name}:`, links);
        }
    }

    // Check all links for IT Sem 4
    console.log("\n--- ALL LINKS FOR IT SEM 4 ---");
    const itLinks = await db.streamSubject.findMany({
        where: {
            branch: "it",
            semester: "4"
        },
        include: { globalSubject: true }
    });
    console.log("IT Sem 4 Subjects:", itLinks.map(l => `${l.globalSubject.name} (Stream: ${l.stream}, Branch: ${l.branch}, Sem: ${l.semester})`));
}

main()
    .catch(e => console.error(e))
    .finally(async () => await db.$disconnect());
