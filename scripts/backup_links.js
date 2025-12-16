
const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const db = new PrismaClient();

async function backup() {
    console.log("Backing up StreamSubject data...");
    const streamSubjects = await db.streamSubject.findMany();

    fs.writeFileSync('backup_streamsubject.json', JSON.stringify(streamSubjects, null, 2));
    console.log(`Backup saved to backup_streamsubject.json (${streamSubjects.length} records)`);
}

backup()
    .catch(e => console.error(e))
    .finally(() => db.$disconnect());
