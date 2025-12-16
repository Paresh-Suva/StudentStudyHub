
const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const db = new PrismaClient();

async function backup() {
    console.log("Backing up ALL Subject data...");
    const subjects = await db.subject.findMany();

    fs.writeFileSync('backup_subjects_full.json', JSON.stringify(subjects, null, 2));
    console.log(`Backup saved to backup_subjects_full.json (${subjects.length} records)`);
}

backup()
    .catch(e => console.error(e))
    .finally(() => db.$disconnect());
