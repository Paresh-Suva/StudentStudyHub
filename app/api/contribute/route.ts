import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
    try {
        const { userId } = await auth();
        const user = await currentUser();

        if (!userId || !user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        // 1. Parse Body
        const body = await req.json();
        const { title, stream, branch, semester, type, fileUrl, subjectId, newSubjectName } = body;

        if (!title || !stream || !type || !fileUrl) {
            return new NextResponse("Missing required fields", { status: 400 });
        }

        if (!subjectId && !newSubjectName) {
            return new NextResponse("Subject selection is required", { status: 400 });
        }

        const email = user.emailAddresses[0]?.emailAddress;
        if (!email) {
            return new NextResponse("User email not found", { status: 400 });
        }

        // 2. Handle Subject Logic (Find ID or Create New)
        let finalSubjectId: string | null = subjectId || null;
        let finalSubjectName = ""; // For legacy 'subject' string field

        // Normalize semester (Robust extract: "Sem 1" -> "1", "sem-1" -> "1", "3rd Prof" -> "3")
        const semMatch = semester ? semester.match(/(\d+)/) : null;
        const cleanSem = semMatch ? semMatch[0] : (semester ? semester.replace(/^(sem-|prof-)/, "") : "1");

        // Normalize branch for DB lookup
        const branchMap: Record<string, string> = {
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
        const rawBranch = branch ? branch.toLowerCase().trim() : "general";
        const dbBranch = branchMap[rawBranch] || rawBranch;

        if (newSubjectName) {
            finalSubjectName = newSubjectName;
            try {
                // Attempt to create new subject
                const newSub = await db.subject.create({
                    data: {
                        name: newSubjectName,
                        stream: stream.toLowerCase(),
                        branch: dbBranch,
                        semester: cleanSem
                    }
                });
                finalSubjectId = newSub.id;
            } catch (e) {
                console.error("Subject creation failed (likely duplicate)", e);
                // Fallback: Find existing
                const existing = await db.subject.findFirst({
                    where: {
                        name: newSubjectName,
                        stream: stream.toLowerCase(),
                        branch: dbBranch,
                        semester: cleanSem
                    }
                });
                finalSubjectId = existing?.id || null;
            }
        } else if (subjectId) {
            // Fetch name for legacy field
            const sub = await db.subject.findUnique({ where: { id: subjectId } });
            if (sub) finalSubjectName = sub.name;
        }

        // 3. Create Contribution
        const contribution = await db.contribution.create({
            data: {
                title,
                stream,
                branch: branch || "General",
                semester: semester || "1",
                subject: finalSubjectName, // Legacy String
                type,
                fileUrl,
                status: "PENDING",

                // Link to User (Create if not exists)
                user: {
                    connectOrCreate: {
                        where: { id: userId },
                        create: {
                            id: userId,
                            email: email,
                            name: `${user.firstName} ${user.lastName}`.trim() || user.username || "Anonymous",
                            role: "STUDENT"
                        }
                    }
                },

                // Link to Subject
                ...(finalSubjectId && {
                    subjectRes: {
                        connect: { id: finalSubjectId }
                    }
                })
            }
        });

        // 4. Create System Log
        await db.systemLog.create({
            data: {
                action: "USER_CONTRIBUTION",
                details: `User ${userId} uploaded ${title} for ${finalSubjectName}`,
            }
        });

        return NextResponse.json(contribution);

    } catch (error) {
        console.error("[CONTRIBUTION_POST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
