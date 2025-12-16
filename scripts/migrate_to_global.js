
const { PrismaClient } = require('@prisma/client');
const db = new PrismaClient();

async function migrate() {
    console.log("STARTING SAFE MIGRATION...");

    const subjects = await db.subject.findMany();
    console.log(`Found ${subjects.length} subjects to process.`);

    let activeLinks = 0;
    let recoveredLinks = 0;

    for (const sub of subjects) {
        // Determine Target Context
        let targetStream = sub.stream;
        let targetBranch = sub.branch;
        let targetSemester = sub.semester;

        let isRecovered = false;

        // CHECK ID: If stream is missing/empty, move to Recovered
        if (!targetStream || targetStream === "") {
            targetStream = "Recovered_Library";
            targetBranch = "General";
            targetSemester = "1";
            isRecovered = true;
        }

        // Ensure normalization (Safety check)
        if (!isRecovered) {
            targetStream = targetStream.toLowerCase();
            // Simple normalization for safety
            if (targetBranch === "CSE") targetBranch = "computer";
            if (targetSemester === "Sem 3") targetSemester = "3";
        }

        // CREATE LINK
        try {
            await db.streamSubject.upsert({
                where: {
                    stream_branch_semester_subjectId: {
                        stream: targetStream,
                        branch: targetBranch,
                        semester: targetSemester,
                        subjectId: sub.id
                    }
                },
                update: {}, // No update needed if exists
                create: {
                    stream: targetStream,
                    branch: targetBranch,
                    semester: targetSemester,
                    subjectId: sub.id
                }
            });

            if (isRecovered) recoveredLinks++;
            else activeLinks++;

            // console.log(`Linked: ${sub.name} -> ${targetStream}`);

        } catch (e) {
            console.error(`Failed to link ${sub.name}:`, e.message);
        }
    }

    console.log("--- MIGRATION COMPLETE ---");
    console.log(`Active Subjects Linked: ${activeLinks}`);
    console.log(`Recovered Orphans: ${recoveredLinks} (Look in 'Recovered_Library')`);
    console.log(`Total Processed: ${activeLinks + recoveredLinks}`);
}

migrate()
    .catch(e => console.error(e))
    .finally(() => db.$disconnect());
