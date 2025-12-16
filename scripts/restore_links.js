
const { PrismaClient } = require('@prisma/client');
const db = new PrismaClient();

async function restore() {
    console.log("Starting Recovery...");

    // Get all contributions that have a linked subject
    const contributions = await db.contribution.findMany({
        where: { subjectId: { not: null } }
    });

    console.log(`Found ${contributions.length} contributions to analyze.`);

    let restoredCount = 0;

    for (const file of contributions) {
        if (!file.subjectId) continue;

        // Check if link exists
        const existingLink = await db.streamSubject.findFirst({
            where: {
                subjectId: file.subjectId,
                stream: file.stream,
                branch: file.branch,
                semester: file.semester
            }
        });

        if (!existingLink) {
            console.log(`Restoring Link: ${file.stream} > ${file.branch} > ${file.semester} for SubjectID: ${file.subjectId}`);

            await db.streamSubject.create({
                data: {
                    stream: file.stream,
                    branch: file.branch,
                    semester: file.semester,
                    subjectId: file.subjectId
                }
            });
            restoredCount++;
        }
    }

    console.log(`RECOVERY COMPLETE: Restored ${restoredCount} links.`);
}

restore()
    .catch(e => console.error(e))
    .finally(() => db.$disconnect());
