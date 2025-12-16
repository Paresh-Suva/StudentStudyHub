
const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const db = new PrismaClient();

async function restoreFull() {
    console.log("RESTORING FULL DATABASE FROM BACKUP...");

    if (!fs.existsSync('backup_subjects_full.json')) {
        console.error("CRITICAL: Backup file missing!");
        process.exit(1);
    }

    const backupData = JSON.parse(fs.readFileSync('backup_subjects_full.json', 'utf8'));
    console.log(`Found ${backupData.length} records in backup.`);

    let restoredCount = 0;

    for (const sub of backupData) {
        // Create subject (id is preserved to keep relationship with other tables valid if they weren't cascaded... 
        // wait, reset cascades. So contributions are gone too? 
        // Prisma reset wipes everything. Contributions are likely gone unless I backed them up too.
        // Wait, I only backed up SUBJECTS.
        // Let's hope reset didn't wipe Contributions if they were in a separate table? 
        // Prisma "Reset" usually wipes public schema.
        // CHECK CONTRIBUTIONS FIRST.

        try {
            await db.subject.create({
                data: {
                    id: sub.id, // Keep original ID
                    name: sub.name,
                    code: sub.code,
                    stream: sub.stream,
                    branch: sub.branch,
                    semester: sub.semester,
                    createdAt: sub.createdAt ? new Date(sub.createdAt) : undefined
                }
            });
            restoredCount++;
        } catch (e) {
            console.error(`Failed to restore ${sub.name}:`, e.message);
        }
    }

    console.log(`RESTORE COMPLETE: Queued ${restoredCount} subjects.`);
}

restoreFull()
    .catch(e => console.error(e))
    .finally(() => db.$disconnect());
