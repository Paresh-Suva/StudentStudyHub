
const { PrismaClient } = require('@prisma/client');
const db = new PrismaClient();

async function purge() {
    console.log("⚠️  STARTING LIBRARY PURGE (SAFE MODE) ⚠️");
    console.log("Preserving Users & Accounts...");

    // 1. Delete Dependencies (Child Tables) first
    console.log("Deleting Contributions (Files)...");
    await db.contribution.deleteMany({});

    console.log("Deleting Bookmarks & Likes...");
    try { await db.bookmark.deleteMany({}); } catch (e) { }
    try { await db.like.deleteMany({}); } catch (e) { }

    console.log("Deleting Stream Links...");
    await db.streamSubject.deleteMany({});

    console.log("Deleting Subject Requests...");
    // Check if table exists (it was added recently)
    try { await db.subjectRequest.deleteMany({}); } catch (e) { console.log("SubjectRequest table not found/empty."); }

    // 2. Delete Main Content
    console.log("Deleting Subjects...");
    await db.subject.deleteMany({});

    console.log("✅ PURGE COMPLETE. Library is empty. Users are safe.");
}

purge()
    .catch(e => {
        console.error("Purge Failed:", e);
        process.exit(1);
    })
    .finally(() => db.$disconnect());
