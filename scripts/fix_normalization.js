
const { PrismaClient } = require('@prisma/client');
const db = new PrismaClient();

const BRANCH_MAP = {
    "computer science": "computer",
    "cse": "computer",
    "information technology": "it",
    "it": "it",
    "mechanical engineering": "mechanical",
    "mechanical": "mechanical",
    "civil engineering": "civil",
    "civil": "civil",
    "electrical engineering": "ee",
    "electrical": "ee",
    "ee": "ee",
    "electronics": "electronics",
    "mbbs": "mbbs",
    "b.pharm": "b.pharm"
};

async function normalize() {
    console.log("Starting Normalization...");
    const streamSubjects = await db.streamSubject.findMany(); // Using StreamSubject table

    let updatedCount = 0;

    for (const link of streamSubjects) {
        // 1. Stream: Lowercase
        let newStream = link.stream.toLowerCase();

        // 2. Branch: Map & Lowercase
        let rawBranch = link.branch.toLowerCase().trim();
        let newBranch = BRANCH_MAP[rawBranch] || rawBranch;

        // 3. Semester: Extract Number
        let newSemester = link.semester;
        const semMatch = link.semester.match(/(\d+)/);
        if (semMatch) {
            newSemester = semMatch[0];
        } else {
            newSemester = link.semester.replace(/^(sem-|prof-)/i, "").trim();
        }

        // Update if changed
        if (newStream !== link.stream || newBranch !== link.branch || newSemester !== link.semester) {
            console.log(`Fixing: ${link.stream}/${link.branch}/${link.semester} -> ${newStream}/${newBranch}/${newSemester}`);

            // Check collision
            const exists = await db.streamSubject.findFirst({
                where: {
                    stream: newStream,
                    branch: newBranch,
                    semester: newSemester,
                    subjectId: link.subjectId
                }
            });

            if (!exists) {
                await db.streamSubject.update({
                    where: { id: link.id },
                    data: {
                        stream: newStream,
                        branch: newBranch,
                        semester: newSemester
                    }
                });
                updatedCount++;
            } else {
                console.log("Skipping collision (already normalized version exists)");
                // Optionally delete the duplicate bad one
                // await db.streamSubject.delete({ where: { id: link.id } });
            }
        }
    }

    console.log(`NORMALIZATION COMPLETE: Updated ${updatedCount} records.`);
}

normalize()
    .catch(e => console.error(e))
    .finally(() => db.$disconnect());
