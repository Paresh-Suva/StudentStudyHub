```
import { db } from "@/lib/db";

async function main() {
    try {
        const subjectCount = await db.globalSubject.count();
        const streamSubjectCount = await db.streamSubject.count();
        const contributionCount = await db.contribution.count();

        console.log(`DIAGNOSIS: `);
        console.log(`Global Subjects: ${ subjectCount } `);
        console.log(`StreamSubjects Found: ${ streamSubjectCount } `);
        console.log(`Contributions Found: ${ contributionCount } `);

        // Check if we can link back
        const verifiable contributions = await db.contribution.findMany({
            where: { subjectId: { not: null } },
            take: 5
        });
        console.log("Sample Recoverable Contribution:", contributions[0]);

    } catch (error) {
        console.error(error);
    }
}

main();
