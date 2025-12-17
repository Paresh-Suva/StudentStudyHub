
const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const db = new PrismaClient();

async function restore() {
    console.log("Restoring Subject Data from Backup...");

    if (!fs.existsSync('backup_streamsubject.json')) {
        console.error("Backup file not found!");
        return;
    }

    const backupData = JSON.parse(fs.readFileSync('backup_streamsubject.json', 'utf8'));
    console.log(`Loaded ${backupData.length} records.`);

    let updatedCount = 0;

    for (const link of backupData) {
        // Find subject with this ID
        const subject = await db.globalSubject.findUnique({ where: { id: link.subjectId } });

        if (subject) {
            // Update it with the backed-up location info
            await db.globalSubject.update({
                where: { id: link.subjectId },
                data: {
                    stream: link.stream, // Use the backed up value directly (which we normalized earlier)
                    branch: link.branch,
                    semester: link.semester
                }
            });
            updatedCount++;
            console.log(`Restored: ${link.subjectId} -> ${link.stream}/${link.branch}/${link.semester}`);
        } else {
            console.warn(`Subject ID ${link.subjectId} found in backup but not in DB (Ghost link).`);
        }
    }

    console.log(`RESTORE COMPLETE: Updated ${updatedCount} subjects.`);
}

restore()
    .catch(e => console.error(e))
    .finally(() => db.$disconnect());
